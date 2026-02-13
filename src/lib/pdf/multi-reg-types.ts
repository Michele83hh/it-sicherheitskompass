import type { TrafficLight, EffortLevel } from '@/lib/regulations/types';

export interface MultiRegEntry {
  regulationId: string;
  regulationName: string;
  regulationIcon: string;
  percentage: number;
  trafficLight: TrafficLight;
  answeredQuestions: number;
  totalQuestions: number;
  topRisks: Array<{ name: string; percentage: number; trafficLight: TrafficLight }>;
  topRecommendations: Array<{ title: string; priority: 'high' | 'medium' | 'low'; effortLevel: EffortLevel }>;
  costEstimate?: { min: number; max: number };
}

export interface MultiRegSynergy {
  regAName: string;
  regBName: string;
  overlapPercent: number;
  sharedTopics: string[];
}

export interface ConsolidatedRoadmapItem {
  title: string;
  regulations: string[];
  effortLevel: EffortLevel;
  priority: 'high' | 'medium' | 'low';
}

export interface MultiRegPDFPayload {
  locale: 'de' | 'en';
  generatedDate: string;
  entries: MultiRegEntry[];
  synergies: MultiRegSynergy[];
  consolidatedRoadmap: {
    phase1: ConsolidatedRoadmapItem[];
    phase2: ConsolidatedRoadmapItem[];
    phase3: ConsolidatedRoadmapItem[];
  };
  totalCost?: { min: number; max: number };
  averageScore: number;
  messages: Record<string, string>;
}
