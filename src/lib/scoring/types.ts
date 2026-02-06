// src/lib/scoring/types.ts

/**
 * Scoring Engine Types
 *
 * Re-exports scoring-related types from the shared NIS2 types module,
 * plus engine-specific types for the scoring calculation.
 */

// Re-export scoring types from the shared NIS2 types
export type {
  MaturityLevel,
  TrafficLight,
  Answer,
  CategoryScore,
  OverallScore,
} from '@/lib/nis2/types';

/**
 * Minimal category info needed by the scoring engine.
 * Maps category IDs to their total question count.
 * This avoids coupling the engine to the full Category/Question types.
 */
export interface CategoryQuestionCount {
  categoryId: string;
  totalQuestions: number;
}
