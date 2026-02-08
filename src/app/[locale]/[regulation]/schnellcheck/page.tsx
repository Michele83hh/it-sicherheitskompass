'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { useQuickCheckStore } from '@/stores/quick-check-store';
import { QUICK_CHECK_QUESTIONS, type QuickCheckValue } from '@/lib/nis2/quick-check';
import { CATEGORIES } from '@/lib/nis2/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, MinusCircle, XCircle, ArrowRight, RotateCcw, Zap, Clock, ClipboardList, BarChart3, Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SchnellcheckPage() {
  const t = useTranslations('quickCheck');
  const tCat = useTranslations('categories');
  const [isClient, setIsClient] = useState(false);

  const answers = useQuickCheckStore((state) => state.answers);
  const completed = useQuickCheckStore((state) => state.completed);
  const setAnswer = useQuickCheckStore((state) => state.setAnswer);
  const reset = useQuickCheckStore((state) => state.reset);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 rounded bg-muted" />
          <div className="h-4 w-96 rounded bg-muted" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  // Show intro only when user hasn't started yet
  const hasStarted = answers.length > 0 || completed;
  const shouldShowIntro = showIntro && !hasStarted;

  if (shouldShowIntro) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Zap className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('intro.title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            {t('intro.subtitle')}
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-center mb-8">{t('intro.howTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-5 rounded-lg border bg-white">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">1</div>
              <ClipboardList className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">{t('intro.step1')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-white">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">2</div>
              <BarChart3 className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">{t('intro.step2')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-white">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">3</div>
              <ArrowRight className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">{t('intro.step3')}</p>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span>{t('intro.duration')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Shield className="size-4" />
            <span>{t('intro.anonymous')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Lock className="size-4" />
            <span>{t('intro.local')}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => setShowIntro(false)}>
            <Zap className="mr-2 size-5" />
            {t('intro.cta')}
          </Button>
        </div>
      </div>
    );
  }

  const answeredCount = answers.length;
  const progressPercent = (answeredCount / 10) * 100;

  function getAnswerValue(questionId: string): QuickCheckValue | undefined {
    return answers.find((a) => a.questionId === questionId)?.value;
  }

  function getCategoryName(categoryId: string): string {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return categoryId;
    return tCat(cat.shortNameKey.replace('categories.', ''));
  }

  const answerOptions: { value: QuickCheckValue; labelKey: string; icon: typeof CheckCircle2; activeClass: string }[] = [
    { value: 'yes', labelKey: 'answers.yes', icon: CheckCircle2, activeClass: 'border-green-500 bg-green-50 text-green-700' },
    { value: 'partial', labelKey: 'answers.partial', icon: MinusCircle, activeClass: 'border-yellow-500 bg-yellow-50 text-yellow-700' },
    { value: 'no', labelKey: 'answers.no', icon: XCircle, activeClass: 'border-red-500 bg-red-50 text-red-700' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t('progress', { answered: answeredCount, total: 10 })}
          </span>
          {answeredCount > 0 && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="size-3" />
              {t('reset')}
            </button>
          )}
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {QUICK_CHECK_QUESTIONS.map((question, index) => {
          const currentValue = getAnswerValue(question.id);
          return (
            <Card key={question.id} className={cn(
              'transition-all',
              currentValue && 'border-muted'
            )}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryName(question.categoryId)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {index + 1}/10
                  </span>
                </div>
                <CardTitle className="text-lg leading-snug">
                  {t(`questions.q${index + 1}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`questions.q${index + 1}.description`)}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {answerOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = currentValue === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setAnswer(question.id, question.categoryId, option.value)}
                        className={cn(
                          'flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 transition-all hover:shadow-sm',
                          isActive
                            ? option.activeClass
                            : 'border-muted hover:border-muted-foreground/30'
                        )}
                      >
                        <Icon className={cn('size-5', !isActive && 'text-muted-foreground')} />
                        <span className={cn('text-sm font-medium', !isActive && 'text-muted-foreground')}>
                          {t(option.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        {completed ? (
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/schnellcheck/ergebnis">
              {t('showResult')}
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t('completeAll')}
          </p>
        )}
      </div>
    </div>
  );
}
