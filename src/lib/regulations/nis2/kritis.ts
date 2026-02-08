/**
 * KRITIS-Specific Requirements Module
 *
 * Additional obligations for operators of critical infrastructure
 * beyond standard NIS2 requirements.
 *
 * Legal basis: §31, §39 BSIG (BGBl. 2025 I Nr. 301)
 */

export interface KritisRequirement {
  id: string;
  titleKey: string;
  descriptionKey: string;
  legalReference: string;
  additionalToNis2: boolean;
}

export interface KritisEvidenceRequirement {
  id: string;
  textKey: string;
  deadlineKey: string;
  legalReference: string;
}

/**
 * Additional KRITIS requirements beyond §30 BSIG
 */
export const KRITIS_REQUIREMENTS: KritisRequirement[] = [
  {
    id: 'attack-detection',
    titleKey: 'kritis.requirements.attackDetection.title',
    descriptionKey: 'kritis.requirements.attackDetection.description',
    legalReference: '§31 Abs. 1 BSIG',
    additionalToNis2: true,
  },
  {
    id: 'continuous-monitoring',
    titleKey: 'kritis.requirements.continuousMonitoring.title',
    descriptionKey: 'kritis.requirements.continuousMonitoring.description',
    legalReference: '§31 Abs. 1 Satz 2 BSIG',
    additionalToNis2: true,
  },
  {
    id: 'narrow-scope',
    titleKey: 'kritis.requirements.narrowScope.title',
    descriptionKey: 'kritis.requirements.narrowScope.description',
    legalReference: '§31 Abs. 1 BSIG',
    additionalToNis2: false,
  },
  {
    id: 'evidence-obligation',
    titleKey: 'kritis.requirements.evidenceObligation.title',
    descriptionKey: 'kritis.requirements.evidenceObligation.description',
    legalReference: '§39 Abs. 1 BSIG',
    additionalToNis2: true,
  },
  {
    id: 'bsi-audits',
    titleKey: 'kritis.requirements.bsiAudits.title',
    descriptionKey: 'kritis.requirements.bsiAudits.description',
    legalReference: '§39 Abs. 1 BSIG',
    additionalToNis2: true,
  },
  {
    id: 'higher-penalties',
    titleKey: 'kritis.requirements.higherPenalties.title',
    descriptionKey: 'kritis.requirements.higherPenalties.description',
    legalReference: '§65 Abs. 2 BSIG',
    additionalToNis2: false,
  },
];

/**
 * Evidence requirements specifically for KRITIS operators
 */
export const KRITIS_EVIDENCE: KritisEvidenceRequirement[] = [
  {
    id: 'initial-evidence',
    textKey: 'kritis.evidence.initialEvidence',
    deadlineKey: 'kritis.evidence.initialDeadline',
    legalReference: '§39 Abs. 1 Satz 1 BSIG',
  },
  {
    id: 'regular-evidence',
    textKey: 'kritis.evidence.regularEvidence',
    deadlineKey: 'kritis.evidence.regularDeadline',
    legalReference: '§39 Abs. 1 Satz 2 BSIG',
  },
  {
    id: 'deficiency-remediation',
    textKey: 'kritis.evidence.deficiencyRemediation',
    deadlineKey: 'kritis.evidence.remediationDeadline',
    legalReference: '§39 Abs. 3 BSIG',
  },
];

/**
 * Comparison: KRITIS operator vs. standard NIS2 entity
 */
export const KRITIS_COMPARISON = {
  headers: {
    aspectKey: 'kritis.comparison.aspect',
    standardKey: 'kritis.comparison.standard',
    kritisKey: 'kritis.comparison.kritis',
  },
  rows: [
    {
      aspectKey: 'kritis.comparison.rows.measures',
      standardKey: 'kritis.comparison.rows.measuresStandard',
      kritisKey: 'kritis.comparison.rows.measuresKritis',
    },
    {
      aspectKey: 'kritis.comparison.rows.detection',
      standardKey: 'kritis.comparison.rows.detectionStandard',
      kritisKey: 'kritis.comparison.rows.detectionKritis',
    },
    {
      aspectKey: 'kritis.comparison.rows.evidence',
      standardKey: 'kritis.comparison.rows.evidenceStandard',
      kritisKey: 'kritis.comparison.rows.evidenceKritis',
    },
    {
      aspectKey: 'kritis.comparison.rows.audits',
      standardKey: 'kritis.comparison.rows.auditsStandard',
      kritisKey: 'kritis.comparison.rows.auditsKritis',
    },
    {
      aspectKey: 'kritis.comparison.rows.penalties',
      standardKey: 'kritis.comparison.rows.penaltiesStandard',
      kritisKey: 'kritis.comparison.rows.penaltiesKritis',
    },
  ],
};
