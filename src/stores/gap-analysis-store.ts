import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Answer, MaturityLevel } from '@/lib/nis2/types';

interface GapAnalysisState {
  // Navigation state
  currentCategoryIndex: number;

  // Answers (persisted to localStorage)
  answers: Answer[];

  // Endowed Progress (Schnellcheck → Gap-Analysis bonus)
  hasCompletedQuickCheck: boolean;

  // Tiered assessment phase (core = 30 questions, advanced = 20 deepening questions)
  assessmentPhase: 'core' | 'advanced';

  // Actions
  setCategoryIndex: (index: number) => void;
  nextCategory: () => void;
  prevCategory: () => void;
  updateAnswers: (categoryAnswers: Answer[]) => void;
  getAnswersByCategory: (categoryId: string) => Answer[];
  getAnsweredCount: () => number;
  setHasCompletedQuickCheck: (value: boolean) => void;
  setAssessmentPhase: (phase: 'core' | 'advanced') => void;
  resetPhase: () => void;
  reset: () => void;
}

export const useGapAnalysisStore = create<GapAnalysisState>()(
  persist(
    (set, get) => ({
      currentCategoryIndex: 0,
      answers: [],
      hasCompletedQuickCheck: false,
      assessmentPhase: 'core',

      setCategoryIndex: (index) => set({ currentCategoryIndex: index }),

      nextCategory: () =>
        set((state) => ({
          currentCategoryIndex: Math.min(state.currentCategoryIndex + 1, 9),
        })),

      prevCategory: () =>
        set((state) => ({
          currentCategoryIndex: Math.max(state.currentCategoryIndex - 1, 0),
        })),

      updateAnswers: (categoryAnswers) =>
        set((state) => {
          // Merge strategy: remove existing answers with matching questionId, then add new ones
          const questionIds = new Set(categoryAnswers.map((a) => a.questionId));
          const filtered = state.answers.filter(
            (a) => !questionIds.has(a.questionId)
          );
          return {
            answers: [...filtered, ...categoryAnswers],
          };
        }),

      getAnswersByCategory: (categoryId) => {
        const state = get();
        return state.answers.filter((a) => a.categoryId === categoryId);
      },

      getAnsweredCount: () => {
        const state = get();
        return state.answers.length;
      },

      setHasCompletedQuickCheck: (value) => set({ hasCompletedQuickCheck: value }),

      setAssessmentPhase: (phase) => set({ assessmentPhase: phase }),

      resetPhase: () =>
        set((state) => {
          if (state.assessmentPhase === 'core') {
            // Remove core answers (q1, q2, q3) — keep advanced
            const advancedAnswers = state.answers.filter((a) => {
              const qNum = a.questionId.split('-q')[1];
              return qNum && parseInt(qNum) > 3;
            });
            return { currentCategoryIndex: 0, answers: advancedAnswers };
          } else {
            // Remove advanced answers (q4, q5) — keep core
            const coreAnswers = state.answers.filter((a) => {
              const qNum = a.questionId.split('-q')[1];
              return qNum && parseInt(qNum) <= 3;
            });
            return { currentCategoryIndex: 0, answers: coreAnswers };
          }
        }),

      reset: () => set({ currentCategoryIndex: 0, answers: [], hasCompletedQuickCheck: false, assessmentPhase: 'core' }),
    }),
    {
      name: 'nis2-gap-analysis-storage', // localStorage key
      partialize: (state) => ({
        answers: state.answers,
        currentCategoryIndex: state.currentCategoryIndex,
        hasCompletedQuickCheck: state.hasCompletedQuickCheck,
        assessmentPhase: state.assessmentPhase,
      }), // Only persist these
    }
  )
);
