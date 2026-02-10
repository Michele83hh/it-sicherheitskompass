// src/lib/regulations/hooks.ts

/**
 * React hooks for accessing regulation config in components.
 */

'use client';

import { useParams } from 'next/navigation';
import { getRegulation } from './registry';
import type { RegulationConfig, RegulationId } from './types';
import { isValidRegulationId } from './registry';

/**
 * Hook to get the current regulation from route params.
 * Must be used inside a [regulation] dynamic route segment.
 *
 * @throws Error if regulation param is missing or invalid
 */
export function useRegulation(): RegulationConfig {
  const params = useParams();
  const regulationId = params?.regulation as string;

  if (!regulationId || !isValidRegulationId(regulationId)) {
    throw new Error(
      `Invalid regulation ID: "${regulationId}". Must be one of: nis2, dsgvo, kritis, dora, tisax, cra, bsi-grundschutz`
    );
  }

  const config = getRegulation(regulationId);
  if (!config) {
    throw new Error(
      `Regulation "${regulationId}" is not registered. Ensure its config module is imported.`
    );
  }

  return config;
}

/**
 * Hook to get a regulation by explicit ID (for use outside dynamic routes).
 */
export function useRegulationById(id: RegulationId): RegulationConfig | undefined {
  return getRegulation(id);
}
