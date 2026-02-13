'use client';

import { useTranslations } from 'next-intl';
import { Briefcase, X, AlertTriangle, CheckCircle2, Zap, ArrowRight, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OverallScore } from '@/lib/scoring/types';
import type { TrafficLight, BaseRecommendation } from '@/lib/regulations/types';

interface CategoryData {
  categoryScore: { categoryId: string; percentage: number; trafficLight: 'red' | 'yellow' | 'green' };
  category: { id: string; nameKey: string };
  recommendations: Array<{ id: string; titleKey: string; priority: 'high' | 'medium' | 'low'; effortLevel: 'quick' | 'medium' | 'strategic' }>;
}

interface QuickWinItem {
  recommendation: BaseRecommendation;
  categoryName: string;
  categoryTrafficLight: TrafficLight;
}

interface ExecutiveSummaryModalProps {
  open: boolean;
  onClose: () => void;
  overallScore: OverallScore;
  sortedCategories: CategoryData[];
  quickWins: QuickWinItem[];
  regulationName: string;
}

const TRAFFIC_COLORS = {
  red: { bg: 'bg-red-100', text: 'text-red-700', label: 'Kritisch' },
  yellow: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Teilweise' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Gut' },
};

export function ExecutiveSummaryModal({ open, onClose, overallScore, sortedCategories, quickWins, regulationName }: ExecutiveSummaryModalProps) {
  const t = useTranslations();

  if (!open) return null;

  const redCategories = sortedCategories.filter((c) => c.categoryScore.trafficLight === 'red');
  const yellowCategories = sortedCategories.filter((c) => c.categoryScore.trafficLight === 'yellow');
  const greenCategories = sortedCategories.filter((c) => c.categoryScore.trafficLight === 'green');

  const totalRecommendations = sortedCategories.reduce((sum, c) => sum + c.recommendations.length, 0);
  const highPriorityCount = sortedCategories.flatMap((c) => c.recommendations).filter((r) => r.priority === 'high').length;
  const quickEffortCount = sortedCategories.flatMap((c) => c.recommendations).filter((r) => r.effortLevel === 'quick').length;

  // Score level
  const scoreLevel = overallScore.percentage >= 75 ? 'good' : overallScore.percentage >= 50 ? 'moderate' : 'critical';
  const scoreLevelColors = {
    good: 'text-emerald-600',
    moderate: 'text-amber-600',
    critical: 'text-red-600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-slate-900 px-6 py-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Briefcase className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t('results.chefSummary.title')}</h2>
              <p className="text-sm text-slate-300">{regulationName}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Score Overview */}
          <div className="text-center">
            <div className={`text-5xl font-bold ${scoreLevelColors[scoreLevel]}`}>
              {overallScore.percentage}%
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{t('results.chefSummary.maturityScore')}</p>
            <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden max-w-xs mx-auto">
              <div
                className={`h-full rounded-full transition-all ${overallScore.trafficLight === 'red' ? 'bg-red-500' : overallScore.trafficLight === 'yellow' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${overallScore.percentage}%` }}
              />
            </div>
          </div>

          {/* Traffic Light Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{redCategories.length}</div>
              <p className="text-xs text-red-700">{t('results.chefSummary.critical')}</p>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-center">
              <div className="text-2xl font-bold text-amber-600">{yellowCategories.length}</div>
              <p className="text-xs text-amber-700">{t('results.chefSummary.partial')}</p>
            </div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-center">
              <div className="text-2xl font-bold text-emerald-600">{greenCategories.length}</div>
              <p className="text-xs text-emerald-700">{t('results.chefSummary.good')}</p>
            </div>
          </div>

          {/* Critical Areas */}
          {redCategories.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 font-bold text-sm mb-3">
                <AlertTriangle className="size-4 text-red-500" />
                {t('results.chefSummary.criticalAreas')}
              </h3>
              <div className="space-y-2">
                {redCategories.slice(0, 3).map((cat) => (
                  <div key={cat.categoryScore.categoryId} className="flex items-center justify-between rounded-md bg-red-50 px-3 py-2 text-sm">
                    <span className="font-medium text-red-800">{t(cat.category.nameKey)}</span>
                    <span className="text-red-600 font-bold">{cat.categoryScore.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                <Shield className="size-4 text-primary" />
                {t('results.chefSummary.recommendations')}
              </div>
              <p className="text-2xl font-bold">{totalRecommendations}</p>
              <p className="text-xs text-muted-foreground">{t('results.chefSummary.highPriority', { count: highPriorityCount })}</p>
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                <Zap className="size-4 text-amber-500" />
                {t('results.chefSummary.quickWinsCount')}
              </div>
              <p className="text-2xl font-bold">{quickEffortCount}</p>
              <p className="text-xs text-muted-foreground">{t('results.chefSummary.quickWinsDesc')}</p>
            </div>
          </div>

          {/* Top 3 Quick Wins */}
          {quickWins.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 font-bold text-sm mb-3">
                <Zap className="size-4 text-amber-500" />
                {t('results.chefSummary.topQuickWins')}
              </h3>
              <div className="space-y-2">
                {quickWins.slice(0, 3).map((qw, idx) => (
                  <div key={qw.recommendation.id} className="flex gap-3 rounded-md bg-muted/50 px-3 py-2 text-sm">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span>{t(qw.recommendation.titleKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
            <h3 className="flex items-center gap-2 font-bold text-sm mb-3">
              <TrendingUp className="size-4 text-primary" />
              {t('results.chefSummary.nextSteps')}
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex gap-2"><ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" /> {t('results.chefSummary.step1')}</p>
              <p className="flex gap-2"><ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" /> {t('results.chefSummary.step2')}</p>
              <p className="flex gap-2"><ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" /> {t('results.chefSummary.step3')}</p>
            </div>
          </div>

          {/* Print/Close */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => window.print()}>
              {t('results.chefSummary.print')}
            </Button>
            <Button onClick={onClose}>{t('results.chefSummary.close')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
