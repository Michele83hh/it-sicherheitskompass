'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Loader2 } from 'lucide-react';
import { useRegulationConfig, getQuestionsByCategory, getRecommendationsByCategory } from '@/hooks/useRegulationConfig';
import { useRegulationStores } from '@/hooks/useRegulationStores';
import { useProgressStore } from '@/stores/progress-store';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { REGULATION_LABELS, getAlsoCoveredBy } from '@/lib/regulations/recommendation-mappings';
import type { RegulationId, TrafficLight } from '@/lib/regulations/types';

export function DownloadExcelButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const params = useParams();
  const locale = params?.locale as string;
  const regulation = params?.regulation as string;

  const t = useTranslations('results');
  const tAll = useTranslations();
  const config = useRegulationConfig();
  const { assessmentStore } = useRegulationStores(regulation);
  const answers = assessmentStore((state) => state.answers);
  const progressStore = useProgressStore();
  const { getProgress } = progressStore;
  const progress = progressStore.progress;

  const de = locale === 'de';

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const XLSX = await import('xlsx');

      // Calculate scores
      const categoryQuestionCounts = config.categories.map((cat) => ({
        categoryId: cat.id,
        totalQuestions: getQuestionsByCategory(config, cat.id).length,
      }));
      const overallScore = calculateOverallScore(answers, categoryQuestionCounts);

      const trafficLightLabel: Record<TrafficLight, string> = de
        ? { red: 'Handlungsbedarf', yellow: 'Verbesserung noetig', green: 'Gut umgesetzt' }
        : { red: 'Action required', yellow: 'Improvement needed', green: 'Well implemented' };

      const priorityLabel: Record<string, string> = de
        ? { high: 'Hoch', medium: 'Mittel', low: 'Niedrig' }
        : { high: 'High', medium: 'Medium', low: 'Low' };

      const effortLabel: Record<string, string> = de
        ? { quick: 'Schnell (0-3 Mon.)', medium: 'Mittelfristig (3-6 Mon.)', strategic: 'Strategisch (6-12 Mon.)' }
        : { quick: 'Quick (0-3 mo.)', medium: 'Medium-term (3-6 mo.)', strategic: 'Strategic (6-12 mo.)' };

      const statusLabel: Record<string, string> = de
        ? { 'not-started': 'Offen', 'in-progress': 'In Arbeit', completed: 'Erledigt' }
        : { 'not-started': 'Open', 'in-progress': 'In Progress', completed: 'Done' };

      const regLabel = REGULATION_LABELS[regulation as RegulationId] || regulation.toUpperCase();
      const timestamp = new Date().toISOString().split('T')[0];

      const formatDate = (iso: string | undefined) => {
        if (!iso) return '';
        try {
          return new Date(iso).toLocaleDateString(de ? 'de-DE' : 'en-US', {
            day: '2-digit', month: '2-digit', year: 'numeric',
          });
        } catch { return iso; }
      };

      // ========== Sheet 1: Firmenprofil & Uebersicht ==========
      let navigatorData: { industry: string; companySize: string; results: { id: string; relevance: string }[]; completedAt: string } | null = null;
      try {
        const raw = localStorage.getItem('navigator-results-storage');
        if (raw) navigatorData = JSON.parse(raw);
      } catch { /* ignore */ }

      const sizeLabels: Record<string, string> = de
        ? { small: 'Kleinunternehmen (<50 MA)', medium: 'Mittleres Unternehmen (50-249 MA)', large: 'Grossunternehmen (250+ MA)' }
        : { small: 'Small (<50 employees)', medium: 'Medium (50-249 employees)', large: 'Large (250+ employees)' };

      const overviewData: (string | number)[][] = [
        [de ? 'IT-Sicherheitskompass — Compliance Report' : 'IT Security Compass — Compliance Report', '', ''],
        [de ? 'Erstellt am' : 'Generated on', timestamp, ''],
        ['', '', ''],
      ];

      // Firmenprofil section
      if (navigatorData) {
        overviewData.push(
          [de ? '─── Firmenprofil ───' : '─── Company Profile ───', '', ''],
          [de ? 'Branche' : 'Industry', navigatorData.industry, ''],
          [de ? 'Unternehmensgroesse' : 'Company Size', sizeLabels[navigatorData.companySize] || navigatorData.companySize, ''],
          [de ? 'Navigator abgeschlossen am' : 'Navigator completed on', formatDate(navigatorData.completedAt), ''],
          [de ? 'Relevante Regelwerke' : 'Relevant Regulations', navigatorData.results.filter(r => r.relevance === 'high' || r.relevance === 'medium').length.toString(), ''],
          ['', '', ''],
        );
      }

      // Score section
      overviewData.push(
        [de ? '─── Analyse-Ergebnis ───' : '─── Analysis Results ───', '', ''],
        [de ? 'Regelwerk' : 'Regulation', regLabel, ''],
        [de ? 'Gesamtscore' : 'Overall Score', overallScore.percentage, '%'],
        [de ? 'Bewertung' : 'Assessment', trafficLightLabel[overallScore.trafficLight], ''],
        [de ? 'Beantwortete Fragen' : 'Answered Questions', overallScore.answeredQuestions, `/ ${overallScore.totalQuestions}`],
        ['', '', ''],
        [de ? '─── Kategorie-Scores ───' : '─── Category Scores ───', '', ''],
        [de ? 'Kategorie' : 'Category', 'Score (%)', de ? 'Bewertung' : 'Assessment'],
      );

      overallScore.categoryScores.forEach((cs) => {
        const cat = config.categories.find((c) => c.id === cs.categoryId);
        const name = cat ? tAll(cat.nameKey) : cs.categoryId;
        overviewData.push([name, cs.percentage, trafficLightLabel[cs.trafficLight]]);
      });

      // Progress summary
      const completedCount = progress.filter(p => p.status === 'completed').length;
      const inProgressCount = progress.filter(p => p.status === 'in-progress').length;
      const allRecs = config.categories.flatMap(cat => getRecommendationsByCategory(config, cat.id));
      const totalRecs = allRecs.length;
      const progressPct = totalRecs > 0 ? Math.round((completedCount / totalRecs) * 100) : 0;

      overviewData.push(
        ['', '', ''],
        [de ? '─── Umsetzungsfortschritt ───' : '─── Implementation Progress ───', '', ''],
        [de ? 'Empfehlungen gesamt' : 'Total Recommendations', totalRecs, ''],
        [de ? 'Erledigt' : 'Completed', completedCount, `(${progressPct}%)`],
        [de ? 'In Arbeit' : 'In Progress', inProgressCount, ''],
        [de ? 'Offen' : 'Open', totalRecs - completedCount - inProgressCount, ''],
      );

      // ========== Sheet 2: Empfehlungen (detailed) ==========
      const recHeaders = de
        ? ['Kategorie', 'Empfehlung', 'Beschreibung', 'Erster Schritt', 'Prioritaet', 'Aufwand', 'Status', 'Verantwortlich', 'Notizen', 'Rechtsgrundlage']
        : ['Category', 'Recommendation', 'Description', 'First Step', 'Priority', 'Effort', 'Status', 'Responsible', 'Notes', 'Legal Basis'];

      const recRows: (string | number)[][] = [];
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const prog = getProgress(rec.id);
          const status = prog?.status || 'not-started';
          recRows.push([
            catName,
            tAll(rec.titleKey),
            tAll(rec.descriptionKey),
            tAll(rec.firstStepKey),
            priorityLabel[rec.priority] || rec.priority,
            effortLabel[rec.effortLevel] || rec.effortLevel,
            statusLabel[status] || status,
            prog?.responsible || '',
            prog?.notes || '',
            rec.legalReference,
          ]);
        }
      }

      // ========== Sheet 3: Roadmap ==========
      const roadmapHeaders = de
        ? ['Phase', 'Zeitraum', 'Massnahme', 'Kategorie', 'Prioritaet', 'Aufwand', 'Status']
        : ['Phase', 'Timeframe', 'Measure', 'Category', 'Priority', 'Effort', 'Status'];

      const phaseNames = de
        ? ['Phase 1: Sofortmassnahmen', 'Phase 2: Kernmassnahmen', 'Phase 3: Strategisch']
        : ['Phase 1: Immediate', 'Phase 2: Core', 'Phase 3: Strategic'];

      const phaseTimeframes = de
        ? ['0-3 Monate', '3-6 Monate', '6-12 Monate']
        : ['0-3 months', '3-6 months', '6-12 months'];

      const roadmapRows: (string | number)[][] = [];
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const phaseIdx = rec.effortLevel === 'quick' ? 0 : rec.effortLevel === 'medium' ? 1 : 2;
          const prog = getProgress(rec.id);
          const status = prog?.status || 'not-started';
          roadmapRows.push([
            phaseNames[phaseIdx],
            phaseTimeframes[phaseIdx],
            tAll(rec.titleKey),
            catName,
            priorityLabel[rec.priority] || rec.priority,
            effortLabel[rec.effortLevel] || rec.effortLevel,
            statusLabel[status] || status,
          ]);
        }
      }
      roadmapRows.sort((a, b) => String(a[0]).localeCompare(String(b[0])));

      // ========== Sheet 4: Fortschritt (Progress Details) ==========
      const progressHeaders = de
        ? ['Empfehlung', 'Kategorie', 'Status', 'Begonnen am', 'Erledigt am', 'Verantwortlich', 'Notizen', 'Zuletzt aktualisiert']
        : ['Recommendation', 'Category', 'Status', 'Started on', 'Completed on', 'Responsible', 'Notes', 'Last Updated'];

      const progressRows: string[][] = [];
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const prog = getProgress(rec.id);
          const status = prog?.status || 'not-started';
          progressRows.push([
            tAll(rec.titleKey),
            catName,
            statusLabel[status] || status,
            formatDate(prog?.startedAt),
            formatDate(prog?.completedAt),
            prog?.responsible || '',
            prog?.notes || '',
            formatDate(prog?.updatedAt),
          ]);
        }
      }

      // ========== Sheet 5: Cross-Regulation ==========
      const crossHeaders = de
        ? ['Empfehlung', 'Kategorie', 'Aktuelles Regelwerk', 'Erfuellt auch']
        : ['Recommendation', 'Category', 'Current Regulation', 'Also covers'];

      const crossRows: string[][] = [];
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const alsoCovered = getAlsoCoveredBy(rec.id, regulation as RegulationId);
          if (alsoCovered.length > 0) {
            crossRows.push([
              tAll(rec.titleKey),
              catName,
              regLabel,
              alsoCovered.map(id => REGULATION_LABELS[id]).join(', '),
            ]);
          }
        }
      }

      // ========== Sheet 6: Rechtsgrundlagen ==========
      const legalHeaders = de
        ? ['Kategorie', 'Empfehlung', 'Rechtsgrundlage']
        : ['Category', 'Recommendation', 'Legal Basis'];

      const legalRows: string[][] = [];
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          if (rec.legalReference) {
            legalRows.push([catName, tAll(rec.titleKey), rec.legalReference]);
          }
        }
      }

      // ===== Build Workbook =====
      const wb = XLSX.utils.book_new();

      // Sheet 1: Overview + Firmenprofil
      const ws1 = XLSX.utils.aoa_to_sheet(overviewData);
      ws1['!cols'] = [{ wch: 45 }, { wch: 35 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, ws1, de ? 'Uebersicht' : 'Overview');

      // Sheet 2: Recommendations
      const ws2 = XLSX.utils.aoa_to_sheet([recHeaders, ...recRows]);
      ws2['!cols'] = [
        { wch: 25 },  // Kategorie
        { wch: 40 },  // Empfehlung
        { wch: 50 },  // Beschreibung
        { wch: 40 },  // Erster Schritt
        { wch: 10 },  // Prioritaet
        { wch: 22 },  // Aufwand
        { wch: 12 },  // Status
        { wch: 20 },  // Verantwortlich
        { wch: 30 },  // Notizen
        { wch: 30 },  // Rechtsgrundlage
      ];
      ws2['!autofilter'] = { ref: `A1:J${recRows.length + 1}` };
      XLSX.utils.book_append_sheet(wb, ws2, de ? 'Empfehlungen' : 'Recommendations');

      // Sheet 3: Roadmap
      const ws3 = XLSX.utils.aoa_to_sheet([roadmapHeaders, ...roadmapRows]);
      ws3['!cols'] = [{ wch: 28 }, { wch: 14 }, { wch: 40 }, { wch: 25 }, { wch: 10 }, { wch: 22 }, { wch: 12 }];
      ws3['!autofilter'] = { ref: `A1:G${roadmapRows.length + 1}` };
      XLSX.utils.book_append_sheet(wb, ws3, 'Roadmap');

      // Sheet 4: Progress
      const ws4 = XLSX.utils.aoa_to_sheet([progressHeaders, ...progressRows]);
      ws4['!cols'] = [{ wch: 40 }, { wch: 25 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 20 }, { wch: 30 }, { wch: 14 }];
      ws4['!autofilter'] = { ref: `A1:H${progressRows.length + 1}` };
      XLSX.utils.book_append_sheet(wb, ws4, de ? 'Fortschritt' : 'Progress');

      // Sheet 5: Cross-Regulation (only if there are cross-reg entries)
      if (crossRows.length > 0) {
        const ws5 = XLSX.utils.aoa_to_sheet([crossHeaders, ...crossRows]);
        ws5['!cols'] = [{ wch: 40 }, { wch: 25 }, { wch: 15 }, { wch: 40 }];
        ws5['!autofilter'] = { ref: `A1:D${crossRows.length + 1}` };
        XLSX.utils.book_append_sheet(wb, ws5, de ? 'Cross-Regulation' : 'Cross-Regulation');
      }

      // Sheet 6: Legal References
      const ws6 = XLSX.utils.aoa_to_sheet([legalHeaders, ...legalRows]);
      ws6['!cols'] = [{ wch: 25 }, { wch: 40 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(wb, ws6, de ? 'Rechtsgrundlagen' : 'Legal References');

      // Download
      XLSX.writeFile(wb, `${regLabel}-Compliance-Report-${timestamp}.xlsx`);
    } catch (err) {
      console.error('Excel export failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleDownload} disabled={isGenerating}>
      {isGenerating ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <FileSpreadsheet className="mr-2 size-4" />
      )}
      {de ? 'Excel-Report herunterladen' : 'Download Excel Report'}
    </Button>
  );
}
