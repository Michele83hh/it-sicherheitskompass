import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { buildMetadata, localizedPath } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: '/nis2/info/meldepflichten',
    title: t('meldepflichten.title'),
    description: t('meldepflichten.subtitle'),
  });
}

/** Diese Seite erlaeutert BSIG-Pflichten und gehoert damit zu NIS2. */
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; regulation: string }>;
}) {
  const { locale, regulation } = await params;
  if (regulation !== 'nis2') {
    redirect(localizedPath('/nis2/info/meldepflichten', locale));
  }
  return <>{children}</>;
}
