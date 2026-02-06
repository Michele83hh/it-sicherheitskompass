import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFRecommendation, PDFMessages } from '@/lib/pdf/types';

interface PDFRecommendationsProps {
  recommendations: PDFRecommendation[];
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const PDFRecommendations = ({ recommendations, messages, locale }: PDFRecommendationsProps) => {
  // Priority colors
  const priorityColors: Record<string, string> = {
    high: COLORS.red,
    medium: COLORS.yellow,
    low: COLORS.green,
  };

  // Effort level colors
  const effortColors: Record<string, string> = {
    quick: COLORS.green,
    medium: COLORS.yellow,
    strategic: COLORS.red,
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.recommendations'] || 'Recommendations'}
      </Text>

      {recommendations.map((rec, index) => {
        const priorityColor = priorityColors[rec.priority];
        const effortColor = effortColors[rec.effortLevel];

        return (
          <View
            key={index}
            style={[
              styles.recCard,
              { borderLeftColor: priorityColor, marginBottom: 16 },
            ]}
            wrap={false} // Keep recommendation cards together
          >
            {/* Category label */}
            <Text style={{ fontSize: 8, color: COLORS.gray500, marginBottom: 4 }}>
              {rec.categoryName}
            </Text>

            {/* Title */}
            <Text style={styles.recTitle}>{rec.title}</Text>

            {/* Description */}
            <Text style={styles.recDescription}>{rec.description}</Text>

            {/* First step */}
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={[styles.recFirstStep, { fontWeight: 700, marginRight: 4 }]}>
                {messages['pdf.firstStep'] || 'First Step'}:
              </Text>
              <Text style={styles.recFirstStep}>{rec.firstStep}</Text>
            </View>

            {/* Badges - Priority and Effort */}
            <View style={styles.recBadge}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: priorityColor,
                    color: COLORS.white,
                  },
                ]}
              >
                <Text style={{ fontSize: 7, color: COLORS.white }}>
                  {messages[`pdf.priority.${rec.priority}`] || rec.priority}
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: COLORS.gray200,
                    color: COLORS.gray700,
                  },
                ]}
              >
                <Text style={{ fontSize: 7 }}>
                  {messages[`pdf.effortLevel.${rec.effortLevel}`] || rec.effortLevel}
                </Text>
              </View>
            </View>

            {/* Legal references - ALWAYS in German */}
            <View style={{ marginTop: 6 }}>
              <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
                Rechtsgrundlage: {rec.legalReference}
              </Text>
              <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
                BSI-Grundschutz: {rec.bsiReference}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PDFRecommendations;
