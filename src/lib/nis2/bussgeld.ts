/**
 * NIS2 Bußgeld-Kalkulator
 *
 * Calculates potential penalty exposure based on entity classification
 * and annual revenue per §65 BSIG (BGBl. 2025 I Nr. 301).
 *
 * Penalty framework:
 * - Besonders wichtige Einrichtungen: max(€10M, 2% of global annual revenue)
 * - Wichtige Einrichtungen: max(€7M, 1.4% of global annual revenue)
 *
 * Legal basis: §65 BSIG (Bußgeldvorschriften)
 */

import type { EntityCategory } from './types';

export interface PenaltyCalculation {
  category: EntityCategory;
  annualRevenue: number;
  maxPenaltyAbsolute: number; // Fixed maximum in EUR
  maxPenaltyRevenueBased: number; // Revenue-based maximum in EUR
  revenuePercentage: number; // Percentage of revenue
  effectiveMaxPenalty: number; // The higher of the two
  legalReference: string;
}

export interface PenaltyTier {
  category: EntityCategory;
  absoluteMax: number;
  revenuePercentage: number;
  legalReference: string;
  violations: string[]; // Key violations that trigger this tier
}

export const PENALTY_TIERS: PenaltyTier[] = [
  {
    category: 'besonders-wichtig',
    absoluteMax: 10_000_000,
    revenuePercentage: 2,
    legalReference: '§65 Abs. 2 BSIG',
    violations: [
      'penaltyViolations.noRiskManagement',
      'penaltyViolations.noIncidentReporting',
      'penaltyViolations.noRegistration',
      'penaltyViolations.obstructingBsi',
    ],
  },
  {
    category: 'wichtig',
    absoluteMax: 7_000_000,
    revenuePercentage: 1.4,
    legalReference: '§65 Abs. 3 BSIG',
    violations: [
      'penaltyViolations.noRiskManagement',
      'penaltyViolations.noIncidentReporting',
      'penaltyViolations.noRegistration',
      'penaltyViolations.obstructingBsi',
    ],
  },
];

/**
 * Calculate maximum potential penalty based on classification and revenue.
 *
 * The effective penalty is the HIGHER of:
 * - Fixed absolute maximum (€10M or €7M)
 * - Revenue-based maximum (2% or 1.4% of global annual revenue)
 *
 * For non-affected entities, returns zero penalties.
 */
export function calculatePenalty(
  category: EntityCategory,
  annualRevenue: number
): PenaltyCalculation {
  if (category === 'nicht-betroffen') {
    return {
      category,
      annualRevenue,
      maxPenaltyAbsolute: 0,
      maxPenaltyRevenueBased: 0,
      revenuePercentage: 0,
      effectiveMaxPenalty: 0,
      legalReference: '',
    };
  }

  const tier = PENALTY_TIERS.find((t) => t.category === category);
  if (!tier) {
    return {
      category,
      annualRevenue,
      maxPenaltyAbsolute: 0,
      maxPenaltyRevenueBased: 0,
      revenuePercentage: 0,
      effectiveMaxPenalty: 0,
      legalReference: '',
    };
  }

  const revenueBased = (annualRevenue * tier.revenuePercentage) / 100;
  const effectiveMax = Math.max(tier.absoluteMax, revenueBased);

  return {
    category,
    annualRevenue,
    maxPenaltyAbsolute: tier.absoluteMax,
    maxPenaltyRevenueBased: Math.round(revenueBased),
    revenuePercentage: tier.revenuePercentage,
    effectiveMaxPenalty: Math.round(effectiveMax),
    legalReference: tier.legalReference,
  };
}

/**
 * Format EUR amount with German locale (e.g., "10.000.000 €")
 */
export function formatEur(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}
