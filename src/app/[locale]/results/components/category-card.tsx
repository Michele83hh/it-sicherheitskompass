import { useTranslations } from 'next-intl';
import {
  CheckCircle2, AlertTriangle, AlertCircle,
  Shield, ServerCrash, Link2, Code, ClipboardCheck,
  GraduationCap, Lock, UserCheck, KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { CategoryScore, EffortLevel } from '@/lib/nis2/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Shield, AlertTriangle, ServerCrash, Link2, Code,
  ClipboardCheck, GraduationCap, Lock, UserCheck, KeyRound,
};

interface CategoryCardProps {
  categoryScore: CategoryScore;
  categoryName: string;
  categoryShortName: string;
  categoryIcon?: string;
  euArticle: string;
  bsigParagraph: string;
  verdict: string;
  topRecommendation?: {
    title: string;
    firstStep: string;
    effortLevel: EffortLevel;
  };
}

export function CategoryCard({
  categoryScore,
  categoryName,
  categoryShortName,
  categoryIcon,
  euArticle,
  bsigParagraph,
  verdict,
  topRecommendation,
}: CategoryCardProps) {
  const t = useTranslations('results');

  const trafficLightConfig = {
    red: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      progressColor: '[&>div]:bg-red-500',
      label: t('trafficLight.red'),
    },
    yellow: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      progressColor: '[&>div]:bg-yellow-500',
      label: t('trafficLight.yellow'),
    },
    green: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      progressColor: '[&>div]:bg-green-500',
      label: t('trafficLight.green'),
    },
  };

  const config = trafficLightConfig[categoryScore.trafficLight];
  const TrafficIcon = config.icon;
  const CategoryIcon = categoryIcon ? ICON_MAP[categoryIcon] : null;

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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {CategoryIcon && <CategoryIcon className="size-5 text-primary flex-shrink-0" aria-hidden="true" />}
            <CardTitle className="text-base">{categoryShortName}</CardTitle>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full px-2 py-1 ${config.bgColor} ${config.borderColor} border`}
          >
            <TrafficIcon className={`size-4 ${config.textColor}`} aria-hidden="true" />
            <span className={`text-xs font-medium ${config.textColor}`}>
              {config.label}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Score */}
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              {categoryScore.percentage}%
            </span>
            <span className="text-xs text-muted-foreground">
              {categoryScore.answeredQuestions}/{categoryScore.totalQuestions}{' '}
              Fragen
            </span>
          </div>
          <Progress
            value={categoryScore.percentage}
            className={config.progressColor}
          />
        </div>

        {/* Legal reference */}
        <div className="text-xs text-muted-foreground">
          {euArticle} • {bsigParagraph}
        </div>

        {/* Verdict */}
        <p className="text-sm">{verdict}</p>

        {/* Top recommendation */}
        {topRecommendation && (
          <div className="rounded-md bg-muted p-3">
            <p className="mb-1 text-xs font-semibold text-muted-foreground">
              {t('categoryCard.topRecommendation')}
            </p>
            <p className="mb-2 text-sm font-medium">{topRecommendation.title}</p>
            <Badge className={effortLevelConfig[topRecommendation.effortLevel].className}>
              {effortLevelConfig[topRecommendation.effortLevel].label}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
