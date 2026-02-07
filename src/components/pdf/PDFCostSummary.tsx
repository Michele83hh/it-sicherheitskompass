import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFCostSummary, PDFMessages } from '@/lib/pdf/types';

interface PDFCostSummaryProps {
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
  `${formatEur(min, locale)} - ${formatEur(max, locale)}`;

const formatDaysRange = (min: number, max: number): string =>
  `${min} - ${max}`;

const PDFCostSummarySection = ({ costSummary, messages, locale }: PDFCostSummaryProps) => {
  const costItems = [
    {
      label: messages['pdf.cost.internalDays'] || 'Internal Effort (Person-Days)',
      value: formatDaysRange(costSummary.internalDays.min, costSummary.internalDays.max),
      suffix: messages['pdf.cost.days'] || 'days',
    },
    {
      label: messages['pdf.cost.externalCost'] || 'External Costs',
      value: formatRange(costSummary.externalCost.min, costSummary.externalCost.max, locale),
      suffix: '',
    },
    {
      label: messages['pdf.cost.toolsCost'] || 'Tool Costs (per year)',
      value: formatRange(costSummary.toolsCost.min, costSummary.toolsCost.max, locale),
      suffix: messages['pdf.cost.perYear'] || '/year',
    },
  ];

  return (
    <View style={{ marginTop: 20 }} wrap={false}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.cost.title'] || 'Cost Estimation'}
      </Text>

      {/* Cost breakdown items */}
      {costItems.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
            backgroundColor: index % 2 === 0 ? COLORS.gray50 : COLORS.white,
            borderBottom: `1 solid ${COLORS.gray200}`,
          }}
        >
          <Text style={{ fontSize: 9, color: COLORS.gray700, flex: 1 }}>
            {item.label}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.gray900 }}>
            {item.value}{item.suffix ? ` ${item.suffix}` : ''}
          </Text>
        </View>
      ))}

      {/* Total cost - highlighted */}
      <View
        style={{
          backgroundColor: COLORS.primaryLight,
          padding: 12,
          borderRadius: 4,
          borderLeft: `3 solid ${COLORS.primary}`,
          marginTop: 8,
        }}
      >
        <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 4 }}>
          {messages['pdf.cost.totalEstimated'] || 'Total Estimated Cost'}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 700, color: COLORS.primary }}>
          {formatRange(costSummary.totalCost.min, costSummary.totalCost.max, locale)}
        </Text>
      </View>

      {/* Disclaimer */}
      <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 6 }}>
        {messages['pdf.cost.disclaimer'] ||
          'Estimates based on typical NIS2 compliance projects. Actual costs may vary depending on organization size and existing infrastructure.'}
      </Text>
    </View>
  );
};

export default PDFCostSummarySection;
