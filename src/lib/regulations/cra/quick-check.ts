/**
 * CRA Quick Check (Schnellcheck)
 *
 * 8 simplified questions (1 per CRA category) for a quick
 * initial assessment. Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
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
    id: 'cra-qc-1',
    categoryId: 'security-by-design',
    titleKey: 'cra.quickCheck.questions.q1.title',
    descriptionKey: 'cra.quickCheck.questions.q1.description',
  },
  {
    id: 'cra-qc-2',
    categoryId: 'schwachstellenmanagement',
    titleKey: 'cra.quickCheck.questions.q2.title',
    descriptionKey: 'cra.quickCheck.questions.q2.description',
  },
  {
    id: 'cra-qc-3',
    categoryId: 'sbom',
    titleKey: 'cra.quickCheck.questions.q3.title',
    descriptionKey: 'cra.quickCheck.questions.q3.description',
  },
  {
    id: 'cra-qc-4',
    categoryId: 'update-management',
    titleKey: 'cra.quickCheck.questions.q4.title',
    descriptionKey: 'cra.quickCheck.questions.q4.description',
  },
  {
    id: 'cra-qc-5',
    categoryId: 'dokumentation',
    titleKey: 'cra.quickCheck.questions.q5.title',
    descriptionKey: 'cra.quickCheck.questions.q5.description',
  },
  {
    id: 'cra-qc-6',
    categoryId: 'vorfall-meldung',
    titleKey: 'cra.quickCheck.questions.q6.title',
    descriptionKey: 'cra.quickCheck.questions.q6.description',
  },
  {
    id: 'cra-qc-7',
    categoryId: 'konformitaet',
    titleKey: 'cra.quickCheck.questions.q7.title',
    descriptionKey: 'cra.quickCheck.questions.q7.description',
  },
  {
    id: 'cra-qc-8',
    categoryId: 'support-lifecycle',
    titleKey: 'cra.quickCheck.questions.q8.title',
    descriptionKey: 'cra.quickCheck.questions.q8.description',
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
 * Calculate CRA quick check score from answers.
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
    totalQuestions: 8,
    completionRate: roundToOneDecimal((answered.length / 8) * 100),
  };
}
