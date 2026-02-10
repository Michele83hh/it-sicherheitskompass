'use client';

import { useTranslations } from 'next-intl';
import { Map, Zap, Settings, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateRoadmap } from '@/lib/regulations/nis2/roadmap';
import type { CategoryScore, BaseRecommendation } from '@/lib/regulations/types';

interface RoadmapSectionProps {
  categoryScores: CategoryScore[];
  recommendations: BaseRecommendation[];
}

export function RoadmapSection({ categoryScores, recommendations }: RoadmapSectionProps) {
  const t = useTranslations('roadmap');
  const tAll = useTranslations();

  const phases = generateRoadmap(categoryScores, recommendations);

  const phaseConfig = [
    { icon: Zap, color: 'border-l-green-500', bgColor: 'bg-green-100', textColor: 'text-green-600', key: 'phase1' },
    { icon: Settings, color: 'border-l-yellow-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', key: 'phase2' },
    { icon: Target, color: 'border-l-blue-500', bgColor: 'bg-blue-100', textColor: 'text-blue-600', key: 'phase3' },
  ];

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Map className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      <div className="space-y-6">
        {phases.map((phase, index) => {
          const config = phaseConfig[index];
          const Icon = config.icon;
          return (
            <Card key={config.key} className={`border-l-4 ${config.color}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${config.bgColor}`}>
                    <Icon className={`size-5 ${config.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t(`${config.key}.title`)}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t(`${config.key}.description`)}</p>
                  </div>
                  <Badge variant="outline">{phase.items.length} {t('totalItems')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {phase.items.length > 0 ? (
                  <div className="space-y-3">
                    {phase.items.map((item) => {
                      const urgencyColors: Record<string, string> = {
                        critical: 'bg-red-100 text-red-800',
                        high: 'bg-orange-100 text-orange-800',
                        medium: 'bg-yellow-100 text-yellow-800',
                        low: 'bg-blue-100 text-blue-800',
                      };
                      return (
                        <div key={item.recommendation.id} className="flex items-center gap-3 rounded-md border p-3">
                          <Badge className={urgencyColors[item.urgency] || 'bg-gray-100 text-gray-800'}>
                            {t(`urgency.${item.urgency}`)}
                          </Badge>
                          <span className="text-sm">
                            {tAll(item.recommendation.titleKey)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">—</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
