/**
 * BSI C5 Gap Analysis Categories
 *
 * 8 categories mapped from the BSI C5:2026 requirement areas.
 * Each category groups related C5 domains for a manageable assessment.
 *
 * Legal basis: BSI C5:2026 (Cloud Computing Compliance Criteria Catalogue)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'organisation',
    nameKey: 'c5.categories.organisation.name',
    shortNameKey: 'c5.categories.organisation.shortName',
    descriptionKey: 'c5.categories.organisation.description',
    c5Domains: ['OIS', 'SP', 'HR'],
    c5Criteria: ['OIS-01', 'OIS-02', 'OIS-03', 'OIS-04', 'OIS-05', 'OIS-06', 'OIS-07', 'OIS-08', 'OIS-09', 'OIS-10', 'SP-01', 'SP-02', 'SP-03', 'HR-01', 'HR-02', 'HR-03', 'HR-04', 'HR-05', 'HR-06', 'HR-07', 'HR-08'],
    icon: 'Building',
    questions: [],
  },
  {
    id: 'asset-management',
    nameKey: 'c5.categories.assetManagement.name',
    shortNameKey: 'c5.categories.assetManagement.shortName',
    descriptionKey: 'c5.categories.assetManagement.description',
    c5Domains: ['AM'],
    c5Criteria: ['AM-01', 'AM-02', 'AM-03', 'AM-04', 'AM-05', 'AM-06', 'AM-07', 'AM-08', 'AM-09', 'AM-10', 'AM-11', 'AM-12'],
    icon: 'Database',
    questions: [],
  },
  {
    id: 'physical-security',
    nameKey: 'c5.categories.physicalSecurity.name',
    shortNameKey: 'c5.categories.physicalSecurity.shortName',
    descriptionKey: 'c5.categories.physicalSecurity.description',
    c5Domains: ['PS'],
    c5Criteria: ['PS-01', 'PS-02', 'PS-03', 'PS-04', 'PS-05', 'PS-06', 'PS-07', 'PS-08'],
    icon: 'Shield',
    questions: [],
  },
  {
    id: 'identity-access',
    nameKey: 'c5.categories.identityAccess.name',
    shortNameKey: 'c5.categories.identityAccess.shortName',
    descriptionKey: 'c5.categories.identityAccess.description',
    c5Domains: ['IAM'],
    c5Criteria: ['IAM-01', 'IAM-02', 'IAM-03', 'IAM-04', 'IAM-05', 'IAM-06', 'IAM-07', 'IAM-08', 'IAM-09'],
    icon: 'KeyRound',
    questions: [],
  },
  {
    id: 'operations',
    nameKey: 'c5.categories.operations.name',
    shortNameKey: 'c5.categories.operations.shortName',
    descriptionKey: 'c5.categories.operations.description',
    c5Domains: ['OPS', 'COS'],
    c5Criteria: ['OPS-01', 'OPS-02', 'OPS-03', 'OPS-04', 'OPS-05', 'OPS-06', 'OPS-07', 'OPS-08', 'OPS-09', 'OPS-10', 'OPS-11', 'OPS-12', 'OPS-13', 'OPS-14', 'OPS-15', 'OPS-16', 'OPS-17', 'OPS-18', 'OPS-19', 'OPS-20', 'OPS-21', 'OPS-22', 'OPS-23', 'OPS-24', 'OPS-25', 'OPS-26', 'OPS-27', 'OPS-28', 'OPS-29', 'OPS-30', 'OPS-31', 'OPS-32', 'OPS-33', 'OPS-34', 'OPS-35', 'COS-01', 'COS-02', 'COS-03', 'COS-04', 'COS-05', 'COS-06', 'COS-07', 'COS-08'],
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'cryptography',
    nameKey: 'c5.categories.cryptography.name',
    shortNameKey: 'c5.categories.cryptography.shortName',
    descriptionKey: 'c5.categories.cryptography.description',
    c5Domains: ['CRY'],
    c5Criteria: ['CRY-01', 'CRY-02', 'CRY-03', 'CRY-04', 'CRY-05', 'CRY-06', 'CRY-07', 'CRY-08', 'CRY-09', 'CRY-10', 'CRY-11', 'CRY-12', 'CRY-13', 'CRY-14', 'CRY-15', 'CRY-16', 'CRY-17', 'CRY-18', 'CRY-19'],
    icon: 'Lock',
    questions: [],
  },
  {
    id: 'incident-bcm',
    nameKey: 'c5.categories.incidentBcm.name',
    shortNameKey: 'c5.categories.incidentBcm.shortName',
    descriptionKey: 'c5.categories.incidentBcm.description',
    c5Domains: ['SIM', 'BCM'],
    c5Criteria: ['SIM-01', 'SIM-02', 'SIM-03', 'SIM-04', 'SIM-05', 'SIM-06', 'BCM-01', 'BCM-02', 'BCM-03', 'BCM-04'],
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'development-audit',
    nameKey: 'c5.categories.developmentAudit.name',
    shortNameKey: 'c5.categories.developmentAudit.shortName',
    descriptionKey: 'c5.categories.developmentAudit.description',
    c5Domains: ['DEV', 'SSO', 'PI'],
    c5Criteria: ['PI-01', 'PI-02', 'PI-03', 'DEV-01', 'DEV-02', 'DEV-03', 'DEV-04', 'DEV-05', 'DEV-06', 'DEV-07', 'DEV-08', 'DEV-09', 'DEV-10', 'DEV-11', 'DEV-12', 'DEV-13', 'DEV-14', 'DEV-15', 'SSO-01', 'SSO-02', 'SSO-03', 'SSO-04', 'SSO-05', 'SSO-06', 'SSO-07', 'SSO-08'],
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
