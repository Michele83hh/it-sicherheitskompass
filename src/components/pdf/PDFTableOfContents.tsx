import { Text, View } from '@react-pdf/renderer';
import { COLORS } from '@/lib/pdf/styles';
import type { PDFMessages } from '@/lib/pdf/types';

interface TOCEntry {
  number: number;
  title: string;
  description: string;
  group: 'core' | 'analysis' | 'expert';
}

interface PDFTableOfContentsProps {
  messages: PDFMessages;
  locale: 'de' | 'en';
  sectionNumbers: Record<string, number>;
  hasExecutiveSummary: boolean;
  hasPenalty: boolean;
  hasCostSummary: boolean;
  hasRoadmap: boolean;
  hasSectorGuidance: boolean;
  hasDsgvoOverlap: boolean;
  hasIso27001: boolean;
  hasDinSpec: boolean;
  hasEvidence: boolean;
  hasKritis: boolean;
  hasProgress: boolean;
}

const PDFTableOfContents = ({
  messages,
  locale,
  sectionNumbers,
  hasExecutiveSummary,
  hasPenalty,
  hasCostSummary,
  hasRoadmap,
  hasSectorGuidance,
  hasDsgvoOverlap,
  hasIso27001,
  hasDinSpec,
  hasEvidence,
  hasKritis,
  hasProgress,
}: PDFTableOfContentsProps) => {
  const de = locale === 'de';

  // Build TOC entries based on which sections exist
  const entries: TOCEntry[] = [];

  if (hasExecutiveSummary && sectionNumbers.executive) {
    entries.push({
      number: sectionNumbers.executive,
      title: messages['pdf.executive.title'] || (de ? 'Management-Zusammenfassung' : 'Executive Summary'),
      description: de ? 'KPI-Übersicht, Top-Risiken und Quick Wins' : 'KPI overview, top risks, and quick wins',
      group: 'core',
    });
  }

  if (sectionNumbers.categories) {
    entries.push({
      number: sectionNumbers.categories,
      title: messages['pdf.categories'] || (de ? 'Ergebnisse nach Kategorie' : 'Results by Category'),
      description: de ? 'Detaillierte Scores für jeden Maßnahmenbereich' : 'Detailed scores for each category',
      group: 'core',
    });
  }

  if (sectionNumbers.recommendations) {
    entries.push({
      number: sectionNumbers.recommendations,
      title: messages['pdf.recommendations'] || (de ? 'Handlungsempfehlungen' : 'Recommendations'),
      description: de ? 'Priorisierte Maßnahmen mit konkreten ersten Schritten' : 'Prioritized measures with concrete first steps',
      group: 'core',
    });
  }

  if (hasPenalty && sectionNumbers.penalty) {
    entries.push({
      number: sectionNumbers.penalty,
      title: messages['pdf.penalty.title'] || (de ? 'Bußgeldberechnung' : 'Penalty Calculation'),
      description: de ? 'Mögliche Sanktionen bei Nicht-Compliance' : 'Potential sanctions for non-compliance',
      group: 'analysis',
    });
  }

  if (hasCostSummary && sectionNumbers.costSummary) {
    entries.push({
      number: sectionNumbers.costSummary,
      title: messages['pdf.cost.title'] || (de ? 'Kostenschätzung' : 'Cost Estimation'),
      description: de ? 'Investitionsübersicht und Kostenrahmen' : 'Investment overview and cost framework',
      group: 'analysis',
    });
  }

  if (hasRoadmap && sectionNumbers.roadmap) {
    entries.push({
      number: sectionNumbers.roadmap,
      title: messages['pdf.roadmap.title'] || (de ? 'Umsetzungsfahrplan' : 'Implementation Roadmap'),
      description: de ? 'Drei-Phasen-Plan zur strukturierten Umsetzung' : 'Three-phase plan for structured implementation',
      group: 'analysis',
    });
  }

  if (hasSectorGuidance && sectionNumbers.sectorGuidance) {
    entries.push({
      number: sectionNumbers.sectorGuidance,
      title: messages['pdf.sector.title'] || (de ? 'Branchenspezifische Hinweise' : 'Sector-Specific Guidance'),
      description: de ? 'Hinweise passend zu Ihrer Branche' : 'Guidance tailored to your industry',
      group: 'analysis',
    });
  }

  if (hasDsgvoOverlap && sectionNumbers.dsgvoOverlap) {
    entries.push({
      number: sectionNumbers.dsgvoOverlap,
      title: messages['pdf.dsgvo.title'] || (de ? 'DSGVO-Überlappungsanalyse' : 'GDPR Overlap Analysis'),
      description: de ? 'Synergien zwischen NIS2 und DSGVO' : 'Synergies between NIS2 and GDPR',
      group: 'expert',
    });
  }

  if (hasIso27001 && sectionNumbers.iso27001) {
    entries.push({
      number: sectionNumbers.iso27001,
      title: messages['pdf.iso.title'] || 'ISO 27001:2022 Crosswalk',
      description: de ? 'Mapping zu ISO-27001-Controls' : 'Mapping to ISO 27001 controls',
      group: 'expert',
    });
  }

  if (hasDinSpec && sectionNumbers.dinSpec) {
    entries.push({
      number: sectionNumbers.dinSpec,
      title: messages['pdf.dinSpec.title'] || 'DIN SPEC 27076',
      description: de ? 'Vergleich mit DIN SPEC 27076' : 'Comparison with DIN SPEC 27076',
      group: 'expert',
    });
  }

  if (hasEvidence && sectionNumbers.evidence) {
    entries.push({
      number: sectionNumbers.evidence,
      title: messages['pdf.evidence.title'] || (de ? 'Nachweismanagement' : 'Evidence Management'),
      description: de ? 'Dokumentationsanforderungen und Nachweisführung' : 'Documentation requirements and evidence tracking',
      group: 'expert',
    });
  }

  if (hasKritis && sectionNumbers.kritis) {
    entries.push({
      number: sectionNumbers.kritis,
      title: messages['pdf.kritis.title'] || (de ? 'KRITIS-Einstufung' : 'KRITIS Classification'),
      description: de ? 'Bewertung der Kritischen-Infrastruktur-Einstufung' : 'Critical infrastructure classification assessment',
      group: 'expert',
    });
  }

  if (hasProgress && sectionNumbers.progress) {
    entries.push({
      number: sectionNumbers.progress,
      title: messages['pdf.progress.title'] || (de ? 'Umsetzungsfortschritt' : 'Implementation Progress'),
      description: de ? 'Aktueller Stand der Maßnahmenumsetzung' : 'Current status of measure implementation',
      group: 'core',
    });
  }

  if (sectionNumbers.glossary) {
    entries.push({
      number: sectionNumbers.glossary,
      title: messages['pdf.glossary.title'] || (de ? 'Glossar' : 'Glossary'),
      description: de ? 'Fachbegriffe in Alltagssprache erklärt' : 'Technical terms explained in plain language',
      group: 'core',
    });
  }

  // Group labels
  const groupLabels: Record<string, string> = de
    ? { core: 'Kernanalyse', analysis: 'Vertiefende Analyse', expert: 'Expertenanhang' }
    : { core: 'Core Analysis', analysis: 'Deep Analysis', expert: 'Expert Appendix' };

  // Group entries
  const groups: { key: string; label: string; items: TOCEntry[] }[] = [];
  for (const groupKey of ['core', 'analysis', 'expert'] as const) {
    const items = entries.filter(e => e.group === groupKey);
    if (items.length > 0) {
      groups.push({ key: groupKey, label: groupLabels[groupKey], items });
    }
  }

  return (
    <View>
      {/* Page title */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.gray900,
          marginBottom: 4,
        }}>
          {messages['pdf.toc.title'] || (de ? 'Inhaltsverzeichnis' : 'Table of Contents')}
        </Text>
        <View style={{ width: 40, height: 3, backgroundColor: COLORS.primary, borderRadius: 1 }} />
      </View>

      {/* Groups */}
      {groups.map((group) => (
        <View key={group.key} style={{ marginBottom: 20 }}>
          {/* Group label */}
          <Text style={{
            fontSize: 9,
            fontWeight: 600,
            color: COLORS.gray500,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            marginBottom: 10,
          }}>
            {group.label}
          </Text>

          {/* Entries */}
          {group.items.map((entry) => (
            <View key={entry.number} style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 12,
              gap: 12,
            }}>
              {/* Section number circle */}
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.white }}>
                  {entry.number}
                </Text>
              </View>

              {/* Title + description */}
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.gray900,
                  marginBottom: 2,
                }}>
                  {entry.title}
                </Text>
                <Text style={{
                  fontSize: 9,
                  color: COLORS.gray500,
                  lineHeight: 1.3,
                }}>
                  {entry.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default PDFTableOfContents;
