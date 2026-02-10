/**
 * BSI IT-Grundschutz Assessment Categories
 *
 * 10 categories based on the BSI IT-Grundschutz-Kompendium layer structure.
 * Each category maps to a specific layer (Schicht) of the Kompendium
 * and references the relevant BSI-Standards and building blocks.
 *
 * Reference: IT-Grundschutz-Kompendium Edition 2023
 * BSI-Standards: 200-1 (ISMS), 200-2 (Vorgehensweise), 200-3 (Risikoanalyse), 200-4 (BCM)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'isms',
    nameKey: 'bsiGrundschutz.categories.isms.name',
    shortNameKey: 'bsiGrundschutz.categories.isms.shortName',
    descriptionKey: 'bsiGrundschutz.categories.isms.description',
    bsiStandard: 'BSI-Standard 200-1',
    kompendiumLayer: 'ISMS',
    bsiBuildingBlocks: ['ISMS.1'],
    icon: 'ShieldCheck',
    questions: [],
  },
  {
    id: 'orp',
    nameKey: 'bsiGrundschutz.categories.orp.name',
    shortNameKey: 'bsiGrundschutz.categories.orp.shortName',
    descriptionKey: 'bsiGrundschutz.categories.orp.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'ORP',
    bsiBuildingBlocks: ['ORP.1', 'ORP.2', 'ORP.3', 'ORP.4', 'ORP.5'],
    icon: 'Users',
    questions: [],
  },
  {
    id: 'con',
    nameKey: 'bsiGrundschutz.categories.con.name',
    shortNameKey: 'bsiGrundschutz.categories.con.shortName',
    descriptionKey: 'bsiGrundschutz.categories.con.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'CON',
    bsiBuildingBlocks: ['CON.1', 'CON.3', 'CON.6', 'CON.8', 'CON.10'],
    icon: 'FileText',
    questions: [],
  },
  {
    id: 'ops',
    nameKey: 'bsiGrundschutz.categories.ops.name',
    shortNameKey: 'bsiGrundschutz.categories.ops.shortName',
    descriptionKey: 'bsiGrundschutz.categories.ops.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'OPS',
    bsiBuildingBlocks: ['OPS.1.1.3', 'OPS.1.1.4', 'OPS.1.1.5', 'OPS.1.1.6', 'OPS.1.2.2'],
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'der',
    nameKey: 'bsiGrundschutz.categories.der.name',
    shortNameKey: 'bsiGrundschutz.categories.der.shortName',
    descriptionKey: 'bsiGrundschutz.categories.der.description',
    bsiStandard: 'BSI-Standard 200-4',
    kompendiumLayer: 'DER',
    bsiBuildingBlocks: ['DER.1', 'DER.2.1', 'DER.2.2', 'DER.2.3', 'DER.4'],
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'app',
    nameKey: 'bsiGrundschutz.categories.app.name',
    shortNameKey: 'bsiGrundschutz.categories.app.shortName',
    descriptionKey: 'bsiGrundschutz.categories.app.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'APP',
    bsiBuildingBlocks: ['APP.1.1', 'APP.1.2', 'APP.3.1', 'APP.3.2', 'APP.5.3'],
    icon: 'AppWindow',
    questions: [],
  },
  {
    id: 'sys',
    nameKey: 'bsiGrundschutz.categories.sys.name',
    shortNameKey: 'bsiGrundschutz.categories.sys.shortName',
    descriptionKey: 'bsiGrundschutz.categories.sys.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'SYS',
    bsiBuildingBlocks: ['SYS.1.1', 'SYS.2.1', 'SYS.3.1', 'SYS.4.1'],
    icon: 'Server',
    questions: [],
  },
  {
    id: 'net',
    nameKey: 'bsiGrundschutz.categories.net.name',
    shortNameKey: 'bsiGrundschutz.categories.net.shortName',
    descriptionKey: 'bsiGrundschutz.categories.net.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'NET',
    bsiBuildingBlocks: ['NET.1.1', 'NET.1.2', 'NET.3.1', 'NET.4.1', 'NET.4.2'],
    icon: 'Network',
    questions: [],
  },
  {
    id: 'inf',
    nameKey: 'bsiGrundschutz.categories.inf.name',
    shortNameKey: 'bsiGrundschutz.categories.inf.shortName',
    descriptionKey: 'bsiGrundschutz.categories.inf.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'INF',
    bsiBuildingBlocks: ['INF.1', 'INF.2', 'INF.5', 'INF.7', 'INF.9'],
    icon: 'Building2',
    questions: [],
  },
  {
    id: 'ind',
    nameKey: 'bsiGrundschutz.categories.ind.name',
    shortNameKey: 'bsiGrundschutz.categories.ind.shortName',
    descriptionKey: 'bsiGrundschutz.categories.ind.description',
    bsiStandard: 'BSI-Standard 200-2',
    kompendiumLayer: 'IND',
    bsiBuildingBlocks: ['IND.1', 'IND.2.1', 'IND.2.2', 'IND.2.7'],
    icon: 'Factory',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
