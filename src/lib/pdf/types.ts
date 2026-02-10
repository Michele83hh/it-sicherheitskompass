import type { TrafficLight, EffortLevel } from '@/lib/regulations/types';

export interface PDFCompanyProfile {
  sectorName: string;        // Translated sector name
  subsectorName?: string;    // Translated subsector name (if any)
  employees: number;
  annualRevenue: number;
  classification?: string;   // Translated: "Besonders wichtige Einrichtung" etc. (NIS2-specific)
  classificationCategory?: 'besonders-wichtig' | 'wichtig' | 'nicht-betroffen'; // NIS2-specific
  legalReference?: string;   // e.g., "§28 Abs. 1 Nr. 2 BSIG" (NIS2-specific)
}

export interface PDFCategoryResult {
  categoryId: string;
  categoryName: string;      // Translated full name
  shortName: string;         // Translated short name
  percentage: number;
  trafficLight: TrafficLight;
  euArticle: string;         // e.g., "Art. 21(2)(a)"
  bsigParagraph: string;     // e.g., "§30 Abs. 2 Nr. 1 BSIG"
  verdict: string;           // Translated verdict text
}

export interface PDFRecommendation {
  categoryId: string;
  categoryName: string;
  title: string;             // Translated
  description: string;       // Translated
  firstStep: string;         // Translated
  priority: 'high' | 'medium' | 'low';
  effortLevel: EffortLevel;
  legalReference: string;    // Always German original
  bsiReference: string;      // Always German original
}

export interface PDFMessages {
  [key: string]: string;     // Flattened translation keys for PDF
}

export interface PDFPenalty {
  classification: string;
  annualRevenue: number;
  maxPenaltyAbsolute: number;
  maxPenaltyRevenueBased: number;
  revenuePercentage: number;
  effectiveMaxPenalty: number;
  legalReference: string;
}

export interface PDFRoadmapPhase {
  title: string;
  description: string;
  timeframe: string;
  itemCount: number;
  benefitStatement?: string;
  items: Array<{
    title: string;
    urgency: string;
    days?: string;
    costRange?: string;
  }>;
}

export interface PDFCostItem {
  title: string;
  categoryName: string;
  effortLevel: EffortLevel;
  internalDays: { min: number; max: number };
  externalCost: { min: number; max: number };
  toolsCost: { min: number; max: number };
  totalCost: { min: number; max: number };
}

export interface PDFCostSummary {
  companyEmployees: number;
  companyRevenue: number;
  sizeFactor: number;
  tierTotals: {
    basisschutz: { min: number; max: number };
    erweitert: { min: number; max: number };
    nis2Niveau: { min: number; max: number };
  };
  internalDays: { min: number; max: number };
  externalCost: { min: number; max: number };
  toolsCost: { min: number; max: number };
  totalCost: { min: number; max: number };
  items: PDFCostItem[];
}

export interface PDFDsgvoMapping {
  nis2Area: string;
  dsgvoArticle: string;
  overlapPercentage: number;
}

export interface PDFDsgvoOverlap {
  overallPercentage: number;
  mappings: PDFDsgvoMapping[];
}

export interface PDFIso27001Mapping {
  nis2Category: string;
  isoControls: string[];
  alignmentPercentage: number;
}

export interface PDFIso27001 {
  overallAlignment: number;
  mappings: PDFIso27001Mapping[];
}

export interface PDFDinSpecComparison {
  aspect: string;
  dinSpec: string;
  nis2: string;
}

export interface PDFDinSpecArea {
  name: string;
  coverage: string;
}

export interface PDFDinSpec {
  comparisons: PDFDinSpecComparison[];
  areas: PDFDinSpecArea[];
  beyondItems: string[];
}

export interface PDFEvidenceItem {
  text: string;
  type: string;
  besondersWichtigOnly: boolean;
}

export interface PDFEvidenceGroup {
  categoryName: string;
  items: PDFEvidenceItem[];
}

export interface PDFEvidence {
  classification: string;
  groups: PDFEvidenceGroup[];
}

export interface PDFSectorRegulation {
  name: string;
  description: string;
  legalBasis: string;
}

export interface PDFSectorGuidance {
  regulations: PDFSectorRegulation[];
  challenges: string;
  recommendations: string;
}

export interface PDFKritis {
  requirements: Array<{ title: string; description: string }>;
  comparisons: Array<{ aspect: string; standard: string; kritis: string }>;
}

export interface PDFProgressItem {
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface PDFProgress {
  completionPercentage: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  items: PDFProgressItem[];
}

export interface PDFExecutiveSummary {
  percentage: number;
  trafficLight: TrafficLight;
  topRisks: Array<{ name: string; percentage: number; trafficLight: TrafficLight }>;
  quickWins: Array<{ title: string; days: string; cost: string }>;
  basisschutzTotal: { min: number; max: number };
}

export interface PDFPayload {
  locale: 'de' | 'en';
  analysisDepth: 'core' | 'full';
  regulationId?: string;     // e.g., 'nis2', 'dsgvo', 'dora'
  regulationName?: string;   // Translated regulation name for display
  company: PDFCompanyProfile;
  overallScore: {
    percentage: number;
    trafficLight: TrafficLight;
    completionRate: number;
    answeredQuestions: number;
    totalQuestions: number;
  };
  categories: PDFCategoryResult[];
  recommendations: PDFRecommendation[];
  messages: PDFMessages;
  executiveSummary?: PDFExecutiveSummary;
  penalty?: PDFPenalty;
  roadmap?: { phases: PDFRoadmapPhase[] };
  costSummary?: PDFCostSummary;
  dsgvoOverlap?: PDFDsgvoOverlap;
  iso27001?: PDFIso27001;
  isKritis?: boolean;
  dinSpec?: PDFDinSpec;
  evidence?: PDFEvidence;
  sectorGuidance?: PDFSectorGuidance;
  kpiDetails?: PDFKritis;
  progress?: PDFProgress;
}
