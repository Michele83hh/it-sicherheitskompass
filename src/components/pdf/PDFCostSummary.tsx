import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFCostSummary, PDFMessages } from '@/lib/pdf/types';

interface PDFCostSummaryProps {
  costSummary: PDFCostSummary;
  messages: PDFMessages;
  locale: 'de' | 'en';
  classificationCategory?: string;
}

const formatEur = (amount: number, locale: 'de' | 'en'): string =>
  new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);

const formatRange = (min: number, max: number, locale: 'de' | 'en'): string =>
  `${formatEur(min, locale)} – ${formatEur(max, locale)}`;

const formatDaysRange = (min: number, max: number): string =>
  min === max ? `${min}` : `${min}–${max}`;

const TIER_COLORS = {
  basisschutz: COLORS.green,
  erweitert: COLORS.yellow,
  nis2Niveau: COLORS.primary,
} as const;

const PDFCostSummarySection = ({ costSummary, messages, locale, classificationCategory }: PDFCostSummaryProps) => {
  const isNichtBetroffen = classificationCategory === 'nicht-betroffen';

  const employees = costSummary.companyEmployees || 1;
  const revenue = costSummary.companyRevenue;

  // Revenue percentage ranges for all tiers
  const calcRevenuePercent = (tier: { min: number; max: number }) => revenue > 0
    ? { min: Math.round((tier.min / revenue) * 1000) / 10, max: Math.round((tier.max / revenue) * 1000) / 10 }
    : undefined;

  const basisRevenuePercent = calcRevenuePercent(costSummary.tierTotals.basisschutz);
  const erweitertRevenuePercent = calcRevenuePercent(costSummary.tierTotals.erweitert);
  const nis2RevenuePercent = calcRevenuePercent(costSummary.tierTotals.nis2Niveau);

  // Per-employee-per-month for Basisschutz (makes large numbers relatable)
  const basisPerEmpMonth = {
    min: Math.round(costSummary.tierTotals.basisschutz.min / 12 / employees),
    max: Math.round(costSummary.tierTotals.basisschutz.max / 12 / employees),
  };

  // Revenue-per-employee warning (< 50k means unusual ratio)
  const revenuePerEmployee = costSummary.companyRevenue / employees;
  const showRevenueWarning = revenuePerEmployee > 0 && revenuePerEmployee < 50000;

  return (
    <View>
      {/* Context box — company profile scaling info */}
      <View wrap={false} style={{
        backgroundColor: '#eff6ff',
        padding: 10,
        borderRadius: 4,
        borderLeft: `3 solid ${COLORS.primary}`,
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.5 }}>
          {messages['pdf.cost.contextIntro'] || 'Berechnet für Ihr Unternehmensprofil'}:{' '}
          <Text style={{ fontWeight: 700 }}>{costSummary.companyEmployees}</Text>{' '}
          {messages['pdf.employees'] || 'Mitarbeiter'},{' '}
          <Text style={{ fontWeight: 700 }}>
            {formatEur(costSummary.companyRevenue, locale)}
          </Text>{' '}
          {messages['pdf.annualRevenue'] || 'Umsatz'}.
        </Text>
        <Text style={{ fontSize: 8, color: COLORS.gray700, marginTop: 2 }}>
          {messages['pdf.cost.contextScaling'] || 'Größenanpassung'}:{' '}
          <Text style={{ fontWeight: 700 }}>{costSummary.sizeFactor}×</Text>{' '}
          (Frontier Economics EU NIS2 Impact Assessment).
        </Text>
        <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 2 }}>
          {messages['pdf.cost.contextNote'] || 'Alle Werte sind Orientierungsgrößen, auf Ihre Unternehmensgröße angepasst.'}
        </Text>
        {showRevenueWarning && (
          <Text style={{ fontSize: 7, color: COLORS.yellow, marginTop: 4, lineHeight: 1.4 }}>
            {messages['pdf.cost.revenueWarning'] || 'Hinweis: Ihre Mitarbeiterzahl ist im Verhältnis zum Umsatz hoch. Die Kostenschätzung skaliert primär nach Mitarbeiterzahl — prüfen Sie im Erstgespräch, ob alle IT-Arbeitsplätze voll ausgestattet werden müssen.'}
          </Text>
        )}
      </View>

      {/* Proportionality box — legal reassurance */}
      <View wrap={false} style={{
        backgroundColor: COLORS.greenBg,
        padding: 10,
        borderRadius: 4,
        borderLeft: `3 solid ${COLORS.green}`,
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.green, marginBottom: 4 }}>
          {messages['pdf.cost.proportionalityTitle'] || 'Gesetzliche Verhältnismäßigkeit'}
        </Text>
        <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.5 }}>
          {messages['pdf.cost.proportionalityText'] || '§30 Abs. 1 BSIG verlangt \'angemessene und verhältnismäßige\' Maßnahmen. Sie müssen nicht alles auf einmal umsetzen.'}
        </Text>
        <Text style={{ fontSize: 8, color: COLORS.gray700, marginTop: 4, lineHeight: 1.5 }}>
          {messages['pdf.cost.proportionalityHint'] || 'Die meisten KMU starten mit Stufe 1 (Basisschutz) und erreichen damit bereits den Großteil der geforderten Sicherheit.'}
        </Text>
      </View>

      {/* 3-Tier investment model with monthly amortization */}
      <View wrap={false} style={{ marginBottom: 12 }}>
        {/* Tier 1: Basisschutz */}
        <TierRow
          color={TIER_COLORS.basisschutz}
          bgColor={COLORS.greenBg}
          label={messages['pdf.cost.tier.basisschutz'] || 'Stufe 1: Basisschutz'}
          sublabel={messages['pdf.cost.tier.basisschutzSub'] || 'Sofort umsetzbare Quick-Win-Maßnahmen'}
          total={costSummary.tierTotals.basisschutz}
          locale={locale}
          messages={messages}
          showRecommended={isNichtBetroffen}
          marginBottom={4}
          revenuePercent={basisRevenuePercent}
          perEmployeeMonth={basisPerEmpMonth}
        />

        {/* Tier 2: Erweitert */}
        <TierRow
          color={TIER_COLORS.erweitert}
          bgColor={COLORS.yellowBg}
          label={messages['pdf.cost.tier.erweitert'] || 'Stufe 2: Erweitert'}
          sublabel={messages['pdf.cost.tier.erweiterSub'] || 'Quick-Win- und mittelfristige Maßnahmen'}
          total={costSummary.tierTotals.erweitert}
          locale={locale}
          messages={messages}
          marginBottom={4}
          revenuePercent={erweitertRevenuePercent}
        />

        {/* Tier 3: NIS2-Niveau */}
        <TierRow
          color={TIER_COLORS.nis2Niveau}
          bgColor={COLORS.primaryLight}
          label={messages['pdf.cost.tier.nis2niveau'] || 'Stufe 3: NIS2-Niveau'}
          sublabel={messages['pdf.cost.tier.nis2niveauSub'] || 'Vollständige Umsetzung inkl. strategischer Maßnahmen'}
          total={costSummary.tierTotals.nis2Niveau}
          locale={locale}
          messages={messages}
          revenuePercent={nis2RevenuePercent}
        />
      </View>

      {/* ROI / Downtime comparison box */}
      <View wrap={false} style={{
        backgroundColor: COLORS.gray50,
        border: `1 solid ${COLORS.gray200}`,
        borderRadius: 4,
        padding: 10,
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.gray900, marginBottom: 6 }}>
          {messages['pdf.cost.roiTitle'] || 'Kosten in Relation'}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {/* Downtime comparison */}
          <View style={{ flex: 1, backgroundColor: COLORS.redBg, padding: 8, borderRadius: 4 }}>
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>
              {messages['pdf.cost.downtimeLabel'] || '3 Tage IT-Ausfall (Durchschnitt)'}
            </Text>
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.red }}>
              {formatEur(Math.round(costSummary.companyRevenue / 365 * 3 * 1.5), locale)}
            </Text>
            <Text style={{ fontSize: 6, color: COLORS.gray500, marginTop: 1 }}>
              {messages['pdf.cost.downtimeNote'] || 'Umsatzausfall + Folgekosten'}
            </Text>
          </View>
          {/* Tier 1 monthly */}
          <View style={{ flex: 1, backgroundColor: COLORS.greenBg, padding: 8, borderRadius: 4 }}>
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>
              {messages['pdf.cost.monthlyLabel'] || 'Basisschutz pro Monat'}
            </Text>
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.green }}>
              {formatRange(Math.round(costSummary.tierTotals.basisschutz.min / 12), Math.round(costSummary.tierTotals.basisschutz.max / 12), locale)}
            </Text>
            <Text style={{ fontSize: 6, color: COLORS.gray500, marginTop: 1 }}>
              {messages['pdf.cost.monthlyNote'] || 'Amortisiert über 12 Monate'}
            </Text>
          </View>
          {/* Full NIS2 monthly */}
          <View style={{ flex: 1, backgroundColor: COLORS.primaryLight, padding: 8, borderRadius: 4 }}>
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>
              {messages['pdf.cost.monthlyFullLabel'] || 'NIS2-Niveau pro Monat'}
            </Text>
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.primary }}>
              {formatRange(Math.round(costSummary.tierTotals.nis2Niveau.min / 24), Math.round(costSummary.tierTotals.nis2Niveau.max / 24), locale)}
            </Text>
            <Text style={{ fontSize: 6, color: COLORS.gray500, marginTop: 1 }}>
              {messages['pdf.cost.monthlyFullNote'] || 'Amortisiert über 24 Monate'}
            </Text>
          </View>
        </View>
      </View>

      {/* Summary row: internal days / external / tools */}
      <View wrap={false} style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.gray50, padding: 8, borderRadius: 4 }}>
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>
              {messages['pdf.cost.internalDays'] || 'Internal Effort'}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray900 }}>
              {formatDaysRange(costSummary.internalDays.min, costSummary.internalDays.max)} {messages['pdf.cost.days'] || 'days'}
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.gray50, padding: 8, borderRadius: 4 }}>
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>
              {messages['pdf.cost.externalCost'] || 'External Consulting'}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray900 }}>
              {formatRange(costSummary.externalCost.min, costSummary.externalCost.max, locale)}
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.gray50, padding: 8, borderRadius: 4 }}>
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginBottom: 2 }}>
              {messages['pdf.cost.toolsCost'] || 'Tools & Licenses'}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray900 }}>
              {formatRange(costSummary.toolsCost.min, costSummary.toolsCost.max, locale)} {messages['pdf.cost.perYear'] || '/year'}
            </Text>
          </View>
        </View>
      </View>

      {/* DIY Quote — internal effort vs. cash outflow */}
      <View wrap={false} style={{
        backgroundColor: COLORS.greenBg,
        borderLeft: `3 solid ${COLORS.green}`,
        borderRadius: 4,
        padding: 10,
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.green, marginBottom: 4 }}>
          {messages['pdf.cost.diyTitle'] || 'Eigenleistung vs. externe Kosten'}
        </Text>
        <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.5 }}>
          {messages['pdf.cost.diyText'] || 'Ein Großteil der Maßnahmen (ca. 60%) kann durch interne Arbeitszeit abgedeckt werden — das sind keine zusätzlichen Cash-Ausgaben, sondern Zeitinvestitionen Ihrer bestehenden Mitarbeiter. Nur strategische Themen (ISMS, Penetrationstests, Zertifizierungen) erfordern typischerweise externe Budgets.'}
        </Text>
      </View>

      {/* Disclaimer */}
      <Text style={styles.noteText}>
        {messages['pdf.cost.disclaimer'] ||
          'Estimates based on typical NIS2 compliance projects. Actual costs may vary.'}
      </Text>
      <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 2, lineHeight: 1.4 }}>
        {messages['pdf.cost.disclaimerInternal'] ||
          'Many measures can be implemented internally with manageable time investment.'}
      </Text>
    </View>
  );
};

/** Single tier row with total + monthly amortization */
const TierRow = ({
  color, bgColor, label, sublabel, total, locale, messages,
  showRecommended, marginBottom, revenuePercent, perEmployeeMonth,
}: {
  color: string; bgColor: string; label: string; sublabel: string;
  total: { min: number; max: number }; locale: 'de' | 'en'; messages: PDFMessages;
  showRecommended?: boolean; marginBottom?: number;
  revenuePercent?: { min: number; max: number };
  perEmployeeMonth?: { min: number; max: number };
}) => {
  const monthly = { min: Math.round(total.min / 12), max: Math.round(total.max / 12) };
  return (
    <View style={{
      borderLeft: `3 solid ${color}`,
      padding: 10,
      marginBottom: marginBottom || 0,
      backgroundColor: bgColor,
      borderRadius: 4,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1, paddingRight: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.gray900 }}>{label}</Text>
            {showRecommended && (
              <View style={{ backgroundColor: color, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 2 }}>
                <Text style={{ fontSize: 6, color: COLORS.white, fontWeight: 700 }}>
                  {messages['pdf.cost.tierRecommended'] || 'Empfohlener Einstieg'}
                </Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 2 }}>{sublabel}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', minWidth: 150 }}>
          <Text style={{ fontSize: 10, fontWeight: 700, color }}>
            {formatRange(total.min, total.max, locale)}
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 1 }}>
            ca. {formatRange(monthly.min, monthly.max, locale)} {messages['pdf.cost.perMonth'] || '/Monat'}
          </Text>
          {perEmployeeMonth && (
            <Text style={{ fontSize: 7, color, marginTop: 1 }}>
              {formatRange(perEmployeeMonth.min, perEmployeeMonth.max, locale)} {messages['pdf.cost.perEmployeeMonth'] || 'pro MA/Monat'}
            </Text>
          )}
          {revenuePercent && revenuePercent.max > 0 && (
            <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 1 }}>
              {messages['pdf.cost.revenuePercent'] || 'entspricht ca.'}{' '}
              {revenuePercent.min === revenuePercent.max
                ? `${revenuePercent.max}%`
                : `${revenuePercent.min}–${revenuePercent.max}%`
              }{' '}
              {messages['pdf.cost.revenuePercentOf'] || 'des Jahresumsatzes'}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PDFCostSummarySection;
