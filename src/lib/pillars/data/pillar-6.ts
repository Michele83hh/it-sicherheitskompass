// src/lib/pillars/data/pillar-6.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '6-anwendungen-cloud',
  number: 6,
  nameKey: 'pillars.6.name',
  descriptionKey: 'pillars.6.description',
  icon: 'Cloud',
  color: 'indigo',
  components: [
    {
      id: 'shared-responsibility',
      pillarId: '6-anwendungen-cloud',
      order: 1,
      nameKey: 'pillars.6.components.shared-responsibility.name',
      scenarioKey: 'pillars.6.components.shared-responsibility.scenario',
      solutionKey: 'pillars.6.components.shared-responsibility.solution',
      benefitKey: 'pillars.6.components.shared-responsibility.benefit',
      nextStepKey: 'pillars.6.components.shared-responsibility.nextStep',
      interactiveFeature: 'shared-responsibility-diagram',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. d',
          descriptionKey:
            'pillars.6.components.shared-responsibility.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 28',
          descriptionKey:
            'pillars.6.components.shared-responsibility.legal.dsgvo',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 28-30',
          descriptionKey:
            'pillars.6.components.shared-responsibility.legal.dora',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI OPS.2.2',
          descriptionKey:
            'pillars.6.components.shared-responsibility.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'dora', 'bsi-grundschutz'],
    },
    {
      id: 'sbom',
      pillarId: '6-anwendungen-cloud',
      order: 2,
      nameKey: 'pillars.6.components.sbom.name',
      scenarioKey: 'pillars.6.components.sbom.scenario',
      solutionKey: 'pillars.6.components.sbom.solution',
      benefitKey: 'pillars.6.components.sbom.benefit',
      nextStepKey: 'pillars.6.components.sbom.nextStep',
      legalReferences: [
        {
          regulationId: 'cra',
          articleKey: 'CRA Art. 10 Abs. 6, Anhang I Teil II Nr. 1',
          descriptionKey: 'pillars.6.components.sbom.legal.cra',
        },
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. e',
          descriptionKey: 'pillars.6.components.sbom.legal.nis2',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 8 Abs. 4',
          descriptionKey: 'pillars.6.components.sbom.legal.dora',
        },
      ],
      regulationIds: ['cra', 'nis2', 'dora', 'bsi-grundschutz'],
    },
    {
      id: 'api-sicherheit',
      pillarId: '6-anwendungen-cloud',
      order: 3,
      nameKey: 'pillars.6.components.api-sicherheit.name',
      scenarioKey: 'pillars.6.components.api-sicherheit.scenario',
      solutionKey: 'pillars.6.components.api-sicherheit.solution',
      benefitKey: 'pillars.6.components.api-sicherheit.benefit',
      nextStepKey: 'pillars.6.components.api-sicherheit.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. e',
          descriptionKey:
            'pillars.6.components.api-sicherheit.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 25, Art. 32',
          descriptionKey:
            'pillars.6.components.api-sicherheit.legal.dsgvo',
        },
        {
          regulationId: 'cra',
          articleKey: 'CRA Anhang I Teil I Nr. 2',
          descriptionKey:
            'pillars.6.components.api-sicherheit.legal.cra',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'cra', 'dora'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
