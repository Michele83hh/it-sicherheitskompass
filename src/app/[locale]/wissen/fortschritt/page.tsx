'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { TrendingUp, ChevronLeft, BarChart3, Target, RefreshCw, Calendar, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const MATURITY_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
];

const PDCA_ITEMS = [
  { key: 'plan', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
  { key: 'do', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  { key: 'check', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50' },
  { key: 'act', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
] as const;

const QUARTER_COLORS = [
  'border-l-blue-500',
  'border-l-emerald-500',
  'border-l-amber-500',
  'border-l-violet-500',
];

export default function FortschrittPage() {
  const t = useTranslations('wissenPages.fortschritt');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <TrendingUp className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* BSI Maturity Model */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="size-6 text-primary" />
            {t('maturity.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('maturity.desc')}</p>
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex items-center gap-3 rounded-md border px-4 py-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${MATURITY_COLORS[level]} text-white text-sm font-bold`}>
                  {level}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t(`maturity.levels.l${level}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`maturity.levels.l${level}.desc` as any)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Target className="size-6 text-primary" />
            {t('kpis.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('kpis.desc')}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id) => (
              <Card key={id}>
                <CardContent className="pt-4">
                  <p className="font-bold text-sm mb-1">{t(`kpis.items.${id}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`kpis.items.${id}.desc` as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* PDCA Cycle */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <RefreshCw className="size-6 text-primary" />
            {t('pdca.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('pdca.desc')}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PDCA_ITEMS.map(({ key, color, textColor, bgColor }) => (
              <div key={key} className={`rounded-lg ${bgColor} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-3 w-3 rounded-full ${color}`} />
                  <p className={`font-bold text-sm ${textColor}`}>{t(`pdca.${key}.title`)}</p>
                </div>
                <p className={`text-xs ${textColor} opacity-80`}>{t(`pdca.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12-Month Roadmap */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Calendar className="size-6 text-primary" />
            {t('roadmap.title')}
          </h2>
          <div className="space-y-4">
            {['q1', 'q2', 'q3', 'q4'].map((q, idx) => (
              <Card key={q} className={`border-l-4 ${QUARTER_COLORS[idx]}`}>
                <CardContent className="pt-4">
                  <p className="font-bold text-sm mb-1">{t(`roadmap.quarters.${q}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`roadmap.quarters.${q}.items` as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900">
                <Lightbulb className="mt-0.5 size-4 shrink-0" />
                {t(`tips.items.${id}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('vorlagen.title')}</p>
          <Link
            href="/wissen/vorlagen"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {tWissen('vorlagen.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
