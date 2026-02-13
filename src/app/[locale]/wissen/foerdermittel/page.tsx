'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Banknote, ChevronLeft, ExternalLink, AlertTriangle, Lightbulb, Globe, Building2, Landmark } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

export default function FoerdermittelPage() {
  const t = useTranslations('wissenPages.foerdermittel');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <Banknote className="size-7 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />

        <p className="mb-6 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <div className="mb-10 rounded-lg border border-amber-200 bg-amber-50 p-4 flex gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-900">{t('disclaimer')}</p>
        </div>

        {/* Bundesfoerderung */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <Landmark className="size-6 text-primary" />
            {t('categories.federal')}
          </h2>
          <div className="space-y-4">
            {(['goDigital', 'digitalJetzt', 'kfw'] as const).map((prog) => (
              <Card key={prog} className="border-l-4 border-l-emerald-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t(`${prog}.title`)}</CardTitle>
                    <Badge variant="outline" className="text-xs">{t(`${prog}.status`)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{t(`${prog}.desc`)}</p>
                  <div className="rounded-md bg-muted/50 p-3 space-y-1 text-sm">
                    <p><span className="font-medium">Foerderung:</span> {t(`${prog}.funding`)}</p>
                    <p><span className="font-medium">Berechtigt:</span> {t(`${prog}.eligible`)}</p>
                    {prog === 'goDigital' && <p><span className="font-medium">Modul:</span> {t('goDigital.modules')}</p>}
                  </div>
                  <a href={t(`${prog}.web`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Globe className="size-4" /> Mehr erfahren <ExternalLink className="size-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Laenderfoerderung */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <Building2 className="size-6 text-violet-500" />
            {t('categories.state')}
          </h2>
          <Card className="border-l-4 border-l-violet-500">
            <CardHeader>
              <CardTitle className="text-lg">{t('laender.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t('laender.desc')}</p>
              <div className="rounded-md bg-muted/50 p-4">
                <p className="font-medium text-sm mb-2">{t('laender.examples.title')}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {(['nrw', 'bayern', 'bw', 'niedersachsen', 'hessen'] as const).map((state) => (
                    <li key={state} className="flex gap-2">
                      <span className="text-violet-500 font-bold">&bull;</span>
                      {t(`laender.examples.${state}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 items-start rounded-md bg-primary/5 p-3 text-sm">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{t('laender.tip')}</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* EU-Foerderung */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <Globe className="size-6 text-blue-500" />
            {t('categories.eu')}
          </h2>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-lg">{t('eu.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{t('eu.desc')}</p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex gap-2"><span className="text-blue-500 font-bold">&bull;</span> {t('eu.horizon')}</li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">&bull;</span> {t('eu.dep')}</li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">&bull;</span> {t('eu.enisa')}</li>
              </ul>
              <a href={t('eu.web')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                <Globe className="size-4" /> EU Digital Strategy <ExternalLink className="size-3" />
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Tipps */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex gap-3 text-sm text-emerald-900">
                <Lightbulb className="mt-0.5 size-4 shrink-0" />
                {t(`tips.tip${n}` as any)}
              </div>
            ))}
          </div>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" />
          {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
