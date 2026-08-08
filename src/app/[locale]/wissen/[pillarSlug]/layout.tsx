import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { isValidPillarId, getPillar } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { PILLAR_IDS } from '@/lib/pillars/types';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return PILLAR_IDS.map((pillarSlug) => ({ pillarSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pillarSlug: string }>;
}): Promise<Metadata> {
  const { locale, pillarSlug } = await params;
  const pillar = getPillar(pillarSlug);
  if (!pillar) return {};

  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: `/wissen/${pillarSlug}`,
    title: t(pillar.nameKey as never),
    description: t(pillar.descriptionKey as never),
  });
}

export default async function PillarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; pillarSlug: string }>;
}) {
  const { pillarSlug } = await params;

  if (!isValidPillarId(pillarSlug)) {
    notFound();
  }

  return <>{children}</>;
}
