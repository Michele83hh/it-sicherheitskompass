// src/lib/nis2/types.ts

/**
 * NIS2 Domain Types
 *
 * Legal basis: NIS2UmsG (BGBl. 2025 I Nr. 301)
 * These types model the structured data for NIS2 sectors, classification,
 * gap analysis questions, scoring, and recommendations.
 */

// ============================================================
// Sector & Classification Types
// ============================================================

export interface Subsector {
  id: string;
  nameKey: string; // Translation key: "sectors.{sectorId}.subsectors.{subsectorId}"
}

export interface Sector {
  id: string;
  nameKey: string; // Translation key: "sectors.{sectorId}.name"
  anlage: 1 | 2; // Anlage 1 (besonders wichtig + wichtig) or Anlage 2 (wichtig only)
  subsectors: Subsector[];
}

export type EntityCategory = 'besonders-wichtig' | 'wichtig' | 'nicht-betroffen';

export interface ClassificationInput {
  sectorId: string;
  subsectorId: string | null;
  employees: number;
  annualRevenue: number; // EUR
  balanceSheet: number; // EUR
  isKritis: boolean; // Operator of critical infrastructure
}

export interface ClassificationResult {
  category: EntityCategory;
  reason: string; // Translation key for explanation
  legalReference: string; // e.g., "§28 Abs. 1 Nr. 1 BSIG"
}

export interface ClassificationThresholds {
  besondersWichtig: {
    alwaysQualified: string[];
    telecom: { employees: number; revenue: number; balanceSheet: number };
    anlage1: { employees: number; revenue: number; balanceSheet: number };
  };
  wichtig: {
    standard: { employees: number; revenue: number; balanceSheet: number };
  };
}

// ============================================================
// Gap Analysis Types (used by Plan 02-02)
// ============================================================

export type MaturityLevel = 0 | 1 | 2 | 3;

export type TrafficLight = 'red' | 'yellow' | 'green';

export interface LegalReference {
  euArticle: string;
  bsigParagraph: string;
}

export interface Question {
  id: string;
  categoryId: string;
  titleKey: string;
  tooltipKey: string;
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
  euArticle: string;
  bsigParagraph: string;
  bsiBuildingBlocks: string[];
  questions: Question[];
}

export interface Recommendation {
  id: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  bsiReference: string;
}

// ============================================================
// Scoring Types (used by Plan 02-03)
// ============================================================

export interface Answer {
  questionId: string;
  categoryId: string;
  level: MaturityLevel;
}

export interface CategoryScore {
  categoryId: string;
  percentage: number;
  trafficLight: TrafficLight;
  answeredQuestions: number;
  totalQuestions: number;
}

export interface OverallScore {
  percentage: number;
  trafficLight: TrafficLight;
  categoryScores: CategoryScore[];
  answeredQuestions: number;
  totalQuestions: number;
  completionRate: number;
}
