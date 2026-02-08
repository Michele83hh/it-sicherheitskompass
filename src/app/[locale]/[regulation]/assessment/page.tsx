'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Save, ClipboardList, BarChart3, FileText, ArrowRight, Clock, Shield, Lock, CheckCircle2, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getCoreQuestionsByCategory, getAdvancedQuestionsByCategory, getCoreQuestionCount, getTotalQuestionCount } from '@/lib/nis2/questions';
import { CategoryProgress } from './components/category-progress';
import { CategoryStep } from './steps/category-step';
import { MilestoneScreen } from './components/milestone-screen';

export default function GapAnalysisPage() {
  const t = useTranslations('gapAnalysis');
  const tCategories = useTranslations('categories');
  const params = useParams();
  const locale = params?.locale as string;

  const currentCategoryIndex = useGapAnalysisStore(
    (state) => state.currentCategoryIndex
  );
  const answers = useGapAnalysisStore((state) => state.answers);
  const hasCompletedQuickCheck = useGapAnalysisStore(
    (state) => state.hasCompletedQuickCheck
  );
  const assessmentPhase = useGapAnalysisStore(
    (state) => state.assessmentPhase
  );
  const resetPhase = useGapAnalysisStore((state) => state.resetPhase);
  const reset = useGapAnalysisStore((state) => state.reset);

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

  // Build populated categories based on current phase
  const populatedCategories = CATEGORIES.map((cat) => ({
    ...cat,
    questions: assessmentPhase === 'core'
      ? getCoreQuestionsByCategory(cat.id)
      : getAdvancedQuestionsByCategory(cat.id),
  }));

  // Phase-dependent progress calculation
  const coreTotal = getCoreQuestionCount();
  const fullTotal = getTotalQuestionCount();

  // Count answers per tier
  const coreAnsweredCount = answers.filter((a) => {
    // Core questions have IDs ending in -q1, -q2, -q3
    const qNum = a.questionId.split('-q')[1];
    return qNum && parseInt(qNum) <= 3;
  }).length;

  const totalAnsweredCount = answers.length;

  // In core phase: progress out of 30; in advanced: progress out of 50 (30 core already done)
  const phaseTotal = assessmentPhase === 'core' ? coreTotal : fullTotal;
  const phaseAnswered = assessmentPhase === 'core' ? coreAnsweredCount : totalAnsweredCount;

  // Endowed Progress: add ~15% bonus if user came from Schnellcheck (only in core phase with 0 answers)
  const bonusQuestions = hasCompletedQuickCheck && assessmentPhase === 'core'
    ? Math.round(coreTotal * 0.15)
    : 0;
  const effectiveAnswered = Math.min(phaseAnswered + bonusQuestions, phaseTotal);

  if (!isClient) {
    // Server skeleton with same structure to minimize layout shift
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>
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
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ClipboardList className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('intro.title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('intro.subtitle')}
          </p>
        </div>

        {/* Timeline: Visual flow */}
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
                <p className="text-xs text-muted-foreground mt-1">{t('intro.timeline.core.desc')}</p>
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
                <p className="text-xs text-muted-foreground">{t('intro.features.scores.desc')}</p>
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
                <p className="text-sm font-medium">{t('intro.features.recs.title')}</p>
                <p className="text-xs text-muted-foreground">{t('intro.features.recs.desc')}</p>
              </div>
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
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => setShowIntro(false)}>
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
    );
  }

  const currentCategory = populatedCategories[currentCategoryIndex];
  const isFirstCategory = currentCategoryIndex === 0;
  const isLastCategory = currentCategoryIndex === populatedCategories.length - 1;

  // Show milestone screen after core phase completion
  if (showMilestone) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <MilestoneScreen />
      </div>
    );
  }

  // Phase label for subtitle
  const phaseLabel = assessmentPhase === 'core'
    ? t('phase.core')
    : t('phase.advanced');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mb-4 text-center text-muted-foreground">{t('subtitle')}</p>

      {/* Phase indicator — prominent banner in advanced phase */}
      {assessmentPhase === 'advanced' ? (
        <div className="mb-6 rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-purple-800">
            {t('phase.advanced')} — {t('phase.advancedSubtitle')}
          </p>
        </div>
      ) : (
        <p className="mb-6 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {phaseLabel} — {coreTotal} {t('phase.questionsLabel')}
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

      <CategoryProgress
        currentIndex={currentCategoryIndex}
        totalCategories={populatedCategories.length}
        categoryName={tCategories(currentCategory.nameKey.replace('categories.', ''))}
        categoryIcon={currentCategory.icon}
        answeredCount={effectiveAnswered}
        totalQuestions={phaseTotal}
        bonusMessage={hasCompletedQuickCheck && phaseAnswered === 0 && assessmentPhase === 'core' ? t('progress.quickCheckBonus') : undefined}
      />

      <div key={`${currentCategory.id}-${assessmentPhase}`} className="step-transition">
        <CategoryStep
          key={`${currentCategory.id}-${assessmentPhase}`}
          categoryId={currentCategory.id}
          categoryTranslationPrefix={currentCategory.nameKey.replace('categories.', '').replace('.name', '')}
          isFirstCategory={isFirstCategory}
          isLastCategory={isLastCategory}
          locale={locale}
          tier={assessmentPhase}
          onCorePhaseDone={() => setShowMilestone(true)}
        />
      </div>

      {/* Reset options */}
      {answers.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 border-t pt-6">
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
