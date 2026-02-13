// src/lib/regulations/recommendation-mappings.ts

/**
 * Cross-Regulation Recommendation Mappings
 *
 * Maps recommendations across regulations that cover the same security topic.
 * Used to show "Erfüllt auch: [NIS2] [KRITIS]" badges on recommendation cards,
 * and to build a deduplicated consolidated roadmap.
 */

import type { RegulationId } from './types';

export interface TopicMapping {
  /** Internal topic identifier */
  topic: string;
  /** Translation key for the topic name */
  topicKey: string;
  /** Map of regulation ID → recommendation IDs that cover this topic */
  recommendations: Partial<Record<RegulationId, string[]>>;
}

/**
 * Cross-regulation topic mappings.
 * Each entry groups recommendations from different regulations
 * that address the same security concern.
 */
export const TOPIC_MAPPINGS: TopicMapping[] = [
  // === RISK MANAGEMENT ===
  {
    topic: 'risk-management',
    topicKey: 'crossReg.topics.riskManagement',
    recommendations: {
      nis2: ['rec-ra-1', 'rec-ra-2'],
      kritis: ['rec-rm-1', 'rec-rm-2'],
      dora: ['rec-irm-1', 'rec-irm-2'],
      dsgvo: ['rec-dsfa-1', 'rec-dsfa-2'],
      tisax: ['rec-org-1'],
      'bsi-grundschutz': ['rec-isms-1', 'rec-isms-2'],
      iso27001: ['iso-rec-pr-1', 'iso-rec-pr-2'],
      soc2: ['rec-gov-1', 'rec-gov-2'],
    },
  },

  // === INCIDENT RESPONSE / REPORTING ===
  {
    topic: 'incident-response',
    topicKey: 'crossReg.topics.incidentResponse',
    recommendations: {
      nis2: ['rec-ih-1', 'rec-ih-2', 'rec-ih-3'],
      kritis: ['rec-vm-1', 'rec-vm-2', 'rec-vm-3'],
      dora: ['rec-vm-1', 'rec-vm-2', 'rec-vm-3'],
      dsgvo: ['rec-dv-1', 'rec-dv-2'],
      cra: ['rec-vm-1', 'rec-vm-2'],
      'bsi-grundschutz': ['rec-der-1', 'rec-der-2'],
      iso27001: ['iso-rec-ic-1', 'iso-rec-ic-2'],
      soc2: ['rec-avl-2', 'rec-mon-1', 'rec-mon-2'],
      'pci-dss': ['rec-mt-1', 'rec-sp-2'],
      c5: ['rec-c5-sim-1'],
    },
  },

  // === BUSINESS CONTINUITY / BCM ===
  {
    topic: 'business-continuity',
    topicKey: 'crossReg.topics.businessContinuity',
    recommendations: {
      nis2: ['rec-bc-1', 'rec-bc-2', 'rec-bc-3'],
      kritis: ['rec-bcm-1', 'rec-bcm-2', 'rec-bcm-3'],
      dora: ['rec-rt-1'],
      'bsi-grundschutz': ['rec-der-3'],
      iso27001: ['iso-rec-pr-3', 'iso-rec-ic-2'],
      soc2: ['rec-avl-1', 'rec-avl-2', 'rec-avl-3'],
      c5: ['rec-c5-sim-1', 'rec-c5-sim-2'],
    },
  },

  // === ACCESS CONTROL ===
  {
    topic: 'access-control',
    topicKey: 'crossReg.topics.accessControl',
    recommendations: {
      nis2: ['rec-ac-1', 'rec-ac-2', 'rec-ac-3'],
      tisax: ['rec-zk-1', 'rec-zk-2'],
      dsgvo: ['rec-tom-1'],
      'bsi-grundschutz': ['rec-orp-1', 'rec-orp-2'],
      iso27001: ['iso-rec-ac-1', 'iso-rec-ac-2'],
      soc2: ['rec-sec-1', 'rec-conf-2'],
      'pci-dss': ['rec-ac-1', 'rec-ac-2', 'rec-ns-2'],
      c5: ['rec-c5-idm-1', 'rec-c5-idm-2', 'rec-c5-idm-3'],
    },
  },

  // === CRYPTOGRAPHY / ENCRYPTION ===
  {
    topic: 'cryptography',
    topicKey: 'crossReg.topics.cryptography',
    recommendations: {
      nis2: ['rec-cr-1', 'rec-cr-2'],
      tisax: ['rec-kry-1', 'rec-kry-2'],
      dsgvo: ['rec-tom-2'],
      'bsi-grundschutz': ['rec-con-1', 'rec-con-2'],
      iso27001: ['iso-rec-cn-1', 'iso-rec-cn-2'],
      soc2: ['rec-sec-2', 'rec-conf-1'],
      'pci-dss': ['rec-dp-1', 'rec-dp-2', 'rec-dp-3'],
      c5: ['rec-c5-kry-1', 'rec-c5-kry-2'],
    },
  },

  // === SUPPLY CHAIN / THIRD-PARTY MANAGEMENT ===
  {
    topic: 'supply-chain',
    topicKey: 'crossReg.topics.supplyChain',
    recommendations: {
      nis2: ['rec-sc-1', 'rec-sc-2'],
      kritis: ['rec-lk-1', 'rec-lk-2'],
      dora: ['rec-da-1', 'rec-da-2'],
      tisax: ['rec-lief-1', 'rec-lief-2'],
      dsgvo: ['rec-av-1', 'rec-av-2'],
    },
  },

  // === AUTHENTICATION / MFA ===
  {
    topic: 'authentication',
    topicKey: 'crossReg.topics.authentication',
    recommendations: {
      nis2: ['rec-mc-1', 'rec-mc-2'],
      tisax: ['rec-tech-1'],
      'bsi-grundschutz': ['rec-sys-1'],
      iso27001: ['iso-rec-ac-1', 'iso-rec-ac-2'],
      'pci-dss': ['rec-au-1', 'rec-au-2', 'rec-au-3'],
      c5: ['rec-c5-idm-1', 'rec-c5-idm-2'],
    },
  },

  // === SECURITY AWARENESS / TRAINING ===
  {
    topic: 'security-training',
    topicKey: 'crossReg.topics.securityTraining',
    recommendations: {
      nis2: ['rec-ch-1', 'rec-ch-2'],
      tisax: ['rec-per-1', 'rec-per-2'],
      dsgvo: ['rec-dsb-2'],
      'bsi-grundschutz': ['rec-orp-3'],
      dora: ['rec-gov-3'],
      iso27001: ['iso-rec-sa-1', 'iso-rec-sa-2'],
      soc2: ['rec-priv-2'],
      'pci-dss': ['rec-au-3', 'rec-sp-1'],
      c5: ['rec-c5-org-2', 'rec-c5-org-3'],
    },
  },

  // === VULNERABILITY / PATCH MANAGEMENT ===
  {
    topic: 'vulnerability-management',
    topicKey: 'crossReg.topics.vulnerabilityManagement',
    recommendations: {
      nis2: ['rec-ad-1', 'rec-ad-3'],
      cra: ['rec-swm-1', 'rec-swm-2', 'rec-swm-3'],
      'bsi-grundschutz': ['rec-ops-1', 'rec-ops-2'],
      iso27001: ['iso-rec-op-2'],
      'pci-dss': ['rec-vm-1', 'rec-vm-2', 'rec-vm-3'],
    },
  },

  // === NETWORK SECURITY ===
  {
    topic: 'network-security',
    topicKey: 'crossReg.topics.networkSecurity',
    recommendations: {
      nis2: ['rec-mc-3'],
      tisax: ['rec-kom-1', 'rec-kom-2'],
      'bsi-grundschutz': ['rec-net-1', 'rec-net-2'],
      iso27001: ['iso-rec-cn-2'],
      soc2: ['rec-sec-2', 'rec-sec-3'],
      'pci-dss': ['rec-ns-1', 'rec-ns-2', 'rec-ns-3'],
      c5: ['rec-c5-ops-2'],
    },
  },

  // === PHYSICAL SECURITY ===
  {
    topic: 'physical-security',
    topicKey: 'crossReg.topics.physicalSecurity',
    recommendations: {
      kritis: ['rec-ps-1', 'rec-ps-2'],
      tisax: ['rec-phy-1', 'rec-phy-2'],
      'bsi-grundschutz': ['rec-inf-1', 'rec-inf-2'],
      iso27001: ['iso-rec-ps-1', 'iso-rec-ps-2'],
      'pci-dss': ['rec-ps-1', 'rec-ps-2'],
      c5: ['rec-c5-ps-1', 'rec-c5-ps-2'],
    },
  },

  // === GOVERNANCE / MANAGEMENT RESPONSIBILITY ===
  {
    topic: 'governance',
    topicKey: 'crossReg.topics.governance',
    recommendations: {
      nis2: ['rec-ra-2'],
      dora: ['rec-gov-1', 'rec-gov-2'],
      tisax: ['rec-org-2'],
      'bsi-grundschutz': ['rec-isms-3'],
      iso27001: ['iso-rec-cl-1', 'iso-rec-cl-2'],
      soc2: ['rec-gov-1', 'rec-gov-2', 'rec-pi-1'],
      'pci-dss': ['rec-ac-2', 'rec-sp-1'],
      c5: ['rec-c5-org-1', 'rec-c5-dev-2'],
    },
  },

  // === SECURITY BY DESIGN / SDLC ===
  {
    topic: 'security-by-design',
    topicKey: 'crossReg.topics.securityByDesign',
    recommendations: {
      nis2: ['rec-ad-2'],
      cra: ['rec-sbd-1', 'rec-sbd-2', 'rec-sbd-3'],
      dsgvo: ['rec-pbd-1', 'rec-pbd-2'],
      iso27001: ['iso-rec-cl-2', 'iso-rec-sa-2'],
      soc2: ['rec-pi-2'],
      'pci-dss': ['rec-ns-3', 'rec-vm-3'],
      c5: ['rec-c5-kry-2', 'rec-c5-dev-1'],
    },
  },

  // === AUDIT / EFFECTIVENESS ASSESSMENT ===
  {
    topic: 'audit-effectiveness',
    topicKey: 'crossReg.topics.auditEffectiveness',
    recommendations: {
      nis2: ['rec-ea-1', 'rec-ea-2'],
      kritis: ['rec-au-1', 'rec-au-2'],
      dora: ['rec-rt-2', 'rec-rt-3'],
      tisax: ['rec-comp-1', 'rec-comp-2'],
      iso27001: ['iso-rec-ic-3'],
      soc2: ['rec-avl-3', 'rec-pi-1', 'rec-mon-3'],
      'pci-dss': ['rec-mt-1', 'rec-mt-2'],
      c5: ['rec-c5-dev-1', 'rec-c5-dev-2'],
    },
  },

  // === DATA PROTECTION / PRIVACY ===
  {
    topic: 'data-protection',
    topicKey: 'crossReg.topics.dataProtection',
    recommendations: {
      dsgvo: ['rec-vv-1', 'rec-vv-2', 'rec-ew-1', 'rec-br-1'],
      tisax: ['rec-ds-1', 'rec-ds-2'],
      cra: ['rec-dok-1'],
      iso27001: ['iso-rec-cn-1'],
      soc2: ['rec-conf-1', 'rec-priv-1', 'rec-priv-3'],
      'pci-dss': ['rec-dp-1', 'rec-dp-2'],
      c5: ['rec-c5-am-1', 'rec-c5-am-2'],
    },
  },

  // === SOFTWARE TRANSPARENCY / SBOM ===
  {
    topic: 'software-transparency',
    topicKey: 'crossReg.topics.softwareTransparency',
    recommendations: {
      cra: ['rec-sbom-1', 'rec-sbom-2', 'rec-sbom-3'],
      nis2: ['rec-sc-3'],
    },
  },

  // === UPDATE MANAGEMENT / LIFECYCLE ===
  {
    topic: 'update-management',
    topicKey: 'crossReg.topics.updateManagement',
    recommendations: {
      cra: ['rec-um-1', 'rec-um-2', 'rec-um-3', 'rec-sl-1', 'rec-sl-2'],
      'bsi-grundschutz': ['rec-ops-3'],
      iso27001: ['iso-rec-op-1', 'iso-rec-op-2'],
      soc2: ['rec-pi-2'],
      'pci-dss': ['rec-vm-2'],
      c5: ['rec-c5-ops-1'],
    },
  },
];

/**
 * Regulation display labels (short form for badges).
 */
export const REGULATION_LABELS: Record<RegulationId, string> = {
  nis2: 'NIS2',
  dsgvo: 'DSGVO',
  kritis: 'KRITIS',
  dora: 'DORA',
  tisax: 'TISAX',
  cra: 'CRA',
  'bsi-grundschutz': 'BSI-GS',
  iso27001: 'ISO 27001',
  soc2: 'SOC 2',
  'pci-dss': 'PCI DSS',
  c5: 'C5',
  'cis-controls': 'CIS Controls',
  iso22301: 'ISO 22301',
  'nist-csf': 'NIST CSF',
  'owasp-asvs': 'OWASP ASVS',
};

/**
 * Get all regulations that a specific recommendation also covers.
 * Returns regulation IDs OTHER than the one passed as `currentRegulation`.
 */
export function getAlsoCoveredBy(
  recommendationId: string,
  currentRegulation: RegulationId
): RegulationId[] {
  const covered = new Set<RegulationId>();

  for (const mapping of TOPIC_MAPPINGS) {
    // Check if this recommendation is in the mapping
    const currentRecIds = mapping.recommendations[currentRegulation];
    if (!currentRecIds?.includes(recommendationId)) continue;

    // Add all other regulations that have recommendations in this topic
    for (const [regId, recIds] of Object.entries(mapping.recommendations)) {
      if (regId !== currentRegulation && recIds && recIds.length > 0) {
        covered.add(regId as RegulationId);
      }
    }
  }

  return Array.from(covered);
}

/**
 * Get the number of regulations each recommendation covers (for scoring boost).
 */
export function getRegulationCoverage(
  recommendationId: string,
  currentRegulation: RegulationId
): number {
  return getAlsoCoveredBy(recommendationId, currentRegulation).length + 1; // +1 for current
}

/**
 * Describes a related recommendation in another regulation that covers the same topic.
 */
export interface CrossRegRecommendation {
  regulationId: RegulationId;
  regulationLabel: string;
  recommendationIds: string[];
  topic: string;
  topicKey: string;
}

/**
 * Get all related recommendations in OTHER regulations for a given recommendation.
 * Returns a flat list of { regulationId, regulationLabel, recommendationIds[], topic, topicKey }.
 *
 * This is used for the cross-regulation progress cascade: when a user completes
 * a recommendation in regulation A, we suggest marking related recommendations
 * in regulation B, C, ... as completed too.
 */
export function getCrossRegRecommendations(
  recommendationId: string,
  currentRegulation: RegulationId
): CrossRegRecommendation[] {
  const results: CrossRegRecommendation[] = [];

  for (const mapping of TOPIC_MAPPINGS) {
    // Check if this recommendation is part of this topic mapping
    const currentRecIds = mapping.recommendations[currentRegulation];
    if (!currentRecIds?.includes(recommendationId)) continue;

    // Collect related recommendations from other regulations
    for (const [regId, recIds] of Object.entries(mapping.recommendations)) {
      if (regId === currentRegulation || !recIds || recIds.length === 0) continue;

      results.push({
        regulationId: regId as RegulationId,
        regulationLabel: REGULATION_LABELS[regId as RegulationId],
        recommendationIds: recIds,
        topic: mapping.topic,
        topicKey: mapping.topicKey,
      });
    }
  }

  // Merge entries for the same regulation (a recommendation may appear in multiple topic mappings)
  const merged = new Map<RegulationId, CrossRegRecommendation>();
  for (const entry of results) {
    const existing = merged.get(entry.regulationId);
    if (existing) {
      // Add unique recommendation IDs
      const ids = new Set([...existing.recommendationIds, ...entry.recommendationIds]);
      existing.recommendationIds = Array.from(ids);
    } else {
      merged.set(entry.regulationId, { ...entry });
    }
  }

  return Array.from(merged.values());
}
