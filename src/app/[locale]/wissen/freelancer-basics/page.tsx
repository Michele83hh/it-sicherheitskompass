'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { User, ChevronLeft, CheckCircle2, AlertTriangle, Banknote, Shield, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const CHECKLIST_IDS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10'] as const;
const DSGVO_IDS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const;

export default function FreelancerBasicsPage() {
  const t = useTranslations('wissenPages.freelancerBasics');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <User className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />

        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Warum wichtig */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-6 text-amber-500" />
            {t('why.title')}
          </h2>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 space-y-2">
            {[1, 2, 3, 4].map((n) => (
              <p key={n} className="flex gap-3 text-sm text-amber-900">
                <span className="font-bold text-amber-600">{n}.</span>
                {t(`why.reason${n}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* 10er Checkliste */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="size-6 text-emerald-500" />
            {t('checklist.title')}
          </h2>
          <div className="space-y-3">
            {CHECKLIST_IDS.map((id, idx) => (
              <Card key={id}>
                <CardContent className="flex gap-4 pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t(`checklist.items.${id}.title`)}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t(`checklist.items.${id}.desc`)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* DSGVO Minimum */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Shield className="size-6 text-primary" />
            {t('dsgvo.title')}
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-2">
              {DSGVO_IDS.map((id) => (
                <div key={id} className="flex gap-2 text-sm">
                  <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{t(`dsgvo.items.${id}`)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <Banknote className="size-6 text-emerald-500" />
            {t('costs.title')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-t-4 border-t-emerald-500">
              <CardContent className="pt-4">
                <p className="font-bold text-emerald-600 text-sm mb-2">{t('costs.free')}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('costs.freeItems')}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500">
              <CardContent className="pt-4">
                <p className="font-bold text-blue-600 text-sm mb-2">{t('costs.low')}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('costs.lowItems')}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-violet-500">
              <CardContent className="pt-4">
                <p className="font-bold text-violet-600 text-sm mb-2">{t('costs.medium')}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('costs.mediumItems')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">
            Sie wollen wissen, welche Regelwerke konkret fuer Sie gelten?
          </p>
          <Link
            href="/navigator"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            Zum Regelwerk-Navigator
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" />
          {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
