/**
 * OWASP ASVS 5.0 Recommendations per Category
 *
 * 12 recommendations with a mix of effort levels:
 * - 4 quick wins (fast, high impact)
 * - 5 medium effort (weeks, structured)
 * - 3 strategic (months, transformational)
 *
 * Each recommendation includes concrete first steps, ASVS chapter references,
 * and OWASP Top 10 / CWE cross-references for practical guidance.
 *
 * Legal basis: OWASP Application Security Verification Standard 5.0.0
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Authentication (V2) - 2 recommendations
  // ============================================================
  {
    id: 'owasp-rec-auth-1',
    categoryId: 'authentication',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'owasp-asvs.recommendations.au1.title',
    descriptionKey: 'owasp-asvs.recommendations.au1.description',
    firstStepKey: 'owasp-asvs.recommendations.au1.firstStep',
    legalReference: 'ASVS 5.0.0 V6.2.1, V6.2.4, V6.2.12',
    owaspReference: 'OWASP Top 10 A07:2021, CWE-521',
  },
  {
    id: 'owasp-rec-auth-2',
    categoryId: 'authentication',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.au2.title',
    descriptionKey: 'owasp-asvs.recommendations.au2.description',
    firstStepKey: 'owasp-asvs.recommendations.au2.firstStep',
    legalReference: 'ASVS 5.0.0 V6.3.3',
    owaspReference: 'OWASP Top 10 A07:2021, CWE-308',
  },

  // ============================================================
  // Category 2: Session Management (V3) - 2 recommendations
  // ============================================================
  {
    id: 'owasp-rec-sess-1',
    categoryId: 'session-mgmt',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'owasp-asvs.recommendations.sm1.title',
    descriptionKey: 'owasp-asvs.recommendations.sm1.description',
    firstStepKey: 'owasp-asvs.recommendations.sm1.firstStep',
    legalReference: 'ASVS 5.0.0 V7.3.1, V7.3.2, V3.3.1, V3.3.2, V3.3.4',
    owaspReference: 'OWASP Top 10 A07:2021, CWE-384',
  },

  // ============================================================
  // Category 3: Access Control (V4) - 2 recommendations
  // ============================================================
  {
    id: 'owasp-rec-ac-1',
    categoryId: 'access-control',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.ac1.title',
    descriptionKey: 'owasp-asvs.recommendations.ac1.description',
    firstStepKey: 'owasp-asvs.recommendations.ac1.firstStep',
    legalReference: 'ASVS 5.0.0 V8.2.1',
    owaspReference: 'OWASP Top 10 A01:2021, CWE-285',
  },
  {
    id: 'owasp-rec-ac-2',
    categoryId: 'access-control',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'owasp-asvs.recommendations.ac2.title',
    descriptionKey: 'owasp-asvs.recommendations.ac2.description',
    firstStepKey: 'owasp-asvs.recommendations.ac2.firstStep',
    legalReference: 'ASVS 5.0.0 V8.3.1',
    owaspReference: 'OWASP Top 10 A01:2021, CWE-639',
  },

  // ============================================================
  // Category 4: Input Validation (V5) - 2 recommendations
  // ============================================================
  {
    id: 'owasp-rec-iv-1',
    categoryId: 'input-validation',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'owasp-asvs.recommendations.iv1.title',
    descriptionKey: 'owasp-asvs.recommendations.iv1.description',
    firstStepKey: 'owasp-asvs.recommendations.iv1.firstStep',
    legalReference: 'ASVS 5.0.0 V2.2.1, V2.2.2',
    owaspReference: 'OWASP Top 10 A03:2021, CWE-89, CWE-79',
  },
  {
    id: 'owasp-rec-iv-2',
    categoryId: 'input-validation',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.iv2.title',
    descriptionKey: 'owasp-asvs.recommendations.iv2.description',
    firstStepKey: 'owasp-asvs.recommendations.iv2.firstStep',
    legalReference: 'ASVS 5.0.0 V1.2.4',
    owaspReference: 'OWASP Top 10 A03:2021, CWE-116',
  },

  // ============================================================
  // Category 5: Cryptography (V6) - 2 recommendations
  // ============================================================
  {
    id: 'owasp-rec-crypto-1',
    categoryId: 'cryptography',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'owasp-asvs.recommendations.cr1.title',
    descriptionKey: 'owasp-asvs.recommendations.cr1.description',
    firstStepKey: 'owasp-asvs.recommendations.cr1.firstStep',
    legalReference: 'ASVS 5.0.0 V14.2.4, V11.2.3',
    owaspReference: 'OWASP Top 10 A02:2021, CWE-327',
  },
  {
    id: 'owasp-rec-crypto-2',
    categoryId: 'cryptography',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'owasp-asvs.recommendations.cr2.title',
    descriptionKey: 'owasp-asvs.recommendations.cr2.description',
    firstStepKey: 'owasp-asvs.recommendations.cr2.firstStep',
    legalReference: 'ASVS 5.0.0 V11.4.2',
    owaspReference: 'OWASP Top 10 A02:2021, CWE-320',
  },

  // ============================================================
  // Category 6: Error Handling, Logging & Configuration (V7-V14) - 2 recommendations
  // ============================================================
  {
    id: 'owasp-rec-el-1',
    categoryId: 'error-logging',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.el1.title',
    descriptionKey: 'owasp-asvs.recommendations.el1.description',
    firstStepKey: 'owasp-asvs.recommendations.el1.firstStep',
    legalReference: 'ASVS 5.0.0 V16.5.1',
    owaspReference: 'OWASP Top 10 A09:2021, CWE-532',
  },
  {
    id: 'owasp-rec-el-2',
    categoryId: 'error-logging',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'owasp-asvs.recommendations.el2.title',
    descriptionKey: 'owasp-asvs.recommendations.el2.description',
    firstStepKey: 'owasp-asvs.recommendations.el2.firstStep',
    legalReference: 'ASVS 5.0.0 V16.3.1, V16.3.2, V16.3.3',
    owaspReference: 'OWASP Top 10 A09:2021, CWE-778',
  },
  {
    id: 'owasp-rec-el-3',
    categoryId: 'error-logging',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.el3.title',
    descriptionKey: 'owasp-asvs.recommendations.el3.description',
    firstStepKey: 'owasp-asvs.recommendations.el3.firstStep',
    legalReference: 'ASVS 5.0.0 V4.1.4, V2.4.1, V2.2.2',
    owaspReference: 'OWASP API Security Top 10',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
