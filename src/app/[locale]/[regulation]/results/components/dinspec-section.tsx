'use client';

import { useTranslations } from 'next-intl';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DIN_SPEC_AREAS, NIS2_BEYOND_DIN_SPEC } from '@/lib/regulations/nis2/din-spec';

export function DinSpecSection() {
  const t = useTranslations('dinSpec');

  const areaKeys = ['organization', 'awareness', 'identityAccess', 'dataBackup', 'patchManagement', 'protection'] as const;
  const comparisonRows = ['targetGroup', 'scope', 'mandatory', 'subsidy'] as const;
  const beyondKeys = [
    'incidentReporting', 'supplyChain', 'managementLiability', 'bsiRegistration',
    'critisRequirements', 'formalRiskAnalysis', 'incidentResponsePlan', 'crisisManagement',
  ] as const;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Comparison table */}
      <h3 className="mb-4 text-lg font-semibold">{t('comparison.title')}</h3>
      <div className="mb-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-semibold">{t('comparison.header.aspect')}</th>
              <th className="p-3 text-left font-semibold">{t('comparison.header.dinSpec')}</th>
              <th className="p-3 text-left font-semibold">{t('comparison.header.nis2')}</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row} className="border-b">
                <td className="p-3 font-medium">{t(`comparison.${row}.aspect`)}</td>
                <td className="p-3">{t(`comparison.${row}.dinSpec`)}</td>
                <td className="p-3">{t(`comparison.${row}.nis2`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Area mappings */}
      <h3 className="mb-4 text-lg font-semibold">{t('areas.title')}</h3>
      <div className="mb-8 space-y-3">
        {areaKeys.map((key) => (
          <Card key={key}>
            <CardContent className="pt-4">
              <p className="font-medium">{t(`areas.${key}.name`)}</p>
              <p className="text-sm text-muted-foreground">{t(`areas.${key}.coverage`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NIS2 beyond DIN SPEC */}
      <h3 className="mb-4 text-lg font-semibold">{t('beyond.title')}</h3>
      <div className="space-y-2">
        {beyondKeys.map((key) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <Badge className="bg-red-100 text-red-800">NIS2+</Badge>
            <span>{t(`beyond.items.${key}`)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a
          href="https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/KMU/CyberRisikoCheck/CyberRisikoCheck_node.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          BSI CyberRisikoCheck <ExternalLink className="size-3" />
        </a>
      </div>
    </section>
  );
}
