import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFDinSpec, PDFMessages } from '@/lib/pdf/types';

interface PDFDinSpecProps {
  dinSpec: PDFDinSpec;
  messages: PDFMessages;
}

const PDFDinSpecSection = ({ dinSpec, messages }: PDFDinSpecProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.dinSpec.title'] || 'DIN SPEC 27076 Comparison'}
      </Text>

      {/* Comparison table */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { width: 100 }]}>
          {messages['pdf.dinSpec.aspect'] || 'Aspect'}
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>DIN SPEC 27076</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>NIS2</Text>
      </View>

      {dinSpec.comparisons.map((row, index) => (
        <View key={index} style={styles.tableRow} wrap={false}>
          <Text style={[styles.tableCell, { width: 100, fontWeight: 600 }]}>
            {row.aspect}
          </Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{row.dinSpec}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{row.nis2}</Text>
        </View>
      ))}

      {/* Area mappings */}
      <Text style={styles.subSectionTitle}>
        {messages['pdf.dinSpec.areas'] || 'Coverage Areas'}
      </Text>

      {dinSpec.areas.map((area, index) => (
        <View
          key={index}
          wrap={false}
          style={{
            flexDirection: 'row',
            padding: 8,
            borderBottom: `0.5 solid ${COLORS.gray200}`,
            backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.gray50,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: 600, width: 130, color: COLORS.gray900 }}>
            {area.name}
          </Text>
          <Text style={{ fontSize: 8, flex: 1, color: COLORS.gray700 }}>
            {area.coverage}
          </Text>
        </View>
      ))}

      {/* NIS2 beyond DIN SPEC */}
      <Text style={styles.subSectionTitle}>
        {messages['pdf.dinSpec.beyond'] || 'NIS2 Additional Requirements'}
      </Text>

      {dinSpec.beyondItems.map((item, index) => (
        <View
          key={index}
          wrap={false}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 4,
            paddingHorizontal: 8,
            gap: 6,
          }}
        >
          <View style={{
            backgroundColor: COLORS.redBg,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 3,
          }}>
            <Text style={{ fontSize: 7, fontWeight: 700, color: COLORS.red }}>NIS2+</Text>
          </View>
          <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1 }}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default PDFDinSpecSection;
