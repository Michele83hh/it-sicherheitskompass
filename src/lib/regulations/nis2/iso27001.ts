/**
 * ISO 27001:2022 ↔ NIS2: Zuordnung der Bereiche aus Art. 21 Abs. 2 NIS2-RL
 * zu Controls aus Annex A.
 *
 * Dass sich beide überschneiden, belegt die Zuordnungstabelle der ENISA
 * (ISO27001_SOURCE). Die Auswahl der Controls je Bereich und die Stufe sind
 * eine eigene Einordnung. Prozentwerte gibt es bewusst nicht: Keine Quelle
 * liefert eine belastbare Zahl. Stufen wie in overlaps.ts.
 */

import { REGULATION_OVERLAPS, type OverlapLevel } from '../overlaps';

export const ISO27001_SOURCE = REGULATION_OVERLAPS.find(
  (o) => o.regA === 'nis2' && o.regB === 'iso27001',
)!.source!;

export interface IsoMapping {
  nis2CategoryId: string;
  nis2Reference: string;
  isoControls: string[];
  level: OverlapLevel;
  gapNoteKey: string; // Translation key for what NIS2 adds beyond ISO
}

export const ISO27001_MAPPINGS: IsoMapping[] = [
  {
    nis2CategoryId: 'risk-analysis',
    nis2Reference: 'Art. 21 Abs. 2 lit. a NIS2-RL',
    isoControls: ['A.5.1', 'A.5.2', 'A.5.3', 'A.5.4', 'A.8.1', 'A.8.2', 'A.8.8'],
    level: 'high',
    gapNoteKey: 'iso27001Mapping.gaps.riskAnalysis',
  },
  {
    nis2CategoryId: 'incident-handling',
    nis2Reference: 'Art. 21 Abs. 2 lit. b NIS2-RL',
    isoControls: ['A.5.24', 'A.5.25', 'A.5.26', 'A.5.27', 'A.5.28', 'A.6.8', 'A.8.15', 'A.8.16'],
    level: 'medium',
    gapNoteKey: 'iso27001Mapping.gaps.incidentHandling',
  },
  {
    nis2CategoryId: 'business-continuity',
    nis2Reference: 'Art. 21 Abs. 2 lit. c NIS2-RL',
    isoControls: ['A.5.29', 'A.5.30', 'A.5.31', 'A.8.6', 'A.8.13', 'A.8.14'],
    level: 'medium',
    gapNoteKey: 'iso27001Mapping.gaps.businessContinuity',
  },
  {
    nis2CategoryId: 'supply-chain',
    nis2Reference: 'Art. 21 Abs. 2 lit. d NIS2-RL',
    isoControls: ['A.5.19', 'A.5.20', 'A.5.21', 'A.5.22', 'A.5.23'],
    level: 'medium',
    gapNoteKey: 'iso27001Mapping.gaps.supplyChain',
  },
  {
    nis2CategoryId: 'acquisition-development',
    nis2Reference: 'Art. 21 Abs. 2 lit. e NIS2-RL',
    isoControls: ['A.5.8', 'A.8.8', 'A.8.9', 'A.8.25', 'A.8.26', 'A.8.27', 'A.8.28', 'A.8.29', 'A.8.31'],
    level: 'high',
    gapNoteKey: 'iso27001Mapping.gaps.acquisitionDevelopment',
  },
  {
    nis2CategoryId: 'effectiveness-assessment',
    nis2Reference: 'Art. 21 Abs. 2 lit. f NIS2-RL',
    isoControls: ['A.5.35', 'A.5.36', 'A.8.8', 'A.8.16', 'A.8.34'],
    level: 'medium',
    gapNoteKey: 'iso27001Mapping.gaps.effectivenessAssessment',
  },
  {
    nis2CategoryId: 'cyber-hygiene',
    nis2Reference: 'Art. 21 Abs. 2 lit. g NIS2-RL',
    isoControls: ['A.5.10', 'A.5.15', 'A.6.3', 'A.6.5', 'A.8.1', 'A.8.7', 'A.8.9'],
    level: 'medium',
    gapNoteKey: 'iso27001Mapping.gaps.cyberHygiene',
  },
  {
    nis2CategoryId: 'cryptography',
    nis2Reference: 'Art. 21 Abs. 2 lit. h NIS2-RL',
    isoControls: ['A.5.14', 'A.5.33', 'A.8.10', 'A.8.12', 'A.8.24'],
    level: 'high',
    gapNoteKey: 'iso27001Mapping.gaps.cryptography',
  },
  {
    nis2CategoryId: 'access-control',
    nis2Reference: 'Art. 21 Abs. 2 lit. i NIS2-RL',
    isoControls: [
      'A.5.9', 'A.5.10', 'A.5.11', 'A.5.12', 'A.5.15', 'A.5.16', 'A.5.17', 'A.5.18',
      'A.6.1', 'A.6.2', 'A.6.4', 'A.6.5', 'A.8.2', 'A.8.3', 'A.8.4', 'A.8.5',
    ],
    level: 'high',
    gapNoteKey: 'iso27001Mapping.gaps.accessControl',
  },
  {
    nis2CategoryId: 'authentication-communication',
    nis2Reference: 'Art. 21 Abs. 2 lit. j NIS2-RL',
    isoControls: ['A.5.14', 'A.5.16', 'A.8.5', 'A.8.20', 'A.8.21', 'A.8.22', 'A.8.24'],
    level: 'medium',
    gapNoteKey: 'iso27001Mapping.gaps.authenticationCommunication',
  },
];
