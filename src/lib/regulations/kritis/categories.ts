/**
 * KRITIS Gap Analysis Categories
 *
 * 8 categories based on BSI-Gesetz requirements for KRITIS operators.
 * Legal basis: §8a, §8b BSI-Gesetz; BSI-KritisV
 * BSI references: IT-Grundschutz-Kompendium Edition 2023
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'bsi-kontaktstelle',
    nameKey: 'kritis.categories.bsiKontaktstelle.name',
    shortNameKey: 'kritis.categories.bsiKontaktstelle.shortName',
    descriptionKey: 'kritis.categories.bsiKontaktstelle.description',
    bsigParagraph: '§8b BSI-Gesetz',
    bsiBuildingBlocks: ['ORP.1', 'DER.2.1'],
    icon: 'Phone',
    questions: [],
  },
  {
    id: 'risikomanagement',
    nameKey: 'kritis.categories.risikomanagement.name',
    shortNameKey: 'kritis.categories.risikomanagement.shortName',
    descriptionKey: 'kritis.categories.risikomanagement.description',
    bsigParagraph: '§8a Abs. 1 BSI-Gesetz',
    bsiBuildingBlocks: ['ISMS.1', 'ORP.1', 'DER.1'],
    icon: 'Shield',
    questions: [],
  },
  {
    id: 'vorfallmanagement',
    nameKey: 'kritis.categories.vorfallmanagement.name',
    shortNameKey: 'kritis.categories.vorfallmanagement.shortName',
    descriptionKey: 'kritis.categories.vorfallmanagement.description',
    bsigParagraph: '§8b Abs. 4 BSI-Gesetz',
    bsiBuildingBlocks: ['DER.2.1', 'DER.2.2', 'DER.2.3'],
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'bcm',
    nameKey: 'kritis.categories.bcm.name',
    shortNameKey: 'kritis.categories.bcm.shortName',
    descriptionKey: 'kritis.categories.bcm.description',
    bsigParagraph: '§8a Abs. 1 BSI-Gesetz',
    bsiBuildingBlocks: ['CON.3', 'DER.4', 'OPS.1.2.2'],
    icon: 'ServerCrash',
    questions: [],
  },
  {
    id: 'lieferkette',
    nameKey: 'kritis.categories.lieferkette.name',
    shortNameKey: 'kritis.categories.lieferkette.shortName',
    descriptionKey: 'kritis.categories.lieferkette.description',
    bsigParagraph: '§8a Abs. 1 BSI-Gesetz',
    bsiBuildingBlocks: ['ORP.1', 'OPS.1.1.3'],
    icon: 'Link2',
    questions: [],
  },
  {
    id: 'audit',
    nameKey: 'kritis.categories.audit.name',
    shortNameKey: 'kritis.categories.audit.shortName',
    descriptionKey: 'kritis.categories.audit.description',
    bsigParagraph: '§8a Abs. 3 BSI-Gesetz',
    bsiBuildingBlocks: ['ISMS.1', 'ORP.5'],
    icon: 'ClipboardCheck',
    questions: [],
  },
  {
    id: 'physische-sicherheit',
    nameKey: 'kritis.categories.physischeSicherheit.name',
    shortNameKey: 'kritis.categories.physischeSicherheit.shortName',
    descriptionKey: 'kritis.categories.physischeSicherheit.description',
    bsigParagraph: '§8a Abs. 1 BSI-Gesetz',
    bsiBuildingBlocks: ['INF.1', 'INF.2', 'INF.5'],
    icon: 'Building2',
    questions: [],
  },
  {
    id: 'systemhaertung',
    nameKey: 'kritis.categories.systemhaertung.name',
    shortNameKey: 'kritis.categories.systemhaertung.shortName',
    descriptionKey: 'kritis.categories.systemhaertung.description',
    bsigParagraph: '§8a Abs. 1 BSI-Gesetz',
    bsiBuildingBlocks: ['SYS.1.1', 'NET.1.1', 'OPS.1.1.3'],
    icon: 'HardDrive',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
