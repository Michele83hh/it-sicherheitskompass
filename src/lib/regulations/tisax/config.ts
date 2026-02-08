// src/lib/regulations/tisax/config.ts

/**
 * TISAX Regulation Configuration for the Registry
 *
 * Trusted Information Security Assessment Exchange
 * Standard basis: VDA ISA v6.0 / ISO/IEC 27001:2022
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const tisaxConfig: RegulationConfig = {
  id: 'tisax',
  nameKey: 'tisax.name',
  shortNameKey: 'tisax.shortName',
  descriptionKey: 'tisax.description',
  fullNameKey: 'tisax.fullName',
  icon: 'Car',
  color: 'text-violet-600',
  gradient: 'from-violet-600 to-violet-800',
  accentColor: '#7c3aed',
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
      primary: q.legalReference.vdaIsaControl,
      national: q.legalReference.iso27001Reference,
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
  })),
  features: {
    hasClassification: true,
    hasQuickCheck: true,
    hasTieredAssessment: false,
    hasCostEstimation: false,
    hasRoadmap: true,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
  ],
  translationNamespace: 'tisax',
};

// Register TISAX on module load
registerRegulation(tisaxConfig);

export { tisaxConfig };
