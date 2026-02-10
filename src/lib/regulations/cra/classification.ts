/**
 * CRA Product Classification
 *
 * Implements CRA product classification based on Annex III (Important Products)
 * and Annex IV (Critical Products). Products are classified into:
 *
 * - Default: Products with digital elements (self-assessment, Art. 24/25)
 * - Important Class I: Annex III Part I (self-assessment with harmonised standards, or third-party)
 * - Important Class II: Annex III Part II (mandatory third-party assessment)
 * - Critical: Annex IV (EU type examination or EU cybersecurity certification)
 * - nicht-betroffen: No digital elements / not a product
 *
 * Legal basis: Verordnung (EU) 2024/2847, Art. 6-8, Annex III, Annex IV
 */

import type { CraClassificationInput, CraClassificationResult, CraClassificationCategory } from './types';

// ============================================================
// Product Type Catalogs (Annex III and IV)
// ============================================================

/**
 * Annex III Part I: Important Products with Digital Elements - Class I
 * Examples: browsers, password managers, VPN software, network management,
 * SIEM, boot managers, digital certificate issuers, routers for consumer use
 */
const IMPORTANT_CLASS_1_TYPES: string[] = [
  'identity-management',
  'browser',
  'password-manager',
  'malware-detection',
  'vpn',
  'network-management',
  'siem',
  'boot-manager',
  'digital-certificate-issuer',
  'router-consumer',
  'modem-consumer',
  'switch-consumer',
  'iot-consumer-general',
  'os-consumer',
  'microprocessor-general',
  'microcontroller-general',
  'application-specific-ic-general',
];

/**
 * Annex III Part II: Important Products with Digital Elements - Class II
 * Examples: hypervisors, container runtimes, firewalls, tamper-resistant
 * microprocessors, tamper-resistant microcontrollers, IDS/IPS, routers
 * for enterprise, OS for servers/desktops, public key infrastructure
 */
const IMPORTANT_CLASS_2_TYPES: string[] = [
  'hypervisor',
  'container-runtime',
  'firewall',
  'tamper-resistant-microprocessor',
  'tamper-resistant-microcontroller',
  'intrusion-detection',
  'intrusion-prevention',
  'router-enterprise',
  'switch-enterprise',
  'os-server',
  'os-desktop',
  'pki',
  'robot-industrial-network',
  'plc-industrial',
];

/**
 * Annex IV: Critical Products with Digital Elements
 * Examples: hardware security modules, smartcard readers, smart meters,
 * secure elements, hardware crypto gateways
 */
const CRITICAL_TYPES: string[] = [
  'hardware-security-module',
  'smartcard-reader',
  'smart-meter-gateway',
  'secure-element',
  'hardware-crypto-gateway',
  'advanced-smartcard',
];

// ============================================================
// Classification Logic
// ============================================================

/**
 * Classify a product under the CRA framework.
 *
 * Classification hierarchy (highest takes precedence):
 * 1. Critical (Annex IV) - requires EU type examination
 * 2. Important Class II (Annex III Part II) - requires third-party assessment
 * 3. Important Class I (Annex III Part I) - self-assessment with hEN or third-party
 * 4. Default - self-assessment sufficient
 * 5. Not affected - no digital elements
 */
export function classifyProduct(input: CraClassificationInput): CraClassificationResult {
  const { productType, hasNetworkConnectivity, isOpenSource } = input;

  // Rule 0: No network connectivity and no digital elements -> not affected
  if (!hasNetworkConnectivity && !productType) {
    return {
      category: 'nicht-betroffen',
      productClass: null,
      reason: 'cra.classification.reasons.noDigitalElements',
      legalReference: 'Art. 2 CRA',
      conformityAssessment: 'cra.classification.assessment.none',
    };
  }

  // Rule 1: Check for Critical products (Annex IV)
  if (CRITICAL_TYPES.includes(productType)) {
    return {
      category: 'critical',
      productClass: 'critical',
      reason: 'cra.classification.reasons.criticalProduct',
      legalReference: 'Art. 8 CRA, Anhang IV',
      conformityAssessment: 'cra.classification.assessment.euTypeExamination',
    };
  }

  // Rule 2: Check for Important Class II (Annex III Part II)
  if (IMPORTANT_CLASS_2_TYPES.includes(productType)) {
    return {
      category: 'important-class-2',
      productClass: 'important-class-2',
      reason: 'cra.classification.reasons.importantClass2',
      legalReference: 'Art. 7 Abs. 2 CRA, Anhang III Teil II',
      conformityAssessment: 'cra.classification.assessment.thirdParty',
    };
  }

  // Rule 3: Check for Important Class I (Annex III Part I)
  if (IMPORTANT_CLASS_1_TYPES.includes(productType)) {
    return {
      category: 'important-class-1',
      productClass: 'important-class-1',
      reason: 'cra.classification.reasons.importantClass1',
      legalReference: 'Art. 7 Abs. 1 CRA, Anhang III Teil I',
      conformityAssessment: 'cra.classification.assessment.selfWithHen',
    };
  }

  // Rule 4: Open source exception check
  // Non-commercial open source is excluded from CRA scope (Recital 18)
  if (isOpenSource) {
    return {
      category: 'nicht-betroffen',
      productClass: null,
      reason: 'cra.classification.reasons.openSourceExcluded',
      legalReference: 'Erwaegungsgrund 18 CRA, Art. 3 Nr. 47',
      conformityAssessment: 'cra.classification.assessment.none',
    };
  }

  // Rule 5: Default product with digital elements
  return {
    category: 'default',
    productClass: 'default',
    reason: 'cra.classification.reasons.defaultProduct',
    legalReference: 'Art. 6 CRA',
    conformityAssessment: 'cra.classification.assessment.selfAssessment',
  };
}

/**
 * Get the conformity assessment procedure required for a product class.
 */
export function getConformityProcedure(
  category: CraClassificationCategory
): string {
  switch (category) {
    case 'critical':
      return 'cra.classification.procedure.euTypeExamination';
    case 'important-class-2':
      return 'cra.classification.procedure.thirdParty';
    case 'important-class-1':
      return 'cra.classification.procedure.selfWithHen';
    case 'default':
      return 'cra.classification.procedure.selfAssessment';
    case 'nicht-betroffen':
      return 'cra.classification.procedure.none';
  }
}

/**
 * Get all known product types by class for UI selection.
 */
export function getProductTypesByClass(): Record<string, string[]> {
  return {
    critical: [...CRITICAL_TYPES],
    'important-class-2': [...IMPORTANT_CLASS_2_TYPES],
    'important-class-1': [...IMPORTANT_CLASS_1_TYPES],
  };
}
