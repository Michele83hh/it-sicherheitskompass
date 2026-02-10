// src/lib/regulations/cra/config.ts

/**
 * CRA Regulation Configuration for the Registry
 *
 * Legal basis: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const craConfig: RegulationConfig = {
  id: 'cra',
  nameKey: 'cra.name',
  shortNameKey: 'cra.shortName',
  descriptionKey: 'cra.description',
  fullNameKey: 'cra.fullName',
  icon: 'Cpu',
  color: 'text-cyan-600',
  gradient: 'from-cyan-600 to-cyan-800',
  accentColor: '#0891b2',
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
    descriptionKey: q.descriptionKey,
  })),
  features: {
    hasClassification: false,
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
  translationNamespace: 'cra',
};

// Register CRA on module load
registerRegulation(craConfig);

export { craConfig };
