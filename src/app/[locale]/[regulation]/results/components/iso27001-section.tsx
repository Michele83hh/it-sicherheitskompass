'use client';

import { useTranslations } from 'next-intl';
import { FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ISO27001_MAPPINGS, calculateOverallAlignment } from '@/lib/regulations/nis2/iso27001';
import { CATEGORIES } from '@/lib/regulations/nis2/categories';

export function Iso27001Section() {
  const t = useTranslations('iso27001');
  const tCat = useTranslations('categories');

  const overallAlignment = calculateOverallAlignment();

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <FileCheck className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Overall alignment */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{t('overallAlignment')}</span>
            <span className="text-2xl font-bold">~{overallAlignment}%</span>
          </div>
          <Progress value={overallAlignment} className="[&>div]:bg-green-500" />
        </CardContent>
      </Card>

      {/* Mapping table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-semibold">{t('nis2Category')}</th>
              <th className="p-3 text-left font-semibold">{t('isoControls')}</th>
              <th className="p-3 text-center font-semibold">{t('alignment')}</th>
              <th className="p-3 text-left font-semibold">{t('gap')}</th>
            </tr>
          </thead>
          <tbody>
            {ISO27001_MAPPINGS.map((mapping) => {
              const category = CATEGORIES.find((c) => c.id === mapping.nis2CategoryId);
              const catName = category ? tCat(category.shortNameKey.replace('categories.', '')) : mapping.nis2CategoryId;
              const gapKey = mapping.gapNoteKey.replace('iso27001.gaps.', '');

              return (
                <tr key={mapping.nis2CategoryId} className="border-b">
                  <td className="p-3 font-medium">{catName}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {mapping.isoControls.map((ctrl) => (
                        <Badge key={ctrl} variant="outline" className="text-xs">{ctrl}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="mx-auto w-20">
                      <Progress value={mapping.alignmentPercentage} className="[&>div]:bg-green-500" />
                    </div>
                    <span className="text-xs">{mapping.alignmentPercentage}%</span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{t(`gaps.${gapKey}`)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
