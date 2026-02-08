import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFDsgvoOverlap, PDFMessages } from '@/lib/pdf/types';

interface PDFDsgvoOverlapProps {
  dsgvoOverlap: PDFDsgvoOverlap;
  messages: PDFMessages;
}

const PDFDsgvoOverlapSection = ({ dsgvoOverlap, messages }: PDFDsgvoOverlapProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.dsgvo.title'] || 'DSGVO Overlap Analysis'}
      </Text>

      {/* Overall overlap percentage with bar */}
      <View style={styles.summaryBar} wrap={false}>
        <Text style={styles.summaryLabel}>
          {messages['pdf.dsgvo.overallOverlap'] || 'Overall DSGVO Overlap'}:
        </Text>
        <Text style={styles.summaryPercentage}>
          {dsgvoOverlap.overallPercentage}%
        </Text>
        {/* Progress bar */}
        <View style={{ flex: 1, height: 8, backgroundColor: COLORS.gray200, borderRadius: 4 }}>
          <View
            style={{
              width: `${Math.min(dsgvoOverlap.overallPercentage, 100)}%`,
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
          {messages['pdf.dsgvo.nis2Area'] || 'NIS2 Area'}
        </Text>
        <Text style={[styles.tableCell, { width: 120 }]}>
          {messages['pdf.dsgvo.dsgvoArticle'] || 'DSGVO Article'}
        </Text>
        <Text style={[styles.tableCell, { width: 80, textAlign: 'right' }]}>
          {messages['pdf.dsgvo.overlap'] || 'Overlap'}
        </Text>
      </View>

      {/* Mapping rows */}
      {dsgvoOverlap.mappings.map((mapping, index) => {
        const percentage = Math.round(mapping.overlapPercentage);
        // Color gradient: low overlap = red, medium = yellow, high = green
        const barColor =
          percentage >= 70 ? COLORS.green : percentage >= 40 ? COLORS.yellow : COLORS.red;

        return (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {mapping.nis2Area}
            </Text>
            <Text style={[styles.tableCell, { width: 120 }]}>
              {mapping.dsgvoArticle}
            </Text>
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
        {messages['pdf.dsgvo.note'] ||
          'Overlap indicates how much existing DSGVO compliance can be leveraged for NIS2 requirements.'}
      </Text>
    </View>
  );
};

export default PDFDsgvoOverlapSection;
