/**
 * NIS2 Umsetzungs-Roadmap Generator
 *
 * Generates a personalized implementation timeline based on gap analysis results.
 * Prioritizes by: (1) traffic light severity, (2) effort level, (3) priority.
 *
 * Phases:
 * - Phase 1: Quick Wins (0-3 months) — red categories with quick effort
 * - Phase 2: Core Implementation (3-6 months) — remaining red + yellow medium
 * - Phase 3: Strategic Measures (6-12 months) — strategic items + optimization
 */

import type { CategoryScore, TrafficLight, EffortLevel } from './types';
import type { BaseRecommendation } from '../types';

export interface RoadmapPhase {
  id: 'quick-wins' | 'core' | 'strategic';
  nameKey: string;
  timeframeKey: string;
  descriptionKey: string;
  months: string; // e.g., "0-3"
  items: RoadmapItem[];
}

export interface RoadmapItem {
  recommendation: BaseRecommendation;
  categoryScore: CategoryScore;
  urgency: 'critical' | 'high' | 'medium' | 'low';
}

/**
 * Maps traffic light + effort to roadmap phase
 */
function getPhaseForItem(
  trafficLight: TrafficLight,
  effortLevel: EffortLevel
): 'quick-wins' | 'core' | 'strategic' {
  // Strategic effort always → Phase 3 (regardless of traffic light)
  if (effortLevel === 'strategic') return 'strategic';
  if (trafficLight === 'red' && effortLevel === 'quick') return 'quick-wins';
  if (trafficLight === 'red') return 'core';
  if (trafficLight === 'yellow' && effortLevel === 'quick') return 'quick-wins';
  if (trafficLight === 'yellow' && effortLevel === 'medium') return 'core';
  return 'core';
}

/**
 * Maps traffic light + priority to urgency level
 */
function getUrgency(
  trafficLight: TrafficLight,
  priority: 'high' | 'medium' | 'low'
): 'critical' | 'high' | 'medium' | 'low' {
  if (trafficLight === 'red' && priority === 'high') return 'critical';
  if (trafficLight === 'red') return 'high';
  if (trafficLight === 'yellow' && priority === 'high') return 'high';
  if (trafficLight === 'yellow') return 'medium';
  return 'low';
}

/**
 * Urgency sort order (critical first)
 */
const URGENCY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

/**
 * Generate a personalized implementation roadmap from gap analysis results.
 *
 * @param categoryScores - Scored categories from gap analysis
 * @param recommendations - All available recommendations
 * @returns Three roadmap phases with sorted items
 */
export function generateRoadmap(
  categoryScores: CategoryScore[],
  recommendations: BaseRecommendation[]
): RoadmapPhase[] {
  const scoreMap = new Map(categoryScores.map((cs) => [cs.categoryId, cs]));

  const phases: Record<string, RoadmapItem[]> = {
    'quick-wins': [],
    core: [],
    strategic: [],
  };

  for (const rec of recommendations) {
    const categoryScore = scoreMap.get(rec.categoryId);
    if (!categoryScore) continue;

    // Skip green categories (already well-implemented), but keep strategic items
    if (categoryScore.trafficLight === 'green' && rec.priority !== 'high' && rec.effortLevel !== 'strategic') continue;

    const phase = getPhaseForItem(categoryScore.trafficLight, rec.effortLevel);
    const urgency = getUrgency(categoryScore.trafficLight, rec.priority);

    phases[phase].push({
      recommendation: rec,
      categoryScore,
      urgency,
    });
  }

  // Sort each phase by urgency, then by category score (worst first)
  for (const key of Object.keys(phases)) {
    phases[key].sort((a, b) => {
      const urgencyDiff = URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;
      return a.categoryScore.percentage - b.categoryScore.percentage;
    });
  }

  return [
    {
      id: 'quick-wins',
      nameKey: 'roadmap.phases.quickWins.name',
      timeframeKey: 'roadmap.phases.quickWins.timeframe',
      descriptionKey: 'roadmap.phases.quickWins.description',
      months: '0-3',
      items: phases['quick-wins'],
    },
    {
      id: 'core',
      nameKey: 'roadmap.phases.core.name',
      timeframeKey: 'roadmap.phases.core.timeframe',
      descriptionKey: 'roadmap.phases.core.description',
      months: '3-6',
      items: phases.core,
    },
    {
      id: 'strategic',
      nameKey: 'roadmap.phases.strategic.name',
      timeframeKey: 'roadmap.phases.strategic.timeframe',
      descriptionKey: 'roadmap.phases.strategic.description',
      months: '6-12',
      items: phases.strategic,
    },
  ];
}

/**
 * Calculate summary statistics for a roadmap
 */
export function getRoadmapSummary(phases: RoadmapPhase[]) {
  const totalItems = phases.reduce((sum, p) => sum + p.items.length, 0);
  const criticalItems = phases.reduce(
    (sum, p) => sum + p.items.filter((i) => i.urgency === 'critical').length,
    0
  );
  const quickWinCount = phases[0]?.items.length ?? 0;

  return {
    totalItems,
    criticalItems,
    quickWinCount,
    phaseBreakdown: phases.map((p) => ({
      id: p.id,
      count: p.items.length,
    })),
  };
}
