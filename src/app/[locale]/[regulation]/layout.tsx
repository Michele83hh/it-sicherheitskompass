import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { isValidRegulationId, getRegulationIds, getRegulation } from '@/lib/regulations/registry';
import { buildMetadata } from '@/lib/seo';

// Ensure all regulations are registered
import '@/lib/regulations/init';

export function generateStaticParams() {
  return getRegulationIds().map((regulation) => ({ regulation }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; regulation: string }>;
}): Promise<Metadata> {
  const { locale, regulation } = await params;
  const config = getRegulation(regulation);
  if (!config) return {};

  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: `/${regulation}`,
    title: t(config.nameKey as never),
    description: t(config.descriptionKey as never),
  });
}

export default async function RegulationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; regulation: string }>;
}) {
  const { regulation } = await params;

  if (!isValidRegulationId(regulation)) {
    notFound();
  }

  return <>{children}</>;
}
