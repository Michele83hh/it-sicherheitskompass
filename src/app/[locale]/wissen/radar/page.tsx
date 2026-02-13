'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Radar, ChevronLeft, AlertTriangle, Lightbulb, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const QUADRANTS = [
  { id: 'immediate', color: 'border-red-300 bg-red-50', textColor: 'text-red-700', dotColor: 'bg-red-500' },
  { id: 'growing', color: 'border-amber-300 bg-amber-50', textColor: 'text-amber-700', dotColor: 'bg-amber-500' },
  { id: 'emerging', color: 'border-blue-300 bg-blue-50', textColor: 'text-blue-700', dotColor: 'bg-blue-500' },
  { id: 'persistent', color: 'border-slate-300 bg-slate-50', textColor: 'text-slate-700', dotColor: 'bg-slate-500' },
] as const;

export default function RadarPage() {
  const t = useTranslations('wissenPages.radar');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Radar className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <div className="grid gap-5 sm:grid-cols-2 mb-10">
          {QUADRANTS.map(({ id, color, textColor, dotColor }) => (
            <Card key={id} className={`border-2 ${color}`}>
              <CardContent className="pt-5">
                <h2 className={`font-bold text-lg mb-3 ${textColor}`}>{t(`quadrants.${id}.title` as any)}</h2>
                <div className="space-y-3">
                  {['t1', 't2', 't3'].map((tid) => (
                    <div key={tid} className="flex gap-2 items-start">
                      <div className={`mt-1.5 size-2.5 shrink-0 rounded-full ${dotColor}`} />
                      <div>
                        <p className={`font-semibold text-sm ${textColor}`}>{t(`quadrants.${id}.threats.${tid}.name` as any)}</p>
                        <p className={`text-xs ${textColor} opacity-70`}>{t(`quadrants.${id}.threats.${tid}.desc` as any)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Shield className="size-6 text-primary" />{t('actions.title')}</h2>
          <div className="space-y-3">
            {['a1', 'a2', 'a3', 'a4', 'a5'].map((id, idx) => (
              <Card key={id}><CardContent className="flex gap-3 pt-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">{idx + 1}</div>
                <div>
                  <p className="font-semibold text-sm">{t(`actions.items.${id}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`actions.items.${id}.desc` as any)}</p>
                </div>
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
