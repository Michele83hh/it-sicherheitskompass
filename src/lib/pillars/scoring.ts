// src/lib/pillars/scoring.ts

/**
 * Pillar Score Calculation
 *
 * Computes a score for each of the 8 security pillars by averaging
 * the assessment scores of the regulations that feed into each pillar.
 */

import type { Pillar } from './types';
import type { RegulationId, Answer } from '@/lib/regulations/types';
import type { TrafficLight } from '@/lib/scoring/types';
import { getRegulation } from '@/lib/regulations/registry';
import { calculateOverallScore, getTrafficLight } from '@/lib/scoring/engine';

const STORAGE_KEYS: Record<RegulationId, string> = {
  nis2: 'nis2-gap-analysis-storage',
  dsgvo: 'dsgvo-assessment-storage',
  kritis: 'kritis-assessment-storage',
  dora: 'dora-assessment-storage',
  tisax: 'tisax-assessment-storage',
  cra: 'cra-assessment-storage',
  'bsi-grundschutz': 'bsi-grundschutz-assessment-storage',
  iso27001: 'iso27001-assessment-storage',
  soc2: 'soc2-assessment-storage',
  'pci-dss': 'pci-dss-assessment-storage',
  c5: 'c5-assessment-storage',
};

export interface PillarScore {
  pillarId: string;
  score: number | null;
  trafficLight: TrafficLight | null;
  regulationsWithData: number;
  regulationsTotal: number;
}

interface RegScoreCache {
  [regId: string]: number | null;
}

function getRegulationScore(regId: RegulationId): number | null {
  const storageKey = STORAGE_KEYS[regId];
  if (!storageKey) return null;

  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;

    const data = JSON.parse(raw);
    const state = data.state || data;
    const answers: Answer[] = state.answers || [];

    if (answers.length === 0) return null;

    const config = getRegulation(regId);
    if (!config) return null;

    const categories = config.categories.map((cat) => ({
      categoryId: cat.id,
      totalQuestions: cat.questions.length,
    }));

    const overall = calculateOverallScore(answers, categories);
    return overall.percentage;
  } catch {
    return null;
  }
}

export function calculatePillarScores(pillars: Pillar[]): PillarScore[] {
  // Build cache of regulation scores (each reg scored once)
  const cache: RegScoreCache = {};

  return pillars.map((pillar) => {
    // Collect unique regulation IDs from all components
    const regIds = new Set<string>();
    pillar.components.forEach((comp) => {
      comp.regulationIds.forEach((id) => regIds.add(id));
    });

    const regIdArray = Array.from(regIds) as RegulationId[];
    let withData = 0;
    let scoreSum = 0;

    for (const regId of regIdArray) {
      if (!(regId in cache)) {
        cache[regId] = getRegulationScore(regId);
      }
      const s = cache[regId];
      if (s !== null) {
        withData++;
        scoreSum += s;
      }
    }

    const score = withData > 0 ? Math.round((scoreSum / withData) * 10) / 10 : null;

    return {
      pillarId: pillar.id,
      score,
      trafficLight: score !== null ? getTrafficLight(score) : null,
      regulationsWithData: withData,
      regulationsTotal: regIdArray.length,
    };
  });
}
