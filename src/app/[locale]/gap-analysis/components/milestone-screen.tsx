'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getCoreQuestionsByCategory } from '@/lib/nis2/questions';
import { calculateOverallScore, getTrafficLight } from '@/lib/scoring/engine';

export function MilestoneScreen() {
  const t = useTranslations('gapAnalysis.milestone');
  const params = useParams();
  const locale = params?.locale as string;
  const router = useRouter();
  const { answers, setAssessmentPhase, setCategoryIndex } = useGapAnalysisStore();

  // Calculate score from core answers only
  const categoryQuestionCounts = CATEGORIES.map((cat) => ({
    categoryId: cat.id,
    totalQuestions: getCoreQuestionsByCategory(cat.id).length,
  }));

  const overallScore = calculateOverallScore(answers, categoryQuestionCounts);
  const trafficLight = getTrafficLight(overallScore.percentage);

  const trafficLightColors = {
    red: 'text-red-600 bg-red-100 border-red-200',
    yellow: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    green: 'text-green-600 bg-green-100 border-green-200',
  };

  const trafficLightLabels = {
    red: t('trafficLight.red'),
    yellow: t('trafficLight.yellow'),
    green: t('trafficLight.green'),
  };

  const handleViewResults = () => {
    router.push(`/${locale}/results`);
  };

  const handleDeepen = () => {
    setAssessmentPhase('advanced');
    setCategoryIndex(0);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center animate-fade-in">
      {/* Success icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      {/* Title */}
      <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
        {t('title')}
      </h2>

      {/* Subtitle */}
      <p className="mb-8 text-muted-foreground">
        {t('subtitle')}
      </p>

      {/* Score preview */}
      <div className="mb-8 inline-flex flex-col items-center rounded-2xl border bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          {t('scoreLabel')}
        </p>

        {/* Score circle */}
        <div className="relative mb-4">
          <svg className="h-32 w-32" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="52"
              fill="none" stroke="#e5e7eb" strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke={trafficLight === 'green' ? '#16a34a' : trafficLight === 'yellow' ? '#ca8a04' : '#dc2626'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(overallScore.percentage / 100) * 326.7} 326.7`}
              transform="rotate(-90 60 60)"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground">
              {Math.round(overallScore.percentage)}%
            </span>
          </div>
        </div>

        {/* Traffic light badge */}
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${trafficLightColors[trafficLight]}`}>
          {trafficLightLabels[trafficLight]}
        </span>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <button
          onClick={handleViewResults}
          className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors sm:w-auto sm:min-w-[320px]"
        >
          {t('reportButton')}
        </button>

        <div>
          <button
            onClick={handleDeepen}
            className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-foreground shadow-sm hover:bg-gray-50 transition-colors sm:w-auto sm:min-w-[320px]"
          >
            {t('deepenButton')}
          </button>
        </div>
      </div>

      {/* Later note */}
      <p className="mt-4 text-sm text-muted-foreground">
        {t('laterNote')}
      </p>
    </div>
  );
}
