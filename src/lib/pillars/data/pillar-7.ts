// src/lib/pillars/data/pillar-7.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '7-endgeraete-mobile',
  number: 7,
  nameKey: 'pillars.7.name',
  descriptionKey: 'pillars.7.description',
  icon: 'Smartphone',
  color: 'rose',
  components: [
    {
      id: 'mdm',
      pillarId: '7-endgeraete-mobile',
      order: 1,
      nameKey: 'pillars.7.components.mdm.name',
      scenarioKey: 'pillars.7.components.mdm.scenario',
      solutionKey: 'pillars.7.components.mdm.solution',
      benefitKey: 'pillars.7.components.mdm.benefit',
      nextStepKey: 'pillars.7.components.mdm.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. i',
          descriptionKey: 'pillars.7.components.mdm.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32 Abs. 1',
          descriptionKey: 'pillars.7.components.mdm.legal.dsgvo',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 9.3',
          descriptionKey: 'pillars.7.components.mdm.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI SYS.3.2.2',
          descriptionKey: 'pillars.7.components.mdm.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'tisax', 'bsi-grundschutz'],
    },
    {
      id: 'endpoint-detection',
      pillarId: '7-endgeraete-mobile',
      order: 2,
      nameKey: 'pillars.7.components.endpoint-detection.name',
      scenarioKey: 'pillars.7.components.endpoint-detection.scenario',
      solutionKey: 'pillars.7.components.endpoint-detection.solution',
      benefitKey: 'pillars.7.components.endpoint-detection.benefit',
      nextStepKey: 'pillars.7.components.endpoint-detection.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. b',
          descriptionKey:
            'pillars.7.components.endpoint-detection.legal.nis2',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 10',
          descriptionKey:
            'pillars.7.components.endpoint-detection.legal.dora',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI SYS.2.1',
          descriptionKey:
            'pillars.7.components.endpoint-detection.legal.bsi',
        },
        {
          regulationId: 'kritis',
          articleKey: 'BSIG 8a Abs. 1',
          descriptionKey:
            'pillars.7.components.endpoint-detection.legal.kritis',
        },
      ],
      regulationIds: ['nis2', 'dora', 'bsi-grundschutz', 'kritis'],
    },
    {
      id: 'byod',
      pillarId: '7-endgeraete-mobile',
      order: 3,
      nameKey: 'pillars.7.components.byod.name',
      scenarioKey: 'pillars.7.components.byod.scenario',
      solutionKey: 'pillars.7.components.byod.solution',
      benefitKey: 'pillars.7.components.byod.benefit',
      nextStepKey: 'pillars.7.components.byod.nextStep',
      legalReferences: [
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32',
          descriptionKey: 'pillars.7.components.byod.legal.dsgvo',
        },
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. i',
          descriptionKey: 'pillars.7.components.byod.legal.nis2',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI SYS.3.2.1',
          descriptionKey: 'pillars.7.components.byod.legal.bsi',
        },
      ],
      regulationIds: ['dsgvo', 'nis2', 'bsi-grundschutz', 'tisax'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
