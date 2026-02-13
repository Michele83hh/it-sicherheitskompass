'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { FileText, ChevronLeft, Shield, Cog, Scale, Server, Lightbulb, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const CATEGORIES = [
  { key: 'policies', icon: Shield, color: 'blue', templates: 3 },
  { key: 'processes', icon: Cog, color: 'emerald', templates: 3 },
  { key: 'compliance', icon: Scale, color: 'violet', templates: 3 },
  { key: 'technical', icon: Server, color: 'amber', templates: 3 },
] as const;

const COLOR_MAP: Record<string, { border: string; badge: string }> = {
  blue: { border: 'border-l-blue-500', badge: 'bg-blue-100 text-blue-700' },
  emerald: { border: 'border-l-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
  violet: { border: 'border-l-violet-500', badge: 'bg-violet-100 text-violet-700' },
  amber: { border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700' },
};

export default function VorlagenPage() {
  const t = useTranslations('wissenPages.vorlagen');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <FileText className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Template Categories */}
        <div className="space-y-10">
          {CATEGORIES.map(({ key, icon: Icon, color, templates: templateCount }) => (
            <section key={key}>
              <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
                <Icon className="size-6 text-primary" />
                {t(`categories.${key}.title`)}
              </h2>
              <div className="space-y-4">
                {Array.from({ length: templateCount }, (_, i) => `t${i + 1}`).map((tId) => (
                  <Card key={tId} className={`border-l-4 ${COLOR_MAP[color].border}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-sm mb-1">{t(`categories.${key}.templates.${tId}.title` as any)}</p>
                          <p className="text-xs text-muted-foreground mb-2">{t(`categories.${key}.templates.${tId}.desc` as any)}</p>
                          <p className="text-xs text-muted-foreground/80">
                            <span className="font-medium">{t(`categories.${key}.templates.${tId}.sections` as any)}</span>
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0 flex items-center gap-1">
                          <Clock className="size-3" />
                          {t(`categories.${key}.templates.${tId}.effort` as any)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* How To */}
        <section className="mt-12 mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('howTo.title')}</h2>
          <div className="space-y-2">
            {['s1', 's2', 's3', 's4', 's5'].map((id, idx) => (
              <div key={id} className="flex gap-3 rounded-md border px-4 py-3 text-sm">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <span>{t(`howTo.steps.${id}` as any)}</span>
              </div>
            ))}
          </div>
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
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('checklisten.title')}</p>
          <Link
            href="/wissen/checklisten"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {tWissen('checklisten.title')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
