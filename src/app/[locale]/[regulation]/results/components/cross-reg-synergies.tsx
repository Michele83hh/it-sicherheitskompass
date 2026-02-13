'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GitCompare, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getOverlapsForRegulation } from '@/lib/regulations/overlaps';
import { getRegulation } from '@/lib/regulations/registry';
import type { RegulationId } from '@/lib/regulations/types';
import '@/lib/regulations/init';

interface SynergyItem {
  targetRegId: RegulationId;
  targetName: string;
  targetIcon: string;
  overlapPercent: number;
  sharedTopics: string[];
  descriptionKey: string;
  hasAssessment: boolean;
  otherScore?: number;
}

export function CrossRegSynergies() {
  const params = useParams();
  const regulation = params?.regulation as string;
  const locale = params?.locale as 'de' | 'en';
  const tAll = useTranslations();
  const tPlatform = useTranslations('platform');

  const synergies = useMemo<SynergyItem[]>(() => {
    const overlaps = getOverlapsForRegulation(regulation as RegulationId);
    if (!overlaps.length) return [];

    return overlaps
      .sort((a, b) => b.overlapPercent - a.overlapPercent)
      .map((overlap) => {
        const otherRegId = overlap.regA === regulation ? overlap.regB : overlap.regA;
        const otherConfig = getRegulation(otherRegId);
        if (!otherConfig) return null;

        // Check if the other regulation has been assessed (localStorage)
        let hasAssessment = false;
        let otherScore: number | undefined;
        try {
          const raw = localStorage.getItem(`${otherRegId}-assessment-storage`);
          if (raw) {
            const data = JSON.parse(raw);
            hasAssessment = data?.answers?.length > 0;
          }
        } catch { /* ignore */ }

        // Get shared topic labels
        const sharedTopics = overlap.sharedMeasureKeys.map((key) => {
          try {
            return tAll(key);
          } catch {
            return key.split('.').pop() || key;
          }
        });

        return {
          targetRegId: otherRegId,
          targetName: tAll(otherConfig.nameKey),
          targetIcon: otherConfig.icon,
          overlapPercent: overlap.overlapPercent,
          sharedTopics,
          descriptionKey: overlap.descriptionKey,
          hasAssessment,
          otherScore,
        } as SynergyItem;
      })
      .filter(Boolean) as SynergyItem[];
  }, [regulation, tAll]);

  if (synergies.length === 0) return null;

  const regConfig = getRegulation(regulation as RegulationId);
  const regName = regConfig ? tAll(regConfig.nameKey) : regulation.toUpperCase();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <GitCompare className="size-5 text-primary" />
        <h3 className="text-lg font-semibold">
          {locale === 'de' ? 'Synergien mit anderen Regelwerken' : 'Synergies with other regulations'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {locale === 'de'
          ? `Ihre ${regName}-Bewertung hat Überlappungen mit ${synergies.length} weiteren Regelwerken. Bereits umgesetzte Maßnahmen gelten oft auch dort.`
          : `Your ${regName} assessment overlaps with ${synergies.length} other regulations. Measures already implemented often apply there too.`}
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {synergies.map((syn) => (
          <Card key={syn.targetRegId} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{syn.targetIcon}</span>
                  <div>
                    <div className="font-medium text-sm">{syn.targetName}</div>
                    {syn.hasAssessment && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="size-3" />
                        {locale === 'de' ? 'Bewertet' : 'Assessed'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`text-sm font-bold ${
                    syn.overlapPercent >= 70 ? 'text-green-600' :
                    syn.overlapPercent >= 50 ? 'text-amber-600' : 'text-blue-600'
                  }`}>
                    {syn.overlapPercent}%
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {locale === 'de' ? 'Überlappung' : 'overlap'}
                  </span>
                </div>
              </div>

              {/* Overlap bar */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    syn.overlapPercent >= 70 ? 'bg-green-500' :
                    syn.overlapPercent >= 50 ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${syn.overlapPercent}%` }}
                />
              </div>

              {/* Shared topics as tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {syn.sharedTopics.slice(0, 4).map((topic, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
                {syn.sharedTopics.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{syn.sharedTopics.length - 4}
                  </span>
                )}
              </div>

              {/* Synergy description */}
              <p className="mt-2 text-xs text-muted-foreground">
                {locale === 'de'
                  ? `Diese Bewertung deckt ~${syn.overlapPercent}% der ${syn.targetName}-Anforderungen ab`
                  : `This assessment covers ~${syn.overlapPercent}% of ${syn.targetName} requirements`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
        <Info className="size-4 mt-0.5 shrink-0" />
        <span>
          {locale === 'de'
            ? 'Prozentsätze sind Näherungswerte auf Basis gemeinsamer Maßnahmenkategorien. Eine vollständige Compliance erfordert immer die individuelle Prüfung jedes Regelwerks.'
            : 'Percentages are approximations based on shared measure categories. Full compliance always requires individual assessment of each regulation.'}
        </span>
      </div>
    </div>
  );
}
