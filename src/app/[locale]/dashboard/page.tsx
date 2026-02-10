'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Layers, Zap } from 'lucide-react';
import { getAllPillars } from '@/lib/pillars/registry';
import '@/lib/regulations/init';
import '@/lib/pillars/init';
import { aggregateDashboardData, type DashboardData } from '@/lib/dashboard/aggregation';

import { CommandCenterHero } from './components/command-center-hero';
import { NextBestAction } from './components/next-best-action';
import { RegulationsOverview } from './components/regulations-overview';
import { PillarPriorities } from './components/pillar-priorities';
import { OperationalOverview } from './components/operational-overview';
import { QuickActions } from './components/quick-actions';

export default function DashboardPage() {
  const tDash = useTranslations('platform.dashboard');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);

  const pillars = getAllPillars();

  useEffect(() => {
    setIsClient(true);
    setData(aggregateDashboardData(pillars));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isClient || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-0">
      {/* Zone 1: Command Center Hero */}
      <CommandCenterHero data={data} />

      {/* Zone 2: Next Best Action */}
      <NextBestAction data={data} />

      {/* Universal Quick Wins — only when no assessments done yet */}
      {data.completedCount === 0 && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="size-5 text-amber-500" />
            <h2 className="text-lg font-bold">{tDash('universalQuickWins.title')}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{tDash('universalQuickWins.subtitle')}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {(['mfa', 'backup', 'policy'] as const).map((key) => (
              <div key={key} className="rounded-lg border bg-slate-50 p-4">
                <p className="text-sm font-semibold mb-1">{tDash(`universalQuickWins.${key}.title`)}</p>
                <p className="text-xs text-muted-foreground">{tDash(`universalQuickWins.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zone 3 + 4: Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-5 mb-8">
        <div className="lg:col-span-3">
          <RegulationsOverview data={data} />
        </div>
        <div className="lg:col-span-2">
          <PillarPriorities data={data} />
        </div>
      </div>

      {/* Zone 5: Operational Overview */}
      <OperationalOverview data={data} />

      {/* Zone 6: Quick Actions + Synergies */}
      <QuickActions data={data} />

      {/* Synergies Hint (when < 2 regs completed) */}
      {data.completedCount < 2 && (
        <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-4">
          <Layers className="size-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-foreground">{tDash('synergiesHintTitle')}</p>
            <p className="text-xs text-muted-foreground mt-1">{tDash('synergiesHintDesc')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
