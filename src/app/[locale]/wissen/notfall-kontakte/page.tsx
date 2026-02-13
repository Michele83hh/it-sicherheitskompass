'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Phone, Mail, Globe, AlertTriangle, Shield, ChevronLeft, ExternalLink, CheckCircle2, Siren } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

export default function NotfallKontaktePage() {
  const t = useTranslations('wissenPages.notfallKontakte');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
            <Siren className="size-7 text-red-400" />
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

        {/* Sofort-Kontakte */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-6 text-red-500" />
            {t('immediate.title')}
          </h2>
          <div className="space-y-4">
            {/* BSI */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-lg">{t('immediate.bsiTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('immediate.bsiDesc')}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5"><Phone className="size-4 text-primary" /> {t('immediate.bsiPhone')}</span>
                  <a href={`mailto:${t('immediate.bsiEmail')}`} className="flex items-center gap-1.5 text-primary hover:underline"><Mail className="size-4" /> {t('immediate.bsiEmail')}</a>
                  <a href={t('immediate.bsiWeb')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline"><Globe className="size-4" /> meldestelle.bsi.bund.de <ExternalLink className="size-3" /></a>
                </div>
              </CardContent>
            </Card>

            {/* CERT-Bund */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-lg">{t('immediate.certTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('immediate.certDesc')}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5"><Phone className="size-4 text-primary" /> {t('immediate.certPhone')}</span>
                  <a href={`mailto:${t('immediate.certEmail')}`} className="flex items-center gap-1.5 text-primary hover:underline"><Mail className="size-4" /> {t('immediate.certEmail')}</a>
                  <a href={t('immediate.certWeb')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline"><Globe className="size-4" /> CERT-Bund <ExternalLink className="size-3" /></a>
                </div>
              </CardContent>
            </Card>

            {/* Polizei ZAC */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-lg">{t('immediate.polizeiTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('immediate.polizeiDesc')}</p>
                <a href={t('immediate.polizeiWeb')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
                  {t('immediate.polizeiCta')} <ExternalLink className="size-3" />
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Meldepflichten */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <Shield className="size-6 text-primary" />
            {t('reporting.title')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-semibold">Regelwerk</th>
                  <th className="p-3 text-left font-semibold">Frist</th>
                  <th className="p-3 text-left font-semibold">Meldestelle</th>
                </tr>
              </thead>
              <tbody>
                {(['nis2', 'dsgvo', 'kritis', 'dora'] as const).map((reg) => (
                  <tr key={reg} className="border-b">
                    <td className="p-3 font-medium">{t(`reporting.${reg}Title`)}</td>
                    <td className="p-3 text-muted-foreground">{t(`reporting.${reg}Deadline`)}</td>
                    <td className="p-3 text-muted-foreground">{t(`reporting.${reg}Authority`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Forensik */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t('forensics.title')}</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-1">{t('forensics.allianzTitle')}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t('forensics.allianzDesc')}</p>
                <a href={t('forensics.allianzWeb')} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Dienstleister-Liste <ExternalLink className="size-3" />
                </a>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">{t('forensics.tipTitle')}</h3>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <p key={n} className="flex gap-2 text-sm text-amber-900">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                      {t(`forensics.tip${n}` as any)}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Datenschutzbehoerden */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t('datenschutz.title')}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('datenschutz.desc')}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">{t('datenschutz.bfdiTitle')}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t('datenschutz.bfdiDesc')}</p>
                <a href={t('datenschutz.bfdiWeb')} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  bfdi.bund.de <ExternalLink className="size-3" />
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">{t('datenschutz.landesTitle')}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t('datenschutz.landesDesc')}</p>
                <a href={t('datenschutz.landesWeb')} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Landesdatenschutzbehoerden <ExternalLink className="size-3" />
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Notfall-Checkliste */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t('checklist.title')}</h2>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className="flex gap-3 text-sm">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {n}
                </div>
                <span className="pt-0.5">{t(`checklist.step${n}` as any)}</span>
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
