/**
 * BSI IT-Grundschutz Recommendations per Category
 *
 * Each category has 3 prioritized recommendations with concrete first steps,
 * BSI-Standard references, and IT-Grundschutz-Kompendium building block references.
 * 30 recommendations total (10 categories x 3 recommendations).
 *
 * Reference: IT-Grundschutz-Kompendium Edition 2023
 * BSI-Standards: 200-1, 200-2, 200-3, 200-4
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: ISMS
  // ============================================================
  {
    id: 'rec-isms-1',
    categoryId: 'isms',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.isms1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.isms1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.isms1.firstStep',
    legalReference: 'BSI-Standard 200-1 Kap. 7, ISMS.1',
    bsiReference: 'ISMS.1.A1',
  },
  {
    id: 'rec-isms-2',
    categoryId: 'isms',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'bsiGrundschutz.recommendations.isms2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.isms2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.isms2.firstStep',
    legalReference: 'BSI-Standard 200-1 Kap. 7.3, ISMS.1',
    bsiReference: 'ISMS.1.A3',
  },
  {
    id: 'rec-isms-3',
    categoryId: 'isms',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'bsiGrundschutz.recommendations.isms3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.isms3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.isms3.firstStep',
    legalReference: 'BSI-Standard 200-3 Kap. 4, ISMS.1',
    bsiReference: 'ISMS.1.A7',
    checklistKey: 'bsiGrundschutz.recommendations.isms3.checklist',
  },

  // ============================================================
  // Category 2: Organisation & Personal (ORP)
  // ============================================================
  {
    id: 'rec-orp-1',
    categoryId: 'orp',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'bsiGrundschutz.recommendations.orp1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.orp1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.orp1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 4.1, ORP.1',
    bsiReference: 'ORP.1.A1',
  },
  {
    id: 'rec-orp-2',
    categoryId: 'orp',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.orp2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.orp2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.orp2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 4.2, ORP.2',
    bsiReference: 'ORP.2.A1',
  },
  {
    id: 'rec-orp-3',
    categoryId: 'orp',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.orp3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.orp3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.orp3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 4.3, ORP.3',
    bsiReference: 'ORP.3.A1',
    checklistKey: 'bsiGrundschutz.recommendations.orp3.checklist',
  },

  // ============================================================
  // Category 3: Konzeption (CON)
  // ============================================================
  {
    id: 'rec-con-1',
    categoryId: 'con',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.con1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.con1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.con1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 5, CON.1',
    bsiReference: 'CON.1.A1',
  },
  {
    id: 'rec-con-2',
    categoryId: 'con',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.con2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.con2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.con2.firstStep',
    legalReference: 'BSI-Standard 200-4 Kap. 3, CON.3',
    bsiReference: 'CON.3.A1',
  },
  {
    id: 'rec-con-3',
    categoryId: 'con',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.con3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.con3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.con3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 5.3, CON.6',
    bsiReference: 'CON.6.A1',
    checklistKey: 'bsiGrundschutz.recommendations.con3.checklist',
  },

  // ============================================================
  // Category 4: Betrieb (OPS)
  // ============================================================
  {
    id: 'rec-ops-1',
    categoryId: 'ops',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'bsiGrundschutz.recommendations.ops1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.ops1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.ops1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 6, OPS.1.1.3',
    bsiReference: 'OPS.1.1.3.A1',
  },
  {
    id: 'rec-ops-2',
    categoryId: 'ops',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.ops2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.ops2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.ops2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 6, OPS.1.1.4',
    bsiReference: 'OPS.1.1.4.A1',
  },
  {
    id: 'rec-ops-3',
    categoryId: 'ops',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.ops3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.ops3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.ops3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 6, OPS.1.2.2',
    bsiReference: 'OPS.1.2.2.A1',
    checklistKey: 'bsiGrundschutz.recommendations.ops3.checklist',
  },

  // ============================================================
  // Category 5: Detektion & Reaktion (DER)
  // ============================================================
  {
    id: 'rec-der-1',
    categoryId: 'der',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.der1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.der1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.der1.firstStep',
    legalReference: 'BSI-Standard 200-4 Kap. 5, DER.1',
    bsiReference: 'DER.1.A1',
  },
  {
    id: 'rec-der-2',
    categoryId: 'der',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.der2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.der2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.der2.firstStep',
    legalReference: 'BSI-Standard 200-4 Kap. 6, DER.2.1',
    bsiReference: 'DER.2.1.A1',
  },
  {
    id: 'rec-der-3',
    categoryId: 'der',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'bsiGrundschutz.recommendations.der3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.der3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.der3.firstStep',
    legalReference: 'BSI-Standard 200-4 Kap. 7, DER.4',
    bsiReference: 'DER.4.A1',
    checklistKey: 'bsiGrundschutz.recommendations.der3.checklist',
  },

  // ============================================================
  // Category 6: Anwendungen (APP)
  // ============================================================
  {
    id: 'rec-app-1',
    categoryId: 'app',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'bsiGrundschutz.recommendations.app1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.app1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.app1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, APP.1.1',
    bsiReference: 'APP.1.1.A1',
  },
  {
    id: 'rec-app-2',
    categoryId: 'app',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.app2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.app2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.app2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, APP.1.2',
    bsiReference: 'APP.1.2.A1',
  },
  {
    id: 'rec-app-3',
    categoryId: 'app',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.app3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.app3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.app3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, APP.3.1',
    bsiReference: 'APP.3.1.A1',
    checklistKey: 'bsiGrundschutz.recommendations.app3.checklist',
  },

  // ============================================================
  // Category 7: IT-Systeme (SYS)
  // ============================================================
  {
    id: 'rec-sys-1',
    categoryId: 'sys',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.sys1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.sys1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.sys1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, SYS.1.1',
    bsiReference: 'SYS.1.1.A1',
  },
  {
    id: 'rec-sys-2',
    categoryId: 'sys',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'bsiGrundschutz.recommendations.sys2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.sys2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.sys2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, SYS.2.1',
    bsiReference: 'SYS.2.1.A1',
  },
  {
    id: 'rec-sys-3',
    categoryId: 'sys',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.sys3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.sys3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.sys3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, SYS.3.1',
    bsiReference: 'SYS.3.1.A1',
    checklistKey: 'bsiGrundschutz.recommendations.sys3.checklist',
  },

  // ============================================================
  // Category 8: Netze und Kommunikation (NET)
  // ============================================================
  {
    id: 'rec-net-1',
    categoryId: 'net',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.net1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.net1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.net1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, NET.1.1',
    bsiReference: 'NET.1.1.A1',
  },
  {
    id: 'rec-net-2',
    categoryId: 'net',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.net2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.net2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.net2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, NET.3.1',
    bsiReference: 'NET.3.1.A1',
  },
  {
    id: 'rec-net-3',
    categoryId: 'net',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'bsiGrundschutz.recommendations.net3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.net3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.net3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, NET.4.1',
    bsiReference: 'NET.4.1.A1',
    checklistKey: 'bsiGrundschutz.recommendations.net3.checklist',
  },

  // ============================================================
  // Category 9: Infrastruktur (INF)
  // ============================================================
  {
    id: 'rec-inf-1',
    categoryId: 'inf',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.inf1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.inf1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.inf1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, INF.1',
    bsiReference: 'INF.1.A1',
  },
  {
    id: 'rec-inf-2',
    categoryId: 'inf',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'bsiGrundschutz.recommendations.inf2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.inf2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.inf2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, INF.2',
    bsiReference: 'INF.2.A1',
  },
  {
    id: 'rec-inf-3',
    categoryId: 'inf',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.inf3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.inf3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.inf3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, INF.5',
    bsiReference: 'INF.5.A1',
    checklistKey: 'bsiGrundschutz.recommendations.inf3.checklist',
  },

  // ============================================================
  // Category 10: Industrielle IT (IND)
  // ============================================================
  {
    id: 'rec-ind-1',
    categoryId: 'ind',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.ind1.title',
    descriptionKey: 'bsiGrundschutz.recommendations.ind1.description',
    firstStepKey: 'bsiGrundschutz.recommendations.ind1.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, IND.1',
    bsiReference: 'IND.1.A1',
  },
  {
    id: 'rec-ind-2',
    categoryId: 'ind',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'bsiGrundschutz.recommendations.ind2.title',
    descriptionKey: 'bsiGrundschutz.recommendations.ind2.description',
    firstStepKey: 'bsiGrundschutz.recommendations.ind2.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, IND.2.1',
    bsiReference: 'IND.2.1.A1',
  },
  {
    id: 'rec-ind-3',
    categoryId: 'ind',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'bsiGrundschutz.recommendations.ind3.title',
    descriptionKey: 'bsiGrundschutz.recommendations.ind3.description',
    firstStepKey: 'bsiGrundschutz.recommendations.ind3.firstStep',
    legalReference: 'BSI-Standard 200-2 Kap. 7, IND.2.7',
    bsiReference: 'IND.2.7.A1',
    checklistKey: 'bsiGrundschutz.recommendations.ind3.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
