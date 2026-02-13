// src/lib/regulations/owasp-asvs/config.ts

/**
 * OWASP ASVS 4.0 Regulation Configuration for the Registry
 *
 * Legal basis: OWASP Application Security Verification Standard 4.0.3
 * Community-driven standard for verifying the security of web applications,
 * defining three verification levels (L1/L2/L3) across 14 chapters.
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const owaspAsvsConfig: RegulationConfig = {
  id: 'owasp-asvs',
  nameKey: 'owasp-asvs.name',
  shortNameKey: 'owasp-asvs.shortName',
  descriptionKey: 'owasp-asvs.description',
  fullNameKey: 'owasp-asvs.fullName',
  icon: 'Bug',
  color: 'text-lime-600',
  gradient: 'from-lime-600 to-lime-800',
  accentColor: '#65a30d',
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
      primary: q.legalReference.asvsChapter,
      national: q.legalReference.asvsRequirement,
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
  translationNamespace: 'owasp-asvs',
};

// Register OWASP ASVS on module load
registerRegulation(owaspAsvsConfig);

export { owaspAsvsConfig };
