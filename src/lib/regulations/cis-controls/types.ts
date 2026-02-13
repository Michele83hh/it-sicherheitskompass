// src/lib/regulations/cis-controls/types.ts

/**
 * CIS Controls v8 Domain Types
 *
 * Legal basis: CIS Critical Security Controls v8 (Center for Internet Security)
 * These types model CIS Controls-specific structures for security baseline assessment,
 * Implementation Groups (IG1-IG3), gap analysis questions, scoring, and recommendations.
 *
 * CIS Controls v8 contains 18 controls organized into 3 Implementation Groups:
 * - IG1: Basic Cyber Hygiene (56 Safeguards)
 * - IG2: Intermediate (74 additional Safeguards)
 * - IG3: Advanced (23 additional Safeguards)
 * Total: 153 Safeguards across 18 Controls
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
// CIS Controls-specific Types
// ============================================================

export interface LegalReference {
  cisControl: string; // e.g., "CIS Control 1: Inventory and Control of Enterprise Assets"
  implementationGroup: string; // e.g., "IG1, IG2"
}

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
  cisControls: string[]; // CIS Control numbers covered by this category
  implementationGroup: string; // Primary IG level: 'IG1' | 'IG2' | 'IG3'
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
