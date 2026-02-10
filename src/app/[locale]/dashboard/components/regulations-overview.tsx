'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import type { DashboardData, RegulationStatus } from '@/lib/dashboard/aggregation';

interface RegulationsOverviewProps {
  data: DashboardData;
}

export function RegulationsOverview({ data }: RegulationsOverviewProps) {
  const t = useTranslations();
  const tDash = useTranslations('platform.dashboard');
  const tReg = useTranslations('platform.dashboard.regulationsV2');

  const navigatorData = data.navigatorData;

  // Sort: relevant + lowest score first
  const relevantRegIds = navigatorData
    ? navigatorData.results
        .filter((r) => r.relevance === 'high' || r.relevance === 'medium')
        .map((r) => r.id)
    : null;

  const displayStatuses = [...data.regulations].sort((a, b) => {
    if (relevantRegIds) {
      const aRelevant = relevantRegIds.includes(a.id);
      const bRelevant = relevantRegIds.includes(b.id);
      if (aRelevant && !bRelevant) return -1;
      if (!aRelevant && bRelevant) return 1;
    }
    const aScore = a.score ?? 999;
    const bScore = b.score ?? 999;
    return aScore - bScore;
  });

  function getRegRelevance(regId: string): 'high' | 'medium' | 'low' | 'none' | null {
    if (!navigatorData) return null;
    const result = navigatorData.results.find((r) => r.id === regId);
    if (!result) return 'none';
    return result.relevance as 'high' | 'medium' | 'low' | 'none';
  }

  function getRegCta(status: RegulationStatus): { label: string; href: string; variant: 'default' | 'outline' | 'ghost' } {
    const relevance = getRegRelevance(status.id);
    const isRelevant = relevance === null || relevance === 'high' || relevance === 'medium';

    if (status.score !== null && status.answeredQuestions >= status.totalQuestions) {
      return { label: tDash('viewResults'), href: `/${status.id}/results`, variant: 'outline' };
    }
    if (status.hasData) {
      return { label: tDash('continueCheck'), href: `/${status.id}/assessment`, variant: 'outline' };
    }
    if (!isRelevant) {
      return { label: tDash('checkAnyway'), href: `/${status.id}/schnellcheck`, variant: 'ghost' };
    }
    return { label: tDash('startCheck'), href: `/${status.id}/schnellcheck`, variant: 'default' };
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-foreground mb-4">{tDash('regulationsTitle')}</h2>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex-1">
        {displayStatuses.map((status, idx) => {
          const Icon = status.icon;
          const cta = getRegCta(status);
          const relevance = getRegRelevance(status.id);
          const isRelevant = relevance === null || relevance === 'high' || relevance === 'medium';
          const isComplete = status.answeredQuestions >= status.totalQuestions && status.hasData;

          return (
            <div
              key={status.id}
              className={`flex items-center gap-4 px-5 py-4 transition-opacity ${
                idx > 0 ? 'border-t border-slate-100' : ''
              } ${!isRelevant ? 'opacity-40' : ''}`}
            >
              {/* Icon */}
              <Icon className={`size-5 text-${status.color}-500 flex-shrink-0`} />

              {/* Name + Status */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {t(`${status.tKey}.name`)}
                  </span>

                  {/* Score badge — only one, clean */}
                  {status.score !== null && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      status.score >= 70 ? 'bg-emerald-50 text-emerald-700' :
                      status.score >= 40 ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {status.score}%
                    </span>
                  )}

                  {/* Completeness — minimal */}
                  {status.hasData && (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      {isComplete ? (
                        <>
                          <CheckCircle2 className="size-3 text-emerald-500" />
                          <span>{status.answeredQuestions}/{status.totalQuestions}</span>
                        </>
                      ) : (
                        <>
                          <Circle className="size-3 text-slate-300" />
                          <span>{status.answeredQuestions}/{status.totalQuestions}</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {!status.hasData && (
                  <p className="text-xs text-muted-foreground mt-0.5">{tDash('notStarted')}</p>
                )}
              </div>

              {/* CTA */}
              <Button variant={cta.variant} size="sm" asChild className="flex-shrink-0">
                <Link href={cta.href as any}>
                  {cta.label} <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
