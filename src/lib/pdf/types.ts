import type { TrafficLight, EffortLevel } from '@/lib/nis2/types';

export interface PDFCompanyProfile {
  sectorName: string;        // Translated sector name
  subsectorName?: string;    // Translated subsector name (if any)
  employees: number;
  annualRevenue: number;
  classification: string;    // Translated: "Besonders wichtige Einrichtung" etc.
  classificationCategory: 'besonders-wichtig' | 'wichtig' | 'nicht-betroffen';
  legalReference: string;    // e.g., "§28 Abs. 1 Nr. 2 BSIG"
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
  items: Array<{
    title: string;
    urgency: string;
  }>;
}

export interface PDFCostSummary {
  internalDays: { min: number; max: number };
  externalCost: { min: number; max: number };
  toolsCost: { min: number; max: number };
  totalCost: { min: number; max: number };
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

export interface PDFPayload {
  locale: 'de' | 'en';
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
  penalty?: PDFPenalty;
  roadmap?: { phases: PDFRoadmapPhase[] };
  costSummary?: PDFCostSummary;
  dsgvoOverlap?: PDFDsgvoOverlap;
  iso27001?: PDFIso27001;
  isKritis?: boolean;
}
