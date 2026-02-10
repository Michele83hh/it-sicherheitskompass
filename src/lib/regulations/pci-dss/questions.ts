/**
 * PCI DSS v4.0 Gap Analysis Questions
 *
 * 28 questions across 8 categories (3-4 per category).
 * Questions target organizations processing, storing, or transmitting cardholder data.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Legal basis: PCI DSS v4.0 (March 2022)
 * Published by: PCI Security Standards Council (PCI SSC)
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Netzwerksicherheit (Req. 1-2)
  // ============================================================
  {
    id: 'ns-q1',
    categoryId: 'network-security',
    tier: 'core',
    titleKey: 'pciDss.questions.nsQ1.title',
    tooltipKey: 'pciDss.questions.nsQ1.tooltip',
    helpKey: 'pciDss.questions.nsQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 1.2',
      pciGoal: 'Goal 1',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.nsQ1.maturity.level0',
      level1Key: 'pciDss.questions.nsQ1.maturity.level1',
      level2Key: 'pciDss.questions.nsQ1.maturity.level2',
      level3Key: 'pciDss.questions.nsQ1.maturity.level3',
    },
  },
  {
    id: 'ns-q2',
    categoryId: 'network-security',
    tier: 'core',
    titleKey: 'pciDss.questions.nsQ2.title',
    tooltipKey: 'pciDss.questions.nsQ2.tooltip',
    helpKey: 'pciDss.questions.nsQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 1.3',
      pciGoal: 'Goal 1',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.nsQ2.maturity.level0',
      level1Key: 'pciDss.questions.nsQ2.maturity.level1',
      level2Key: 'pciDss.questions.nsQ2.maturity.level2',
      level3Key: 'pciDss.questions.nsQ2.maturity.level3',
    },
  },
  {
    id: 'ns-q3',
    categoryId: 'network-security',
    tier: 'core',
    titleKey: 'pciDss.questions.nsQ3.title',
    tooltipKey: 'pciDss.questions.nsQ3.tooltip',
    helpKey: 'pciDss.questions.nsQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 2.2',
      pciGoal: 'Goal 1',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.nsQ3.maturity.level0',
      level1Key: 'pciDss.questions.nsQ3.maturity.level1',
      level2Key: 'pciDss.questions.nsQ3.maturity.level2',
      level3Key: 'pciDss.questions.nsQ3.maturity.level3',
    },
  },
  {
    id: 'ns-q4',
    categoryId: 'network-security',
    tier: 'advanced',
    titleKey: 'pciDss.questions.nsQ4.title',
    tooltipKey: 'pciDss.questions.nsQ4.tooltip',
    helpKey: 'pciDss.questions.nsQ4.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 1.4',
      pciGoal: 'Goal 1',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.nsQ4.maturity.level0',
      level1Key: 'pciDss.questions.nsQ4.maturity.level1',
      level2Key: 'pciDss.questions.nsQ4.maturity.level2',
      level3Key: 'pciDss.questions.nsQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Datenschutz / Kontodaten (Req. 3-4)
  // ============================================================
  {
    id: 'dp-q1',
    categoryId: 'data-protection',
    tier: 'core',
    titleKey: 'pciDss.questions.dpQ1.title',
    tooltipKey: 'pciDss.questions.dpQ1.tooltip',
    helpKey: 'pciDss.questions.dpQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 3.1-3.3',
      pciGoal: 'Goal 2',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.dpQ1.maturity.level0',
      level1Key: 'pciDss.questions.dpQ1.maturity.level1',
      level2Key: 'pciDss.questions.dpQ1.maturity.level2',
      level3Key: 'pciDss.questions.dpQ1.maturity.level3',
    },
  },
  {
    id: 'dp-q2',
    categoryId: 'data-protection',
    tier: 'core',
    titleKey: 'pciDss.questions.dpQ2.title',
    tooltipKey: 'pciDss.questions.dpQ2.tooltip',
    helpKey: 'pciDss.questions.dpQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 3.5',
      pciGoal: 'Goal 2',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.dpQ2.maturity.level0',
      level1Key: 'pciDss.questions.dpQ2.maturity.level1',
      level2Key: 'pciDss.questions.dpQ2.maturity.level2',
      level3Key: 'pciDss.questions.dpQ2.maturity.level3',
    },
  },
  {
    id: 'dp-q3',
    categoryId: 'data-protection',
    tier: 'core',
    titleKey: 'pciDss.questions.dpQ3.title',
    tooltipKey: 'pciDss.questions.dpQ3.tooltip',
    helpKey: 'pciDss.questions.dpQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 4.2',
      pciGoal: 'Goal 2',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.dpQ3.maturity.level0',
      level1Key: 'pciDss.questions.dpQ3.maturity.level1',
      level2Key: 'pciDss.questions.dpQ3.maturity.level2',
      level3Key: 'pciDss.questions.dpQ3.maturity.level3',
    },
  },
  {
    id: 'dp-q4',
    categoryId: 'data-protection',
    tier: 'advanced',
    titleKey: 'pciDss.questions.dpQ4.title',
    tooltipKey: 'pciDss.questions.dpQ4.tooltip',
    helpKey: 'pciDss.questions.dpQ4.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 3.4',
      pciGoal: 'Goal 2',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.dpQ4.maturity.level0',
      level1Key: 'pciDss.questions.dpQ4.maturity.level1',
      level2Key: 'pciDss.questions.dpQ4.maturity.level2',
      level3Key: 'pciDss.questions.dpQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Schwachstellenmanagement (Req. 5-6)
  // ============================================================
  {
    id: 'vm-q1',
    categoryId: 'vulnerability-mgmt',
    tier: 'core',
    titleKey: 'pciDss.questions.vmQ1.title',
    tooltipKey: 'pciDss.questions.vmQ1.tooltip',
    helpKey: 'pciDss.questions.vmQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 5.2-5.3',
      pciGoal: 'Goal 3',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.vmQ1.maturity.level0',
      level1Key: 'pciDss.questions.vmQ1.maturity.level1',
      level2Key: 'pciDss.questions.vmQ1.maturity.level2',
      level3Key: 'pciDss.questions.vmQ1.maturity.level3',
    },
  },
  {
    id: 'vm-q2',
    categoryId: 'vulnerability-mgmt',
    tier: 'core',
    titleKey: 'pciDss.questions.vmQ2.title',
    tooltipKey: 'pciDss.questions.vmQ2.tooltip',
    helpKey: 'pciDss.questions.vmQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 6.2',
      pciGoal: 'Goal 3',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.vmQ2.maturity.level0',
      level1Key: 'pciDss.questions.vmQ2.maturity.level1',
      level2Key: 'pciDss.questions.vmQ2.maturity.level2',
      level3Key: 'pciDss.questions.vmQ2.maturity.level3',
    },
  },
  {
    id: 'vm-q3',
    categoryId: 'vulnerability-mgmt',
    tier: 'core',
    titleKey: 'pciDss.questions.vmQ3.title',
    tooltipKey: 'pciDss.questions.vmQ3.tooltip',
    helpKey: 'pciDss.questions.vmQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 6.3',
      pciGoal: 'Goal 3',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.vmQ3.maturity.level0',
      level1Key: 'pciDss.questions.vmQ3.maturity.level1',
      level2Key: 'pciDss.questions.vmQ3.maturity.level2',
      level3Key: 'pciDss.questions.vmQ3.maturity.level3',
    },
  },
  {
    id: 'vm-q4',
    categoryId: 'vulnerability-mgmt',
    tier: 'advanced',
    titleKey: 'pciDss.questions.vmQ4.title',
    tooltipKey: 'pciDss.questions.vmQ4.tooltip',
    helpKey: 'pciDss.questions.vmQ4.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 6.4-6.5',
      pciGoal: 'Goal 3',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.vmQ4.maturity.level0',
      level1Key: 'pciDss.questions.vmQ4.maturity.level1',
      level2Key: 'pciDss.questions.vmQ4.maturity.level2',
      level3Key: 'pciDss.questions.vmQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Zugriffskontrolle (Req. 7)
  // ============================================================
  {
    id: 'ac-q1',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'pciDss.questions.acQ1.title',
    tooltipKey: 'pciDss.questions.acQ1.tooltip',
    helpKey: 'pciDss.questions.acQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 7.1-7.2',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.acQ1.maturity.level0',
      level1Key: 'pciDss.questions.acQ1.maturity.level1',
      level2Key: 'pciDss.questions.acQ1.maturity.level2',
      level3Key: 'pciDss.questions.acQ1.maturity.level3',
    },
  },
  {
    id: 'ac-q2',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'pciDss.questions.acQ2.title',
    tooltipKey: 'pciDss.questions.acQ2.tooltip',
    helpKey: 'pciDss.questions.acQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 7.2',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.acQ2.maturity.level0',
      level1Key: 'pciDss.questions.acQ2.maturity.level1',
      level2Key: 'pciDss.questions.acQ2.maturity.level2',
      level3Key: 'pciDss.questions.acQ2.maturity.level3',
    },
  },
  {
    id: 'ac-q3',
    categoryId: 'access-control',
    tier: 'advanced',
    titleKey: 'pciDss.questions.acQ3.title',
    tooltipKey: 'pciDss.questions.acQ3.tooltip',
    helpKey: 'pciDss.questions.acQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 7.3',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.acQ3.maturity.level0',
      level1Key: 'pciDss.questions.acQ3.maturity.level1',
      level2Key: 'pciDss.questions.acQ3.maturity.level2',
      level3Key: 'pciDss.questions.acQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Authentifizierung (Req. 8)
  // ============================================================
  {
    id: 'au-q1',
    categoryId: 'authentication',
    tier: 'core',
    titleKey: 'pciDss.questions.auQ1.title',
    tooltipKey: 'pciDss.questions.auQ1.tooltip',
    helpKey: 'pciDss.questions.auQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 8.2-8.3',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.auQ1.maturity.level0',
      level1Key: 'pciDss.questions.auQ1.maturity.level1',
      level2Key: 'pciDss.questions.auQ1.maturity.level2',
      level3Key: 'pciDss.questions.auQ1.maturity.level3',
    },
  },
  {
    id: 'au-q2',
    categoryId: 'authentication',
    tier: 'core',
    titleKey: 'pciDss.questions.auQ2.title',
    tooltipKey: 'pciDss.questions.auQ2.tooltip',
    helpKey: 'pciDss.questions.auQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 8.3.6',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.auQ2.maturity.level0',
      level1Key: 'pciDss.questions.auQ2.maturity.level1',
      level2Key: 'pciDss.questions.auQ2.maturity.level2',
      level3Key: 'pciDss.questions.auQ2.maturity.level3',
    },
  },
  {
    id: 'au-q3',
    categoryId: 'authentication',
    tier: 'core',
    titleKey: 'pciDss.questions.auQ3.title',
    tooltipKey: 'pciDss.questions.auQ3.tooltip',
    helpKey: 'pciDss.questions.auQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 8.4',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.auQ3.maturity.level0',
      level1Key: 'pciDss.questions.auQ3.maturity.level1',
      level2Key: 'pciDss.questions.auQ3.maturity.level2',
      level3Key: 'pciDss.questions.auQ3.maturity.level3',
    },
  },
  {
    id: 'au-q4',
    categoryId: 'authentication',
    tier: 'advanced',
    titleKey: 'pciDss.questions.auQ4.title',
    tooltipKey: 'pciDss.questions.auQ4.tooltip',
    helpKey: 'pciDss.questions.auQ4.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 8.5-8.6',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.auQ4.maturity.level0',
      level1Key: 'pciDss.questions.auQ4.maturity.level1',
      level2Key: 'pciDss.questions.auQ4.maturity.level2',
      level3Key: 'pciDss.questions.auQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Physische Sicherheit (Req. 9)
  // ============================================================
  {
    id: 'ps-q1',
    categoryId: 'physical-security',
    tier: 'core',
    titleKey: 'pciDss.questions.psQ1.title',
    tooltipKey: 'pciDss.questions.psQ1.tooltip',
    helpKey: 'pciDss.questions.psQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 9.1-9.2',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.psQ1.maturity.level0',
      level1Key: 'pciDss.questions.psQ1.maturity.level1',
      level2Key: 'pciDss.questions.psQ1.maturity.level2',
      level3Key: 'pciDss.questions.psQ1.maturity.level3',
    },
  },
  {
    id: 'ps-q2',
    categoryId: 'physical-security',
    tier: 'core',
    titleKey: 'pciDss.questions.psQ2.title',
    tooltipKey: 'pciDss.questions.psQ2.tooltip',
    helpKey: 'pciDss.questions.psQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 9.4',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.psQ2.maturity.level0',
      level1Key: 'pciDss.questions.psQ2.maturity.level1',
      level2Key: 'pciDss.questions.psQ2.maturity.level2',
      level3Key: 'pciDss.questions.psQ2.maturity.level3',
    },
  },
  {
    id: 'ps-q3',
    categoryId: 'physical-security',
    tier: 'advanced',
    titleKey: 'pciDss.questions.psQ3.title',
    tooltipKey: 'pciDss.questions.psQ3.tooltip',
    helpKey: 'pciDss.questions.psQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 9.5',
      pciGoal: 'Goal 4',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.psQ3.maturity.level0',
      level1Key: 'pciDss.questions.psQ3.maturity.level1',
      level2Key: 'pciDss.questions.psQ3.maturity.level2',
      level3Key: 'pciDss.questions.psQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Monitoring & Tests (Req. 10-11)
  // ============================================================
  {
    id: 'mt-q1',
    categoryId: 'monitoring-testing',
    tier: 'core',
    titleKey: 'pciDss.questions.mtQ1.title',
    tooltipKey: 'pciDss.questions.mtQ1.tooltip',
    helpKey: 'pciDss.questions.mtQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 10.1-10.3',
      pciGoal: 'Goal 5',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.mtQ1.maturity.level0',
      level1Key: 'pciDss.questions.mtQ1.maturity.level1',
      level2Key: 'pciDss.questions.mtQ1.maturity.level2',
      level3Key: 'pciDss.questions.mtQ1.maturity.level3',
    },
  },
  {
    id: 'mt-q2',
    categoryId: 'monitoring-testing',
    tier: 'core',
    titleKey: 'pciDss.questions.mtQ2.title',
    tooltipKey: 'pciDss.questions.mtQ2.tooltip',
    helpKey: 'pciDss.questions.mtQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 11.3',
      pciGoal: 'Goal 5',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.mtQ2.maturity.level0',
      level1Key: 'pciDss.questions.mtQ2.maturity.level1',
      level2Key: 'pciDss.questions.mtQ2.maturity.level2',
      level3Key: 'pciDss.questions.mtQ2.maturity.level3',
    },
  },
  {
    id: 'mt-q3',
    categoryId: 'monitoring-testing',
    tier: 'core',
    titleKey: 'pciDss.questions.mtQ3.title',
    tooltipKey: 'pciDss.questions.mtQ3.tooltip',
    helpKey: 'pciDss.questions.mtQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 11.4',
      pciGoal: 'Goal 5',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.mtQ3.maturity.level0',
      level1Key: 'pciDss.questions.mtQ3.maturity.level1',
      level2Key: 'pciDss.questions.mtQ3.maturity.level2',
      level3Key: 'pciDss.questions.mtQ3.maturity.level3',
    },
  },
  {
    id: 'mt-q4',
    categoryId: 'monitoring-testing',
    tier: 'advanced',
    titleKey: 'pciDss.questions.mtQ4.title',
    tooltipKey: 'pciDss.questions.mtQ4.tooltip',
    helpKey: 'pciDss.questions.mtQ4.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 10.7',
      pciGoal: 'Goal 5',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.mtQ4.maturity.level0',
      level1Key: 'pciDss.questions.mtQ4.maturity.level1',
      level2Key: 'pciDss.questions.mtQ4.maturity.level2',
      level3Key: 'pciDss.questions.mtQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Sicherheitsrichtlinien (Req. 12)
  // ============================================================
  {
    id: 'sp-q1',
    categoryId: 'security-policy',
    tier: 'core',
    titleKey: 'pciDss.questions.spQ1.title',
    tooltipKey: 'pciDss.questions.spQ1.tooltip',
    helpKey: 'pciDss.questions.spQ1.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 12.1',
      pciGoal: 'Goal 6',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.spQ1.maturity.level0',
      level1Key: 'pciDss.questions.spQ1.maturity.level1',
      level2Key: 'pciDss.questions.spQ1.maturity.level2',
      level3Key: 'pciDss.questions.spQ1.maturity.level3',
    },
  },
  {
    id: 'sp-q2',
    categoryId: 'security-policy',
    tier: 'core',
    titleKey: 'pciDss.questions.spQ2.title',
    tooltipKey: 'pciDss.questions.spQ2.tooltip',
    helpKey: 'pciDss.questions.spQ2.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 12.6',
      pciGoal: 'Goal 6',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.spQ2.maturity.level0',
      level1Key: 'pciDss.questions.spQ2.maturity.level1',
      level2Key: 'pciDss.questions.spQ2.maturity.level2',
      level3Key: 'pciDss.questions.spQ2.maturity.level3',
    },
  },
  {
    id: 'sp-q3',
    categoryId: 'security-policy',
    tier: 'advanced',
    titleKey: 'pciDss.questions.spQ3.title',
    tooltipKey: 'pciDss.questions.spQ3.tooltip',
    helpKey: 'pciDss.questions.spQ3.help',
    legalReference: {
      pciRequirement: 'PCI DSS v4.0 Req. 12.10',
      pciGoal: 'Goal 6',
    },
    maturityDescriptions: {
      level0Key: 'pciDss.questions.spQ3.maturity.level0',
      level1Key: 'pciDss.questions.spQ3.maturity.level1',
      level2Key: 'pciDss.questions.spQ3.maturity.level2',
      level3Key: 'pciDss.questions.spQ3.maturity.level3',
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
