import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from '@/lib/pdf/styles';
import type { PDFPayload } from '@/lib/pdf/types';
import PDFCoverPage from './PDFCoverPage';
import PDFCompanyProfile from './PDFCompanyProfile';
import PDFOverallScore from './PDFOverallScore';
import PDFScoresTable from './PDFScoresTable';
import PDFRecommendations from './PDFRecommendations';

interface PDFDocumentProps {
  payload: PDFPayload;
}

const PDFDocument = ({ payload }: PDFDocumentProps) => {
  const { locale, company, overallScore, categories, recommendations, messages } = payload;

  // Format generated date in user's locale
  const generatedDate = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date());

  // Footer component to reuse
  const Footer = () => (
    <View style={styles.footer} fixed>
      <Text>NIS2-Bereitschaftsprüfung</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );

  return (
    <Document
      title={messages['pdf.title'] || 'NIS2 Readiness Report'}
      author="NIS2-Bereitschaftsprüfung"
      subject="NIS2 Readiness Assessment Report"
    >
      {/* Page 1: Cover + Company Profile + Overall Score */}
      <Page size="A4" style={styles.page}>
        <PDFCoverPage
          messages={messages}
          locale={locale}
          generatedDate={generatedDate}
        />

        <PDFCompanyProfile
          company={company}
          messages={messages}
          locale={locale}
        />

        <PDFOverallScore
          overallScore={overallScore}
          messages={messages}
        />

        <Footer />
      </Page>

      {/* Page 2: Category Scores Table */}
      <Page size="A4" style={styles.page}>
        <PDFScoresTable
          categories={categories}
          messages={messages}
          locale={locale}
        />

        <Footer />
      </Page>

      {/* Page 3+: Recommendations (with automatic pagination) */}
      <Page size="A4" style={styles.page}>
        <PDFRecommendations
          recommendations={recommendations}
          messages={messages}
          locale={locale}
        />

        <Footer />
      </Page>
    </Document>
  );
};

export default PDFDocument;
