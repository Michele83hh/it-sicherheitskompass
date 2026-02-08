import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFKritis, PDFMessages } from '@/lib/pdf/types';

interface PDFKritisProps {
  kpiDetails?: PDFKritis;
  messages: PDFMessages;
}

const PDFKritisSection = ({ kpiDetails, messages }: PDFKritisProps) => {
  // Full KRITIS section with requirements + comparison table
  if (kpiDetails) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>
          {messages['pdf.kritis.title'] || 'KRITIS Classification'}
        </Text>

        {/* KRITIS requirements */}
        {kpiDetails.requirements.map((req, index) => (
          <View
            key={index}
            wrap={false}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 8,
              marginBottom: 4,
              gap: 6,
            }}
          >
            <View style={{
              backgroundColor: COLORS.redBg,
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 3,
            }}>
              <Text style={{ fontSize: 7, fontWeight: 700, color: COLORS.red }}>KRITIS</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 600, color: COLORS.gray900 }}>
                {req.title}
              </Text>
              <Text style={{ fontSize: 8, color: COLORS.gray700, marginTop: 2 }}>
                {req.description}
              </Text>
            </View>
          </View>
        ))}

        {/* Comparison table */}
        <View style={[styles.tableHeader, { marginTop: 8 }]}>
          <Text style={[styles.tableCell, { width: 100 }]}>
            {messages['pdf.kritis.aspect'] || 'Aspect'}
          </Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>Standard NIS2</Text>
          <Text style={[styles.tableCell, { flex: 1, color: COLORS.red }]}>KRITIS</Text>
        </View>

        {kpiDetails.comparisons.map((row, index) => (
          <View key={index} style={styles.tableRow} wrap={false}>
            <Text style={[styles.tableCell, { width: 100, fontWeight: 600 }]}>
              {row.aspect}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.standard}</Text>
            <Text style={[styles.tableCell, { flex: 1, fontWeight: 600, color: COLORS.red }]}>
              {row.kritis}
            </Text>
          </View>
        ))}

        <Text style={styles.noteText}>
          {messages['pdf.kritis.note'] ||
            'KRITIS operators are subject to additional obligations beyond NIS2 (§31, §39 BSIG).'}
        </Text>
      </View>
    );
  }

  // Simple fallback (KRITIS flag but no details)
  return (
    <View
      style={{
        marginTop: 20,
        padding: 12,
        backgroundColor: COLORS.redBg,
        borderLeft: `3 solid ${COLORS.red}`,
        borderRadius: 4,
      }}
      wrap={false}
    >
      <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.red, marginBottom: 4 }}>
        {messages['pdf.kritis.title'] || 'KRITIS Classification'}
      </Text>
      <Text style={{ fontSize: 9, color: COLORS.gray700, lineHeight: 1.5 }}>
        {messages['pdf.kritis.note'] ||
          'This organization may qualify as a critical infrastructure operator (KRITIS) under the BSI-KritisV.'}
      </Text>
    </View>
  );
};

export default PDFKritisSection;
