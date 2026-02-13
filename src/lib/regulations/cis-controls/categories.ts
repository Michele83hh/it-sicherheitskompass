/**
 * CIS Controls v8 Gap Analysis Categories
 *
 * 6 categories grouping the 18 CIS Controls into logical assessment areas.
 * Designed for a GF-level assessment of technical security baseline maturity.
 *
 * Category mapping:
 *   1. Inventory & Control (CIS 1-2): Asset visibility
 *   2. Data Protection (CIS 3): Data lifecycle security
 *   3. Secure Configuration (CIS 4-6): Hardening, accounts, access
 *   4. Vulnerability Management (CIS 7-10): Vuln mgmt, logs, email, malware
 *   5. Recovery & Network (CIS 11-13): Backup, network infra, monitoring
 *   6. Security Operations (CIS 14-18): Awareness, vendors, AppSec, IR, pentesting
 *
 * Legal basis: CIS Critical Security Controls v8
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'inventory-control',
    nameKey: 'cis-controls.categories.inventoryControl.name',
    shortNameKey: 'cis-controls.categories.inventoryControl.shortName',
    descriptionKey: 'cis-controls.categories.inventoryControl.description',
    cisControls: ['1', '2'],
    implementationGroup: 'IG1',
    icon: 'ClipboardList',
    questions: [],
  },
  {
    id: 'data-protection',
    nameKey: 'cis-controls.categories.dataProtection.name',
    shortNameKey: 'cis-controls.categories.dataProtection.shortName',
    descriptionKey: 'cis-controls.categories.dataProtection.description',
    cisControls: ['3'],
    implementationGroup: 'IG1',
    icon: 'Database',
    questions: [],
  },
  {
    id: 'secure-config',
    nameKey: 'cis-controls.categories.secureConfig.name',
    shortNameKey: 'cis-controls.categories.secureConfig.shortName',
    descriptionKey: 'cis-controls.categories.secureConfig.description',
    cisControls: ['4', '5', '6'],
    implementationGroup: 'IG1',
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'vulnerability-mgmt',
    nameKey: 'cis-controls.categories.vulnerabilityMgmt.name',
    shortNameKey: 'cis-controls.categories.vulnerabilityMgmt.shortName',
    descriptionKey: 'cis-controls.categories.vulnerabilityMgmt.description',
    cisControls: ['7', '8', '9', '10'],
    implementationGroup: 'IG2',
    icon: 'Bug',
    questions: [],
  },
  {
    id: 'recovery-network',
    nameKey: 'cis-controls.categories.recoveryNetwork.name',
    shortNameKey: 'cis-controls.categories.recoveryNetwork.shortName',
    descriptionKey: 'cis-controls.categories.recoveryNetwork.description',
    cisControls: ['11', '12', '13'],
    implementationGroup: 'IG1',
    icon: 'HardDrive',
    questions: [],
  },
  {
    id: 'security-operations',
    nameKey: 'cis-controls.categories.securityOperations.name',
    shortNameKey: 'cis-controls.categories.securityOperations.shortName',
    descriptionKey: 'cis-controls.categories.securityOperations.description',
    cisControls: ['14', '15', '16', '17', '18'],
    implementationGroup: 'IG2',
    icon: 'ShieldAlert',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
