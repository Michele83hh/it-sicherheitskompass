// src/lib/regulations/dora/types.ts

/**
 * DORA Domain Types
 *
 * Legal basis: Verordnung (EU) 2022/2554 (DORA)
 * Digital Operational Resilience Act
 * Anwendbar ab: 17. Januar 2025
 *
 * These types model the structured data for DORA entity classification,
 * gap analysis questions, scoring, and recommendations.
 */

// Re-export base types from the shared regulations types
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
  LegalReference,
  ClassificationResult,
  QuickCheckValue,
  QuickCheckQuestion,
  QuickCheckAnswer,
  RegulationConfig,
  RegulationFeatures,
} from '../types';

// ============================================================
// DORA-specific: Entity Types (Art. 2 DORA)
// ============================================================

/**
 * Financial entity types subject to DORA.
 * Based on Art. 2 Abs. 1 lit. a-u DORA.
 */
export type FinancialEntityType =
  | 'credit-institution' // Kreditinstitute (Art. 2 Abs. 1 lit. a)
  | 'payment-institution' // Zahlungsinstitute (Art. 2 Abs. 1 lit. b)
  | 'e-money-institution' // E-Geld-Institute (Art. 2 Abs. 1 lit. d)
  | 'investment-firm' // Wertpapierfirmen (Art. 2 Abs. 1 lit. e)
  | 'crypto-asset-provider' // Krypto-Asset-Dienstleister (Art. 2 Abs. 1 lit. f)
  | 'csd' // Zentralverwahrer (Art. 2 Abs. 1 lit. g)
  | 'ccp' // Zentrale Gegenparteien (Art. 2 Abs. 1 lit. h)
  | 'trading-venue' // Handelsplätze (Art. 2 Abs. 1 lit. i)
  | 'trade-repository' // Transaktionsregister (Art. 2 Abs. 1 lit. j)
  | 'aifm' // AIFM (Art. 2 Abs. 1 lit. k)
  | 'management-company' // Verwaltungsgesellschaften (Art. 2 Abs. 1 lit. l)
  | 'insurance-undertaking' // Versicherungsunternehmen (Art. 2 Abs. 1 lit. n)
  | 'reinsurance-undertaking' // Rueckversicherungsunternehmen (Art. 2 Abs. 1 lit. o)
  | 'insurance-intermediary' // Versicherungsvermittler (Art. 2 Abs. 1 lit. p)
  | 'iorp' // Einrichtungen der betrieblichen Altersversorgung (Art. 2 Abs. 1 lit. q)
  | 'credit-rating-agency' // Ratingagenturen (Art. 2 Abs. 1 lit. r)
  | 'crowdfunding-provider' // Crowdfunding-Dienstleister (Art. 2 Abs. 1 lit. t)
  | 'securitisation-repository' // Verbriefungsregister (Art. 2 Abs. 1 lit. u)
  | 'ict-third-party-provider' // IKT-Drittdienstleister (Art. 2 Abs. 1 lit. u / Art. 28-44)
  | 'other-financial'; // Sonstige Finanzunternehmen

// ============================================================
// DORA Classification
// ============================================================

export type DoraClassificationCategory =
  | 'direkt-betroffen' // Directly subject to DORA
  | 'indirekt-betroffen' // Indirectly affected (ICT third-party providers)
  | 'nicht-betroffen'; // Not subject to DORA

export interface DoraClassificationInput {
  entityType: FinancialEntityType;
  employeeCount: number;
  isMicroEnterprise: boolean; // < 10 employees and < 2M EUR turnover
  isSmallEnterprise: boolean; // < 50 employees and < 10M EUR turnover
  isIctProvider: boolean; // Provides ICT services to financial entities
  isCriticalIctProvider: boolean; // Designated as critical ICT third-party provider
}

export interface DoraClassificationResult {
  category: DoraClassificationCategory;
  reason: string; // Translation key
  legalReference: string;
  simplifiedRequirements: boolean; // Art. 4 proportionality principle
  proportionalityNote?: string; // Translation key explaining simplified regime
}

// ============================================================
// DORA Question (extends pattern from NIS2)
// ============================================================

export interface DoraLegalReference {
  euArticle: string; // e.g., "Art. 5-6 DORA"
  bsigParagraph: string; // Implementing regulation reference
}

export interface DoraQuestion {
  id: string;
  categoryId: string;
  tier: 'core' | 'advanced';
  titleKey: string;
  tooltipKey: string;
  helpKey: string;
  legalReference: DoraLegalReference;
  maturityDescriptions: {
    level0Key: string;
    level1Key: string;
    level2Key: string;
    level3Key: string;
  };
}

// ============================================================
// DORA Category
// ============================================================

export interface DoraCategory {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  doraArticles: string; // e.g., "Art. 5-16 DORA"
  rtsParagraph: string; // Related RTS/ITS reference
  icon: string;
  questions: DoraQuestion[];
}

// ============================================================
// DORA Recommendation
// ============================================================

export interface DoraRecommendation {
  id: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  effortLevel: 'quick' | 'medium' | 'strategic';
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  rtaReference: string; // RTS/ITS/Guidelines reference
  checklistKey?: string;
}
