/**
 * BSI IT-Grundschutz Quick Check (Schnellcheck)
 *
 * 10 simplified questions (1 per IT-Grundschutz-Kompendium layer) for a quick
 * initial assessment. Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Reference: IT-Grundschutz-Kompendium Edition 2023
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
    id: 'bsi-qc-1',
    categoryId: 'isms',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q1.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q1.description',
  },
  {
    id: 'bsi-qc-2',
    categoryId: 'orp',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q2.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q2.description',
  },
  {
    id: 'bsi-qc-3',
    categoryId: 'con',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q3.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q3.description',
  },
  {
    id: 'bsi-qc-4',
    categoryId: 'ops',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q4.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q4.description',
  },
  {
    id: 'bsi-qc-5',
    categoryId: 'der',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q5.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q5.description',
  },
  {
    id: 'bsi-qc-6',
    categoryId: 'app',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q6.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q6.description',
  },
  {
    id: 'bsi-qc-7',
    categoryId: 'sys',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q7.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q7.description',
  },
  {
    id: 'bsi-qc-8',
    categoryId: 'net',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q8.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q8.description',
  },
  {
    id: 'bsi-qc-9',
    categoryId: 'inf',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q9.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q9.description',
  },
  {
    id: 'bsi-qc-10',
    categoryId: 'ind',
    titleKey: 'bsiGrundschutz.quickCheck.questions.q10.title',
    descriptionKey: 'bsiGrundschutz.quickCheck.questions.q10.description',
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
