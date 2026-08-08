import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: '/wissen/lieferanten-ampel',
    title: t('wissenPages.lieferantenAmpel.title'),
    description: t('wissenPages.lieferantenAmpel.subtitle'),
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
