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
}
