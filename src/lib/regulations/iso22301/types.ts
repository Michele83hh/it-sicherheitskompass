// src/lib/regulations/iso22301/types.ts

/**
 * ISO 22301:2019 Domain Types
 *
 * Legal basis: ISO 22301:2019 (Security and resilience - Business continuity
 * management systems - Requirements)
 *
 * These types model ISO 22301-specific structures for BCMS assessment,
 * business impact analysis, BC strategy, plans, exercises, and recommendations.
 *
 * ISO 22301:2019 clause structure:
 * - Clause 4: Context of the organization
 * - Clause 5: Leadership
 * - Clause 6: Planning
 * - Clause 7: Support
 * - Clause 8: Operation (BIA, risk assessment, BC strategies, BC plans, exercises)
 * - Clause 9: Performance evaluation
 * - Clause 10: Improvement
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
// ISO 22301-specific Types
// ============================================================

export interface LegalReference {
  isoClause: string; // e.g., "ISO 22301:2019 Clause 8.2"
  bcmControl: string; // e.g., "BIA, RTO/RPO definition" (BCM-specific control area)
}

export type BcmDomain =
  | 'governance' // Clauses 4-5: Context, Leadership, Policy
  | 'planning' // Clause 6: Planning for BCMS
  | 'support' // Clause 7: Resources, Competence, Awareness, Communication
  | 'bia-risk' // Clause 8.2: BIA and Risk Assessment
  | 'strategy-plans' // Clause 8.3-8.5: BC Strategy, Plans, Exercises
  | 'evaluation'; // Clauses 9-10: Monitoring, Audit, Management Review, Improvement

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
  isoClause: string; // Primary ISO 22301 clause reference
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
  bsiReference: string; // Cross-reference to BSI-Standard 200-4
  checklistKey?: string;
}
