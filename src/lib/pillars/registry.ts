// src/lib/pillars/registry.ts

/**
 * Central Pillar Registry
 *
 * Single source of truth for all 8 security pillars.
 * Analogous to src/lib/regulations/registry.ts.
 */

import type { Pillar, PillarId } from './types';
import { PILLAR_IDS } from './types';

const registry = new Map<string, Pillar>();

/**
 * Register a pillar's data. Called once per pillar at module load.
 */
export function registerPillar(pillar: Pillar): void {
  registry.set(pillar.id, pillar);
}

/**
 * Get a pillar by ID. Returns undefined if not registered.
 */
export function getPillar(id: string): Pillar | undefined {
  return registry.get(id);
}

/**
 * Get all registered pillars, sorted by number.
 */
export function getAllPillars(): Pillar[] {
  return Array.from(registry.values()).sort((a, b) => a.number - b.number);
}

/**
 * Check if a string is a valid pillar ID.
 */
export function isValidPillarId(id: string): id is PillarId {
  return PILLAR_IDS.includes(id as PillarId);
}

/**
 * Get a pillar by its slug (same as ID in URL).
 */
export function getPillarBySlug(slug: string): Pillar | undefined {
  return registry.get(slug);
}

/**
 * Get a specific component within a pillar by its slug.
 */
export function getComponentBySlug(pillarId: string, componentSlug: string) {
  const pillar = registry.get(pillarId);
  if (!pillar) return undefined;
  return pillar.components.find((c) => c.id === componentSlug);
}
