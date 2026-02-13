'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { FileCheck, ChevronLeft, AlertTriangle, Award, Lightbulb, FileText, Shield, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

export default function SelbsterklaerungPage() {
  const t = useTranslations('wissenPages.selbsterklaerung');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <FileCheck className="size-7 text-white" />
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
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                {t(`why.items.${id}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* Levels */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Award className="size-6 text-primary" />
            {t('levels.title')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {(['basic', 'standard', 'advanced'] as const).map((level, idx) => (
              <Card key={level} className={`border-t-4 ${idx === 0 ? 'border-t-emerald-500' : idx === 1 ? 'border-t-blue-500' : 'border-t-violet-500'}`}>
                <CardContent className="pt-4">
                  <p className="font-bold text-sm mb-1">{t(`levels.${level}.title`)}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{t(`levels.${level}.desc`)}</p>
                  <Badge variant="outline" className="text-xs">{t(`levels.${level}.effort`)}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Template */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <FileText className="size-6 text-primary" />
            {t('template.title')}
          </h2>
          <div className="space-y-3">
            {['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'].map((id) => (
              <Card key={id}>
                <CardContent className="flex gap-3 pt-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    {id.replace('s', '')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t(`template.sections.${id}.title` as any)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`template.sections.${id}.desc` as any)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Standards */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Shield className="size-6 text-primary" />
            {t('standards.title')}
          </h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <Card key={id}>
                <CardContent className="flex gap-3 pt-4">
                  <Award className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">{t(`standards.items.${id}.name` as any)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`standards.items.${id}.desc` as any)}</p>
                  </div>
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
          <p className="text-sm text-foreground mb-3 font-medium">
            Starten Sie Ihre Bestandsaufnahme mit unserem Regelwerk-Navigator
          </p>
          <Link
            href="/navigator"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            Zum Navigator
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
