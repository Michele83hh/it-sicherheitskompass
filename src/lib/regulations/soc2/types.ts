// src/lib/regulations/soc2/types.ts

/**
 * SOC 2 Domain Types
 *
 * Framework basis: AICPA Trust Services Criteria (TSC) 2017/2022
 * SOC 2 Type I & Type II audits based on 5 Trust Service Categories:
 * Security, Availability, Processing Integrity, Confidentiality, Privacy
 *
 * These types model SOC 2-specific structures for gap analysis,
 * scoring, and recommendations.
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
// SOC 2-specific Types
// ============================================================

export interface TscReference {
  tscCriteria: string; // e.g., "CC6.1", "A1.2", "PI1.3"
  tscCategory: string; // e.g., "Common Criteria", "Availability"
}

export type Soc2ReportType = 'type-i' | 'type-ii';

export type Soc2TrustCategory =
  | 'security'
  | 'availability'
  | 'processing-integrity'
  | 'confidentiality'
  | 'privacy';

export interface Soc2ScopeInput {
  trustCategories: Soc2TrustCategory[]; // Which TSCs are in scope
  reportType: Soc2ReportType;
  hasExistingControls: boolean;
  handlesPersonalData: boolean; // Whether Privacy TSC is relevant
}

export interface Question {
  id: string;
  categoryId: string;
  tier: 'core' | 'advanced';
  titleKey: string;
  tooltipKey: string;
  helpKey: string;
  tscReference: TscReference;
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
  tscCategory: string;
  tscCriteria: string[];
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
  tscReference: string;
  bsiReference: string;
  checklistKey?: string;
}
