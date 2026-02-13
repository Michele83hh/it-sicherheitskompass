'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { GraduationCap, ChevronLeft, Scale, BookOpen, FileText, Tv, Lightbulb, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const FORMAT_ICONS = [Tv, BookOpen, GraduationCap, Lightbulb];

export default function SchulungsnachweisPage() {
  const t = useTranslations('wissenPages.schulungsnachweis');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <GraduationCap className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Legal Requirements */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Scale className="size-6 text-primary" />
            {t('legal.title')}
          </h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <Card key={id}>
                <CardContent className="flex gap-3 pt-4">
                  <Scale className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">{t(`legal.items.${id}.title` as any)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`legal.items.${id}.desc` as any)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mandatory Topics */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <BookOpen className="size-6 text-primary" />
            {t('topics.title')}
          </h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'].map((id) => (
              <Card key={id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm">{t(`topics.items.${id}.title` as any)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t(`topics.items.${id}.desc` as any)}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 flex items-center gap-1 text-xs">
                      <Clock className="size-3" />
                      {t(`topics.items.${id}.interval` as any)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Documentation */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <FileText className="size-6 text-primary" />
            {t('documentation.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('documentation.desc')}</p>
          <div className="space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'].map((id, idx) => (
              <div key={id} className="flex gap-3 rounded-md border px-4 py-3 text-sm">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <span>{t(`documentation.items.${id}` as any)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('formats.title')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4'].map((id, idx) => {
              const Icon = FORMAT_ICONS[idx];
              return (
                <Card key={id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="size-5 text-primary" />
                      <p className="font-bold text-sm">{t(`formats.items.${id}.title` as any)}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{t(`formats.items.${id}.desc` as any)}</p>
                    <div className="flex gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">+ {t(`formats.items.${id}.pro` as any)}</Badge>
                      <Badge className="bg-red-100 text-red-700 text-xs">- {t(`formats.items.${id}.contra` as any)}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

        {/* CTA to Awareness Quiz */}
        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('awarenessQuiz.title')}</p>
          <Link
            href="/wissen/awareness-quiz"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {tWissen('awarenessQuiz.startButton')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
