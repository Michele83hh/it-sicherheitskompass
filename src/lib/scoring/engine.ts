// src/lib/scoring/engine.ts

/**
 * NIS2 Readiness Scoring Engine
 *
 * Pure functions for calculating NIS2 readiness scores from maturity level answers.
 * No side effects, no React dependencies, no global state.
 *
 * Scoring methodology:
 * - MaturityLevel 0 = 0%, 1 = 33.3%, 2 = 66.7%, 3 = 100%
 * - Category score = average percentage of answered questions in that category
 * - Traffic light: <40% = red, 40-69% = yellow, >=70% = green
 * - Overall score = average of all category scores (equal weighting)
 *
 * Legal context: Measures per Art. 21(2)(a-j) EU NIS2 / §30 Abs. 2 Nr. 1-10 BSIG
 */

import type { MaturityLevel, TrafficLight, Answer, CategoryScore, OverallScore, CategoryQuestionCount } from './types';

/**
 * Converts a maturity level (0-3) to a percentage (0-100).
 *
 * Formula: (level / 3) * 100
 * - Level 0: 0%
 * - Level 1: 33.3%
 * - Level 2: 66.7%
 * - Level 3: 100%
 *
 * Uses division instead of multiplication by 33.33 to avoid floating-point
 * accumulation errors (e.g., 3 * 33.33 = 99.99 instead of 100).
 */
export function maturityLevelToPercentage(level: MaturityLevel): number {
  return (level / 3) * 100;
}

/**
 * Rounds a number to 1 decimal place.
 *
 * Uses the multiply-round-divide pattern to avoid floating-point display issues.
 * Example: 66.666... → 66.7, 33.333... → 33.3
 */
export function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Determines traffic light color based on percentage score.
 *
 * Thresholds (industry-standard RAG for maturity assessment):
 * - Red:    <40%  — Significant gaps, immediate action required
 * - Yellow: 40-69% — Partial implementation, improvements needed
 * - Green:  >=70% — Mature implementation, maintain and optimize
 *
 * IMPORTANT: A green score does NOT mean NIS2 compliance.
 * Every measure must be "suitable, proportionate, and effective"
 * per §30 Abs. 1 BSIG for the organization's specific risk profile.
 *
 * @param percentage - Score percentage (0-100)
 * @returns Traffic light color
 */
export function getTrafficLight(percentage: number): TrafficLight {
  if (percentage < 40) return 'red';
  if (percentage < 70) return 'yellow';
  return 'green';
}

/**
 * Calculates the maturity score for a single NIS2 category.
 *
 * Steps:
 * 1. Filter answers by categoryId
 * 2. Convert each answer's MaturityLevel to percentage via (level / 3) * 100
 * 3. Average the percentages across all answered questions
 * 4. Round to 1 decimal place
 * 5. Apply traffic light threshold
 *
 * Edge cases:
 * - Empty answers or no answers for this category → 0% with red traffic light
 * - Partial completion → score based only on answered questions
 *
 * @param answers - All user answers (will be filtered by categoryId)
 * @param categoryId - Target category ID to score
 * @param totalQuestions - Total questions in this category (for metadata)
 * @returns CategoryScore with percentage, traffic light, and completion counts
 */
export function calculateCategoryScore(
  answers: Answer[],
  categoryId: string,
  totalQuestions: number
): CategoryScore {
  const categoryAnswers = answers.filter((a) => a.categoryId === categoryId);

  if (categoryAnswers.length === 0) {
    return {
      categoryId,
      percentage: 0,
      trafficLight: 'red',
      answeredQuestions: 0,
      totalQuestions,
    };
  }

  const percentageSum = categoryAnswers.reduce((sum, answer) => {
    return sum + maturityLevelToPercentage(answer.level);
  }, 0);

  const averagePercentage = percentageSum / categoryAnswers.length;
  const rounded = roundToOneDecimal(averagePercentage);

  return {
    categoryId,
    percentage: rounded,
    trafficLight: getTrafficLight(rounded),
    answeredQuestions: categoryAnswers.length,
    totalQuestions,
  };
}

/**
 * Calculates the overall NIS2 readiness score across all categories.
 *
 * Steps:
 * 1. Calculate score for each category
 * 2. Average all category percentages (equal weighting)
 * 3. Sum up answered/total questions for completion rate
 * 4. Round overall percentage to 1 decimal place
 *
 * Equal weighting rationale: All 10 NIS2 Art. 21(2) measures are equally
 * mandatory. No legal basis exists for weighting one measure above another.
 *
 * Edge cases:
 * - No categories → 0% with red traffic light, 0% completion
 * - All categories scored → full calculation
 *
 * @param answers - All user answers across all categories
 * @param categories - Array of category IDs with their total question counts
 * @returns OverallScore with percentage, category scores, and completion rate
 */
export function calculateOverallScore(
  answers: Answer[],
  categories: CategoryQuestionCount[]
): OverallScore {
  if (categories.length === 0) {
    return {
      percentage: 0,
      trafficLight: 'red',
      categoryScores: [],
      answeredQuestions: 0,
      totalQuestions: 0,
      completionRate: 0,
    };
  }

  const categoryScores = categories.map((cat) =>
    calculateCategoryScore(answers, cat.categoryId, cat.totalQuestions)
  );

  const overallPercentageSum = categoryScores.reduce(
    (sum, cs) => sum + cs.percentage,
    0
  );
  const overallPercentage = roundToOneDecimal(
    overallPercentageSum / categoryScores.length
  );

  const totalAnswered = categoryScores.reduce(
    (sum, cs) => sum + cs.answeredQuestions,
    0
  );
  const totalQuestions = categoryScores.reduce(
    (sum, cs) => sum + cs.totalQuestions,
    0
  );

  const completionRate =
    totalQuestions > 0
      ? roundToOneDecimal((totalAnswered / totalQuestions) * 100)
      : 0;

  return {
    percentage: overallPercentage,
    trafficLight: getTrafficLight(overallPercentage),
    categoryScores,
    answeredQuestions: totalAnswered,
    totalQuestions,
    completionRate,
  };
}
