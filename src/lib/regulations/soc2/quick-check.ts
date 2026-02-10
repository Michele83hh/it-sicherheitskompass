/**
 * SOC 2 Quick Check (Schnellcheck)
 *
 * 10 simplified questions covering SOC 2 Trust Service Criteria
 * for a quick initial assessment of SOC 2 readiness.
 * Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Framework basis: AICPA Trust Services Criteria (TSC) 2017/2022
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
    id: 'soc2-qc-1',
    categoryId: 'security',
    titleKey: 'soc2.quickCheck.questions.q1.title',
    descriptionKey: 'soc2.quickCheck.questions.q1.description',
  },
  {
    id: 'soc2-qc-2',
    categoryId: 'security',
    titleKey: 'soc2.quickCheck.questions.q2.title',
    descriptionKey: 'soc2.quickCheck.questions.q2.description',
  },
  {
    id: 'soc2-qc-3',
    categoryId: 'availability',
    titleKey: 'soc2.quickCheck.questions.q3.title',
    descriptionKey: 'soc2.quickCheck.questions.q3.description',
  },
  {
    id: 'soc2-qc-4',
    categoryId: 'processing-integrity',
    titleKey: 'soc2.quickCheck.questions.q4.title',
    descriptionKey: 'soc2.quickCheck.questions.q4.description',
  },
  {
    id: 'soc2-qc-5',
    categoryId: 'confidentiality',
    titleKey: 'soc2.quickCheck.questions.q5.title',
    descriptionKey: 'soc2.quickCheck.questions.q5.description',
  },
  {
    id: 'soc2-qc-6',
    categoryId: 'privacy',
    titleKey: 'soc2.quickCheck.questions.q6.title',
    descriptionKey: 'soc2.quickCheck.questions.q6.description',
  },
  {
    id: 'soc2-qc-7',
    categoryId: 'monitoring',
    titleKey: 'soc2.quickCheck.questions.q7.title',
    descriptionKey: 'soc2.quickCheck.questions.q7.description',
  },
  {
    id: 'soc2-qc-8',
    categoryId: 'risk-management',
    titleKey: 'soc2.quickCheck.questions.q8.title',
    descriptionKey: 'soc2.quickCheck.questions.q8.description',
  },
  {
    id: 'soc2-qc-9',
    categoryId: 'security',
    titleKey: 'soc2.quickCheck.questions.q9.title',
    descriptionKey: 'soc2.quickCheck.questions.q9.description',
  },
  {
    id: 'soc2-qc-10',
    categoryId: 'monitoring',
    titleKey: 'soc2.quickCheck.questions.q10.title',
    descriptionKey: 'soc2.quickCheck.questions.q10.description',
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
 * Calculate SOC 2 quick check score from answers.
 * Returns the same OverallScore structure as the full assessment.
 *
 * Note: Because some categories have multiple quick-check questions,
 * we average per category first, then compute overall from category averages.
 */
export function calculateQuickCheckScore(answers: QuickCheckAnswer[]): OverallScore {
  const totalCategories = CATEGORIES.length;

  const categoryScores: CategoryScore[] = CATEGORIES.map((cat) => {
    const catAnswers = answers.filter((a) => a.categoryId === cat.id);
    const catQuestions = QUICK_CHECK_QUESTIONS.filter((q) => q.categoryId === cat.id);

    if (catAnswers.length === 0) {
      return {
        categoryId: cat.id,
        percentage: 0,
        trafficLight: getTrafficLight(0),
        answeredQuestions: 0,
        totalQuestions: catQuestions.length,
      };
    }

    const avgPercentage = roundToOneDecimal(
      catAnswers.reduce((sum, a) => sum + valueToPercentage(a.value), 0) / catAnswers.length,
    );

    return {
      categoryId: cat.id,
      percentage: avgPercentage,
      trafficLight: getTrafficLight(avgPercentage),
      answeredQuestions: catAnswers.length,
      totalQuestions: catQuestions.length,
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
