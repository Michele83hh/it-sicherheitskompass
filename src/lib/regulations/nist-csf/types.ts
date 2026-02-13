// src/lib/regulations/nist-csf/types.ts

/**
 * NIST Cybersecurity Framework 2.0 Domain Types
 *
 * Legal basis: NIST CSF 2.0 (February 2024)
 * These types model NIST CSF-specific structures for cybersecurity posture
 * assessment, Function/Category mapping, scoring, and recommendations.
 *
 * NIST CSF 2.0 organizes cybersecurity activities into 6 Functions:
 * - Govern (GV): Organizational context, risk management strategy, roles & policies
 * - Identify (ID): Asset management, risk assessment, improvement
 * - Protect (PR): Access control, awareness & training, data security, platform security
 * - Detect (DE): Continuous monitoring, adverse event analysis
 * - Respond (RS): Incident management, analysis, reporting, mitigation
 * - Recover (RC): Recovery planning, execution, communication
 *
 * Each Function contains Categories and Subcategories.
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
// NIST CSF-specific Types
// ============================================================

export interface LegalReference {
  nistFunction: string; // e.g., "NIST CSF 2.0 GV.OC"
  nistCategory: string; // e.g., "GV.OC-01, GV.OC-02" (Category/Subcategory references)
}

export type NistCsfFunction =
  | 'govern' // GV - 6 categories
  | 'identify' // ID - 3 categories
  | 'protect' // PR - 5 categories
  | 'detect' // DE - 2 categories
  | 'respond' // RS - 4 categories
  | 'recover'; // RC - 3 categories

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
  nistFunction: string; // NIST CSF Function code (GV, ID, PR, DE, RS, RC)
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
