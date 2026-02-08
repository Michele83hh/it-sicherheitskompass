/**
 * DORA Entity Classification
 *
 * Implements classification logic for determining if a financial entity
 * is subject to DORA and whether simplified requirements apply.
 *
 * Legal basis: Verordnung (EU) 2022/2554 (DORA)
 * - Art. 2: Scope of application
 * - Art. 4: Proportionality principle
 *
 * Categories:
 * - direkt-betroffen: Financial entities listed in Art. 2 Abs. 1
 * - indirekt-betroffen: ICT third-party service providers (Art. 28-44)
 * - nicht-betroffen: Not within DORA scope
 */

import type {
  DoraClassificationInput,
  DoraClassificationResult,
  FinancialEntityType,
} from './types';

/**
 * Financial entity types that are directly subject to DORA (Art. 2 Abs. 1).
 */
const DIRECTLY_REGULATED_ENTITIES: FinancialEntityType[] = [
  'credit-institution',
  'payment-institution',
  'e-money-institution',
  'investment-firm',
  'crypto-asset-provider',
  'csd',
  'ccp',
  'trading-venue',
  'trade-repository',
  'aifm',
  'management-company',
  'insurance-undertaking',
  'reinsurance-undertaking',
  'insurance-intermediary',
  'iorp',
  'credit-rating-agency',
  'crowdfunding-provider',
  'securitisation-repository',
];

/**
 * Entity types subject to enhanced requirements (Art. 26 TLPT, stricter reporting).
 * These are significant entities that typically cannot use simplified requirements.
 */
const SIGNIFICANT_ENTITIES: FinancialEntityType[] = [
  'credit-institution',
  'ccp',
  'csd',
  'trading-venue',
  'insurance-undertaking',
  'reinsurance-undertaking',
];

/**
 * Classify a financial entity under DORA.
 *
 * @param input - Entity information including type, size, and ICT provider status
 * @returns Classification result with category, legal reference, and proportionality
 */
export function classifyEntity(input: DoraClassificationInput): DoraClassificationResult {
  const {
    entityType,
    isMicroEnterprise,
    isSmallEnterprise,
    isIctProvider,
    isCriticalIctProvider,
  } = input;

  // Rule 1: Critical ICT third-party providers are subject to direct oversight (Art. 31-44)
  if (isCriticalIctProvider) {
    return {
      category: 'direkt-betroffen',
      reason: 'dora.classification.reasons.criticalIctProvider',
      legalReference: 'Art. 31-44 DORA',
      simplifiedRequirements: false,
      proportionalityNote: 'dora.classification.proportionality.criticalIctNoSimplification',
    };
  }

  // Rule 2: Directly regulated financial entities (Art. 2 Abs. 1)
  if (DIRECTLY_REGULATED_ENTITIES.includes(entityType)) {
    // Check proportionality principle (Art. 4)
    const isSignificant = SIGNIFICANT_ENTITIES.includes(entityType);

    // Micro-enterprises get simplified ICT risk management framework (Art. 16)
    if (isMicroEnterprise && !isSignificant) {
      return {
        category: 'direkt-betroffen',
        reason: 'dora.classification.reasons.directlyRegulatedMicro',
        legalReference: 'Art. 2 Abs. 1, Art. 16 DORA',
        simplifiedRequirements: true,
        proportionalityNote: 'dora.classification.proportionality.microSimplified',
      };
    }

    // Small enterprises may have proportional requirements (Art. 4)
    if (isSmallEnterprise && !isSignificant) {
      return {
        category: 'direkt-betroffen',
        reason: 'dora.classification.reasons.directlyRegulatedSmall',
        legalReference: 'Art. 2 Abs. 1, Art. 4 DORA',
        simplifiedRequirements: true,
        proportionalityNote: 'dora.classification.proportionality.smallProportional',
      };
    }

    // Full requirements for significant or larger entities
    return {
      category: 'direkt-betroffen',
      reason: isSignificant
        ? 'dora.classification.reasons.directlyRegulatedSignificant'
        : 'dora.classification.reasons.directlyRegulated',
      legalReference: 'Art. 2 Abs. 1 DORA',
      simplifiedRequirements: false,
    };
  }

  // Rule 3: ICT third-party service providers (not critical) are indirectly affected
  if (isIctProvider) {
    return {
      category: 'indirekt-betroffen',
      reason: 'dora.classification.reasons.ictProvider',
      legalReference: 'Art. 28-30 DORA',
      simplifiedRequirements: false,
      proportionalityNote: 'dora.classification.proportionality.ictProviderContractual',
    };
  }

  // Rule 4: Entity type "other-financial" without ICT provider status
  if (entityType === 'other-financial') {
    return {
      category: 'nicht-betroffen',
      reason: 'dora.classification.reasons.otherFinancialNotCovered',
      legalReference: 'Art. 2 DORA',
      simplifiedRequirements: false,
    };
  }

  // Rule 5: ICT third-party providers that are not serving financial entities
  return {
    category: 'nicht-betroffen',
    reason: 'dora.classification.reasons.notInScope',
    legalReference: 'Art. 2 DORA',
    simplifiedRequirements: false,
  };
}

/**
 * Check if an entity type requires TLPT (Threat-Led Penetration Testing).
 * Art. 26 Abs. 1: Applies to significant entities identified by competent authorities.
 */
export function requiresTlpt(entityType: FinancialEntityType): boolean {
  return SIGNIFICANT_ENTITIES.includes(entityType);
}

/**
 * Check if entity type qualifies for simplified ICT risk management framework.
 * Art. 16: Micro-enterprises can use simplified framework.
 */
export function qualifiesForSimplifiedFramework(
  entityType: FinancialEntityType,
  isMicroEnterprise: boolean
): boolean {
  if (!isMicroEnterprise) return false;
  // Significant entities never qualify for simplified framework
  return !SIGNIFICANT_ENTITIES.includes(entityType);
}
