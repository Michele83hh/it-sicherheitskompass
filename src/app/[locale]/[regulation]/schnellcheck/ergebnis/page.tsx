'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { useRegulationConfig, getRecommendationsByCategory } from '@/hooks/useRegulationConfig';
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
  Zap,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RegulationBreadcrumb } from '@/components/layout/breadcrumb';
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

// trafficLightLabel removed — now uses i18n via tAll('common.trafficLight.{tl}')

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

  // Derive top-3 quick-win recommendations from weak categories
  const topActions = useMemo(() => {
    if (score.categoryScores.length === 0) return [];

    // Get categories sorted by weakness (red first, then yellow)
    const weakCategories = [...score.categoryScores]
      .filter((cs) => cs.trafficLight === 'red' || cs.trafficLight === 'yellow')
      .sort((a, b) => a.percentage - b.percentage);

    const actions: Array<{
      title: string;
      firstStep: string;
      categoryName: string;
    }> = [];

    for (const catScore of weakCategories) {
      if (actions.length >= 3) break;
      const recs = getRecommendationsByCategory(config, catScore.categoryId);
      // Pick highest priority + quickest effort
      const quickRecs = [...recs]
        .sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          const effortOrder = { quick: 0, medium: 1, strategic: 2 };
          return (priorityOrder[a.priority] - priorityOrder[b.priority]) ||
                 (effortOrder[a.effortLevel] - effortOrder[b.effortLevel]);
        });

      for (const rec of quickRecs) {
        if (actions.length >= 3) break;
        const cat = config.categories.find((c) => c.id === catScore.categoryId);
        actions.push({
          title: tAll(rec.titleKey),
          firstStep: tAll(rec.firstStepKey),
          categoryName: cat ? tAll(cat.shortNameKey) : catScore.categoryId,
        });
        break; // One per category
      }
    }

    return actions;
  }, [score, config, tAll]);

  // Count categories with action needed
  const actionNeededCount = score.categoryScores.filter(
    (cs) => cs.trafficLight === 'red' || cs.trafficLight === 'yellow'
  ).length;

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
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20" asChild>
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
      <RegulationBreadcrumb regulation={regulation} currentPage="schnellcheck" />
      {/* Hero Score */}
      <div className={cn('rounded-xl border-2 p-8 text-center mb-6', trafficLightBg(score.trafficLight))}>
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

      {/* Summary headline */}
      {actionNeededCount > 0 && (
        <p className="text-center text-sm font-medium text-foreground mb-8">
          {t('actionSummary', { count: actionNeededCount, total: score.categoryScores.length })}
        </p>
      )}

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

      {/* Category Overview with visual Ja/Teilweise/Nein */}
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
                <span className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded',
                  cs.trafficLight === 'red' ? 'bg-red-100 text-red-700' :
                  cs.trafficLight === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                )}>
                  {tAll(`common.trafficLight.${cs.trafficLight}`)}
                </span>
                <Badge variant={cs.trafficLight === 'red' ? 'destructive' : cs.trafficLight === 'yellow' ? 'secondary' : 'default'}>
                  {cs.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top-3 Sofort-Maßnahmen */}
      {topActions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="size-5 text-amber-500" />
            <h2 className="text-lg font-bold">{t('topActions.title')}</h2>
          </div>
          <div className="grid gap-4">
            {topActions.map((action, idx) => (
              <Card key={idx} className="border-amber-200 bg-amber-50/50">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{action.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('topActions.firstStep')}: {action.firstStep}
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {action.categoryName}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Comparison table: Schnellcheck vs Full Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            <CardTitle className="text-base">{t('comparison.title')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground"></th>
                  <th className="pb-2 text-center font-medium text-muted-foreground">{t('comparison.quickCheck')}</th>
                  <th className="pb-2 text-center font-medium text-primary">{t('comparison.fullAnalysis')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 text-muted-foreground">{t('comparison.questions')}</td>
                  <td className="py-2 text-center">{totalQuestions}</td>
                  <td className="py-2 text-center font-medium">{config.questions.length}</td>
                </tr>
                <tr>
                  <td className="py-2 text-muted-foreground">{t('comparison.result')}</td>
                  <td className="py-2 text-center">{t('comparison.roughEstimate')}</td>
                  <td className="py-2 text-center font-medium">{t('comparison.detailedScores')}</td>
                </tr>
                <tr>
                  <td className="py-2 text-muted-foreground">{t('comparison.actions')}</td>
                  <td className="py-2 text-center">Top 3</td>
                  <td className="py-2 text-center font-medium">{t('comparison.allWithRoadmap')}</td>
                </tr>
                <tr>
                  <td className="py-2 text-muted-foreground">{tAll('results.pdfReportTitle')}</td>
                  <td className="py-2 text-center text-muted-foreground">—</td>
                  <td className="py-2 text-center">
                    <CheckCircle2 className="mx-auto size-4 text-green-600" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-muted-foreground">{t('comparison.tracking')}</td>
                  <td className="py-2 text-center text-muted-foreground">—</td>
                  <td className="py-2 text-center">
                    <CheckCircle2 className="mx-auto size-4 text-green-600" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Incentive text + Endowed Progress */}
      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-5 text-center">
        <p className="text-sm text-blue-800 font-medium mb-2">
          {t('incentive.text')}
        </p>
        <p className="text-xs text-blue-600">
          {t('incentive.endowedProgress')}
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full text-lg py-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
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
            <LayoutDashboard className="mr-2 size-4" />
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
