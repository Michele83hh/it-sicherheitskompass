import { Text, View, Svg, G, Circle as SvgCircle } from '@react-pdf/renderer';
import { COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFPayload, PDFMessages } from '@/lib/pdf/types';

// ─── SVG Ring Chart Constants ───
const RING_SIZE = 76;
const RING_CENTER = RING_SIZE / 2;
const RING_RADIUS = 28;
const RING_STROKE = 5;
const RING_BG_STROKE = 5;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface PDFCoverPageProps {
  messages: PDFMessages;
  locale: 'de' | 'en';
  generatedDate: string;
  company: PDFPayload['company'];
  overallScore: PDFPayload['overallScore'];
  analysisDepth: 'core' | 'full';
}

const PDFCoverPage = ({ messages, locale, generatedDate, company, overallScore, analysisDepth }: PDFCoverPageProps) => {
  const trafficLightColor = TRAFFIC_LIGHT_COLORS[overallScore.trafficLight];
  const progressArc = RING_CIRCUMFERENCE * (overallScore.percentage / 100);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(num);

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(num);

  const getClassificationColor = () => {
    switch (company.classificationCategory) {
      case 'besonders-wichtig': return COLORS.red;
      case 'wichtig': return COLORS.yellow;
      case 'nicht-betroffen': return COLORS.green;
      default: return COLORS.gray500;
    }
  };

  const getClassificationBg = () => {
    switch (company.classificationCategory) {
      case 'besonders-wichtig': return COLORS.redBg;
      case 'wichtig': return COLORS.yellowBg;
      case 'nicht-betroffen': return COLORS.greenBg;
      default: return COLORS.gray100;
    }
  };

  const hasClassification = !!company.classificationCategory;
  const isNichtBetroffen = company.classificationCategory === 'nicht-betroffen';

  return (
    <View style={{ flex: 1 }}>

      {/* ─── Title Block ─── */}
      <View style={{ marginBottom: 12 }}>
        {/* Thin blue accent bar */}
        <View style={{
          width: 40,
          height: 3,
          backgroundColor: COLORS.primary,
          marginBottom: 12,
        }} />

        <Text style={{
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.gray900,
          marginBottom: 4,
        }}>
          {messages['pdf.title'] || 'NIS2 Readiness Report'}
        </Text>

        <Text style={{
          fontSize: 10,
          color: COLORS.gray500,
          marginBottom: 3,
        }}>
          {messages['pdf.subtitle'] || 'Ergebnisse der NIS2-Bereitschaftsprüfung'}
        </Text>

        {/* Value proposition */}
        <Text style={{
          fontSize: 8,
          color: COLORS.primary,
          fontWeight: 600,
          marginBottom: 8,
        }}>
          {messages['pdf.valueProposition'] || 'Ihr individueller Cyber-Sicherheitsstatus — verständlich, umsetzbar, praxisnah.'}
        </Text>

        {/* Hero Claim — 3 bullet points explaining what this report delivers */}
        <View style={{
          backgroundColor: COLORS.primaryLight,
          border: `1 solid ${COLORS.primary}`,
          borderRadius: 4,
          padding: 10,
          marginBottom: 8,
        }}>
          <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.primary, marginBottom: 6 }}>
            {messages['pdf.cover.heroClaimTitle'] || 'Was dieses Ergebnis für Sie bedeutet'}
          </Text>
          {[1, 2, 3].map((n) => {
            const text = messages[`pdf.cover.heroClaim${n}`];
            if (!text) return null;
            return (
              <View key={n} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 3 }}>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary, marginTop: 3 }} />
                <Text style={{ fontSize: 7.5, color: COLORS.gray700, flex: 1, lineHeight: 1.3 }}>{text}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ borderBottom: `0.5 solid ${COLORS.gray200}`, marginBottom: 6 }} />

        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
            {messages['pdf.rechtsstand']}:{' '}
            <Text style={{ fontWeight: 600, color: COLORS.gray700 }}>
              {messages['pdf.rechtstandDatum']} (NIS2UmsG)
            </Text>
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
            {messages['pdf.generatedAt']}:{' '}
            <Text style={{ fontWeight: 600, color: COLORS.gray700 }}>
              {generatedDate}
            </Text>
          </Text>
        </View>
      </View>

      {/* ─── Score Section: SVG Ring (left) + Stats (right) ─── */}
      <View style={{
        flexDirection: 'row',
        padding: 14,
        border: `1 solid ${COLORS.gray200}`,
        borderRadius: 4,
        backgroundColor: COLORS.gray50,
        marginBottom: 10,
        gap: 16,
      }}>
        {/* SVG Donut Ring */}
        <View style={{ width: RING_SIZE, height: RING_SIZE }}>
          <Svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {/* Background ring */}
            <SvgCircle
              cx={`${RING_CENTER}`}
              cy={`${RING_CENTER}`}
              r={`${RING_RADIUS}`}
              fill="none"
              stroke={COLORS.gray200}
              strokeWidth={`${RING_BG_STROKE}`}
            />
            {/* Progress arc — rotated to start from 12 o'clock */}
            {progressArc > 0 && (
              <G transform={`rotate(-90 ${RING_CENTER} ${RING_CENTER})`}>
                <SvgCircle
                  cx={`${RING_CENTER}`}
                  cy={`${RING_CENTER}`}
                  r={`${RING_RADIUS}`}
                  fill="none"
                  stroke={trafficLightColor.dot}
                  strokeWidth={`${RING_STROKE}`}
                  strokeDasharray={`${progressArc} ${RING_CIRCUMFERENCE}`}
                  strokeLinecap="round"
                />
              </G>
            )}
          </Svg>

          {/* Percentage text overlay */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: RING_SIZE,
            height: RING_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 17,
              fontWeight: 700,
              color: trafficLightColor.text,
            }}>
              {Math.round(overallScore.percentage)}%
            </Text>
          </View>
        </View>

        {/* Stats beside the ring */}
        <View style={{ flex: 1, justifyContent: 'center', gap: 10 }}>
          <Text style={{
            fontSize: 8,
            fontWeight: 600,
            color: COLORS.gray500,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}>
            {messages['pdf.overallScore'] || 'Gesamtbereitschaft'}
          </Text>

          {/* Questions answered + analysis depth badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: trafficLightColor.dot,
            }} />
            <Text style={{ fontSize: 9, color: COLORS.gray700 }}>
              {overallScore.answeredQuestions} / {overallScore.totalQuestions} {messages['pdf.answeredQuestions'] || 'Fragen beantwortet'}
            </Text>
            <View style={{
              backgroundColor: analysisDepth === 'full' ? COLORS.greenBg : COLORS.primaryLight,
              paddingHorizontal: 5,
              paddingVertical: 1,
              borderRadius: 3,
            }}>
              <Text style={{
                fontSize: 6.5,
                fontWeight: 600,
                color: analysisDepth === 'full' ? COLORS.green : COLORS.primary,
              }}>
                {messages[`pdf.analysisDepth.${analysisDepth}`] || (analysisDepth === 'full' ? 'Vollständige Analyse' : 'Kernanalyse')}
              </Text>
            </View>
          </View>

          {/* Completion bar */}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 7, color: COLORS.gray500 }}>
                {messages['pdf.completionRate'] || 'Vollständigkeit'}
              </Text>
              <Text style={{ fontSize: 7, fontWeight: 700, color: COLORS.gray700 }}>
                {overallScore.completionRate}%
              </Text>
            </View>
            <View style={{ height: 4, backgroundColor: COLORS.gray200, borderRadius: 2 }}>
              <View style={{
                width: `${Math.min(overallScore.completionRate, 100)}%`,
                height: 4,
                backgroundColor: COLORS.primary,
                borderRadius: 2,
              }} />
            </View>
          </View>
        </View>
      </View>

      {/* ─── "Auf einen Blick" Management Summary ─── */}
      <View style={{
        padding: 10,
        backgroundColor: COLORS.gray50,
        border: `1 solid ${COLORS.gray200}`,
        borderRadius: 4,
        marginBottom: 10,
      }}>
        <Text style={{
          fontSize: 10,
          fontWeight: 700,
          color: COLORS.gray900,
          marginBottom: 6,
        }}>
          {messages['pdf.summary.title'] || 'Auf einen Blick'}
        </Text>

        {/* Bullet 1: Readiness */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <View style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: trafficLightColor.dot,
            marginTop: 2,
          }} />
          <Text style={{ fontSize: 9, color: COLORS.gray700, flex: 1 }}>
            {messages['pdf.summary.readiness'] || ''}
          </Text>
        </View>

        {/* Bullet 2: Classification */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <View style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: COLORS.primary,
            marginTop: 2,
          }} />
          <Text style={{ fontSize: 9, color: COLORS.gray700, flex: 1 }}>
            {messages['pdf.summary.classification'] || ''}
          </Text>
        </View>

        {/* Bullet 3: Top Action */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
          <View style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: COLORS.primary,
            marginTop: 2,
          }} />
          <Text style={{ fontSize: 9, color: COLORS.gray700, flex: 1 }}>
            {messages['pdf.summary.topAction'] || ''}
          </Text>
        </View>

        {/* Trust Anchor — legal basis reference */}
        <View style={{
          marginTop: 8,
          paddingTop: 6,
          borderTop: `0.5 solid ${COLORS.gray200}`,
        }}>
          <Text style={{ fontSize: 7, color: COLORS.gray500 }}>
            {messages['pdf.cover.trustAnchor'] || 'Bewertungsgrundlage: §30 BSIG (Risikomanagementmaßnahmen) und Art. 21 NIS2-Richtlinie'}
          </Text>
        </View>
      </View>

      {/* ─── Top 3 Quick Wins ─── */}
      {messages['pdf.cover.quickWin1'] && (
        <View style={{
          padding: 10,
          backgroundColor: COLORS.greenBg,
          border: `1 solid ${COLORS.green}`,
          borderRadius: 4,
          marginBottom: 10,
        }}>
          <Text style={{
            fontSize: 9,
            fontWeight: 700,
            color: COLORS.green,
            marginBottom: 4,
          }}>
            {messages['pdf.cover.quickWinsTitle'] || 'Sofort umsetzbar'}
          </Text>
          {[1, 2, 3].map((n) => {
            const title = messages[`pdf.cover.quickWin${n}`];
            if (!title) return null;
            return (
              <View key={n} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                <Text style={{ fontSize: 9, color: COLORS.green }}>✓</Text>
                <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.3 }}>{title}</Text>
              </View>
            );
          })}
        </View>
      )}

      {/* ─── Company Profile ─── */}
      <View style={{
        padding: 14,
        border: `1 solid ${COLORS.gray200}`,
        borderRadius: 4,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
          <View style={{
            width: 3,
            height: 14,
            backgroundColor: COLORS.primary,
            borderRadius: 1,
          }} />
          <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray900 }}>
            {messages['pdf.companyProfile'] || 'Unternehmensprofil'}
          </Text>
        </View>

        {/* Two-column layout */}
        <View style={{ flexDirection: 'row', gap: 24 }}>
          {/* Left column */}
          <View style={{ flex: 1, gap: 6 }}>
            <DetailField
              label={messages['pdf.sector'] || 'Sektor'}
              value={company.sectorName}
            />
            {company.subsectorName && (
              <DetailField
                label={messages['pdf.subsector'] || 'Untersektor'}
                value={company.subsectorName}
              />
            )}
            <DetailField
              label={messages['pdf.employees'] || 'Mitarbeiter'}
              value={formatNumber(company.employees)}
            />
            <DetailField
              label={messages['pdf.annualRevenue'] || 'Jahresumsatz'}
              value={formatCurrency(company.annualRevenue)}
            />
          </View>

          {/* Right column */}
          <View style={{ flex: 1, gap: 6 }}>
            {hasClassification && (
              <View>
                <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 3 }}>
                  {messages['pdf.classification'] || 'Einstufung'}
                </Text>
                <View style={{
                  backgroundColor: getClassificationBg(),
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 3,
                  alignSelf: 'flex-start',
                }}>
                  <Text style={{ fontSize: 9, fontWeight: 700, color: getClassificationColor() }}>
                    {isNichtBetroffen
                      ? (messages['pdf.nonAffected.label'] || company.classification)
                      : company.classification
                    }
                  </Text>
                </View>
                {/* Non-affected benefits text */}
                {isNichtBetroffen && (
                  <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 4, lineHeight: 1.4 }}>
                    {messages['pdf.nonAffected.benefits'] || ''}
                  </Text>
                )}
              </View>
            )}
            {company.legalReference && (
              <DetailField
                label={messages['pdf.rechtsgrundlage'] || 'Rechtsgrundlage'}
                value={company.legalReference}
              />
            )}
          </View>
        </View>
      </View>

      {/* Special box for nicht-betroffen: why this report is still valuable */}
      {isNichtBetroffen && (
        <View style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: COLORS.greenBg,
          border: `1 solid ${COLORS.green}`,
          borderRadius: 4,
        }}>
          <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>
            {messages['pdf.nonAffected.coverTitle'] || 'Warum dieser Report trotzdem wertvoll ist'}
          </Text>
          {[1, 2, 3].map((n) => {
            const text = messages[`pdf.nonAffected.coverPoint${n}`];
            if (!text) return null;
            return (
              <View key={n} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.green, marginTop: 2 }} />
                <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.3 }}>{text}</Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Flex spacer — pushes disclaimer to page bottom */}
      <View style={{ flex: 1 }} />

      {/* ─── Disclaimer ─── */}
      <View style={{
        paddingTop: 12,
        borderTop: `0.5 solid ${COLORS.gray300}`,
      }}>
        <Text style={{
          fontSize: 7,
          color: COLORS.gray500,
          lineHeight: 1.5,
        }}>
          {messages['pdf.disclaimer']}
        </Text>
      </View>
    </View>
  );
};

/** Stacked label/value pair */
const DetailField = ({ label, value }: { label: string; value: string }) => (
  <View>
    <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>{label}</Text>
    <Text style={{ fontSize: 9, color: COLORS.gray900 }}>{value}</Text>
  </View>
);

export default PDFCoverPage;
