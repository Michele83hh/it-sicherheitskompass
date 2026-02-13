// src/lib/regulations/dsgvo/config.ts

/**
 * DSGVO Regulation Configuration for the Registry
 *
 * Legal basis: Verordnung (EU) 2016/679 (DSGVO)
 * National implementation: Bundesdatenschutzgesetz (BDSG)
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const dsgvoConfig: RegulationConfig = {
  id: 'dsgvo',
  nameKey: 'dsgvo.name',
  shortNameKey: 'dsgvo.shortName',
  descriptionKey: 'dsgvo.description',
  fullNameKey: 'dsgvo.fullName',
  icon: 'Lock',
  color: 'text-emerald-600',
  gradient: 'from-emerald-600 to-emerald-800',
  accentColor: '#059669',
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
    hasCostEstimation: true,
    hasRoadmap: true,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
    'roadmap',
  ],
  translationNamespace: 'dsgvo',
};

// Register DSGVO on module load
registerRegulation(dsgvoConfig);

export { dsgvoConfig };
