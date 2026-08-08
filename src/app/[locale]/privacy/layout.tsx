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
    path: '/privacy',
    title: t('legal.privacy.title'),
    description: t('legal.privacy.introText'),
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
