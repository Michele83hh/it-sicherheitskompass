'use client';

import { useTranslations } from 'next-intl';
import { ClipboardCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EVIDENCE_ITEMS, getEvidenceByCategory } from '@/lib/nis2/evidence';
import { CATEGORIES } from '@/lib/nis2/categories';

interface EvidenceSectionProps {
  classification: 'besonders-wichtig' | 'wichtig';
}

export function EvidenceSection({ classification }: EvidenceSectionProps) {
  const t = useTranslations('evidence');
  const tCat = useTranslations('categories');

  const filteredItems = EVIDENCE_ITEMS.filter((e) => e.requiredFor.includes(classification));

  // Group by category
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: filteredItems.filter((e) => e.categoryId === cat.id),
  })).filter((g) => g.items.length > 0);

  const typeColors: Record<string, string> = {
    'evidence.types.document': 'bg-blue-100 text-blue-800',
    'evidence.types.record': 'bg-green-100 text-green-800',
    'evidence.types.log': 'bg-purple-100 text-purple-800',
    'evidence.types.certificate': 'bg-amber-100 text-amber-800',
  };

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <ClipboardCheck className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      <div className="space-y-6">
        {grouped.map(({ category, items }) => {
          const catName = tCat(category.shortNameKey.replace('categories.', ''));
          return (
            <div key={category.id}>
              <h3 className="mb-3 text-lg font-semibold">{catName}</h3>
              <div className="space-y-2">
                {items.map((item) => {
                  const textKey = item.textKey.replace('evidence.items.', '');
                  return (
                    <div key={item.id} className="flex items-center gap-3 rounded-md border p-3">
                      <Badge className={typeColors[item.typeKey] || 'bg-gray-100 text-gray-800'}>
                        {t(item.typeKey.replace('evidence.', ''))}
                      </Badge>
                      <span className="text-sm">{t(`items.${textKey}`)}</span>
                      {item.requiredFor.length === 1 && item.requiredFor[0] === 'besonders-wichtig' && (
                        <Badge variant="outline" className="ml-auto text-xs">{t('besondersWichtig')}</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">{t('legalBasis')}</p>
    </section>
  );
}
