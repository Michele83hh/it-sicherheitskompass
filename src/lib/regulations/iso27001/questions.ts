/**
 * ISO 27001:2022 Gap Analysis Questions
 *
 * 30 questions across 8 categories, mix of 3-4 per category.
 * Questions target management/GF level - clear, non-jargon wording.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Maturity levels:
 *   0 = Nothing exists
 *   1 = Informal/ad-hoc
 *   2 = Documented but not systematic
 *   3 = Systematic, regularly reviewed, standards-based
 *
 * Legal basis: ISO/IEC 27001:2022, ISO/IEC 27002:2022
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Kontext & Fuehrung (Clauses 4-5)
  // ============================================================
  {
    id: 'iso-cl-q1',
    categoryId: 'context-leadership',
    tier: 'core',
    titleKey: 'iso27001.questions.clQ1.title',
    tooltipKey: 'iso27001.questions.clQ1.tooltip',
    helpKey: 'iso27001.questions.clQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 4.1, 4.2',
      annexControl: 'A.5.1',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.clQ1.maturity.level0',
      level1Key: 'iso27001.questions.clQ1.maturity.level1',
      level2Key: 'iso27001.questions.clQ1.maturity.level2',
      level3Key: 'iso27001.questions.clQ1.maturity.level3',
    },
  },
  {
    id: 'iso-cl-q2',
    categoryId: 'context-leadership',
    tier: 'core',
    titleKey: 'iso27001.questions.clQ2.title',
    tooltipKey: 'iso27001.questions.clQ2.tooltip',
    helpKey: 'iso27001.questions.clQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 5.1, 5.2',
      annexControl: 'A.5.1, A.5.2',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.clQ2.maturity.level0',
      level1Key: 'iso27001.questions.clQ2.maturity.level1',
      level2Key: 'iso27001.questions.clQ2.maturity.level2',
      level3Key: 'iso27001.questions.clQ2.maturity.level3',
    },
  },
  {
    id: 'iso-cl-q3',
    categoryId: 'context-leadership',
    tier: 'core',
    titleKey: 'iso27001.questions.clQ3.title',
    tooltipKey: 'iso27001.questions.clQ3.tooltip',
    helpKey: 'iso27001.questions.clQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 5.3',
      annexControl: 'A.5.2, A.5.3, A.5.4',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.clQ3.maturity.level0',
      level1Key: 'iso27001.questions.clQ3.maturity.level1',
      level2Key: 'iso27001.questions.clQ3.maturity.level2',
      level3Key: 'iso27001.questions.clQ3.maturity.level3',
    },
  },
  {
    id: 'iso-cl-q4',
    categoryId: 'context-leadership',
    tier: 'advanced',
    titleKey: 'iso27001.questions.clQ4.title',
    tooltipKey: 'iso27001.questions.clQ4.tooltip',
    helpKey: 'iso27001.questions.clQ4.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 4.3',
      annexControl: 'A.5.1',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.clQ4.maturity.level0',
      level1Key: 'iso27001.questions.clQ4.maturity.level1',
      level2Key: 'iso27001.questions.clQ4.maturity.level2',
      level3Key: 'iso27001.questions.clQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Planung & Risikobewertung (Clause 6, A.5.x)
  // ============================================================
  {
    id: 'iso-pr-q1',
    categoryId: 'planning-risk',
    tier: 'core',
    titleKey: 'iso27001.questions.prQ1.title',
    tooltipKey: 'iso27001.questions.prQ1.tooltip',
    helpKey: 'iso27001.questions.prQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 6.1.2',
      annexControl: 'A.5.7',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.prQ1.maturity.level0',
      level1Key: 'iso27001.questions.prQ1.maturity.level1',
      level2Key: 'iso27001.questions.prQ1.maturity.level2',
      level3Key: 'iso27001.questions.prQ1.maturity.level3',
    },
  },
  {
    id: 'iso-pr-q2',
    categoryId: 'planning-risk',
    tier: 'core',
    titleKey: 'iso27001.questions.prQ2.title',
    tooltipKey: 'iso27001.questions.prQ2.tooltip',
    helpKey: 'iso27001.questions.prQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 6.1.3',
      annexControl: 'A.5.1, A.5.5, A.5.6',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.prQ2.maturity.level0',
      level1Key: 'iso27001.questions.prQ2.maturity.level1',
      level2Key: 'iso27001.questions.prQ2.maturity.level2',
      level3Key: 'iso27001.questions.prQ2.maturity.level3',
    },
  },
  {
    id: 'iso-pr-q3',
    categoryId: 'planning-risk',
    tier: 'core',
    titleKey: 'iso27001.questions.prQ3.title',
    tooltipKey: 'iso27001.questions.prQ3.tooltip',
    helpKey: 'iso27001.questions.prQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 6.2',
      annexControl: 'A.5.8',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.prQ3.maturity.level0',
      level1Key: 'iso27001.questions.prQ3.maturity.level1',
      level2Key: 'iso27001.questions.prQ3.maturity.level2',
      level3Key: 'iso27001.questions.prQ3.maturity.level3',
    },
  },
  {
    id: 'iso-pr-q4',
    categoryId: 'planning-risk',
    tier: 'advanced',
    titleKey: 'iso27001.questions.prQ4.title',
    tooltipKey: 'iso27001.questions.prQ4.tooltip',
    helpKey: 'iso27001.questions.prQ4.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 6.1.2, 6.1.3',
      annexControl: 'A.5.5, A.5.6',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.prQ4.maturity.level0',
      level1Key: 'iso27001.questions.prQ4.maturity.level1',
      level2Key: 'iso27001.questions.prQ4.maturity.level2',
      level3Key: 'iso27001.questions.prQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Unterstuetzung & Bewusstsein (Clause 7, A.6.x)
  // ============================================================
  {
    id: 'iso-sa-q1',
    categoryId: 'support-awareness',
    tier: 'core',
    titleKey: 'iso27001.questions.saQ1.title',
    tooltipKey: 'iso27001.questions.saQ1.tooltip',
    helpKey: 'iso27001.questions.saQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 7.2, 7.3',
      annexControl: 'A.6.3',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.saQ1.maturity.level0',
      level1Key: 'iso27001.questions.saQ1.maturity.level1',
      level2Key: 'iso27001.questions.saQ1.maturity.level2',
      level3Key: 'iso27001.questions.saQ1.maturity.level3',
    },
  },
  {
    id: 'iso-sa-q2',
    categoryId: 'support-awareness',
    tier: 'core',
    titleKey: 'iso27001.questions.saQ2.title',
    tooltipKey: 'iso27001.questions.saQ2.tooltip',
    helpKey: 'iso27001.questions.saQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 7.5',
      annexControl: 'A.5.1, A.5.10, A.5.12, A.5.13',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.saQ2.maturity.level0',
      level1Key: 'iso27001.questions.saQ2.maturity.level1',
      level2Key: 'iso27001.questions.saQ2.maturity.level2',
      level3Key: 'iso27001.questions.saQ2.maturity.level3',
    },
  },
  {
    id: 'iso-sa-q3',
    categoryId: 'support-awareness',
    tier: 'core',
    titleKey: 'iso27001.questions.saQ3.title',
    tooltipKey: 'iso27001.questions.saQ3.tooltip',
    helpKey: 'iso27001.questions.saQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 7.1',
      annexControl: 'A.6.1, A.6.2',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.saQ3.maturity.level0',
      level1Key: 'iso27001.questions.saQ3.maturity.level1',
      level2Key: 'iso27001.questions.saQ3.maturity.level2',
      level3Key: 'iso27001.questions.saQ3.maturity.level3',
    },
  },
  {
    id: 'iso-sa-q4',
    categoryId: 'support-awareness',
    tier: 'advanced',
    titleKey: 'iso27001.questions.saQ4.title',
    tooltipKey: 'iso27001.questions.saQ4.tooltip',
    helpKey: 'iso27001.questions.saQ4.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 7.4',
      annexControl: 'A.6.4, A.6.5, A.6.6',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.saQ4.maturity.level0',
      level1Key: 'iso27001.questions.saQ4.maturity.level1',
      level2Key: 'iso27001.questions.saQ4.maturity.level2',
      level3Key: 'iso27001.questions.saQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Betrieb & Aenderungsmanagement (Clause 8, A.8.x)
  // ============================================================
  {
    id: 'iso-op-q1',
    categoryId: 'operations',
    tier: 'core',
    titleKey: 'iso27001.questions.opQ1.title',
    tooltipKey: 'iso27001.questions.opQ1.tooltip',
    helpKey: 'iso27001.questions.opQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 8.1',
      annexControl: 'A.8.1, A.8.9',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.opQ1.maturity.level0',
      level1Key: 'iso27001.questions.opQ1.maturity.level1',
      level2Key: 'iso27001.questions.opQ1.maturity.level2',
      level3Key: 'iso27001.questions.opQ1.maturity.level3',
    },
  },
  {
    id: 'iso-op-q2',
    categoryId: 'operations',
    tier: 'core',
    titleKey: 'iso27001.questions.opQ2.title',
    tooltipKey: 'iso27001.questions.opQ2.tooltip',
    helpKey: 'iso27001.questions.opQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 8.2, 8.3',
      annexControl: 'A.8.10, A.8.11, A.8.12',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.opQ2.maturity.level0',
      level1Key: 'iso27001.questions.opQ2.maturity.level1',
      level2Key: 'iso27001.questions.opQ2.maturity.level2',
      level3Key: 'iso27001.questions.opQ2.maturity.level3',
    },
  },
  {
    id: 'iso-op-q3',
    categoryId: 'operations',
    tier: 'core',
    titleKey: 'iso27001.questions.opQ3.title',
    tooltipKey: 'iso27001.questions.opQ3.tooltip',
    helpKey: 'iso27001.questions.opQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 8.1',
      annexControl: 'A.5.19, A.5.20, A.5.21, A.5.22',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.opQ3.maturity.level0',
      level1Key: 'iso27001.questions.opQ3.maturity.level1',
      level2Key: 'iso27001.questions.opQ3.maturity.level2',
      level3Key: 'iso27001.questions.opQ3.maturity.level3',
    },
  },
  {
    id: 'iso-op-q4',
    categoryId: 'operations',
    tier: 'advanced',
    titleKey: 'iso27001.questions.opQ4.title',
    tooltipKey: 'iso27001.questions.opQ4.tooltip',
    helpKey: 'iso27001.questions.opQ4.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 8.1',
      annexControl: 'A.8.9, A.8.32',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.opQ4.maturity.level0',
      level1Key: 'iso27001.questions.opQ4.maturity.level1',
      level2Key: 'iso27001.questions.opQ4.maturity.level2',
      level3Key: 'iso27001.questions.opQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Zugriffskontrolle (A.5.15-5.18, A.8.2-8.5)
  // ============================================================
  {
    id: 'iso-ac-q1',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'iso27001.questions.acQ1.title',
    tooltipKey: 'iso27001.questions.acQ1.tooltip',
    helpKey: 'iso27001.questions.acQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.5.15, A.5.16',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.acQ1.maturity.level0',
      level1Key: 'iso27001.questions.acQ1.maturity.level1',
      level2Key: 'iso27001.questions.acQ1.maturity.level2',
      level3Key: 'iso27001.questions.acQ1.maturity.level3',
    },
  },
  {
    id: 'iso-ac-q2',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'iso27001.questions.acQ2.title',
    tooltipKey: 'iso27001.questions.acQ2.tooltip',
    helpKey: 'iso27001.questions.acQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.5.17, A.8.5',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.acQ2.maturity.level0',
      level1Key: 'iso27001.questions.acQ2.maturity.level1',
      level2Key: 'iso27001.questions.acQ2.maturity.level2',
      level3Key: 'iso27001.questions.acQ2.maturity.level3',
    },
  },
  {
    id: 'iso-ac-q3',
    categoryId: 'access-control',
    tier: 'core',
    titleKey: 'iso27001.questions.acQ3.title',
    tooltipKey: 'iso27001.questions.acQ3.tooltip',
    helpKey: 'iso27001.questions.acQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.8.2, A.8.3, A.8.4',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.acQ3.maturity.level0',
      level1Key: 'iso27001.questions.acQ3.maturity.level1',
      level2Key: 'iso27001.questions.acQ3.maturity.level2',
      level3Key: 'iso27001.questions.acQ3.maturity.level3',
    },
  },
  {
    id: 'iso-ac-q4',
    categoryId: 'access-control',
    tier: 'advanced',
    titleKey: 'iso27001.questions.acQ4.title',
    tooltipKey: 'iso27001.questions.acQ4.tooltip',
    helpKey: 'iso27001.questions.acQ4.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.5.18, A.8.2',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.acQ4.maturity.level0',
      level1Key: 'iso27001.questions.acQ4.maturity.level1',
      level2Key: 'iso27001.questions.acQ4.maturity.level2',
      level3Key: 'iso27001.questions.acQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Kryptografie & Netzwerk (A.8.20-8.26)
  // ============================================================
  {
    id: 'iso-cn-q1',
    categoryId: 'cryptography-network',
    tier: 'core',
    titleKey: 'iso27001.questions.cnQ1.title',
    tooltipKey: 'iso27001.questions.cnQ1.tooltip',
    helpKey: 'iso27001.questions.cnQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.8.24',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.cnQ1.maturity.level0',
      level1Key: 'iso27001.questions.cnQ1.maturity.level1',
      level2Key: 'iso27001.questions.cnQ1.maturity.level2',
      level3Key: 'iso27001.questions.cnQ1.maturity.level3',
    },
  },
  {
    id: 'iso-cn-q2',
    categoryId: 'cryptography-network',
    tier: 'core',
    titleKey: 'iso27001.questions.cnQ2.title',
    tooltipKey: 'iso27001.questions.cnQ2.tooltip',
    helpKey: 'iso27001.questions.cnQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.8.20, A.8.21, A.8.22',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.cnQ2.maturity.level0',
      level1Key: 'iso27001.questions.cnQ2.maturity.level1',
      level2Key: 'iso27001.questions.cnQ2.maturity.level2',
      level3Key: 'iso27001.questions.cnQ2.maturity.level3',
    },
  },
  {
    id: 'iso-cn-q3',
    categoryId: 'cryptography-network',
    tier: 'core',
    titleKey: 'iso27001.questions.cnQ3.title',
    tooltipKey: 'iso27001.questions.cnQ3.tooltip',
    helpKey: 'iso27001.questions.cnQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.8.23, A.8.26',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.cnQ3.maturity.level0',
      level1Key: 'iso27001.questions.cnQ3.maturity.level1',
      level2Key: 'iso27001.questions.cnQ3.maturity.level2',
      level3Key: 'iso27001.questions.cnQ3.maturity.level3',
    },
  },
  {
    id: 'iso-cn-q4',
    categoryId: 'cryptography-network',
    tier: 'advanced',
    titleKey: 'iso27001.questions.cnQ4.title',
    tooltipKey: 'iso27001.questions.cnQ4.tooltip',
    helpKey: 'iso27001.questions.cnQ4.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.8.25',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.cnQ4.maturity.level0',
      level1Key: 'iso27001.questions.cnQ4.maturity.level1',
      level2Key: 'iso27001.questions.cnQ4.maturity.level2',
      level3Key: 'iso27001.questions.cnQ4.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Physische Sicherheit (A.7.1-7.14)
  // ============================================================
  {
    id: 'iso-ps-q1',
    categoryId: 'physical-security',
    tier: 'core',
    titleKey: 'iso27001.questions.psQ1.title',
    tooltipKey: 'iso27001.questions.psQ1.tooltip',
    helpKey: 'iso27001.questions.psQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.7.1, A.7.2, A.7.3, A.7.4',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.psQ1.maturity.level0',
      level1Key: 'iso27001.questions.psQ1.maturity.level1',
      level2Key: 'iso27001.questions.psQ1.maturity.level2',
      level3Key: 'iso27001.questions.psQ1.maturity.level3',
    },
  },
  {
    id: 'iso-ps-q2',
    categoryId: 'physical-security',
    tier: 'core',
    titleKey: 'iso27001.questions.psQ2.title',
    tooltipKey: 'iso27001.questions.psQ2.tooltip',
    helpKey: 'iso27001.questions.psQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.7.8, A.7.9, A.7.10',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.psQ2.maturity.level0',
      level1Key: 'iso27001.questions.psQ2.maturity.level1',
      level2Key: 'iso27001.questions.psQ2.maturity.level2',
      level3Key: 'iso27001.questions.psQ2.maturity.level3',
    },
  },
  {
    id: 'iso-ps-q3',
    categoryId: 'physical-security',
    tier: 'advanced',
    titleKey: 'iso27001.questions.psQ3.title',
    tooltipKey: 'iso27001.questions.psQ3.tooltip',
    helpKey: 'iso27001.questions.psQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.7.5, A.7.11, A.7.12, A.7.13',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.psQ3.maturity.level0',
      level1Key: 'iso27001.questions.psQ3.maturity.level1',
      level2Key: 'iso27001.questions.psQ3.maturity.level2',
      level3Key: 'iso27001.questions.psQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Vorfallmanagement & Kontinuitaet (A.5.24-5.30, Clause 9-10)
  // ============================================================
  {
    id: 'iso-ic-q1',
    categoryId: 'incident-continuity',
    tier: 'core',
    titleKey: 'iso27001.questions.icQ1.title',
    tooltipKey: 'iso27001.questions.icQ1.tooltip',
    helpKey: 'iso27001.questions.icQ1.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.5.24, A.5.25, A.5.26',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.icQ1.maturity.level0',
      level1Key: 'iso27001.questions.icQ1.maturity.level1',
      level2Key: 'iso27001.questions.icQ1.maturity.level2',
      level3Key: 'iso27001.questions.icQ1.maturity.level3',
    },
  },
  {
    id: 'iso-ic-q2',
    categoryId: 'incident-continuity',
    tier: 'core',
    titleKey: 'iso27001.questions.icQ2.title',
    tooltipKey: 'iso27001.questions.icQ2.tooltip',
    helpKey: 'iso27001.questions.icQ2.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Annex A',
      annexControl: 'A.5.29, A.5.30',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.icQ2.maturity.level0',
      level1Key: 'iso27001.questions.icQ2.maturity.level1',
      level2Key: 'iso27001.questions.icQ2.maturity.level2',
      level3Key: 'iso27001.questions.icQ2.maturity.level3',
    },
  },
  {
    id: 'iso-ic-q3',
    categoryId: 'incident-continuity',
    tier: 'core',
    titleKey: 'iso27001.questions.icQ3.title',
    tooltipKey: 'iso27001.questions.icQ3.tooltip',
    helpKey: 'iso27001.questions.icQ3.help',
    legalReference: {
      isoClause: 'ISO 27001:2022 Clause 9.1, 9.2, 9.3',
      annexControl: 'A.5.27, A.5.28',
    },
    maturityDescriptions: {
      level0Key: 'iso27001.questions.icQ3.maturity.level0',
      level1Key: 'iso27001.questions.icQ3.maturity.level1',
      level2Key: 'iso27001.questions.icQ3.maturity.level2',
      level3Key: 'iso27001.questions.icQ3.maturity.level3',
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
