import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFPenalty, PDFMessages } from '@/lib/pdf/types';

interface PDFPenaltyProps {
  penalty: PDFPenalty;
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const formatEur = (amount: number, locale: 'de' | 'en'): string =>
  new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);

const PDFPenaltySection = ({ penalty, messages, locale }: PDFPenaltyProps) => {
  return (
    <View style={{ marginTop: 20 }} wrap={false}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.penalty.title'] || 'Penalty Calculation'}
      </Text>

      {/* Classification badge */}
      <View
        style={{
          backgroundColor: COLORS.redBg,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 4,
          alignSelf: 'flex-start',
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.red }}>
          {penalty.classification}
        </Text>
      </View>

      {/* Annual revenue */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>
          {messages['pdf.penalty.annualRevenue'] || 'Annual Revenue'}:
        </Text>
        <Text style={styles.value}>{formatEur(penalty.annualRevenue, locale)}</Text>
      </View>

      {/* Fixed maximum penalty */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>
          {messages['pdf.penalty.maxAbsolute'] || 'Fixed Maximum'}:
        </Text>
        <Text style={styles.value}>{formatEur(penalty.maxPenaltyAbsolute, locale)}</Text>
      </View>

      {/* Revenue-based maximum */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>
          {messages['pdf.penalty.maxRevenueBased'] || 'Revenue-Based Maximum'}:
        </Text>
        <Text style={styles.value}>
          {formatEur(penalty.maxPenaltyRevenueBased, locale)} ({penalty.revenuePercentage}%)
        </Text>
      </View>

      {/* Horizontal separator */}
      <View style={styles.hr} />

      {/* Effective maximum - highlighted */}
      <View
        style={{
          backgroundColor: COLORS.redBg,
          padding: 12,
          borderRadius: 4,
          borderLeft: `3 solid ${COLORS.red}`,
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 4 }}>
          {messages['pdf.penalty.effectiveMax'] || 'Effective Maximum Penalty'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 700, color: COLORS.red }}>
          {formatEur(penalty.effectiveMaxPenalty, locale)}
        </Text>
      </View>

      {/* Legal reference - ALWAYS in German */}
      <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
        Rechtsgrundlage: {penalty.legalReference}
      </Text>
    </View>
  );
};

export default PDFPenaltySection;
