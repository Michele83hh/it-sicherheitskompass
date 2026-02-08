'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLabel?: string;
  nextLabel?: string;
  backLabel?: string;
}

export function WizardNavigation({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  submitLabel = 'Ergebnis anzeigen',
  nextLabel = 'Weiter',
  backLabel = 'Zurück',
}: WizardNavigationProps) {
  return (
    <div className="flex justify-between gap-4">
      {/* Back button */}
      {!isFirstStep && onBack && (
        <Button type="button" variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Button>
      )}

      {/* Spacer for first step */}
      {isFirstStep && <div />}

      {/* Next/Submit button */}
      <Button type="submit" className="ml-auto" onClick={onNext}>
        {isLastStep ? submitLabel : nextLabel}
        {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
