/**
 * DSGVO Assessment Categories
 *
 * 10 categories based on key DSGVO articles covering the core
 * data protection requirements. Each category maps to specific
 * DSGVO articles and their BDSG national implementations.
 *
 * Legal basis: Verordnung (EU) 2016/679 (DSGVO)
 * National implementation: Bundesdatenschutzgesetz (BDSG)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'dsfa',
    nameKey: 'dsgvo.categories.dsfa.name',
    shortNameKey: 'dsgvo.categories.dsfa.shortName',
    descriptionKey: 'dsgvo.categories.dsfa.description',
    dsgvoArticle: 'Art. 35-36 DSGVO',
    bdsgParagraph: '§67 BDSG',
    icon: 'FileSearch',
    questions: [], // Populated from QUESTIONS array
  },
  {
    id: 'verarbeitungsverzeichnis',
    nameKey: 'dsgvo.categories.verarbeitungsverzeichnis.name',
    shortNameKey: 'dsgvo.categories.verarbeitungsverzeichnis.shortName',
    descriptionKey: 'dsgvo.categories.verarbeitungsverzeichnis.description',
    dsgvoArticle: 'Art. 30 DSGVO',
    bdsgParagraph: '§70 BDSG',
    icon: 'ClipboardList',
    questions: [],
  },
  {
    id: 'einwilligung',
    nameKey: 'dsgvo.categories.einwilligung.name',
    shortNameKey: 'dsgvo.categories.einwilligung.shortName',
    descriptionKey: 'dsgvo.categories.einwilligung.description',
    dsgvoArticle: 'Art. 6-7 DSGVO',
    bdsgParagraph: '§26 BDSG',
    icon: 'CheckCircle',
    questions: [],
  },
  {
    id: 'betroffenenrechte',
    nameKey: 'dsgvo.categories.betroffenenrechte.name',
    shortNameKey: 'dsgvo.categories.betroffenenrechte.shortName',
    descriptionKey: 'dsgvo.categories.betroffenenrechte.description',
    dsgvoArticle: 'Art. 15-22 DSGVO',
    bdsgParagraph: '§34-37 BDSG',
    icon: 'Users',
    questions: [],
  },
  {
    id: 'datenschutzverletzung',
    nameKey: 'dsgvo.categories.datenschutzverletzung.name',
    shortNameKey: 'dsgvo.categories.datenschutzverletzung.shortName',
    descriptionKey: 'dsgvo.categories.datenschutzverletzung.description',
    dsgvoArticle: 'Art. 33-34 DSGVO',
    bdsgParagraph: '§65 BDSG',
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'dsb',
    nameKey: 'dsgvo.categories.dsb.name',
    shortNameKey: 'dsgvo.categories.dsb.shortName',
    descriptionKey: 'dsgvo.categories.dsb.description',
    dsgvoArticle: 'Art. 37-39 DSGVO',
    bdsgParagraph: '§38 BDSG',
    icon: 'UserCheck',
    questions: [],
  },
  {
    id: 'datentransfer',
    nameKey: 'dsgvo.categories.datentransfer.name',
    shortNameKey: 'dsgvo.categories.datentransfer.shortName',
    descriptionKey: 'dsgvo.categories.datentransfer.description',
    dsgvoArticle: 'Art. 44-49 DSGVO',
    bdsgParagraph: '§78-80 BDSG',
    icon: 'Globe',
    questions: [],
  },
  {
    id: 'toms',
    nameKey: 'dsgvo.categories.toms.name',
    shortNameKey: 'dsgvo.categories.toms.shortName',
    descriptionKey: 'dsgvo.categories.toms.description',
    dsgvoArticle: 'Art. 32 DSGVO',
    bdsgParagraph: '§64 BDSG',
    icon: 'Shield',
    questions: [],
  },
  {
    id: 'privacy-by-design',
    nameKey: 'dsgvo.categories.privacyByDesign.name',
    shortNameKey: 'dsgvo.categories.privacyByDesign.shortName',
    descriptionKey: 'dsgvo.categories.privacyByDesign.description',
    dsgvoArticle: 'Art. 25 DSGVO',
    bdsgParagraph: '§71 BDSG',
    icon: 'Settings',
    questions: [],
  },
  {
    id: 'auftragsverarbeitung',
    nameKey: 'dsgvo.categories.auftragsverarbeitung.name',
    shortNameKey: 'dsgvo.categories.auftragsverarbeitung.shortName',
    descriptionKey: 'dsgvo.categories.auftragsverarbeitung.description',
    dsgvoArticle: 'Art. 28-29 DSGVO',
    bdsgParagraph: '§62 BDSG',
    icon: 'FileText',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
