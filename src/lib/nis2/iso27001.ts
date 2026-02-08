/**
 * ISO 27001:2022 ↔ NIS2 Crosswalk Mapping
 *
 * Shows alignment between NIS2 Art. 21(2) categories and
 * ISO 27001:2022 Annex A controls. ~68% alignment (research-validated).
 *
 * Sources: ENISA Technical Implementation Guidance v1.0 (2025),
 * BSI Group NIS2→ISO Mapping Tool, Advisera (25/26 covered),
 * OpenKRITIS, Hunt & Hackett, Ceeyu.io (~70% consensus).
 *
 * Helps companies with existing ISO 27001 certification
 * understand their head start on NIS2 compliance.
 */

export interface IsoMapping {
  nis2CategoryId: string;
  nis2Reference: string;
  isoControls: string[];
  alignmentPercentage: number; // 0-100
  gapNoteKey: string; // Translation key for what NIS2 adds beyond ISO
}

export const ISO27001_MAPPINGS: IsoMapping[] = [
  {
    nis2CategoryId: 'risk-analysis',
    nis2Reference: 'Art. 21 Abs. 2 lit. a NIS2-RL',
    isoControls: ['A.5.1', 'A.5.2', 'A.5.3', 'A.5.4', 'A.8.1', 'A.8.2', 'A.8.8'],
    alignmentPercentage: 85, // Source: ENISA, BSI Group, Advisera — risk framework is closest match
    gapNoteKey: 'iso27001.gaps.riskAnalysis',
  },
  {
    nis2CategoryId: 'incident-handling',
    nis2Reference: 'Art. 21 Abs. 2 lit. b NIS2-RL',
    isoControls: ['A.5.24', 'A.5.25', 'A.5.26', 'A.5.27', 'A.5.28', 'A.6.8', 'A.8.15', 'A.8.16'],
    alignmentPercentage: 65, // Source: ENISA, Ceeyu — mandatory 24h/72h BSI reporting has no ISO pendant
    gapNoteKey: 'iso27001.gaps.incidentHandling',
  },
  {
    nis2CategoryId: 'business-continuity',
    nis2Reference: 'Art. 21 Abs. 2 lit. c NIS2-RL',
    isoControls: ['A.5.29', 'A.5.30', 'A.5.31', 'A.8.6', 'A.8.13', 'A.8.14'],
    alignmentPercentage: 70, // Source: Advisera, Cyberday — crisis management completely absent from ISO 27001
    gapNoteKey: 'iso27001.gaps.businessContinuity',
  },
  {
    nis2CategoryId: 'supply-chain',
    nis2Reference: 'Art. 21 Abs. 2 lit. d NIS2-RL',
    isoControls: ['A.5.19', 'A.5.20', 'A.5.21', 'A.5.22', 'A.5.23'],
    alignmentPercentage: 60, // Source: ENISA, ISMS.online — NIS2 far exceeds ISO on supply chain (Art. 22)
    gapNoteKey: 'iso27001.gaps.supplyChain',
  },
  {
    nis2CategoryId: 'acquisition-development',
    nis2Reference: 'Art. 21 Abs. 2 lit. e NIS2-RL',
    isoControls: ['A.5.8', 'A.8.8', 'A.8.9', 'A.8.25', 'A.8.26', 'A.8.27', 'A.8.28', 'A.8.29', 'A.8.31'],
    alignmentPercentage: 75, // Source: ENISA, DataGuard — strong SDLC alignment
    gapNoteKey: 'iso27001.gaps.acquisitionDevelopment',
  },
  {
    nis2CategoryId: 'effectiveness-assessment',
    nis2Reference: 'Art. 21 Abs. 2 lit. f NIS2-RL',
    isoControls: ['A.5.35', 'A.5.36', 'A.8.8', 'A.8.16', 'A.8.34'],
    alignmentPercentage: 70, // Source: ENISA — strong audit/review mechanisms (ISO clause 9)
    gapNoteKey: 'iso27001.gaps.effectivenessAssessment',
  },
  {
    nis2CategoryId: 'cyber-hygiene',
    nis2Reference: 'Art. 21 Abs. 2 lit. g NIS2-RL',
    isoControls: ['A.5.10', 'A.5.15', 'A.6.3', 'A.6.5', 'A.8.1', 'A.8.7', 'A.8.9'],
    alignmentPercentage: 60, // Source: ISMS.online, Kymatio — §38 BSIG management training not in ISO
    gapNoteKey: 'iso27001.gaps.cyberHygiene',
  },
  {
    nis2CategoryId: 'cryptography',
    nis2Reference: 'Art. 21 Abs. 2 lit. h NIS2-RL',
    isoControls: ['A.5.14', 'A.5.33', 'A.8.10', 'A.8.12', 'A.8.24'],
    alignmentPercentage: 65, // Source: ENISA, nFlo — crypto-agility and key management lifecycle gaps
    gapNoteKey: 'iso27001.gaps.cryptography',
  },
  {
    nis2CategoryId: 'access-control',
    nis2Reference: 'Art. 21 Abs. 2 lit. i NIS2-RL',
    isoControls: [
      'A.5.9', 'A.5.10', 'A.5.11', 'A.5.12', 'A.5.15', 'A.5.16', 'A.5.17', 'A.5.18',
      'A.6.1', 'A.6.2', 'A.6.4', 'A.6.5', 'A.8.2', 'A.8.3', 'A.8.4', 'A.8.5',
    ],
    alignmentPercentage: 80, // Source: ENISA, Cyberday — comprehensive access control coverage
    gapNoteKey: 'iso27001.gaps.accessControl',
  },
  {
    nis2CategoryId: 'authentication-communication',
    nis2Reference: 'Art. 21 Abs. 2 lit. j NIS2-RL',
    isoControls: ['A.5.14', 'A.5.16', 'A.8.5', 'A.8.20', 'A.8.21', 'A.8.22', 'A.8.24'],
    alignmentPercentage: 50, // Source: ISDecisions, Rublon — emergency communication has 0% ISO coverage
    gapNoteKey: 'iso27001.gaps.authenticationCommunication',
  },
];

/**
 * Calculate overall alignment percentage
 */
export function calculateOverallAlignment(): number {
  const total = ISO27001_MAPPINGS.reduce(
    (sum, m) => sum + m.alignmentPercentage,
    0
  );
  return Math.round(total / ISO27001_MAPPINGS.length);
}
