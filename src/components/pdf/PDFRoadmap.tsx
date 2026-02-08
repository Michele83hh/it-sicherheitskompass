import { Text, View, Svg, Rect, Line } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFRoadmapPhase, PDFMessages } from '@/lib/pdf/types';

interface PDFRoadmapProps {
  phases: PDFRoadmapPhase[];
  messages: PDFMessages;
  overallPercentage?: number;
}

// Phase border colors: green (quick wins), yellow (core), blue (strategic)
const PHASE_COLORS = [COLORS.green, COLORS.yellow, COLORS.primary] as const;
const PHASE_BG_COLORS = [COLORS.greenBg, COLORS.yellowBg, COLORS.primaryLight] as const;

// Urgency badge colors
const URGENCY_COLORS: Record<string, { bg: string; text: string }> = {
  critical: { bg: COLORS.redBg, text: COLORS.red },
  high: { bg: '#fff7ed', text: '#ea580c' }, // orange
  medium: { bg: COLORS.yellowBg, text: COLORS.yellow },
  low: { bg: COLORS.primaryLight, text: COLORS.primary },
};

// Timeline constants
const TIMELINE_WIDTH = 515;
const BOX_WIDTH = 155;
const BOX_HEIGHT = 36;
const GAP = 24;

const PDFRoadmap = ({ phases, messages, overallPercentage }: PDFRoadmapProps) => {
  return (
    <View>
      {/* ─── SVG Timeline ─── */}
      <View wrap={false} style={{ marginBottom: 16 }}>
        <Svg width={TIMELINE_WIDTH} height={BOX_HEIGHT + 4} viewBox={`0 0 ${TIMELINE_WIDTH} ${BOX_HEIGHT + 4}`}>
          {/* Connecting line */}
          <Line
            x1={`${BOX_WIDTH}`}
            y1={`${(BOX_HEIGHT + 4) / 2}`}
            x2={`${TIMELINE_WIDTH - BOX_WIDTH}`}
            y2={`${(BOX_HEIGHT + 4) / 2}`}
            stroke={COLORS.gray300}
            strokeWidth="1.5"
          />

          {phases.map((phase, idx) => {
            const x = idx * (BOX_WIDTH + GAP);
            const color = PHASE_COLORS[idx] || COLORS.gray500;
            const bgColor = PHASE_BG_COLORS[idx] || COLORS.gray100;

            return (
              <View key={idx}>
                {/* Box background */}
                <Rect
                  x={`${x}`}
                  y="0"
                  width={`${BOX_WIDTH}`}
                  height={`${BOX_HEIGHT}`}
                  rx="4"
                  ry="4"
                  fill={bgColor}
                  stroke={color}
                  strokeWidth="1"
                />
                {/* Left accent strip */}
                <Rect
                  x={`${x}`}
                  y="0"
                  width="4"
                  height={`${BOX_HEIGHT}`}
                  rx="2"
                  ry="2"
                  fill={color}
                />
              </View>
            );
          })}
        </Svg>

        {/* Text overlays (positioned absolutely over the SVG boxes) */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: TIMELINE_WIDTH,
          height: BOX_HEIGHT,
          flexDirection: 'row',
        }}>
          {phases.map((phase, idx) => (
            <View
              key={idx}
              style={{
                width: BOX_WIDTH,
                height: BOX_HEIGHT,
                paddingLeft: 10,
                paddingTop: 5,
                marginRight: idx < phases.length - 1 ? GAP : 0,
              }}
            >
              <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray900 }}>
                {phase.timeframe || ''}
              </Text>
              <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 2 }}>
                {phase.itemCount} {messages['pdf.roadmap.measures'] || (phase.itemCount === 1 ? 'Maßnahme' : 'Maßnahmen')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ─── Phase blocks ─── */}
      {phases.map((phase, phaseIndex) => {
        const borderColor = PHASE_COLORS[phaseIndex] || COLORS.gray500;

        return (
          <View
            key={phaseIndex}
            style={{
              borderLeft: `3 solid ${borderColor}`,
              paddingLeft: 10,
              marginBottom: 14,
            }}
            wrap={false}
          >
            {/* Phase title */}
            <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray900, marginBottom: 2 }}>
              {phase.title}
            </Text>

            {/* Phase description */}
            <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: phase.benefitStatement ? 4 : 8 }}>
              {phase.description}
            </Text>

            {/* Benefit statement */}
            {phase.benefitStatement && (
              <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.green, marginBottom: 8 }}>
                {'\u2192'} {phase.benefitStatement}
              </Text>
            )}

            {/* Items */}
            {phase.items.map((item, itemIndex) => {
              const urgencyStyle = URGENCY_COLORS[item.urgency] || URGENCY_COLORS.low;

              // Phase 1 items with cost data: render as mini-cards
              if (phaseIndex === 0 && item.days) {
                return (
                  <View
                    key={itemIndex}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: COLORS.greenBg,
                      padding: 6,
                      borderRadius: 3,
                      marginBottom: 3,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 8, color: COLORS.gray900, flex: 3 }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 7, color: COLORS.gray500, flex: 1, textAlign: 'right' }}>
                      {item.days} {messages['pdf.roadmap.measures'] ? '' : ''}{messages['pdf.executive.quickWinDays'] || 'Tage'}
                    </Text>
                    {item.costRange && (
                      <Text style={{ fontSize: 7, fontWeight: 600, color: COLORS.green, flex: 1.5, textAlign: 'right' }}>
                        {item.costRange}
                      </Text>
                    )}
                  </View>
                );
              }

              // Standard bullet rendering for Phase 2+3
              return (
                <View
                  key={itemIndex}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                    paddingLeft: 6,
                  }}
                >
                  {/* Bullet */}
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: COLORS.gray500,
                      marginRight: 6,
                    }}
                  />

                  {/* Item title */}
                  <Text style={{ fontSize: 9, color: COLORS.gray900, flex: 1 }}>
                    {item.title}
                  </Text>

                  {/* Urgency badge */}
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: urgencyStyle.bg,
                        marginLeft: 6,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 7, color: urgencyStyle.text }}>
                      {messages[`pdf.urgency.${item.urgency}`] || item.urgency}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}

      {/* ─── Positive vision box: "Ihr Unternehmen in 12 Monaten" ─── */}
      <View wrap={false} style={{
        backgroundColor: COLORS.greenBg,
        border: `1 solid ${COLORS.green}`,
        borderRadius: 4,
        padding: 14,
        marginTop: 8,
      }}>
        <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>
          {messages['pdf.roadmap.visionTitle'] || 'Ihr Unternehmen in 12 Monaten'}
        </Text>

        <View style={{ gap: 5 }}>
          <VisionBullet text={messages['pdf.roadmap.vision1'] || 'Dokumentierte Risikobewertung und klare Verantwortlichkeiten für IT-Sicherheit'} />
          <VisionBullet text={messages['pdf.roadmap.vision2'] || 'Getesteter Notfallplan — Ihr Team weiß, was bei einem Cyberangriff zu tun ist'} />
          <VisionBullet text={messages['pdf.roadmap.vision3'] || 'Nachweisbare Compliance für Kunden, Versicherer und Aufsichtsbehörden'} />
          <VisionBullet text={messages['pdf.roadmap.vision4'] || 'Weniger Ausfallrisiko, bessere Verhandlungsposition bei Cyberversicherungen'} />
        </View>

        {overallPercentage !== undefined && (
          <Text style={{ fontSize: 8, color: COLORS.gray700, marginTop: 8, fontWeight: 600 }}>
            {messages['pdf.roadmap.visionCta'] || 'Von'} {Math.round(overallPercentage)}% {messages['pdf.roadmap.visionCtaTo'] || 'auf über 80% — Schritt für Schritt, in Ihrem Tempo.'}
          </Text>
        )}
      </View>
    </View>
  );
};

/** Green check bullet for vision items */
const VisionBullet = ({ text }: { text: string }) => (
  <View style={{ flexDirection: 'row', gap: 6 }}>
    <Text style={{ fontSize: 9, color: COLORS.green }}>✓</Text>
    <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.4 }}>{text}</Text>
  </View>
);

export default PDFRoadmap;
