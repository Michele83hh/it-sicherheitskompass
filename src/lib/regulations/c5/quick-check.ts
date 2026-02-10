/**
 * BSI C5 Quick Check (Schnellcheck)
 *
 * 10 simplified questions for a quick initial assessment of
 * BSI C5 cloud compliance readiness. Covers all 8 categories
 * with 2 extra questions for the most critical domains.
 *
 * Answers are yes/partial/no instead of maturity levels.
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: BSI C5:2020 (Cloud Computing Compliance Criteria Catalogue)
 */

import type { TrafficLight, CategoryScore, OverallScore } from './types';
import { CATEGORIES } from './categories';

export type QuickCheckValue = 'yes' | 'partial' | 'no';

export interface QuickCheckQuestion {
  id: string;
  categoryId: string;
  titleKey: string;
  descriptionKey: string;
}

export interface QuickCheckAnswer {
  questionId: string;
  categoryId: string;
  value: QuickCheckValue;
}

export const QUICK_CHECK_QUESTIONS: QuickCheckQuestion[] = [
  {
    id: 'c5-qc-1',
    categoryId: 'organisation',
    titleKey: 'c5.quickCheck.questions.q1.title',
    descriptionKey: 'c5.quickCheck.questions.q1.description',
  },
  {
    id: 'c5-qc-2',
    categoryId: 'asset-management',
    titleKey: 'c5.quickCheck.questions.q2.title',
    descriptionKey: 'c5.quickCheck.questions.q2.description',
  },
  {
    id: 'c5-qc-3',
    categoryId: 'physical-security',
    titleKey: 'c5.quickCheck.questions.q3.title',
    descriptionKey: 'c5.quickCheck.questions.q3.description',
  },
  {
    id: 'c5-qc-4',
    categoryId: 'identity-access',
    titleKey: 'c5.quickCheck.questions.q4.title',
    descriptionKey: 'c5.quickCheck.questions.q4.description',
  },
  {
    id: 'c5-qc-5',
    categoryId: 'identity-access',
    titleKey: 'c5.quickCheck.questions.q5.title',
    descriptionKey: 'c5.quickCheck.questions.q5.description',
  },
  {
    id: 'c5-qc-6',
    categoryId: 'operations',
    titleKey: 'c5.quickCheck.questions.q6.title',
    descriptionKey: 'c5.quickCheck.questions.q6.description',
  },
  {
    id: 'c5-qc-7',
    categoryId: 'cryptography',
    titleKey: 'c5.quickCheck.questions.q7.title',
    descriptionKey: 'c5.quickCheck.questions.q7.description',
  },
  {
    id: 'c5-qc-8',
    categoryId: 'incident-bcm',
    titleKey: 'c5.quickCheck.questions.q8.title',
    descriptionKey: 'c5.quickCheck.questions.q8.description',
  },
  {
    id: 'c5-qc-9',
    categoryId: 'incident-bcm',
    titleKey: 'c5.quickCheck.questions.q9.title',
    descriptionKey: 'c5.quickCheck.questions.q9.description',
  },
  {
    id: 'c5-qc-10',
    categoryId: 'development-audit',
    titleKey: 'c5.quickCheck.questions.q10.title',
    descriptionKey: 'c5.quickCheck.questions.q10.description',
  },
];

function valueToPercentage(value: QuickCheckValue): number {
  switch (value) {
    case 'yes': return 100;
    case 'partial': return 50;
    case 'no': return 0;
  }
}

function getTrafficLight(percentage: number): TrafficLight {
  if (percentage < 40) return 'red';
  if (percentage < 70) return 'yellow';
  return 'green';
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Calculate C5 quick check score from answers.
 * Categories with multiple questions get their average.
 * Returns the same OverallScore structure as the full assessment.
 */
export function calculateQuickCheckScore(answers: QuickCheckAnswer[]): OverallScore {
  const totalCategories = CATEGORIES.length;

  const categoryScores: CategoryScore[] = CATEGORIES.map((cat) => {
    const categoryAnswers = answers.filter((a) => a.categoryId === cat.id);
    const categoryQuestions = QUICK_CHECK_QUESTIONS.filter((q) => q.categoryId === cat.id);

    if (categoryAnswers.length === 0) {
      return {
        categoryId: cat.id,
        percentage: 0,
        trafficLight: getTrafficLight(0),
        answeredQuestions: 0,
        totalQuestions: categoryQuestions.length,
      };
    }

    const avgPercentage = roundToOneDecimal(
      categoryAnswers.reduce((sum, a) => sum + valueToPercentage(a.value), 0) / categoryAnswers.length
    );

    return {
      categoryId: cat.id,
      percentage: avgPercentage,
      trafficLight: getTrafficLight(avgPercentage),
      answeredQuestions: categoryAnswers.length,
      totalQuestions: categoryQuestions.length,
    };
  });

  const answered = categoryScores.filter((cs) => cs.answeredQuestions > 0);
  const overallPercentage = answered.length > 0
    ? roundToOneDecimal(answered.reduce((sum, cs) => sum + cs.percentage, 0) / answered.length)
    : 0;

  return {
    percentage: overallPercentage,
    trafficLight: getTrafficLight(overallPercentage),
    categoryScores,
    answeredQuestions: answers.length,
    totalQuestions: QUICK_CHECK_QUESTIONS.length,
    completionRate: roundToOneDecimal((answers.length / QUICK_CHECK_QUESTIONS.length) * 100),
  };
}
