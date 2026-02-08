import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFIso27001, PDFMessages } from '@/lib/pdf/types';

interface PDFIso27001Props {
  iso27001: PDFIso27001;
  messages: PDFMessages;
}

const PDFIso27001Section = ({ iso27001, messages }: PDFIso27001Props) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.iso.title'] || 'ISO 27001 Crosswalk'}
      </Text>

      {/* Overall alignment percentage with bar */}
      <View style={styles.summaryBar} wrap={false}>
        <Text style={styles.summaryLabel}>
          {messages['pdf.iso.overallAlignment'] || 'Overall ISO 27001 Alignment'}:
        </Text>
        <Text style={styles.summaryPercentage}>
          {iso27001.overallAlignment}%
        </Text>
        {/* Progress bar */}
        <View style={{ flex: 1, height: 8, backgroundColor: COLORS.gray200, borderRadius: 4 }}>
          <View
            style={{
              width: `${Math.min(iso27001.overallAlignment, 100)}%`,
              height: 8,
              backgroundColor: COLORS.primary,
              borderRadius: 4,
            }}
          />
        </View>
      </View>

      {/* Mapping table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 1 }]}>
          {messages['pdf.iso.nis2Category'] || 'NIS2 Category'}
        </Text>
        <Text style={[styles.tableCell, { width: 160 }]}>
          {messages['pdf.iso.isoControls'] || 'ISO 27001 Controls'}
        </Text>
        <Text style={[styles.tableCell, { width: 80, textAlign: 'right' }]}>
          {messages['pdf.iso.alignment'] || 'Alignment'}
        </Text>
      </View>

      {/* Mapping rows */}
      {iso27001.mappings.map((mapping, index) => {
        const percentage = Math.round(mapping.alignmentPercentage);
        const barColor =
          percentage >= 70 ? COLORS.green : percentage >= 40 ? COLORS.yellow : COLORS.red;

        return (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {mapping.nis2Category}
            </Text>
            <View style={{ width: 160 }}>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {mapping.isoControls.join(', ')}
              </Text>
            </View>
            <View style={{ width: 80, alignItems: 'flex-end' }}>
              <Text style={[styles.tableCell, { marginBottom: 2 }]}>
                {percentage}%
              </Text>
              <View style={{ width: 60, height: 4, backgroundColor: COLORS.gray200, borderRadius: 2 }}>
                <View
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    height: 4,
                    backgroundColor: barColor,
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          </View>
        );
      })}

      {/* Explanation note */}
      <Text style={styles.noteText}>
        {messages['pdf.iso.note'] ||
          'Shows mapping between NIS2 Art. 21(2) requirements and ISO/IEC 27001:2022 Annex A controls.'}
      </Text>
    </View>
  );
};

export default PDFIso27001Section;
