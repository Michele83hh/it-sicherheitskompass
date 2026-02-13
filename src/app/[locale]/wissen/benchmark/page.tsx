'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { BarChart3, ChevronLeft, TrendingUp, Building2, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const KPIS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const;
const INDUSTRIES = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const;
const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

const BAR_COLORS = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500'];

export default function BenchmarkPage() {
  const t = useTranslations('wissenPages.benchmark');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <BarChart3 className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><TrendingUp className="size-6 text-primary" />{t('kpis.title')}</h2>
          <div className="space-y-4">
            {KPIS.map((id, idx) => {
              const pct = t(`kpis.items.${id}.avg` as any);
              return (
                <div key={id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{t(`kpis.items.${id}.name` as any)}</span>
                    <span className="text-sm font-bold">{pct}</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${BAR_COLORS[idx % BAR_COLORS.length]} transition-all`} style={{ width: pct }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`kpis.items.${id}.desc` as any)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Building2 className="size-6 text-primary" />{t('industries.title')}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {INDUSTRIES.map((id) => (
              <Card key={id}><CardContent className="pt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{t(`industries.items.${id}.name` as any)}</span>
                  <span className="text-xs font-bold text-primary">{t(`industries.items.${id}.level` as any)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t(`industries.items.${id}.note` as any)}</p>
              </CardContent></Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('selfAssessment.title')}</h2>
          <div className="space-y-3">
            {QUESTIONS.map((id, idx) => (
              <Card key={id}><CardContent className="flex gap-3 pt-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">{idx + 1}</div>
                <div>
                  <p className="font-semibold text-sm">{t(`selfAssessment.items.${id}.q` as any)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`selfAssessment.items.${id}.hint` as any)}</p>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900"><Lightbulb className="mt-0.5 size-4 shrink-0" />{t(`tips.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
