// src/lib/regulations/kritis/types.ts

/**
 * KRITIS Domain Types
 *
 * Legal basis: BSI-Gesetz (BSIG), BSI-Kritisverordnung (BSI-KritisV)
 * These types model KRITIS-specific structures for sectors, classification,
 * gap analysis questions, scoring, and recommendations.
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
// KRITIS-specific Types
// ============================================================

export interface LegalReference {
  euArticle: string; // e.g., "§8a Abs. 1 BSI-Gesetz"
  bsigParagraph: string; // e.g., "BSI-KritisV"
}

export type KritisClassification =
  | 'kritis-betreiber'
  | 'kritis-kandidat'
  | 'nicht-kritis';

export interface KritisSector {
  id: string;
  nameKey: string; // Translation key: "kritis.sectors.{sectorId}.name"
  schwellenwert: string; // Description of the threshold
  schwellenwertKey: string; // Translation key for threshold description
  metric: string; // What is measured (e.g., "versorgtePersonen", "mwh")
}

export interface KritisClassificationInput {
  sectorId: string;
  meetsThreshold: boolean; // Whether the operator meets sector-specific threshold
  hasKritisDesignation: boolean; // Whether officially designated by BSI
  providesEssentialService: boolean; // Whether providing essential service
}

export interface KritisClassificationResult {
  category: KritisClassification;
  reason: string; // Translation key for explanation
  legalReference: string; // e.g., "§2 Abs. 10 BSI-Gesetz"
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
  bsigParagraph: string;
  bsiBuildingBlocks: string[];
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
