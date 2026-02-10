'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, Layers, Lightbulb } from 'lucide-react';
import type { DashboardData } from '@/lib/dashboard/aggregation';

interface NextBestActionProps {
  data: DashboardData;
}

export function NextBestAction({ data }: NextBestActionProps) {
  const t = useTranslations();
  const tNA = useTranslations('platform.dashboard.nextAction');

  const action = data.nextBestAction;

  // Count total quick wins
  const totalQuickWins = data.regulations
    .filter((r) => r.hasData)
    .reduce((sum, r) => sum + r.recommendations.filter((rec) => rec.effortLevel === 'quick').length, 0);

  if (!action) {
    if (data.completedCount === 0) return null;
    return (
      <div className="mb-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-100">
            <Target className="size-5 text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{tNA('noneAvailable')}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{tNA('noneAvailableDesc')}</p>
          </div>
        </div>
      </div>
    );
  }

  const effortKey = action.effortLabel === 'quick' ? 'effortQuick'
    : action.effortLabel === 'medium' ? 'effortMedium' : 'effortStrategic';

  return (
    <div className="mb-8 rounded-xl border border-primary/20 bg-primary/[0.03] px-6 py-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="size-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">{tNA('title')}</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 min-w-0">
          {/* Recommendation title */}
          <p className="text-lg font-semibold text-foreground leading-snug">
            {t(action.recommendation.titleKey)}
          </p>

          {/* Reasoning — why this step */}
          <div className="mt-2 flex items-start gap-1.5 text-xs text-primary/80">
            <Lightbulb className="size-3.5 mt-0.5 flex-shrink-0" />
            <span>
              {action.crossRegCount > 0
                ? tNA('reasonCrossReg', { count: action.crossRegCount + 1 })
                : action.categoryScore < 40
                ? tNA('reasonLowestCategory', { score: Math.round(action.categoryScore) })
                : tNA('reasonQuickWin')}
            </span>
          </div>

          {/* Meta line — clean, separated by dots */}
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {tNA(effortKey)}
            </span>
            <span>&middot;</span>
            <span>{tNA('fromRegulation', { regulation: t(`${action.regulationTKey}.name`) })}</span>
            <span>&middot;</span>
            <span>{tNA('categoryAt', { score: Math.round(action.categoryScore) })}</span>
            {action.crossRegCount > 0 && (
              <>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Layers className="size-3" />
                  {tNA('covers', { count: action.crossRegCount + 1 })}
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button size="sm" className="flex-shrink-0 self-start sm:self-center" asChild>
          <Link href={`/${action.regulationId}/results#actionplan` as any}>
            {tNA('viewDetails')} <ArrowRight className="ml-1.5 size-3.5" />
          </Link>
        </Button>
      </div>

      {/* More quick wins hint + link */}
      {totalQuickWins > 1 && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <p className="text-xs text-muted-foreground">
            {tNA('moreQuickWins', { count: totalQuickWins - 1 })}
          </p>
          <Link
            href={`/${action.regulationId}/results#quickwins` as any}
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            {tNA('viewAllQuickWins')} <ArrowRight className="size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
