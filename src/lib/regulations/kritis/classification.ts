/**
 * KRITIS Classification
 *
 * Determines whether an organization is a KRITIS operator based on
 * BSI-KritisV Schwellenwerte (threshold values).
 *
 * 8 KRITIS sectors with specific thresholds:
 * - Energy: >500,000 connected customers
 * - Water: >500,000 supplied persons
 * - Food: >434,500 t/year processed volume
 * - IT/Telecom: >100,000 subscribers
 * - Health: >30,000 full inpatient cases/year
 * - Finance: >15 million transactions/year
 * - Transport: >125 million passengers/year or >17.5 million t cargo/year
 * - Waste: >500,000 connected persons
 *
 * Legal basis: §2 Abs. 10 BSI-Gesetz, BSI-KritisV
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
    schwellenwert: '>500.000 angeschlossene Kunden',
    schwellenwertKey: 'kritis.sectors.energie.threshold',
    metric: 'connectedCustomers',
  },
  {
    id: 'wasser',
    nameKey: 'kritis.sectors.wasser.name',
    schwellenwert: '>500.000 versorgte Personen',
    schwellenwertKey: 'kritis.sectors.wasser.threshold',
    metric: 'suppliedPersons',
  },
  {
    id: 'ernaehrung',
    nameKey: 'kritis.sectors.ernaehrung.name',
    schwellenwert: '>434.500 t/Jahr Verarbeitungsvolumen',
    schwellenwertKey: 'kritis.sectors.ernaehrung.threshold',
    metric: 'processingVolumeTons',
  },
  {
    id: 'it-telekommunikation',
    nameKey: 'kritis.sectors.itTelekommunikation.name',
    schwellenwert: '>100.000 Teilnehmer',
    schwellenwertKey: 'kritis.sectors.itTelekommunikation.threshold',
    metric: 'subscribers',
  },
  {
    id: 'gesundheit',
    nameKey: 'kritis.sectors.gesundheit.name',
    schwellenwert: '>30.000 vollstationaere Faelle/Jahr',
    schwellenwertKey: 'kritis.sectors.gesundheit.threshold',
    metric: 'inpatientCases',
  },
  {
    id: 'finanz-versicherungswesen',
    nameKey: 'kritis.sectors.finanzVersicherungswesen.name',
    schwellenwert: '>15 Mio. Transaktionen/Jahr',
    schwellenwertKey: 'kritis.sectors.finanzVersicherungswesen.threshold',
    metric: 'transactions',
  },
  {
    id: 'transport-verkehr',
    nameKey: 'kritis.sectors.transportVerkehr.name',
    schwellenwert: '>125 Mio. Passagiere/Jahr oder >17,5 Mio. t Fracht/Jahr',
    schwellenwertKey: 'kritis.sectors.transportVerkehr.threshold',
    metric: 'passengersOrCargo',
  },
  {
    id: 'entsorgung',
    nameKey: 'kritis.sectors.entsorgung.name',
    schwellenwert: '>500.000 angeschlossene Personen',
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

  // Rule 1: Official BSI designation always overrides (§2 Abs. 10 BSIG)
  if (hasKritisDesignation) {
    return {
      category: 'kritis-betreiber',
      reason: 'kritis.classification.reasons.bsiDesignation',
      legalReference: '§2 Abs. 10 BSI-Gesetz',
    };
  }

  // Rule 2: Sector threshold exceeded (BSI-KritisV)
  const sector = getSectorById(sectorId);
  if (sector && meetsThreshold) {
    return {
      category: 'kritis-betreiber',
      reason: 'kritis.classification.reasons.thresholdExceeded',
      legalReference: '§2 Abs. 10 BSI-Gesetz, BSI-KritisV',
    };
  }

  // Rule 3: Essential service provider but threshold unclear
  if (providesEssentialService && sector) {
    return {
      category: 'kritis-kandidat',
      reason: 'kritis.classification.reasons.essentialServiceCandidate',
      legalReference: '§2 Abs. 10 BSI-Gesetz',
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
    legalReference: '§2 Abs. 10 BSI-Gesetz',
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
