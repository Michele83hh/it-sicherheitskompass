'use client';

import { useTranslations } from 'next-intl';
import { Building2, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getSectorGuidance, hasSectorGuidance } from '@/lib/nis2/sector-guidance';

interface SectorGuidanceSectionProps {
  sectorId: string;
}

export function SectorGuidanceSection({ sectorId }: SectorGuidanceSectionProps) {
  const t = useTranslations('sectorGuidance');

  if (!hasSectorGuidance(sectorId)) {
    return (
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="size-6 text-primary" />
          <h2 className="text-2xl font-bold">{t('title')}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{t('noGuidance')}</p>
      </section>
    );
  }

  const guidance = getSectorGuidance(sectorId)!;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Additional regulations */}
      <h3 className="mb-4 text-lg font-semibold">{t('additionalRegulations')}</h3>
      <div className="mb-8 space-y-4">
        {guidance.additionalRegulations.map((reg) => {
          const nameKey = reg.nameKey.replace('sectorGuidance.', '');
          const descKey = reg.descriptionKey.replace('sectorGuidance.', '');
          return (
            <Card key={reg.nameKey}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{t(nameKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(descKey)}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">{reg.legalBasis}</Badge>
                </div>
                {reg.url && (
                  <a href={reg.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                    Mehr erfahren <ExternalLink className="size-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Challenges */}
      <h3 className="mb-4 text-lg font-semibold">{t('challenges')}</h3>
      <p className="mb-8 text-sm text-muted-foreground">
        {t(guidance.specificChallengesKey.replace('sectorGuidance.', ''))}
      </p>

      {/* Recommendations */}
      <h3 className="mb-4 text-lg font-semibold">{t('recommendations')}</h3>
      <p className="text-sm text-muted-foreground">
        {t(guidance.recommendationsKey.replace('sectorGuidance.', ''))}
      </p>
    </section>
  );
}
