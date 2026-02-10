/**
 * SOC 2 Gap Analysis Questions
 *
 * 25 questions across 7 categories (3-4 per category).
 * Questions target organizations seeking SOC 2 compliance/certification.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Framework basis: AICPA Trust Services Criteria (TSC) 2017/2022
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Sicherheit / Security (Common Criteria CC1-CC9)
  // ============================================================
  {
    id: 'sec-q1',
    categoryId: 'security',
    tier: 'core',
    titleKey: 'soc2.questions.secQ1.title',
    tooltipKey: 'soc2.questions.secQ1.tooltip',
    helpKey: 'soc2.questions.secQ1.help',
    tscReference: {
      tscCriteria: 'CC6.1',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.secQ1.maturity.level0',
      level1Key: 'soc2.questions.secQ1.maturity.level1',
      level2Key: 'soc2.questions.secQ1.maturity.level2',
      level3Key: 'soc2.questions.secQ1.maturity.level3',
    },
  },
  {
    id: 'sec-q2',
    categoryId: 'security',
    tier: 'core',
    titleKey: 'soc2.questions.secQ2.title',
    tooltipKey: 'soc2.questions.secQ2.tooltip',
    helpKey: 'soc2.questions.secQ2.help',
    tscReference: {
      tscCriteria: 'CC6.2, CC6.3',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.secQ2.maturity.level0',
      level1Key: 'soc2.questions.secQ2.maturity.level1',
      level2Key: 'soc2.questions.secQ2.maturity.level2',
      level3Key: 'soc2.questions.secQ2.maturity.level3',
    },
  },
  {
    id: 'sec-q3',
    categoryId: 'security',
    tier: 'core',
    titleKey: 'soc2.questions.secQ3.title',
    tooltipKey: 'soc2.questions.secQ3.tooltip',
    helpKey: 'soc2.questions.secQ3.help',
    tscReference: {
      tscCriteria: 'CC6.6, CC6.7',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.secQ3.maturity.level0',
      level1Key: 'soc2.questions.secQ3.maturity.level1',
      level2Key: 'soc2.questions.secQ3.maturity.level2',
      level3Key: 'soc2.questions.secQ3.maturity.level3',
    },
  },
  {
    id: 'sec-q4',
    categoryId: 'security',
    tier: 'advanced',
    titleKey: 'soc2.questions.secQ4.title',
    tooltipKey: 'soc2.questions.secQ4.tooltip',
    helpKey: 'soc2.questions.secQ4.help',
    tscReference: {
      tscCriteria: 'CC6.8',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.secQ4.maturity.level0',
      level1Key: 'soc2.questions.secQ4.maturity.level1',
      level2Key: 'soc2.questions.secQ4.maturity.level2',
      level3Key: 'soc2.questions.secQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Verfuegbarkeit / Availability (A1.1-A1.3)
  // ============================================================
  {
    id: 'avl-q1',
    categoryId: 'availability',
    tier: 'core',
    titleKey: 'soc2.questions.avlQ1.title',
    tooltipKey: 'soc2.questions.avlQ1.tooltip',
    helpKey: 'soc2.questions.avlQ1.help',
    tscReference: {
      tscCriteria: 'A1.1',
      tscCategory: 'Availability',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.avlQ1.maturity.level0',
      level1Key: 'soc2.questions.avlQ1.maturity.level1',
      level2Key: 'soc2.questions.avlQ1.maturity.level2',
      level3Key: 'soc2.questions.avlQ1.maturity.level3',
    },
  },
  {
    id: 'avl-q2',
    categoryId: 'availability',
    tier: 'core',
    titleKey: 'soc2.questions.avlQ2.title',
    tooltipKey: 'soc2.questions.avlQ2.tooltip',
    helpKey: 'soc2.questions.avlQ2.help',
    tscReference: {
      tscCriteria: 'A1.2',
      tscCategory: 'Availability',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.avlQ2.maturity.level0',
      level1Key: 'soc2.questions.avlQ2.maturity.level1',
      level2Key: 'soc2.questions.avlQ2.maturity.level2',
      level3Key: 'soc2.questions.avlQ2.maturity.level3',
    },
  },
  {
    id: 'avl-q3',
    categoryId: 'availability',
    tier: 'core',
    titleKey: 'soc2.questions.avlQ3.title',
    tooltipKey: 'soc2.questions.avlQ3.tooltip',
    helpKey: 'soc2.questions.avlQ3.help',
    tscReference: {
      tscCriteria: 'A1.3',
      tscCategory: 'Availability',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.avlQ3.maturity.level0',
      level1Key: 'soc2.questions.avlQ3.maturity.level1',
      level2Key: 'soc2.questions.avlQ3.maturity.level2',
      level3Key: 'soc2.questions.avlQ3.maturity.level3',
    },
  },
  {
    id: 'avl-q4',
    categoryId: 'availability',
    tier: 'advanced',
    titleKey: 'soc2.questions.avlQ4.title',
    tooltipKey: 'soc2.questions.avlQ4.tooltip',
    helpKey: 'soc2.questions.avlQ4.help',
    tscReference: {
      tscCriteria: 'A1.2, A1.3',
      tscCategory: 'Availability',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.avlQ4.maturity.level0',
      level1Key: 'soc2.questions.avlQ4.maturity.level1',
      level2Key: 'soc2.questions.avlQ4.maturity.level2',
      level3Key: 'soc2.questions.avlQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Verarbeitungsintegritaet / Processing Integrity (PI1.1-PI1.5)
  // ============================================================
  {
    id: 'pi-q1',
    categoryId: 'processing-integrity',
    tier: 'core',
    titleKey: 'soc2.questions.piQ1.title',
    tooltipKey: 'soc2.questions.piQ1.tooltip',
    helpKey: 'soc2.questions.piQ1.help',
    tscReference: {
      tscCriteria: 'PI1.1',
      tscCategory: 'Processing Integrity',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.piQ1.maturity.level0',
      level1Key: 'soc2.questions.piQ1.maturity.level1',
      level2Key: 'soc2.questions.piQ1.maturity.level2',
      level3Key: 'soc2.questions.piQ1.maturity.level3',
    },
  },
  {
    id: 'pi-q2',
    categoryId: 'processing-integrity',
    tier: 'core',
    titleKey: 'soc2.questions.piQ2.title',
    tooltipKey: 'soc2.questions.piQ2.tooltip',
    helpKey: 'soc2.questions.piQ2.help',
    tscReference: {
      tscCriteria: 'PI1.2, PI1.3',
      tscCategory: 'Processing Integrity',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.piQ2.maturity.level0',
      level1Key: 'soc2.questions.piQ2.maturity.level1',
      level2Key: 'soc2.questions.piQ2.maturity.level2',
      level3Key: 'soc2.questions.piQ2.maturity.level3',
    },
  },
  {
    id: 'pi-q3',
    categoryId: 'processing-integrity',
    tier: 'advanced',
    titleKey: 'soc2.questions.piQ3.title',
    tooltipKey: 'soc2.questions.piQ3.tooltip',
    helpKey: 'soc2.questions.piQ3.help',
    tscReference: {
      tscCriteria: 'PI1.4, PI1.5',
      tscCategory: 'Processing Integrity',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.piQ3.maturity.level0',
      level1Key: 'soc2.questions.piQ3.maturity.level1',
      level2Key: 'soc2.questions.piQ3.maturity.level2',
      level3Key: 'soc2.questions.piQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Vertraulichkeit / Confidentiality (C1.1-C1.2)
  // ============================================================
  {
    id: 'conf-q1',
    categoryId: 'confidentiality',
    tier: 'core',
    titleKey: 'soc2.questions.confQ1.title',
    tooltipKey: 'soc2.questions.confQ1.tooltip',
    helpKey: 'soc2.questions.confQ1.help',
    tscReference: {
      tscCriteria: 'C1.1',
      tscCategory: 'Confidentiality',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.confQ1.maturity.level0',
      level1Key: 'soc2.questions.confQ1.maturity.level1',
      level2Key: 'soc2.questions.confQ1.maturity.level2',
      level3Key: 'soc2.questions.confQ1.maturity.level3',
    },
  },
  {
    id: 'conf-q2',
    categoryId: 'confidentiality',
    tier: 'core',
    titleKey: 'soc2.questions.confQ2.title',
    tooltipKey: 'soc2.questions.confQ2.tooltip',
    helpKey: 'soc2.questions.confQ2.help',
    tscReference: {
      tscCriteria: 'C1.2',
      tscCategory: 'Confidentiality',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.confQ2.maturity.level0',
      level1Key: 'soc2.questions.confQ2.maturity.level1',
      level2Key: 'soc2.questions.confQ2.maturity.level2',
      level3Key: 'soc2.questions.confQ2.maturity.level3',
    },
  },
  {
    id: 'conf-q3',
    categoryId: 'confidentiality',
    tier: 'advanced',
    titleKey: 'soc2.questions.confQ3.title',
    tooltipKey: 'soc2.questions.confQ3.tooltip',
    helpKey: 'soc2.questions.confQ3.help',
    tscReference: {
      tscCriteria: 'C1.1, C1.2',
      tscCategory: 'Confidentiality',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.confQ3.maturity.level0',
      level1Key: 'soc2.questions.confQ3.maturity.level1',
      level2Key: 'soc2.questions.confQ3.maturity.level2',
      level3Key: 'soc2.questions.confQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Datenschutz / Privacy (P1-P8)
  // ============================================================
  {
    id: 'priv-q1',
    categoryId: 'privacy',
    tier: 'core',
    titleKey: 'soc2.questions.privQ1.title',
    tooltipKey: 'soc2.questions.privQ1.tooltip',
    helpKey: 'soc2.questions.privQ1.help',
    tscReference: {
      tscCriteria: 'P1.1, P2.1',
      tscCategory: 'Privacy',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.privQ1.maturity.level0',
      level1Key: 'soc2.questions.privQ1.maturity.level1',
      level2Key: 'soc2.questions.privQ1.maturity.level2',
      level3Key: 'soc2.questions.privQ1.maturity.level3',
    },
  },
  {
    id: 'priv-q2',
    categoryId: 'privacy',
    tier: 'core',
    titleKey: 'soc2.questions.privQ2.title',
    tooltipKey: 'soc2.questions.privQ2.tooltip',
    helpKey: 'soc2.questions.privQ2.help',
    tscReference: {
      tscCriteria: 'P3.1, P3.2',
      tscCategory: 'Privacy',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.privQ2.maturity.level0',
      level1Key: 'soc2.questions.privQ2.maturity.level1',
      level2Key: 'soc2.questions.privQ2.maturity.level2',
      level3Key: 'soc2.questions.privQ2.maturity.level3',
    },
  },
  {
    id: 'priv-q3',
    categoryId: 'privacy',
    tier: 'core',
    titleKey: 'soc2.questions.privQ3.title',
    tooltipKey: 'soc2.questions.privQ3.tooltip',
    helpKey: 'soc2.questions.privQ3.help',
    tscReference: {
      tscCriteria: 'P4.1, P4.2, P4.3',
      tscCategory: 'Privacy',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.privQ3.maturity.level0',
      level1Key: 'soc2.questions.privQ3.maturity.level1',
      level2Key: 'soc2.questions.privQ3.maturity.level2',
      level3Key: 'soc2.questions.privQ3.maturity.level3',
    },
  },
  {
    id: 'priv-q4',
    categoryId: 'privacy',
    tier: 'advanced',
    titleKey: 'soc2.questions.privQ4.title',
    tooltipKey: 'soc2.questions.privQ4.tooltip',
    helpKey: 'soc2.questions.privQ4.help',
    tscReference: {
      tscCriteria: 'P6.1, P6.7, P8.1',
      tscCategory: 'Privacy',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.privQ4.maturity.level0',
      level1Key: 'soc2.questions.privQ4.maturity.level1',
      level2Key: 'soc2.questions.privQ4.maturity.level2',
      level3Key: 'soc2.questions.privQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Monitoring & Logging (CC7-CC8)
  // ============================================================
  {
    id: 'mon-q1',
    categoryId: 'monitoring',
    tier: 'core',
    titleKey: 'soc2.questions.monQ1.title',
    tooltipKey: 'soc2.questions.monQ1.tooltip',
    helpKey: 'soc2.questions.monQ1.help',
    tscReference: {
      tscCriteria: 'CC7.1, CC7.2',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.monQ1.maturity.level0',
      level1Key: 'soc2.questions.monQ1.maturity.level1',
      level2Key: 'soc2.questions.monQ1.maturity.level2',
      level3Key: 'soc2.questions.monQ1.maturity.level3',
    },
  },
  {
    id: 'mon-q2',
    categoryId: 'monitoring',
    tier: 'core',
    titleKey: 'soc2.questions.monQ2.title',
    tooltipKey: 'soc2.questions.monQ2.tooltip',
    helpKey: 'soc2.questions.monQ2.help',
    tscReference: {
      tscCriteria: 'CC7.3, CC7.4',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.monQ2.maturity.level0',
      level1Key: 'soc2.questions.monQ2.maturity.level1',
      level2Key: 'soc2.questions.monQ2.maturity.level2',
      level3Key: 'soc2.questions.monQ2.maturity.level3',
    },
  },
  {
    id: 'mon-q3',
    categoryId: 'monitoring',
    tier: 'advanced',
    titleKey: 'soc2.questions.monQ3.title',
    tooltipKey: 'soc2.questions.monQ3.tooltip',
    helpKey: 'soc2.questions.monQ3.help',
    tscReference: {
      tscCriteria: 'CC7.5, CC8.1',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.monQ3.maturity.level0',
      level1Key: 'soc2.questions.monQ3.maturity.level1',
      level2Key: 'soc2.questions.monQ3.maturity.level2',
      level3Key: 'soc2.questions.monQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Risikomanagement & Governance (CC1-CC3)
  // ============================================================
  {
    id: 'gov-q1',
    categoryId: 'risk-management',
    tier: 'core',
    titleKey: 'soc2.questions.govQ1.title',
    tooltipKey: 'soc2.questions.govQ1.tooltip',
    helpKey: 'soc2.questions.govQ1.help',
    tscReference: {
      tscCriteria: 'CC1.1, CC1.2',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.govQ1.maturity.level0',
      level1Key: 'soc2.questions.govQ1.maturity.level1',
      level2Key: 'soc2.questions.govQ1.maturity.level2',
      level3Key: 'soc2.questions.govQ1.maturity.level3',
    },
  },
  {
    id: 'gov-q2',
    categoryId: 'risk-management',
    tier: 'core',
    titleKey: 'soc2.questions.govQ2.title',
    tooltipKey: 'soc2.questions.govQ2.tooltip',
    helpKey: 'soc2.questions.govQ2.help',
    tscReference: {
      tscCriteria: 'CC2.1, CC2.2, CC2.3',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.govQ2.maturity.level0',
      level1Key: 'soc2.questions.govQ2.maturity.level1',
      level2Key: 'soc2.questions.govQ2.maturity.level2',
      level3Key: 'soc2.questions.govQ2.maturity.level3',
    },
  },
  {
    id: 'gov-q3',
    categoryId: 'risk-management',
    tier: 'core',
    titleKey: 'soc2.questions.govQ3.title',
    tooltipKey: 'soc2.questions.govQ3.tooltip',
    helpKey: 'soc2.questions.govQ3.help',
    tscReference: {
      tscCriteria: 'CC3.1, CC3.2',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.govQ3.maturity.level0',
      level1Key: 'soc2.questions.govQ3.maturity.level1',
      level2Key: 'soc2.questions.govQ3.maturity.level2',
      level3Key: 'soc2.questions.govQ3.maturity.level3',
    },
  },
  {
    id: 'gov-q4',
    categoryId: 'risk-management',
    tier: 'advanced',
    titleKey: 'soc2.questions.govQ4.title',
    tooltipKey: 'soc2.questions.govQ4.tooltip',
    helpKey: 'soc2.questions.govQ4.help',
    tscReference: {
      tscCriteria: 'CC3.3, CC3.4',
      tscCategory: 'Common Criteria',
    },
    maturityDescriptions: {
      level0Key: 'soc2.questions.govQ4.maturity.level0',
      level1Key: 'soc2.questions.govQ4.maturity.level1',
      level2Key: 'soc2.questions.govQ4.maturity.level2',
      level3Key: 'soc2.questions.govQ4.maturity.level3',
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
