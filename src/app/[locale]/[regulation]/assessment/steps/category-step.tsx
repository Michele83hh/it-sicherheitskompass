'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Info, Lightbulb, HelpCircle, ChevronDown } from 'lucide-react';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getCoreQuestionsByCategory, getAdvancedQuestionsByCategory } from '@/lib/nis2/questions';
import { WizardNavigation } from '@/app/[locale]/check/components/navigation';
import type { Answer, MaturityLevel } from '@/lib/nis2/types';

interface CategoryStepProps {
  categoryId: string;
  categoryTranslationPrefix: string;
  isFirstCategory: boolean;
  isLastCategory: boolean;
  locale: string;
  tier: 'core' | 'advanced';
  onCorePhaseDone: () => void;
}

export function CategoryStep({
  categoryId,
  categoryTranslationPrefix,
  isFirstCategory,
  isLastCategory,
  locale,
  tier,
  onCorePhaseDone,
}: CategoryStepProps) {
  const t = useTranslations(); // Root translator for question content
  const tGap = useTranslations('gapAnalysis');
  const tCategories = useTranslations('categories');
  const router = useRouter();
  const questions = tier === 'core'
    ? getCoreQuestionsByCategory(categoryId)
    : getAdvancedQuestionsByCategory(categoryId);
  const { updateAnswers, nextCategory, prevCategory, getAnswersByCategory } =
    useGapAnalysisStore();

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
        // Advanced phase done → show completion animation, then results
        setShowCompletion(true);
        setTimeout(() => {
          router.push(`/${locale}/results`);
        }, 2000);
      }
    } else {
      nextCategory();
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

  // Get the empoweringIntro key (e.g., "riskAnalysis.empoweringIntro")
  const empoweringIntroKey = `${categoryTranslationPrefix}.empoweringIntro`;

  return (
    <TooltipProvider>
    <form key={categoryId} onSubmit={handleSubmit(onSubmit)} className="mt-8">
      {/* Phase-dependent intro box */}
      {tier === 'core' ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <Lightbulb className="size-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-blue-800">{tCategories(empoweringIntroKey)}</p>
        </div>
      ) : (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <Lightbulb className="size-5 text-purple-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-purple-800">{tGap('phase.advancedIntro')}</p>
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
          submitLabel={tier === 'core' ? tGap('navigation.coreComplete') : tGap('navigation.showResults')}
        />
      </div>
    </form>
    </TooltipProvider>
  );
}
