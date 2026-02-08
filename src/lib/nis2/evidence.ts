/**
 * NIS2 Evidence Management (Nachweismanagement)
 *
 * Per-category evidence checklists documenting what documents,
 * logs, and records are needed for NIS2 audit readiness.
 *
 * Differentiates by classification:
 * - Besonders wichtig: Proactive evidence required (§39 BSIG)
 * - Wichtig: Subject to random BSI audits
 *
 * Legal basis: §39 BSIG (Nachweispflichten)
 */

export interface EvidenceItem {
  id: string;
  categoryId: string;
  textKey: string;
  typeKey: string; // 'document' | 'record' | 'log' | 'certificate'
  requiredFor: ('besonders-wichtig' | 'wichtig')[]; // Which classifications need this
}

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  // Risk Analysis
  { id: 'ev-ra-1', categoryId: 'risk-analysis', textKey: 'evidence.items.riskAssessmentReport', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ra-2', categoryId: 'risk-analysis', textKey: 'evidence.items.assetInventory', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ra-3', categoryId: 'risk-analysis', textKey: 'evidence.items.riskTreatmentPlan', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ra-4', categoryId: 'risk-analysis', textKey: 'evidence.items.securityPolicy', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },

  // Incident Handling
  { id: 'ev-ih-1', categoryId: 'incident-handling', textKey: 'evidence.items.incidentResponsePlan', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ih-2', categoryId: 'incident-handling', textKey: 'evidence.items.incidentLog', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ih-3', categoryId: 'incident-handling', textKey: 'evidence.items.reportingProcedure', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ih-4', categoryId: 'incident-handling', textKey: 'evidence.items.exerciseRecords', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig'] },

  // Business Continuity
  { id: 'ev-bc-1', categoryId: 'business-continuity', textKey: 'evidence.items.bcpDocument', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-bc-2', categoryId: 'business-continuity', textKey: 'evidence.items.biaReport', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-bc-3', categoryId: 'business-continuity', textKey: 'evidence.items.backupTestRecords', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-bc-4', categoryId: 'business-continuity', textKey: 'evidence.items.drTestResults', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig'] },

  // Supply Chain
  { id: 'ev-sc-1', categoryId: 'supply-chain', textKey: 'evidence.items.supplierDirectory', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-sc-2', categoryId: 'supply-chain', textKey: 'evidence.items.securityClauses', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-sc-3', categoryId: 'supply-chain', textKey: 'evidence.items.supplierAssessments', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig'] },

  // Acquisition/Development
  { id: 'ev-ad-1', categoryId: 'acquisition-development', textKey: 'evidence.items.patchManagementPolicy', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ad-2', categoryId: 'acquisition-development', textKey: 'evidence.items.patchStatusReport', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ad-3', categoryId: 'acquisition-development', textKey: 'evidence.items.procurementGuideline', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig'] },

  // Effectiveness
  { id: 'ev-ea-1', categoryId: 'effectiveness-assessment', textKey: 'evidence.items.auditPlan', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ea-2', categoryId: 'effectiveness-assessment', textKey: 'evidence.items.auditReports', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ea-3', categoryId: 'effectiveness-assessment', textKey: 'evidence.items.pentestResults', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig'] },
  { id: 'ev-ea-4', categoryId: 'effectiveness-assessment', textKey: 'evidence.items.managementReviewMinutes', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig'] },

  // Cyber Hygiene
  { id: 'ev-ch-1', categoryId: 'cyber-hygiene', textKey: 'evidence.items.trainingPlan', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ch-2', categoryId: 'cyber-hygiene', textKey: 'evidence.items.trainingRecords', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ch-3', categoryId: 'cyber-hygiene', textKey: 'evidence.items.securityGuidelines', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ch-4', categoryId: 'cyber-hygiene', textKey: 'evidence.items.managementTrainingProof', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },

  // Cryptography
  { id: 'ev-cr-1', categoryId: 'cryptography', textKey: 'evidence.items.cryptoPolicy', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-cr-2', categoryId: 'cryptography', textKey: 'evidence.items.certificateInventory', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-cr-3', categoryId: 'cryptography', textKey: 'evidence.items.keyManagementProcedure', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig'] },

  // Access Control
  { id: 'ev-ac-1', categoryId: 'access-control', textKey: 'evidence.items.accessControlPolicy', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ac-2', categoryId: 'access-control', textKey: 'evidence.items.permissionMatrix', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ac-3', categoryId: 'access-control', textKey: 'evidence.items.accessReviewRecords', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-ac-4', categoryId: 'access-control', textKey: 'evidence.items.offboardingChecklist', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },

  // Authentication/Communication
  { id: 'ev-mc-1', categoryId: 'authentication-communication', textKey: 'evidence.items.mfaDeploymentRecord', typeKey: 'evidence.types.record', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-mc-2', categoryId: 'authentication-communication', textKey: 'evidence.items.communicationPolicy', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig', 'wichtig'] },
  { id: 'ev-mc-3', categoryId: 'authentication-communication', textKey: 'evidence.items.vpnConfiguration', typeKey: 'evidence.types.document', requiredFor: ['besonders-wichtig'] },
];

/**
 * Get evidence items for a specific category
 */
export function getEvidenceByCategory(categoryId: string): EvidenceItem[] {
  return EVIDENCE_ITEMS.filter((e) => e.categoryId === categoryId);
}

/**
 * Get evidence items filtered by classification
 */
export function getEvidenceForClassification(
  classification: 'besonders-wichtig' | 'wichtig'
): EvidenceItem[] {
  return EVIDENCE_ITEMS.filter((e) => e.requiredFor.includes(classification));
}

/**
 * Count evidence items per category
 */
export function getEvidenceCountByCategory(
  classification: 'besonders-wichtig' | 'wichtig'
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of EVIDENCE_ITEMS) {
    if (item.requiredFor.includes(classification)) {
      counts.set(item.categoryId, (counts.get(item.categoryId) || 0) + 1);
    }
  }
  return counts;
}
