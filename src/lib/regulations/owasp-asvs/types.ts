// src/lib/regulations/owasp-asvs/types.ts

/**
 * OWASP ASVS 4.0 Domain Types
 *
 * Legal basis: OWASP Application Security Verification Standard 4.0.3
 * These types model OWASP ASVS-specific structures for application security
 * assessment, verification requirements, scoring, and recommendations.
 *
 * OWASP ASVS 4.0 is organized into 14 verification chapters (V1-V14):
 * - V1: Architecture, Design and Threat Modeling
 * - V2: Authentication
 * - V3: Session Management
 * - V4: Access Control
 * - V5: Validation, Sanitization and Encoding
 * - V6: Stored Cryptography
 * - V7: Error Handling and Logging
 * - V8: Data Protection
 * - V9: Communication
 * - V10: Malicious Code
 * - V11: Business Logic
 * - V12: Files and Resources
 * - V13: API and Web Service
 * - V14: Configuration
 *
 * Three verification levels:
 * - Level 1: Low assurance (penetration testable)
 * - Level 2: Standard (most applications)
 * - Level 3: High assurance (critical applications)
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
// OWASP ASVS-specific Types
// ============================================================

export interface LegalReference {
  asvsChapter: string; // e.g., "ASVS V2: Authentication"
  asvsRequirement: string; // e.g., "V2.1.1, V2.1.2" (specific requirement references)
}

export type AsvsVerificationLevel =
  | 'level1' // Low assurance - opportunistic
  | 'level2' // Standard - most applications
  | 'level3'; // High assurance - critical applications

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
  asvsChapter: string; // Primary ASVS chapter reference (e.g., "V2")
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
  owaspReference: string; // Cross-reference to OWASP Top 10 / CWE
  checklistKey?: string;
}
