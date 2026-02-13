'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Shield, ChevronLeft, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';
import { useState } from 'react';

const ATTACKS = ['phishing', 'ransomware', 'supplyChain', 'insider', 'bruteForce'] as const;
const ATTACK_COLORS: Record<string, { border: string; bg: string; text: string }> = {
  phishing: { border: 'border-l-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  ransomware: { border: 'border-l-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  supplyChain: { border: 'border-l-violet-500', bg: 'bg-violet-50', text: 'text-violet-700' },
  insider: { border: 'border-l-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
  bruteForce: { border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
};

const STEP_COUNTS: Record<string, number> = {
  phishing: 5, ransomware: 6, supplyChain: 5, insider: 5, bruteForce: 5,
};

const KILL_CHAIN = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

export default function AngriffspfadePage() {
  const t = useTranslations('wissenPages.angriffspfade');
  const tWissen = useTranslations('wissenPages');
  const [expandedAttack, setExpandedAttack] = useState<string | null>(null);

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Shield className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Attack Paths */}
        <div className="space-y-6 mb-10">
          {ATTACKS.map((attack) => {
            const colors = ATTACK_COLORS[attack];
            const stepCount = STEP_COUNTS[attack];
            const isExpanded = expandedAttack === attack;
            const stepIds = Array.from({ length: stepCount }, (_, i) => `s${i + 1}`);

            return (
              <Card key={attack} className={`border-l-4 ${colors.border}`}>
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedAttack(isExpanded ? null : attack)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t(`attacks.${attack}.title`)}</CardTitle>
                    <span className={`text-xs ${isExpanded ? 'rotate-90' : ''} transition-transform`}>▶</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(`attacks.${attack}.desc`)}</p>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="space-y-4">
                    {/* Attack Steps */}
                    <div className="space-y-2">
                      {stepIds.map((sId, idx) => (
                        <div key={sId} className="flex gap-3 items-start">
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${colors.bg} ${colors.text} text-xs font-bold`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <span className="text-sm">{t(`attacks.${attack}.steps.${sId}` as any)}</span>
                            {idx < stepIds.length - 1 && <ArrowRight className="size-3 shrink-0 text-muted-foreground" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Defense */}
                    <div className={`rounded-md ${colors.bg} p-3`}>
                      <p className={`text-xs font-bold ${colors.text} mb-1`}>Abwehr:</p>
                      <p className={`text-xs ${colors.text}`}>{t(`attacks.${attack}.defense`)}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Kill Chain */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-6 text-red-500" />
            {t('killchain.title')}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('killchain.desc')}</p>
          <div className="space-y-2">
            {KILL_CHAIN.map((pId, idx) => (
              <div key={pId} className="flex gap-3 items-center rounded-md border px-4 py-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${idx < 3 ? 'bg-blue-500' : idx < 5 ? 'bg-amber-500' : 'bg-red-500'}`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t(`killchain.phases.${pId}.title` as any)}</p>
                  <p className="text-xs text-muted-foreground">{t(`killchain.phases.${pId}.desc` as any)}</p>
                </div>
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
          <p className="text-sm text-foreground mb-3 font-medium">{tWissen('awarenessQuiz.title')}</p>
          <Link
            href="/wissen/awareness-quiz"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            {tWissen('awarenessQuiz.startButton')}
          </Link>
        </div>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
