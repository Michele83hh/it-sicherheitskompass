/**
 * TISAX Assessment Level Classification
 *
 * Determines the required TISAX Assessment Level (AL1, AL2, AL3) based on:
 * - Automotive supplier status
 * - Customer requirements (OEM demands)
 * - Prototype handling
 * - Data sensitivity level
 *
 * Assessment Levels:
 * - AL1: Normal protection needs (self-assessment)
 * - AL2: High protection needs (plausibility check by audit provider)
 * - AL3: Very high protection needs (comprehensive on-site audit)
 *
 * Standard reference: VDA ISA v6.0, ENX TISAX Participant Handbook
 */

import type { TisaxClassificationInput, TisaxClassificationResult } from './types';

/**
 * Classify an organization's required TISAX Assessment Level.
 *
 * Decision tree:
 * 1. Not an automotive supplier -> nicht-relevant
 * 2. Customer explicitly requires AL3 -> AL3
 * 3. Prototype handling or very-high data sensitivity -> AL3
 * 4. Customer explicitly requires AL2 -> AL2
 * 5. High data sensitivity or handles personal data -> AL2
 * 6. Normal supplier without special requirements -> AL1
 */
export function classifyTisaxLevel(input: TisaxClassificationInput): TisaxClassificationResult {
  const {
    isAutomotiveSupplier,
    hasPrototypeHandling,
    dataSensitivity,
    customerRequiresAL3,
    customerRequiresAL2,
    handlesPersonalData,
  } = input;

  // Rule 1: Not an automotive supplier
  if (!isAutomotiveSupplier) {
    return {
      category: 'nicht-relevant',
      assessmentLevel: null,
      reason: 'tisax.classification.reasons.notAutomotiveSupplier',
      legalReference: 'VDA ISA - Anwendungsbereich',
    };
  }

  // Rule 2: Customer explicitly requires AL3
  if (customerRequiresAL3) {
    return {
      category: 'al3',
      assessmentLevel: 'AL3',
      reason: 'tisax.classification.reasons.customerRequiresAL3',
      legalReference: 'ENX TISAX Participant Handbook, Kap. 4.3',
    };
  }

  // Rule 3: Prototype handling requires AL3
  if (hasPrototypeHandling) {
    return {
      category: 'al3',
      assessmentLevel: 'AL3',
      reason: 'tisax.classification.reasons.prototypeHandling',
      legalReference: 'VDA ISA Modul Prototypenschutz',
    };
  }

  // Rule 4: Very high data sensitivity requires AL3
  if (dataSensitivity === 'very-high') {
    return {
      category: 'al3',
      assessmentLevel: 'AL3',
      reason: 'tisax.classification.reasons.veryHighDataSensitivity',
      legalReference: 'VDA ISA v6.0, Schutzbedarf sehr hoch',
    };
  }

  // Rule 5: Customer explicitly requires AL2
  if (customerRequiresAL2) {
    return {
      category: 'al2',
      assessmentLevel: 'AL2',
      reason: 'tisax.classification.reasons.customerRequiresAL2',
      legalReference: 'ENX TISAX Participant Handbook, Kap. 4.2',
    };
  }

  // Rule 6: High data sensitivity requires AL2
  if (dataSensitivity === 'high') {
    return {
      category: 'al2',
      assessmentLevel: 'AL2',
      reason: 'tisax.classification.reasons.highDataSensitivity',
      legalReference: 'VDA ISA v6.0, Schutzbedarf hoch',
    };
  }

  // Rule 7: Personal data handling requires at least AL2
  if (handlesPersonalData) {
    return {
      category: 'al2',
      assessmentLevel: 'AL2',
      reason: 'tisax.classification.reasons.personalDataHandling',
      legalReference: 'VDA ISA Modul Datenschutz',
    };
  }

  // Default: Normal automotive supplier -> AL1 (self-assessment)
  return {
    category: 'al1',
    assessmentLevel: 'AL1',
    reason: 'tisax.classification.reasons.normalProtection',
    legalReference: 'VDA ISA v6.0, Schutzbedarf normal',
  };
}
