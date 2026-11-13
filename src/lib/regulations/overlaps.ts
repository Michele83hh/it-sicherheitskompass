// src/lib/regulations/overlaps.ts

/**
 * Überschneidungen zwischen den 15 Regelwerken.
 *
 * Alle 105 Paare wurden geprüft (Prüfprotokoll 2026-11-13, Nachtrag Synergien).
 * Statt Prozentwerten gibt es drei Stufen, weil keine Quelle eine belastbare
 * Prozentzahl liefert:
 *   high   – eins baut auf dem anderen auf oder eine Zuordnung deckt den Kern ab
 *   medium – deutliche, aber teilweise Überschneidung (anderer Geltungsbereich)
 *   low    – nur einzelne gemeinsame Themen
 * `source` belegt, DASS und WO sich die Regelwerke überschneiden (offizielle
 * Zuordnungstabelle, Rechts- oder Normtext). Fehlt sie, ist die Verbindung eine
 * eigene Einschätzung. Die Stufe selbst ist immer eine Einordnung anhand der Quelle.
 * Paare ohne nennenswerte Überschneidung stehen nicht in der Liste.
 */

import type { RegulationId } from './types';

export type OverlapLevel = 'high' | 'medium' | 'low';

export interface OverlapSource {
  label: string;
  url?: string;
}

export interface OverlapMapping {
  regA: RegulationId;
  regB: RegulationId;
  level: OverlapLevel;
  /** Beleg für die Überschneidung; fehlt = eigene Einschätzung */
  source?: OverlapSource;
  /** Gemeinsame Maßnahmenthemen (Übersetzungsschlüssel) */
  sharedMeasureKeys: string[];
}

export const LEVEL_RANK: Record<OverlapLevel, number> = { high: 3, medium: 2, low: 1 };

const LEVEL_LABEL: Record<'de' | 'en', Record<OverlapLevel, string>> = {
  de: { high: 'stark', medium: 'mittel', low: 'gering' },
  en: { high: 'strong', medium: 'moderate', low: 'minor' },
};

export function levelLabel(level: OverlapLevel, locale: string): string {
  return LEVEL_LABEL[locale === 'en' ? 'en' : 'de'][level];
}

export function sourceLabel(o: OverlapMapping, locale: string): string {
  return o.source?.label ?? (locale === 'en' ? 'Own assessment' : 'Eigene Einschätzung');
}

/** Stärkste zuerst, bei gleicher Stufe belegte vor geschätzten. */
export function byLevel(a: OverlapMapping, b: OverlapMapping): number {
  return LEVEL_RANK[b.level] - LEVEL_RANK[a.level] || Number(!!b.source) - Number(!!a.source);
}

/* ─── Quellen ─── */

const CIS = 'https://www.cisecurity.org/insights/white-papers/';
const AICPA = 'https://www.aicpa-cima.com/resources/download/';

const S = {
  enisaTig: { label: 'ENISA: NIS2 Technical Implementation Guidance mit Mapping-Tabelle (2025)', url: 'https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance' },
  cisNis2: { label: 'CIS: Controls v8.1 Mapping to NIS2 Directive', url: `${CIS}cis-controls-v8-1-mapping-to-nis2-directive-2022-2555` },
  cisDora: { label: 'CIS: Controls v8.1 Mapping to DORA', url: `${CIS}cis-controls-v8-1-mapping-to-dora` },
  cisSoc2: { label: 'CIS: Controls v8.1 Mapping to SOC 2', url: `${CIS}cis-controls-v8-1-mapping-to-soc2` },
  cisPci: { label: 'CIS: Controls v8.1 Mapping to PCI DSS v4.0', url: `${CIS}cis-controls-v8-1-mapping-to-pci-dss-v4-0` },
  cisIso: { label: 'CIS: Controls v8.1 Mapping to ISO/IEC 27001:2022', url: `${CIS}cis-controls-v8-1-mapping-to-iso-iec-27001-2022` },
  cisNist: { label: 'CIS: Controls v8.1 Mapping to NIST CSF 2.0', url: `${CIS}cis-controls-v8-1-mapping-to-nist-csf-2-0` },
  nistOlirIso: { label: 'NIST: CSF 2.0 Informative References – ISO/IEC 27001:2022', url: 'https://www.nist.gov/cyberframework/csf-20-informative-references' },
  pciNist: { label: 'PCI SSC: Mapping PCI DSS v4.0.1 to NIST CSF 2.0', url: 'https://blog.pcisecuritystandards.org/mapping-pci-dss-v4.0.1-to-the-nist-cybersecurity-framework-2.0' },
  aicpaIso: { label: 'AICPA: Mapping Trust Services Criteria to ISO 27001', url: `${AICPA}mapping-2017-trust-services-criteria-to-iso-27001` },
  aicpaNist: { label: 'AICPA: Mapping Trust Services Criteria to NIST CSF', url: `${AICPA}mapping-2017-trust-services-criteria-to-nist-csf` },
  aicpaGdpr: { label: 'AICPA: Mapping Trust Services Criteria to GDPR', url: `${AICPA}mapping-2017-trust-services-criteria-to-gdpr` },
  bsiC5Ref: { label: 'BSI: C5:2020 Referenztabellen zu internationalen Standards', url: 'https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/CloudComputing/ComplianceControlsCatalogue/2020/C5_2020_Reference_Tables.html' },
  bsiIsoGs: { label: 'BSI: ISO 27001-Zertifizierung auf der Basis von IT-Grundschutz', url: 'https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Zertifizierung-und-Anerkennung/Zertifizierung-von-Managementsystemen/ISO-27001-Basis-IT-Grundschutz/Zertifizierungsschema/schema_node.html' },
  enxIsa: { label: 'ENX: VDA ISA mit Zuordnung zu ISO/IEC 27001:2022 und NIST CSF 2.0', url: 'https://enx.com/news/ISA2027' },
  isaDp: { label: 'VDA ISA, Modul Datenschutz (Auftragsverarbeitung nach Art. 28 DSGVO)' },
  bsig: { label: '§§ 28, 30, 31 BSIG' },
  nis2Dora: { label: 'NIS2 Art. 4; DORA Art. 1 Abs. 2 (DORA als sektorspezifischer Rechtsakt)' },
  nis2Dsgvo: { label: 'NIS2 Art. 35; DSGVO Art. 32' },
  nis2Cra: { label: 'NIS2 Art. 21 Abs. 2 lit. e; CRA Art. 14' },
  nis2Bcm: { label: 'NIS2 Art. 21 Abs. 2 lit. c (Aufrechterhaltung des Betriebs)' },
  craDsgvo: { label: 'CRA Anhang I Teil I (Vertraulichkeit, Datenminimierung)' },
  isoDsgvo: { label: 'ISO/IEC 27001:2022 Anhang A 5.34; ISO/IEC 27701:2025 Anhang D' },
  gsDsgvo: { label: 'IT-Grundschutz-Kompendium, Baustein CON.2 Datenschutz' },
  dsgvoBcm: { label: 'DSGVO Art. 32 Abs. 1 lit. c (Wiederherstellbarkeit)' },
  cerBcm: { label: 'CER-Richtlinie (EU) 2022/2557 Art. 13 (Resilienzmaßnahmen)' },
  doraBcm: { label: 'DORA Art. 11 (IKT-Geschäftsfortführung)' },
  isoBcm: { label: 'ISO/IEC 27001:2022 Anhang A 5.29, 5.30' },
  isoDev: { label: 'ISO/IEC 27001:2022 Anhang A 8.25–8.28 (sichere Entwicklung)' },
  bsi2004: { label: 'BSI-Standard 200-4 (kompatibel zu ISO 22301)' },
  gsDev: { label: 'IT-Grundschutz-Kompendium, Bausteine CON.8 und APP.3.1' },
} satisfies Record<string, OverlapSource>;

/* ─── Paare ─── */

type M =
  | 'riskManagement' | 'incidentReporting' | 'supplyChain' | 'bcm' | 'accessControl'
  | 'thirdPartyRisk' | 'resilienceTesting' | 'encryption' | 'networkSecurity'
  | 'physicalSecurity' | 'supplierManagement' | 'vulnerabilityManagement' | 'securityByDesign';

function p(regA: RegulationId, regB: RegulationId, level: OverlapLevel, measures: M[], source?: OverlapSource): OverlapMapping {
  return { regA, regB, level, source, sharedMeasureKeys: measures.map((m) => `platform.overlaps.measures.${m}`) };
}

export const REGULATION_OVERLAPS: OverlapMapping[] = [
  // NIS2
  p('nis2', 'kritis', 'high', ['riskManagement', 'incidentReporting', 'supplyChain', 'bcm', 'physicalSecurity'], S.bsig),
  p('nis2', 'dora', 'high', ['riskManagement', 'incidentReporting', 'thirdPartyRisk', 'resilienceTesting'], S.nis2Dora),
  p('nis2', 'iso27001', 'high', ['riskManagement', 'accessControl', 'bcm', 'incidentReporting', 'encryption', 'supplyChain'], S.enisaTig),
  p('nis2', 'nist-csf', 'high', ['riskManagement', 'incidentReporting', 'accessControl', 'bcm', 'supplyChain'], S.enisaTig),
  p('nis2', 'bsi-grundschutz', 'high', ['riskManagement', 'accessControl', 'bcm', 'encryption', 'networkSecurity']),
  p('nis2', 'dsgvo', 'medium', ['accessControl', 'encryption', 'incidentReporting', 'riskManagement'], S.nis2Dsgvo),
  p('nis2', 'cis-controls', 'medium', ['vulnerabilityManagement', 'accessControl', 'incidentReporting', 'networkSecurity'], S.cisNis2),
  p('nis2', 'tisax', 'medium', ['accessControl', 'encryption', 'supplierManagement', 'riskManagement']),
  p('nis2', 'soc2', 'medium', ['riskManagement', 'accessControl', 'incidentReporting', 'supplierManagement']),
  p('nis2', 'c5', 'medium', ['riskManagement', 'accessControl', 'incidentReporting', 'encryption']),
  p('nis2', 'cra', 'low', ['vulnerabilityManagement', 'incidentReporting', 'securityByDesign'], S.nis2Cra),
  p('nis2', 'iso22301', 'low', ['bcm'], S.nis2Bcm),
  p('nis2', 'pci-dss', 'low', ['accessControl', 'encryption', 'vulnerabilityManagement']),
  p('nis2', 'owasp-asvs', 'low', ['securityByDesign', 'vulnerabilityManagement']),

  // DSGVO
  p('dsgvo', 'tisax', 'medium', ['accessControl', 'encryption', 'supplierManagement'], S.isaDp),
  p('dsgvo', 'soc2', 'medium', ['accessControl', 'encryption', 'incidentReporting'], S.aicpaGdpr),
  p('dsgvo', 'iso27001', 'medium', ['accessControl', 'encryption', 'incidentReporting', 'supplierManagement'], S.isoDsgvo),
  p('dsgvo', 'bsi-grundschutz', 'medium', ['accessControl', 'encryption', 'riskManagement'], S.gsDsgvo),
  p('dsgvo', 'cra', 'low', ['securityByDesign', 'encryption'], S.craDsgvo),
  p('dsgvo', 'iso22301', 'low', ['bcm'], S.dsgvoBcm),
  p('dsgvo', 'dora', 'low', ['incidentReporting', 'thirdPartyRisk', 'accessControl']),
  p('dsgvo', 'pci-dss', 'low', ['accessControl', 'encryption']),
  p('dsgvo', 'c5', 'low', ['accessControl', 'encryption', 'supplierManagement']),
  p('dsgvo', 'nist-csf', 'low', ['accessControl', 'incidentReporting']),
  p('dsgvo', 'cis-controls', 'low', ['accessControl', 'encryption']),
  p('dsgvo', 'owasp-asvs', 'low', ['accessControl', 'encryption', 'securityByDesign']),

  // KRITIS
  p('kritis', 'bsi-grundschutz', 'high', ['riskManagement', 'bcm', 'networkSecurity', 'accessControl', 'physicalSecurity']),
  p('kritis', 'iso22301', 'medium', ['bcm', 'riskManagement', 'incidentReporting', 'physicalSecurity'], S.cerBcm),
  p('kritis', 'iso27001', 'medium', ['riskManagement', 'accessControl', 'physicalSecurity', 'bcm']),
  p('kritis', 'dora', 'low', ['bcm', 'incidentReporting']),
  p('kritis', 'nist-csf', 'low', ['riskManagement', 'incidentReporting']),
  p('kritis', 'cis-controls', 'low', ['accessControl', 'networkSecurity']),

  // DORA
  p('dora', 'iso22301', 'medium', ['bcm', 'resilienceTesting', 'incidentReporting'], S.doraBcm),
  p('dora', 'cis-controls', 'medium', ['accessControl', 'vulnerabilityManagement', 'incidentReporting'], S.cisDora),
  p('dora', 'iso27001', 'medium', ['riskManagement', 'incidentReporting', 'thirdPartyRisk', 'bcm']),
  p('dora', 'bsi-grundschutz', 'medium', ['riskManagement', 'bcm', 'thirdPartyRisk']),
  p('dora', 'nist-csf', 'medium', ['riskManagement', 'incidentReporting', 'thirdPartyRisk']),
  p('dora', 'soc2', 'medium', ['thirdPartyRisk', 'accessControl', 'riskManagement']),
  p('dora', 'c5', 'medium', ['thirdPartyRisk', 'accessControl', 'encryption']),
  p('dora', 'pci-dss', 'low', ['accessControl', 'encryption', 'incidentReporting']),
  p('dora', 'owasp-asvs', 'low', ['securityByDesign', 'vulnerabilityManagement']),

  // CRA
  p('cra', 'owasp-asvs', 'medium', ['securityByDesign', 'vulnerabilityManagement', 'encryption', 'accessControl']),
  p('cra', 'iso27001', 'low', ['securityByDesign', 'vulnerabilityManagement']),
  p('cra', 'bsi-grundschutz', 'low', ['securityByDesign', 'vulnerabilityManagement']),
  p('cra', 'nist-csf', 'low', ['vulnerabilityManagement']),
  p('cra', 'cis-controls', 'low', ['vulnerabilityManagement', 'securityByDesign']),

  // TISAX
  p('tisax', 'iso27001', 'high', ['accessControl', 'encryption', 'riskManagement', 'physicalSecurity', 'supplierManagement'], S.enxIsa),
  p('tisax', 'nist-csf', 'medium', ['riskManagement', 'accessControl', 'incidentReporting'], S.enxIsa),
  p('tisax', 'bsi-grundschutz', 'medium', ['accessControl', 'physicalSecurity', 'riskManagement']),
  p('tisax', 'soc2', 'medium', ['accessControl', 'supplierManagement', 'riskManagement']),
  p('tisax', 'c5', 'medium', ['accessControl', 'encryption', 'physicalSecurity']),
  p('tisax', 'cis-controls', 'medium', ['accessControl', 'vulnerabilityManagement', 'networkSecurity']),
  p('tisax', 'pci-dss', 'low', ['accessControl', 'encryption']),
  p('tisax', 'iso22301', 'low', ['bcm']),
  p('tisax', 'owasp-asvs', 'low', ['securityByDesign']),

  // PCI DSS
  p('pci-dss', 'nist-csf', 'medium', ['accessControl', 'networkSecurity', 'vulnerabilityManagement', 'incidentReporting'], S.pciNist),
  p('pci-dss', 'cis-controls', 'medium', ['accessControl', 'networkSecurity', 'vulnerabilityManagement', 'encryption'], S.cisPci),
  p('pci-dss', 'iso27001', 'medium', ['accessControl', 'encryption', 'networkSecurity', 'vulnerabilityManagement']),
  p('pci-dss', 'soc2', 'medium', ['accessControl', 'encryption', 'vulnerabilityManagement']),
  p('pci-dss', 'owasp-asvs', 'medium', ['securityByDesign', 'vulnerabilityManagement']),
  p('pci-dss', 'c5', 'low', ['accessControl', 'encryption']),
  p('pci-dss', 'bsi-grundschutz', 'low', ['accessControl', 'networkSecurity']),

  // SOC 2
  p('soc2', 'c5', 'high', ['riskManagement', 'accessControl', 'incidentReporting', 'bcm'], S.bsiC5Ref),
  p('soc2', 'iso27001', 'medium', ['accessControl', 'riskManagement', 'bcm', 'encryption'], S.aicpaIso),
  p('soc2', 'nist-csf', 'medium', ['riskManagement', 'accessControl', 'incidentReporting'], S.aicpaNist),
  p('soc2', 'cis-controls', 'medium', ['accessControl', 'vulnerabilityManagement', 'networkSecurity'], S.cisSoc2),
  p('soc2', 'bsi-grundschutz', 'low', ['accessControl', 'riskManagement']),
  p('soc2', 'iso22301', 'low', ['bcm']),

  // C5
  p('c5', 'iso27001', 'high', ['riskManagement', 'accessControl', 'encryption', 'physicalSecurity', 'networkSecurity'], S.bsiC5Ref),
  p('c5', 'bsi-grundschutz', 'high', ['riskManagement', 'accessControl', 'networkSecurity', 'physicalSecurity']),
  p('c5', 'nist-csf', 'medium', ['riskManagement', 'accessControl', 'incidentReporting']),
  p('c5', 'cis-controls', 'medium', ['accessControl', 'vulnerabilityManagement', 'networkSecurity']),
  p('c5', 'iso22301', 'low', ['bcm']),
  p('c5', 'owasp-asvs', 'low', ['securityByDesign', 'vulnerabilityManagement']),

  // ISO 27001
  p('iso27001', 'bsi-grundschutz', 'high', ['riskManagement', 'accessControl', 'bcm', 'physicalSecurity', 'networkSecurity'], S.bsiIsoGs),
  p('iso27001', 'nist-csf', 'high', ['riskManagement', 'accessControl', 'bcm', 'incidentReporting'], S.nistOlirIso),
  p('iso27001', 'iso22301', 'medium', ['bcm', 'riskManagement', 'incidentReporting'], S.isoBcm),
  p('iso27001', 'cis-controls', 'medium', ['accessControl', 'vulnerabilityManagement', 'networkSecurity', 'encryption'], S.cisIso),
  p('iso27001', 'owasp-asvs', 'low', ['securityByDesign', 'vulnerabilityManagement'], S.isoDev),

  // BSI IT-Grundschutz
  p('bsi-grundschutz', 'iso22301', 'high', ['bcm', 'riskManagement', 'incidentReporting'], S.bsi2004),
  p('bsi-grundschutz', 'nist-csf', 'medium', ['riskManagement', 'accessControl', 'incidentReporting']),
  p('bsi-grundschutz', 'cis-controls', 'medium', ['accessControl', 'networkSecurity', 'vulnerabilityManagement']),
  p('bsi-grundschutz', 'owasp-asvs', 'low', ['securityByDesign', 'vulnerabilityManagement'], S.gsDev),

  // NIST CSF, ISO 22301, CIS
  p('nist-csf', 'cis-controls', 'high', ['accessControl', 'vulnerabilityManagement', 'riskManagement', 'incidentReporting', 'networkSecurity'], S.cisNist),
  p('nist-csf', 'iso22301', 'low', ['bcm', 'incidentReporting']),
  p('nist-csf', 'owasp-asvs', 'low', ['securityByDesign']),
  p('iso22301', 'cis-controls', 'low', ['bcm']),
  p('cis-controls', 'owasp-asvs', 'low', ['securityByDesign', 'vulnerabilityManagement']),
];

export function getOverlapsForRegulation(regId: RegulationId): OverlapMapping[] {
  return REGULATION_OVERLAPS.filter((o) => o.regA === regId || o.regB === regId);
}

export function getOverlapBetween(regA: RegulationId, regB: RegulationId): OverlapMapping | undefined {
  return REGULATION_OVERLAPS.find(
    (o) => (o.regA === regA && o.regB === regB) || (o.regA === regB && o.regB === regA),
  );
}

/** Synergien zwischen bereits bearbeiteten Regelwerken, stärkste zuerst. */
export function findSynergies(completedRegIds: RegulationId[]): OverlapMapping[] {
  return REGULATION_OVERLAPS.filter(
    (o) => completedRegIds.includes(o.regA) && completedRegIds.includes(o.regB),
  ).sort(byLevel);
}
