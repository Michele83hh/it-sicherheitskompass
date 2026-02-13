'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Building2, Users, Globe, ExternalLink, ChevronLeft, Landmark, BadgeCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const ORGS = [
  { key: 'bsi', icon: Landmark, color: 'blue' },
  { key: 'acs', icon: Building2, color: 'emerald' },
  { key: 'tisim', icon: Building2, color: 'violet' },
  { key: 'dsin', icon: Users, color: 'orange' },
  { key: 'ihk', icon: Building2, color: 'cyan' },
  { key: 'hwk', icon: Building2, color: 'rose' },
  { key: 'mittelstand', icon: Landmark, color: 'indigo' },
] as const;

const COLOR_MAP: Record<string, string> = {
  blue: 'border-l-blue-500',
  emerald: 'border-l-emerald-500',
  violet: 'border-l-violet-500',
  orange: 'border-l-orange-500',
  cyan: 'border-l-cyan-500',
  rose: 'border-l-rose-500',
  indigo: 'border-l-indigo-500',
};

export default function AnlaufstellenPage() {
  const t = useTranslations('wissenPages.anlaufstellen');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Building2 className="size-7 text-white" />
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

        <div className="space-y-5">
          {ORGS.map(({ key, icon: Icon, color }) => (
            <Card key={key} className={`border-l-4 ${COLOR_MAP[color]}`}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-muted p-2">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t(`${key}.title`)}</CardTitle>
                    {(t as any).raw?.(`${key}.free`) && (
                      <Badge variant="outline" className="mt-1 text-xs text-emerald-600 border-emerald-300">
                        <BadgeCheck className="mr-1 size-3" />
                        {t(`${key}.free` as any)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t(`${key}.desc`)}</p>
                <p className="text-sm"><span className="font-medium">Leistungen:</span> {t(`${key}.services`)}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={t(`${key}.web` as any)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Globe className="size-4" /> Website <ExternalLink className="size-3" />
                  </a>
                  {key === 'bsi' && (
                    <a href={t('bsi.kmuWeb')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <Globe className="size-4" /> {t('bsi.kmuLabel')} <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" />
            {tWissen('backToWissen')}
          </Link>
        </div>
      </div>
    </div>
  );
}
