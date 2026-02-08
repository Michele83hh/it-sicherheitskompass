/**
 * TISAX Gap Analysis Questions
 *
 * 36 questions across 12 VDA ISA categories, 3 per category.
 * All questions are core tier (TISAX has a simpler structure than NIS2).
 * Questions are written for automotive suppliers in management-level German.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Standard references:
 * - VDA ISA v6.0 (Verband der Automobilindustrie)
 * - ISO/IEC 27001:2022 Annex A
 */

import type { TisaxQuestion } from './types';

export const QUESTIONS: TisaxQuestion[] = [
  // ============================================================
  // Category 1: Informationssicherheits-Organisation
  // VDA ISA 1.x / ISO 27001 A.5
  // ============================================================
  {
    id: 'org-q1',
    categoryId: 'organisation',
    tier: 'core',
    titleKey: 'tisax.questions.orgQ1.title',
    tooltipKey: 'tisax.questions.orgQ1.tooltip',
    helpKey: 'tisax.questions.orgQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 1.1.1',
      iso27001Reference: 'ISO 27001 A.5.1',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.orgQ1.maturity.level0',
      level1Key: 'tisax.questions.orgQ1.maturity.level1',
      level2Key: 'tisax.questions.orgQ1.maturity.level2',
      level3Key: 'tisax.questions.orgQ1.maturity.level3',
    },
  },
  {
    id: 'org-q2',
    categoryId: 'organisation',
    tier: 'core',
    titleKey: 'tisax.questions.orgQ2.title',
    tooltipKey: 'tisax.questions.orgQ2.tooltip',
    helpKey: 'tisax.questions.orgQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 1.2.1',
      iso27001Reference: 'ISO 27001 A.5.2',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.orgQ2.maturity.level0',
      level1Key: 'tisax.questions.orgQ2.maturity.level1',
      level2Key: 'tisax.questions.orgQ2.maturity.level2',
      level3Key: 'tisax.questions.orgQ2.maturity.level3',
    },
  },
  {
    id: 'org-q3',
    categoryId: 'organisation',
    tier: 'core',
    titleKey: 'tisax.questions.orgQ3.title',
    tooltipKey: 'tisax.questions.orgQ3.tooltip',
    helpKey: 'tisax.questions.orgQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 1.3.1',
      iso27001Reference: 'ISO 27001 A.5.3',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.orgQ3.maturity.level0',
      level1Key: 'tisax.questions.orgQ3.maturity.level1',
      level2Key: 'tisax.questions.orgQ3.maturity.level2',
      level3Key: 'tisax.questions.orgQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Personalsicherheit
  // VDA ISA 2.x / ISO 27001 A.6
  // ============================================================
  {
    id: 'per-q1',
    categoryId: 'personal',
    tier: 'core',
    titleKey: 'tisax.questions.perQ1.title',
    tooltipKey: 'tisax.questions.perQ1.tooltip',
    helpKey: 'tisax.questions.perQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 2.1.1',
      iso27001Reference: 'ISO 27001 A.6.1',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.perQ1.maturity.level0',
      level1Key: 'tisax.questions.perQ1.maturity.level1',
      level2Key: 'tisax.questions.perQ1.maturity.level2',
      level3Key: 'tisax.questions.perQ1.maturity.level3',
    },
  },
  {
    id: 'per-q2',
    categoryId: 'personal',
    tier: 'core',
    titleKey: 'tisax.questions.perQ2.title',
    tooltipKey: 'tisax.questions.perQ2.tooltip',
    helpKey: 'tisax.questions.perQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 2.1.2',
      iso27001Reference: 'ISO 27001 A.6.2',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.perQ2.maturity.level0',
      level1Key: 'tisax.questions.perQ2.maturity.level1',
      level2Key: 'tisax.questions.perQ2.maturity.level2',
      level3Key: 'tisax.questions.perQ2.maturity.level3',
    },
  },
  {
    id: 'per-q3',
    categoryId: 'personal',
    tier: 'core',
    titleKey: 'tisax.questions.perQ3.title',
    tooltipKey: 'tisax.questions.perQ3.tooltip',
    helpKey: 'tisax.questions.perQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 2.1.3',
      iso27001Reference: 'ISO 27001 A.6.3',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.perQ3.maturity.level0',
      level1Key: 'tisax.questions.perQ3.maturity.level1',
      level2Key: 'tisax.questions.perQ3.maturity.level2',
      level3Key: 'tisax.questions.perQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Physische Sicherheit
  // VDA ISA 3.x / ISO 27001 A.7
  // ============================================================
  {
    id: 'phy-q1',
    categoryId: 'physische-sicherheit',
    tier: 'core',
    titleKey: 'tisax.questions.phyQ1.title',
    tooltipKey: 'tisax.questions.phyQ1.tooltip',
    helpKey: 'tisax.questions.phyQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 3.1.1',
      iso27001Reference: 'ISO 27001 A.7.1',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.phyQ1.maturity.level0',
      level1Key: 'tisax.questions.phyQ1.maturity.level1',
      level2Key: 'tisax.questions.phyQ1.maturity.level2',
      level3Key: 'tisax.questions.phyQ1.maturity.level3',
    },
  },
  {
    id: 'phy-q2',
    categoryId: 'physische-sicherheit',
    tier: 'core',
    titleKey: 'tisax.questions.phyQ2.title',
    tooltipKey: 'tisax.questions.phyQ2.tooltip',
    helpKey: 'tisax.questions.phyQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 3.1.2',
      iso27001Reference: 'ISO 27001 A.7.2',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.phyQ2.maturity.level0',
      level1Key: 'tisax.questions.phyQ2.maturity.level1',
      level2Key: 'tisax.questions.phyQ2.maturity.level2',
      level3Key: 'tisax.questions.phyQ2.maturity.level3',
    },
  },
  {
    id: 'phy-q3',
    categoryId: 'physische-sicherheit',
    tier: 'core',
    titleKey: 'tisax.questions.phyQ3.title',
    tooltipKey: 'tisax.questions.phyQ3.tooltip',
    helpKey: 'tisax.questions.phyQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 3.1.3',
      iso27001Reference: 'ISO 27001 A.7.3',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.phyQ3.maturity.level0',
      level1Key: 'tisax.questions.phyQ3.maturity.level1',
      level2Key: 'tisax.questions.phyQ3.maturity.level2',
      level3Key: 'tisax.questions.phyQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Technische Sicherheit
  // VDA ISA 4.x / ISO 27001 A.8
  // ============================================================
  {
    id: 'tech-q1',
    categoryId: 'technologie',
    tier: 'core',
    titleKey: 'tisax.questions.techQ1.title',
    tooltipKey: 'tisax.questions.techQ1.tooltip',
    helpKey: 'tisax.questions.techQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 4.1.1',
      iso27001Reference: 'ISO 27001 A.8.1',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.techQ1.maturity.level0',
      level1Key: 'tisax.questions.techQ1.maturity.level1',
      level2Key: 'tisax.questions.techQ1.maturity.level2',
      level3Key: 'tisax.questions.techQ1.maturity.level3',
    },
  },
  {
    id: 'tech-q2',
    categoryId: 'technologie',
    tier: 'core',
    titleKey: 'tisax.questions.techQ2.title',
    tooltipKey: 'tisax.questions.techQ2.tooltip',
    helpKey: 'tisax.questions.techQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 4.1.2',
      iso27001Reference: 'ISO 27001 A.8.2',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.techQ2.maturity.level0',
      level1Key: 'tisax.questions.techQ2.maturity.level1',
      level2Key: 'tisax.questions.techQ2.maturity.level2',
      level3Key: 'tisax.questions.techQ2.maturity.level3',
    },
  },
  {
    id: 'tech-q3',
    categoryId: 'technologie',
    tier: 'core',
    titleKey: 'tisax.questions.techQ3.title',
    tooltipKey: 'tisax.questions.techQ3.tooltip',
    helpKey: 'tisax.questions.techQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 4.1.3',
      iso27001Reference: 'ISO 27001 A.8.3',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.techQ3.maturity.level0',
      level1Key: 'tisax.questions.techQ3.maturity.level1',
      level2Key: 'tisax.questions.techQ3.maturity.level2',
      level3Key: 'tisax.questions.techQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Prototypenschutz
  // VDA ISA 5.x / ISO 27001 A.7, A.5
  // ============================================================
  {
    id: 'proto-q1',
    categoryId: 'prototypenschutz',
    tier: 'core',
    titleKey: 'tisax.questions.protoQ1.title',
    tooltipKey: 'tisax.questions.protoQ1.tooltip',
    helpKey: 'tisax.questions.protoQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 5.1.1',
      iso27001Reference: 'ISO 27001 A.7.1',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.protoQ1.maturity.level0',
      level1Key: 'tisax.questions.protoQ1.maturity.level1',
      level2Key: 'tisax.questions.protoQ1.maturity.level2',
      level3Key: 'tisax.questions.protoQ1.maturity.level3',
    },
  },
  {
    id: 'proto-q2',
    categoryId: 'prototypenschutz',
    tier: 'core',
    titleKey: 'tisax.questions.protoQ2.title',
    tooltipKey: 'tisax.questions.protoQ2.tooltip',
    helpKey: 'tisax.questions.protoQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 5.1.2',
      iso27001Reference: 'ISO 27001 A.5.10',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.protoQ2.maturity.level0',
      level1Key: 'tisax.questions.protoQ2.maturity.level1',
      level2Key: 'tisax.questions.protoQ2.maturity.level2',
      level3Key: 'tisax.questions.protoQ2.maturity.level3',
    },
  },
  {
    id: 'proto-q3',
    categoryId: 'prototypenschutz',
    tier: 'core',
    titleKey: 'tisax.questions.protoQ3.title',
    tooltipKey: 'tisax.questions.protoQ3.tooltip',
    helpKey: 'tisax.questions.protoQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 5.2.1',
      iso27001Reference: 'ISO 27001 A.5.12',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.protoQ3.maturity.level0',
      level1Key: 'tisax.questions.protoQ3.maturity.level1',
      level2Key: 'tisax.questions.protoQ3.maturity.level2',
      level3Key: 'tisax.questions.protoQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Datenschutz (VDA ISA)
  // VDA ISA 6.x / ISO 27001 A.5.34-36
  // ============================================================
  {
    id: 'ds-q1',
    categoryId: 'datenschutz',
    tier: 'core',
    titleKey: 'tisax.questions.dsQ1.title',
    tooltipKey: 'tisax.questions.dsQ1.tooltip',
    helpKey: 'tisax.questions.dsQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 6.1.1',
      iso27001Reference: 'ISO 27001 A.5.34',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.dsQ1.maturity.level0',
      level1Key: 'tisax.questions.dsQ1.maturity.level1',
      level2Key: 'tisax.questions.dsQ1.maturity.level2',
      level3Key: 'tisax.questions.dsQ1.maturity.level3',
    },
  },
  {
    id: 'ds-q2',
    categoryId: 'datenschutz',
    tier: 'core',
    titleKey: 'tisax.questions.dsQ2.title',
    tooltipKey: 'tisax.questions.dsQ2.tooltip',
    helpKey: 'tisax.questions.dsQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 6.1.2',
      iso27001Reference: 'ISO 27001 A.5.35',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.dsQ2.maturity.level0',
      level1Key: 'tisax.questions.dsQ2.maturity.level1',
      level2Key: 'tisax.questions.dsQ2.maturity.level2',
      level3Key: 'tisax.questions.dsQ2.maturity.level3',
    },
  },
  {
    id: 'ds-q3',
    categoryId: 'datenschutz',
    tier: 'core',
    titleKey: 'tisax.questions.dsQ3.title',
    tooltipKey: 'tisax.questions.dsQ3.tooltip',
    helpKey: 'tisax.questions.dsQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 6.1.3',
      iso27001Reference: 'ISO 27001 A.5.36',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.dsQ3.maturity.level0',
      level1Key: 'tisax.questions.dsQ3.maturity.level1',
      level2Key: 'tisax.questions.dsQ3.maturity.level2',
      level3Key: 'tisax.questions.dsQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 7: Zugangs- und Zugriffskontrolle
  // VDA ISA 7.x / ISO 27001 A.5.15-18, A.8.5
  // ============================================================
  {
    id: 'zk-q1',
    categoryId: 'zugangskontrolle',
    tier: 'core',
    titleKey: 'tisax.questions.zkQ1.title',
    tooltipKey: 'tisax.questions.zkQ1.tooltip',
    helpKey: 'tisax.questions.zkQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 7.1.1',
      iso27001Reference: 'ISO 27001 A.5.15',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.zkQ1.maturity.level0',
      level1Key: 'tisax.questions.zkQ1.maturity.level1',
      level2Key: 'tisax.questions.zkQ1.maturity.level2',
      level3Key: 'tisax.questions.zkQ1.maturity.level3',
    },
  },
  {
    id: 'zk-q2',
    categoryId: 'zugangskontrolle',
    tier: 'core',
    titleKey: 'tisax.questions.zkQ2.title',
    tooltipKey: 'tisax.questions.zkQ2.tooltip',
    helpKey: 'tisax.questions.zkQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 7.1.2',
      iso27001Reference: 'ISO 27001 A.5.16',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.zkQ2.maturity.level0',
      level1Key: 'tisax.questions.zkQ2.maturity.level1',
      level2Key: 'tisax.questions.zkQ2.maturity.level2',
      level3Key: 'tisax.questions.zkQ2.maturity.level3',
    },
  },
  {
    id: 'zk-q3',
    categoryId: 'zugangskontrolle',
    tier: 'core',
    titleKey: 'tisax.questions.zkQ3.title',
    tooltipKey: 'tisax.questions.zkQ3.tooltip',
    helpKey: 'tisax.questions.zkQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 7.1.3',
      iso27001Reference: 'ISO 27001 A.8.5',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.zkQ3.maturity.level0',
      level1Key: 'tisax.questions.zkQ3.maturity.level1',
      level2Key: 'tisax.questions.zkQ3.maturity.level2',
      level3Key: 'tisax.questions.zkQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 8: Kryptografie
  // VDA ISA 8.x / ISO 27001 A.8.24-26
  // ============================================================
  {
    id: 'kry-q1',
    categoryId: 'kryptografie',
    tier: 'core',
    titleKey: 'tisax.questions.kryQ1.title',
    tooltipKey: 'tisax.questions.kryQ1.tooltip',
    helpKey: 'tisax.questions.kryQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 8.1.1',
      iso27001Reference: 'ISO 27001 A.8.24',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.kryQ1.maturity.level0',
      level1Key: 'tisax.questions.kryQ1.maturity.level1',
      level2Key: 'tisax.questions.kryQ1.maturity.level2',
      level3Key: 'tisax.questions.kryQ1.maturity.level3',
    },
  },
  {
    id: 'kry-q2',
    categoryId: 'kryptografie',
    tier: 'core',
    titleKey: 'tisax.questions.kryQ2.title',
    tooltipKey: 'tisax.questions.kryQ2.tooltip',
    helpKey: 'tisax.questions.kryQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 8.1.2',
      iso27001Reference: 'ISO 27001 A.8.25',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.kryQ2.maturity.level0',
      level1Key: 'tisax.questions.kryQ2.maturity.level1',
      level2Key: 'tisax.questions.kryQ2.maturity.level2',
      level3Key: 'tisax.questions.kryQ2.maturity.level3',
    },
  },
  {
    id: 'kry-q3',
    categoryId: 'kryptografie',
    tier: 'core',
    titleKey: 'tisax.questions.kryQ3.title',
    tooltipKey: 'tisax.questions.kryQ3.tooltip',
    helpKey: 'tisax.questions.kryQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 8.1.3',
      iso27001Reference: 'ISO 27001 A.8.26',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.kryQ3.maturity.level0',
      level1Key: 'tisax.questions.kryQ3.maturity.level1',
      level2Key: 'tisax.questions.kryQ3.maturity.level2',
      level3Key: 'tisax.questions.kryQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 9: Betriebssicherheit
  // VDA ISA 9.x / ISO 27001 A.8.6-9
  // ============================================================
  {
    id: 'bs-q1',
    categoryId: 'betriebssicherheit',
    tier: 'core',
    titleKey: 'tisax.questions.bsQ1.title',
    tooltipKey: 'tisax.questions.bsQ1.tooltip',
    helpKey: 'tisax.questions.bsQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 9.1.1',
      iso27001Reference: 'ISO 27001 A.8.6',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.bsQ1.maturity.level0',
      level1Key: 'tisax.questions.bsQ1.maturity.level1',
      level2Key: 'tisax.questions.bsQ1.maturity.level2',
      level3Key: 'tisax.questions.bsQ1.maturity.level3',
    },
  },
  {
    id: 'bs-q2',
    categoryId: 'betriebssicherheit',
    tier: 'core',
    titleKey: 'tisax.questions.bsQ2.title',
    tooltipKey: 'tisax.questions.bsQ2.tooltip',
    helpKey: 'tisax.questions.bsQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 9.1.2',
      iso27001Reference: 'ISO 27001 A.8.7',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.bsQ2.maturity.level0',
      level1Key: 'tisax.questions.bsQ2.maturity.level1',
      level2Key: 'tisax.questions.bsQ2.maturity.level2',
      level3Key: 'tisax.questions.bsQ2.maturity.level3',
    },
  },
  {
    id: 'bs-q3',
    categoryId: 'betriebssicherheit',
    tier: 'core',
    titleKey: 'tisax.questions.bsQ3.title',
    tooltipKey: 'tisax.questions.bsQ3.tooltip',
    helpKey: 'tisax.questions.bsQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 9.1.3',
      iso27001Reference: 'ISO 27001 A.8.8',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.bsQ3.maturity.level0',
      level1Key: 'tisax.questions.bsQ3.maturity.level1',
      level2Key: 'tisax.questions.bsQ3.maturity.level2',
      level3Key: 'tisax.questions.bsQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 10: Kommunikationssicherheit
  // VDA ISA 10.x / ISO 27001 A.8.20-23
  // ============================================================
  {
    id: 'kom-q1',
    categoryId: 'kommunikation',
    tier: 'core',
    titleKey: 'tisax.questions.komQ1.title',
    tooltipKey: 'tisax.questions.komQ1.tooltip',
    helpKey: 'tisax.questions.komQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 10.1.1',
      iso27001Reference: 'ISO 27001 A.8.20',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.komQ1.maturity.level0',
      level1Key: 'tisax.questions.komQ1.maturity.level1',
      level2Key: 'tisax.questions.komQ1.maturity.level2',
      level3Key: 'tisax.questions.komQ1.maturity.level3',
    },
  },
  {
    id: 'kom-q2',
    categoryId: 'kommunikation',
    tier: 'core',
    titleKey: 'tisax.questions.komQ2.title',
    tooltipKey: 'tisax.questions.komQ2.tooltip',
    helpKey: 'tisax.questions.komQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 10.1.2',
      iso27001Reference: 'ISO 27001 A.8.21',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.komQ2.maturity.level0',
      level1Key: 'tisax.questions.komQ2.maturity.level1',
      level2Key: 'tisax.questions.komQ2.maturity.level2',
      level3Key: 'tisax.questions.komQ2.maturity.level3',
    },
  },
  {
    id: 'kom-q3',
    categoryId: 'kommunikation',
    tier: 'core',
    titleKey: 'tisax.questions.komQ3.title',
    tooltipKey: 'tisax.questions.komQ3.tooltip',
    helpKey: 'tisax.questions.komQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 10.1.3',
      iso27001Reference: 'ISO 27001 A.8.22',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.komQ3.maturity.level0',
      level1Key: 'tisax.questions.komQ3.maturity.level1',
      level2Key: 'tisax.questions.komQ3.maturity.level2',
      level3Key: 'tisax.questions.komQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 11: Lieferantenmanagement
  // VDA ISA 11.x / ISO 27001 A.5.19-22
  // ============================================================
  {
    id: 'lief-q1',
    categoryId: 'lieferanten',
    tier: 'core',
    titleKey: 'tisax.questions.liefQ1.title',
    tooltipKey: 'tisax.questions.liefQ1.tooltip',
    helpKey: 'tisax.questions.liefQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 11.1.1',
      iso27001Reference: 'ISO 27001 A.5.19',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.liefQ1.maturity.level0',
      level1Key: 'tisax.questions.liefQ1.maturity.level1',
      level2Key: 'tisax.questions.liefQ1.maturity.level2',
      level3Key: 'tisax.questions.liefQ1.maturity.level3',
    },
  },
  {
    id: 'lief-q2',
    categoryId: 'lieferanten',
    tier: 'core',
    titleKey: 'tisax.questions.liefQ2.title',
    tooltipKey: 'tisax.questions.liefQ2.tooltip',
    helpKey: 'tisax.questions.liefQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 11.1.2',
      iso27001Reference: 'ISO 27001 A.5.20',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.liefQ2.maturity.level0',
      level1Key: 'tisax.questions.liefQ2.maturity.level1',
      level2Key: 'tisax.questions.liefQ2.maturity.level2',
      level3Key: 'tisax.questions.liefQ2.maturity.level3',
    },
  },
  {
    id: 'lief-q3',
    categoryId: 'lieferanten',
    tier: 'core',
    titleKey: 'tisax.questions.liefQ3.title',
    tooltipKey: 'tisax.questions.liefQ3.tooltip',
    helpKey: 'tisax.questions.liefQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 11.1.3',
      iso27001Reference: 'ISO 27001 A.5.21',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.liefQ3.maturity.level0',
      level1Key: 'tisax.questions.liefQ3.maturity.level1',
      level2Key: 'tisax.questions.liefQ3.maturity.level2',
      level3Key: 'tisax.questions.liefQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 12: Compliance & Audit
  // VDA ISA 12.x / ISO 27001 A.5.31-36
  // ============================================================
  {
    id: 'comp-q1',
    categoryId: 'compliance',
    tier: 'core',
    titleKey: 'tisax.questions.compQ1.title',
    tooltipKey: 'tisax.questions.compQ1.tooltip',
    helpKey: 'tisax.questions.compQ1.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 12.1.1',
      iso27001Reference: 'ISO 27001 A.5.31',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.compQ1.maturity.level0',
      level1Key: 'tisax.questions.compQ1.maturity.level1',
      level2Key: 'tisax.questions.compQ1.maturity.level2',
      level3Key: 'tisax.questions.compQ1.maturity.level3',
    },
  },
  {
    id: 'comp-q2',
    categoryId: 'compliance',
    tier: 'core',
    titleKey: 'tisax.questions.compQ2.title',
    tooltipKey: 'tisax.questions.compQ2.tooltip',
    helpKey: 'tisax.questions.compQ2.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 12.1.2',
      iso27001Reference: 'ISO 27001 A.5.32',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.compQ2.maturity.level0',
      level1Key: 'tisax.questions.compQ2.maturity.level1',
      level2Key: 'tisax.questions.compQ2.maturity.level2',
      level3Key: 'tisax.questions.compQ2.maturity.level3',
    },
  },
  {
    id: 'comp-q3',
    categoryId: 'compliance',
    tier: 'core',
    titleKey: 'tisax.questions.compQ3.title',
    tooltipKey: 'tisax.questions.compQ3.tooltip',
    helpKey: 'tisax.questions.compQ3.help',
    legalReference: {
      vdaIsaControl: 'VDA ISA 12.1.3',
      iso27001Reference: 'ISO 27001 A.5.33',
    },
    maturityDescriptions: {
      level0Key: 'tisax.questions.compQ3.maturity.level0',
      level1Key: 'tisax.questions.compQ3.maturity.level1',
      level2Key: 'tisax.questions.compQ3.maturity.level2',
      level3Key: 'tisax.questions.compQ3.maturity.level3',
    },
  },
];

export function getQuestionsByCategory(categoryId: string): TisaxQuestion[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId);
}

export function getQuestionCount(): number {
  return QUESTIONS.length;
}
