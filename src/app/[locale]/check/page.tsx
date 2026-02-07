'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import { useWizardStore } from '@/stores/wizard-store';
import { StepIndicator } from './components/step-indicator';
import { SectorSelectionStep } from './steps/sector-selection';
import { CompanySizeStep } from './steps/company-size';
import { ResultStep } from './steps/result';

export default function CheckPage() {
  const t = useTranslations('check');
  const tDisclaimer = useTranslations('disclaimers');
  const currentStep = useWizardStore((state) => state.currentStep);
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch from zustand persist
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render skeleton with same structure to minimize layout shift
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>
        {/* Placeholder for step indicator */}
        <div className="mb-8 h-20 animate-pulse rounded-lg bg-gray-100" />
        {/* Placeholder for step content */}
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  const steps = [
    { label: t('steps.sector') },
    { label: t('steps.companySize') },
    { label: t('steps.result') },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      {currentStep < 2 && (
        <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>
      )}

      {/* Pre-assessment disclaimer - shown on steps 0 and 1 */}
      {currentStep < 2 && (
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-blue-600" />
            <div className="space-y-1 text-sm text-blue-900">
              <p className="font-semibold">{tDisclaimer('preAssessment.title')}</p>
              <p>{tDisclaimer('preAssessment.noLegalAdvice')}</p>
              <p>{tDisclaimer('preAssessment.orientationOnly')}</p>
            </div>
          </div>
        </div>
      )}

      <StepIndicator currentStep={currentStep} steps={steps} />

      <div key={currentStep} className="step-transition">
        {currentStep === 0 && <SectorSelectionStep />}
        {currentStep === 1 && <CompanySizeStep />}
        {currentStep === 2 && <ResultStep />}
      </div>
    </div>
  );
}
