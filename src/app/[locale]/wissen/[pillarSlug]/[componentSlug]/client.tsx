'use client';

import { getPillar, getComponentBySlug } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { ComponentPage } from '@/components/pillars/component-page';
import { IncidentTimer } from '@/components/pillars/interactive/incident-timer';
import { SharedResponsibilityDiagram } from '@/components/pillars/interactive/shared-responsibility-diagram';

interface ComponentPageClientProps {
  pillarId: string;
  componentId: string;
}

export function ComponentPageClient({ pillarId, componentId }: ComponentPageClientProps) {
  const pillar = getPillar(pillarId);
  const component = getComponentBySlug(pillarId, componentId);

  if (!pillar || !component) return null;

  let interactiveWidget: React.ReactNode = null;
  if (component.interactiveFeature === 'melde-timer') {
    interactiveWidget = <IncidentTimer />;
  } else if (component.interactiveFeature === 'shared-responsibility-diagram') {
    interactiveWidget = <SharedResponsibilityDiagram />;
  }

  return (
    <ComponentPage component={component} pillar={pillar}>
      {interactiveWidget}
    </ComponentPage>
  );
}
