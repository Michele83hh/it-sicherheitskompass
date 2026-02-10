'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert,
  AlertTriangle, Scale, Wrench, TrendingUp, ArrowRight, ChevronLeft,
} from 'lucide-react';
import type { PillarComponent, Pillar } from '@/lib/pillars/types';
import { LegalReferenceTable } from './legal-reference-table';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert,
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; lightBg: string }> = {
  blue: { bg: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-200', lightBg: 'bg-blue-50' },
  violet: { bg: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-200', lightBg: 'bg-violet-50' },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-200', lightBg: 'bg-emerald-50' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-700', border: 'border-orange-200', lightBg: 'bg-orange-50' },
  cyan: { bg: 'bg-cyan-600', text: 'text-cyan-700', border: 'border-cyan-200', lightBg: 'bg-cyan-50' },
  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-700', border: 'border-indigo-200', lightBg: 'bg-indigo-50' },
  rose: { bg: 'bg-rose-600', text: 'text-rose-700', border: 'border-rose-200', lightBg: 'bg-rose-50' },
  red: { bg: 'bg-red-600', text: 'text-red-700', border: 'border-red-200', lightBg: 'bg-red-50' },
};

interface ComponentPageProps {
  component: PillarComponent;
  pillar: Pillar;
  children?: React.ReactNode; // For interactive features (timer, diagram)
}

export function ComponentPage({ component, pillar, children }: ComponentPageProps) {
  const t = useTranslations();
  const Icon = ICON_MAP[pillar.icon] || FileText;
  const colors = COLOR_MAP[pillar.color] || COLOR_MAP.blue;

  // Get other components in this pillar (for related section)
  const relatedComponents = pillar.components.filter(c => c.id !== component.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href={`/wissen/${pillar.id}` as any}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t(pillar.nameKey)}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.lightBg} border ${colors.border}`}>
            <Icon className={`size-5 ${colors.text}`} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold ${colors.text} ${colors.lightBg} px-2 py-0.5 rounded-full border ${colors.border}`}>
              {t('pillars.pillarLabel', { number: pillar.number })}
            </span>
            {component.regulationIds.map(regId => (
              <span key={regId} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {regId.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t(component.nameKey)}
        </h1>
      </div>

      {/* Scenario Box */}
      <section className="mb-8">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-semibold text-amber-800 mb-2">
                {t('pillars.sections.scenario')}
              </h2>
              <p className="text-sm text-amber-900 leading-relaxed whitespace-pre-line">
                {t(component.scenarioKey)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal References */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="size-5 text-foreground" />
          <h2 className="text-lg font-bold text-foreground">
            {t('pillars.sections.legalBasis')}
          </h2>
        </div>
        <LegalReferenceTable
          references={component.legalReferences}
        />
      </section>

      {/* Interactive Feature (if any) */}
      {children && (
        <section className="mb-8">
          {children}
        </section>
      )}

      {/* Solution */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="size-5 text-foreground" />
          <h2 className="text-lg font-bold text-foreground">
            {t('pillars.sections.solution')}
          </h2>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {t(component.solutionKey)}
          </div>
        </div>
      </section>

      {/* Benefit */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="size-5 text-foreground" />
          <h2 className="text-lg font-bold text-foreground">
            {t('pillars.sections.benefit')}
          </h2>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm text-emerald-900 leading-relaxed whitespace-pre-line">
            {t(component.benefitKey)}
          </p>
        </div>
      </section>

      {/* Next Step */}
      <section className="mb-8">
        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">
            {t('pillars.sections.nextStep')}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t(component.nextStepKey)}
          </p>
        </div>
      </section>

      {/* Related Components */}
      {relatedComponents.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            {t('pillars.sections.relatedComponents')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedComponents.map(related => (
              <Link
                key={related.id}
                href={`/wissen/${pillar.id}/${related.id}` as any}
                className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors group"
              >
                <Icon className={`size-4 ${colors.text}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium group-hover:underline">{t(related.nameKey)}</p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
