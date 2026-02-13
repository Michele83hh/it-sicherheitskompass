'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Shield, ChevronLeft, AlertTriangle, CheckCircle2, XCircle, Lock, Coins, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

export default function CyberVersicherungPage() {
  const t = useTranslations('wissenPages.cyberVersicherung');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Shield className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Why */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-6 text-amber-500" />
            {t('why.title')}
          </h2>
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {t(`why.items.${id}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="size-6 text-emerald-500" />
            {t('coverage.title')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id) => (
              <Card key={id}>
                <CardContent className="pt-4">
                  <p className="font-bold text-sm mb-1">{t(`coverage.items.${id}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`coverage.items.${id}.desc` as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Exclusions */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <XCircle className="size-6 text-red-500" />
            {t('exclusions.title')}
          </h2>
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-red-900">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                {t(`exclusions.items.${id}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Lock className="size-6 text-primary" />
            {t('prerequisites.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('prerequisites.desc')}</p>
          <div className="space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id) => (
              <div key={id} className="flex gap-2 rounded-md border px-4 py-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {t(`prerequisites.items.${id}` as any)}
              </div>
            ))}
          </div>
        </section>

        {/* Costs */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Coins className="size-6 text-primary" />
            {t('costs.title')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <Card key={id}>
                <CardContent className="pt-4 text-center">
                  <p className="font-bold text-sm">{t(`costs.items.${id}.size` as any)}</p>
                  <p className="text-lg font-bold text-primary mt-1">{t(`costs.items.${id}.range` as any)}</p>
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

        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('kostenrechner.title')}</p>
          <Link href="/wissen/kostenrechner" className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
            {tWissen('kostenrechner.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
