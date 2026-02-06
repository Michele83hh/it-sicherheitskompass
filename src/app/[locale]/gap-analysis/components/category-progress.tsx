'use client';

import { useTranslations } from 'next-intl';

interface CategoryProgressProps {
  currentIndex: number;
  totalCategories: number;
  categoryName: string;
  answeredCount: number;
  totalQuestions: number;
}

export function CategoryProgress({
  currentIndex,
  totalCategories,
  categoryName,
  answeredCount,
  totalQuestions,
}: CategoryProgressProps) {
  const t = useTranslations('gapAnalysis.progress');

  const percentage =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <nav aria-label="Progress" className="mb-8">
      {/* Category counter */}
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground">
          {t('category', { current: currentIndex + 1, total: totalCategories })}
        </p>
        <h2 className="text-2xl font-bold text-foreground" aria-current="step">
          {categoryName}
        </h2>
      </div>

      {/* Progress bar */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{t('overall')}</p>
          <p className="text-sm font-medium text-foreground">
            {t('percentage', { value: percentage })}
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('overall')}
          className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
        >
          <div
            className="h-full bg-blue-700 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="sr-only">
          {t('detail', { answered: answeredCount, total: totalQuestions })}
        </span>
      </div>
    </nav>
  );
}
