import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFEvidence, PDFMessages } from '@/lib/pdf/types';

interface PDFEvidenceProps {
  evidence: PDFEvidence;
  messages: PDFMessages;
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  document: { bg: '#dbeafe', text: '#1e40af' },
  record: { bg: '#dcfce7', text: '#166534' },
  log: { bg: '#f3e8ff', text: '#7c3aed' },
  certificate: { bg: '#fef3c7', text: '#92400e' },
};

const PDFEvidenceSection = ({ evidence, messages }: PDFEvidenceProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.evidence.title'] || 'Evidence Management'}
      </Text>

      <Text style={{ fontSize: 8, color: COLORS.gray500, marginBottom: 10 }}>
        {messages['pdf.evidence.subtitle'] || `Classification: ${evidence.classification}`}
      </Text>

      {evidence.groups.map((group, gIdx) => (
        <View key={gIdx} style={{ marginBottom: 10 }} wrap={false}>
          {/* Category header */}
          <Text style={{
            fontSize: 10,
            fontWeight: 700,
            color: COLORS.gray900,
            marginBottom: 6,
            paddingBottom: 3,
            borderBottom: `0.5 solid ${COLORS.gray200}`,
          }}>
            {group.categoryName}
          </Text>

          {/* Evidence items */}
          {group.items.map((item, iIdx) => {
            const typeColor = TYPE_COLORS[item.type] || TYPE_COLORS.document;
            return (
              <View
                key={iIdx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 3,
                  paddingHorizontal: 4,
                  gap: 6,
                }}
              >
                {/* Type badge */}
                <View style={{
                  backgroundColor: typeColor.bg,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 3,
                  width: 58,
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 7, fontWeight: 600, color: typeColor.text }}>
                    {messages[`pdf.evidence.type.${item.type}`] || item.type}
                  </Text>
                </View>

                {/* Text */}
                <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1 }}>
                  {item.text}
                </Text>

                {/* BW-only marker */}
                {item.besondersWichtigOnly && (
                  <View style={{
                    borderWidth: 0.5,
                    borderColor: COLORS.gray300,
                    paddingHorizontal: 4,
                    paddingVertical: 1,
                    borderRadius: 2,
                  }}>
                    <Text style={{ fontSize: 6, color: COLORS.gray500 }}>BW</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}

      <Text style={styles.noteText}>
        {messages['pdf.evidence.legalBasis'] || 'Legal basis: §39 BSIG (Nachweispflichten)'}
      </Text>
    </View>
  );
};

export default PDFEvidenceSection;
