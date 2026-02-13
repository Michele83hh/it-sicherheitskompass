import { Text, View, Svg, Rect } from '@react-pdf/renderer';
import { COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFExecutiveSummary, PDFMessages } from '@/lib/pdf/types';

interface PDFExecutiveSummaryProps {
  executiveSummary: PDFExecutiveSummary;
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const formatEur = (amount: number, locale: 'de' | 'en'): string =>
  new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);

const formatRange = (min: number, max: number, locale: 'de' | 'en'): string =>
  `${formatEur(min, locale)} – ${formatEur(max, locale)}`;

// Mini bar chart constants
const MINI_BAR_WIDTH = 160;
const MINI_BAR_HEIGHT = 10;

const PDFExecutiveSummarySection = ({ executiveSummary, messages, locale }: PDFExecutiveSummaryProps) => {
  const { percentage, trafficLight, topRisks, quickWins, basisschutzTotal } = executiveSummary;
  const tlColors = TRAFFIC_LIGHT_COLORS[trafficLight] || TRAFFIC_LIGHT_COLORS.red;

  const hasCosts = basisschutzTotal && (basisschutzTotal.min > 0 || basisschutzTotal.max > 0);

  return (
    <View>
      {/* Top row: KPI + Top Risks side by side */}
      <View style={{ flexDirection: 'row', gap: 14, marginBottom: 18 }}>
        {/* Block A: Reifegrad KPI — larger */}
        <View style={{
          flex: 1,
          backgroundColor: tlColors.bg,
          border: `1.5 solid ${tlColors.dot}`,
          borderRadius: 6,
          padding: 20,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 36, fontWeight: 700, color: tlColors.text }}>
            {Math.round(percentage)}%
          </Text>
          <Text style={{ fontSize: 10, color: COLORS.gray700, marginTop: 6 }}>
            {messages['pdf.overallScore'] || 'Ihr NIS2-Reifegrad'}
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.gray500, marginTop: 6 }}>
            {messages['pdf.executive.targetLabel'] || 'Ziel in 12 Monaten: über 80%'}
          </Text>

          {/* Basisschutz cost range prominently */}
          {hasCosts && (
            <View style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: `0.5 solid ${tlColors.dot}`,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 8, color: COLORS.gray500, marginBottom: 2 }}>
                {messages['pdf.executive.totalBasisschutz'] || 'Gesamtkosten Basisschutz'}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 700, color: tlColors.text }}>
                {formatRange(basisschutzTotal.min, basisschutzTotal.max, locale)}
              </Text>
            </View>
          )}
        </View>

        {/* Block B: Top 3 Risikobereiche */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.redBg,
          border: `1.5 solid ${COLORS.red}`,
          borderRadius: 6,
          padding: 14,
        }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.red, marginBottom: 10 }}>
            {messages['pdf.executive.riskTitle'] || 'Größte Lücken'}
          </Text>
          {topRisks.map((risk, idx) => {
            const riskColor = TRAFFIC_LIGHT_COLORS[risk.trafficLight]?.dot || COLORS.red;
            const riskPct = Math.round(risk.percentage);
            const barWidth = Math.max(4, (riskPct / 100) * MINI_BAR_WIDTH);
            return (
              <View key={idx} style={{ marginBottom: 10 }}>
                {/* Name + percentage */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: riskColor,
                    marginRight: 6,
                  }} />
                  <Text style={{ fontSize: 9, color: COLORS.gray900, flex: 1 }}>
                    {risk.name}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 700, color: riskColor }}>
                    {riskPct}%
                  </Text>
                </View>
                {/* Mini bar */}
                <Svg width={MINI_BAR_WIDTH} height={MINI_BAR_HEIGHT} viewBox={`0 0 ${MINI_BAR_WIDTH} ${MINI_BAR_HEIGHT}`}>
                  <Rect x="0" y="0" width={`${MINI_BAR_WIDTH}`} height={`${MINI_BAR_HEIGHT}`} rx="2" ry="2" fill={COLORS.gray200} />
                  {riskPct > 0 && (
                    <Rect x="0" y="0" width={`${barWidth}`} height={`${MINI_BAR_HEIGHT}`} rx="2" ry="2" fill={riskColor} />
                  )}
                </Svg>
              </View>
            );
          })}
        </View>
      </View>

      {/* Block C: Quick-Win Startpaket */}
      <View style={{
        backgroundColor: COLORS.greenBg,
        border: `1.5 solid ${COLORS.green}`,
        borderRadius: 6,
        padding: 14,
        marginBottom: 16,
      }}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.green, marginBottom: 10 }}>
          {messages['pdf.executive.quickWinTitle'] || 'Sofort starten — ohne externes Budget'}
        </Text>

        {/* Quick Win items */}
        {quickWins.map((qw, idx) => (
          <View key={idx} style={{
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            padding: 8,
            borderRadius: 4,
            marginBottom: 4,
            alignItems: 'center',
          }}>
            {/* Index badge */}
            <View style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: COLORS.green,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
              <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.white }}>{idx + 1}</Text>
            </View>
            <Text style={{ fontSize: 9, color: COLORS.gray900, flex: 3 }}>
              {qw.title}
            </Text>
            <Text style={{ fontSize: 8, color: COLORS.gray500, flex: 1, textAlign: 'right' }}>
              {qw.days} {messages['pdf.executive.quickWinDays'] || 'Tage'}
            </Text>
            <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.green, flex: 1.5, textAlign: 'right' }}>
              {qw.cost}
            </Text>
          </View>
        ))}

        {/* Basisschutz total in quick wins section */}
        {hasCosts && (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingTop: 8,
            borderTop: `1 solid ${COLORS.green}`,
          }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.gray900 }}>
              {messages['pdf.executive.totalBasisschutz'] || 'Gesamtkosten Basisschutz'}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.green }}>
              {formatRange(basisschutzTotal.min, basisschutzTotal.max, locale)}
            </Text>
          </View>
        )}
      </View>

      {/* Glossary reference */}
      <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
        {messages['pdf.executive.glossaryRef'] || 'Alle Fachbegriffe (ISMS, BIA, MFA u.a.) sind im Glossar am Ende dieses Reports in Alltagssprache erklärt.'}
      </Text>
    </View>
  );
};

export default PDFExecutiveSummarySection;
