// src/lib/regulations/iso22301/config.ts

/**
 * ISO 22301:2019 Regulation Configuration for the Registry
 *
 * Legal basis: ISO 22301:2019 (Security and resilience - Business continuity
 * management systems - Requirements)
 *
 * International standard for establishing, implementing, maintaining,
 * and continually improving a Business Continuity Management System (BCMS).
 *
 * Cross-reference: BSI-Standard 200-4 (Business Continuity Management)
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const iso22301Config: RegulationConfig = {
  id: 'iso22301',
  nameKey: 'iso22301.name',
  shortNameKey: 'iso22301.shortName',
  descriptionKey: 'iso22301.description',
  fullNameKey: 'iso22301.fullName',
  icon: 'LifeBuoy',
  color: 'text-orange-600',
  gradient: 'from-orange-600 to-orange-800',
  accentColor: '#ea580c',
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
      national: q.legalReference.bcmControl,
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
    hasRoadmap: false,
  },
  resultSections: [
    'overallScore',
    'categoryScores',
    'recommendations',
    'quickWins',
    'progressTracking',
  ],
  translationNamespace: 'iso22301',
};

// Register ISO 22301 on module load
registerRegulation(iso22301Config);

export { iso22301Config };
