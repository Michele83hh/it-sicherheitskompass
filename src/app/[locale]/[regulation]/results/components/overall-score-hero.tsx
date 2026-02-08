import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { OverallScore } from '@/lib/nis2/types';

interface OverallScoreHeroProps {
  overallScore: OverallScore;
}

export function OverallScoreHero({ overallScore }: OverallScoreHeroProps) {
  const t = useTranslations('results');

  const trafficLightConfig = {
    red: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      label: t('trafficLight.red'),
    },
    yellow: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      label: t('trafficLight.yellow'),
    },
    green: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      label: t('trafficLight.green'),
    },
  };

  const config = trafficLightConfig[overallScore.trafficLight];
  const Icon = config.icon;

  // Progress bar color based on traffic light
  const progressBarColor =
    overallScore.trafficLight === 'red'
      ? '[&>div]:bg-red-500'
      : overallScore.trafficLight === 'yellow'
        ? '[&>div]:bg-yellow-500'
        : '[&>div]:bg-green-500';

  return (
    <div className="mb-12 rounded-xl border bg-card p-8 shadow-sm">
      <div className="mb-6 text-center">
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          {t('overallScore.label')}
        </p>
        <div className="mb-4 text-5xl font-bold text-foreground">
          {overallScore.percentage}%
        </div>

        {/* Traffic light indicator with icon + text + color (WCAG compliant) */}
        <div className={`mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 ${config.bgColor}`}>
          <Icon className={`size-5 ${config.textColor}`} aria-hidden="true" />
          <span className={`font-medium ${config.textColor}`}>{config.label}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <Progress value={overallScore.percentage} className={progressBarColor} />
      </div>

      {/* Completion rate */}
      <p className="mb-4 text-center text-sm text-muted-foreground">
        {t('overallScore.questionsAnswered', {
          answered: overallScore.answeredQuestions,
          total: overallScore.totalQuestions,
        })}{' '}
        ({overallScore.completionRate}%)
      </p>

      {/* Verdict text */}
      <p className="text-center text-sm font-medium">
        {t(`verdict.${overallScore.trafficLight}` as 'verdict.red')}
      </p>
    </div>
  );
}
