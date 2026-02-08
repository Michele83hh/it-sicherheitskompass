/**
 * NIS2 Gap Analysis Questions
 *
 * 50 questions across 10 Art. 21(2) categories, 5 per category.
 * Questions are written in KMU-management-level German.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Legal basis: §30 Abs. 2 Nr. 1-10 BSIG (BGBl. 2025 I Nr. 301)
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Risikoanalyse und Sicherheit
  // Art. 21(2)(a) / §30 Abs. 2 Nr. 1 BSIG
  // ============================================================
  {
    id: 'ra-q1',
    categoryId: 'risk-analysis',
    tier: 'core',
    titleKey: 'questions.raQ1.title',
    tooltipKey: 'questions.raQ1.tooltip',
    helpKey: 'questions.raQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. a NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.raQ1.maturity.level0',
      level1Key: 'questions.raQ1.maturity.level1',
      level2Key: 'questions.raQ1.maturity.level2',
      level3Key: 'questions.raQ1.maturity.level3',
    },
  },
  {
    id: 'ra-q2',
    categoryId: 'risk-analysis',
    tier: 'core',
    titleKey: 'questions.raQ2.title',
    tooltipKey: 'questions.raQ2.tooltip',
    helpKey: 'questions.raQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. a NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.raQ2.maturity.level0',
      level1Key: 'questions.raQ2.maturity.level1',
      level2Key: 'questions.raQ2.maturity.level2',
      level3Key: 'questions.raQ2.maturity.level3',
    },
  },
  {
    id: 'ra-q3',
    categoryId: 'risk-analysis',
    tier: 'core',
    titleKey: 'questions.raQ3.title',
    tooltipKey: 'questions.raQ3.tooltip',
    helpKey: 'questions.raQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. a NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.raQ3.maturity.level0',
      level1Key: 'questions.raQ3.maturity.level1',
      level2Key: 'questions.raQ3.maturity.level2',
      level3Key: 'questions.raQ3.maturity.level3',
    },
  },
  {
    id: 'ra-q4',
    categoryId: 'risk-analysis',
    tier: 'advanced',
    titleKey: 'questions.raQ4.title',
    tooltipKey: 'questions.raQ4.tooltip',
    helpKey: 'questions.raQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. a NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.raQ4.maturity.level0',
      level1Key: 'questions.raQ4.maturity.level1',
      level2Key: 'questions.raQ4.maturity.level2',
      level3Key: 'questions.raQ4.maturity.level3',
    },
  },
  {
    id: 'ra-q5',
    categoryId: 'risk-analysis',
    tier: 'advanced',
    titleKey: 'questions.raQ5.title',
    tooltipKey: 'questions.raQ5.tooltip',
    helpKey: 'questions.raQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. a NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.raQ5.maturity.level0',
      level1Key: 'questions.raQ5.maturity.level1',
      level2Key: 'questions.raQ5.maturity.level2',
      level3Key: 'questions.raQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Bewältigung von Sicherheitsvorfällen
  // Art. 21(2)(b) / §30 Abs. 2 Nr. 2 BSIG
  // ============================================================
  {
    id: 'ih-q1',
    categoryId: 'incident-handling',
    tier: 'core',
    titleKey: 'questions.ihQ1.title',
    tooltipKey: 'questions.ihQ1.tooltip',
    helpKey: 'questions.ihQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. b NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 2 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.ihQ1.maturity.level0',
      level1Key: 'questions.ihQ1.maturity.level1',
      level2Key: 'questions.ihQ1.maturity.level2',
      level3Key: 'questions.ihQ1.maturity.level3',
    },
  },
  {
    id: 'ih-q2',
    categoryId: 'incident-handling',
    tier: 'core',
    titleKey: 'questions.ihQ2.title',
    tooltipKey: 'questions.ihQ2.tooltip',
    helpKey: 'questions.ihQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. b NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 2 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.ihQ2.maturity.level0',
      level1Key: 'questions.ihQ2.maturity.level1',
      level2Key: 'questions.ihQ2.maturity.level2',
      level3Key: 'questions.ihQ2.maturity.level3',
    },
  },
  {
    id: 'ih-q3',
    categoryId: 'incident-handling',
    tier: 'core',
    titleKey: 'questions.ihQ3.title',
    tooltipKey: 'questions.ihQ3.tooltip',
    helpKey: 'questions.ihQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. b NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 2 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.ihQ3.maturity.level0',
      level1Key: 'questions.ihQ3.maturity.level1',
      level2Key: 'questions.ihQ3.maturity.level2',
      level3Key: 'questions.ihQ3.maturity.level3',
    },
  },
  {
    id: 'ih-q4',
    categoryId: 'incident-handling',
    tier: 'advanced',
    titleKey: 'questions.ihQ4.title',
    tooltipKey: 'questions.ihQ4.tooltip',
    helpKey: 'questions.ihQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. b NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 2 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.ihQ4.maturity.level0',
      level1Key: 'questions.ihQ4.maturity.level1',
      level2Key: 'questions.ihQ4.maturity.level2',
      level3Key: 'questions.ihQ4.maturity.level3',
    },
  },
  {
    id: 'ih-q5',
    categoryId: 'incident-handling',
    tier: 'advanced',
    titleKey: 'questions.ihQ5.title',
    tooltipKey: 'questions.ihQ5.tooltip',
    helpKey: 'questions.ihQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. b NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 2 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.ihQ5.maturity.level0',
      level1Key: 'questions.ihQ5.maturity.level1',
      level2Key: 'questions.ihQ5.maturity.level2',
      level3Key: 'questions.ihQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Aufrechterhaltung des Betriebs
  // Art. 21(2)(c) / §30 Abs. 2 Nr. 3 BSIG
  // ============================================================
  {
    id: 'bc-q1',
    categoryId: 'business-continuity',
    tier: 'core',
    titleKey: 'questions.bcQ1.title',
    tooltipKey: 'questions.bcQ1.tooltip',
    helpKey: 'questions.bcQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. c NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 3 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.bcQ1.maturity.level0',
      level1Key: 'questions.bcQ1.maturity.level1',
      level2Key: 'questions.bcQ1.maturity.level2',
      level3Key: 'questions.bcQ1.maturity.level3',
    },
  },
  {
    id: 'bc-q2',
    categoryId: 'business-continuity',
    tier: 'core',
    titleKey: 'questions.bcQ2.title',
    tooltipKey: 'questions.bcQ2.tooltip',
    helpKey: 'questions.bcQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. c NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 3 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.bcQ2.maturity.level0',
      level1Key: 'questions.bcQ2.maturity.level1',
      level2Key: 'questions.bcQ2.maturity.level2',
      level3Key: 'questions.bcQ2.maturity.level3',
    },
  },
  {
    id: 'bc-q3',
    categoryId: 'business-continuity',
    tier: 'core',
    titleKey: 'questions.bcQ3.title',
    tooltipKey: 'questions.bcQ3.tooltip',
    helpKey: 'questions.bcQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. c NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 3 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.bcQ3.maturity.level0',
      level1Key: 'questions.bcQ3.maturity.level1',
      level2Key: 'questions.bcQ3.maturity.level2',
      level3Key: 'questions.bcQ3.maturity.level3',
    },
  },
  {
    id: 'bc-q4',
    categoryId: 'business-continuity',
    tier: 'advanced',
    titleKey: 'questions.bcQ4.title',
    tooltipKey: 'questions.bcQ4.tooltip',
    helpKey: 'questions.bcQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. c NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 3 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.bcQ4.maturity.level0',
      level1Key: 'questions.bcQ4.maturity.level1',
      level2Key: 'questions.bcQ4.maturity.level2',
      level3Key: 'questions.bcQ4.maturity.level3',
    },
  },
  {
    id: 'bc-q5',
    categoryId: 'business-continuity',
    tier: 'advanced',
    titleKey: 'questions.bcQ5.title',
    tooltipKey: 'questions.bcQ5.tooltip',
    helpKey: 'questions.bcQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. c NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 3 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.bcQ5.maturity.level0',
      level1Key: 'questions.bcQ5.maturity.level1',
      level2Key: 'questions.bcQ5.maturity.level2',
      level3Key: 'questions.bcQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Sicherheit der Lieferkette
  // Art. 21(2)(d) / §30 Abs. 2 Nr. 4 BSIG
  // ============================================================
  {
    id: 'sc-q1',
    categoryId: 'supply-chain',
    tier: 'core',
    titleKey: 'questions.scQ1.title',
    tooltipKey: 'questions.scQ1.tooltip',
    helpKey: 'questions.scQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. d NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 4 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.scQ1.maturity.level0',
      level1Key: 'questions.scQ1.maturity.level1',
      level2Key: 'questions.scQ1.maturity.level2',
      level3Key: 'questions.scQ1.maturity.level3',
    },
  },
  {
    id: 'sc-q2',
    categoryId: 'supply-chain',
    tier: 'core',
    titleKey: 'questions.scQ2.title',
    tooltipKey: 'questions.scQ2.tooltip',
    helpKey: 'questions.scQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. d NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 4 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.scQ2.maturity.level0',
      level1Key: 'questions.scQ2.maturity.level1',
      level2Key: 'questions.scQ2.maturity.level2',
      level3Key: 'questions.scQ2.maturity.level3',
    },
  },
  {
    id: 'sc-q3',
    categoryId: 'supply-chain',
    tier: 'core',
    titleKey: 'questions.scQ3.title',
    tooltipKey: 'questions.scQ3.tooltip',
    helpKey: 'questions.scQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. d NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 4 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.scQ3.maturity.level0',
      level1Key: 'questions.scQ3.maturity.level1',
      level2Key: 'questions.scQ3.maturity.level2',
      level3Key: 'questions.scQ3.maturity.level3',
    },
  },
  {
    id: 'sc-q4',
    categoryId: 'supply-chain',
    tier: 'advanced',
    titleKey: 'questions.scQ4.title',
    tooltipKey: 'questions.scQ4.tooltip',
    helpKey: 'questions.scQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. d NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 4 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.scQ4.maturity.level0',
      level1Key: 'questions.scQ4.maturity.level1',
      level2Key: 'questions.scQ4.maturity.level2',
      level3Key: 'questions.scQ4.maturity.level3',
    },
  },
  {
    id: 'sc-q5',
    categoryId: 'supply-chain',
    tier: 'advanced',
    titleKey: 'questions.scQ5.title',
    tooltipKey: 'questions.scQ5.tooltip',
    helpKey: 'questions.scQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. d NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 4 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.scQ5.maturity.level0',
      level1Key: 'questions.scQ5.maturity.level1',
      level2Key: 'questions.scQ5.maturity.level2',
      level3Key: 'questions.scQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Sicherheit bei Erwerb, Entwicklung und Wartung
  // Art. 21(2)(e) / §30 Abs. 2 Nr. 5 BSIG
  // ============================================================
  {
    id: 'ad-q1',
    categoryId: 'acquisition-development',
    tier: 'core',
    titleKey: 'questions.adQ1.title',
    tooltipKey: 'questions.adQ1.tooltip',
    helpKey: 'questions.adQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. e NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 5 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.adQ1.maturity.level0',
      level1Key: 'questions.adQ1.maturity.level1',
      level2Key: 'questions.adQ1.maturity.level2',
      level3Key: 'questions.adQ1.maturity.level3',
    },
  },
  {
    id: 'ad-q2',
    categoryId: 'acquisition-development',
    tier: 'core',
    titleKey: 'questions.adQ2.title',
    tooltipKey: 'questions.adQ2.tooltip',
    helpKey: 'questions.adQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. e NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 5 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.adQ2.maturity.level0',
      level1Key: 'questions.adQ2.maturity.level1',
      level2Key: 'questions.adQ2.maturity.level2',
      level3Key: 'questions.adQ2.maturity.level3',
    },
  },
  {
    id: 'ad-q3',
    categoryId: 'acquisition-development',
    tier: 'core',
    titleKey: 'questions.adQ3.title',
    tooltipKey: 'questions.adQ3.tooltip',
    helpKey: 'questions.adQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. e NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 5 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.adQ3.maturity.level0',
      level1Key: 'questions.adQ3.maturity.level1',
      level2Key: 'questions.adQ3.maturity.level2',
      level3Key: 'questions.adQ3.maturity.level3',
    },
  },
  {
    id: 'ad-q4',
    categoryId: 'acquisition-development',
    tier: 'advanced',
    titleKey: 'questions.adQ4.title',
    tooltipKey: 'questions.adQ4.tooltip',
    helpKey: 'questions.adQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. e NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 5 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.adQ4.maturity.level0',
      level1Key: 'questions.adQ4.maturity.level1',
      level2Key: 'questions.adQ4.maturity.level2',
      level3Key: 'questions.adQ4.maturity.level3',
    },
  },
  {
    id: 'ad-q5',
    categoryId: 'acquisition-development',
    tier: 'advanced',
    titleKey: 'questions.adQ5.title',
    tooltipKey: 'questions.adQ5.tooltip',
    helpKey: 'questions.adQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. e NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 5 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.adQ5.maturity.level0',
      level1Key: 'questions.adQ5.maturity.level1',
      level2Key: 'questions.adQ5.maturity.level2',
      level3Key: 'questions.adQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Bewertung der Wirksamkeit
  // Art. 21(2)(f) / §30 Abs. 2 Nr. 6 BSIG
  // ============================================================
  {
    id: 'ea-q1',
    categoryId: 'effectiveness-assessment',
    tier: 'core',
    titleKey: 'questions.eaQ1.title',
    tooltipKey: 'questions.eaQ1.tooltip',
    helpKey: 'questions.eaQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. f NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 6 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.eaQ1.maturity.level0',
      level1Key: 'questions.eaQ1.maturity.level1',
      level2Key: 'questions.eaQ1.maturity.level2',
      level3Key: 'questions.eaQ1.maturity.level3',
    },
  },
  {
    id: 'ea-q2',
    categoryId: 'effectiveness-assessment',
    tier: 'core',
    titleKey: 'questions.eaQ2.title',
    tooltipKey: 'questions.eaQ2.tooltip',
    helpKey: 'questions.eaQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. f NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 6 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.eaQ2.maturity.level0',
      level1Key: 'questions.eaQ2.maturity.level1',
      level2Key: 'questions.eaQ2.maturity.level2',
      level3Key: 'questions.eaQ2.maturity.level3',
    },
  },
  {
    id: 'ea-q3',
    categoryId: 'effectiveness-assessment',
    tier: 'core',
    titleKey: 'questions.eaQ3.title',
    tooltipKey: 'questions.eaQ3.tooltip',
    helpKey: 'questions.eaQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. f NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 6 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.eaQ3.maturity.level0',
      level1Key: 'questions.eaQ3.maturity.level1',
      level2Key: 'questions.eaQ3.maturity.level2',
      level3Key: 'questions.eaQ3.maturity.level3',
    },
  },
  {
    id: 'ea-q4',
    categoryId: 'effectiveness-assessment',
    tier: 'advanced',
    titleKey: 'questions.eaQ4.title',
    tooltipKey: 'questions.eaQ4.tooltip',
    helpKey: 'questions.eaQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. f NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 6 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.eaQ4.maturity.level0',
      level1Key: 'questions.eaQ4.maturity.level1',
      level2Key: 'questions.eaQ4.maturity.level2',
      level3Key: 'questions.eaQ4.maturity.level3',
    },
  },
  {
    id: 'ea-q5',
    categoryId: 'effectiveness-assessment',
    tier: 'advanced',
    titleKey: 'questions.eaQ5.title',
    tooltipKey: 'questions.eaQ5.tooltip',
    helpKey: 'questions.eaQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. f NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 6 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.eaQ5.maturity.level0',
      level1Key: 'questions.eaQ5.maturity.level1',
      level2Key: 'questions.eaQ5.maturity.level2',
      level3Key: 'questions.eaQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Cyberhygiene und Schulungen
  // Art. 21(2)(g) / §30 Abs. 2 Nr. 7 BSIG
  // ============================================================
  {
    id: 'ch-q1',
    categoryId: 'cyber-hygiene',
    tier: 'core',
    titleKey: 'questions.chQ1.title',
    tooltipKey: 'questions.chQ1.tooltip',
    helpKey: 'questions.chQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. g NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 7 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.chQ1.maturity.level0',
      level1Key: 'questions.chQ1.maturity.level1',
      level2Key: 'questions.chQ1.maturity.level2',
      level3Key: 'questions.chQ1.maturity.level3',
    },
  },
  {
    id: 'ch-q2',
    categoryId: 'cyber-hygiene',
    tier: 'core',
    titleKey: 'questions.chQ2.title',
    tooltipKey: 'questions.chQ2.tooltip',
    helpKey: 'questions.chQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. g NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 7 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.chQ2.maturity.level0',
      level1Key: 'questions.chQ2.maturity.level1',
      level2Key: 'questions.chQ2.maturity.level2',
      level3Key: 'questions.chQ2.maturity.level3',
    },
  },
  {
    id: 'ch-q3',
    categoryId: 'cyber-hygiene',
    tier: 'core',
    titleKey: 'questions.chQ3.title',
    tooltipKey: 'questions.chQ3.tooltip',
    helpKey: 'questions.chQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. g NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 7 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.chQ3.maturity.level0',
      level1Key: 'questions.chQ3.maturity.level1',
      level2Key: 'questions.chQ3.maturity.level2',
      level3Key: 'questions.chQ3.maturity.level3',
    },
  },
  {
    id: 'ch-q4',
    categoryId: 'cyber-hygiene',
    tier: 'advanced',
    titleKey: 'questions.chQ4.title',
    tooltipKey: 'questions.chQ4.tooltip',
    helpKey: 'questions.chQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. g NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 7 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.chQ4.maturity.level0',
      level1Key: 'questions.chQ4.maturity.level1',
      level2Key: 'questions.chQ4.maturity.level2',
      level3Key: 'questions.chQ4.maturity.level3',
    },
  },
  {
    id: 'ch-q5',
    categoryId: 'cyber-hygiene',
    tier: 'advanced',
    titleKey: 'questions.chQ5.title',
    tooltipKey: 'questions.chQ5.tooltip',
    helpKey: 'questions.chQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. g NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 7 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.chQ5.maturity.level0',
      level1Key: 'questions.chQ5.maturity.level1',
      level2Key: 'questions.chQ5.maturity.level2',
      level3Key: 'questions.chQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Kryptografie
  // Art. 21(2)(h) / §30 Abs. 2 Nr. 8 BSIG
  // ============================================================
  {
    id: 'cr-q1',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'questions.crQ1.title',
    tooltipKey: 'questions.crQ1.tooltip',
    helpKey: 'questions.crQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. h NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 8 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.crQ1.maturity.level0',
      level1Key: 'questions.crQ1.maturity.level1',
      level2Key: 'questions.crQ1.maturity.level2',
      level3Key: 'questions.crQ1.maturity.level3',
    },
  },
  {
    id: 'cr-q2',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'questions.crQ2.title',
    tooltipKey: 'questions.crQ2.tooltip',
    helpKey: 'questions.crQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. h NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 8 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.crQ2.maturity.level0',
      level1Key: 'questions.crQ2.maturity.level1',
      level2Key: 'questions.crQ2.maturity.level2',
      level3Key: 'questions.crQ2.maturity.level3',
    },
  },
  {
    id: 'cr-q3',
    categoryId: 'cryptography',
    tier: 'core',
    titleKey: 'questions.crQ3.title',
    tooltipKey: 'questions.crQ3.tooltip',
    helpKey: 'questions.crQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. h NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 8 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.crQ3.maturity.level0',
      level1Key: 'questions.crQ3.maturity.level1',
      level2Key: 'questions.crQ3.maturity.level2',
      level3Key: 'questions.crQ3.maturity.level3',
    },
  },
  {
    id: 'cr-q4',
    categoryId: 'cryptography',
    tier: 'advanced',
    titleKey: 'questions.crQ4.title',
    tooltipKey: 'questions.crQ4.tooltip',
    helpKey: 'questions.crQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. h NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 8 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.crQ4.maturity.level0',
      level1Key: 'questions.crQ4.maturity.level1',
      level2Key: 'questions.crQ4.maturity.level2',
      level3Key: 'questions.crQ4.maturity.level3',
    },
  },
  {
    id: 'cr-q5',
    categoryId: 'cryptography',
    tier: 'advanced',
    titleKey: 'questions.crQ5.title',
    tooltipKey: 'questions.crQ5.tooltip',
    helpKey: 'questions.crQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. h NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 8 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.crQ5.maturity.level0',
      level1Key: 'questions.crQ5.maturity.level1',
      level2Key: 'questions.crQ5.maturity.level2',
      level3Key: 'questions.crQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 9: Personalsicherheit und Zugriffskontrolle
  // Art. 21(2)(i) / §30 Abs. 2 Nr. 9 BSIG
  // ============================================================
  {
    id: 'ac-q1',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'questions.acQ1.title',
    tooltipKey: 'questions.acQ1.tooltip',
    helpKey: 'questions.acQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. i NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 9 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.acQ1.maturity.level0',
      level1Key: 'questions.acQ1.maturity.level1',
      level2Key: 'questions.acQ1.maturity.level2',
      level3Key: 'questions.acQ1.maturity.level3',
    },
  },
  {
    id: 'ac-q2',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'questions.acQ2.title',
    tooltipKey: 'questions.acQ2.tooltip',
    helpKey: 'questions.acQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. i NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 9 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.acQ2.maturity.level0',
      level1Key: 'questions.acQ2.maturity.level1',
      level2Key: 'questions.acQ2.maturity.level2',
      level3Key: 'questions.acQ2.maturity.level3',
    },
  },
  {
    id: 'ac-q3',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'questions.acQ3.title',
    tooltipKey: 'questions.acQ3.tooltip',
    helpKey: 'questions.acQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. i NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 9 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.acQ3.maturity.level0',
      level1Key: 'questions.acQ3.maturity.level1',
      level2Key: 'questions.acQ3.maturity.level2',
      level3Key: 'questions.acQ3.maturity.level3',
    },
  },
  {
    id: 'ac-q4',
    categoryId: 'access-control',
    tier: 'advanced',
    titleKey: 'questions.acQ4.title',
    tooltipKey: 'questions.acQ4.tooltip',
    helpKey: 'questions.acQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. i NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 9 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.acQ4.maturity.level0',
      level1Key: 'questions.acQ4.maturity.level1',
      level2Key: 'questions.acQ4.maturity.level2',
      level3Key: 'questions.acQ4.maturity.level3',
    },
  },
  {
    id: 'ac-q5',
    categoryId: 'access-control',
    tier: 'advanced',
    titleKey: 'questions.acQ5.title',
    tooltipKey: 'questions.acQ5.tooltip',
    helpKey: 'questions.acQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. i NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 9 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.acQ5.maturity.level0',
      level1Key: 'questions.acQ5.maturity.level1',
      level2Key: 'questions.acQ5.maturity.level2',
      level3Key: 'questions.acQ5.maturity.level3',
    },
  },

  // ============================================================
  // Category 10: MFA und gesicherte Kommunikation
  // Art. 21(2)(j) / §30 Abs. 2 Nr. 10 BSIG
  // ============================================================
  {
    id: 'mc-q1',
    categoryId: 'authentication-communication',
    tier: 'core',
    titleKey: 'questions.mcQ1.title',
    tooltipKey: 'questions.mcQ1.tooltip',
    helpKey: 'questions.mcQ1.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. j NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 10 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.mcQ1.maturity.level0',
      level1Key: 'questions.mcQ1.maturity.level1',
      level2Key: 'questions.mcQ1.maturity.level2',
      level3Key: 'questions.mcQ1.maturity.level3',
    },
  },
  {
    id: 'mc-q2',
    categoryId: 'authentication-communication',
    tier: 'core',
    titleKey: 'questions.mcQ2.title',
    tooltipKey: 'questions.mcQ2.tooltip',
    helpKey: 'questions.mcQ2.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. j NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 10 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.mcQ2.maturity.level0',
      level1Key: 'questions.mcQ2.maturity.level1',
      level2Key: 'questions.mcQ2.maturity.level2',
      level3Key: 'questions.mcQ2.maturity.level3',
    },
  },
  {
    id: 'mc-q3',
    categoryId: 'authentication-communication',
    tier: 'core',
    titleKey: 'questions.mcQ3.title',
    tooltipKey: 'questions.mcQ3.tooltip',
    helpKey: 'questions.mcQ3.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. j NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 10 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.mcQ3.maturity.level0',
      level1Key: 'questions.mcQ3.maturity.level1',
      level2Key: 'questions.mcQ3.maturity.level2',
      level3Key: 'questions.mcQ3.maturity.level3',
    },
  },
  {
    id: 'mc-q4',
    categoryId: 'authentication-communication',
    tier: 'advanced',
    titleKey: 'questions.mcQ4.title',
    tooltipKey: 'questions.mcQ4.tooltip',
    helpKey: 'questions.mcQ4.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. j NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 10 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.mcQ4.maturity.level0',
      level1Key: 'questions.mcQ4.maturity.level1',
      level2Key: 'questions.mcQ4.maturity.level2',
      level3Key: 'questions.mcQ4.maturity.level3',
    },
  },
  {
    id: 'mc-q5',
    categoryId: 'authentication-communication',
    tier: 'advanced',
    titleKey: 'questions.mcQ5.title',
    tooltipKey: 'questions.mcQ5.tooltip',
    helpKey: 'questions.mcQ5.help',
    legalReference: {
      euArticle: 'Art. 21 Abs. 2 lit. j NIS2-RL',
      bsigParagraph: '§30 Abs. 2 Nr. 10 BSIG',
    },
    maturityDescriptions: {
      level0Key: 'questions.mcQ5.maturity.level0',
      level1Key: 'questions.mcQ5.maturity.level1',
      level2Key: 'questions.mcQ5.maturity.level2',
      level3Key: 'questions.mcQ5.maturity.level3',
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
