// src/lib/regulations/cis-controls/config.ts

/**
 * CIS Controls v8 Regulation Configuration for the Registry
 *
 * Legal basis: CIS Critical Security Controls v8 (Center for Internet Security)
 * Technical security baseline framework with 18 Controls organized into
 * 3 Implementation Groups (IG1-IG3) for prioritized, measurable security.
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const cisControlsConfig: RegulationConfig = {
  id: 'cis-controls',
  nameKey: 'cis-controls.name',
  shortNameKey: 'cis-controls.shortName',
  descriptionKey: 'cis-controls.description',
  fullNameKey: 'cis-controls.fullName',
  icon: 'ShieldCheck',
  color: 'text-sky-600',
  gradient: 'from-sky-600 to-sky-800',
  accentColor: '#0284c7',
  categories: CATEGORIES.map((c) => ({
    id: c.id,
    nameKey: c.nameKey,
    shortNameKey: c.shortNameKey,
    descriptionKey: c.descriptionKey,
    icon: c.icon,
    questions: [],
  })),
  questions: QUESTIONS.map((q) => ({
    id: q.id,
    categoryId: q.categoryId,
    tier: q.tier,
    titleKey: q.titleKey,
    tooltipKey: q.tooltipKey,
    helpKey: q.helpKey,
    legalReference: {
      primary: q.legalReference.cisControl,
      national: q.legalReference.implementationGroup,
    },
    maturityDescriptions: q.maturityDescriptions,
  })),
  recommendations: RECOMMENDATIONS.map((r) => ({
    id: r.id,
    categoryId: r.categoryId,
    priority: r.priority,
    effortLevel: r.effortLevel,
    titleKey: r.titleKey,
    descriptionKey: r.descriptionKey,
    firstStepKey: r.firstStepKey,
    legalReference: r.legalReference,
    checklistKey: r.checklistKey,
  })),
  quickCheckQuestions: QUICK_CHECK_QUESTIONS.map((q) => ({
    id: q.id,
    categoryId: q.categoryId,
    questionKey: q.titleKey,
    descriptionKey: q.descriptionKey,
  })),
  features: {
    hasClassification: false,
    hasQuickCheck: true,
    hasTieredAssessment: false,
    hasCostEstimation: true,
    hasRoadmap: false,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
  ],
  translationNamespace: 'cis-controls',
};

// Register CIS Controls on module load
registerRegulation(cisControlsConfig);

export { cisControlsConfig };
