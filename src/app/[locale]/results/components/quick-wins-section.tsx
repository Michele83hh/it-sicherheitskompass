import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Recommendation, TrafficLight } from '@/lib/nis2/types';

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
  const tRec = useTranslations('recommendations');

  const trafficLightColors = {
    red: 'bg-red-100 text-red-800 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    green: 'bg-green-100 text-green-800 border-green-200',
  };

  const BSI_KOMPENDIUM_URL =
    'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html';

  return (
    <section className="mb-12">
      <h2 className="mb-2 text-2xl font-bold">{t('quickWins.title')}</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {t('quickWins.subtitle')}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {quickWins.map((qw) => {
          const titleKey = qw.recommendation.titleKey.replace(
            'recommendations.',
            ''
          );
          const firstStepKey = qw.recommendation.firstStepKey.replace(
            'recommendations.',
            ''
          );

          return (
            <Card key={qw.recommendation.id}>
              <CardHeader>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    className={trafficLightColors[qw.categoryTrafficLight]}
                  >
                    {qw.categoryName}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {t('effortLevel.quick')}
                  </Badge>
                </div>
                <CardTitle className="text-base">{tRec(titleKey)}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* First step */}
                <div>
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">
                    {t('quickWins.firstStep')}
                  </p>
                  <p className="text-sm">{tRec(firstStepKey)}</p>
                </div>

                {/* Legal reference */}
                <p className="text-xs text-muted-foreground">
                  {qw.recommendation.legalReference}
                </p>

                {/* BSI reference */}
                <a
                  href={BSI_KOMPENDIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  BSI {qw.recommendation.bsiReference}
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
