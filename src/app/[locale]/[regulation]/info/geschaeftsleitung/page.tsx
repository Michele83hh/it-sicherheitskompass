'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Eye, GraduationCap, AlertCircle, Scale, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function GeschaeftsleitungPage() {
  const t = useTranslations('geschaeftsleitung');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistCategories = [
    {
      key: 'governance',
      icon: Shield,
      items: ['riskApproval', 'responsibility', 'budget'],
    },
    {
      key: 'training',
      icon: GraduationCap,
      items: ['schedule', 'completed', 'documented'],
    },
    {
      key: 'monitoring',
      icon: Eye,
      items: ['reporting', 'kpis', 'review'],
    },
    {
      key: 'legal',
      icon: Scale,
      items: ['insurance', 'documentation', 'compliance'],
    },
  ];

  const totalItems = checklistCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{t('intro')}</p>

      {/* Three core duties */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">{t('duties.title')}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 rounded-full bg-blue-100 p-3 w-fit">
                <Shield className="size-6 text-blue-600" />
              </div>
              <CardTitle className="text-base">{t('duties.implement.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">{t('duties.implement.description')}</p>
              <Badge variant="outline" className="text-xs">{t('duties.implement.legalBasis')}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 rounded-full bg-amber-100 p-3 w-fit">
                <Eye className="size-6 text-amber-600" />
              </div>
              <CardTitle className="text-base">{t('duties.monitor.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">{t('duties.monitor.description')}</p>
              <Badge variant="outline" className="text-xs">{t('duties.monitor.legalBasis')}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 rounded-full bg-green-100 p-3 w-fit">
                <GraduationCap className="size-6 text-green-600" />
              </div>
              <CardTitle className="text-base">{t('duties.train.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">{t('duties.train.description')}</p>
              <Badge variant="outline" className="text-xs">{t('duties.train.legalBasis')}</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Liability */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">{t('liability.title')}</h2>
        <div className="space-y-4">
          <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">{t('liability.personalLiability.title')}</p>
              <p className="text-sm text-red-800">{t('liability.personalLiability.description')}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">{t('liability.noWaiver.title')}</p>
              <p className="text-sm text-red-800">{t('liability.noWaiver.description')}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <BookOpen className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-900">{t('liability.training.title')}</p>
              <p className="text-sm text-amber-800">{t('liability.training.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive checklist */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('checklist.title')}</h2>
          <Badge className={checkedCount === totalItems ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}>
            {checkedCount}/{totalItems}
          </Badge>
        </div>
        <div className="space-y-6">
          {checklistCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.key}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="size-5 text-primary" />
                    <CardTitle className="text-base">{t(`checklist.${cat.key}.title`)}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cat.items.map((item) => {
                      const itemId = `${cat.key}-${item}`;
                      return (
                        <label key={itemId} htmlFor={itemId} className="flex cursor-pointer items-start gap-3">
                          <Checkbox
                            id={itemId}
                            checked={checkedItems[itemId] || false}
                            onCheckedChange={() => toggleItem(itemId)}
                          />
                          <span className={`text-sm ${checkedItems[itemId] ? 'text-muted-foreground line-through' : ''}`}>
                            {t(`checklist.${cat.key}.items.${item}`)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Legal basis */}
      <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
        {t('legalBasis')}
      </div>
      </div>
    </div>
  );
}
