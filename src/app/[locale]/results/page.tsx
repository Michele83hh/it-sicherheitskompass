'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { useWizardStore } from '@/stores/wizard-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getQuestionsByCategory, getCoreQuestionCount, getTotalQuestionCount } from '@/lib/nis2/questions';
import { getRecommendationsByCategory } from '@/lib/nis2/recommendations';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { classifyEntity } from '@/lib/nis2/classification';
import { DisclaimerBanner } from './components/disclaimer-banner';
import { OverallScoreHero } from './components/overall-score-hero';
import { CategoryCard } from './components/category-card';
import { QuickWinsSection } from './components/quick-wins-section';
import { RecommendationsSection } from './components/recommendations-section';
import { BussgeldSection } from './components/bussgeld-section';
import { RoadmapSection } from './components/roadmap-section';
import { ProgressTrackingSection } from './components/progress-tracking-section';
import { KritisSection } from './components/kritis-section';
import { CostEstimationSection } from './components/cost-estimation-section';
import { DsgvoOverlapSection } from './components/dsgvo-overlap-section';
import { Iso27001Section } from './components/iso27001-section';
import { DinSpecSection } from './components/dinspec-section';
import { EvidenceSection } from './components/evidence-section';
import { SectorGuidanceSection } from './components/sector-guidance-section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import DownloadPdfButton from './components/download-pdf-button';
import {
  Calculator, Map, CheckSquare, ShieldAlert, Coins, GitCompare,
  FileCheck, BookOpen, ClipboardCheck, Building2, ArrowRight,
  HelpCircle, MessageCircle, Mail, ExternalLink
} from 'lucide-react';
import type { CategoryScore, TrafficLight, Recommendation } from '@/lib/nis2/types';

export default function ResultsPage() {
  const t = useTranslations('results');
  const tCategories = useTranslations('categories');
  const tRec = useTranslations('recommendations');
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string;

  const [isClient, setIsClient] = useState(false);

  // Zustand store access
  const answers = useGapAnalysisStore((state) => state.answers);
  const reset = useGapAnalysisStore((state) => state.reset);
  const setAssessmentPhase = useGapAnalysisStore((state) => state.setAssessmentPhase);
  const setCategoryIndex = useGapAnalysisStore((state) => state.setCategoryIndex);
  const formData = useWizardStore((state) => state.formData);

  // Hydration guard
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Derive classification from wizard data
  const classificationResult = useMemo(() => {
    if (!formData.sectorId) return null;
    return classifyEntity({
      sectorId: formData.sectorId,
      subsectorId: formData.subsectorId || null,
      employees: formData.employees || 0,
      annualRevenue: formData.annualRevenue || 0,
      balanceSheet: formData.balanceSheet || 0,
      isKritis: formData.isKritis || false,
    });
  }, [formData]);

  // Calculate scores with useMemo
  const overallScore = useMemo(() => {
    const categoryQuestionCounts = CATEGORIES.map((cat) => ({
      categoryId: cat.id,
      totalQuestions: getQuestionsByCategory(cat.id).length,
    }));
    return calculateOverallScore(answers, categoryQuestionCounts);
  }, [answers]);

  // Sort categories by traffic light (red -> yellow -> green)
  const sortedCategories = useMemo(() => {
    const trafficLightOrder: Record<TrafficLight, number> = {
      red: 0,
      yellow: 1,
      green: 2,
    };

    return overallScore.categoryScores
      .map((catScore) => {
        const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!;
        const recommendations = getRecommendationsByCategory(catScore.categoryId);
        return { categoryScore: catScore, category, recommendations };
      })
      .sort(
        (a, b) =>
          trafficLightOrder[a.categoryScore.trafficLight] -
          trafficLightOrder[b.categoryScore.trafficLight]
      );
  }, [overallScore]);

  // All recommendations flat list
  const allRecommendations = useMemo(() => {
    return sortedCategories.flatMap((cat) => cat.recommendations);
  }, [sortedCategories]);

  // Derive quick wins: red categories with quick effort level, then yellow if needed
  const quickWins = useMemo(() => {
    const redQuickWins = sortedCategories
      .filter((cat) => cat.categoryScore.trafficLight === 'red')
      .flatMap((cat) =>
        cat.recommendations
          .filter((rec) => rec.effortLevel === 'quick')
          .map((rec) => ({
            recommendation: rec,
            categoryName: tCategories(
              cat.category.nameKey.replace('categories.', '')
            ),
            categoryTrafficLight: cat.categoryScore.trafficLight,
          }))
      );

    // If fewer than 3, add yellow quick wins
    if (redQuickWins.length < 3) {
      const yellowQuickWins = sortedCategories
        .filter((cat) => cat.categoryScore.trafficLight === 'yellow')
        .flatMap((cat) =>
          cat.recommendations
            .filter((rec) => rec.effortLevel === 'quick')
            .map((rec) => ({
              recommendation: rec,
              categoryName: tCategories(
                cat.category.nameKey.replace('categories.', '')
              ),
              categoryTrafficLight: cat.categoryScore.trafficLight,
            }))
        );
      return [...redQuickWins, ...yellowQuickWins].slice(0, 5);
    }

    return redQuickWins.slice(0, 5);
  }, [sortedCategories, tCategories]);

  // Route guard — allow access if at least core questions are answered
  const coreQuestionCount = getCoreQuestionCount();
  const totalQuestions = getTotalQuestionCount();
  const hasCompletedCore = answers.length >= coreQuestionCount;
  const hasCompletedFull = answers.length >= totalQuestions;
  const analysisDepth: 'core' | 'full' = hasCompletedFull ? 'full' : 'core';

  useEffect(() => {
    if (isClient && !hasCompletedCore) {
      router.push(`/${locale}/gap-analysis`);
    }
  }, [isClient, hasCompletedCore, locale, router]);

  if (!isClient) {
    // Server skeleton
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>
        <div className="mb-8 h-24 animate-pulse rounded-lg bg-gray-100" />
        <div className="mb-8 h-64 animate-pulse rounded-lg bg-gray-100" />
        <div className="mb-8 h-96 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  // Client-side render
  const handleRetake = () => {
    reset();
    router.push(`/${locale}/gap-analysis`);
  };

  const classification = classificationResult?.category;
  const isKritis = formData.isKritis || false;
  const sectorId = formData.sectorId || '';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>

      {/* Analysis depth badge */}
      <div className="mb-4 text-center">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
          analysisDepth === 'full'
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-blue-100 text-blue-700 border border-blue-200'
        }`}>
          {t(`analysisDepth.${analysisDepth}`)}
        </span>
      </div>

      {/* Deepen banner — show when only core is complete */}
      {!hasCompletedFull && (
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div>
            <p className="font-semibold text-purple-900">{t('deepenBanner.title')}</p>
            <p className="text-sm text-purple-700">{t('deepenBanner.text')}</p>
          </div>
          <button
            onClick={() => {
              setAssessmentPhase('advanced');
              setCategoryIndex(0);
              router.push(`/${locale}/gap-analysis`);
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            {t('deepenBanner.button')}
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}

      {/* Disclaimer banner */}
      <DisclaimerBanner />

      {/* Overall score hero */}
      <OverallScoreHero overallScore={overallScore} />

      {/* Category cards grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCategories.map(({ categoryScore, category, recommendations }) => {
          const categoryName = tCategories(
            category.nameKey.replace('categories.', '')
          );
          const categoryShortName = tCategories(
            category.shortNameKey.replace('categories.', '')
          );

          // Get top recommendation (priority high first, then medium, then low)
          const topRec = [...recommendations].sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })[0];

          const topRecommendation = topRec
            ? {
                title: tRec(topRec.titleKey.replace('recommendations.', '')),
                firstStep: tRec(
                  topRec.firstStepKey.replace('recommendations.', '')
                ),
                effortLevel: topRec.effortLevel,
              }
            : undefined;

          const verdict = t(
            `verdict.${categoryScore.trafficLight}` as 'verdict.red'
          );

          return (
            <CategoryCard
              key={categoryScore.categoryId}
              categoryScore={categoryScore}
              categoryName={categoryName}
              categoryShortName={categoryShortName}
              categoryIcon={category.icon}
              euArticle={category.euArticle}
              bsigParagraph={category.bsigParagraph}
              verdict={verdict}
              topRecommendation={topRecommendation}
            />
          );
        })}
      </div>

      {/* Quick wins section */}
      {quickWins.length > 0 && <QuickWinsSection quickWins={quickWins} />}

      {/* Roadmap section */}
      <RoadmapSection
        categoryScores={overallScore.categoryScores}
        recommendations={allRecommendations}
      />

      {/* Bußgeld-Kalkulator */}
      {classification && classification !== 'nicht-betroffen' && (
        <BussgeldSection
          classification={classification as 'besonders-wichtig' | 'wichtig'}
          annualRevenue={formData.annualRevenue || 0}
        />
      )}

      {/* Full recommendations section */}
      <RecommendationsSection
        sortedCategories={sortedCategories.map((cat) => ({
          categoryScore: cat.categoryScore,
          categoryName: tCategories(
            cat.category.nameKey.replace('categories.', '')
          ),
          recommendations: cat.recommendations,
        }))}
      />

      {/* Progress tracking */}
      <ProgressTrackingSection recommendations={allRecommendations} />

      {/* KRITIS section (conditional) */}
      {isKritis && <KritisSection />}

      {/* Sector-specific guidance */}
      {sectorId && <SectorGuidanceSection sectorId={sectorId} />}

      <Separator className="my-8" />

      {/* Deep-dive sections in accordion */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Vertiefende Analysen</h2>
        <Accordion type="multiple" className="rounded-lg border">
          {/* Cost estimation */}
          <AccordionItem value="costs">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                <Coins className="size-5 text-primary" />
                <span>Kostenschätzung</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <CostEstimationSection
                recommendations={allRecommendations}
                categoryScores={overallScore.categoryScores}
                companyProfile={
                  formData.employees
                    ? {
                        employees: formData.employees,
                        entityCategory: (classification as 'besonders-wichtig' | 'wichtig') || 'wichtig',
                        isKritis,
                      }
                    : null
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* DSGVO Overlap */}
          <AccordionItem value="dsgvo">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                <GitCompare className="size-5 text-primary" />
                <span>DSGVO-Überlappungsanalyse</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <DsgvoOverlapSection />
            </AccordionContent>
          </AccordionItem>

          {/* ISO 27001 */}
          <AccordionItem value="iso27001">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                <FileCheck className="size-5 text-primary" />
                <span>ISO 27001:2022 Crosswalk</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <Iso27001Section />
            </AccordionContent>
          </AccordionItem>

          {/* DIN SPEC 27076 */}
          <AccordionItem value="dinspec">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-primary" />
                <span>DIN SPEC 27076 Vergleich</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <DinSpecSection />
            </AccordionContent>
          </AccordionItem>

          {/* Evidence management */}
          {classification && classification !== 'nicht-betroffen' && (
            <AccordionItem value="evidence">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="size-5 text-primary" />
                  <span>Nachweismanagement</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <EvidenceSection classification={classification as 'besonders-wichtig' | 'wichtig'} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>

      {/* Action buttons */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Button variant="outline" onClick={handleRetake}>
          {t('actions.retake')}
        </Button>
        <DownloadPdfButton overallScore={overallScore} />
      </div>

      <Separator className="my-12" />

      {/* FAQ Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="size-6 text-primary" />
          <h2 className="text-2xl font-bold">{t('faq.title')}</h2>
        </div>
        <Accordion type="single" collapsible className="rounded-lg border">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="px-4 text-left">{t('faq.q1.question')}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{t('faq.q1.answer')}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="px-4 text-left">{t('faq.q2.question')}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{t('faq.q2.answer')}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="px-4 text-left">{t('faq.q3.question')}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{t('faq.q3.answer')}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger className="px-4 text-left">{t('faq.q4.question')}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{t('faq.q4.answer')}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger className="px-4 text-left">{t('faq.q5.question')}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{t('faq.q5.answer')}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Consultation / Next Steps Section */}
      <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-white p-8">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="size-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{t('consultation.title')}</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            {t('consultation.subtitle')}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="rounded-lg border bg-white p-4 text-center">
            <Mail className="mx-auto mb-2 size-5 text-primary" />
            <p className="text-sm font-medium">{t('consultation.email.title')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('consultation.email.desc')}</p>
          </div>
          <div className="rounded-lg border bg-white p-4 text-center">
            <FileCheck className="mx-auto mb-2 size-5 text-primary" />
            <p className="text-sm font-medium">{t('consultation.audit.title')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('consultation.audit.desc')}</p>
          </div>
          <div className="rounded-lg border bg-white p-4 text-center">
            <ExternalLink className="mx-auto mb-2 size-5 text-primary" />
            <p className="text-sm font-medium">{t('consultation.bsi.title')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('consultation.bsi.desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
