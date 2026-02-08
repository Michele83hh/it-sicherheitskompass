/**
 * DORA Pillar Categories
 *
 * 6 categories based on the 5 DORA pillars + Governance/Proportionality.
 *
 * Legal basis: Verordnung (EU) 2022/2554 (DORA)
 * Pillars: ICT Risk Management, Incident Management, Resilience Testing,
 *          Third-Party Risk Management, Information Sharing, Governance
 */

import type { DoraCategory } from './types';

export const CATEGORIES: DoraCategory[] = [
  {
    id: 'ict-risikomanagement',
    nameKey: 'dora.categories.ictRisikomanagement.name',
    shortNameKey: 'dora.categories.ictRisikomanagement.shortName',
    descriptionKey: 'dora.categories.ictRisikomanagement.description',
    doraArticles: 'Art. 5-16 DORA',
    rtsParagraph: 'RTS zu Art. 15 DORA (IKT-Risikomanagementrahmen)',
    icon: 'ShieldAlert',
    questions: [], // Populated from QUESTIONS array
  },
  {
    id: 'vorfallmanagement',
    nameKey: 'dora.categories.vorfallmanagement.name',
    shortNameKey: 'dora.categories.vorfallmanagement.shortName',
    descriptionKey: 'dora.categories.vorfallmanagement.description',
    doraArticles: 'Art. 17-23 DORA',
    rtsParagraph: 'RTS zu Art. 20 DORA (Meldung schwerwiegender IKT-Vorfaelle)',
    icon: 'AlertTriangle',
    questions: [],
  },
  {
    id: 'resilience-testing',
    nameKey: 'dora.categories.resilienceTesting.name',
    shortNameKey: 'dora.categories.resilienceTesting.shortName',
    descriptionKey: 'dora.categories.resilienceTesting.description',
    doraArticles: 'Art. 24-27 DORA',
    rtsParagraph: 'RTS zu Art. 26 DORA (TLPT - Threat-Led Penetration Testing)',
    icon: 'TestTube',
    questions: [],
  },
  {
    id: 'drittanbieter',
    nameKey: 'dora.categories.drittanbieter.name',
    shortNameKey: 'dora.categories.drittanbieter.shortName',
    descriptionKey: 'dora.categories.drittanbieter.description',
    doraArticles: 'Art. 28-44 DORA',
    rtsParagraph: 'RTS zu Art. 28 Abs. 9 DORA (Unterauftragsvergabe)',
    icon: 'Building2',
    questions: [],
  },
  {
    id: 'informationsaustausch',
    nameKey: 'dora.categories.informationsaustausch.name',
    shortNameKey: 'dora.categories.informationsaustausch.shortName',
    descriptionKey: 'dora.categories.informationsaustausch.description',
    doraArticles: 'Art. 45 DORA',
    rtsParagraph: 'Leitlinien zu Art. 45 DORA (Informationsaustausch)',
    icon: 'Share2',
    questions: [],
  },
  {
    id: 'governance',
    nameKey: 'dora.categories.governance.name',
    shortNameKey: 'dora.categories.governance.shortName',
    descriptionKey: 'dora.categories.governance.description',
    doraArticles: 'Art. 4-6 DORA',
    rtsParagraph: 'Art. 5 Abs. 2 DORA (Leitungsverantwortung)',
    icon: 'Users',
    questions: [],
  },
];

export function getCategoryById(id: string): DoraCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): DoraCategory[] {
  return CATEGORIES;
}
