// src/lib/regulations/nis2/config.ts

/**
 * NIS2 Regulation Configuration for the Registry
 *
 * Legal basis: NIS2UmsG (BGBl. 2025 I Nr. 301)
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const nis2Config: RegulationConfig = {
  id: 'nis2',
  nameKey: 'nis2.name',
  shortNameKey: 'nis2.shortName',
  descriptionKey: 'nis2.description',
  fullNameKey: 'nis2.fullName',
  icon: 'Shield',
  color: 'text-blue-600',
  gradient: 'from-blue-600 to-blue-800',
  accentColor: '#2563eb',
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
    hasClassification: true,
    hasQuickCheck: true,
    hasTieredAssessment: true,
    hasCostEstimation: true,
    hasRoadmap: true,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
    'costEstimation',
    'roadmap',
    'dsgvoOverlap',
    'iso27001',
    'dinSpec',
    'evidence',
    'sectorGuidance',
    'bussgeld',
    'kritis',
  ],
  translationNamespace: 'nis2',
};

// Register NIS2 on module load
registerRegulation(nis2Config);

export { nis2Config };
