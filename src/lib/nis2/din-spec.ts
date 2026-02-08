/**
 * DIN SPEC 27076 (CyberRisikoCheck) ↔ NIS2 Comparison
 *
 * The BSI CyberRisikoCheck is a standardized IT security check
 * for companies up to 50 employees across 6 topic areas with 27 requirements.
 * 50% subsidized through the "go-digital" program.
 *
 * This module maps DIN SPEC 27076 areas to NIS2 categories
 * and identifies where NIS2 goes beyond DIN SPEC.
 */

export interface DinSpecArea {
  id: string;
  nameKey: string;
  requirements: number;
  nis2CategoryIds: string[];
  coverageNoteKey: string;
}

export const DIN_SPEC_AREAS: DinSpecArea[] = [
  {
    id: 'organization',
    nameKey: 'dinSpec.areas.organization.name',
    requirements: 6,
    nis2CategoryIds: ['risk-analysis', 'effectiveness-assessment'],
    coverageNoteKey: 'dinSpec.areas.organization.coverage',
  },
  {
    id: 'awareness',
    nameKey: 'dinSpec.areas.awareness.name',
    requirements: 4,
    nis2CategoryIds: ['cyber-hygiene'],
    coverageNoteKey: 'dinSpec.areas.awareness.coverage',
  },
  {
    id: 'identity-access',
    nameKey: 'dinSpec.areas.identityAccess.name',
    requirements: 5,
    nis2CategoryIds: ['access-control', 'authentication-communication'],
    coverageNoteKey: 'dinSpec.areas.identityAccess.coverage',
  },
  {
    id: 'data-backup',
    nameKey: 'dinSpec.areas.dataBackup.name',
    requirements: 4,
    nis2CategoryIds: ['business-continuity'],
    coverageNoteKey: 'dinSpec.areas.dataBackup.coverage',
  },
  {
    id: 'patch-management',
    nameKey: 'dinSpec.areas.patchManagement.name',
    requirements: 4,
    nis2CategoryIds: ['acquisition-development'],
    coverageNoteKey: 'dinSpec.areas.patchManagement.coverage',
  },
  {
    id: 'protection',
    nameKey: 'dinSpec.areas.protection.name',
    requirements: 4,
    nis2CategoryIds: ['cryptography', 'authentication-communication'],
    coverageNoteKey: 'dinSpec.areas.protection.coverage',
  },
];

/**
 * NIS2 areas NOT covered by DIN SPEC 27076
 */
export const NIS2_BEYOND_DIN_SPEC = [
  'dinSpec.beyond.incidentReporting',
  'dinSpec.beyond.supplyChain',
  'dinSpec.beyond.managementLiability',
  'dinSpec.beyond.bsiRegistration',
  'dinSpec.beyond.critisRequirements',
  'dinSpec.beyond.formalRiskAnalysis',
  'dinSpec.beyond.incidentResponsePlan',
  'dinSpec.beyond.crisisManagement',
];

/**
 * Key comparison facts
 */
export const DIN_SPEC_COMPARISON = {
  dinSpec: {
    targetGroupKey: 'dinSpec.comparison.dinSpec.targetGroup',
    scopeKey: 'dinSpec.comparison.dinSpec.scope',
    requirementsCount: 27,
    areasCount: 6,
    subsidyKey: 'dinSpec.comparison.dinSpec.subsidy',
    urlBsi: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/KMU/CyberRisikoCheck/CyberRisikoCheck_node.html',
  },
  nis2: {
    targetGroupKey: 'dinSpec.comparison.nis2.targetGroup',
    scopeKey: 'dinSpec.comparison.nis2.scope',
    requirementsCount: 10, // Art. 21(2) categories
    areasCount: 10,
    mandatoryKey: 'dinSpec.comparison.nis2.mandatory',
  },
};
