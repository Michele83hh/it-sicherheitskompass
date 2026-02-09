'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Compass,
  Shield,
  Lock,
  Building2,
  Landmark,
  Car,
  Cpu,
  BookOpen,
  ArrowRight,
  Layers,
  FileText,
  KeyRound,
  Database,
  Server,
  Network,
  Cloud,
  Smartphone,
  ShieldAlert,
  User,
} from 'lucide-react';
import { findSynergies, type OverlapMapping } from '@/lib/regulations/overlaps';
import { getRegulation } from '@/lib/regulations/registry';
import { getAllPillars } from '@/lib/pillars/registry';
import '@/lib/regulations/init';
import '@/lib/pillars/init';
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
  icon: typeof Shield;
  color: string;
  hasData: boolean;
  answeredQuestions: number;
  totalQuestions: number;
  score: number | null;
}

const REG_META: { id: RegulationId; tKey: string; icon: typeof Shield; color: string; storageKey: string }[] = [
  { id: 'nis2', tKey: 'nis2', icon: Shield, color: 'blue', storageKey: 'nis2-gap-analysis-storage' },
  { id: 'dsgvo', tKey: 'dsgvo', icon: Lock, color: 'emerald', storageKey: 'dsgvo-assessment-storage' },
  { id: 'kritis', tKey: 'kritis', icon: Building2, color: 'red', storageKey: 'kritis-assessment-storage' },
  { id: 'dora', tKey: 'dora', icon: Landmark, color: 'amber', storageKey: 'dora-assessment-storage' },
  { id: 'tisax', tKey: 'tisax', icon: Car, color: 'violet', storageKey: 'tisax-assessment-storage' },
  { id: 'cra', tKey: 'cra', icon: Cpu, color: 'cyan', storageKey: 'cra-assessment-storage' },
  { id: 'bsi-grundschutz', tKey: 'bsiGrundschutz', icon: BookOpen, color: 'slate', storageKey: 'bsi-grundschutz-assessment-storage' },
];

const PILLAR_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert,
};

const PILLAR_COLOR_MAP: Record<string, { bg: string; text: string }> = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700' },
  violet:  { bg: 'bg-violet-50',  text: 'text-violet-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  orange:  { bg: 'bg-orange-50',  text: 'text-orange-700' },
  cyan:    { bg: 'bg-cyan-50',    text: 'text-cyan-700' },
  indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-700' },
  rose:    { bg: 'bg-rose-50',    text: 'text-rose-700' },
  red:     { bg: 'bg-red-50',     text: 'text-red-700' },
};

const SIZE_LABELS_DE: Record<string, string> = {
  small: 'Kleinunternehmen',
  medium: 'Mittleres Unternehmen',
  large: 'Großunternehmen',
};

export default function DashboardPage() {
  const t = useTranslations();
  const tDash = useTranslations('platform.dashboard');
  const [isClient, setIsClient] = useState(false);
  const [statuses, setStatuses] = useState<RegulationStatus[]>([]);
  const [synergies, setSynergies] = useState<OverlapMapping[]>([]);
  const [navigatorData, setNavigatorData] = useState<NavigatorResults | null>(null);

  const pillars = getAllPillars();

  useEffect(() => {
    setIsClient(true);

    // Load navigator results
    try {
      const navRaw = localStorage.getItem('navigator-results-storage');
      if (navRaw) {
        setNavigatorData(JSON.parse(navRaw));
      }
    } catch {
      // ignore
    }

    // Load regulation statuses
    const results: RegulationStatus[] = REG_META.map((reg) => {
      try {
        const raw = localStorage.getItem(reg.storageKey);
        if (raw) {
          const data = JSON.parse(raw);
          const state = data.state || data;
          const answers = state.answers || [];
          return {
            id: reg.id,
            tKey: reg.tKey,
            icon: reg.icon,
            color: reg.color,
            hasData: answers.length > 0,
            answeredQuestions: answers.length,
            totalQuestions: getRegulation(reg.id)?.questions.length ?? 50,
            score: answers.length > 0 ? Math.round((answers.reduce((s: number, a: { level: number }) => s + (a.level / 3) * 100, 0)) / answers.length) : null,
          };
        }
      } catch {
        // ignore
      }
      return {
        id: reg.id,
        tKey: reg.tKey,
        icon: reg.icon,
        color: reg.color,
        hasData: false,
        answeredQuestions: 0,
        totalQuestions: getRegulation(reg.id)?.questions.length ?? 50,
        score: null,
      };
    });

    setStatuses(results);

    const completedIds = results.filter((r) => r.hasData).map((r) => r.id);
    if (completedIds.length >= 2) {
      setSynergies(findSynergies(completedIds));
    }
  }, []);

  if (!isClient) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-lg bg-slate-100" />
      </div>
    );
  }

  // Determine which regulations to show (from navigator data or all)
  const relevantRegIds = navigatorData
    ? navigatorData.results
        .filter((r) => r.relevance === 'high' || r.relevance === 'medium')
        .map((r) => r.id)
    : null;

  const displayStatuses = relevantRegIds
    ? [...statuses].sort((a, b) => {
        const aIdx = relevantRegIds.indexOf(a.id);
        const bIdx = relevantRegIds.indexOf(b.id);
        if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
        if (aIdx >= 0) return -1;
        if (bIdx >= 0) return 1;
        return 0;
      })
    : statuses;

  const completedCount = statuses.filter((s) => s.hasData).length;

  function getIndustryLabel(industry: string): string {
    try {
      return t(`platform.navigator.industries.${industry}`);
    } catch {
      return industry;
    }
  }

  function getSizeLabel(size: string): string {
    try {
      return t(`platform.navigator.steps.size.${size}`);
    } catch {
      return SIZE_LABELS_DE[size] || size;
    }
  }

  function getRegCta(status: RegulationStatus): { label: string; href: string } {
    if (status.score !== null && status.answeredQuestions >= status.totalQuestions) {
      return { label: tDash('viewResults'), href: `/${status.id}/results` };
    }
    if (status.hasData) {
      return { label: tDash('continueCheck'), href: `/${status.id}/assessment` };
    }
    return { label: tDash('startCheck'), href: `/${status.id}/schnellcheck` };
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* ── Section A: Firmenprofil ── */}
      {navigatorData ? (
        <div className="mb-8 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-5 py-3">
          <User className="size-5 text-slate-500 flex-shrink-0" />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold text-foreground">{tDash('profileLabel')}:</span>
            <span className="text-muted-foreground">{getIndustryLabel(navigatorData.industry)}</span>
            <span className="text-slate-300">·</span>
            <span className="text-muted-foreground">{getSizeLabel(navigatorData.companySize)}</span>
            <span className="text-slate-300">·</span>
            <span className="text-muted-foreground">
              {navigatorData.results.filter(r => r.relevance === 'high' || r.relevance === 'medium').length} {t('platform.hub.trustBar.regulations').toLowerCase().includes('regel') ? 'Regelwerke relevant' : 'regulations relevant'}
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-8 flex items-center gap-4 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-4">
          <Compass className="size-6 text-slate-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{tDash('noProfile')}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/navigator">
              {tDash('noProfileCta')} <ArrowRight className="ml-1 size-3" />
            </Link>
          </Button>
        </div>
      )}

      {/* ── Section B: 8 Säulen ── */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          {tDash('pillarsTitle')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = PILLAR_ICON_MAP[pillar.icon] || FileText;
            const c = PILLAR_COLOR_MAP[pillar.color] || PILLAR_COLOR_MAP.blue;
            return (
              <Link
                key={pillar.id}
                href={`/wissen/${pillar.id}` as any}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                  <Icon className={`size-5 ${c.text}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    <span className="text-muted-foreground font-normal">{pillar.number}.</span>{' '}
                    {t(pillar.nameKey)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('pillars.componentCount', { count: pillar.components.length })}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Section C: Regelwerke Status ── */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          {tDash('regulationsTitle')}
        </h2>
        <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
          {displayStatuses.map((status) => {
            const Icon = status.icon;
            const cta = getRegCta(status);
            const progressPct = status.hasData ? Math.min((status.answeredQuestions / status.totalQuestions) * 100, 100) : 0;

            return (
              <div key={status.id} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                <Icon className={`size-5 text-${status.color}-600 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{t(`${status.tKey}.name`)}</span>
                    {status.score !== null && (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        status.score >= 70 ? 'bg-emerald-100 text-emerald-700' :
                        status.score >= 40 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {status.score}%
                      </span>
                    )}
                  </div>
                  {status.hasData ? (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 flex-1 max-w-[120px] rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-slate-400"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {status.answeredQuestions}/{status.totalQuestions}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-0.5">{tDash('notStarted')}</p>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild className="flex-shrink-0">
                  <Link href={cta.href as any}>
                    {cta.label} <ArrowRight className="ml-1 size-3" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section D: Synergies ── */}
      {synergies.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="size-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">{tDash('synergiesTitle')}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {synergies.slice(0, 4).map((syn) => (
              <Card key={`${syn.regA}-${syn.regB}`} className="border-slate-200">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{t(`${syn.regA === 'bsi-grundschutz' ? 'bsiGrundschutz' : syn.regA}.name`)}</span>
                      <span className="text-muted-foreground text-xs">&amp;</span>
                      <span className="font-semibold text-sm">{t(`${syn.regB === 'bsi-grundschutz' ? 'bsiGrundschutz' : syn.regB}.name`)}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {syn.overlapPercent}% {tDash('overlap')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(syn.descriptionKey)}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {syn.sharedMeasureKeys.map((key) => (
                      <span key={key} className="text-xs bg-slate-50 text-foreground px-2 py-0.5 rounded border border-slate-200">
                        {t(key)}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Synergies Hint (when < 2 regulations started) */}
      {completedCount < 2 && (
        <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
          <Layers className="size-6 text-slate-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-foreground">{tDash('synergiesHintTitle')}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {tDash('synergiesHintDesc')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
