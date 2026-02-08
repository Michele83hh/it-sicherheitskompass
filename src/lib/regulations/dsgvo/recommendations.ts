/**
 * DSGVO Recommendations per Category
 *
 * Each category has 3 prioritized recommendations with concrete first steps,
 * legal references, and DSK (Datenschutzkonferenz) guidance references.
 * 30 recommendations total (10 categories x 3 recommendations).
 *
 * Legal basis: Verordnung (EU) 2016/679 (DSGVO)
 * National implementation: Bundesdatenschutzgesetz (BDSG)
 */

import type { Recommendation } from './types';

export const RECOMMENDATIONS: Recommendation[] = [
  // ============================================================
  // Category 1: DSFA (Datenschutz-Folgenabschaetzung)
  // ============================================================
  {
    id: 'rec-dsfa-1',
    categoryId: 'dsfa',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.dsfa1.title',
    descriptionKey: 'dsgvo.recommendations.dsfa1.description',
    firstStepKey: 'dsgvo.recommendations.dsfa1.firstStep',
    legalReference: 'Art. 35 Abs. 1, 3 DSGVO, §67 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 5 (DSFA)',
  },
  {
    id: 'rec-dsfa-2',
    categoryId: 'dsfa',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.dsfa2.title',
    descriptionKey: 'dsgvo.recommendations.dsfa2.description',
    firstStepKey: 'dsgvo.recommendations.dsfa2.firstStep',
    legalReference: 'Art. 35 Abs. 4 DSGVO',
    dsbReference: 'BfDI DSFA-Muss-Liste',
  },
  {
    id: 'rec-dsfa-3',
    categoryId: 'dsfa',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.dsfa3.title',
    descriptionKey: 'dsgvo.recommendations.dsfa3.description',
    firstStepKey: 'dsgvo.recommendations.dsfa3.firstStep',
    legalReference: 'Art. 35 Abs. 7, Art. 36 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 5, WP 248 rev.01',
    checklistKey: 'dsgvo.recommendations.dsfa3.checklist',
  },

  // ============================================================
  // Category 2: Verarbeitungsverzeichnis
  // ============================================================
  {
    id: 'rec-vv-1',
    categoryId: 'verarbeitungsverzeichnis',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.vv1.title',
    descriptionKey: 'dsgvo.recommendations.vv1.description',
    firstStepKey: 'dsgvo.recommendations.vv1.firstStep',
    legalReference: 'Art. 30 Abs. 1 DSGVO, §70 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 1 (Verarbeitungsverzeichnis)',
  },
  {
    id: 'rec-vv-2',
    categoryId: 'verarbeitungsverzeichnis',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.vv2.title',
    descriptionKey: 'dsgvo.recommendations.vv2.description',
    firstStepKey: 'dsgvo.recommendations.vv2.firstStep',
    legalReference: 'Art. 30 Abs. 1 lit. a-g DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 1',
    checklistKey: 'dsgvo.recommendations.vv2.checklist',
  },
  {
    id: 'rec-vv-3',
    categoryId: 'verarbeitungsverzeichnis',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.vv3.title',
    descriptionKey: 'dsgvo.recommendations.vv3.description',
    firstStepKey: 'dsgvo.recommendations.vv3.firstStep',
    legalReference: 'Art. 30 Abs. 4 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 1',
  },

  // ============================================================
  // Category 3: Einwilligungsmanagement
  // ============================================================
  {
    id: 'rec-ew-1',
    categoryId: 'einwilligung',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.ew1.title',
    descriptionKey: 'dsgvo.recommendations.ew1.description',
    firstStepKey: 'dsgvo.recommendations.ew1.firstStep',
    legalReference: 'Art. 6 Abs. 1, Art. 7 DSGVO, §26 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 20 (Einwilligung)',
  },
  {
    id: 'rec-ew-2',
    categoryId: 'einwilligung',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.ew2.title',
    descriptionKey: 'dsgvo.recommendations.ew2.description',
    firstStepKey: 'dsgvo.recommendations.ew2.firstStep',
    legalReference: 'Art. 7 Abs. 3 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 20',
  },
  {
    id: 'rec-ew-3',
    categoryId: 'einwilligung',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.ew3.title',
    descriptionKey: 'dsgvo.recommendations.ew3.description',
    firstStepKey: 'dsgvo.recommendations.ew3.firstStep',
    legalReference: 'Art. 7 Abs. 1, Art. 5 Abs. 2 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 20',
    checklistKey: 'dsgvo.recommendations.ew3.checklist',
  },

  // ============================================================
  // Category 4: Betroffenenrechte
  // ============================================================
  {
    id: 'rec-br-1',
    categoryId: 'betroffenenrechte',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.br1.title',
    descriptionKey: 'dsgvo.recommendations.br1.description',
    firstStepKey: 'dsgvo.recommendations.br1.firstStep',
    legalReference: 'Art. 15-22 DSGVO, §34-37 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 6 (Auskunftsrecht)',
  },
  {
    id: 'rec-br-2',
    categoryId: 'betroffenenrechte',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.br2.title',
    descriptionKey: 'dsgvo.recommendations.br2.description',
    firstStepKey: 'dsgvo.recommendations.br2.firstStep',
    legalReference: 'Art. 12 Abs. 3 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 6',
  },
  {
    id: 'rec-br-3',
    categoryId: 'betroffenenrechte',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.br3.title',
    descriptionKey: 'dsgvo.recommendations.br3.description',
    firstStepKey: 'dsgvo.recommendations.br3.firstStep',
    legalReference: 'Art. 17, 20 DSGVO, §35 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 11 (Loeschung)',
  },

  // ============================================================
  // Category 5: Datenschutzverletzungen
  // ============================================================
  {
    id: 'rec-dv-1',
    categoryId: 'datenschutzverletzung',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.dv1.title',
    descriptionKey: 'dsgvo.recommendations.dv1.description',
    firstStepKey: 'dsgvo.recommendations.dv1.firstStep',
    legalReference: 'Art. 33 Abs. 1 DSGVO, §65 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 18 (Datenpannenmeldung)',
  },
  {
    id: 'rec-dv-2',
    categoryId: 'datenschutzverletzung',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.dv2.title',
    descriptionKey: 'dsgvo.recommendations.dv2.description',
    firstStepKey: 'dsgvo.recommendations.dv2.firstStep',
    legalReference: 'Art. 33 Abs. 5 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 18',
  },
  {
    id: 'rec-dv-3',
    categoryId: 'datenschutzverletzung',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.dv3.title',
    descriptionKey: 'dsgvo.recommendations.dv3.description',
    firstStepKey: 'dsgvo.recommendations.dv3.firstStep',
    legalReference: 'Art. 33-34 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 18',
    checklistKey: 'dsgvo.recommendations.dv3.checklist',
  },

  // ============================================================
  // Category 6: Datenschutzbeauftragter (DSB)
  // ============================================================
  {
    id: 'rec-dsb-1',
    categoryId: 'dsb',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.dsb1.title',
    descriptionKey: 'dsgvo.recommendations.dsb1.description',
    firstStepKey: 'dsgvo.recommendations.dsb1.firstStep',
    legalReference: 'Art. 37 Abs. 1 DSGVO, §38 Abs. 1 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 12 (Datenschutzbeauftragte)',
  },
  {
    id: 'rec-dsb-2',
    categoryId: 'dsb',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.dsb2.title',
    descriptionKey: 'dsgvo.recommendations.dsb2.description',
    firstStepKey: 'dsgvo.recommendations.dsb2.firstStep',
    legalReference: 'Art. 38 DSGVO, §38 Abs. 2 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 12',
  },
  {
    id: 'rec-dsb-3',
    categoryId: 'dsb',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.dsb3.title',
    descriptionKey: 'dsgvo.recommendations.dsb3.description',
    firstStepKey: 'dsgvo.recommendations.dsb3.firstStep',
    legalReference: 'Art. 39 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 12',
  },

  // ============================================================
  // Category 7: Internationale Datenuebermittlung
  // ============================================================
  {
    id: 'rec-dt-1',
    categoryId: 'datentransfer',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.dt1.title',
    descriptionKey: 'dsgvo.recommendations.dt1.description',
    firstStepKey: 'dsgvo.recommendations.dt1.firstStep',
    legalReference: 'Art. 44-49 DSGVO, §78-80 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 4 (Drittlandtransfer)',
  },
  {
    id: 'rec-dt-2',
    categoryId: 'datentransfer',
    priority: 'high',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.dt2.title',
    descriptionKey: 'dsgvo.recommendations.dt2.description',
    firstStepKey: 'dsgvo.recommendations.dt2.firstStep',
    legalReference: 'Art. 46 Abs. 2 lit. c DSGVO',
    dsbReference: 'EDSA Empfehlungen 01/2020 (Schrems II)',
  },
  {
    id: 'rec-dt-3',
    categoryId: 'datentransfer',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.dt3.title',
    descriptionKey: 'dsgvo.recommendations.dt3.description',
    firstStepKey: 'dsgvo.recommendations.dt3.firstStep',
    legalReference: 'Art. 46 Abs. 2 DSGVO',
    dsbReference: 'EDSA Empfehlungen 01/2020',
    checklistKey: 'dsgvo.recommendations.dt3.checklist',
  },

  // ============================================================
  // Category 8: Technische & Organisatorische Massnahmen (TOMs)
  // ============================================================
  {
    id: 'rec-tom-1',
    categoryId: 'toms',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.tom1.title',
    descriptionKey: 'dsgvo.recommendations.tom1.description',
    firstStepKey: 'dsgvo.recommendations.tom1.firstStep',
    legalReference: 'Art. 32 Abs. 1 DSGVO, §64 BDSG',
    dsbReference: 'SDM-Methodik V3.0 (Standard-Datenschutzmodell)',
  },
  {
    id: 'rec-tom-2',
    categoryId: 'toms',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.tom2.title',
    descriptionKey: 'dsgvo.recommendations.tom2.description',
    firstStepKey: 'dsgvo.recommendations.tom2.firstStep',
    legalReference: 'Art. 32 Abs. 1 lit. a DSGVO',
    dsbReference: 'SDM-Methodik V3.0',
  },
  {
    id: 'rec-tom-3',
    categoryId: 'toms',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.tom3.title',
    descriptionKey: 'dsgvo.recommendations.tom3.description',
    firstStepKey: 'dsgvo.recommendations.tom3.firstStep',
    legalReference: 'Art. 32 Abs. 1 lit. d DSGVO',
    dsbReference: 'SDM-Methodik V3.0',
    checklistKey: 'dsgvo.recommendations.tom3.checklist',
  },

  // ============================================================
  // Category 9: Privacy by Design & Default
  // ============================================================
  {
    id: 'rec-pbd-1',
    categoryId: 'privacy-by-design',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.pbd1.title',
    descriptionKey: 'dsgvo.recommendations.pbd1.description',
    firstStepKey: 'dsgvo.recommendations.pbd1.firstStep',
    legalReference: 'Art. 25 Abs. 1 DSGVO, §71 BDSG',
    dsbReference: 'EDSA Leitlinien 4/2019 (Art. 25)',
  },
  {
    id: 'rec-pbd-2',
    categoryId: 'privacy-by-design',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.pbd2.title',
    descriptionKey: 'dsgvo.recommendations.pbd2.description',
    firstStepKey: 'dsgvo.recommendations.pbd2.firstStep',
    legalReference: 'Art. 25 Abs. 2 DSGVO',
    dsbReference: 'EDSA Leitlinien 4/2019',
  },
  {
    id: 'rec-pbd-3',
    categoryId: 'privacy-by-design',
    priority: 'medium',
    effortLevel: 'strategic',
    titleKey: 'dsgvo.recommendations.pbd3.title',
    descriptionKey: 'dsgvo.recommendations.pbd3.description',
    firstStepKey: 'dsgvo.recommendations.pbd3.firstStep',
    legalReference: 'Art. 25 DSGVO',
    dsbReference: 'EDSA Leitlinien 4/2019',
  },

  // ============================================================
  // Category 10: Auftragsverarbeitung
  // ============================================================
  {
    id: 'rec-av-1',
    categoryId: 'auftragsverarbeitung',
    priority: 'high',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.av1.title',
    descriptionKey: 'dsgvo.recommendations.av1.description',
    firstStepKey: 'dsgvo.recommendations.av1.firstStep',
    legalReference: 'Art. 28 Abs. 1, 3 DSGVO, §62 BDSG',
    dsbReference: 'DSK-Kurzpapier Nr. 13 (Auftragsverarbeitung)',
  },
  {
    id: 'rec-av-2',
    categoryId: 'auftragsverarbeitung',
    priority: 'high',
    effortLevel: 'quick',
    titleKey: 'dsgvo.recommendations.av2.title',
    descriptionKey: 'dsgvo.recommendations.av2.description',
    firstStepKey: 'dsgvo.recommendations.av2.firstStep',
    legalReference: 'Art. 28 Abs. 1 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 13',
  },
  {
    id: 'rec-av-3',
    categoryId: 'auftragsverarbeitung',
    priority: 'medium',
    effortLevel: 'medium',
    titleKey: 'dsgvo.recommendations.av3.title',
    descriptionKey: 'dsgvo.recommendations.av3.description',
    firstStepKey: 'dsgvo.recommendations.av3.firstStep',
    legalReference: 'Art. 28 Abs. 2, 4 DSGVO',
    dsbReference: 'DSK-Kurzpapier Nr. 13',
    checklistKey: 'dsgvo.recommendations.av3.checklist',
  },
];
