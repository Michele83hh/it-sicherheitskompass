import { Text, View } from '@react-pdf/renderer';
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

const PDFExecutiveSummarySection = ({ executiveSummary, messages, locale }: PDFExecutiveSummaryProps) => {
  const { percentage, trafficLight, topRisks, quickWins, basisschutzTotal } = executiveSummary;
  const tlColors = TRAFFIC_LIGHT_COLORS[trafficLight] || TRAFFIC_LIGHT_COLORS.red;

  return (
    <View>
      {/* Top row: KPI + Top Risks side by side */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        {/* Block A: Reifegrad KPI */}
        <View style={{
          flex: 1,
          backgroundColor: tlColors.bg,
          border: `1 solid ${tlColors.dot}`,
          borderRadius: 4,
          padding: 16,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 26, fontWeight: 700, color: tlColors.text }}>
            {Math.round(percentage)}%
          </Text>
          <Text style={{ fontSize: 9, color: COLORS.gray700, marginTop: 4 }}>
            {messages['pdf.overallScore'] || 'Ihr NIS2-Reifegrad'}
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.gray500, marginTop: 6 }}>
            {messages['pdf.executive.targetLabel'] || 'Ziel in 12 Monaten: über 80%'}
          </Text>
        </View>

        {/* Block B: Top 3 Risikobereiche */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.redBg,
          border: `1 solid ${COLORS.red}`,
          borderRadius: 4,
          padding: 12,
        }}>
          <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.red, marginBottom: 8 }}>
            {messages['pdf.executive.riskTitle'] || 'Größte Lücken'}
          </Text>
          {topRisks.map((risk, idx) => {
            const riskColor = TRAFFIC_LIGHT_COLORS[risk.trafficLight]?.dot || COLORS.red;
            return (
              <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: riskColor,
                  marginRight: 6,
                }} />
                <Text style={{ fontSize: 8, color: COLORS.gray900, flex: 1 }}>
                  {risk.name}
                </Text>
                <Text style={{ fontSize: 8, fontWeight: 700, color: riskColor }}>
                  {Math.round(risk.percentage)}%
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Block C: Quick-Win Startpaket */}
      <View style={{
        backgroundColor: COLORS.greenBg,
        border: `1 solid ${COLORS.green}`,
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
      }}>
        <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>
          {messages['pdf.executive.quickWinTitle'] || 'Sofort starten — ohne externes Budget'}
        </Text>

        {/* Quick Win items */}
        {quickWins.map((qw, idx) => (
          <View key={idx} style={{
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            padding: 6,
            borderRadius: 3,
            marginBottom: 3,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 8, color: COLORS.gray900, flex: 3 }}>
              {qw.title}
            </Text>
            <Text style={{ fontSize: 7, color: COLORS.gray500, flex: 1, textAlign: 'right' }}>
              {qw.days} {messages['pdf.executive.quickWinDays'] || 'Tage'}
            </Text>
            <Text style={{ fontSize: 7, fontWeight: 600, color: COLORS.green, flex: 1.5, textAlign: 'right' }}>
              {qw.cost}
            </Text>
          </View>
        ))}

        {/* Basisschutz total */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingTop: 6,
          borderTop: `1 solid ${COLORS.green}`,
        }}>
          <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray900 }}>
            {messages['pdf.executive.totalBasisschutz'] || 'Gesamtkosten Basisschutz'}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.green }}>
            {formatRange(basisschutzTotal.min, basisschutzTotal.max, locale)}
          </Text>
        </View>
      </View>

      {/* Glossary reference */}
      <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 12 }}>
        {messages['pdf.executive.glossaryRef'] || 'Alle Fachbegriffe (ISMS, BIA, MFA u.a.) sind im Glossar am Ende dieses Reports in Alltagssprache erklärt.'}
      </Text>

      {/* Block D: 3 Action Paths */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {/* Option A: Intern starten */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.greenBg,
          border: `1 solid ${COLORS.green}`,
          borderRadius: 4,
          padding: 10,
        }}>
          <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.green, marginBottom: 4 }}>
            {messages['pdf.executive.optionA.title'] || 'A — Intern starten'}
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.gray700, lineHeight: 1.4 }}>
            {messages['pdf.executive.optionA.text'] || 'Quick-Wins aus Phase 1 selbst umsetzen — ohne externes Budget'}
          </Text>
        </View>
        {/* Option B: Erstgespräch */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.primaryLight,
          border: `1 solid ${COLORS.primary}`,
          borderRadius: 4,
          padding: 10,
        }}>
          <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.primary, marginBottom: 4 }}>
            {messages['pdf.executive.optionB.title'] || 'B — Erstgespräch buchen'}
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.gray700, lineHeight: 1.4 }}>
            {messages['pdf.executive.optionB.text'] || '30 Min. kostenlos — wir prüfen, ob die Kosten für Ihren Fall reduziert werden können'}
          </Text>
        </View>
        {/* Option C: Begleitete Umsetzung */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.gray50,
          border: `1 solid ${COLORS.gray300}`,
          borderRadius: 4,
          padding: 10,
        }}>
          <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray900, marginBottom: 4 }}>
            {messages['pdf.executive.optionC.title'] || 'C — Stufe-1-Projekt anfragen'}
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.gray700, lineHeight: 1.4 }}>
            {messages['pdf.executive.optionC.text'] || 'Strukturierte Umsetzung in 3–6 Monaten, passend zu Ihrem Budget'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PDFExecutiveSummarySection;
