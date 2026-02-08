/**
 * Geschäftsleitungsverantwortung (Management Accountability)
 *
 * Structured data for the §38 BSIG management obligations module.
 * Covers personal liability, training requirements, and approval duties.
 *
 * Legal basis: §38 BSIG (BGBl. 2025 I Nr. 301)
 * EU basis: Art. 20 NIS2-RL (EU 2022/2555)
 */

export interface ManagementDuty {
  id: string;
  titleKey: string;
  descriptionKey: string;
  legalReference: string;
  consequenceKey: string;
}

export interface ManagementChecklistItem {
  id: string;
  textKey: string;
  categoryKey: string;
}

/**
 * Three core duties of management under §38 BSIG
 */
export const MANAGEMENT_DUTIES: ManagementDuty[] = [
  {
    id: 'implement',
    titleKey: 'geschaeftsleitung.duties.implement.title',
    descriptionKey: 'geschaeftsleitung.duties.implement.description',
    legalReference: '§38 Abs. 1 Satz 1 BSIG',
    consequenceKey: 'geschaeftsleitung.duties.implement.consequence',
  },
  {
    id: 'monitor',
    titleKey: 'geschaeftsleitung.duties.monitor.title',
    descriptionKey: 'geschaeftsleitung.duties.monitor.description',
    legalReference: '§38 Abs. 1 Satz 1 BSIG',
    consequenceKey: 'geschaeftsleitung.duties.monitor.consequence',
  },
  {
    id: 'train',
    titleKey: 'geschaeftsleitung.duties.train.title',
    descriptionKey: 'geschaeftsleitung.duties.train.description',
    legalReference: '§38 Abs. 3 BSIG',
    consequenceKey: 'geschaeftsleitung.duties.train.consequence',
  },
];

/**
 * Key legal facts about management liability
 */
export const LIABILITY_FACTS = {
  personalLiability: {
    titleKey: 'geschaeftsleitung.liability.personal.title',
    textKey: 'geschaeftsleitung.liability.personal.text',
    legalReference: '§38 Abs. 2 BSIG',
  },
  noWaiverAllowed: {
    titleKey: 'geschaeftsleitung.liability.noWaiver.title',
    textKey: 'geschaeftsleitung.liability.noWaiver.text',
    legalReference: '§38 Abs. 2 Satz 2 BSIG',
  },
  trainingObligation: {
    titleKey: 'geschaeftsleitung.liability.training.title',
    textKey: 'geschaeftsleitung.liability.training.text',
    legalReference: '§38 Abs. 3 BSIG',
  },
};

/**
 * Management checklist items organized by category
 */
export const MANAGEMENT_CHECKLIST: ManagementChecklistItem[] = [
  // Governance
  { id: 'gl-1', textKey: 'geschaeftsleitung.checklist.approveRiskMeasures', categoryKey: 'geschaeftsleitung.checklistCategories.governance' },
  { id: 'gl-2', textKey: 'geschaeftsleitung.checklist.assignResponsibility', categoryKey: 'geschaeftsleitung.checklistCategories.governance' },
  { id: 'gl-3', textKey: 'geschaeftsleitung.checklist.allocateBudget', categoryKey: 'geschaeftsleitung.checklistCategories.governance' },
  // Training
  { id: 'gl-4', textKey: 'geschaeftsleitung.checklist.completeTraining', categoryKey: 'geschaeftsleitung.checklistCategories.training' },
  { id: 'gl-5', textKey: 'geschaeftsleitung.checklist.documentTraining', categoryKey: 'geschaeftsleitung.checklistCategories.training' },
  { id: 'gl-6', textKey: 'geschaeftsleitung.checklist.scheduleAnnualTraining', categoryKey: 'geschaeftsleitung.checklistCategories.training' },
  // Monitoring
  { id: 'gl-7', textKey: 'geschaeftsleitung.checklist.reviewSecurityReports', categoryKey: 'geschaeftsleitung.checklistCategories.monitoring' },
  { id: 'gl-8', textKey: 'geschaeftsleitung.checklist.reviewIncidents', categoryKey: 'geschaeftsleitung.checklistCategories.monitoring' },
  { id: 'gl-9', textKey: 'geschaeftsleitung.checklist.reviewAuditResults', categoryKey: 'geschaeftsleitung.checklistCategories.monitoring' },
  // Legal
  { id: 'gl-10', textKey: 'geschaeftsleitung.checklist.ensureRegistration', categoryKey: 'geschaeftsleitung.checklistCategories.legal' },
  { id: 'gl-11', textKey: 'geschaeftsleitung.checklist.ensureReportingProcess', categoryKey: 'geschaeftsleitung.checklistCategories.legal' },
  { id: 'gl-12', textKey: 'geschaeftsleitung.checklist.documentLiabilityAwareness', categoryKey: 'geschaeftsleitung.checklistCategories.legal' },
];
