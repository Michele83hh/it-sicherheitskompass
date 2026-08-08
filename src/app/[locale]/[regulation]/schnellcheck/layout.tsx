import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { getRegulation } from '@/lib/regulations/registry';
import '@/lib/regulations/init';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; regulation: string }>;
}): Promise<Metadata> {
  const { locale, regulation } = await params;
  const t = await getTranslations({ locale });
  const config = getRegulation(regulation);
  const regName = config ? t(config.nameKey) : regulation.toUpperCase();
  return buildMetadata({
    locale,
    path: `/${regulation}/schnellcheck`,
    title: `${regName} — ${t('quickCheck.title')}`,
    description: t('platform.hub.hero.subtitle'),
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
