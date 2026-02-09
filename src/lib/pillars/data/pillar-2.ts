// src/lib/pillars/data/pillar-2.ts

import { registerPillar } from '../registry';
import type { Pillar } from '../types';

const pillar: Pillar = {
  id: '2-zugriff-identitaeten',
  number: 2,
  nameKey: 'pillars.2.name',
  descriptionKey: 'pillars.2.description',
  icon: 'KeyRound',
  color: 'violet',
  components: [
    {
      id: 'mfa',
      pillarId: '2-zugriff-identitaeten',
      order: 1,
      nameKey: 'pillars.2.components.mfa.name',
      scenarioKey: 'pillars.2.components.mfa.scenario',
      solutionKey: 'pillars.2.components.mfa.solution',
      benefitKey: 'pillars.2.components.mfa.benefit',
      nextStepKey: 'pillars.2.components.mfa.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. j',
          descriptionKey: 'pillars.2.components.mfa.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32 Abs. 1',
          descriptionKey: 'pillars.2.components.mfa.legal.dsgvo',
        },
        {
          regulationId: 'dora',
          articleKey: 'DORA Art. 9 Abs. 4 lit. d',
          descriptionKey: 'pillars.2.components.mfa.legal.dora',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI ORP.4',
          descriptionKey: 'pillars.2.components.mfa.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'dora', 'bsi-grundschutz', 'tisax'],
    },
    {
      id: 'rbac',
      pillarId: '2-zugriff-identitaeten',
      order: 2,
      nameKey: 'pillars.2.components.rbac.name',
      scenarioKey: 'pillars.2.components.rbac.scenario',
      solutionKey: 'pillars.2.components.rbac.solution',
      benefitKey: 'pillars.2.components.rbac.benefit',
      nextStepKey: 'pillars.2.components.rbac.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. i',
          descriptionKey: 'pillars.2.components.rbac.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 25 Abs. 2',
          descriptionKey: 'pillars.2.components.rbac.legal.dsgvo',
        },
        {
          regulationId: 'tisax',
          articleKey: 'TISAX AL 4.1',
          descriptionKey: 'pillars.2.components.rbac.legal.tisax',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI ORP.4',
          descriptionKey: 'pillars.2.components.rbac.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'tisax', 'bsi-grundschutz'],
    },
    {
      id: 'passwort-hygiene',
      pillarId: '2-zugriff-identitaeten',
      order: 3,
      nameKey: 'pillars.2.components.passwort-hygiene.name',
      scenarioKey: 'pillars.2.components.passwort-hygiene.scenario',
      solutionKey: 'pillars.2.components.passwort-hygiene.solution',
      benefitKey: 'pillars.2.components.passwort-hygiene.benefit',
      nextStepKey: 'pillars.2.components.passwort-hygiene.nextStep',
      legalReferences: [
        {
          regulationId: 'nis2',
          articleKey: 'NIS2 Art. 21 Abs. 2 lit. j',
          descriptionKey:
            'pillars.2.components.passwort-hygiene.legal.nis2',
        },
        {
          regulationId: 'dsgvo',
          articleKey: 'DSGVO Art. 32 Abs. 1 lit. b',
          descriptionKey:
            'pillars.2.components.passwort-hygiene.legal.dsgvo',
        },
        {
          regulationId: 'bsi-grundschutz',
          articleKey: 'BSI ORP.4',
          descriptionKey:
            'pillars.2.components.passwort-hygiene.legal.bsi',
        },
      ],
      regulationIds: ['nis2', 'dsgvo', 'bsi-grundschutz', 'tisax'],
    },
  ],
};

registerPillar(pillar);
export default pillar;
