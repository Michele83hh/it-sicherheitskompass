// src/lib/regulations/soc2/config.ts

/**
 * SOC 2 Regulation Configuration for the Registry
 *
 * Framework basis: AICPA Trust Services Criteria (TSC) 2017/2022
 * SOC 2 Type I (point-in-time) & Type II (over a period) audits
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const soc2Config: RegulationConfig = {
  id: 'soc2',
  nameKey: 'soc2.name',
  shortNameKey: 'soc2.shortName',
  descriptionKey: 'soc2.description',
  fullNameKey: 'soc2.fullName',
  icon: 'BadgeCheck',
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
      primary: q.tscReference.tscCriteria,
      national: q.tscReference.tscCategory,
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
    legalReference: r.tscReference,
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
    hasRoadmap: false,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
  ],
  translationNamespace: 'soc2',
};

// Register SOC 2 on module load
registerRegulation(soc2Config);

export { soc2Config };
