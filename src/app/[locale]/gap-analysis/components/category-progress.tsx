'use client';

import { useTranslations } from 'next-intl';
import {
  Shield,
  AlertTriangle,
  ServerCrash,
  Link2,
  Code,
  ClipboardCheck,
  GraduationCap,
  Lock,
  UserCheck,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  AlertTriangle,
  ServerCrash,
  Link2,
  Code,
  ClipboardCheck,
  GraduationCap,
  Lock,
  UserCheck,
  KeyRound,
};

interface CategoryProgressProps {
  currentIndex: number;
  totalCategories: number;
  categoryName: string;
  categoryIcon?: string;
  answeredCount: number;
  totalQuestions: number;
  bonusMessage?: string;
}

export function CategoryProgress({
  currentIndex,
  totalCategories,
  categoryName,
  categoryIcon,
  answeredCount,
  totalQuestions,
  bonusMessage,
}: CategoryProgressProps) {
  const t = useTranslations('gapAnalysis.progress');

  const percentage =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const remainingQuestions = totalQuestions - answeredCount;
  const estimatedMinutes = Math.ceil((remainingQuestions * 20) / 60);

  // Completion hints
  let completionHint: string | null = null;
  if (percentage >= 90) {
    completionHint = t('completionHint.almostDone');
  } else if (percentage >= 80) {
    completionHint = t('completionHint.nearlyFinished');
  } else if (percentage >= 60) {
    completionHint = t('completionHint.overHalfway');
  }

  const IconComponent = categoryIcon ? ICON_MAP[categoryIcon] : null;

  return (
    <nav aria-label="Progress" className="mb-8">
      {/* Category counter */}
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground">
          {t('category', { current: currentIndex + 1, total: totalCategories })}
        </p>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground" aria-current="step">
          {IconComponent && <IconComponent className="size-6 text-primary flex-shrink-0" aria-hidden="true" />}
          {categoryName}
        </h2>
      </div>

      {/* Progress bar */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{t('overall')}</p>
          <div className="flex items-center gap-3">
            {remainingQuestions > 0 && (
              <p className="text-xs text-muted-foreground">
                {t('timeRemaining', { minutes: estimatedMinutes })}
              </p>
            )}
            <p className="text-sm font-medium text-foreground">
              {t('percentage', { value: percentage })}
            </p>
          </div>
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

      {/* Bonus message (Endowed Progress from Schnellcheck) */}
      {bonusMessage && (
        <p className="mt-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-1.5">
          {bonusMessage}
        </p>
      )}

      {/* Completion hint */}
      {completionHint && (
        <p className="mt-2 text-sm font-medium text-blue-700">
          {completionHint}
        </p>
      )}
    </nav>
  );
}
