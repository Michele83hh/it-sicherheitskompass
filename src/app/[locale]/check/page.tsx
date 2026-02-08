'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Info, Shield, Building2, ArrowRight, Clock, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWizardStore } from '@/stores/wizard-store';
import { StepIndicator } from './components/step-indicator';
import { SectorSelectionStep } from './steps/sector-selection';
import { CompanySizeStep } from './steps/company-size';
import { ResultStep } from './steps/result';

export default function CheckPage() {
  const t = useTranslations('check');
  const tDisclaimer = useTranslations('disclaimers');
  const currentStep = useWizardStore((state) => state.currentStep);
  const formData = useWizardStore((state) => state.formData);
  const [isClient, setIsClient] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

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

  // Show intro only if wizard hasn't been started
  const hasStarted = currentStep > 0 || Object.keys(formData).length > 0;
  const shouldShowIntro = showIntro && !hasStarted;

  if (shouldShowIntro) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('intro.title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            {t('intro.subtitle')}
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-center mb-8">{t('intro.howTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-5 rounded-lg border bg-white">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">1</div>
              <Building2 className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">{t('intro.step1')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-white">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">2</div>
              <CheckCircle2 className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">{t('intro.step2')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-white">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">3</div>
              <ArrowRight className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">{t('intro.step3')}</p>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span>{t('intro.duration')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Lock className="size-4" />
            <span>{t('intro.anonymous')}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => setShowIntro(false)}>
            <Shield className="mr-2 size-5" />
            {t('intro.cta')}
          </Button>
        </div>
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
