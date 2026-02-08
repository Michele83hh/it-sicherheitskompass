/**
 * Branchenspezifische Hinweise (Sector-Specific Guidance)
 *
 * Additional guidance per sector covering sector-specific regulations,
 * technical requirements, and common challenges.
 *
 * Displayed conditionally based on the selected sector in the wizard.
 * Sector IDs must match those in sectors.ts (kebab-case).
 */

export interface SectorGuidance {
  sectorId: string;
  additionalRegulations: SectorRegulation[];
  specificChallengesKey: string;
  recommendationsKey: string;
}

export interface SectorRegulation {
  nameKey: string;
  descriptionKey: string;
  legalBasis: string;
  url?: string;
}

export const SECTOR_GUIDANCE: SectorGuidance[] = [
  // ─── Anlage 1 Sectors ───
  {
    sectorId: 'energy',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.energy.regulations.enwg.name',
        descriptionKey: 'sectorGuidance.energy.regulations.enwg.description',
        legalBasis: '§11 Abs. 1a-1b EnWG',
      },
      {
        nameKey: 'sectorGuidance.energy.regulations.bnetza.name',
        descriptionKey: 'sectorGuidance.energy.regulations.bnetza.description',
        legalBasis: 'IT-Sicherheitskatalog gem. §11 Abs. 1a EnWG',
        url: 'https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/Versorgungssicherheit/IT_Sicherheit/start.html',
      },
    ],
    specificChallengesKey: 'sectorGuidance.energy.challenges',
    recommendationsKey: 'sectorGuidance.energy.recommendations',
  },
  {
    sectorId: 'transport',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.transport.regulations.cer.name',
        descriptionKey: 'sectorGuidance.transport.regulations.cer.description',
        legalBasis: 'KRITIS-Dachgesetz (CER-Umsetzung)',
      },
    ],
    specificChallengesKey: 'sectorGuidance.transport.challenges',
    recommendationsKey: 'sectorGuidance.transport.recommendations',
  },
  {
    sectorId: 'finance',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.finance.regulations.dora.name',
        descriptionKey: 'sectorGuidance.finance.regulations.dora.description',
        legalBasis: 'Verordnung (EU) 2022/2554 (DORA)',
      },
      {
        nameKey: 'sectorGuidance.finance.regulations.bait.name',
        descriptionKey: 'sectorGuidance.finance.regulations.bait.description',
        legalBasis: 'BAIT (BaFin)',
      },
    ],
    specificChallengesKey: 'sectorGuidance.finance.challenges',
    recommendationsKey: 'sectorGuidance.finance.recommendations',
  },
  {
    sectorId: 'health',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.health.regulations.sgbv.name',
        descriptionKey: 'sectorGuidance.health.regulations.sgbv.description',
        legalBasis: '§75c SGB V',
      },
      {
        nameKey: 'sectorGuidance.health.regulations.patientdata.name',
        descriptionKey: 'sectorGuidance.health.regulations.patientdata.description',
        legalBasis: 'Art. 9 DSGVO, §22 BDSG',
      },
    ],
    specificChallengesKey: 'sectorGuidance.health.challenges',
    recommendationsKey: 'sectorGuidance.health.recommendations',
  },
  {
    sectorId: 'water',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.water.regulations.trinkwv.name',
        descriptionKey: 'sectorGuidance.water.regulations.trinkwv.description',
        legalBasis: 'TrinkwV',
      },
    ],
    specificChallengesKey: 'sectorGuidance.water.challenges',
    recommendationsKey: 'sectorGuidance.water.recommendations',
  },
  {
    sectorId: 'digital-infrastructure',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.digital.regulations.cir.name',
        descriptionKey: 'sectorGuidance.digital.regulations.cir.description',
        legalBasis: 'Durchführungsverordnung (EU) 2024/2690',
      },
      {
        nameKey: 'sectorGuidance.digital.regulations.tkg.name',
        descriptionKey: 'sectorGuidance.digital.regulations.tkg.description',
        legalBasis: '§165-§169 TKG',
      },
    ],
    specificChallengesKey: 'sectorGuidance.digital.challenges',
    recommendationsKey: 'sectorGuidance.digital.recommendations',
  },
  {
    sectorId: 'space',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.space.regulations.iris2.name',
        descriptionKey: 'sectorGuidance.space.regulations.iris2.description',
        legalBasis: 'Verordnung (EU) 2023/588 (IRIS²)',
      },
    ],
    specificChallengesKey: 'sectorGuidance.space.challenges',
    recommendationsKey: 'sectorGuidance.space.recommendations',
  },
  // ─── Anlage 2 Sectors ───
  {
    sectorId: 'postal',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.postal.regulations.postg.name',
        descriptionKey: 'sectorGuidance.postal.regulations.postg.description',
        legalBasis: 'Postgesetz 2024 (BGBl. 2024 I Nr. 236)',
      },
    ],
    specificChallengesKey: 'sectorGuidance.postal.challenges',
    recommendationsKey: 'sectorGuidance.postal.recommendations',
  },
  {
    sectorId: 'waste-management',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.waste.regulations.krwg.name',
        descriptionKey: 'sectorGuidance.waste.regulations.krwg.description',
        legalBasis: 'KrWG; KRITIS-Verordnung §9',
      },
    ],
    specificChallengesKey: 'sectorGuidance.waste.challenges',
    recommendationsKey: 'sectorGuidance.waste.recommendations',
  },
  {
    sectorId: 'chemicals',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.chemicals.regulations.seveso.name',
        descriptionKey: 'sectorGuidance.chemicals.regulations.seveso.description',
        legalBasis: 'Richtlinie 2012/18/EU (Seveso III); 12. BImSchV',
      },
    ],
    specificChallengesKey: 'sectorGuidance.chemicals.challenges',
    recommendationsKey: 'sectorGuidance.chemicals.recommendations',
  },
  {
    sectorId: 'food',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.food.regulations.foodlaw.name',
        descriptionKey: 'sectorGuidance.food.regulations.foodlaw.description',
        legalBasis: 'VO (EG) 178/2002; LFGB',
      },
    ],
    specificChallengesKey: 'sectorGuidance.food.challenges',
    recommendationsKey: 'sectorGuidance.food.recommendations',
  },
  {
    sectorId: 'manufacturing',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.manufacturing.regulations.ics.name',
        descriptionKey: 'sectorGuidance.manufacturing.regulations.ics.description',
        legalBasis: 'IEC 62443',
      },
    ],
    specificChallengesKey: 'sectorGuidance.manufacturing.challenges',
    recommendationsKey: 'sectorGuidance.manufacturing.recommendations',
  },
  {
    sectorId: 'digital-services',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.digitalServices.regulations.dsa.name',
        descriptionKey: 'sectorGuidance.digitalServices.regulations.dsa.description',
        legalBasis: 'Verordnung (EU) 2022/2065 (DSA)',
      },
      {
        nameKey: 'sectorGuidance.digitalServices.regulations.tdddg.name',
        descriptionKey: 'sectorGuidance.digitalServices.regulations.tdddg.description',
        legalBasis: 'TDDDG (vormals TTDSG)',
      },
    ],
    specificChallengesKey: 'sectorGuidance.digitalServices.challenges',
    recommendationsKey: 'sectorGuidance.digitalServices.recommendations',
  },
  {
    sectorId: 'research',
    additionalRegulations: [
      {
        nameKey: 'sectorGuidance.research.regulations.dualuse.name',
        descriptionKey: 'sectorGuidance.research.regulations.dualuse.description',
        legalBasis: 'Verordnung (EU) 2021/821',
      },
      {
        nameKey: 'sectorGuidance.research.regulations.gdprResearch.name',
        descriptionKey: 'sectorGuidance.research.regulations.gdprResearch.description',
        legalBasis: 'Art. 89 DSGVO i.V.m. §27 BDSG',
      },
    ],
    specificChallengesKey: 'sectorGuidance.research.challenges',
    recommendationsKey: 'sectorGuidance.research.recommendations',
  },
];

/**
 * Get sector-specific guidance for a given sector ID
 */
export function getSectorGuidance(sectorId: string): SectorGuidance | undefined {
  return SECTOR_GUIDANCE.find((g) => g.sectorId === sectorId);
}

/**
 * Check if a sector has additional guidance available
 */
export function hasSectorGuidance(sectorId: string): boolean {
  return SECTOR_GUIDANCE.some((g) => g.sectorId === sectorId);
}
