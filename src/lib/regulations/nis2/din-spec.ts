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
  'dinSpec.beyond.items.incidentReporting',
  'dinSpec.beyond.items.supplyChain',
  'dinSpec.beyond.items.managementLiability',
  'dinSpec.beyond.items.bsiRegistration',
  'dinSpec.beyond.items.critisRequirements',
  'dinSpec.beyond.items.formalRiskAnalysis',
  'dinSpec.beyond.items.incidentResponsePlan',
  'dinSpec.beyond.items.crisisManagement',
];
