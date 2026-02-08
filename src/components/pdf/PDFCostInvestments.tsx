import { Text, View } from '@react-pdf/renderer';
import { COLORS } from '@/lib/pdf/styles';
import type { PDFCostSummary, PDFMessages } from '@/lib/pdf/types';

interface PDFCostInvestmentsProps {
  costSummary: PDFCostSummary;
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const formatEur = (amount: number, locale: 'de' | 'en'): string =>
  new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);

const formatRange = (min: number, max: number, locale: 'de' | 'en'): string =>
  `${formatEur(min, locale)} – ${formatEur(max, locale)}`;

const formatDaysRange = (min: number, max: number): string =>
  min === max ? `${min}` : `${min}–${max}`;

const PDFCostInvestments = ({ costSummary, messages, locale }: PDFCostInvestmentsProps) => {
  const sortedItems = [...costSummary.items].sort((a, b) => b.totalCost.max - a.totalCost.max);
  const top10 = sortedItems.slice(0, 10);
  const remainingCount = Math.max(0, sortedItems.length - 10);
  const quickItems = costSummary.items.filter(i => i.effortLevel === 'quick');

  return (
    <View>
      {/* Top 10 most impactful cost items */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.gray900, marginBottom: 6 }}>
          {messages['pdf.cost.top10Title'] || 'Top 10 Investitionen'}
        </Text>

        {/* Header row */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: COLORS.gray100,
          padding: 6,
          borderBottom: `1 solid ${COLORS.gray300}`,
        }}>
          <Text style={{ fontSize: 7.5, fontWeight: 700, color: COLORS.gray700, flex: 3 }}>
            {messages['pdf.cost.measureLabel'] || 'Maßnahme'}
          </Text>
          <Text style={{ fontSize: 7.5, fontWeight: 700, color: COLORS.gray700, flex: 1, textAlign: 'right' }}>
            {messages['pdf.cost.daysLabel'] || 'Tage'}
          </Text>
          <Text style={{ fontSize: 7.5, fontWeight: 700, color: COLORS.gray700, flex: 2, textAlign: 'right' }}>
            {messages['pdf.cost.costLabel'] || 'Kosten'}
          </Text>
        </View>

        {top10.map((item, idx) => (
          <View
            key={idx}
            wrap={false}
            style={{
              flexDirection: 'row',
              paddingVertical: 4,
              paddingHorizontal: 6,
              borderBottom: `0.5 solid ${COLORS.gray200}`,
              backgroundColor: idx % 2 === 0 ? COLORS.white : COLORS.gray50,
            }}
          >
            <Text style={{ fontSize: 7.5, color: COLORS.gray700, flex: 3 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 7, color: COLORS.gray500, flex: 1, textAlign: 'right' }}>
              {formatDaysRange(item.internalDays.min, item.internalDays.max)}
            </Text>
            <Text style={{ fontSize: 7.5, fontWeight: 600, color: COLORS.gray900, flex: 2, textAlign: 'right' }}>
              {formatRange(item.totalCost.min, item.totalCost.max, locale)}
            </Text>
          </View>
        ))}

        {remainingCount > 0 && (
          <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 4, paddingHorizontal: 6 }}>
            + {remainingCount} {messages['pdf.cost.remainingCount'] || 'weitere Maßnahmen (Details in Stufe 1–3 oben)'}
          </Text>
        )}
      </View>

      {/* Typisches Einstiegsprojekt */}
      {quickItems.length > 0 && (
        <View wrap={false} style={{
          backgroundColor: COLORS.greenBg,
          border: `1 solid ${COLORS.green}`,
          borderRadius: 4,
          padding: 12,
        }}>
          <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.green, marginBottom: 2 }}>
            {messages['pdf.cost.entryTitle'] || 'Typisches Einstiegsprojekt'}
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.gray500, marginBottom: 6 }}>
            {quickItems.length} {messages['pdf.cost.entrySub'] || 'Quick-Win-Maßnahmen als Startpaket'}
          </Text>
          <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>
            {formatRange(costSummary.tierTotals.basisschutz.min, costSummary.tierTotals.basisschutz.max, locale)}
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.gray700, marginBottom: 4 }}>
            {messages['pdf.cost.entryIncludes'] || 'Enthält u.a.:'}
          </Text>
          {quickItems.slice(0, 5).map((item, idx) => (
            <View key={idx} style={{ flexDirection: 'row', gap: 4, marginBottom: 2 }}>
              <Text style={{ fontSize: 7, color: COLORS.green }}>✓</Text>
              <Text style={{ fontSize: 7, color: COLORS.gray700 }}>{item.title}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PDFCostInvestments;
