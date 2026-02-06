'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getQuestionsByCategory } from '@/lib/nis2/questions';
import { getRecommendationsByCategory } from '@/lib/nis2/recommendations';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { DisclaimerBanner } from './components/disclaimer-banner';
import { OverallScoreHero } from './components/overall-score-hero';
import { CategoryCard } from './components/category-card';
import { QuickWinsSection } from './components/quick-wins-section';
import { RecommendationsSection } from './components/recommendations-section';
import { Button } from '@/components/ui/button';
import DownloadPdfButton from './components/download-pdf-button';
import type { CategoryScore, TrafficLight, Recommendation } from '@/lib/nis2/types';

export default function ResultsPage() {
  const t = useTranslations('results');
  const tCategories = useTranslations('categories');
  const tRec = useTranslations('recommendations');
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string;

  const [isClient, setIsClient] = useState(false);

  // Zustand store access
  const answers = useGapAnalysisStore((state) => state.answers);
  const reset = useGapAnalysisStore((state) => state.reset);

  // Hydration guard
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate scores with useMemo
  const overallScore = useMemo(() => {
    const categoryQuestionCounts = CATEGORIES.map((cat) => ({
      categoryId: cat.id,
      totalQuestions: getQuestionsByCategory(cat.id).length,
    }));
    return calculateOverallScore(answers, categoryQuestionCounts);
  }, [answers]);

  // Sort categories by traffic light (red -> yellow -> green)
  const sortedCategories = useMemo(() => {
    const trafficLightOrder: Record<TrafficLight, number> = {
      red: 0,
      yellow: 1,
      green: 2,
    };

    return overallScore.categoryScores
      .map((catScore) => {
        const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!;
        const recommendations = getRecommendationsByCategory(catScore.categoryId);
        return { categoryScore: catScore, category, recommendations };
      })
      .sort(
        (a, b) =>
          trafficLightOrder[a.categoryScore.trafficLight] -
          trafficLightOrder[b.categoryScore.trafficLight]
      );
  }, [overallScore]);

  // Derive quick wins: red categories with quick effort level, then yellow if needed
  const quickWins = useMemo(() => {
    const redQuickWins = sortedCategories
      .filter((cat) => cat.categoryScore.trafficLight === 'red')
      .flatMap((cat) =>
        cat.recommendations
          .filter((rec) => rec.effortLevel === 'quick')
          .map((rec) => ({
            recommendation: rec,
            categoryName: tCategories(
              cat.category.nameKey.replace('categories.', '')
            ),
            categoryTrafficLight: cat.categoryScore.trafficLight,
          }))
      );

    // If fewer than 3, add yellow quick wins
    if (redQuickWins.length < 3) {
      const yellowQuickWins = sortedCategories
        .filter((cat) => cat.categoryScore.trafficLight === 'yellow')
        .flatMap((cat) =>
          cat.recommendations
            .filter((rec) => rec.effortLevel === 'quick')
            .map((rec) => ({
              recommendation: rec,
              categoryName: tCategories(
                cat.category.nameKey.replace('categories.', '')
              ),
              categoryTrafficLight: cat.categoryScore.trafficLight,
            }))
        );
      return [...redQuickWins, ...yellowQuickWins].slice(0, 5);
    }

    return redQuickWins.slice(0, 5);
  }, [sortedCategories, tCategories]);

  // Route guard (client-side only)
  useEffect(() => {
    if (isClient && answers.length < 30) {
      router.push(`/${locale}/gap-analysis`);
    }
  }, [isClient, answers.length, locale, router]);

  if (!isClient) {
    // Server skeleton
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
    router.push(`/${locale}/gap-analysis`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">{t('subtitle')}</p>

      {/* Disclaimer banner */}
      <DisclaimerBanner />

      {/* Overall score hero */}
      <OverallScoreHero overallScore={overallScore} />

      {/* Category cards grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCategories.map(({ categoryScore, category, recommendations }) => {
          const categoryName = tCategories(
            category.nameKey.replace('categories.', '')
          );
          const categoryShortName = tCategories(
            category.shortNameKey.replace('categories.', '')
          );

          // Get top recommendation (priority high first, then medium, then low)
          const topRec = recommendations.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })[0];

          const topRecommendation = topRec
            ? {
                title: tRec(topRec.titleKey.replace('recommendations.', '')),
                firstStep: tRec(
                  topRec.firstStepKey.replace('recommendations.', '')
                ),
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
              euArticle={category.euArticle}
              bsigParagraph={category.bsigParagraph}
              verdict={verdict}
              topRecommendation={topRecommendation}
            />
          );
        })}
      </div>

      {/* Quick wins section */}
      {quickWins.length > 0 && <QuickWinsSection quickWins={quickWins} />}

      {/* Full recommendations section */}
      <RecommendationsSection
        sortedCategories={sortedCategories.map((cat) => ({
          categoryScore: cat.categoryScore,
          categoryName: tCategories(
            cat.category.nameKey.replace('categories.', '')
          ),
          recommendations: cat.recommendations,
        }))}
      />

      {/* Action buttons */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Button variant="outline" onClick={handleRetake}>
          {t('actions.retake')}
        </Button>
        <DownloadPdfButton overallScore={overallScore} />
      </div>
    </div>
  );
}
