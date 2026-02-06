import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFCategoryResult, PDFMessages } from '@/lib/pdf/types';

interface PDFScoresTableProps {
  categories: PDFCategoryResult[];
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const PDFScoresTable = ({ categories, messages, locale }: PDFScoresTableProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.categories'] || 'Results by Category'}
      </Text>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { width: 30 }]}>
          {messages['pdf.categoryTableHeaders.nr'] || 'No.'}
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>
          {messages['pdf.categoryTableHeaders.category'] || 'Category'}
        </Text>
        <Text style={[styles.tableCell, { width: 100 }]}>
          {messages['pdf.categoryTableHeaders.score'] || 'Score'}
        </Text>
        <Text style={[styles.tableCell, { width: 100 }]}>
          {messages['pdf.categoryTableHeaders.status'] || 'Status'}
        </Text>
        <Text style={[styles.tableCell, { width: 120 }]}>
          {messages['pdf.categoryTableHeaders.legalBasis'] || 'Legal Basis'}
        </Text>
      </View>

      {/* Table rows */}
      {categories.map((cat, index) => {
        const trafficLightColor = TRAFFIC_LIGHT_COLORS[cat.trafficLight];
        const percentage = Math.round(cat.percentage);

        return (
          <View key={cat.categoryId} style={styles.tableRow}>
            {/* Nr. */}
            <Text style={[styles.tableCell, { width: 30, fontWeight: 700 }]}>
              {index + 1}
            </Text>

            {/* Category name */}
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {cat.shortName}
            </Text>

            {/* Score with bar */}
            <View style={{ width: 100, flexDirection: 'column' }}>
              <Text style={[styles.tableCell, { marginBottom: 4 }]}>
                {percentage}%
              </Text>
              {/* Score bar */}
              <View style={{ width: 80, height: 8, backgroundColor: COLORS.gray200, borderRadius: 4 }}>
                <View
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    height: 8,
                    backgroundColor: trafficLightColor.dot,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>

            {/* Status with traffic light dot */}
            <View style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={[
                  styles.trafficLightDot,
                  { backgroundColor: trafficLightColor.dot },
                ]}
              />
              <Text style={[styles.statusText, { color: trafficLightColor.text }]}>
                {cat.verdict}
              </Text>
            </View>

            {/* Legal basis - ALWAYS in German */}
            <View style={{ width: 120 }}>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {cat.euArticle}
              </Text>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {cat.bsigParagraph}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PDFScoresTable;
