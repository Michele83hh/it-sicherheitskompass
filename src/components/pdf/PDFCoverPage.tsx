import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFMessages } from '@/lib/pdf/types';

interface PDFCoverPageProps {
  messages: PDFMessages;
  locale: 'de' | 'en';
  generatedDate: string;
}

const PDFCoverPage = ({ messages, locale, generatedDate }: PDFCoverPageProps) => {
  return (
    <View>
      {/* Title */}
      <Text style={styles.headerTitle}>
        {messages['pdf.title'] || 'NIS2 Readiness Report'}
      </Text>

      {/* Subtitle */}
      <Text style={styles.headerSubtitle}>
        {messages['pdf.subtitle'] || 'Results of NIS2 Readiness Assessment'}
      </Text>

      {/* Horizontal rule */}
      <View style={styles.hr} />

      {/* Disclaimer box */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>
          {messages['pdf.disclaimer']}
        </Text>
      </View>

      {/* Metadata - Rechtsstand ALWAYS in German */}
      <Text style={styles.metadataText}>
        {messages['pdf.rechtsstand']}: {messages['pdf.rechtstandDatum']} (NIS2-Richtlinie (EU) 2022/2555, NIS2UmsG)
      </Text>

      {/* Generated date - locale-aware */}
      <Text style={styles.metadataText}>
        {messages['pdf.generatedAt'] || 'Generated on'}: {generatedDate}
      </Text>
    </View>
  );
};

export default PDFCoverPage;
