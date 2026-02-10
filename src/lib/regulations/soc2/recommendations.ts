/**
 * SOC 2 Recommendations per Category
 *
 * 18 recommendations across 7 categories with concrete first steps,
 * TSC references, and BSI IT-Grundschutz cross-references.
 * Mix: 5 quick, 8 medium, 5 strategic.
 *
 * Framework basis: AICPA Trust Services Criteria (TSC) 2017/2022
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Security (Common Criteria)
  // ============================================================
  {
    id: 'rec-sec-1',
    categoryId: 'security',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'soc2.recommendations.sec1.title',
    descriptionKey: 'soc2.recommendations.sec1.description',
    firstStepKey: 'soc2.recommendations.sec1.firstStep',
    tscReference: 'CC6.1, CC6.2, CC6.3',
    bsiReference: 'ORP.4, OPS.1.1.3',
  },
  {
    id: 'rec-sec-2',
    categoryId: 'security',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.sec2.title',
    descriptionKey: 'soc2.recommendations.sec2.description',
    firstStepKey: 'soc2.recommendations.sec2.firstStep',
    tscReference: 'CC6.6, CC6.7',
    bsiReference: 'CON.1, OPS.1.2.4',
  },
  {
    id: 'rec-sec-3',
    categoryId: 'security',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'soc2.recommendations.sec3.title',
    descriptionKey: 'soc2.recommendations.sec3.description',
    firstStepKey: 'soc2.recommendations.sec3.firstStep',
    tscReference: 'CC6.1-CC6.8',
    bsiReference: 'NET.1.1, NET.1.2',
    checklistKey: 'soc2.recommendations.sec3.checklist',
  },

  // ============================================================
  // Category 2: Availability
  // ============================================================
  {
    id: 'rec-avl-1',
    categoryId: 'availability',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.avl1.title',
    descriptionKey: 'soc2.recommendations.avl1.description',
    firstStepKey: 'soc2.recommendations.avl1.firstStep',
    tscReference: 'A1.1, A1.2',
    bsiReference: 'CON.3, OPS.1.2.2',
  },
  {
    id: 'rec-avl-2',
    categoryId: 'availability',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.avl2.title',
    descriptionKey: 'soc2.recommendations.avl2.description',
    firstStepKey: 'soc2.recommendations.avl2.firstStep',
    tscReference: 'A1.2, A1.3',
    bsiReference: 'DER.4, CON.3',
  },
  {
    id: 'rec-avl-3',
    categoryId: 'availability',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'soc2.recommendations.avl3.title',
    descriptionKey: 'soc2.recommendations.avl3.description',
    firstStepKey: 'soc2.recommendations.avl3.firstStep',
    tscReference: 'A1.1-A1.3',
    bsiReference: 'CON.3, DER.4',
    checklistKey: 'soc2.recommendations.avl3.checklist',
  },

  // ============================================================
  // Category 3: Processing Integrity
  // ============================================================
  {
    id: 'rec-pi-1',
    categoryId: 'processing-integrity',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.pi1.title',
    descriptionKey: 'soc2.recommendations.pi1.description',
    firstStepKey: 'soc2.recommendations.pi1.firstStep',
    tscReference: 'PI1.1, PI1.2',
    bsiReference: 'OPS.1.1.3, APP.1.1',
  },
  {
    id: 'rec-pi-2',
    categoryId: 'processing-integrity',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.pi2.title',
    descriptionKey: 'soc2.recommendations.pi2.description',
    firstStepKey: 'soc2.recommendations.pi2.firstStep',
    tscReference: 'PI1.3, PI1.4, PI1.5',
    bsiReference: 'OPS.1.1.6, CON.8',
  },

  // ============================================================
  // Category 4: Confidentiality
  // ============================================================
  {
    id: 'rec-conf-1',
    categoryId: 'confidentiality',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'soc2.recommendations.conf1.title',
    descriptionKey: 'soc2.recommendations.conf1.description',
    firstStepKey: 'soc2.recommendations.conf1.firstStep',
    tscReference: 'C1.1',
    bsiReference: 'CON.1, INF.1',
  },
  {
    id: 'rec-conf-2',
    categoryId: 'confidentiality',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.conf2.title',
    descriptionKey: 'soc2.recommendations.conf2.description',
    firstStepKey: 'soc2.recommendations.conf2.firstStep',
    tscReference: 'C1.1, C1.2',
    bsiReference: 'CON.1, ORP.4',
  },

  // ============================================================
  // Category 5: Privacy
  // ============================================================
  {
    id: 'rec-priv-1',
    categoryId: 'privacy',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'soc2.recommendations.priv1.title',
    descriptionKey: 'soc2.recommendations.priv1.description',
    firstStepKey: 'soc2.recommendations.priv1.firstStep',
    tscReference: 'P1.1, P2.1',
    bsiReference: 'CON.2, ORP.1',
  },
  {
    id: 'rec-priv-2',
    categoryId: 'privacy',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.priv2.title',
    descriptionKey: 'soc2.recommendations.priv2.description',
    firstStepKey: 'soc2.recommendations.priv2.firstStep',
    tscReference: 'P3.1, P4.1, P6.1',
    bsiReference: 'CON.2, ORP.1',
  },
  {
    id: 'rec-priv-3',
    categoryId: 'privacy',
    priority: 'low',
    effortLevel: 'strategic',
    titleKey: 'soc2.recommendations.priv3.title',
    descriptionKey: 'soc2.recommendations.priv3.description',
    firstStepKey: 'soc2.recommendations.priv3.firstStep',
    tscReference: 'P1-P8',
    bsiReference: 'CON.2, ORP.1, ORP.5',
    checklistKey: 'soc2.recommendations.priv3.checklist',
  },

  // ============================================================
  // Category 6: Monitoring & Logging
  // ============================================================
  {
    id: 'rec-mon-1',
    categoryId: 'monitoring',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'soc2.recommendations.mon1.title',
    descriptionKey: 'soc2.recommendations.mon1.description',
    firstStepKey: 'soc2.recommendations.mon1.firstStep',
    tscReference: 'CC7.1, CC7.2',
    bsiReference: 'OPS.1.1.5, DER.1',
  },
  {
    id: 'rec-mon-2',
    categoryId: 'monitoring',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'soc2.recommendations.mon2.title',
    descriptionKey: 'soc2.recommendations.mon2.description',
    firstStepKey: 'soc2.recommendations.mon2.firstStep',
    tscReference: 'CC7.3, CC7.4, CC7.5',
    bsiReference: 'DER.1, DER.2.1',
  },
  {
    id: 'rec-mon-3',
    categoryId: 'monitoring',
    priority: 'low',
    effortLevel: 'strategic',
    titleKey: 'soc2.recommendations.mon3.title',
    descriptionKey: 'soc2.recommendations.mon3.description',
    firstStepKey: 'soc2.recommendations.mon3.firstStep',
    tscReference: 'CC7.1-CC7.5, CC8.1',
    bsiReference: 'DER.1, DER.2.1, OPS.1.1.5',
    checklistKey: 'soc2.recommendations.mon3.checklist',
  },

  // ============================================================
  // Category 7: Risk Management & Governance
  // ============================================================
  {
    id: 'rec-gov-1',
    categoryId: 'risk-management',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'soc2.recommendations.gov1.title',
    descriptionKey: 'soc2.recommendations.gov1.description',
    firstStepKey: 'soc2.recommendations.gov1.firstStep',
    tscReference: 'CC1.1, CC1.2',
    bsiReference: 'ISMS.1, ORP.1',
  },
  {
    id: 'rec-gov-2',
    categoryId: 'risk-management',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'soc2.recommendations.gov2.title',
    descriptionKey: 'soc2.recommendations.gov2.description',
    firstStepKey: 'soc2.recommendations.gov2.firstStep',
    tscReference: 'CC3.1-CC3.4',
    bsiReference: 'BSI-Standard 200-3, ISMS.1',
    checklistKey: 'soc2.recommendations.gov2.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
