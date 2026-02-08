'use client';

import { useTranslations } from 'next-intl';
import { ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function KritisSection() {
  const t = useTranslations('kritis');

  const requirements = ['attackDetection', 'continuousMonitoring', 'evidence', 'audits', 'higherPenalties'] as const;
  const comparisonRows = ['attackDetection', 'evidence', 'audits', 'penalties'] as const;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <ShieldAlert className="size-6 text-red-600" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">{t('subtitle')}</p>
      <p className="mb-6 text-sm text-muted-foreground">{t('intro')}</p>

      {/* Requirements */}
      <div className="mb-8 space-y-4">
        <h3 className="text-lg font-semibold">{t('requirements.title')}</h3>
        {requirements.map((req) => (
          <Card key={req}>
            <CardContent className="flex items-start gap-3 pt-4">
              <Badge className="shrink-0 bg-red-100 text-red-800">KRITIS</Badge>
              <div>
                <p className="font-medium">{t(`requirements.${req}.title`)}</p>
                <p className="text-sm text-muted-foreground">{t(`requirements.${req}.description`)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison table */}
      <h3 className="mb-4 text-lg font-semibold">{t('comparison.title')}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-semibold">{t('comparison.header.aspect')}</th>
              <th className="p-3 text-left font-semibold">{t('comparison.header.standardNis2')}</th>
              <th className="p-3 text-left font-semibold">{t('comparison.header.kritis')}</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row} className="border-b">
                <td className="p-3 font-medium">{t(`comparison.rows.${row}.aspect`)}</td>
                <td className="p-3">{t(`comparison.rows.${row}.standard`)}</td>
                <td className="p-3 font-semibold text-red-800">{t(`comparison.rows.${row}.kritis`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{t('legalBasis')}</p>
    </section>
  );
}
