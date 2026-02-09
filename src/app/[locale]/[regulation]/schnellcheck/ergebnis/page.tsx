'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { useRegulationConfig } from '@/hooks/useRegulationConfig';
import { useRegulationStores } from '@/hooks/useRegulationStores';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Share2,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrafficLight } from '@/lib/regulations/types';
import '@/lib/regulations/init';

function trafficLightColor(tl: TrafficLight) {
  switch (tl) {
    case 'red': return 'text-red-600';
    case 'yellow': return 'text-yellow-600';
    case 'green': return 'text-green-600';
  }
}

function trafficLightBg(tl: TrafficLight) {
  switch (tl) {
    case 'red': return 'bg-red-50 border-red-200';
    case 'yellow': return 'bg-yellow-50 border-yellow-200';
    case 'green': return 'bg-green-50 border-green-200';
  }
}

function trafficLightDot(tl: TrafficLight) {
  switch (tl) {
    case 'red': return 'bg-red-500';
    case 'yellow': return 'bg-yellow-500';
    case 'green': return 'bg-green-500';
  }
}

interface QuickCheckScore {
  percentage: number;
  trafficLight: TrafficLight;
  categoryScores: Array<{
    categoryId: string;
    percentage: number;
    trafficLight: TrafficLight;
  }>;
}

export default function SchnellcheckErgebnisPage() {
  const params = useParams();
  const regulation = params?.regulation as string;
  const t = useTranslations('quickCheck.result');
  const tAll = useTranslations();
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = useRegulationConfig();
  const { quickCheckStore, assessmentStore } = useRegulationStores(regulation);
  const quickCheckQuestions = config.quickCheckQuestions || [];
  const totalQuestions = quickCheckQuestions.length;
  const isNis2 = regulation === 'nis2';

  const answers = quickCheckStore((state) => state.answers);
  const completed = quickCheckStore((state) => state.completed);
  const reset = quickCheckStore((state) => state.reset);
  const setHasCompletedQuickCheck = assessmentStore(
    (state) => state.setHasCompletedQuickCheck
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate score from quick check answers
  const score = useMemo<QuickCheckScore>(() => {
    if (answers.length === 0) {
      return { percentage: 0, trafficLight: 'red' as TrafficLight, categoryScores: [] };
    }

    // Group by category
    const categoryMap = new Map<string, number[]>();
    for (const answer of answers) {
      const q = quickCheckQuestions.find((qq) => qq.id === answer.questionId);
      const catId = q?.categoryId || 'unknown';
      if (!categoryMap.has(catId)) categoryMap.set(catId, []);
      const val = answer.value === 'yes' ? 100 : answer.value === 'partial' ? 50 : 0;
      categoryMap.get(catId)!.push(val);
    }

    const categoryScores = Array.from(categoryMap.entries()).map(([catId, vals]) => {
      const pct = Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
      const tl: TrafficLight = pct < 40 ? 'red' : pct < 70 ? 'yellow' : 'green';
      return { categoryId: catId, percentage: pct, trafficLight: tl };
    });

    const overallPct = Math.round(
      answers.reduce((s, a) => s + (a.value === 'yes' ? 100 : a.value === 'partial' ? 50 : 0), 0) / answers.length
    );
    const overallTl: TrafficLight = overallPct < 40 ? 'red' : overallPct < 70 ? 'yellow' : 'green';

    return { percentage: overallPct, trafficLight: overallTl, categoryScores };
  }, [answers, quickCheckQuestions]);

  if (!isClient) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 rounded-xl bg-muted" />
          <div className="h-24 rounded-xl bg-muted" />
          <div className="h-64 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!completed || answers.length < totalQuestions) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <ClipboardList className="mx-auto size-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t('incomplete.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('incomplete.description')}</p>
        <Button asChild>
          <Link href={`/${regulation}/schnellcheck`}>{t('incomplete.cta')}</Link>
        </Button>
      </div>
    );
  }

  function getCategoryName(categoryId: string): string {
    const cat = config.categories.find((c) => c.id === categoryId);
    if (!cat) return categoryId;
    return tAll(cat.shortNameKey);
  }

  async function handleShare() {
    const text = t('shareText', { score: Math.round(score.percentage) });
    try {
      await navigator.clipboard.writeText(text + '\n' + window.location.origin + `/${regulation}/schnellcheck`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Score */}
      <div className={cn('rounded-xl border-2 p-8 text-center mb-8', trafficLightBg(score.trafficLight))}>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {t('scoreLabel')}
        </p>
        <p className={cn('text-6xl font-bold', trafficLightColor(score.trafficLight))}>
          {Math.round(score.percentage)}%
        </p>
        <p className="mt-2 text-muted-foreground">
          {t(`verdict.${score.trafficLight}`)}
        </p>
      </div>

      {/* Penalty Warning (NIS2 only) */}
      {isNis2 && (
        <Card className="mb-8 border-red-300 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-600" />
              <CardTitle className="text-red-800">{t('penalty.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 mb-3">
              {t('penalty.description')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-red-200 bg-white p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  {t('penalty.essential')}
                </p>
                <p className="text-lg font-bold text-red-700">
                  {t('penalty.essentialAmount')}
                </p>
              </div>
              <div className="rounded-lg border border-red-200 bg-white p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  {t('penalty.important')}
                </p>
                <p className="text-lg font-bold text-red-700">
                  {t('penalty.importantAmount')}
                </p>
              </div>
            </div>
            <p className="text-xs text-red-600 mt-3">
              {t('penalty.legal')}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Category Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('categories.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...score.categoryScores].sort((a, b) => a.percentage - b.percentage).map((cs) => (
              <div key={cs.categoryId} className="flex items-center gap-3">
                <div className={cn('size-3 rounded-full flex-shrink-0', trafficLightDot(cs.trafficLight))} />
                <span className="flex-1 text-sm font-medium">
                  {getCategoryName(cs.categoryId)}
                </span>
                <Badge variant={cs.trafficLight === 'red' ? 'destructive' : cs.trafficLight === 'yellow' ? 'secondary' : 'default'}>
                  {cs.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTAs */}
      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full text-lg py-6"
          onClick={() => setHasCompletedQuickCheck(true)}
          asChild
        >
          <Link href={`/${regulation}/assessment`}>
            {t('cta.fullAnalysis')}
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="w-full" asChild>
          <Link href="/dashboard">
            {tAll('platform.dashboard.title')}
          </Link>
        </Button>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={handleShare}>
            <Share2 className="mr-2 size-4" />
            {copied ? t('cta.copied') : t('cta.share')}
          </Button>
          <Button variant="ghost" className="flex-1" onClick={reset} asChild>
            <Link href={`/${regulation}/schnellcheck`}>
              <RotateCcw className="mr-2 size-4" />
              {t('cta.restart')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
