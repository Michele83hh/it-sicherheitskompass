import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { OverallScore } from '@/lib/regulations/types';
import { getTlStyle, tlProgressBar } from '@/lib/ui/traffic-light-styles';

const TL_ICONS = { red: AlertCircle, yellow: AlertTriangle, green: CheckCircle2 } as const;

interface OverallScoreHeroProps {
  overallScore: OverallScore;
}

export function OverallScoreHero({ overallScore }: OverallScoreHeroProps) {
  const t = useTranslations('results');

  const tl = overallScore.trafficLight;
  const style = getTlStyle(tl);
  const Icon = TL_ICONS[tl];
  const label = t(`trafficLight.${tl}` as 'trafficLight.red');
  const progressBarColor = tlProgressBar(tl);

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
        <div className={`mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 ${style.bg}`}>
          <Icon className={`size-5 ${style.text}`} aria-hidden="true" />
          <span className={`font-medium ${style.text}`}>{label}</span>
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
