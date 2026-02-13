/**
 * Generic Cost Estimation Engine
 *
 * Derives cost estimates from effortLevel + company size for all regulations.
 * NIS2 retains its detailed per-recommendation cost data as override.
 *
 * Base estimates for ~100-employee German KMU (reference company).
 * Rates: Internal €500/day, External €1,300/day (consistent with NIS2 engine).
 */

import type { EffortLevel, TrafficLight, BaseRecommendation } from '@/lib/regulations/types';
import type { PDFCostSummary, PDFCostItem } from '@/lib/pdf/types';

// ============================================================
// Cost Ranges by Effort Level
// ============================================================

const EFFORT_COST_RANGES: Record<EffortLevel, {
  days: { min: number; max: number };
  external: { min: number; max: number };
  tools: { min: number; max: number };
}> = {
  quick: {
    days: { min: 1, max: 3 },
    external: { min: 0, max: 2000 },
    tools: { min: 0, max: 500 },
  },
  medium: {
    days: { min: 3, max: 8 },
    external: { min: 1500, max: 6000 },
    tools: { min: 0, max: 2000 },
  },
  strategic: {
    days: { min: 8, max: 20 },
    external: { min: 5000, max: 20000 },
    tools: { min: 1000, max: 5000 },
  },
};

const INTERNAL_DAY_RATE = 500;

// ============================================================
// Scaling Factors (reused from NIS2 engine)
// ============================================================

export function getSizeFactor(employees: number): number {
  if (employees < 50) return 0.6;
  if (employees < 100) return 0.8;
  if (employees <= 250) return 1.0;
  if (employees <= 500) return 1.4;
  return 1.8;
}

export function getMaturityFactor(trafficLight: TrafficLight): number {
  switch (trafficLight) {
    case 'red': return 1.0;
    case 'yellow': return 0.6;
    case 'green': return 0.25;
  }
}

// ============================================================
// Generic Cost Computation
// ============================================================

export interface GenericCostEstimate {
  internalDays: { min: number; max: number };
  externalCost: { min: number; max: number };
  toolsCost: { min: number; max: number };
  totalCost: { min: number; max: number };
}

/**
 * Compute cost estimate for a single recommendation based on its effortLevel.
 */
export function estimateRecommendationCost(
  effortLevel: EffortLevel,
  sizeFactor: number,
  maturityFactor: number,
): GenericCostEstimate {
  const base = EFFORT_COST_RANGES[effortLevel];
  const combined = Math.round(sizeFactor * maturityFactor * 100) / 100;

  const days = {
    min: Math.max(1, Math.round(base.days.min * combined)),
    max: Math.max(1, Math.round(base.days.max * combined)),
  };
  const ext = {
    min: Math.round(base.external.min * combined),
    max: Math.round(base.external.max * combined),
  };
  const tools = {
    min: Math.round(base.tools.min * combined),
    max: Math.round(base.tools.max * combined),
  };
  const total = {
    min: days.min * INTERNAL_DAY_RATE + ext.min + tools.min,
    max: days.max * INTERNAL_DAY_RATE + ext.max + tools.max,
  };

  return { internalDays: days, externalCost: ext, toolsCost: tools, totalCost: total };
}

/**
 * Compute generic costs for all recommendations of a regulation.
 * Returns a PDFCostSummary compatible with the existing PDF pipeline.
 */
export function computeGenericCosts(
  recommendations: BaseRecommendation[],
  categoryTrafficLightMap: Map<string, TrafficLight>,
  employees: number,
  tAll: (key: string) => string,
): PDFCostSummary {
  const sizeFactor = getSizeFactor(employees || 100);

  let internalMin = 0, internalMax = 0;
  let externalMin = 0, externalMax = 0;
  let toolsMin = 0, toolsMax = 0;
  let totalMin = 0, totalMax = 0;
  let tierQuickMin = 0, tierQuickMax = 0;
  let tierMediumMin = 0, tierMediumMax = 0;

  const items: PDFCostItem[] = [];

  for (const rec of recommendations) {
    const trafficLight = categoryTrafficLightMap.get(rec.categoryId) ?? 'red';
    const maturityFactor = getMaturityFactor(trafficLight);
    const est = estimateRecommendationCost(rec.effortLevel, sizeFactor, maturityFactor);

    internalMin += est.internalDays.min;
    internalMax += est.internalDays.max;
    externalMin += est.externalCost.min;
    externalMax += est.externalCost.max;
    toolsMin += est.toolsCost.min;
    toolsMax += est.toolsCost.max;
    totalMin += est.totalCost.min;
    totalMax += est.totalCost.max;

    if (rec.effortLevel === 'quick') {
      tierQuickMin += est.totalCost.min;
      tierQuickMax += est.totalCost.max;
    } else if (rec.effortLevel === 'medium') {
      tierMediumMin += est.totalCost.min;
      tierMediumMax += est.totalCost.max;
    }

    let title: string;
    try {
      title = tAll(rec.titleKey);
    } catch {
      title = rec.id;
    }

    items.push({
      title,
      categoryName: '',
      effortLevel: rec.effortLevel,
      internalDays: est.internalDays,
      externalCost: est.externalCost,
      toolsCost: est.toolsCost,
      totalCost: est.totalCost,
    });
  }

  return {
    companyEmployees: employees || 100,
    companyRevenue: 0,
    sizeFactor,
    tierTotals: {
      basisschutz: { min: tierQuickMin, max: tierQuickMax },
      erweitert: { min: tierQuickMin + tierMediumMin, max: tierQuickMax + tierMediumMax },
      nis2Niveau: { min: totalMin, max: totalMax },
    },
    internalDays: { min: internalMin, max: internalMax },
    externalCost: { min: externalMin, max: externalMax },
    toolsCost: { min: toolsMin, max: toolsMax },
    totalCost: { min: totalMin, max: totalMax },
    items,
  };
}

/**
 * Format a cost range for display.
 */
export function formatCostRange(
  range: { min: number; max: number },
  locale: 'de' | 'en' = 'de',
): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);
  return `${fmt(range.min)} – ${fmt(range.max)}`;
}
