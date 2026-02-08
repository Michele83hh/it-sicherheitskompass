/**
 * DSGVO/NIS2 Overlap Analysis
 *
 * Maps NIS2 requirements to existing GDPR (DSGVO) compliance measures,
 * helping companies identify where existing GDPR work covers NIS2 requirements.
 *
 * ~50% overlap (research-validated). Key limitation: DSGVO protects personal
 * data only; NIS2 protects ALL network/information systems incl. OT/ICS/SCADA.
 *
 * Sources: BDO, secjur, datenschutz-praxis, dr-datenschutz, Webersohn & Scholtz,
 * isms.online, Conformance.dk, NIS2 Art. 35 (NIS2/DSGVO interface).
 */

export interface OverlapMapping {
  id: string;
  nis2Requirement: string;
  nis2Reference: string;
  dsgvoEquivalent: string;
  dsgvoReference: string;
  overlapPercentage: number; // 0-100 estimate
  noteKey: string;
}

export const NIS2_DSGVO_OVERLAPS: OverlapMapping[] = [
  {
    id: 'risk-assessment',
    nis2Requirement: 'dsgvoOverlap.mappings.riskAssessment.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. a NIS2-RL, §30 Abs. 2 Nr. 1 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.riskAssessment.dsgvo',
    dsgvoReference: 'Art. 24 Abs. 1, Art. 32 Abs. 1, Art. 35 DSGVO',
    overlapPercentage: 65, // DSFA covers personal data only, NIS2 requires enterprise-wide assessment
    noteKey: 'dsgvoOverlap.mappings.riskAssessment.note',
  },
  {
    id: 'incident-handling',
    nis2Requirement: 'dsgvoOverlap.mappings.incidentHandling.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. b NIS2-RL, §32 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.incidentHandling.dsgvo',
    dsgvoReference: 'Art. 32 Abs. 1 lit. c, Art. 33, Art. 34 DSGVO',
    overlapPercentage: 55, // Different timelines (24h/72h/1mo vs 72h), recipients (BSI vs DSB), triggers
    noteKey: 'dsgvoOverlap.mappings.incidentHandling.note',
  },
  {
    id: 'business-continuity',
    nis2Requirement: 'dsgvoOverlap.mappings.businessContinuity.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. c NIS2-RL, §30 Abs. 2 Nr. 3 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.businessContinuity.dsgvo',
    dsgvoReference: 'Art. 32 Abs. 1 lit. b, c, d DSGVO',
    overlapPercentage: 40, // DSGVO only covers availability of personal data systems, not full BCM/crisis mgmt
    noteKey: 'dsgvoOverlap.mappings.businessContinuity.note',
  },
  {
    id: 'supply-chain',
    nis2Requirement: 'dsgvoOverlap.mappings.supplyChain.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. d NIS2-RL, §30 Abs. 2 Nr. 4 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.supplyChain.dsgvo',
    dsgvoReference: 'Art. 28, Art. 28 Abs. 3, Art. 32 DSGVO',
    overlapPercentage: 50, // Art. 28 covers data processors only; NIS2 covers ALL suppliers incl. hardware/SW
    noteKey: 'dsgvoOverlap.mappings.supplyChain.note',
  },
  {
    id: 'security-measures',
    nis2Requirement: 'dsgvoOverlap.mappings.securityMeasures.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. e NIS2-RL, §30 Abs. 2 Nr. 5 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.securityMeasures.dsgvo',
    dsgvoReference: 'Art. 25, Art. 32, Art. 35 DSGVO',
    overlapPercentage: 40, // Privacy by Design ≠ Security by Design; NIS2 requires full SDLC + patch mgmt
    noteKey: 'dsgvoOverlap.mappings.securityMeasures.note',
  },
  {
    id: 'effectiveness',
    nis2Requirement: 'dsgvoOverlap.mappings.effectiveness.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. f NIS2-RL, §30 Abs. 2 Nr. 6 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.effectiveness.dsgvo',
    dsgvoReference: 'Art. 24 Abs. 1, Art. 32 Abs. 1 lit. d DSGVO',
    overlapPercentage: 50, // NIS2 demands pen-testing, red-teaming, continuous monitoring beyond DSGVO scope
    noteKey: 'dsgvoOverlap.mappings.effectiveness.note',
  },
  {
    id: 'training',
    nis2Requirement: 'dsgvoOverlap.mappings.training.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. g NIS2-RL, §30 Abs. 2 Nr. 7 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.training.dsgvo',
    dsgvoReference: 'Art. 29, Art. 32 Abs. 4, Art. 39 Abs. 1 lit. b DSGVO',
    overlapPercentage: 35, // DSGVO training is DSB-led awareness only; NIS2 requires full cyber hygiene + §38 mgmt training
    noteKey: 'dsgvoOverlap.mappings.training.note',
  },
  {
    id: 'encryption',
    nis2Requirement: 'dsgvoOverlap.mappings.encryption.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. h NIS2-RL, §30 Abs. 2 Nr. 8 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.encryption.dsgvo',
    dsgvoReference: 'Art. 32 Abs. 1 lit. a, Art. 34 Abs. 3 lit. a, ErwGr. 83 DSGVO',
    overlapPercentage: 65, // DSGVO names encryption as TOM but NIS2 requires full crypto policy + key mgmt lifecycle
    noteKey: 'dsgvoOverlap.mappings.encryption.note',
  },
  {
    id: 'access-control',
    nis2Requirement: 'dsgvoOverlap.mappings.accessControl.nis2',
    nis2Reference: 'Art. 21 Abs. 2 lit. i NIS2-RL, §30 Abs. 2 Nr. 9 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.accessControl.dsgvo',
    dsgvoReference: 'Art. 5 Abs. 1 lit. f, Art. 25, Art. 29, Art. 32 Abs. 1 DSGVO',
    overlapPercentage: 55, // Access control overlap strong for personal data; HR security + asset mgmt = 0% DSGVO
    noteKey: 'dsgvoOverlap.mappings.accessControl.note',
  },
  {
    id: 'documentation',
    nis2Requirement: 'dsgvoOverlap.mappings.documentation.nis2',
    nis2Reference: '§30 Abs. 1 BSIG',
    dsgvoEquivalent: 'dsgvoOverlap.mappings.documentation.dsgvo',
    dsgvoReference: 'Art. 30 DSGVO',
    overlapPercentage: 50,
    noteKey: 'dsgvoOverlap.mappings.documentation.note',
  },
];

/**
 * Calculate overall DSGVO overlap percentage
 */
export function calculateOverallOverlap(): number {
  const total = NIS2_DSGVO_OVERLAPS.reduce(
    (sum, m) => sum + m.overlapPercentage,
    0
  );
  return Math.round(total / NIS2_DSGVO_OVERLAPS.length);
}

/**
 * Key differences between NIS2 and DSGVO incident reporting
 */
export const REPORTING_COMPARISON = {
  nis2: {
    titleKey: 'dsgvoOverlap.reporting.nis2.title',
    authority: 'BSI',
    deadlines: ['24h (Erstmeldung)', '72h (Folgemeldung)', '1 Monat (Abschluss)'],
    trigger: 'dsgvoOverlap.reporting.nis2.trigger',
    scope: 'dsgvoOverlap.reporting.nis2.scope',
    legalBasis: '§32 BSIG',
  },
  dsgvo: {
    titleKey: 'dsgvoOverlap.reporting.dsgvo.title',
    authority: 'Datenschutzbehörde',
    deadlines: ['72h'],
    trigger: 'dsgvoOverlap.reporting.dsgvo.trigger',
    scope: 'dsgvoOverlap.reporting.dsgvo.scope',
    legalBasis: 'Art. 33, 34 DSGVO',
  },
};
