import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getAlsoCoveredBy, REGULATION_LABELS } from '@/lib/regulations/recommendation-mappings';
import type { CategoryScore, BaseRecommendation, EffortLevel, RegulationId } from '@/lib/regulations/types';

type Recommendation = BaseRecommendation & { bsiReference?: string };

interface SortedCategory {
  categoryScore: CategoryScore;
  categoryName: string;
  recommendations: Recommendation[];
}

interface RecommendationsSectionProps {
  sortedCategories: SortedCategory[];
  compact?: boolean;
}

export function RecommendationsSection({
  sortedCategories,
  compact = false,
}: RecommendationsSectionProps) {
  const t = useTranslations('results');
  const tCross = useTranslations('crossReg');
  const tAll = useTranslations();
  const params = useParams();
  const regulation = params?.regulation as string;

  const trafficLightConfig = {
    red: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
    },
    yellow: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    green: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-800 border-green-200',
    },
  };

  const effortLevelConfig: Record<
    EffortLevel,
    { label: string; className: string }
  > = {
    quick: {
      label: t('effortLevel.quick'),
      className: 'bg-green-100 text-green-800 border-green-200',
    },
    medium: {
      label: t('effortLevel.medium'),
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    strategic: {
      label: t('effortLevel.strategic'),
      className: 'bg-blue-100 text-blue-800 border-blue-200',
    },
  };

  return (
    <section className={compact ? '' : 'mb-12'}>
      {!compact && (
        <>
          <h2 className="mb-2 text-2xl font-bold">{t('recommendations.title')}</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {t('recommendations.subtitle')}
          </p>
        </>
      )}

      <div className={compact ? 'space-y-4' : 'space-y-8'}>
        {sortedCategories.map((cat, idx) => {
          const config = trafficLightConfig[cat.categoryScore.trafficLight];
          const Icon = config.icon;

          return (
            <div key={cat.categoryScore.categoryId}>
              {/* Category header — hidden in compact mode (accordion provides it) */}
              {!compact && (
                <div className="mb-4 flex items-center gap-3">
                  <div className={`rounded-full p-2 ${config.bgColor}`}>
                    <Icon className={`size-5 ${config.textColor}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{cat.categoryName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge className={config.badgeColor}>
                        {cat.categoryScore.percentage}%
                      </Badge>
                      <span>
                        {cat.categoryScore.answeredQuestions}/
                        {cat.categoryScore.totalQuestions} Fragen
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations for this category */}
              <div className={compact ? 'space-y-4' : 'ml-0 space-y-6 md:ml-14'}>
                {cat.recommendations.map((rec) => {
                  // Cross-regulation badges
                  const alsoCoveredBy = getAlsoCoveredBy(rec.id, regulation as RegulationId);

                  return (
                    <div
                      key={rec.id}
                      className="rounded-lg border bg-card p-4 shadow-sm"
                    >
                      {/* Title */}
                      <h4 className="mb-2 font-semibold">{tAll(rec.titleKey)}</h4>

                      {/* Description */}
                      <p className="mb-3 text-sm text-muted-foreground">
                        {tAll(rec.descriptionKey)}
                      </p>

                      {/* First step */}
                      <div className="mb-3">
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">
                          {t('recommendations.firstStep')}
                        </p>
                        <p className="text-sm">{tAll(rec.firstStepKey)}</p>
                      </div>

                      {/* Effort level badge + Cross-reg badges */}
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge className={effortLevelConfig[rec.effortLevel].className}>
                          {effortLevelConfig[rec.effortLevel].label}
                        </Badge>

                        {alsoCoveredBy.length > 0 && (
                          <>
                            <span className="text-xs text-muted-foreground">{tCross('alsoCoveredBy')}:</span>
                            {alsoCoveredBy.map((regId) => (
                              <Badge
                                key={regId}
                                className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] px-1.5 py-0"
                              >
                                {REGULATION_LABELS[regId]}
                              </Badge>
                            ))}
                          </>
                        )}
                      </div>

                      {/* Legal reference */}
                      <p className="mb-2 text-xs text-muted-foreground">
                        <span className="font-semibold">
                          {t('recommendations.legalReference')}:
                        </span>{' '}
                        {rec.legalReference}
                      </p>

                      {/* BSI reference (when available) */}
                      {rec.bsiReference && (
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">
                            {t('recommendations.bsiReference')}:
                          </span>{' '}
                          {rec.bsiReference}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Separator between categories (except last) */}
              {idx < sortedCategories.length - 1 && (
                <Separator className="mt-8" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
