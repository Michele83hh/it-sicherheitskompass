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

  // Group recommendations by category for Klartext headers
  const categoryOrder: string[] = [];
  const byCategory = new Map<string, PDFRecommendation[]>();
  for (const rec of recommendations) {
    if (!byCategory.has(rec.categoryName)) {
      categoryOrder.push(rec.categoryName);
      byCategory.set(rec.categoryName, []);
    }
    byCategory.get(rec.categoryName)!.push(rec);
  }

  return (
    <View>
      {categoryOrder.map((categoryName) => {
        const recs = byCategory.get(categoryName)!;
        // Look up the business impact message for this category
        const impactKey = `pdf.rec.impact.${recs[0]?.categoryName || ''}`;
        const businessImpact = messages[impactKey];
        const benefitText = recs[0]?.categoryId ? messages[`pdf.rec.benefit.${recs[0].categoryId}`] : undefined;

        // Render helper for a single recommendation card
        const renderRecCard = (rec: PDFRecommendation, index: number) => {
          const priorityColor = priorityColors[rec.priority];
          return (
            <View
              key={index}
              style={[
                styles.recCard,
                { borderLeftColor: priorityColor, marginBottom: 16 },
              ]}
              wrap={false}
            >
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recDescription}>{rec.description}</Text>
              <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                <Text style={[styles.recFirstStep, { fontWeight: 700 }]}>
                  {messages['pdf.firstStep'] || 'First Step'}:{' '}
                </Text>
                <Text style={[styles.recFirstStep, { flex: 1 }]}>{rec.firstStep}</Text>
              </View>
              <View style={styles.recBadge}>
                <View style={[styles.badge, { backgroundColor: priorityColor }]}>
                  <Text style={{ fontSize: 7, color: COLORS.white }}>
                    {messages[`pdf.priority.${rec.priority}`] || rec.priority}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: COLORS.gray200 }]}>
                  <Text style={{ fontSize: 7, color: COLORS.gray700 }}>
                    {messages[`pdf.effortLevel.${rec.effortLevel}`] || rec.effortLevel}
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 7, color: COLORS.gray300, marginTop: 4 }}>
                {rec.legalReference} {'\u00B7'} {rec.bsiReference}
              </Text>
            </View>
          );
        };

        const firstRec = recs[0];
        const remainingRecs = recs.slice(1);

        return (
          <View key={categoryName}>
            {/* Category header + first recommendation kept together (no page break between) */}
            <View wrap={false}>
              <View style={{
                backgroundColor: COLORS.gray50,
                borderLeft: `3 solid ${COLORS.primary}`,
                padding: 8,
                marginBottom: 8,
                marginTop: 8,
                borderRadius: 4,
              }}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray900, marginBottom: businessImpact ? 3 : 0 }}>
                  {categoryName}
                </Text>
                {businessImpact && (
                  <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.4 }}>
                    {businessImpact}
                  </Text>
                )}
                {benefitText && (
                  <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.green, marginTop: 4 }}>
                    {benefitText}
                  </Text>
                )}
              </View>

              {firstRec && renderRecCard(firstRec, 0)}
            </View>

            {/* Remaining recommendations (can break across pages) */}
            {remainingRecs.map((rec, index) => renderRecCard(rec, index + 1))}
          </View>
        );
      })}

      {/* Mini-CTA after recommendations */}
      <View wrap={false} style={{
        backgroundColor: COLORS.primaryLight,
        borderLeft: `3 solid ${COLORS.primary}`,
        padding: 12,
        marginTop: 16,
        borderRadius: 4,
      }}>
        <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.primary, marginBottom: 4 }}>
          {messages['pdf.miniCta.title'] || 'Nächster Schritt'}
        </Text>
        <Text style={{ fontSize: 9, color: COLORS.gray700, lineHeight: 1.5 }}>
          {messages['pdf.miniCta.text'] || 'Starten Sie mit den Quick Wins — ohne externes Budget, ab heute wirksam. Detaillierte Handlungsoptionen finden Sie am Ende dieses Reports.'}
        </Text>
      </View>
    </View>
  );
};

export default PDFRecommendations;
