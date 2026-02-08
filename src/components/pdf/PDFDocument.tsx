import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFPayload } from '@/lib/pdf/types';
import PDFCoverPage from './PDFCoverPage';
import PDFExecutiveSummarySection from './PDFExecutiveSummary';
import PDFScoresTable from './PDFScoresTable';
import PDFRecommendations from './PDFRecommendations';
import PDFPenaltySection from './PDFPenalty';
import PDFRoadmap from './PDFRoadmap';
import PDFCostSummarySection from './PDFCostSummary';
import PDFCostInvestments from './PDFCostInvestments';
import PDFDsgvoOverlapSection from './PDFDsgvoOverlap';
import PDFIso27001Section from './PDFIso27001';
import PDFDinSpecSection from './PDFDinSpec';
import PDFEvidenceSection from './PDFEvidence';
import PDFSectorGuidanceSection from './PDFSectorGuidance';
import PDFKritisSection from './PDFKritis';
import PDFProgressSection from './PDFProgress';
import PDFCallToAction from './PDFCallToAction';
import PDFGlossary from './PDFGlossary';

interface PDFDocumentProps {
  payload: PDFPayload;
}

const PDFDocument = ({ payload }: PDFDocumentProps) => {
  const {
    locale, analysisDepth, company, overallScore, categories, recommendations, messages,
    executiveSummary, penalty, roadmap, costSummary, dsgvoOverlap, iso27001, isKritis,
    dinSpec, evidence, sectorGuidance, kpiDetails, progress,
  } = payload;

  // Format generated date in user's locale
  const generatedDate = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date());

  // Track section numbers dynamically (only count sections that exist)
  let sectionCounter = 0;
  const nextSection = () => ++sectionCounter;

  // Pre-compute section numbers — each section gets its own number
  const sectionNumbers = {
    executive: executiveSummary ? nextSection() : 0,  // 1 if present
    categories: nextSection(),       // 2 (or 1 if no exec summary)
    recommendations: nextSection(),  // 3 (or 2)
    penalty: penalty ? nextSection() : 0,
    costSummary: costSummary ? nextSection() : 0,
    roadmap: roadmap ? nextSection() : 0,
    sectorGuidance: sectorGuidance ? nextSection() : 0,  // moved before expert sections
    dsgvoOverlap: dsgvoOverlap ? nextSection() : 0,
    iso27001: iso27001 ? nextSection() : 0,
    dinSpec: dinSpec ? nextSection() : 0,
    evidence: evidence ? nextSection() : 0,
    kritis: isKritis ? nextSection() : 0,
    progress: progress ? nextSection() : 0,
    glossary: nextSection(),         // always present
  };

  // Footer component
  const Footer = () => (
    <View style={styles.footer} fixed>
      <Text>NIS2-Bereitschaftsprüfung</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );

  // Page header component with section number and title
  const PageHeader = ({ number, title, subtitle }: { number: number; title: string; subtitle?: string }) => (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{
          backgroundColor: COLORS.primary,
          width: 24,
          height: 24,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.white }}>{number}</Text>
        </View>
        <Text style={styles.pageHeader}>{title}</Text>
      </View>
      {subtitle && (
        <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 4, marginLeft: 32 }}>
          {subtitle}
        </Text>
      )}
      <View style={[styles.hr, { marginTop: 8 }]} />
    </View>
  );

  return (
    <Document
      title={messages['pdf.title'] || 'NIS2 Readiness Report'}
      author="NIS2-Bereitschaftsprüfung"
      subject="NIS2 Readiness Assessment Report"
    >
      {/* ─── Page 1: Cover (Banner + Score + Company Profile + Disclaimer) ─── */}
      <Page size="A4" style={styles.page}>
        <PDFCoverPage
          messages={messages}
          locale={locale}
          generatedDate={generatedDate}
          company={company}
          overallScore={overallScore}
          analysisDepth={analysisDepth}
        />

        <Footer />
      </Page>

      {/* ─── Executive Summary (Management-Zusammenfassung) ─── */}
      {executiveSummary && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.executive}
            title={messages['pdf.executive.title'] || 'Management-Zusammenfassung'}
          />

          <PDFExecutiveSummarySection
            executiveSummary={executiveSummary}
            messages={messages}
            locale={locale}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Category Scores Table ─── */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          number={sectionNumbers.categories}
          title={messages['pdf.categories'] || 'Ergebnisse nach Kategorie'}
        />

        <PDFScoresTable
          categories={categories}
          messages={messages}
          locale={locale}
        />

        <Footer />
      </Page>

      {/* ─── Recommendations (multi-page) ─── */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          number={sectionNumbers.recommendations}
          title={messages['pdf.recommendations'] || 'Handlungsempfehlungen'}
        />

        <PDFRecommendations
          recommendations={recommendations}
          messages={messages}
          locale={locale}
        />

        <Footer />
      </Page>

      {/* ─── Penalty ─── */}
      {penalty && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.penalty}
            title={messages['pdf.penalty.title'] || 'Bußgeldberechnung'}
          />

          <PDFPenaltySection
            penalty={penalty}
            messages={messages}
            locale={locale}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Cost Estimation ─── */}
      {costSummary && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.costSummary}
            title={messages['pdf.cost.title'] || 'Kostenschätzung'}
          />

          <PDFCostSummarySection
            costSummary={costSummary}
            messages={messages}
            locale={locale}
            classificationCategory={company.classificationCategory}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Cost Investments Detail ─── */}
      {costSummary && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.costSummary}
            title={messages['pdf.cost.investmentsTitle'] || 'Investitionsübersicht'}
          />

          <PDFCostInvestments
            costSummary={costSummary}
            messages={messages}
            locale={locale}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Implementation Roadmap ─── */}
      {roadmap && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.roadmap}
            title={messages['pdf.roadmap.title'] || 'Umsetzungsfahrplan'}
          />

          <PDFRoadmap
            phases={roadmap.phases}
            messages={messages}
            overallPercentage={overallScore.percentage}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Sector Guidance (moved before expert appendix sections) ─── */}
      {sectorGuidance && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.sectorGuidance}
            title={messages['pdf.sector.title'] || 'Branchenspezifische Hinweise'}
          />

          <PDFSectorGuidanceSection
            sectorGuidance={sectorGuidance}
            messages={messages}
          />

          <Footer />
        </Page>
      )}

      {/* ─── DSGVO Overlap ─── */}
      {dsgvoOverlap && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.dsgvoOverlap}
            title={messages['pdf.dsgvo.title'] || 'DSGVO-Überlappungsanalyse'}
            subtitle={messages['pdf.appendix.note']}
          />

          <PDFDsgvoOverlapSection
            dsgvoOverlap={dsgvoOverlap}
            messages={messages}
          />

          <Footer />
        </Page>
      )}

      {/* ─── ISO 27001 Crosswalk ─── */}
      {iso27001 && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.iso27001}
            title={messages['pdf.iso.title'] || 'ISO 27001:2022 Crosswalk'}
            subtitle={messages['pdf.appendix.note']}
          />

          <PDFIso27001Section
            iso27001={iso27001}
            messages={messages}
          />

          <Footer />
        </Page>
      )}

      {/* ─── DIN SPEC 27076 ─── */}
      {dinSpec && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.dinSpec}
            title={messages['pdf.dinSpec.title'] || 'DIN SPEC 27076 Vergleich'}
            subtitle={messages['pdf.appendix.note']}
          />

          <PDFDinSpecSection
            dinSpec={dinSpec}
            messages={messages}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Evidence Management ─── */}
      {evidence && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.evidence}
            title={messages['pdf.evidence.title'] || 'Nachweismanagement'}
            subtitle={messages['pdf.appendix.note']}
          />

          <PDFEvidenceSection
            evidence={evidence}
            messages={messages}
          />

          <Footer />
        </Page>
      )}

      {/* ─── KRITIS Classification ─── */}
      {isKritis && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.kritis}
            title={messages['pdf.kritis.title'] || 'KRITIS-Einstufung'}
            subtitle={messages['pdf.appendix.note']}
          />

          <PDFKritisSection
            kpiDetails={kpiDetails}
            messages={messages}
          />

          <Footer />
        </Page>
      )}

      {/* ─── Progress Tracking ─── */}
      {progress && (
        <Page size="A4" style={styles.page}>
          <PageHeader
            number={sectionNumbers.progress}
            title={messages['pdf.progress.title'] || 'Umsetzungsfortschritt'}
          />

          <PDFProgressSection
            progress={progress}
            messages={messages}
          />

          <Footer />
        </Page>
      )}
      {/* ─── Glossary ─── */}
      <Page size="A4" style={styles.page}>
        <PageHeader
          number={sectionNumbers.glossary}
          title={messages['pdf.glossary.title'] || 'Glossar'}
        />

        <PDFGlossary messages={messages} />

        <Footer />
      </Page>

      {/* ─── CTA / Next Steps (always last page) ─── */}
      <Page size="A4" style={styles.page}>
        <PDFCallToAction
          messages={messages}
          overallPercentage={overallScore.percentage}
        />

        <Footer />
      </Page>
    </Document>
  );
};

export default PDFDocument;
