import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getPillar, getComponentBySlug, getAllPillars } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { buildMetadata } from '@/lib/seo';
import { ComponentPageClient } from './client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pillarSlug: string; componentSlug: string }>;
}): Promise<Metadata> {
  const { locale, pillarSlug, componentSlug } = await params;
  const pillar = getPillar(pillarSlug);
  const component = getComponentBySlug(pillarSlug, componentSlug);
  if (!pillar || !component) return {};

  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: `/wissen/${pillarSlug}/${componentSlug}`,
    title: `${t(component.nameKey as never)} — ${t(pillar.nameKey as never)}`,
    // Das Szenario beschreibt den Anwendungsfall und taugt als Kurzbeschreibung.
    description: t(component.scenarioKey as never),
  });
}

export function generateStaticParams() {
  const pillars = getAllPillars();
  const params: { pillarSlug: string; componentSlug: string }[] = [];
  for (const pillar of pillars) {
    for (const comp of pillar.components) {
      params.push({ pillarSlug: pillar.id, componentSlug: comp.id });
    }
  }
  return params;
}

export default async function ComponentSlugPage({
  params,
}: {
  params: Promise<{ locale: string; pillarSlug: string; componentSlug: string }>;
}) {
  const { pillarSlug, componentSlug } = await params;
  const pillar = getPillar(pillarSlug);

  if (!pillar) {
    notFound();
  }

  const component = getComponentBySlug(pillarSlug, componentSlug);

  if (!component) {
    notFound();
  }

  return <ComponentPageClient pillarId={pillarSlug} componentId={componentSlug} />;
}
