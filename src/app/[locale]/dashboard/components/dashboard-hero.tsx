'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { DonutChart } from '@/components/ui/donut-chart';
import { ArrowRight, Compass } from 'lucide-react';
import type { RegulationId } from '@/lib/regulations/types';

interface NavigatorResults {
  industry: string;
  companySize: string;
  results: Array<{ id: string; relevance: string; score: number; reasonKey: string }>;
  completedAt: string;
}

interface RegulationStatus {
  id: RegulationId;
  tKey: string;
  hasData: boolean;
  answeredQuestions: number;
  totalQuestions: number;
  score: number | null;
}

interface DashboardHeroProps {
  statuses: RegulationStatus[];
  navigatorData: NavigatorResults | null;
  pillarAssessedCount: number;
}

export function DashboardHero({ statuses, navigatorData, pillarAssessedCount }: DashboardHeroProps) {
  const t = useTranslations();
  const tHero = useTranslations('platform.dashboard.hero');

  const completedRegs = statuses.filter((s) => s.hasData && s.answeredQuestions >= s.totalQuestions);
  const regsWithData = statuses.filter((s) => s.hasData);
  const avgScore = regsWithData.length > 0
    ? Math.round(regsWithData.reduce((sum, s) => sum + (s.score || 0), 0) / regsWithData.length)
    : 0;

  const hasAnyData = regsWithData.length > 0;

  const relevantCount = navigatorData
    ? navigatorData.results.filter((r) => r.relevance === 'high' || r.relevance === 'medium').length
    : 0;

  return (
    <div className="rounded-xl bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-8 sm:px-8 mb-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        {/* Donut */}
        <div className="flex-shrink-0">
          <DonutChart
            value={hasAnyData ? avgScore : 0}
            size={160}
            strokeWidth={14}
            trackColor="rgba(255,255,255,0.1)"
            sublabel={hasAnyData ? tHero('metricsAvgScore') : undefined}
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white">{tHero('title')}</h1>
          <p className="mt-1 text-sm text-slate-400">{tHero('subtitle')}</p>

          {/* Metrics */}
          {hasAnyData ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard
                value={`${completedRegs.length}/${statuses.length}`}
                label={tHero('metricsRegulations')}
                sublabel={tHero('metricsCompleted')}
              />
              <MetricCard
                value={`${pillarAssessedCount}/8`}
                label={tHero('metricsPillars')}
              />
              <MetricCard
                value={`${avgScore}%`}
                label={tHero('metricsAvgScore')}
                valueColor={avgScore >= 70 ? 'text-emerald-400' : avgScore >= 40 ? 'text-amber-400' : 'text-red-400'}
              />
              <MetricCard
                value={`${regsWithData.length}`}
                label={tHero('metricsRegulations')}
                sublabel={t('platform.dashboard.nextSteps.overallProgress')}
              />
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-slate-300">{tHero('noData')}</p>
              <Button className="mt-3" size="sm" asChild>
                <Link href={navigatorData ? '/nis2/schnellcheck' : '/navigator'}>
                  {navigatorData ? tHero('noDataCta') : t('platform.dashboard.noProfileCta')}{' '}
                  <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
          )}

          {/* Profile bar */}
          {navigatorData && (
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-white/5 px-4 py-2 text-xs text-slate-300">
              <Compass className="size-3.5 text-slate-400" />
              <span>{t(`platform.navigator.industries.${navigatorData.industry}`)}</span>
              <span className="text-slate-600">·</span>
              <span>{t(`platform.navigator.steps.size.${navigatorData.companySize}`)}</span>
              <span className="text-slate-600">·</span>
              <span>{tHero('profileRelevant', { count: relevantCount })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  value,
  label,
  sublabel,
  valueColor = 'text-white',
}: {
  value: string;
  label: string;
  sublabel?: string;
  valueColor?: string;
}) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <p className={`text-lg font-bold ${valueColor}`}>{value}</p>
      <p className="text-xs text-slate-400 leading-tight">{label}</p>
      {sublabel && <p className="text-[10px] text-slate-500">{sublabel}</p>}
    </div>
  );
}
