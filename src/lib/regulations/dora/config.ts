// src/lib/regulations/dora/config.ts

/**
 * DORA Regulation Configuration for the Registry
 *
 * Legal basis: Verordnung (EU) 2022/2554 (DORA)
 * Digital Operational Resilience Act
 * Anwendbar ab: 17. Januar 2025
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const doraConfig: RegulationConfig = {
  id: 'dora',
  nameKey: 'dora.name',
  shortNameKey: 'dora.shortName',
  descriptionKey: 'dora.description',
  fullNameKey: 'dora.fullName',
  icon: 'Landmark',
  color: 'text-amber-600',
  gradient: 'from-amber-600 to-amber-800',
  accentColor: '#d97706',
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
      primary: q.legalReference.euArticle,
      national: q.legalReference.bsigParagraph,
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
    hasTieredAssessment: true,
    hasCostEstimation: false,
    hasRoadmap: false,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
  ],
  translationNamespace: 'dora',
};

// Register DORA on module load
registerRegulation(doraConfig);

export { doraConfig };
