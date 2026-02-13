// src/lib/regulations/nist-csf/config.ts

/**
 * NIST Cybersecurity Framework 2.0 Regulation Configuration for the Registry
 *
 * Legal basis: NIST CSF 2.0 (February 2024)
 * Voluntary framework for managing and reducing cybersecurity risk,
 * applicable to organizations of all sizes and sectors.
 * Version 2.0 added the Govern function and expanded supply chain guidance.
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const nistCsfConfig: RegulationConfig = {
  id: 'nist-csf',
  nameKey: 'nist-csf.name',
  shortNameKey: 'nist-csf.shortName',
  descriptionKey: 'nist-csf.description',
  fullNameKey: 'nist-csf.fullName',
  icon: 'Flag',
  color: 'text-indigo-600',
  gradient: 'from-indigo-600 to-indigo-800',
  accentColor: '#4f46e5',
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
      primary: q.legalReference.nistFunction,
      national: q.legalReference.nistCategory,
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
  translationNamespace: 'nist-csf',
};

// Register NIST CSF on module load
registerRegulation(nistCsfConfig);

export { nistCsfConfig };
