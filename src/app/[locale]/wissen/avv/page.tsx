'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { FileSignature, ChevronLeft, AlertTriangle, ListChecks, XCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

export default function AvvPage() {
  const t = useTranslations('wissenPages.avv');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <FileSignature className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* When needed */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-6 text-amber-500" />
            {t('when.title')}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'].map((id) => (
              <div key={id} className="flex gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {t(`when.items.${id}` as any)}
              </div>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <ListChecks className="size-6 text-primary" />
            {t('content.title')}
          </h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10'].map((id, idx) => (
              <Card key={id}>
                <CardContent className="flex gap-3 pt-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t(`content.items.${id}.title` as any)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`content.items.${id}.desc` as any)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Not AVV */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <XCircle className="size-6 text-emerald-500" />
            {t('notAvv.title')}
          </h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900">
                <XCircle className="mt-0.5 size-4 shrink-0" />
                {t(`notAvv.items.${id}` as any)}
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

        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('dsfa.title')}</p>
          <Link href="/wissen/dsfa" className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
            {tWissen('dsfa.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
