/**
 * DSGVO Gap Analysis Questions
 *
 * 50 questions across 10 DSGVO categories, 5 per category.
 * Per category: 3 core questions + 2 advanced questions.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Legal basis: Verordnung (EU) 2016/679 (DSGVO)
 * National implementation: Bundesdatenschutzgesetz (BDSG)
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Datenschutz-Folgenabschaetzung (DSFA)
  // Art. 35-36 DSGVO
  // ============================================================
  {
    id: 'dsfa-q1',
    categoryId: 'dsfa',
    tier: 'core',
    titleKey: 'dsgvo.questions.dsfaQ1.title',
    tooltipKey: 'dsgvo.questions.dsfaQ1.tooltip',
    helpKey: 'dsgvo.questions.dsfaQ1.help',
    legalReference: {
      euArticle: 'Art. 35 Abs. 1 DSGVO',
      bsigParagraph: '§67 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsfaQ1.maturity.level0',
      level1Key: 'dsgvo.questions.dsfaQ1.maturity.level1',
      level2Key: 'dsgvo.questions.dsfaQ1.maturity.level2',
      level3Key: 'dsgvo.questions.dsfaQ1.maturity.level3',
    },
  },
  {
    id: 'dsfa-q2',
    categoryId: 'dsfa',
    tier: 'core',
    titleKey: 'dsgvo.questions.dsfaQ2.title',
    tooltipKey: 'dsgvo.questions.dsfaQ2.tooltip',
    helpKey: 'dsgvo.questions.dsfaQ2.help',
    legalReference: {
      euArticle: 'Art. 35 Abs. 3 DSGVO',
      bsigParagraph: '§67 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsfaQ2.maturity.level0',
      level1Key: 'dsgvo.questions.dsfaQ2.maturity.level1',
      level2Key: 'dsgvo.questions.dsfaQ2.maturity.level2',
      level3Key: 'dsgvo.questions.dsfaQ2.maturity.level3',
    },
  },
  {
    id: 'dsfa-q3',
    categoryId: 'dsfa',
    tier: 'core',
    titleKey: 'dsgvo.questions.dsfaQ3.title',
    tooltipKey: 'dsgvo.questions.dsfaQ3.tooltip',
    helpKey: 'dsgvo.questions.dsfaQ3.help',
    legalReference: {
      euArticle: 'Art. 35 Abs. 7 DSGVO',
      bsigParagraph: '§67 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsfaQ3.maturity.level0',
      level1Key: 'dsgvo.questions.dsfaQ3.maturity.level1',
      level2Key: 'dsgvo.questions.dsfaQ3.maturity.level2',
      level3Key: 'dsgvo.questions.dsfaQ3.maturity.level3',
    },
  },
  {
    id: 'dsfa-q4',
    categoryId: 'dsfa',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dsfaQ4.title',
    tooltipKey: 'dsgvo.questions.dsfaQ4.tooltip',
    helpKey: 'dsgvo.questions.dsfaQ4.help',
    legalReference: {
      euArticle: 'Art. 36 Abs. 1 DSGVO',
      bsigParagraph: '§67 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsfaQ4.maturity.level0',
      level1Key: 'dsgvo.questions.dsfaQ4.maturity.level1',
      level2Key: 'dsgvo.questions.dsfaQ4.maturity.level2',
      level3Key: 'dsgvo.questions.dsfaQ4.maturity.level3',
    },
  },
  {
    id: 'dsfa-q5',
    categoryId: 'dsfa',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dsfaQ5.title',
    tooltipKey: 'dsgvo.questions.dsfaQ5.tooltip',
    helpKey: 'dsgvo.questions.dsfaQ5.help',
    legalReference: {
      euArticle: 'Art. 35 Abs. 11 DSGVO',
      bsigParagraph: '§67 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsfaQ5.maturity.level0',
      level1Key: 'dsgvo.questions.dsfaQ5.maturity.level1',
      level2Key: 'dsgvo.questions.dsfaQ5.maturity.level2',
      level3Key: 'dsgvo.questions.dsfaQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Verarbeitungsverzeichnis
  // Art. 30 DSGVO
  // ============================================================
  {
    id: 'vv-q1',
    categoryId: 'verarbeitungsverzeichnis',
    tier: 'core',
    titleKey: 'dsgvo.questions.vvQ1.title',
    tooltipKey: 'dsgvo.questions.vvQ1.tooltip',
    helpKey: 'dsgvo.questions.vvQ1.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 1 DSGVO',
      bsigParagraph: '§70 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.vvQ1.maturity.level0',
      level1Key: 'dsgvo.questions.vvQ1.maturity.level1',
      level2Key: 'dsgvo.questions.vvQ1.maturity.level2',
      level3Key: 'dsgvo.questions.vvQ1.maturity.level3',
    },
  },
  {
    id: 'vv-q2',
    categoryId: 'verarbeitungsverzeichnis',
    tier: 'core',
    titleKey: 'dsgvo.questions.vvQ2.title',
    tooltipKey: 'dsgvo.questions.vvQ2.tooltip',
    helpKey: 'dsgvo.questions.vvQ2.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 1 lit. b-d DSGVO',
      bsigParagraph: '§70 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.vvQ2.maturity.level0',
      level1Key: 'dsgvo.questions.vvQ2.maturity.level1',
      level2Key: 'dsgvo.questions.vvQ2.maturity.level2',
      level3Key: 'dsgvo.questions.vvQ2.maturity.level3',
    },
  },
  {
    id: 'vv-q3',
    categoryId: 'verarbeitungsverzeichnis',
    tier: 'core',
    titleKey: 'dsgvo.questions.vvQ3.title',
    tooltipKey: 'dsgvo.questions.vvQ3.tooltip',
    helpKey: 'dsgvo.questions.vvQ3.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 1 lit. f-g DSGVO',
      bsigParagraph: '§70 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.vvQ3.maturity.level0',
      level1Key: 'dsgvo.questions.vvQ3.maturity.level1',
      level2Key: 'dsgvo.questions.vvQ3.maturity.level2',
      level3Key: 'dsgvo.questions.vvQ3.maturity.level3',
    },
  },
  {
    id: 'vv-q4',
    categoryId: 'verarbeitungsverzeichnis',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.vvQ4.title',
    tooltipKey: 'dsgvo.questions.vvQ4.tooltip',
    helpKey: 'dsgvo.questions.vvQ4.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 2 DSGVO',
      bsigParagraph: '§70 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.vvQ4.maturity.level0',
      level1Key: 'dsgvo.questions.vvQ4.maturity.level1',
      level2Key: 'dsgvo.questions.vvQ4.maturity.level2',
      level3Key: 'dsgvo.questions.vvQ4.maturity.level3',
    },
  },
  {
    id: 'vv-q5',
    categoryId: 'verarbeitungsverzeichnis',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.vvQ5.title',
    tooltipKey: 'dsgvo.questions.vvQ5.tooltip',
    helpKey: 'dsgvo.questions.vvQ5.help',
    legalReference: {
      euArticle: 'Art. 30 Abs. 5 DSGVO',
      bsigParagraph: '§70 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.vvQ5.maturity.level0',
      level1Key: 'dsgvo.questions.vvQ5.maturity.level1',
      level2Key: 'dsgvo.questions.vvQ5.maturity.level2',
      level3Key: 'dsgvo.questions.vvQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Einwilligungsmanagement
  // Art. 6-7 DSGVO
  // ============================================================
  {
    id: 'ew-q1',
    categoryId: 'einwilligung',
    tier: 'core',
    titleKey: 'dsgvo.questions.ewQ1.title',
    tooltipKey: 'dsgvo.questions.ewQ1.tooltip',
    helpKey: 'dsgvo.questions.ewQ1.help',
    legalReference: {
      euArticle: 'Art. 6 Abs. 1 DSGVO',
      bsigParagraph: '§26 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.ewQ1.maturity.level0',
      level1Key: 'dsgvo.questions.ewQ1.maturity.level1',
      level2Key: 'dsgvo.questions.ewQ1.maturity.level2',
      level3Key: 'dsgvo.questions.ewQ1.maturity.level3',
    },
  },
  {
    id: 'ew-q2',
    categoryId: 'einwilligung',
    tier: 'core',
    titleKey: 'dsgvo.questions.ewQ2.title',
    tooltipKey: 'dsgvo.questions.ewQ2.tooltip',
    helpKey: 'dsgvo.questions.ewQ2.help',
    legalReference: {
      euArticle: 'Art. 7 Abs. 1 DSGVO',
      bsigParagraph: '§26 Abs. 2 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.ewQ2.maturity.level0',
      level1Key: 'dsgvo.questions.ewQ2.maturity.level1',
      level2Key: 'dsgvo.questions.ewQ2.maturity.level2',
      level3Key: 'dsgvo.questions.ewQ2.maturity.level3',
    },
  },
  {
    id: 'ew-q3',
    categoryId: 'einwilligung',
    tier: 'core',
    titleKey: 'dsgvo.questions.ewQ3.title',
    tooltipKey: 'dsgvo.questions.ewQ3.tooltip',
    helpKey: 'dsgvo.questions.ewQ3.help',
    legalReference: {
      euArticle: 'Art. 7 Abs. 3 DSGVO',
      bsigParagraph: '§26 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.ewQ3.maturity.level0',
      level1Key: 'dsgvo.questions.ewQ3.maturity.level1',
      level2Key: 'dsgvo.questions.ewQ3.maturity.level2',
      level3Key: 'dsgvo.questions.ewQ3.maturity.level3',
    },
  },
  {
    id: 'ew-q4',
    categoryId: 'einwilligung',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.ewQ4.title',
    tooltipKey: 'dsgvo.questions.ewQ4.tooltip',
    helpKey: 'dsgvo.questions.ewQ4.help',
    legalReference: {
      euArticle: 'Art. 8 DSGVO',
      bsigParagraph: '§26 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.ewQ4.maturity.level0',
      level1Key: 'dsgvo.questions.ewQ4.maturity.level1',
      level2Key: 'dsgvo.questions.ewQ4.maturity.level2',
      level3Key: 'dsgvo.questions.ewQ4.maturity.level3',
    },
  },
  {
    id: 'ew-q5',
    categoryId: 'einwilligung',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.ewQ5.title',
    tooltipKey: 'dsgvo.questions.ewQ5.tooltip',
    helpKey: 'dsgvo.questions.ewQ5.help',
    legalReference: {
      euArticle: 'Art. 9 Abs. 2 lit. a DSGVO',
      bsigParagraph: '§22 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.ewQ5.maturity.level0',
      level1Key: 'dsgvo.questions.ewQ5.maturity.level1',
      level2Key: 'dsgvo.questions.ewQ5.maturity.level2',
      level3Key: 'dsgvo.questions.ewQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Betroffenenrechte
  // Art. 15-22 DSGVO
  // ============================================================
  {
    id: 'br-q1',
    categoryId: 'betroffenenrechte',
    tier: 'core',
    titleKey: 'dsgvo.questions.brQ1.title',
    tooltipKey: 'dsgvo.questions.brQ1.tooltip',
    helpKey: 'dsgvo.questions.brQ1.help',
    legalReference: {
      euArticle: 'Art. 15 DSGVO',
      bsigParagraph: '§34 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.brQ1.maturity.level0',
      level1Key: 'dsgvo.questions.brQ1.maturity.level1',
      level2Key: 'dsgvo.questions.brQ1.maturity.level2',
      level3Key: 'dsgvo.questions.brQ1.maturity.level3',
    },
  },
  {
    id: 'br-q2',
    categoryId: 'betroffenenrechte',
    tier: 'core',
    titleKey: 'dsgvo.questions.brQ2.title',
    tooltipKey: 'dsgvo.questions.brQ2.tooltip',
    helpKey: 'dsgvo.questions.brQ2.help',
    legalReference: {
      euArticle: 'Art. 16-17 DSGVO',
      bsigParagraph: '§35 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.brQ2.maturity.level0',
      level1Key: 'dsgvo.questions.brQ2.maturity.level1',
      level2Key: 'dsgvo.questions.brQ2.maturity.level2',
      level3Key: 'dsgvo.questions.brQ2.maturity.level3',
    },
  },
  {
    id: 'br-q3',
    categoryId: 'betroffenenrechte',
    tier: 'core',
    titleKey: 'dsgvo.questions.brQ3.title',
    tooltipKey: 'dsgvo.questions.brQ3.tooltip',
    helpKey: 'dsgvo.questions.brQ3.help',
    legalReference: {
      euArticle: 'Art. 20 DSGVO',
      bsigParagraph: '§36 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.brQ3.maturity.level0',
      level1Key: 'dsgvo.questions.brQ3.maturity.level1',
      level2Key: 'dsgvo.questions.brQ3.maturity.level2',
      level3Key: 'dsgvo.questions.brQ3.maturity.level3',
    },
  },
  {
    id: 'br-q4',
    categoryId: 'betroffenenrechte',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.brQ4.title',
    tooltipKey: 'dsgvo.questions.brQ4.tooltip',
    helpKey: 'dsgvo.questions.brQ4.help',
    legalReference: {
      euArticle: 'Art. 21 DSGVO',
      bsigParagraph: '§36 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.brQ4.maturity.level0',
      level1Key: 'dsgvo.questions.brQ4.maturity.level1',
      level2Key: 'dsgvo.questions.brQ4.maturity.level2',
      level3Key: 'dsgvo.questions.brQ4.maturity.level3',
    },
  },
  {
    id: 'br-q5',
    categoryId: 'betroffenenrechte',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.brQ5.title',
    tooltipKey: 'dsgvo.questions.brQ5.tooltip',
    helpKey: 'dsgvo.questions.brQ5.help',
    legalReference: {
      euArticle: 'Art. 22 DSGVO',
      bsigParagraph: '§37 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.brQ5.maturity.level0',
      level1Key: 'dsgvo.questions.brQ5.maturity.level1',
      level2Key: 'dsgvo.questions.brQ5.maturity.level2',
      level3Key: 'dsgvo.questions.brQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Datenschutzverletzungen
  // Art. 33-34 DSGVO
  // ============================================================
  {
    id: 'dv-q1',
    categoryId: 'datenschutzverletzung',
    tier: 'core',
    titleKey: 'dsgvo.questions.dvQ1.title',
    tooltipKey: 'dsgvo.questions.dvQ1.tooltip',
    helpKey: 'dsgvo.questions.dvQ1.help',
    legalReference: {
      euArticle: 'Art. 33 Abs. 1 DSGVO',
      bsigParagraph: '§65 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dvQ1.maturity.level0',
      level1Key: 'dsgvo.questions.dvQ1.maturity.level1',
      level2Key: 'dsgvo.questions.dvQ1.maturity.level2',
      level3Key: 'dsgvo.questions.dvQ1.maturity.level3',
    },
  },
  {
    id: 'dv-q2',
    categoryId: 'datenschutzverletzung',
    tier: 'core',
    titleKey: 'dsgvo.questions.dvQ2.title',
    tooltipKey: 'dsgvo.questions.dvQ2.tooltip',
    helpKey: 'dsgvo.questions.dvQ2.help',
    legalReference: {
      euArticle: 'Art. 33 Abs. 3 DSGVO',
      bsigParagraph: '§65 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dvQ2.maturity.level0',
      level1Key: 'dsgvo.questions.dvQ2.maturity.level1',
      level2Key: 'dsgvo.questions.dvQ2.maturity.level2',
      level3Key: 'dsgvo.questions.dvQ2.maturity.level3',
    },
  },
  {
    id: 'dv-q3',
    categoryId: 'datenschutzverletzung',
    tier: 'core',
    titleKey: 'dsgvo.questions.dvQ3.title',
    tooltipKey: 'dsgvo.questions.dvQ3.tooltip',
    helpKey: 'dsgvo.questions.dvQ3.help',
    legalReference: {
      euArticle: 'Art. 34 Abs. 1 DSGVO',
      bsigParagraph: '§66 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dvQ3.maturity.level0',
      level1Key: 'dsgvo.questions.dvQ3.maturity.level1',
      level2Key: 'dsgvo.questions.dvQ3.maturity.level2',
      level3Key: 'dsgvo.questions.dvQ3.maturity.level3',
    },
  },
  {
    id: 'dv-q4',
    categoryId: 'datenschutzverletzung',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dvQ4.title',
    tooltipKey: 'dsgvo.questions.dvQ4.tooltip',
    helpKey: 'dsgvo.questions.dvQ4.help',
    legalReference: {
      euArticle: 'Art. 33 Abs. 5 DSGVO',
      bsigParagraph: '§65 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dvQ4.maturity.level0',
      level1Key: 'dsgvo.questions.dvQ4.maturity.level1',
      level2Key: 'dsgvo.questions.dvQ4.maturity.level2',
      level3Key: 'dsgvo.questions.dvQ4.maturity.level3',
    },
  },
  {
    id: 'dv-q5',
    categoryId: 'datenschutzverletzung',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dvQ5.title',
    tooltipKey: 'dsgvo.questions.dvQ5.tooltip',
    helpKey: 'dsgvo.questions.dvQ5.help',
    legalReference: {
      euArticle: 'Art. 34 Abs. 3 DSGVO',
      bsigParagraph: '§66 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dvQ5.maturity.level0',
      level1Key: 'dsgvo.questions.dvQ5.maturity.level1',
      level2Key: 'dsgvo.questions.dvQ5.maturity.level2',
      level3Key: 'dsgvo.questions.dvQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Datenschutzbeauftragter (DSB)
  // Art. 37-39 DSGVO
  // ============================================================
  {
    id: 'dsb-q1',
    categoryId: 'dsb',
    tier: 'core',
    titleKey: 'dsgvo.questions.dsbQ1.title',
    tooltipKey: 'dsgvo.questions.dsbQ1.tooltip',
    helpKey: 'dsgvo.questions.dsbQ1.help',
    legalReference: {
      euArticle: 'Art. 37 Abs. 1 DSGVO',
      bsigParagraph: '§38 Abs. 1 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsbQ1.maturity.level0',
      level1Key: 'dsgvo.questions.dsbQ1.maturity.level1',
      level2Key: 'dsgvo.questions.dsbQ1.maturity.level2',
      level3Key: 'dsgvo.questions.dsbQ1.maturity.level3',
    },
  },
  {
    id: 'dsb-q2',
    categoryId: 'dsb',
    tier: 'core',
    titleKey: 'dsgvo.questions.dsbQ2.title',
    tooltipKey: 'dsgvo.questions.dsbQ2.tooltip',
    helpKey: 'dsgvo.questions.dsbQ2.help',
    legalReference: {
      euArticle: 'Art. 38 Abs. 1-2 DSGVO',
      bsigParagraph: '§38 Abs. 2 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsbQ2.maturity.level0',
      level1Key: 'dsgvo.questions.dsbQ2.maturity.level1',
      level2Key: 'dsgvo.questions.dsbQ2.maturity.level2',
      level3Key: 'dsgvo.questions.dsbQ2.maturity.level3',
    },
  },
  {
    id: 'dsb-q3',
    categoryId: 'dsb',
    tier: 'core',
    titleKey: 'dsgvo.questions.dsbQ3.title',
    tooltipKey: 'dsgvo.questions.dsbQ3.tooltip',
    helpKey: 'dsgvo.questions.dsbQ3.help',
    legalReference: {
      euArticle: 'Art. 39 Abs. 1 DSGVO',
      bsigParagraph: '§38 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsbQ3.maturity.level0',
      level1Key: 'dsgvo.questions.dsbQ3.maturity.level1',
      level2Key: 'dsgvo.questions.dsbQ3.maturity.level2',
      level3Key: 'dsgvo.questions.dsbQ3.maturity.level3',
    },
  },
  {
    id: 'dsb-q4',
    categoryId: 'dsb',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dsbQ4.title',
    tooltipKey: 'dsgvo.questions.dsbQ4.tooltip',
    helpKey: 'dsgvo.questions.dsbQ4.help',
    legalReference: {
      euArticle: 'Art. 37 Abs. 7 DSGVO',
      bsigParagraph: '§38 Abs. 1 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsbQ4.maturity.level0',
      level1Key: 'dsgvo.questions.dsbQ4.maturity.level1',
      level2Key: 'dsgvo.questions.dsbQ4.maturity.level2',
      level3Key: 'dsgvo.questions.dsbQ4.maturity.level3',
    },
  },
  {
    id: 'dsb-q5',
    categoryId: 'dsb',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dsbQ5.title',
    tooltipKey: 'dsgvo.questions.dsbQ5.tooltip',
    helpKey: 'dsgvo.questions.dsbQ5.help',
    legalReference: {
      euArticle: 'Art. 38 Abs. 3 DSGVO',
      bsigParagraph: '§38 Abs. 2 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dsbQ5.maturity.level0',
      level1Key: 'dsgvo.questions.dsbQ5.maturity.level1',
      level2Key: 'dsgvo.questions.dsbQ5.maturity.level2',
      level3Key: 'dsgvo.questions.dsbQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Internationale Datenuebermittlung
  // Art. 44-49 DSGVO
  // ============================================================
  {
    id: 'dt-q1',
    categoryId: 'datentransfer',
    tier: 'core',
    titleKey: 'dsgvo.questions.dtQ1.title',
    tooltipKey: 'dsgvo.questions.dtQ1.tooltip',
    helpKey: 'dsgvo.questions.dtQ1.help',
    legalReference: {
      euArticle: 'Art. 44 DSGVO',
      bsigParagraph: '§78 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dtQ1.maturity.level0',
      level1Key: 'dsgvo.questions.dtQ1.maturity.level1',
      level2Key: 'dsgvo.questions.dtQ1.maturity.level2',
      level3Key: 'dsgvo.questions.dtQ1.maturity.level3',
    },
  },
  {
    id: 'dt-q2',
    categoryId: 'datentransfer',
    tier: 'core',
    titleKey: 'dsgvo.questions.dtQ2.title',
    tooltipKey: 'dsgvo.questions.dtQ2.tooltip',
    helpKey: 'dsgvo.questions.dtQ2.help',
    legalReference: {
      euArticle: 'Art. 46 Abs. 2 lit. c DSGVO',
      bsigParagraph: '§78 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dtQ2.maturity.level0',
      level1Key: 'dsgvo.questions.dtQ2.maturity.level1',
      level2Key: 'dsgvo.questions.dtQ2.maturity.level2',
      level3Key: 'dsgvo.questions.dtQ2.maturity.level3',
    },
  },
  {
    id: 'dt-q3',
    categoryId: 'datentransfer',
    tier: 'core',
    titleKey: 'dsgvo.questions.dtQ3.title',
    tooltipKey: 'dsgvo.questions.dtQ3.tooltip',
    helpKey: 'dsgvo.questions.dtQ3.help',
    legalReference: {
      euArticle: 'Art. 45 DSGVO',
      bsigParagraph: '§78 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dtQ3.maturity.level0',
      level1Key: 'dsgvo.questions.dtQ3.maturity.level1',
      level2Key: 'dsgvo.questions.dtQ3.maturity.level2',
      level3Key: 'dsgvo.questions.dtQ3.maturity.level3',
    },
  },
  {
    id: 'dt-q4',
    categoryId: 'datentransfer',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dtQ4.title',
    tooltipKey: 'dsgvo.questions.dtQ4.tooltip',
    helpKey: 'dsgvo.questions.dtQ4.help',
    legalReference: {
      euArticle: 'Art. 46 Abs. 2 DSGVO',
      bsigParagraph: '§78 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dtQ4.maturity.level0',
      level1Key: 'dsgvo.questions.dtQ4.maturity.level1',
      level2Key: 'dsgvo.questions.dtQ4.maturity.level2',
      level3Key: 'dsgvo.questions.dtQ4.maturity.level3',
    },
  },
  {
    id: 'dt-q5',
    categoryId: 'datentransfer',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.dtQ5.title',
    tooltipKey: 'dsgvo.questions.dtQ5.tooltip',
    helpKey: 'dsgvo.questions.dtQ5.help',
    legalReference: {
      euArticle: 'Art. 49 DSGVO',
      bsigParagraph: '§79-80 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.dtQ5.maturity.level0',
      level1Key: 'dsgvo.questions.dtQ5.maturity.level1',
      level2Key: 'dsgvo.questions.dtQ5.maturity.level2',
      level3Key: 'dsgvo.questions.dtQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Technische & Organisatorische Massnahmen (TOMs)
  // Art. 32 DSGVO
  // ============================================================
  {
    id: 'tom-q1',
    categoryId: 'toms',
    tier: 'core',
    titleKey: 'dsgvo.questions.tomQ1.title',
    tooltipKey: 'dsgvo.questions.tomQ1.tooltip',
    helpKey: 'dsgvo.questions.tomQ1.help',
    legalReference: {
      euArticle: 'Art. 32 Abs. 1 lit. a DSGVO',
      bsigParagraph: '§64 Abs. 1 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.tomQ1.maturity.level0',
      level1Key: 'dsgvo.questions.tomQ1.maturity.level1',
      level2Key: 'dsgvo.questions.tomQ1.maturity.level2',
      level3Key: 'dsgvo.questions.tomQ1.maturity.level3',
    },
  },
  {
    id: 'tom-q2',
    categoryId: 'toms',
    tier: 'core',
    titleKey: 'dsgvo.questions.tomQ2.title',
    tooltipKey: 'dsgvo.questions.tomQ2.tooltip',
    helpKey: 'dsgvo.questions.tomQ2.help',
    legalReference: {
      euArticle: 'Art. 32 Abs. 1 lit. b DSGVO',
      bsigParagraph: '§64 Abs. 1 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.tomQ2.maturity.level0',
      level1Key: 'dsgvo.questions.tomQ2.maturity.level1',
      level2Key: 'dsgvo.questions.tomQ2.maturity.level2',
      level3Key: 'dsgvo.questions.tomQ2.maturity.level3',
    },
  },
  {
    id: 'tom-q3',
    categoryId: 'toms',
    tier: 'core',
    titleKey: 'dsgvo.questions.tomQ3.title',
    tooltipKey: 'dsgvo.questions.tomQ3.tooltip',
    helpKey: 'dsgvo.questions.tomQ3.help',
    legalReference: {
      euArticle: 'Art. 32 Abs. 1 lit. c-d DSGVO',
      bsigParagraph: '§64 Abs. 1 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.tomQ3.maturity.level0',
      level1Key: 'dsgvo.questions.tomQ3.maturity.level1',
      level2Key: 'dsgvo.questions.tomQ3.maturity.level2',
      level3Key: 'dsgvo.questions.tomQ3.maturity.level3',
    },
  },
  {
    id: 'tom-q4',
    categoryId: 'toms',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.tomQ4.title',
    tooltipKey: 'dsgvo.questions.tomQ4.tooltip',
    helpKey: 'dsgvo.questions.tomQ4.help',
    legalReference: {
      euArticle: 'Art. 32 Abs. 1 lit. d DSGVO',
      bsigParagraph: '§64 Abs. 2 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.tomQ4.maturity.level0',
      level1Key: 'dsgvo.questions.tomQ4.maturity.level1',
      level2Key: 'dsgvo.questions.tomQ4.maturity.level2',
      level3Key: 'dsgvo.questions.tomQ4.maturity.level3',
    },
  },
  {
    id: 'tom-q5',
    categoryId: 'toms',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.tomQ5.title',
    tooltipKey: 'dsgvo.questions.tomQ5.tooltip',
    helpKey: 'dsgvo.questions.tomQ5.help',
    legalReference: {
      euArticle: 'Art. 32 Abs. 2 DSGVO',
      bsigParagraph: '§64 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.tomQ5.maturity.level0',
      level1Key: 'dsgvo.questions.tomQ5.maturity.level1',
      level2Key: 'dsgvo.questions.tomQ5.maturity.level2',
      level3Key: 'dsgvo.questions.tomQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 9: Privacy by Design & Default
  // Art. 25 DSGVO
  // ============================================================
  {
    id: 'pbd-q1',
    categoryId: 'privacy-by-design',
    tier: 'core',
    titleKey: 'dsgvo.questions.pbdQ1.title',
    tooltipKey: 'dsgvo.questions.pbdQ1.tooltip',
    helpKey: 'dsgvo.questions.pbdQ1.help',
    legalReference: {
      euArticle: 'Art. 25 Abs. 1 DSGVO',
      bsigParagraph: '§71 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.pbdQ1.maturity.level0',
      level1Key: 'dsgvo.questions.pbdQ1.maturity.level1',
      level2Key: 'dsgvo.questions.pbdQ1.maturity.level2',
      level3Key: 'dsgvo.questions.pbdQ1.maturity.level3',
    },
  },
  {
    id: 'pbd-q2',
    categoryId: 'privacy-by-design',
    tier: 'core',
    titleKey: 'dsgvo.questions.pbdQ2.title',
    tooltipKey: 'dsgvo.questions.pbdQ2.tooltip',
    helpKey: 'dsgvo.questions.pbdQ2.help',
    legalReference: {
      euArticle: 'Art. 25 Abs. 2 DSGVO',
      bsigParagraph: '§71 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.pbdQ2.maturity.level0',
      level1Key: 'dsgvo.questions.pbdQ2.maturity.level1',
      level2Key: 'dsgvo.questions.pbdQ2.maturity.level2',
      level3Key: 'dsgvo.questions.pbdQ2.maturity.level3',
    },
  },
  {
    id: 'pbd-q3',
    categoryId: 'privacy-by-design',
    tier: 'core',
    titleKey: 'dsgvo.questions.pbdQ3.title',
    tooltipKey: 'dsgvo.questions.pbdQ3.tooltip',
    helpKey: 'dsgvo.questions.pbdQ3.help',
    legalReference: {
      euArticle: 'Art. 5 Abs. 1 lit. c DSGVO',
      bsigParagraph: '§71 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.pbdQ3.maturity.level0',
      level1Key: 'dsgvo.questions.pbdQ3.maturity.level1',
      level2Key: 'dsgvo.questions.pbdQ3.maturity.level2',
      level3Key: 'dsgvo.questions.pbdQ3.maturity.level3',
    },
  },
  {
    id: 'pbd-q4',
    categoryId: 'privacy-by-design',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.pbdQ4.title',
    tooltipKey: 'dsgvo.questions.pbdQ4.tooltip',
    helpKey: 'dsgvo.questions.pbdQ4.help',
    legalReference: {
      euArticle: 'Art. 25 Abs. 3 DSGVO',
      bsigParagraph: '§71 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.pbdQ4.maturity.level0',
      level1Key: 'dsgvo.questions.pbdQ4.maturity.level1',
      level2Key: 'dsgvo.questions.pbdQ4.maturity.level2',
      level3Key: 'dsgvo.questions.pbdQ4.maturity.level3',
    },
  },
  {
    id: 'pbd-q5',
    categoryId: 'privacy-by-design',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.pbdQ5.title',
    tooltipKey: 'dsgvo.questions.pbdQ5.tooltip',
    helpKey: 'dsgvo.questions.pbdQ5.help',
    legalReference: {
      euArticle: 'Art. 5 Abs. 1 lit. e DSGVO',
      bsigParagraph: '§71 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.pbdQ5.maturity.level0',
      level1Key: 'dsgvo.questions.pbdQ5.maturity.level1',
      level2Key: 'dsgvo.questions.pbdQ5.maturity.level2',
      level3Key: 'dsgvo.questions.pbdQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 10: Auftragsverarbeitung
  // Art. 28-29 DSGVO
  // ============================================================
  {
    id: 'av-q1',
    categoryId: 'auftragsverarbeitung',
    tier: 'core',
    titleKey: 'dsgvo.questions.avQ1.title',
    tooltipKey: 'dsgvo.questions.avQ1.tooltip',
    helpKey: 'dsgvo.questions.avQ1.help',
    legalReference: {
      euArticle: 'Art. 28 Abs. 1 DSGVO',
      bsigParagraph: '§62 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.avQ1.maturity.level0',
      level1Key: 'dsgvo.questions.avQ1.maturity.level1',
      level2Key: 'dsgvo.questions.avQ1.maturity.level2',
      level3Key: 'dsgvo.questions.avQ1.maturity.level3',
    },
  },
  {
    id: 'av-q2',
    categoryId: 'auftragsverarbeitung',
    tier: 'core',
    titleKey: 'dsgvo.questions.avQ2.title',
    tooltipKey: 'dsgvo.questions.avQ2.tooltip',
    helpKey: 'dsgvo.questions.avQ2.help',
    legalReference: {
      euArticle: 'Art. 28 Abs. 3 DSGVO',
      bsigParagraph: '§62 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.avQ2.maturity.level0',
      level1Key: 'dsgvo.questions.avQ2.maturity.level1',
      level2Key: 'dsgvo.questions.avQ2.maturity.level2',
      level3Key: 'dsgvo.questions.avQ2.maturity.level3',
    },
  },
  {
    id: 'av-q3',
    categoryId: 'auftragsverarbeitung',
    tier: 'core',
    titleKey: 'dsgvo.questions.avQ3.title',
    tooltipKey: 'dsgvo.questions.avQ3.tooltip',
    helpKey: 'dsgvo.questions.avQ3.help',
    legalReference: {
      euArticle: 'Art. 28 Abs. 2 DSGVO',
      bsigParagraph: '§62 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.avQ3.maturity.level0',
      level1Key: 'dsgvo.questions.avQ3.maturity.level1',
      level2Key: 'dsgvo.questions.avQ3.maturity.level2',
      level3Key: 'dsgvo.questions.avQ3.maturity.level3',
    },
  },
  {
    id: 'av-q4',
    categoryId: 'auftragsverarbeitung',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.avQ4.title',
    tooltipKey: 'dsgvo.questions.avQ4.tooltip',
    helpKey: 'dsgvo.questions.avQ4.help',
    legalReference: {
      euArticle: 'Art. 28 Abs. 4 DSGVO',
      bsigParagraph: '§62 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.avQ4.maturity.level0',
      level1Key: 'dsgvo.questions.avQ4.maturity.level1',
      level2Key: 'dsgvo.questions.avQ4.maturity.level2',
      level3Key: 'dsgvo.questions.avQ4.maturity.level3',
    },
  },
  {
    id: 'av-q5',
    categoryId: 'auftragsverarbeitung',
    tier: 'advanced',
    titleKey: 'dsgvo.questions.avQ5.title',
    tooltipKey: 'dsgvo.questions.avQ5.tooltip',
    helpKey: 'dsgvo.questions.avQ5.help',
    legalReference: {
      euArticle: 'Art. 29 DSGVO',
      bsigParagraph: '§62 BDSG',
    },
    maturityDescriptions: {
      level0Key: 'dsgvo.questions.avQ5.maturity.level0',
      level1Key: 'dsgvo.questions.avQ5.maturity.level1',
      level2Key: 'dsgvo.questions.avQ5.maturity.level2',
      level3Key: 'dsgvo.questions.avQ5.maturity.level3',
    },
  },
];

/**
 * Get all questions for a specific category.
 */
export function getQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId);
}

/**
 * Get core questions only (for standard assessment).
 */
export function getCoreQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.tier === 'core');
}

/**
 * Get advanced questions only.
 */
export function getAdvancedQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.tier === 'advanced');
}
