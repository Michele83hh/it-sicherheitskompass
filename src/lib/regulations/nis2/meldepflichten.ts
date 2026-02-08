/**
 * NIS2 Meldepflichten (Reporting Obligations)
 *
 * Structured data for the §32 BSIG incident reporting module.
 * Covers the three-tier reporting timeline and decision criteria.
 *
 * Legal basis: §32 BSIG (BGBl. 2025 I Nr. 301)
 * EU basis: Art. 23 NIS2-RL (EU 2022/2555)
 */

export interface ReportingStage {
  id: string;
  nameKey: string;
  deadlineKey: string;
  descriptionKey: string;
  contentKey: string;
  deadline: string; // e.g., "24h", "72h", "1 Monat"
  legalReference: string;
}

export interface IncidentCriterion {
  id: string;
  descriptionKey: string;
  examplesKey: string;
}

export const REPORTING_STAGES: ReportingStage[] = [
  {
    id: 'early-warning',
    nameKey: 'meldepflichten.stages.earlyWarning.name',
    deadlineKey: 'meldepflichten.stages.earlyWarning.deadline',
    descriptionKey: 'meldepflichten.stages.earlyWarning.description',
    contentKey: 'meldepflichten.stages.earlyWarning.content',
    deadline: '24h',
    legalReference: '§32 Abs. 1 Nr. 1 BSIG',
  },
  {
    id: 'full-notification',
    nameKey: 'meldepflichten.stages.fullNotification.name',
    deadlineKey: 'meldepflichten.stages.fullNotification.deadline',
    descriptionKey: 'meldepflichten.stages.fullNotification.description',
    contentKey: 'meldepflichten.stages.fullNotification.content',
    deadline: '72h',
    legalReference: '§32 Abs. 1 Nr. 2 BSIG',
  },
  {
    id: 'final-report',
    nameKey: 'meldepflichten.stages.finalReport.name',
    deadlineKey: 'meldepflichten.stages.finalReport.deadline',
    descriptionKey: 'meldepflichten.stages.finalReport.description',
    contentKey: 'meldepflichten.stages.finalReport.content',
    deadline: '1 Monat',
    legalReference: '§32 Abs. 1 Nr. 4 BSIG',
  },
];

/**
 * Criteria for a "significant security incident" per §32 Abs. 4 BSIG.
 */
export const INCIDENT_CRITERIA: IncidentCriterion[] = [
  {
    id: 'service-disruption',
    descriptionKey: 'meldepflichten.criteria.serviceDisruption.description',
    examplesKey: 'meldepflichten.criteria.serviceDisruption.examples',
  },
  {
    id: 'financial-loss',
    descriptionKey: 'meldepflichten.criteria.financialLoss.description',
    examplesKey: 'meldepflichten.criteria.financialLoss.examples',
  },
  {
    id: 'data-breach',
    descriptionKey: 'meldepflichten.criteria.dataBreach.description',
    examplesKey: 'meldepflichten.criteria.dataBreach.examples',
  },
  {
    id: 'other-entities',
    descriptionKey: 'meldepflichten.criteria.otherEntities.description',
    examplesKey: 'meldepflichten.criteria.otherEntities.examples',
  },
];

/**
 * Key contacts and reporting channels
 */
export const REPORTING_CONTACTS = {
  bsiMeldestelle: {
    nameKey: 'meldepflichten.contacts.bsi.name',
    urlKey: 'meldepflichten.contacts.bsi.url',
    url: 'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-Meldungen/nis-2-meldungen_node.html',
  },
  bsiPortal: {
    nameKey: 'meldepflichten.contacts.portal.name',
    urlKey: 'meldepflichten.contacts.portal.url',
    url: 'https://nis2-portal.bsi.bund.de',
  },
};

/**
 * DSGVO parallel reporting comparison
 */
export const PARALLEL_REPORTING = {
  nis2: {
    authority: 'BSI',
    deadline: '24h / 72h / 1 Monat',
    trigger: 'Erheblicher Sicherheitsvorfall (§32 Abs. 4 BSIG)',
    legalBasis: '§32 BSIG',
  },
  dsgvo: {
    authority: 'Zuständige Datenschutzbehörde',
    deadline: '72h',
    trigger: 'Verletzung des Schutzes personenbezogener Daten (Art. 33 DSGVO)',
    legalBasis: 'Art. 33, 34 DSGVO',
  },
};
