// src/lib/regulations/c5/types.ts

/**
 * BSI C5 (Cloud Computing Compliance Criteria Catalogue) Domain Types
 *
 * Legal basis: BSI C5:2020 (Cloud Computing Compliance Criteria Catalogue)
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
  euArticle: string; // e.g., "C5:2020 OIS-01"
  bsigParagraph: string; // e.g., "BSI C5:2020 Kap. 4.1"
}

/**
 * C5:2020 requirement domains (17 total):
 * OIS - Organisation der Informationssicherheit
 * SP  - Sicherheitsrichtlinien
 * HR  - Personal
 * AM  - Asset-Management
 * PS  - Physische Sicherheit
 * OPS - Regelungen des IT-Betriebs
 * IDM - Identitaets- und Berechtigungsmanagement
 * COS - Kommunikationssicherheit
 * KRY - Kryptografie und Schluesselmanagement
 * SIM - Sicherheitsvorfallmanagement
 * BCM - Business Continuity Management
 * COM - Compliance
 * INQ - Beschaffung und Lieferantenmanagement
 * DEV - Entwicklung
 * SSO - Mandantentrennung / Secure Separation
 * PI  - Pruefung und Informationsaustausch
 * MOB - Mobile Device Management
 */
export type C5Domain =
  | 'OIS'
  | 'SP'
  | 'HR'
  | 'AM'
  | 'PS'
  | 'OPS'
  | 'IDM'
  | 'COS'
  | 'KRY'
  | 'SIM'
  | 'BCM'
  | 'COM'
  | 'INQ'
  | 'DEV'
  | 'SSO'
  | 'PI'
  | 'MOB';

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
