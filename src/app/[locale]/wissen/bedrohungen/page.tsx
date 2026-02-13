'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ShieldAlert, ChevronLeft, TrendingUp, BarChart3, Building2, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const THREATS = ['t1', 't2', 't3', 't4', 't5', 't6'] as const;
const THREAT_COLORS = [
  'border-l-red-500',
  'border-l-amber-500',
  'border-l-violet-500',
  'border-l-blue-500',
  'border-l-orange-500',
  'border-l-rose-500',
];

const TREND_BADGE: Record<string, string> = {
  'Steigend': 'bg-red-100 text-red-700',
  'Rising': 'bg-red-100 text-red-700',
  'Stark steigend': 'bg-red-100 text-red-800',
  'Strongly rising': 'bg-red-100 text-red-800',
  'Stabil': 'bg-amber-100 text-amber-700',
  'Stable': 'bg-amber-100 text-amber-700',
  'Dauerhaft hoch': 'bg-orange-100 text-orange-700',
  'Permanently high': 'bg-orange-100 text-orange-700',
};

function getTrendColor(trend: string): string {
  for (const [key, color] of Object.entries(TREND_BADGE)) {
    if (trend.startsWith(key)) return color;
  }
  return 'bg-muted text-muted-foreground';
}

export default function BedrohungenPage() {
  const t = useTranslations('wissenPages.bedrohungen');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <ShieldAlert className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Stats */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="size-6 text-primary" />
            {t('stats.title')}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <div key={id} className="rounded-lg border p-4 text-center">
                <div className="text-2xl font-bold text-primary">{t(`stats.items.${id}.value` as any)}</div>
                <p className="text-xs text-muted-foreground mt-1">{t(`stats.items.${id}.desc` as any)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Threats */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <ShieldAlert className="size-6 text-red-500" />
            {t('topThreats.title')}
          </h2>
          <div className="space-y-4">
            {THREATS.map((tId, idx) => {
              const trend = t(`topThreats.threats.${tId}.trend` as any);
              return (
                <Card key={tId} className={`border-l-4 ${THREAT_COLORS[idx]}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-bold">{t(`topThreats.threats.${tId}.title` as any)}</p>
                      <Badge className={`shrink-0 text-xs ${getTrendColor(trend)}`}>
                        <TrendingUp className="mr-1 size-3" />
                        {trend}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{t(`topThreats.threats.${tId}.desc` as any)}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Impact:</span> {t(`topThreats.threats.${tId}.impact` as any)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Why SMEs */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Building2 className="size-6 text-primary" />
            {t('kmuSpecific.title')}
          </h2>
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900">
                <ShieldAlert className="mt-0.5 size-4 shrink-0" />
                {t(`kmuSpecific.items.${id}` as any)}
              </p>
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
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('angriffspfade.title')}</p>
          <Link
            href="/wissen/angriffspfade"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {tWissen('angriffspfade.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
