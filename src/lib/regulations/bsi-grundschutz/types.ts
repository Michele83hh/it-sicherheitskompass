// src/lib/regulations/bsi-grundschutz/types.ts

/**
 * BSI IT-Grundschutz Domain Types
 *
 * Legal basis: BSI-Standards 200-1, 200-2, 200-3, 200-4
 * Reference: IT-Grundschutz-Kompendium Edition 2023
 *
 * Re-exports shared types from the base regulation types and defines
 * BSI IT-Grundschutz-specific extensions.
 */

// Re-export shared types
export type {
  MaturityLevel,
  TrafficLight,
  EffortLevel,
  Answer,
  CategoryScore,
  OverallScore,
} from '../types';

// ============================================================
// BSI IT-Grundschutz-Specific Types
// ============================================================

/**
 * BSI IT-Grundschutz offers three methods (Vorgehensweisen) for securing
 * information systems, depending on organization size, risk profile, and
 * existing certifications.
 *
 * - 'basis': Basis-Absicherung (BSI-Standard 200-2, Kap. 6)
 *   Quick-start approach for small organizations or initial entry.
 *
 * - 'standard': Standard-Absicherung (BSI-Standard 200-2, Kap. 7)
 *   Comprehensive protection for medium organizations with moderate risk.
 *
 * - 'kern': Kern-Absicherung (BSI-Standard 200-2, Kap. 8)
 *   Focused protection for critical business processes in large orgs.
 */
export type GrundschutzMethode = 'basis' | 'standard' | 'kern';

/**
 * Legal references in BSI IT-Grundschutz context use BSI-Standards
 * and IT-Grundschutz-Kompendium building block references.
 */
export interface LegalReference {
  euArticle: string; // BSI-Standard reference, e.g., "BSI-Standard 200-1 Kap. 7"
  bsigParagraph: string; // IT-Grundschutz-Kompendium reference, e.g., "ISMS.1.A1"
}

// ============================================================
// BSI IT-Grundschutz Question
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
// BSI IT-Grundschutz Category
// ============================================================

export interface Category {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  bsiStandard: string; // Primary BSI-Standard reference
  kompendiumLayer: string; // IT-Grundschutz-Kompendium layer prefix (e.g., "ISMS", "ORP")
  bsiBuildingBlocks: string[]; // Relevant building blocks
  icon: string;
  questions: Question[];
}

// ============================================================
// BSI IT-Grundschutz Recommendation
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
  bsiReference: string; // BSI building block or standard reference
  checklistKey?: string;
}

// ============================================================
// BSI IT-Grundschutz Classification
// ============================================================

export interface GrundschutzClassificationInput {
  employees: number;
  hasIsoCertification: boolean;
  hasExistingIsms: boolean;
  processesCriticalData: boolean; // Processes sensitive / critical business data
  riskProfile: 'low' | 'medium' | 'high';
}

export interface GrundschutzClassificationResult {
  methode: GrundschutzMethode;
  reason: string; // Translation key for explanation
  bsiReference: string; // e.g., "BSI-Standard 200-2 Kap. 6"
}
