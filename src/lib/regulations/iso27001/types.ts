// src/lib/regulations/iso27001/types.ts

/**
 * ISO 27001:2022 Domain Types
 *
 * Legal basis: ISO/IEC 27001:2022, ISO/IEC 27002:2022
 * These types model ISO 27001-specific structures for ISMS assessment,
 * Annex A controls, gap analysis questions, scoring, and recommendations.
 *
 * ISO 27001:2022 restructured Annex A into 4 control themes:
 * - Organizational controls (A.5): 37 controls
 * - People controls (A.6): 8 controls
 * - Physical controls (A.7): 14 controls
 * - Technological controls (A.8): 34 controls
 * Total: 93 controls
 */

// Re-export shared base types from regulations framework
export type {
  MaturityLevel,
  TrafficLight,
  EffortLevel,
  Answer,
  CategoryScore,
  OverallScore,
  BaseQuestion,
  BaseCategory,
  BaseRecommendation,
} from '../types';

// ============================================================
// ISO 27001-specific Types
// ============================================================

export interface LegalReference {
  isoClause: string; // e.g., "ISO 27001:2022 Clause 6.1.2"
  annexControl: string; // e.g., "A.5.1, A.5.2" (Annex A control references)
}

export type IsoControlTheme =
  | 'organizational' // A.5 - 37 controls
  | 'people' // A.6 - 8 controls
  | 'physical' // A.7 - 14 controls
  | 'technological'; // A.8 - 34 controls

export interface Question {
  id: string;
  categoryId: string;
  tier: 'core' | 'advanced';
  titleKey: string;
  tooltipKey: string;
  helpKey: string;
  legalReference: LegalReference;
  maturityDescriptions: {
    level0Key: string;
    level1Key: string;
    level2Key: string;
    level3Key: string;
  };
}

export interface Category {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  isoClause: string; // Primary ISO 27001 clause reference
  annexControls: string[]; // Relevant Annex A control groups
  icon: string;
  questions: Question[];
}

export interface Recommendation {
  id: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  effortLevel: 'quick' | 'medium' | 'strategic';
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  bsiReference: string; // Cross-reference to BSI IT-Grundschutz
  checklistKey?: string;
}
