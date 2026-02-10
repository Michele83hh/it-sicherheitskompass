// src/lib/regulations/registry.ts

/**
 * Central Regulation Registry
 *
 * Single source of truth for all available regulations.
 * Components use this to dynamically load regulation-specific data.
 */

import type { RegulationConfig, RegulationId } from './types';
import { REGULATION_IDS } from './types';

const registry = new Map<RegulationId, RegulationConfig>();

/**
 * Register a regulation's config. Called once per regulation at module load.
 */
export function registerRegulation(config: RegulationConfig): void {
  registry.set(config.id, config);
}

/**
 * Get a regulation by ID. Returns undefined if not registered.
 */
export function getRegulation(id: string): RegulationConfig | undefined {
  return registry.get(id as RegulationId);
}

/**
 * Get all registered regulations.
 */
export function getAllRegulations(): RegulationConfig[] {
  return Array.from(registry.values());
}

/**
 * Check if a string is a valid regulation ID.
 */
export function isValidRegulationId(id: string): id is RegulationId {
  return REGULATION_IDS.includes(id as RegulationId);
}

/**
 * Get all valid regulation ID strings (for route validation).
 */
export function getRegulationIds(): readonly string[] {
  return REGULATION_IDS;
}
