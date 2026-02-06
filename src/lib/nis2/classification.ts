import type { ClassificationInput, ClassificationResult, ClassificationThresholds } from './types';
import { getSectorById } from './sectors';

/**
 * NIS2 Entity Classification
 *
 * Implements §28 BSIG thresholds for determining entity category:
 * - besonders-wichtig (particularly important entities)
 * - wichtig (important entities)
 * - nicht-betroffen (not affected)
 *
 * Legal basis: NIS2UmsG (BGBl. 2025 I Nr. 301), §28 BSIG
 */

export const THRESHOLDS: ClassificationThresholds = {
  besondersWichtig: {
    // Always qualified as "besonders wichtig" regardless of size (§28 Abs. 1 Nr. 2)
    alwaysQualified: ['dns', 'tld', 'tsp'],
    // Telecommunications special threshold (§28 Abs. 1 Nr. 3)
    telecom: { employees: 50, revenue: 10_000_000, balanceSheet: 10_000_000 },
    // Anlage 1 sectors threshold (§28 Abs. 1 Nr. 4)
    anlage1: { employees: 250, revenue: 50_000_000, balanceSheet: 43_000_000 },
  },
  wichtig: {
    // Standard threshold for all sectors (§28 Abs. 2)
    standard: { employees: 50, revenue: 10_000_000, balanceSheet: 10_000_000 },
  },
};

export function classifyEntity(input: ClassificationInput): ClassificationResult {
  const { sectorId, subsectorId, employees, annualRevenue, balanceSheet, isKritis } = input;

  // Rule 1: KRITIS operators are always "besonders wichtig" (§28 Abs. 1 Nr. 1)
  if (isKritis) {
    return {
      category: 'besonders-wichtig',
      reason: 'classification.reasons.kritis',
      legalReference: '§28 Abs. 1 Nr. 1 BSIG',
    };
  }

  // Rule 2: Always qualified subsectors (qTSP, DNS, TLD) (§28 Abs. 1 Nr. 2)
  if (subsectorId && THRESHOLDS.besondersWichtig.alwaysQualified.includes(subsectorId)) {
    return {
      category: 'besonders-wichtig',
      reason: 'classification.reasons.alwaysQualified',
      legalReference: '§28 Abs. 1 Nr. 2 BSIG',
    };
  }

  // Get sector to determine Anlage
  const sector = getSectorById(sectorId);
  if (!sector) {
    return {
      category: 'nicht-betroffen',
      reason: 'classification.reasons.sectorNotRegulated',
      legalReference: 'BSIG Anlagen 1 und 2',
    };
  }

  // Rule 3: Anlage 1 large entities (§28 Abs. 1 Nr. 4)
  if (sector.anlage === 1) {
    const t = THRESHOLDS.besondersWichtig.anlage1;
    if (employees >= t.employees || (annualRevenue > t.revenue && balanceSheet > t.balanceSheet)) {
      return {
        category: 'besonders-wichtig',
        reason: 'classification.reasons.anlage1LargeEntity',
        legalReference: '§28 Abs. 1 Nr. 4 BSIG',
      };
    }
  }

  // Rule 4: Standard threshold for "wichtig" (§28 Abs. 2)
  const t = THRESHOLDS.wichtig.standard;
  if (employees >= t.employees || (annualRevenue > t.revenue && balanceSheet > t.balanceSheet)) {
    return {
      category: 'wichtig',
      reason: 'classification.reasons.standardThreshold',
      legalReference: '§28 Abs. 2 BSIG',
    };
  }

  // Below all thresholds
  return {
    category: 'nicht-betroffen',
    reason: 'classification.reasons.belowThreshold',
    legalReference: '§28 BSIG',
  };
}
