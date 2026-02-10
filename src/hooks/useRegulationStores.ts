'use client';

/**
 * Hook to manage per-regulation Zustand store instances.
 *
 * Lazy creation: store is created on first access and cached.
 * Storage keys: ${regulationId}-assessment-storage, etc.
 */

import { useMemo } from 'react';
import {
  createAssessmentStore,
  createQuickCheckStore,
  createProgressStore,
  type AssessmentState,
  type QuickCheckState,
  type ProgressState,
} from '@/stores/store-factory';
import { getRegulation } from '@/lib/regulations/registry';
import '@/lib/regulations/init';
import type { StoreApi, UseBoundStore } from 'zustand';

// Cache store instances so they're not re-created on every render
const assessmentStores = new Map<string, UseBoundStore<StoreApi<AssessmentState>>>();
const quickCheckStores = new Map<string, UseBoundStore<StoreApi<QuickCheckState>>>();
const progressStores = new Map<string, UseBoundStore<StoreApi<ProgressState>>>();

function getOrCreateAssessmentStore(regulationId: string) {
  if (!assessmentStores.has(regulationId)) {
    assessmentStores.set(regulationId, createAssessmentStore(regulationId));
  }
  return assessmentStores.get(regulationId)!;
}

function getOrCreateQuickCheckStore(regulationId: string) {
  if (!quickCheckStores.has(regulationId)) {
    const config = getRegulation(regulationId);
    const totalQuestions = config?.quickCheckQuestions?.length ?? 10;
    quickCheckStores.set(regulationId, createQuickCheckStore(regulationId, totalQuestions));
  }
  return quickCheckStores.get(regulationId)!;
}

export function getOrCreateProgressStore(regulationId: string) {
  if (!progressStores.has(regulationId)) {
    progressStores.set(regulationId, createProgressStore(regulationId));
  }
  return progressStores.get(regulationId)!;
}

export function useRegulationStores(regulationId: string) {
  const assessmentStore = useMemo(
    () => getOrCreateAssessmentStore(regulationId),
    [regulationId]
  );

  const quickCheckStore = useMemo(
    () => getOrCreateQuickCheckStore(regulationId),
    [regulationId]
  );

  const progressStore = useMemo(
    () => getOrCreateProgressStore(regulationId),
    [regulationId]
  );

  return { assessmentStore, quickCheckStore, progressStore };
}
