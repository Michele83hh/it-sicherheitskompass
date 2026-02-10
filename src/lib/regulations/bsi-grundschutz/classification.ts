/**
 * BSI IT-Grundschutz Method Recommendation (Classification)
 *
 * Recommends the appropriate Grundschutz method (Vorgehensweise) based on
 * organization size, existing certifications, and risk profile.
 *
 * This is NOT a legal classification (unlike NIS2 §28 BSIG), but guidance
 * for choosing the right BSI-Standard 200-2 approach:
 *
 * - Basis-Absicherung (BSI-Standard 200-2 Kap. 6):
 *   Quick-start for small companies or initial entry into IT-Grundschutz.
 *
 * - Standard-Absicherung (BSI-Standard 200-2 Kap. 7):
 *   Comprehensive protection for medium organizations, moderate risk.
 *
 * - Kern-Absicherung (BSI-Standard 200-2 Kap. 8):
 *   Focused protection for large companies or critical business processes.
 *
 * Reference: BSI-Standard 200-2 "IT-Grundschutz-Methodik"
 */

import type {
  GrundschutzMethode,
  GrundschutzClassificationInput,
  GrundschutzClassificationResult,
} from './types';

/**
 * Determine the recommended BSI IT-Grundschutz method based on
 * company characteristics and risk profile.
 *
 * Decision logic:
 * 1. Kern-Absicherung: Large companies (250+ employees), high risk,
 *    or organizations processing critical data that already have ISMS experience.
 * 2. Standard-Absicherung: Medium companies (50-249), moderate risk,
 *    or companies with existing ISO certifications seeking Grundschutz alignment.
 * 3. Basis-Absicherung: Small companies (<50), low risk,
 *    or organizations starting their IT security journey.
 */
export function classifyGrundschutzMethode(
  input: GrundschutzClassificationInput
): GrundschutzClassificationResult {
  const { employees, hasIsoCertification, hasExistingIsms, processesCriticalData, riskProfile } =
    input;

  // Rule 1: Kern-Absicherung for large companies with high risk or critical data
  if (
    (employees >= 250 && riskProfile === 'high') ||
    (employees >= 250 && processesCriticalData && hasExistingIsms) ||
    (riskProfile === 'high' && processesCriticalData && hasExistingIsms)
  ) {
    return {
      methode: 'kern',
      reason: 'bsiGrundschutz.classification.reasons.kern',
      bsiReference: 'BSI-Standard 200-2 Kap. 8',
    };
  }

  // Rule 2: Standard-Absicherung for medium companies or moderate risk
  if (
    (employees >= 50 && employees < 250) ||
    (employees >= 50 && riskProfile === 'medium') ||
    hasIsoCertification ||
    (hasExistingIsms && riskProfile !== 'low') ||
    (riskProfile === 'high' && employees >= 50)
  ) {
    return {
      methode: 'standard',
      reason: 'bsiGrundschutz.classification.reasons.standard',
      bsiReference: 'BSI-Standard 200-2 Kap. 7',
    };
  }

  // Rule 3: Basis-Absicherung for small companies or low risk
  return {
    methode: 'basis',
    reason: 'bsiGrundschutz.classification.reasons.basis',
    bsiReference: 'BSI-Standard 200-2 Kap. 6',
  };
}

/**
 * Get the display properties for a Grundschutz method.
 * All user-facing text uses translation keys.
 */
export function getMethodeDisplayInfo(methode: GrundschutzMethode): {
  nameKey: string;
  descriptionKey: string;
  bsiReference: string;
} {
  switch (methode) {
    case 'kern':
      return {
        nameKey: 'bsiGrundschutz.classification.methoden.kern.name',
        descriptionKey: 'bsiGrundschutz.classification.methoden.kern.description',
        bsiReference: 'BSI-Standard 200-2 Kap. 8',
      };
    case 'standard':
      return {
        nameKey: 'bsiGrundschutz.classification.methoden.standard.name',
        descriptionKey: 'bsiGrundschutz.classification.methoden.standard.description',
        bsiReference: 'BSI-Standard 200-2 Kap. 7',
      };
    case 'basis':
      return {
        nameKey: 'bsiGrundschutz.classification.methoden.basis.name',
        descriptionKey: 'bsiGrundschutz.classification.methoden.basis.description',
        bsiReference: 'BSI-Standard 200-2 Kap. 6',
      };
  }
}
