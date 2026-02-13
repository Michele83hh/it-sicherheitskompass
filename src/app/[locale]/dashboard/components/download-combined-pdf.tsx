'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, Loader2, FileText } from 'lucide-react';
import { getAllRegulations, getRegulation } from '@/lib/regulations/registry';
import { getOverlapsForRegulation, findSynergies } from '@/lib/regulations/overlaps';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { computeGenericCosts, getSizeFactor } from '@/lib/cost/generic-cost-engine';
import type { DashboardData } from '@/lib/dashboard/aggregation';
import type { MultiRegPDFPayload, MultiRegEntry, MultiRegSynergy, ConsolidatedRoadmapItem } from '@/lib/pdf/multi-reg-types';
import type { RegulationId } from '@/lib/regulations/types';
import '@/lib/regulations/init';

interface DownloadCombinedPdfProps {
  data: DashboardData;
}

export function DownloadCombinedPdf({ data }: DownloadCombinedPdfProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRegs, setSelectedRegs] = useState<Set<string>>(new Set());
  const params = useParams();
  const locale = (params?.locale as 'de' | 'en') || 'de';
  const tAll = useTranslations();

  // Find regulations that have been assessed
  const assessedRegs = data.regulations
    .filter(r => r.hasData && r.score !== null)
    .map(r => {
      const config = getRegulation(r.id);
      return {
        id: r.id,
        name: config ? tAll(config.nameKey) : r.id,
        icon: config?.icon || '',
        score: r.score || 0,
      };
    });

  // Initialize selection with all assessed regs
  const handleOpen = (open: boolean) => {
    if (open) {
      setSelectedRegs(new Set(assessedRegs.map(r => r.id)));
      setError(null);
    }
    setDialogOpen(open);
  };

  const toggleReg = (regId: string) => {
    setSelectedRegs(prev => {
      const next = new Set(prev);
      if (next.has(regId)) next.delete(regId);
      else next.add(regId);
      return next;
    });
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const selected = Array.from(selectedRegs);
      const entries: MultiRegEntry[] = [];
      let totalCostMin = 0;
      let totalCostMax = 0;

      // Consolidated roadmap buckets
      const roadmapPhase1: ConsolidatedRoadmapItem[] = [];
      const roadmapPhase2: ConsolidatedRoadmapItem[] = [];
      const roadmapPhase3: ConsolidatedRoadmapItem[] = [];
      const seenTitles = new Set<string>();

      for (const regId of selected) {
        const config = getRegulation(regId);
        if (!config) continue;

        // Get stored answers
        let answers: any[] = [];
        try {
          const raw = localStorage.getItem(`${regId}-assessment-storage`);
          if (raw) {
            const parsed = JSON.parse(raw);
            answers = parsed?.state?.answers || parsed?.answers || [];
          }
        } catch { /* ignore */ }

        if (answers.length === 0) continue;

        const regName = tAll(config.nameKey);

        // Calculate score
        const categoryQuestionCounts = config.categories.map((cat) => ({
          categoryId: cat.id,
          totalQuestions: config.questions.filter(q => q.categoryId === cat.id).length,
        }));
        const overallScore = calculateOverallScore(answers, categoryQuestionCounts);

        // Top risks (lowest scoring categories)
        const sortedCats = [...overallScore.categoryScores].sort((a, b) => a.percentage - b.percentage);
        const topRisks = sortedCats.slice(0, 3).map(cat => {
          const catConfig = config.categories.find(c => c.id === cat.categoryId);
          return {
            name: catConfig ? tAll(catConfig.shortNameKey) : cat.categoryId,
            percentage: cat.percentage,
            trafficLight: cat.trafficLight,
          };
        });

        // Top recommendations
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const topRecs = [...config.recommendations]
          .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
          .slice(0, 3)
          .map(rec => ({
            title: tAll(rec.titleKey),
            priority: rec.priority,
            effortLevel: rec.effortLevel,
          }));

        // Cost estimate
        const categoryTrafficLightMap = new Map(
          overallScore.categoryScores.map(cs => [cs.categoryId, cs.trafficLight])
        );
        let costEstimate: { min: number; max: number } | undefined;
        try {
          const costData = computeGenericCosts(config.recommendations, categoryTrafficLightMap, 100, tAll);
          costEstimate = costData.totalCost;
          totalCostMin += costData.totalCost.min;
          totalCostMax += costData.totalCost.max;
        } catch { /* ignore */ }

        // Build roadmap items (deduplicated by title)
        for (const rec of config.recommendations) {
          const title = tAll(rec.titleKey);
          const bucket = rec.effortLevel === 'quick' ? roadmapPhase1 :
                         rec.effortLevel === 'medium' ? roadmapPhase2 : roadmapPhase3;

          if (seenTitles.has(title)) {
            // Add regulation name to existing item
            const existing = [...roadmapPhase1, ...roadmapPhase2, ...roadmapPhase3].find(i => i.title === title);
            if (existing && !existing.regulations.includes(regName)) {
              existing.regulations.push(regName);
            }
          } else {
            seenTitles.add(title);
            bucket.push({
              title,
              regulations: [regName],
              effortLevel: rec.effortLevel,
              priority: rec.priority,
            });
          }
        }

        entries.push({
          regulationId: regId,
          regulationName: regName,
          regulationIcon: config.icon,
          percentage: overallScore.percentage,
          trafficLight: overallScore.trafficLight,
          answeredQuestions: overallScore.answeredQuestions,
          totalQuestions: overallScore.totalQuestions,
          topRisks,
          topRecommendations: topRecs,
          costEstimate,
        });
      }

      if (entries.length === 0) {
        setError(locale === 'de' ? 'Keine bewerteten Regelwerke ausgewählt' : 'No assessed regulations selected');
        setIsGenerating(false);
        return;
      }

      // Build synergies
      const synergies: MultiRegSynergy[] = [];
      const selectedIds = entries.map(e => e.regulationId as RegulationId);
      const foundSynergies = findSynergies(selectedIds);
      for (const syn of foundSynergies) {
        const regAConfig = getRegulation(syn.regA);
        const regBConfig = getRegulation(syn.regB);
        if (!regAConfig || !regBConfig) continue;
        synergies.push({
          regAName: tAll(regAConfig.nameKey),
          regBName: tAll(regBConfig.nameKey),
          overlapPercent: syn.overlapPercent,
          sharedTopics: syn.sharedMeasureKeys.map(key => {
            try { return tAll(key); } catch { return key.split('.').pop() || key; }
          }),
        });
      }

      const averageScore = entries.reduce((sum, e) => sum + e.percentage, 0) / entries.length;
      const generatedDate = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
        dateStyle: 'long',
      }).format(new Date());

      const payload: MultiRegPDFPayload = {
        locale,
        generatedDate,
        entries,
        synergies,
        consolidatedRoadmap: {
          phase1: roadmapPhase1.sort((a, b) => {
            const po = { high: 0, medium: 1, low: 2 };
            return po[a.priority] - po[b.priority];
          }),
          phase2: roadmapPhase2,
          phase3: roadmapPhase3,
        },
        totalCost: totalCostMin > 0 ? { min: totalCostMin, max: totalCostMax } : undefined,
        averageScore,
        messages: {},
      };

      const response = await fetch('/api/pdf/multi-reg-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `IT-Sicherheitskompass-Gesamtbericht-${timestamp}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDialogOpen(false);
    } catch (err) {
      console.error('Combined PDF download failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  if (assessedRegs.length === 0) return null;

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="size-4" />
          {locale === 'de' ? 'Gesamtbericht' : 'Combined Report'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {locale === 'de' ? 'Gesamtbericht herunterladen' : 'Download Combined Report'}
          </DialogTitle>
          <DialogDescription>
            {locale === 'de'
              ? 'Wählen Sie die Regelwerke für den kombinierten PDF-Report.'
              : 'Select regulations for the combined PDF report.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2 max-h-[50vh] overflow-y-auto">
          {assessedRegs.map((reg) => (
            <div key={reg.id} className="flex items-center gap-3 py-1.5">
              <Checkbox
                id={`multi-reg-${reg.id}`}
                checked={selectedRegs.has(reg.id)}
                onCheckedChange={() => toggleReg(reg.id)}
              />
              <label htmlFor={`multi-reg-${reg.id}`} className="flex items-center gap-2 text-sm cursor-pointer flex-1">
                <span>{reg.icon}</span>
                <span className="font-medium">{reg.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {Math.round(reg.score)}%
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          {locale === 'de'
            ? `${selectedRegs.size} von ${assessedRegs.length} Regelwerken ausgewählt`
            : `${selectedRegs.size} of ${assessedRegs.length} regulations selected`}
        </div>

        <DialogFooter>
          <Button
            onClick={handleDownload}
            disabled={isGenerating || selectedRegs.size === 0}
            className="w-full sm:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {locale === 'de' ? 'PDF wird erstellt...' : 'Generating PDF...'}
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {locale === 'de' ? 'PDF generieren' : 'Generate PDF'}
              </>
            )}
          </Button>
        </DialogFooter>

        {error && (
          <p className="text-sm text-red-600 text-center">
            Error: {error}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
