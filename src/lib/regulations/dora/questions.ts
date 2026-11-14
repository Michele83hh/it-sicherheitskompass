/**
 * DORA Gap Analysis Questions
 *
 * 30 questions across 6 DORA pillar categories, 5 per category.
 * Each category has 3 core questions + 2 advanced questions.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Legal basis: Verordnung (EU) 2022/2554 (DORA)
 *
 * ID prefixes by category:
 *   irm = ICT-Risikomanagement
 *   vm  = Vorfallmanagement
 *   rt  = Resilience Testing
 *   da  = Drittanbieter
 *   ia  = Informationsaustausch
 *   gov = Governance
 */

import type { DoraQuestion } from './types';

export const QUESTIONS: DoraQuestion[] = [
  // ============================================================
  // Category 1: ICT-Risikomanagement (Art. 5-16 DORA)
  // ============================================================
  {
    id: 'irm-q1',
    categoryId: 'ict-risikomanagement',
    tier: 'core',
    titleKey: 'dora.questions.irmQ1.title',
    tooltipKey: 'dora.questions.irmQ1.tooltip',
    helpKey: 'dora.questions.irmQ1.help',
    legalReference: {
      euArticle: 'Art. 6 Abs. 1-2 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1774',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.irmQ1.maturity.level0',
      level1Key: 'dora.questions.irmQ1.maturity.level1',
      level2Key: 'dora.questions.irmQ1.maturity.level2',
      level3Key: 'dora.questions.irmQ1.maturity.level3',
    },
  },
  {
    id: 'irm-q2',
    categoryId: 'ict-risikomanagement',
    tier: 'core',
    titleKey: 'dora.questions.irmQ2.title',
    tooltipKey: 'dora.questions.irmQ2.tooltip',
    helpKey: 'dora.questions.irmQ2.help',
    legalReference: {
      euArticle: 'Art. 8 Abs. 1, 4 und 6 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1774',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.irmQ2.maturity.level0',
      level1Key: 'dora.questions.irmQ2.maturity.level1',
      level2Key: 'dora.questions.irmQ2.maturity.level2',
      level3Key: 'dora.questions.irmQ2.maturity.level3',
    },
  },
  {
    id: 'irm-q3',
    categoryId: 'ict-risikomanagement',
    tier: 'core',
    titleKey: 'dora.questions.irmQ3.title',
    tooltipKey: 'dora.questions.irmQ3.tooltip',
    helpKey: 'dora.questions.irmQ3.help',
    legalReference: {
      euArticle: 'Art. 9 Abs. 1-4 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1774',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.irmQ3.maturity.level0',
      level1Key: 'dora.questions.irmQ3.maturity.level1',
      level2Key: 'dora.questions.irmQ3.maturity.level2',
      level3Key: 'dora.questions.irmQ3.maturity.level3',
    },
  },
  {
    id: 'irm-q4',
    categoryId: 'ict-risikomanagement',
    tier: 'advanced',
    titleKey: 'dora.questions.irmQ4.title',
    tooltipKey: 'dora.questions.irmQ4.tooltip',
    helpKey: 'dora.questions.irmQ4.help',
    legalReference: {
      euArticle: 'Art. 10 Abs. 1-2 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1774',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.irmQ4.maturity.level0',
      level1Key: 'dora.questions.irmQ4.maturity.level1',
      level2Key: 'dora.questions.irmQ4.maturity.level2',
      level3Key: 'dora.questions.irmQ4.maturity.level3',
    },
  },
  {
    id: 'irm-q5',
    categoryId: 'ict-risikomanagement',
    tier: 'advanced',
    titleKey: 'dora.questions.irmQ5.title',
    tooltipKey: 'dora.questions.irmQ5.tooltip',
    helpKey: 'dora.questions.irmQ5.help',
    legalReference: {
      euArticle: 'Art. 12 Abs. 1-2 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1774',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.irmQ5.maturity.level0',
      level1Key: 'dora.questions.irmQ5.maturity.level1',
      level2Key: 'dora.questions.irmQ5.maturity.level2',
      level3Key: 'dora.questions.irmQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: ICT-Vorfallmanagement (Art. 17-23 DORA)
  // ============================================================
  {
    id: 'vm-q1',
    categoryId: 'vorfallmanagement',
    tier: 'core',
    titleKey: 'dora.questions.vmQ1.title',
    tooltipKey: 'dora.questions.vmQ1.tooltip',
    helpKey: 'dora.questions.vmQ1.help',
    legalReference: {
      euArticle: 'Art. 17 Abs. 1-3 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1772',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.vmQ1.maturity.level0',
      level1Key: 'dora.questions.vmQ1.maturity.level1',
      level2Key: 'dora.questions.vmQ1.maturity.level2',
      level3Key: 'dora.questions.vmQ1.maturity.level3',
    },
  },
  {
    id: 'vm-q2',
    categoryId: 'vorfallmanagement',
    tier: 'core',
    titleKey: 'dora.questions.vmQ2.title',
    tooltipKey: 'dora.questions.vmQ2.tooltip',
    helpKey: 'dora.questions.vmQ2.help',
    legalReference: {
      euArticle: 'Art. 18 Abs. 1-2 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2024/1772',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.vmQ2.maturity.level0',
      level1Key: 'dora.questions.vmQ2.maturity.level1',
      level2Key: 'dora.questions.vmQ2.maturity.level2',
      level3Key: 'dora.questions.vmQ2.maturity.level3',
    },
  },
  {
    id: 'vm-q3',
    categoryId: 'vorfallmanagement',
    tier: 'core',
    titleKey: 'dora.questions.vmQ3.title',
    tooltipKey: 'dora.questions.vmQ3.tooltip',
    helpKey: 'dora.questions.vmQ3.help',
    legalReference: {
      euArticle: 'Art. 19 Abs. 1 und 4 DORA',
      bsigParagraph: 'Art. 5 Delegierte Verordnung (EU) 2025/301',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.vmQ3.maturity.level0',
      level1Key: 'dora.questions.vmQ3.maturity.level1',
      level2Key: 'dora.questions.vmQ3.maturity.level2',
      level3Key: 'dora.questions.vmQ3.maturity.level3',
    },
  },
  {
    id: 'vm-q4',
    categoryId: 'vorfallmanagement',
    tier: 'advanced',
    titleKey: 'dora.questions.vmQ4.title',
    tooltipKey: 'dora.questions.vmQ4.tooltip',
    helpKey: 'dora.questions.vmQ4.help',
    legalReference: {
      euArticle: 'Art. 20 lit. b DORA',
      bsigParagraph: 'Durchführungsverordnung (EU) 2025/302',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.vmQ4.maturity.level0',
      level1Key: 'dora.questions.vmQ4.maturity.level1',
      level2Key: 'dora.questions.vmQ4.maturity.level2',
      level3Key: 'dora.questions.vmQ4.maturity.level3',
    },
  },
  {
    id: 'vm-q5',
    categoryId: 'vorfallmanagement',
    tier: 'advanced',
    titleKey: 'dora.questions.vmQ5.title',
    tooltipKey: 'dora.questions.vmQ5.tooltip',
    helpKey: 'dora.questions.vmQ5.help',
    legalReference: {
      euArticle: 'Art. 17 Abs. 2, Art. 19 Abs. 2 DORA',
      bsigParagraph: 'Freiwillige Meldung erheblicher Cyberbedrohungen',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.vmQ5.maturity.level0',
      level1Key: 'dora.questions.vmQ5.maturity.level1',
      level2Key: 'dora.questions.vmQ5.maturity.level2',
      level3Key: 'dora.questions.vmQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Digital Operational Resilience Testing (Art. 24-27)
  // ============================================================
  {
    id: 'rt-q1',
    categoryId: 'resilience-testing',
    tier: 'core',
    titleKey: 'dora.questions.rtQ1.title',
    tooltipKey: 'dora.questions.rtQ1.tooltip',
    helpKey: 'dora.questions.rtQ1.help',
    legalReference: {
      euArticle: 'Art. 24 Abs. 1-3 DORA',
      bsigParagraph: 'Allgemeine Anforderungen für das Testen',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.rtQ1.maturity.level0',
      level1Key: 'dora.questions.rtQ1.maturity.level1',
      level2Key: 'dora.questions.rtQ1.maturity.level2',
      level3Key: 'dora.questions.rtQ1.maturity.level3',
    },
  },
  {
    id: 'rt-q2',
    categoryId: 'resilience-testing',
    tier: 'core',
    titleKey: 'dora.questions.rtQ2.title',
    tooltipKey: 'dora.questions.rtQ2.tooltip',
    helpKey: 'dora.questions.rtQ2.help',
    legalReference: {
      euArticle: 'Art. 24 Abs. 6, Art. 25 Abs. 1 DORA',
      bsigParagraph: 'Testen von IKT-Tools und -Systemen',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.rtQ2.maturity.level0',
      level1Key: 'dora.questions.rtQ2.maturity.level1',
      level2Key: 'dora.questions.rtQ2.maturity.level2',
      level3Key: 'dora.questions.rtQ2.maturity.level3',
    },
  },
  {
    id: 'rt-q3',
    notApplicableAllowed: true,
    categoryId: 'resilience-testing',
    tier: 'core',
    titleKey: 'dora.questions.rtQ3.title',
    tooltipKey: 'dora.questions.rtQ3.tooltip',
    helpKey: 'dora.questions.rtQ3.help',
    legalReference: {
      euArticle: 'Art. 26 Abs. 1 und 8 DORA',
      bsigParagraph: 'Delegierte Verordnung (EU) 2025/1190',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.rtQ3.maturity.level0',
      level1Key: 'dora.questions.rtQ3.maturity.level1',
      level2Key: 'dora.questions.rtQ3.maturity.level2',
      level3Key: 'dora.questions.rtQ3.maturity.level3',
    },
  },
  {
    id: 'rt-q4',
    notApplicableAllowed: true,
    categoryId: 'resilience-testing',
    tier: 'advanced',
    titleKey: 'dora.questions.rtQ4.title',
    tooltipKey: 'dora.questions.rtQ4.tooltip',
    helpKey: 'dora.questions.rtQ4.help',
    legalReference: {
      euArticle: 'Art. 26 Abs. 2-3 DORA',
      bsigParagraph: 'Umfang und Durchführung von TLPT',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.rtQ4.maturity.level0',
      level1Key: 'dora.questions.rtQ4.maturity.level1',
      level2Key: 'dora.questions.rtQ4.maturity.level2',
      level3Key: 'dora.questions.rtQ4.maturity.level3',
    },
  },
  {
    id: 'rt-q5',
    notApplicableAllowed: true,
    categoryId: 'resilience-testing',
    tier: 'advanced',
    titleKey: 'dora.questions.rtQ5.title',
    tooltipKey: 'dora.questions.rtQ5.tooltip',
    helpKey: 'dora.questions.rtQ5.help',
    legalReference: {
      euArticle: 'Art. 27 Abs. 1-2 DORA',
      bsigParagraph: 'Art. 27 DORA (Anforderungen an TLPT-Tester)',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.rtQ5.maturity.level0',
      level1Key: 'dora.questions.rtQ5.maturity.level1',
      level2Key: 'dora.questions.rtQ5.maturity.level2',
      level3Key: 'dora.questions.rtQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: ICT-Drittanbieter-Risikomanagement (Art. 28-30)
  // ============================================================
  {
    id: 'da-q1',
    categoryId: 'drittanbieter',
    tier: 'core',
    titleKey: 'dora.questions.daQ1.title',
    tooltipKey: 'dora.questions.daQ1.tooltip',
    helpKey: 'dora.questions.daQ1.help',
    legalReference: {
      euArticle: 'Art. 28 Abs. 1 und 3 DORA',
      bsigParagraph: 'Informationsregister (Art. 28 Abs. 3 und 9 DORA)',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.daQ1.maturity.level0',
      level1Key: 'dora.questions.daQ1.maturity.level1',
      level2Key: 'dora.questions.daQ1.maturity.level2',
      level3Key: 'dora.questions.daQ1.maturity.level3',
    },
  },
  {
    id: 'da-q2',
    categoryId: 'drittanbieter',
    tier: 'core',
    titleKey: 'dora.questions.daQ2.title',
    tooltipKey: 'dora.questions.daQ2.tooltip',
    helpKey: 'dora.questions.daQ2.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 1-2 DORA',
      bsigParagraph: 'Wesentliche Vertragsbestimmungen',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.daQ2.maturity.level0',
      level1Key: 'dora.questions.daQ2.maturity.level1',
      level2Key: 'dora.questions.daQ2.maturity.level2',
      level3Key: 'dora.questions.daQ2.maturity.level3',
    },
  },
  {
    id: 'da-q3',
    categoryId: 'drittanbieter',
    tier: 'core',
    titleKey: 'dora.questions.daQ3.title',
    tooltipKey: 'dora.questions.daQ3.tooltip',
    helpKey: 'dora.questions.daQ3.help',
    legalReference: {
      euArticle: 'Art. 29 Abs. 1-2 DORA',
      bsigParagraph: 'Vorläufige Bewertung des IKT-Konzentrationsrisikos',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.daQ3.maturity.level0',
      level1Key: 'dora.questions.daQ3.maturity.level1',
      level2Key: 'dora.questions.daQ3.maturity.level2',
      level3Key: 'dora.questions.daQ3.maturity.level3',
    },
  },
  {
    id: 'da-q4',
    categoryId: 'drittanbieter',
    tier: 'advanced',
    titleKey: 'dora.questions.daQ4.title',
    tooltipKey: 'dora.questions.daQ4.tooltip',
    helpKey: 'dora.questions.daQ4.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 3 DORA',
      bsigParagraph: 'Verträge zu kritischen oder wichtigen Funktionen',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.daQ4.maturity.level0',
      level1Key: 'dora.questions.daQ4.maturity.level1',
      level2Key: 'dora.questions.daQ4.maturity.level2',
      level3Key: 'dora.questions.daQ4.maturity.level3',
    },
  },
  {
    id: 'da-q5',
    notApplicableAllowed: true,
    categoryId: 'drittanbieter',
    tier: 'advanced',
    titleKey: 'dora.questions.daQ5.title',
    tooltipKey: 'dora.questions.daQ5.tooltip',
    helpKey: 'dora.questions.daQ5.help',
    legalReference: {
      euArticle: 'Art. 31 Abs. 1 DORA',
      bsigParagraph: 'Einstufung kritischer IKT-Drittdienstleister',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.daQ5.maturity.level0',
      level1Key: 'dora.questions.daQ5.maturity.level1',
      level2Key: 'dora.questions.daQ5.maturity.level2',
      level3Key: 'dora.questions.daQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Informationsaustausch (Art. 45 DORA)
  // ============================================================
  {
    id: 'ia-q1',
    beyondMinimum: true,
    categoryId: 'informationsaustausch',
    tier: 'core',
    titleKey: 'dora.questions.iaQ1.title',
    tooltipKey: 'dora.questions.iaQ1.tooltip',
    helpKey: 'dora.questions.iaQ1.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 1 DORA',
      bsigParagraph: 'Austausch von Informationen zu Cyberbedrohungen (freiwillig)',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.iaQ1.maturity.level0',
      level1Key: 'dora.questions.iaQ1.maturity.level1',
      level2Key: 'dora.questions.iaQ1.maturity.level2',
      level3Key: 'dora.questions.iaQ1.maturity.level3',
    },
  },
  {
    id: 'ia-q2',
    beyondMinimum: true,
    categoryId: 'informationsaustausch',
    tier: 'core',
    titleKey: 'dora.questions.iaQ2.title',
    tooltipKey: 'dora.questions.iaQ2.tooltip',
    helpKey: 'dora.questions.iaQ2.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 1 lit. a-b DORA',
      bsigParagraph: 'Vertrauenswürdige Gemeinschaften',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.iaQ2.maturity.level0',
      level1Key: 'dora.questions.iaQ2.maturity.level1',
      level2Key: 'dora.questions.iaQ2.maturity.level2',
      level3Key: 'dora.questions.iaQ2.maturity.level3',
    },
  },
  {
    id: 'ia-q3',
    categoryId: 'informationsaustausch',
    tier: 'core',
    titleKey: 'dora.questions.iaQ3.title',
    tooltipKey: 'dora.questions.iaQ3.tooltip',
    helpKey: 'dora.questions.iaQ3.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 1 lit. c DORA',
      bsigParagraph: 'Vereinbarungen und Verhaltensregeln',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.iaQ3.maturity.level0',
      level1Key: 'dora.questions.iaQ3.maturity.level1',
      level2Key: 'dora.questions.iaQ3.maturity.level2',
      level3Key: 'dora.questions.iaQ3.maturity.level3',
    },
  },
  {
    id: 'ia-q4',
    beyondMinimum: true,
    categoryId: 'informationsaustausch',
    tier: 'advanced',
    titleKey: 'dora.questions.iaQ4.title',
    tooltipKey: 'dora.questions.iaQ4.tooltip',
    helpKey: 'dora.questions.iaQ4.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 1 DORA',
      bsigParagraph: 'Gegenstand des Austauschs',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.iaQ4.maturity.level0',
      level1Key: 'dora.questions.iaQ4.maturity.level1',
      level2Key: 'dora.questions.iaQ4.maturity.level2',
      level3Key: 'dora.questions.iaQ4.maturity.level3',
    },
  },
  {
    id: 'ia-q5',
    categoryId: 'informationsaustausch',
    tier: 'advanced',
    titleKey: 'dora.questions.iaQ5.title',
    tooltipKey: 'dora.questions.iaQ5.tooltip',
    helpKey: 'dora.questions.iaQ5.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 3 DORA',
      bsigParagraph: 'Mitteilung an die zuständige Behörde',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.iaQ5.maturity.level0',
      level1Key: 'dora.questions.iaQ5.maturity.level1',
      level2Key: 'dora.questions.iaQ5.maturity.level2',
      level3Key: 'dora.questions.iaQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Governance & Proportionalitaet (Art. 4-6 DORA)
  // ============================================================
  {
    id: 'gov-q1',
    categoryId: 'governance',
    tier: 'core',
    titleKey: 'dora.questions.govQ1.title',
    tooltipKey: 'dora.questions.govQ1.tooltip',
    helpKey: 'dora.questions.govQ1.help',
    legalReference: {
      euArticle: 'Art. 5 Abs. 2 DORA',
      bsigParagraph: 'Art. 5 DORA (Verantwortung des Leitungsorgans)',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.govQ1.maturity.level0',
      level1Key: 'dora.questions.govQ1.maturity.level1',
      level2Key: 'dora.questions.govQ1.maturity.level2',
      level3Key: 'dora.questions.govQ1.maturity.level3',
    },
  },
  {
    id: 'gov-q2',
    categoryId: 'governance',
    tier: 'core',
    titleKey: 'dora.questions.govQ2.title',
    tooltipKey: 'dora.questions.govQ2.tooltip',
    helpKey: 'dora.questions.govQ2.help',
    legalReference: {
      euArticle: 'Art. 5 Abs. 4 DORA',
      bsigParagraph: 'Art. 5 DORA (IKT-Risikomanagement-Schulungen)',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.govQ2.maturity.level0',
      level1Key: 'dora.questions.govQ2.maturity.level1',
      level2Key: 'dora.questions.govQ2.maturity.level2',
      level3Key: 'dora.questions.govQ2.maturity.level3',
    },
  },
  {
    id: 'gov-q3',
    categoryId: 'governance',
    tier: 'core',
    titleKey: 'dora.questions.govQ3.title',
    tooltipKey: 'dora.questions.govQ3.tooltip',
    helpKey: 'dora.questions.govQ3.help',
    legalReference: {
      euArticle: 'Art. 6 Abs. 5, Art. 13 Abs. 5 DORA',
      bsigParagraph: 'Überprüfung des IKT-Risikomanagementrahmens',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.govQ3.maturity.level0',
      level1Key: 'dora.questions.govQ3.maturity.level1',
      level2Key: 'dora.questions.govQ3.maturity.level2',
      level3Key: 'dora.questions.govQ3.maturity.level3',
    },
  },
  {
    id: 'gov-q4',
    categoryId: 'governance',
    tier: 'advanced',
    titleKey: 'dora.questions.govQ4.title',
    tooltipKey: 'dora.questions.govQ4.tooltip',
    helpKey: 'dora.questions.govQ4.help',
    legalReference: {
      euArticle: 'Art. 4 Abs. 1 DORA',
      bsigParagraph: 'Grundsatz der Verhältnismäßigkeit',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.govQ4.maturity.level0',
      level1Key: 'dora.questions.govQ4.maturity.level1',
      level2Key: 'dora.questions.govQ4.maturity.level2',
      level3Key: 'dora.questions.govQ4.maturity.level3',
    },
  },
  {
    id: 'gov-q5',
    categoryId: 'governance',
    tier: 'advanced',
    titleKey: 'dora.questions.govQ5.title',
    tooltipKey: 'dora.questions.govQ5.tooltip',
    helpKey: 'dora.questions.govQ5.help',
    legalReference: {
      euArticle: 'Art. 6 Abs. 4 DORA',
      bsigParagraph: 'Kontrollfunktion und drei Verteidigungslinien',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.govQ5.maturity.level0',
      level1Key: 'dora.questions.govQ5.maturity.level1',
      level2Key: 'dora.questions.govQ5.maturity.level2',
      level3Key: 'dora.questions.govQ5.maturity.level3',
    },
  },
];
