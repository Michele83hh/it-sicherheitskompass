/**
 * KRITIS Classification
 *
 * Determines whether an organization is a KRITIS operator based on
 * BSI-KritisV Schwellenwerte (threshold values).
 *
 * 10 KRITIS sectors (§2 Nr. 4 KRITIS-Dachgesetz, seit 17.03.2026):
 * Energie, Transport und Verkehr, Finanzwesen, Sozialversicherung/
 * Grundsicherung, Gesundheitswesen, Wasser, Ernaehrung, IT und TK,
 * Weltraum, Siedlungsabfallentsorgung.
 *
 * Legal basis: §28 Abs. 1 Nr. 1, §2 Nr. 22/24 BSIG i.V.m.
 * §2 Nr. 3/4 KRITIS-Dachgesetz; Schwellenwerte: BSI-KritisV (§56 Abs. 4 BSIG)
 */

import type {
  KritisSector,
  KritisClassificationInput,
  KritisClassificationResult,
  KritisClassification,
} from './types';

// ============================================================
// KRITIS Sectors with Schwellenwerte
// ============================================================

export const KRITIS_SECTORS: KritisSector[] = [
  {
    id: 'energie',
    nameKey: 'kritis.sectors.energie.name',
    schwellenwertKey: 'kritis.sectors.energie.threshold',
    metric: 'installedCapacityMw',
  },
  {
    id: 'wasser',
    nameKey: 'kritis.sectors.wasser.name',
    schwellenwertKey: 'kritis.sectors.wasser.threshold',
    metric: 'suppliedPersons',
  },
  {
    id: 'ernaehrung',
    nameKey: 'kritis.sectors.ernaehrung.name',
    schwellenwertKey: 'kritis.sectors.ernaehrung.threshold',
    metric: 'processingVolumeTons',
  },
  {
    id: 'it-telekommunikation',
    nameKey: 'kritis.sectors.itTelekommunikation.name',
    schwellenwertKey: 'kritis.sectors.itTelekommunikation.threshold',
    metric: 'contractPartners',
  },
  {
    id: 'gesundheit',
    nameKey: 'kritis.sectors.gesundheit.name',
    schwellenwertKey: 'kritis.sectors.gesundheit.threshold',
    metric: 'inpatientCases',
  },
  {
    id: 'finanzwesen',
    nameKey: 'kritis.sectors.finanzwesen.name',
    schwellenwertKey: 'kritis.sectors.finanzwesen.threshold',
    metric: 'transactions',
  },
  {
    id: 'sozialversicherung',
    nameKey: 'kritis.sectors.sozialversicherung.name',
    schwellenwertKey: 'kritis.sectors.sozialversicherung.threshold',
    metric: 'insuredPersons',
  },
  {
    id: 'transport-verkehr',
    nameKey: 'kritis.sectors.transportVerkehr.name',
    schwellenwertKey: 'kritis.sectors.transportVerkehr.threshold',
    metric: 'passengersOrCargo',
  },
  {
    id: 'weltraum',
    nameKey: 'kritis.sectors.weltraum.name',
    schwellenwertKey: 'kritis.sectors.weltraum.threshold',
    metric: 'groundInfrastructure',
  },
  {
    id: 'entsorgung',
    nameKey: 'kritis.sectors.entsorgung.name',
    schwellenwertKey: 'kritis.sectors.entsorgung.threshold',
    metric: 'connectedPersons',
  },
];

// ============================================================
// Classification Logic
// ============================================================

export function getSectorById(sectorId: string): KritisSector | undefined {
  return KRITIS_SECTORS.find((s) => s.id === sectorId);
}

export function getAllSectors(): KritisSector[] {
  return KRITIS_SECTORS;
}

/**
 * Classify an organization regarding KRITIS status.
 *
 * Categories:
 * - kritis-betreiber: Confirmed KRITIS operator (meets threshold or has BSI designation)
 * - kritis-kandidat: Likely KRITIS candidate (provides essential service but unclear threshold)
 * - nicht-kritis: Not a KRITIS operator
 */
export function classifyKritis(input: KritisClassificationInput): KritisClassificationResult {
  const { sectorId, meetsThreshold, hasKritisDesignation, providesEssentialService } = input;

  // Rule 1: Official designation always overrides (§28 Abs. 1 Nr. 1 BSIG)
  if (hasKritisDesignation) {
    return {
      category: 'kritis-betreiber',
      reason: 'kritis.classification.reasons.bsiDesignation',
      legalReference: '§28 Abs. 1 Nr. 1, §2 Nr. 22 BSIG i.V.m. §2 Nr. 3 KRITIS-Dachgesetz',
    };
  }

  // Rule 2: Sector threshold exceeded (BSI-KritisV)
  const sector = getSectorById(sectorId);
  if (sector && meetsThreshold) {
    return {
      category: 'kritis-betreiber',
      reason: 'kritis.classification.reasons.thresholdExceeded',
      legalReference: '§2 Nr. 22 BSIG, BSI-KritisV (§56 Abs. 4 BSIG)',
    };
  }

  // Rule 3: Essential service provider but threshold unclear
  if (providesEssentialService && sector) {
    return {
      category: 'kritis-kandidat',
      reason: 'kritis.classification.reasons.essentialServiceCandidate',
      legalReference: '§2 Nr. 24 BSIG i.V.m. §2 Nr. 4 KRITIS-Dachgesetz',
    };
  }

  // Rule 4: Sector exists but no qualification
  if (sector) {
    return {
      category: 'nicht-kritis',
      reason: 'kritis.classification.reasons.belowThreshold',
      legalReference: 'BSI-KritisV',
    };
  }

  // Rule 5: Sector not in KRITIS scope
  return {
    category: 'nicht-kritis',
    reason: 'kritis.classification.reasons.sectorNotInScope',
    legalReference: '§2 Nr. 4 KRITIS-Dachgesetz',
  };
}

/**
 * Get the classification severity for display purposes.
 */
export function getClassificationSeverity(
  category: KritisClassification
): 'high' | 'medium' | 'low' {
  switch (category) {
    case 'kritis-betreiber':
      return 'high';
    case 'kritis-kandidat':
      return 'medium';
    case 'nicht-kritis':
      return 'low';
  }
}
