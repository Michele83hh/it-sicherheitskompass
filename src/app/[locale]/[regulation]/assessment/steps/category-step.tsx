'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Info, Lightbulb, HelpCircle, ChevronDown } from 'lucide-react';
import { useRegulationStores } from '@/hooks/useRegulationStores';
import { getQuestionsByCategory } from '@/hooks/useRegulationConfig';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { WizardNavigation } from '@/app/[locale]/[regulation]/check/components/navigation';
import type { Answer, MaturityLevel, RegulationConfig } from '@/lib/regulations/types';

interface CategoryStepProps {
  categoryId: string;
  categoryTranslationPrefix: string;
  isFirstCategory: boolean;
  isLastCategory: boolean;
  locale: string;
  regulation: string;
  tier?: 'core' | 'advanced';
  onCorePhaseDone: () => void;
  config: RegulationConfig;
}

export function CategoryStep({
  categoryId,
  categoryTranslationPrefix,
  isFirstCategory,
  isLastCategory,
  locale,
  regulation,
  tier,
  onCorePhaseDone,
  config,
}: CategoryStepProps) {
  const t = useTranslations(); // Root translator for question content
  const tGap = useTranslations('gapAnalysis');
  const tAll = useTranslations();
  const router = useRouter();

  const questions = tier
    ? getQuestionsByCategory(config, categoryId, tier)
    : getQuestionsByCategory(config, categoryId);

  const { assessmentStore, quickCheckStore } = useRegulationStores(regulation);
  const updateAnswers = assessmentStore((state) => state.updateAnswers);
  const nextCategory = assessmentStore((state) => state.nextCategory);
  const prevCategory = assessmentStore((state) => state.prevCategory);
  const getAnswersByCategory = assessmentStore((state) => state.getAnswersByCategory);

  // Quick check hint: find the Schnellcheck answer for this category
  const quickCheckAnswers = quickCheckStore((state) => state.answers);
  const quickCheckCompleted = quickCheckStore((state) => state.completed);
  const quickCheckQuestions = config.quickCheckQuestions || [];
  const quickCheckQuestionForCategory = quickCheckQuestions.find(
    (q) => q.categoryId === categoryId
  );
  const quickCheckAnswer = quickCheckQuestionForCategory
    ? quickCheckAnswers.find((a) => a.questionId === quickCheckQuestionForCategory.id)
    : undefined;

  const maxCategoryIndex = config.categories.length - 1;

  const [showCompletion, setShowCompletion] = useState(false);
  const existingAnswers = getAnswersByCategory(categoryId);

  // Zod schema - all fields REQUIRED
  const schemaShape = Object.fromEntries(
    questions.map((q) => [q.id, z.coerce.number().min(0).max(3)])
  ) as Record<string, z.ZodNumber>;

  const schema = z.object(schemaShape);

  type FormData = z.infer<typeof schema>;

  // defaultValues - only set for previously-answered questions
  const defaultValues = questions.reduce((acc, q) => {
    const existing = existingAnswers.find((a) => a.questionId === q.id);
    return existing ? { ...acc, [q.id]: existing.level } : acc;
  }, {} as Record<string, number>);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    // Convert form data to Answer[]
    const categoryAnswers: Answer[] = Object.entries(data).map(
      ([questionId, level]) => ({
        questionId,
        categoryId,
        level: Number(level) as MaturityLevel,
      })
    );

    updateAnswers(categoryAnswers);

    if (isLastCategory) {
      if (tier === 'core') {
        // Core phase done → show milestone screen
        onCorePhaseDone();
      } else {
        // Advanced phase done OR non-tiered done → show completion animation, then results
        setShowCompletion(true);
        setTimeout(() => {
          router.push(`/${locale}/${regulation}/results`);
        }, 2000);
      }
    } else {
      nextCategory(maxCategoryIndex);
    }
  };

  const handleBack = () => {
    // Save current form values (even if incomplete) before going back
    const currentValues = getValues();
    const partialAnswers: Answer[] = Object.entries(currentValues)
      .filter(([_, value]) => value !== undefined)
      .map(([questionId, level]) => ({
        questionId,
        categoryId,
        level: Number(level) as MaturityLevel,
      }));

    if (partialAnswers.length > 0) {
      updateAnswers(partialAnswers);
    }

    prevCategory();
  };

  // Completion animation overlay
  if (showCompletion) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 animate-completion-overlay">
        <div className="text-center animate-completion-content">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600 animate-checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">{tGap('completion.title')}</h2>
          <p className="mt-2 text-muted-foreground">{tGap('completion.subtitle')}</p>
        </div>
      </div>
    );
  }

  // Get the empoweringIntro key from the category's nameKey
  const category = config.categories.find((c) => c.id === categoryId);
  const empoweringIntroKey = category
    ? category.nameKey.replace('.name', '.empoweringIntro')
    : `${categoryTranslationPrefix}.empoweringIntro`;

  const hasTieredAssessment = config.features.hasTieredAssessment;

  return (
    <TooltipProvider>
    <form key={categoryId} onSubmit={handleSubmit(onSubmit)} className="mt-8">
      {/* Quick check hint badge */}
      {quickCheckCompleted && quickCheckAnswer && (
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              quickCheckAnswer.value === 'yes'
                ? 'bg-green-100 text-green-700'
                : quickCheckAnswer.value === 'partial'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
            }`}
          >
            <span
              className={`inline-block size-1.5 rounded-full ${
                quickCheckAnswer.value === 'yes'
                  ? 'bg-green-500'
                  : quickCheckAnswer.value === 'partial'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              aria-hidden="true"
            />
            {tGap(`quickCheckHint.${quickCheckAnswer.value}`)}
          </span>
        </div>
      )}

      {/* Phase-dependent intro box */}
      {hasTieredAssessment && tier === 'core' ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <Lightbulb className="size-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-blue-800">{tAll(empoweringIntroKey)}</p>
        </div>
      ) : hasTieredAssessment && tier === 'advanced' ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <Lightbulb className="size-5 text-purple-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-purple-800">{tGap('phase.advancedIntro')}</p>
        </div>
      ) : (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <Lightbulb className="size-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-blue-800">{tAll(empoweringIntroKey)}</p>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm"
          >
            {/* Question title with tooltip */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                {t(question.titleKey)}
              </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={tGap('question.tooltip')}
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p className="text-sm">{t(question.tooltipKey)}</p>
                  </TooltipContent>
                </Tooltip>
            </div>

            {/* Collapsible help section */}
            <details className="mb-4 group">
              <summary className="flex cursor-pointer items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                <HelpCircle className="size-4 flex-shrink-0" />
                <span>{tGap('question.helpToggle')}</span>
                <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 rounded-md border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm text-foreground leading-relaxed">
                {t(question.helpKey)}
              </div>
            </details>

            {/* Legal reference hint */}
            {question.legalReference && (
              <p className="mb-3 text-xs text-muted-foreground">
                {question.legalReference.primary}
                {question.legalReference.national ? ` · ${question.legalReference.national}` : ''}
              </p>
            )}

            {/* Maturity selection label */}
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              {tGap('question.selectMaturity')}
            </p>

            {/* Radio options */}
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value !== undefined ? String(field.value) : ''}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  {[0, 1, 2, 3].map((level) => {
                    const levelKey = `level${level}Key` as keyof typeof question.maturityDescriptions;
                    const description = t(
                      question.maturityDescriptions[levelKey]
                    );
                    return (
                      <label
                        key={level}
                        htmlFor={`${question.id}-${level}`}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 sm:p-4 transition-colors hover:bg-gray-50"
                      >
                        <RadioGroupItem value={String(level)} id={`${question.id}-${level}`} />
                        <span className="flex-1 text-sm leading-relaxed">
                          {description}
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
              )}
            />

            {/* Validation error */}
            {errors[question.id] && (
              <p className="mt-2 text-sm text-red-600">
                {tGap('validation.required')}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <WizardNavigation
          onBack={!isFirstCategory ? handleBack : undefined}
          isFirstStep={isFirstCategory}
          isLastStep={isLastCategory}
          backLabel={tGap('navigation.back')}
          nextLabel={tGap('navigation.next')}
          submitLabel={
            hasTieredAssessment && tier === 'core'
              ? tGap('navigation.coreComplete')
              : tGap('navigation.showResults')
          }
        />
      </div>
    </form>
    </TooltipProvider>
  );
}
