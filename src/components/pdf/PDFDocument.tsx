import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFPayload } from '@/lib/pdf/types';
import PDFCoverPage from './PDFCoverPage';
import PDFCompanyProfile from './PDFCompanyProfile';
import PDFOverallScore from './PDFOverallScore';
import PDFScoresTable from './PDFScoresTable';
import PDFRecommendations from './PDFRecommendations';
import PDFPenaltySection from './PDFPenalty';
import PDFRoadmap from './PDFRoadmap';
import PDFCostSummarySection from './PDFCostSummary';
import PDFDsgvoOverlapSection from './PDFDsgvoOverlap';
import PDFIso27001Section from './PDFIso27001';

interface PDFDocumentProps {
  payload: PDFPayload;
}

const PDFDocument = ({ payload }: PDFDocumentProps) => {
  const {
    locale, company, overallScore, categories, recommendations, messages,
    penalty, roadmap, costSummary, dsgvoOverlap, iso27001, isKritis,
  } = payload;

  // Check if any additional analysis sections are present
  const hasAdditionalSections = penalty || roadmap || costSummary || dsgvoOverlap || iso27001 || isKritis;

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

      {/* Page 4+: Additional Analysis (conditionally rendered) */}
      {hasAdditionalSections && (
        <Page size="A4" style={styles.page}>
          {/* Page heading */}
          <Text style={styles.headerTitle}>
            {messages['pdf.additionalAnalysis'] || 'Additional Analysis'}
          </Text>
          <View style={styles.hr} />

          {/* Penalty section */}
          {penalty && (
            <PDFPenaltySection
              penalty={penalty}
              messages={messages}
              locale={locale}
            />
          )}

          {/* Roadmap section */}
          {roadmap && (
            <PDFRoadmap
              phases={roadmap.phases}
              messages={messages}
            />
          )}

          {/* Cost summary section */}
          {costSummary && (
            <PDFCostSummarySection
              costSummary={costSummary}
              messages={messages}
              locale={locale}
            />
          )}

          {/* DSGVO overlap section */}
          {dsgvoOverlap && (
            <PDFDsgvoOverlapSection
              dsgvoOverlap={dsgvoOverlap}
              messages={messages}
            />
          )}

          {/* ISO 27001 crosswalk section */}
          {iso27001 && (
            <PDFIso27001Section
              iso27001={iso27001}
              messages={messages}
            />
          )}

          {/* KRITIS note */}
          {isKritis && (
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
                  'This organization may qualify as a critical infrastructure operator (KRITIS) under the BSI-KritisV. KRITIS operators are subject to additional obligations beyond NIS2, including registration with the BSI, mandatory incident reporting within stricter timelines, and regular security audits. Please consult the BSI KRITIS page and seek specialized legal counsel.'}
              </Text>
            </View>
          )}

          <Footer />
        </Page>
      )}
    </Document>
  );
};

export default PDFDocument;
