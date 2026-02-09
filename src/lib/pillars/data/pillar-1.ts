// src/lib/pillars/data/pillar-1.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '1-leitlinien-verantwortung',
  number: 1,
  nameKey: 'pillars.1.name',
  descriptionKey: 'pillars.1.description',
  icon: 'FileText',
  color: 'blue',
  components: [
    {
      id: 'it-sicherheitspolicy',
      pillarId: '1-leitlinien-verantwortung',
      order: 1,
      nameKey: 'pillars.1.components.it-sicherheitspolicy.name',
      scenarioKey: 'pillars.1.components.it-sicherheitspolicy.scenario',
      solutionKey: 'pillars.1.components.it-sicherheitspolicy.solution',
      benefitKey: 'pillars.1.components.it-sicherheitspolicy.benefit',
      nextStepKey: 'pillars.1.components.it-sicherheitspolicy.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 1',
          descriptionKey:
            'pillars.1.components.it-sicherheitspolicy.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 24',
          descriptionKey:
            'pillars.1.components.it-sicherheitspolicy.legal.dsgvo',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 1.1',
          descriptionKey:
            'pillars.1.components.it-sicherheitspolicy.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI ISMS.1',
          descriptionKey:
            'pillars.1.components.it-sicherheitspolicy.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'tisax', 'bsi-grundschutz', 'kritis'],
    },
    {
      id: 'schulungskonzept',
      pillarId: '1-leitlinien-verantwortung',
      order: 2,
      nameKey: 'pillars.1.components.schulungskonzept.name',
      scenarioKey: 'pillars.1.components.schulungskonzept.scenario',
      solutionKey: 'pillars.1.components.schulungskonzept.solution',
      benefitKey: 'pillars.1.components.schulungskonzept.benefit',
      nextStepKey: 'pillars.1.components.schulungskonzept.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 20 Abs. 2',
          descriptionKey:
            'pillars.1.components.schulungskonzept.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 39 Abs. 1 lit. b',
          descriptionKey:
            'pillars.1.components.schulungskonzept.legal.dsgvo',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI ORP.3',
          descriptionKey:
            'pillars.1.components.schulungskonzept.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'bsi-grundschutz', 'kritis'],
    },
    {
      id: 'risikomanagement',
      pillarId: '1-leitlinien-verantwortung',
      order: 3,
      nameKey: 'pillars.1.components.risikomanagement.name',
      scenarioKey: 'pillars.1.components.risikomanagement.scenario',
      solutionKey: 'pillars.1.components.risikomanagement.solution',
      benefitKey: 'pillars.1.components.risikomanagement.benefit',
      nextStepKey: 'pillars.1.components.risikomanagement.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 1',
          descriptionKey:
            'pillars.1.components.risikomanagement.legal.nis2',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 6',
          descriptionKey:
            'pillars.1.components.risikomanagement.legal.dora',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 1.3',
          descriptionKey:
            'pillars.1.components.risikomanagement.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI 200-3',
          descriptionKey:
            'pillars.1.components.risikomanagement.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dora', 'tisax', 'bsi-grundschutz', 'kritis'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
