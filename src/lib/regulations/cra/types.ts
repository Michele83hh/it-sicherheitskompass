// src/lib/regulations/cra/types.ts

/**
 * CRA (Cyber Resilience Act) Domain Types
 *
 * Legal basis: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
 * These types model the structured data for CRA product classification,
 * gap analysis questions, scoring, and recommendations.
 */

// Re-export shared base types from the regulations framework
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
  ClassificationResult,
  QuickCheckValue,
  QuickCheckQuestion,
  QuickCheckAnswer,
  RegulationFeatures,
  RegulationConfig,
} from '../types';

// ============================================================
// CRA-Specific Types
// ============================================================

/**
 * CRA Product Classification (Art. 6-8, Annex III/IV)
 *
 * - default: Products with digital elements (basic requirements, self-assessment)
 * - important-class-1: e.g., browsers, password managers, VPNs, network management (Annex III Part I)
 * - important-class-2: e.g., hypervisors, firewalls, tamper-resistant microprocessors (Annex III Part II)
 * - critical: e.g., hardware security modules, smartcard readers, smart meters (Annex IV)
 */
export type ProductClass =
  | 'default'
  | 'important-class-1'
  | 'important-class-2'
  | 'critical';

export type CraClassificationCategory =
  | 'critical'
  | 'important-class-2'
  | 'important-class-1'
  | 'default'
  | 'nicht-betroffen';

export interface CraClassificationInput {
  productType: string;
  hasNetworkConnectivity: boolean;
  handlesPersonalData: boolean;
  intendedUse: 'consumer' | 'enterprise' | 'industrial' | 'mixed';
  isOpenSource: boolean;
  isSoftwareOnly: boolean;
}

export interface CraClassificationResult {
  category: CraClassificationCategory;
  productClass: ProductClass | null;
  reason: string; // Translation key
  legalReference: string;
  conformityAssessment: string; // Translation key for required assessment type
}

// ============================================================
// CRA Legal Reference
// ============================================================

/**
 * CRA legal references use euArticle for CRA articles
 * and bsigParagraph for the corresponding harmonized standard reference.
 */
export interface LegalReference {
  euArticle: string; // e.g., "Art. 10 CRA"
  bsigParagraph: string; // Harmonized standard reference, e.g., "EN 18031-1"
}

// ============================================================
// CRA Question
// ============================================================

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

// ============================================================
// CRA Category
// ============================================================

export interface Category {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  craArticle: string; // Primary CRA article(s)
  harmonizedStandard: string; // EN standard reference
  icon: string;
  questions: Question[];
}

// ============================================================
// CRA Recommendation
// ============================================================

export interface Recommendation {
  id: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  effortLevel: 'quick' | 'medium' | 'strategic';
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  standardReference: string; // EN standard or ETSI reference
  checklistKey?: string;
}
