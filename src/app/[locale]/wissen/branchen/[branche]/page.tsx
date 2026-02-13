'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ChevronLeft, AlertTriangle, CheckCircle2, Shield, Lightbulb, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';
import { notFound } from 'next/navigation';

const SLUG_TO_KEY: Record<string, string> = {
  'logistik': 'logistik',
  'gesundheit': 'gesundheit',
  'fertigung': 'fertigung',
  'handel': 'handel',
  'it-dienstleister': 'itDienstleister',
  'energie': 'energie',
  'automotive': 'automotive',
  'finanzen': 'finanzen',
};

const REG_LINKS: Record<string, string> = {
  nis2: '/nis2',
  dsgvo: '/dsgvo',
  kritis: '/kritis',
  dora: '/dora',
  tisax: '/tisax',
  cra: '/cra',
  bsiGrundschutz: '/bsi-grundschutz',
  iso27001: '/iso27001',
  soc2: '/soc2',
  pciDss: '/pci-dss',
  c5: '/c5',
};

const REG_LABELS: Record<string, string> = {
  nis2: 'NIS2',
  dsgvo: 'DSGVO',
  kritis: 'KRITIS',
  dora: 'DORA',
  tisax: 'TISAX',
  cra: 'CRA',
  bsiGrundschutz: 'BSI IT-Grundschutz',
  iso27001: 'ISO 27001',
  soc2: 'SOC 2',
  pciDss: 'PCI DSS',
  c5: 'C5',
};

export default function BranchePage() {
  const params = useParams();
  const slug = params?.branche as string | undefined;
  const i18nKey = slug ? SLUG_TO_KEY[slug] : undefined;

  if (!i18nKey) notFound();

  const t = useTranslations(`wissenPages.branchen.${i18nKey}` as any);
  const tHub = useTranslations('wissenPages.branchen.hub');
  const tWissen = useTranslations('wissenPages');

  const regKeys = ['nis2', 'dsgvo', 'kritis', 'dora', 'tisax', 'cra', 'bsiGrundschutz', 'iso27001', 'soc2', 'pciDss', 'c5'];
  const relevantRegs = regKeys.filter((regKey) => {
    try {
      return t(`regulations.items.${regKey}.relevant` as any) === 'true';
    } catch {
      return false;
    }
  });

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Relevant Regulations */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Shield className="size-6 text-primary" />{tHub('regulations')}</h2>
          <div className="space-y-3">
            {relevantRegs.map((regKey) => (
              <Card key={regKey} className="border-l-4 border-l-primary">
                <CardContent className="flex items-start justify-between gap-3 pt-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/10 text-primary text-xs">{REG_LABELS[regKey]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(`regulations.items.${regKey}.reason` as any)}</p>
                  </div>
                  <Link href={REG_LINKS[regKey] as any} className="shrink-0 text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Risks */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><AlertTriangle className="size-6 text-red-500" />{t('risks.title')}</h2>
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-red-900"><AlertTriangle className="mt-0.5 size-4 shrink-0" />{t(`risks.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><CheckCircle2 className="size-6 text-primary" />{t('actions.title')}</h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id, idx) => (
              <Card key={id}><CardContent className="flex gap-3 pt-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">{idx + 1}</div>
                <div>
                  <p className="font-semibold text-sm">{t(`actions.items.${id}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`actions.items.${id}.desc` as any)}</p>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </section>

        {/* Quick Win CTA */}
        <section className="mb-10">
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5">
            <div className="flex gap-2 items-start">
              <Lightbulb className="mt-0.5 size-5 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-900 font-medium">{t('quickWin')}</p>
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4">
          <Link href="/wissen/branchen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" /> {tHub('title')}
          </Link>
          <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
          </Link>
        </div>
      </div>
    </div>
  );
}
