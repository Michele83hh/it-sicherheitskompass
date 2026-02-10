/**
 * ISO 27001:2022 Recommendations per Category
 *
 * 20 recommendations with a healthy mix of effort levels:
 * - 7 quick wins (fast, high impact)
 * - 8 medium effort (weeks, structured)
 * - 5 strategic (months, transformational)
 *
 * Each recommendation includes concrete first steps, ISO clause references,
 * and BSI IT-Grundschutz cross-references for German market compatibility.
 *
 * Legal basis: ISO/IEC 27001:2022, ISO/IEC 27002:2022
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Kontext & Fuehrung - 3 recommendations
  // ============================================================
  {
    id: 'iso-rec-cl-1',
    categoryId: 'context-leadership',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.cl1.title',
    descriptionKey: 'iso27001.recommendations.cl1.description',
    firstStepKey: 'iso27001.recommendations.cl1.firstStep',
    legalReference: 'ISO 27001:2022 Clause 5.1, 5.2',
    bsiReference: 'ISMS.1',
  },
  {
    id: 'iso-rec-cl-2',
    categoryId: 'context-leadership',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.cl2.title',
    descriptionKey: 'iso27001.recommendations.cl2.description',
    firstStepKey: 'iso27001.recommendations.cl2.firstStep',
    legalReference: 'ISO 27001:2022 Clause 4.1, 4.2, 4.3',
    bsiReference: 'ISMS.1, BSI-Standard 200-1',
  },
  {
    id: 'iso-rec-cl-3',
    categoryId: 'context-leadership',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'iso27001.recommendations.cl3.title',
    descriptionKey: 'iso27001.recommendations.cl3.description',
    firstStepKey: 'iso27001.recommendations.cl3.firstStep',
    legalReference: 'ISO 27001:2022 Clause 5.3',
    bsiReference: 'ISMS.1, ORP.1',
    checklistKey: 'iso27001.recommendations.cl3.checklist',
  },

  // ============================================================
  // Category 2: Planung & Risikobewertung - 3 recommendations
  // ============================================================
  {
    id: 'iso-rec-pr-1',
    categoryId: 'planning-risk',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.pr1.title',
    descriptionKey: 'iso27001.recommendations.pr1.description',
    firstStepKey: 'iso27001.recommendations.pr1.firstStep',
    legalReference: 'ISO 27001:2022 Clause 6.1.2',
    bsiReference: 'BSI-Standard 200-3',
  },
  {
    id: 'iso-rec-pr-2',
    categoryId: 'planning-risk',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.pr2.title',
    descriptionKey: 'iso27001.recommendations.pr2.description',
    firstStepKey: 'iso27001.recommendations.pr2.firstStep',
    legalReference: 'ISO 27001:2022 Clause 6.1.3',
    bsiReference: 'BSI-Standard 200-2',
  },
  {
    id: 'iso-rec-pr-3',
    categoryId: 'planning-risk',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'iso27001.recommendations.pr3.title',
    descriptionKey: 'iso27001.recommendations.pr3.description',
    firstStepKey: 'iso27001.recommendations.pr3.firstStep',
    legalReference: 'ISO 27001:2022 Clause 6.2',
    bsiReference: 'ISMS.1, BSI-Standard 200-2',
    checklistKey: 'iso27001.recommendations.pr3.checklist',
  },

  // ============================================================
  // Category 3: Unterstuetzung & Bewusstsein - 2 recommendations
  // ============================================================
  {
    id: 'iso-rec-sa-1',
    categoryId: 'support-awareness',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.sa1.title',
    descriptionKey: 'iso27001.recommendations.sa1.description',
    firstStepKey: 'iso27001.recommendations.sa1.firstStep',
    legalReference: 'ISO 27001:2022 Clause 7.2, 7.3',
    bsiReference: 'ORP.3',
  },
  {
    id: 'iso-rec-sa-2',
    categoryId: 'support-awareness',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.sa2.title',
    descriptionKey: 'iso27001.recommendations.sa2.description',
    firstStepKey: 'iso27001.recommendations.sa2.firstStep',
    legalReference: 'ISO 27001:2022 Clause 7.5',
    bsiReference: 'ORP.1, ORP.2',
    checklistKey: 'iso27001.recommendations.sa2.checklist',
  },

  // ============================================================
  // Category 4: Betrieb & Aenderungsmanagement - 3 recommendations
  // ============================================================
  {
    id: 'iso-rec-op-1',
    categoryId: 'operations',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.op1.title',
    descriptionKey: 'iso27001.recommendations.op1.description',
    firstStepKey: 'iso27001.recommendations.op1.firstStep',
    legalReference: 'ISO 27001:2022 Clause 8.1',
    bsiReference: 'OPS.1.1.3',
  },
  {
    id: 'iso-rec-op-2',
    categoryId: 'operations',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.op2.title',
    descriptionKey: 'iso27001.recommendations.op2.description',
    firstStepKey: 'iso27001.recommendations.op2.firstStep',
    legalReference: 'ISO 27001:2022 Clause 8.1',
    bsiReference: 'OPS.1.2.2, CON.8',
  },
  {
    id: 'iso-rec-op-3',
    categoryId: 'operations',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.op3.title',
    descriptionKey: 'iso27001.recommendations.op3.description',
    firstStepKey: 'iso27001.recommendations.op3.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.5.19-A.5.22',
    bsiReference: 'OPS.2.1, ORP.1',
  },

  // ============================================================
  // Category 5: Zugriffskontrolle - 2 recommendations
  // ============================================================
  {
    id: 'iso-rec-ac-1',
    categoryId: 'access-control',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.ac1.title',
    descriptionKey: 'iso27001.recommendations.ac1.description',
    firstStepKey: 'iso27001.recommendations.ac1.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.5.15, A.5.16',
    bsiReference: 'ORP.4',
  },
  {
    id: 'iso-rec-ac-2',
    categoryId: 'access-control',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.ac2.title',
    descriptionKey: 'iso27001.recommendations.ac2.description',
    firstStepKey: 'iso27001.recommendations.ac2.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.5.17, A.8.5',
    bsiReference: 'ORP.4, SYS.1.1',
  },

  // ============================================================
  // Category 6: Kryptografie & Netzwerk - 2 recommendations
  // ============================================================
  {
    id: 'iso-rec-cn-1',
    categoryId: 'cryptography-network',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.cn1.title',
    descriptionKey: 'iso27001.recommendations.cn1.description',
    firstStepKey: 'iso27001.recommendations.cn1.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.8.24',
    bsiReference: 'CON.1',
  },
  {
    id: 'iso-rec-cn-2',
    categoryId: 'cryptography-network',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.cn2.title',
    descriptionKey: 'iso27001.recommendations.cn2.description',
    firstStepKey: 'iso27001.recommendations.cn2.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.8.20-A.8.22',
    bsiReference: 'NET.1.1, NET.1.2',
  },

  // ============================================================
  // Category 7: Physische Sicherheit - 2 recommendations
  // ============================================================
  {
    id: 'iso-rec-ps-1',
    categoryId: 'physical-security',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'iso27001.recommendations.ps1.title',
    descriptionKey: 'iso27001.recommendations.ps1.description',
    firstStepKey: 'iso27001.recommendations.ps1.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.7.1-A.7.4',
    bsiReference: 'INF.1, INF.2',
  },
  {
    id: 'iso-rec-ps-2',
    categoryId: 'physical-security',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'iso27001.recommendations.ps2.title',
    descriptionKey: 'iso27001.recommendations.ps2.description',
    firstStepKey: 'iso27001.recommendations.ps2.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.7.5-A.7.14',
    bsiReference: 'INF.1, INF.2, INF.5',
    checklistKey: 'iso27001.recommendations.ps2.checklist',
  },

  // ============================================================
  // Category 8: Vorfallmanagement & Kontinuitaet - 3 recommendations
  // ============================================================
  {
    id: 'iso-rec-ic-1',
    categoryId: 'incident-continuity',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'iso27001.recommendations.ic1.title',
    descriptionKey: 'iso27001.recommendations.ic1.description',
    firstStepKey: 'iso27001.recommendations.ic1.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.5.24-A.5.26',
    bsiReference: 'DER.2.1, DER.2.2',
  },
  {
    id: 'iso-rec-ic-2',
    categoryId: 'incident-continuity',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'iso27001.recommendations.ic2.title',
    descriptionKey: 'iso27001.recommendations.ic2.description',
    firstStepKey: 'iso27001.recommendations.ic2.firstStep',
    legalReference: 'ISO 27001:2022 Annex A.5.29, A.5.30',
    bsiReference: 'DER.4, BSI-Standard 200-4',
    checklistKey: 'iso27001.recommendations.ic2.checklist',
  },
  {
    id: 'iso-rec-ic-3',
    categoryId: 'incident-continuity',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'iso27001.recommendations.ic3.title',
    descriptionKey: 'iso27001.recommendations.ic3.description',
    firstStepKey: 'iso27001.recommendations.ic3.firstStep',
    legalReference: 'ISO 27001:2022 Clause 9.1, 9.2, 10.1, 10.2',
    bsiReference: 'ISMS.1, ORP.5',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
