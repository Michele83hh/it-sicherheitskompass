import { Text, View, Svg, Rect } from '@react-pdf/renderer';
import { COLORS } from '@/lib/pdf/styles';
import type { PDFCrossRegOverlap, PDFMessages } from '@/lib/pdf/types';

interface PDFCrossRegSynergiesProps {
  overlaps: PDFCrossRegOverlap[];
  messages: PDFMessages;
  locale: 'de' | 'en';
  sectionNumber: number;
}

const BAR_WIDTH = 180;
const BAR_HEIGHT = 8;

function getOverlapColor(percent: number): string {
  if (percent >= 70) return COLORS.green;
  if (percent >= 50) return '#ca8a04'; // amber
  return COLORS.primary;
}

function getOverlapBg(percent: number): string {
  if (percent >= 70) return COLORS.greenBg;
  if (percent >= 50) return COLORS.yellowBg;
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
        const color = getOverlapColor(overlap.overlapPercent);
        const bgColor = getOverlapBg(overlap.overlapPercent);
        const barFillWidth = (overlap.overlapPercent / 100) * BAR_WIDTH;

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
                  {overlap.overlapPercent}%
                </Text>
                <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
                  {locale === 'de' ? 'Überlappung' : 'overlap'}
                </Text>
              </View>
            </View>

            {/* Bar chart */}
            <Svg width={BAR_WIDTH} height={BAR_HEIGHT} style={{ marginBottom: 6 }}>
              <Rect x={0} y={0} width={BAR_WIDTH} height={BAR_HEIGHT} rx={4} fill={COLORS.gray100} />
              <Rect x={0} y={0} width={barFillWidth} height={BAR_HEIGHT} rx={4} fill={color} />
            </Svg>

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
            ? 'Hinweis: Prozentsätze sind Näherungswerte auf Basis gemeinsamer Maßnahmenkategorien. Vollständige Compliance erfordert die individuelle Prüfung jedes Regelwerks.'
            : 'Note: Percentages are approximations based on shared measure categories. Full compliance requires individual assessment of each regulation.'}
        </Text>
      </View>
    </View>
  );
};

export default PDFCrossRegSynergiesSection;
