'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Info } from 'lucide-react';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getQuestionsByCategory } from '@/lib/nis2/questions';
import { WizardNavigation } from '@/app/[locale]/check/components/navigation';
import type { Answer, MaturityLevel } from '@/lib/nis2/types';

interface CategoryStepProps {
  categoryId: string;
  isFirstCategory: boolean;
  isLastCategory: boolean;
  locale: string;
}

export function CategoryStep({
  categoryId,
  isFirstCategory,
  isLastCategory,
  locale,
}: CategoryStepProps) {
  const t = useTranslations(); // Root translator for question content
  const tGap = useTranslations('gapAnalysis');
  const router = useRouter();
  const questions = getQuestionsByCategory(categoryId);
  const { updateAnswers, nextCategory, prevCategory, getAnswersByCategory } =
    useGapAnalysisStore();

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
      router.push(`/${locale}/results`);
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

  return (
    <TooltipProvider>
    <form key={categoryId} onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <div className="space-y-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
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
                        className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50"
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
          submitLabel={tGap('navigation.showResults')}
        />
      </div>
    </form>
    </TooltipProvider>
  );
}
