/**
 * TISAX Quick Check (Schnellcheck)
 *
 * 10 simplified questions covering key VDA ISA areas for a quick
 * initial assessment. Answers are yes/partial/no instead of maturity levels.
 *
 * Scoring: yes=100%, partial=50%, no=0%
 * Traffic light thresholds match the full assessment engine.
 *
 * Standard references:
 * - VDA ISA v6.0 (Verband der Automobilindustrie)
 * - ISO/IEC 27001:2022
 */

import type { TrafficLight, CategoryScore, OverallScore } from '../types';
import { CATEGORIES } from './categories';

export type QuickCheckValue = 'yes' | 'partial' | 'no';

export interface TisaxQuickCheckQuestion {
  id: string;
  categoryId: string;
  titleKey: string;
  descriptionKey: string;
}

export interface TisaxQuickCheckAnswer {
  questionId: string;
  categoryId: string;
  value: QuickCheckValue;
}

/**
 * 10 quick check questions covering the most critical VDA ISA areas.
 * Not all 12 categories are covered - focus on highest-impact areas.
 */
export const QUICK_CHECK_QUESTIONS: TisaxQuickCheckQuestion[] = [
  {
    id: 'tqc-1',
    categoryId: 'organisation',
    titleKey: 'tisax.quickCheck.questions.q1.title',
    descriptionKey: 'tisax.quickCheck.questions.q1.description',
  },
  {
    id: 'tqc-2',
    categoryId: 'personal',
    titleKey: 'tisax.quickCheck.questions.q2.title',
    descriptionKey: 'tisax.quickCheck.questions.q2.description',
  },
  {
    id: 'tqc-3',
    categoryId: 'physische-sicherheit',
    titleKey: 'tisax.quickCheck.questions.q3.title',
    descriptionKey: 'tisax.quickCheck.questions.q3.description',
  },
  {
    id: 'tqc-4',
    categoryId: 'technologie',
    titleKey: 'tisax.quickCheck.questions.q4.title',
    descriptionKey: 'tisax.quickCheck.questions.q4.description',
  },
  {
    id: 'tqc-5',
    categoryId: 'prototypenschutz',
    titleKey: 'tisax.quickCheck.questions.q5.title',
    descriptionKey: 'tisax.quickCheck.questions.q5.description',
  },
  {
    id: 'tqc-6',
    categoryId: 'datenschutz',
    titleKey: 'tisax.quickCheck.questions.q6.title',
    descriptionKey: 'tisax.quickCheck.questions.q6.description',
  },
  {
    id: 'tqc-7',
    categoryId: 'zugangskontrolle',
    titleKey: 'tisax.quickCheck.questions.q7.title',
    descriptionKey: 'tisax.quickCheck.questions.q7.description',
  },
  {
    id: 'tqc-8',
    categoryId: 'kryptografie',
    titleKey: 'tisax.quickCheck.questions.q8.title',
    descriptionKey: 'tisax.quickCheck.questions.q8.description',
  },
  {
    id: 'tqc-9',
    categoryId: 'lieferanten',
    titleKey: 'tisax.quickCheck.questions.q9.title',
    descriptionKey: 'tisax.quickCheck.questions.q9.description',
  },
  {
    id: 'tqc-10',
    categoryId: 'compliance',
    titleKey: 'tisax.quickCheck.questions.q10.title',
    descriptionKey: 'tisax.quickCheck.questions.q10.description',
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
 * Calculate TISAX quick check score from answers.
 * Returns the same OverallScore structure as the full assessment.
 */
export function calculateTisaxQuickCheckScore(answers: TisaxQuickCheckAnswer[]): OverallScore {
  // Map answers by categoryId for quick lookup
  const answerMap = new Map(answers.map((a) => [a.categoryId, a]));

  const categoryScores: CategoryScore[] = CATEGORIES.map((cat) => {
    const answer = answerMap.get(cat.id);
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

  const totalQuestions = QUICK_CHECK_QUESTIONS.length;

  return {
    percentage: overallPercentage,
    trafficLight: getTrafficLight(overallPercentage),
    categoryScores,
    answeredQuestions: answered.length,
    totalQuestions,
    completionRate: roundToOneDecimal((answered.length / totalQuestions) * 100),
  };
}
