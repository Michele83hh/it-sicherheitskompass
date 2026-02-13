/**
 * NIST Cybersecurity Framework 2.0 Recommendations per Category
 *
 * 12 recommendations (2 per Function) with a mix of effort levels:
 * - 4 quick wins (fast, high impact)
 * - 5 medium effort (weeks, structured)
 * - 3 strategic (months, transformational)
 *
 * Each recommendation includes concrete first steps, NIST CSF references,
 * and BSI IT-Grundschutz cross-references for German market compatibility.
 *
 * Legal basis: NIST CSF 2.0 (February 2024)
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Govern (GV) - 2 recommendations
  // ============================================================
  {
    id: 'nist-rec-gv-1',
    categoryId: 'govern',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'nist-csf.recommendations.gv1.title',
    descriptionKey: 'nist-csf.recommendations.gv1.description',
    firstStepKey: 'nist-csf.recommendations.gv1.firstStep',
    legalReference: 'NIST CSF 2.0 GV.OC-01, GV.OC-02, GV.OC-03',
    bsiReference: 'ISMS.1',
  },
  {
    id: 'nist-rec-gv-2',
    categoryId: 'govern',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'nist-csf.recommendations.gv2.title',
    descriptionKey: 'nist-csf.recommendations.gv2.description',
    firstStepKey: 'nist-csf.recommendations.gv2.firstStep',
    legalReference: 'NIST CSF 2.0 GV.RM-01, GV.RM-02, GV.RR-01',
    bsiReference: 'ISMS.1, BSI-Standard 200-2',
    checklistKey: 'nist-csf.recommendations.gv2.checklist',
  },

  // ============================================================
  // Category 2: Identify (ID) - 2 recommendations
  // ============================================================
  {
    id: 'nist-rec-id-1',
    categoryId: 'identify',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'nist-csf.recommendations.id1.title',
    descriptionKey: 'nist-csf.recommendations.id1.description',
    firstStepKey: 'nist-csf.recommendations.id1.firstStep',
    legalReference: 'NIST CSF 2.0 ID.AM-01, ID.AM-02, ID.AM-03',
    bsiReference: 'ORP.1, BSI-Standard 200-2',
  },
  {
    id: 'nist-rec-id-2',
    categoryId: 'identify',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'nist-csf.recommendations.id2.title',
    descriptionKey: 'nist-csf.recommendations.id2.description',
    firstStepKey: 'nist-csf.recommendations.id2.firstStep',
    legalReference: 'NIST CSF 2.0 ID.RA-01, ID.RA-02, ID.RA-03',
    bsiReference: 'BSI-Standard 200-3',
    checklistKey: 'nist-csf.recommendations.id2.checklist',
  },

  // ============================================================
  // Category 3: Protect (PR) - 2 recommendations
  // ============================================================
  {
    id: 'nist-rec-pr-1',
    categoryId: 'protect',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'nist-csf.recommendations.pr1.title',
    descriptionKey: 'nist-csf.recommendations.pr1.description',
    firstStepKey: 'nist-csf.recommendations.pr1.firstStep',
    legalReference: 'NIST CSF 2.0 PR.AA-01, PR.AA-03, PR.AA-05',
    bsiReference: 'ORP.4',
  },
  {
    id: 'nist-rec-pr-2',
    categoryId: 'protect',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'nist-csf.recommendations.pr2.title',
    descriptionKey: 'nist-csf.recommendations.pr2.description',
    firstStepKey: 'nist-csf.recommendations.pr2.firstStep',
    legalReference: 'NIST CSF 2.0 PR.AT-01, PR.AT-02, PR.DS-01',
    bsiReference: 'ORP.3, CON.1',
  },

  // ============================================================
  // Category 4: Detect (DE) - 2 recommendations
  // ============================================================
  {
    id: 'nist-rec-de-1',
    categoryId: 'detect',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'nist-csf.recommendations.de1.title',
    descriptionKey: 'nist-csf.recommendations.de1.description',
    firstStepKey: 'nist-csf.recommendations.de1.firstStep',
    legalReference: 'NIST CSF 2.0 DE.CM-01, DE.CM-02, DE.CM-03',
    bsiReference: 'OPS.1.1.4, DER.1',
  },
  {
    id: 'nist-rec-de-2',
    categoryId: 'detect',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'nist-csf.recommendations.de2.title',
    descriptionKey: 'nist-csf.recommendations.de2.description',
    firstStepKey: 'nist-csf.recommendations.de2.firstStep',
    legalReference: 'NIST CSF 2.0 DE.AE-02, DE.AE-03, DE.AE-06',
    bsiReference: 'DER.1, DER.2.1',
    checklistKey: 'nist-csf.recommendations.de2.checklist',
  },

  // ============================================================
  // Category 5: Respond (RS) - 2 recommendations
  // ============================================================
  {
    id: 'nist-rec-rs-1',
    categoryId: 'respond',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'nist-csf.recommendations.rs1.title',
    descriptionKey: 'nist-csf.recommendations.rs1.description',
    firstStepKey: 'nist-csf.recommendations.rs1.firstStep',
    legalReference: 'NIST CSF 2.0 RS.MA-01, RS.MA-02, RS.CO-02',
    bsiReference: 'DER.2.1, DER.2.2',
  },
  {
    id: 'nist-rec-rs-2',
    categoryId: 'respond',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'nist-csf.recommendations.rs2.title',
    descriptionKey: 'nist-csf.recommendations.rs2.description',
    firstStepKey: 'nist-csf.recommendations.rs2.firstStep',
    legalReference: 'NIST CSF 2.0 RS.AN-03, RS.AN-06, RS.MI-01',
    bsiReference: 'DER.2.1, DER.2.3',
  },

  // ============================================================
  // Category 6: Recover (RC) - 2 recommendations
  // ============================================================
  {
    id: 'nist-rec-rc-1',
    categoryId: 'recover',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'nist-csf.recommendations.rc1.title',
    descriptionKey: 'nist-csf.recommendations.rc1.description',
    firstStepKey: 'nist-csf.recommendations.rc1.firstStep',
    legalReference: 'NIST CSF 2.0 RC.RP-01, RC.RP-02, RC.RP-03',
    bsiReference: 'DER.4, BSI-Standard 200-4',
  },
  {
    id: 'nist-rec-rc-2',
    categoryId: 'recover',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'nist-csf.recommendations.rc2.title',
    descriptionKey: 'nist-csf.recommendations.rc2.description',
    firstStepKey: 'nist-csf.recommendations.rc2.firstStep',
    legalReference: 'NIST CSF 2.0 RC.RP-04, RC.RP-05, RC.CO-03',
    bsiReference: 'DER.4, BSI-Standard 200-4',
    checklistKey: 'nist-csf.recommendations.rc2.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
