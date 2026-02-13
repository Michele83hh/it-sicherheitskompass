import { Document, Page, Text, View, Svg, Rect } from '@react-pdf/renderer';
import { styles, COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { MultiRegPDFPayload, MultiRegEntry, MultiRegSynergy } from '@/lib/pdf/multi-reg-types';

interface PDFMultiRegDocumentProps {
  payload: MultiRegPDFPayload;
}

const BAR_W = 200;
const BAR_H = 8;

const formatEur = (amount: number, locale: 'de' | 'en'): string =>
  new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(amount);

const formatRange = (min: number, max: number, locale: 'de' | 'en'): string =>
  `${formatEur(min, locale)} – ${formatEur(max, locale)}`;

const Footer = ({ label }: { label: string }) => (
  <View style={styles.footer} fixed>
    <Text>{label}</Text>
    <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
  </View>
);

const PageHeader = ({ number, title }: { number: number; title: string }) => (
  <View style={{ marginBottom: 16 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{
        backgroundColor: COLORS.primary,
        width: 26, height: 26, borderRadius: 13,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 12, fontWeight: 700, color: COLORS.white }}>{number}</Text>
      </View>
      <Text style={styles.pageHeader}>{title}</Text>
    </View>
    <View style={[styles.hr, { marginTop: 8 }]} />
  </View>
);

// ── Cover Page ──
const CoverPage = ({ payload }: { payload: MultiRegPDFPayload }) => {
  const { locale, entries, averageScore, generatedDate } = payload;
  const de = locale === 'de';

  return (
    <View>
      {/* Dark header band */}
      <View style={{
        backgroundColor: COLORS.slate900,
        marginHorizontal: -40, marginTop: -48,
        paddingHorizontal: 40, paddingTop: 48, paddingBottom: 30,
      }}>
        <Text style={{ fontSize: 10, color: COLORS.emerald500, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>
          IT-SICHERHEITSKOMPASS
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 8 }}>
          {de ? 'Gesamtbericht' : 'Combined Report'}
        </Text>
        <Text style={{ fontSize: 11, color: COLORS.slate300, marginBottom: 4 }}>
          {de
            ? `${entries.length} Regelwerke bewertet — Durchschnittlicher Reifegrad: ${Math.round(averageScore)}%`
            : `${entries.length} regulations assessed — Average maturity: ${Math.round(averageScore)}%`}
        </Text>
        <Text style={{ fontSize: 9, color: COLORS.gray500 }}>
          {de ? `Erstellt am ${generatedDate}` : `Generated on ${generatedDate}`}
        </Text>
      </View>

      {/* Quick overview table */}
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900, marginBottom: 12 }}>
          {de ? 'Regelwerk-Übersicht' : 'Regulation Overview'}
        </Text>

        {/* Table header */}
        <View style={{ flexDirection: 'row', borderBottom: `1 solid ${COLORS.gray200}`, paddingBottom: 4, marginBottom: 4 }}>
          <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.gray500, width: '40%' }}>
            {de ? 'Regelwerk' : 'Regulation'}
          </Text>
          <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.gray500, width: '15%', textAlign: 'center' }}>
            Score
          </Text>
          <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.gray500, width: '15%', textAlign: 'center' }}>
            Status
          </Text>
          <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.gray500, width: '30%', textAlign: 'center' }}>
            {de ? 'Fragen' : 'Questions'}
          </Text>
        </View>

        {/* Table rows */}
        {entries.map((entry, idx) => {
          const tlColors = TRAFFIC_LIGHT_COLORS[entry.trafficLight] || TRAFFIC_LIGHT_COLORS.red;
          return (
            <View key={idx} style={{
              flexDirection: 'row', alignItems: 'center',
              paddingVertical: 5,
              borderBottom: idx < entries.length - 1 ? `0.5 solid ${COLORS.gray100}` : undefined,
            }}>
              <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontSize: 10 }}>{entry.regulationIcon}</Text>
                <Text style={{ fontSize: 9, fontWeight: 600, color: COLORS.gray900 }}>{entry.regulationName}</Text>
              </View>
              <Text style={{ width: '15%', fontSize: 10, fontWeight: 700, textAlign: 'center', color: tlColors.text }}>
                {Math.round(entry.percentage)}%
              </Text>
              <View style={{ width: '15%', alignItems: 'center' }}>
                <View style={{
                  width: 8, height: 8, borderRadius: 4, backgroundColor: tlColors.dot,
                }} />
              </View>
              <Text style={{ width: '30%', fontSize: 8, textAlign: 'center', color: COLORS.gray500 }}>
                {entry.answeredQuestions}/{entry.totalQuestions}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// ── Per-Regulation 1-Pager ──
const RegulationOnePager = ({ entry, locale, sectionNum }: { entry: MultiRegEntry; locale: 'de' | 'en'; sectionNum: number }) => {
  const de = locale === 'de';
  const tlColors = TRAFFIC_LIGHT_COLORS[entry.trafficLight] || TRAFFIC_LIGHT_COLORS.red;
  const barFill = (entry.percentage / 100) * BAR_W;

  return (
    <View>
      <PageHeader number={sectionNum} title={entry.regulationName} />

      {/* Score KPI */}
      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
        <View style={{
          flex: 1, padding: 12, borderRadius: 6,
          backgroundColor: tlColors.bg, border: `1 solid ${tlColors.dot}`,
        }}>
          <Text style={{ fontSize: 28, fontWeight: 700, color: tlColors.text, textAlign: 'center' }}>
            {Math.round(entry.percentage)}%
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.gray500, textAlign: 'center', marginTop: 2 }}>
            {de ? 'Reifegrad' : 'Maturity'}
          </Text>
          <Svg width={BAR_W} height={BAR_H} style={{ marginTop: 8 }}>
            <Rect x={0} y={0} width={BAR_W} height={BAR_H} rx={4} fill={COLORS.gray100} />
            <Rect x={0} y={0} width={barFill} height={BAR_H} rx={4} fill={tlColors.dot} />
          </Svg>
        </View>

        <View style={{ flex: 1, padding: 12, borderRadius: 6, border: `0.5 solid ${COLORS.gray200}` }}>
          <Text style={{ fontSize: 9, fontWeight: 600, color: COLORS.gray900, marginBottom: 6 }}>
            {de ? 'Top-3 Risiken' : 'Top 3 Risks'}
          </Text>
          {entry.topRisks.slice(0, 3).map((risk, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 }}>
              <View style={{
                width: 6, height: 6, borderRadius: 3,
                backgroundColor: (TRAFFIC_LIGHT_COLORS[risk.trafficLight] || TRAFFIC_LIGHT_COLORS.red).dot,
              }} />
              <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1 }}>
                {risk.name}
              </Text>
              <Text style={{ fontSize: 8, fontWeight: 600, color: COLORS.gray500 }}>
                {Math.round(risk.percentage)}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top recommendations */}
      <Text style={{ fontSize: 10, fontWeight: 600, color: COLORS.gray900, marginBottom: 6 }}>
        {de ? 'Top-3 Empfehlungen' : 'Top 3 Recommendations'}
      </Text>
      {entry.topRecommendations.slice(0, 3).map((rec, i) => {
        const prioColors: Record<string, string> = { high: COLORS.red, medium: '#ca8a04', low: COLORS.green };
        return (
          <View key={i} style={{
            flexDirection: 'row', alignItems: 'center', gap: 6,
            paddingVertical: 4, borderBottom: `0.5 solid ${COLORS.gray100}`,
          }}>
            <View style={{
              width: 6, height: 6, borderRadius: 3,
              backgroundColor: prioColors[rec.priority] || COLORS.gray500,
            }} />
            <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1 }}>
              {rec.title}
            </Text>
            <Text style={{
              fontSize: 7, color: COLORS.gray500,
              backgroundColor: COLORS.gray50, paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4,
            }}>
              {rec.effortLevel}
            </Text>
          </View>
        );
      })}

      {/* Cost if available */}
      {entry.costEstimate && (
        <View style={{ marginTop: 12, padding: 8, backgroundColor: COLORS.gray50, borderRadius: 4 }}>
          <Text style={{ fontSize: 8, color: COLORS.gray500 }}>
            {de ? 'Geschätzte Umsetzungskosten' : 'Estimated implementation cost'}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: 600, color: COLORS.gray900 }}>
            {formatRange(entry.costEstimate.min, entry.costEstimate.max, locale)}
          </Text>
        </View>
      )}
    </View>
  );
};

// ── Synergies Matrix ──
const SynergiesMatrix = ({ synergies, locale }: { synergies: MultiRegSynergy[]; locale: 'de' | 'en' }) => {
  const de = locale === 'de';
  if (!synergies.length) return null;

  return (
    <View>
      <Text style={{ fontSize: 10, fontWeight: 600, color: COLORS.gray900, marginBottom: 8 }}>
        {de ? 'Regelwerks-Synergien' : 'Regulation Synergies'}
      </Text>
      {synergies.slice(0, 12).map((syn, idx) => (
        <View key={idx} style={{
          flexDirection: 'row', alignItems: 'center', gap: 8,
          paddingVertical: 4, borderBottom: `0.5 solid ${COLORS.gray100}`,
        }}>
          <Text style={{ fontSize: 8, color: COLORS.gray700, width: '30%' }}>
            {syn.regAName}
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.gray500 }}>↔</Text>
          <Text style={{ fontSize: 8, color: COLORS.gray700, width: '30%' }}>
            {syn.regBName}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.primary, width: '10%', textAlign: 'right' }}>
            {syn.overlapPercent}%
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
            {syn.sharedTopics.slice(0, 3).map((t, i) => (
              <Text key={i} style={{ fontSize: 6, color: COLORS.gray500, backgroundColor: COLORS.gray50, paddingHorizontal: 3, paddingVertical: 1, borderRadius: 3 }}>
                {t}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

// ── Main Document ──
const PDFMultiRegDocument = ({ payload }: PDFMultiRegDocumentProps) => {
  const { locale, entries, synergies, consolidatedRoadmap, totalCost, messages } = payload;
  const de = locale === 'de';
  const footerLabel = 'IT-Sicherheitskompass — Gesamtbericht';

  // Section numbering: 1 = Overview (cover), then per-regulation, then synergies, roadmap, cost
  let sectionCounter = 1; // Overview is on cover page

  return (
    <Document
      title={de ? 'IT-Sicherheitskompass — Gesamtbericht' : 'IT-Sicherheitskompass — Combined Report'}
      author="IT-Sicherheitskompass"
    >
      {/* Cover page */}
      <Page size="A4" style={styles.page}>
        <CoverPage payload={payload} />
        <Footer label={footerLabel} />
      </Page>

      {/* Per-regulation 1-pagers */}
      {entries.map((entry, idx) => {
        sectionCounter++;
        return (
          <Page key={idx} size="A4" style={styles.page}>
            <RegulationOnePager entry={entry} locale={locale} sectionNum={sectionCounter} />
            <Footer label={footerLabel} />
          </Page>
        );
      })}

      {/* Synergies + Roadmap page */}
      {(synergies.length > 0 || totalCost) && (
        <Page size="A4" style={styles.page}>
          <PageHeader number={++sectionCounter} title={de ? 'Synergien & Gesamtkosten' : 'Synergies & Total Cost'} />

          <SynergiesMatrix synergies={synergies} locale={locale} />

          {/* Total cost */}
          {totalCost && (
            <View style={{ marginTop: 16, padding: 12, backgroundColor: COLORS.primaryLight, borderRadius: 6 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, color: COLORS.primary, marginBottom: 4 }}>
                {de ? 'Geschätzte Gesamtkosten über alle Regelwerke' : 'Estimated total cost across all regulations'}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 700, color: COLORS.primary }}>
                {formatRange(totalCost.min, totalCost.max, locale)}
              </Text>
              <Text style={{ fontSize: 7, color: COLORS.gray500, marginTop: 4 }}>
                {de
                  ? 'Hinweis: Durch Synergien zwischen Regelwerken können Kosten deutlich niedriger ausfallen.'
                  : 'Note: Due to synergies between regulations, actual costs may be significantly lower.'}
              </Text>
            </View>
          )}

          <Footer label={footerLabel} />
        </Page>
      )}

      {/* Consolidated Roadmap */}
      {(consolidatedRoadmap.phase1.length > 0 || consolidatedRoadmap.phase2.length > 0 || consolidatedRoadmap.phase3.length > 0) && (
        <Page size="A4" style={styles.page}>
          <PageHeader number={++sectionCounter} title={de ? 'Konsolidierte Roadmap' : 'Consolidated Roadmap'} />

          {[
            { items: consolidatedRoadmap.phase1, label: de ? 'Phase 1: Sofortmaßnahmen (0-3 Monate)' : 'Phase 1: Immediate Actions (0-3 months)', color: COLORS.green },
            { items: consolidatedRoadmap.phase2, label: de ? 'Phase 2: Kernmaßnahmen (3-6 Monate)' : 'Phase 2: Core Measures (3-6 months)', color: '#ca8a04' },
            { items: consolidatedRoadmap.phase3, label: de ? 'Phase 3: Strategische Maßnahmen (6-12 Monate)' : 'Phase 3: Strategic Measures (6-12 months)', color: COLORS.primary },
          ].map((phase, pIdx) => {
            if (phase.items.length === 0) return null;
            return (
              <View key={pIdx} style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: phase.color }} />
                  <Text style={{ fontSize: 10, fontWeight: 600, color: COLORS.gray900 }}>
                    {phase.label} ({phase.items.length})
                  </Text>
                </View>
                {phase.items.slice(0, 10).map((item, iIdx) => (
                  <View key={iIdx} style={{
                    flexDirection: 'row', alignItems: 'center', gap: 4,
                    paddingVertical: 3, paddingLeft: 16,
                    borderBottom: `0.5 solid ${COLORS.gray100}`,
                  }}>
                    <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1 }}>
                      {item.title}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      {item.regulations.slice(0, 3).map((r, rIdx) => (
                        <Text key={rIdx} style={{
                          fontSize: 6, color: COLORS.primary,
                          backgroundColor: COLORS.primaryLight,
                          paddingHorizontal: 3, paddingVertical: 1, borderRadius: 3,
                        }}>
                          {r}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
                {phase.items.length > 10 && (
                  <Text style={{ fontSize: 7, color: COLORS.gray500, paddingLeft: 16, marginTop: 2 }}>
                    +{phase.items.length - 10} {de ? 'weitere' : 'more'}
                  </Text>
                )}
              </View>
            );
          })}

          <Footer label={footerLabel} />
        </Page>
      )}
    </Document>
  );
};

export default PDFMultiRegDocument;
