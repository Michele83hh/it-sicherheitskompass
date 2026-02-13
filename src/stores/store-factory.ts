// src/stores/store-factory.ts

/**
 * Generic store factory for creating per-regulation Zustand stores.
 *
 * Each regulation gets its own localStorage-persisted stores for:
 * - Assessment (gap analysis answers + navigation)
 * - Quick Check (simplified yes/partial/no answers)
 * - Progress (recommendation implementation tracking)
 * - PDF Sections (export section toggles)
 *
 * Storage keys follow the pattern: `{regulationId}-{storeName}-storage`
 */

import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Answer, MaturityLevel, QuickCheckAnswer, QuickCheckValue } from '@/lib/regulations/types';

// ============================================================
// Generic PDF Sections Store
// ============================================================

export type GenericPdfSectionKey = 'roadmap' | 'progress' | 'costSummary' | 'crossRegOverlap';

export interface GenericPdfSectionsState {
  sections: Record<GenericPdfSectionKey, boolean>;
  toggleSection: (key: GenericPdfSectionKey) => void;
  selectAll: () => void;
  deselectAll: () => void;
}

const GENERIC_ALL_TRUE: Record<GenericPdfSectionKey, boolean> = {
  roadmap: true,
  progress: true,
  costSummary: true,
  crossRegOverlap: true,
};

const GENERIC_ALL_FALSE: Record<GenericPdfSectionKey, boolean> = {
  roadmap: false,
  progress: false,
  costSummary: false,
  crossRegOverlap: false,
};

const pdfSectionsStoreCache = new Map<string, UseBoundStore<StoreApi<GenericPdfSectionsState>>>();

export function createPdfSectionsStore(
  regulationId: string
): UseBoundStore<StoreApi<GenericPdfSectionsState>> {
  const cached = pdfSectionsStoreCache.get(regulationId);
  if (cached) return cached;

  const store = create<GenericPdfSectionsState>()(
    persist(
      (set) => ({
        sections: { ...GENERIC_ALL_TRUE },
        toggleSection: (key) =>
          set((state) => ({
            sections: { ...state.sections, [key]: !state.sections[key] },
          })),
        selectAll: () => set({ sections: { ...GENERIC_ALL_TRUE } }),
        deselectAll: () => set({ sections: { ...GENERIC_ALL_FALSE } }),
      }),
      {
        name: `${regulationId}-pdf-sections-storage`,
      }
    )
  );

  pdfSectionsStoreCache.set(regulationId, store);
  return store;
}

// ============================================================
// Assessment Store
// ============================================================

export interface AssessmentState {
  currentCategoryIndex: number;
  answers: Answer[];
  hasCompletedQuickCheck: boolean;
  assessmentPhase: 'core' | 'advanced';
  setCategoryIndex: (index: number) => void;
  nextCategory: (maxIndex: number) => void;
  prevCategory: () => void;
  updateAnswers: (categoryAnswers: Answer[]) => void;
  getAnswersByCategory: (categoryId: string) => Answer[];
  getAnsweredCount: () => number;
  setHasCompletedQuickCheck: (value: boolean) => void;
  setAssessmentPhase: (phase: 'core' | 'advanced') => void;
  resetPhase: () => void;
  reset: () => void;
}

export function createAssessmentStore(
  regulationId: string
): UseBoundStore<StoreApi<AssessmentState>> {
  return create<AssessmentState>()(
    persist(
      (set, get) => ({
        currentCategoryIndex: 0,
        answers: [],
        hasCompletedQuickCheck: false,
        assessmentPhase: 'core',

        setCategoryIndex: (index) => set({ currentCategoryIndex: index }),

        nextCategory: (maxIndex) =>
          set((state) => ({
            currentCategoryIndex: Math.min(state.currentCategoryIndex + 1, maxIndex),
          })),

        prevCategory: () =>
          set((state) => ({
            currentCategoryIndex: Math.max(state.currentCategoryIndex - 1, 0),
          })),

        updateAnswers: (categoryAnswers) =>
          set((state) => {
            const questionIds = new Set(categoryAnswers.map((a) => a.questionId));
            const filtered = state.answers.filter((a) => !questionIds.has(a.questionId));
            return { answers: [...filtered, ...categoryAnswers] };
          }),

        getAnswersByCategory: (categoryId) => {
          return get().answers.filter((a) => a.categoryId === categoryId);
        },

        getAnsweredCount: () => get().answers.length,

        setHasCompletedQuickCheck: (value) => set({ hasCompletedQuickCheck: value }),

        setAssessmentPhase: (phase) => set({ assessmentPhase: phase }),

        resetPhase: () =>
          set((state) => {
            if (state.assessmentPhase === 'core') {
              const advancedAnswers = state.answers.filter((a) => {
                const qNum = a.questionId.split('-q')[1];
                return qNum && parseInt(qNum) > 3;
              });
              return { currentCategoryIndex: 0, answers: advancedAnswers };
            } else {
              const coreAnswers = state.answers.filter((a) => {
                const qNum = a.questionId.split('-q')[1];
                return qNum && parseInt(qNum) <= 3;
              });
              return { currentCategoryIndex: 0, answers: coreAnswers };
            }
          }),

        reset: () =>
          set({
            currentCategoryIndex: 0,
            answers: [],
            hasCompletedQuickCheck: false,
            assessmentPhase: 'core',
          }),
      }),
      {
        name: `${regulationId}-assessment-storage`,
        partialize: (state) => ({
          answers: state.answers,
          currentCategoryIndex: state.currentCategoryIndex,
          hasCompletedQuickCheck: state.hasCompletedQuickCheck,
          assessmentPhase: state.assessmentPhase,
        }),
      }
    )
  );
}

// ============================================================
// Quick Check Store
// ============================================================

export interface QuickCheckState {
  answers: QuickCheckAnswer[];
  completed: boolean;
  setAnswer: (questionId: string, value: QuickCheckValue) => void;
  reset: () => void;
  getScore: () => number;
}

export function createQuickCheckStore(
  regulationId: string,
  totalQuestions = 10
): UseBoundStore<StoreApi<QuickCheckState>> {
  return create<QuickCheckState>()(
    persist(
      (set, get) => ({
        answers: [],
        completed: false,

        setAnswer: (questionId, value) =>
          set((state) => {
            const filtered = state.answers.filter((a) => a.questionId !== questionId);
            const newAnswers = [...filtered, { questionId, value }];
            return { answers: newAnswers, completed: newAnswers.length >= totalQuestions };
          }),

        reset: () => set({ answers: [], completed: false }),

        getScore: () => {
          const { answers } = get();
          if (answers.length === 0) return 0;
          const total = answers.reduce((sum, a) => {
            if (a.value === 'yes') return sum + 100;
            if (a.value === 'partial') return sum + 50;
            return sum;
          }, 0);
          return Math.round(total / answers.length);
        },
      }),
      {
        name: `${regulationId}-quick-check-storage`,
        partialize: (state) => ({
          answers: state.answers,
          completed: state.completed,
        }),
      }
    )
  );
}

// ============================================================
// Progress Tracking Store
// ============================================================

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed';

export interface RecommendationProgress {
  recommendationId: string;
  status: ProgressStatus;
  notes: string;
}

export interface ProgressState {
  progress: RecommendationProgress[];
  updateProgress: (recommendationId: string, status: ProgressStatus, notes?: string) => void;
  getProgress: (recommendationId: string) => RecommendationProgress | undefined;
  getProgressByCategory: (categoryId: string, recommendations: { id: string; categoryId: string }[]) => RecommendationProgress[];
  getCompletionPercentage: (totalRecommendations: number) => number;
  getStatusCounts: () => Record<ProgressStatus, number>;
  reset: () => void;
}

export function createProgressStore(
  regulationId: string
): UseBoundStore<StoreApi<ProgressState>> {
  return create<ProgressState>()(
    persist(
      (set, get) => ({
        progress: [],

        updateProgress: (recommendationId, status, notes) =>
          set((state) => {
            const filtered = state.progress.filter((p) => p.recommendationId !== recommendationId);
            return {
              progress: [...filtered, { recommendationId, status, notes: notes ?? '' }],
            };
          }),

        getProgress: (recommendationId) => {
          return get().progress.find((p) => p.recommendationId === recommendationId);
        },

        getProgressByCategory: (categoryId, recommendations) => {
          const catRecIds = recommendations
            .filter((r) => r.categoryId === categoryId)
            .map((r) => r.id);
          return get().progress.filter((p) => catRecIds.includes(p.recommendationId));
        },

        getCompletionPercentage: (totalRecommendations) => {
          const completed = get().progress.filter((p) => p.status === 'completed').length;
          return totalRecommendations > 0 ? Math.round((completed / totalRecommendations) * 100) : 0;
        },

        getStatusCounts: () => {
          const { progress } = get();
          return {
            'not-started': progress.filter((p) => p.status === 'not-started').length,
            'in-progress': progress.filter((p) => p.status === 'in-progress').length,
            completed: progress.filter((p) => p.status === 'completed').length,
          };
        },

        reset: () => set({ progress: [] }),
      }),
      {
        name: `${regulationId}-progress-storage`,
        partialize: (state) => ({ progress: state.progress }),
      }
    )
  );
}
