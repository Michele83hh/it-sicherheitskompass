/**
 * KRITIS Gap Analysis Questions
 *
 * 30 questions across 8 categories, mix of 3-4 per category.
 * Questions target KRITIS operators (critical infrastructure).
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Legal basis: §8a, §8b BSI-Gesetz; BSI-KritisV
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: BSI-Kontaktstelle (§8b BSI-Gesetz)
  // ============================================================
  {
    id: 'bsi-q1',
    categoryId: 'bsi-kontaktstelle',
    tier: 'core',
    titleKey: 'kritis.questions.bsiQ1.title',
    tooltipKey: 'kritis.questions.bsiQ1.tooltip',
    helpKey: 'kritis.questions.bsiQ1.help',
    legalReference: {
      euArticle: '§8b Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV §3',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bsiQ1.maturity.level0',
      level1Key: 'kritis.questions.bsiQ1.maturity.level1',
      level2Key: 'kritis.questions.bsiQ1.maturity.level2',
      level3Key: 'kritis.questions.bsiQ1.maturity.level3',
    },
  },
  {
    id: 'bsi-q2',
    categoryId: 'bsi-kontaktstelle',
    tier: 'core',
    titleKey: 'kritis.questions.bsiQ2.title',
    tooltipKey: 'kritis.questions.bsiQ2.tooltip',
    helpKey: 'kritis.questions.bsiQ2.help',
    legalReference: {
      euArticle: '§8b Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV §3',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bsiQ2.maturity.level0',
      level1Key: 'kritis.questions.bsiQ2.maturity.level1',
      level2Key: 'kritis.questions.bsiQ2.maturity.level2',
      level3Key: 'kritis.questions.bsiQ2.maturity.level3',
    },
  },
  {
    id: 'bsi-q3',
    categoryId: 'bsi-kontaktstelle',
    tier: 'core',
    titleKey: 'kritis.questions.bsiQ3.title',
    tooltipKey: 'kritis.questions.bsiQ3.tooltip',
    helpKey: 'kritis.questions.bsiQ3.help',
    legalReference: {
      euArticle: '§8b Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV §3',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bsiQ3.maturity.level0',
      level1Key: 'kritis.questions.bsiQ3.maturity.level1',
      level2Key: 'kritis.questions.bsiQ3.maturity.level2',
      level3Key: 'kritis.questions.bsiQ3.maturity.level3',
    },
  },
  {
    id: 'bsi-q4',
    categoryId: 'bsi-kontaktstelle',
    tier: 'advanced',
    titleKey: 'kritis.questions.bsiQ4.title',
    tooltipKey: 'kritis.questions.bsiQ4.tooltip',
    helpKey: 'kritis.questions.bsiQ4.help',
    legalReference: {
      euArticle: '§8b Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV §3',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bsiQ4.maturity.level0',
      level1Key: 'kritis.questions.bsiQ4.maturity.level1',
      level2Key: 'kritis.questions.bsiQ4.maturity.level2',
      level3Key: 'kritis.questions.bsiQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: IT-Risikomanagement (§8a Abs. 1)
  // ============================================================
  {
    id: 'rm-q1',
    categoryId: 'risikomanagement',
    tier: 'core',
    titleKey: 'kritis.questions.rmQ1.title',
    tooltipKey: 'kritis.questions.rmQ1.tooltip',
    helpKey: 'kritis.questions.rmQ1.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.rmQ1.maturity.level0',
      level1Key: 'kritis.questions.rmQ1.maturity.level1',
      level2Key: 'kritis.questions.rmQ1.maturity.level2',
      level3Key: 'kritis.questions.rmQ1.maturity.level3',
    },
  },
  {
    id: 'rm-q2',
    categoryId: 'risikomanagement',
    tier: 'core',
    titleKey: 'kritis.questions.rmQ2.title',
    tooltipKey: 'kritis.questions.rmQ2.tooltip',
    helpKey: 'kritis.questions.rmQ2.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.rmQ2.maturity.level0',
      level1Key: 'kritis.questions.rmQ2.maturity.level1',
      level2Key: 'kritis.questions.rmQ2.maturity.level2',
      level3Key: 'kritis.questions.rmQ2.maturity.level3',
    },
  },
  {
    id: 'rm-q3',
    categoryId: 'risikomanagement',
    tier: 'core',
    titleKey: 'kritis.questions.rmQ3.title',
    tooltipKey: 'kritis.questions.rmQ3.tooltip',
    helpKey: 'kritis.questions.rmQ3.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.rmQ3.maturity.level0',
      level1Key: 'kritis.questions.rmQ3.maturity.level1',
      level2Key: 'kritis.questions.rmQ3.maturity.level2',
      level3Key: 'kritis.questions.rmQ3.maturity.level3',
    },
  },
  {
    id: 'rm-q4',
    categoryId: 'risikomanagement',
    tier: 'advanced',
    titleKey: 'kritis.questions.rmQ4.title',
    tooltipKey: 'kritis.questions.rmQ4.tooltip',
    helpKey: 'kritis.questions.rmQ4.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.rmQ4.maturity.level0',
      level1Key: 'kritis.questions.rmQ4.maturity.level1',
      level2Key: 'kritis.questions.rmQ4.maturity.level2',
      level3Key: 'kritis.questions.rmQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Vorfallmanagement (§8b Abs. 4)
  // ============================================================
  {
    id: 'vm-q1',
    categoryId: 'vorfallmanagement',
    tier: 'core',
    titleKey: 'kritis.questions.vmQ1.title',
    tooltipKey: 'kritis.questions.vmQ1.tooltip',
    helpKey: 'kritis.questions.vmQ1.help',
    legalReference: {
      euArticle: '§8b Abs. 4 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.vmQ1.maturity.level0',
      level1Key: 'kritis.questions.vmQ1.maturity.level1',
      level2Key: 'kritis.questions.vmQ1.maturity.level2',
      level3Key: 'kritis.questions.vmQ1.maturity.level3',
    },
  },
  {
    id: 'vm-q2',
    categoryId: 'vorfallmanagement',
    tier: 'core',
    titleKey: 'kritis.questions.vmQ2.title',
    tooltipKey: 'kritis.questions.vmQ2.tooltip',
    helpKey: 'kritis.questions.vmQ2.help',
    legalReference: {
      euArticle: '§8b Abs. 4 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.vmQ2.maturity.level0',
      level1Key: 'kritis.questions.vmQ2.maturity.level1',
      level2Key: 'kritis.questions.vmQ2.maturity.level2',
      level3Key: 'kritis.questions.vmQ2.maturity.level3',
    },
  },
  {
    id: 'vm-q3',
    categoryId: 'vorfallmanagement',
    tier: 'core',
    titleKey: 'kritis.questions.vmQ3.title',
    tooltipKey: 'kritis.questions.vmQ3.tooltip',
    helpKey: 'kritis.questions.vmQ3.help',
    legalReference: {
      euArticle: '§8b Abs. 4 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.vmQ3.maturity.level0',
      level1Key: 'kritis.questions.vmQ3.maturity.level1',
      level2Key: 'kritis.questions.vmQ3.maturity.level2',
      level3Key: 'kritis.questions.vmQ3.maturity.level3',
    },
  },
  {
    id: 'vm-q4',
    categoryId: 'vorfallmanagement',
    tier: 'advanced',
    titleKey: 'kritis.questions.vmQ4.title',
    tooltipKey: 'kritis.questions.vmQ4.tooltip',
    helpKey: 'kritis.questions.vmQ4.help',
    legalReference: {
      euArticle: '§8b Abs. 4 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.vmQ4.maturity.level0',
      level1Key: 'kritis.questions.vmQ4.maturity.level1',
      level2Key: 'kritis.questions.vmQ4.maturity.level2',
      level3Key: 'kritis.questions.vmQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Business Continuity Management (§8a Abs. 1)
  // ============================================================
  {
    id: 'bcm-q1',
    categoryId: 'bcm',
    tier: 'core',
    titleKey: 'kritis.questions.bcmQ1.title',
    tooltipKey: 'kritis.questions.bcmQ1.tooltip',
    helpKey: 'kritis.questions.bcmQ1.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bcmQ1.maturity.level0',
      level1Key: 'kritis.questions.bcmQ1.maturity.level1',
      level2Key: 'kritis.questions.bcmQ1.maturity.level2',
      level3Key: 'kritis.questions.bcmQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-q2',
    categoryId: 'bcm',
    tier: 'core',
    titleKey: 'kritis.questions.bcmQ2.title',
    tooltipKey: 'kritis.questions.bcmQ2.tooltip',
    helpKey: 'kritis.questions.bcmQ2.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bcmQ2.maturity.level0',
      level1Key: 'kritis.questions.bcmQ2.maturity.level1',
      level2Key: 'kritis.questions.bcmQ2.maturity.level2',
      level3Key: 'kritis.questions.bcmQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-q3',
    categoryId: 'bcm',
    tier: 'core',
    titleKey: 'kritis.questions.bcmQ3.title',
    tooltipKey: 'kritis.questions.bcmQ3.tooltip',
    helpKey: 'kritis.questions.bcmQ3.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bcmQ3.maturity.level0',
      level1Key: 'kritis.questions.bcmQ3.maturity.level1',
      level2Key: 'kritis.questions.bcmQ3.maturity.level2',
      level3Key: 'kritis.questions.bcmQ3.maturity.level3',
    },
  },
  {
    id: 'bcm-q4',
    categoryId: 'bcm',
    tier: 'advanced',
    titleKey: 'kritis.questions.bcmQ4.title',
    tooltipKey: 'kritis.questions.bcmQ4.tooltip',
    helpKey: 'kritis.questions.bcmQ4.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.bcmQ4.maturity.level0',
      level1Key: 'kritis.questions.bcmQ4.maturity.level1',
      level2Key: 'kritis.questions.bcmQ4.maturity.level2',
      level3Key: 'kritis.questions.bcmQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Lieferketten-Sicherheit (§8a Abs. 1)
  // ============================================================
  {
    id: 'lk-q1',
    categoryId: 'lieferkette',
    tier: 'core',
    titleKey: 'kritis.questions.lkQ1.title',
    tooltipKey: 'kritis.questions.lkQ1.tooltip',
    helpKey: 'kritis.questions.lkQ1.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.lkQ1.maturity.level0',
      level1Key: 'kritis.questions.lkQ1.maturity.level1',
      level2Key: 'kritis.questions.lkQ1.maturity.level2',
      level3Key: 'kritis.questions.lkQ1.maturity.level3',
    },
  },
  {
    id: 'lk-q2',
    categoryId: 'lieferkette',
    tier: 'core',
    titleKey: 'kritis.questions.lkQ2.title',
    tooltipKey: 'kritis.questions.lkQ2.tooltip',
    helpKey: 'kritis.questions.lkQ2.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.lkQ2.maturity.level0',
      level1Key: 'kritis.questions.lkQ2.maturity.level1',
      level2Key: 'kritis.questions.lkQ2.maturity.level2',
      level3Key: 'kritis.questions.lkQ2.maturity.level3',
    },
  },
  {
    id: 'lk-q3',
    categoryId: 'lieferkette',
    tier: 'core',
    titleKey: 'kritis.questions.lkQ3.title',
    tooltipKey: 'kritis.questions.lkQ3.tooltip',
    helpKey: 'kritis.questions.lkQ3.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.lkQ3.maturity.level0',
      level1Key: 'kritis.questions.lkQ3.maturity.level1',
      level2Key: 'kritis.questions.lkQ3.maturity.level2',
      level3Key: 'kritis.questions.lkQ3.maturity.level3',
    },
  },
  {
    id: 'lk-q4',
    categoryId: 'lieferkette',
    tier: 'advanced',
    titleKey: 'kritis.questions.lkQ4.title',
    tooltipKey: 'kritis.questions.lkQ4.tooltip',
    helpKey: 'kritis.questions.lkQ4.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.lkQ4.maturity.level0',
      level1Key: 'kritis.questions.lkQ4.maturity.level1',
      level2Key: 'kritis.questions.lkQ4.maturity.level2',
      level3Key: 'kritis.questions.lkQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Audit-Vorbereitung (§8a Abs. 3)
  // ============================================================
  {
    id: 'au-q1',
    categoryId: 'audit',
    tier: 'core',
    titleKey: 'kritis.questions.auQ1.title',
    tooltipKey: 'kritis.questions.auQ1.tooltip',
    helpKey: 'kritis.questions.auQ1.help',
    legalReference: {
      euArticle: '§8a Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.auQ1.maturity.level0',
      level1Key: 'kritis.questions.auQ1.maturity.level1',
      level2Key: 'kritis.questions.auQ1.maturity.level2',
      level3Key: 'kritis.questions.auQ1.maturity.level3',
    },
  },
  {
    id: 'au-q2',
    categoryId: 'audit',
    tier: 'core',
    titleKey: 'kritis.questions.auQ2.title',
    tooltipKey: 'kritis.questions.auQ2.tooltip',
    helpKey: 'kritis.questions.auQ2.help',
    legalReference: {
      euArticle: '§8a Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.auQ2.maturity.level0',
      level1Key: 'kritis.questions.auQ2.maturity.level1',
      level2Key: 'kritis.questions.auQ2.maturity.level2',
      level3Key: 'kritis.questions.auQ2.maturity.level3',
    },
  },
  {
    id: 'au-q3',
    categoryId: 'audit',
    tier: 'core',
    titleKey: 'kritis.questions.auQ3.title',
    tooltipKey: 'kritis.questions.auQ3.tooltip',
    helpKey: 'kritis.questions.auQ3.help',
    legalReference: {
      euArticle: '§8a Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.auQ3.maturity.level0',
      level1Key: 'kritis.questions.auQ3.maturity.level1',
      level2Key: 'kritis.questions.auQ3.maturity.level2',
      level3Key: 'kritis.questions.auQ3.maturity.level3',
    },
  },
  {
    id: 'au-q4',
    categoryId: 'audit',
    tier: 'advanced',
    titleKey: 'kritis.questions.auQ4.title',
    tooltipKey: 'kritis.questions.auQ4.tooltip',
    helpKey: 'kritis.questions.auQ4.help',
    legalReference: {
      euArticle: '§8a Abs. 3 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.auQ4.maturity.level0',
      level1Key: 'kritis.questions.auQ4.maturity.level1',
      level2Key: 'kritis.questions.auQ4.maturity.level2',
      level3Key: 'kritis.questions.auQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Physische Sicherheit (§8a Abs. 1)
  // ============================================================
  {
    id: 'ps-q1',
    categoryId: 'physische-sicherheit',
    tier: 'core',
    titleKey: 'kritis.questions.psQ1.title',
    tooltipKey: 'kritis.questions.psQ1.tooltip',
    helpKey: 'kritis.questions.psQ1.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.psQ1.maturity.level0',
      level1Key: 'kritis.questions.psQ1.maturity.level1',
      level2Key: 'kritis.questions.psQ1.maturity.level2',
      level3Key: 'kritis.questions.psQ1.maturity.level3',
    },
  },
  {
    id: 'ps-q2',
    categoryId: 'physische-sicherheit',
    tier: 'core',
    titleKey: 'kritis.questions.psQ2.title',
    tooltipKey: 'kritis.questions.psQ2.tooltip',
    helpKey: 'kritis.questions.psQ2.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.psQ2.maturity.level0',
      level1Key: 'kritis.questions.psQ2.maturity.level1',
      level2Key: 'kritis.questions.psQ2.maturity.level2',
      level3Key: 'kritis.questions.psQ2.maturity.level3',
    },
  },
  {
    id: 'ps-q3',
    categoryId: 'physische-sicherheit',
    tier: 'advanced',
    titleKey: 'kritis.questions.psQ3.title',
    tooltipKey: 'kritis.questions.psQ3.tooltip',
    helpKey: 'kritis.questions.psQ3.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.psQ3.maturity.level0',
      level1Key: 'kritis.questions.psQ3.maturity.level1',
      level2Key: 'kritis.questions.psQ3.maturity.level2',
      level3Key: 'kritis.questions.psQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Systemhaertung & Netzwerk (§8a Abs. 1)
  // ============================================================
  {
    id: 'sh-q1',
    categoryId: 'systemhaertung',
    tier: 'core',
    titleKey: 'kritis.questions.shQ1.title',
    tooltipKey: 'kritis.questions.shQ1.tooltip',
    helpKey: 'kritis.questions.shQ1.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.shQ1.maturity.level0',
      level1Key: 'kritis.questions.shQ1.maturity.level1',
      level2Key: 'kritis.questions.shQ1.maturity.level2',
      level3Key: 'kritis.questions.shQ1.maturity.level3',
    },
  },
  {
    id: 'sh-q2',
    categoryId: 'systemhaertung',
    tier: 'core',
    titleKey: 'kritis.questions.shQ2.title',
    tooltipKey: 'kritis.questions.shQ2.tooltip',
    helpKey: 'kritis.questions.shQ2.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.shQ2.maturity.level0',
      level1Key: 'kritis.questions.shQ2.maturity.level1',
      level2Key: 'kritis.questions.shQ2.maturity.level2',
      level3Key: 'kritis.questions.shQ2.maturity.level3',
    },
  },
  {
    id: 'sh-q3',
    categoryId: 'systemhaertung',
    tier: 'advanced',
    titleKey: 'kritis.questions.shQ3.title',
    tooltipKey: 'kritis.questions.shQ3.tooltip',
    helpKey: 'kritis.questions.shQ3.help',
    legalReference: {
      euArticle: '§8a Abs. 1 BSI-Gesetz',
      bsigParagraph: 'BSI-KritisV',
    },
    maturityDescriptions: {
      level0Key: 'kritis.questions.shQ3.maturity.level0',
      level1Key: 'kritis.questions.shQ3.maturity.level1',
      level2Key: 'kritis.questions.shQ3.maturity.level2',
      level3Key: 'kritis.questions.shQ3.maturity.level3',
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
