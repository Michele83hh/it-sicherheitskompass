// src/lib/pillars/data/pillar-8.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '8-resilienz-krisen',
  number: 8,
  nameKey: 'pillars.8.name',
  descriptionKey: 'pillars.8.description',
  icon: 'ShieldAlert',
  color: 'red',
  components: [
    {
      id: 'incident-response',
      pillarId: '8-resilienz-krisen',
      order: 1,
      nameKey: 'pillars.8.components.incident-response.name',
      scenarioKey: 'pillars.8.components.incident-response.scenario',
      solutionKey: 'pillars.8.components.incident-response.solution',
      benefitKey: 'pillars.8.components.incident-response.benefit',
      nextStepKey: 'pillars.8.components.incident-response.nextStep',
      interactiveFeature: 'melde-timer',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 23',
          descriptionKey:
            'pillars.8.components.incident-response.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 33, Art. 34',
          descriptionKey:
            'pillars.8.components.incident-response.legal.dsgvo',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 17-19',
          descriptionKey:
            'pillars.8.components.incident-response.legal.dora',
        },
        {
          regulationId: 'kritis',
          articleKey: 'BSIG 8b',
          descriptionKey:
            'pillars.8.components.incident-response.legal.kritis',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI DER.2.1',
          descriptionKey:
            'pillars.8.components.incident-response.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'dora', 'kritis', 'bsi-grundschutz'],
    },
    {
      id: 'business-continuity',
      pillarId: '8-resilienz-krisen',
      order: 2,
      nameKey: 'pillars.8.components.business-continuity.name',
      scenarioKey: 'pillars.8.components.business-continuity.scenario',
      solutionKey: 'pillars.8.components.business-continuity.solution',
      benefitKey: 'pillars.8.components.business-continuity.benefit',
      nextStepKey: 'pillars.8.components.business-continuity.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. c',
          descriptionKey:
            'pillars.8.components.business-continuity.legal.nis2',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 11-12',
          descriptionKey:
            'pillars.8.components.business-continuity.legal.dora',
        },
        {
          regulationId: 'kritis',
          articleKey: 'BSIG 8a Abs. 1',
          descriptionKey:
            'pillars.8.components.business-continuity.legal.kritis',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI DER.4',
          descriptionKey:
            'pillars.8.components.business-continuity.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dora', 'kritis', 'bsi-grundschutz'],
    },
    {
      id: 'pentests',
      pillarId: '8-resilienz-krisen',
      order: 3,
      nameKey: 'pillars.8.components.pentests.name',
      scenarioKey: 'pillars.8.components.pentests.scenario',
      solutionKey: 'pillars.8.components.pentests.solution',
      benefitKey: 'pillars.8.components.pentests.benefit',
      nextStepKey: 'pillars.8.components.pentests.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. f',
          descriptionKey: 'pillars.8.components.pentests.legal.nis2',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 26-27',
          descriptionKey: 'pillars.8.components.pentests.legal.dora',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 5.3',
          descriptionKey: 'pillars.8.components.pentests.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI DER.3.3',
          descriptionKey: 'pillars.8.components.pentests.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dora', 'tisax', 'bsi-grundschutz'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
