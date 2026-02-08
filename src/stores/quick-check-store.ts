import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuickCheckAnswer, QuickCheckValue } from '@/lib/nis2/quick-check';
import { calculateQuickCheckScore } from '@/lib/nis2/quick-check';
import type { OverallScore } from '@/lib/nis2/types';

interface QuickCheckState {
  answers: QuickCheckAnswer[];
  completed: boolean;

  setAnswer: (questionId: string, categoryId: string, value: QuickCheckValue) => void;
  reset: () => void;
  getScore: () => OverallScore;
}

export const useQuickCheckStore = create<QuickCheckState>()(
  persist(
    (set, get) => ({
      answers: [],
      completed: false,

      setAnswer: (questionId, categoryId, value) =>
        set((state) => {
          const filtered = state.answers.filter((a) => a.questionId !== questionId);
          const newAnswers = [...filtered, { questionId, categoryId, value }];
          return {
            answers: newAnswers,
            completed: newAnswers.length >= 10,
          };
        }),

      reset: () => set({ answers: [], completed: false }),

      getScore: () => calculateQuickCheckScore(get().answers),
    }),
    {
      name: 'nis2-quick-check-storage',
      partialize: (state) => ({
        answers: state.answers,
        completed: state.completed,
      }),
    }
  )
);
