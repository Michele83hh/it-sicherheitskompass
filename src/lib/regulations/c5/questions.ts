/**
 * BSI C5 Gap Analysis Questions
 *
 * 25 questions across 8 categories (3 per category + 1 extra).
 * Questions target cloud service providers and cloud-using organizations.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Quality principles:
 * - GF-verstaendlich (no technical jargon, understandable by management)
 * - 4 distinct maturity levels (0-3) per question
 * - References to specific C5:2020 criteria
 * - Each question earns its place (no filler)
 *
 * Legal basis: BSI C5:2020 (Cloud Computing Compliance Criteria Catalogue)
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Organisation & Compliance (OIS, SP, HR)
  // ============================================================
  {
    id: 'c5-org-q1',
    categoryId: 'organisation',
    tier: 'core',
    titleKey: 'c5.questions.orgQ1.title',
    tooltipKey: 'c5.questions.orgQ1.tooltip',
    helpKey: 'c5.questions.orgQ1.help',
    legalReference: {
      euArticle: 'C5:2020 OIS-01, OIS-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.1',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.orgQ1.maturity.level0',
      level1Key: 'c5.questions.orgQ1.maturity.level1',
      level2Key: 'c5.questions.orgQ1.maturity.level2',
      level3Key: 'c5.questions.orgQ1.maturity.level3',
    },
  },
  {
    id: 'c5-org-q2',
    categoryId: 'organisation',
    tier: 'core',
    titleKey: 'c5.questions.orgQ2.title',
    tooltipKey: 'c5.questions.orgQ2.tooltip',
    helpKey: 'c5.questions.orgQ2.help',
    legalReference: {
      euArticle: 'C5:2020 SP-01, SP-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.2',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.orgQ2.maturity.level0',
      level1Key: 'c5.questions.orgQ2.maturity.level1',
      level2Key: 'c5.questions.orgQ2.maturity.level2',
      level3Key: 'c5.questions.orgQ2.maturity.level3',
    },
  },
  {
    id: 'c5-org-q3',
    categoryId: 'organisation',
    tier: 'core',
    titleKey: 'c5.questions.orgQ3.title',
    tooltipKey: 'c5.questions.orgQ3.tooltip',
    helpKey: 'c5.questions.orgQ3.help',
    legalReference: {
      euArticle: 'C5:2020 HR-01, HR-03',
      bsigParagraph: 'BSI C5:2020 Kap. 4.3',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.orgQ3.maturity.level0',
      level1Key: 'c5.questions.orgQ3.maturity.level1',
      level2Key: 'c5.questions.orgQ3.maturity.level2',
      level3Key: 'c5.questions.orgQ3.maturity.level3',
    },
  },
  {
    id: 'c5-org-q4',
    categoryId: 'organisation',
    tier: 'advanced',
    titleKey: 'c5.questions.orgQ4.title',
    tooltipKey: 'c5.questions.orgQ4.tooltip',
    helpKey: 'c5.questions.orgQ4.help',
    legalReference: {
      euArticle: 'C5:2020 OIS-05, OIS-07',
      bsigParagraph: 'BSI C5:2020 Kap. 4.1',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.orgQ4.maturity.level0',
      level1Key: 'c5.questions.orgQ4.maturity.level1',
      level2Key: 'c5.questions.orgQ4.maturity.level2',
      level3Key: 'c5.questions.orgQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Asset-Management & Klassifizierung (AM)
  // ============================================================
  {
    id: 'c5-am-q1',
    categoryId: 'asset-management',
    tier: 'core',
    titleKey: 'c5.questions.amQ1.title',
    tooltipKey: 'c5.questions.amQ1.tooltip',
    helpKey: 'c5.questions.amQ1.help',
    legalReference: {
      euArticle: 'C5:2020 AM-01, AM-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.4',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.amQ1.maturity.level0',
      level1Key: 'c5.questions.amQ1.maturity.level1',
      level2Key: 'c5.questions.amQ1.maturity.level2',
      level3Key: 'c5.questions.amQ1.maturity.level3',
    },
  },
  {
    id: 'c5-am-q2',
    categoryId: 'asset-management',
    tier: 'core',
    titleKey: 'c5.questions.amQ2.title',
    tooltipKey: 'c5.questions.amQ2.tooltip',
    helpKey: 'c5.questions.amQ2.help',
    legalReference: {
      euArticle: 'C5:2020 AM-03, AM-04',
      bsigParagraph: 'BSI C5:2020 Kap. 4.4',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.amQ2.maturity.level0',
      level1Key: 'c5.questions.amQ2.maturity.level1',
      level2Key: 'c5.questions.amQ2.maturity.level2',
      level3Key: 'c5.questions.amQ2.maturity.level3',
    },
  },
  {
    id: 'c5-am-q3',
    categoryId: 'asset-management',
    tier: 'advanced',
    titleKey: 'c5.questions.amQ3.title',
    tooltipKey: 'c5.questions.amQ3.tooltip',
    helpKey: 'c5.questions.amQ3.help',
    legalReference: {
      euArticle: 'C5:2020 AM-05, AM-06',
      bsigParagraph: 'BSI C5:2020 Kap. 4.4',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.amQ3.maturity.level0',
      level1Key: 'c5.questions.amQ3.maturity.level1',
      level2Key: 'c5.questions.amQ3.maturity.level2',
      level3Key: 'c5.questions.amQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Physische Sicherheit (PS)
  // ============================================================
  {
    id: 'c5-ps-q1',
    categoryId: 'physical-security',
    tier: 'core',
    titleKey: 'c5.questions.psQ1.title',
    tooltipKey: 'c5.questions.psQ1.tooltip',
    helpKey: 'c5.questions.psQ1.help',
    legalReference: {
      euArticle: 'C5:2020 PS-01, PS-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.5',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.psQ1.maturity.level0',
      level1Key: 'c5.questions.psQ1.maturity.level1',
      level2Key: 'c5.questions.psQ1.maturity.level2',
      level3Key: 'c5.questions.psQ1.maturity.level3',
    },
  },
  {
    id: 'c5-ps-q2',
    categoryId: 'physical-security',
    tier: 'core',
    titleKey: 'c5.questions.psQ2.title',
    tooltipKey: 'c5.questions.psQ2.tooltip',
    helpKey: 'c5.questions.psQ2.help',
    legalReference: {
      euArticle: 'C5:2020 PS-05, PS-06',
      bsigParagraph: 'BSI C5:2020 Kap. 4.5',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.psQ2.maturity.level0',
      level1Key: 'c5.questions.psQ2.maturity.level1',
      level2Key: 'c5.questions.psQ2.maturity.level2',
      level3Key: 'c5.questions.psQ2.maturity.level3',
    },
  },
  {
    id: 'c5-ps-q3',
    categoryId: 'physical-security',
    tier: 'advanced',
    titleKey: 'c5.questions.psQ3.title',
    tooltipKey: 'c5.questions.psQ3.tooltip',
    helpKey: 'c5.questions.psQ3.help',
    legalReference: {
      euArticle: 'C5:2020 PS-07, PS-09',
      bsigParagraph: 'BSI C5:2020 Kap. 4.5',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.psQ3.maturity.level0',
      level1Key: 'c5.questions.psQ3.maturity.level1',
      level2Key: 'c5.questions.psQ3.maturity.level2',
      level3Key: 'c5.questions.psQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Identitaets- & Zugriffsmanagement (IDM)
  // ============================================================
  {
    id: 'c5-idm-q1',
    categoryId: 'identity-access',
    tier: 'core',
    titleKey: 'c5.questions.idmQ1.title',
    tooltipKey: 'c5.questions.idmQ1.tooltip',
    helpKey: 'c5.questions.idmQ1.help',
    legalReference: {
      euArticle: 'C5:2020 IDM-01, IDM-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.7',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.idmQ1.maturity.level0',
      level1Key: 'c5.questions.idmQ1.maturity.level1',
      level2Key: 'c5.questions.idmQ1.maturity.level2',
      level3Key: 'c5.questions.idmQ1.maturity.level3',
    },
  },
  {
    id: 'c5-idm-q2',
    categoryId: 'identity-access',
    tier: 'core',
    titleKey: 'c5.questions.idmQ2.title',
    tooltipKey: 'c5.questions.idmQ2.tooltip',
    helpKey: 'c5.questions.idmQ2.help',
    legalReference: {
      euArticle: 'C5:2020 IDM-03, IDM-06',
      bsigParagraph: 'BSI C5:2020 Kap. 4.7',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.idmQ2.maturity.level0',
      level1Key: 'c5.questions.idmQ2.maturity.level1',
      level2Key: 'c5.questions.idmQ2.maturity.level2',
      level3Key: 'c5.questions.idmQ2.maturity.level3',
    },
  },
  {
    id: 'c5-idm-q3',
    categoryId: 'identity-access',
    tier: 'core',
    titleKey: 'c5.questions.idmQ3.title',
    tooltipKey: 'c5.questions.idmQ3.tooltip',
    helpKey: 'c5.questions.idmQ3.help',
    legalReference: {
      euArticle: 'C5:2020 IDM-07, IDM-08',
      bsigParagraph: 'BSI C5:2020 Kap. 4.7',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.idmQ3.maturity.level0',
      level1Key: 'c5.questions.idmQ3.maturity.level1',
      level2Key: 'c5.questions.idmQ3.maturity.level2',
      level3Key: 'c5.questions.idmQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Betrieb & Kommunikation (OPS, COS)
  // ============================================================
  {
    id: 'c5-ops-q1',
    categoryId: 'operations',
    tier: 'core',
    titleKey: 'c5.questions.opsQ1.title',
    tooltipKey: 'c5.questions.opsQ1.tooltip',
    helpKey: 'c5.questions.opsQ1.help',
    legalReference: {
      euArticle: 'C5:2020 OPS-01, OPS-03',
      bsigParagraph: 'BSI C5:2020 Kap. 4.6',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.opsQ1.maturity.level0',
      level1Key: 'c5.questions.opsQ1.maturity.level1',
      level2Key: 'c5.questions.opsQ1.maturity.level2',
      level3Key: 'c5.questions.opsQ1.maturity.level3',
    },
  },
  {
    id: 'c5-ops-q2',
    categoryId: 'operations',
    tier: 'core',
    titleKey: 'c5.questions.opsQ2.title',
    tooltipKey: 'c5.questions.opsQ2.tooltip',
    helpKey: 'c5.questions.opsQ2.help',
    legalReference: {
      euArticle: 'C5:2020 OPS-07, OPS-08',
      bsigParagraph: 'BSI C5:2020 Kap. 4.6',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.opsQ2.maturity.level0',
      level1Key: 'c5.questions.opsQ2.maturity.level1',
      level2Key: 'c5.questions.opsQ2.maturity.level2',
      level3Key: 'c5.questions.opsQ2.maturity.level3',
    },
  },
  {
    id: 'c5-ops-q3',
    categoryId: 'operations',
    tier: 'core',
    titleKey: 'c5.questions.opsQ3.title',
    tooltipKey: 'c5.questions.opsQ3.tooltip',
    helpKey: 'c5.questions.opsQ3.help',
    legalReference: {
      euArticle: 'C5:2020 COS-01, COS-05',
      bsigParagraph: 'BSI C5:2020 Kap. 4.8',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.opsQ3.maturity.level0',
      level1Key: 'c5.questions.opsQ3.maturity.level1',
      level2Key: 'c5.questions.opsQ3.maturity.level2',
      level3Key: 'c5.questions.opsQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Kryptografie & Schluesselmanagement (KRY)
  // ============================================================
  {
    id: 'c5-kry-q1',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'c5.questions.kryQ1.title',
    tooltipKey: 'c5.questions.kryQ1.tooltip',
    helpKey: 'c5.questions.kryQ1.help',
    legalReference: {
      euArticle: 'C5:2020 KRY-01, KRY-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.9',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.kryQ1.maturity.level0',
      level1Key: 'c5.questions.kryQ1.maturity.level1',
      level2Key: 'c5.questions.kryQ1.maturity.level2',
      level3Key: 'c5.questions.kryQ1.maturity.level3',
    },
  },
  {
    id: 'c5-kry-q2',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'c5.questions.kryQ2.title',
    tooltipKey: 'c5.questions.kryQ2.tooltip',
    helpKey: 'c5.questions.kryQ2.help',
    legalReference: {
      euArticle: 'C5:2020 KRY-03',
      bsigParagraph: 'BSI C5:2020 Kap. 4.9',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.kryQ2.maturity.level0',
      level1Key: 'c5.questions.kryQ2.maturity.level1',
      level2Key: 'c5.questions.kryQ2.maturity.level2',
      level3Key: 'c5.questions.kryQ2.maturity.level3',
    },
  },
  {
    id: 'c5-kry-q3',
    categoryId: 'cryptography',
    tier: 'advanced',
    titleKey: 'c5.questions.kryQ3.title',
    tooltipKey: 'c5.questions.kryQ3.tooltip',
    helpKey: 'c5.questions.kryQ3.help',
    legalReference: {
      euArticle: 'C5:2020 KRY-04',
      bsigParagraph: 'BSI C5:2020 Kap. 4.9',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.kryQ3.maturity.level0',
      level1Key: 'c5.questions.kryQ3.maturity.level1',
      level2Key: 'c5.questions.kryQ3.maturity.level2',
      level3Key: 'c5.questions.kryQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Vorfallmanagement & BCM (SIM, BCM)
  // ============================================================
  {
    id: 'c5-sim-q1',
    categoryId: 'incident-bcm',
    tier: 'core',
    titleKey: 'c5.questions.simQ1.title',
    tooltipKey: 'c5.questions.simQ1.tooltip',
    helpKey: 'c5.questions.simQ1.help',
    legalReference: {
      euArticle: 'C5:2020 SIM-01, SIM-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.10',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.simQ1.maturity.level0',
      level1Key: 'c5.questions.simQ1.maturity.level1',
      level2Key: 'c5.questions.simQ1.maturity.level2',
      level3Key: 'c5.questions.simQ1.maturity.level3',
    },
  },
  {
    id: 'c5-sim-q2',
    categoryId: 'incident-bcm',
    tier: 'core',
    titleKey: 'c5.questions.simQ2.title',
    tooltipKey: 'c5.questions.simQ2.tooltip',
    helpKey: 'c5.questions.simQ2.help',
    legalReference: {
      euArticle: 'C5:2020 BCM-01, BCM-03',
      bsigParagraph: 'BSI C5:2020 Kap. 4.11',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.simQ2.maturity.level0',
      level1Key: 'c5.questions.simQ2.maturity.level1',
      level2Key: 'c5.questions.simQ2.maturity.level2',
      level3Key: 'c5.questions.simQ2.maturity.level3',
    },
  },
  {
    id: 'c5-sim-q3',
    categoryId: 'incident-bcm',
    tier: 'advanced',
    titleKey: 'c5.questions.simQ3.title',
    tooltipKey: 'c5.questions.simQ3.tooltip',
    helpKey: 'c5.questions.simQ3.help',
    legalReference: {
      euArticle: 'C5:2020 SIM-04, SIM-05',
      bsigParagraph: 'BSI C5:2020 Kap. 4.10',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.simQ3.maturity.level0',
      level1Key: 'c5.questions.simQ3.maturity.level1',
      level2Key: 'c5.questions.simQ3.maturity.level2',
      level3Key: 'c5.questions.simQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Entwicklung & Pruefung (DEV, SSO, PI)
  // ============================================================
  {
    id: 'c5-dev-q1',
    categoryId: 'development-audit',
    tier: 'core',
    titleKey: 'c5.questions.devQ1.title',
    tooltipKey: 'c5.questions.devQ1.tooltip',
    helpKey: 'c5.questions.devQ1.help',
    legalReference: {
      euArticle: 'C5:2020 DEV-01, DEV-02',
      bsigParagraph: 'BSI C5:2020 Kap. 4.14',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.devQ1.maturity.level0',
      level1Key: 'c5.questions.devQ1.maturity.level1',
      level2Key: 'c5.questions.devQ1.maturity.level2',
      level3Key: 'c5.questions.devQ1.maturity.level3',
    },
  },
  {
    id: 'c5-dev-q2',
    categoryId: 'development-audit',
    tier: 'core',
    titleKey: 'c5.questions.devQ2.title',
    tooltipKey: 'c5.questions.devQ2.tooltip',
    helpKey: 'c5.questions.devQ2.help',
    legalReference: {
      euArticle: 'C5:2020 SSO-01, SSO-03',
      bsigParagraph: 'BSI C5:2020 Kap. 4.15',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.devQ2.maturity.level0',
      level1Key: 'c5.questions.devQ2.maturity.level1',
      level2Key: 'c5.questions.devQ2.maturity.level2',
      level3Key: 'c5.questions.devQ2.maturity.level3',
    },
  },
  {
    id: 'c5-dev-q3',
    categoryId: 'development-audit',
    tier: 'core',
    titleKey: 'c5.questions.devQ3.title',
    tooltipKey: 'c5.questions.devQ3.tooltip',
    helpKey: 'c5.questions.devQ3.help',
    legalReference: {
      euArticle: 'C5:2020 PI-01, PI-03',
      bsigParagraph: 'BSI C5:2020 Kap. 4.16',
    },
    maturityDescriptions: {
      level0Key: 'c5.questions.devQ3.maturity.level0',
      level1Key: 'c5.questions.devQ3.maturity.level1',
      level2Key: 'c5.questions.devQ3.maturity.level2',
      level3Key: 'c5.questions.devQ3.maturity.level3',
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
