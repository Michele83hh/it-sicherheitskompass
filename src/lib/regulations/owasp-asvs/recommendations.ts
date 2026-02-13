/**
 * OWASP ASVS 4.0 Recommendations per Category
 *
 * 12 recommendations with a mix of effort levels:
 * - 4 quick wins (fast, high impact)
 * - 5 medium effort (weeks, structured)
 * - 3 strategic (months, transformational)
 *
 * Each recommendation includes concrete first steps, ASVS chapter references,
 * and OWASP Top 10 / CWE cross-references for practical guidance.
 *
 * Legal basis: OWASP Application Security Verification Standard 4.0.3
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
    titleKey: 'owasp-asvs.recommendations.auth1.title',
    descriptionKey: 'owasp-asvs.recommendations.auth1.description',
    firstStepKey: 'owasp-asvs.recommendations.auth1.firstStep',
    legalReference: 'ASVS V2.1.1, V2.1.2, V2.1.7',
    owaspReference: 'OWASP Top 10 A07:2021, CWE-521',
  },
  {
    id: 'owasp-rec-auth-2',
    categoryId: 'authentication',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.auth2.title',
    descriptionKey: 'owasp-asvs.recommendations.auth2.description',
    firstStepKey: 'owasp-asvs.recommendations.auth2.firstStep',
    legalReference: 'ASVS V2.8.1, V2.8.2, V2.8.3',
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
    titleKey: 'owasp-asvs.recommendations.sess1.title',
    descriptionKey: 'owasp-asvs.recommendations.sess1.description',
    firstStepKey: 'owasp-asvs.recommendations.sess1.firstStep',
    legalReference: 'ASVS V3.2.1, V3.2.2, V3.2.3',
    owaspReference: 'OWASP Top 10 A07:2021, CWE-384',
  },
  {
    id: 'owasp-rec-sess-2',
    categoryId: 'session-mgmt',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'owasp-asvs.recommendations.sess2.title',
    descriptionKey: 'owasp-asvs.recommendations.sess2.description',
    firstStepKey: 'owasp-asvs.recommendations.sess2.firstStep',
    legalReference: 'ASVS V3.3.1, V3.3.2, V3.5.1',
    owaspReference: 'OWASP Top 10 A07:2021, CWE-613',
    checklistKey: 'owasp-asvs.recommendations.sess2.checklist',
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
    legalReference: 'ASVS V4.1.1, V4.1.2, V4.1.3',
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
    legalReference: 'ASVS V4.2.1, V4.3.1, V4.3.2',
    owaspReference: 'OWASP Top 10 A01:2021, CWE-639',
    checklistKey: 'owasp-asvs.recommendations.ac2.checklist',
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
    legalReference: 'ASVS V5.2.1, V5.2.2, V5.3.3',
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
    legalReference: 'ASVS V5.1.1, V5.3.1, V5.3.4',
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
    titleKey: 'owasp-asvs.recommendations.crypto1.title',
    descriptionKey: 'owasp-asvs.recommendations.crypto1.description',
    firstStepKey: 'owasp-asvs.recommendations.crypto1.firstStep',
    legalReference: 'ASVS V6.1.1, V6.2.1',
    owaspReference: 'OWASP Top 10 A02:2021, CWE-327',
  },
  {
    id: 'owasp-rec-crypto-2',
    categoryId: 'cryptography',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'owasp-asvs.recommendations.crypto2.title',
    descriptionKey: 'owasp-asvs.recommendations.crypto2.description',
    firstStepKey: 'owasp-asvs.recommendations.crypto2.firstStep',
    legalReference: 'ASVS V6.3.1, V6.4.1',
    owaspReference: 'OWASP Top 10 A02:2021, CWE-320',
    checklistKey: 'owasp-asvs.recommendations.crypto2.checklist',
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
    legalReference: 'ASVS V7.1.1, V7.4.1, V9.1.1',
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
    legalReference: 'ASVS V13.1.1, V14.2.1, V14.4.1',
    owaspReference: 'OWASP Top 10 A05:2021, CWE-16',
    checklistKey: 'owasp-asvs.recommendations.el2.checklist',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
