// src/lib/pillars/data/pillar-5.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '5-netzwerke-perimeter',
  number: 5,
  nameKey: 'pillars.5.name',
  descriptionKey: 'pillars.5.description',
  icon: 'Network',
  color: 'cyan',
  components: [
    {
      id: 'next-gen-firewall',
      pillarId: '5-netzwerke-perimeter',
      order: 1,
      nameKey: 'pillars.5.components.next-gen-firewall.name',
      scenarioKey: 'pillars.5.components.next-gen-firewall.scenario',
      solutionKey: 'pillars.5.components.next-gen-firewall.solution',
      benefitKey: 'pillars.5.components.next-gen-firewall.benefit',
      nextStepKey: 'pillars.5.components.next-gen-firewall.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. a',
          descriptionKey:
            'pillars.5.components.next-gen-firewall.legal.nis2',
        },
        {
          regulationId: 'kritis',
          articleKey: 'BSIG 8a Abs. 1',
          descriptionKey:
            'pillars.5.components.next-gen-firewall.legal.kritis',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI NET.3.2',
          descriptionKey:
            'pillars.5.components.next-gen-firewall.legal.bsi',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 9 Abs. 2',
          descriptionKey:
            'pillars.5.components.next-gen-firewall.legal.dora',
        },
      ],
      regulationIds: ['nis2', 'kritis', 'bsi-grundschutz', 'dora'],
    },
    {
      id: 'segmentierung',
      pillarId: '5-netzwerke-perimeter',
      order: 2,
      nameKey: 'pillars.5.components.segmentierung.name',
      scenarioKey: 'pillars.5.components.segmentierung.scenario',
      solutionKey: 'pillars.5.components.segmentierung.solution',
      benefitKey: 'pillars.5.components.segmentierung.benefit',
      nextStepKey: 'pillars.5.components.segmentierung.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. a',
          descriptionKey:
            'pillars.5.components.segmentierung.legal.nis2',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI NET.1.1',
          descriptionKey:
            'pillars.5.components.segmentierung.legal.bsi',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 5.2',
          descriptionKey:
            'pillars.5.components.segmentierung.legal.tisax',
        },
      ],
      regulationIds: ['nis2', 'bsi-grundschutz', 'tisax', 'kritis'],
    },
    {
      id: 'vpn',
      pillarId: '5-netzwerke-perimeter',
      order: 3,
      nameKey: 'pillars.5.components.vpn.name',
      scenarioKey: 'pillars.5.components.vpn.scenario',
      solutionKey: 'pillars.5.components.vpn.solution',
      benefitKey: 'pillars.5.components.vpn.benefit',
      nextStepKey: 'pillars.5.components.vpn.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. h',
          descriptionKey: 'pillars.5.components.vpn.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32 Abs. 1 lit. a',
          descriptionKey: 'pillars.5.components.vpn.legal.dsgvo',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI NET.3.3',
          descriptionKey: 'pillars.5.components.vpn.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'bsi-grundschutz'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
