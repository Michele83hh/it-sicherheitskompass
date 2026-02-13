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
  /** Translation key for the synergy description */
  descriptionKey: string;
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
    descriptionKey: 'platform.overlaps.nis2Kritis',
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
    descriptionKey: 'platform.overlaps.nis2Dora',
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
    descriptionKey: 'platform.overlaps.nis2Dsgvo',
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
    descriptionKey: 'platform.overlaps.nis2Bsi',
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
    descriptionKey: 'platform.overlaps.doraDsgvo',
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
    descriptionKey: 'platform.overlaps.kritisBsi',
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
    descriptionKey: 'platform.overlaps.tisaxNis2',
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
    descriptionKey: 'platform.overlaps.craNis2',
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
    descriptionKey: 'platform.overlaps.iso27001Nis2',
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
    descriptionKey: 'platform.overlaps.iso27001Bsi',
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
    descriptionKey: 'platform.overlaps.iso27001Tisax',
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
    descriptionKey: 'platform.overlaps.soc2Iso27001',
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
    descriptionKey: 'platform.overlaps.c5Iso27001',
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
    descriptionKey: 'platform.overlaps.c5Bsi',
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
    descriptionKey: 'platform.overlaps.pciIso27001',
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
    descriptionKey: 'platform.overlaps.pciDora',
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
    descriptionKey: 'platform.overlaps.cisIso27001',
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
    descriptionKey: 'platform.overlaps.cisNis2',
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
    descriptionKey: 'platform.overlaps.cisBsi',
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
    descriptionKey: 'platform.overlaps.cisNist',
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
    descriptionKey: 'platform.overlaps.bcmIso27001',
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
    descriptionKey: 'platform.overlaps.bcmNis2',
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
    descriptionKey: 'platform.overlaps.bcmKritis',
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
    descriptionKey: 'platform.overlaps.nistIso27001',
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
    descriptionKey: 'platform.overlaps.nistNis2',
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
    descriptionKey: 'platform.overlaps.owaspCis',
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
    descriptionKey: 'platform.overlaps.owaspIso27001',
    sharedMeasureKeys: [
      'platform.overlaps.measures.accessControl',
      'platform.overlaps.measures.encryption',
      'platform.overlaps.measures.securityByDesign',
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
