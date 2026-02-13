'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Calculator, ChevronLeft, Building2, PieChart, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const SIZE_COLORS = ['border-l-emerald-500', 'border-l-blue-500', 'border-l-amber-500', 'border-l-violet-500'];
const PRIORITY_COLORS = [
  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
];

export default function KostenrechnerPage() {
  const t = useTranslations('wissenPages.kostenrechner');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Calculator className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Costs by size */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Building2 className="size-6 text-primary" />
            {t('sizes.title')}
          </h2>
          <div className="space-y-4">
            {['s1', 's2', 's3', 's4'].map((id, idx) => (
              <Card key={id} className={`border-l-4 ${SIZE_COLORS[idx]}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-sm">{t(`sizes.items.${id}.title` as any)}</p>
                    <Badge className="bg-primary/10 text-primary font-bold">{t(`sizes.items.${id}.range` as any)}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{t(`sizes.items.${id}.includes` as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Breakdown */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <PieChart className="size-6 text-primary" />
            {t('breakdown.title')}
          </h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <div key={id} className="flex items-center gap-3 rounded-md border px-4 py-3">
                <Badge variant="outline" className="shrink-0 font-bold min-w-[60px] text-center">{t(`breakdown.items.${id}.percent` as any)}</Badge>
                <div>
                  <p className="font-semibold text-sm">{t(`breakdown.items.${id}.category` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`breakdown.items.${id}.desc` as any)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="size-6 text-primary" />
            {t('roi.title')}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <div key={id} className="rounded-lg border p-3 text-center">
                <div className="text-lg font-bold text-red-600">{t(`roi.items.${id}.value` as any)}</div>
                <p className="text-xs text-muted-foreground mt-1">{t(`roi.items.${id}.label` as any)}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 text-center">
            <p className="text-sm font-medium">{t('roi.conclusion')}</p>
          </div>
        </section>

        {/* Priority */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Target className="size-6 text-primary" />
            {t('priority.title')}
          </h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4'].map((id, idx) => (
              <div key={id} className={`rounded-lg ${PRIORITY_COLORS[idx].bg} border ${PRIORITY_COLORS[idx].border} p-4`}>
                <p className={`font-bold text-sm ${PRIORITY_COLORS[idx].text} mb-1`}>{t(`priority.items.${id}.title` as any)}</p>
                <p className={`text-xs ${PRIORITY_COLORS[idx].text} opacity-80`}>{t(`priority.items.${id}.desc` as any)}</p>
              </div>
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

        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('foerdermittel.title')}</p>
          <Link href="/wissen/foerdermittel" className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
            {tWissen('foerdermittel.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
