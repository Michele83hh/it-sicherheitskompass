/**
 * BSI C5 Gap Analysis Categories
 *
 * 8 categories mapped from the 17 BSI C5:2020 requirement domains.
 * Each category groups related C5 domains for a manageable assessment.
 *
 * Legal basis: BSI C5:2020 (Cloud Computing Compliance Criteria Catalogue)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'organisation',
    nameKey: 'c5.categories.organisation.name',
    shortNameKey: 'c5.categories.organisation.shortName',
    descriptionKey: 'c5.categories.organisation.description',
    c5Domains: ['OIS', 'SP', 'HR'],
    c5Criteria: ['OIS-01', 'OIS-02', 'OIS-03', 'OIS-04', 'OIS-05', 'OIS-06', 'OIS-07', 'SP-01', 'SP-02', 'SP-03', 'SP-04', 'HR-01', 'HR-02', 'HR-03', 'HR-04', 'HR-05', 'HR-06'],
    icon: 'Building',
    questions: [],
  },
  {
    id: 'asset-management',
    nameKey: 'c5.categories.assetManagement.name',
    shortNameKey: 'c5.categories.assetManagement.shortName',
    descriptionKey: 'c5.categories.assetManagement.description',
    c5Domains: ['AM'],
    c5Criteria: ['AM-01', 'AM-02', 'AM-03', 'AM-04', 'AM-05', 'AM-06'],
    icon: 'Database',
    questions: [],
  },
  {
    id: 'physical-security',
    nameKey: 'c5.categories.physicalSecurity.name',
    shortNameKey: 'c5.categories.physicalSecurity.shortName',
    descriptionKey: 'c5.categories.physicalSecurity.description',
    c5Domains: ['PS'],
    c5Criteria: ['PS-01', 'PS-02', 'PS-03', 'PS-04', 'PS-05', 'PS-06', 'PS-07', 'PS-08', 'PS-09'],
    icon: 'Shield',
    questions: [],
  },
  {
    id: 'identity-access',
    nameKey: 'c5.categories.identityAccess.name',
    shortNameKey: 'c5.categories.identityAccess.shortName',
    descriptionKey: 'c5.categories.identityAccess.description',
    c5Domains: ['IDM'],
    c5Criteria: ['IDM-01', 'IDM-02', 'IDM-03', 'IDM-04', 'IDM-05', 'IDM-06', 'IDM-07', 'IDM-08', 'IDM-09', 'IDM-10'],
    icon: 'KeyRound',
    questions: [],
  },
  {
    id: 'operations',
    nameKey: 'c5.categories.operations.name',
    shortNameKey: 'c5.categories.operations.shortName',
    descriptionKey: 'c5.categories.operations.description',
    c5Domains: ['OPS', 'COS'],
    c5Criteria: ['OPS-01', 'OPS-02', 'OPS-03', 'OPS-04', 'OPS-05', 'OPS-06', 'OPS-07', 'OPS-08', 'OPS-09', 'OPS-10', 'COS-01', 'COS-02', 'COS-03', 'COS-04', 'COS-05', 'COS-06', 'COS-07', 'COS-08'],
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'cryptography',
    nameKey: 'c5.categories.cryptography.name',
    shortNameKey: 'c5.categories.cryptography.shortName',
    descriptionKey: 'c5.categories.cryptography.description',
    c5Domains: ['KRY'],
    c5Criteria: ['KRY-01', 'KRY-02', 'KRY-03', 'KRY-04'],
    icon: 'Lock',
    questions: [],
  },
  {
    id: 'incident-bcm',
    nameKey: 'c5.categories.incidentBcm.name',
    shortNameKey: 'c5.categories.incidentBcm.shortName',
    descriptionKey: 'c5.categories.incidentBcm.description',
    c5Domains: ['SIM', 'BCM'],
    c5Criteria: ['SIM-01', 'SIM-02', 'SIM-03', 'SIM-04', 'SIM-05', 'BCM-01', 'BCM-02', 'BCM-03', 'BCM-04'],
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'development-audit',
    nameKey: 'c5.categories.developmentAudit.name',
    shortNameKey: 'c5.categories.developmentAudit.shortName',
    descriptionKey: 'c5.categories.developmentAudit.description',
    c5Domains: ['DEV', 'SSO', 'PI'],
    c5Criteria: ['DEV-01', 'DEV-02', 'DEV-03', 'DEV-04', 'DEV-05', 'SSO-01', 'SSO-02', 'SSO-03', 'SSO-04', 'SSO-05', 'PI-01', 'PI-02', 'PI-03', 'PI-04'],
    icon: 'Code',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
