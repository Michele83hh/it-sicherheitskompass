import { Text, View } from '@react-pdf/renderer';
import { COLORS } from '@/lib/pdf/styles';
import type { PDFCrossRegOverlap, PDFMessages } from '@/lib/pdf/types';
import { levelLabel } from '@/lib/regulations/overlaps';
import type { OverlapLevel } from '@/lib/regulations/overlaps';

interface PDFCrossRegSynergiesProps {
  overlaps: PDFCrossRegOverlap[];
  messages: PDFMessages;
  locale: 'de' | 'en';
  sectionNumber: number;
}

function getOverlapColor(level: OverlapLevel): string {
  if (level === 'high') return COLORS.green;
  if (level === 'medium') return '#ca8a04'; // amber
  return COLORS.primary;
}

function getOverlapBg(level: OverlapLevel): string {
  if (level === 'high') return COLORS.greenBg;
  if (level === 'medium') return COLORS.yellowBg;
  return COLORS.primaryLight;
}

const PDFCrossRegSynergiesSection = ({
  overlaps,
  messages,
  locale,
  sectionNumber,
}: PDFCrossRegSynergiesProps) => {
  const title = locale === 'de' ? 'Regelwerks-Synergien' : 'Regulation Synergies';
  const subtitle = locale === 'de'
    ? 'Überlappungen mit anderen Sicherheitsstandards und Vorschriften'
    : 'Overlaps with other security standards and regulations';

  return (
    <View>
      {/* Section header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: 700, color: COLORS.gray900 }}>
          {sectionNumber}. {title}
        </Text>
      </View>
      <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 16 }}>
        {subtitle}
      </Text>

      {/* Overlap cards */}
      {overlaps.map((overlap, idx) => {
        const color = getOverlapColor(overlap.level);
        const bgColor = getOverlapBg(overlap.level);

        return (
          <View
            key={idx}
            style={{
              marginBottom: 10,
              padding: 10,
              borderRadius: 4,
              border: `0.5 solid ${COLORS.gray200}`,
              backgroundColor: COLORS.white,
            }}
          >
            {/* Header row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray900 }}>
                {overlap.targetRegulation}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontSize: 12, fontWeight: 700, color }}>
                  {levelLabel(overlap.level, locale)}
                </Text>
                <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
                  {locale === 'de' ? 'Überschneidung' : 'overlap'}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 6 }}>
              {locale === 'de' ? 'Quelle: ' : 'Source: '}{overlap.source}
            </Text>

            {/* Shared topics */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
              {overlap.sharedTopics.map((topic, tIdx) => (
                <View
                  key={tIdx}
                  style={{
                    backgroundColor: bgColor,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text style={{ fontSize: 7, color }}>
                    {topic}
                  </Text>
                </View>
              ))}
            </View>

            {/* Assessment status */}
            {overlap.hasAssessment && (
              <Text style={{ fontSize: 7, color: COLORS.green, marginTop: 4 }}>
                {locale === 'de' ? '✓ Bereits bewertet' : '✓ Already assessed'}
                {overlap.otherScore !== undefined && ` — ${overlap.otherScore}%`}
              </Text>
            )}
          </View>
        );
      })}

      {/* Disclaimer */}
      <View style={{ marginTop: 8, padding: 8, backgroundColor: COLORS.primaryLight, borderRadius: 4 }}>
        <Text style={{ fontSize: 7, color: COLORS.primary }}>
          {locale === 'de'
            ? 'Hinweis: Die Stufen (stark, mittel, gering) sind eine Einordnung. Die Quelle belegt, wo sich die Regelwerke überschneiden; ohne Quelle ist es eine eigene Einschätzung. Eine Überschneidung ersetzt nie die Prüfung jedes einzelnen Regelwerks.'
            : 'Note: The levels (strong, moderate, minor) are a classification. The source shows where the regulations overlap; without a source it is our own assessment. An overlap never replaces assessing each regulation on its own.'}
        </Text>
      </View>
    </View>
  );
};

export default PDFCrossRegSynergiesSection;
