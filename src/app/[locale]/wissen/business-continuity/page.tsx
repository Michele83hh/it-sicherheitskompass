'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import {
  LifeBuoy,
  ChevronLeft,
  AlertTriangle,
  Target,
  ClipboardCheck,
  Shield,
  Building2,
  RefreshCw,
  ArrowRight,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const WHY_IDS = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;

const COMPONENTS = [
  { key: 'bia', icon: Target, color: 'border-l-blue-500' },
  { key: 'risk', icon: AlertTriangle, color: 'border-l-amber-500' },
  { key: 'plans', icon: ClipboardCheck, color: 'border-l-emerald-500' },
  { key: 'crisis', icon: Shield, color: 'border-l-red-500' },
  { key: 'testing', icon: RefreshCw, color: 'border-l-violet-500' },
] as const;

const LEGAL_REGS = ['nis2', 'kritis', 'dora', 'iso22301', 'bsiGrundschutz'] as const;

const QUICK_START = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'] as const;

const TIPS = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;

export default function BusinessContinuityPage() {
  const t = useTranslations('wissenPages.businessContinuity');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/20">
            <LifeBuoy className="size-7 text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Warum BCM? */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            {t('why.title')}
          </h2>
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5 space-y-2">
            {WHY_IDS.map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {t(`why.items.${id}`)}
              </p>
            ))}
          </div>
        </section>

        {/* Kernkomponenten */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            {t('components.title')}
          </h2>
          <div className="space-y-4">
            {COMPONENTS.map(({ key, icon: Icon, color }) => (
              <Card key={key} className={`border-l-4 ${color}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-sm mb-1">{t(`components.${key}.title`)}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t(`components.${key}.desc`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rechtsgrundlagen */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <Scale className="size-5 text-primary" />
            {t('legal.title')}
          </h2>
          <div className="rounded-md bg-muted/50 p-4 space-y-2 text-sm">
            {LEGAL_REGS.map((reg) => (
              <p key={reg}>
                <span className="font-medium">{t(`legal.${reg}.name`)}:</span>{' '}
                <span className="text-muted-foreground">{t(`legal.${reg}.requirement`)}</span>
              </p>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <ClipboardCheck className="size-5 text-emerald-500" />
            {t('quickStart.title')}
          </h2>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-3">
            {QUICK_START.map((id, idx) => (
              <div key={id} className="flex gap-3 text-sm">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <span className="pt-0.5">{t(`quickStart.items.${id}`)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tipps */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {TIPS.map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                {t(`tips.items.${id}`)}
              </p>
            ))}
          </div>
        </section>

        {/* CTA to ISO 22301 Assessment */}
        <section className="mb-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="font-bold text-lg mb-2">{t('cta.title')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t('cta.desc')}</p>
          <Link
            href={'/iso22301' as any}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {t('cta.button')}
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
