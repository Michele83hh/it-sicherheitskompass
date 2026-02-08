/**
 * TISAX Recommendations per Category
 *
 * Each category has 2 prioritized recommendations with concrete first steps,
 * VDA ISA references, and ISO 27001 control references.
 * 24 recommendations total (12 categories x 2 recommendations).
 *
 * Standard references:
 * - VDA ISA v6.0 (Verband der Automobilindustrie)
 * - ISO/IEC 27001:2022 Annex A
 */

import type { TisaxRecommendation } from './types';

export const RECOMMENDATIONS: TisaxRecommendation[] = [
  // Category 1: Organisation
  {
    id: 'rec-org-1',
    categoryId: 'organisation',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.org1.title',
    descriptionKey: 'tisax.recommendations.org1.description',
    firstStepKey: 'tisax.recommendations.org1.firstStep',
    legalReference: 'VDA ISA 1.1.1, ISO 27001 A.5.1',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 1',
  },
  {
    id: 'rec-org-2',
    categoryId: 'organisation',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.org2.title',
    descriptionKey: 'tisax.recommendations.org2.description',
    firstStepKey: 'tisax.recommendations.org2.firstStep',
    legalReference: 'VDA ISA 1.2.1, ISO 27001 A.5.2',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 1',
  },

  // Category 2: Personal
  {
    id: 'rec-per-1',
    categoryId: 'personal',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.per1.title',
    descriptionKey: 'tisax.recommendations.per1.description',
    firstStepKey: 'tisax.recommendations.per1.firstStep',
    legalReference: 'VDA ISA 2.1.1, ISO 27001 A.6.1',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 2',
  },
  {
    id: 'rec-per-2',
    categoryId: 'personal',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.per2.title',
    descriptionKey: 'tisax.recommendations.per2.description',
    firstStepKey: 'tisax.recommendations.per2.firstStep',
    legalReference: 'VDA ISA 2.1.2, ISO 27001 A.6.3',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 2',
  },

  // Category 3: Physische Sicherheit
  {
    id: 'rec-phy-1',
    categoryId: 'physische-sicherheit',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.phy1.title',
    descriptionKey: 'tisax.recommendations.phy1.description',
    firstStepKey: 'tisax.recommendations.phy1.firstStep',
    legalReference: 'VDA ISA 3.1.1, ISO 27001 A.7.1',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 3',
  },
  {
    id: 'rec-phy-2',
    categoryId: 'physische-sicherheit',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'tisax.recommendations.phy2.title',
    descriptionKey: 'tisax.recommendations.phy2.description',
    firstStepKey: 'tisax.recommendations.phy2.firstStep',
    legalReference: 'VDA ISA 3.1.2, ISO 27001 A.7.2',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 3',
  },

  // Category 4: Technologie
  {
    id: 'rec-tech-1',
    categoryId: 'technologie',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.tech1.title',
    descriptionKey: 'tisax.recommendations.tech1.description',
    firstStepKey: 'tisax.recommendations.tech1.firstStep',
    legalReference: 'VDA ISA 4.1.1, ISO 27001 A.8.1',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 4',
  },
  {
    id: 'rec-tech-2',
    categoryId: 'technologie',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.tech2.title',
    descriptionKey: 'tisax.recommendations.tech2.description',
    firstStepKey: 'tisax.recommendations.tech2.firstStep',
    legalReference: 'VDA ISA 4.1.2, ISO 27001 A.8.2',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 4',
  },

  // Category 5: Prototypenschutz
  {
    id: 'rec-proto-1',
    categoryId: 'prototypenschutz',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.proto1.title',
    descriptionKey: 'tisax.recommendations.proto1.description',
    firstStepKey: 'tisax.recommendations.proto1.firstStep',
    legalReference: 'VDA ISA 5.1.1, ISO 27001 A.7.1',
    vdaIsaReference: 'VDA ISA Modul Prototypenschutz, Kap. 5',
  },
  {
    id: 'rec-proto-2',
    categoryId: 'prototypenschutz',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.proto2.title',
    descriptionKey: 'tisax.recommendations.proto2.description',
    firstStepKey: 'tisax.recommendations.proto2.firstStep',
    legalReference: 'VDA ISA 5.2.1, ISO 27001 A.5.12',
    vdaIsaReference: 'VDA ISA Modul Prototypenschutz, Kap. 5',
  },

  // Category 6: Datenschutz
  {
    id: 'rec-ds-1',
    categoryId: 'datenschutz',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.ds1.title',
    descriptionKey: 'tisax.recommendations.ds1.description',
    firstStepKey: 'tisax.recommendations.ds1.firstStep',
    legalReference: 'VDA ISA 6.1.1, ISO 27001 A.5.34',
    vdaIsaReference: 'VDA ISA Modul Datenschutz, Kap. 6',
  },
  {
    id: 'rec-ds-2',
    categoryId: 'datenschutz',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.ds2.title',
    descriptionKey: 'tisax.recommendations.ds2.description',
    firstStepKey: 'tisax.recommendations.ds2.firstStep',
    legalReference: 'VDA ISA 6.1.2, ISO 27001 A.5.35',
    vdaIsaReference: 'VDA ISA Modul Datenschutz, Kap. 6',
  },

  // Category 7: Zugangskontrolle
  {
    id: 'rec-zk-1',
    categoryId: 'zugangskontrolle',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.zk1.title',
    descriptionKey: 'tisax.recommendations.zk1.description',
    firstStepKey: 'tisax.recommendations.zk1.firstStep',
    legalReference: 'VDA ISA 7.1.1, ISO 27001 A.5.15',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 7',
  },
  {
    id: 'rec-zk-2',
    categoryId: 'zugangskontrolle',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.zk2.title',
    descriptionKey: 'tisax.recommendations.zk2.description',
    firstStepKey: 'tisax.recommendations.zk2.firstStep',
    legalReference: 'VDA ISA 7.1.3, ISO 27001 A.8.5',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 7',
  },

  // Category 8: Kryptografie
  {
    id: 'rec-kry-1',
    categoryId: 'kryptografie',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.kry1.title',
    descriptionKey: 'tisax.recommendations.kry1.description',
    firstStepKey: 'tisax.recommendations.kry1.firstStep',
    legalReference: 'VDA ISA 8.1.1, ISO 27001 A.8.24',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 8',
  },
  {
    id: 'rec-kry-2',
    categoryId: 'kryptografie',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.kry2.title',
    descriptionKey: 'tisax.recommendations.kry2.description',
    firstStepKey: 'tisax.recommendations.kry2.firstStep',
    legalReference: 'VDA ISA 8.1.2, ISO 27001 A.8.25',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 8',
  },

  // Category 9: Betriebssicherheit
  {
    id: 'rec-bs-1',
    categoryId: 'betriebssicherheit',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.bs1.title',
    descriptionKey: 'tisax.recommendations.bs1.description',
    firstStepKey: 'tisax.recommendations.bs1.firstStep',
    legalReference: 'VDA ISA 9.1.1, ISO 27001 A.8.6',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 9',
  },
  {
    id: 'rec-bs-2',
    categoryId: 'betriebssicherheit',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.bs2.title',
    descriptionKey: 'tisax.recommendations.bs2.description',
    firstStepKey: 'tisax.recommendations.bs2.firstStep',
    legalReference: 'VDA ISA 9.1.2, ISO 27001 A.8.7',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 9',
  },

  // Category 10: Kommunikation
  {
    id: 'rec-kom-1',
    categoryId: 'kommunikation',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.kom1.title',
    descriptionKey: 'tisax.recommendations.kom1.description',
    firstStepKey: 'tisax.recommendations.kom1.firstStep',
    legalReference: 'VDA ISA 10.1.1, ISO 27001 A.8.20',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 10',
  },
  {
    id: 'rec-kom-2',
    categoryId: 'kommunikation',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.kom2.title',
    descriptionKey: 'tisax.recommendations.kom2.description',
    firstStepKey: 'tisax.recommendations.kom2.firstStep',
    legalReference: 'VDA ISA 10.1.2, ISO 27001 A.8.21',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 10',
  },

  // Category 11: Lieferanten
  {
    id: 'rec-lief-1',
    categoryId: 'lieferanten',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.lief1.title',
    descriptionKey: 'tisax.recommendations.lief1.description',
    firstStepKey: 'tisax.recommendations.lief1.firstStep',
    legalReference: 'VDA ISA 11.1.1, ISO 27001 A.5.19',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 11',
  },
  {
    id: 'rec-lief-2',
    categoryId: 'lieferanten',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.lief2.title',
    descriptionKey: 'tisax.recommendations.lief2.description',
    firstStepKey: 'tisax.recommendations.lief2.firstStep',
    legalReference: 'VDA ISA 11.1.2, ISO 27001 A.5.20',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 11',
  },

  // Category 12: Compliance
  {
    id: 'rec-comp-1',
    categoryId: 'compliance',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'tisax.recommendations.comp1.title',
    descriptionKey: 'tisax.recommendations.comp1.description',
    firstStepKey: 'tisax.recommendations.comp1.firstStep',
    legalReference: 'VDA ISA 12.1.1, ISO 27001 A.5.31',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 12',
  },
  {
    id: 'rec-comp-2',
    categoryId: 'compliance',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'tisax.recommendations.comp2.title',
    descriptionKey: 'tisax.recommendations.comp2.description',
    firstStepKey: 'tisax.recommendations.comp2.firstStep',
    legalReference: 'VDA ISA 12.1.2, ISO 27001 A.5.32',
    vdaIsaReference: 'VDA ISA Modul Informationssicherheit, Kap. 12',
  },
];

export function getRecommendationsByCategory(categoryId: string): TisaxRecommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
