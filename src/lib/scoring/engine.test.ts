// src/lib/scoring/engine.test.ts

import { describe, it, expect } from 'vitest';
import {
  maturityLevelToPercentage,
  roundToOneDecimal,
  getTrafficLight,
  calculateCategoryScore,
  calculateOverallScore,
} from './engine';
import type { Answer, CategoryQuestionCount } from './types';

// ============================================================
// Helper: Create an Answer object for a given category
// ============================================================

function createAnswer(
  questionId: string,
  categoryId: string,
  level: 0 | 1 | 2 | 3
): Answer {
  return { questionId, categoryId, level };
}

// ============================================================
// maturityLevelToPercentage
// ============================================================

describe('maturityLevelToPercentage', () => {
  it('converts level 0 to 0%', () => {
    expect(maturityLevelToPercentage(0)).toBe(0);
  });

  it('converts level 1 to ~33.3%', () => {
    expect(maturityLevelToPercentage(1)).toBeCloseTo(33.333, 2);
  });

  it('converts level 2 to ~66.7%', () => {
    expect(maturityLevelToPercentage(2)).toBeCloseTo(66.667, 2);
  });

  it('converts level 3 to exactly 100%', () => {
    expect(maturityLevelToPercentage(3)).toBe(100);
  });
});

// ============================================================
// roundToOneDecimal
// ============================================================

describe('roundToOneDecimal', () => {
  it('rounds 33.333... to 33.3', () => {
    expect(roundToOneDecimal(33.33333)).toBe(33.3);
  });

  it('rounds 66.666... to 66.7', () => {
    expect(roundToOneDecimal(66.66667)).toBe(66.7);
  });

  it('keeps exact integers unchanged', () => {
    expect(roundToOneDecimal(50)).toBe(50);
    expect(roundToOneDecimal(0)).toBe(0);
    expect(roundToOneDecimal(100)).toBe(100);
  });

  it('rounds 99.95 to 100.0', () => {
    expect(roundToOneDecimal(99.95)).toBe(100);
  });

  it('rounds 39.94 to 39.9', () => {
    expect(roundToOneDecimal(39.94)).toBe(39.9);
  });

  it('rounds 39.95 to 40.0', () => {
    expect(roundToOneDecimal(39.95)).toBe(40);
  });
});

// ============================================================
// getTrafficLight
// ============================================================

describe('getTrafficLight', () => {
  it('returns red for 0%', () => {
    expect(getTrafficLight(0)).toBe('red');
  });

  it('returns red for scores below 40%', () => {
    expect(getTrafficLight(10)).toBe('red');
    expect(getTrafficLight(25)).toBe('red');
    expect(getTrafficLight(39)).toBe('red');
    expect(getTrafficLight(39.9)).toBe('red');
  });

  it('returns yellow for exactly 40%', () => {
    expect(getTrafficLight(40)).toBe('yellow');
  });

  it('returns yellow for scores between 40% and 69%', () => {
    expect(getTrafficLight(40.1)).toBe('yellow');
    expect(getTrafficLight(50)).toBe('yellow');
    expect(getTrafficLight(55)).toBe('yellow');
    expect(getTrafficLight(69)).toBe('yellow');
    expect(getTrafficLight(69.9)).toBe('yellow');
  });

  it('returns green for exactly 70%', () => {
    expect(getTrafficLight(70)).toBe('green');
  });

  it('returns green for scores above 70%', () => {
    expect(getTrafficLight(70.1)).toBe('green');
    expect(getTrafficLight(85)).toBe('green');
    expect(getTrafficLight(100)).toBe('green');
  });

  it('handles boundary 39.9 as red (not yellow)', () => {
    expect(getTrafficLight(39.9)).toBe('red');
  });

  it('handles boundary 69.9 as yellow (not green)', () => {
    expect(getTrafficLight(69.9)).toBe('yellow');
  });
});

// ============================================================
// calculateCategoryScore
// ============================================================

describe('calculateCategoryScore', () => {
  const CATEGORY_ID = 'risk-analysis';

  it('returns 0% with red for empty answers array', () => {
    const result = calculateCategoryScore([], CATEGORY_ID, 3);

    expect(result.categoryId).toBe(CATEGORY_ID);
    expect(result.percentage).toBe(0);
    expect(result.trafficLight).toBe('red');
    expect(result.answeredQuestions).toBe(0);
    expect(result.totalQuestions).toBe(3);
  });

  it('returns 0% with red for no matching category answers', () => {
    const answers = [
      createAnswer('q1', 'other-category', 3),
      createAnswer('q2', 'other-category', 3),
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.percentage).toBe(0);
    expect(result.trafficLight).toBe('red');
    expect(result.answeredQuestions).toBe(0);
  });

  it('calculates 0% for all level-0 answers', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 0),
      createAnswer('q2', CATEGORY_ID, 0),
      createAnswer('q3', CATEGORY_ID, 0),
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.percentage).toBe(0);
    expect(result.trafficLight).toBe('red');
    expect(result.answeredQuestions).toBe(3);
  });

  it('calculates 100% for all level-3 answers', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 3),
      createAnswer('q2', CATEGORY_ID, 3),
      createAnswer('q3', CATEGORY_ID, 3),
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.percentage).toBe(100);
    expect(result.trafficLight).toBe('green');
    expect(result.answeredQuestions).toBe(3);
  });

  it('calculates ~33.3% for all level-1 answers', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 1),
      createAnswer('q2', CATEGORY_ID, 1),
      createAnswer('q3', CATEGORY_ID, 1),
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.percentage).toBe(33.3);
    expect(result.trafficLight).toBe('red');
  });

  it('calculates ~66.7% for all level-2 answers', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 2),
      createAnswer('q2', CATEGORY_ID, 2),
      createAnswer('q3', CATEGORY_ID, 2),
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.percentage).toBe(66.7);
    expect(result.trafficLight).toBe('yellow');
  });

  it('calculates 50% for mixed levels [0, 1, 2, 3]', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 0), // 0%
      createAnswer('q2', CATEGORY_ID, 1), // 33.33%
      createAnswer('q3', CATEGORY_ID, 2), // 66.67%
      createAnswer('q4', CATEGORY_ID, 3), // 100%
    ];
    // Average: (0 + 33.33 + 66.67 + 100) / 4 = 50%

    const result = calculateCategoryScore(answers, CATEGORY_ID, 4);

    expect(result.percentage).toBe(50);
    expect(result.trafficLight).toBe('yellow');
    expect(result.answeredQuestions).toBe(4);
    expect(result.totalQuestions).toBe(4);
  });

  it('filters answers by categoryId — ignores other categories', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 3),         // 100% — counted
      createAnswer('q2', 'incident-response', 0),  // different category — ignored
      createAnswer('q3', CATEGORY_ID, 3),         // 100% — counted
      createAnswer('q4', 'supply-chain', 1),       // different category — ignored
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 4);

    expect(result.answeredQuestions).toBe(2);
    expect(result.percentage).toBe(100);
    expect(result.trafficLight).toBe('green');
  });

  it('handles partial completion (some questions unanswered)', () => {
    const answers = [
      createAnswer('q1', CATEGORY_ID, 2), // 66.67%
      createAnswer('q2', CATEGORY_ID, 2), // 66.67%
      // q3 not answered
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.answeredQuestions).toBe(2);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(66.7);
    expect(result.trafficLight).toBe('yellow');
  });

  it('handles single answer correctly', () => {
    const answers = [createAnswer('q1', CATEGORY_ID, 2)]; // 66.67%

    const result = calculateCategoryScore(answers, CATEGORY_ID, 4);

    expect(result.answeredQuestions).toBe(1);
    expect(result.totalQuestions).toBe(4);
    expect(result.percentage).toBe(66.7);
  });

  it('rounds to 1 decimal place for display', () => {
    // Level 1 = 33.333...% — must display as 33.3
    const answers = [createAnswer('q1', CATEGORY_ID, 1)];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 1);

    expect(result.percentage).toBe(33.3);
  });

  it('avoids floating-point accumulation error with level 3', () => {
    // Using (level / 3) * 100 for level 3 should give exactly 100, not 99.99
    const answers = [
      createAnswer('q1', CATEGORY_ID, 3),
      createAnswer('q2', CATEGORY_ID, 3),
      createAnswer('q3', CATEGORY_ID, 3),
    ];

    const result = calculateCategoryScore(answers, CATEGORY_ID, 3);

    expect(result.percentage).toBe(100); // NOT 99.9
  });
});

// ============================================================
// calculateOverallScore
// ============================================================

describe('calculateOverallScore', () => {
  it('returns zeros for empty categories array', () => {
    const result = calculateOverallScore([], []);

    expect(result.percentage).toBe(0);
    expect(result.trafficLight).toBe('red');
    expect(result.categoryScores).toHaveLength(0);
    expect(result.answeredQuestions).toBe(0);
    expect(result.totalQuestions).toBe(0);
    expect(result.completionRate).toBe(0);
  });

  it('calculates overall score as average of category scores', () => {
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'cat1', totalQuestions: 3 },
      { categoryId: 'cat2', totalQuestions: 3 },
    ];

    const answers: Answer[] = [
      // cat1: all level 3 → 100%
      createAnswer('q1', 'cat1', 3),
      createAnswer('q2', 'cat1', 3),
      createAnswer('q3', 'cat1', 3),
      // cat2: all level 0 → 0%
      createAnswer('q4', 'cat2', 0),
      createAnswer('q5', 'cat2', 0),
      createAnswer('q6', 'cat2', 0),
    ];
    // Overall: (100 + 0) / 2 = 50%

    const result = calculateOverallScore(answers, categories);

    expect(result.percentage).toBe(50);
    expect(result.trafficLight).toBe('yellow');
    expect(result.categoryScores).toHaveLength(2);
    expect(result.answeredQuestions).toBe(6);
    expect(result.totalQuestions).toBe(6);
    expect(result.completionRate).toBe(100);
  });

  it('returns 100% when all answers are level 3', () => {
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'cat1', totalQuestions: 2 },
      { categoryId: 'cat2', totalQuestions: 2 },
    ];

    const answers: Answer[] = [
      createAnswer('q1', 'cat1', 3),
      createAnswer('q2', 'cat1', 3),
      createAnswer('q3', 'cat2', 3),
      createAnswer('q4', 'cat2', 3),
    ];

    const result = calculateOverallScore(answers, categories);

    expect(result.percentage).toBe(100);
    expect(result.trafficLight).toBe('green');
    expect(result.completionRate).toBe(100);
  });

  it('returns 0% when all answers are level 0', () => {
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'cat1', totalQuestions: 2 },
      { categoryId: 'cat2', totalQuestions: 2 },
    ];

    const answers: Answer[] = [
      createAnswer('q1', 'cat1', 0),
      createAnswer('q2', 'cat1', 0),
      createAnswer('q3', 'cat2', 0),
      createAnswer('q4', 'cat2', 0),
    ];

    const result = calculateOverallScore(answers, categories);

    expect(result.percentage).toBe(0);
    expect(result.trafficLight).toBe('red');
  });

  it('handles partial completion with correct completion rate', () => {
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'cat1', totalQuestions: 3 },
      { categoryId: 'cat2', totalQuestions: 3 },
    ];

    const answers: Answer[] = [
      // Only 2 of 3 answered in cat1
      createAnswer('q1', 'cat1', 3),
      createAnswer('q2', 'cat1', 3),
      // Only 1 of 3 answered in cat2
      createAnswer('q4', 'cat2', 1),
    ];
    // cat1: 100%, cat2: 33.3%
    // Overall: (100 + 33.3) / 2 = 66.7%
    // Completion: 3 answered / 6 total = 50%

    const result = calculateOverallScore(answers, categories);

    expect(result.percentage).toBe(66.7);
    expect(result.trafficLight).toBe('yellow');
    expect(result.answeredQuestions).toBe(3);
    expect(result.totalQuestions).toBe(6);
    expect(result.completionRate).toBe(50);
  });

  it('uses equal weighting across all categories', () => {
    // 3 categories: one at 100%, one at 50%, one at 0%
    // Equal weighting: (100 + 50 + 0) / 3 = 50%
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'cat1', totalQuestions: 1 },
      { categoryId: 'cat2', totalQuestions: 2 },
      { categoryId: 'cat3', totalQuestions: 1 },
    ];

    const answers: Answer[] = [
      createAnswer('q1', 'cat1', 3),  // cat1: 100%
      createAnswer('q2', 'cat2', 0),  // cat2: (0+100)/2 = 50%
      createAnswer('q3', 'cat2', 3),
      createAnswer('q4', 'cat3', 0),  // cat3: 0%
    ];
    // Overall: (100 + 50 + 0) / 3 = 50%

    const result = calculateOverallScore(answers, categories);

    expect(result.percentage).toBe(50);
  });

  it('includes individual category scores in result', () => {
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'risk-analysis', totalQuestions: 3 },
      { categoryId: 'incident-response', totalQuestions: 3 },
    ];

    const answers: Answer[] = [
      createAnswer('q1', 'risk-analysis', 3),
      createAnswer('q2', 'risk-analysis', 3),
      createAnswer('q3', 'risk-analysis', 3),
      createAnswer('q4', 'incident-response', 1),
      createAnswer('q5', 'incident-response', 1),
      createAnswer('q6', 'incident-response', 1),
    ];

    const result = calculateOverallScore(answers, categories);

    expect(result.categoryScores).toHaveLength(2);

    const riskScore = result.categoryScores.find(
      (cs) => cs.categoryId === 'risk-analysis'
    );
    expect(riskScore?.percentage).toBe(100);
    expect(riskScore?.trafficLight).toBe('green');

    const incidentScore = result.categoryScores.find(
      (cs) => cs.categoryId === 'incident-response'
    );
    expect(incidentScore?.percentage).toBe(33.3);
    expect(incidentScore?.trafficLight).toBe('red');
  });

  it('handles categories with no answers (0% each)', () => {
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'cat1', totalQuestions: 3 },
      { categoryId: 'cat2', totalQuestions: 3 },
    ];

    // No answers at all
    const result = calculateOverallScore([], categories);

    expect(result.percentage).toBe(0);
    expect(result.trafficLight).toBe('red');
    expect(result.answeredQuestions).toBe(0);
    expect(result.totalQuestions).toBe(6);
    expect(result.completionRate).toBe(0);
    expect(result.categoryScores[0].percentage).toBe(0);
    expect(result.categoryScores[1].percentage).toBe(0);
  });

  it('realistic scenario: 10 NIS2 categories with mixed maturity', () => {
    // Simulates a real assessment with all 10 NIS2 categories
    const categories: CategoryQuestionCount[] = [
      { categoryId: 'risk-analysis', totalQuestions: 3 },
      { categoryId: 'incident-response', totalQuestions: 3 },
      { categoryId: 'business-continuity', totalQuestions: 3 },
      { categoryId: 'supply-chain', totalQuestions: 3 },
      { categoryId: 'secure-development', totalQuestions: 3 },
      { categoryId: 'effectiveness', totalQuestions: 3 },
      { categoryId: 'cyber-hygiene', totalQuestions: 3 },
      { categoryId: 'cryptography', totalQuestions: 3 },
      { categoryId: 'access-control', totalQuestions: 3 },
      { categoryId: 'mfa-communication', totalQuestions: 3 },
    ];

    const answers: Answer[] = [
      // risk-analysis: all level 2 → 66.7%
      createAnswer('ra1', 'risk-analysis', 2),
      createAnswer('ra2', 'risk-analysis', 2),
      createAnswer('ra3', 'risk-analysis', 2),
      // incident-response: all level 1 → 33.3%
      createAnswer('ir1', 'incident-response', 1),
      createAnswer('ir2', 'incident-response', 1),
      createAnswer('ir3', 'incident-response', 1),
      // business-continuity: all level 3 → 100%
      createAnswer('bc1', 'business-continuity', 3),
      createAnswer('bc2', 'business-continuity', 3),
      createAnswer('bc3', 'business-continuity', 3),
      // supply-chain: all level 0 → 0%
      createAnswer('sc1', 'supply-chain', 0),
      createAnswer('sc2', 'supply-chain', 0),
      createAnswer('sc3', 'supply-chain', 0),
      // secure-development: all level 2 → 66.7%
      createAnswer('sd1', 'secure-development', 2),
      createAnswer('sd2', 'secure-development', 2),
      createAnswer('sd3', 'secure-development', 2),
      // effectiveness: all level 1 → 33.3%
      createAnswer('ef1', 'effectiveness', 1),
      createAnswer('ef2', 'effectiveness', 1),
      createAnswer('ef3', 'effectiveness', 1),
      // cyber-hygiene: all level 3 → 100%
      createAnswer('ch1', 'cyber-hygiene', 3),
      createAnswer('ch2', 'cyber-hygiene', 3),
      createAnswer('ch3', 'cyber-hygiene', 3),
      // cryptography: all level 1 → 33.3%
      createAnswer('cr1', 'cryptography', 1),
      createAnswer('cr2', 'cryptography', 1),
      createAnswer('cr3', 'cryptography', 1),
      // access-control: all level 2 → 66.7%
      createAnswer('ac1', 'access-control', 2),
      createAnswer('ac2', 'access-control', 2),
      createAnswer('ac3', 'access-control', 2),
      // mfa-communication: all level 0 → 0%
      createAnswer('mf1', 'mfa-communication', 0),
      createAnswer('mf2', 'mfa-communication', 0),
      createAnswer('mf3', 'mfa-communication', 0),
    ];

    // Expected per-category:
    // 66.7 + 33.3 + 100 + 0 + 66.7 + 33.3 + 100 + 33.3 + 66.7 + 0 = 500.0
    // Overall: 500.0 / 10 = 50.0%

    const result = calculateOverallScore(answers, categories);

    expect(result.percentage).toBe(50);
    expect(result.trafficLight).toBe('yellow');
    expect(result.categoryScores).toHaveLength(10);
    expect(result.answeredQuestions).toBe(30);
    expect(result.totalQuestions).toBe(30);
    expect(result.completionRate).toBe(100);

    // Verify individual traffic lights
    const getScore = (id: string) =>
      result.categoryScores.find((cs) => cs.categoryId === id);

    expect(getScore('business-continuity')?.trafficLight).toBe('green');
    expect(getScore('cyber-hygiene')?.trafficLight).toBe('green');
    expect(getScore('risk-analysis')?.trafficLight).toBe('yellow');
    expect(getScore('supply-chain')?.trafficLight).toBe('red');
    expect(getScore('mfa-communication')?.trafficLight).toBe('red');
  });
});
