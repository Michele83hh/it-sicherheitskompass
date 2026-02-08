import { Text, View, Svg, Rect } from '@react-pdf/renderer';
import { styles, COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFCategoryResult, PDFMessages } from '@/lib/pdf/types';

interface PDFScoresTableProps {
  categories: PDFCategoryResult[];
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const STATUS_LABELS: Record<string, Record<string, string>> = {
  de: { red: 'Kritisch', yellow: 'Teilweise', green: 'Erfüllt' },
  en: { red: 'Critical', yellow: 'Partial', green: 'Fulfilled' },
};

const PDFScoresTable = ({ categories, messages, locale }: PDFScoresTableProps) => {
  const labels = STATUS_LABELS[locale] || STATUS_LABELS.de;

  return (
    <View>
      {/* Table header */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: COLORS.gray100,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottom: `1.5 solid ${COLORS.gray300}`,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray700, width: 22 }}>Nr.</Text>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray700, flex: 1 }}>
          {messages['pdf.categoryTableHeaders.category'] || 'Maßnahmenbereich'}
        </Text>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray700, width: 90, textAlign: 'center' }}>
          {messages['pdf.categoryTableHeaders.score'] || 'Score'}
        </Text>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray700, width: 70, textAlign: 'center' }}>
          {messages['pdf.categoryTableHeaders.status'] || 'Status'}
        </Text>
      </View>

      {/* Table rows */}
      {categories.map((cat, index) => {
        const tlc = TRAFFIC_LIGHT_COLORS[cat.trafficLight];
        const percentage = Math.round(cat.percentage);
        const isEven = index % 2 === 0;
        const barWidth = Math.max(6, (percentage / 100) * 80);

        return (
          <View
            key={cat.categoryId}
            wrap={false}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 7,
              paddingHorizontal: 8,
              borderBottom: `0.5 solid ${COLORS.gray200}`,
              backgroundColor: isEven ? COLORS.white : COLORS.gray50,
            }}
          >
            {/* Nr. */}
            <Text style={{ fontSize: 9, fontWeight: 700, width: 22, color: COLORS.gray500 }}>
              {index + 1}
            </Text>

            {/* Category name + legal reference below */}
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={{ fontSize: 9, fontWeight: 600, color: COLORS.gray900 }}>
                {cat.shortName}
              </Text>
              <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 2 }}>
                {cat.euArticle} · {cat.bsigParagraph}
              </Text>
            </View>

            {/* Score: percentage + SVG bar */}
            <View style={{ width: 90, alignItems: 'center' }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray900, marginBottom: 3 }}>
                {percentage}%
              </Text>
              <Svg width={80} height={6} viewBox="0 0 80 6">
                <Rect x="0" y="0" width="80" height="6" rx="3" ry="3" fill={COLORS.gray200} />
                {percentage > 0 && (
                  <Rect x="0" y="0" width={`${barWidth}`} height="6" rx="3" ry="3" fill={tlc.dot} />
                )}
              </Svg>
            </View>

            {/* Status badge */}
            <View style={{ width: 70, alignItems: 'center' }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: tlc.bg,
                paddingVertical: 3,
                paddingHorizontal: 8,
                borderRadius: 4,
                gap: 4,
              }}>
                <View style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: tlc.dot,
                }} />
                <Text style={{ fontSize: 8, fontWeight: 600, color: tlc.text }}>
                  {labels[cat.trafficLight]}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PDFScoresTable;
