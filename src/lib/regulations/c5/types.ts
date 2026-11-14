// src/lib/regulations/c5/types.ts

/**
 * BSI C5 (Cloud Computing Compliance Criteria Catalogue) Domain Types
 *
 * Legal basis: BSI C5:2026 (Cloud Computing Compliance Criteria Catalogue)
 * The C5 catalogue defines 17 requirement domains with 121 criteria
 * for secure cloud computing. These types model C5-specific structures
 * for gap analysis questions, scoring, and recommendations.
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
// C5-specific Types
// ============================================================

export interface C5Reference {
  euArticle: string; // e.g., "C5:2026 OIS-01"
  bsigParagraph: string; // e.g., "BSI C5:2026"
}

/**
 * C5:2026 area codes with criteria in the BSI evaluation guide: OIS, SP, HR, AM, PS, OPS, IAM, CRY, COS, PI, DEV, SSO, SIM, BCM, COM, INQ, PSS.
 */
export type C5Domain =
  | 'OIS'
  | 'SP'
  | 'HR'
  | 'AM'
  | 'PS'
  | 'OPS'
  | 'IAM'
  | 'COS'
  | 'CRY'
  | 'SIM'
  | 'BCM'
  | 'COM'
  | 'INQ'
  | 'DEV'
  | 'SSO'
  | 'PI'
  | 'PSS';

export interface Question {
  id: string;
  categoryId: string;
  tier: 'core' | 'advanced';
  titleKey: string;
  tooltipKey: string;
  helpKey: string;
  legalReference: C5Reference;
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
  c5Domains: C5Domain[];
  c5Criteria: string[];
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
  bsiReference: string;
  checklistKey?: string;
}
