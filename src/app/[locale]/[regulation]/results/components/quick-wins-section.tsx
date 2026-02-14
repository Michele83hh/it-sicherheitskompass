import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAlsoCoveredBy, REGULATION_LABELS } from '@/lib/regulations/recommendation-mappings';
import type { BaseRecommendation, TrafficLight, RegulationId } from '@/lib/regulations/types';
import { tlBadgeStrong } from '@/lib/ui/traffic-light-styles';

type Recommendation = BaseRecommendation & { bsiReference?: string };

interface QuickWin {
  recommendation: Recommendation;
  categoryName: string;
  categoryTrafficLight: TrafficLight;
}

interface QuickWinsSectionProps {
  quickWins: QuickWin[];
}

export function QuickWinsSection({ quickWins }: QuickWinsSectionProps) {
  const t = useTranslations('results');
  const tCross = useTranslations('crossReg');
  const tAll = useTranslations();
  const params = useParams();
  const regulation = params?.regulation as string;

  // Traffic light colors now via centralized utility

  return (
    <section className="mb-12">
      <h2 className="mb-2 text-2xl font-bold">{t('quickWins.title')}</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {t('quickWins.subtitle')}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {quickWins.map((qw) => {
          const titleKey = qw.recommendation.titleKey;
          const firstStepKey = qw.recommendation.firstStepKey;
          const alsoCoveredBy = getAlsoCoveredBy(qw.recommendation.id, regulation as RegulationId);

          return (
            <Card key={qw.recommendation.id}>
              <CardHeader>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    className={tlBadgeStrong(qw.categoryTrafficLight)}
                  >
                    {qw.categoryName}
                  </Badge>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    {t('effortLevel.quick')}
                  </Badge>
                  {alsoCoveredBy.length > 0 && (
                    <>
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
                <CardTitle className="text-base">{tAll(titleKey)}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* First step */}
                <div>
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">
                    {t('quickWins.firstStep')}
                  </p>
                  <p className="text-sm">{tAll(firstStepKey)}</p>
                </div>

                {/* Cross-reg coverage text */}
                {alsoCoveredBy.length > 0 && (
                  <p className="text-xs text-indigo-600">
                    {tCross('alsoCoveredBy')}: {alsoCoveredBy.map(id => REGULATION_LABELS[id]).join(', ')}
                  </p>
                )}

                {/* Legal reference */}
                <p className="text-xs text-muted-foreground">
                  {qw.recommendation.legalReference}
                </p>

                {/* BSI reference (NIS2 only) */}
                {qw.recommendation.bsiReference && (
                  <span className="text-xs text-muted-foreground">
                    BSI {qw.recommendation.bsiReference}
                  </span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
