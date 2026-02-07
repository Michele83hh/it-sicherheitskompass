import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFRoadmapPhase, PDFMessages } from '@/lib/pdf/types';

interface PDFRoadmapProps {
  phases: PDFRoadmapPhase[];
  messages: PDFMessages;
}

// Phase border colors: green (quick wins), yellow (core), blue (strategic)
const PHASE_COLORS = [COLORS.green, COLORS.yellow, COLORS.primary] as const;

// Urgency badge colors
const URGENCY_COLORS: Record<string, { bg: string; text: string }> = {
  critical: { bg: COLORS.redBg, text: COLORS.red },
  high: { bg: '#fff7ed', text: '#ea580c' }, // orange
  medium: { bg: COLORS.yellowBg, text: COLORS.yellow },
  low: { bg: COLORS.primaryLight, text: COLORS.primary },
};

const PDFRoadmap = ({ phases, messages }: PDFRoadmapProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.roadmap.title'] || 'Implementation Roadmap'}
      </Text>

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
            <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 8 }}>
              {phase.description}
            </Text>

            {/* Items */}
            {phase.items.map((item, itemIndex) => {
              const urgencyStyle = URGENCY_COLORS[item.urgency] || URGENCY_COLORS.low;

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
    </View>
  );
};

export default PDFRoadmap;
