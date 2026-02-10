'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
import { getRegulation } from '@/lib/regulations/registry';
import '@/lib/regulations/init';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface RegulationBreadcrumbProps {
  regulation: string;
  currentPage: 'schnellcheck' | 'assessment' | 'results' | 'check';
}

interface WissenBreadcrumbProps {
  pillarName?: string;
  pillarHref?: string;
  componentName?: string;
}

export function RegulationBreadcrumb({ regulation, currentPage }: RegulationBreadcrumbProps) {
  const tNav = useTranslations('navigation');
  const tReg = useTranslations();

  const regConfig = getRegulation(regulation);
  const regName = regConfig ? tReg(regConfig.nameKey) : regulation.toUpperCase();

  const items: BreadcrumbItem[] = [
    { label: tNav('breadcrumb.dashboard'), href: '/dashboard' },
    { label: regName, href: `/${regulation}` as any },
    { label: tNav(`breadcrumb.${currentPage}`) },
  ];

  return <BreadcrumbBase items={items} />;
}

export function WissenBreadcrumb({ pillarName, pillarHref, componentName }: WissenBreadcrumbProps) {
  const tNav = useTranslations('navigation');

  const items: BreadcrumbItem[] = [
    { label: tNav('breadcrumb.dashboard'), href: '/dashboard' },
    { label: tNav('breadcrumb.wissen'), href: '/wissen' },
  ];

  if (pillarName) {
    items.push(pillarHref ? { label: pillarName, href: pillarHref } : { label: pillarName });
  }
  if (componentName) {
    items.push({ label: componentName });
  }

  return <BreadcrumbBase items={items} />;
}

function BreadcrumbBase({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
      <LayoutDashboard className="size-3.5 flex-shrink-0" />
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          {idx > 0 && <ChevronRight className="size-3 flex-shrink-0" />}
          {item.href && idx < items.length - 1 ? (
            <Link
              href={item.href as any}
              className="hover:text-foreground transition-colors hover:underline underline-offset-2"
            >
              {item.label}
            </Link>
          ) : (
            <span className={idx === items.length - 1 ? 'text-foreground font-medium' : ''}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
