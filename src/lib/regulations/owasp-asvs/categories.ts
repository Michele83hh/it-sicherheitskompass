/**
 * OWASP ASVS 5.0 Gap Analysis Categories
 *
 * 6 categories covering the most critical ASVS verification chapters.
 * Grouped by security domain for practical assessment.
 *
 * Legal basis: OWASP Application Security Verification Standard 5.0.0
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'authentication',
    nameKey: 'owasp-asvs.categories.authentication.name',
    shortNameKey: 'owasp-asvs.categories.authentication.shortName',
    descriptionKey: 'owasp-asvs.categories.authentication.description',
    asvsChapter: 'V6',
    icon: 'KeyRound',
    questions: [],
  },
  {
    id: 'session-mgmt',
    nameKey: 'owasp-asvs.categories.sessionMgmt.name',
    shortNameKey: 'owasp-asvs.categories.sessionMgmt.shortName',
    descriptionKey: 'owasp-asvs.categories.sessionMgmt.description',
    asvsChapter: 'V7',
    icon: 'Timer',
    questions: [],
  },
  {
    id: 'access-control',
    nameKey: 'owasp-asvs.categories.accessControl.name',
    shortNameKey: 'owasp-asvs.categories.accessControl.shortName',
    descriptionKey: 'owasp-asvs.categories.accessControl.description',
    asvsChapter: 'V8',
    icon: 'Lock',
    questions: [],
  },
  {
    id: 'input-validation',
    nameKey: 'owasp-asvs.categories.inputValidation.name',
    shortNameKey: 'owasp-asvs.categories.inputValidation.shortName',
    descriptionKey: 'owasp-asvs.categories.inputValidation.description',
    asvsChapter: 'V1-V2',
    icon: 'ShieldCheck',
    questions: [],
  },
  {
    id: 'cryptography',
    nameKey: 'owasp-asvs.categories.cryptography.name',
    shortNameKey: 'owasp-asvs.categories.cryptography.shortName',
    descriptionKey: 'owasp-asvs.categories.cryptography.description',
    asvsChapter: 'V11',
    icon: 'FileKey',
    questions: [],
  },
  {
    id: 'error-logging',
    nameKey: 'owasp-asvs.categories.errorLogging.name',
    shortNameKey: 'owasp-asvs.categories.errorLogging.shortName',
    descriptionKey: 'owasp-asvs.categories.errorLogging.description',
    asvsChapter: 'V16, V4',
    icon: 'FileWarning',
    questions: [],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
