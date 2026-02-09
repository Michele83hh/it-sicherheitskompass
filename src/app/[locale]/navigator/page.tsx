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
  CircleDot,
  Info,
  RotateCcw,
  Mail,
  LayoutDashboard,
  FileText,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

type RegulationId = 'nis2' | 'dsgvo' | 'kritis' | 'dora' | 'tisax' | 'cra' | 'bsi-grundschutz';

type Relevance = 'high' | 'medium' | 'low' | 'none';

interface RegulationResult {
  id: RegulationId;
  relevance: Relevance;
  score: number;
  reasonKey: string;
}

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
] as const;

const SPECIAL_CIRCUMSTANCES = [
  'kritis', 'tisaxRequired', 'art9Data', 'iotProducts', 'financeClients', 'iso27001',
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

  function calculateResults(): RegulationResult[] {
    const results: RegulationResult[] = [];

    // NIS2
    const nis2Sectors = ['energy', 'transport', 'finance', 'health', 'water', 'digital-infrastructure', 'ict-services', 'space', 'postal', 'waste', 'manufacturing', 'food', 'chemicals', 'research'];
    const isNis2Sector = nis2Sectors.includes(industry);
    const isLargeEnough = companySize === 'medium' || companySize === 'large';
    let nis2Score = 0;
    let nis2Reason = 'nis2Check';
    if (specialCircumstances.includes('kritis')) {
      nis2Score = 95;
      nis2Reason = 'nis2Critical';
    } else if (isNis2Sector && isLargeEnough) {
      nis2Score = 90;
      nis2Reason = 'nis2SectorSize';
    } else if (isNis2Sector) {
      nis2Score = 50;
      nis2Reason = 'nis2SectorOnly';
    } else if (isLargeEnough) {
      nis2Score = 30;
      nis2Reason = 'nis2Check';
    }
    results.push({
      id: 'nis2',
      relevance: nis2Score >= 80 ? 'high' : nis2Score >= 40 ? 'medium' : nis2Score >= 20 ? 'low' : 'none',
      score: nis2Score,
      reasonKey: nis2Reason,
    });

    // DSGVO
    let dsgvoScore = businessModels.includes('personalData') ? 95 : 70;
    let dsgvoReason = 'dsgvoAlways';
    if (specialCircumstances.includes('art9Data')) {
      dsgvoScore = 98;
      dsgvoReason = 'dsgvoSensitive';
    }
    results.push({
      id: 'dsgvo',
      relevance: 'high',
      score: dsgvoScore,
      reasonKey: dsgvoReason,
    });

    // KRITIS
    let kritisScore = 0;
    let kritisReason = 'kritisNA';
    if (specialCircumstances.includes('kritis') || businessModels.includes('kritisOperator')) {
      kritisScore = 95;
      kritisReason = 'kritisOperator';
    } else if (['energy', 'water', 'health', 'transport', 'finance', 'food', 'digital-infrastructure'].includes(industry) && companySize === 'large') {
      kritisScore = 60;
      kritisReason = 'kritisSector';
    }
    results.push({
      id: 'kritis',
      relevance: kritisScore >= 80 ? 'high' : kritisScore >= 40 ? 'medium' : kritisScore >= 10 ? 'low' : 'none',
      score: kritisScore,
      reasonKey: kritisReason,
    });

    // DORA
    let doraScore = 0;
    let doraReason = 'doraNA';
    if (industry === 'finance' || businessModels.includes('financialServices')) {
      doraScore = 90;
      doraReason = 'doraFinance';
    }
    if (businessModels.includes('cloudProvider') && specialCircumstances.includes('financeClients')) {
      if (doraScore < 70) {
        doraScore = 70;
        doraReason = 'doraICT';
      }
    }
    results.push({
      id: 'dora',
      relevance: doraScore >= 80 ? 'high' : doraScore >= 40 ? 'medium' : doraScore >= 10 ? 'low' : 'none',
      score: doraScore,
      reasonKey: doraReason,
    });

    // TISAX
    let tisaxScore = 0;
    let tisaxReason = 'tisaxNA';
    if (specialCircumstances.includes('tisaxRequired')) {
      tisaxScore = 95;
      tisaxReason = 'tisaxRequired';
    } else if (industry === 'automotive' || businessModels.includes('automotiveSupplier')) {
      tisaxScore = 85;
      tisaxReason = 'tisaxAuto';
    }
    results.push({
      id: 'tisax',
      relevance: tisaxScore >= 80 ? 'high' : tisaxScore >= 40 ? 'medium' : tisaxScore >= 10 ? 'low' : 'none',
      score: tisaxScore,
      reasonKey: tisaxReason,
    });

    // CRA
    let craScore = 0;
    let craReason = 'craNA';
    if (specialCircumstances.includes('iotProducts')) {
      craScore = 90;
      craReason = 'craIoT';
    } else if (businessModels.includes('digitalProducts') || businessModels.includes('manufacturing')) {
      craScore = 70;
      craReason = 'craProducts';
    }
    results.push({
      id: 'cra',
      relevance: craScore >= 80 ? 'high' : craScore >= 40 ? 'medium' : craScore >= 10 ? 'low' : 'none',
      score: craScore,
      reasonKey: craReason,
    });

    // BSI IT-Grundschutz
    let bsiScore = 40;
    let bsiReason = 'bsiFramework';
    if (nis2Score >= 80 || kritisScore >= 80) {
      bsiScore = 75;
      bsiReason = 'bsiNis2Kritis';
    }
    if (specialCircumstances.includes('iso27001')) {
      bsiScore = 80;
      bsiReason = 'bsiIso';
    }
    results.push({
      id: 'bsi-grundschutz',
      relevance: bsiScore >= 70 ? 'medium' : 'low',
      score: bsiScore,
      reasonKey: bsiReason,
    });

    return [...results].sort((a, b) => b.score - a.score);
  }

  const regMeta: Record<RegulationId, { icon: typeof Shield; tKey: string; color: string; bgColor: string; borderColor: string }> = {
    'nis2': { icon: Shield, tKey: 'nis2', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    'dsgvo': { icon: Lock, tKey: 'dsgvo', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    'kritis': { icon: Building2, tKey: 'kritis', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    'dora': { icon: Landmark, tKey: 'dora', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    'tisax': { icon: Car, tKey: 'tisax', color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
    'cra': { icon: Cpu, tKey: 'cra', color: 'text-cyan-700', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
    'bsi-grundschutz': { icon: BookOpen, tKey: 'bsiGrundschutz', color: 'text-slate-700', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
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
      return meta.tKey.toUpperCase();
    });
    return `mailto:?subject=IT-Sicherheitskompass%20Ergebnis&body=Relevante%20Regelwerke%3A%20${regNames.join('%2C%20')}%0A%0ADetails%3A%20${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}%2Fdashboard`;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Compass className="size-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

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

            {/* High relevance */}
            {highResults.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="size-3" />
                    {t('result.highRelevance')}
                  </span>
                </div>
                <div className="space-y-3">
                  {highResults.map((result) => (
                    <ResultCard key={result.id} result={result} regMeta={regMeta} t={t} tReg={tReg} />
                  ))}
                </div>
              </div>
            )}

            {/* Medium relevance */}
            {mediumResults.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-800">
                    <CircleDot className="size-3" />
                    {t('result.mediumRelevance')}
                  </span>
                </div>
                <div className="space-y-3">
                  {mediumResults.map((result) => (
                    <ResultCard key={result.id} result={result} regMeta={regMeta} t={t} tReg={tReg} />
                  ))}
                </div>
              </div>
            )}

            {/* Low relevance */}
            {lowResults.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    <Info className="size-3" />
                    {t('result.lowRelevance')}
                  </span>
                </div>
                <div className="space-y-3">
                  {lowResults.map((result) => (
                    <ResultCard key={result.id} result={result} regMeta={regMeta} t={t} tReg={tReg} dimmed />
                  ))}
                </div>
              </div>
            )}

            {/* Not relevant */}
            {noneResults.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500">
                    {t('result.notRelevant')}
                  </span>
                </div>
                <div className="space-y-3">
                  {noneResults.map((result) => (
                    <ResultCard key={result.id} result={result} regMeta={regMeta} t={t} tReg={tReg} dimmed />
                  ))}
                </div>
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

            {/* Disclaimer */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <Info className="size-4 flex-shrink-0 mt-0.5" />
                <p>{t('result.disclaimer')}</p>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 py-6 text-base" asChild>
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
          <div className="flex items-center gap-2">
            <span className="font-semibold">{tReg(`${meta.tKey}.name`)}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">{tReg(`${meta.tKey}.fullName`)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{t(`reasons.${result.reasonKey}`)}</p>
        </div>
        {!dimmed && (
          <Button variant="outline" size="sm" asChild className="flex-shrink-0">
            <Link href={`/${result.id}/schnellcheck` as any}>
              {t('result.startCheck')} <ArrowRight className="ml-1 size-3" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
