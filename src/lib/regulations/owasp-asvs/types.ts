// src/lib/regulations/owasp-asvs/types.ts

/**
 * OWASP ASVS 5.0 Domain Types
 *
 * Legal basis: OWASP Application Security Verification Standard 5.0.0
 * These types model OWASP ASVS-specific structures for application security
 * assessment, verification requirements, scoring, and recommendations.
 *
 * OWASP ASVS 5.0 is organized into 17 verification chapters (V1-V17):
 * - V1: Encoding and Sanitization
 * - V2: Validation and Business Logic
 * - V3: Web Frontend Security
 * - V4: API and Web Service
 * - V5: File Handling
 * - V6: Authentication
 * - V7: Session Management
 * - V8: Authorization
 * - V9: Self-contained Tokens
 * - V10: OAuth and OIDC
 * - V11: Cryptography
 * - V12: Secure Communication
 * - V13: Configuration
 * - V14: Data Protection
 * - V15: Secure Coding and Architecture
 * - V16: Security Logging and Error Handling
 * - V17: WebRTC
 *
 * Three verification levels: L1, L2, L3.
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
