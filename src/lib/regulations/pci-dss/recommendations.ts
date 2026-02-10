/**
 * PCI DSS v4.0 Recommendations per Category
 *
 * 20 recommendations with concrete first steps and PCI DSS requirement references.
 * Mix: 6 quick, 8 medium, 6 strategic.
 *
 * Legal basis: PCI DSS v4.0 (March 2022)
 * Published by: PCI Security Standards Council (PCI SSC)
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Netzwerksicherheit (Req. 1-2) - 3 recs
  // ============================================================
  {
    id: 'rec-ns-1',
    categoryId: 'network-security',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.ns1.title',
    descriptionKey: 'pciDss.recommendations.ns1.description',
    firstStepKey: 'pciDss.recommendations.ns1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 1.2-1.3',
    bsiReference: 'NET.1.1, NET.3.2',
  },
  {
    id: 'rec-ns-2',
    categoryId: 'network-security',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'pciDss.recommendations.ns2.title',
    descriptionKey: 'pciDss.recommendations.ns2.description',
    firstStepKey: 'pciDss.recommendations.ns2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 2.2',
    bsiReference: 'SYS.1.1, OPS.1.1.3',
  },
  {
    id: 'rec-ns-3',
    categoryId: 'network-security',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'pciDss.recommendations.ns3.title',
    descriptionKey: 'pciDss.recommendations.ns3.description',
    firstStepKey: 'pciDss.recommendations.ns3.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 1.4',
    bsiReference: 'NET.1.1, NET.1.2',
    checklistKey: 'pciDss.recommendations.ns3.checklist',
  },

  // ============================================================
  // Category 2: Datenschutz / Kontodaten (Req. 3-4) - 3 recs
  // ============================================================
  {
    id: 'rec-dp-1',
    categoryId: 'data-protection',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.dp1.title',
    descriptionKey: 'pciDss.recommendations.dp1.description',
    firstStepKey: 'pciDss.recommendations.dp1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 3.1-3.4',
    bsiReference: 'CON.1, OPS.1.2.2',
  },
  {
    id: 'rec-dp-2',
    categoryId: 'data-protection',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.dp2.title',
    descriptionKey: 'pciDss.recommendations.dp2.description',
    firstStepKey: 'pciDss.recommendations.dp2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 3.5',
    bsiReference: 'CON.1, CON.4',
  },
  {
    id: 'rec-dp-3',
    categoryId: 'data-protection',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'pciDss.recommendations.dp3.title',
    descriptionKey: 'pciDss.recommendations.dp3.description',
    firstStepKey: 'pciDss.recommendations.dp3.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 4.2',
    bsiReference: 'CON.1',
  },

  // ============================================================
  // Category 3: Schwachstellenmanagement (Req. 5-6) - 3 recs
  // ============================================================
  {
    id: 'rec-vm-1',
    categoryId: 'vulnerability-mgmt',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'pciDss.recommendations.vm1.title',
    descriptionKey: 'pciDss.recommendations.vm1.description',
    firstStepKey: 'pciDss.recommendations.vm1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 5.2-5.3',
    bsiReference: 'OPS.1.1.4',
  },
  {
    id: 'rec-vm-2',
    categoryId: 'vulnerability-mgmt',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.vm2.title',
    descriptionKey: 'pciDss.recommendations.vm2.description',
    firstStepKey: 'pciDss.recommendations.vm2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 6.3',
    bsiReference: 'OPS.1.1.3',
  },
  {
    id: 'rec-vm-3',
    categoryId: 'vulnerability-mgmt',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'pciDss.recommendations.vm3.title',
    descriptionKey: 'pciDss.recommendations.vm3.description',
    firstStepKey: 'pciDss.recommendations.vm3.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 6.2, 6.4-6.5',
    bsiReference: 'CON.8, OPS.1.1.6',
    checklistKey: 'pciDss.recommendations.vm3.checklist',
  },

  // ============================================================
  // Category 4: Zugriffskontrolle (Req. 7) - 2 recs
  // ============================================================
  {
    id: 'rec-ac-1',
    categoryId: 'access-control',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.ac1.title',
    descriptionKey: 'pciDss.recommendations.ac1.description',
    firstStepKey: 'pciDss.recommendations.ac1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 7.1-7.2',
    bsiReference: 'ORP.4, OPS.1.1.1',
  },
  {
    id: 'rec-ac-2',
    categoryId: 'access-control',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'pciDss.recommendations.ac2.title',
    descriptionKey: 'pciDss.recommendations.ac2.description',
    firstStepKey: 'pciDss.recommendations.ac2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 7.3',
    bsiReference: 'ORP.4',
    checklistKey: 'pciDss.recommendations.ac2.checklist',
  },

  // ============================================================
  // Category 5: Authentifizierung (Req. 8) - 3 recs
  // ============================================================
  {
    id: 'rec-au-1',
    categoryId: 'authentication',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'pciDss.recommendations.au1.title',
    descriptionKey: 'pciDss.recommendations.au1.description',
    firstStepKey: 'pciDss.recommendations.au1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 8.3.6',
    bsiReference: 'ORP.4',
  },
  {
    id: 'rec-au-2',
    categoryId: 'authentication',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.au2.title',
    descriptionKey: 'pciDss.recommendations.au2.description',
    firstStepKey: 'pciDss.recommendations.au2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 8.4',
    bsiReference: 'ORP.4',
  },
  {
    id: 'rec-au-3',
    categoryId: 'authentication',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'pciDss.recommendations.au3.title',
    descriptionKey: 'pciDss.recommendations.au3.description',
    firstStepKey: 'pciDss.recommendations.au3.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 8.5-8.6',
    bsiReference: 'ORP.4, OPS.1.1.1',
    checklistKey: 'pciDss.recommendations.au3.checklist',
  },

  // ============================================================
  // Category 6: Physische Sicherheit (Req. 9) - 2 recs
  // ============================================================
  {
    id: 'rec-ps-1',
    categoryId: 'physical-security',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'pciDss.recommendations.ps1.title',
    descriptionKey: 'pciDss.recommendations.ps1.description',
    firstStepKey: 'pciDss.recommendations.ps1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 9.1-9.2',
    bsiReference: 'INF.1, INF.2',
  },
  {
    id: 'rec-ps-2',
    categoryId: 'physical-security',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'pciDss.recommendations.ps2.title',
    descriptionKey: 'pciDss.recommendations.ps2.description',
    firstStepKey: 'pciDss.recommendations.ps2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 9.4-9.5',
    bsiReference: 'INF.1, INF.5',
  },

  // ============================================================
  // Category 7: Monitoring & Tests (Req. 10-11) - 2 recs
  // ============================================================
  {
    id: 'rec-mt-1',
    categoryId: 'monitoring-testing',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.mt1.title',
    descriptionKey: 'pciDss.recommendations.mt1.description',
    firstStepKey: 'pciDss.recommendations.mt1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 10.1-10.3',
    bsiReference: 'OPS.1.1.5, DER.1',
  },
  {
    id: 'rec-mt-2',
    categoryId: 'monitoring-testing',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'pciDss.recommendations.mt2.title',
    descriptionKey: 'pciDss.recommendations.mt2.description',
    firstStepKey: 'pciDss.recommendations.mt2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 11.3-11.4',
    bsiReference: 'DER.1',
  },

  // ============================================================
  // Category 8: Sicherheitsrichtlinien (Req. 12) - 2 recs
  // ============================================================
  {
    id: 'rec-sp-1',
    categoryId: 'security-policy',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'pciDss.recommendations.sp1.title',
    descriptionKey: 'pciDss.recommendations.sp1.description',
    firstStepKey: 'pciDss.recommendations.sp1.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 12.1',
    bsiReference: 'ISMS.1, ORP.1',
  },
  {
    id: 'rec-sp-2',
    categoryId: 'security-policy',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'pciDss.recommendations.sp2.title',
    descriptionKey: 'pciDss.recommendations.sp2.description',
    firstStepKey: 'pciDss.recommendations.sp2.firstStep',
    legalReference: 'PCI DSS v4.0 Req. 12.6, 12.10',
    bsiReference: 'ORP.3, DER.2.1',
    checklistKey: 'pciDss.recommendations.sp2.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
