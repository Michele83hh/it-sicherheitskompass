import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

/**
 * Ohne eigenes Layout erbte die Branchen-Uebersicht den Titel der
 * Wissen-Startseite — zwei Adressen mit identischem Titel.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: '/wissen/branchen',
    title: t('wissenPages.branchen.hub.title'),
    description: t('wissenPages.branchen.hub.subtitle'),
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
