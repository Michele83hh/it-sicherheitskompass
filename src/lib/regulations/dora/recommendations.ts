/**
 * DORA Recommendations per Category
 *
 * Each category has 3 prioritized recommendations with concrete first steps,
 * legal references, and RTS/ITS references.
 * 18 recommendations total (6 categories x 3 recommendations).
 *
 * Legal basis: Verordnung (EU) 2022/2554 (DORA)
 */

import type { DoraRecommendation } from './types';

export const RECOMMENDATIONS: DoraRecommendation[] = [
  // ============================================================
  // Category 1: ICT-Risikomanagement (Art. 5-16 DORA)
  // ============================================================
  {
    id: 'rec-irm-1',
    categoryId: 'ict-risikomanagement',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'dora.recommendations.irm1.title',
    descriptionKey: 'dora.recommendations.irm1.description',
    firstStepKey: 'dora.recommendations.irm1.firstStep',
    legalReference: 'Art. 6 Abs. 1-8 DORA',
    rtaReference: 'RTS Art. 15 DORA (IKT-Risikomanagementrahmen)',
  },
  {
    id: 'rec-irm-2',
    categoryId: 'ict-risikomanagement',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.irm2.title',
    descriptionKey: 'dora.recommendations.irm2.description',
    firstStepKey: 'dora.recommendations.irm2.firstStep',
    legalReference: 'Art. 8 Abs. 1-4 DORA',
    rtaReference: 'RTS Art. 15 DORA (Identifizierung kritischer IKT-Assets)',
  },
  {
    id: 'rec-irm-3',
    categoryId: 'ict-risikomanagement',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.irm3.title',
    descriptionKey: 'dora.recommendations.irm3.description',
    firstStepKey: 'dora.recommendations.irm3.firstStep',
    legalReference: 'Art. 9-11 DORA',
    rtaReference: 'RTS Art. 15 DORA (Schutz, Erkennung, Reaktion)',
    checklistKey: 'dora.recommendations.irm3.checklist',
  },

  // ============================================================
  // Category 2: ICT-Vorfallmanagement (Art. 17-23 DORA)
  // ============================================================
  {
    id: 'rec-vm-1',
    categoryId: 'vorfallmanagement',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.vm1.title',
    descriptionKey: 'dora.recommendations.vm1.description',
    firstStepKey: 'dora.recommendations.vm1.firstStep',
    legalReference: 'Art. 17 Abs. 1-3 DORA',
    rtaReference: 'RTS Art. 20 DORA (Vorfallklassifizierung)',
  },
  {
    id: 'rec-vm-2',
    categoryId: 'vorfallmanagement',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dora.recommendations.vm2.title',
    descriptionKey: 'dora.recommendations.vm2.description',
    firstStepKey: 'dora.recommendations.vm2.firstStep',
    legalReference: 'Art. 19 Abs. 1-4 DORA',
    rtaReference: 'ITS Art. 20 DORA (Standardmeldeformulare)',
  },
  {
    id: 'rec-vm-3',
    categoryId: 'vorfallmanagement',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.vm3.title',
    descriptionKey: 'dora.recommendations.vm3.description',
    firstStepKey: 'dora.recommendations.vm3.firstStep',
    legalReference: 'Art. 17 Abs. 3, Art. 23 DORA',
    rtaReference: 'Art. 23 DORA (Lessons Learned und Cyberbedrohungen)',
    checklistKey: 'dora.recommendations.vm3.checklist',
  },

  // ============================================================
  // Category 3: Resilience Testing (Art. 24-27 DORA)
  // ============================================================
  {
    id: 'rec-rt-1',
    categoryId: 'resilience-testing',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'dora.recommendations.rt1.title',
    descriptionKey: 'dora.recommendations.rt1.description',
    firstStepKey: 'dora.recommendations.rt1.firstStep',
    legalReference: 'Art. 24-25 DORA',
    rtaReference: 'RTS Art. 26 DORA (Testprogramm fuer digitale operationale Resilienz)',
  },
  {
    id: 'rec-rt-2',
    categoryId: 'resilience-testing',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'dora.recommendations.rt2.title',
    descriptionKey: 'dora.recommendations.rt2.description',
    firstStepKey: 'dora.recommendations.rt2.firstStep',
    legalReference: 'Art. 26 Abs. 1-8 DORA',
    rtaReference: 'RTS Art. 26 DORA (TLPT-Anforderungen und -Durchfuehrung)',
  },
  {
    id: 'rec-rt-3',
    categoryId: 'resilience-testing',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.rt3.title',
    descriptionKey: 'dora.recommendations.rt3.description',
    firstStepKey: 'dora.recommendations.rt3.firstStep',
    legalReference: 'Art. 24 Abs. 6 DORA',
    rtaReference: 'Art. 24 DORA (Nachverfolgung von Testergebnissen)',
  },

  // ============================================================
  // Category 4: ICT-Drittanbieter (Art. 28-44 DORA)
  // ============================================================
  {
    id: 'rec-da-1',
    categoryId: 'drittanbieter',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.da1.title',
    descriptionKey: 'dora.recommendations.da1.description',
    firstStepKey: 'dora.recommendations.da1.firstStep',
    legalReference: 'Art. 28 Abs. 1-3 DORA',
    rtaReference: 'RTS Art. 28 Abs. 9 DORA (Informationsregister)',
  },
  {
    id: 'rec-da-2',
    categoryId: 'drittanbieter',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'dora.recommendations.da2.title',
    descriptionKey: 'dora.recommendations.da2.description',
    firstStepKey: 'dora.recommendations.da2.firstStep',
    legalReference: 'Art. 30 Abs. 1-5 DORA',
    rtaReference: 'Art. 30 DORA (Wesentliche Vertragsbestimmungen)',
    checklistKey: 'dora.recommendations.da2.checklist',
  },
  {
    id: 'rec-da-3',
    categoryId: 'drittanbieter',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.da3.title',
    descriptionKey: 'dora.recommendations.da3.description',
    firstStepKey: 'dora.recommendations.da3.firstStep',
    legalReference: 'Art. 29 Abs. 1-2 DORA',
    rtaReference: 'Art. 29 DORA (Konzentrationsrisiko und Ausstiegsstrategien)',
  },

  // ============================================================
  // Category 5: Informationsaustausch (Art. 45 DORA)
  // ============================================================
  {
    id: 'rec-ia-1',
    categoryId: 'informationsaustausch',
    priority: 'medium',
    effortLevel: 'quick',
    titleKey: 'dora.recommendations.ia1.title',
    descriptionKey: 'dora.recommendations.ia1.description',
    firstStepKey: 'dora.recommendations.ia1.firstStep',
    legalReference: 'Art. 45 Abs. 1-2 DORA',
    rtaReference: 'Leitlinien Art. 45 DORA (Teilnahme am Informationsaustausch)',
  },
  {
    id: 'rec-ia-2',
    categoryId: 'informationsaustausch',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.ia2.title',
    descriptionKey: 'dora.recommendations.ia2.description',
    firstStepKey: 'dora.recommendations.ia2.firstStep',
    legalReference: 'Art. 45 Abs. 3-4 DORA',
    rtaReference: 'Leitlinien Art. 45 DORA (Vertraulichkeit und TLP)',
  },
  {
    id: 'rec-ia-3',
    categoryId: 'informationsaustausch',
    priority: 'low',
    effortLevel: 'quick',
    titleKey: 'dora.recommendations.ia3.title',
    descriptionKey: 'dora.recommendations.ia3.description',
    firstStepKey: 'dora.recommendations.ia3.firstStep',
    legalReference: 'Art. 45 Abs. 2 DORA',
    rtaReference: 'Leitlinien Art. 45 DORA (Meldung an Aufsichtsbehoerden)',
  },

  // ============================================================
  // Category 6: Governance & Proportionalitaet (Art. 4-6 DORA)
  // ============================================================
  {
    id: 'rec-gov-1',
    categoryId: 'governance',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dora.recommendations.gov1.title',
    descriptionKey: 'dora.recommendations.gov1.description',
    firstStepKey: 'dora.recommendations.gov1.firstStep',
    legalReference: 'Art. 5 Abs. 1-4 DORA',
    rtaReference: 'Art. 5 DORA (Leitungsverantwortung und persoenliche Haftung)',
  },
  {
    id: 'rec-gov-2',
    categoryId: 'governance',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.gov2.title',
    descriptionKey: 'dora.recommendations.gov2.description',
    firstStepKey: 'dora.recommendations.gov2.firstStep',
    legalReference: 'Art. 5 Abs. 4, Art. 13 Abs. 6 DORA',
    rtaReference: 'Art. 5/13 DORA (IKT-Schulungen fuer Leitungsorgane)',
  },
  {
    id: 'rec-gov-3',
    categoryId: 'governance',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dora.recommendations.gov3.title',
    descriptionKey: 'dora.recommendations.gov3.description',
    firstStepKey: 'dora.recommendations.gov3.firstStep',
    legalReference: 'Art. 4 Abs. 1-2, Art. 6 Abs. 5 DORA',
    rtaReference: 'Art. 4/6 DORA (Proportionalitaet und interne Berichterstattung)',
    checklistKey: 'dora.recommendations.gov3.checklist',
  },
];
