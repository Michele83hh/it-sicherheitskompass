/**
 * SOC 2 Gap Analysis Categories
 *
 * 7 categories based on AICPA Trust Services Criteria (TSC).
 * The 5 core Trust Service Categories (Security, Availability,
 * Processing Integrity, Confidentiality, Privacy) are supplemented
 * by cross-cutting domains: Monitoring & Logging, Risk Management & Governance.
 *
 * Framework basis: AICPA TSC 2017/2022, SOC 2 Type I & Type II
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'security',
    nameKey: 'soc2.categories.security.name',
    shortNameKey: 'soc2.categories.security.shortName',
    descriptionKey: 'soc2.categories.security.description',
    tscCategory: 'Security (Common Criteria)',
    tscCriteria: ['CC1', 'CC2', 'CC3', 'CC4', 'CC5', 'CC6', 'CC7', 'CC8', 'CC9'],
    icon: 'ShieldCheck',
    questions: [],
  },
  {
    id: 'availability',
    nameKey: 'soc2.categories.availability.name',
    shortNameKey: 'soc2.categories.availability.shortName',
    descriptionKey: 'soc2.categories.availability.description',
    tscCategory: 'Availability',
    tscCriteria: ['A1.1', 'A1.2', 'A1.3'],
    icon: 'Activity',
    questions: [],
  },
  {
    id: 'processing-integrity',
    nameKey: 'soc2.categories.processingIntegrity.name',
    shortNameKey: 'soc2.categories.processingIntegrity.shortName',
    descriptionKey: 'soc2.categories.processingIntegrity.description',
    tscCategory: 'Processing Integrity',
    tscCriteria: ['PI1.1', 'PI1.2', 'PI1.3', 'PI1.4', 'PI1.5'],
    icon: 'CheckCircle2',
    questions: [],
  },
  {
    id: 'confidentiality',
    nameKey: 'soc2.categories.confidentiality.name',
    shortNameKey: 'soc2.categories.confidentiality.shortName',
    descriptionKey: 'soc2.categories.confidentiality.description',
    tscCategory: 'Confidentiality',
    tscCriteria: ['C1.1', 'C1.2'],
    icon: 'Lock',
    questions: [],
  },
  {
    id: 'privacy',
    nameKey: 'soc2.categories.privacy.name',
    shortNameKey: 'soc2.categories.privacy.shortName',
    descriptionKey: 'soc2.categories.privacy.description',
    tscCategory: 'Privacy',
    tscCriteria: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    icon: 'Eye',
    questions: [],
  },
  {
    id: 'monitoring',
    nameKey: 'soc2.categories.monitoring.name',
    shortNameKey: 'soc2.categories.monitoring.shortName',
    descriptionKey: 'soc2.categories.monitoring.description',
    tscCategory: 'Monitoring & Logging (CC7-CC8)',
    tscCriteria: ['CC7.1', 'CC7.2', 'CC7.3', 'CC7.4', 'CC7.5', 'CC8.1'],
    icon: 'MonitorCheck',
    questions: [],
  },
  {
    id: 'risk-management',
    nameKey: 'soc2.categories.riskManagement.name',
    shortNameKey: 'soc2.categories.riskManagement.shortName',
    descriptionKey: 'soc2.categories.riskManagement.description',
    tscCategory: 'Risk Management & Governance (CC1-CC3)',
    tscCriteria: ['CC1.1', 'CC1.2', 'CC1.3', 'CC1.4', 'CC1.5', 'CC2.1', 'CC2.2', 'CC2.3', 'CC3.1', 'CC3.2', 'CC3.3', 'CC3.4'],
    icon: 'BarChart3',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
