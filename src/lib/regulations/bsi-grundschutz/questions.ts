/**
 * BSI IT-Grundschutz Gap Analysis Questions
 *
 * 30 questions across 10 IT-Grundschutz-Kompendium layers, 3 per category.
 * All questions are core tier (no tiered assessment for BSI Grundschutz).
 * Questions are written in KMU-management-level German.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Reference: IT-Grundschutz-Kompendium Edition 2023
 * BSI-Standards: 200-1, 200-2, 200-3, 200-4
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: ISMS (BSI-Standard 200-1)
  // ============================================================
  {
    id: 'isms-q1',
    categoryId: 'isms',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.ismsQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.ismsQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.ismsQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-1 Kap. 7',
      bsigParagraph: 'ISMS.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.ismsQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.ismsQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.ismsQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.ismsQ1.maturity.level3',
    },
  },
  {
    id: 'isms-q2',
    categoryId: 'isms',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.ismsQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.ismsQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.ismsQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-1 Kap. 7.3',
      bsigParagraph: 'ISMS.1.A3',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.ismsQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.ismsQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.ismsQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.ismsQ2.maturity.level3',
    },
  },
  {
    id: 'isms-q3',
    categoryId: 'isms',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.ismsQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.ismsQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.ismsQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-3 Kap. 4',
      bsigParagraph: 'ISMS.1.A7',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.ismsQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.ismsQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.ismsQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.ismsQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Organisation & Personal (ORP)
  // ============================================================
  {
    id: 'orp-q1',
    categoryId: 'orp',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.orpQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.orpQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.orpQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 4.1',
      bsigParagraph: 'ORP.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.orpQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.orpQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.orpQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.orpQ1.maturity.level3',
    },
  },
  {
    id: 'orp-q2',
    categoryId: 'orp',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.orpQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.orpQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.orpQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 4.2',
      bsigParagraph: 'ORP.2.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.orpQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.orpQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.orpQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.orpQ2.maturity.level3',
    },
  },
  {
    id: 'orp-q3',
    categoryId: 'orp',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.orpQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.orpQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.orpQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 4.3',
      bsigParagraph: 'ORP.3.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.orpQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.orpQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.orpQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.orpQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Konzeption (CON)
  // ============================================================
  {
    id: 'con-q1',
    categoryId: 'con',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.conQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.conQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.conQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 5',
      bsigParagraph: 'CON.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.conQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.conQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.conQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.conQ1.maturity.level3',
    },
  },
  {
    id: 'con-q2',
    categoryId: 'con',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.conQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.conQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.conQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-4 Kap. 3',
      bsigParagraph: 'CON.3.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.conQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.conQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.conQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.conQ2.maturity.level3',
    },
  },
  {
    id: 'con-q3',
    categoryId: 'con',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.conQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.conQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.conQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 5.3',
      bsigParagraph: 'CON.6.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.conQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.conQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.conQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.conQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Betrieb (OPS)
  // ============================================================
  {
    id: 'ops-q1',
    categoryId: 'ops',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.opsQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.opsQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.opsQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 6',
      bsigParagraph: 'OPS.1.1.3.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.opsQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.opsQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.opsQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.opsQ1.maturity.level3',
    },
  },
  {
    id: 'ops-q2',
    categoryId: 'ops',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.opsQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.opsQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.opsQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 6',
      bsigParagraph: 'OPS.1.1.4.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.opsQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.opsQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.opsQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.opsQ2.maturity.level3',
    },
  },
  {
    id: 'ops-q3',
    categoryId: 'ops',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.opsQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.opsQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.opsQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 6',
      bsigParagraph: 'OPS.1.2.2.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.opsQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.opsQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.opsQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.opsQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Detektion & Reaktion (DER)
  // ============================================================
  {
    id: 'der-q1',
    categoryId: 'der',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.derQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.derQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.derQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-4 Kap. 5',
      bsigParagraph: 'DER.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.derQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.derQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.derQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.derQ1.maturity.level3',
    },
  },
  {
    id: 'der-q2',
    categoryId: 'der',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.derQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.derQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.derQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-4 Kap. 6',
      bsigParagraph: 'DER.2.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.derQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.derQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.derQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.derQ2.maturity.level3',
    },
  },
  {
    id: 'der-q3',
    categoryId: 'der',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.derQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.derQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.derQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-4 Kap. 7',
      bsigParagraph: 'DER.4.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.derQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.derQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.derQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.derQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Anwendungen (APP)
  // ============================================================
  {
    id: 'app-q1',
    categoryId: 'app',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.appQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.appQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.appQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'APP.1.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.appQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.appQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.appQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.appQ1.maturity.level3',
    },
  },
  {
    id: 'app-q2',
    categoryId: 'app',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.appQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.appQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.appQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'APP.1.2.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.appQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.appQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.appQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.appQ2.maturity.level3',
    },
  },
  {
    id: 'app-q3',
    categoryId: 'app',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.appQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.appQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.appQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'APP.3.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.appQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.appQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.appQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.appQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: IT-Systeme (SYS)
  // ============================================================
  {
    id: 'sys-q1',
    categoryId: 'sys',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.sysQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.sysQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.sysQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'SYS.1.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.sysQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.sysQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.sysQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.sysQ1.maturity.level3',
    },
  },
  {
    id: 'sys-q2',
    categoryId: 'sys',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.sysQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.sysQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.sysQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'SYS.2.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.sysQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.sysQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.sysQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.sysQ2.maturity.level3',
    },
  },
  {
    id: 'sys-q3',
    categoryId: 'sys',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.sysQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.sysQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.sysQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'SYS.3.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.sysQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.sysQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.sysQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.sysQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Netze und Kommunikation (NET)
  // ============================================================
  {
    id: 'net-q1',
    categoryId: 'net',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.netQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.netQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.netQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'NET.1.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.netQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.netQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.netQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.netQ1.maturity.level3',
    },
  },
  {
    id: 'net-q2',
    categoryId: 'net',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.netQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.netQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.netQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'NET.3.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.netQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.netQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.netQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.netQ2.maturity.level3',
    },
  },
  {
    id: 'net-q3',
    categoryId: 'net',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.netQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.netQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.netQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'NET.4.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.netQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.netQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.netQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.netQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 9: Infrastruktur (INF)
  // ============================================================
  {
    id: 'inf-q1',
    categoryId: 'inf',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.infQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.infQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.infQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'INF.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.infQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.infQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.infQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.infQ1.maturity.level3',
    },
  },
  {
    id: 'inf-q2',
    categoryId: 'inf',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.infQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.infQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.infQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'INF.2.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.infQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.infQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.infQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.infQ2.maturity.level3',
    },
  },
  {
    id: 'inf-q3',
    categoryId: 'inf',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.infQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.infQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.infQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'INF.5.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.infQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.infQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.infQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.infQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 10: Industrielle IT (IND)
  // ============================================================
  {
    id: 'ind-q1',
    categoryId: 'ind',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.indQ1.title',
    tooltipKey: 'bsiGrundschutz.questions.indQ1.tooltip',
    helpKey: 'bsiGrundschutz.questions.indQ1.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'IND.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.indQ1.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.indQ1.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.indQ1.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.indQ1.maturity.level3',
    },
  },
  {
    id: 'ind-q2',
    categoryId: 'ind',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.indQ2.title',
    tooltipKey: 'bsiGrundschutz.questions.indQ2.tooltip',
    helpKey: 'bsiGrundschutz.questions.indQ2.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'IND.2.1.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.indQ2.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.indQ2.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.indQ2.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.indQ2.maturity.level3',
    },
  },
  {
    id: 'ind-q3',
    categoryId: 'ind',
    tier: 'core',
    titleKey: 'bsiGrundschutz.questions.indQ3.title',
    tooltipKey: 'bsiGrundschutz.questions.indQ3.tooltip',
    helpKey: 'bsiGrundschutz.questions.indQ3.help',
    legalReference: {
      euArticle: 'BSI-Standard 200-2 Kap. 7',
      bsigParagraph: 'IND.2.7.A1',
    },
    maturityDescriptions: {
      level0Key: 'bsiGrundschutz.questions.indQ3.maturity.level0',
      level1Key: 'bsiGrundschutz.questions.indQ3.maturity.level1',
      level2Key: 'bsiGrundschutz.questions.indQ3.maturity.level2',
      level3Key: 'bsiGrundschutz.questions.indQ3.maturity.level3',
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
