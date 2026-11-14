import { Text, View } from '@react-pdf/renderer';
import { styles } from '@/lib/pdf/styles';
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
            <Text style={[styles.tableCell, { width: 80, textAlign: 'right' }]}>
              {mapping.level}
            </Text>
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
