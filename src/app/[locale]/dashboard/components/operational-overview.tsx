'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/donut-chart';
import { Map, Coins, BarChart3, ArrowRight } from 'lucide-react';
import type { DashboardData } from '@/lib/dashboard/aggregation';

interface OperationalOverviewProps {
  data: DashboardData;
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE');
}

export function OperationalOverview({ data }: OperationalOverviewProps) {
  const tOp = useTranslations('platform.dashboard.operational');

  // Find first regulation with data for dynamic links
  const firstRegWithData = data.regulations.find((r) => r.hasData);

  const hasRoadmap = data.roadmapSummary.quickWinCount > 0 ||
    data.roadmapSummary.coreCount > 0 ||
    data.roadmapSummary.strategicCount > 0;

  if (!hasRoadmap && !data.costOverview && data.progressOverview.totalRecommendations === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Roadmap — visual timeline */}
        {hasRoadmap && (
          <Card className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <Map className="size-4 text-primary/60" />
                <h3 className="text-sm font-bold">{tOp('roadmap.title')}</h3>
              </div>

              {/* Horizontal timeline */}
              <div className="flex items-start">
                {[
                  {
                    color: 'bg-emerald-500',
                    ringColor: 'ring-emerald-200',
                    label: tOp('roadmap.quickWins'),
                    time: tOp('roadmap.quickWinsTime'),
                    count: data.roadmapSummary.quickWinCount,
                  },
                  {
                    color: 'bg-amber-400',
                    ringColor: 'ring-amber-200',
                    label: tOp('roadmap.core'),
                    time: tOp('roadmap.coreTime'),
                    count: data.roadmapSummary.coreCount,
                  },
                  {
                    color: 'bg-blue-500',
                    ringColor: 'ring-blue-200',
                    label: tOp('roadmap.strategic'),
                    time: tOp('roadmap.strategicTime'),
                    count: data.roadmapSummary.strategicCount,
                  },
                ].map((phase, idx, arr) => (
                  <div key={idx} className="flex items-start flex-1 min-w-0">
                    <div className="flex flex-col items-center flex-shrink-0">
                      {/* Circle */}
                      <div className={`size-8 rounded-full ${phase.color} ring-4 ${phase.ringColor} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{phase.count}</span>
                      </div>
                      {/* Text below */}
                      <p className="text-[11px] font-semibold text-foreground mt-2 text-center leading-tight">
                        {phase.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 text-center">
                        {phase.time}
                      </p>
                    </div>
                    {/* Connector line */}
                    {idx < arr.length - 1 && (
                      <div className="flex-1 flex items-center pt-4 px-1">
                        <div className="h-0.5 w-full bg-gradient-to-r from-slate-200 to-slate-200 rounded-full relative">
                          <ArrowRight className="size-3 text-slate-300 absolute -right-1.5 -top-[5px]" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Total items summary */}
              <p className="text-[11px] text-muted-foreground mt-4 pt-3 border-t border-slate-100 text-center">
                {tOp('roadmap.items', {
                  count: data.roadmapSummary.quickWinCount + data.roadmapSummary.coreCount + data.roadmapSummary.strategicCount,
                })}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Costs */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-5">
              <Coins className="size-4 text-primary/60" />
              <h3 className="text-sm font-bold">{tOp('costs.title')}</h3>
            </div>
            {data.costOverview ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">{tOp('costs.effort')}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {fmt(data.costOverview.totalDays.min)}–{fmt(data.costOverview.totalDays.max)} Personentage
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tOp('costs.external')}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {fmt(data.costOverview.totalEur.min)} – {fmt(data.costOverview.totalEur.max)} &euro;
                  </p>
                </div>
                {data.costOverview.isAdjusted && (
                  <p className="text-[11px] text-emerald-600 font-medium">
                    {tOp('costs.adjusted')}
                  </p>
                )}
              </div>
            ) : hasRoadmap ? (
              <div className="space-y-3">
                <p className="text-xs font-medium text-foreground">{tOp('costs.effortSummary')}</p>
                <div className="space-y-2">
                  {data.roadmapSummary.quickWinCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-muted-foreground">
                        {tOp('costs.effortQuickWins', { count: data.roadmapSummary.quickWinCount })}
                      </span>
                    </div>
                  )}
                  {data.roadmapSummary.coreCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-amber-400" />
                      <span className="text-xs text-muted-foreground">
                        {tOp('costs.effortCore', { count: data.roadmapSummary.coreCount })}
                      </span>
                    </div>
                  )}
                  {data.roadmapSummary.strategicCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-muted-foreground">
                        {tOp('costs.effortStrategic', { count: data.roadmapSummary.strategicCount })}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-slate-100">
                  {tOp('costs.notAvailable')}
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tOp('costs.notAvailable')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="size-4 text-primary/60" />
              <h3 className="text-sm font-bold">{tOp('progress.title')}</h3>
            </div>
            <div className="flex items-center gap-5">
              <DonutChart
                value={data.progressOverview.completionPercent}
                size={64}
                strokeWidth={6}
                label={`${data.progressOverview.completionPercent}%`}
                className="flex-shrink-0"
              />
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">
                  {tOp('progress.completed', {
                    count: data.progressOverview.completed,
                    total: data.progressOverview.totalRecommendations,
                  })}
                </p>
                {data.progressOverview.inProgress > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {tOp('progress.inProgress', { count: data.progressOverview.inProgress })}
                  </p>
                )}
              </div>
            </div>
            {data.completedCount > 0 && (
              <Link
                href={`/${firstRegWithData?.id ?? 'nis2'}/results#progress` as any}
                className="mt-4 flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {tOp('progress.manage')} <ArrowRight className="size-3" />
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

