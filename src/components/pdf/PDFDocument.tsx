import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFPayload } from '@/lib/pdf/types';

interface PDFDocumentProps {
  payload: PDFPayload;
}

const PDFDocument = ({ payload }: PDFDocumentProps) => {
  const { locale, company, overallScore, categories, recommendations, messages } = payload;
  const generatedDate = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date());

  return (
    <Document
      title={messages['pdf.title'] || 'NIS2 Readiness Report'}
      author="NIS2-Bereitschaftsprüfung"
      subject="NIS2 Readiness Assessment Report"
    >
      {/* Page 1: Cover + Disclaimer + Company Profile */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.headerTitle}>
          {messages['pdf.title'] || 'NIS2-Readiness-Report'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {messages['pdf.subtitle'] || 'Ergebnis der NIS2-Bereitschaftsprüfung'}
        </Text>

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            {messages['pdf.disclaimer'] || 'Ihre Angaben deuten darauf hin, dass der folgende Reifegrad vorliegt. Ein hoher Score bedeutet nicht automatisch NIS2-Konformität.'}
          </Text>
        </View>

        {/* Metadata */}
        <Text style={styles.metadataText}>
          Rechtsstand: Januar 2025 (NIS2-Richtlinie (EU) 2022/2555, NIS2UmsG)
        </Text>
        <Text style={styles.metadataText}>
          {messages['pdf.generatedAt'] || 'Erstellt am'}: {generatedDate}
        </Text>

        {/* Company Profile placeholder -- Plan 02 replaces */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>
            {messages['pdf.companyProfile'] || 'Unternehmensprofil'}
          </Text>
          <Text>{company.sectorName} - {company.classification}</Text>
          <Text>{messages['pdf.employees'] || 'Mitarbeiter'}: {company.employees}</Text>
        </View>

        {/* Overall Score placeholder */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>
            {messages['pdf.overallScore'] || 'Gesamter Reifegrad'}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary }}>
            {overallScore.percentage}%
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>NIS2-Bereitschaftsprüfung</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* Page 2: Categories placeholder -- Plan 02 replaces */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>
          {messages['pdf.categories'] || 'Ergebnisse nach Kategorie'}
        </Text>
        {categories.map((cat) => (
          <View key={cat.categoryId} style={{ marginBottom: 8 }}>
            <Text>{cat.categoryName}: {cat.percentage}%</Text>
          </View>
        ))}
        <View style={styles.footer} fixed>
          <Text>NIS2-Bereitschaftsprüfung</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* Page 3: Recommendations placeholder -- Plan 02 replaces */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>
          {messages['pdf.recommendations'] || 'Handlungsempfehlungen'}
        </Text>
        {recommendations.slice(0, 10).map((rec, idx) => (
          <View key={idx} style={{ marginBottom: 6 }}>
            <Text style={styles.bold}>{rec.title}</Text>
            <Text style={{ fontSize: 9 }}>{rec.firstStep}</Text>
          </View>
        ))}
        <View style={styles.footer} fixed>
          <Text>NIS2-Bereitschaftsprüfung</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
