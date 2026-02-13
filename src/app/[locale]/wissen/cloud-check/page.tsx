'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Cloud, ChevronLeft, AlertTriangle, CheckCircle2, Server, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const CATEGORIES = ['identity', 'data', 'network'] as const;
const ITEMS_PER_CAT = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;
const MODELS = ['saas', 'paas', 'iaas'] as const;

export default function CloudCheckPage() {
  const t = useTranslations('wissenPages.cloudCheck');
  const tWissen = useTranslations('wissenPages');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const total = CATEGORIES.length * ITEMS_PER_CAT.length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Cloud className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><AlertTriangle className="size-6 text-amber-500" />{t('risks.title')}</h2>
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900"><AlertTriangle className="mt-0.5 size-4 shrink-0" />{t(`risks.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><CheckCircle2 className="size-6 text-primary" />{t('checklist.title')}</h2>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{done}/{total}</span>
          </div>
          {CATEGORIES.map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">{t(`checklist.categories.${cat}` as any)}</h3>
              <div className="space-y-2">
                {ITEMS_PER_CAT.map((id) => {
                  const key = `${cat}-${id}`;
                  return (
                    <label key={key} className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)} className="mt-0.5 size-4 rounded accent-emerald-500" />
                      <span className="text-sm">{t(`checklist.items.${cat}.${id}` as any)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Server className="size-6 text-primary" />{t('models.title')}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {MODELS.map((m) => (
              <Card key={m} className="border-2">
                <CardContent className="pt-5">
                  <h3 className="font-bold text-base mb-1">{t(`models.${m}.title` as any)}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{t(`models.${m}.desc` as any)}</p>
                  <p className="text-xs"><span className="font-semibold">{t('models.controlLabel')}:</span> {t(`models.${m}.control` as any)}</p>
                  <p className="text-xs mt-1"><span className="font-semibold">{t('models.exampleLabel')}:</span> {t(`models.${m}.example` as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900"><Lightbulb className="mt-0.5 size-4 shrink-0" />{t(`tips.items.${id}` as any)}</p>
            ))}
          </div>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
