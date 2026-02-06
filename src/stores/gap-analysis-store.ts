import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Answer, MaturityLevel } from '@/lib/nis2/types';

interface GapAnalysisState {
  // Navigation state
  currentCategoryIndex: number;

  // Answers (persisted to localStorage)
  answers: Answer[];

  // Actions
  setCategoryIndex: (index: number) => void;
  nextCategory: () => void;
  prevCategory: () => void;
  updateAnswers: (categoryAnswers: Answer[]) => void;
  getAnswersByCategory: (categoryId: string) => Answer[];
  getAnsweredCount: () => number;
  reset: () => void;
}

export const useGapAnalysisStore = create<GapAnalysisState>()(
  persist(
    (set, get) => ({
      currentCategoryIndex: 0,
      answers: [],

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

      reset: () => set({ currentCategoryIndex: 0, answers: [] }),
    }),
    {
      name: 'nis2-gap-analysis-storage', // localStorage key
      partialize: (state) => ({
        answers: state.answers,
        currentCategoryIndex: state.currentCategoryIndex,
      }), // Only persist these
    }
  )
);
