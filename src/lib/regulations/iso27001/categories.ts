/**
 * ISO 27001:2022 Gap Analysis Categories
 *
 * 8 categories covering the ISMS management system clauses (4-10)
 * and Annex A control themes. Designed for a GF-level assessment
 * of ISO 27001 readiness.
 *
 * Legal basis: ISO/IEC 27001:2022, ISO/IEC 27002:2022
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'context-leadership',
    nameKey: 'iso27001.categories.contextLeadership.name',
    shortNameKey: 'iso27001.categories.contextLeadership.shortName',
    descriptionKey: 'iso27001.categories.contextLeadership.description',
    isoClause: 'Clause 4, Clause 5',
    annexControls: ['A.5.1', 'A.5.2', 'A.5.3', 'A.5.4'],
    icon: 'Target',
    questions: [],
  },
  {
    id: 'planning-risk',
    nameKey: 'iso27001.categories.planningRisk.name',
    shortNameKey: 'iso27001.categories.planningRisk.shortName',
    descriptionKey: 'iso27001.categories.planningRisk.description',
    isoClause: 'Clause 6',
    annexControls: ['A.5.1', 'A.5.5', 'A.5.6', 'A.5.7', 'A.5.8'],
    icon: 'Shield',
    questions: [],
  },
  {
    id: 'support-awareness',
    nameKey: 'iso27001.categories.supportAwareness.name',
    shortNameKey: 'iso27001.categories.supportAwareness.shortName',
    descriptionKey: 'iso27001.categories.supportAwareness.description',
    isoClause: 'Clause 7',
    annexControls: ['A.6.1', 'A.6.2', 'A.6.3', 'A.6.4', 'A.6.5', 'A.6.6', 'A.6.7', 'A.6.8'],
    icon: 'Users',
    questions: [],
  },
  {
    id: 'operations',
    nameKey: 'iso27001.categories.operations.name',
    shortNameKey: 'iso27001.categories.operations.shortName',
    descriptionKey: 'iso27001.categories.operations.description',
    isoClause: 'Clause 8',
    annexControls: ['A.8.1', 'A.8.2', 'A.8.9', 'A.8.10', 'A.8.11', 'A.8.12'],
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'access-control',
    nameKey: 'iso27001.categories.accessControl.name',
    shortNameKey: 'iso27001.categories.accessControl.shortName',
    descriptionKey: 'iso27001.categories.accessControl.description',
    isoClause: 'Annex A.5, A.8',
    annexControls: ['A.5.15', 'A.5.16', 'A.5.17', 'A.5.18', 'A.8.2', 'A.8.3', 'A.8.4', 'A.8.5'],
    icon: 'Lock',
    questions: [],
  },
  {
    id: 'cryptography-network',
    nameKey: 'iso27001.categories.cryptographyNetwork.name',
    shortNameKey: 'iso27001.categories.cryptographyNetwork.shortName',
    descriptionKey: 'iso27001.categories.cryptographyNetwork.description',
    isoClause: 'Annex A.8',
    annexControls: ['A.8.20', 'A.8.21', 'A.8.22', 'A.8.23', 'A.8.24', 'A.8.25', 'A.8.26'],
    icon: 'KeyRound',
    questions: [],
  },
  {
    id: 'physical-security',
    nameKey: 'iso27001.categories.physicalSecurity.name',
    shortNameKey: 'iso27001.categories.physicalSecurity.shortName',
    descriptionKey: 'iso27001.categories.physicalSecurity.description',
    isoClause: 'Annex A.7',
    annexControls: ['A.7.1', 'A.7.2', 'A.7.3', 'A.7.4', 'A.7.5', 'A.7.6', 'A.7.7', 'A.7.8',
      'A.7.9', 'A.7.10', 'A.7.11', 'A.7.12', 'A.7.13', 'A.7.14'],
    icon: 'Building2',
    questions: [],
  },
  {
    id: 'incident-continuity',
    nameKey: 'iso27001.categories.incidentContinuity.name',
    shortNameKey: 'iso27001.categories.incidentContinuity.shortName',
    descriptionKey: 'iso27001.categories.incidentContinuity.description',
    isoClause: 'Clause 9, Clause 10, Annex A.5',
    annexControls: ['A.5.24', 'A.5.25', 'A.5.26', 'A.5.27', 'A.5.28', 'A.5.29', 'A.5.30'],
    icon: 'AlertTriangle',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
