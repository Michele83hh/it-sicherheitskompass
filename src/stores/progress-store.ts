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
  startedAt?: string; // ISO date string — set when first moved to in-progress
  completedAt?: string; // ISO date string — set when moved to completed
  notes?: string;
  responsible?: string;
}

interface ProgressState {
  progress: RecommendationProgress[];

  // Actions
  updateProgress: (recommendationId: string, status: ProgressStatus) => void;
  updateNotes: (recommendationId: string, notes: string) => void;
  updateResponsible: (recommendationId: string, responsible: string) => void;
  updateStartedAt: (recommendationId: string, date: string) => void;
  updateCompletedAt: (recommendationId: string, date: string) => void;
  getProgress: (recommendationId: string) => RecommendationProgress | undefined;
  getProgressByCategory: (categoryId: string, recommendations: { id: string; categoryId: string }[]) => RecommendationProgress[];
  getCompletionPercentage: (totalRecommendations: number) => number;
  getStatusCounts: () => { notStarted: number; inProgress: number; completed: number };
  reset: () => void;
}

/**
 * Determines timestamp values based on status transitions.
 * - Forward (not-started → in-progress): set startedAt
 * - Forward (in-progress → completed): set completedAt, keep startedAt
 * - Forward (not-started → completed): set both
 * - Backward (completed → in-progress): clear completedAt, keep startedAt
 * - Backward (in-progress → not-started): clear both
 * - Backward (completed → not-started): clear both
 */
function resolveTimestamps(
  newStatus: ProgressStatus,
  existing?: RecommendationProgress
): { startedAt?: string; completedAt?: string } {
  const now = new Date().toISOString();

  if (newStatus === 'not-started') {
    // Reset: clear all timestamps
    return { startedAt: undefined, completedAt: undefined };
  }

  if (newStatus === 'in-progress') {
    return {
      startedAt: existing?.startedAt || now,
      completedAt: undefined, // clear completedAt when going back
    };
  }

  // completed
  return {
    startedAt: existing?.startedAt || now,
    completedAt: now,
  };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: [],

      updateProgress: (recommendationId, status) =>
        set((state) => {
          const existing = state.progress.find(
            (p) => p.recommendationId === recommendationId
          );
          const now = new Date().toISOString();
          const timestamps = resolveTimestamps(status, existing);

          const entry: RecommendationProgress = {
            recommendationId,
            status,
            updatedAt: now,
            startedAt: timestamps.startedAt,
            completedAt: timestamps.completedAt,
            notes: existing?.notes,
            responsible: existing?.responsible,
          };

          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.recommendationId === recommendationId ? entry : p
              ),
            };
          }

          return { progress: [...state.progress, entry] };
        }),

      updateNotes: (recommendationId, notes) =>
        set((state) => {
          const existing = state.progress.find(
            (p) => p.recommendationId === recommendationId
          );
          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.recommendationId === recommendationId
                  ? { ...p, notes, updatedAt: new Date().toISOString() }
                  : p
              ),
            };
          }
          return {
            progress: [
              ...state.progress,
              {
                recommendationId,
                status: 'not-started' as ProgressStatus,
                updatedAt: new Date().toISOString(),
                notes,
              },
            ],
          };
        }),

      updateResponsible: (recommendationId, responsible) =>
        set((state) => {
          const existing = state.progress.find(
            (p) => p.recommendationId === recommendationId
          );
          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.recommendationId === recommendationId
                  ? { ...p, responsible, updatedAt: new Date().toISOString() }
                  : p
              ),
            };
          }
          return {
            progress: [
              ...state.progress,
              {
                recommendationId,
                status: 'not-started' as ProgressStatus,
                updatedAt: new Date().toISOString(),
                responsible,
              },
            ],
          };
        }),

      updateStartedAt: (recommendationId, date) =>
        set((state) => {
          const existing = state.progress.find(
            (p) => p.recommendationId === recommendationId
          );
          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.recommendationId === recommendationId
                  ? { ...p, startedAt: date, updatedAt: new Date().toISOString() }
                  : p
              ),
            };
          }
          return {
            progress: [
              ...state.progress,
              {
                recommendationId,
                status: 'in-progress' as ProgressStatus,
                updatedAt: new Date().toISOString(),
                startedAt: date,
              },
            ],
          };
        }),

      updateCompletedAt: (recommendationId, date) =>
        set((state) => {
          const existing = state.progress.find(
            (p) => p.recommendationId === recommendationId
          );
          if (existing) {
            return {
              progress: state.progress.map((p) =>
                p.recommendationId === recommendationId
                  ? { ...p, completedAt: date, updatedAt: new Date().toISOString() }
                  : p
              ),
            };
          }
          return {
            progress: [
              ...state.progress,
              {
                recommendationId,
                status: 'completed' as ProgressStatus,
                updatedAt: new Date().toISOString(),
                completedAt: date,
              },
            ],
          };
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
