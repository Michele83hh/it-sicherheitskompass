// src/lib/regulations/iso27001/config.ts

/**
 * ISO 27001:2022 Regulation Configuration for the Registry
 *
 * Legal basis: ISO/IEC 27001:2022 (Information Security Management Systems)
 * International standard for establishing, implementing, maintaining,
 * and continually improving an ISMS.
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const iso27001Config: RegulationConfig = {
  id: 'iso27001',
  nameKey: 'iso27001.name',
  shortNameKey: 'iso27001.shortName',
  descriptionKey: 'iso27001.description',
  fullNameKey: 'iso27001.fullName',
  icon: 'Award',
  color: 'text-teal-600',
  gradient: 'from-teal-600 to-teal-800',
  accentColor: '#0d9488',
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
      primary: q.legalReference.isoClause,
      national: q.legalReference.annexControl,
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
  translationNamespace: 'iso27001',
};

// Register ISO 27001 on module load
registerRegulation(iso27001Config);

export { iso27001Config };
