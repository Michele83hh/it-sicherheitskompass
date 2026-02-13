/**
 * ISO 22301:2019 Gap Analysis Categories
 *
 * 6 categories covering the BCMS management system clauses (4-10).
 * Designed for a GF-level assessment of business continuity readiness.
 *
 * Legal basis: ISO 22301:2019 (Business Continuity Management Systems)
 * Cross-reference: BSI-Standard 200-4 (Business Continuity Management)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'context-leadership',
    nameKey: 'iso22301.categories.contextLeadership.name',
    shortNameKey: 'iso22301.categories.contextLeadership.shortName',
    descriptionKey: 'iso22301.categories.contextLeadership.description',
    isoClause: 'Clause 4, Clause 5',
    icon: 'Target',
    questions: [],
  },
  {
    id: 'planning',
    nameKey: 'iso22301.categories.planning.name',
    shortNameKey: 'iso22301.categories.planning.shortName',
    descriptionKey: 'iso22301.categories.planning.description',
    isoClause: 'Clause 6',
    icon: 'ClipboardList',
    questions: [],
  },
  {
    id: 'support-resources',
    nameKey: 'iso22301.categories.supportResources.name',
    shortNameKey: 'iso22301.categories.supportResources.shortName',
    descriptionKey: 'iso22301.categories.supportResources.description',
    isoClause: 'Clause 7',
    icon: 'Users',
    questions: [],
  },
  {
    id: 'bia-risk',
    nameKey: 'iso22301.categories.biaRisk.name',
    shortNameKey: 'iso22301.categories.biaRisk.shortName',
    descriptionKey: 'iso22301.categories.biaRisk.description',
    isoClause: 'Clause 8.2',
    icon: 'BarChart3',
    questions: [],
  },
  {
    id: 'bcm-strategy',
    nameKey: 'iso22301.categories.bcmStrategy.name',
    shortNameKey: 'iso22301.categories.bcmStrategy.shortName',
    descriptionKey: 'iso22301.categories.bcmStrategy.description',
    isoClause: 'Clause 8.3, Clause 8.4, Clause 8.5',
    icon: 'Shield',
    questions: [],
  },
  {
    id: 'evaluation-improvement',
    nameKey: 'iso22301.categories.evaluationImprovement.name',
    shortNameKey: 'iso22301.categories.evaluationImprovement.shortName',
    descriptionKey: 'iso22301.categories.evaluationImprovement.description',
    isoClause: 'Clause 9, Clause 10',
    icon: 'TrendingUp',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
