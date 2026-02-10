/**
 * KRITIS Quick Check (Schnellcheck)
 *
 * 8 simplified questions (1 per KRITIS category) for a quick
 * initial assessment of KRITIS compliance readiness.
 * Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: §8a, §8b BSI-Gesetz; BSI-KritisV
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
    id: 'kritis-qc-1',
    categoryId: 'bsi-kontaktstelle',
    titleKey: 'kritis.quickCheck.questions.q1.title',
    descriptionKey: 'kritis.quickCheck.questions.q1.description',
  },
  {
    id: 'kritis-qc-2',
    categoryId: 'risikomanagement',
    titleKey: 'kritis.quickCheck.questions.q2.title',
    descriptionKey: 'kritis.quickCheck.questions.q2.description',
  },
  {
    id: 'kritis-qc-3',
    categoryId: 'vorfallmanagement',
    titleKey: 'kritis.quickCheck.questions.q3.title',
    descriptionKey: 'kritis.quickCheck.questions.q3.description',
  },
  {
    id: 'kritis-qc-4',
    categoryId: 'bcm',
    titleKey: 'kritis.quickCheck.questions.q4.title',
    descriptionKey: 'kritis.quickCheck.questions.q4.description',
  },
  {
    id: 'kritis-qc-5',
    categoryId: 'lieferkette',
    titleKey: 'kritis.quickCheck.questions.q5.title',
    descriptionKey: 'kritis.quickCheck.questions.q5.description',
  },
  {
    id: 'kritis-qc-6',
    categoryId: 'audit',
    titleKey: 'kritis.quickCheck.questions.q6.title',
    descriptionKey: 'kritis.quickCheck.questions.q6.description',
  },
  {
    id: 'kritis-qc-7',
    categoryId: 'physische-sicherheit',
    titleKey: 'kritis.quickCheck.questions.q7.title',
    descriptionKey: 'kritis.quickCheck.questions.q7.description',
  },
  {
    id: 'kritis-qc-8',
    categoryId: 'systemhaertung',
    titleKey: 'kritis.quickCheck.questions.q8.title',
    descriptionKey: 'kritis.quickCheck.questions.q8.description',
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
 * Calculate KRITIS quick check score from answers.
 * Returns the same OverallScore structure as the full assessment.
 */
export function calculateQuickCheckScore(answers: QuickCheckAnswer[]): OverallScore {
  const totalCategories = CATEGORIES.length;

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
    totalQuestions: totalCategories,
    completionRate: roundToOneDecimal((answered.length / totalCategories) * 100),
  };
}
