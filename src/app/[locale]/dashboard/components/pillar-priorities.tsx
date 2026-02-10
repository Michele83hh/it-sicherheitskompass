'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert } from 'lucide-react';
import type { Pillar } from '@/lib/pillars/types';
import type { PillarScore } from '@/lib/pillars/scoring';
import type { DashboardData } from '@/lib/dashboard/aggregation';

interface PillarPrioritiesProps {
  data: DashboardData;
}

const PILLAR_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert,
};

function getBarColor(score: number | null): string {
  if (score === null) return 'bg-slate-200';
  if (score < 40) return 'bg-red-500';
  if (score < 70) return 'bg-amber-400';
  return 'bg-emerald-500';
}

function getScoreColor(score: number | null): string {
  if (score === null) return 'text-slate-400';
  if (score < 40) return 'text-red-600';
  if (score < 70) return 'text-amber-600';
  return 'text-emerald-600';
}

export function PillarPriorities({ data }: PillarPrioritiesProps) {
  const t = useTranslations();
  const tPG = useTranslations('platform.dashboard.pillarGroups');

  const { critical, inProgress, stable, noData } = data.pillarGroups;

  // Build flat sorted list: critical first, then inProgress, then stable, then noData
  const allItems = [
    ...critical.map((item) => ({ ...item, group: 'critical' as const })),
    ...inProgress.map((item) => ({ ...item, group: 'inProgress' as const })),
    ...stable.map((item) => ({ ...item, group: 'stable' as const })),
    ...noData.map((item) => ({ ...item, group: 'noData' as const })),
  ];

  // Determine which group separators to show
  const criticalEnd = critical.length;
  const inProgressEnd = criticalEnd + inProgress.length;
  const stableEnd = inProgressEnd + stable.length;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-foreground mb-4">
        {t('platform.dashboard.pillarPriorities.title')}
      </h2>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex-1">
        {allItems.map(({ pillar, score, group }, idx) => {
          const scoreValue = score.score;
          const barColor = getBarColor(scoreValue);
          const scoreColor = getScoreColor(scoreValue);

          // Show group header before first item of each group
          let groupHeader: React.ReactNode = null;
          if (idx === 0 && critical.length > 0) {
            groupHeader = (
              <div className="px-5 pt-4 pb-2 bg-red-50/50 border-b border-red-100">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  {tPG('critical')}
                </span>
              </div>
            );
          } else if (idx === criticalEnd && inProgress.length > 0) {
            groupHeader = (
              <div className="px-5 pt-4 pb-2 border-t border-slate-100">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  {tPG('inProgress')}
                </span>
              </div>
            );
          } else if (idx === inProgressEnd && stable.length > 0) {
            groupHeader = (
              <div className="px-5 pt-4 pb-2 border-t border-slate-100">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  {tPG('stable')}
                </span>
              </div>
            );
          } else if (idx === stableEnd && noData.length > 0) {
            groupHeader = (
              <div className="px-5 pt-4 pb-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {tPG('noData')}
                </span>
              </div>
            );
          }

          const isCritical = group === 'critical';

          return (
            <div key={pillar.id}>
              {groupHeader}
              <Link
                href={`/wissen/${pillar.id}` as any}
                className={`flex items-center gap-3 px-5 py-3 group hover:bg-muted/50 transition-colors cursor-pointer rounded-lg ${
                  isCritical ? 'bg-red-50/30' : ''
                }`}
              >
                {/* Number */}
                <span className={`text-sm font-bold min-w-[1.5rem] text-center tabular-nums ${
                  isCritical ? 'text-red-500' : 'text-slate-400'
                }`}>
                  {pillar.number}
                </span>

                {/* Name + Bar */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground block truncate">
                    {t(pillar.nameKey)}
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                        style={{ width: scoreValue !== null ? `${scoreValue}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Score */}
                <span className={`text-sm font-bold min-w-[3rem] text-right tabular-nums ${scoreColor}`}>
                  {scoreValue !== null ? `${Math.round(scoreValue)}%` : '–'}
                </span>

                {/* Arrow */}
                <span className="flex-shrink-0 p-1 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-primary">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
