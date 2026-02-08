/**
 * TISAX Assessment Categories
 *
 * 12 categories based on VDA ISA (Information Security Assessment) v6.0
 * and ISO/IEC 27001:2022 control domains.
 *
 * Standard references:
 * - VDA ISA v6.0 (Verband der Automobilindustrie)
 * - ISO/IEC 27001:2022 Annex A
 */

import type { TisaxCategory } from './types';

export const CATEGORIES: TisaxCategory[] = [
  {
    id: 'organisation',
    nameKey: 'tisax.categories.organisation.name',
    shortNameKey: 'tisax.categories.organisation.shortName',
    descriptionKey: 'tisax.categories.organisation.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.5.1', 'A.5.2', 'A.5.3', 'A.5.4'],
    icon: 'Building2',
    questions: [],
  },
  {
    id: 'personal',
    nameKey: 'tisax.categories.personal.name',
    shortNameKey: 'tisax.categories.personal.shortName',
    descriptionKey: 'tisax.categories.personal.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.6.1', 'A.6.2', 'A.6.3', 'A.6.4'],
    icon: 'Users',
    questions: [],
  },
  {
    id: 'physische-sicherheit',
    nameKey: 'tisax.categories.physischeSicherheit.name',
    shortNameKey: 'tisax.categories.physischeSicherheit.shortName',
    descriptionKey: 'tisax.categories.physischeSicherheit.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.7.1', 'A.7.2', 'A.7.3', 'A.7.4'],
    icon: 'ShieldCheck',
    questions: [],
  },
  {
    id: 'technologie',
    nameKey: 'tisax.categories.technologie.name',
    shortNameKey: 'tisax.categories.technologie.shortName',
    descriptionKey: 'tisax.categories.technologie.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.8.1', 'A.8.2', 'A.8.3', 'A.8.4'],
    icon: 'Cpu',
    questions: [],
  },
  {
    id: 'prototypenschutz',
    nameKey: 'tisax.categories.prototypenschutz.name',
    shortNameKey: 'tisax.categories.prototypenschutz.shortName',
    descriptionKey: 'tisax.categories.prototypenschutz.description',
    vdaIsaModule: 'Prototypenschutz',
    iso27001Controls: ['A.7.1', 'A.7.2', 'A.5.10', 'A.5.12'],
    icon: 'Car',
    questions: [],
  },
  {
    id: 'datenschutz',
    nameKey: 'tisax.categories.datenschutz.name',
    shortNameKey: 'tisax.categories.datenschutz.shortName',
    descriptionKey: 'tisax.categories.datenschutz.description',
    vdaIsaModule: 'Datenschutz',
    iso27001Controls: ['A.5.34', 'A.5.35', 'A.5.36'],
    icon: 'Lock',
    questions: [],
  },
  {
    id: 'zugangskontrolle',
    nameKey: 'tisax.categories.zugangskontrolle.name',
    shortNameKey: 'tisax.categories.zugangskontrolle.shortName',
    descriptionKey: 'tisax.categories.zugangskontrolle.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.5.15', 'A.5.16', 'A.5.17', 'A.5.18', 'A.8.5'],
    icon: 'UserCheck',
    questions: [],
  },
  {
    id: 'kryptografie',
    nameKey: 'tisax.categories.kryptografie.name',
    shortNameKey: 'tisax.categories.kryptografie.shortName',
    descriptionKey: 'tisax.categories.kryptografie.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.8.24', 'A.8.25', 'A.8.26'],
    icon: 'KeyRound',
    questions: [],
  },
  {
    id: 'betriebssicherheit',
    nameKey: 'tisax.categories.betriebssicherheit.name',
    shortNameKey: 'tisax.categories.betriebssicherheit.shortName',
    descriptionKey: 'tisax.categories.betriebssicherheit.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.8.6', 'A.8.7', 'A.8.8', 'A.8.9'],
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'kommunikation',
    nameKey: 'tisax.categories.kommunikation.name',
    shortNameKey: 'tisax.categories.kommunikation.shortName',
    descriptionKey: 'tisax.categories.kommunikation.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.8.20', 'A.8.21', 'A.8.22', 'A.8.23'],
    icon: 'Network',
    questions: [],
  },
  {
    id: 'lieferanten',
    nameKey: 'tisax.categories.lieferanten.name',
    shortNameKey: 'tisax.categories.lieferanten.shortName',
    descriptionKey: 'tisax.categories.lieferanten.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.5.19', 'A.5.20', 'A.5.21', 'A.5.22'],
    icon: 'Link2',
    questions: [],
  },
  {
    id: 'compliance',
    nameKey: 'tisax.categories.compliance.name',
    shortNameKey: 'tisax.categories.compliance.shortName',
    descriptionKey: 'tisax.categories.compliance.description',
    vdaIsaModule: 'Informationssicherheit',
    iso27001Controls: ['A.5.31', 'A.5.32', 'A.5.33', 'A.5.36'],
    icon: 'ClipboardCheck',
    questions: [],
  },
];

export function getCategoryById(id: string): TisaxCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): TisaxCategory[] {
  return CATEGORIES;
}
