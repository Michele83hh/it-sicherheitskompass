import { useTranslations } from 'next-intl';
import { ExternalLink, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { CategoryScore, Recommendation, EffortLevel } from '@/lib/nis2/types';

interface SortedCategory {
  categoryScore: CategoryScore;
  categoryName: string;
  recommendations: Recommendation[];
}

interface RecommendationsSectionProps {
  sortedCategories: SortedCategory[];
}

export function RecommendationsSection({
  sortedCategories,
}: RecommendationsSectionProps) {
  const t = useTranslations('results');
  const tRec = useTranslations('recommendations');

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

  const BSI_KOMPENDIUM_URL =
    'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html';

  return (
    <section className="mb-12">
      <h2 className="mb-2 text-2xl font-bold">{t('recommendations.title')}</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {t('recommendations.subtitle')}
      </p>

      <div className="space-y-8">
        {sortedCategories.map((cat, idx) => {
          const config = trafficLightConfig[cat.categoryScore.trafficLight];
          const Icon = config.icon;

          return (
            <div key={cat.categoryScore.categoryId}>
              {/* Category header */}
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

              {/* Recommendations for this category */}
              <div className="ml-0 space-y-6 md:ml-14">
                {cat.recommendations.map((rec) => {
                  const titleKey = rec.titleKey.replace('recommendations.', '');
                  const descKey = rec.descriptionKey.replace(
                    'recommendations.',
                    ''
                  );
                  const firstStepKey = rec.firstStepKey.replace(
                    'recommendations.',
                    ''
                  );

                  return (
                    <div
                      key={rec.id}
                      className="rounded-lg border bg-card p-4 shadow-sm"
                    >
                      {/* Title */}
                      <h4 className="mb-2 font-semibold">{tRec(titleKey)}</h4>

                      {/* Description */}
                      <p className="mb-3 text-sm text-muted-foreground">
                        {tRec(descKey)}
                      </p>

                      {/* First step */}
                      <div className="mb-3">
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">
                          {t('recommendations.firstStep')}
                        </p>
                        <p className="text-sm">{tRec(firstStepKey)}</p>
                      </div>

                      {/* Effort level badge */}
                      <div className="mb-3">
                        <Badge className={effortLevelConfig[rec.effortLevel].className}>
                          {effortLevelConfig[rec.effortLevel].label}
                        </Badge>
                      </div>

                      {/* Legal reference */}
                      <p className="mb-2 text-xs text-muted-foreground">
                        <span className="font-semibold">
                          {t('recommendations.legalReference')}:
                        </span>{' '}
                        {rec.legalReference}
                      </p>

                      {/* BSI reference */}
                      <a
                        href={BSI_KOMPENDIUM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <span className="font-semibold">
                          {t('recommendations.bsiReference')}:
                        </span>{' '}
                        {rec.bsiReference}
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </a>
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
