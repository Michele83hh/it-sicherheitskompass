'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { Link } from '@/lib/i18n/routing';
import { useRegulationConfig, getCoreQuestionCount, getTotalQuestionCount, getQuestionsByCategory, getRecommendationsByCategory } from '@/hooks/useRegulationConfig';
import { useRegulationStores } from '@/hooks/useRegulationStores';
import { useWizardStore } from '@/stores/wizard-store';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DisclaimerBanner } from './components/disclaimer-banner';
import { OverallScoreHero } from './components/overall-score-hero';
import { CategoryCard } from './components/category-card';
import { QuickWinsSection } from './components/quick-wins-section';
import { RecommendationsSection } from './components/recommendations-section';
import { RoadmapSection } from './components/roadmap-section';
import { ProgressTrackingSection } from './components/progress-tracking-section';
import { ExecutiveSummaryModal } from './components/executive-summary-modal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import DownloadPdfButton from './components/download-pdf-button';
import DownloadGenericPdfButton from './components/download-generic-pdf-button';
import { DownloadExcelButton } from './components/download-excel-button';
import {
  Calculator, Map, CheckSquare, ShieldAlert, Coins, GitCompare,
  FileCheck, BookOpen, ClipboardCheck, Building2, ArrowRight,
  HelpCircle, MessageCircle, Mail, ExternalLink, LayoutDashboard,
  BarChart3, ListChecks, Download, Zap, Settings, Target, Briefcase
} from 'lucide-react';
import { RegulationBreadcrumb } from '@/components/layout/breadcrumb';
import type { TrafficLight } from '@/lib/regulations/types';
import '@/lib/regulations/init';

// NIS2-exclusive imports (lazy — only rendered for NIS2)
import { BussgeldSection } from './components/bussgeld-section';
import { KritisSection } from './components/kritis-section';
import { CostEstimationSection } from './components/cost-estimation-section';
import { DsgvoOverlapSection } from './components/dsgvo-overlap-section';
import { Iso27001Section } from './components/iso27001-section';
import { DinSpecSection } from './components/dinspec-section';
import { EvidenceSection } from './components/evidence-section';
import { SectorGuidanceSection } from './components/sector-guidance-section';
import { CrossRegSynergies } from './components/cross-reg-synergies';

const TAB_VALUES = ['overview', 'quickwins', 'actionplan', 'progress', 'export'] as const;
type TabValue = (typeof TAB_VALUES)[number];

function getTabFromHash(hash: string): TabValue {
  const cleaned = hash.replace('#', '').toLowerCase();
  if (TAB_VALUES.includes(cleaned as TabValue)) return cleaned as TabValue;
  return 'overview';
}

export default function ResultsPage() {
  const t = useTranslations('results');
  const tAll = useTranslations();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string;
  const regulation = params?.regulation as string;

  const config = useRegulationConfig();
  const { assessmentStore } = useRegulationStores(regulation);
  const isNis2 = regulation === 'nis2';

  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('overview');
  const [showChefSummary, setShowChefSummary] = useState(false);

  // Zustand store access
  const answers = assessmentStore((state) => state.answers);
  const reset = assessmentStore((state) => state.reset);
  const setAssessmentPhase = assessmentStore((state) => state.setAssessmentPhase);
  const setCategoryIndex = assessmentStore((state) => state.setCategoryIndex);

  // NIS2-specific wizard data
  const formData = useWizardStore((state) => state.formData);

  // Hydration guard + hash-based tab
  useEffect(() => {
    setIsClient(true);
    const hash = window.location.hash;
    if (hash) setActiveTab(getTabFromHash(hash));
  }, []);

  // Sync tab to URL hash
  const handleTabChange = useCallback((value: string) => {
    const tab = value as TabValue;
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  }, []);

  // Derive classification from wizard data (NIS2-only)
  const classificationResult = useMemo(() => {
    if (!isNis2 || !formData.sectorId) return null;
    try {
      const { classifyEntity } = require('@/lib/regulations/nis2/classification');
      return classifyEntity({
        sectorId: formData.sectorId,
        subsectorId: formData.subsectorId || null,
        employees: formData.employees || 0,
        annualRevenue: formData.annualRevenue || 0,
        balanceSheet: formData.balanceSheet || 0,
        isKritis: formData.isKritis || false,
      });
    } catch {
      return null;
    }
  }, [isNis2, formData]);

  // Calculate scores using generic config
  const overallScore = useMemo(() => {
    const categoryQuestionCounts = config.categories.map((cat) => ({
      categoryId: cat.id,
      totalQuestions: getQuestionsByCategory(config, cat.id).length,
    }));
    return calculateOverallScore(answers, categoryQuestionCounts);
  }, [answers, config]);

  // Sort categories by traffic light (red -> yellow -> green)
  const sortedCategories = useMemo(() => {
    const trafficLightOrder: Record<TrafficLight, number> = {
      red: 0,
      yellow: 1,
      green: 2,
    };

    return overallScore.categoryScores
      .map((catScore) => {
        const category = config.categories.find((c) => c.id === catScore.categoryId)!;
        const recommendations = getRecommendationsByCategory(config, catScore.categoryId);
        return { categoryScore: catScore, category, recommendations };
      })
      .sort(
        (a, b) =>
          trafficLightOrder[a.categoryScore.trafficLight] -
          trafficLightOrder[b.categoryScore.trafficLight]
      );
  }, [overallScore, config]);

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
            categoryName: tAll(cat.category.nameKey),
            categoryTrafficLight: cat.categoryScore.trafficLight,
          }))
      );

    if (redQuickWins.length < 3) {
      const yellowQuickWins = sortedCategories
        .filter((cat) => cat.categoryScore.trafficLight === 'yellow')
        .flatMap((cat) =>
          cat.recommendations
            .filter((rec) => rec.effortLevel === 'quick')
            .map((rec) => ({
              recommendation: rec,
              categoryName: tAll(cat.category.nameKey),
              categoryTrafficLight: cat.categoryScore.trafficLight,
            }))
        );
      return [...redQuickWins, ...yellowQuickWins].slice(0, 5);
    }

    return redQuickWins.slice(0, 5);
  }, [sortedCategories, tAll]);

  // Route guard
  const hasTieredAssessment = config.features.hasTieredAssessment;
  const coreQuestionCount = getCoreQuestionCount(config);
  const totalQuestions = getTotalQuestionCount(config);
  const hasCompletedCore = hasTieredAssessment
    ? answers.length >= coreQuestionCount
    : answers.length > 0;
  const hasCompletedFull = answers.length >= totalQuestions;
  const analysisDepth: 'core' | 'full' = hasCompletedFull ? 'full' : 'core';

  useEffect(() => {
    if (isClient && !hasCompletedCore) {
      router.push(`/${locale}/${regulation}/assessment`);
    }
  }, [isClient, hasCompletedCore, locale, regulation, router]);

  if (!isClient) {
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
    router.push(`/${locale}/${regulation}/assessment`);
  };

  const classification = classificationResult?.category;
  const isKritis = isNis2 ? (formData.isKritis || false) : false;
  const sectorId = isNis2 ? (formData.sectorId || '') : '';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <RegulationBreadcrumb regulation={regulation} currentPage="results" />
      {/* Title */}
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>

      {/* Analysis depth badge */}
      {hasTieredAssessment && (
        <div className="mb-4 text-center">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            analysisDepth === 'full'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            {t(`analysisDepth.${analysisDepth}`)}
          </span>
        </div>
      )}

      {/* Deepen banner — show when only core is complete (tiered only) */}
      {hasTieredAssessment && !hasCompletedFull && (
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div>
            <p className="font-semibold text-purple-900">{t('deepenBanner.title')}</p>
            <p className="text-sm text-purple-700">{t('deepenBanner.text')}</p>
          </div>
          <button
            onClick={() => {
              setAssessmentPhase('advanced');
              setCategoryIndex(0);
              router.push(`/${locale}/${regulation}/assessment`);
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20 transition-colors"
          >
            {t('deepenBanner.button')}
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}

      {/* Disclaimer banner */}
      <DisclaimerBanner />

      {/* Overall score hero — ALWAYS visible above tabs */}
      <OverallScoreHero overallScore={overallScore} />

      {/* Action buttons after score */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        <Button
          variant="default"
          onClick={() => setShowChefSummary(true)}
          className="bg-slate-900 hover:bg-slate-800"
        >
          <Briefcase className="mr-2 size-4" />
          {t('chefSummary.button')}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 size-4" />
            {t('actions.toDashboard')}
          </Link>
        </Button>
      </div>

      {/* Chef-Button Executive Summary Modal */}
      <ExecutiveSummaryModal
        open={showChefSummary}
        onClose={() => setShowChefSummary(false)}
        overallScore={overallScore}
        sortedCategories={sortedCategories}
        quickWins={quickWins}
        regulationName={config ? tAll(config.nameKey) : regulation.toUpperCase()}
      />

      {/* ========== TAB-BASED LAYOUT ========== */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Sticky tab bar */}
        <div className="sticky top-0 z-30 -mx-4 bg-background/95 backdrop-blur-sm border-b px-4 py-2">
          <TabsList className="w-full overflow-x-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <BarChart3 className="size-4" />
              <span>{t('tabs.overview')}</span>
            </TabsTrigger>
            <TabsTrigger value="quickwins" className="flex items-center gap-1.5">
              <Zap className="size-4" />
              <span>{t('tabs.quickWins')}</span>
            </TabsTrigger>
            <TabsTrigger value="actionplan" className="flex items-center gap-1.5">
              <ListChecks className="size-4" />
              <span>{t('tabs.actionPlan')}</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-1.5">
              <CheckSquare className="size-4" />
              <span>{t('tabs.progress')}</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-1.5">
              <Download className="size-4" />
              <span>{t('tabs.export')}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ===== TAB: OVERVIEW ===== */}
        <TabsContent value="overview" className="mt-6">
          {/* Category cards grid */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedCategories.map(({ categoryScore, category, recommendations }) => {
              const categoryName = tAll(category.nameKey);
              const categoryShortName = tAll(category.shortNameKey);

              const topRec = [...recommendations].sort((a, b) => {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })[0];

              const topRecommendation = topRec
                ? {
                    title: tAll(topRec.titleKey),
                    firstStep: tAll(topRec.firstStepKey),
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
                  euArticle={undefined}
                  bsigParagraph={undefined}
                  verdict={verdict}
                  topRecommendation={topRecommendation}
                />
              );
            })}
          </div>

          {/* Deepen banner in overview (if tiered & not full) */}
          {hasTieredAssessment && !hasCompletedFull && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
              <div>
                <p className="font-semibold text-purple-900">{t('deepenBanner.title')}</p>
                <p className="text-sm text-purple-700">{t('deepenBanner.text')}</p>
              </div>
              <button
                onClick={() => {
                  setAssessmentPhase('advanced');
                  setCategoryIndex(0);
                  router.push(`/${locale}/${regulation}/assessment`);
                }}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20 transition-colors"
              >
                {t('deepenBanner.button')}
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}

          {/* NIS2-specific: Bussgeld section */}
          {isNis2 && classification && classification !== 'nicht-betroffen' && (
            <div className="mt-8">
              <BussgeldSection
                classification={classification as 'besonders-wichtig' | 'wichtig'}
                annualRevenue={formData.annualRevenue || 0}
              />
            </div>
          )}

          {/* Cross-regulation synergies (all regulations) */}
          <div className="mt-8">
            <CrossRegSynergies />
          </div>
        </TabsContent>

        {/* ===== TAB: QUICK WINS ===== */}
        <TabsContent value="quickwins" className="mt-6">
          {quickWins.length > 0 ? (
            <QuickWinsSection quickWins={quickWins} />
          ) : (
            <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
              <CheckSquare className="mx-auto mb-3 size-8 text-green-600" />
              <p className="font-semibold text-green-900">
                {t('noQuickWins.title')}
              </p>
              <p className="mt-1 text-sm text-green-700">
                {t('noQuickWins.description')}
              </p>
            </div>
          )}
        </TabsContent>

        {/* ===== TAB: ACTION PLAN ===== */}
        <TabsContent value="actionplan" className="mt-6">
          {/* Compact 3-phase roadmap timeline */}
          {config.features.hasRoadmap && (() => {
            const { generateRoadmap } = require('@/lib/regulations/nis2/roadmap');
            const phases = generateRoadmap(overallScore.categoryScores, allRecommendations);
            const phaseConfig = [
              { icon: Zap, borderColor: 'border-l-green-500', bgColor: 'bg-green-100', textColor: 'text-green-700', key: 'phase1' },
              { icon: Settings, borderColor: 'border-l-amber-500', bgColor: 'bg-amber-100', textColor: 'text-amber-700', key: 'phase2' },
              { icon: Target, borderColor: 'border-l-blue-500', bgColor: 'bg-blue-100', textColor: 'text-blue-700', key: 'phase3' },
            ];
            const tRoad = tAll;

            return (
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                  <Map className="size-6 text-primary" />
                  <h2 className="text-2xl font-bold">{tRoad('roadmap.title')}</h2>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{tRoad('roadmap.subtitle')}</p>

                {/* Compact 3-card grid */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {phases.map((phase: { id: string; items: { urgency: string }[] }, index: number) => {
                    const pc = phaseConfig[index];
                    const Icon = pc.icon;
                    const criticalCount = phase.items.filter((i: { urgency: string }) => i.urgency === 'critical' || i.urgency === 'high').length;

                    return (
                      <div key={pc.key} className={`rounded-lg border border-l-4 ${pc.borderColor} p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`rounded-full p-1.5 ${pc.bgColor}`}>
                            <Icon className={`size-4 ${pc.textColor}`} />
                          </div>
                          <h3 className="text-sm font-semibold">{tRoad(`roadmap.${pc.key}.title`)}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{tRoad(`roadmap.${pc.key}.description`)}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{phase.items.length}</span>
                          <span className="text-xs text-muted-foreground">{tRoad('roadmap.totalItems')}</span>
                        </div>
                        {criticalCount > 0 && (
                          <p className="mt-1 text-xs text-red-600 font-medium">
                            {t('urgentCount', { count: criticalCount })}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Category-based recommendation accordion */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">
              {t('categoryAccordionTitle')}
            </h2>
            <Accordion type="multiple" className="space-y-3">
              {sortedCategories.map(({ categoryScore, category, recommendations: catRecs }) => {
                const categoryName = tAll(category.nameKey);
                const trafficColors: Record<TrafficLight, string> = {
                  red: 'border-l-red-500',
                  yellow: 'border-l-amber-500',
                  green: 'border-l-green-500',
                };

                return (
                  <AccordionItem key={categoryScore.categoryId} value={categoryScore.categoryId} className={`rounded-lg border border-l-4 ${trafficColors[categoryScore.trafficLight]}`}>
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <div className="text-left">
                          <span className="font-semibold">{categoryName}</span>
                          <span className="ml-2 text-sm text-muted-foreground">
                            {categoryScore.percentage}% · {t('recommendationsCount', { count: catRecs.length })}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <RecommendationsSection
                        sortedCategories={[{
                          categoryScore,
                          categoryName,
                          recommendations: catRecs,
                        }]}
                        compact
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* NIS2-exclusive deep-dive sections in accordion */}
          {isNis2 && (
            <>
              <Separator className="my-8" />
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">{t('deepDive.title')}</h2>
                <Accordion type="multiple" className="rounded-lg border">
                  <AccordionItem value="costs">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <Coins className="size-5 text-primary" />
                        <span>{t('deepDive.costs')}</span>
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

                  <AccordionItem value="dsgvo">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <GitCompare className="size-5 text-primary" />
                        <span>{t('deepDive.dsgvo')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <DsgvoOverlapSection />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="iso27001">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <FileCheck className="size-5 text-primary" />
                        <span>{t('deepDive.iso27001')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <Iso27001Section />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="dinspec">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-5 text-primary" />
                        <span>{t('deepDive.dinspec')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <DinSpecSection />
                    </AccordionContent>
                  </AccordionItem>

                  {classification && classification !== 'nicht-betroffen' && (
                    <AccordionItem value="evidence">
                      <AccordionTrigger className="px-4">
                        <div className="flex items-center gap-2">
                          <ClipboardCheck className="size-5 text-primary" />
                          <span>{t('deepDive.evidence')}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <EvidenceSection classification={classification as 'besonders-wichtig' | 'wichtig'} />
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </>
          )}

          {isNis2 && isKritis && <KritisSection />}
          {isNis2 && sectorId && <SectorGuidanceSection sectorId={sectorId} />}
        </TabsContent>

        {/* ===== TAB: PROGRESS ===== */}
        <TabsContent value="progress" className="mt-6">
          <ProgressTrackingSection recommendations={allRecommendations} />
        </TabsContent>

        {/* ===== TAB: EXPORT ===== */}
        <TabsContent value="export" className="mt-6">
          <div className="space-y-6">
            {/* PDF export */}
            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <FileCheck className="size-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{t('pdfReportTitle')}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t('actions.downloadPdf')}
                  </p>
                  <div className="mt-4">
                    {isNis2 ? (
                      <DownloadPdfButton overallScore={overallScore} />
                    ) : (
                      <DownloadGenericPdfButton overallScore={overallScore} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Excel export */}
            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Download className="size-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{t('excelReportTitle')}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t('excelReportDesc')}
                  </p>
                  <div className="mt-4">
                    <DownloadExcelButton />
                  </div>
                </div>
              </div>
            </div>

            {/* Retake / Dashboard */}
            <div className="flex flex-wrap items-center gap-4">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 size-4" />
                  {t('actions.toDashboard')}
                </Link>
              </Button>
              <Button variant="outline" onClick={handleRetake}>
                {t('actions.retake')}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      {/* FAQ Section — always visible below tabs */}
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
