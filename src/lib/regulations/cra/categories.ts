/**
 * CRA (Cyber Resilience Act) Assessment Categories
 *
 * 8 categories based on the core CRA requirements for products with
 * digital elements. Each category maps to specific CRA articles and
 * corresponding harmonized standards.
 *
 * Legal basis: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
 * Standard references: EN 18031-1/2/3, ETSI EN 303 645
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'security-by-design',
    nameKey: 'cra.categories.securityByDesign.name',
    shortNameKey: 'cra.categories.securityByDesign.shortName',
    descriptionKey: 'cra.categories.securityByDesign.description',
    craArticle: 'Art. 10 CRA',
    harmonizedStandard: 'EN 18031-1',
    icon: 'ShieldCheck',
    questions: [], // Populated from QUESTIONS array
  },
  {
    id: 'schwachstellenmanagement',
    nameKey: 'cra.categories.schwachstellenmanagement.name',
    shortNameKey: 'cra.categories.schwachstellenmanagement.shortName',
    descriptionKey: 'cra.categories.schwachstellenmanagement.description',
    craArticle: 'Art. 11 CRA',
    harmonizedStandard: 'EN 18031-1, ISO/IEC 30111',
    icon: 'Bug',
    questions: [],
  },
  {
    id: 'sbom',
    nameKey: 'cra.categories.sbom.name',
    shortNameKey: 'cra.categories.sbom.shortName',
    descriptionKey: 'cra.categories.sbom.description',
    craArticle: 'Art. 10 Abs. 6 CRA',
    harmonizedStandard: 'NTIA SBOM Minimum Elements, CycloneDX/SPDX',
    icon: 'FileCode',
    questions: [],
  },
  {
    id: 'update-management',
    nameKey: 'cra.categories.updateManagement.name',
    shortNameKey: 'cra.categories.updateManagement.shortName',
    descriptionKey: 'cra.categories.updateManagement.description',
    craArticle: 'Art. 10 Abs. 12 CRA',
    harmonizedStandard: 'EN 18031-1, ETSI EN 303 645',
    icon: 'RefreshCw',
    questions: [],
  },
  {
    id: 'dokumentation',
    nameKey: 'cra.categories.dokumentation.name',
    shortNameKey: 'cra.categories.dokumentation.shortName',
    descriptionKey: 'cra.categories.dokumentation.description',
    craArticle: 'Art. 31 CRA',
    harmonizedStandard: 'EN ISO/IEC 17050-1',
    icon: 'FileText',
    questions: [],
  },
  {
    id: 'vorfall-meldung',
    nameKey: 'cra.categories.vorfallMeldung.name',
    shortNameKey: 'cra.categories.vorfallMeldung.shortName',
    descriptionKey: 'cra.categories.vorfallMeldung.description',
    craArticle: 'Art. 14 CRA',
    harmonizedStandard: 'ENISA Reporting Guidelines',
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'konformitaet',
    nameKey: 'cra.categories.konformitaet.name',
    shortNameKey: 'cra.categories.konformitaet.shortName',
    descriptionKey: 'cra.categories.konformitaet.description',
    craArticle: 'Art. 24-30 CRA',
    harmonizedStandard: 'EN ISO/IEC 17065, EU-Typenpruefung',
    icon: 'BadgeCheck',
    questions: [],
  },
  {
    id: 'support-lifecycle',
    nameKey: 'cra.categories.supportLifecycle.name',
    shortNameKey: 'cra.categories.supportLifecycle.shortName',
    descriptionKey: 'cra.categories.supportLifecycle.description',
    craArticle: 'Art. 10 Abs. 12 CRA',
    harmonizedStandard: 'EN 18031-1, IEC 62443-4-1',
    icon: 'Clock',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
