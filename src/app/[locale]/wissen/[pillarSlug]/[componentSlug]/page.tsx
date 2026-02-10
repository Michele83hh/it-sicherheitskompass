import { notFound } from 'next/navigation';
import { getPillar, getComponentBySlug, getAllPillars } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { ComponentPageClient } from './client';

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
