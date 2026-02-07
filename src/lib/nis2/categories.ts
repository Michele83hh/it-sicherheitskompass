/**
 * NIS2 Art. 21(2) Measure Categories
 *
 * Legal basis: Art. 21 Abs. 2 lit.a-j) EU Directive 2022/2555
 * German implementation: §30 Abs. 2 Nr. 1-10 BSIG (BGBl. 2025 I Nr. 301)
 * BSI references: IT-Grundschutz-Kompendium Edition 2023
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'risk-analysis',
    nameKey: 'categories.riskAnalysis.name',
    shortNameKey: 'categories.riskAnalysis.shortName',
    descriptionKey: 'categories.riskAnalysis.description',
    euArticle: 'Art. 21 Abs. 2 lit. a NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    bsiBuildingBlocks: ['ISMS.1', 'ORP.1', 'DER.1'],
    questions: [], // Populated from QUESTIONS array
  },
  {
    id: 'incident-handling',
    nameKey: 'categories.incidentHandling.name',
    shortNameKey: 'categories.incidentHandling.shortName',
    descriptionKey: 'categories.incidentHandling.description',
    euArticle: 'Art. 21 Abs. 2 lit. b NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 2 BSIG',
    bsiBuildingBlocks: ['DER.2.1', 'DER.2.2', 'DER.2.3', 'OPS.1.1.5'],
    questions: [],
  },
  {
    id: 'business-continuity',
    nameKey: 'categories.businessContinuity.name',
    shortNameKey: 'categories.businessContinuity.shortName',
    descriptionKey: 'categories.businessContinuity.description',
    euArticle: 'Art. 21 Abs. 2 lit. c NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 3 BSIG',
    bsiBuildingBlocks: ['CON.3', 'DER.4', 'DER.2.3', 'OPS.1.2.2'],
    questions: [],
  },
  {
    id: 'supply-chain',
    nameKey: 'categories.supplyChain.name',
    shortNameKey: 'categories.supplyChain.shortName',
    descriptionKey: 'categories.supplyChain.description',
    euArticle: 'Art. 21 Abs. 2 lit. d NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 4 BSIG',
    bsiBuildingBlocks: ['ORP.1', 'OPS.1.1.3'],
    questions: [],
  },
  {
    id: 'acquisition-development',
    nameKey: 'categories.acquisitionDevelopment.name',
    shortNameKey: 'categories.acquisitionDevelopment.shortName',
    descriptionKey: 'categories.acquisitionDevelopment.description',
    euArticle: 'Art. 21 Abs. 2 lit. e NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 5 BSIG',
    bsiBuildingBlocks: ['CON.8', 'OPS.1.1.6', 'OPS.1.1.3', 'CON.10'],
    questions: [],
  },
  {
    id: 'effectiveness-assessment',
    nameKey: 'categories.effectivenessAssessment.name',
    shortNameKey: 'categories.effectivenessAssessment.shortName',
    descriptionKey: 'categories.effectivenessAssessment.description',
    euArticle: 'Art. 21 Abs. 2 lit. f NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 6 BSIG',
    bsiBuildingBlocks: ['ISMS.1', 'OPS.1.1.6', 'ORP.5'],
    questions: [],
  },
  {
    id: 'cyber-hygiene',
    nameKey: 'categories.cyberHygiene.name',
    shortNameKey: 'categories.cyberHygiene.shortName',
    descriptionKey: 'categories.cyberHygiene.description',
    euArticle: 'Art. 21 Abs. 2 lit. g NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 7 BSIG',
    bsiBuildingBlocks: ['ORP.3', 'OPS.1.1.4', 'ORP.2'],
    questions: [],
  },
  {
    id: 'cryptography',
    nameKey: 'categories.cryptography.name',
    shortNameKey: 'categories.cryptography.shortName',
    descriptionKey: 'categories.cryptography.description',
    euArticle: 'Art. 21 Abs. 2 lit. h NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 8 BSIG',
    bsiBuildingBlocks: ['CON.1', 'NET.4.1'],
    questions: [],
  },
  {
    id: 'access-control',
    nameKey: 'categories.accessControl.name',
    shortNameKey: 'categories.accessControl.shortName',
    descriptionKey: 'categories.accessControl.description',
    euArticle: 'Art. 21 Abs. 2 lit. i NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 9 BSIG',
    bsiBuildingBlocks: ['ORP.4', 'ORP.2', 'INF.1', 'INF.2'],
    questions: [],
  },
  {
    id: 'authentication-communication',
    nameKey: 'categories.authenticationCommunication.name',
    shortNameKey: 'categories.authenticationCommunication.shortName',
    descriptionKey: 'categories.authenticationCommunication.description',
    euArticle: 'Art. 21 Abs. 2 lit. j NIS2-RL',
    bsigParagraph: '§30 Abs. 2 Nr. 10 BSIG',
    bsiBuildingBlocks: ['ORP.4', 'NET.4.1', 'NET.4.2'],
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
