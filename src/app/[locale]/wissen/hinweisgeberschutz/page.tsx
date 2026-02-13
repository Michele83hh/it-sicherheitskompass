'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Megaphone, ChevronLeft, ExternalLink, AlertTriangle, Shield, Users, Banknote, Globe, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

export default function HinweisgeberschutzPage() {
  const t = useTranslations('wissenPages.hinschg');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Megaphone className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('overview.title')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="size-5" /> {t('overview.who.title')}</CardTitle></CardHeader>
              <CardContent className="space-y-1.5">
                {['i1', 'i2', 'i3', 'i4'].map((id) => (
                  <p key={id} className="flex gap-2 text-sm"><span className="text-blue-500 font-bold shrink-0">&bull;</span> {t(`overview.who.items.${id}` as any)}</p>
                ))}
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="size-5" /> {t('overview.what.title')}</CardTitle></CardHeader>
              <CardContent className="space-y-1.5">
                {['i1', 'i2', 'i3', 'i4'].map((id) => (
                  <p key={id} className="flex gap-2 text-sm"><span className="text-amber-500 font-bold shrink-0">&bull;</span> {t(`overview.what.items.${id}` as any)}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('requirements.title')}</h2>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <Card key={id}>
                <CardContent className="flex gap-3 pt-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-sm">{t(`requirements.items.${id}.title` as any)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`requirements.items.${id}.desc` as any)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* IT Security Connection */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Shield className="size-6 text-primary" />
            {t('itSecurity.title')}
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">{t('itSecurity.desc')}</p>
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <p key={id} className="flex gap-2 text-sm"><Shield className="mt-0.5 size-4 shrink-0 text-primary" /> {t(`itSecurity.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        {/* Penalties */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Banknote className="size-6 text-red-500" />
            {t('penalties.title')}
          </h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-red-900"><AlertTriangle className="mt-0.5 size-4 shrink-0" /> {t(`penalties.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('solutions.title')}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {(['internal', 'external', 'digital'] as const).map((key) => (
              <Card key={key}>
                <CardContent className="pt-4">
                  <p className="font-bold text-sm mb-2">{t(`solutions.${key}.title`)}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(`solutions.${key}.desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* External Channel */}
        <section className="mb-10">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <h3 className="font-bold text-sm mb-1">{t('externalChannel.title')}</h3>
              <p className="text-xs text-muted-foreground mb-2">{t('externalChannel.desc')}</p>
              <p className="text-sm font-medium mb-1">{t('externalChannel.name')}</p>
              <a href={t('externalChannel.web')} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                <Globe className="size-4" /> Website <ExternalLink className="size-3" />
              </a>
            </CardContent>
          </Card>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
