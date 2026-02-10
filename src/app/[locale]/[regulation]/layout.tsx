import { notFound } from 'next/navigation';
import { isValidRegulationId, getRegulationIds } from '@/lib/regulations/registry';

// Ensure all regulations are registered
import '@/lib/regulations/init';

export function generateStaticParams() {
  return getRegulationIds().map((regulation) => ({ regulation }));
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
