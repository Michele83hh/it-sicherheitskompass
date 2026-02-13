/**
 * CIS Controls v8 Gap Analysis Questions
 *
 * 18 questions across 6 categories (3 per category).
 * Questions target management/GF level - clear, non-jargon wording.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Maturity levels:
 *   0 = Nothing exists
 *   1 = Informal/ad-hoc
 *   2 = Documented but not systematic
 *   3 = Systematic, regularly reviewed, automated where possible
 *
 * Legal basis: CIS Critical Security Controls v8
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Inventar & Kontrolle (CIS 1-2)
  // ============================================================
  {
    id: 'cis-ic-q1',
    categoryId: 'inventory-control',
    tier: 'core',
    titleKey: 'cis-controls.questions.icQ1.title',
    tooltipKey: 'cis-controls.questions.icQ1.tooltip',
    helpKey: 'cis-controls.questions.icQ1.help',
    legalReference: {
      cisControl: 'CIS Control 1: Inventory and Control of Enterprise Assets',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.icQ1.maturity.level0',
      level1Key: 'cis-controls.questions.icQ1.maturity.level1',
      level2Key: 'cis-controls.questions.icQ1.maturity.level2',
      level3Key: 'cis-controls.questions.icQ1.maturity.level3',
    },
  },
  {
    id: 'cis-ic-q2',
    categoryId: 'inventory-control',
    tier: 'core',
    titleKey: 'cis-controls.questions.icQ2.title',
    tooltipKey: 'cis-controls.questions.icQ2.tooltip',
    helpKey: 'cis-controls.questions.icQ2.help',
    legalReference: {
      cisControl: 'CIS Control 2: Inventory and Control of Software Assets',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.icQ2.maturity.level0',
      level1Key: 'cis-controls.questions.icQ2.maturity.level1',
      level2Key: 'cis-controls.questions.icQ2.maturity.level2',
      level3Key: 'cis-controls.questions.icQ2.maturity.level3',
    },
  },
  {
    id: 'cis-ic-q3',
    categoryId: 'inventory-control',
    tier: 'advanced',
    titleKey: 'cis-controls.questions.icQ3.title',
    tooltipKey: 'cis-controls.questions.icQ3.tooltip',
    helpKey: 'cis-controls.questions.icQ3.help',
    legalReference: {
      cisControl: 'CIS Control 1.4, 2.5: Use of Discovery Tools',
      implementationGroup: 'IG2',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.icQ3.maturity.level0',
      level1Key: 'cis-controls.questions.icQ3.maturity.level1',
      level2Key: 'cis-controls.questions.icQ3.maturity.level2',
      level3Key: 'cis-controls.questions.icQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Datenschutz & Datenmanagement (CIS 3)
  // ============================================================
  {
    id: 'cis-dp-q1',
    categoryId: 'data-protection',
    tier: 'core',
    titleKey: 'cis-controls.questions.dpQ1.title',
    tooltipKey: 'cis-controls.questions.dpQ1.tooltip',
    helpKey: 'cis-controls.questions.dpQ1.help',
    legalReference: {
      cisControl: 'CIS Control 3.1: Establish and Maintain a Data Management Process',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.dpQ1.maturity.level0',
      level1Key: 'cis-controls.questions.dpQ1.maturity.level1',
      level2Key: 'cis-controls.questions.dpQ1.maturity.level2',
      level3Key: 'cis-controls.questions.dpQ1.maturity.level3',
    },
  },
  {
    id: 'cis-dp-q2',
    categoryId: 'data-protection',
    tier: 'core',
    titleKey: 'cis-controls.questions.dpQ2.title',
    tooltipKey: 'cis-controls.questions.dpQ2.tooltip',
    helpKey: 'cis-controls.questions.dpQ2.help',
    legalReference: {
      cisControl: 'CIS Control 3.6: Encrypt Data on End-User Devices',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.dpQ2.maturity.level0',
      level1Key: 'cis-controls.questions.dpQ2.maturity.level1',
      level2Key: 'cis-controls.questions.dpQ2.maturity.level2',
      level3Key: 'cis-controls.questions.dpQ2.maturity.level3',
    },
  },
  {
    id: 'cis-dp-q3',
    categoryId: 'data-protection',
    tier: 'core',
    titleKey: 'cis-controls.questions.dpQ3.title',
    tooltipKey: 'cis-controls.questions.dpQ3.tooltip',
    helpKey: 'cis-controls.questions.dpQ3.help',
    legalReference: {
      cisControl: 'CIS Control 3.3: Configure Data Access Control Lists',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.dpQ3.maturity.level0',
      level1Key: 'cis-controls.questions.dpQ3.maturity.level1',
      level2Key: 'cis-controls.questions.dpQ3.maturity.level2',
      level3Key: 'cis-controls.questions.dpQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Sichere Konfiguration (CIS 4-6)
  // ============================================================
  {
    id: 'cis-sc-q1',
    categoryId: 'secure-config',
    tier: 'core',
    titleKey: 'cis-controls.questions.scQ1.title',
    tooltipKey: 'cis-controls.questions.scQ1.tooltip',
    helpKey: 'cis-controls.questions.scQ1.help',
    legalReference: {
      cisControl: 'CIS Control 4: Secure Configuration of Enterprise Assets and Software',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.scQ1.maturity.level0',
      level1Key: 'cis-controls.questions.scQ1.maturity.level1',
      level2Key: 'cis-controls.questions.scQ1.maturity.level2',
      level3Key: 'cis-controls.questions.scQ1.maturity.level3',
    },
  },
  {
    id: 'cis-sc-q2',
    categoryId: 'secure-config',
    tier: 'core',
    titleKey: 'cis-controls.questions.scQ2.title',
    tooltipKey: 'cis-controls.questions.scQ2.tooltip',
    helpKey: 'cis-controls.questions.scQ2.help',
    legalReference: {
      cisControl: 'CIS Control 5: Account Management',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.scQ2.maturity.level0',
      level1Key: 'cis-controls.questions.scQ2.maturity.level1',
      level2Key: 'cis-controls.questions.scQ2.maturity.level2',
      level3Key: 'cis-controls.questions.scQ2.maturity.level3',
    },
  },
  {
    id: 'cis-sc-q3',
    categoryId: 'secure-config',
    tier: 'core',
    titleKey: 'cis-controls.questions.scQ3.title',
    tooltipKey: 'cis-controls.questions.scQ3.tooltip',
    helpKey: 'cis-controls.questions.scQ3.help',
    legalReference: {
      cisControl: 'CIS Control 6: Access Control Management',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.scQ3.maturity.level0',
      level1Key: 'cis-controls.questions.scQ3.maturity.level1',
      level2Key: 'cis-controls.questions.scQ3.maturity.level2',
      level3Key: 'cis-controls.questions.scQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Schwachstellenmanagement (CIS 7-10)
  // ============================================================
  {
    id: 'cis-vm-q1',
    categoryId: 'vulnerability-mgmt',
    tier: 'core',
    titleKey: 'cis-controls.questions.vmQ1.title',
    tooltipKey: 'cis-controls.questions.vmQ1.tooltip',
    helpKey: 'cis-controls.questions.vmQ1.help',
    legalReference: {
      cisControl: 'CIS Control 7: Continuous Vulnerability Management',
      implementationGroup: 'IG2',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.vmQ1.maturity.level0',
      level1Key: 'cis-controls.questions.vmQ1.maturity.level1',
      level2Key: 'cis-controls.questions.vmQ1.maturity.level2',
      level3Key: 'cis-controls.questions.vmQ1.maturity.level3',
    },
  },
  {
    id: 'cis-vm-q2',
    categoryId: 'vulnerability-mgmt',
    tier: 'core',
    titleKey: 'cis-controls.questions.vmQ2.title',
    tooltipKey: 'cis-controls.questions.vmQ2.tooltip',
    helpKey: 'cis-controls.questions.vmQ2.help',
    legalReference: {
      cisControl: 'CIS Control 8: Audit Log Management',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.vmQ2.maturity.level0',
      level1Key: 'cis-controls.questions.vmQ2.maturity.level1',
      level2Key: 'cis-controls.questions.vmQ2.maturity.level2',
      level3Key: 'cis-controls.questions.vmQ2.maturity.level3',
    },
  },
  {
    id: 'cis-vm-q3',
    categoryId: 'vulnerability-mgmt',
    tier: 'core',
    titleKey: 'cis-controls.questions.vmQ3.title',
    tooltipKey: 'cis-controls.questions.vmQ3.tooltip',
    helpKey: 'cis-controls.questions.vmQ3.help',
    legalReference: {
      cisControl: 'CIS Control 9, 10: Email/Browser Protection, Malware Defenses',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.vmQ3.maturity.level0',
      level1Key: 'cis-controls.questions.vmQ3.maturity.level1',
      level2Key: 'cis-controls.questions.vmQ3.maturity.level2',
      level3Key: 'cis-controls.questions.vmQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Wiederherstellung & Netzwerk (CIS 11-13)
  // ============================================================
  {
    id: 'cis-rn-q1',
    categoryId: 'recovery-network',
    tier: 'core',
    titleKey: 'cis-controls.questions.rnQ1.title',
    tooltipKey: 'cis-controls.questions.rnQ1.tooltip',
    helpKey: 'cis-controls.questions.rnQ1.help',
    legalReference: {
      cisControl: 'CIS Control 11: Data Recovery',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.rnQ1.maturity.level0',
      level1Key: 'cis-controls.questions.rnQ1.maturity.level1',
      level2Key: 'cis-controls.questions.rnQ1.maturity.level2',
      level3Key: 'cis-controls.questions.rnQ1.maturity.level3',
    },
  },
  {
    id: 'cis-rn-q2',
    categoryId: 'recovery-network',
    tier: 'core',
    titleKey: 'cis-controls.questions.rnQ2.title',
    tooltipKey: 'cis-controls.questions.rnQ2.tooltip',
    helpKey: 'cis-controls.questions.rnQ2.help',
    legalReference: {
      cisControl: 'CIS Control 12: Network Infrastructure Management',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.rnQ2.maturity.level0',
      level1Key: 'cis-controls.questions.rnQ2.maturity.level1',
      level2Key: 'cis-controls.questions.rnQ2.maturity.level2',
      level3Key: 'cis-controls.questions.rnQ2.maturity.level3',
    },
  },
  {
    id: 'cis-rn-q3',
    categoryId: 'recovery-network',
    tier: 'advanced',
    titleKey: 'cis-controls.questions.rnQ3.title',
    tooltipKey: 'cis-controls.questions.rnQ3.tooltip',
    helpKey: 'cis-controls.questions.rnQ3.help',
    legalReference: {
      cisControl: 'CIS Control 13: Network Monitoring and Defense',
      implementationGroup: 'IG2',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.rnQ3.maturity.level0',
      level1Key: 'cis-controls.questions.rnQ3.maturity.level1',
      level2Key: 'cis-controls.questions.rnQ3.maturity.level2',
      level3Key: 'cis-controls.questions.rnQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Sicherheitsbetrieb (CIS 14-18)
  // ============================================================
  {
    id: 'cis-so-q1',
    categoryId: 'security-operations',
    tier: 'core',
    titleKey: 'cis-controls.questions.soQ1.title',
    tooltipKey: 'cis-controls.questions.soQ1.tooltip',
    helpKey: 'cis-controls.questions.soQ1.help',
    legalReference: {
      cisControl: 'CIS Control 14: Security Awareness and Skills Training',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.soQ1.maturity.level0',
      level1Key: 'cis-controls.questions.soQ1.maturity.level1',
      level2Key: 'cis-controls.questions.soQ1.maturity.level2',
      level3Key: 'cis-controls.questions.soQ1.maturity.level3',
    },
  },
  {
    id: 'cis-so-q2',
    categoryId: 'security-operations',
    tier: 'core',
    titleKey: 'cis-controls.questions.soQ2.title',
    tooltipKey: 'cis-controls.questions.soQ2.tooltip',
    helpKey: 'cis-controls.questions.soQ2.help',
    legalReference: {
      cisControl: 'CIS Control 15, 16: Service Provider Management, Application Software Security',
      implementationGroup: 'IG1',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.soQ2.maturity.level0',
      level1Key: 'cis-controls.questions.soQ2.maturity.level1',
      level2Key: 'cis-controls.questions.soQ2.maturity.level2',
      level3Key: 'cis-controls.questions.soQ2.maturity.level3',
    },
  },
  {
    id: 'cis-so-q3',
    categoryId: 'security-operations',
    tier: 'advanced',
    titleKey: 'cis-controls.questions.soQ3.title',
    tooltipKey: 'cis-controls.questions.soQ3.tooltip',
    helpKey: 'cis-controls.questions.soQ3.help',
    legalReference: {
      cisControl: 'CIS Control 17, 18: Incident Response Management, Penetration Testing',
      implementationGroup: 'IG2',
    },
    maturityDescriptions: {
      level0Key: 'cis-controls.questions.soQ3.maturity.level0',
      level1Key: 'cis-controls.questions.soQ3.maturity.level1',
      level2Key: 'cis-controls.questions.soQ3.maturity.level2',
      level3Key: 'cis-controls.questions.soQ3.maturity.level3',
    },
  },
];

export function getQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId);
}

export function getCoreQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId && q.tier === 'core');
}

export function getAdvancedQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId && q.tier === 'advanced');
}

export function getCoreQuestionCount(): number {
  return QUESTIONS.filter((q) => q.tier === 'core').length;
}

export function getAdvancedQuestionCount(): number {
  return QUESTIONS.filter((q) => q.tier === 'advanced').length;
}

export function getTotalQuestionCount(): number {
  return QUESTIONS.length;
}
