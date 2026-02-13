/**
 * OWASP ASVS 4.0 Gap Analysis Questions
 *
 * 18 questions across 6 categories, 3 per category.
 * Questions target developer/team-lead level - clear, actionable wording.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Maturity levels:
 *   0 = Nothing exists
 *   1 = Informal/ad-hoc
 *   2 = Documented but not systematic
 *   3 = Systematic, regularly tested, standards-based
 *
 * Legal basis: OWASP Application Security Verification Standard 4.0.3
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Authentication (V2)
  // ============================================================
  {
    id: 'owasp-auth-q1',
    categoryId: 'authentication',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.authQ1.title',
    tooltipKey: 'owasp-asvs.questions.authQ1.tooltip',
    helpKey: 'owasp-asvs.questions.authQ1.help',
    legalReference: {
      asvsChapter: 'ASVS V2: Authentication',
      asvsRequirement: 'V2.1.1, V2.1.2, V2.1.7',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.authQ1.maturity.level0',
      level1Key: 'owasp-asvs.questions.authQ1.maturity.level1',
      level2Key: 'owasp-asvs.questions.authQ1.maturity.level2',
      level3Key: 'owasp-asvs.questions.authQ1.maturity.level3',
    },
  },
  {
    id: 'owasp-auth-q2',
    categoryId: 'authentication',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.authQ2.title',
    tooltipKey: 'owasp-asvs.questions.authQ2.tooltip',
    helpKey: 'owasp-asvs.questions.authQ2.help',
    legalReference: {
      asvsChapter: 'ASVS V2: Authentication',
      asvsRequirement: 'V2.8.1, V2.8.2, V2.8.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.authQ2.maturity.level0',
      level1Key: 'owasp-asvs.questions.authQ2.maturity.level1',
      level2Key: 'owasp-asvs.questions.authQ2.maturity.level2',
      level3Key: 'owasp-asvs.questions.authQ2.maturity.level3',
    },
  },
  {
    id: 'owasp-auth-q3',
    categoryId: 'authentication',
    tier: 'advanced',
    titleKey: 'owasp-asvs.questions.authQ3.title',
    tooltipKey: 'owasp-asvs.questions.authQ3.tooltip',
    helpKey: 'owasp-asvs.questions.authQ3.help',
    legalReference: {
      asvsChapter: 'ASVS V2: Authentication',
      asvsRequirement: 'V2.2.1, V2.5.1, V2.5.4',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.authQ3.maturity.level0',
      level1Key: 'owasp-asvs.questions.authQ3.maturity.level1',
      level2Key: 'owasp-asvs.questions.authQ3.maturity.level2',
      level3Key: 'owasp-asvs.questions.authQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Session Management (V3)
  // ============================================================
  {
    id: 'owasp-sess-q1',
    categoryId: 'session-mgmt',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.sessQ1.title',
    tooltipKey: 'owasp-asvs.questions.sessQ1.tooltip',
    helpKey: 'owasp-asvs.questions.sessQ1.help',
    legalReference: {
      asvsChapter: 'ASVS V3: Session Management',
      asvsRequirement: 'V3.2.1, V3.2.2, V3.2.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.sessQ1.maturity.level0',
      level1Key: 'owasp-asvs.questions.sessQ1.maturity.level1',
      level2Key: 'owasp-asvs.questions.sessQ1.maturity.level2',
      level3Key: 'owasp-asvs.questions.sessQ1.maturity.level3',
    },
  },
  {
    id: 'owasp-sess-q2',
    categoryId: 'session-mgmt',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.sessQ2.title',
    tooltipKey: 'owasp-asvs.questions.sessQ2.tooltip',
    helpKey: 'owasp-asvs.questions.sessQ2.help',
    legalReference: {
      asvsChapter: 'ASVS V3: Session Management',
      asvsRequirement: 'V3.3.1, V3.3.2, V3.3.4',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.sessQ2.maturity.level0',
      level1Key: 'owasp-asvs.questions.sessQ2.maturity.level1',
      level2Key: 'owasp-asvs.questions.sessQ2.maturity.level2',
      level3Key: 'owasp-asvs.questions.sessQ2.maturity.level3',
    },
  },
  {
    id: 'owasp-sess-q3',
    categoryId: 'session-mgmt',
    tier: 'advanced',
    titleKey: 'owasp-asvs.questions.sessQ3.title',
    tooltipKey: 'owasp-asvs.questions.sessQ3.tooltip',
    helpKey: 'owasp-asvs.questions.sessQ3.help',
    legalReference: {
      asvsChapter: 'ASVS V3: Session Management',
      asvsRequirement: 'V3.5.1, V3.5.2, V3.5.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.sessQ3.maturity.level0',
      level1Key: 'owasp-asvs.questions.sessQ3.maturity.level1',
      level2Key: 'owasp-asvs.questions.sessQ3.maturity.level2',
      level3Key: 'owasp-asvs.questions.sessQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Access Control (V4)
  // ============================================================
  {
    id: 'owasp-ac-q1',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.acQ1.title',
    tooltipKey: 'owasp-asvs.questions.acQ1.tooltip',
    helpKey: 'owasp-asvs.questions.acQ1.help',
    legalReference: {
      asvsChapter: 'ASVS V4: Access Control',
      asvsRequirement: 'V4.1.1, V4.1.2, V4.1.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.acQ1.maturity.level0',
      level1Key: 'owasp-asvs.questions.acQ1.maturity.level1',
      level2Key: 'owasp-asvs.questions.acQ1.maturity.level2',
      level3Key: 'owasp-asvs.questions.acQ1.maturity.level3',
    },
  },
  {
    id: 'owasp-ac-q2',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.acQ2.title',
    tooltipKey: 'owasp-asvs.questions.acQ2.tooltip',
    helpKey: 'owasp-asvs.questions.acQ2.help',
    legalReference: {
      asvsChapter: 'ASVS V4: Access Control',
      asvsRequirement: 'V4.2.1, V4.2.2',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.acQ2.maturity.level0',
      level1Key: 'owasp-asvs.questions.acQ2.maturity.level1',
      level2Key: 'owasp-asvs.questions.acQ2.maturity.level2',
      level3Key: 'owasp-asvs.questions.acQ2.maturity.level3',
    },
  },
  {
    id: 'owasp-ac-q3',
    categoryId: 'access-control',
    tier: 'advanced',
    titleKey: 'owasp-asvs.questions.acQ3.title',
    tooltipKey: 'owasp-asvs.questions.acQ3.tooltip',
    helpKey: 'owasp-asvs.questions.acQ3.help',
    legalReference: {
      asvsChapter: 'ASVS V4: Access Control',
      asvsRequirement: 'V4.3.1, V4.3.2, V4.3.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.acQ3.maturity.level0',
      level1Key: 'owasp-asvs.questions.acQ3.maturity.level1',
      level2Key: 'owasp-asvs.questions.acQ3.maturity.level2',
      level3Key: 'owasp-asvs.questions.acQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Input Validation (V5)
  // ============================================================
  {
    id: 'owasp-iv-q1',
    categoryId: 'input-validation',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.ivQ1.title',
    tooltipKey: 'owasp-asvs.questions.ivQ1.tooltip',
    helpKey: 'owasp-asvs.questions.ivQ1.help',
    legalReference: {
      asvsChapter: 'ASVS V5: Validation, Sanitization and Encoding',
      asvsRequirement: 'V5.1.1, V5.1.2, V5.1.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.ivQ1.maturity.level0',
      level1Key: 'owasp-asvs.questions.ivQ1.maturity.level1',
      level2Key: 'owasp-asvs.questions.ivQ1.maturity.level2',
      level3Key: 'owasp-asvs.questions.ivQ1.maturity.level3',
    },
  },
  {
    id: 'owasp-iv-q2',
    categoryId: 'input-validation',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.ivQ2.title',
    tooltipKey: 'owasp-asvs.questions.ivQ2.tooltip',
    helpKey: 'owasp-asvs.questions.ivQ2.help',
    legalReference: {
      asvsChapter: 'ASVS V5: Validation, Sanitization and Encoding',
      asvsRequirement: 'V5.2.1, V5.2.2, V5.3.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.ivQ2.maturity.level0',
      level1Key: 'owasp-asvs.questions.ivQ2.maturity.level1',
      level2Key: 'owasp-asvs.questions.ivQ2.maturity.level2',
      level3Key: 'owasp-asvs.questions.ivQ2.maturity.level3',
    },
  },
  {
    id: 'owasp-iv-q3',
    categoryId: 'input-validation',
    tier: 'advanced',
    titleKey: 'owasp-asvs.questions.ivQ3.title',
    tooltipKey: 'owasp-asvs.questions.ivQ3.tooltip',
    helpKey: 'owasp-asvs.questions.ivQ3.help',
    legalReference: {
      asvsChapter: 'ASVS V5: Validation, Sanitization and Encoding',
      asvsRequirement: 'V5.3.1, V5.3.4, V5.3.7',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.ivQ3.maturity.level0',
      level1Key: 'owasp-asvs.questions.ivQ3.maturity.level1',
      level2Key: 'owasp-asvs.questions.ivQ3.maturity.level2',
      level3Key: 'owasp-asvs.questions.ivQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Cryptography (V6)
  // ============================================================
  {
    id: 'owasp-crypto-q1',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.cryptoQ1.title',
    tooltipKey: 'owasp-asvs.questions.cryptoQ1.tooltip',
    helpKey: 'owasp-asvs.questions.cryptoQ1.help',
    legalReference: {
      asvsChapter: 'ASVS V6: Stored Cryptography',
      asvsRequirement: 'V6.1.1, V6.1.2, V6.1.3',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.cryptoQ1.maturity.level0',
      level1Key: 'owasp-asvs.questions.cryptoQ1.maturity.level1',
      level2Key: 'owasp-asvs.questions.cryptoQ1.maturity.level2',
      level3Key: 'owasp-asvs.questions.cryptoQ1.maturity.level3',
    },
  },
  {
    id: 'owasp-crypto-q2',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.cryptoQ2.title',
    tooltipKey: 'owasp-asvs.questions.cryptoQ2.tooltip',
    helpKey: 'owasp-asvs.questions.cryptoQ2.help',
    legalReference: {
      asvsChapter: 'ASVS V6: Stored Cryptography',
      asvsRequirement: 'V6.2.1, V6.2.2',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.cryptoQ2.maturity.level0',
      level1Key: 'owasp-asvs.questions.cryptoQ2.maturity.level1',
      level2Key: 'owasp-asvs.questions.cryptoQ2.maturity.level2',
      level3Key: 'owasp-asvs.questions.cryptoQ2.maturity.level3',
    },
  },
  {
    id: 'owasp-crypto-q3',
    categoryId: 'cryptography',
    tier: 'advanced',
    titleKey: 'owasp-asvs.questions.cryptoQ3.title',
    tooltipKey: 'owasp-asvs.questions.cryptoQ3.tooltip',
    helpKey: 'owasp-asvs.questions.cryptoQ3.help',
    legalReference: {
      asvsChapter: 'ASVS V6: Stored Cryptography',
      asvsRequirement: 'V6.3.1, V6.3.2, V6.4.1',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.cryptoQ3.maturity.level0',
      level1Key: 'owasp-asvs.questions.cryptoQ3.maturity.level1',
      level2Key: 'owasp-asvs.questions.cryptoQ3.maturity.level2',
      level3Key: 'owasp-asvs.questions.cryptoQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Error Handling, Data Protection, Communication,
  //             HTTP Security & Configuration (V7-V14)
  // ============================================================
  {
    id: 'owasp-el-q1',
    categoryId: 'error-logging',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.elQ1.title',
    tooltipKey: 'owasp-asvs.questions.elQ1.tooltip',
    helpKey: 'owasp-asvs.questions.elQ1.help',
    legalReference: {
      asvsChapter: 'ASVS V7: Error Handling and Logging',
      asvsRequirement: 'V7.1.1, V7.1.2, V7.4.1',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.elQ1.maturity.level0',
      level1Key: 'owasp-asvs.questions.elQ1.maturity.level1',
      level2Key: 'owasp-asvs.questions.elQ1.maturity.level2',
      level3Key: 'owasp-asvs.questions.elQ1.maturity.level3',
    },
  },
  {
    id: 'owasp-el-q2',
    categoryId: 'error-logging',
    tier: 'core',
    titleKey: 'owasp-asvs.questions.elQ2.title',
    tooltipKey: 'owasp-asvs.questions.elQ2.tooltip',
    helpKey: 'owasp-asvs.questions.elQ2.help',
    legalReference: {
      asvsChapter: 'ASVS V9: Communication, V14: Configuration',
      asvsRequirement: 'V9.1.1, V9.1.2, V14.2.1',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.elQ2.maturity.level0',
      level1Key: 'owasp-asvs.questions.elQ2.maturity.level1',
      level2Key: 'owasp-asvs.questions.elQ2.maturity.level2',
      level3Key: 'owasp-asvs.questions.elQ2.maturity.level3',
    },
  },
  {
    id: 'owasp-el-q3',
    categoryId: 'error-logging',
    tier: 'advanced',
    titleKey: 'owasp-asvs.questions.elQ3.title',
    tooltipKey: 'owasp-asvs.questions.elQ3.tooltip',
    helpKey: 'owasp-asvs.questions.elQ3.help',
    legalReference: {
      asvsChapter: 'ASVS V13: API and Web Service, V14: Configuration',
      asvsRequirement: 'V13.1.1, V13.2.1, V14.4.1',
    },
    maturityDescriptions: {
      level0Key: 'owasp-asvs.questions.elQ3.maturity.level0',
      level1Key: 'owasp-asvs.questions.elQ3.maturity.level1',
      level2Key: 'owasp-asvs.questions.elQ3.maturity.level2',
      level3Key: 'owasp-asvs.questions.elQ3.maturity.level3',
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
