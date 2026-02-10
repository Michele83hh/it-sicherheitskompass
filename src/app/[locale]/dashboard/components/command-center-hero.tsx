'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { DonutChart } from '@/components/ui/donut-chart';
import { ArrowRight, Compass, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { DashboardData } from '@/lib/dashboard/aggregation';

interface CommandCenterHeroProps {
  data: DashboardData;
}

export function CommandCenterHero({ data }: CommandCenterHeroProps) {
  const t = useTranslations();
  const tCC = useTranslations('platform.dashboard.commandCenter');

  const hasAnyData = data.completedCount > 0;

  // Find critical gap (lowest score regulation with data)
  const regsWithScores = [...data.regulations]
    .filter((r) => r.hasData && r.score !== null)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
  const criticalGap = regsWithScores[0] ?? null;

  const formatTrendDate = (iso: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    } catch { return iso; }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-primary/[0.04] px-8 py-10 mb-8 shadow-sm">
      {hasAnyData ? (
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
          {/* Left: Donut */}
          <div className="flex flex-col items-center flex-shrink-0">
            <DonutChart
              value={data.overallScore}
              size={180}
              strokeWidth={14}
              trackColor="rgba(0,0,0,0.06)"
            />
            {/* Trend */}
            <div className="mt-3 flex items-center gap-1.5">
              {data.trend.direction === 'up' && (
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                  <TrendingUp className="size-3.5" />
                  {tCC('trend.up', { delta: Math.abs(data.trend.delta), date: formatTrendDate(data.trend.comparedTo) })}
                </span>
              )}
              {data.trend.direction === 'down' && (
                <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
                  <TrendingDown className="size-3.5" />
                  {tCC('trend.down', { delta: data.trend.delta, date: formatTrendDate(data.trend.comparedTo) })}
                </span>
              )}
              {data.trend.direction === 'stable' && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Minus className="size-3.5" />
                  {tCC('trend.stable', { date: formatTrendDate(data.trend.comparedTo) })}
                </span>
              )}
              {data.trend.direction === 'new' && (
                <span className="text-xs text-slate-400">{tCC('trend.new')}</span>
              )}
            </div>
          </div>

          {/* Middle: Context */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            {/* Security Level — prominent */}
            <div>
              <span className={`inline-block text-base font-semibold px-4 py-1.5 rounded-full ${
                data.securityLevel === 'elevated' || data.securityLevel === 'standard'
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                  : data.securityLevel === 'building' || data.securityLevel === 'partial'
                  ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                  : 'bg-red-50 text-red-700 ring-1 ring-red-200'
              }`}>
                {tCC(`securityLevel.${data.securityLevel}`)}
              </span>
            </div>

            {/* Context lines */}
            <div className="space-y-1">
              <p className="text-sm text-slate-600">
                {tCC('regulationsAnalyzed', {
                  completed: data.completedCount,
                  total: data.totalRelevant,
                })}
              </p>
              {criticalGap && criticalGap.score !== null && criticalGap.score < 70 && (
                <p className="text-sm text-red-600/80">
                  {tCC('criticalGap', {
                    regulation: t(`${criticalGap.tKey}.name`),
                    score: criticalGap.score,
                  })}
                </p>
              )}
            </div>

            {/* Key Metrics — 3 clean cards */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                <p className={`text-2xl font-bold tabular-nums ${
                  data.overallScore >= 70 ? 'text-emerald-600' :
                  data.overallScore >= 40 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {data.overallScore}%
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{tCC('maturityLevel')}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-foreground tabular-nums">
                  {data.progressOverview.completionPercent}%
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{tCC('implementationRate')}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-foreground tabular-nums">
                  {data.completedCount}<span className="text-base text-slate-400">/{data.totalRelevant}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{tCC('regulationsLabel')}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
          <DonutChart
            value={0}
            size={160}
            strokeWidth={14}
            trackColor="rgba(0,0,0,0.06)"
            label="0%"
            sublabel={tCC('maturityLevel')}
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-foreground">{t('platform.dashboard.hero.title')}</h1>
            {data.navigatorData ? (
              <>
                <p className="mt-2 text-slate-600 font-medium">
                  {tCC('relevantCount', { count: data.totalRelevant })}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {tCC('startWithMostImportant')}
                </p>
              </>
            ) : (
              <p className="mt-2 text-slate-500">{t('platform.dashboard.hero.noData')}</p>
            )}
            <Button className="mt-5" size="lg" asChild>
              <Link href={data.navigatorData ? `/${data.navigatorData.results?.find(r => r.relevance === 'high')?.id ?? 'nis2'}/schnellcheck` : '/navigator'}>
                {data.navigatorData
                  ? t('platform.dashboard.hero.noDataCta')
                  : t('platform.dashboard.noProfileCta')
                }
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Profile bar */}
      {data.navigatorData && hasAnyData && (
        <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 rounded-lg bg-slate-50 border border-slate-100 px-4 py-2.5 text-xs text-slate-500">
          <Compass className="size-3.5" />
          <span>{t(`platform.navigator.industries.${data.navigatorData.industry}`)}</span>
          <span className="text-slate-300">&middot;</span>
          <span>{t(`platform.navigator.steps.size.${data.navigatorData.companySize}`)}</span>
        </div>
      )}
    </div>
  );
}
