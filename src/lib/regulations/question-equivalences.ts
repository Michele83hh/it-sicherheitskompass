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
 * Core topic equivalences across all 15 regulations.
 *
 * ~10 topics, ~100 question equivalences total.
 */
export const QUESTION_EQUIVALENCES: QuestionEquivalence[] = [
  // ─── 1. Risk Management / Risikomanagement ───
  {
    topic: 'risk_inventory',
    topicKey: 'dedup.topics.riskInventory',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q1', 'ra-q4'],      // IT-Risikoinventar, Asset-Inventar
      'kritis': ['rm-q1', 'rm-q2'],     // Risikomanagement
      'dora': ['irm-q1', 'irm-q2'],     // ICT Risk Management
      'iso27001': ['iso-pr-q1', 'iso-pr-q2'], // Planning/Risk
      'bsi-grundschutz': ['isms-q1', 'isms-q2'], // ISMS
      'soc2': ['gov-q1', 'gov-q2'],     // Risk Management/Governance
      'tisax': ['org-q1', 'org-q2'],     // Organisation
      'nist-csf': ['nist-id-q1', 'nist-id-q2'], // Identify
      'c5': ['c5-org-q1', 'c5-org-q2'], // Organisation
      'dsgvo': ['dsfa-q1'],             // DSFA
    },
  },
  {
    topic: 'risk_treatment',
    topicKey: 'dedup.topics.riskTreatment',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q5'],               // Risikobehandlungsmaßnahmen
      'kritis': ['rm-q3', 'rm-q4'],    // Risikomanagement
      'dora': ['irm-q3', 'irm-q4'],    // ICT Risk Management
      'iso27001': ['iso-pr-q3', 'iso-pr-q4'], // Planning/Risk
      'bsi-grundschutz': ['isms-q3'],   // ISMS
      'soc2': ['gov-q3', 'gov-q4'],    // Risk Management
      'nist-csf': ['nist-id-q3'],       // Identify
      'c5': ['c5-org-q3', 'c5-org-q4'], // Organisation
    },
  },
  {
    topic: 'security_responsibilities',
    topicKey: 'dedup.topics.securityResponsibilities',
    confidence: 'high',
    questions: {
      'nis2': ['ra-q3'],               // Verantwortlichkeiten festgelegt
      'dora': ['gov-q1', 'gov-q2'],    // Governance
      'iso27001': ['iso-cl-q1', 'iso-cl-q2'], // Context/Leadership
      'bsi-grundschutz': ['orp-q1'],    // Organisation/Personal
      'tisax': ['org-q3'],             // Organisation
      'soc2': ['gov-q1'],             // Governance
      'nist-csf': ['nist-gv-q1', 'nist-gv-q2'], // Govern
      'c5': ['c5-org-q1'],            // Organisation
    },
  },

  // ─── 2. Incident Response / Vorfallbehandlung ───
  {
    topic: 'incident_response_plan',
    topicKey: 'dedup.topics.incidentResponsePlan',
    confidence: 'high',
    questions: {
      'nis2': ['ih-q1'],              // Verfahren bei Cyberangriff
      'kritis': ['vm-q1'],            // Vorfallmanagement
      'dora': ['vm-q1'],              // Vorfallmanagement
      'iso27001': ['iso-ic-q1'],       // Incident/Continuity
      'bsi-grundschutz': ['der-q1'],   // Detektion/Reaktion
      'soc2': ['sec-q3'],             // Security
      'c5': ['c5-sim-q1'],            // Security Incident Management
      'nist-csf': ['nist-rs-q1'],      // Respond
    },
  },
  {
    topic: 'incident_logging',
    topicKey: 'dedup.topics.incidentLogging',
    confidence: 'high',
    questions: {
      'nis2': ['ih-q3'],              // Vorfälle protokolliert
      'kritis': ['vm-q2', 'vm-q3'],   // Vorfallmanagement
      'dora': ['vm-q2', 'vm-q3'],     // Vorfallmanagement
      'iso27001': ['iso-ic-q2'],       // Incident
      'bsi-grundschutz': ['der-q2'],   // Detektion
      'soc2': ['mon-q1'],             // Monitoring
      'c5': ['c5-sim-q2'],            // SIM
      'nist-csf': ['nist-rs-q2'],      // Respond
      'owasp-asvs': ['owasp-el-q1'],  // Error/Logging
    },
  },
  {
    topic: 'incident_reporting',
    topicKey: 'dedup.topics.incidentReporting',
    confidence: 'high',
    questions: {
      'nis2': ['ih-q4'],              // Meldepflicht-Kriterien
      'kritis': ['bsi-q1', 'bsi-q2'], // BSI-Kontaktstelle/Meldung
      'dora': ['vm-q4', 'vm-q5'],     // Vorfallmanagement (Meldung)
      'dsgvo': ['br-q1', 'br-q2'],    // Breach Notification 72h
      'iso27001': ['iso-ic-q3'],       // Incident
      'bsi-grundschutz': ['der-q3'],   // Detektion/Reaktion
      'c5': ['c5-sim-q3'],            // SIM
      'nist-csf': ['nist-rs-q3'],      // Respond
    },
  },

  // ─── 3. Business Continuity / BCM ───
  {
    topic: 'backup_strategy',
    topicKey: 'dedup.topics.backupStrategy',
    confidence: 'exact',
    questions: {
      'nis2': ['bc-q1'],              // Regelmäßige Backups
      'kritis': ['bcm-q1'],           // BCM
      'iso27001': ['iso-op-q1'],       // Operations
      'soc2': ['avl-q1'],             // Availability
      'nist-csf': ['nist-rc-q1'],      // Recover
      'iso22301': ['bcm-br-q1'],       // Business Recovery
      'bsi-grundschutz': ['con-q1'],   // CON (Continuity)
    },
  },
  {
    topic: 'business_continuity_plan',
    topicKey: 'dedup.topics.businessContinuityPlan',
    confidence: 'high',
    questions: {
      'nis2': ['bc-q3'],              // Notfallplan
      'kritis': ['bcm-q2', 'bcm-q3'], // BCM
      'dora': ['da-q1', 'da-q2'],     // Digital Resilience (Drittanbieter -> actually continuity)
      'iso27001': ['iso-op-q2', 'iso-op-q3'], // Operations
      'soc2': ['avl-q2', 'avl-q3'],   // Availability
      'nist-csf': ['nist-rc-q2', 'nist-rc-q3'], // Recover
      'iso22301': ['bcm-pl-q1', 'bcm-pl-q2', 'bcm-pl-q3'], // BCM Planning
      'bsi-grundschutz': ['con-q2', 'con-q3'], // CON
    },
  },
  {
    topic: 'business_impact_analysis',
    topicKey: 'dedup.topics.businessImpactAnalysis',
    confidence: 'high',
    questions: {
      'nis2': ['bc-q4'],              // BIA
      'kritis': ['bcm-q4'],           // BCM (BIA)
      'iso22301': ['bcm-cl-q1', 'bcm-cl-q2'], // Context/Leadership
      'dora': ['irm-q5'],             // ICT Risk Management (impact)
      'soc2': ['avl-q4'],             // Availability
    },
  },

  // ─── 4. Access Control / Zugriffskontrolle ───
  {
    topic: 'access_control',
    topicKey: 'dedup.topics.accessControl',
    confidence: 'high',
    questions: {
      'nis2': ['ac-q1', 'ac-q2'],     // Autorisierte Personen, Rechte prüfen
      'dora': ['ia-q1', 'ia-q2'],     // Informationsaustausch/Access
      'iso27001': ['iso-ac-q1', 'iso-ac-q2'], // Access Control
      'pci-dss': ['ac-q1', 'ac-q2'],  // Access Control
      'tisax': ['zk-q1', 'zk-q2'],    // Zugriffskontrolle
      'c5': ['c5-idm-q1', 'c5-idm-q2'], // Identity Management
      'owasp-asvs': ['owasp-ac-q1', 'owasp-ac-q2'], // Access Control
      'bsi-grundschutz': ['sys-q1', 'sys-q2'], // Systeme
      'soc2': ['conf-q1', 'conf-q2'], // Confidentiality
    },
  },
  {
    topic: 'privileged_access',
    topicKey: 'dedup.topics.privilegedAccess',
    confidence: 'high',
    questions: {
      'nis2': ['ac-q4'],              // Admin-Accounts
      'iso27001': ['iso-ac-q3', 'iso-ac-q4'], // Access Control (PAM)
      'pci-dss': ['ac-q3'],           // Access Control
      'tisax': ['zk-q3'],             // Zugriffskontrolle
      'c5': ['c5-idm-q3'],            // Identity Management
      'owasp-asvs': ['owasp-ac-q3'],  // Access Control
    },
  },

  // ─── 5. MFA / Multi-Faktor-Authentifizierung ───
  {
    topic: 'mfa',
    topicKey: 'dedup.topics.mfa',
    confidence: 'exact',
    questions: {
      'nis2': ['mc-q1'],              // MFA für kritische Systeme
      'owasp-asvs': ['owasp-auth-q1'], // Authentication
      'iso27001': ['iso-ac-q4'],       // Access Control (strong auth)
      'pci-dss': ['ac-q2'],           // MFA in PCI context
      'tisax': ['zk-q2'],             // Zugriffskontrolle (auth)
      'dora': ['ia-q3'],              // Access/Identity
      'cis-controls': ['cis-ic-q3'],   // Inventory/Control
    },
  },

  // ─── 6. Encryption / Verschlüsselung ───
  {
    topic: 'encryption',
    topicKey: 'dedup.topics.encryption',
    confidence: 'high',
    questions: {
      'nis2': ['cr-q1', 'cr-q2'],     // Verschlüsselung + Konzept
      'dsgvo': ['tom-q1'],            // TOM (Verschlüsselung)
      'tisax': ['kry-q1', 'kry-q2'],  // Kryptografie
      'owasp-asvs': ['owasp-crypto-q1', 'owasp-crypto-q2'], // Cryptography
      'c5': ['c5-kry-q1', 'c5-kry-q2'], // Kryptografie
      'iso27001': ['iso-cn-q1', 'iso-cn-q2'], // Cryptography/Network
      'pci-dss': ['dp-q1', 'dp-q2'],  // Data Protection
    },
  },
  {
    topic: 'key_management',
    topicKey: 'dedup.topics.keyManagement',
    confidence: 'high',
    questions: {
      'nis2': ['cr-q3', 'cr-q4'],     // Schlüsselverwaltung, Zertifikate
      'tisax': ['kry-q3'],            // Kryptografie
      'owasp-asvs': ['owasp-crypto-q3'], // Cryptography
      'c5': ['c5-kry-q3'],            // Kryptografie
      'iso27001': ['iso-cn-q3', 'iso-cn-q4'], // Crypto/Network
      'pci-dss': ['dp-q3', 'dp-q4'],  // Data Protection
    },
  },

  // ─── 7. Supply Chain / Lieferkette ───
  {
    topic: 'supply_chain_security',
    topicKey: 'dedup.topics.supplyChainSecurity',
    confidence: 'high',
    questions: {
      'nis2': ['sc-q1', 'sc-q2'],     // Lieferanten prüfen, Verträge
      'kritis': ['lk-q1', 'lk-q2'],   // Lieferkette
      'dora': ['da-q1', 'da-q2'],     // Drittanbieter
      'iso27001': ['iso-ps-q1', 'iso-ps-q2'], // Partner/Supplier
      'tisax': ['lief-q1', 'lief-q2'], // Lieferkette
      'pci-dss': ['sp-q1', 'sp-q2'],  // Service Provider
      'cis-controls': ['cis-sc-q1', 'cis-sc-q2'], // Service/Supply Chain
      'dsgvo': ['av-q1', 'av-q2'],    // Auftragsverarbeitung
    },
  },
  {
    topic: 'supply_chain_assessment',
    topicKey: 'dedup.topics.supplyChainAssessment',
    confidence: 'high',
    questions: {
      'nis2': ['sc-q4', 'sc-q5'],     // Unterauftragnehmer, Neubewertung
      'kritis': ['lk-q3', 'lk-q4'],   // Lieferkette
      'dora': ['da-q3', 'da-q4', 'da-q5'], // Drittanbieter
      'iso27001': ['iso-ps-q3'],       // Partner/Supplier
      'tisax': ['lief-q3'],           // Lieferkette
      'pci-dss': ['sp-q3'],           // Service Provider
      'cis-controls': ['cis-sc-q3'],   // Supply Chain
      'dsgvo': ['av-q3', 'av-q4'],    // Auftragsverarbeitung
    },
  },

  // ─── 8. Security Training / Schulung ───
  {
    topic: 'security_awareness',
    topicKey: 'dedup.topics.securityAwareness',
    confidence: 'high',
    questions: {
      'nis2': ['ea-q1', 'ea-q2'],     // Mitarbeiter geschult, Richtlinien
      'bsi-grundschutz': ['orp-q1', 'orp-q2'], // Organisation/Personal
      'iso27001': ['iso-sa-q1', 'iso-sa-q2'], // Support/Awareness
      'tisax': ['per-q1', 'per-q2'],   // Personal
      'cis-controls': ['cis-so-q1', 'cis-so-q2'], // Security Organization
      'soc2': ['sec-q1', 'sec-q2'],   // Security
      'nist-csf': ['nist-pr-q1', 'nist-pr-q2'], // Protect
      'dora': ['gov-q3', 'gov-q4'],   // Governance (Training)
    },
  },
  {
    topic: 'management_training',
    topicKey: 'dedup.topics.managementTraining',
    confidence: 'high',
    questions: {
      'nis2': ['ea-q5'],              // Geschäftsleitungs-Schulung
      'dora': ['gov-q5'],             // Governance
      'iso27001': ['iso-cl-q3', 'iso-cl-q4'], // Context/Leadership
      'nist-csf': ['nist-gv-q3'],      // Govern
      'bsi-grundschutz': ['orp-q3'],   // Organisation/Personal
    },
  },

  // ─── 9. Vulnerability Management / Schwachstellenmanagement ───
  {
    topic: 'patch_management',
    topicKey: 'dedup.topics.patchManagement',
    confidence: 'exact',
    questions: {
      'nis2': ['ad-q1'],              // Sicherheitsupdates zeitnah
      'cra': ['swm-q1', 'swm-q2'],   // Software Maintenance
      'pci-dss': ['vm-q1', 'vm-q2'],  // Vulnerability Management
      'cis-controls': ['cis-vm-q1', 'cis-vm-q2'], // Vulnerability Management
      'bsi-grundschutz': ['ops-q1', 'ops-q2'], // Betrieb (Patching)
      'kritis': ['sh-q1'],            // Systemhärtung
    },
  },
  {
    topic: 'vulnerability_scanning',
    topicKey: 'dedup.topics.vulnerabilityScanning',
    confidence: 'high',
    questions: {
      'nis2': ['ch-q2'],              // Penetrationstests/Schwachstellenscans
      'dora': ['rt-q1', 'rt-q2'],     // Resilience Testing
      'pci-dss': ['mt-q1', 'mt-q2'],  // Maintenance/Testing
      'cis-controls': ['cis-vm-q3'],   // Vulnerability Management
      'cra': ['vm-q1', 'vm-q2'],      // Vulnerability Management
      'kritis': ['au-q1'],            // Audit
      'owasp-asvs': ['owasp-iv-q1', 'owasp-iv-q2'], // Input Validation
    },
  },

  // ─── 10. Monitoring / Überwachung ───
  {
    topic: 'security_monitoring',
    topicKey: 'dedup.topics.securityMonitoring',
    confidence: 'high',
    questions: {
      'nis2': ['ch-q1'],              // Sicherheitsmaßnahmen prüfen
      'soc2': ['mon-q1', 'mon-q2'],   // Monitoring
      'bsi-grundschutz': ['ops-q3'],   // Betrieb
      'nist-csf': ['nist-de-q1', 'nist-de-q2'], // Detect
      'owasp-asvs': ['owasp-el-q1', 'owasp-el-q2'], // Error/Logging
      'kritis': ['au-q2', 'au-q3'],   // Audit
      'iso27001': ['iso-op-q3', 'iso-op-q4'], // Operations
      'c5': ['c5-ops-q1', 'c5-ops-q2'], // Operations
      'cis-controls': ['cis-rn-q1', 'cis-rn-q2'], // Resilience/Monitoring
    },
  },
  {
    topic: 'security_kpis',
    topicKey: 'dedup.topics.securityKpis',
    confidence: 'high',
    questions: {
      'nis2': ['ch-q5'],              // KPIs
      'soc2': ['mon-q3'],             // Monitoring
      'nist-csf': ['nist-de-q3'],      // Detect
      'iso27001': ['iso-cl-q4'],       // Context/Leadership (performance)
      'c5': ['c5-ops-q3'],            // Operations
      'cis-controls': ['cis-rn-q3'],   // Resilience
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
