/**
 * ISO 22301:2019 Gap Analysis Questions
 *
 * 18 questions across 6 categories, 3 per category.
 * Questions target management/GF level - clear, non-jargon wording.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Maturity levels:
 *   0 = Nothing exists
 *   1 = Informal/ad-hoc
 *   2 = Documented but not systematic
 *   3 = Systematic, regularly reviewed, standards-based
 *
 * Topics covered:
 * - BCMS scope & policy, leadership commitment, organizational context
 * - BCM objectives, risk criteria, resource planning
 * - Competence, awareness, communication, documentation
 * - Business Impact Analysis (BIA), RTO/RPO, risk assessment
 * - BC strategies, BC plans, exercises & testing
 * - Monitoring, internal audit, management review, continual improvement
 *
 * Legal basis: ISO 22301:2019
 * Cross-reference: BSI-Standard 200-4
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Kontext & Fuehrung (Clauses 4-5)
  // ============================================================
  {
    id: 'bcm-cl-q1',
    categoryId: 'context-leadership',
    tier: 'core',
    titleKey: 'iso22301.questions.clQ1.title',
    tooltipKey: 'iso22301.questions.clQ1.tooltip',
    helpKey: 'iso22301.questions.clQ1.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 4.1, 4.2, 4.3',
      bcmControl: 'BCMS scope definition, interested parties',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.clQ1.maturity.level0',
      level1Key: 'iso22301.questions.clQ1.maturity.level1',
      level2Key: 'iso22301.questions.clQ1.maturity.level2',
      level3Key: 'iso22301.questions.clQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-cl-q2',
    categoryId: 'context-leadership',
    tier: 'core',
    titleKey: 'iso22301.questions.clQ2.title',
    tooltipKey: 'iso22301.questions.clQ2.tooltip',
    helpKey: 'iso22301.questions.clQ2.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 5.1, 5.2',
      bcmControl: 'Leadership commitment, BCM policy',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.clQ2.maturity.level0',
      level1Key: 'iso22301.questions.clQ2.maturity.level1',
      level2Key: 'iso22301.questions.clQ2.maturity.level2',
      level3Key: 'iso22301.questions.clQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-cl-q3',
    categoryId: 'context-leadership',
    tier: 'core',
    titleKey: 'iso22301.questions.clQ3.title',
    tooltipKey: 'iso22301.questions.clQ3.tooltip',
    helpKey: 'iso22301.questions.clQ3.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 5.3',
      bcmControl: 'Roles, responsibilities, authorities',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.clQ3.maturity.level0',
      level1Key: 'iso22301.questions.clQ3.maturity.level1',
      level2Key: 'iso22301.questions.clQ3.maturity.level2',
      level3Key: 'iso22301.questions.clQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Planung fuer BCMS (Clause 6)
  // ============================================================
  {
    id: 'bcm-pl-q1',
    categoryId: 'planning',
    tier: 'core',
    titleKey: 'iso22301.questions.plQ1.title',
    tooltipKey: 'iso22301.questions.plQ1.tooltip',
    helpKey: 'iso22301.questions.plQ1.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 6.1',
      bcmControl: 'Actions to address risks and opportunities',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.plQ1.maturity.level0',
      level1Key: 'iso22301.questions.plQ1.maturity.level1',
      level2Key: 'iso22301.questions.plQ1.maturity.level2',
      level3Key: 'iso22301.questions.plQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-pl-q2',
    categoryId: 'planning',
    tier: 'core',
    titleKey: 'iso22301.questions.plQ2.title',
    tooltipKey: 'iso22301.questions.plQ2.tooltip',
    helpKey: 'iso22301.questions.plQ2.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 6.2',
      bcmControl: 'BCM objectives and planning to achieve them',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.plQ2.maturity.level0',
      level1Key: 'iso22301.questions.plQ2.maturity.level1',
      level2Key: 'iso22301.questions.plQ2.maturity.level2',
      level3Key: 'iso22301.questions.plQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-pl-q3',
    categoryId: 'planning',
    tier: 'core',
    titleKey: 'iso22301.questions.plQ3.title',
    tooltipKey: 'iso22301.questions.plQ3.tooltip',
    helpKey: 'iso22301.questions.plQ3.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 6.3',
      bcmControl: 'Planning of changes to BCMS',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.plQ3.maturity.level0',
      level1Key: 'iso22301.questions.plQ3.maturity.level1',
      level2Key: 'iso22301.questions.plQ3.maturity.level2',
      level3Key: 'iso22301.questions.plQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Unterstuetzung & Ressourcen (Clause 7)
  // ============================================================
  {
    id: 'bcm-sr-q1',
    categoryId: 'support-resources',
    tier: 'core',
    titleKey: 'iso22301.questions.srQ1.title',
    tooltipKey: 'iso22301.questions.srQ1.tooltip',
    helpKey: 'iso22301.questions.srQ1.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 7.1, 7.2',
      bcmControl: 'Resources, competence',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.srQ1.maturity.level0',
      level1Key: 'iso22301.questions.srQ1.maturity.level1',
      level2Key: 'iso22301.questions.srQ1.maturity.level2',
      level3Key: 'iso22301.questions.srQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-sr-q2',
    categoryId: 'support-resources',
    tier: 'core',
    titleKey: 'iso22301.questions.srQ2.title',
    tooltipKey: 'iso22301.questions.srQ2.tooltip',
    helpKey: 'iso22301.questions.srQ2.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 7.3, 7.4',
      bcmControl: 'Awareness, communication',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.srQ2.maturity.level0',
      level1Key: 'iso22301.questions.srQ2.maturity.level1',
      level2Key: 'iso22301.questions.srQ2.maturity.level2',
      level3Key: 'iso22301.questions.srQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-sr-q3',
    categoryId: 'support-resources',
    tier: 'core',
    titleKey: 'iso22301.questions.srQ3.title',
    tooltipKey: 'iso22301.questions.srQ3.tooltip',
    helpKey: 'iso22301.questions.srQ3.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 7.5',
      bcmControl: 'Documented information',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.srQ3.maturity.level0',
      level1Key: 'iso22301.questions.srQ3.maturity.level1',
      level2Key: 'iso22301.questions.srQ3.maturity.level2',
      level3Key: 'iso22301.questions.srQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Business Impact Analyse & Risikobewertung (Clause 8.2)
  // ============================================================
  {
    id: 'bcm-br-q1',
    categoryId: 'bia-risk',
    tier: 'core',
    titleKey: 'iso22301.questions.brQ1.title',
    tooltipKey: 'iso22301.questions.brQ1.tooltip',
    helpKey: 'iso22301.questions.brQ1.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 8.2.1, 8.2.2',
      bcmControl: 'Business impact analysis',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.brQ1.maturity.level0',
      level1Key: 'iso22301.questions.brQ1.maturity.level1',
      level2Key: 'iso22301.questions.brQ1.maturity.level2',
      level3Key: 'iso22301.questions.brQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-br-q2',
    categoryId: 'bia-risk',
    tier: 'core',
    titleKey: 'iso22301.questions.brQ2.title',
    tooltipKey: 'iso22301.questions.brQ2.tooltip',
    helpKey: 'iso22301.questions.brQ2.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 8.2.2',
      bcmControl: 'RTO/RPO/MTPD definition',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.brQ2.maturity.level0',
      level1Key: 'iso22301.questions.brQ2.maturity.level1',
      level2Key: 'iso22301.questions.brQ2.maturity.level2',
      level3Key: 'iso22301.questions.brQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-br-q3',
    categoryId: 'bia-risk',
    tier: 'core',
    titleKey: 'iso22301.questions.brQ3.title',
    tooltipKey: 'iso22301.questions.brQ3.tooltip',
    helpKey: 'iso22301.questions.brQ3.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 8.2.3',
      bcmControl: 'Risk assessment for disruptions',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.brQ3.maturity.level0',
      level1Key: 'iso22301.questions.brQ3.maturity.level1',
      level2Key: 'iso22301.questions.brQ3.maturity.level2',
      level3Key: 'iso22301.questions.brQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: BCM-Strategie, Plaene & Uebungen (Clause 8.3-8.5)
  // ============================================================
  {
    id: 'bcm-sp-q1',
    categoryId: 'bcm-strategy',
    tier: 'core',
    titleKey: 'iso22301.questions.spQ1.title',
    tooltipKey: 'iso22301.questions.spQ1.tooltip',
    helpKey: 'iso22301.questions.spQ1.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 8.3',
      bcmControl: 'Business continuity strategies and solutions',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.spQ1.maturity.level0',
      level1Key: 'iso22301.questions.spQ1.maturity.level1',
      level2Key: 'iso22301.questions.spQ1.maturity.level2',
      level3Key: 'iso22301.questions.spQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-sp-q2',
    categoryId: 'bcm-strategy',
    tier: 'core',
    titleKey: 'iso22301.questions.spQ2.title',
    tooltipKey: 'iso22301.questions.spQ2.tooltip',
    helpKey: 'iso22301.questions.spQ2.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 8.4',
      bcmControl: 'BC plans, incident response structure, crisis communication',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.spQ2.maturity.level0',
      level1Key: 'iso22301.questions.spQ2.maturity.level1',
      level2Key: 'iso22301.questions.spQ2.maturity.level2',
      level3Key: 'iso22301.questions.spQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-sp-q3',
    categoryId: 'bcm-strategy',
    tier: 'core',
    titleKey: 'iso22301.questions.spQ3.title',
    tooltipKey: 'iso22301.questions.spQ3.tooltip',
    helpKey: 'iso22301.questions.spQ3.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 8.5',
      bcmControl: 'Exercise programme, testing, evaluation',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.spQ3.maturity.level0',
      level1Key: 'iso22301.questions.spQ3.maturity.level1',
      level2Key: 'iso22301.questions.spQ3.maturity.level2',
      level3Key: 'iso22301.questions.spQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Bewertung & Verbesserung (Clauses 9-10)
  // ============================================================
  {
    id: 'bcm-ei-q1',
    categoryId: 'evaluation-improvement',
    tier: 'core',
    titleKey: 'iso22301.questions.eiQ1.title',
    tooltipKey: 'iso22301.questions.eiQ1.tooltip',
    helpKey: 'iso22301.questions.eiQ1.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 9.1',
      bcmControl: 'Monitoring, measurement, analysis, evaluation',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.eiQ1.maturity.level0',
      level1Key: 'iso22301.questions.eiQ1.maturity.level1',
      level2Key: 'iso22301.questions.eiQ1.maturity.level2',
      level3Key: 'iso22301.questions.eiQ1.maturity.level3',
    },
  },
  {
    id: 'bcm-ei-q2',
    categoryId: 'evaluation-improvement',
    tier: 'core',
    titleKey: 'iso22301.questions.eiQ2.title',
    tooltipKey: 'iso22301.questions.eiQ2.tooltip',
    helpKey: 'iso22301.questions.eiQ2.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 9.2, 9.3',
      bcmControl: 'Internal audit, management review',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.eiQ2.maturity.level0',
      level1Key: 'iso22301.questions.eiQ2.maturity.level1',
      level2Key: 'iso22301.questions.eiQ2.maturity.level2',
      level3Key: 'iso22301.questions.eiQ2.maturity.level3',
    },
  },
  {
    id: 'bcm-ei-q3',
    categoryId: 'evaluation-improvement',
    tier: 'core',
    titleKey: 'iso22301.questions.eiQ3.title',
    tooltipKey: 'iso22301.questions.eiQ3.tooltip',
    helpKey: 'iso22301.questions.eiQ3.help',
    legalReference: {
      isoClause: 'ISO 22301:2019 Clause 10.1, 10.2',
      bcmControl: 'Nonconformity, corrective action, continual improvement',
    },
    maturityDescriptions: {
      level0Key: 'iso22301.questions.eiQ3.maturity.level0',
      level1Key: 'iso22301.questions.eiQ3.maturity.level1',
      level2Key: 'iso22301.questions.eiQ3.maturity.level2',
      level3Key: 'iso22301.questions.eiQ3.maturity.level3',
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
