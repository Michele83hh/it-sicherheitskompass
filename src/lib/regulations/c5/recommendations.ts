/**
 * BSI C5 Recommendations per Category
 *
 * 18 recommendations across 8 categories with a mix of effort levels:
 * - 5 quick wins (immediate value, minimal effort)
 * - 8 medium-term (weeks to implement)
 * - 5 strategic (months, structural changes)
 *
 * Each recommendation has concrete first steps, C5 criteria references,
 * and BSI IT-Grundschutz building block cross-references.
 *
 * Legal basis: BSI C5:2020 (Cloud Computing Compliance Criteria Catalogue)
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Organisation & Compliance (OIS, SP, HR)
  // ============================================================
  {
    id: 'rec-c5-org-1',
    categoryId: 'organisation',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'c5.recommendations.org1.title',
    descriptionKey: 'c5.recommendations.org1.description',
    firstStepKey: 'c5.recommendations.org1.firstStep',
    legalReference: 'C5:2020 OIS-01, OIS-02',
    bsiReference: 'ISMS.1, ORP.1',
  },
  {
    id: 'rec-c5-org-2',
    categoryId: 'organisation',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.org2.title',
    descriptionKey: 'c5.recommendations.org2.description',
    firstStepKey: 'c5.recommendations.org2.firstStep',
    legalReference: 'C5:2020 SP-01, SP-03',
    bsiReference: 'ORP.1, ORP.2',
    checklistKey: 'c5.recommendations.org2.checklist',
  },
  {
    id: 'rec-c5-org-3',
    categoryId: 'organisation',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'c5.recommendations.org3.title',
    descriptionKey: 'c5.recommendations.org3.description',
    firstStepKey: 'c5.recommendations.org3.firstStep',
    legalReference: 'C5:2020 HR-01, HR-05',
    bsiReference: 'ORP.2, ORP.3',
    checklistKey: 'c5.recommendations.org3.checklist',
  },

  // ============================================================
  // Category 2: Asset-Management & Klassifizierung (AM)
  // ============================================================
  {
    id: 'rec-c5-am-1',
    categoryId: 'asset-management',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'c5.recommendations.am1.title',
    descriptionKey: 'c5.recommendations.am1.description',
    firstStepKey: 'c5.recommendations.am1.firstStep',
    legalReference: 'C5:2020 AM-01, AM-02',
    bsiReference: 'ORP.1, CON.1',
  },
  {
    id: 'rec-c5-am-2',
    categoryId: 'asset-management',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.am2.title',
    descriptionKey: 'c5.recommendations.am2.description',
    firstStepKey: 'c5.recommendations.am2.firstStep',
    legalReference: 'C5:2020 AM-03, AM-05',
    bsiReference: 'CON.1, ORP.1',
    checklistKey: 'c5.recommendations.am2.checklist',
  },

  // ============================================================
  // Category 3: Physische Sicherheit (PS)
  // ============================================================
  {
    id: 'rec-c5-ps-1',
    categoryId: 'physical-security',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.ps1.title',
    descriptionKey: 'c5.recommendations.ps1.description',
    firstStepKey: 'c5.recommendations.ps1.firstStep',
    legalReference: 'C5:2020 PS-01, PS-05',
    bsiReference: 'INF.1, INF.2',
  },
  {
    id: 'rec-c5-ps-2',
    categoryId: 'physical-security',
    priority: 'low',
    effortLevel: 'strategic',
    titleKey: 'c5.recommendations.ps2.title',
    descriptionKey: 'c5.recommendations.ps2.description',
    firstStepKey: 'c5.recommendations.ps2.firstStep',
    legalReference: 'C5:2020 PS-06, PS-09',
    bsiReference: 'INF.2, INF.5',
    checklistKey: 'c5.recommendations.ps2.checklist',
  },

  // ============================================================
  // Category 4: Identitaets- & Zugriffsmanagement (IDM)
  // ============================================================
  {
    id: 'rec-c5-idm-1',
    categoryId: 'identity-access',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'c5.recommendations.idm1.title',
    descriptionKey: 'c5.recommendations.idm1.description',
    firstStepKey: 'c5.recommendations.idm1.firstStep',
    legalReference: 'C5:2020 IDM-01, IDM-02',
    bsiReference: 'ORP.4, OPS.1.1.3',
  },
  {
    id: 'rec-c5-idm-2',
    categoryId: 'identity-access',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.idm2.title',
    descriptionKey: 'c5.recommendations.idm2.description',
    firstStepKey: 'c5.recommendations.idm2.firstStep',
    legalReference: 'C5:2020 IDM-06, IDM-08',
    bsiReference: 'ORP.4, OPS.1.1.3',
  },
  {
    id: 'rec-c5-idm-3',
    categoryId: 'identity-access',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'c5.recommendations.idm3.title',
    descriptionKey: 'c5.recommendations.idm3.description',
    firstStepKey: 'c5.recommendations.idm3.firstStep',
    legalReference: 'C5:2020 IDM-07, IDM-10',
    bsiReference: 'ORP.4, OPS.1.1.3',
    checklistKey: 'c5.recommendations.idm3.checklist',
  },

  // ============================================================
  // Category 5: Betrieb & Kommunikation (OPS, COS)
  // ============================================================
  {
    id: 'rec-c5-ops-1',
    categoryId: 'operations',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.ops1.title',
    descriptionKey: 'c5.recommendations.ops1.description',
    firstStepKey: 'c5.recommendations.ops1.firstStep',
    legalReference: 'C5:2020 OPS-01, OPS-05',
    bsiReference: 'OPS.1.1.3, CON.3',
  },
  {
    id: 'rec-c5-ops-2',
    categoryId: 'operations',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.ops2.title',
    descriptionKey: 'c5.recommendations.ops2.description',
    firstStepKey: 'c5.recommendations.ops2.firstStep',
    legalReference: 'C5:2020 COS-01, COS-05',
    bsiReference: 'NET.1.1, NET.1.2',
  },

  // ============================================================
  // Category 6: Kryptografie & Schluesselmanagement (KRY)
  // ============================================================
  {
    id: 'rec-c5-kry-1',
    categoryId: 'cryptography',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'c5.recommendations.kry1.title',
    descriptionKey: 'c5.recommendations.kry1.description',
    firstStepKey: 'c5.recommendations.kry1.firstStep',
    legalReference: 'C5:2020 KRY-01, KRY-02',
    bsiReference: 'CON.1, OPS.1.1.3',
  },
  {
    id: 'rec-c5-kry-2',
    categoryId: 'cryptography',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.kry2.title',
    descriptionKey: 'c5.recommendations.kry2.description',
    firstStepKey: 'c5.recommendations.kry2.firstStep',
    legalReference: 'C5:2020 KRY-03, KRY-04',
    bsiReference: 'CON.1',
    checklistKey: 'c5.recommendations.kry2.checklist',
  },

  // ============================================================
  // Category 7: Vorfallmanagement & BCM (SIM, BCM)
  // ============================================================
  {
    id: 'rec-c5-sim-1',
    categoryId: 'incident-bcm',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'c5.recommendations.sim1.title',
    descriptionKey: 'c5.recommendations.sim1.description',
    firstStepKey: 'c5.recommendations.sim1.firstStep',
    legalReference: 'C5:2020 SIM-01, SIM-03',
    bsiReference: 'DER.2.1, DER.2.2',
  },
  {
    id: 'rec-c5-sim-2',
    categoryId: 'incident-bcm',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'c5.recommendations.sim2.title',
    descriptionKey: 'c5.recommendations.sim2.description',
    firstStepKey: 'c5.recommendations.sim2.firstStep',
    legalReference: 'C5:2020 BCM-01, BCM-04',
    bsiReference: 'CON.3, DER.4',
    checklistKey: 'c5.recommendations.sim2.checklist',
  },

  // ============================================================
  // Category 8: Entwicklung & Pruefung (DEV, SSO, PI)
  // ============================================================
  {
    id: 'rec-c5-dev-1',
    categoryId: 'development-audit',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'c5.recommendations.dev1.title',
    descriptionKey: 'c5.recommendations.dev1.description',
    firstStepKey: 'c5.recommendations.dev1.firstStep',
    legalReference: 'C5:2020 DEV-01, SSO-01',
    bsiReference: 'CON.8, OPS.1.1.3',
  },
  {
    id: 'rec-c5-dev-2',
    categoryId: 'development-audit',
    priority: 'low',
    effortLevel: 'strategic',
    titleKey: 'c5.recommendations.dev2.title',
    descriptionKey: 'c5.recommendations.dev2.description',
    firstStepKey: 'c5.recommendations.dev2.firstStep',
    legalReference: 'C5:2020 PI-01, PI-04',
    bsiReference: 'ORP.5, ISMS.1',
    checklistKey: 'c5.recommendations.dev2.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
