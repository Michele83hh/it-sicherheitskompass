'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { UserCheck, ChevronLeft, CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

const QUESTION_IDS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'] as const;

type Answers = Record<string, boolean | null>;

function getScoreLevel(score: number) {
  if (score >= 9) return 'excellent';
  if (score >= 7) return 'good';
  if (score >= 4) return 'needsWork';
  return 'critical';
}

const LEVEL_STYLES: Record<string, { bg: string; border: string; text: string; bar: string }> = {
  excellent: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', bar: 'bg-emerald-500' },
  good:      { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', bar: 'bg-blue-500' },
  needsWork: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', bar: 'bg-amber-500' },
  critical:  { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', bar: 'bg-red-500' },
};

export default function SoloCheckPage() {
  const t = useTranslations('wissenPages.soloCheck');
  const tWissen = useTranslations('wissenPages');
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(QUESTION_IDS.map((id) => [id, null]))
  );
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const score = Object.values(answers).filter((v) => v === true).length;
  const allAnswered = answeredCount === QUESTION_IDS.length;
  const level = getScoreLevel(score);
  const styles = LEVEL_STYLES[level];

  function handleAnswer(qId: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  function reset() {
    setAnswers(Object.fromEntries(QUESTION_IDS.map((id) => [id, null])));
    setShowResult(false);
    setStarted(false);
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <UserCheck className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />

        {!started && !showResult && (
          <div className="text-center py-12">
            <p className="mb-8 text-base text-muted-foreground max-w-xl mx-auto">{t('intro')}</p>
            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-8 py-3 text-base font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
            >
              {t('startButton')}
            </button>
          </div>
        )}

        {started && !showResult && (
          <div>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{answeredCount} / {QUESTION_IDS.length}</span>
                <span>{Math.round((answeredCount / QUESTION_IDS.length) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(answeredCount / QUESTION_IDS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {QUESTION_IDS.map((id, idx) => (
                <Card key={id} className={answers[id] !== null ? 'border-muted' : ''}>
                  <CardContent className="pt-4">
                    <div className="flex gap-3 mb-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm font-medium pt-0.5">{t(`questions.${id}.title`)}</p>
                    </div>
                    <div className="ml-10 flex gap-2 mb-2">
                      <button
                        onClick={() => handleAnswer(id, true)}
                        className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                          answers[id] === true
                            ? 'bg-emerald-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-emerald-100'
                        }`}
                      >
                        <CheckCircle2 className="size-4" /> Ja
                      </button>
                      <button
                        onClick={() => handleAnswer(id, false)}
                        className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                          answers[id] === false
                            ? 'bg-red-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-red-100'
                        }`}
                      >
                        <XCircle className="size-4" /> Nein
                      </button>
                    </div>
                    {answers[id] === false && (
                      <div className="ml-10 flex gap-2 rounded-md bg-amber-50 p-2 text-xs text-amber-800">
                        <Lightbulb className="mt-0.5 size-3.5 shrink-0" />
                        {t(`questions.${id}.tip`)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowResult(true)}
                disabled={!allAnswered}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-8 py-3 text-base font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('resultTitle')}
              </button>
            </div>
          </div>
        )}

        {showResult && (
          <div className="py-8">
            {/* Score */}
            <div className={`rounded-lg border-2 ${styles.border} ${styles.bg} p-8 text-center mb-8`}>
              <div className="text-6xl font-bold mb-2" style={{ color: styles.bar.replace('bg-', '') }}>
                {score}/10
              </div>
              <div className="h-3 rounded-full bg-white/50 overflow-hidden max-w-xs mx-auto mb-4">
                <div className={`h-full rounded-full ${styles.bar} transition-all duration-500`} style={{ width: `${score * 10}%` }} />
              </div>
              <h3 className={`text-xl font-bold ${styles.text} mb-2`}>
                {t(`scoring.${level}.title`)}
              </h3>
              <p className={`text-sm ${styles.text}`}>
                {t(`scoring.${level}.desc`)}
              </p>
            </div>

            {/* Missed items */}
            {score < 10 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Ihre Handlungsfelder:</h3>
                <div className="space-y-2">
                  {QUESTION_IDS.filter((id) => answers[id] === false).map((id) => (
                    <div key={id} className="flex gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
                      <XCircle className="mt-0.5 size-4 shrink-0" />
                      <div>
                        <span className="font-medium">{t(`questions.${id}.title`)}</span>
                        <p className="mt-0.5 text-xs text-red-600">{t(`questions.${id}.tip`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <RotateCcw className="size-4" /> Erneut pruefen
              </button>
              <Link
                href="/navigator"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
              >
                Zum Regelwerk-Navigator
              </Link>
              <Link
                href="/wissen/freelancer-basics"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                Freelancer-Leitfaden
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" />
            {tWissen('backToWissen')}
          </Link>
        </div>
      </div>
    </div>
  );
}
