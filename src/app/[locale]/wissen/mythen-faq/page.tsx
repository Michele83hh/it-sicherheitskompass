'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ShieldAlert, ChevronLeft, ChevronDown, XCircle, CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';
import { useState } from 'react';

const MYTH_IDS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10'] as const;
const FAQ_IDS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default function MythenFaqPage() {
  const t = useTranslations('wissenPages.mythenFaq');
  const tWissen = useTranslations('wissenPages');
  const [openMyth, setOpenMyth] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <ShieldAlert className="size-7 text-white" />
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

        {/* Mythen */}
        <section className="mb-14">
          <div className="space-y-3">
            {MYTH_IDS.map((id, idx) => {
              const isOpen = openMyth === id;
              return (
                <div key={id} className="rounded-lg border overflow-hidden">
                  <button
                    onClick={() => setOpenMyth(isOpen ? null : id)}
                    className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        <span className="text-muted-foreground mr-1.5">#{idx + 1}</span>
                        {t(`myths.${id}.myth`)}
                      </p>
                    </div>
                    <ChevronDown className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t bg-emerald-50 p-4 space-y-2">
                      <div className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                        <div>
                          <p className="text-sm text-emerald-900 font-medium mb-1">Fakt:</p>
                          <p className="text-sm text-emerald-800">{t(`myths.${id}.fact`)}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-7 text-xs text-muted-foreground">
                        {t(`myths.${id}.source`)}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="size-6 text-primary" />
            {t('faq.title')}
          </h2>
          <div className="space-y-3">
            {FAQ_IDS.map((id) => {
              const isOpen = openFaq === id;
              return (
                <div key={id} className="rounded-lg border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : id)}
                    className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="flex-1 font-medium text-sm">{t(`faq.${id}.question`)}</p>
                    <ChevronDown className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground ml-8">{t(`faq.${id}.answer`)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" />
          {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
