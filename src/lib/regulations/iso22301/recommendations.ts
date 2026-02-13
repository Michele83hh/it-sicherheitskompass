/**
 * ISO 22301:2019 Recommendations per Category
 *
 * 12 recommendations (2 per category) with a mix of effort levels:
 * - 4 quick wins (fast, high impact)
 * - 4 medium effort (weeks, structured)
 * - 4 strategic (months, transformational)
 *
 * Each recommendation includes concrete first steps, ISO clause references,
 * and BSI-Standard 200-4 cross-references for German market compatibility.
 *
 * Legal basis: ISO 22301:2019
 * Cross-reference: BSI-Standard 200-4 (Business Continuity Management)
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Kontext & Fuehrung - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-cl-1',
    categoryId: 'context-leadership',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso22301.recommendations.cl1.title',
    descriptionKey: 'iso22301.recommendations.cl1.description',
    firstStepKey: 'iso22301.recommendations.cl1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 5.1, 5.2',
    bsiReference: 'BSI-Standard 200-4, BCMS.1',
  },
  {
    id: 'bcm-rec-cl-2',
    categoryId: 'context-leadership',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso22301.recommendations.cl2.title',
    descriptionKey: 'iso22301.recommendations.cl2.description',
    firstStepKey: 'iso22301.recommendations.cl2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 4.1, 4.2, 4.3',
    bsiReference: 'BSI-Standard 200-4, Kap. 4',
  },

  // ============================================================
  // Category 2: Planung fuer BCMS - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-pl-1',
    categoryId: 'planning',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso22301.recommendations.pl1.title',
    descriptionKey: 'iso22301.recommendations.pl1.description',
    firstStepKey: 'iso22301.recommendations.pl1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 6.1',
    bsiReference: 'BSI-Standard 200-4, Kap. 5',
  },
  {
    id: 'bcm-rec-pl-2',
    categoryId: 'planning',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'iso22301.recommendations.pl2.title',
    descriptionKey: 'iso22301.recommendations.pl2.description',
    firstStepKey: 'iso22301.recommendations.pl2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 6.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 5',
  },

  // ============================================================
  // Category 3: Unterstuetzung & Ressourcen - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-sr-1',
    categoryId: 'support-resources',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso22301.recommendations.sr1.title',
    descriptionKey: 'iso22301.recommendations.sr1.description',
    firstStepKey: 'iso22301.recommendations.sr1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 7.2, 7.3',
    bsiReference: 'BSI-Standard 200-4, Kap. 6',
  },
  {
    id: 'bcm-rec-sr-2',
    categoryId: 'support-resources',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'iso22301.recommendations.sr2.title',
    descriptionKey: 'iso22301.recommendations.sr2.description',
    firstStepKey: 'iso22301.recommendations.sr2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 7.4, 7.5',
    bsiReference: 'BSI-Standard 200-4, Kap. 6',
    checklistKey: 'iso22301.recommendations.sr2.checklist',
  },

  // ============================================================
  // Category 4: BIA & Risikobewertung - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-br-1',
    categoryId: 'bia-risk',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'iso22301.recommendations.br1.title',
    descriptionKey: 'iso22301.recommendations.br1.description',
    firstStepKey: 'iso22301.recommendations.br1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.2.1, 8.2.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 7',
    checklistKey: 'iso22301.recommendations.br1.checklist',
  },
  {
    id: 'bcm-rec-br-2',
    categoryId: 'bia-risk',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso22301.recommendations.br2.title',
    descriptionKey: 'iso22301.recommendations.br2.description',
    firstStepKey: 'iso22301.recommendations.br2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.2.3',
    bsiReference: 'BSI-Standard 200-4, Kap. 7',
  },

  // ============================================================
  // Category 5: BCM-Strategie, Plaene & Uebungen - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-sp-1',
    categoryId: 'bcm-strategy',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'iso22301.recommendations.sp1.title',
    descriptionKey: 'iso22301.recommendations.sp1.description',
    firstStepKey: 'iso22301.recommendations.sp1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.3, 8.4',
    bsiReference: 'BSI-Standard 200-4, Kap. 8',
    checklistKey: 'iso22301.recommendations.sp1.checklist',
  },
  {
    id: 'bcm-rec-sp-2',
    categoryId: 'bcm-strategy',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'iso22301.recommendations.sp2.title',
    descriptionKey: 'iso22301.recommendations.sp2.description',
    firstStepKey: 'iso22301.recommendations.sp2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.5',
    bsiReference: 'BSI-Standard 200-4, Kap. 9',
  },

  // ============================================================
  // Category 6: Bewertung & Verbesserung - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-ei-1',
    categoryId: 'evaluation-improvement',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'iso22301.recommendations.ei1.title',
    descriptionKey: 'iso22301.recommendations.ei1.description',
    firstStepKey: 'iso22301.recommendations.ei1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 9.1, 9.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 10',
  },
  {
    id: 'bcm-rec-ei-2',
    categoryId: 'evaluation-improvement',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'iso22301.recommendations.ei2.title',
    descriptionKey: 'iso22301.recommendations.ei2.description',
    firstStepKey: 'iso22301.recommendations.ei2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 9.3, 10.1, 10.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 10',
    checklistKey: 'iso22301.recommendations.ei2.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
