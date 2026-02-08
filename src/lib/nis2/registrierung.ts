/**
 * NIS2 Registrierungshilfe (Registration Guidance)
 *
 * Step-by-step guide for BSI Portal registration.
 * Portal live since 06.01.2026, deadline 06.03.2026.
 *
 * Legal basis: §33, §34 BSIG (BGBl. 2025 I Nr. 301)
 */

export interface RegistrationStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
  actionKey: string;
  url?: string;
}

export interface RequiredData {
  id: string;
  labelKey: string;
  descriptionKey: string;
  required: boolean;
}

/**
 * Registration timeline milestones
 */
export const REGISTRATION_TIMELINE = {
  portalLaunch: '2026-01-06',
  deadline: '2026-03-06',
  legalBasis: '§33 Abs. 1, §34 Abs. 1 BSIG',
};

/**
 * Step-by-step registration process
 */
export const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    id: 'step-1',
    titleKey: 'registrierung.steps.checkAffected.title',
    descriptionKey: 'registrierung.steps.checkAffected.description',
    actionKey: 'registrierung.steps.checkAffected.action',
  },
  {
    id: 'step-2',
    titleKey: 'registrierung.steps.prepareMuk.title',
    descriptionKey: 'registrierung.steps.prepareMuk.description',
    actionKey: 'registrierung.steps.prepareMuk.action',
    url: 'https://mein-unternehmenskonto.de',
  },
  {
    id: 'step-3',
    titleKey: 'registrierung.steps.gatherData.title',
    descriptionKey: 'registrierung.steps.gatherData.description',
    actionKey: 'registrierung.steps.gatherData.action',
  },
  {
    id: 'step-4',
    titleKey: 'registrierung.steps.registerPortal.title',
    descriptionKey: 'registrierung.steps.registerPortal.description',
    actionKey: 'registrierung.steps.registerPortal.action',
    url: 'https://nis2-portal.bsi.bund.de',
  },
  {
    id: 'step-5',
    titleKey: 'registrierung.steps.designateContact.title',
    descriptionKey: 'registrierung.steps.designateContact.description',
    actionKey: 'registrierung.steps.designateContact.action',
  },
  {
    id: 'step-6',
    titleKey: 'registrierung.steps.confirm.title',
    descriptionKey: 'registrierung.steps.confirm.description',
    actionKey: 'registrierung.steps.confirm.action',
  },
];

/**
 * Required data for BSI registration
 */
export const REQUIRED_REGISTRATION_DATA: RequiredData[] = [
  { id: 'company-name', labelKey: 'registrierung.data.companyName', descriptionKey: 'registrierung.data.companyNameDesc', required: true },
  { id: 'legal-form', labelKey: 'registrierung.data.legalForm', descriptionKey: 'registrierung.data.legalFormDesc', required: true },
  { id: 'address', labelKey: 'registrierung.data.address', descriptionKey: 'registrierung.data.addressDesc', required: true },
  { id: 'sector', labelKey: 'registrierung.data.sector', descriptionKey: 'registrierung.data.sectorDesc', required: true },
  { id: 'subsector', labelKey: 'registrierung.data.subsector', descriptionKey: 'registrierung.data.subsectorDesc', required: true },
  { id: 'employees', labelKey: 'registrierung.data.employees', descriptionKey: 'registrierung.data.employeesDesc', required: true },
  { id: 'revenue', labelKey: 'registrierung.data.revenue', descriptionKey: 'registrierung.data.revenueDesc', required: true },
  { id: 'contact-person', labelKey: 'registrierung.data.contactPerson', descriptionKey: 'registrierung.data.contactPersonDesc', required: true },
  { id: 'contact-email', labelKey: 'registrierung.data.contactEmail', descriptionKey: 'registrierung.data.contactEmailDesc', required: true },
  { id: 'contact-phone', labelKey: 'registrierung.data.contactPhone', descriptionKey: 'registrierung.data.contactPhoneDesc', required: true },
  { id: 'eu-member-states', labelKey: 'registrierung.data.euMemberStates', descriptionKey: 'registrierung.data.euMemberStatesDesc', required: false },
  { id: 'ip-ranges', labelKey: 'registrierung.data.ipRanges', descriptionKey: 'registrierung.data.ipRangesDesc', required: false },
];
