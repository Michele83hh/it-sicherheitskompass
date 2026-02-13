'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Brain, ChevronLeft, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';
import { useState } from 'react';

const QUESTION_IDS = Array.from({ length: 15 }, (_, i) => `q${i + 1}`);
const ANSWER_KEYS = ['a', 'b', 'c', 'd'] as const;

export default function AwarenessQuizPage() {
  const t = useTranslations('wissenPages.awarenessQuiz');
  const tWissen = useTranslations('wissenPages');

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = QUESTION_IDS.length;
  const qId = QUESTION_IDS[currentQuestion];
  const correctAnswer = started && !finished ? t(`questions.${qId}.correct` as any) : '';

  function handleAnswer(key: string) {
    if (answered) return;
    setSelectedAnswer(key);
    setAnswered(true);
    if (key === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentQuestion < total - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setCorrectCount(0);
    setFinished(false);
  }

  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const scoreLevel = scorePercent >= 80 ? 'excellent' : scorePercent >= 60 ? 'good' : scorePercent >= 40 ? 'needsWork' : 'critical';
  const scoreLevelColor = {
    excellent: 'text-emerald-600',
    good: 'text-blue-600',
    needsWork: 'text-amber-600',
    critical: 'text-red-600',
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Brain className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />

        {!started && !finished && (
          <div className="text-center py-12">
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>
            <Button
              onClick={() => setStarted(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 text-lg px-8 py-3"
            >
              {t('startButton')}
            </Button>
          </div>
        )}

        {started && !finished && (
          <div>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{t('questionOf', { current: currentQuestion + 1, total })}</span>
                <span>{correctCount} ✓</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentQuestion + (answered ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="text-base font-medium mb-6">{t(`questions.${qId}.question` as any)}</p>
                <div className="space-y-3">
                  {ANSWER_KEYS.map((key) => {
                    const isCorrect = key === correctAnswer;
                    const isSelected = key === selectedAnswer;
                    let cardClass = 'border p-3 rounded-md cursor-pointer transition-colors hover:bg-muted/50';

                    if (answered) {
                      if (isCorrect) cardClass = 'border-2 border-emerald-500 bg-emerald-50 p-3 rounded-md';
                      else if (isSelected) cardClass = 'border-2 border-red-500 bg-red-50 p-3 rounded-md';
                      else cardClass = 'border p-3 rounded-md opacity-50';
                    } else if (isSelected) {
                      cardClass = 'border-2 border-primary bg-primary/5 p-3 rounded-md cursor-pointer';
                    }

                    return (
                      <button
                        key={key}
                        onClick={() => handleAnswer(key)}
                        disabled={answered}
                        className={`w-full text-left flex items-center gap-3 ${cardClass}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold uppercase">
                          {key}
                        </span>
                        <span className="text-sm">{t(`questions.${qId}.${key}` as any)}</span>
                        {answered && isCorrect && <CheckCircle2 className="ml-auto size-5 shrink-0 text-emerald-500" />}
                        {answered && isSelected && !isCorrect && <XCircle className="ml-auto size-5 shrink-0 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            {answered && (
              <div className={`mb-6 rounded-lg p-4 ${selectedAnswer === correctAnswer ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-bold text-sm mb-1 ${selectedAnswer === correctAnswer ? 'text-emerald-700' : 'text-red-700'}`}>
                  {selectedAnswer === correctAnswer ? t('correct') : t('incorrect')}
                </p>
                <p className="text-sm text-muted-foreground">{t(`questions.${qId}.explanation` as any)}</p>
              </div>
            )}

            {/* Next button */}
            {answered && (
              <div className="flex justify-end">
                <Button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                  {currentQuestion < total - 1 ? t('nextButton') : t('finishButton')}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {finished && (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">{t('result.title')}</h2>
            <div className={`text-5xl font-bold mb-2 ${scoreLevelColor[scoreLevel]}`}>{scorePercent}%</div>
            <p className="text-lg text-muted-foreground mb-4">{t('result.score', { correct: correctCount, total })}</p>
            <div className="h-3 rounded-full bg-muted overflow-hidden max-w-xs mx-auto mb-6">
              <div
                className={`h-full rounded-full transition-all ${scorePercent >= 80 ? 'bg-emerald-500' : scorePercent >= 60 ? 'bg-blue-500' : scorePercent >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <p className={`text-sm font-medium mb-8 ${scoreLevelColor[scoreLevel]}`}>
              {t(`result.${scoreLevel}`)}
            </p>
            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="size-4" />
              {t('restartButton')}
            </Button>
          </div>
        )}

        <div className="mt-12">
          <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
          </Link>
        </div>
      </div>
    </div>
  );
}
