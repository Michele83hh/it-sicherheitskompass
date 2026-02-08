/**
 * Fortschritts-Tracking Store
 *
 * Zustand persist store for tracking recommendation implementation progress.
 * Allows users to mark recommendations as not-started/in-progress/completed
 * and track overall compliance progress over time.
 *
 * Storage key: 'nis2-progress-storage'
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed';

export interface RecommendationProgress {
  recommendationId: string;
  status: ProgressStatus;
  updatedAt: string; // ISO date string
  notes?: string;
}

interface ProgressState {
  progress: RecommendationProgress[];

  // Actions
  updateProgress: (recommendationId: string, status: ProgressStatus, notes?: string) => void;
  getProgress: (recommendationId: string) => RecommendationProgress | undefined;
  getProgressByCategory: (categoryId: string, recommendations: { id: string; categoryId: string }[]) => RecommendationProgress[];
  getCompletionPercentage: (totalRecommendations: number) => number;
  getStatusCounts: () => { notStarted: number; inProgress: number; completed: number };
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: [],

      updateProgress: (recommendationId, status, notes) =>
        set((state) => {
          const existing = state.progress.findIndex(
            (p) => p.recommendationId === recommendationId
          );
          const entry: RecommendationProgress = {
            recommendationId,
            status,
            updatedAt: new Date().toISOString(),
            notes,
          };

          if (existing >= 0) {
            const updated = [...state.progress];
            updated[existing] = entry;
            return { progress: updated };
          }

          return { progress: [...state.progress, entry] };
        }),

      getProgress: (recommendationId) => {
        return get().progress.find(
          (p) => p.recommendationId === recommendationId
        );
      },

      getProgressByCategory: (categoryId, recommendations) => {
        const catRecIds = new Set(
          recommendations
            .filter((r) => r.categoryId === categoryId)
            .map((r) => r.id)
        );
        return get().progress.filter((p) =>
          catRecIds.has(p.recommendationId)
        );
      },

      getCompletionPercentage: (totalRecommendations) => {
        if (totalRecommendations === 0) return 0;
        const completed = get().progress.filter(
          (p) => p.status === 'completed'
        ).length;
        return Math.round((completed / totalRecommendations) * 100);
      },

      getStatusCounts: () => {
        const progress = get().progress;
        return {
          notStarted: progress.filter((p) => p.status === 'not-started').length,
          inProgress: progress.filter((p) => p.status === 'in-progress').length,
          completed: progress.filter((p) => p.status === 'completed').length,
        };
      },

      reset: () => set({ progress: [] }),
    }),
    {
      name: 'nis2-progress-storage',
      partialize: (state) => ({
        progress: state.progress,
      }),
    }
  )
);
