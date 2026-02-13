/**
 * NIST Cybersecurity Framework 2.0 Assessment Categories
 *
 * 6 categories mapping to the 6 NIST CSF 2.0 Functions.
 * Designed for a management-level assessment of cybersecurity posture
 * aligned with the NIST framework.
 *
 * Legal basis: NIST CSF 2.0 (February 2024)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'govern',
    nameKey: 'nist-csf.categories.govern.name',
    shortNameKey: 'nist-csf.categories.govern.shortName',
    descriptionKey: 'nist-csf.categories.govern.description',
    nistFunction: 'GV',
    icon: 'Landmark',
    questions: [],
  },
  {
    id: 'identify',
    nameKey: 'nist-csf.categories.identify.name',
    shortNameKey: 'nist-csf.categories.identify.shortName',
    descriptionKey: 'nist-csf.categories.identify.description',
    nistFunction: 'ID',
    icon: 'Search',
    questions: [],
  },
  {
    id: 'protect',
    nameKey: 'nist-csf.categories.protect.name',
    shortNameKey: 'nist-csf.categories.protect.shortName',
    descriptionKey: 'nist-csf.categories.protect.description',
    nistFunction: 'PR',
    icon: 'ShieldCheck',
    questions: [],
  },
  {
    id: 'detect',
    nameKey: 'nist-csf.categories.detect.name',
    shortNameKey: 'nist-csf.categories.detect.shortName',
    descriptionKey: 'nist-csf.categories.detect.description',
    nistFunction: 'DE',
    icon: 'Radar',
    questions: [],
  },
  {
    id: 'respond',
    nameKey: 'nist-csf.categories.respond.name',
    shortNameKey: 'nist-csf.categories.respond.shortName',
    descriptionKey: 'nist-csf.categories.respond.description',
    nistFunction: 'RS',
    icon: 'Siren',
    questions: [],
  },
  {
    id: 'recover',
    nameKey: 'nist-csf.categories.recover.name',
    shortNameKey: 'nist-csf.categories.recover.shortName',
    descriptionKey: 'nist-csf.categories.recover.description',
    nistFunction: 'RC',
    icon: 'RotateCcw',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
