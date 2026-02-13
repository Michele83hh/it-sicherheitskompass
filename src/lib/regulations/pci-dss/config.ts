// src/lib/regulations/pci-dss/config.ts

/**
 * PCI DSS v4.0 Regulation Configuration for the Registry
 *
 * Legal basis: Payment Card Industry Data Security Standard v4.0 (March 2022)
 * Published by: PCI Security Standards Council (PCI SSC)
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const pciDssConfig: RegulationConfig = {
  id: 'pci-dss',
  nameKey: 'pciDss.name',
  shortNameKey: 'pciDss.shortName',
  descriptionKey: 'pciDss.description',
  fullNameKey: 'pciDss.fullName',
  icon: 'CreditCard',
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
      primary: q.legalReference.pciRequirement,
      national: q.legalReference.pciGoal,
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
  translationNamespace: 'pciDss',
};

// Register PCI DSS on module load
registerRegulation(pciDssConfig);

export { pciDssConfig };
