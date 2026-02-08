import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFSectorGuidance, PDFMessages } from '@/lib/pdf/types';

interface PDFSectorGuidanceProps {
  sectorGuidance: PDFSectorGuidance;
  messages: PDFMessages;
}

const PDFSectorGuidanceSection = ({ sectorGuidance, messages }: PDFSectorGuidanceProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.sector.title'] || 'Sector-Specific Guidance'}
      </Text>

      {/* Additional regulations */}
      <Text style={styles.subSectionTitle}>
        {messages['pdf.sector.regulations'] || 'Additional Regulations'}
      </Text>

      {sectorGuidance.regulations.map((reg, index) => (
        <View
          key={index}
          wrap={false}
          style={{
            marginBottom: 8,
            padding: 10,
            backgroundColor: COLORS.gray50,
            borderRadius: 4,
            borderLeft: `2 solid ${COLORS.primary}`,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.gray900, flex: 1 }}>
              {reg.name}
            </Text>
            <View style={{
              backgroundColor: COLORS.primaryLight,
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 3,
            }}>
              <Text style={{ fontSize: 7, color: COLORS.primary }}>{reg.legalBasis}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.4 }}>
            {reg.description}
          </Text>
        </View>
      ))}

      {/* Challenges */}
      <Text style={styles.subSectionTitle}>
        {messages['pdf.sector.challenges'] || 'Sector-Specific Challenges'}
      </Text>
      <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.5, marginBottom: 10 }}>
        {sectorGuidance.challenges}
      </Text>

      {/* Recommendations */}
      <Text style={styles.subSectionTitle}>
        {messages['pdf.sector.recommendations'] || 'Sector Recommendations'}
      </Text>
      <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.5 }}>
        {sectorGuidance.recommendations}
      </Text>
    </View>
  );
};

export default PDFSectorGuidanceSection;
