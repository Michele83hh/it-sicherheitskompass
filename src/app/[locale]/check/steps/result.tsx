'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useWizardStore } from '@/stores/wizard-store';
import { classifyEntity } from '@/lib/nis2/classification';
import type { ClassificationInput, ClassificationResult } from '@/lib/nis2/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ResultStep() {
  const t = useTranslations('check.resultStep');
  const tClassification = useTranslations('classification');
  const { formData, reset } = useWizardStore();
  const [showExplanation, setShowExplanation] = useState(false);

  // Handle "not listed" shortcut
  if (formData.sectorId === 'not-listed') {
    return (
      <div className="space-y-6">
        {/* Green card for "nicht betroffen" */}
        <Card className="border-2 border-green-500 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <CardTitle className="text-2xl text-green-900">
                {t('nichtBetroffen')}
              </CardTitle>
            </div>
            <CardDescription className="text-green-800">
              {tClassification('reasons.sectorNotRegulated')}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Supply chain hint */}
        <div className="rounded-lg border border-yellow-400 bg-yellow-50 p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">{t('supplyChainTitle')}</p>
              <p className="mt-1 text-sm text-yellow-800">{t('supplyChainText')}</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="flex-1" asChild>
            <Link href="/gap-analysis">{t('ctaPrimary')}</Link>
          </Button>
          <Button variant="outline" size="lg" className="flex-1" onClick={reset}>
            {t('ctaSecondary')}
          </Button>
        </div>
      </div>
    );
  }

  // Classify entity with balance sheet mapping
  const classificationInput: ClassificationInput = {
    sectorId: formData.sectorId!,
    subsectorId: formData.subsectorId ?? null,
    employees: formData.employees ?? 0,
    annualRevenue: formData.annualRevenue ?? 0,
    // CRITICAL: Map omitted balance sheet to MAX_SAFE_INTEGER to avoid blocking classification
    balanceSheet:
      formData.balanceSheet && formData.balanceSheet > 0
        ? formData.balanceSheet
        : Number.MAX_SAFE_INTEGER,
    isKritis: formData.isKritis ?? false,
  };

  const result: ClassificationResult = classifyEntity(classificationInput);

  // Card config by category
  const cardConfig = {
    'besonders-wichtig': {
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      descriptionColor: 'text-red-800',
      label: t('besondersWichtig'),
    },
    wichtig: {
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50',
      icon: AlertTriangle,
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-900',
      descriptionColor: 'text-orange-800',
      label: t('wichtig'),
    },
    'nicht-betroffen': {
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
      descriptionColor: 'text-green-800',
      label: t('nichtBetroffen'),
    },
  };

  const config = cardConfig[result.category];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Result card */}
      <Card className={`border-2 ${config.borderColor} ${config.bgColor}`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon className={`h-10 w-10 ${config.iconColor}`} />
            <CardTitle className={`text-2xl ${config.titleColor}`}>
              {config.label}
            </CardTitle>
          </div>
          <CardDescription className={config.descriptionColor}>
            {result.legalReference}
          </CardDescription>
        </CardHeader>

        {/* Expandable explanation */}
        <CardContent>
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex w-full items-center justify-between text-left font-medium text-gray-900 hover:text-gray-700"
          >
            <span>{t('whyTitle')}</span>
            {showExplanation ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {showExplanation && (
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>{tClassification(result.reason.replace('classification.', ''))}</p>
              <p className="font-medium">
                {t('legalBasis')}: {result.legalReference}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supply chain hint for "nicht betroffen" */}
      {result.category === 'nicht-betroffen' && (
        <div className="rounded-lg border border-yellow-400 bg-yellow-50 p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">{t('supplyChainTitle')}</p>
              <p className="mt-1 text-sm text-yellow-800">{t('supplyChainText')}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" asChild>
          <Link href="/gap-analysis">{t('ctaPrimary')}</Link>
        </Button>
        <Button variant="outline" size="lg" className="flex-1" onClick={reset}>
          {t('ctaSecondary')}
        </Button>
      </div>
    </div>
  );
}
