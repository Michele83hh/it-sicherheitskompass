/**
 * NIS2 Cost Estimation — Research-Backed + Dynamic Scaling
 *
 * Base estimates for ~100-employee German KMU (Referenz-Unternehmen).
 * Dynamically adjustable by company size, maturity, entity type, and KRITIS status.
 *
 * Sources: BSI IT-Grundschutz, ing-ism.de, netxconsult, controll-it.de,
 * SoSafe/KnowBe4 pricing, Delinea/CyberArk, BITKOM, Malt Tarifbarometer,
 * StepStone/GEHALT.de, Frontier Economics (EU NIS2 Impact Assessment)
 *
 * Rates used:
 * - Internal staff (fully loaded): €500/day (StepStone avg IT staff Germany)
 * - External consultant: €1,300/day (Malt Tarifbarometer Cybersecurity 2025)
 */

import type { EffortLevel, CategoryScore, TrafficLight } from './types';

// ============================================================
// Types
// ============================================================

export interface CostEstimate {
  recommendationId: string;
  internalEffortDays: { min: number; max: number };
  externalCostEur: { min: number; max: number };
  toolCostEurYear: { min: number; max: number };
  totalEstimateEur: { min: number; max: number };
}

export interface CompanyProfile {
  employees: number;
  entityCategory: 'besonders-wichtig' | 'wichtig' | 'nicht-betroffen';
  isKritis: boolean;
}

export interface ScalingFactors {
  size: number;
  maturity: number;
  entity: number;
  kritis: number;
  combined: number;
}

export interface AdjustedCostEstimate extends CostEstimate {
  factors: ScalingFactors;
  adjustedInternalDays: { min: number; max: number };
  adjustedTotalEur: { min: number; max: number };
}

// ============================================================
// Constants
// ============================================================

const INTERNAL_DAY_RATE = 500;
const EXTERNAL_DAY_RATE = 1300;

/**
 * Base cost estimates per recommendation (reference: ~100 MA KMU).
 *
 * Each estimate scoped to the INITIAL implementation of that specific measure,
 * not a full lifecycle or certification process.
 */
export const COST_ESTIMATES: CostEstimate[] = [
  // ── Category 1: Risikoanalyse ──
  // ra1: IT-Risikoinventar — asset list + initial risk assessment
  // Source: ing-ism.de (Quick Win W1-6, 1-2 PT); Cyberpilot risk analysis guide
  { recommendationId: 'rec-ra-1', internalEffortDays: { min: 2, max: 4 }, externalCostEur: { min: 0, max: 2600 }, toolCostEurYear: { min: 0, max: 500 }, totalEstimateEur: { min: 1000, max: 4600 } },
  // ra2: Sicherheitsverantwortlichkeiten — CISO role, RACI, reporting lines
  // Source: DGI externer IT-Sicherheitsbeauftragter; DataGuard CISO guide
  { recommendationId: 'rec-ra-2', internalEffortDays: { min: 2, max: 3 }, externalCostEur: { min: 0, max: 1300 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 1000, max: 2800 } },
  // ra3: ISMS-Framework initial setup (NOT full ISO certification)
  // Source: tec4net (30-60 PT full), scoped to initial framework: 5-10 PT
  { recommendationId: 'rec-ra-3', internalEffortDays: { min: 5, max: 10 }, externalCostEur: { min: 3900, max: 7800 }, toolCostEurYear: { min: 0, max: 2000 }, totalEstimateEur: { min: 6400, max: 14800 } },

  // ── Category 2: Sicherheitsvorfälle ──
  // ih1: Incident-Response-Plan — runbooks + tabletop exercise
  // Source: NIST SP 800-61; ing-ism.de (Monate 1-3, 2-3 PT)
  { recommendationId: 'rec-ih-1', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 2600, max: 5200 }, toolCostEurYear: { min: 0, max: 1000 }, totalEstimateEur: { min: 4100, max: 9700 } },
  // ih2: Meldeketten/Notfallkontakte — contact list + escalation matrix
  // Source: BSI NIS-2 Incident Response; ing-ism.de (Quick Win)
  { recommendationId: 'rec-ih-2', internalEffortDays: { min: 1, max: 2 }, externalCostEur: { min: 0, max: 1300 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 500, max: 2300 } },
  // ih3: §32 BSIG Meldeprozess — BSI portal + process + mock exercise
  // Source: BSI Meldepflicht; OpenKRITIS; ing-ism.de (4-8 Wochen)
  { recommendationId: 'rec-ih-3', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 1300, max: 3900 }, toolCostEurYear: { min: 0, max: 500 }, totalEstimateEur: { min: 2800, max: 6900 } },

  // ── Category 3: Betriebskontinuität ──
  // bc1: Backup-Strategie 3-2-1 — design + implementation
  // Source: ext-com.de; HTH Computer; Veeam pricing (€3k-15k for 5-50 workloads)
  { recommendationId: 'rec-bc-1', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 1300, max: 3900 }, toolCostEurYear: { min: 1500, max: 5000 }, totalEstimateEur: { min: 4300, max: 11400 } },
  // bc2: Notfall-/Wiederherstellungsplan — DR procedures + RTO/RPO + testing
  // Source: HAGEL-IT; IBM DR Plan; ing-ism.de (4-8 Wochen + Workshops)
  { recommendationId: 'rec-bc-2', internalEffortDays: { min: 5, max: 8 }, externalCostEur: { min: 2600, max: 6500 }, toolCostEurYear: { min: 0, max: 1000 }, totalEstimateEur: { min: 5100, max: 11500 } },
  // bc3: BIA durchführen — stakeholder interviews + impact assessment
  // Source: controll-it.de (3-5 PT); Computer Weekly BIA; KMU IT BIA
  { recommendationId: 'rec-bc-3', internalEffortDays: { min: 3, max: 6 }, externalCostEur: { min: 2600, max: 5200 }, toolCostEurYear: { min: 0, max: 500 }, totalEstimateEur: { min: 4100, max: 8700 } },

  // ── Category 4: Lieferkette ──
  // sc1: Lieferantenübersicht + Risikobewertung
  // Source: OpenKRITIS Lieferantensicherheit; BSI NIS-2 Lieferkette; ing-ism.de
  { recommendationId: 'rec-sc-1', internalEffortDays: { min: 2, max: 4 }, externalCostEur: { min: 0, max: 2600 }, toolCostEurYear: { min: 0, max: 500 }, totalEstimateEur: { min: 1000, max: 4600 } },
  // sc2: Sicherheitsklauseln in Verträge — templates + legal review
  // Source: SECJUR NIS2 Lieferkette; LawCode NIS2; ing-ism.de (2-3 Monate inkl. Legal)
  { recommendationId: 'rec-sc-2', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 1300, max: 3900 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 2800, max: 6400 } },
  // sc3: Lieferanten-Bewertungsprozess — questionnaire + scoring framework
  // Source: Heise NIS-2 Supply Chain; WKO Lieferkette NIS2
  { recommendationId: 'rec-sc-3', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 1300, max: 3900 }, toolCostEurYear: { min: 0, max: 1500 }, totalEstimateEur: { min: 2800, max: 7900 } },

  // ── Category 5: Erwerb/Entwicklung ──
  // ad1: Patch-Management-Policy — policy + process (not tooling)
  // Source: LSI Bayern; ing-ism.de (Quick Win W3-6); Pulseway
  { recommendationId: 'rec-ad-1', internalEffortDays: { min: 1, max: 2 }, externalCostEur: { min: 0, max: 1300 }, toolCostEurYear: { min: 1000, max: 3000 }, totalEstimateEur: { min: 1500, max: 4300 } },
  // ad2: Schwachstellenmanagement — initial setup + first scan
  // Source: ing-ism.de; Greenbone/OpenVAS (free), Tenable.io (~€5.8k/100 assets)
  { recommendationId: 'rec-ad-2', internalEffortDays: { min: 2, max: 3 }, externalCostEur: { min: 0, max: 2600 }, toolCostEurYear: { min: 0, max: 3000 }, totalEstimateEur: { min: 1000, max: 7100 } },
  // ad3: Sichere Konfigurationsstandards — CIS/BSI baselines + hardening
  // Source: FB Pro BSI Windows-Härtung; Teal Consulting; CIS benchmarks (free)
  { recommendationId: 'rec-ad-3', internalEffortDays: { min: 5, max: 8 }, externalCostEur: { min: 2600, max: 6500 }, toolCostEurYear: { min: 500, max: 2000 }, totalEstimateEur: { min: 5600, max: 12500 } },

  // ── Category 6: Wirksamkeit ──
  // ea1: KPI-/Audit-Framework — define KPIs + initial audit plan
  // Source: netxconsult (Monate 3-6); ISMS.online; GlobalSuite
  { recommendationId: 'rec-ea-1', internalEffortDays: { min: 5, max: 10 }, externalCostEur: { min: 3900, max: 7800 }, toolCostEurYear: { min: 0, max: 2000 }, totalEstimateEur: { min: 6400, max: 14800 } },
  // ea2: Management-Reviews — quarterly meeting structure + templates
  // Source: Hightable ISO 27001 Clause 9.3; ISMS.online
  { recommendationId: 'rec-ea-2', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 1300, max: 3900 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 2800, max: 6400 } },
  // ea3: PDCA Verbesserungsprozess — initial CI process
  // Source: PECB PDCA Guide; GlobalSuite PDCA for ISO 27001
  { recommendationId: 'rec-ea-3', internalEffortDays: { min: 3, max: 5 }, externalCostEur: { min: 2600, max: 5200 }, toolCostEurYear: { min: 0, max: 1000 }, totalEstimateEur: { min: 4100, max: 9700 } },

  // ── Category 7: Cyberhygiene ──
  // ch1: Schulungsprogramm — platform setup + first campaign
  // Source: SoSafe €24-60/user/yr; KnowBe4 €24-60/user/yr; blueeagle.at
  { recommendationId: 'rec-ch-1', internalEffortDays: { min: 5, max: 8 }, externalCostEur: { min: 1300, max: 3900 }, toolCostEurYear: { min: 2000, max: 6000 }, totalEstimateEur: { min: 5800, max: 13900 } },
  // ch2: Sicherheitsrichtlinien — core policies from templates
  // Source: BITKOM; Information Shield; BSI IT-Grundschutz templates
  { recommendationId: 'rec-ch-2', internalEffortDays: { min: 2, max: 3 }, externalCostEur: { min: 0, max: 2600 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 1000, max: 4100 } },
  // ch3: GL-Schulung §38 BSIG — legally required board training
  // Source: BSI GL-Schulung; Transferstelle Cybersicherheit; Kopexa (€699-1200/Person)
  { recommendationId: 'rec-ch-3', internalEffortDays: { min: 1, max: 2 }, externalCostEur: { min: 2100, max: 6000 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 2600, max: 7000 } },

  // ── Category 8: Kryptografie ──
  // cr1: Verschlüsselungsinventar — audit all encryption in use
  // Source: BSI CON.1 (A15/A19); HiSolutions Krypto-Kataster
  { recommendationId: 'rec-cr-1', internalEffortDays: { min: 5, max: 8 }, externalCostEur: { min: 2600, max: 5200 }, toolCostEurYear: { min: 0, max: 1000 }, totalEstimateEur: { min: 5100, max: 10200 } },
  // cr2: Kryptokonzept/Policy — aligned with BSI TR-02102
  // Source: BSI TR-02102; Security Insider; BSI CON.1
  { recommendationId: 'rec-cr-2', internalEffortDays: { min: 5, max: 8 }, externalCostEur: { min: 3900, max: 7800 }, toolCostEurYear: { min: 0, max: 0 }, totalEstimateEur: { min: 6400, max: 11800 } },
  // cr3: Zertifikats-/Schlüsselmanagement — PKI setup (managed preferred for KMU)
  // Source: PKITNEXT Kosten; Security Insider managed PKI; Sectigo €2.9k/yr; GlobalSign
  { recommendationId: 'rec-cr-3', internalEffortDays: { min: 15, max: 25 }, externalCostEur: { min: 7800, max: 19500 }, toolCostEurYear: { min: 3000, max: 15000 }, totalEstimateEur: { min: 18300, max: 47000 } },

  // ── Category 9: Zugriffskontrolle ──
  // ac1: Berechtigungskonzept RBAC — role definition + initial mapping
  // Source: Tools4ever RBAC; StrongDM; CSO (3-5 PT for concept, not full IAM)
  { recommendationId: 'rec-ac-1', internalEffortDays: { min: 5, max: 10 }, externalCostEur: { min: 3900, max: 7800 }, toolCostEurYear: { min: 0, max: 3000 }, totalEstimateEur: { min: 6400, max: 15800 } },
  // ac2: Offboarding-/Rezertifizierungsprozess — define + document
  // Source: Betasystems; Zluri access recertification
  { recommendationId: 'rec-ac-2', internalEffortDays: { min: 2, max: 3 }, externalCostEur: { min: 0, max: 1300 }, toolCostEurYear: { min: 0, max: 1000 }, totalEstimateEur: { min: 1000, max: 3800 } },
  // ac3: PAM einführen — privileged access management for admin accounts
  // Source: Delinea (14 Mo enterprise); KeeperPAM €85/user/mo; CyberArk ~€30k median KMU
  { recommendationId: 'rec-ac-3', internalEffortDays: { min: 10, max: 20 }, externalCostEur: { min: 7800, max: 15600 }, toolCostEurYear: { min: 10000, max: 30000 }, totalEstimateEur: { min: 22800, max: 55600 } },

  // ── Category 10: MFA/Kommunikation ──
  // mc1: MFA flächendeckend — rollout with existing M365/Google infrastructure
  // Source: Microsoft Entra MFA €3-6/user; Duo €36/user; Specops MFA Kosten
  { recommendationId: 'rec-mc-1', internalEffortDays: { min: 2, max: 4 }, externalCostEur: { min: 0, max: 1300 }, toolCostEurYear: { min: 0, max: 3000 }, totalEstimateEur: { min: 1000, max: 5300 } },
  // mc2: Sichere Kommunikationskanäle — VPN + encrypted messaging
  // Source: NordLayer; Proton for Business; Fortinet
  { recommendationId: 'rec-mc-2', internalEffortDays: { min: 2, max: 3 }, externalCostEur: { min: 0, max: 1300 }, toolCostEurYear: { min: 0, max: 2000 }, totalEstimateEur: { min: 1000, max: 4800 } },
  // mc3: Notfallkommunikation/Standortvernetzung — site-to-site + redundancy
  // Source: CISA; GXA; Fortinet SD-WAN (€5k-15k/yr)
  { recommendationId: 'rec-mc-3', internalEffortDays: { min: 5, max: 10 }, externalCostEur: { min: 3900, max: 7800 }, toolCostEurYear: { min: 3000, max: 10000 }, totalEstimateEur: { min: 9400, max: 22800 } },
];

// ============================================================
// Scaling Factors
// ============================================================

/**
 * Size scaling factor based on employee count.
 * Reference point: 100 employees = 1.0x
 *
 * Source: Frontier Economics EU NIS2 Impact Assessment — cost scales
 * sub-linearly with company size (economies of scale for tools,
 * but more coordination overhead for larger orgs).
 */
export function getSizeFactor(employees: number): number {
  if (employees < 50) return 0.6;
  if (employees < 100) return 0.8;
  if (employees <= 250) return 1.0;
  if (employees <= 500) return 1.4;
  return 1.8;
}

/**
 * Maturity reduction factor based on category traffic light score.
 * Red = full effort, Yellow = partial (some measures exist), Green = refinement only.
 */
export function getMaturityFactor(trafficLight: TrafficLight): number {
  switch (trafficLight) {
    case 'red': return 1.0;
    case 'yellow': return 0.6;
    case 'green': return 0.25;
  }
}

/**
 * Entity type factor — "besonders wichtig" entities face stricter
 * documentation and audit requirements (§28 vs §28 BSIG).
 */
export function getEntityFactor(entityCategory: string): number {
  if (entityCategory === 'besonders-wichtig') return 1.15;
  return 1.0;
}

/**
 * KRITIS operators have additional BSI requirements
 * (§10 BSIG, KRITIS-Prüfung alle 2 Jahre).
 */
export function getKritisFactor(isKritis: boolean): number {
  return isKritis ? 1.25 : 1.0;
}

/**
 * Calculate all scaling factors for a given company profile + category score.
 */
export function calculateScalingFactors(
  profile: CompanyProfile,
  categoryTrafficLight: TrafficLight,
): ScalingFactors {
  const size = getSizeFactor(profile.employees);
  const maturity = getMaturityFactor(categoryTrafficLight);
  const entity = getEntityFactor(profile.entityCategory);
  const kritis = getKritisFactor(profile.isKritis);
  const combined = Math.round(size * maturity * entity * kritis * 100) / 100;

  return { size, maturity, entity, kritis, combined };
}

// ============================================================
// Adjusted Estimates
// ============================================================

function applyFactor(range: { min: number; max: number }, factor: number): { min: number; max: number } {
  return {
    min: Math.round(range.min * factor),
    max: Math.round(range.max * factor),
  };
}

function applyFactorDays(range: { min: number; max: number }, factor: number): { min: number; max: number } {
  return {
    min: Math.max(1, Math.round(range.min * factor)),
    max: Math.max(1, Math.round(range.max * factor)),
  };
}

/**
 * Get adjusted cost estimate for one recommendation, considering company profile.
 */
export function getAdjustedCostEstimate(
  recommendationId: string,
  profile: CompanyProfile,
  categoryTrafficLight: TrafficLight,
): AdjustedCostEstimate | undefined {
  const base = getCostEstimate(recommendationId);
  if (!base) return undefined;

  const factors = calculateScalingFactors(profile, categoryTrafficLight);

  const adjustedInternalDays = applyFactorDays(base.internalEffortDays, factors.combined);
  const adjustedTotal = applyFactor(base.totalEstimateEur, factors.combined);

  return {
    ...base,
    factors,
    adjustedInternalDays,
    adjustedTotalEur: adjustedTotal,
  };
}

/**
 * Calculate total adjusted cost for a list of recommendations.
 */
export function calculateAdjustedTotalCost(
  recommendationIds: string[],
  categoryScores: CategoryScore[],
  profile: CompanyProfile,
): {
  totalBase: { min: number; max: number };
  totalAdjusted: { min: number; max: number };
  totalInternalDays: { min: number; max: number };
  totalAdjustedDays: { min: number; max: number };
} {
  const scoreMap = new Map(categoryScores.map((cs) => [cs.categoryId, cs]));
  let baseMin = 0, baseMax = 0;
  let adjMin = 0, adjMax = 0;
  let daysMin = 0, daysMax = 0;
  let adjDaysMin = 0, adjDaysMax = 0;

  for (const id of recommendationIds) {
    const base = getCostEstimate(id);
    if (!base) continue;

    // Find the category for this recommendation (id format: rec-XX-N)
    const catPrefix = id.replace(/^rec-/, '').replace(/-\d+$/, '');
    const catMap: Record<string, string> = {
      ra: 'risk-analysis', ih: 'incident-handling', bc: 'business-continuity',
      sc: 'supply-chain', ad: 'acquisition-development', ea: 'effectiveness-assessment',
      ch: 'cyber-hygiene', cr: 'cryptography', ac: 'access-control', mc: 'authentication-communication',
    };
    const categoryId = catMap[catPrefix];
    const catScore = categoryId ? scoreMap.get(categoryId) : undefined;
    const trafficLight = catScore?.trafficLight ?? 'red';

    const factors = calculateScalingFactors(profile, trafficLight);

    baseMin += base.totalEstimateEur.min;
    baseMax += base.totalEstimateEur.max;
    adjMin += Math.round(base.totalEstimateEur.min * factors.combined);
    adjMax += Math.round(base.totalEstimateEur.max * factors.combined);
    daysMin += base.internalEffortDays.min;
    daysMax += base.internalEffortDays.max;
    adjDaysMin += Math.max(1, Math.round(base.internalEffortDays.min * factors.combined));
    adjDaysMax += Math.max(1, Math.round(base.internalEffortDays.max * factors.combined));
  }

  return {
    totalBase: { min: baseMin, max: baseMax },
    totalAdjusted: { min: adjMin, max: adjMax },
    totalInternalDays: { min: daysMin, max: daysMax },
    totalAdjustedDays: { min: adjDaysMin, max: adjDaysMax },
  };
}

// ============================================================
// Utilities (unchanged API)
// ============================================================

export function getCostEstimate(recommendationId: string): CostEstimate | undefined {
  return COST_ESTIMATES.find((c) => c.recommendationId === recommendationId);
}

export function calculateTotalCost(
  applicableRecommendationIds: string[]
): { min: number; max: number } {
  let min = 0;
  let max = 0;
  for (const id of applicableRecommendationIds) {
    const estimate = getCostEstimate(id);
    if (estimate) {
      min += estimate.totalEstimateEur.min;
      max += estimate.totalEstimateEur.max;
    }
  }
  return { min, max };
}

export function formatCostRange(range: { min: number; max: number }): string {
  const format = (n: number) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  return `${format(range.min)} – ${format(range.max)}`;
}

export const EFFORT_DAYS: Record<EffortLevel, { min: number; max: number }> = {
  quick: { min: 1, max: 5 },
  medium: { min: 5, max: 15 },
  strategic: { min: 15, max: 30 },
};
