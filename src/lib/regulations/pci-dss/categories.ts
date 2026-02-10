/**
 * PCI DSS v4.0 Gap Analysis Categories
 *
 * 8 categories based on PCI DSS v4.0 requirements organized by 6 goals.
 * Legal basis: PCI DSS v4.0 (March 2022), PCI Security Standards Council
 *
 * Goal 1: Build and Maintain a Secure Network and Systems (Req 1-2)
 * Goal 2: Protect Account Data (Req 3-4)
 * Goal 3: Maintain a Vulnerability Management Program (Req 5-6)
 * Goal 4: Implement Strong Access Control Measures (Req 7-9)
 * Goal 5: Regularly Monitor and Test Networks (Req 10-11)
 * Goal 6: Maintain an Information Security Policy (Req 12)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'network-security',
    nameKey: 'pciDss.categories.networkSecurity.name',
    shortNameKey: 'pciDss.categories.networkSecurity.shortName',
    descriptionKey: 'pciDss.categories.networkSecurity.description',
    pciRequirements: 'Req. 1-2',
    pciGoal: 'Goal 1: Build and Maintain a Secure Network and Systems',
    icon: 'Network',
    questions: [],
  },
  {
    id: 'data-protection',
    nameKey: 'pciDss.categories.dataProtection.name',
    shortNameKey: 'pciDss.categories.dataProtection.shortName',
    descriptionKey: 'pciDss.categories.dataProtection.description',
    pciRequirements: 'Req. 3-4',
    pciGoal: 'Goal 2: Protect Account Data',
    icon: 'Database',
    questions: [],
  },
  {
    id: 'vulnerability-mgmt',
    nameKey: 'pciDss.categories.vulnerabilityMgmt.name',
    shortNameKey: 'pciDss.categories.vulnerabilityMgmt.shortName',
    descriptionKey: 'pciDss.categories.vulnerabilityMgmt.description',
    pciRequirements: 'Req. 5-6',
    pciGoal: 'Goal 3: Maintain a Vulnerability Management Program',
    icon: 'Bug',
    questions: [],
  },
  {
    id: 'access-control',
    nameKey: 'pciDss.categories.accessControl.name',
    shortNameKey: 'pciDss.categories.accessControl.shortName',
    descriptionKey: 'pciDss.categories.accessControl.description',
    pciRequirements: 'Req. 7',
    pciGoal: 'Goal 4: Implement Strong Access Control Measures',
    icon: 'UserCheck',
    questions: [],
  },
  {
    id: 'authentication',
    nameKey: 'pciDss.categories.authentication.name',
    shortNameKey: 'pciDss.categories.authentication.shortName',
    descriptionKey: 'pciDss.categories.authentication.description',
    pciRequirements: 'Req. 8',
    pciGoal: 'Goal 4: Implement Strong Access Control Measures',
    icon: 'KeyRound',
    questions: [],
  },
  {
    id: 'physical-security',
    nameKey: 'pciDss.categories.physicalSecurity.name',
    shortNameKey: 'pciDss.categories.physicalSecurity.shortName',
    descriptionKey: 'pciDss.categories.physicalSecurity.description',
    pciRequirements: 'Req. 9',
    pciGoal: 'Goal 4: Implement Strong Access Control Measures',
    icon: 'Building2',
    questions: [],
  },
  {
    id: 'monitoring-testing',
    nameKey: 'pciDss.categories.monitoringTesting.name',
    shortNameKey: 'pciDss.categories.monitoringTesting.shortName',
    descriptionKey: 'pciDss.categories.monitoringTesting.description',
    pciRequirements: 'Req. 10-11',
    pciGoal: 'Goal 5: Regularly Monitor and Test Networks',
    icon: 'MonitorCheck',
    questions: [],
  },
  {
    id: 'security-policy',
    nameKey: 'pciDss.categories.securityPolicy.name',
    shortNameKey: 'pciDss.categories.securityPolicy.shortName',
    descriptionKey: 'pciDss.categories.securityPolicy.description',
    pciRequirements: 'Req. 12',
    pciGoal: 'Goal 6: Maintain an Information Security Policy',
    icon: 'FileText',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
