'use client';

/**
 * Hook to access the current regulation's config from route params.
 * Loads config from the regulation registry.
 */

import { useParams } from 'next/navigation';
import { getRegulation } from '@/lib/regulations/registry';
import { isValidRegulationId } from '@/lib/regulations/registry';
import type { RegulationConfig } from '@/lib/regulations/types';
import '@/lib/regulations/init';

export function useRegulationConfig(): RegulationConfig {
  const params = useParams();
  const regulationId = params?.regulation as string;

  if (!regulationId || !isValidRegulationId(regulationId)) {
    throw new Error(
      `Invalid regulation ID: "${regulationId}". ` +
      `Must be one of: nis2, dsgvo, kritis, dora, tisax, cra, bsi-grundschutz`
    );
  }

  const config = getRegulation(regulationId);
  if (!config) {
    throw new Error(
      `Regulation "${regulationId}" is not registered. Ensure its config is imported via init.ts.`
    );
  }

  return config;
}

/**
 * Returns questions for a specific category, filtered by tier if needed.
 */
export function getQuestionsByCategory(
  config: RegulationConfig,
  categoryId: string,
  tier?: 'core' | 'advanced'
) {
  const questions = config.questions.filter((q) => q.categoryId === categoryId);
  if (!tier) return questions;
  return questions.filter((q) => q.tier === tier);
}

/**
 * Returns all questions count (core only or total).
 */
export function getCoreQuestionCount(config: RegulationConfig): number {
  return config.questions.filter((q) => q.tier === 'core').length;
}

export function getTotalQuestionCount(config: RegulationConfig): number {
  return config.questions.length;
}

/**
 * Returns recommendations for a specific category.
 */
export function getRecommendationsByCategory(
  config: RegulationConfig,
  categoryId: string
) {
  return config.recommendations.filter((r) => r.categoryId === categoryId);
}
