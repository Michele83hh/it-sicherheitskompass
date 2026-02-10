'use client';

import { useTranslations } from 'next-intl';
import { Clock, AlertTriangle, FileText, Phone, Mail, ExternalLink, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { REPORTING_STAGES, INCIDENT_CRITERIA, REPORTING_CONTACTS } from '@/lib/regulations/nis2/meldepflichten';

export default function MeldepflichtenPage() {
  const t = useTranslations('meldepflichten');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        {t('intro')}
      </p>

      {/* Three reporting stages */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">{t('stages.title')}</h2>
        <div className="space-y-6">
          {/* Stage 1: 24h */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <Clock className="size-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('stages.stage1.title')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('stages.stage1.deadline')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{t('stages.stage1.description')}</p>
              <p className="text-sm text-muted-foreground">{t('stages.stage1.content')}</p>
              <Badge variant="outline" className="text-xs">{t('stages.stage1.legalBasis')}</Badge>
            </CardContent>
          </Card>

          {/* Stage 2: 72h */}
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-100 p-2">
                  <FileText className="size-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('stages.stage2.title')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('stages.stage2.deadline')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{t('stages.stage2.description')}</p>
              <p className="text-sm text-muted-foreground">{t('stages.stage2.content')}</p>
              <Badge variant="outline" className="text-xs">{t('stages.stage2.legalBasis')}</Badge>
            </CardContent>
          </Card>

          {/* Stage 3: 1 month */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <FileText className="size-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('stages.stage3.title')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('stages.stage3.deadline')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{t('stages.stage3.description')}</p>
              <p className="text-sm text-muted-foreground">{t('stages.stage3.content')}</p>
              <Badge variant="outline" className="text-xs">{t('stages.stage3.legalBasis')}</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Incident criteria */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">{t('criteria.title')}</h2>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <p className="mb-4 text-sm text-amber-900">{t('criteria.subtitle')}</p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-amber-900">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{t('criteria.items.disruption')}</span>
            </li>
            <li className="flex gap-3 text-sm text-amber-900">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{t('criteria.items.damage')}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* BSI contacts */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">{t('contacts.title')}</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <Globe className="size-5 text-primary" />
              <div>
                <p className="font-medium">{t('contacts.portal')}</p>
                <a href="https://meldestelle.bsi.bund.de" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  meldestelle.bsi.bund.de <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-primary" />
              <div>
                <p className="font-medium">{t('contacts.email')}</p>
                <a href="mailto:meldestelle@bsi.bund.de" className="text-sm text-primary hover:underline">
                  meldestelle@bsi.bund.de
                </a>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-primary" />
              <div>
                <p className="font-medium">{t('contacts.phone')}</p>
                <p className="text-sm text-muted-foreground">+49 228 99 9582-5500</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* NIS2 vs DSGVO comparison */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">{t('dsgvoComparison.title')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-semibold"></th>
                <th className="p-3 text-left font-semibold">{t('dsgvoComparison.nis2')}</th>
                <th className="p-3 text-left font-semibold">{t('dsgvoComparison.dsgvo')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">{t('dsgvoComparison.deadline')}</td>
                <td className="p-3">{t('dsgvoComparison.nis2Deadline')}</td>
                <td className="p-3">{t('dsgvoComparison.dsgvoDeadline')}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">{t('dsgvoComparison.authority')}</td>
                <td className="p-3">{t('dsgvoComparison.nis2Authority')}</td>
                <td className="p-3">{t('dsgvoComparison.dsgvoAuthority')}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">{t('dsgvoComparison.scope')}</td>
                <td className="p-3">{t('dsgvoComparison.nis2Scope')}</td>
                <td className="p-3">{t('dsgvoComparison.dsgvoScope')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{t('dsgvoComparison.parallel')}</p>
      </section>

      {/* Legal basis */}
      <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
        {t('legalBasis')}
      </div>
      </div>
    </div>
  );
}
