'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Car, ChevronLeft, Shield, Lock, Eye, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const LEVELS = [
  { key: 'al1', color: 'border-l-blue-400 bg-blue-50' },
  { key: 'al2', color: 'border-l-amber-400 bg-amber-50' },
  { key: 'al3', color: 'border-l-red-400 bg-red-50' },
] as const;

const PRUEFZIELE = [
  { key: 'infosec', icon: Shield, color: 'text-blue-500' },
  { key: 'prototype', icon: Eye, color: 'text-violet-500' },
  { key: 'datenschutz', icon: Lock, color: 'text-emerald-500' },
] as const;

const PROTOTYPE_ITEMS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const;
const DATENSCHUTZ_ITEMS = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;
const TIPS = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;

export default function TisaxPruefzielePage() {
  const t = useTranslations('wissenPages.tisaxPruefziele');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20">
            <Car className="size-7 text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Assessment Levels */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">{t('levels.title')}</h2>
          <div className="space-y-3">
            {LEVELS.map(({ key, color }) => (
              <Card key={key} className={`border-l-4 ${color}`}>
                <CardContent className="pt-4">
                  <p className="font-semibold text-sm mb-1">{t(`levels.${key}.title`)}</p>
                  <p className="text-xs text-muted-foreground">{t(`levels.${key}.desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3 Pruefziele */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold">{t('pruefziele.title')}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PRUEFZIELE.map(({ key, icon: Icon, color }) => (
              <Card key={key} className="text-center">
                <CardContent className="pt-6">
                  <Icon className={`mx-auto size-8 mb-3 ${color}`} />
                  <p className="font-bold text-sm mb-1">{t(`pruefziele.${key}.title`)}</p>
                  <p className="text-xs text-muted-foreground">{t(`pruefziele.${key}.desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Prototypenschutz Detail */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <Eye className="size-5 text-violet-500" />
            {t('prototype.title')}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{t('prototype.intro')}</p>
          <div className="rounded-lg border-2 border-violet-200 bg-violet-50 p-5 space-y-2">
            {PROTOTYPE_ITEMS.map((id) => (
              <p key={id} className="flex gap-2 text-sm text-violet-900">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                {t(`prototype.items.${id}`)}
              </p>
            ))}
          </div>
        </section>

        {/* Datenschutz Detail */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <Lock className="size-5 text-emerald-500" />
            {t('datenschutz.title')}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{t('datenschutz.intro')}</p>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {DATENSCHUTZ_ITEMS.map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                {t(`datenschutz.items.${id}`)}
              </p>
            ))}
          </div>
        </section>

        {/* Vorbereitung */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 space-y-2">
            {TIPS.map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {t(`tips.items.${id}`)}
              </p>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="font-bold text-lg mb-2">{t('cta.title')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t('cta.desc')}</p>
          <Link
            href={'/tisax' as any}
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
