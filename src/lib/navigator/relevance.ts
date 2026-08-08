// src/lib/navigator/relevance.ts

/**
 * Navigator Relevance Engine
 *
 * Pure scoring logic: maps a company profile (industry, size, business models,
 * special circumstances) to relevance scores for all 15 regulations.
 * Extracted from the Navigator page so it can be unit-tested.
 */

export type NavigatorRegulationId =
  | 'nis2' | 'dsgvo' | 'kritis' | 'dora' | 'tisax' | 'cra'
  | 'bsi-grundschutz' | 'iso27001' | 'soc2' | 'pci-dss' | 'c5'
  | 'cis-controls' | 'iso22301' | 'nist-csf' | 'owasp-asvs';

export type Relevance = 'high' | 'medium' | 'low' | 'none';
export type RegCategory = 'legal' | 'framework' | 'industry' | 'baseline';
/**
 * - direct:      gesetzliche Pflicht (Norm greift unmittelbar)
 * - indirect:    ueber Lieferkette/Kunden kaskadierte Anforderungen
 * - contractual: vertraglich gefordert (OEM, Card Schemes, Vergabe) — kein Gesetz
 * - check:       Sektor/Taetigkeit passt, Schwelle oder Scope muss geprueft werden
 * - cascaded:    empfohlener Rahmen wegen anderer Pflicht
 * - voluntary:   Best Practice
 */
export type ObligationType = 'direct' | 'indirect' | 'contractual' | 'check' | 'cascaded' | 'voluntary';

export interface RegulationResult {
  id: NavigatorRegulationId;
  relevance: Relevance;
  score: number;
  reasonKey: string;
  regCategory: RegCategory;
  obligationType: ObligationType;
  /** Which regulation triggered this (for cascaded results) */
  triggeredBy?: string;
}

export interface NavigatorProfile {
  industry: string;
  companySize: string;
  businessModels: string[];
  specialCircumstances: string[];
}

export function calculateRelevance(profile: NavigatorProfile): RegulationResult[] {
  const { industry, companySize, businessModels, specialCircumstances } = profile;
  const results: RegulationResult[] = [];

  const isLargeEnough = companySize === 'medium' || companySize === 'large';
  const isLarge = companySize === 'large';
  const isSupplier = businessModels.includes('supplierForRegulated');

  // ─── Helper: industry groups ───
  // NIS2: Anlagen 1+2 BSIG — inkl. Fahrzeugbau (Anlage 2 Nr. 5.5/5.6, NACE C.29/C.30)
  const nis2Sectors = ['energy', 'transport', 'finance', 'health', 'water', 'digital-infrastructure', 'ict-services', 'space', 'postal', 'waste', 'manufacturing', 'automotive', 'food', 'chemicals', 'research'];
  // KRITIS: §2 Nr. 4 KRITIS-Dachgesetz (10 Sektoren; Sozialversicherung hat keine Navigator-Branche)
  const kritisSectors = ['energy', 'water', 'health', 'transport', 'finance', 'food', 'digital-infrastructure', 'waste', 'space'];
  const digitalSectors = ['digital-infrastructure', 'ict-services'];
  const isNis2Sector = nis2Sectors.includes(industry);
  const isKritisSector = kritisSectors.includes(industry);
  const isDigitalSector = digitalSectors.includes(industry);

  // ─── NIS2 ───
  const isFinancial = industry === 'finance' || businessModels.includes('financialServices');
  let nis2Score = 0;
  let nis2Reason = 'nis2Check';
  if (isFinancial) {
    // DORA ist lex specialis: §28 Abs. 6 Nr. 1 BSIG nimmt Finanzunternehmen von
    // §§30-32, 35, 36, 38, 39 aus; Banken/FMI bleiben registrierungspflichtig (§33),
    // Versicherungen/Zahlungsinstitute stehen gar nicht in Anlage 1/2
    nis2Score = 55; nis2Reason = 'nis2DoraLex';
  } else if (specialCircumstances.includes('kritis')) {
    nis2Score = 95; nis2Reason = 'nis2Critical';
  } else if (isNis2Sector && isLargeEnough) {
    nis2Score = 90; nis2Reason = 'nis2SectorSize';
  } else if (isSupplier) {
    nis2Score = 65; nis2Reason = 'nis2SupplyChain';
  } else if (isLargeEnough && (businessModels.includes('saasProvider') || businessModels.includes('digitalServices') || businessModels.includes('cloudProvider'))) {
    // Anlage 2 Nr. 6 BSIG (Online-Marktplaetze, Suchmaschinen, soziale Netzwerke)
    // bzw. Anlage 1 Nr. 6 (Cloud, Rechenzentren, MSP/MSSP) ohne passende Branchenwahl
    nis2Score = 60; nis2Reason = 'nis2DigitalServices';
  } else if (isNis2Sector) {
    nis2Score = 50; nis2Reason = 'nis2SectorOnly';
  } else if (isLargeEnough) {
    nis2Score = 30; nis2Reason = 'nis2Check';
  }
  results.push({
    id: 'nis2',
    relevance: nis2Score >= 80 ? 'high' : nis2Score >= 40 ? 'medium' : nis2Score >= 20 ? 'low' : 'none',
    score: nis2Score, reasonKey: nis2Reason,
    regCategory: 'legal',
    obligationType:
      nis2Reason === 'nis2SupplyChain' ? 'indirect'
      : nis2Score >= 80 ? 'direct'
      : nis2Score > 0 ? 'check'
      : 'voluntary',
  });

  // ─── DSGVO ─── (gilt fuer alle)
  let dsgvoScore = 70;
  let dsgvoReason = 'dsgvoAlways';
  if (specialCircumstances.includes('art9Data')) {
    dsgvoScore = 98; dsgvoReason = 'dsgvoSensitive';
  } else if (businessModels.includes('personalData')) {
    dsgvoScore = 95; dsgvoReason = 'dsgvoAlways';
  } else if (industry === 'health') {
    dsgvoScore = 95; dsgvoReason = 'dsgvoSensitive';
  }
  results.push({ id: 'dsgvo', relevance: 'high', score: dsgvoScore, reasonKey: dsgvoReason, regCategory: 'legal', obligationType: 'direct' });

  // ─── KRITIS ─── (Branche allein reicht fuer medium)
  let kritisScore = 0;
  let kritisReason = 'kritisNA';
  if (specialCircumstances.includes('kritis') || businessModels.includes('kritisOperator')) {
    kritisScore = 95; kritisReason = 'kritisOperator';
  } else if (isKritisSector && isLarge) {
    kritisScore = 80; kritisReason = 'kritisSector';
  } else if (isKritisSector && isLargeEnough) {
    kritisScore = 60; kritisReason = 'kritisSector';
  } else if (isKritisSector) {
    kritisScore = 35; kritisReason = 'kritisSector';
  }
  results.push({
    id: 'kritis',
    relevance: kritisScore >= 80 ? 'high' : kritisScore >= 40 ? 'medium' : kritisScore >= 10 ? 'low' : 'none',
    score: kritisScore, reasonKey: kritisReason,
    regCategory: 'legal',
    // KRITIS greift nur oberhalb der Anlagen-Schwellenwerte der BSI-KritisV —
    // ohne bestaetigten Betreiberstatus bleibt es bei "Pflicht pruefen"
    obligationType: kritisReason === 'kritisOperator' ? 'direct' : kritisScore > 0 ? 'check' : 'voluntary',
  });

  // ─── DORA ─── (Finanzbranche direkt)
  let doraScore = 0;
  let doraReason = 'doraNA';
  if (industry === 'finance' || businessModels.includes('financialServices')) {
    doraScore = 90; doraReason = 'doraFinance';
  } else if (businessModels.includes('cloudProvider') && specialCircumstances.includes('financeClients')) {
    doraScore = 70; doraReason = 'doraICT';
  } else if (isSupplier && specialCircumstances.includes('financeClients')) {
    doraScore = 60; doraReason = 'doraSupplyChain';
  }
  results.push({
    id: 'dora',
    relevance: doraScore >= 80 ? 'high' : doraScore >= 40 ? 'medium' : doraScore >= 10 ? 'low' : 'none',
    score: doraScore, reasonKey: doraReason,
    regCategory: 'legal',
    obligationType: doraReason === 'doraFinance' ? 'direct' : doraScore > 0 ? 'indirect' : 'voluntary',
  });

  // ─── TISAX ─── (Automotive + Zulieferer)
  let tisaxScore = 0;
  let tisaxReason = 'tisaxNA';
  if (specialCircumstances.includes('tisaxRequired')) {
    tisaxScore = 95; tisaxReason = 'tisaxRequired';
  } else if (industry === 'automotive' || businessModels.includes('automotiveSupplier')) {
    tisaxScore = 85; tisaxReason = 'tisaxAuto';
  }
  results.push({
    id: 'tisax',
    relevance: tisaxScore >= 80 ? 'high' : tisaxScore >= 40 ? 'medium' : tisaxScore >= 10 ? 'low' : 'none',
    score: tisaxScore, reasonKey: tisaxReason,
    regCategory: 'industry',
    // TISAX ist eine OEM-/ENX-Anforderung aus Liefervertraegen, kein Gesetz
    obligationType: tisaxScore > 0 ? 'contractual' : 'voluntary',
  });

  // ─── CRA ─── (Fertigung/Produkte => immer relevant)
  let craScore = 0;
  let craReason = 'craNA';
  if (specialCircumstances.includes('iotProducts')) {
    craScore = 90; craReason = 'craIoT';
  } else if (businessModels.includes('digitalProducts')) {
    craScore = 80; craReason = 'craProducts';
  } else if (industry === 'manufacturing' || businessModels.includes('manufacturing')) {
    craScore = 65; craReason = 'craProducts';
  } else if (isDigitalSector) {
    craScore = 50; craReason = 'craProducts';
  }
  results.push({
    id: 'cra',
    relevance: craScore >= 80 ? 'high' : craScore >= 40 ? 'medium' : craScore >= 10 ? 'low' : 'none',
    score: craScore, reasonKey: craReason,
    regCategory: 'legal',
    // CRA-Pflicht haengt allein daran, ob Produkte mit digitalen Elementen in
    // Verkehr gebracht werden — ohne diese Angabe bleibt es bei "pruefen"
    obligationType: craScore >= 80 ? 'direct' : craScore > 0 ? 'check' : 'voluntary',
  });

  // ─── BSI IT-Grundschutz ─── (Empfohlen fuer alle DE-Unternehmen)
  let bsiScore = 45;
  let bsiReason = 'bsiFramework';
  if (specialCircumstances.includes('iso27001')) {
    bsiScore = 80; bsiReason = 'bsiIso';
  } else if (nis2Score >= 80 || kritisScore >= 80) {
    bsiScore = 75; bsiReason = 'bsiNis2Kritis';
  } else if (isLargeEnough) {
    bsiScore = 60; bsiReason = 'bsiFramework';
  }
  results.push({
    id: 'bsi-grundschutz',
    relevance: bsiScore >= 70 ? 'medium' : bsiScore >= 40 ? 'medium' : 'low',
    score: bsiScore, reasonKey: bsiReason,
    regCategory: 'framework',
    obligationType: bsiReason === 'bsiNis2Kritis' ? 'cascaded' : 'voluntary',
    ...(bsiReason === 'bsiNis2Kritis' ? { triggeredBy: nis2Score >= 80 ? 'NIS2' : 'KRITIS' } : {}),
  });

  // ─── ISO 27001 ─── (Universeller ISMS-Standard)
  let iso27001Score = 40;
  let iso27001Reason = 'iso27001Framework';
  if (specialCircumstances.includes('iso27001')) {
    iso27001Score = 90; iso27001Reason = 'iso27001Already';
  } else if (nis2Score >= 80 || kritisScore >= 80 || doraScore >= 80) {
    iso27001Score = 80; iso27001Reason = 'iso27001Compliance';
  } else if (isLargeEnough) {
    iso27001Score = 60; iso27001Reason = 'iso27001Size';
  }
  results.push({
    id: 'iso27001',
    relevance: iso27001Score >= 80 ? 'high' : iso27001Score >= 40 ? 'medium' : 'low',
    score: iso27001Score, reasonKey: iso27001Reason,
    regCategory: 'framework',
    obligationType: iso27001Reason === 'iso27001Compliance' ? 'cascaded' : 'voluntary',
    ...(iso27001Reason === 'iso27001Compliance' ? { triggeredBy: nis2Score >= 80 ? 'NIS2' : doraScore >= 80 ? 'DORA' : 'KRITIS' } : {}),
  });

  // ─── SOC 2 ─── (Cloud/SaaS/Digital + ICT-Branchen)
  let soc2Score = 0;
  let soc2Reason = 'soc2NA';
  if (businessModels.includes('saasProvider') || businessModels.includes('cloudProvider')) {
    soc2Score = 85; soc2Reason = 'soc2Cloud';
  } else if (isDigitalSector) {
    soc2Score = 65; soc2Reason = 'soc2Digital';
  } else if (businessModels.includes('digitalServices')) {
    soc2Score = 60; soc2Reason = 'soc2Digital';
  } else if (isSupplier) {
    soc2Score = 40; soc2Reason = 'soc2Supplier';
  }
  results.push({
    id: 'soc2',
    relevance: soc2Score >= 80 ? 'high' : soc2Score >= 40 ? 'medium' : soc2Score >= 10 ? 'low' : 'none',
    score: soc2Score, reasonKey: soc2Reason,
    regCategory: 'industry',
    // SOC 2 ist ohne konkrete Kundenforderung freiwillig; die Reason-Texte
    // benennen die Marktueblichkeit
    obligationType: 'voluntary',
  });

  // ─── PCI DSS ─── (Handel/Finanzen direkt, alle mit Zahlungen)
  let pciScore = 0;
  let pciReason = 'pciNA';
  if (specialCircumstances.includes('pciRequired') || businessModels.includes('paymentProcessing')) {
    pciScore = 95; pciReason = 'pciRequired';
  } else if (industry === 'retail') {
    pciScore = 80; pciReason = 'pciSector';
  } else if (industry === 'finance') {
    pciScore = 75; pciReason = 'pciSector';
  } else if (businessModels.includes('digitalProducts') || businessModels.includes('digitalServices')) {
    pciScore = 40; pciReason = 'pciDigital';
  }
  results.push({
    id: 'pci-dss',
    relevance: pciScore >= 80 ? 'high' : pciScore >= 40 ? 'medium' : pciScore >= 10 ? 'low' : 'none',
    score: pciScore, reasonKey: pciReason,
    regCategory: 'industry',
    // PCI DSS wird ueber Acquirer-/Haendlervertraege der Kartensysteme
    // durchgesetzt — vertragliche, keine gesetzliche Pflicht (DE/EU)
    obligationType: pciReason === 'pciRequired' ? 'contractual' : pciScore > 0 ? 'check' : 'voluntary',
  });

  // ─── C5 ─── (nur fuer Cloud-/SaaS-Anbieter relevant — C5 testiert Cloud-Dienste)
  const offersCloudServices =
    businessModels.includes('cloudProvider') ||
    businessModels.includes('saasProvider') ||
    businessModels.includes('digitalServices') ||
    isDigitalSector;
  let c5Score = 0;
  let c5Reason = 'c5NA';
  if (offersCloudServices && industry === 'health') {
    // §393 SGB V: Cloud-Verarbeitung von Gesundheits-/Sozialdaten nur mit C5-Testat
    c5Score = 92; c5Reason = 'c5Health';
  } else if (offersCloudServices && specialCircumstances.includes('publicSectorClients')) {
    c5Score = 90; c5Reason = 'c5PublicSector';
  } else if (businessModels.includes('cloudProvider')) {
    c5Score = 85; c5Reason = 'c5Cloud';
  } else if (businessModels.includes('saasProvider')) {
    c5Score = 75; c5Reason = 'c5Saas';
  } else if (isDigitalSector) {
    c5Score = 45; c5Reason = 'c5Cloud';
  }
  results.push({
    id: 'c5',
    relevance: c5Score >= 80 ? 'high' : c5Score >= 40 ? 'medium' : c5Score >= 10 ? 'low' : 'none',
    score: c5Score, reasonKey: c5Reason,
    regCategory: 'industry',
    // C5 hat lt. BSI "empfehlenden Charakter"; eingefordert wird es vertraglich
    // (Vergabe Bund/EVB-IT Cloud) bzw. ueber §393 SGB V beim Kunden
    obligationType: c5Reason === 'c5Health' || c5Reason === 'c5PublicSector' ? 'contractual' : 'voluntary',
  });

  // ─── CIS Controls ─── (Pragmatische Baseline fuer alle)
  let cisScore = 40;
  let cisReason = 'cisFramework';
  if (nis2Score >= 80 || iso27001Score >= 80) {
    cisScore = 65; cisReason = 'cisCompliance';
  } else if (isDigitalSector) {
    cisScore = 60; cisReason = 'cisCompliance';
  } else if (isLargeEnough) {
    cisScore = 50; cisReason = 'cisSize';
  }
  results.push({
    id: 'cis-controls',
    relevance: cisScore >= 80 ? 'high' : cisScore >= 40 ? 'medium' : 'low',
    score: cisScore, reasonKey: cisReason,
    regCategory: 'baseline',
    obligationType: cisReason === 'cisCompliance' ? 'cascaded' : 'voluntary',
    ...(cisReason === 'cisCompliance' ? { triggeredBy: nis2Score >= 80 ? 'NIS2' : 'ISO 27001' } : {}),
  });

  // ─── ISO 22301 BCM ─── (KRITIS-Sektoren brauchen BCM)
  let bcmScore = 20;
  let bcmReason = 'bcmFramework';
  if (kritisScore >= 80) {
    bcmScore = 80; bcmReason = 'bcmKritis';
  } else if (nis2Score >= 80) {
    bcmScore = 65; bcmReason = 'bcmNis2';
  } else if (isKritisSector) {
    bcmScore = 55; bcmReason = 'bcmKritis';
  } else if (isLargeEnough) {
    bcmScore = 45; bcmReason = 'bcmSize';
  }
  results.push({
    id: 'iso22301',
    relevance: bcmScore >= 80 ? 'high' : bcmScore >= 40 ? 'medium' : bcmScore >= 10 ? 'low' : 'none',
    score: bcmScore, reasonKey: bcmReason,
    regCategory: 'framework',
    obligationType: bcmReason === 'bcmKritis' || bcmReason === 'bcmNis2' ? 'cascaded' : 'voluntary',
    ...(bcmReason === 'bcmKritis' ? { triggeredBy: 'KRITIS' } : bcmReason === 'bcmNis2' ? { triggeredBy: 'NIS2' } : {}),
  });

  // ─── NIST CSF ─── (Gutes Rahmenwerk fuer alle)
  let nistScore = 25;
  let nistReason = 'nistFramework';
  if (iso27001Score >= 80 || nis2Score >= 80) {
    nistScore = 55; nistReason = 'nistCompliance';
  } else if (isDigitalSector) {
    nistScore = 50; nistReason = 'nistDigital';
  } else if (businessModels.includes('digitalServices') || businessModels.includes('saasProvider')) {
    nistScore = 45; nistReason = 'nistDigital';
  } else if (isLargeEnough) {
    nistScore = 40; nistReason = 'nistFramework';
  }
  results.push({
    id: 'nist-csf',
    relevance: nistScore >= 80 ? 'high' : nistScore >= 40 ? 'medium' : 'low',
    score: nistScore, reasonKey: nistReason,
    regCategory: 'framework',
    obligationType: nistReason === 'nistCompliance' ? 'cascaded' : 'voluntary',
    ...(nistReason === 'nistCompliance' ? { triggeredBy: iso27001Score >= 80 ? 'ISO 27001' : 'NIS2' } : {}),
  });

  // ─── OWASP ASVS ─── (Software/Digital-Branchen)
  let owaspScore = 15;
  let owaspReason = 'owaspNA';
  if (businessModels.includes('digitalProducts') || businessModels.includes('saasProvider')) {
    owaspScore = 75; owaspReason = 'owaspSoftware';
  } else if (businessModels.includes('cloudProvider')) {
    owaspScore = 65; owaspReason = 'owaspCloud';
  } else if (isDigitalSector) {
    owaspScore = 60; owaspReason = 'owaspDigital';
  } else if (businessModels.includes('digitalServices')) {
    owaspScore = 55; owaspReason = 'owaspDigital';
  }
  results.push({
    id: 'owasp-asvs',
    relevance: owaspScore >= 80 ? 'high' : owaspScore >= 40 ? 'medium' : owaspScore >= 10 ? 'low' : 'none',
    score: owaspScore, reasonKey: owaspReason,
    regCategory: 'baseline',
    obligationType: 'voluntary',
  });

  return [...results].sort((a, b) => b.score - a.score);
}
