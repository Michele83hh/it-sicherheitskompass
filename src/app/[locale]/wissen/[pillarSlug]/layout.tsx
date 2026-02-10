import { notFound } from 'next/navigation';
import { isValidPillarId } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { PILLAR_IDS } from '@/lib/pillars/types';

export function generateStaticParams() {
  return PILLAR_IDS.map((pillarSlug) => ({ pillarSlug }));
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
