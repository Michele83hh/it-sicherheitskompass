// src/lib/pillars/types.ts

/**
 * Types for the 8-Pillar Knowledge Platform
 *
 * Each pillar represents a security domain with multiple components.
 * Components explain IT security topics with scenario -> legal -> solution -> benefit flow.
 */

export interface LegalReference {
  regulationId: string;
  articleKey: string;
  descriptionKey: string;
}

export interface Template {
  id: string;
  nameKey: string;
  descriptionKey: string;
  format: 'xlsx' | 'pdf' | 'docx';
  downloadUrl?: string;
}

export interface PillarComponent {
  id: string;
  pillarId: string;
  order: number;
  nameKey: string;
  scenarioKey: string;
  solutionKey: string;
  benefitKey: string;
  nextStepKey: string;
  legalReferences: LegalReference[];
  templates?: Template[];
  interactiveFeature?: 'melde-timer' | 'shared-responsibility-diagram' | null;
  regulationIds: string[];
}

export interface Pillar {
  id: string;
  number: number;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  components: PillarComponent[];
}

export const PILLAR_IDS = [
  '1-leitlinien-verantwortung',
  '2-zugriff-identitaeten',
  '3-daten-speicher',
  '4-systeme-betrieb',
  '5-netzwerke-perimeter',
  '6-anwendungen-cloud',
  '7-endgeraete-mobile',
  '8-resilienz-krisen',
] as const;

export type PillarId = (typeof PILLAR_IDS)[number];
