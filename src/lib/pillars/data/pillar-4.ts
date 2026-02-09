// src/lib/pillars/data/pillar-4.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '4-systeme-betrieb',
  number: 4,
  nameKey: 'pillars.4.name',
  descriptionKey: 'pillars.4.description',
  icon: 'Server',
  color: 'orange',
  components: [
    {
      id: 'patch-management',
      pillarId: '4-systeme-betrieb',
      order: 1,
      nameKey: 'pillars.4.components.patch-management.name',
      scenarioKey: 'pillars.4.components.patch-management.scenario',
      solutionKey: 'pillars.4.components.patch-management.solution',
      benefitKey: 'pillars.4.components.patch-management.benefit',
      nextStepKey: 'pillars.4.components.patch-management.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. e',
          descriptionKey:
            'pillars.4.components.patch-management.legal.nis2',
        },
        {
          regulationId: 'cra',
          articleKey: 'CRA Art. 10 Abs. 6',
          descriptionKey:
            'pillars.4.components.patch-management.legal.cra',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 7',
          descriptionKey:
            'pillars.4.components.patch-management.legal.dora',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI OPS.1.1.3',
          descriptionKey:
            'pillars.4.components.patch-management.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'cra', 'dora', 'bsi-grundschutz', 'kritis'],
    },
    {
      id: 'logging-siem',
      pillarId: '4-systeme-betrieb',
      order: 2,
      nameKey: 'pillars.4.components.logging-siem.name',
      scenarioKey: 'pillars.4.components.logging-siem.scenario',
      solutionKey: 'pillars.4.components.logging-siem.solution',
      benefitKey: 'pillars.4.components.logging-siem.benefit',
      nextStepKey: 'pillars.4.components.logging-siem.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. b',
          descriptionKey:
            'pillars.4.components.logging-siem.legal.nis2',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 10',
          descriptionKey:
            'pillars.4.components.logging-siem.legal.dora',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI OPS.1.1.5',
          descriptionKey:
            'pillars.4.components.logging-siem.legal.bsi',
        },
        {
          regulationId: 'kritis',
          articleKey: 'BSIG 8a Abs. 1',
          descriptionKey:
            'pillars.4.components.logging-siem.legal.kritis',
        },
      ],
      regulationIds: ['nis2', 'dora', 'bsi-grundschutz', 'kritis'],
    },
    {
      id: 'schatten-it',
      pillarId: '4-systeme-betrieb',
      order: 3,
      nameKey: 'pillars.4.components.schatten-it.name',
      scenarioKey: 'pillars.4.components.schatten-it.scenario',
      solutionKey: 'pillars.4.components.schatten-it.solution',
      benefitKey: 'pillars.4.components.schatten-it.benefit',
      nextStepKey: 'pillars.4.components.schatten-it.nextStep',
      interactiveFeature: null,
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. a',
          descriptionKey:
            'pillars.4.components.schatten-it.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 30',
          descriptionKey:
            'pillars.4.components.schatten-it.legal.dsgvo',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI OPS.1.2.5',
          descriptionKey:
            'pillars.4.components.schatten-it.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'bsi-grundschutz', 'tisax'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
