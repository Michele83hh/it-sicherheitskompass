'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ClipboardList, ChevronLeft, CheckSquare, Siren, UserPlus, UserMinus, RefreshCw, HardDrive } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';
import { useState } from 'react';

const CHECKLISTS = [
  { key: 'incident', icon: Siren, color: 'red', items: 13 },
  { key: 'onboarding', icon: UserPlus, color: 'emerald', items: 11 },
  { key: 'offboarding', icon: UserMinus, color: 'amber', items: 10 },
  { key: 'patchManagement', icon: RefreshCw, color: 'blue', items: 9 },
  { key: 'backup', icon: HardDrive, color: 'violet', items: 10 },
] as const;

const COLOR_BORDER: Record<string, string> = {
  red: 'border-l-red-500', emerald: 'border-l-emerald-500', amber: 'border-l-amber-500', blue: 'border-l-blue-500', violet: 'border-l-violet-500'
};

export default function ChecklistenPage() {
  const t = useTranslations('wissenPages.checklisten');
  const tWissen = useTranslations('wissenPages');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <ClipboardList className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <div className="space-y-10">
          {CHECKLISTS.map(({ key, icon: Icon, color, items: itemCount }) => {
            const itemIds = Array.from({ length: itemCount }, (_, i) => `i${i + 1}`);
            const checkedCount = itemIds.filter((id) => checked[`${key}-${id}`]).length;

            return (
              <section key={key}>
                <Card className={`border-l-4 ${COLOR_BORDER[color]}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon className="size-5" />
                        {t(`lists.${key}.title`)}
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">{checkedCount}/{itemCount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(`lists.${key}.desc`)}</p>
                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${(checkedCount / itemCount) * 100}%` }} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {itemIds.map((id) => {
                      const checkKey = `${key}-${id}`;
                      const isChecked = checked[checkKey] || false;
                      return (
                        <button
                          key={id}
                          onClick={() => toggle(checkKey)}
                          className={`w-full flex items-start gap-3 rounded-md p-2 text-left transition-colors hover:bg-muted/50 ${isChecked ? 'opacity-60' : ''}`}
                        >
                          <CheckSquare className={`mt-0.5 size-4 shrink-0 ${isChecked ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                          <span className={`text-sm ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                            {t(`lists.${key}.items.${id}` as any)}
                          </span>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>
              </section>
            );
          })}
        </div>

        <div className="mt-12">
          <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
          </Link>
        </div>
      </div>
    </div>
  );
}
