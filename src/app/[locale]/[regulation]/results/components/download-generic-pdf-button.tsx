'use client';

import { useState, useEffect } from 'react';
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
import { useRegulationConfig, getQuestionsByCategory, getRecommendationsByCategory } from '@/hooks/useRegulationConfig';
import { useRegulationStores } from '@/hooks/useRegulationStores';
import { useProgressStore } from '@/stores/progress-store';
import { createPdfSectionsStore, type GenericPdfSectionKey } from '@/stores/store-factory';
import { calculateOverallScore } from '@/lib/scoring/engine';
import type { OverallScore } from '@/lib/regulations/types';
import type { PDFPayload, PDFCategoryResult, PDFRecommendation, PDFRoadmapPhase, PDFCrossRegOverlap } from '@/lib/pdf/types';
import { Download, Loader2, Lock } from 'lucide-react';

interface DownloadGenericPdfButtonProps {
  overallScore: OverallScore;
}

export default function DownloadGenericPdfButton({ overallScore }: DownloadGenericPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const locale = params?.locale as 'de' | 'en';
  const regulation = params?.regulation as string;

  const config = useRegulationConfig();
  const { assessmentStore } = useRegulationStores(regulation);
  const answers = assessmentStore((state) => state.answers);

  const t = useTranslations('results');
  const tAll = useTranslations();
  const tPdf = useTranslations('pdf');

  const { getProgress, getCompletionPercentage, getStatusCounts } = useProgressStore();

  // Generic PDF sections store per regulation
  const pdfSectionsStore = createPdfSectionsStore(regulation);
  const sections = pdfSectionsStore((state) => state.sections);
  const toggleSection = pdfSectionsStore((state) => state.toggleSection);
  const selectAll = pdfSectionsStore((state) => state.selectAll);
  const deselectAll = pdfSectionsStore((state) => state.deselectAll);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optional section keys for generic regulations
  const optionalSectionKeys: GenericPdfSectionKey[] = ['roadmap', 'progress', 'costSummary', 'crossRegOverlap'];

  // Section labels (reuse existing i18n where possible)
  const sectionLabels: Record<GenericPdfSectionKey, string> = {
    roadmap: tPdf('sectionSelector.sections.roadmap'),
    progress: tPdf('sectionSelector.sections.progress'),
    costSummary: tPdf('sectionSelector.sections.costSummary'),
    crossRegOverlap: locale === 'de' ? 'Regelwerks-Synergien' : 'Regulation Synergies',
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const regName = tAll(config.nameKey);

      const includeRoadmap = sections.roadmap;
      const includeProgress = sections.progress;
      const includeCost = sections.costSummary;

      // Build category results
      const categoryResults: PDFCategoryResult[] = overallScore.categoryScores.map((catScore) => {
        const category = config.categories.find((c) => c.id === catScore.categoryId)!;
        const categoryName = tAll(category.nameKey);
        const shortName = tAll(category.shortNameKey);
        const verdict = t(`verdict.${catScore.trafficLight}` as 'verdict.red');

        return {
          categoryId: catScore.categoryId,
          categoryName,
          shortName,
          percentage: catScore.percentage,
          trafficLight: catScore.trafficLight,
          euArticle: '',
          bsigParagraph: '',
          verdict,
        };
      });

      // Build recommendations
      const allRecommendations: PDFRecommendation[] = [];
      const trafficLightOrder = { red: 0, yellow: 1, green: 2 };
      const priorityOrder = { high: 0, medium: 1, low: 2 };

      [...overallScore.categoryScores]
        .sort((a, b) => trafficLightOrder[a.trafficLight] - trafficLightOrder[b.trafficLight])
        .forEach((catScore) => {
          const category = config.categories.find((c) => c.id === catScore.categoryId)!;
          const categoryName = tAll(category.nameKey);
          const recommendations = getRecommendationsByCategory(config, catScore.categoryId);

          [...recommendations]
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
            .forEach((rec) => {
              allRecommendations.push({
                categoryId: catScore.categoryId,
                categoryName,
                title: tAll(rec.titleKey),
                description: tAll(rec.descriptionKey),
                firstStep: tAll(rec.firstStepKey),
                priority: rec.priority,
                effortLevel: rec.effortLevel,
                legalReference: rec.legalReference,
                bsiReference: (rec as { bsiReference?: string }).bsiReference || '',
              });
            });
        });

      // Flatten translation messages for PDF
      const messages: Record<string, string> = {};

      // Core PDF messages
      messages['pdf.title'] = `${regName} — Compliance Report`;
      messages['pdf.subtitle'] = locale === 'de'
        ? `Ergebnisse der ${regName}-Analyse`
        : `Results of ${regName} analysis`;
      messages['pdf.disclaimer'] = tPdf('disclaimer');
      messages['pdf.rechtsstand'] = tPdf('rechtsstand');
      messages['pdf.rechtstandDatum'] = locale === 'de' ? '2024/2025' : '2024/2025';
      messages['pdf.generatedAt'] = tPdf('generatedAt');
      messages['pdf.companyProfile'] = tPdf('companyProfile');
      messages['pdf.sector'] = tPdf('sector');
      messages['pdf.employees'] = tPdf('employees');
      messages['pdf.annualRevenue'] = tPdf('annualRevenue');
      messages['pdf.overallScore'] = tPdf('overallScore');
      messages['pdf.completionRate'] = tPdf('completionRate');
      messages['pdf.answeredQuestions'] = tPdf('answeredQuestions');
      messages['pdf.categories'] = tPdf('categories');
      messages['pdf.categoryTableHeaders.nr'] = tPdf('categoryTableHeaders.nr');
      messages['pdf.categoryTableHeaders.category'] = tPdf('categoryTableHeaders.category');
      messages['pdf.categoryTableHeaders.score'] = tPdf('categoryTableHeaders.score');
      messages['pdf.categoryTableHeaders.status'] = tPdf('categoryTableHeaders.status');
      messages['pdf.categoryTableHeaders.legalBasis'] = tPdf('categoryTableHeaders.legalBasis');
      messages['pdf.recommendations'] = tPdf('recommendations');
      messages['pdf.priority.high'] = tPdf('priority.high');
      messages['pdf.priority.medium'] = tPdf('priority.medium');
      messages['pdf.priority.low'] = tPdf('priority.low');
      messages['pdf.effortLevel.quick'] = tPdf('effortLevel.quick');
      messages['pdf.effortLevel.medium'] = tPdf('effortLevel.medium');
      messages['pdf.effortLevel.strategic'] = tPdf('effortLevel.strategic');
      messages['pdf.firstStep'] = tPdf('firstStep');
      messages['pdf.valueProposition'] = locale === 'de'
        ? 'Ihr individueller Compliance-Status — verständlich, umsetzbar, praxisnah.'
        : 'Your individual compliance status — clear, actionable, practical.';

      // Hero claim
      messages['pdf.cover.heroClaimTitle'] = locale === 'de'
        ? 'Was dieses Ergebnis für Sie bedeutet'
        : 'What this result means for you';
      messages['pdf.cover.heroClaim1'] = locale === 'de'
        ? `Ihr aktueller ${regName}-Reifegrad auf Basis einer strukturierten Selbstbewertung`
        : `Your current ${regName} maturity level based on a structured self-assessment`;
      messages['pdf.cover.heroClaim2'] = locale === 'de'
        ? 'Priorisierte Handlungsempfehlungen mit konkreten ersten Schritten'
        : 'Prioritized recommendations with concrete first steps';
      messages['pdf.cover.heroClaim3'] = locale === 'de'
        ? 'Umsetzungsfahrplan in drei Phasen für planbare Verbesserung'
        : 'Implementation roadmap in three phases for structured improvement';

      // Trust anchor
      messages['pdf.cover.trustAnchor'] = locale === 'de'
        ? `Bewertungsgrundlage: ${regName}-Anforderungen`
        : `Assessment basis: ${regName} requirements`;

      // Summary
      messages['pdf.summary.title'] = locale === 'de' ? 'Auf einen Blick' : 'At a Glance';
      const pct = overallScore.percentage;
      if (pct <= 25) {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — erheblicher Handlungsbedarf`
          : `${Math.round(pct)}% readiness — significant action needed`;
      } else if (pct <= 50) {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — deutlicher Verbesserungsbedarf`
          : `${Math.round(pct)}% readiness — substantial improvement needed`;
      } else if (pct <= 75) {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — gute Basis, gezielte Lücken schließen`
          : `${Math.round(pct)}% readiness — solid foundation, close targeted gaps`;
      } else {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — fortgeschrittene Compliance`
          : `${Math.round(pct)}% readiness — advanced compliance posture`;
      }

      messages['pdf.summary.classification'] = locale === 'de'
        ? `${regName}-Analyse basierend auf ${overallScore.answeredQuestions} beantworteten Fragen`
        : `${regName} analysis based on ${overallScore.answeredQuestions} answered questions`;

      const topRec = allRecommendations.find(r => r.priority === 'high');
      messages['pdf.summary.topAction'] = locale === 'de'
        ? `Wichtigste Maßnahme: ${topRec?.title || '-'}`
        : `Top priority: ${topRec?.title || '-'}`;

      // Quick wins for cover
      const quickWins = allRecommendations
        .filter(r => r.effortLevel === 'quick')
        .slice(0, 3);
      quickWins.forEach((qw, idx) => {
        messages[`pdf.cover.quickWin${idx + 1}`] = qw.title;
      });
      messages['pdf.cover.quickWinsTitle'] = locale === 'de' ? 'Sofort umsetzbar' : 'Quick Wins';

      // CTA messages
      messages['pdf.cta.title'] = tPdf('cta.title');
      messages['pdf.cta.subtitle'] = tPdf('cta.subtitle');
      messages['pdf.cta.option1Title'] = tPdf('cta.option1Title');
      messages['pdf.cta.option1Text'] = tPdf('cta.option1Text');
      messages['pdf.cta.option2Title'] = tPdf('cta.option2Title');
      messages['pdf.cta.option2Text'] = tPdf('cta.option2Text');
      messages['pdf.cta.option3Title'] = tPdf('cta.option3Title');
      messages['pdf.cta.option3Text'] = tPdf('cta.option3Text');
      messages['pdf.cta.currentLabel'] = tPdf('cta.currentLabel');
      messages['pdf.cta.targetLabel'] = tPdf('cta.targetLabel');
      messages['pdf.cta.urgencyTitle'] = tPdf('cta.urgencyTitle');
      messages['pdf.cta.urgencyText'] = tPdf('cta.urgencyText');
      messages['pdf.cta.starterTitle'] = tPdf('cta.starterTitle');
      messages['pdf.cta.starterText'] = tPdf('cta.starterText');
      messages['pdf.cta.contactTitle'] = tPdf('cta.contactTitle');
      messages['pdf.cta.contactSubtitle'] = tPdf('cta.contactSubtitle');
      messages['pdf.cta.contactPlaceholder'] = tPdf('cta.contactPlaceholder');
      messages['pdf.cta.contactDetails'] = tPdf('cta.contactDetails');
      messages['pdf.cta.footerNote'] = tPdf('cta.footerNote');

      // Glossary messages
      messages['pdf.glossary.title'] = tPdf('glossary.title');
      messages['pdf.glossary.intro'] = tPdf('glossary.intro');
      const glossaryTerms = ['isms', 'bia', 'rto', 'rpo', 'bcm', 'mfa', 'pam', 'siem', 'soc', 'ioc', 'patchMgmt', 'zeroTrust', 'riskTreatment', 'audit', 'compliance'];
      for (const term of glossaryTerms) {
        messages[`pdf.glossary.${term}.term`] = tPdf(`glossary.${term}.term`);
        messages[`pdf.glossary.${term}.def`] = tPdf(`glossary.${term}.def`);
      }

      // Progress messages
      messages['pdf.progress.title'] = locale === 'de' ? 'Umsetzungsfortschritt' : 'Implementation Progress';
      messages['pdf.progress.overall'] = locale === 'de' ? 'Gesamtfortschritt' : 'Overall Progress';
      messages['pdf.progress.notStarted'] = locale === 'de' ? 'Offen' : 'Not Started';
      messages['pdf.progress.inProgress'] = locale === 'de' ? 'In Arbeit' : 'In Progress';
      messages['pdf.progress.completed'] = locale === 'de' ? 'Abgeschlossen' : 'Completed';
      messages['pdf.progress.status.not-started'] = locale === 'de' ? 'Offen' : 'Not Started';
      messages['pdf.progress.status.in-progress'] = locale === 'de' ? 'In Arbeit' : 'In Progress';
      messages['pdf.progress.status.completed'] = locale === 'de' ? 'Abgeschlossen' : 'Completed';
      messages['pdf.progress.startPointTitle'] = locale === 'de' ? 'Ihr Startpunkt' : 'Your Starting Point';
      messages['pdf.progress.startPointText'] = locale === 'de'
        ? 'Sie haben noch keine Maßnahme als umgesetzt markiert — das ist Ihr Ausgangspunkt.'
        : 'You haven\'t marked any measures as implemented yet — this is your starting point.';

      // Mini-CTA messages
      messages['pdf.miniCta.title'] = tPdf('miniCta.title');
      messages['pdf.miniCta.text'] = tPdf('miniCta.text');

      // Executive summary messages
      messages['pdf.executive.title'] = tPdf('executive.title');
      messages['pdf.executive.riskTitle'] = tPdf('executive.riskTitle');
      messages['pdf.executive.quickWinTitle'] = tPdf('executive.quickWinTitle');
      messages['pdf.executive.quickWinDays'] = tPdf('executive.quickWinDays');
      messages['pdf.executive.totalBasisschutz'] = tPdf('executive.totalBasisschutz');
      messages['pdf.executive.ctaLine'] = tPdf('executive.ctaLine');
      messages['pdf.executive.startHint'] = tPdf('executive.startHint');
      messages['pdf.executive.targetLabel'] = tPdf('executive.targetLabel');
      messages['pdf.executive.glossaryRef'] = tPdf('executive.glossaryRef');
      messages['pdf.executive.optionA.title'] = tPdf('executive.optionA.title');
      messages['pdf.executive.optionA.text'] = tPdf('executive.optionA.text');
      messages['pdf.executive.optionB.title'] = tPdf('executive.optionB.title');
      messages['pdf.executive.optionB.text'] = tPdf('executive.optionB.text');
      messages['pdf.executive.optionC.title'] = tPdf('executive.optionC.title');
      messages['pdf.executive.optionC.text'] = tPdf('executive.optionC.text');

      // Cost messages (for generic cost section)
      messages['pdf.cost.title'] = locale === 'de' ? 'Kostenschätzung' : 'Cost Estimation';
      messages['pdf.cost.internalDays'] = locale === 'de' ? 'Interner Aufwand (Personentage)' : 'Internal Effort (Person-Days)';
      messages['pdf.cost.externalCost'] = locale === 'de' ? 'Externe Beratung' : 'External Consulting';
      messages['pdf.cost.toolsCost'] = locale === 'de' ? 'Tools & Lizenzen (p.a.)' : 'Tools & Licenses (p.a.)';
      messages['pdf.cost.totalEstimated'] = locale === 'de' ? 'Geschätzte Gesamtkosten' : 'Estimated Total Cost';
      messages['pdf.cost.days'] = locale === 'de' ? 'Tage' : 'days';
      messages['pdf.cost.perYear'] = locale === 'de' ? '/Jahr' : '/year';
      messages['pdf.cost.disclaimer'] = tPdf('cost.disclaimer');

      // Build progress data (if selected)
      let progressData: PDFPayload['progress'] = undefined;
      if (includeProgress) {
        const allRecObjects = config.categories.flatMap((cat) => getRecommendationsByCategory(config, cat.id));
        const total = allRecObjects.length;
        const counts = getStatusCounts();
        const notStarted = total - counts.inProgress - counts.completed;

        progressData = {
          completionPercentage: getCompletionPercentage(total),
          notStarted,
          inProgress: counts.inProgress,
          completed: counts.completed,
          items: allRecObjects.map((rec) => {
            const progress = getProgress(rec.id);
            return {
              title: tAll(rec.titleKey),
              status: progress?.status || 'not-started',
            };
          }),
        };
      }

      // Build cost summary data (if selected) using generic cost engine
      let costSummaryData: PDFPayload['costSummary'] = undefined;
      if (includeCost) {
        try {
          const { computeGenericCosts } = await import('@/lib/cost/generic-cost-engine');
          const allRecObjects = config.categories.flatMap((cat) => getRecommendationsByCategory(config, cat.id));

          // Get employee count from navigator localStorage
          let employees = 0;
          try {
            const raw = localStorage.getItem('navigator-results-storage');
            if (raw) {
              const data = JSON.parse(raw);
              employees = data?.employees || data?.companySize || 0;
              if (typeof employees === 'string') {
                employees = parseInt(employees) || 0;
              }
            }
          } catch { /* ignore */ }

          const categoryTrafficLightMap = new Map(
            overallScore.categoryScores.map((cs) => [cs.categoryId, cs.trafficLight])
          );

          costSummaryData = computeGenericCosts(allRecObjects, categoryTrafficLightMap, employees, tAll);
        } catch {
          // Generic cost engine not available yet — skip silently
        }
      }

      // Navigator data for company profile
      let navigatorData: { industry: string; companySize: string } | null = null;
      try {
        const raw = localStorage.getItem('navigator-results-storage');
        if (raw) navigatorData = JSON.parse(raw);
      } catch { /* ignore */ }

      // Company profile (generic — no NIS2 classification)
      const sectorName = navigatorData?.industry || (locale === 'de' ? 'Nicht angegeben' : 'Not specified');

      // Analysis depth
      const totalQuestions = config.categories.reduce((sum, cat) =>
        sum + getQuestionsByCategory(config, cat.id).length, 0);
      const analysisDepth: 'core' | 'full' = answers.length >= totalQuestions ? 'full' : 'core';

      // Build executive summary
      const sortedCats = [...categoryResults].sort((a, b) => a.percentage - b.percentage);
      const topRisks = sortedCats.slice(0, 3).map((cat) => ({
        name: cat.categoryName,
        percentage: cat.percentage,
        trafficLight: cat.trafficLight,
      }));
      const quickWinItems = allRecommendations
        .filter(r => r.effortLevel === 'quick')
        .slice(0, 5)
        .map(r => ({ title: r.title, days: '2–5', cost: '' }));

      // Build roadmap from effort levels (if selected)
      let roadmapData: PDFPayload['roadmap'] = undefined;
      if (includeRoadmap) {
        const phaseLabels = locale === 'de'
          ? ['Phase 1: Sofortmaßnahmen', 'Phase 2: Kernmaßnahmen', 'Phase 3: Strategische Maßnahmen']
          : ['Phase 1: Immediate Actions', 'Phase 2: Core Measures', 'Phase 3: Strategic Measures'];
        const phaseDescs = locale === 'de'
          ? ['Quick Wins — ohne externes Budget umsetzbar', 'Mittelfristige Verbesserungen in 3–6 Monaten', 'Langfristige strategische Investitionen']
          : ['Quick wins — implementable without external budget', 'Medium-term improvements in 3–6 months', 'Long-term strategic investments'];
        const phaseTimeframes = locale === 'de'
          ? ['0–3 Monate', '3–6 Monate', '6–12 Monate']
          : ['0–3 months', '3–6 months', '6–12 months'];
        const effortToPhase: Record<string, number> = { quick: 0, medium: 1, strategic: 2 };
        const urgencyMap: Record<string, string> = { high: 'critical', medium: 'high', low: 'medium' };

        const roadmapBuckets: PDFRoadmapPhase[] = [0, 1, 2].map((i) => ({
          title: phaseLabels[i],
          description: phaseDescs[i],
          timeframe: phaseTimeframes[i],
          itemCount: 0,
          items: [],
        }));

        for (const rec of allRecommendations) {
          const phaseIdx = effortToPhase[rec.effortLevel] ?? 2;
          roadmapBuckets[phaseIdx].items.push({
            title: rec.title,
            urgency: urgencyMap[rec.priority] || 'medium',
          });
          roadmapBuckets[phaseIdx].itemCount++;
        }

        // Roadmap messages
        messages['pdf.roadmap.title'] = locale === 'de' ? 'Umsetzungsfahrplan' : 'Implementation Roadmap';
        messages['pdf.roadmap.subtitle'] = locale === 'de'
          ? 'Strukturierter Drei-Phasen-Plan'
          : 'Structured three-phase plan';
        messages['pdf.roadmap.timelineTitle'] = locale === 'de' ? 'Zeitplan' : 'Timeline';

        // Filter out empty phases
        const roadmapPhases = roadmapBuckets.filter(p => p.items.length > 0);
        if (roadmapPhases.length > 0) {
          roadmapData = { phases: roadmapPhases };
        }
      }

      // Build cross-regulation overlaps (if selected)
      let crossRegOverlaps: PDFCrossRegOverlap[] | undefined = undefined;
      if (sections.crossRegOverlap) {
        try {
          const { getOverlapsForRegulation } = await import('@/lib/regulations/overlaps');
          const { getRegulation } = await import('@/lib/regulations/registry');
          await import('@/lib/regulations/init');
          const overlaps = getOverlapsForRegulation(regulation as any);
          if (overlaps.length > 0) {
            crossRegOverlaps = overlaps
              .sort((a, b) => b.overlapPercent - a.overlapPercent)
              .map((overlap) => {
                const otherRegId = overlap.regA === regulation ? overlap.regB : overlap.regA;
                const otherConfig = getRegulation(otherRegId);
                if (!otherConfig) return null;

                let hasAssessment = false;
                try {
                  const raw = localStorage.getItem(`${otherRegId}-assessment-storage`);
                  if (raw) {
                    const data = JSON.parse(raw);
                    hasAssessment = data?.answers?.length > 0;
                  }
                } catch { /* ignore */ }

                const sharedTopics = overlap.sharedMeasureKeys.map((key) => {
                  try { return tAll(key); } catch { return key.split('.').pop() || key; }
                });

                return {
                  targetRegulation: tAll(otherConfig.nameKey),
                  overlapPercent: overlap.overlapPercent,
                  sharedTopics,
                  hasAssessment,
                } as PDFCrossRegOverlap;
              })
              .filter(Boolean) as PDFCrossRegOverlap[];
          }
        } catch { /* ignore if overlaps module fails */ }
      }

      // Build payload
      const payload: PDFPayload = {
        locale,
        analysisDepth,
        regulationId: regulation,
        regulationName: regName,
        company: {
          sectorName,
          employees: 0,
          annualRevenue: 0,
        },
        overallScore: {
          percentage: overallScore.percentage,
          trafficLight: overallScore.trafficLight,
          completionRate: overallScore.completionRate,
          answeredQuestions: overallScore.answeredQuestions,
          totalQuestions: overallScore.totalQuestions,
        },
        categories: categoryResults,
        recommendations: allRecommendations,
        messages,
        executiveSummary: {
          percentage: overallScore.percentage,
          trafficLight: overallScore.trafficLight,
          topRisks,
          quickWins: quickWinItems,
          basisschutzTotal: costSummaryData?.tierTotals?.basisschutz || { min: 0, max: 0 },
        },
        roadmap: roadmapData,
        progress: progressData,
        costSummary: costSummaryData,
        crossRegOverlaps,
      };

      // POST to API
      const response = await fetch('/api/pdf/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      // Download the blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `${regName.replace(/[^a-zA-Z0-9äöüÄÖÜß\s-]/g, '').replace(/\s+/g, '-')}-Report-${timestamp}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDialogOpen(false);
    } catch (err) {
      console.error('PDF download failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Core sections (always included, not deselectable)
  const coreSections = [
    { key: 'cover', label: tPdf('sectionSelector.sections.cover') },
    { key: 'executive', label: tPdf('executive.title') },
    { key: 'categories', label: tPdf('sectionSelector.sections.categories') },
    { key: 'recommendations', label: tPdf('sectionSelector.sections.recommendations') },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            <Download className="mr-2 h-4 w-4" />
            {t('actions.downloadPdf')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{tPdf('sectionSelector.title')}</DialogTitle>
            <DialogDescription>{tPdf('sectionSelector.description')}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
            {/* Core sections (locked) */}
            <div className="space-y-2">
              {coreSections.map((section) => (
                <div key={section.key} className="flex items-center gap-3 py-1">
                  <Checkbox checked disabled className="opacity-60" />
                  <span className="text-sm flex-1">{section.label}</span>
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>

            {/* Optional sections */}
            <div className="border-t my-2" />
            <div className="space-y-2">
              {optionalSectionKeys.map((key) => {
                const checked = isClient ? sections[key] : true;
                return (
                  <div key={key} className="flex items-center gap-3 py-1">
                    <Checkbox
                      id={`pdf-section-${key}`}
                      checked={checked}
                      onCheckedChange={() => toggleSection(key)}
                    />
                    <label
                      htmlFor={`pdf-section-${key}`}
                      className="text-sm flex-1 cursor-pointer select-none"
                    >
                      {sectionLabels[key]}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Select All / None buttons */}
            <div className="border-t my-2" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                {tPdf('sectionSelector.selectAll')}
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>
                {tPdf('sectionSelector.deselectAll')}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {tPdf('sectionSelector.generating')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {tPdf('sectionSelector.generate')}
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
    </div>
  );
}
