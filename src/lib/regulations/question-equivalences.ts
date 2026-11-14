/**
 * Question Equivalence Mapping
 *
 * Maps semantically equivalent questions across regulations.
 * Used by the dedup service to suggest answers from previously
 * completed assessments.
 *
 * Each topic groups questions that ask about the same core concept.
 * Question IDs are scoped to their regulation (e.g. 'ra-q1' in NIS2
 * is different from 'ra-q1' in another regulation).
 */

export type EquivalenceConfidence = 'exact' | 'high' | 'approximate';

export interface QuestionEquivalence {
  /** Internal topic identifier */
  topic: string;
  /** i18n key for the topic label */
  topicKey: string;
  /** Map of regulationId -> array of questionIds */
  questions: Record<string, string[]>;
  /** How closely the questions match */
  confidence: EquivalenceConfidence;
}

/**
 * Themen, zu denen mehrere Regelwerke inhaltlich dieselbe Frage stellen.
 *
 * Jede Zuordnung ist anhand der Fragetexte geprüft (Stand 13.11.2026). Eine Frage gehört
 * nur dann in ein Thema, wenn die Antwort sinnvoll übertragbar ist — dasselbe Kapitel im
 * Regelwerk genügt nicht. 'exact' = gleiche Maßnahme, 'high' = gleiche Maßnahme mit anderem
 * Geltungsbereich, 'approximate' = verwandt, Antwort nur als Anhaltspunkt.
 */
export const QUESTION_EQUIVALENCES: QuestionEquivalence[] = [
  {
    topic: 'asset_inventory',
    topicKey: 'dedup.topics.assetInventory',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q4'],
      'dora': ['irm-q2'],
      'tisax': ['tech-q1'],
      'c5': ['c5-am-q1'],
      'nist-csf': ['nist-id-q1'],
      'cis-controls': ['cis-ic-q1', 'cis-ic-q2'],
    },
  },
  {
    topic: 'risk_assessment',
    topicKey: 'dedup.topics.riskAssessment',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q1'],
      'kritis': ['rm-q1'],
      'dora': ['irm-q1'],
      'iso27001': ['iso-pr-q1'],
      'bsi-grundschutz': ['isms-q3'],
      'tisax': ['org-q3'],
      'soc2': ['gov-q3'],
      'nist-csf': ['nist-id-q2'],
    },
  },
  {
    topic: 'risk_treatment',
    topicKey: 'dedup.topics.riskTreatment',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q5'],
      'kritis': ['rm-q4'],
      'iso27001': ['iso-pr-q2'],
    },
  },
  {
    topic: 'isms_established',
    topicKey: 'dedup.topics.ismsEstablished',
    confidence: 'high',
    questions: {
      'kritis': ['rm-q2'],
      'bsi-grundschutz': ['isms-q1'],
    },
  },
  {
    topic: 'security_policy',
    topicKey: 'dedup.topics.securityPolicy',
    confidence: 'high',
    questions: {
      'iso27001': ['iso-cl-q2'],
      'bsi-grundschutz': ['isms-q2'],
      'tisax': ['org-q1'],
      'pci-dss': ['sp-q1'],
      'c5': ['c5-org-q1'],
    },
  },
  {
    topic: 'security_responsibilities',
    topicKey: 'dedup.topics.securityResponsibilities',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q3'],
      'iso27001': ['iso-cl-q3'],
      'tisax': ['org-q2'],
      'nist-csf': ['nist-gv-q2'],
    },
  },
  {
    topic: 'incident_response_plan',
    topicKey: 'dedup.topics.incidentResponsePlan',
    confidence: 'high',
    questions: {
      'nis2': ['ih-q1'],
      'kritis': ['vm-q1'],
      'dora': ['vm-q1'],
      'iso27001': ['iso-ic-q1'],
      'bsi-grundschutz': ['der-q2'],
      'c5': ['c5-sim-q1'],
      'nist-csf': ['nist-rs-q1'],
      'cis-controls': ['cis-so-q3'],
      'pci-dss': ['sp-q3'],
      'soc2': ['mon-q2'],
    },
  },
  {
    topic: 'incident_lessons_learned',
    topicKey: 'dedup.topics.incidentLessonsLearned',
    confidence: 'high',
    questions: {
      'nis2': ['ih-q3'],
      'kritis': ['vm-q3'],
      'c5': ['c5-sim-q3'],
      'nist-csf': ['nist-rs-q3'],
    },
  },
  {
    topic: 'incident_reporting',
    topicKey: 'dedup.topics.incidentReporting',
    confidence: 'approximate',
    questions: {
      'nis2': ['ih-q4'],
      'kritis': ['vm-q2'],
      'dora': ['vm-q3'],
    },
  },
  {
    topic: 'security_monitoring',
    topicKey: 'dedup.topics.securityMonitoring',
    confidence: 'high',
    questions: {
      'bsi-grundschutz': ['der-q1'],
      'soc2': ['mon-q1'],
      'c5': ['c5-ops-q2'],
      'nist-csf': ['nist-de-q1'],
      'cis-controls': ['cis-vm-q2'],
      'pci-dss': ['mt-q1'],
      'owasp-asvs': ['owasp-el-q2'],
    },
  },
  {
    topic: 'anomaly_detection',
    topicKey: 'dedup.topics.anomalyDetection',
    confidence: 'high',
    questions: {
      'kritis': ['rm-q3'],
      'dora': ['irm-q4'],
      'nist-csf': ['nist-de-q2'],
    },
  },
  {
    topic: 'backup_strategy',
    topicKey: 'dedup.topics.backupStrategy',
    confidence: 'high',
    questions: {
      'nis2': ['bc-q1'],
      'dora': ['irm-q5'],
      'bsi-grundschutz': ['con-q2'],
      'soc2': ['avl-q2'],
      'cis-controls': ['cis-rn-q1'],
    },
  },
  {
    topic: 'business_continuity_plan',
    topicKey: 'dedup.topics.businessContinuityPlan',
    confidence: 'high',
    questions: {
      'nis2': ['bc-q3'],
      'iso27001': ['iso-ic-q2'],
      'c5': ['c5-sim-q2'],
      'iso22301': ['bcm-sp-q1'],
      'soc2': ['avl-q3'],
      'nist-csf': ['nist-rc-q1'],
    },
  },
  {
    topic: 'bc_exercises',
    topicKey: 'dedup.topics.bcExercises',
    confidence: 'high',
    questions: {
      'kritis': ['bcm-q3'],
      'iso22301': ['bcm-sp-q2'],
      'nist-csf': ['nist-rc-q2'],
      'bsi-grundschutz': ['der-q3'],
    },
  },
  {
    topic: 'business_impact_analysis',
    topicKey: 'dedup.topics.businessImpactAnalysis',
    confidence: 'exact',
    questions: {
      'nis2': ['bc-q4'],
      'iso22301': ['bcm-br-q1'],
    },
  },
  {
    topic: 'rto_rpo',
    topicKey: 'dedup.topics.rtoRpo',
    confidence: 'exact',
    questions: {
      'kritis': ['bcm-q2'],
      'iso22301': ['bcm-br-q2'],
    },
  },
  {
    topic: 'crisis_communication',
    topicKey: 'dedup.topics.crisisCommunication',
    confidence: 'high',
    questions: {
      'nis2': ['bc-q5'],
      'iso22301': ['bcm-sp-q3'],
    },
  },
  {
    topic: 'access_control',
    topicKey: 'dedup.topics.accessControl',
    confidence: 'high',
    questions: {
      'nis2': ['ac-q1'],
      'iso27001': ['iso-ac-q1'],
      'pci-dss': ['ac-q1'],
      'tisax': ['zk-q1'],
      'c5': ['c5-idm-q2'],
      'owasp-asvs': ['owasp-ac-q1'],
      'nist-csf': ['nist-pr-q1'],
      'soc2': ['sec-q1'],
    },
  },
  {
    topic: 'access_review',
    topicKey: 'dedup.topics.accessReview',
    confidence: 'high',
    questions: {
      'nis2': ['ac-q2', 'ac-q5'],
      'iso27001': ['iso-ac-q4'],
      'pci-dss': ['ac-q3'],
      'tisax': ['zk-q2'],
      'c5': ['c5-idm-q1'],
      'soc2': ['sec-q2'],
      'cis-controls': ['cis-sc-q2'],
    },
  },
  {
    topic: 'privileged_access',
    topicKey: 'dedup.topics.privilegedAccess',
    confidence: 'exact',
    questions: {
      'nis2': ['ac-q4'],
      'iso27001': ['iso-ac-q3'],
      'tisax': ['zk-q3'],
    },
  },
  {
    topic: 'mfa',
    topicKey: 'dedup.topics.mfa',
    confidence: 'high',
    questions: {
      'nis2': ['mc-q1'],
      'pci-dss': ['au-q3'],
      'cis-controls': ['cis-sc-q3'],
      'owasp-asvs': ['owasp-auth-q2'],
      'c5': ['c5-idm-q3'],
    },
  },
  {
    topic: 'password_policy',
    topicKey: 'dedup.topics.passwordPolicy',
    confidence: 'high',
    questions: {
      'pci-dss': ['au-q2'],
      'owasp-asvs': ['owasp-auth-q1'],
    },
  },
  {
    topic: 'encryption',
    topicKey: 'dedup.topics.encryption',
    confidence: 'high',
    questions: {
      'nis2': ['cr-q1'],
      'tisax': ['kry-q2'],
      'soc2': ['sec-q3'],
      'c5': ['c5-kry-q3'],
      'cis-controls': ['cis-dp-q2'],
      'iso27001': ['iso-cn-q1'],
      'dsgvo': ['tom-q1'],
      'owasp-asvs': ['owasp-crypto-q1'],
    },
  },
  {
    topic: 'crypto_policy',
    topicKey: 'dedup.topics.cryptoPolicy',
    confidence: 'high',
    questions: {
      'nis2': ['cr-q2'],
      'tisax': ['kry-q1'],
      'c5': ['c5-kry-q1'],
      'bsi-grundschutz': ['con-q1'],
    },
  },
  {
    topic: 'key_management',
    topicKey: 'dedup.topics.keyManagement',
    confidence: 'high',
    questions: {
      'nis2': ['cr-q3'],
      'tisax': ['kry-q3'],
      'c5': ['c5-kry-q2'],
      'owasp-asvs': ['owasp-crypto-q3'],
    },
  },
  {
    topic: 'supplier_contracts',
    topicKey: 'dedup.topics.supplierContracts',
    confidence: 'high',
    questions: {
      'nis2': ['sc-q2'],
      'kritis': ['lk-q1'],
      'tisax': ['lief-q1'],
      'dora': ['da-q2'],
    },
  },
  {
    topic: 'supplier_assessment',
    topicKey: 'dedup.topics.supplierAssessment',
    confidence: 'high',
    questions: {
      'nis2': ['sc-q1'],
      'kritis': ['lk-q2'],
      'tisax': ['lief-q2'],
      'cis-controls': ['cis-so-q2'],
      'iso27001': ['iso-op-q3'],
      'nist-csf': ['nist-id-q3'],
      'dora': ['da-q1'],
    },
  },
  {
    topic: 'supplier_reassessment',
    topicKey: 'dedup.topics.supplierReassessment',
    confidence: 'high',
    questions: {
      'nis2': ['sc-q5'],
      'kritis': ['lk-q4'],
    },
  },
  {
    topic: 'security_awareness',
    topicKey: 'dedup.topics.securityAwareness',
    confidence: 'high',
    questions: {
      'nis2': ['ch-q1'],
      'iso27001': ['iso-sa-q1'],
      'tisax': ['per-q2'],
      'bsi-grundschutz': ['orp-q3'],
      'pci-dss': ['sp-q2'],
      'nist-csf': ['nist-pr-q2'],
      'cis-controls': ['cis-so-q1'],
      'c5': ['c5-org-q3'],
    },
  },
  {
    topic: 'management_training',
    topicKey: 'dedup.topics.managementTraining',
    confidence: 'high',
    questions: {
      'nis2': ['ch-q5'],
      'dora': ['gov-q2'],
    },
  },
  {
    topic: 'management_reporting',
    topicKey: 'dedup.topics.managementReporting',
    confidence: 'high',
    questions: {
      'nis2': ['ea-q4'],
      'nist-csf': ['nist-gv-q3'],
      'dora': ['gov-q3'],
    },
  },
  {
    topic: 'patch_management',
    topicKey: 'dedup.topics.patchManagement',
    confidence: 'high',
    questions: {
      'nis2': ['ad-q1'],
      'kritis': ['sh-q3'],
      'bsi-grundschutz': ['ops-q1'],
      'pci-dss': ['vm-q3'],
    },
  },
  {
    topic: 'vulnerability_scanning',
    topicKey: 'dedup.topics.vulnerabilityScanning',
    confidence: 'high',
    questions: {
      'nis2': ['ad-q3'],
      'tisax': ['bs-q3'],
      'cis-controls': ['cis-vm-q1'],
      'pci-dss': ['mt-q2'],
    },
  },
  {
    topic: 'penetration_testing',
    topicKey: 'dedup.topics.penetrationTesting',
    confidence: 'high',
    questions: {
      'nis2': ['ea-q2'],
      'pci-dss': ['mt-q3'],
      'dora': ['rt-q2'],
      'c5': ['c5-dev-q3'],
    },
  },
  {
    topic: 'internal_audit',
    topicKey: 'dedup.topics.internalAudit',
    confidence: 'high',
    questions: {
      'nis2': ['ea-q1'],
      'kritis': ['au-q3'],
      'iso27001': ['iso-ic-q3'],
      'tisax': ['comp-q2'],
      'c5': ['c5-org-q4'],
    },
  },
  {
    topic: 'audit_followup',
    topicKey: 'dedup.topics.auditFollowup',
    confidence: 'high',
    questions: {
      'nis2': ['ea-q3'],
      'kritis': ['au-q4'],
      'tisax': ['comp-q3'],
    },
  },
  {
    topic: 'malware_protection',
    topicKey: 'dedup.topics.malwareProtection',
    confidence: 'high',
    questions: {
      'bsi-grundschutz': ['ops-q2'],
      'tisax': ['bs-q2'],
      'pci-dss': ['vm-q1'],
      'cis-controls': ['cis-vm-q3'],
    },
  },
  {
    topic: 'system_hardening',
    topicKey: 'dedup.topics.systemHardening',
    confidence: 'high',
    questions: {
      'kritis': ['sh-q1'],
      'tisax': ['bs-q1'],
      'bsi-grundschutz': ['sys-q1'],
      'cis-controls': ['cis-sc-q1'],
      'pci-dss': ['ns-q3'],
    },
  },
  {
    topic: 'network_segmentation',
    topicKey: 'dedup.topics.networkSegmentation',
    confidence: 'high',
    questions: {
      'kritis': ['sh-q2'],
      'tisax': ['kom-q1'],
      'bsi-grundschutz': ['net-q1'],
      'iso27001': ['iso-cn-q2'],
      'cis-controls': ['cis-rn-q2'],
      'pci-dss': ['ns-q2'],
    },
  },
  {
    topic: 'physical_access',
    topicKey: 'dedup.topics.physicalAccess',
    confidence: 'high',
    questions: {
      'nis2': ['ac-q3'],
      'kritis': ['ps-q1'],
      'tisax': ['phy-q1'],
      'iso27001': ['iso-ps-q1'],
      'pci-dss': ['ps-q1'],
      'c5': ['c5-ps-q1'],
      'bsi-grundschutz': ['inf-q1'],
      'soc2': ['sec-q4'],
    },
  },
  {
    topic: 'environmental_protection',
    topicKey: 'dedup.topics.environmentalProtection',
    confidence: 'high',
    questions: {
      'kritis': ['ps-q2'],
      'tisax': ['phy-q3'],
      'iso27001': ['iso-ps-q3'],
      'c5': ['c5-ps-q2'],
    },
  },
  {
    topic: 'data_classification',
    topicKey: 'dedup.topics.dataClassification',
    confidence: 'high',
    questions: {
      'tisax': ['tech-q2'],
      'c5': ['c5-am-q2'],
      'cis-controls': ['cis-dp-q1'],
      'soc2': ['conf-q1'],
    },
  },
  {
    topic: 'secure_deletion',
    topicKey: 'dedup.topics.secureDeletion',
    confidence: 'high',
    questions: {
      'bsi-grundschutz': ['con-q3'],
      'tisax': ['tech-q3'],
      'cis-controls': ['cis-dp-q3'],
    },
  },
  {
    topic: 'secure_development',
    topicKey: 'dedup.topics.secureDevelopment',
    confidence: 'high',
    questions: {
      'nis2': ['ad-q4'],
      'c5': ['c5-dev-q1'],
      'pci-dss': ['vm-q2'],
      'cra': ['sbd-q1'],
    },
  },
  {
    topic: 'web_application_security',
    topicKey: 'dedup.topics.webApplicationSecurity',
    confidence: 'high',
    questions: {
      'iso27001': ['iso-cn-q3'],
      'bsi-grundschutz': ['app-q3'],
      'pci-dss': ['vm-q4'],
    },
  },
  {
    topic: 'change_management',
    topicKey: 'dedup.topics.changeManagement',
    confidence: 'high',
    questions: {
      'iso27001': ['iso-op-q4'],
      'soc2': ['gov-q4'],
    },
  },
  {
    topic: 'privacy_breach_notification',
    topicKey: 'dedup.topics.privacyBreachNotification',
    confidence: 'high',
    questions: {
      'dsgvo': ['dv-q1'],
      'tisax': ['ds-q3'],
    },
  },
  {
    topic: 'processor_contracts',
    topicKey: 'dedup.topics.processorContracts',
    confidence: 'exact',
    questions: {
      'dsgvo': ['av-q2'],
      'tisax': ['ds-q2'],
    },
  },
  {
    topic: 'data_subject_rights',
    topicKey: 'dedup.topics.dataSubjectRights',
    confidence: 'high',
    questions: {
      'dsgvo': ['br-q1'],
      'soc2': ['priv-q3'],
    },
  },
];

/**
 * Lookup: for a given regulation + question, find equivalent questions
 * in other regulations.
 */
export function getEquivalentQuestions(
  regulationId: string,
  questionId: string
): Array<{
  regulationId: string;
  questionIds: string[];
  topic: string;
  topicKey: string;
  confidence: EquivalenceConfidence;
}> {
  const results: Array<{
    regulationId: string;
    questionIds: string[];
    topic: string;
    topicKey: string;
    confidence: EquivalenceConfidence;
  }> = [];

  for (const equiv of QUESTION_EQUIVALENCES) {
    const regQuestions = equiv.questions[regulationId];
    if (!regQuestions || !regQuestions.includes(questionId)) continue;

    // Found a match - return all OTHER regulations in this topic
    for (const [otherRegId, otherQuestionIds] of Object.entries(equiv.questions)) {
      if (otherRegId === regulationId) continue;
      results.push({
        regulationId: otherRegId,
        questionIds: otherQuestionIds,
        topic: equiv.topic,
        topicKey: equiv.topicKey,
        confidence: equiv.confidence,
      });
    }
  }

  return results;
}

/**
 * Get all question IDs for a regulation that have equivalences.
 */
export function getDeduplicableQuestions(regulationId: string): Set<string> {
  const result = new Set<string>();
  for (const equiv of QUESTION_EQUIVALENCES) {
    const regQuestions = equiv.questions[regulationId];
    if (regQuestions) {
      for (const qId of regQuestions) {
        result.add(qId);
      }
    }
  }
  return result;
}
