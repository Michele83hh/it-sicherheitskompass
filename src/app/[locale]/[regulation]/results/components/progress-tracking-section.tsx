'use client';

import { useTranslations } from 'next-intl';
import { CheckSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProgressStore, type ProgressStatus } from '@/stores/progress-store';
import type { Recommendation } from '@/lib/nis2/types';

interface ProgressTrackingSectionProps {
  recommendations: Recommendation[];
}

export function ProgressTrackingSection({ recommendations }: ProgressTrackingSectionProps) {
  const t = useTranslations('progressTracking');
  const tRec = useTranslations('recommendations');
  const { updateProgress, getProgress, getCompletionPercentage, getStatusCounts } = useProgressStore();

  const completionPct = getCompletionPercentage(recommendations.length);
  const counts = getStatusCounts();

  const statusColors: Record<ProgressStatus, string> = {
    'not-started': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  };

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <CheckSquare className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Overall progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{t('overall')}</span>
            <span className="text-2xl font-bold">{completionPct}%</span>
          </div>
          <Progress value={completionPct} className="mb-4 [&>div]:bg-green-500" />
          <div className="flex gap-4 text-sm">
            <Badge className={statusColors['not-started']}>{counts.notStarted} {t('status.notStarted')}</Badge>
            <Badge className={statusColors['in-progress']}>{counts.inProgress} {t('status.inProgress')}</Badge>
            <Badge className={statusColors['completed']}>{counts.completed} {t('status.completed')}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Per-recommendation tracking */}
      <div className="space-y-3">
        {recommendations.map((rec) => {
          const progress = getProgress(rec.id);
          const currentStatus = progress?.status || 'not-started';
          const titleKey = rec.titleKey.replace('recommendations.', '');

          return (
            <div key={rec.id} className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex-1">
                <p className="text-sm font-medium">{tRec(titleKey)}</p>
              </div>
              <Select
                value={currentStatus}
                onValueChange={(value: ProgressStatus) => updateProgress(rec.id, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">{t('status.notStarted')}</SelectItem>
                  <SelectItem value="in-progress">{t('status.inProgress')}</SelectItem>
                  <SelectItem value="completed">{t('status.completed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>
    </section>
  );
}
