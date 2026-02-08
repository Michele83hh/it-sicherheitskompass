/**
 * NIS2 Quick Check (Schnellcheck)
 *
 * 10 simplified questions (1 per Art. 21(2) category) for a quick
 * initial assessment. Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: §30 Abs. 2 Nr. 1-10 BSIG (BGBl. 2025 I Nr. 301)
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
    id: 'qc-1',
    categoryId: 'risk-analysis',
    titleKey: 'quickCheck.questions.q1.title',
    descriptionKey: 'quickCheck.questions.q1.description',
  },
  {
    id: 'qc-2',
    categoryId: 'incident-handling',
    titleKey: 'quickCheck.questions.q2.title',
    descriptionKey: 'quickCheck.questions.q2.description',
  },
  {
    id: 'qc-3',
    categoryId: 'business-continuity',
    titleKey: 'quickCheck.questions.q3.title',
    descriptionKey: 'quickCheck.questions.q3.description',
  },
  {
    id: 'qc-4',
    categoryId: 'supply-chain',
    titleKey: 'quickCheck.questions.q4.title',
    descriptionKey: 'quickCheck.questions.q4.description',
  },
  {
    id: 'qc-5',
    categoryId: 'acquisition-development',
    titleKey: 'quickCheck.questions.q5.title',
    descriptionKey: 'quickCheck.questions.q5.description',
  },
  {
    id: 'qc-6',
    categoryId: 'effectiveness-assessment',
    titleKey: 'quickCheck.questions.q6.title',
    descriptionKey: 'quickCheck.questions.q6.description',
  },
  {
    id: 'qc-7',
    categoryId: 'cyber-hygiene',
    titleKey: 'quickCheck.questions.q7.title',
    descriptionKey: 'quickCheck.questions.q7.description',
  },
  {
    id: 'qc-8',
    categoryId: 'cryptography',
    titleKey: 'quickCheck.questions.q8.title',
    descriptionKey: 'quickCheck.questions.q8.description',
  },
  {
    id: 'qc-9',
    categoryId: 'access-control',
    titleKey: 'quickCheck.questions.q9.title',
    descriptionKey: 'quickCheck.questions.q9.description',
  },
  {
    id: 'qc-10',
    categoryId: 'authentication-communication',
    titleKey: 'quickCheck.questions.q10.title',
    descriptionKey: 'quickCheck.questions.q10.description',
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
 * Calculate quick check score from answers.
 * Returns the same OverallScore structure as the full assessment.
 */
export function calculateQuickCheckScore(answers: QuickCheckAnswer[]): OverallScore {
  const categoryScores: CategoryScore[] = CATEGORIES.map((cat) => {
    const answer = answers.find((a) => a.categoryId === cat.id);
    const percentage = answer ? valueToPercentage(answer.value) : 0;
    return {
      categoryId: cat.id,
      percentage,
      trafficLight: getTrafficLight(percentage),
      answeredQuestions: answer ? 1 : 0,
      totalQuestions: 1,
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
    answeredQuestions: answered.length,
    totalQuestions: 10,
    completionRate: roundToOneDecimal((answered.length / 10) * 100),
  };
}
