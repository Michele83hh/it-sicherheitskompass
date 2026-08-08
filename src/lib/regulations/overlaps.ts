// src/lib/regulations/overlaps.ts

/**
 * Cross-regulation overlap mappings.
 *
 * Defines which measure categories overlap between regulations,
 * allowing the dashboard to show synergy opportunities.
 */

import type { RegulationId } from './types';

export interface OverlapMapping {
  /** First regulation */
  regA: RegulationId;
  /** Second regulation */
  regB: RegulationId;
  /** Overlap percentage (0-100) — approximate */
  overlapPercent: number;
  /** Concrete shared measures (translation keys) */
  sharedMeasureKeys: string[];
}

/**
 * Pre-defined overlap mappings between regulation pairs.
 * Ordered by overlap strength (highest first).
 */
export const REGULATION_OVERLAPS: OverlapMapping[] = [
  // NIS2 ↔ KRITIS: ~80% overlap (both based on BSI-Gesetz)
  {
    regA: 'nis2',
    regB: 'kritis',
    overlapPercent: 80,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.supplyChain',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.accessControl',
    ],
  },
  // NIS2 ↔ DORA: ~60% overlap (both EU cybersecurity)
  {
    regA: 'nis2',
    regB: 'dora',
    overlapPercent: 60,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.thirdPartyRisk',
      'platform.overlaps.measures.resilienceTesting',
    ],
  },
  // NIS2 ↔ DSGVO: ~50% overlap (TOMs overlap)
  {
    regA: 'nis2',
    regB: 'dsgvo',
    overlapPercent: 50,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.riskManagement',
    ],
  },
  // NIS2 ↔ BSI IT-Grundschutz: ~70% overlap (BSI is implementation framework for NIS2)
  {
    regA: 'nis2',
    regB: 'bsi-grundschutz',
    overlapPercent: 70,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.networkSecurity',
    ],
  },
  // DORA ↔ DSGVO: ~40% overlap
  {
    regA: 'dora',
    regB: 'dsgvo',
    overlapPercent: 40,
    sharedMeasureKeys: [
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.thirdPartyRisk',
      'platform.overlaps.measures.accessControl',
    ],
  },
  // KRITIS ↔ BSI IT-Grundschutz: ~75% overlap
  {
    regA: 'kritis',
    regB: 'bsi-grundschutz',
    overlapPercent: 75,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.networkSecurity',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.physicalSecurity',
    ],
  },
  // TISAX ↔ NIS2: ~45% overlap
  {
    regA: 'tisax',
    regB: 'nis2',
    overlapPercent: 45,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.supplierManagement',
    ],
  },
  // CRA ↔ NIS2: ~35% overlap
  {
    regA: 'cra',
    regB: 'nis2',
    overlapPercent: 35,
    sharedMeasureKeys: [
      'platform.overlaps.measures.vulnerabilityManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.securityByDesign',
    ],
  },
  // ISO 27001 ↔ NIS2: ~65% overlap
  {
    regA: 'iso27001',
    regB: 'nis2',
    overlapPercent: 65,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.encryption',
    ],
  },
  // ISO 27001 ↔ BSI IT-Grundschutz: ~85% overlap
  {
    regA: 'iso27001',
    regB: 'bsi-grundschutz',
    overlapPercent: 85,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.physicalSecurity',
      'platform.overlaps.measures.networkSecurity',
    ],
  },
  // ISO 27001 ↔ TISAX: ~70% overlap
  {
    regA: 'iso27001',
    regB: 'tisax',
    overlapPercent: 70,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.physicalSecurity',
    ],
  },
  // SOC 2 ↔ ISO 27001: ~60% overlap
  {
    regA: 'soc2',
    regB: 'iso27001',
    overlapPercent: 60,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.encryption',
    ],
  },
  // C5 ↔ ISO 27001: ~75% overlap
  {
    regA: 'c5',
    regB: 'iso27001',
    overlapPercent: 75,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.physicalSecurity',
      'platform.overlaps.measures.networkSecurity',
    ],
  },
  // C5 ↔ BSI IT-Grundschutz: ~70% overlap
  {
    regA: 'c5',
    regB: 'bsi-grundschutz',
    overlapPercent: 70,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.networkSecurity',
      'platform.overlaps.measures.physicalSecurity',
    ],
  },
  // PCI DSS ↔ ISO 27001: ~55% overlap
  {
    regA: 'pci-dss',
    regB: 'iso27001',
    overlapPercent: 55,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.networkSecurity',
      'platform.overlaps.measures.vulnerabilityManagement',
    ],
  },
  // PCI DSS ↔ DORA: ~40% overlap
  {
    regA: 'pci-dss',
    regB: 'dora',
    overlapPercent: 40,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.incidentReporting',
    ],
  },
  // CIS Controls ↔ ISO 27001: ~70% overlap (CIS as technical implementation of ISO controls)
  {
    regA: 'cis-controls',
    regB: 'iso27001',
    overlapPercent: 70,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.vulnerabilityManagement',
      'platform.overlaps.measures.networkSecurity',
      'platform.overlaps.measures.encryption',
    ],
  },
  // CIS Controls ↔ NIS2: ~55% overlap
  {
    regA: 'cis-controls',
    regB: 'nis2',
    overlapPercent: 55,
    sharedMeasureKeys: [
      'platform.overlaps.measures.vulnerabilityManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.networkSecurity',
    ],
  },
  // CIS Controls ↔ BSI IT-Grundschutz: ~65% overlap
  {
    regA: 'cis-controls',
    regB: 'bsi-grundschutz',
    overlapPercent: 65,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.networkSecurity',
      'platform.overlaps.measures.vulnerabilityManagement',
      'platform.overlaps.measures.physicalSecurity',
    ],
  },
  // CIS Controls ↔ NIST CSF: ~75% overlap (both US-origin frameworks)
  {
    regA: 'cis-controls',
    regB: 'nist-csf',
    overlapPercent: 75,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.vulnerabilityManagement',
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.networkSecurity',
    ],
  },
  // ISO 22301 ↔ ISO 27001: ~50% overlap (BCM chapter in ISO 27001)
  {
    regA: 'iso22301',
    regB: 'iso27001',
    overlapPercent: 50,
    sharedMeasureKeys: [
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
    ],
  },
  // ISO 22301 ↔ NIS2: ~45% overlap (NIS2 requires BCM)
  {
    regA: 'iso22301',
    regB: 'nis2',
    overlapPercent: 45,
    sharedMeasureKeys: [
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.riskManagement',
    ],
  },
  // ISO 22301 ↔ KRITIS: ~55% overlap (KRITIS requires BCM)
  {
    regA: 'iso22301',
    regB: 'kritis',
    overlapPercent: 55,
    sharedMeasureKeys: [
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.physicalSecurity',
    ],
  },
  // NIST CSF ↔ ISO 27001: ~70% overlap
  {
    regA: 'nist-csf',
    regB: 'iso27001',
    overlapPercent: 70,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.bcm',
      'platform.overlaps.measures.incidentReporting',
    ],
  },
  // NIST CSF ↔ NIS2: ~55% overlap
  {
    regA: 'nist-csf',
    regB: 'nis2',
    overlapPercent: 55,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.bcm',
    ],
  },
  // OWASP ASVS ↔ CIS Controls: ~40% overlap (application security focus)
  {
    regA: 'owasp-asvs',
    regB: 'cis-controls',
    overlapPercent: 40,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.vulnerabilityManagement',
    ],
  },
  // OWASP ASVS ↔ ISO 27001: ~35% overlap
  {
    regA: 'owasp-asvs',
    regB: 'iso27001',
    overlapPercent: 35,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.securityByDesign',
    ],
  },
  // SOC 2 ↔ C5: ~75% overlap (BSI C5:2020 Referenztabelle: 80% der C5-Kriterien mit AICPA-TSC-Referenz)
  {
    regA: 'soc2',
    regB: 'c5',
    overlapPercent: 75,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.bcm',
    ],
  },
  // DORA ↔ ISO 27001: ~60% overlap (IKT-Risikomanagement, Incidents, Drittparteien via A.5.19-5.23)
  {
    regA: 'dora',
    regB: 'iso27001',
    overlapPercent: 60,
    sharedMeasureKeys: [
      'platform.overlaps.measures.riskManagement',
      'platform.overlaps.measures.incidentReporting',
      'platform.overlaps.measures.thirdPartyRisk',
      'platform.overlaps.measures.bcm',
    ],
  },
  // CRA ↔ OWASP ASVS: ~45% overlap (technische Anhang-I-Teil-I-Anforderungen; Prozesspflichten Teil II nicht abgedeckt)
  {
    regA: 'cra',
    regB: 'owasp-asvs',
    overlapPercent: 45,
    sharedMeasureKeys: [
      'platform.overlaps.measures.securityByDesign',
      'platform.overlaps.measures.vulnerabilityManagement',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.accessControl',
    ],
  },
  // TISAX ↔ DSGVO: ~35% overlap (VDA ISA 6 Kap. 9 Datenschutz: Auftragsverarbeitung Art. 28 + TOMs Art. 32)
  {
    regA: 'tisax',
    regB: 'dsgvo',
    overlapPercent: 35,
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.supplierManagement',
    ],
  },
];

/**
 * Get all overlaps involving a specific regulation.
 */
export function getOverlapsForRegulation(regId: RegulationId): OverlapMapping[] {
  return REGULATION_OVERLAPS.filter(
    (o) => o.regA === regId || o.regB === regId
  );
}

/**
 * Get the overlap between two specific regulations, if any.
 */
export function getOverlapBetween(
  regA: RegulationId,
  regB: RegulationId
): OverlapMapping | undefined {
  return REGULATION_OVERLAPS.find(
    (o) =>
      (o.regA === regA && o.regB === regB) ||
      (o.regA === regB && o.regB === regA)
  );
}

/**
 * Given a set of completed regulation IDs, find relevant synergies.
 */
export function findSynergies(completedRegIds: RegulationId[]): OverlapMapping[] {
  return REGULATION_OVERLAPS.filter(
    (o) => completedRegIds.includes(o.regA) && completedRegIds.includes(o.regB)
  ).sort((a, b) => b.overlapPercent - a.overlapPercent);
}
