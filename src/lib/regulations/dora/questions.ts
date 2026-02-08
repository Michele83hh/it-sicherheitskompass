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
      bsigParagraph: 'RTS Art. 15 DORA (IKT-Risikomanagementrahmen)',
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
      euArticle: 'Art. 8 Abs. 1-4 DORA',
      bsigParagraph: 'RTS Art. 15 DORA (Identifizierung von IKT-Assets)',
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
      bsigParagraph: 'RTS Art. 15 DORA (Schutz und Praevention)',
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
      bsigParagraph: 'RTS Art. 15 DORA (Erkennung anomaler Aktivitaeten)',
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
      bsigParagraph: 'RTS Art. 15 DORA (Backup- und Wiederherstellungspolitik)',
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
      bsigParagraph: 'RTS Art. 20 DORA (Klassifizierung von Vorfaellen)',
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
      bsigParagraph: 'RTS Art. 20 DORA (Kriterien fuer schwerwiegende Vorfaelle)',
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
      euArticle: 'Art. 19 Abs. 1-4 DORA',
      bsigParagraph: 'RTS Art. 20 DORA (Meldung schwerwiegender IKT-Vorfaelle)',
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
      euArticle: 'Art. 20 Abs. 1 DORA',
      bsigParagraph: 'ITS Art. 20 DORA (Standardformulare fuer Meldungen)',
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
      euArticle: 'Art. 23 Abs. 1-4 DORA',
      bsigParagraph: 'Art. 23 DORA (Cyberbedrohungsbenachrichtigung)',
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
      euArticle: 'Art. 24 Abs. 1-2 DORA',
      bsigParagraph: 'RTS Art. 26 DORA (Allgemeine Testanforderungen)',
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
      euArticle: 'Art. 25 Abs. 1-3 DORA',
      bsigParagraph: 'RTS Art. 26 DORA (Testen von IKT-Werkzeugen und -Systemen)',
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
    categoryId: 'resilience-testing',
    tier: 'core',
    titleKey: 'dora.questions.rtQ3.title',
    tooltipKey: 'dora.questions.rtQ3.tooltip',
    helpKey: 'dora.questions.rtQ3.help',
    legalReference: {
      euArticle: 'Art. 26 Abs. 1-8 DORA',
      bsigParagraph: 'RTS Art. 26 DORA (TLPT-Anforderungen)',
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
    categoryId: 'resilience-testing',
    tier: 'advanced',
    titleKey: 'dora.questions.rtQ4.title',
    tooltipKey: 'dora.questions.rtQ4.tooltip',
    helpKey: 'dora.questions.rtQ4.help',
    legalReference: {
      euArticle: 'Art. 26 Abs. 2-4 DORA',
      bsigParagraph: 'RTS Art. 26 DORA (Qualifikation von TLPT-Testern)',
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
    categoryId: 'resilience-testing',
    tier: 'advanced',
    titleKey: 'dora.questions.rtQ5.title',
    tooltipKey: 'dora.questions.rtQ5.tooltip',
    helpKey: 'dora.questions.rtQ5.help',
    legalReference: {
      euArticle: 'Art. 27 Abs. 1-3 DORA',
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
  // Category 4: ICT-Drittanbieter-Risikomanagement (Art. 28-44)
  // ============================================================
  {
    id: 'da-q1',
    categoryId: 'drittanbieter',
    tier: 'core',
    titleKey: 'dora.questions.daQ1.title',
    tooltipKey: 'dora.questions.daQ1.tooltip',
    helpKey: 'dora.questions.daQ1.help',
    legalReference: {
      euArticle: 'Art. 28 Abs. 1-3 DORA',
      bsigParagraph: 'RTS Art. 28 Abs. 9 DORA (IKT-Drittanbieterrisiko)',
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
      euArticle: 'Art. 28 Abs. 4-8 DORA',
      bsigParagraph: 'RTS Art. 28 Abs. 9 DORA (Vertragliche Anforderungen)',
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
      bsigParagraph: 'RTS Art. 28 Abs. 9 DORA (Konzentrationsrisiko)',
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
      euArticle: 'Art. 30 Abs. 1-5 DORA',
      bsigParagraph: 'Art. 30 DORA (Wesentliche Vertragsbestimmungen)',
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
    categoryId: 'drittanbieter',
    tier: 'advanced',
    titleKey: 'dora.questions.daQ5.title',
    tooltipKey: 'dora.questions.daQ5.tooltip',
    helpKey: 'dora.questions.daQ5.help',
    legalReference: {
      euArticle: 'Art. 31 Abs. 1-12 DORA',
      bsigParagraph: 'Art. 31 DORA (Ueberwachungsrahmen kritischer IKT-Drittdienstleister)',
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
    categoryId: 'informationsaustausch',
    tier: 'core',
    titleKey: 'dora.questions.iaQ1.title',
    tooltipKey: 'dora.questions.iaQ1.tooltip',
    helpKey: 'dora.questions.iaQ1.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 1-2 DORA',
      bsigParagraph: 'Leitlinien Art. 45 DORA (Teilnahme am Informationsaustausch)',
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
    categoryId: 'informationsaustausch',
    tier: 'core',
    titleKey: 'dora.questions.iaQ2.title',
    tooltipKey: 'dora.questions.iaQ2.tooltip',
    helpKey: 'dora.questions.iaQ2.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 3 DORA',
      bsigParagraph: 'Leitlinien Art. 45 DORA (Qualitaet der Informationen)',
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
      euArticle: 'Art. 45 Abs. 4 DORA',
      bsigParagraph: 'Leitlinien Art. 45 DORA (Vertraulichkeitsvereinbarungen)',
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
    categoryId: 'informationsaustausch',
    tier: 'advanced',
    titleKey: 'dora.questions.iaQ4.title',
    tooltipKey: 'dora.questions.iaQ4.tooltip',
    helpKey: 'dora.questions.iaQ4.help',
    legalReference: {
      euArticle: 'Art. 45 Abs. 1 DORA',
      bsigParagraph: 'Leitlinien Art. 45 DORA (Bedrohungsindikatoren und TLP)',
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
      euArticle: 'Art. 45 Abs. 2 DORA',
      bsigParagraph: 'Leitlinien Art. 45 DORA (Meldung an Aufsichtsbehoerden)',
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
      euArticle: 'Art. 5 Abs. 1-2 DORA',
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
      euArticle: 'Art. 6 Abs. 5-8 DORA',
      bsigParagraph: 'Art. 6 DORA (IKT-Risikomanagementrahmen - Ueberpruefen und Berichten)',
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
      euArticle: 'Art. 4 Abs. 1-2 DORA',
      bsigParagraph: 'Art. 4 DORA (Proportionalitaetsgrundsatz)',
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
      euArticle: 'Art. 6 Abs. 1-4 DORA',
      bsigParagraph: 'RTS Art. 15 DORA (Unabhaengige Kontrollfunktion)',
    },
    maturityDescriptions: {
      level0Key: 'dora.questions.govQ5.maturity.level0',
      level1Key: 'dora.questions.govQ5.maturity.level1',
      level2Key: 'dora.questions.govQ5.maturity.level2',
      level3Key: 'dora.questions.govQ5.maturity.level3',
    },
  },
];
