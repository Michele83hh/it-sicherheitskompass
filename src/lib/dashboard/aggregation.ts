// src/lib/dashboard/aggregation.ts

import type { Pillar } from '@/lib/pillars/types';
import type {
  RegulationId,
  BaseRecommendation,
  CategoryScore,
} from '@/lib/regulations/types';
import type { OverlapMapping } from '@/lib/regulations/overlaps';
import type { PillarScore } from '@/lib/pillars/scoring';
import type { TrendInfo } from './score-history';

import { getRegulation, getAllRegulations } from '@/lib/regulations/registry';
import { calculatePillarScores } from '@/lib/pillars/scoring';
import { calculateOverallScore, getTrafficLight } from '@/lib/scoring/engine';
import { findSynergies } from '@/lib/regulations/overlaps';
import { generateRoadmap } from '@/lib/regulations/nis2/roadmap';
import { calculateTotalCost, calculateAdjustedTotalCost } from '@/lib/regulations/nis2/cost-estimation';
import type { CompanyProfile } from '@/lib/regulations/nis2/cost-estimation';
import { getAlsoCoveredBy } from '@/lib/regulations/recommendation-mappings';
import {
  getScoreHistory,
  saveScoreSnapshot,
  getTrend,
} from './score-history';
import {
  Shield,
  Lock,
  Building2,
  Landmark,
  Car,
  Cpu,
  BookOpen,
  Award,
  BadgeCheck,
  CreditCard,
  Cloud,
  ShieldCheck,
  LifeBuoy,
  Flag,
  Bug,
} from 'lucide-react';

// ============================================================
// Types
// ============================================================

export interface RegulationStatus {
  id: RegulationId;
  tKey: string;
  icon: typeof Shield;
  color: string;
  hasData: boolean;
  answeredQuestions: number;
  totalQuestions: number;
  score: number | null;
  categoryScores: CategoryScore[];
  recommendations: BaseRecommendation[];
  quickCheck: {
    hasData: boolean;
    score: number | null;
    completed: boolean;
  };
}

interface PillarWithScore {
  pillar: Pillar;
  score: PillarScore;
}

export interface DashboardData {
  regulations: RegulationStatus[];
  completedCount: number;
  totalRelevant: number;

  overallScore: number;
  securityLevel: string;
  trend: TrendInfo;

  pillarGroups: {
    critical: PillarWithScore[];
    inProgress: PillarWithScore[];
    stable: PillarWithScore[];
    noData: PillarWithScore[];
  };
  pillarScores: PillarScore[];

  nextBestAction: {
    recommendation: BaseRecommendation;
    regulationId: string;
    regulationTKey: string;
    categoryName: string;
    categoryScore: number;
    effortLabel: string;
    costRange?: { min: number; max: number };
    crossRegCount: number;
  } | null;

  costOverview: {
    totalDays: { min: number; max: number };
    totalEur: { min: number; max: number };
    toolsEurYear: { min: number; max: number };
    isAdjusted: boolean;
  } | null;

  roadmapSummary: {
    quickWinCount: number;
    coreCount: number;
    strategicCount: number;
    criticalCount: number;
  };

  progressOverview: {
    totalRecommendations: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    completionPercent: number;
  };

  synergies: OverlapMapping[];
  navigatorData: NavigatorResults | null;
}

export interface NavigatorResults {
  industry: string;
  companySize: string;
  results: Array<{
    id: string;
    relevance: string;
    score: number;
    reasonKey: string;
  }>;
  completedAt: string;
}

// ============================================================
// Storage Keys
// ============================================================

const REG_META: {
  id: RegulationId;
  tKey: string;
  icon: typeof Shield;
  color: string;
  storageKey: string;
}[] = [
  { id: 'nis2', tKey: 'nis2', icon: Shield, color: 'blue', storageKey: 'nis2-assessment-storage' },
  { id: 'dsgvo', tKey: 'dsgvo', icon: Lock, color: 'emerald', storageKey: 'dsgvo-assessment-storage' },
  { id: 'kritis', tKey: 'kritis', icon: Building2, color: 'red', storageKey: 'kritis-assessment-storage' },
  { id: 'dora', tKey: 'dora', icon: Landmark, color: 'amber', storageKey: 'dora-assessment-storage' },
  { id: 'tisax', tKey: 'tisax', icon: Car, color: 'violet', storageKey: 'tisax-assessment-storage' },
  { id: 'cra', tKey: 'cra', icon: Cpu, color: 'cyan', storageKey: 'cra-assessment-storage' },
  { id: 'bsi-grundschutz', tKey: 'bsiGrundschutz', icon: BookOpen, color: 'slate', storageKey: 'bsi-grundschutz-assessment-storage' },
  { id: 'iso27001', tKey: 'iso27001', icon: Award, color: 'teal', storageKey: 'iso27001-assessment-storage' },
  { id: 'soc2', tKey: 'soc2', icon: BadgeCheck, color: 'sky', storageKey: 'soc2-assessment-storage' },
  { id: 'pci-dss', tKey: 'pciDss', icon: CreditCard, color: 'indigo', storageKey: 'pci-dss-assessment-storage' },
  { id: 'c5', tKey: 'c5', icon: Cloud, color: 'purple', storageKey: 'c5-assessment-storage' },
  { id: 'cis-controls', tKey: 'cisControls', icon: ShieldCheck, color: 'sky', storageKey: 'cis-controls-assessment-storage' },
  { id: 'iso22301', tKey: 'iso22301', icon: LifeBuoy, color: 'orange', storageKey: 'iso22301-assessment-storage' },
  { id: 'nist-csf', tKey: 'nistCsf', icon: Flag, color: 'indigo', storageKey: 'nist-csf-assessment-storage' },
  { id: 'owasp-asvs', tKey: 'owaspAsvs', icon: Bug, color: 'lime', storageKey: 'owasp-asvs-assessment-storage' },
];

// ============================================================
// Security Level Mapping
// ============================================================

export function getSecurityLevel(score: number): string {
  if (score < 40) return 'none';
  if (score < 55) return 'partial';
  if (score < 70) return 'building';
  if (score < 85) return 'standard';
  return 'elevated';
}

// ============================================================
// Main Aggregation
// ============================================================

function readQuickCheckData(regId: string): { hasData: boolean; score: number | null; completed: boolean } {
  try {
    const raw = localStorage.getItem(`${regId}-quick-check-storage`);
    if (!raw) return { hasData: false, score: null, completed: false };
    const data = JSON.parse(raw);
    const state = data.state || data;
    const answers: { questionId: string; value: string }[] = state.answers || [];
    if (answers.length === 0) return { hasData: false, score: null, completed: false };

    const total = answers.reduce((sum, a) => {
      if (a.value === 'yes') return sum + 100;
      if (a.value === 'partial') return sum + 50;
      return sum;
    }, 0);
    return {
      hasData: true,
      score: Math.round(total / answers.length),
      completed: state.completed ?? false,
    };
  } catch {
    return { hasData: false, score: null, completed: false };
  }
}

export function aggregateDashboardData(pillars: Pillar[]): DashboardData {
  // 1. Load navigator data
  let navigatorData: NavigatorResults | null = null;
  try {
    const navRaw = localStorage.getItem('navigator-results-storage');
    if (navRaw) navigatorData = JSON.parse(navRaw);
  } catch { /* ignore */ }

  // 2. Load regulation statuses
  const regulations: RegulationStatus[] = REG_META.map((reg) => {
    const config = getRegulation(reg.id);
    const totalQuestions = config?.questions.length ?? 50;
    const quickCheck = readQuickCheckData(reg.id);

    try {
      const raw = localStorage.getItem(reg.storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        const state = data.state || data;
        const answers = state.answers || [];

        if (answers.length > 0 && config) {
          const categories = config.categories.map((cat) => ({
            categoryId: cat.id,
            totalQuestions: cat.questions.length,
          }));
          const overall = calculateOverallScore(answers, categories);

          return {
            id: reg.id,
            tKey: reg.tKey,
            icon: reg.icon,
            color: reg.color,
            hasData: true,
            answeredQuestions: answers.length,
            totalQuestions,
            score: Math.round(overall.percentage),
            categoryScores: overall.categoryScores,
            recommendations: config.recommendations,
            quickCheck,
          };
        }
      }
    } catch { /* ignore */ }

    return {
      id: reg.id,
      tKey: reg.tKey,
      icon: reg.icon,
      color: reg.color,
      hasData: false,
      answeredQuestions: 0,
      totalQuestions,
      score: null,
      categoryScores: [],
      recommendations: config?.recommendations ?? [],
      quickCheck,
    };
  });

  // 3. Overall score
  const regsWithData = regulations.filter((r) => r.hasData);
  const overallScore = regsWithData.length > 0
    ? Math.round(regsWithData.reduce((sum, r) => sum + (r.score || 0), 0) / regsWithData.length)
    : 0;

  // 4. Score history + trend
  const scoreMap: Record<string, number> = {};
  for (const r of regsWithData) {
    if (r.score !== null) scoreMap[r.id] = r.score;
  }
  saveScoreSnapshot(scoreMap, overallScore);
  const history = getScoreHistory();
  const trend = getTrend(history);

  // 5. Pillar scores + grouping
  const pillarScores = calculatePillarScores(pillars);
  const pillarGroups = {
    critical: [] as PillarWithScore[],
    inProgress: [] as PillarWithScore[],
    stable: [] as PillarWithScore[],
    noData: [] as PillarWithScore[],
  };

  for (const p of pillars) {
    const ps = pillarScores.find((s) => s.pillarId === p.id);
    if (!ps) continue;
    const entry = { pillar: p, score: ps };

    if (ps.score === null) {
      pillarGroups.noData.push(entry);
    } else if (ps.score < 40) {
      pillarGroups.critical.push(entry);
    } else if (ps.score < 70) {
      pillarGroups.inProgress.push(entry);
    } else {
      pillarGroups.stable.push(entry);
    }
  }

  // Sort each group by pillar number ascending
  const sortByNumber = (a: PillarWithScore, b: PillarWithScore) =>
    a.pillar.number - b.pillar.number;
  pillarGroups.critical.sort(sortByNumber);
  pillarGroups.inProgress.sort(sortByNumber);
  pillarGroups.stable.sort(sortByNumber);
  pillarGroups.noData.sort(sortByNumber);

  // 6. Next Best Action
  let nextBestAction: DashboardData['nextBestAction'] = null;
  {
    const candidates: {
      rec: BaseRecommendation;
      regId: RegulationId;
      regTKey: string;
      catScore: CategoryScore;
      crossRegCount: number;
    }[] = [];

    for (const reg of regsWithData) {
      for (const rec of reg.recommendations) {
        const catScore = reg.categoryScores.find((cs) => cs.categoryId === rec.categoryId);
        if (!catScore) continue;
        // Filter: quick effort + red or yellow category
        if (rec.effortLevel !== 'quick') continue;
        if (catScore.trafficLight !== 'red' && catScore.trafficLight !== 'yellow') continue;

        const crossRegs = getAlsoCoveredBy(rec.id, reg.id);
        candidates.push({
          rec,
          regId: reg.id,
          regTKey: reg.tKey,
          catScore,
          crossRegCount: crossRegs.length,
        });
      }
    }

    // Sort: category score asc, then priority high first, then cross-reg boost
    candidates.sort((a, b) => {
      const scoreDiff = a.catScore.percentage - b.catScore.percentage;
      if (scoreDiff !== 0) return scoreDiff;
      const priOrder = { high: 0, medium: 1, low: 2 };
      const priDiff = priOrder[a.rec.priority] - priOrder[b.rec.priority];
      if (priDiff !== 0) return priDiff;
      return b.crossRegCount - a.crossRegCount;
    });

    if (candidates.length > 0) {
      const best = candidates[0];
      const config = getRegulation(best.regId);
      const catName = config?.categories.find((c) => c.id === best.catScore.categoryId)?.nameKey ?? '';

      nextBestAction = {
        recommendation: best.rec,
        regulationId: best.regId,
        regulationTKey: best.regTKey,
        categoryName: catName,
        categoryScore: best.catScore.percentage,
        effortLabel: best.rec.effortLevel,
        crossRegCount: best.crossRegCount,
      };
    }
  }

  // 7. Cost overview (NIS2 only)
  let costOverview: DashboardData['costOverview'] = null;
  const nis2Status = regulations.find((r) => r.id === 'nis2');
  if (nis2Status?.hasData && nis2Status.categoryScores.length > 0) {
    const recIds = nis2Status.recommendations.map((r) => r.id);
    const baseCost = calculateTotalCost(recIds);

    // Check for company profile in quick-check data
    let profile: CompanyProfile | null = null;
    try {
      const qcRaw = localStorage.getItem('nis2-quick-check-storage');
      if (qcRaw) {
        const qcData = JSON.parse(qcRaw);
        const state = qcData.state || qcData;
        if (state.classificationResult) {
          const cr = state.classificationResult;
          const sizeMapping: Record<string, number> = {
            'micro': 25, 'small': 75, 'medium': 150, 'large': 500
          };
          profile = {
            employees: sizeMapping[navigatorData?.companySize ?? ''] ?? 100,
            entityCategory: cr.entityCategory || 'wichtig',
            isKritis: cr.isKritis || false,
          };
        }
      }
    } catch { /* ignore */ }

    if (profile) {
      const adjusted = calculateAdjustedTotalCost(
        recIds,
        nis2Status.categoryScores,
        profile
      );
      costOverview = {
        totalDays: adjusted.totalAdjustedDays,
        totalEur: adjusted.totalAdjusted,
        toolsEurYear: { min: 0, max: 0 }, // Not available from adjusted
        isAdjusted: true,
      };
    } else {
      costOverview = {
        totalDays: { min: Math.round(baseCost.min / 500), max: Math.round(baseCost.max / 500) },
        totalEur: baseCost,
        toolsEurYear: { min: 0, max: 0 },
        isAdjusted: false,
      };
    }
  }

  // 8. Roadmap summary (aggregated from all regs with data)
  let roadmapSummary = { quickWinCount: 0, coreCount: 0, strategicCount: 0, criticalCount: 0 };
  for (const reg of regsWithData) {
    if (reg.categoryScores.length > 0) {
      const phases = generateRoadmap(reg.categoryScores, reg.recommendations);
      roadmapSummary.quickWinCount += phases[0]?.items.length ?? 0;
      roadmapSummary.coreCount += phases[1]?.items.length ?? 0;
      roadmapSummary.strategicCount += phases[2]?.items.length ?? 0;
      roadmapSummary.criticalCount += phases.reduce(
        (sum, p) => sum + p.items.filter((i) => i.urgency === 'critical').length,
        0
      );
    }
  }

  // 9. Progress overview (from progress store)
  let progressOverview = {
    totalRecommendations: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    completionPercent: 0,
  };

  try {
    const progressRaw = localStorage.getItem('nis2-progress-storage');
    if (progressRaw) {
      const progressData = JSON.parse(progressRaw);
      const state = progressData.state || progressData;
      const items = state.progress || [];

      const totalRecs = regsWithData.reduce((sum, r) => sum + r.recommendations.length, 0);
      const completed = items.filter((p: { status: string }) => p.status === 'completed').length;
      const inProg = items.filter((p: { status: string }) => p.status === 'in-progress').length;

      progressOverview = {
        totalRecommendations: totalRecs,
        completed,
        inProgress: inProg,
        notStarted: totalRecs - completed - inProg,
        completionPercent: totalRecs > 0 ? Math.round((completed / totalRecs) * 100) : 0,
      };
    } else {
      const totalRecs = regsWithData.reduce((sum, r) => sum + r.recommendations.length, 0);
      progressOverview.totalRecommendations = totalRecs;
      progressOverview.notStarted = totalRecs;
    }
  } catch {
    const totalRecs = regsWithData.reduce((sum, r) => sum + r.recommendations.length, 0);
    progressOverview.totalRecommendations = totalRecs;
    progressOverview.notStarted = totalRecs;
  }

  // 10. Synergies
  const completedIds = regsWithData.map((r) => r.id);
  const synergies = completedIds.length >= 2 ? findSynergies(completedIds) : [];

  // 11. Computed: relevant regulations from navigator
  const relevantRegs = navigatorData
    ? navigatorData.results.filter((r) => r.relevance === 'high' || r.relevance === 'medium')
    : [];
  const completedCount = regsWithData.length;
  const totalRelevant = Math.max(
    relevantRegs.length || regulations.length,
    completedCount
  );

  return {
    regulations,
    completedCount,
    totalRelevant,
    overallScore,
    securityLevel: getSecurityLevel(overallScore),
    trend,
    pillarGroups,
    pillarScores,
    nextBestAction,
    costOverview,
    roadmapSummary,
    progressOverview,
    synergies,
    navigatorData,
  };
}
