/**
 * URL-Slug → i18n-Schluessel der Branchenseiten.
 * Lag bisher nur in der Client-Seite; Layout (Metadata) und Sitemap brauchen sie ebenfalls.
 */
export const BRANCHE_SLUG_TO_KEY: Record<string, string> = {
  'logistik': 'logistik',
  'gesundheit': 'gesundheit',
  'fertigung': 'fertigung',
  'handel': 'handel',
  'it-dienstleister': 'itDienstleister',
  'energie': 'energie',
  'automotive': 'automotive',
  'finanzen': 'finanzen',
};

export const BRANCHE_SLUGS = Object.keys(BRANCHE_SLUG_TO_KEY);
