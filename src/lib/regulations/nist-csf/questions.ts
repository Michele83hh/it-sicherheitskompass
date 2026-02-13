/**
 * NIST Cybersecurity Framework 2.0 Assessment Questions
 *
 * 18 questions across 6 categories (3 per Function).
 * Questions target management/GF level - clear, non-jargon wording.
 * All user-facing text uses translation keys resolved by next-intl.
 *
 * Maturity levels:
 *   0 = Nothing exists
 *   1 = Informal/ad-hoc
 *   2 = Documented but not systematic
 *   3 = Systematic, regularly reviewed, standards-based
 *
 * Legal basis: NIST CSF 2.0 (February 2024)
 */

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ============================================================
  // Category 1: Govern (GV) - Governance
  // ============================================================
  {
    id: 'nist-gv-q1',
    categoryId: 'govern',
    tier: 'core',
    titleKey: 'nist-csf.questions.gvQ1.title',
    tooltipKey: 'nist-csf.questions.gvQ1.tooltip',
    helpKey: 'nist-csf.questions.gvQ1.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 GV.OC',
      nistCategory: 'GV.OC-01, GV.OC-02',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.gvQ1.maturity.level0',
      level1Key: 'nist-csf.questions.gvQ1.maturity.level1',
      level2Key: 'nist-csf.questions.gvQ1.maturity.level2',
      level3Key: 'nist-csf.questions.gvQ1.maturity.level3',
    },
  },
  {
    id: 'nist-gv-q2',
    categoryId: 'govern',
    tier: 'core',
    titleKey: 'nist-csf.questions.gvQ2.title',
    tooltipKey: 'nist-csf.questions.gvQ2.tooltip',
    helpKey: 'nist-csf.questions.gvQ2.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 GV.RM',
      nistCategory: 'GV.RM-01, GV.RM-02, GV.RM-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.gvQ2.maturity.level0',
      level1Key: 'nist-csf.questions.gvQ2.maturity.level1',
      level2Key: 'nist-csf.questions.gvQ2.maturity.level2',
      level3Key: 'nist-csf.questions.gvQ2.maturity.level3',
    },
  },
  {
    id: 'nist-gv-q3',
    categoryId: 'govern',
    tier: 'core',
    titleKey: 'nist-csf.questions.gvQ3.title',
    tooltipKey: 'nist-csf.questions.gvQ3.tooltip',
    helpKey: 'nist-csf.questions.gvQ3.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 GV.RR',
      nistCategory: 'GV.RR-01, GV.RR-02, GV.RR-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.gvQ3.maturity.level0',
      level1Key: 'nist-csf.questions.gvQ3.maturity.level1',
      level2Key: 'nist-csf.questions.gvQ3.maturity.level2',
      level3Key: 'nist-csf.questions.gvQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 2: Identify (ID) - Asset Management & Risk Assessment
  // ============================================================
  {
    id: 'nist-id-q1',
    categoryId: 'identify',
    tier: 'core',
    titleKey: 'nist-csf.questions.idQ1.title',
    tooltipKey: 'nist-csf.questions.idQ1.tooltip',
    helpKey: 'nist-csf.questions.idQ1.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 ID.AM',
      nistCategory: 'ID.AM-01, ID.AM-02, ID.AM-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.idQ1.maturity.level0',
      level1Key: 'nist-csf.questions.idQ1.maturity.level1',
      level2Key: 'nist-csf.questions.idQ1.maturity.level2',
      level3Key: 'nist-csf.questions.idQ1.maturity.level3',
    },
  },
  {
    id: 'nist-id-q2',
    categoryId: 'identify',
    tier: 'core',
    titleKey: 'nist-csf.questions.idQ2.title',
    tooltipKey: 'nist-csf.questions.idQ2.tooltip',
    helpKey: 'nist-csf.questions.idQ2.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 ID.RA',
      nistCategory: 'ID.RA-01, ID.RA-02, ID.RA-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.idQ2.maturity.level0',
      level1Key: 'nist-csf.questions.idQ2.maturity.level1',
      level2Key: 'nist-csf.questions.idQ2.maturity.level2',
      level3Key: 'nist-csf.questions.idQ2.maturity.level3',
    },
  },
  {
    id: 'nist-id-q3',
    categoryId: 'identify',
    tier: 'core',
    titleKey: 'nist-csf.questions.idQ3.title',
    tooltipKey: 'nist-csf.questions.idQ3.tooltip',
    helpKey: 'nist-csf.questions.idQ3.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 ID.IM',
      nistCategory: 'ID.IM-01, ID.IM-02, ID.IM-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.idQ3.maturity.level0',
      level1Key: 'nist-csf.questions.idQ3.maturity.level1',
      level2Key: 'nist-csf.questions.idQ3.maturity.level2',
      level3Key: 'nist-csf.questions.idQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 3: Protect (PR) - Access Control, Training, Data Security
  // ============================================================
  {
    id: 'nist-pr-q1',
    categoryId: 'protect',
    tier: 'core',
    titleKey: 'nist-csf.questions.prQ1.title',
    tooltipKey: 'nist-csf.questions.prQ1.tooltip',
    helpKey: 'nist-csf.questions.prQ1.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 PR.AA',
      nistCategory: 'PR.AA-01, PR.AA-02, PR.AA-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.prQ1.maturity.level0',
      level1Key: 'nist-csf.questions.prQ1.maturity.level1',
      level2Key: 'nist-csf.questions.prQ1.maturity.level2',
      level3Key: 'nist-csf.questions.prQ1.maturity.level3',
    },
  },
  {
    id: 'nist-pr-q2',
    categoryId: 'protect',
    tier: 'core',
    titleKey: 'nist-csf.questions.prQ2.title',
    tooltipKey: 'nist-csf.questions.prQ2.tooltip',
    helpKey: 'nist-csf.questions.prQ2.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 PR.AT',
      nistCategory: 'PR.AT-01, PR.AT-02',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.prQ2.maturity.level0',
      level1Key: 'nist-csf.questions.prQ2.maturity.level1',
      level2Key: 'nist-csf.questions.prQ2.maturity.level2',
      level3Key: 'nist-csf.questions.prQ2.maturity.level3',
    },
  },
  {
    id: 'nist-pr-q3',
    categoryId: 'protect',
    tier: 'core',
    titleKey: 'nist-csf.questions.prQ3.title',
    tooltipKey: 'nist-csf.questions.prQ3.tooltip',
    helpKey: 'nist-csf.questions.prQ3.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 PR.DS',
      nistCategory: 'PR.DS-01, PR.DS-02, PR.DS-10',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.prQ3.maturity.level0',
      level1Key: 'nist-csf.questions.prQ3.maturity.level1',
      level2Key: 'nist-csf.questions.prQ3.maturity.level2',
      level3Key: 'nist-csf.questions.prQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 4: Detect (DE) - Continuous Monitoring, Detection Processes
  // ============================================================
  {
    id: 'nist-de-q1',
    categoryId: 'detect',
    tier: 'core',
    titleKey: 'nist-csf.questions.deQ1.title',
    tooltipKey: 'nist-csf.questions.deQ1.tooltip',
    helpKey: 'nist-csf.questions.deQ1.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 DE.CM',
      nistCategory: 'DE.CM-01, DE.CM-02, DE.CM-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.deQ1.maturity.level0',
      level1Key: 'nist-csf.questions.deQ1.maturity.level1',
      level2Key: 'nist-csf.questions.deQ1.maturity.level2',
      level3Key: 'nist-csf.questions.deQ1.maturity.level3',
    },
  },
  {
    id: 'nist-de-q2',
    categoryId: 'detect',
    tier: 'core',
    titleKey: 'nist-csf.questions.deQ2.title',
    tooltipKey: 'nist-csf.questions.deQ2.tooltip',
    helpKey: 'nist-csf.questions.deQ2.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 DE.AE',
      nistCategory: 'DE.AE-02, DE.AE-03, DE.AE-06',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.deQ2.maturity.level0',
      level1Key: 'nist-csf.questions.deQ2.maturity.level1',
      level2Key: 'nist-csf.questions.deQ2.maturity.level2',
      level3Key: 'nist-csf.questions.deQ2.maturity.level3',
    },
  },
  {
    id: 'nist-de-q3',
    categoryId: 'detect',
    tier: 'core',
    titleKey: 'nist-csf.questions.deQ3.title',
    tooltipKey: 'nist-csf.questions.deQ3.tooltip',
    helpKey: 'nist-csf.questions.deQ3.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 DE.CM',
      nistCategory: 'DE.CM-06, DE.CM-09',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.deQ3.maturity.level0',
      level1Key: 'nist-csf.questions.deQ3.maturity.level1',
      level2Key: 'nist-csf.questions.deQ3.maturity.level2',
      level3Key: 'nist-csf.questions.deQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 5: Respond (RS) - Response Planning, Communications, Analysis
  // ============================================================
  {
    id: 'nist-rs-q1',
    categoryId: 'respond',
    tier: 'core',
    titleKey: 'nist-csf.questions.rsQ1.title',
    tooltipKey: 'nist-csf.questions.rsQ1.tooltip',
    helpKey: 'nist-csf.questions.rsQ1.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 RS.MA',
      nistCategory: 'RS.MA-01, RS.MA-02, RS.MA-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.rsQ1.maturity.level0',
      level1Key: 'nist-csf.questions.rsQ1.maturity.level1',
      level2Key: 'nist-csf.questions.rsQ1.maturity.level2',
      level3Key: 'nist-csf.questions.rsQ1.maturity.level3',
    },
  },
  {
    id: 'nist-rs-q2',
    categoryId: 'respond',
    tier: 'core',
    titleKey: 'nist-csf.questions.rsQ2.title',
    tooltipKey: 'nist-csf.questions.rsQ2.tooltip',
    helpKey: 'nist-csf.questions.rsQ2.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 RS.CO',
      nistCategory: 'RS.CO-02, RS.CO-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.rsQ2.maturity.level0',
      level1Key: 'nist-csf.questions.rsQ2.maturity.level1',
      level2Key: 'nist-csf.questions.rsQ2.maturity.level2',
      level3Key: 'nist-csf.questions.rsQ2.maturity.level3',
    },
  },
  {
    id: 'nist-rs-q3',
    categoryId: 'respond',
    tier: 'core',
    titleKey: 'nist-csf.questions.rsQ3.title',
    tooltipKey: 'nist-csf.questions.rsQ3.tooltip',
    helpKey: 'nist-csf.questions.rsQ3.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 RS.AN',
      nistCategory: 'RS.AN-03, RS.AN-06, RS.AN-07',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.rsQ3.maturity.level0',
      level1Key: 'nist-csf.questions.rsQ3.maturity.level1',
      level2Key: 'nist-csf.questions.rsQ3.maturity.level2',
      level3Key: 'nist-csf.questions.rsQ3.maturity.level3',
    },
  },

  // ============================================================
  // Category 6: Recover (RC) - Recovery Planning, Improvements, Communications
  // ============================================================
  {
    id: 'nist-rc-q1',
    categoryId: 'recover',
    tier: 'core',
    titleKey: 'nist-csf.questions.rcQ1.title',
    tooltipKey: 'nist-csf.questions.rcQ1.tooltip',
    helpKey: 'nist-csf.questions.rcQ1.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 RC.RP',
      nistCategory: 'RC.RP-01, RC.RP-02, RC.RP-03',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.rcQ1.maturity.level0',
      level1Key: 'nist-csf.questions.rcQ1.maturity.level1',
      level2Key: 'nist-csf.questions.rcQ1.maturity.level2',
      level3Key: 'nist-csf.questions.rcQ1.maturity.level3',
    },
  },
  {
    id: 'nist-rc-q2',
    categoryId: 'recover',
    tier: 'core',
    titleKey: 'nist-csf.questions.rcQ2.title',
    tooltipKey: 'nist-csf.questions.rcQ2.tooltip',
    helpKey: 'nist-csf.questions.rcQ2.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 RC.RP',
      nistCategory: 'RC.RP-04, RC.RP-05, RC.RP-06',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.rcQ2.maturity.level0',
      level1Key: 'nist-csf.questions.rcQ2.maturity.level1',
      level2Key: 'nist-csf.questions.rcQ2.maturity.level2',
      level3Key: 'nist-csf.questions.rcQ2.maturity.level3',
    },
  },
  {
    id: 'nist-rc-q3',
    categoryId: 'recover',
    tier: 'core',
    titleKey: 'nist-csf.questions.rcQ3.title',
    tooltipKey: 'nist-csf.questions.rcQ3.tooltip',
    helpKey: 'nist-csf.questions.rcQ3.help',
    legalReference: {
      nistFunction: 'NIST CSF 2.0 RC.CO',
      nistCategory: 'RC.CO-03, RC.CO-04',
    },
    maturityDescriptions: {
      level0Key: 'nist-csf.questions.rcQ3.maturity.level0',
      level1Key: 'nist-csf.questions.rcQ3.maturity.level1',
      level2Key: 'nist-csf.questions.rcQ3.maturity.level2',
      level3Key: 'nist-csf.questions.rcQ3.maturity.level3',
    },
  },
];

export function getQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId);
}

export function getCoreQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId && q.tier === 'core');
}

export function getAdvancedQuestionsByCategory(categoryId: string): Question[] {
  return QUESTIONS.filter((q) => q.categoryId === categoryId && q.tier === 'advanced');
}

export function getCoreQuestionCount(): number {
  return QUESTIONS.filter((q) => q.tier === 'core').length;
}

export function getAdvancedQuestionCount(): number {
  return QUESTIONS.filter((q) => q.tier === 'advanced').length;
}

export function getTotalQuestionCount(): number {
  return QUESTIONS.length;
}
