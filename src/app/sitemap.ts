import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { SITE_URL, LOCALES, localizedPath, NOINDEX_ROUTES } from '@/lib/seo';
import { getRegulationIds, getRegulation } from '@/lib/regulations/registry';
import '@/lib/regulations/init';
import { PILLAR_IDS } from '@/lib/pillars/types';
import { BRANCHE_SLUGS } from '@/lib/branchen';

/**
 * Die Wissen-Seiten liegen als eigene Verzeichnisse vor. Sie hier aus dem
 * Dateisystem zu lesen haelt die Sitemap automatisch aktuell — eine gepflegte
 * Liste waere beim naechsten neuen Artikel sofort veraltet.
 */
function wissenSlugs(): string[] {
  const dir = path.join(process.cwd(), 'src', 'app', '[locale]', 'wissen');
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('[') && e.name !== 'branchen')
    .map((e) => e.name)
    .filter((slug) => fs.existsSync(path.join(dir, slug, 'page.tsx')));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: string[] = [
    '/',
    '/navigator',
    '/wissen',
    '/wissen/branchen',
    '/imprint',
    '/privacy',
    ...wissenSlugs().map((s) => `/wissen/${s}`),
    ...PILLAR_IDS.map((p) => `/wissen/${p}`),
    ...BRANCHE_SLUGS.map((b) => `/wissen/branchen/${b}`),
  ];

  for (const id of getRegulationIds()) {
    const config = getRegulation(id);
    routes.push(`/${id}`, `/${id}/assessment`);
    if (config?.features.hasQuickCheck) routes.push(`/${id}/schnellcheck`);
    // Betroffenheitspruefung und BSIG-Info-Seiten gibt es nur fuer NIS2.
    if (config?.features.hasClassification) routes.push(`/${id}/check`);
    if (config?.features.hasBsigInfo) {
      routes.push(
        `/${id}/info/meldepflichten`,
        `/${id}/info/geschaeftsleitung`,
        `/${id}/info/registrierung`,
      );
    }
  }

  const indexable = routes.filter(
    (r) => !NOINDEX_ROUTES.some((n) => r === n || r.endsWith(n)),
  );

  const lastModified = new Date();

  return indexable.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: SITE_URL + localizedPath(route, locale),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: route === '/' ? 1 : route.split('/').length <= 2 ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, SITE_URL + localizedPath(route, l)]),
        ),
      },
    })),
  );
}
