import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { BRANCHE_SLUG_TO_KEY, BRANCHE_SLUGS } from '@/lib/branchen';

export function generateStaticParams() {
  return BRANCHE_SLUGS.map((branche) => ({ branche }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; branche: string }>;
}): Promise<Metadata> {
  const { locale, branche } = await params;
  const key = BRANCHE_SLUG_TO_KEY[branche];
  const t = await getTranslations({ locale });
  if (!key) return {};

  return buildMetadata({
    locale,
    path: `/wissen/branchen/${branche}`,
    title: t(`wissenPages.branchen.${key}.title` as never),
    // metaDesc ist fuer genau diesen Zweck vorhanden und kuerzer als der Untertitel.
    description: t(`wissenPages.branchen.${key}.metaDesc` as never),
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ branche: string }>;
}) {
  const { branche } = await params;
  if (!BRANCHE_SLUG_TO_KEY[branche]) notFound();
  return <>{children}</>;
}
