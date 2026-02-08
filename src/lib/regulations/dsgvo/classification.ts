/**
 * DSGVO Classification Logic
 *
 * Determines the level of DSGVO compliance requirements based on
 * organizational characteristics. Unlike NIS2, all organizations
 * processing personal data are subject to DSGVO - the classification
 * determines the extent of obligations.
 *
 * Categories:
 * - umfassend-pflicht: Full compliance requirements (large scale processing,
 *   special categories, profiling, public authorities)
 * - standard-pflicht: Standard compliance requirements (medium-sized,
 *   regular personal data processing)
 * - basis-pflicht: Basic compliance requirements (small organizations,
 *   limited data processing)
 *
 * Legal basis:
 * - Art. 9 DSGVO (Special categories of personal data)
 * - Art. 35 DSGVO (Data Protection Impact Assessment)
 * - Art. 37 DSGVO (Designation of data protection officer)
 * - §38 BDSG (DPO requirement: 20+ employees in automated processing)
 */

import type {
  DsgvoClassificationInput,
  DsgvoClassificationResult,
  DsgvoClassification,
} from './types';

// ============================================================
// Thresholds
// ============================================================

export const THRESHOLDS = {
  /**
   * Umfassend-Pflicht: Full obligations
   * Large-scale processing, special data, or public authority
   */
  umfassendPflicht: {
    employees: 250, // Large enterprise
    dataSubjects: 100_000, // Large-scale processing (ErwGr. 91)
  },
  /**
   * Standard-Pflicht: Standard obligations
   * Medium processing, DSB required (§38 BDSG: 20+ employees)
   */
  standardPflicht: {
    employees: 20, // §38 Abs. 1 S. 1 BDSG: DSB ab 20 Personen
    dataSubjects: 5_000, // Notable data volume
  },
  /**
   * Basis-Pflicht: Basic obligations
   * Below standard thresholds, but DSGVO still applies
   */
} as const;

// ============================================================
// Classification Logic
// ============================================================

export function classifyDsgvo(input: DsgvoClassificationInput): DsgvoClassificationResult {
  const {
    employees,
    dataSubjects,
    processesSpecialCategories,
    conductsProfiling,
    internationalTransfers,
    isPublicAuthority,
  } = input;

  // Rule 1: Public authorities always have comprehensive obligations (Art. 37 Abs. 1 lit. a)
  if (isPublicAuthority) {
    return {
      category: 'umfassend-pflicht',
      reason: 'dsgvo.classification.reasons.publicAuthority',
      legalReference: 'Art. 37 Abs. 1 lit. a DSGVO',
      requiresDsb: true,
      requiresDsfa: true,
    };
  }

  // Rule 2: Processing special categories at scale (Art. 9, Art. 35 Abs. 3 lit. b)
  if (processesSpecialCategories && dataSubjects >= THRESHOLDS.standardPflicht.dataSubjects) {
    return {
      category: 'umfassend-pflicht',
      reason: 'dsgvo.classification.reasons.specialCategoriesLargeScale',
      legalReference: 'Art. 9, Art. 35 Abs. 3 lit. b DSGVO',
      requiresDsb: true,
      requiresDsfa: true,
    };
  }

  // Rule 3: Systematic profiling with legal/significant effects (Art. 22, Art. 35 Abs. 3 lit. a)
  if (conductsProfiling) {
    return {
      category: 'umfassend-pflicht',
      reason: 'dsgvo.classification.reasons.profiling',
      legalReference: 'Art. 22, Art. 35 Abs. 3 lit. a DSGVO',
      requiresDsb: true,
      requiresDsfa: true,
    };
  }

  // Rule 4: Large-scale processing (ErwGr. 91)
  if (
    employees >= THRESHOLDS.umfassendPflicht.employees ||
    dataSubjects >= THRESHOLDS.umfassendPflicht.dataSubjects
  ) {
    return {
      category: 'umfassend-pflicht',
      reason: 'dsgvo.classification.reasons.largeScaleProcessing',
      legalReference: 'ErwGr. 91 DSGVO, Art. 37 Abs. 1 lit. b DSGVO',
      requiresDsb: true,
      requiresDsfa: dataSubjects >= THRESHOLDS.umfassendPflicht.dataSubjects,
    };
  }

  // Rule 5: Standard obligations (DSB required, notable processing)
  const requiresDsb = employees >= THRESHOLDS.standardPflicht.employees;
  if (
    employees >= THRESHOLDS.standardPflicht.employees ||
    dataSubjects >= THRESHOLDS.standardPflicht.dataSubjects ||
    internationalTransfers ||
    processesSpecialCategories
  ) {
    return {
      category: 'standard-pflicht',
      reason: 'dsgvo.classification.reasons.standardProcessing',
      legalReference: '§38 Abs. 1 BDSG, Art. 30 Abs. 5 DSGVO',
      requiresDsb,
      requiresDsfa: processesSpecialCategories || false,
    };
  }

  // Rule 6: Basic obligations (DSGVO still applies to all)
  return {
    category: 'basis-pflicht',
    reason: 'dsgvo.classification.reasons.basicProcessing',
    legalReference: 'Art. 2 Abs. 1 DSGVO',
    requiresDsb: false,
    requiresDsfa: false,
  };
}

/**
 * Get the severity order for display purposes.
 * Lower number = more obligations.
 */
export function getClassificationSeverity(category: DsgvoClassification): number {
  switch (category) {
    case 'umfassend-pflicht':
      return 1;
    case 'standard-pflicht':
      return 2;
    case 'basis-pflicht':
      return 3;
  }
}
