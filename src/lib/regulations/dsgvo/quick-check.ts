/**
 * DSGVO Quick Check (Schnellcheck)
 *
 * 10 simplified questions (1 per DSGVO category) for a quick
 * initial assessment. Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Legal basis: Verordnung (EU) 2016/679 (DSGVO)
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
    id: 'dsgvo-qc-1',
    categoryId: 'dsfa',
    titleKey: 'dsgvo.quickCheck.questions.q1.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q1.description',
  },
  {
    id: 'dsgvo-qc-2',
    categoryId: 'verarbeitungsverzeichnis',
    titleKey: 'dsgvo.quickCheck.questions.q2.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q2.description',
  },
  {
    id: 'dsgvo-qc-3',
    categoryId: 'einwilligung',
    titleKey: 'dsgvo.quickCheck.questions.q3.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q3.description',
  },
  {
    id: 'dsgvo-qc-4',
    categoryId: 'betroffenenrechte',
    titleKey: 'dsgvo.quickCheck.questions.q4.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q4.description',
  },
  {
    id: 'dsgvo-qc-5',
    categoryId: 'datenschutzverletzung',
    titleKey: 'dsgvo.quickCheck.questions.q5.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q5.description',
  },
  {
    id: 'dsgvo-qc-6',
    categoryId: 'dsb',
    titleKey: 'dsgvo.quickCheck.questions.q6.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q6.description',
  },
  {
    id: 'dsgvo-qc-7',
    categoryId: 'datentransfer',
    titleKey: 'dsgvo.quickCheck.questions.q7.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q7.description',
  },
  {
    id: 'dsgvo-qc-8',
    categoryId: 'toms',
    titleKey: 'dsgvo.quickCheck.questions.q8.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q8.description',
  },
  {
    id: 'dsgvo-qc-9',
    categoryId: 'privacy-by-design',
    titleKey: 'dsgvo.quickCheck.questions.q9.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q9.description',
  },
  {
    id: 'dsgvo-qc-10',
    categoryId: 'auftragsverarbeitung',
    titleKey: 'dsgvo.quickCheck.questions.q10.title',
    descriptionKey: 'dsgvo.quickCheck.questions.q10.description',
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
