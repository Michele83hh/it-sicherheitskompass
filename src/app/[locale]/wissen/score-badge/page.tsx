'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Award, ChevronLeft, Star, Share2, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const LEVELS = ['basic', 'developing', 'established', 'advanced', 'excellent'] as const;
const LEVEL_COLORS = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-700'];

export default function ScoreBadgePage() {
  const t = useTranslations('wissenPages.scoreBadge');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Award className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Star className="size-6 text-amber-500" />{t('why.title')}</h2>
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900"><Star className="mt-0.5 size-4 shrink-0" />{t(`why.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('levels.title')}</h2>
          <div className="space-y-3">
            {LEVELS.map((level, idx) => (
              <div key={level} className="flex items-center gap-3 rounded-md border px-4 py-3">
                <div className={`h-4 w-4 shrink-0 rounded-full ${LEVEL_COLORS[idx]}`} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t(`levels.items.${level}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`levels.items.${level}.desc` as any)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Share2 className="size-6 text-primary" />{t('usage.title')}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <Card key={id}><CardContent className="pt-4">
                <p className="font-bold text-sm mb-1">{t(`usage.items.${id}.title` as any)}</p>
                <p className="text-xs text-muted-foreground">{t(`usage.items.${id}.desc` as any)}</p>
              </CardContent></Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
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
