// src/lib/regulations/types.ts

/**
 * Shared Types for Multi-Regulation Platform
 *
 * These base interfaces are used by all regulations:
 * NIS2, DSGVO, KRITIS, DORA, TISAX, CRA, BSI IT-Grundschutz, ISO 27001, SOC 2
 *
 * Each regulation may extend these with regulation-specific fields.
 */

// ============================================================
// Regulation Identity
// ============================================================

export const REGULATION_IDS = [
  'nis2',
  'dsgvo',
  'kritis',
  'dora',
  'tisax',
  'cra',
  'bsi-grundschutz',
  'iso27001',
  'soc2',
  'pci-dss',
  'c5',
  'cis-controls',
  'iso22301',
  'nist-csf',
  'owasp-asvs',
] as const;

export type RegulationId = (typeof REGULATION_IDS)[number];

// ============================================================
// Scoring Types (shared across all regulations)
// ============================================================

export type MaturityLevel = 0 | 1 | 2 | 3;

export type TrafficLight = 'red' | 'yellow' | 'green';

export type EffortLevel = 'quick' | 'medium' | 'strategic';

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

// ============================================================
// Base Category, Question, Recommendation
// ============================================================

export interface LegalReference {
  primary: string; // e.g., "Art. 21 Abs. 2 lit. a NIS2-RL"
  national: string; // e.g., "§30 Abs. 2 Nr. 1 BSIG"
}

export interface BaseQuestion {
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

export interface BaseCategory {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  icon: string;
  questions: BaseQuestion[];
}

export interface BaseRecommendation {
  id: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  effortLevel: EffortLevel;
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  checklistKey?: string;
}

// ============================================================
// Classification (Betroffenheits-Check)
// ============================================================

export interface ClassificationResult {
  category: string; // regulation-specific category (e.g., 'besonders-wichtig', 'pflicht', 'empfohlen')
  reason: string; // Translation key
  legalReference: string;
}

// ============================================================
// Quick Check
// ============================================================

export type QuickCheckValue = 'yes' | 'partial' | 'no';

export interface QuickCheckQuestion {
  id: string;
  categoryId: string;
  questionKey: string;
  descriptionKey: string;
}

export interface QuickCheckAnswer {
  questionId: string;
  value: QuickCheckValue;
}

// ============================================================
// Regulation Configuration (Registry Entry)
// ============================================================

export interface RegulationFeatures {
  hasClassification: boolean;
  hasQuickCheck: boolean;
  hasTieredAssessment: boolean;
  hasCostEstimation: boolean;
  hasRoadmap: boolean;
}

export interface RegulationConfig {
  id: RegulationId;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  fullNameKey: string;
  icon: string;
  color: string; // Tailwind color class
  gradient: string; // Tailwind gradient classes
  accentColor: string; // Hex color for PDF etc.
  categories: BaseCategory[];
  questions: BaseQuestion[];
  recommendations: BaseRecommendation[];
  quickCheckQuestions?: QuickCheckQuestion[];
  features: RegulationFeatures;
  resultSections: string[];
  translationNamespace: string; // Top-level translation key prefix
}
