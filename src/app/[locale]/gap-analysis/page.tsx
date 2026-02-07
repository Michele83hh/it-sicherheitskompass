'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getQuestionsByCategory, getTotalQuestionCount } from '@/lib/nis2/questions';
import { CategoryProgress } from './components/category-progress';
import { CategoryStep } from './steps/category-step';

export default function GapAnalysisPage() {
  const t = useTranslations('gapAnalysis');
  const tCategories = useTranslations('categories');
  const params = useParams();
  const locale = params?.locale as string;

  const currentCategoryIndex = useGapAnalysisStore(
    (state) => state.currentCategoryIndex
  );
  const answers = useGapAnalysisStore((state) => state.answers);

  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch from zustand persist
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Build populated categories
  const populatedCategories = CATEGORIES.map((cat) => ({
    ...cat,
    questions: getQuestionsByCategory(cat.id),
  }));

  const totalQuestions = getTotalQuestionCount();
  const answeredCount = answers.length;

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

  const currentCategory = populatedCategories[currentCategoryIndex];
  const isFirstCategory = currentCategoryIndex === 0;
  const isLastCategory = currentCategoryIndex === populatedCategories.length - 1;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>

      <CategoryProgress
        currentIndex={currentCategoryIndex}
        totalCategories={populatedCategories.length}
        categoryName={tCategories(currentCategory.nameKey.replace('categories.', ''))}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />

      <div key={currentCategory.id} className="step-transition">
        <CategoryStep
          key={currentCategory.id}
          categoryId={currentCategory.id}
          isFirstCategory={isFirstCategory}
          isLastCategory={isLastCategory}
          locale={locale}
        />
      </div>
    </div>
  );
}
