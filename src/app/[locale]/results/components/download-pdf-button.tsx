'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { useWizardStore } from '@/stores/wizard-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getSectorById } from '@/lib/nis2/sectors';
import { classifyEntity } from '@/lib/nis2/classification';
import { getRecommendationsByCategory } from '@/lib/nis2/recommendations';
import type { OverallScore } from '@/lib/nis2/types';
import type { PDFPayload, PDFCategoryResult, PDFRecommendation } from '@/lib/pdf/types';
import { Download, Loader2 } from 'lucide-react';

interface DownloadPdfButtonProps {
  overallScore: OverallScore;
}

export default function DownloadPdfButton({ overallScore }: DownloadPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params?.locale as 'de' | 'en';

  const answers = useGapAnalysisStore((state) => state.answers);
  const formData = useWizardStore((state) => state.formData);

  const t = useTranslations('results');
  const tPdf = useTranslations('pdf');
  const tSectors = useTranslations('sectors');
  const tCategories = useTranslations('categories');
  const tRec = useTranslations('recommendations');
  const tClass = useTranslations('classification');

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Build company profile
      const sector = getSectorById(formData.sectorId || '');
      const sectorName = sector ? tSectors(`${sector.id}.name`) : 'Unknown';
      const subsector = sector?.subsectors.find(s => s.id === formData.subsectorId);
      const subsectorName = subsector
        ? tSectors(subsector.nameKey.replace('sectors.', ''))
        : undefined;

      // Run classification
      const classificationInput = {
        sectorId: formData.sectorId || '',
        subsectorId: formData.subsectorId || null,
        employees: formData.employees || 0,
        annualRevenue: formData.annualRevenue || 0,
        balanceSheet: formData.balanceSheet || 0,
        isKritis: formData.isKritis || false,
      };
      const classificationResult = classifyEntity(classificationInput);
      const categoryKeyMap: Record<string, string> = {
        'besonders-wichtig': 'besondersWichtig',
        'wichtig': 'wichtig',
        'nicht-betroffen': 'nichtBetroffen',
      };
      const classification = tClass(`categories.${categoryKeyMap[classificationResult.category] || classificationResult.category}`);
      const legalReference = classificationResult.legalReference;

      // Build category results
      const categoryResults: PDFCategoryResult[] = overallScore.categoryScores.map((catScore) => {
        const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!;
        const categoryName = tCategories(category.nameKey.replace('categories.', ''));
        const shortName = tCategories(category.shortNameKey.replace('categories.', ''));
        const verdict = t(`verdict.${catScore.trafficLight}` as 'verdict.red');

        return {
          categoryId: catScore.categoryId,
          categoryName,
          shortName,
          percentage: catScore.percentage,
          trafficLight: catScore.trafficLight,
          euArticle: category.euArticle,
          bsigParagraph: category.bsigParagraph,
          verdict,
        };
      });

      // Build recommendations (all categories, sorted by traffic light and priority)
      const allRecommendations: PDFRecommendation[] = [];
      const trafficLightOrder = { red: 0, yellow: 1, green: 2 };
      const priorityOrder = { high: 0, medium: 1, low: 2 };

      overallScore.categoryScores
        .sort((a, b) => trafficLightOrder[a.trafficLight] - trafficLightOrder[b.trafficLight])
        .forEach((catScore) => {
          const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!;
          const categoryName = tCategories(category.nameKey.replace('categories.', ''));
          const recommendations = getRecommendationsByCategory(catScore.categoryId);

          recommendations
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
            .forEach((rec) => {
              allRecommendations.push({
                categoryName,
                title: tRec(rec.titleKey.replace('recommendations.', '')),
                description: tRec(rec.descriptionKey.replace('recommendations.', '')),
                firstStep: tRec(rec.firstStepKey.replace('recommendations.', '')),
                priority: rec.priority,
                effortLevel: rec.effortLevel,
                legalReference: rec.legalReference,
                bsiReference: rec.bsiReference,
              });
            });
        });

      // Flatten translation messages for PDF
      const messages: Record<string, string> = {
        'pdf.title': tPdf('title'),
        'pdf.subtitle': tPdf('subtitle'),
        'pdf.disclaimer': tPdf('disclaimer'),
        'pdf.rechtsstand': tPdf('rechtsstand'),
        'pdf.rechtstandDatum': tPdf('rechtstandDatum'),
        'pdf.generatedAt': tPdf('generatedAt'),
        'pdf.companyProfile': tPdf('companyProfile'),
        'pdf.sector': tPdf('sector'),
        'pdf.subsector': tPdf('subsector'),
        'pdf.employees': tPdf('employees'),
        'pdf.annualRevenue': tPdf('annualRevenue'),
        'pdf.classification': tPdf('classification'),
        'pdf.legalReference': tPdf('legalReference'),
        'pdf.overallScore': tPdf('overallScore'),
        'pdf.completionRate': tPdf('completionRate'),
        'pdf.answeredQuestions': tPdf('answeredQuestions'),
        'pdf.categories': tPdf('categories'),
        'pdf.categoryTableHeaders.nr': tPdf('categoryTableHeaders.nr'),
        'pdf.categoryTableHeaders.category': tPdf('categoryTableHeaders.category'),
        'pdf.categoryTableHeaders.score': tPdf('categoryTableHeaders.score'),
        'pdf.categoryTableHeaders.status': tPdf('categoryTableHeaders.status'),
        'pdf.categoryTableHeaders.legalBasis': tPdf('categoryTableHeaders.legalBasis'),
        'pdf.recommendations': tPdf('recommendations'),
        'pdf.priority.high': tPdf('priority.high'),
        'pdf.priority.medium': tPdf('priority.medium'),
        'pdf.priority.low': tPdf('priority.low'),
        'pdf.effortLevel.quick': tPdf('effortLevel.quick'),
        'pdf.effortLevel.medium': tPdf('effortLevel.medium'),
        'pdf.effortLevel.strategic': tPdf('effortLevel.strategic'),
        'pdf.firstStep': tPdf('firstStep'),
      };

      // Build payload
      const payload: PDFPayload = {
        locale,
        company: {
          sectorName,
          subsectorName,
          employees: formData.employees || 0,
          annualRevenue: formData.annualRevenue || 0,
          classification,
          classificationCategory: classificationResult.category,
          legalReference,
        },
        overallScore: {
          percentage: overallScore.percentage,
          trafficLight: overallScore.trafficLight,
          completionRate: overallScore.completionRate,
          answeredQuestions: overallScore.answeredQuestions,
          totalQuestions: overallScore.totalQuestions,
        },
        categories: categoryResults,
        recommendations: allRecommendations,
        messages,
      };

      // POST to API
      const response = await fetch('/api/pdf/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      // Download the blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `NIS2-Readiness-Report-${timestamp}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="default"
        onClick={handleDownload}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            {t('actions.downloadPdf')}
          </>
        )}
      </Button>
      {error && (
        <p className="text-sm text-red-600">
          Error: {error}
        </p>
      )}
    </div>
  );
}
