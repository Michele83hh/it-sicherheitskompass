/**
 * NIST Cybersecurity Framework 2.0 Quick Check (Schnellcheck)
 *
 * 8 simplified questions for a quick initial assessment of NIST CSF
 * readiness. Covers all 6 Functions with extra weight on Govern and Protect.
 *
 * Answers are yes/partial/no instead of maturity levels.
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: NIST CSF 2.0 (February 2024)
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
    id: 'nist-csf-qc-1',
    categoryId: 'govern',
    titleKey: 'nist-csf.quickCheck.questions.q1.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q1.description',
  },
  {
    id: 'nist-csf-qc-2',
    categoryId: 'govern',
    titleKey: 'nist-csf.quickCheck.questions.q2.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q2.description',
  },
  {
    id: 'nist-csf-qc-3',
    categoryId: 'identify',
    titleKey: 'nist-csf.quickCheck.questions.q3.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q3.description',
  },
  {
    id: 'nist-csf-qc-4',
    categoryId: 'protect',
    titleKey: 'nist-csf.quickCheck.questions.q4.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q4.description',
  },
  {
    id: 'nist-csf-qc-5',
    categoryId: 'protect',
    titleKey: 'nist-csf.quickCheck.questions.q5.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q5.description',
  },
  {
    id: 'nist-csf-qc-6',
    categoryId: 'detect',
    titleKey: 'nist-csf.quickCheck.questions.q6.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q6.description',
  },
  {
    id: 'nist-csf-qc-7',
    categoryId: 'respond',
    titleKey: 'nist-csf.quickCheck.questions.q7.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q7.description',
  },
  {
    id: 'nist-csf-qc-8',
    categoryId: 'recover',
    titleKey: 'nist-csf.quickCheck.questions.q8.title',
    descriptionKey: 'nist-csf.quickCheck.questions.q8.description',
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
 * Calculate NIST CSF quick check score from answers.
 * Returns the same OverallScore structure as the full assessment.
 *
 * Note: Some categories have 2 quick-check questions. The category score
 * is the average of all answers for that category.
 */
export function calculateQuickCheckScore(answers: QuickCheckAnswer[]): OverallScore {
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
