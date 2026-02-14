// src/lib/ui/traffic-light-styles.ts

/**
 * Centralized Traffic-Light Color System
 *
 * Single source of truth for all RAG (Red/Amber/Green) color styling.
 * Uses emerald/amber/red palette consistently across the entire application.
 *
 * Thresholds (from scoring/engine.ts):
 * - Red:    <40%  — Significant gaps
 * - Yellow: 40-69% — Partial implementation
 * - Green:  >=70% — Mature implementation
 */

import type { TrafficLight } from '@/lib/scoring/types';

// ============================================================
// Full config per traffic-light state
// ============================================================

export interface TrafficLightStyle {
  /** Background for badges/pills: bg-{color}-50 */
  bg: string;
  /** Stronger background for bars/dots: bg-{color}-500 */
  bgSolid: string;
  /** Background for badges with more contrast: bg-{color}-100 */
  bgStrong: string;
  /** Text color: text-{color}-700 */
  text: string;
  /** Border: border-{color}-200 */
  border: string;
  /** Ring (for focused elements): ring-{color}-200 */
  ring: string;
  /** Progress bar override: [&>div]:bg-{color}-500 */
  progressBar: string;
}

const STYLES: Record<TrafficLight, TrafficLightStyle> = {
  red: {
    bg: 'bg-red-50',
    bgSolid: 'bg-red-500',
    bgStrong: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-200',
    progressBar: '[&>div]:bg-red-500',
  },
  yellow: {
    bg: 'bg-amber-50',
    bgSolid: 'bg-amber-500',
    bgStrong: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ring: 'ring-amber-200',
    progressBar: '[&>div]:bg-amber-500',
  },
  green: {
    bg: 'bg-emerald-50',
    bgSolid: 'bg-emerald-500',
    bgStrong: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    ring: 'ring-emerald-200',
    progressBar: '[&>div]:bg-emerald-500',
  },
};

const NULL_STYLE: TrafficLightStyle = {
  bg: 'bg-slate-50',
  bgSolid: 'bg-slate-300',
  bgStrong: 'bg-slate-100',
  text: 'text-slate-400',
  border: 'border-slate-200',
  ring: 'ring-slate-200',
  progressBar: '[&>div]:bg-slate-300',
};

/**
 * Get the full style config for a traffic-light value.
 * Returns neutral slate styles for null.
 */
export function getTlStyle(tl: TrafficLight | null): TrafficLightStyle {
  if (tl === null) return NULL_STYLE;
  return STYLES[tl];
}

// ============================================================
// Convenience helpers for common patterns
// ============================================================

/** Badge: bg + text + border (e.g. "bg-red-50 text-red-700 border-red-200") */
export function tlBadge(tl: TrafficLight | null): string {
  const s = getTlStyle(tl);
  return `${s.bg} ${s.text} ${s.border}`;
}

/** Strong badge: bgStrong + text + border (e.g. "bg-red-100 text-red-700 border-red-200") */
export function tlBadgeStrong(tl: TrafficLight | null): string {
  const s = getTlStyle(tl);
  return `${s.bgStrong} ${s.text} ${s.border}`;
}

/** Score text color only */
export function tlText(tl: TrafficLight | null): string {
  return getTlStyle(tl).text;
}

/** Solid bar/dot color */
export function tlDot(tl: TrafficLight | null): string {
  return getTlStyle(tl).bgSolid;
}

/** Progress bar color override */
export function tlProgressBar(tl: TrafficLight | null): string {
  return getTlStyle(tl).progressBar;
}

/** Score-based color (for numeric scores without pre-computed traffic light) */
export function scoreStyle(score: number | null): TrafficLightStyle {
  if (score === null) return NULL_STYLE;
  if (score < 40) return STYLES.red;
  if (score < 70) return STYLES.yellow;
  return STYLES.green;
}

/** Score-based badge classes */
export function scoreBadge(score: number | null): string {
  const s = scoreStyle(score);
  return `${s.bg} ${s.text}`;
}

/** Score-based text color */
export function scoreText(score: number | null): string {
  return scoreStyle(score).text;
}

/** Score-based bar color */
export function scoreBar(score: number | null): string {
  return scoreStyle(score).bgSolid;
}
