/**
 * NIS2 Bußgeld-Kalkulator
 *
 * Calculates potential penalty exposure based on entity classification
 * and annual revenue per §65 BSIG (BGBl. 2025 I Nr. 301).
 *
 * Rahmen nach §65 BSIG:
 * - Besonders wichtige Einrichtungen: bis 10 Mio. € (Abs. 5 S. 1 Nr. 1a).
 *   Erst ab einem Gesamtumsatz von mehr als 500 Mio. € tritt an diese Stelle
 *   eine Obergrenze von 2 % des Gesamtumsatzes (Abs. 6).
 * - Wichtige Einrichtungen: bis 7 Mio. € (Abs. 5 S. 1 Nr. 1b), oberhalb
 *   derselben Umsatzschwelle stattdessen 1,4 % (Abs. 7).
 *
 * Wichtig: Anders als Art. 34 NIS2-RL kennt das BSIG kein "je nachdem, welcher
 * Betrag höher ist". Die prozentuale Grenze gilt ausschliesslich oberhalb der
 * Umsatzschwelle und tritt "abweichend von" den festen Betrag, nicht neben ihn.
 * Rechnerisch fallen beide Lesarten zusammen, weil 2 % bzw. 1,4 % von 500 Mio. €
 * exakt 10 Mio. € bzw. 7 Mio. € ergeben — der Umschlagpunkt von Math.max liegt
 * also genau auf der gesetzlichen Schwelle. Für die Anzeige ist der Unterschied
 * dagegen erheblich: unterhalb der Schwelle existiert keine prozentuale
 * Obergrenze, die man einem KMU nennen dürfte.
 *
 * Legal basis: §65 BSIG (Bußgeldvorschriften)
 */

import type { EntityCategory } from './types';

/** §65 Abs. 6 und 7 BSIG: erst oberhalb dieses Gesamtumsatzes greift eine prozentuale Obergrenze. */
export const REVENUE_CAP_THRESHOLD = 500_000_000;

export interface PenaltyCalculation {
  category: EntityCategory;
  annualRevenue: number;
  maxPenaltyAbsolute: number; // Fixed maximum in EUR
  maxPenaltyRevenueBased: number; // Revenue-based maximum in EUR
  revenuePercentage: number; // Percentage of revenue
  effectiveMaxPenalty: number; // The higher of the two
  /** §65 Abs. 6/7 BSIG — nur oberhalb REVENUE_CAP_THRESHOLD darf die Prozentgrenze genannt werden. */
  revenueCapApplies: boolean;
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
    legalReference: '§65 Abs. 5 S. 1 Nr. 1a, Abs. 6 BSIG',
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
    legalReference: '§65 Abs. 5 S. 1 Nr. 1b, Abs. 7 BSIG',
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
 * Der massgebliche Hoechstbetrag ist der feste Betrag (10 Mio. € / 7 Mio. €);
 * oberhalb von REVENUE_CAP_THRESHOLD tritt die prozentuale Grenze an dessen
 * Stelle. Math.max bildet beides ab, weil der Umschlagpunkt exakt auf der
 * Umsatzschwelle liegt (siehe Kopfkommentar).
 *
 * `revenueCapApplies` entscheidet, ob die prozentuale Grenze ueberhaupt genannt
 * werden darf — unterhalb der Schwelle gibt es sie nach dem BSIG nicht.
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
      revenueCapApplies: false,
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
      revenueCapApplies: false,
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
    revenueCapApplies: annualRevenue > REVENUE_CAP_THRESHOLD,
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
