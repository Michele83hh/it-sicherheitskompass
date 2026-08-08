import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { buildMetadata, localizedPath } from '@/lib/seo';

/**
 * Die Betroffenheitspruefung gibt es nur fuer NIS2 — alle anderen Regelwerke
 * gehoeren in die Gap-Analyse. Die Weiterleitung lief bisher erst clientseitig
 * im useEffect: der Server lieferte 200 mit NIS2-Titel, was Suchmaschinen 14
 * Dubletten beschert und Nutzern kurz den falschen Titel zeigt.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; regulation: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: '/nis2/check',
    title: t('check.intro.title'),
    description: t('check.intro.subtitle'),
  });
}

export default async function CheckLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; regulation: string }>;
}) {
  const { locale, regulation } = await params;

  if (regulation !== 'nis2') {
    redirect(localizedPath(`/${regulation}/assessment`, locale));
  }

  return <>{children}</>;
}
