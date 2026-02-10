'use client';

import { useTranslations } from 'next-intl';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

/**
 * Renders an inline glossary term with a tooltip explanation.
 * The explanation is pulled from `glossary.{term}` translation key.
 * Usage: <GlossaryTerm term="SBOM">SBOM</GlossaryTerm>
 */
export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const t = useTranslations('glossary');

  let explanation: string;
  try {
    explanation = t(term);
  } catch {
    // If no translation found, just render children without tooltip
    return <>{children || term}</>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-0.5 cursor-help border-b border-dashed border-muted-foreground/40">
            {children || term}
            <Info className="inline size-3 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-sm">
          <p>{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
