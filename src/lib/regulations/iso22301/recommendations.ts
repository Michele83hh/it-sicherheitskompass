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

  // ============================================================
  // Category 4: BIA & Risikobewertung - 2 recommendations
  // ============================================================
  {
    id: 'bcm-rec-br-1',
    categoryId: 'bia-risk',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'iso22301.recommendations.bi1.title',
    descriptionKey: 'iso22301.recommendations.bi1.description',
    firstStepKey: 'iso22301.recommendations.bi1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.2.1, 8.2.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 7',
  },
  {
    id: 'bcm-rec-br-2',
    categoryId: 'bia-risk',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso22301.recommendations.bi2.title',
    descriptionKey: 'iso22301.recommendations.bi2.description',
    firstStepKey: 'iso22301.recommendations.bi2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.2.2',
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
    titleKey: 'iso22301.recommendations.bs1.title',
    descriptionKey: 'iso22301.recommendations.bs1.description',
    firstStepKey: 'iso22301.recommendations.bs1.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.4',
    bsiReference: 'BSI-Standard 200-4, Kap. 8',
  },
  {
    id: 'bcm-rec-sp-2',
    categoryId: 'bcm-strategy',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'iso22301.recommendations.bs2.title',
    descriptionKey: 'iso22301.recommendations.bs2.description',
    firstStepKey: 'iso22301.recommendations.bs2.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.5',
    bsiReference: 'BSI-Standard 200-4, Kap. 9',
  },
  {
    id: 'bcm-rec-sp-3',
    categoryId: 'bcm-strategy',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'iso22301.recommendations.bs3.title',
    descriptionKey: 'iso22301.recommendations.bs3.description',
    firstStepKey: 'iso22301.recommendations.bs3.firstStep',
    legalReference: 'ISO 22301:2019 Clause 8.4.3',
    bsiReference: 'BSI-Standard 200-4, Kap. 8',
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
    legalReference: 'ISO 22301:2019 Clause 9.1',
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
    legalReference: 'ISO 22301:2019 Clause 9.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 10',
  },
  {
    id: 'bcm-rec-ei-3',
    categoryId: 'evaluation-improvement',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'iso22301.recommendations.ei3.title',
    descriptionKey: 'iso22301.recommendations.ei3.description',
    firstStepKey: 'iso22301.recommendations.ei3.firstStep',
    legalReference: 'ISO 22301:2019 Clause 10.1, 10.2',
    bsiReference: 'BSI-Standard 200-4, Kap. 10',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
