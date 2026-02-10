'use client';

import { useTranslations } from 'next-intl';
import { Calendar, CheckCircle2, ExternalLink, ClipboardList, Link2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RegistrierungPage() {
  const t = useTranslations('registrierung');

  const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'] as const;
  const requiredDataItems = [
    'companyName', 'legalForm', 'address', 'contact', 'sector',
    'memberStates', 'ipRanges', 'responsiblePerson', 'substituteContact',
  ] as const;

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
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{t('intro')}</p>

      {/* Deadline alert */}
      <section className="mb-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 size-5 shrink-0 text-red-600" />
            <div>
              <h2 className="mb-2 text-lg font-bold text-red-900">{t('deadline.title')}</h2>
              <div className="space-y-1 text-sm text-red-800">
                <p>{t('deadline.effective')}</p>
                <p className="font-semibold">{t('deadline.registration')}</p>
                <p className="mt-2 text-red-700">{t('deadline.note')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration steps */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">{t('steps.title')}</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-2 h-full w-0.5 bg-border" />
                )}
              </div>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-base">{t(`steps.${step}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t(`steps.${step}.description`)}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Required data */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">{t('requiredData.title')}</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {requiredDataItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                  <span className="text-sm">{t(`requiredData.items.${item}`)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Important links */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">{t('links.title')}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <a href="https://nis2-registrierung.bsi.bund.de" target="_blank" rel="noopener noreferrer" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 pt-6">
                <Link2 className="size-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:text-primary">{t('links.bsiPortal')}</p>
                  <p className="text-xs text-muted-foreground">nis2-registrierung.bsi.bund.de</p>
                </div>
                <ExternalLink className="ml-auto size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </a>
          <a href="https://id.bund.de" target="_blank" rel="noopener noreferrer" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 pt-6">
                <Link2 className="size-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:text-primary">{t('links.muk')}</p>
                  <p className="text-xs text-muted-foreground">id.bund.de</p>
                </div>
                <ExternalLink className="ml-auto size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </a>
          <a href="https://www.bsi.bund.de/DE/Themen/Regulierung/NIS-2/nis-2_node.html" target="_blank" rel="noopener noreferrer" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 pt-6">
                <Link2 className="size-5 text-primary" />
                <div>
                  <p className="font-medium group-hover:text-primary">{t('links.bsiInfo')}</p>
                  <p className="text-xs text-muted-foreground">bsi.bund.de</p>
                </div>
                <ExternalLink className="ml-auto size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </a>
        </div>
      </section>

      {/* Legal basis */}
      <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
        {t('legalBasis')}
      </div>
      </div>
    </div>
  );
}
