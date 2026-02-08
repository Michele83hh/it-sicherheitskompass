'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Coins, Users, TrendingDown, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  getCostEstimate,
  calculateAdjustedTotalCost,
  calculateScalingFactors,
  formatCostRange,
  type CompanyProfile,
} from '@/lib/nis2/cost-estimation';
import type { Recommendation, CategoryScore } from '@/lib/nis2/types';

interface CostEstimationSectionProps {
  recommendations: Recommendation[];
  categoryScores: CategoryScore[];
  companyProfile: CompanyProfile | null;
}

export function CostEstimationSection({
  recommendations,
  categoryScores,
  companyProfile,
}: CostEstimationSectionProps) {
  const t = useTranslations('costEstimation');
  const tRec = useTranslations('recommendations');

  const recIds = recommendations.map((r) => r.id);

  // Build category score map for per-rec lookup
  const scoreMap = useMemo(
    () => new Map(categoryScores.map((cs) => [cs.categoryId, cs])),
    [categoryScores]
  );

  // Compute adjusted totals
  const totals = useMemo(() => {
    if (!companyProfile) {
      // Fallback: base totals without scaling
      let internalMin = 0, internalMax = 0;
      let externalMin = 0, externalMax = 0;
      let toolsMin = 0, toolsMax = 0;
      let totalMin = 0, totalMax = 0;

      for (const id of recIds) {
        const est = getCostEstimate(id);
        if (est) {
          internalMin += est.internalEffortDays.min;
          internalMax += est.internalEffortDays.max;
          externalMin += est.externalCostEur.min;
          externalMax += est.externalCostEur.max;
          toolsMin += est.toolCostEurYear.min;
          toolsMax += est.toolCostEurYear.max;
          totalMin += est.totalEstimateEur.min;
          totalMax += est.totalEstimateEur.max;
        }
      }

      return {
        internal: { min: internalMin, max: internalMax },
        external: { min: externalMin, max: externalMax },
        tools: { min: toolsMin, max: toolsMax },
        total: { min: totalMin, max: totalMax },
        adjusted: null as null,
        isAdjusted: false,
      };
    }

    // Adjusted totals
    const adj = calculateAdjustedTotalCost(recIds, categoryScores, companyProfile);

    let externalMin = 0, externalMax = 0;
    let toolsMin = 0, toolsMax = 0;

    for (const id of recIds) {
      const est = getCostEstimate(id);
      if (est) {
        externalMin += est.externalCostEur.min;
        externalMax += est.externalCostEur.max;
        toolsMin += est.toolCostEurYear.min;
        toolsMax += est.toolCostEurYear.max;
      }
    }

    return {
      internal: adj.totalAdjustedDays,
      external: { min: externalMin, max: externalMax },
      tools: { min: toolsMin, max: toolsMax },
      total: adj.totalAdjusted,
      adjusted: adj,
      isAdjusted: true,
    };
  }, [recIds, categoryScores, companyProfile]);

  // Per-recommendation rows with optional adjustment
  const rows = useMemo(() => {
    return recommendations.map((rec) => {
      const base = getCostEstimate(rec.id);
      if (!base) return null;

      const catScore = scoreMap.get(rec.categoryId);
      let adjDays = base.internalEffortDays;

      if (companyProfile && catScore) {
        const factors = calculateScalingFactors(companyProfile, catScore.trafficLight);
        adjDays = {
          min: Math.max(1, Math.round(base.internalEffortDays.min * factors.combined)),
          max: Math.max(1, Math.round(base.internalEffortDays.max * factors.combined)),
        };
      }

      return {
        rec,
        base,
        adjustedDays: adjDays,
        baseDays: base.internalEffortDays,
      };
    }).filter(Boolean) as Array<{
      rec: Recommendation;
      base: NonNullable<ReturnType<typeof getCostEstimate>>;
      adjustedDays: { min: number; max: number };
      baseDays: { min: number; max: number };
    }>;
  }, [recommendations, scoreMap, companyProfile]);

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Coins className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Company-specific indicator */}
      {totals.isAdjusted && companyProfile && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <Users className="mt-0.5 size-4 flex-shrink-0 text-blue-600" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">{t('companySpecific')}</p>
            <p className="mt-0.5 text-blue-600">
              {t('scalingInfo', {
                employees: companyProfile.employees,
                entity: companyProfile.entityCategory === 'besonders-wichtig'
                  ? t('entityBesondersWichtig')
                  : t('entityWichtig'),
              })}
            </p>
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">{t('totalInternal')}</p>
            <p className="text-2xl font-bold">
              {totals.internal.min}–{totals.internal.max} {t('personDays')}
            </p>
            {totals.adjusted && (
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <TrendingDown className="size-3" />
                {t('baseValue')}: {totals.adjusted.totalInternalDays.min}–{totals.adjusted.totalInternalDays.max} PT
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">{t('totalExternal')}</p>
            <p className="text-2xl font-bold">{formatCostRange(totals.external)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">{t('totalTools')}</p>
            <p className="text-2xl font-bold">{formatCostRange(totals.tools)} {t('perYear')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-recommendation breakdown */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-semibold">{t('measure')}</th>
              <th className="p-3 text-right font-semibold">
                {totals.isAdjusted ? t('adjustedEffort') : t('internalEffort')}
              </th>
              <th className="p-3 text-right font-semibold">{t('externalCost')}</th>
              <th className="p-3 text-right font-semibold">{t('toolsCost')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ rec, base, adjustedDays, baseDays }) => {
              const titleKey = rec.titleKey.replace('recommendations.', '');
              const isChanged = totals.isAdjusted &&
                (adjustedDays.min !== baseDays.min || adjustedDays.max !== baseDays.max);
              return (
                <tr key={rec.id} className="border-b">
                  <td className="p-3">{tRec(titleKey)}</td>
                  <td className="p-3 text-right">
                    <span>{adjustedDays.min}–{adjustedDays.max} {t('personDays')}</span>
                    {isChanged && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({baseDays.min}–{baseDays.max})
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">{formatCostRange(base.externalCostEur)}</td>
                  <td className="p-3 text-right">{formatCostRange(base.toolCostEurYear)} {t('perYear')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3 flex-shrink-0" />
        <p>{t('note')}</p>
      </div>
    </section>
  );
}
