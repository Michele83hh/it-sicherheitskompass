'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Image, ChevronLeft, Shield, AlertTriangle, Key, Siren, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const POSTERS = [
  { id: 'rules', icon: Shield, color: 'text-emerald-500', items: 10 },
  { id: 'phishing', icon: AlertTriangle, color: 'text-amber-500', items: 8 },
  { id: 'password', icon: Key, color: 'text-blue-500', items: 6 },
  { id: 'incident', icon: Siren, color: 'text-red-500', items: 6 },
] as const;

export default function PosterPage() {
  const t = useTranslations('wissenPages.poster');
  const tWissen = useTranslations('wissenPages');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Image className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {POSTERS.map(({ id, icon: Icon, color, items }) => (
          <section key={id} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold flex items-center gap-2"><Icon className={`size-6 ${color}`} />{t(`posters.${id}.title` as any)}</h2>
            <Card className="border-2">
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground mb-4">{t(`posters.${id}.desc` as any)}</p>
                <div className="space-y-2">
                  {Array.from({ length: items }, (_, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</div>
                      <p className="text-sm">{t(`posters.${id}.items.i${i + 1}` as any)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        ))}

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('tips.title')}</h2>
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-5 space-y-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
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
