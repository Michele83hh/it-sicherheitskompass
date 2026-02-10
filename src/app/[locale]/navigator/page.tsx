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
  ShieldAlert,
  Award,
  BadgeCheck,
  CreditCard,
  Cloud,
  Clock,
} from 'lucide-react';

type RegulationId = 'nis2' | 'dsgvo' | 'kritis' | 'dora' | 'tisax' | 'cra' | 'bsi-grundschutz' | 'iso27001' | 'soc2' | 'pci-dss' | 'c5';

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
    const results: RegulationResult[] = [];

    // NIS2
    const nis2Sectors = ['energy', 'transport', 'finance', 'health', 'water', 'digital-infrastructure', 'ict-services', 'space', 'postal', 'waste', 'manufacturing', 'food', 'chemicals', 'research'];
    const isNis2Sector = nis2Sectors.includes(industry);
    const isLargeEnough = companySize === 'medium' || companySize === 'large';
    const isSupplier = businessModels.includes('supplierForRegulated');
    let nis2Score = 0;
    let nis2Reason = 'nis2Check';
    if (specialCircumstances.includes('kritis')) {
      nis2Score = 95;
      nis2Reason = 'nis2Critical';
    } else if (isNis2Sector && isLargeEnough) {
      nis2Score = 90;
      nis2Reason = 'nis2SectorSize';
    } else if (isSupplier) {
      nis2Score = 65;
      nis2Reason = 'nis2SupplyChain';
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
    if (isSupplier && specialCircumstances.includes('financeClients') && doraScore < 60) {
      doraScore = 60;
      doraReason = 'doraSupplyChain';
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

    // ISO 27001
    let iso27001Score = 30;
    let iso27001Reason = 'iso27001Framework';
    if (specialCircumstances.includes('iso27001')) {
      iso27001Score = 90;
      iso27001Reason = 'iso27001Already';
    } else if (nis2Score >= 80 || kritisScore >= 80 || doraScore >= 80) {
      iso27001Score = 75;
      iso27001Reason = 'iso27001Compliance';
    } else if (isLargeEnough) {
      iso27001Score = 55;
      iso27001Reason = 'iso27001Size';
    }
    results.push({
      id: 'iso27001',
      relevance: iso27001Score >= 80 ? 'high' : iso27001Score >= 40 ? 'medium' : 'low',
      score: iso27001Score,
      reasonKey: iso27001Reason,
    });

    // SOC 2
    let soc2Score = 0;
    let soc2Reason = 'soc2NA';
    if (businessModels.includes('saasProvider') || businessModels.includes('cloudProvider')) {
      soc2Score = 85;
      soc2Reason = 'soc2Cloud';
    } else if (businessModels.includes('digitalServices')) {
      soc2Score = 60;
      soc2Reason = 'soc2Digital';
    } else if (isSupplier) {
      soc2Score = 40;
      soc2Reason = 'soc2Supplier';
    }
    results.push({
      id: 'soc2',
      relevance: soc2Score >= 80 ? 'high' : soc2Score >= 40 ? 'medium' : soc2Score >= 10 ? 'low' : 'none',
      score: soc2Score,
      reasonKey: soc2Reason,
    });

    // PCI DSS
    let pciScore = 0;
    let pciReason = 'pciNA';
    if (specialCircumstances.includes('pciRequired') || businessModels.includes('paymentProcessing')) {
      pciScore = 95;
      pciReason = 'pciRequired';
    } else if (industry === 'finance' || industry === 'retail') {
      pciScore = 70;
      pciReason = 'pciSector';
    } else if (businessModels.includes('digitalProducts') || businessModels.includes('digitalServices')) {
      pciScore = 35;
      pciReason = 'pciDigital';
    }
    results.push({
      id: 'pci-dss',
      relevance: pciScore >= 80 ? 'high' : pciScore >= 40 ? 'medium' : pciScore >= 10 ? 'low' : 'none',
      score: pciScore,
      reasonKey: pciReason,
    });

    // C5
    let c5Score = 0;
    let c5Reason = 'c5NA';
    if (businessModels.includes('cloudProvider')) {
      c5Score = 85;
      c5Reason = 'c5Cloud';
    } else if (businessModels.includes('saasProvider')) {
      c5Score = 75;
      c5Reason = 'c5Saas';
    }
    if (specialCircumstances.includes('publicSectorClients') && c5Score < 90) {
      c5Score = 90;
      c5Reason = 'c5PublicSector';
    }
    results.push({
      id: 'c5',
      relevance: c5Score >= 80 ? 'high' : c5Score >= 40 ? 'medium' : c5Score >= 10 ? 'low' : 'none',
      score: c5Score,
      reasonKey: c5Reason,
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
    'iso27001': { icon: Award, tKey: 'iso27001', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
    'soc2': { icon: BadgeCheck, tKey: 'soc2', color: 'text-sky-700', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
    'pci-dss': { icon: CreditCard, tKey: 'pciDss', color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
    'c5': { icon: Cloud, tKey: 'c5', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
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
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Compass className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
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

            {/* Disclaimer (prominent, before results) */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="flex gap-2">
                <Info className="size-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <p>{t('result.disclaimer')}</p>
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
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold whitespace-nowrap">{tReg(`${meta.tKey}.name`)}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline truncate">{tReg(`${meta.tKey}.fullName`)}</span>
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
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${result.id}/schnellcheck` as any}>
                {t('result.startCheck')} <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
            <Link
              href={`/${result.id}/assessment` as any}
              className="text-[11px] text-center text-muted-foreground hover:text-primary transition-colors"
            >
              {t('result.fullAnalysis')}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
