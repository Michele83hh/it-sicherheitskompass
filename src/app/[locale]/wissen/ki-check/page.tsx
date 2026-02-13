'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Brain, ChevronLeft, Clock, AlertTriangle, Shield, CheckSquare, Lightbulb, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';
import { useState } from 'react';

const RISK_LEVELS = [
  { key: 'unacceptable', color: 'red', borderColor: 'border-t-red-600' },
  { key: 'high', color: 'orange', borderColor: 'border-t-orange-500' },
  { key: 'limited', color: 'amber', borderColor: 'border-t-amber-400' },
  { key: 'minimal', color: 'emerald', borderColor: 'border-t-emerald-500' },
] as const;

const RISK_BG: Record<string, string> = {
  red: 'bg-red-100 text-red-700',
  orange: 'bg-orange-100 text-orange-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export default function KiCheckPage() {
  const t = useTranslations('wissenPages.kiCheck');
  const tWissen = useTranslations('wissenPages');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const checklistIds = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'];
  const checkedCount = checklistIds.filter((id) => checked[id]).length;

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Brain className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* AI Act Overview */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Scale className="size-6 text-primary" />
            {t('aiAct.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('aiAct.desc')}</p>
          <div className="space-y-2">
            {['t1', 't2', 't3', 't4'].map((id) => (
              <div key={id} className="flex gap-3 rounded-md border px-4 py-3 text-sm">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{t(`aiAct.timeline.${id}` as any)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Levels */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-6 text-amber-500" />
            {t('riskLevels.title')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {RISK_LEVELS.map(({ key, color, borderColor }) => (
              <Card key={key} className={`border-t-4 ${borderColor}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">{t(`riskLevels.${key}.title`)}</p>
                    <Badge className={RISK_BG[color]}>{t(`riskLevels.${key}.label`)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(`riskLevels.${key}.desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* KMU Relevance */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('kmuRelevance.title')}</h2>
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {t(`kmuRelevance.items.${id}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* DSGVO */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <Shield className="size-6 text-primary" />
            {t('dsgvo.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('dsgvo.desc')}</p>
          <div className="space-y-3">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <Card key={id}>
                <CardContent className="flex gap-3 pt-4">
                  <Shield className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">{t(`dsgvo.items.${id}.title` as any)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`dsgvo.items.${id}.desc` as any)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <CheckSquare className="size-6 text-primary" />
            {t('checklist.title')}
          </h2>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{checkedCount}/{checklistIds.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${(checkedCount / checklistIds.length) * 100}%` }} />
              </div>
              <div className="space-y-1">
                {checklistIds.map((id) => {
                  const isChecked = checked[id] || false;
                  return (
                    <button
                      key={id}
                      onClick={() => toggle(id)}
                      className={`w-full flex items-start gap-3 rounded-md p-2 text-left transition-colors hover:bg-muted/50 ${isChecked ? 'opacity-60' : ''}`}
                    >
                      <CheckSquare className={`mt-0.5 size-4 shrink-0 ${isChecked ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                        {t(`checklist.items.${id}` as any)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4', 'i5'].map((id) => (
              <p key={id} className="flex gap-2 text-sm text-emerald-900">
                <Lightbulb className="mt-0.5 size-4 shrink-0" />
                {t(`tips.items.${id}` as any)}
              </p>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mb-8 rounded-lg bg-primary/5 border-2 border-primary/20 p-6 text-center">
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('selbsterklaerung.title')}</p>
          <Link
            href="/wissen/selbsterklaerung"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {tWissen('selbsterklaerung.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
