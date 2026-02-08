// src/lib/regulations/tisax/types.ts

/**
 * TISAX Domain Types
 *
 * Trusted Information Security Assessment Exchange
 * Legal basis: VDA ISA (Information Security Assessment) v6.0
 * Standard reference: ISO/IEC 27001:2022
 *
 * Re-exports shared base types and adds TISAX-specific types.
 */

// Re-export all base types from the shared regulations types
export type {
  MaturityLevel,
  TrafficLight,
  EffortLevel,
  Answer,
  CategoryScore,
  OverallScore,
  LegalReference,
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
// TISAX-Specific Types
// ============================================================

/**
 * TISAX Assessment Levels (Pruefstufen)
 *
 * AL1: Normal protection needs - self-assessment
 * AL2: High protection needs - plausibility check by audit provider
 * AL3: Very high protection needs - on-site audit by audit provider
 */
export type AssessmentLevel = 'AL1' | 'AL2' | 'AL3';

export type TisaxClassificationCategory = 'al3' | 'al2' | 'al1' | 'nicht-relevant';

export interface TisaxClassificationInput {
  isAutomotiveSupplier: boolean;
  hasPrototypeHandling: boolean;
  dataSensitivity: 'normal' | 'high' | 'very-high';
  customerRequiresAL3: boolean;
  customerRequiresAL2: boolean;
  handlesPersonalData: boolean;
}

export interface TisaxClassificationResult {
  category: TisaxClassificationCategory;
  assessmentLevel: AssessmentLevel | null;
  reason: string; // Translation key
  legalReference: string;
}

/**
 * TISAX-specific legal reference structure
 * Maps VDA ISA controls to ISO 27001 Annex A controls
 */
export interface TisaxLegalReference {
  vdaIsaControl: string; // e.g., "VDA ISA 1.1.1"
  iso27001Reference: string; // e.g., "ISO 27001 A.5.1"
}

/**
 * TISAX Question extends the base pattern with TISAX-specific fields
 */
export interface TisaxQuestion {
  id: string;
  categoryId: string;
  tier: 'core';
  titleKey: string;
  tooltipKey: string;
  helpKey: string;
  legalReference: TisaxLegalReference;
  maturityDescriptions: {
    level0Key: string;
    level1Key: string;
    level2Key: string;
    level3Key: string;
  };
}

/**
 * TISAX Category with VDA ISA module references
 */
export interface TisaxCategory {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  vdaIsaModule: string; // e.g., "Modul Informationssicherheit"
  iso27001Controls: string[]; // e.g., ["A.5", "A.6"]
  icon: string;
  questions: TisaxQuestion[];
}

/**
 * TISAX Recommendation with VDA ISA references
 */
export interface TisaxRecommendation {
  id: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  effortLevel: 'quick' | 'medium' | 'strategic';
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  vdaIsaReference: string;
  checklistKey?: string;
}
