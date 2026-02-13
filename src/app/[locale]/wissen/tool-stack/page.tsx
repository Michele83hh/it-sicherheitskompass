'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Wrench, ChevronLeft, Shield, Key, HardDrive, Monitor, Flame, Search, Users, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const CATEGORIES = [
  { key: 'passwords', icon: Key, color: 'blue' },
  { key: 'mfa', icon: Shield, color: 'emerald' },
  { key: 'backup', icon: HardDrive, color: 'violet' },
  { key: 'endpoint', icon: Monitor, color: 'orange' },
  { key: 'firewall', icon: Flame, color: 'red' },
  { key: 'vulnerability', icon: Search, color: 'cyan' },
  { key: 'awareness', icon: Users, color: 'rose' },
  { key: 'monitoring', icon: Activity, color: 'indigo' },
] as const;

const COLOR_MAP: Record<string, { border: string; bg: string; text: string }> = {
  blue:    { border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  emerald: { border: 'border-l-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  violet:  { border: 'border-l-violet-500', bg: 'bg-violet-50', text: 'text-violet-700' },
  orange:  { border: 'border-l-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
  red:     { border: 'border-l-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  cyan:    { border: 'border-l-cyan-500', bg: 'bg-cyan-50', text: 'text-cyan-700' },
  rose:    { border: 'border-l-rose-500', bg: 'bg-rose-50', text: 'text-rose-700' },
  indigo:  { border: 'border-l-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
};

const TOOL_IDS = ['t1', 't2', 't3'] as const;

export default function ToolStackPage() {
  const t = useTranslations('wissenPages.toolStack');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Wrench className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />

        <p className="mb-4 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>
        <p className="mb-10 text-sm italic text-muted-foreground">{t('disclaimer')}</p>

        <div className="space-y-10">
          {CATEGORIES.map(({ key, icon: Icon, color }) => {
            const c = COLOR_MAP[color];
            return (
              <section key={key}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${c.bg}`}>
                    <Icon className={`size-5 ${c.text}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{t(`categories.${key}.title`)}</h2>
                    <p className="text-sm text-muted-foreground">{t(`categories.${key}.why`)}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {TOOL_IDS.map((tid) => (
                    <Card key={tid} className={`border-l-4 ${c.border}`}>
                      <CardContent className="pt-4 space-y-2">
                        <p className="font-semibold text-sm">{t(`categories.${key}.tools.${tid}.name`)}</p>
                        <Badge variant="outline" className="text-xs">{t(`categories.${key}.tools.${tid}.type`)}</Badge>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(`categories.${key}.tools.${tid}.desc`)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
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
