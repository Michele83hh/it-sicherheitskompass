/**
 * ISO 27001:2022 Quick Check (Schnellcheck)
 *
 * 10 simplified questions for a quick initial assessment of ISO 27001
 * readiness. More questions than categories (8) to adequately cover
 * the broad scope of ISO 27001 ISMS requirements.
 *
 * Answers are yes/partial/no instead of maturity levels.
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: ISO/IEC 27001:2022, ISO/IEC 27002:2022
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
    id: 'iso27001-qc-1',
    categoryId: 'context-leadership',
    titleKey: 'iso27001.quickCheck.questions.q1.title',
    descriptionKey: 'iso27001.quickCheck.questions.q1.description',
  },
  {
    id: 'iso27001-qc-2',
    categoryId: 'planning-risk',
    titleKey: 'iso27001.quickCheck.questions.q2.title',
    descriptionKey: 'iso27001.quickCheck.questions.q2.description',
  },
  {
    id: 'iso27001-qc-3',
    categoryId: 'support-awareness',
    titleKey: 'iso27001.quickCheck.questions.q3.title',
    descriptionKey: 'iso27001.quickCheck.questions.q3.description',
  },
  {
    id: 'iso27001-qc-4',
    categoryId: 'operations',
    titleKey: 'iso27001.quickCheck.questions.q4.title',
    descriptionKey: 'iso27001.quickCheck.questions.q4.description',
  },
  {
    id: 'iso27001-qc-5',
    categoryId: 'access-control',
    titleKey: 'iso27001.quickCheck.questions.q5.title',
    descriptionKey: 'iso27001.quickCheck.questions.q5.description',
  },
  {
    id: 'iso27001-qc-6',
    categoryId: 'cryptography-network',
    titleKey: 'iso27001.quickCheck.questions.q6.title',
    descriptionKey: 'iso27001.quickCheck.questions.q6.description',
  },
  {
    id: 'iso27001-qc-7',
    categoryId: 'physical-security',
    titleKey: 'iso27001.quickCheck.questions.q7.title',
    descriptionKey: 'iso27001.quickCheck.questions.q7.description',
  },
  {
    id: 'iso27001-qc-8',
    categoryId: 'incident-continuity',
    titleKey: 'iso27001.quickCheck.questions.q8.title',
    descriptionKey: 'iso27001.quickCheck.questions.q8.description',
  },
  {
    id: 'iso27001-qc-9',
    categoryId: 'planning-risk',
    titleKey: 'iso27001.quickCheck.questions.q9.title',
    descriptionKey: 'iso27001.quickCheck.questions.q9.description',
  },
  {
    id: 'iso27001-qc-10',
    categoryId: 'incident-continuity',
    titleKey: 'iso27001.quickCheck.questions.q10.title',
    descriptionKey: 'iso27001.quickCheck.questions.q10.description',
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
 * Calculate ISO 27001 quick check score from answers.
 * Returns the same OverallScore structure as the full assessment.
 *
 * Note: Some categories have 2 quick-check questions. The category score
 * is the average of all answers for that category.
 */
export function calculateQuickCheckScore(answers: QuickCheckAnswer[]): OverallScore {
  const totalCategories = CATEGORIES.length;

  const categoryScores: CategoryScore[] = CATEGORIES.map((cat) => {
    const catAnswers = answers.filter((a) => a.categoryId === cat.id);
    if (catAnswers.length === 0) {
      return {
        categoryId: cat.id,
        percentage: 0,
        trafficLight: getTrafficLight(0),
        answeredQuestions: 0,
        totalQuestions: QUICK_CHECK_QUESTIONS.filter((q) => q.categoryId === cat.id).length,
      };
    }
    const percentage = roundToOneDecimal(
      catAnswers.reduce((sum, a) => sum + valueToPercentage(a.value), 0) / catAnswers.length
    );
    return {
      categoryId: cat.id,
      percentage,
      trafficLight: getTrafficLight(percentage),
      answeredQuestions: catAnswers.length,
      totalQuestions: QUICK_CHECK_QUESTIONS.filter((q) => q.categoryId === cat.id).length,
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
