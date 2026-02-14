'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { getAllPillars } from '@/lib/pillars/registry';
import type { PillarScore } from '@/lib/pillars/scoring';
import type { Pillar } from '@/lib/pillars/types';
import {
  FileText, KeyRound, Database, Server,
  Network, Cloud, Smartphone, ShieldAlert,
  AlertTriangle, ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { scoreStyle } from '@/lib/ui/traffic-light-styles';

const PILLAR_ICONS: Record<string, LucideIcon> = {
  FileText,
  KeyRound,
  Database,
  Server,
  Network,
  Cloud,
  Smartphone,
  ShieldAlert,
};

interface PillarImpactSectionProps {
  regulationId: string;
  pillarScores: PillarScore[];
}

function getTrafficLightStyles(score: number | null) {
  const s = scoreStyle(score);
  return {
    border: s.border,
    bg: s.bg,
    barColor: s.bgSolid,
    text: s.text,
    badge: `${s.bgStrong} ${s.text}`,
  };
}

export function PillarImpactSection({ regulationId, pillarScores }: PillarImpactSectionProps) {
  const t = useTranslations('results.pillarImpact');
  const tPillars = useTranslations('pillars');

  const { affectedPillars, unaffectedPillars, criticalPillars } = useMemo(() => {
    const allPillars = getAllPillars();

    const affected: Array<{ pillar: Pillar; score: PillarScore }> = [];
    const unaffected: Pillar[] = [];

    for (const pillar of allPillars) {
      const isAffected = pillar.components.some((c) =>
        c.regulationIds.includes(regulationId)
      );

      const scoreEntry = pillarScores.find((ps) => ps.pillarId === pillar.id);

      if (isAffected) {
        affected.push({
          pillar,
          score: scoreEntry || {
            pillarId: pillar.id,
            score: null,
            trafficLight: null,
            regulationsWithData: 0,
            regulationsTotal: 0,
          },
        });
      } else {
        unaffected.push(pillar);
      }
    }

    const critical = affected.filter(
      (a) => a.score.score !== null && a.score.score < 40
    );

    return { affectedPillars: affected, unaffectedPillars: unaffected, criticalPillars: critical };
  }, [regulationId, pillarScores]);

  const regulationLabel = regulationId.toUpperCase().replace(/-/g, ' ');

  return (
    <div className="mb-8 rounded-xl border bg-card p-5 sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShieldAlert className="size-5 text-primary" />
          {t('title')}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {affectedPillars.length > 0
            ? t('subtitle', { regulation: regulationLabel, count: affectedPillars.length })
            : t('subtitleNone')}
        </p>
      </div>

      {/* Pillar cards grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {affectedPillars.map(({ pillar, score }) => {
          const Icon = PILLAR_ICONS[pillar.icon] || ShieldAlert;
          const styles = getTrafficLightStyles(score.score);
          const pillarName = tPillars(`${pillar.number}.name`);

          return (
            <div
              key={pillar.id}
              className={`rounded-lg border ${styles.border} ${styles.bg} p-3 transition-shadow hover:shadow-sm`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Icon className={`size-4 ${styles.text}`} />
                <span className="text-sm font-semibold text-foreground truncate">
                  {pillarName}
                </span>
              </div>

              {/* Score bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-bold ${styles.text}`}>
                    {score.score !== null ? `${Math.round(score.score)}%` : t('noData')}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all ${styles.barColor}`}
                    style={{ width: `${score.score ?? 0}%` }}
                  />
                </div>
              </div>

              {/* Regulation count badge */}
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}>
                {t('regsAssessed', {
                  count: score.regulationsWithData,
                  total: score.regulationsTotal,
                })}
              </span>
            </div>
          );
        })}

        {/* Unaffected pillars - muted */}
        {unaffectedPillars.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar.icon] || ShieldAlert;
          const pillarName = tPillars(`${pillar.number}.name`);

          return (
            <div
              key={pillar.id}
              className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-3 opacity-60"
            >
              <div className="mb-2 flex items-center gap-2">
                <Icon className="size-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-400 truncate">
                  {pillarName}
                </span>
              </div>
              <p className="text-xs text-slate-400">{t('notAffected')}</p>
            </div>
          );
        })}
      </div>

      {/* Critical warning */}
      {criticalPillars.length > 0 && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">
            {t('criticalWarning', {
              pillars: criticalPillars
                .map((cp) => tPillars(`${cp.pillar.number}.name`))
                .join(', '),
            })}
          </p>
        </div>
      )}

      {/* Link to Wissen */}
      <div className="mt-4 text-right">
        <Link
          href="/wissen"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {t('detailLink')}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
