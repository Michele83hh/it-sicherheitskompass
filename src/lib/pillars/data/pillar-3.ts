// src/lib/pillars/data/pillar-3.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '3-daten-speicher',
  number: 3,
  nameKey: 'pillars.3.name',
  descriptionKey: 'pillars.3.description',
  icon: 'Database',
  color: 'emerald',
  components: [
    {
      id: 'backup-3-2-1',
      pillarId: '3-daten-speicher',
      order: 1,
      nameKey: 'pillars.3.components.backup-3-2-1.name',
      scenarioKey: 'pillars.3.components.backup-3-2-1.scenario',
      solutionKey: 'pillars.3.components.backup-3-2-1.solution',
      benefitKey: 'pillars.3.components.backup-3-2-1.benefit',
      nextStepKey: 'pillars.3.components.backup-3-2-1.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. c',
          descriptionKey:
            'pillars.3.components.backup-3-2-1.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32 Abs. 1 lit. c',
          descriptionKey:
            'pillars.3.components.backup-3-2-1.legal.dsgvo',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 12',
          descriptionKey:
            'pillars.3.components.backup-3-2-1.legal.dora',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI CON.3',
          descriptionKey:
            'pillars.3.components.backup-3-2-1.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'dora', 'bsi-grundschutz', 'kritis'],
    },
    {
      id: 'verschluesselung',
      pillarId: '3-daten-speicher',
      order: 2,
      nameKey: 'pillars.3.components.verschluesselung.name',
      scenarioKey: 'pillars.3.components.verschluesselung.scenario',
      solutionKey: 'pillars.3.components.verschluesselung.solution',
      benefitKey: 'pillars.3.components.verschluesselung.benefit',
      nextStepKey: 'pillars.3.components.verschluesselung.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. h',
          descriptionKey:
            'pillars.3.components.verschluesselung.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32 Abs. 1 lit. a',
          descriptionKey:
            'pillars.3.components.verschluesselung.legal.dsgvo',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 5.1',
          descriptionKey:
            'pillars.3.components.verschluesselung.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI CON.1',
          descriptionKey:
            'pillars.3.components.verschluesselung.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'tisax', 'bsi-grundschutz'],
    },
    {
      id: 'datenklassifizierung',
      pillarId: '3-daten-speicher',
      order: 3,
      nameKey: 'pillars.3.components.datenklassifizierung.name',
      scenarioKey: 'pillars.3.components.datenklassifizierung.scenario',
      solutionKey: 'pillars.3.components.datenklassifizierung.solution',
      benefitKey: 'pillars.3.components.datenklassifizierung.benefit',
      nextStepKey: 'pillars.3.components.datenklassifizierung.nextStep',
      legalReferences: [
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 9, Art. 30',
          descriptionKey:
            'pillars.3.components.datenklassifizierung.legal.dsgvo',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 8.1',
          descriptionKey:
            'pillars.3.components.datenklassifizierung.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI CON.1',
          descriptionKey:
            'pillars.3.components.datenklassifizierung.legal.bsi',
        },
      ],
      regulationIds: ['dsgvo', 'tisax', 'bsi-grundschutz', 'nis2'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
