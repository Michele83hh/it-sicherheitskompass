/**
 * CIS Controls v8 Recommendations per Category
 *
 * 12 recommendations (2 per category) with a balanced mix of effort levels:
 * - 4 quick wins (fast, high impact, IG1 basics)
 * - 4 medium effort (weeks, structured implementation)
 * - 4 strategic (months, transformational, IG2/IG3 maturity)
 *
 * Each recommendation includes concrete first steps, CIS Control references,
 * and BSI IT-Grundschutz cross-references for German market compatibility.
 *
 * Legal basis: CIS Critical Security Controls v8
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: Inventar & Kontrolle - 2 recommendations
  // ============================================================
  {
    id: 'cis-rec-ic-1',
    categoryId: 'inventory-control',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'cis-controls.recommendations.ic1.title',
    descriptionKey: 'cis-controls.recommendations.ic1.description',
    firstStepKey: 'cis-controls.recommendations.ic1.firstStep',
    legalReference: 'CIS Control 1.1, 2.1: Establish Asset Inventories',
    bsiReference: 'ORP.1, SYS.1.1',
  },
  {
    id: 'cis-rec-ic-2',
    categoryId: 'inventory-control',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'cis-controls.recommendations.ic2.title',
    descriptionKey: 'cis-controls.recommendations.ic2.description',
    firstStepKey: 'cis-controls.recommendations.ic2.firstStep',
    legalReference: 'CIS Control 1.4, 2.5: Automated Discovery',
    bsiReference: 'OPS.1.1.2, SYS.1.1',
    checklistKey: 'cis-controls.recommendations.ic2.checklist',
  },

  // ============================================================
  // Category 2: Datenschutz & Datenmanagement - 2 recommendations
  // ============================================================
  {
    id: 'cis-rec-dp-1',
    categoryId: 'data-protection',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'cis-controls.recommendations.dp1.title',
    descriptionKey: 'cis-controls.recommendations.dp1.description',
    firstStepKey: 'cis-controls.recommendations.dp1.firstStep',
    legalReference: 'CIS Control 3.1, 3.4: Data Classification & Retention',
    bsiReference: 'CON.1, ORP.1',
  },
  {
    id: 'cis-rec-dp-2',
    categoryId: 'data-protection',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'cis-controls.recommendations.dp2.title',
    descriptionKey: 'cis-controls.recommendations.dp2.description',
    firstStepKey: 'cis-controls.recommendations.dp2.firstStep',
    legalReference: 'CIS Control 3.6, 3.9, 3.10: Encryption & DLP',
    bsiReference: 'CON.1, NET.1.1',
    checklistKey: 'cis-controls.recommendations.dp2.checklist',
  },

  // ============================================================
  // Category 3: Sichere Konfiguration - 2 recommendations
  // ============================================================
  {
    id: 'cis-rec-sc-1',
    categoryId: 'secure-config',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'cis-controls.recommendations.sc1.title',
    descriptionKey: 'cis-controls.recommendations.sc1.description',
    firstStepKey: 'cis-controls.recommendations.sc1.firstStep',
    legalReference: 'CIS Control 4.1, 5.1, 6.1: Secure Baselines & Account Inventory',
    bsiReference: 'SYS.1.1, ORP.4',
  },
  {
    id: 'cis-rec-sc-2',
    categoryId: 'secure-config',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'cis-controls.recommendations.sc2.title',
    descriptionKey: 'cis-controls.recommendations.sc2.description',
    firstStepKey: 'cis-controls.recommendations.sc2.firstStep',
    legalReference: 'CIS Control 5.4, 6.3, 6.5: MFA & Least Privilege',
    bsiReference: 'ORP.4, SYS.1.1',
  },

  // ============================================================
  // Category 4: Schwachstellenmanagement - 2 recommendations
  // ============================================================
  {
    id: 'cis-rec-vm-1',
    categoryId: 'vulnerability-mgmt',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'cis-controls.recommendations.vm1.title',
    descriptionKey: 'cis-controls.recommendations.vm1.description',
    firstStepKey: 'cis-controls.recommendations.vm1.firstStep',
    legalReference: 'CIS Control 7.1-7.4: Vulnerability Scanning & Remediation',
    bsiReference: 'OPS.1.1.3, OPS.1.1.4',
  },
  {
    id: 'cis-rec-vm-2',
    categoryId: 'vulnerability-mgmt',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'cis-controls.recommendations.vm2.title',
    descriptionKey: 'cis-controls.recommendations.vm2.description',
    firstStepKey: 'cis-controls.recommendations.vm2.firstStep',
    legalReference: 'CIS Control 8.1-8.5, 9.1-9.7, 10.1-10.7: Logging, Email & Malware',
    bsiReference: 'OPS.1.1.5, DER.1',
    checklistKey: 'cis-controls.recommendations.vm2.checklist',
  },

  // ============================================================
  // Category 5: Wiederherstellung & Netzwerk - 2 recommendations
  // ============================================================
  {
    id: 'cis-rec-rn-1',
    categoryId: 'recovery-network',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'cis-controls.recommendations.rn1.title',
    descriptionKey: 'cis-controls.recommendations.rn1.description',
    firstStepKey: 'cis-controls.recommendations.rn1.firstStep',
    legalReference: 'CIS Control 11.1-11.4: Data Recovery',
    bsiReference: 'CON.3, OPS.1.2.2',
  },
  {
    id: 'cis-rec-rn-2',
    categoryId: 'recovery-network',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'cis-controls.recommendations.rn2.title',
    descriptionKey: 'cis-controls.recommendations.rn2.description',
    firstStepKey: 'cis-controls.recommendations.rn2.firstStep',
    legalReference: 'CIS Control 12.1-12.8, 13.1-13.6: Network Infra & Monitoring',
    bsiReference: 'NET.1.1, NET.1.2, DER.1',
  },

  // ============================================================
  // Category 6: Sicherheitsbetrieb - 2 recommendations
  // ============================================================
  {
    id: 'cis-rec-so-1',
    categoryId: 'security-operations',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'cis-controls.recommendations.so1.title',
    descriptionKey: 'cis-controls.recommendations.so1.description',
    firstStepKey: 'cis-controls.recommendations.so1.firstStep',
    legalReference: 'CIS Control 14.1-14.9, 17.1-17.9: Awareness & Incident Response',
    bsiReference: 'ORP.3, DER.2.1',
    checklistKey: 'cis-controls.recommendations.so1.checklist',
  },
  {
    id: 'cis-rec-so-2',
    categoryId: 'security-operations',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'cis-controls.recommendations.so2.title',
    descriptionKey: 'cis-controls.recommendations.so2.description',
    firstStepKey: 'cis-controls.recommendations.so2.firstStep',
    legalReference: 'CIS Control 15.1-15.5, 16.1-16.14, 18.1-18.5: Vendors, AppSec, Pentesting',
    bsiReference: 'OPS.2.1, APP.1.1, DER.3.1',
  },
];

export function getRecommendationsByCategory(categoryId: string): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => r.categoryId === categoryId);
}
