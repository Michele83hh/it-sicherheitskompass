'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Home, ChevronLeft, Wifi, Monitor, FolderLock, MessageSquare, Lock, FileText, Shield, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const SECTIONS = [
  { key: 'network', icon: Wifi, items: ['i1', 'i2', 'i3'] },
  { key: 'devices', icon: Monitor, items: ['i1', 'i2', 'i3', 'i4'] },
  { key: 'data', icon: FolderLock, items: ['i1', 'i2', 'i3'] },
  { key: 'communication', icon: MessageSquare, items: ['i1', 'i2', 'i3'] },
  { key: 'physical', icon: Lock, items: ['i1', 'i2'] },
] as const;

const POLICY_IDS = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'] as const;

export default function HomeOfficePage() {
  const t = useTranslations('wissenPages.homeOffice');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Home className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {SECTIONS.map(({ key, icon: Icon, items }) => (
          <section key={key} className="mb-10">
            <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
              <Icon className="size-5 text-primary" />
              {t(`sections.${key}.title`)}
            </h2>
            <div className="space-y-3">
              {items.map((itemId) => (
                <Card key={itemId}>
                  <CardContent className="pt-4">
                    <p className="font-semibold text-sm mb-1">{t(`sections.${key}.items.${itemId}.title`)}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t(`sections.${key}.items.${itemId}.desc`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* Policy Essentials */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            {t('policy.title')}
          </h2>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5 space-y-2">
            {POLICY_IDS.map((id) => (
              <div key={id} className="flex gap-2 text-sm">
                <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
                {t(`policy.items.${id}`)}
              </div>
            ))}
          </div>
        </section>

        {/* Legal */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
            <Scale className="size-5 text-primary" />
            {t('legal.title')}
          </h2>
          <div className="rounded-md bg-muted/50 p-4 space-y-2 text-sm">
            <p><span className="font-medium">DSGVO:</span> {t('legal.dsgvo')}</p>
            <p><span className="font-medium">NIS2:</span> {t('legal.nis2')}</p>
            <p><span className="font-medium">Arbeitsrecht:</span> {t('legal.arbeitsrecht')}</p>
          </div>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
