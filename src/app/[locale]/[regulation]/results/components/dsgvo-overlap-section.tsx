'use client';

import { useTranslations } from 'next-intl';
import { GitCompare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NIS2_DSGVO_OVERLAPS, calculateOverallOverlap } from '@/lib/regulations/nis2/dsgvo-overlap';

export function DsgvoOverlapSection() {
  const t = useTranslations('dsgvoOverlap');
  const overallOverlap = calculateOverallOverlap();
  const mappingKeys = [
    'riskAssessment', 'incidentHandling', 'businessContinuity', 'supplyChain',
    'securityMeasures', 'effectiveness', 'training', 'encryption', 'accessControl', 'documentation'
  ] as const;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <GitCompare className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Overall overlap */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{t('overallOverlap')}</span>
            <span className="text-2xl font-bold">~{overallOverlap}%</span>
          </div>
          <Progress value={overallOverlap} className="[&>div]:bg-blue-500" />
        </CardContent>
      </Card>

      {/* Mapping table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-semibold">{t('category')}</th>
              <th className="p-3 text-left font-semibold">{t('dsgvoArticle')}</th>
              <th className="p-3 text-center font-semibold">{t('overlap')}</th>
              <th className="p-3 text-left font-semibold">{t('gapNote')}</th>
            </tr>
          </thead>
          <tbody>
            {NIS2_DSGVO_OVERLAPS.map((mapping, index) => {
              const key = mappingKeys[index];

              return (
                <tr key={mapping.id} className="border-b">
                  <td className="p-3 font-medium">{t(`mappings.${key}.nis2`)}</td>
                  <td className="p-3">{t(`mappings.${key}.dsgvo`)}</td>
                  <td className="p-3 text-center">
                    <Progress value={mapping.overlapPercentage} className="mx-auto w-20 [&>div]:bg-blue-500" />
                    <span className="text-xs">{mapping.overlapPercentage}%</span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{t(`mappings.${key}.gap`)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{t('legalBasis')}</p>
    </section>
  );
}
