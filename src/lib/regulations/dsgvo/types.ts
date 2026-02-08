// src/lib/regulations/dsgvo/types.ts

/**
 * DSGVO Domain Types
 *
 * Legal basis: Verordnung (EU) 2016/679 (DSGVO)
 * National implementation: Bundesdatenschutzgesetz (BDSG)
 *
 * Re-exports shared types from the base regulation types and defines
 * DSGVO-specific extensions.
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
// DSGVO-Specific Legal Reference
// ============================================================

/**
 * DSGVO legal references use euArticle for DSGVO articles
 * and bsigParagraph for the corresponding BDSG paragraph.
 */
export interface LegalReference {
  euArticle: string; // e.g., "Art. 35 DSGVO"
  bsigParagraph: string; // e.g., "§35 BDSG" (national law)
}

// ============================================================
// DSGVO Question
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
// DSGVO Category
// ============================================================

export interface Category {
  id: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  dsgvoArticle: string; // Primary DSGVO article(s)
  bdsgParagraph: string; // Corresponding BDSG paragraph(s)
  icon: string;
  questions: Question[];
}

// ============================================================
// DSGVO Recommendation
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
  dsbReference: string; // Reference to DSK (Datenschutzkonferenz) or authority guidance
  checklistKey?: string;
}

// ============================================================
// DSGVO Classification
// ============================================================

export type DsgvoClassification = 'umfassend-pflicht' | 'standard-pflicht' | 'basis-pflicht';

export interface DsgvoClassificationInput {
  employees: number;
  dataSubjects: number; // Number of data subjects processed
  processesSpecialCategories: boolean; // Art. 9 data (health, biometrics, etc.)
  conductsProfiling: boolean; // Automated decision-making / profiling
  internationalTransfers: boolean; // Data transfers outside EU/EEA
  isPublicAuthority: boolean; // Public authority or body
}

export interface DsgvoClassificationResult {
  category: DsgvoClassification;
  reason: string; // Translation key for explanation
  legalReference: string;
  requiresDsb: boolean; // Whether a DPO (Datenschutzbeauftragter) is required
  requiresDsfa: boolean; // Whether a DPIA (Datenschutz-Folgenabschaetzung) is required
}
