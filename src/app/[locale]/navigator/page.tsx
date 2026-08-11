'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Shield,
  Lock,
  Building2,
  Landmark,
  Car,
  Cpu,
  BookOpen,
  CheckCircle2,

  Info,
  RotateCcw,
  Mail,
  LayoutDashboard,
  FileText,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Award,
  BadgeCheck,
  CreditCard,
  Cloud,
  Clock,
  LifeBuoy,
  Flag,
  Bug,
} from 'lucide-react';

import {
  calculateRelevance,
  type NavigatorRegulationId as RegulationId,
  type RegCategory,
  type ObligationType,
  type RegulationResult,
} from '@/lib/navigator/relevance';

const CATEGORY_ORDER: RegCategory[] = ['legal', 'industry', 'framework', 'baseline'];

const CATEGORY_DISPLAY: Record<RegCategory, { icon: typeof Shield; color: string; bgColor: string; borderColor: string }> = {
  legal: { icon: Landmark, color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  industry: { icon: Building2, color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
  framework: { icon: BookOpen, color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  baseline: { icon: ShieldCheck, color: 'text-slate-700', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
};

const OBLIGATION_COLORS: Record<ObligationType, string> = {
  direct: 'bg-red-100 text-red-700 border-red-200',
  indirect: 'bg-amber-100 text-amber-700 border-amber-200',
  contractual: 'bg-violet-100 text-violet-700 border-violet-200',
  check: 'bg-orange-100 text-orange-700 border-orange-200',
  cascaded: 'bg-blue-100 text-blue-700 border-blue-200',
  voluntary: 'bg-slate-100 text-slate-600 border-slate-200',
};

export interface NavigatorResults {
  industry: string;
  companySize: string;
  results: RegulationResult[];
  completedAt: string;
}

const NAVIGATOR_STORAGE_KEY = 'navigator-results-storage';

const INDUSTRIES = [
  'energy', 'transport', 'finance', 'health', 'water', 'digital-infrastructure',
  'ict-services', 'space', 'postal', 'waste', 'manufacturing', 'food',
  'chemicals', 'research', 'automotive', 'retail', 'other',
] as const;

const BUSINESS_MODELS = [
  'personalData', 'digitalProducts', 'kritisOperator', 'financialServices',
  'automotiveSupplier', 'digitalServices', 'manufacturing', 'cloudProvider',
  'supplierForRegulated', 'paymentProcessing', 'saasProvider',
] as const;

const SPECIAL_CIRCUMSTANCES = [
  'kritis', 'tisaxRequired', 'art9Data', 'iotProducts', 'financeClients', 'iso27001',
  'pciRequired', 'publicSectorClients',
] as const;

const TOTAL_STEPS = 4;

export default function NavigatorPage() {
  const t = useTranslations('platform.navigator');
  const tReg = useTranslations();
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [businessModels, setBusinessModels] = useState<string[]>([]);
  const [specialCircumstances, setSpecialCircumstances] = useState<string[]>([]);
  const [showLowRelevance, setShowLowRelevance] = useState(false);

  function calculateResults(): RegulationResult[] {
    return calculateRelevance({ industry, companySize, businessModels, specialCircumstances });
  }

  const regMeta: Record<RegulationId, { icon: typeof Shield; tKey: string; color: string; bgColor: string; borderColor: string }> = {
    'nis2': { icon: Shield, tKey: 'nis2', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    'dsgvo': { icon: Lock, tKey: 'dsgvo', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    'kritis': { icon: Building2, tKey: 'kritis', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    'dora': { icon: Landmark, tKey: 'dora', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    'tisax': { icon: Car, tKey: 'tisax', color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
    'cra': { icon: Cpu, tKey: 'cra', color: 'text-cyan-700', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
    'bsi-grundschutz': { icon: BookOpen, tKey: 'bsiGrundschutz', color: 'text-slate-700', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
    'iso27001': { icon: Award, tKey: 'iso27001', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
    'soc2': { icon: BadgeCheck, tKey: 'soc2', color: 'text-sky-700', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
    'pci-dss': { icon: CreditCard, tKey: 'pciDss', color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
    'c5': { icon: Cloud, tKey: 'c5', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    'cis-controls': { icon: ShieldCheck, tKey: 'cisControls', color: 'text-sky-700', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
    'iso22301': { icon: LifeBuoy, tKey: 'iso22301', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    'nist-csf': { icon: Flag, tKey: 'nistCsf', color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
    'owasp-asvs': { icon: Bug, tKey: 'owaspAsvs', color: 'text-lime-700', bgColor: 'bg-lime-50', borderColor: 'border-lime-200' },
  };

  function handleRestart() {
    setStep(0);
    setIndustry('');
    setCompanySize('');
    setBusinessModels([]);
    setSpecialCircumstances([]);
  }

  // Persist results to localStorage when reaching results step
  function persistResults(results: RegulationResult[]) {
    try {
      const data: NavigatorResults = {
        industry,
        companySize,
        results,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem(NAVIGATOR_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  function getEmailBody(results: RegulationResult[]): string {
    const relevant = results.filter(r => r.relevance === 'high' || r.relevance === 'medium');
    const regNames = relevant.map(r => {
      const meta = regMeta[r.id];
      return tReg(`${meta.tKey}.name`);
    }).join(', ');
    const url = typeof window !== 'undefined' ? window.location.origin + '/dashboard' : '';
    const subject = encodeURIComponent(t('result.emailSubject'));
    const body = encodeURIComponent(t('result.emailBody', { regulations: regNames, url }));
    return `mailto:?subject=${subject}&body=${body}`;
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem] lg:min-h-[19rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Compass className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-lg text-slate-300 whitespace-pre-line">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10">

      {/* Step indicator */}
      {step < TOTAL_STEPS && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t('progress.step', { current: step + 1, total: TOTAL_STEPS })}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-primary' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Industry */}
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('steps.industry.title')}</CardTitle>
            <CardDescription>{t('steps.industry.hint')}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={industry} onValueChange={setIndustry} className="grid gap-2 sm:grid-cols-2">
              {INDUSTRIES.map((ind) => (
                <div
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors ${industry === ind ? 'border-primary bg-primary/5' : ''}`}
                >
                  <RadioGroupItem value={ind} id={`industry-${ind}`} />
                  <span className="text-sm">{t(`industries.${ind}`)}</span>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setStep(1)} disabled={!industry}>
                {t('progress.next')} <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Company Size */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('steps.size.title')}</CardTitle>
            <CardDescription>{t('steps.size.hint')}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={companySize} onValueChange={setCompanySize} className="grid gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <div
                  key={size}
                  onClick={() => setCompanySize(size)}
                  className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${companySize === size ? 'border-primary bg-primary/5' : ''}`}
                >
                  <RadioGroupItem value={size} id={`size-${size}`} className="mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t(`steps.size.${size}`)}</p>
                    <p className="text-xs text-muted-foreground">{t(`steps.size.${size}Desc`)}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ArrowLeft className="mr-2 size-4" /> {t('progress.back')}
              </Button>
              <Button onClick={() => setStep(2)} disabled={!companySize}>
                {t('progress.next')} <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Business Activities */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('steps.activities.title')}</CardTitle>
            <CardDescription>{t('steps.activities.hint')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {BUSINESS_MODELS.map((model) => {
                const isChecked = businessModels.includes(model);
                return (
                  <div
                    key={model}
                    onClick={() => setBusinessModels(isChecked
                      ? businessModels.filter((m) => m !== model)
                      : [...businessModels, model]
                    )}
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors ${isChecked ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <Checkbox
                      id={`bm-${model}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        setBusinessModels(checked
                          ? [...businessModels, model]
                          : businessModels.filter((m) => m !== model)
                        );
                      }}
                    />
                    <span className="text-sm">{t(`steps.activities.${model}`)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 size-4" /> {t('progress.back')}
              </Button>
              <Button onClick={() => setStep(3)}>
                {t('progress.next')} <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Special Circumstances */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('steps.specifics.title')}</CardTitle>
            <CardDescription>{t('steps.specifics.hint')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {SPECIAL_CIRCUMSTANCES.map((item) => {
                const isChecked = specialCircumstances.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => setSpecialCircumstances(isChecked
                      ? specialCircumstances.filter((s) => s !== item)
                      : [...specialCircumstances, item]
                    )}
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors ${isChecked ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <Checkbox
                      id={`sc-${item}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        setSpecialCircumstances(checked
                          ? [...specialCircumstances, item]
                          : specialCircumstances.filter((s) => s !== item)
                        );
                      }}
                    />
                    <span className="text-sm">{t(`steps.specifics.${item}`)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 size-4" /> {t('progress.back')}
              </Button>
              <Button onClick={() => setStep(4)}>
                <Compass className="mr-2 size-4" /> {t('result.title')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {step === 4 && (() => {
        const results = calculateResults();
        const highResults = results.filter(r => r.relevance === 'high');
        const mediumResults = results.filter(r => r.relevance === 'medium');
        const lowResults = results.filter(r => r.relevance === 'low');
        const noneResults = results.filter(r => r.relevance === 'none');
        const relevantCount = highResults.length + mediumResults.length;

        // Persist to localStorage
        persistResults(results);

        return (
          <div className="space-y-6">
            {/* Summary Box */}
            <div className="rounded-xl bg-slate-800 p-6 text-center text-white">
              <CheckCircle2 className="mx-auto size-10 text-emerald-400 mb-3" />
              <h2 className="text-xl font-bold">{t('result.summaryTitle')}</h2>
              <p className="mt-2 text-slate-300">
                {t('result.summaryText', { count: relevantCount })}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {[...highResults, ...mediumResults].map((r) => {
                  const meta = regMeta[r.id];
                  return (
                    <span key={r.id} className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
                      {tReg(`${meta.tKey}.name`)}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Ihre Angaben — Grundlage der Einschätzung, transparent + korrigierbar */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{t('result.yourInputs')}</p>
                <Button variant="ghost" size="sm" onClick={() => setStep(0)}>
                  {t('result.editInputs')}
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium text-foreground">
                  {t(`industries.${industry}`)}
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium text-foreground">
                  {t(`steps.size.${companySize}`)}
                </span>
                {businessModels.map((m) => (
                  <span key={m} className="inline-flex items-center rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground">
                    {t(`steps.activities.${m}`)}
                  </span>
                ))}
                {specialCircumstances.map((c) => (
                  <span key={c} className="inline-flex items-center rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground">
                    {t(`steps.specifics.${c}`)}
                  </span>
                ))}
              </div>
            </div>

            {/* Disclaimer (prominent, before results) */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="flex gap-2">
                <Info className="size-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <p>{t('result.disclaimer')}</p>
              </div>
            </div>

            {/* Category-based results */}
            {CATEGORY_ORDER.map((cat) => {
              const catResults = results.filter(r => r.regCategory === cat && (r.relevance === 'high' || r.relevance === 'medium'));
              if (catResults.length === 0) return null;
              const catMeta = CATEGORY_DISPLAY[cat];
              const CatIcon = catMeta.icon;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full ${catMeta.bgColor} border ${catMeta.borderColor} px-3 py-1 text-xs font-semibold ${catMeta.color}`}>
                      <CatIcon className="size-3" />
                      {t(`result.category.${cat}`)}
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {t(`result.categoryDesc.${cat}`)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {catResults.map((result) => (
                      <ResultCard key={result.id} result={result} regMeta={regMeta} t={t} tReg={tReg} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Low + Not relevant (collapsed by default) */}
            {(lowResults.length > 0 || noneResults.length > 0) && (
              <div>
                <button
                  onClick={() => setShowLowRelevance(!showLowRelevance)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowRight className={`size-3 transition-transform ${showLowRelevance ? 'rotate-90' : ''}`} />
                  {t('result.notRelevant')} ({lowResults.length + noneResults.length})
                </button>
                {showLowRelevance && (
                  <div className="mt-3 space-y-3">
                    {[...lowResults, ...noneResults].map((result) => (
                      <ResultCard key={result.id} result={result} regMeta={regMeta} t={t} tReg={tReg} dimmed />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Top-3 First Steps */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {t('result.firstStepsTitle')}
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FileText, key: 'firstStep1' },
                  { icon: KeyRound, key: 'firstStep2' },
                  { icon: ShieldCheck, key: 'firstStep3' },
                ].map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200">
                      <Icon className="size-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{t(`result.${key}`)}</p>
                      <p className="text-xs text-muted-foreground">{t(`result.${key}Desc`)}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap mt-0.5">
                      {t(`result.${key}Time`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTAs */}
            {(() => {
              const firstRegId = highResults[0]?.id || mediumResults[0]?.id || 'nis2';
              return (
                <div className="space-y-3">
                  <Button size="lg" className="w-full py-6 text-base bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20" asChild>
                    <Link href={`/${firstRegId}/schnellcheck` as any}>
                      <Shield className="mr-2 size-5" />
                      {t('result.startFirstAnalysis')}
                    </Link>
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" variant="outline" className="flex-1 py-6 text-base" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 size-5" />
                        {t('result.toDashboard')}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 py-6 text-base" asChild>
                      <a href={getEmailBody(results)}>
                        <Mail className="mr-2 size-5" />
                        {t('result.emailResult')}
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })()}

            {/* Restart */}
            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={handleRestart}>
                <RotateCcw className="mr-2 size-4" /> {t('result.restart')}
              </Button>
            </div>
          </div>
        );
      })()}
      </div>
    </div>
  );
}

function ResultCard({
  result,
  regMeta,
  t,
  tReg,
  dimmed = false,
}: {
  result: RegulationResult;
  regMeta: Record<RegulationId, { icon: typeof Shield; tKey: string; color: string; bgColor: string; borderColor: string }>;
  t: ReturnType<typeof useTranslations>;
  tReg: ReturnType<typeof useTranslations>;
  dimmed?: boolean;
}) {
  const meta = regMeta[result.id];
  const Icon = meta.icon;

  return (
    <Card className={`${dimmed ? 'opacity-50' : ''} ${meta.borderColor} border`}>
      <CardContent className="flex items-center gap-4 py-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${meta.bgColor} flex-shrink-0`}>
          <Icon className={`size-5 ${meta.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold whitespace-nowrap">{tReg(`${meta.tKey}.name`)}</span>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${OBLIGATION_COLORS[result.obligationType]}`}>
              {result.obligationType === 'cascaded' && result.triggeredBy
                ? t('result.obligation.cascadedWith', { source: result.triggeredBy })
                : t(`result.obligation.${result.obligationType}`)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{t(`reasons.${result.reasonKey}`)}</p>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Clock className="size-3 flex-shrink-0" />
            {t(`deadlines.${result.id}`)}
          </p>
          {result.id === 'nis2' && !dimmed && (
            <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
              <ShieldAlert className="size-3 flex-shrink-0" />
              {t('result.liability')}
            </p>
          )}
        </div>
        {!dimmed && (
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            <Link
              href={`/${result.id}/schnellcheck` as any}
              className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              {t('result.startCheck')}
            </Link>
            <Link
              href={`/${result.id}/assessment` as any}
              className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              {t('result.fullAnalysis')}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
