/**
 * CRA Gap Analysis Questions
 *
 * 24 questions across 8 CRA categories, 3 per category (all core).
 * Questions are written in KMU-management-level German.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Legal basis: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Security by Design (Art. 10)
  // ============================================================
  {
    id: 'sbd-q1',
    categoryId: 'security-by-design',
    tier: 'core',
    titleKey: 'cra.questions.sbdQ1.title',
    tooltipKey: 'cra.questions.sbdQ1.tooltip',
    helpKey: 'cra.questions.sbdQ1.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 1 CRA',
      bsigParagraph: 'EN 18031-1 Abschnitt 5',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.sbdQ1.maturity.level0',
      level1Key: 'cra.questions.sbdQ1.maturity.level1',
      level2Key: 'cra.questions.sbdQ1.maturity.level2',
      level3Key: 'cra.questions.sbdQ1.maturity.level3',
    },
  },
  {
    id: 'sbd-q2',
    categoryId: 'security-by-design',
    tier: 'core',
    titleKey: 'cra.questions.sbdQ2.title',
    tooltipKey: 'cra.questions.sbdQ2.tooltip',
    helpKey: 'cra.questions.sbdQ2.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 2 CRA',
      bsigParagraph: 'EN 18031-1 Abschnitt 6',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.sbdQ2.maturity.level0',
      level1Key: 'cra.questions.sbdQ2.maturity.level1',
      level2Key: 'cra.questions.sbdQ2.maturity.level2',
      level3Key: 'cra.questions.sbdQ2.maturity.level3',
    },
  },
  {
    id: 'sbd-q3',
    categoryId: 'security-by-design',
    tier: 'core',
    titleKey: 'cra.questions.sbdQ3.title',
    tooltipKey: 'cra.questions.sbdQ3.tooltip',
    helpKey: 'cra.questions.sbdQ3.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 3 CRA',
      bsigParagraph: 'EN 18031-1 Abschnitt 7',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.sbdQ3.maturity.level0',
      level1Key: 'cra.questions.sbdQ3.maturity.level1',
      level2Key: 'cra.questions.sbdQ3.maturity.level2',
      level3Key: 'cra.questions.sbdQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Schwachstellenmanagement (Art. 11)
  // ============================================================
  {
    id: 'swm-q1',
    categoryId: 'schwachstellenmanagement',
    tier: 'core',
    titleKey: 'cra.questions.swmQ1.title',
    tooltipKey: 'cra.questions.swmQ1.tooltip',
    helpKey: 'cra.questions.swmQ1.help',
    legalReference: {
      euArticle: 'Art. 11 Abs. 1 CRA',
      bsigParagraph: 'ISO/IEC 30111, EN 18031-1',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.swmQ1.maturity.level0',
      level1Key: 'cra.questions.swmQ1.maturity.level1',
      level2Key: 'cra.questions.swmQ1.maturity.level2',
      level3Key: 'cra.questions.swmQ1.maturity.level3',
    },
  },
  {
    id: 'swm-q2',
    categoryId: 'schwachstellenmanagement',
    tier: 'core',
    titleKey: 'cra.questions.swmQ2.title',
    tooltipKey: 'cra.questions.swmQ2.tooltip',
    helpKey: 'cra.questions.swmQ2.help',
    legalReference: {
      euArticle: 'Art. 11 Abs. 2 CRA',
      bsigParagraph: 'ISO/IEC 29147',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.swmQ2.maturity.level0',
      level1Key: 'cra.questions.swmQ2.maturity.level1',
      level2Key: 'cra.questions.swmQ2.maturity.level2',
      level3Key: 'cra.questions.swmQ2.maturity.level3',
    },
  },
  {
    id: 'swm-q3',
    categoryId: 'schwachstellenmanagement',
    tier: 'core',
    titleKey: 'cra.questions.swmQ3.title',
    tooltipKey: 'cra.questions.swmQ3.tooltip',
    helpKey: 'cra.questions.swmQ3.help',
    legalReference: {
      euArticle: 'Art. 11 Abs. 3 CRA',
      bsigParagraph: 'EN 18031-1 Abschnitt 8',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.swmQ3.maturity.level0',
      level1Key: 'cra.questions.swmQ3.maturity.level1',
      level2Key: 'cra.questions.swmQ3.maturity.level2',
      level3Key: 'cra.questions.swmQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Software Bill of Materials (Art. 10 Abs. 6)
  // ============================================================
  {
    id: 'sbom-q1',
    categoryId: 'sbom',
    tier: 'core',
    titleKey: 'cra.questions.sbomQ1.title',
    tooltipKey: 'cra.questions.sbomQ1.tooltip',
    helpKey: 'cra.questions.sbomQ1.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 6 CRA',
      bsigParagraph: 'NTIA SBOM Minimum Elements',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.sbomQ1.maturity.level0',
      level1Key: 'cra.questions.sbomQ1.maturity.level1',
      level2Key: 'cra.questions.sbomQ1.maturity.level2',
      level3Key: 'cra.questions.sbomQ1.maturity.level3',
    },
  },
  {
    id: 'sbom-q2',
    categoryId: 'sbom',
    tier: 'core',
    titleKey: 'cra.questions.sbomQ2.title',
    tooltipKey: 'cra.questions.sbomQ2.tooltip',
    helpKey: 'cra.questions.sbomQ2.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 6 CRA',
      bsigParagraph: 'CycloneDX/SPDX Standards',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.sbomQ2.maturity.level0',
      level1Key: 'cra.questions.sbomQ2.maturity.level1',
      level2Key: 'cra.questions.sbomQ2.maturity.level2',
      level3Key: 'cra.questions.sbomQ2.maturity.level3',
    },
  },
  {
    id: 'sbom-q3',
    categoryId: 'sbom',
    tier: 'core',
    titleKey: 'cra.questions.sbomQ3.title',
    tooltipKey: 'cra.questions.sbomQ3.tooltip',
    helpKey: 'cra.questions.sbomQ3.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 6 CRA',
      bsigParagraph: 'NTIA SBOM Minimum Elements',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.sbomQ3.maturity.level0',
      level1Key: 'cra.questions.sbomQ3.maturity.level1',
      level2Key: 'cra.questions.sbomQ3.maturity.level2',
      level3Key: 'cra.questions.sbomQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Update-Management (Art. 10 Abs. 12)
  // ============================================================
  {
    id: 'um-q1',
    categoryId: 'update-management',
    tier: 'core',
    titleKey: 'cra.questions.umQ1.title',
    tooltipKey: 'cra.questions.umQ1.tooltip',
    helpKey: 'cra.questions.umQ1.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 12 CRA',
      bsigParagraph: 'ETSI EN 303 645 Abschnitt 5.3',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.umQ1.maturity.level0',
      level1Key: 'cra.questions.umQ1.maturity.level1',
      level2Key: 'cra.questions.umQ1.maturity.level2',
      level3Key: 'cra.questions.umQ1.maturity.level3',
    },
  },
  {
    id: 'um-q2',
    categoryId: 'update-management',
    tier: 'core',
    titleKey: 'cra.questions.umQ2.title',
    tooltipKey: 'cra.questions.umQ2.tooltip',
    helpKey: 'cra.questions.umQ2.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 12 CRA',
      bsigParagraph: 'EN 18031-1 Abschnitt 9',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.umQ2.maturity.level0',
      level1Key: 'cra.questions.umQ2.maturity.level1',
      level2Key: 'cra.questions.umQ2.maturity.level2',
      level3Key: 'cra.questions.umQ2.maturity.level3',
    },
  },
  {
    id: 'um-q3',
    categoryId: 'update-management',
    tier: 'core',
    titleKey: 'cra.questions.umQ3.title',
    tooltipKey: 'cra.questions.umQ3.tooltip',
    helpKey: 'cra.questions.umQ3.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 12 CRA',
      bsigParagraph: 'ETSI EN 303 645 Abschnitt 5.3',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.umQ3.maturity.level0',
      level1Key: 'cra.questions.umQ3.maturity.level1',
      level2Key: 'cra.questions.umQ3.maturity.level2',
      level3Key: 'cra.questions.umQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Technische Dokumentation (Art. 31)
  // ============================================================
  {
    id: 'dok-q1',
    categoryId: 'dokumentation',
    tier: 'core',
    titleKey: 'cra.questions.dokQ1.title',
    tooltipKey: 'cra.questions.dokQ1.tooltip',
    helpKey: 'cra.questions.dokQ1.help',
    legalReference: {
      euArticle: 'Art. 31 CRA',
      bsigParagraph: 'EN ISO/IEC 17050-1',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.dokQ1.maturity.level0',
      level1Key: 'cra.questions.dokQ1.maturity.level1',
      level2Key: 'cra.questions.dokQ1.maturity.level2',
      level3Key: 'cra.questions.dokQ1.maturity.level3',
    },
  },
  {
    id: 'dok-q2',
    categoryId: 'dokumentation',
    tier: 'core',
    titleKey: 'cra.questions.dokQ2.title',
    tooltipKey: 'cra.questions.dokQ2.tooltip',
    helpKey: 'cra.questions.dokQ2.help',
    legalReference: {
      euArticle: 'Art. 31 CRA',
      bsigParagraph: 'Anhang VII CRA',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.dokQ2.maturity.level0',
      level1Key: 'cra.questions.dokQ2.maturity.level1',
      level2Key: 'cra.questions.dokQ2.maturity.level2',
      level3Key: 'cra.questions.dokQ2.maturity.level3',
    },
  },
  {
    id: 'dok-q3',
    categoryId: 'dokumentation',
    tier: 'core',
    titleKey: 'cra.questions.dokQ3.title',
    tooltipKey: 'cra.questions.dokQ3.tooltip',
    helpKey: 'cra.questions.dokQ3.help',
    legalReference: {
      euArticle: 'Art. 31 CRA',
      bsigParagraph: 'Anhang VII CRA',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.dokQ3.maturity.level0',
      level1Key: 'cra.questions.dokQ3.maturity.level1',
      level2Key: 'cra.questions.dokQ3.maturity.level2',
      level3Key: 'cra.questions.dokQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Vorfall-Meldepflichten (Art. 14)
  // ============================================================
  {
    id: 'vm-q1',
    categoryId: 'vorfall-meldung',
    tier: 'core',
    titleKey: 'cra.questions.vmQ1.title',
    tooltipKey: 'cra.questions.vmQ1.tooltip',
    helpKey: 'cra.questions.vmQ1.help',
    legalReference: {
      euArticle: 'Art. 14 Abs. 1 CRA',
      bsigParagraph: 'ENISA Reporting Guidelines',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.vmQ1.maturity.level0',
      level1Key: 'cra.questions.vmQ1.maturity.level1',
      level2Key: 'cra.questions.vmQ1.maturity.level2',
      level3Key: 'cra.questions.vmQ1.maturity.level3',
    },
  },
  {
    id: 'vm-q2',
    categoryId: 'vorfall-meldung',
    tier: 'core',
    titleKey: 'cra.questions.vmQ2.title',
    tooltipKey: 'cra.questions.vmQ2.tooltip',
    helpKey: 'cra.questions.vmQ2.help',
    legalReference: {
      euArticle: 'Art. 14 Abs. 2 CRA',
      bsigParagraph: 'ENISA Reporting Guidelines',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.vmQ2.maturity.level0',
      level1Key: 'cra.questions.vmQ2.maturity.level1',
      level2Key: 'cra.questions.vmQ2.maturity.level2',
      level3Key: 'cra.questions.vmQ2.maturity.level3',
    },
  },
  {
    id: 'vm-q3',
    categoryId: 'vorfall-meldung',
    tier: 'core',
    titleKey: 'cra.questions.vmQ3.title',
    tooltipKey: 'cra.questions.vmQ3.tooltip',
    helpKey: 'cra.questions.vmQ3.help',
    legalReference: {
      euArticle: 'Art. 14 Abs. 3 CRA',
      bsigParagraph: 'ENISA Reporting Guidelines',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.vmQ3.maturity.level0',
      level1Key: 'cra.questions.vmQ3.maturity.level1',
      level2Key: 'cra.questions.vmQ3.maturity.level2',
      level3Key: 'cra.questions.vmQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Konformitaetsbewertung (Art. 24-30)
  // ============================================================
  {
    id: 'konf-q1',
    categoryId: 'konformitaet',
    tier: 'core',
    titleKey: 'cra.questions.konfQ1.title',
    tooltipKey: 'cra.questions.konfQ1.tooltip',
    helpKey: 'cra.questions.konfQ1.help',
    legalReference: {
      euArticle: 'Art. 24 CRA',
      bsigParagraph: 'EN ISO/IEC 17065',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.konfQ1.maturity.level0',
      level1Key: 'cra.questions.konfQ1.maturity.level1',
      level2Key: 'cra.questions.konfQ1.maturity.level2',
      level3Key: 'cra.questions.konfQ1.maturity.level3',
    },
  },
  {
    id: 'konf-q2',
    categoryId: 'konformitaet',
    tier: 'core',
    titleKey: 'cra.questions.konfQ2.title',
    tooltipKey: 'cra.questions.konfQ2.tooltip',
    helpKey: 'cra.questions.konfQ2.help',
    legalReference: {
      euArticle: 'Art. 25-28 CRA',
      bsigParagraph: 'Anhang VIII CRA',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.konfQ2.maturity.level0',
      level1Key: 'cra.questions.konfQ2.maturity.level1',
      level2Key: 'cra.questions.konfQ2.maturity.level2',
      level3Key: 'cra.questions.konfQ2.maturity.level3',
    },
  },
  {
    id: 'konf-q3',
    categoryId: 'konformitaet',
    tier: 'core',
    titleKey: 'cra.questions.konfQ3.title',
    tooltipKey: 'cra.questions.konfQ3.tooltip',
    helpKey: 'cra.questions.konfQ3.help',
    legalReference: {
      euArticle: 'Art. 30 CRA',
      bsigParagraph: 'Art. 30 CRA CE-Kennzeichnung',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.konfQ3.maturity.level0',
      level1Key: 'cra.questions.konfQ3.maturity.level1',
      level2Key: 'cra.questions.konfQ3.maturity.level2',
      level3Key: 'cra.questions.konfQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Support & Lebenszyklus (Art. 10 Abs. 12)
  // ============================================================
  {
    id: 'sl-q1',
    categoryId: 'support-lifecycle',
    tier: 'core',
    titleKey: 'cra.questions.slQ1.title',
    tooltipKey: 'cra.questions.slQ1.tooltip',
    helpKey: 'cra.questions.slQ1.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 12 CRA',
      bsigParagraph: 'IEC 62443-4-1',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.slQ1.maturity.level0',
      level1Key: 'cra.questions.slQ1.maturity.level1',
      level2Key: 'cra.questions.slQ1.maturity.level2',
      level3Key: 'cra.questions.slQ1.maturity.level3',
    },
  },
  {
    id: 'sl-q2',
    categoryId: 'support-lifecycle',
    tier: 'core',
    titleKey: 'cra.questions.slQ2.title',
    tooltipKey: 'cra.questions.slQ2.tooltip',
    helpKey: 'cra.questions.slQ2.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 12 CRA',
      bsigParagraph: 'EN 18031-1 Abschnitt 10',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.slQ2.maturity.level0',
      level1Key: 'cra.questions.slQ2.maturity.level1',
      level2Key: 'cra.questions.slQ2.maturity.level2',
      level3Key: 'cra.questions.slQ2.maturity.level3',
    },
  },
  {
    id: 'sl-q3',
    categoryId: 'support-lifecycle',
    tier: 'core',
    titleKey: 'cra.questions.slQ3.title',
    tooltipKey: 'cra.questions.slQ3.tooltip',
    helpKey: 'cra.questions.slQ3.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 12 CRA',
      bsigParagraph: 'IEC 62443-4-1, ETSI EN 303 645',
    },
    maturityDescriptions: {
      level0Key: 'cra.questions.slQ3.maturity.level0',
      level1Key: 'cra.questions.slQ3.maturity.level1',
      level2Key: 'cra.questions.slQ3.maturity.level2',
      level3Key: 'cra.questions.slQ3.maturity.level3',
    },
  },
];

export function getQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId);
}

export function getCoreQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId && q.tier === 'core');
}

export function getCoreQuestionCount(): number {
  return QUESTIONS.filter((q) => q.tier === 'core').length;
}

export function getTotalQuestionCount(): number {
  return QUESTIONS.length;
}
