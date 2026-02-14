'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Circle, ChevronDown, Zap } from 'lucide-react';
import type { DashboardData, RegulationStatus } from '@/lib/dashboard/aggregation';
import { scoreBadge } from '@/lib/ui/traffic-light-styles';

interface RegulationsOverviewProps {
  data: DashboardData;
}

export function RegulationsOverview({ data }: RegulationsOverviewProps) {
  const t = useTranslations();
  const tDash = useTranslations('platform.dashboard');
  const tReg = useTranslations('platform.dashboard.regulationsV2');

  const [showInactive, setShowInactive] = useState(false);

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

  function isRelevantReg(regId: string): boolean {
    const relevance = getRegRelevance(regId);
    return relevance === null || relevance === 'high' || relevance === 'medium';
  }

  function getRegCta(status: RegulationStatus): { label: string; href: string; variant: 'default' | 'outline' | 'ghost' } {
    const relevant = isRelevantReg(status.id);

    // Has assessment data → show results (even if Vertiefung/advanced still pending)
    if (status.hasData && status.score !== null) {
      return { label: tDash('viewResults'), href: `/${status.id}/results`, variant: 'outline' };
    }
    if (status.quickCheck.hasData && !status.quickCheck.completed) {
      return { label: tDash('continueQuickCheck'), href: `/${status.id}/schnellcheck`, variant: 'outline' };
    }
    if (status.quickCheck.completed) {
      return { label: tDash('startFullCheck'), href: `/${status.id}/assessment`, variant: 'default' };
    }
    if (!relevant) {
      return { label: tDash('checkAnyway'), href: `/${status.id}/schnellcheck`, variant: 'ghost' };
    }
    return { label: tDash('startCheck'), href: `/${status.id}/schnellcheck`, variant: 'default' };
  }

  // Split into active (relevant or has data or has quick-check) and inactive
  const hasAnyData = (s: RegulationStatus) => s.hasData || s.quickCheck.hasData;
  const activeStatuses = displayStatuses.filter(s => isRelevantReg(s.id) || hasAnyData(s));
  const inactiveStatuses = displayStatuses.filter(s => !isRelevantReg(s.id) && !hasAnyData(s));

  function renderRow(status: RegulationStatus, idx: number, dimmed: boolean) {
    const Icon = status.icon;
    const cta = getRegCta(status);
    const isComplete = status.answeredQuestions >= status.totalQuestions && status.hasData;

    return (
      <div
        key={status.id}
        className={`flex items-center gap-4 px-5 py-4 ${
          idx > 0 ? 'border-t border-slate-100' : ''
        } ${dimmed ? 'opacity-50' : ''}`}
      >
        <Icon className={`size-5 text-${status.color}-500 flex-shrink-0`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">
              {t(`${status.tKey}.name`)}
            </span>

            {status.score !== null && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreBadge(status.score)}`}>
                {status.score}%
              </span>
            )}

            {status.quickCheck.hasData && status.score === null && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${scoreBadge(status.quickCheck.score)}`}>
                <Zap className="size-3" />
                {status.quickCheck.score}%
              </span>
            )}

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

          {!status.hasData && !dimmed && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {status.quickCheck.completed
                ? tDash('quickCheckDone')
                : status.quickCheck.hasData
                  ? tDash('quickCheckInProgress')
                  : tDash('notStarted')}
            </p>
          )}
        </div>

        <Button variant={cta.variant} size="sm" asChild className="flex-shrink-0">
          <Link href={cta.href as any}>
            {cta.label} <ArrowRight className="ml-1 size-3" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-foreground mb-4">{tDash('regulationsTitle')}</h2>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex-1">
        {/* Active regulations — always visible */}
        {activeStatuses.map((status, idx) => renderRow(status, idx, false))}

        {/* Inactive regulations — collapsible */}
        {inactiveStatuses.length > 0 && (
          <>
            <button
              onClick={() => setShowInactive(prev => !prev)}
              className="flex items-center justify-between w-full px-5 py-3 border-t border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors text-left"
            >
              <span className="text-xs font-medium text-muted-foreground">
                {tDash('inactiveRegs', { count: inactiveStatuses.length })}
              </span>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform duration-200 ${showInactive ? 'rotate-180' : ''}`}
              />
            </button>
            {showInactive && inactiveStatuses.map((status, idx) => renderRow(status, idx, true))}
          </>
        )}
      </div>
    </div>
  );
}
