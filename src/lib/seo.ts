import type { Metadata } from 'next';

/**
 * Kanonischer Host: die Apex-Domain leitet per 307 auf www um.
 * localePrefix ist 'as-needed' — Deutsch laeuft ohne Praefix, Englisch unter /en.
 */
export const SITE_URL = 'https://www.it-sicherheitskompass.de';
export const SITE_NAME = 'IT-Sicherheitskompass';

export const LOCALES = ['de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** Pfad einer Route fuer eine Locale — '/wissen' → '/wissen' (de) bzw. '/en/wissen' (en). */
export function localizedPath(path: string, locale: string): string {
  const clean = path === '/' ? '' : path;
  return locale === 'de' ? clean || '/' : `/en${clean}`;
}

export function absoluteUrl(path: string, locale: string): string {
  return SITE_URL + localizedPath(path, locale);
}

interface BuildMetadataArgs {
  locale: string;
  /** Route ohne Locale-Praefix, mit fuehrendem Slash: '/wissen/notfall-kontakte' */
  path: string;
  title: string;
  description: string;
  /**
   * Fuer Seiten, die ohne Nutzerzustand keinen Inhalt haben (Ergebnisse,
   * Dashboard). Sie waeren im Index leere Huellen.
   */
  noindex?: boolean;
}

/**
 * Baut Metadata inklusive canonical und hreflang-Alternativen.
 * Der Titel laeuft durch das Template aus dem Locale-Layout ("… | IT-Sicherheitskompass"),
 * ausser fuer die Startseite, die ihren Titel absolut setzt.
 */
export function buildMetadata({ locale, path, title, description, noindex }: BuildMetadataArgs): Metadata {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl(path, l);
  languages['x-default'] = absoluteUrl(path, 'de');

  return {
    // absolute umgeht die Titel-Templates der Eltern-Layouts. Ohne das erhielten
    // Seiten direkt unter einem Segment mit eigenem Titel (z. B. /wissen/*) kein
    // Suffix, waehrend /wissen es bekam — der Anhang waere uneinheitlich.
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: absoluteUrl(path, locale),
      title,
      description,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Routen, die ohne Nutzerzustand keinen sinnvollen Inhalt haben. */
export const NOINDEX_ROUTES = [
  '/dashboard',
  '/results',
  '/schnellcheck/ergebnis',
] as const;
