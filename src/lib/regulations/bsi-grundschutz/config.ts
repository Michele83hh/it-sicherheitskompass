// src/lib/regulations/bsi-grundschutz/config.ts

/**
 * BSI IT-Grundschutz Regulation Configuration for the Registry
 *
 * Reference: BSI-Standards 200-1, 200-2, 200-3, 200-4
 * IT-Grundschutz-Kompendium Edition 2023
 */

import type { RegulationConfig } from '../types';
import { registerRegulation } from '../registry';
import { CATEGORIES } from './categories';
import { QUESTIONS } from './questions';
import { RECOMMENDATIONS } from './recommendations';
import { QUICK_CHECK_QUESTIONS } from './quick-check';

const bsiGrundschutzConfig: RegulationConfig = {
  id: 'bsi-grundschutz',
  nameKey: 'bsiGrundschutz.name',
  shortNameKey: 'bsiGrundschutz.shortName',
  descriptionKey: 'bsiGrundschutz.description',
  fullNameKey: 'bsiGrundschutz.fullName',
  icon: 'BookOpen',
  color: 'text-slate-600',
  gradient: 'from-slate-600 to-slate-800',
  accentColor: '#475569',
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
  ],
  translationNamespace: 'bsiGrundschutz',
};

// Register BSI IT-Grundschutz on module load
registerRegulation(bsiGrundschutzConfig);

export { bsiGrundschutzConfig };
