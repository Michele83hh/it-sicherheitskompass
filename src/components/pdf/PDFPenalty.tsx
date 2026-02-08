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
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 4 }}>
          {messages['pdf.penalty.effectiveMax'] || 'Effective Maximum Penalty'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 700, color: COLORS.red }}>
          {formatEur(penalty.effectiveMaxPenalty, locale)}
        </Text>
      </View>

      {/* ─── Context box: "Was bedeutet das konkret?" ─── */}
      <View style={{
        backgroundColor: COLORS.gray50,
        border: `1 solid ${COLORS.gray200}`,
        borderRadius: 4,
        padding: 12,
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.gray900, marginBottom: 8 }}>
          {messages['pdf.penalty.contextTitle'] || 'Was bedeutet das konkret?'}
        </Text>

        {/* Scenario bullet 1 */}
        <View style={{ flexDirection: 'row', marginBottom: 5, gap: 6 }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.green, marginTop: 3 }} />
          <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.4 }}>
            {messages['pdf.penalty.scenario1'] || 'Bei nachweislich umgesetzten Grundmaßnahmen (Stufe 1-2) sinkt das Bußgeldrisiko erheblich — die Behörde berücksichtigt Ihre Compliance-Bemühungen.'}
          </Text>
        </View>

        {/* Scenario bullet 2 */}
        <View style={{ flexDirection: 'row', marginBottom: 5, gap: 6 }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.yellow, marginTop: 3 }} />
          <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.4 }}>
            {messages['pdf.penalty.scenario2'] || 'Die Maximalbeträge gelten bei wiederholten, schwerwiegenden Verstößen ohne jegliche Schutzmaßnahmen — das typische KMU-Risiko liegt deutlich darunter.'}
          </Text>
        </View>

        {/* Scenario bullet 3 — bridge to roadmap */}
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.primary, marginTop: 3 }} />
          <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.4 }}>
            {messages['pdf.penalty.scenario3'] || 'Mit der Umsetzungs-Roadmap in diesem Report reduzieren Sie Ihr Haftungsrisiko systematisch — beginnend mit Quick Wins in den ersten 3 Monaten.'}
          </Text>
        </View>
      </View>

      {/* Personal liability note — expanded with 3 duties + protective measures */}
      <View style={{
        backgroundColor: '#fff7ed',
        padding: 12,
        borderRadius: 4,
        borderLeft: `3 solid #ea580c`,
        marginBottom: 8,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: '#ea580c', marginBottom: 4 }}>
          {messages['pdf.penalty.liabilityTitle'] || 'Geschäftsleitungshaftung (§38 BSIG)'}
        </Text>
        <Text style={{ fontSize: 7.5, color: COLORS.gray700, lineHeight: 1.4, marginBottom: 6 }}>
          {messages['pdf.penalty.liabilityText'] || 'Geschäftsleiter haften persönlich für die Umsetzung der Risikomanagementmaßnahmen. Diese Pflicht kann nicht auf Dritte delegiert werden.'}
        </Text>

        {/* 3 specific duties */}
        {[1, 2, 3].map((n) => {
          const duty = messages[`pdf.penalty.liabilityDuty${n}`];
          if (!duty) return null;
          return (
            <View key={n} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginBottom: 3 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#ea580c', marginTop: 3 }} />
              <Text style={{ fontSize: 7, color: COLORS.gray700, flex: 1 }}>{duty}</Text>
            </View>
          );
        })}

        {/* Protective measures */}
        <View style={{
          marginTop: 8,
          paddingTop: 6,
          borderTop: `0.5 solid #ea580c`,
        }}>
          <Text style={{ fontSize: 7.5, fontWeight: 700, color: COLORS.green, marginBottom: 4 }}>
            {messages['pdf.penalty.liabilityProtectiveTitle'] || 'So schützen Sie sich als Geschäftsleiter'}
          </Text>
          {[1, 2, 3].map((n) => {
            const measure = messages[`pdf.penalty.liabilityProtective${n}`];
            if (!measure) return null;
            return (
              <View key={n} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginBottom: 3 }}>
                <Text style={{ fontSize: 7, color: COLORS.green }}>✓</Text>
                <Text style={{ fontSize: 7, color: COLORS.gray700, flex: 1 }}>{measure}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Legal reference - ALWAYS in German */}
      <Text style={styles.noteText}>
        Rechtsgrundlage: {penalty.legalReference}
      </Text>
    </View>
  );
};

export default PDFPenaltySection;
