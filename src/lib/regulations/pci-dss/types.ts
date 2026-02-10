// src/lib/regulations/pci-dss/types.ts

/**
 * PCI DSS v4.0 Domain Types
 *
 * Legal basis: Payment Card Industry Data Security Standard v4.0 (March 2022)
 * Published by PCI Security Standards Council (PCI SSC)
 * These types model PCI-DSS-specific structures for gap analysis,
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
// PCI-DSS-specific Types
// ============================================================

export interface LegalReference {
  pciRequirement: string; // e.g., "PCI DSS v4.0 Req. 1.2.1"
  pciGoal: string; // e.g., "Goal 1: Build and Maintain a Secure Network"
}

export type PciDssComplianceLevel =
  | 'saq-a' // e-Commerce, card-not-present, all outsourced
  | 'saq-a-ep' // e-Commerce with partial processing
  | 'saq-d' // Full SAQ for merchants/service providers
  | 'roc'; // Report on Compliance (Level 1 merchants)

export interface PciDssMerchantLevel {
  level: 1 | 2 | 3 | 4;
  nameKey: string;
  descriptionKey: string;
  transactionsPerYear: string; // Description of threshold
  validationType: string; // ROC, SAQ-D, SAQ-A, etc.
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
  pciRequirements: string; // e.g., "Req. 1-2"
  pciGoal: string; // e.g., "Goal 1"
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
