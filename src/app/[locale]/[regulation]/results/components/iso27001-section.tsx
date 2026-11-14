'use client';

import { useLocale, useTranslations } from 'next-intl';
import { FileCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ISO27001_MAPPINGS, ISO27001_SOURCE } from '@/lib/regulations/nis2/iso27001';
import { levelLabel } from '@/lib/regulations/overlaps';
import { CATEGORIES } from '@/lib/regulations/nis2/categories';

export function Iso27001Section() {
  const t = useTranslations('iso27001Mapping');
  const tCat = useTranslations('categories');

  const locale = useLocale();

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <FileCheck className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">{t('subtitle')}</p>
      <p className="mb-6 text-sm text-muted-foreground">
        {t('sourceNote')}{' '}
        <a href={ISO27001_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">
          {ISO27001_SOURCE.label}
        </a>
      </p>

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
              const gapKey = mapping.gapNoteKey.replace('iso27001Mapping.gaps.', '');

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
                    <Badge variant={mapping.level === 'high' ? 'default' : 'secondary'}>
                      {levelLabel(mapping.level, locale)}
                    </Badge>
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
