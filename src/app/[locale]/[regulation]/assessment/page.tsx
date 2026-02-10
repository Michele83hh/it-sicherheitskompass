'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Save, ClipboardList, BarChart3, FileText, ArrowRight, Clock, Shield, Lock, CheckCircle2, Zap, ChevronDown, ChevronUp, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from '@/lib/i18n/routing';
import { RegulationBreadcrumb } from '@/components/layout/breadcrumb';
import { useRegulationConfig, getCoreQuestionCount, getTotalQuestionCount, getQuestionsByCategory } from '@/hooks/useRegulationConfig';
import { useRegulationStores } from '@/hooks/useRegulationStores';
import { CategoryProgress } from './components/category-progress';
import { CategoryStep } from './steps/category-step';
import { MilestoneScreen } from './components/milestone-screen';
import '@/lib/regulations/init';

export default function GapAnalysisPage() {
  const t = useTranslations('gapAnalysis');
  const tAll = useTranslations();
  const params = useParams();
  const locale = params?.locale as string;
  const regulation = params?.regulation as string;

  const config = useRegulationConfig();
  const { assessmentStore } = useRegulationStores(regulation);

  const currentCategoryIndex = assessmentStore((state) => state.currentCategoryIndex);
  const answers = assessmentStore((state) => state.answers);
  const hasCompletedQuickCheck = assessmentStore((state) => state.hasCompletedQuickCheck);
  const assessmentPhase = assessmentStore((state) => state.assessmentPhase);
  const resetPhase = assessmentStore((state) => state.resetPhase);
  const reset = assessmentStore((state) => state.reset);

  const [isClient, setIsClient] = useState(false);
  const [showSaveNotice, setShowSaveNotice] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Avoid hydration mismatch from zustand persist
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show "progress saved" notice once on mount
  useEffect(() => {
    if (isClient) {
      setShowSaveNotice(true);
      const timer = setTimeout(() => setShowSaveNotice(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

  // Warn before leaving if answers exist
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (answers.length > 0) {
        e.preventDefault();
      }
    },
    [answers.length]
  );

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  const [showMilestone, setShowMilestone] = useState(false);

  // Use categories from config
  const categories = config.categories;
  const hasTieredAssessment = config.features.hasTieredAssessment;

  // Build populated categories based on current phase
  const populatedCategories = categories.map((cat) => ({
    ...cat,
    questions: hasTieredAssessment
      ? getQuestionsByCategory(config, cat.id, assessmentPhase === 'core' ? 'core' : 'advanced')
      : getQuestionsByCategory(config, cat.id),
  }));

  // Phase-dependent progress calculation
  const coreTotal = getCoreQuestionCount(config);
  const fullTotal = getTotalQuestionCount(config);

  // Count answers per tier
  const coreAnsweredCount = answers.filter((a) => {
    const qNum = a.questionId.split('-q')[1];
    return qNum && parseInt(qNum) <= 3;
  }).length;

  const totalAnsweredCount = answers.length;

  // In core phase: progress out of core; in advanced: progress out of full total
  const phaseTotal = hasTieredAssessment
    ? (assessmentPhase === 'core' ? coreTotal : fullTotal)
    : fullTotal;
  const phaseAnswered = hasTieredAssessment
    ? (assessmentPhase === 'core' ? coreAnsweredCount : totalAnsweredCount)
    : totalAnsweredCount;

  // Endowed Progress: add ~15% bonus if user came from Schnellcheck (only in core phase with 0 answers)
  const bonusQuestions = hasCompletedQuickCheck && assessmentPhase === 'core' && hasTieredAssessment
    ? Math.round(coreTotal * 0.15)
    : 0;
  const effectiveAnswered = Math.min(phaseAnswered + bonusQuestions, phaseTotal);

  // Dynamic counts for translations
  const categoryCount = categories.length;
  const questionCount = fullTotal;
  const recCount = config.recommendations.length;
  const estimatedMinutes = Math.max(5, Math.round(questionCount / 3));

  if (!isClient) {
    // Server skeleton with same structure to minimize layout shift
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mb-8 text-center text-muted-foreground">{t('subtitle', { count: categoryCount })}</p>
        {/* Placeholder for progress indicator */}
        <div className="mb-8 h-32 animate-pulse rounded-lg bg-gray-100" />
        {/* Placeholder for category content */}
        <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  // Show intro only when user hasn't answered any questions yet
  const hasStarted = answers.length > 0;
  const shouldShowIntro = showIntro && !hasStarted;

  if (shouldShowIntro) {
    return (
      <div>
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <ClipboardList className="size-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('intro.title')}
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              {t('intro.subtitle')}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
        {/* Timeline: Visual flow */}
        {hasTieredAssessment ? (
          <div className="mb-14">
            <h2 className="text-xl font-semibold text-center mb-8">{t('intro.timelineTitle')}</h2>
            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200" aria-hidden="true" />
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center relative">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200 relative z-10">
                    <ClipboardList className="size-7 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{t('intro.timeline.core.title')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.core.desc', { count: questionCount, minutes: estimatedMinutes })}</p>
                </div>
                <div className="text-center relative">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 border-2 border-green-200 relative z-10">
                    <CheckCircle2 className="size-7 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold">{t('intro.timeline.milestone.title')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.milestone.desc')}</p>
                </div>
                <div className="text-center relative">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200 relative z-10">
                    <BarChart3 className="size-7 text-gray-500" />
                  </div>
                  <p className="text-sm font-semibold">{t('intro.timeline.results.title')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.results.desc')}</p>
                </div>
                <div className="text-center relative">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 border-2 border-purple-200 relative z-10">
                    <Zap className="size-7 text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold">{t('intro.timeline.advanced.title')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.advanced.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-14">
            <h2 className="text-xl font-semibold text-center mb-8">{t('intro.timelineTitle')}</h2>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[25%] right-[25%] h-0.5 bg-gray-200" aria-hidden="true" />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="text-center relative">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-200 relative z-10">
                    <ClipboardList className="size-7 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{t('intro.timeline.core.title')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.core.desc', { count: questionCount, minutes: estimatedMinutes })}</p>
                </div>
                <div className="text-center relative">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200 relative z-10">
                    <BarChart3 className="size-7 text-gray-500" />
                  </div>
                  <p className="text-sm font-semibold">{t('intro.timeline.results.title')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.results.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-14">
          <h2 className="text-xl font-semibold text-center mb-8">{t('intro.featuresTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
              <FileText className="size-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{t('intro.features.pdf.title')}</p>
                <p className="text-xs text-muted-foreground">{t('intro.features.pdf.desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
              <BarChart3 className="size-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{t('intro.features.scores.title')}</p>
                <p className="text-xs text-muted-foreground">{t('intro.features.scores.desc', { count: categoryCount })}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
              <ArrowRight className="size-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{t('intro.features.roadmap.title')}</p>
                <p className="text-xs text-muted-foreground">{t('intro.features.roadmap.desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
              <Shield className="size-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{t('intro.features.recs.title', { count: recCount })}</p>
                <p className="text-xs text-muted-foreground">{t('intro.features.recs.desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span>{t('intro.duration', { minutes: estimatedMinutes })}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Save className="size-4" />
            <span>{t('intro.autosave')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Lock className="size-4" />
            <span>{t('intro.local')}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-14">
          <Button size="lg" className="text-lg px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20" onClick={() => setShowIntro(false)}>
            <ClipboardList className="mr-2 size-5" />
            {t('intro.cta')}
          </Button>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-semibold text-center mb-6">{t('intro.faqTitle')}</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left">{t('intro.faq.q1.question')}</AccordionTrigger>
              <AccordionContent>{t('intro.faq.q1.answer')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left">{t('intro.faq.q2.question')}</AccordionTrigger>
              <AccordionContent>{t('intro.faq.q2.answer')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-left">{t('intro.faq.q3.question')}</AccordionTrigger>
              <AccordionContent>{t('intro.faq.q3.answer')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger className="text-left">{t('intro.faq.q4.question')}</AccordionTrigger>
              <AccordionContent>{t('intro.faq.q4.answer')}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        </div>
      </div>
    );
  }

  const currentCategory = populatedCategories[currentCategoryIndex];
  const isFirstCategory = currentCategoryIndex === 0;
  const isLastCategory = currentCategoryIndex === populatedCategories.length - 1;

  // Show milestone screen after core phase completion (only for tiered assessments)
  if (showMilestone && hasTieredAssessment) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <MilestoneScreen regulation={regulation} config={config} />
      </div>
    );
  }

  // Phase label for subtitle
  const phaseLabel = hasTieredAssessment
    ? (assessmentPhase === 'core' ? t('phase.core') : t('phase.advanced'))
    : t('phase.core');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <RegulationBreadcrumb regulation={regulation} currentPage="assessment" />
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mb-4 text-center text-muted-foreground">{t('subtitle', { count: categoryCount })}</p>

      {/* Phase indicator — prominent banner in advanced phase */}
      {hasTieredAssessment && assessmentPhase === 'advanced' ? (
        <div className="mb-6 rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-purple-800">
            {t('phase.advanced')} — {t('phase.advancedSubtitle')}
          </p>
        </div>
      ) : (
        <p className="mb-6 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {phaseLabel} — {hasTieredAssessment ? coreTotal : fullTotal} {t('phase.questionsLabel')}
          </span>
        </p>
      )}

      {/* Auto-save notice */}
      {showSaveNotice && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-700 animate-fade-in">
          <Save className="size-4 flex-shrink-0" />
          {t('progress.autoSaved')}
        </div>
      )}

      {/* Pause / Dashboard navigation */}
      {answers.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
          <span className="text-xs text-muted-foreground">
            {t('progress.autoSaved')}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
              <Link href="/dashboard">
                <LayoutDashboard className="mr-1 size-3" />
                {t('pause.button')}
              </Link>
            </Button>
          </div>
        </div>
      )}

      <CategoryProgress
        currentIndex={currentCategoryIndex}
        totalCategories={populatedCategories.length}
        categoryName={tAll(currentCategory.nameKey)}
        categoryIcon={currentCategory.icon}
        answeredCount={effectiveAnswered}
        totalQuestions={phaseTotal}
        bonusMessage={hasCompletedQuickCheck && phaseAnswered === 0 && assessmentPhase === 'core' && hasTieredAssessment ? t('progress.quickCheckBonus') : undefined}
      />

      <div key={`${currentCategory.id}-${assessmentPhase}`} className="step-transition">
        <CategoryStep
          key={`${currentCategory.id}-${assessmentPhase}`}
          categoryId={currentCategory.id}
          categoryTranslationPrefix={currentCategory.nameKey.replace('categories.', '').replace('.name', '')}
          isFirstCategory={isFirstCategory}
          isLastCategory={isLastCategory}
          locale={locale}
          regulation={regulation}
          tier={hasTieredAssessment ? assessmentPhase : undefined}
          onCorePhaseDone={() => setShowMilestone(true)}
          config={config}
        />
      </div>

      {/* Reset options */}
      {answers.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 border-t pt-6">
          {hasTieredAssessment && (
            <>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(
                    assessmentPhase === 'core'
                      ? t('reset.confirmPhase', { phase: t('phase.core') })
                      : t('reset.confirmPhase', { phase: t('phase.advanced') })
                  )) {
                    resetPhase();
                  }
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                {t('reset.phase')}
              </button>
              <span className="hidden sm:inline text-muted-foreground">|</span>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t('reset.confirmAll'))) {
                reset();
              }
            }}
            className="text-sm text-red-500 hover:text-red-700 transition-colors underline underline-offset-2"
          >
            {t('reset.all')}
          </button>
        </div>
      )}
    </div>
  );
}
