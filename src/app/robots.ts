import type { MetadataRoute } from 'next';
import { SITE_URL, NOINDEX_ROUTES } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Zustandsabhaengige Seiten haben ohne Nutzereingaben keinen Inhalt.
      disallow: ['/api/', ...NOINDEX_ROUTES.map((r) => `*${r}`)],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
