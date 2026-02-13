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

// Color constants for Excel styling
const SLATE_900 = '0F172A';
const PRIMARY = '1E40AF';
const PRIMARY_LIGHT = 'DBEAFE';
const RED = 'DC2626';
const RED_BG = 'FEF2F2';
const YELLOW = 'CA8A04';
const YELLOW_BG = 'FEFCE8';
const GREEN = '16A34A';
const GREEN_BG = 'F0FDF4';
const GRAY_50 = 'F9FAFB';
const GRAY_100 = 'F3F4F6';
const GRAY_200 = 'E5E7EB';
const GRAY_700 = '374151';

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
      const ExcelJS = await import('exceljs');
      const wb = new ExcelJS.Workbook();
      wb.creator = 'IT-Sicherheitskompass';
      wb.created = new Date();

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

      // Styling helpers
      const headerFill = {
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: SLATE_900 },
      };
      const headerFont = {
        bold: true,
        color: { argb: 'FFFFFFFF' },
        size: 11,
      };
      const subHeaderFill = {
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: PRIMARY },
      };
      const subHeaderFont = {
        bold: true,
        color: { argb: 'FFFFFFFF' },
        size: 10,
      };
      const thinBorder = {
        top: { style: 'thin' as const, color: { argb: GRAY_200 } },
        bottom: { style: 'thin' as const, color: { argb: GRAY_200 } },
        left: { style: 'thin' as const, color: { argb: GRAY_200 } },
        right: { style: 'thin' as const, color: { argb: GRAY_200 } },
      };
      const altRowFill = {
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: GRAY_50 },
      };

      const getTrafficLightFill = (tl: TrafficLight) => ({
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: tl === 'red' ? RED_BG : tl === 'yellow' ? YELLOW_BG : GREEN_BG },
      });
      const getTrafficLightFont = (tl: TrafficLight) => ({
        bold: true,
        color: { argb: tl === 'red' ? RED : tl === 'yellow' ? YELLOW : GREEN },
      });
      const getPriorityFill = (p: string) => ({
        type: 'pattern' as const,
        pattern: 'solid' as const,
        fgColor: { argb: p === 'high' ? RED_BG : p === 'medium' ? YELLOW_BG : GREEN_BG },
      });
      const getPriorityFont = (p: string) => ({
        bold: true,
        color: { argb: p === 'high' ? RED : p === 'medium' ? YELLOW : GREEN },
      });

      // Helper to style a header row for data sheets
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const styleSheetHeader = (_ws: any, row: any) => {
        row.eachCell((cell: any) => {
          cell.fill = subHeaderFill;
          cell.font = subHeaderFont;
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
          cell.border = thinBorder;
        });
        row.height = 28;
      };

      // ========== Sheet 1: Overview ==========
      const ws1 = wb.addWorksheet(de ? 'Uebersicht' : 'Overview');
      ws1.columns = [
        { width: 45 },
        { width: 35 },
        { width: 15 },
      ];

      // Title row — merged, dark background
      ws1.mergeCells('A1:C1');
      const titleCell = ws1.getCell('A1');
      titleCell.value = de ? 'IT-Sicherheitskompass — Compliance Report' : 'IT Security Compass — Compliance Report';
      titleCell.fill = headerFill;
      titleCell.font = { ...headerFont, size: 14 };
      titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
      ws1.getRow(1).height = 36;

      // Date row
      ws1.mergeCells('A2:C2');
      const dateCell = ws1.getCell('A2');
      dateCell.value = `${de ? 'Erstellt am' : 'Generated on'}: ${timestamp}`;
      dateCell.font = { color: { argb: GRAY_700 }, italic: true, size: 9 };
      dateCell.alignment = { horizontal: 'center' };

      let row = 4;

      // Navigator data
      let navigatorData: { industry: string; companySize: string; results: { id: string; relevance: string }[]; completedAt: string } | null = null;
      try {
        const raw = localStorage.getItem('navigator-results-storage');
        if (raw) navigatorData = JSON.parse(raw);
      } catch { /* ignore */ }

      const sizeLabels: Record<string, string> = de
        ? { small: 'Kleinunternehmen (<50 MA)', medium: 'Mittleres Unternehmen (50-249 MA)', large: 'Grossunternehmen (250+ MA)' }
        : { small: 'Small (<50 employees)', medium: 'Medium (50-249 employees)', large: 'Large (250+ employees)' };

      if (navigatorData) {
        ws1.mergeCells(`A${row}:C${row}`);
        const profHeader = ws1.getCell(`A${row}`);
        profHeader.value = de ? 'Firmenprofil' : 'Company Profile';
        profHeader.fill = subHeaderFill;
        profHeader.font = subHeaderFont;
        profHeader.alignment = { vertical: 'middle' };
        ws1.getRow(row).height = 24;
        row++;

        const profileData = [
          [de ? 'Branche' : 'Industry', navigatorData.industry],
          [de ? 'Unternehmensgroesse' : 'Company Size', sizeLabels[navigatorData.companySize] || navigatorData.companySize],
          [de ? 'Navigator abgeschlossen am' : 'Navigator completed on', formatDate(navigatorData.completedAt)],
        ];
        for (const [label, val] of profileData) {
          ws1.getCell(`A${row}`).value = label;
          ws1.getCell(`A${row}`).font = { bold: true, size: 10 };
          ws1.getCell(`B${row}`).value = val;
          ws1.getRow(row).border = thinBorder;
          row++;
        }
        row++;
      }

      // Score section
      ws1.mergeCells(`A${row}:C${row}`);
      const scoreHeader = ws1.getCell(`A${row}`);
      scoreHeader.value = de ? 'Analyse-Ergebnis' : 'Analysis Results';
      scoreHeader.fill = subHeaderFill;
      scoreHeader.font = subHeaderFont;
      scoreHeader.alignment = { vertical: 'middle' };
      ws1.getRow(row).height = 24;
      row++;

      const scoreData: [string, string | number][] = [
        [de ? 'Regelwerk' : 'Regulation', regLabel],
        [de ? 'Gesamtscore' : 'Overall Score', `${overallScore.percentage}%`],
        [de ? 'Bewertung' : 'Assessment', trafficLightLabel[overallScore.trafficLight]],
        [de ? 'Beantwortete Fragen' : 'Answered Questions', `${overallScore.answeredQuestions} / ${overallScore.totalQuestions}`],
      ];
      for (const [label, val] of scoreData) {
        ws1.getCell(`A${row}`).value = label;
        ws1.getCell(`A${row}`).font = { bold: true, size: 10 };
        ws1.getCell(`B${row}`).value = val;
        // Color the assessment cell
        if (label.includes('Bewertung') || label.includes('Assessment')) {
          ws1.getCell(`B${row}`).fill = getTrafficLightFill(overallScore.trafficLight);
          ws1.getCell(`B${row}`).font = getTrafficLightFont(overallScore.trafficLight);
        }
        ws1.getRow(row).border = thinBorder;
        row++;
      }
      row++;

      // Category scores
      ws1.mergeCells(`A${row}:C${row}`);
      const catHeader = ws1.getCell(`A${row}`);
      catHeader.value = de ? 'Kategorie-Scores' : 'Category Scores';
      catHeader.fill = subHeaderFill;
      catHeader.font = subHeaderFont;
      ws1.getRow(row).height = 24;
      row++;

      // Category header row
      ws1.getCell(`A${row}`).value = de ? 'Kategorie' : 'Category';
      ws1.getCell(`B${row}`).value = 'Score (%)';
      ws1.getCell(`C${row}`).value = de ? 'Bewertung' : 'Assessment';
      const catHdrRow = ws1.getRow(row);
      catHdrRow.eachCell((cell: any) => {
        cell.font = { bold: true, size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_100 } };
        cell.border = thinBorder;
      });
      row++;

      overallScore.categoryScores.forEach((cs, idx) => {
        const cat = config.categories.find((c) => c.id === cs.categoryId);
        const name = cat ? tAll(cat.nameKey) : cs.categoryId;
        ws1.getCell(`A${row}`).value = name;
        ws1.getCell(`B${row}`).value = cs.percentage;
        ws1.getCell(`B${row}`).alignment = { horizontal: 'center' };
        ws1.getCell(`C${row}`).value = trafficLightLabel[cs.trafficLight];
        ws1.getCell(`C${row}`).fill = getTrafficLightFill(cs.trafficLight);
        ws1.getCell(`C${row}`).font = getTrafficLightFont(cs.trafficLight);
        if (idx % 2 === 1) {
          ws1.getCell(`A${row}`).fill = altRowFill;
          ws1.getCell(`B${row}`).fill = altRowFill;
        }
        ws1.getRow(row).border = thinBorder;
        row++;
      });
      row++;

      // Progress summary
      const completedCount = progress.filter(p => p.status === 'completed').length;
      const inProgressCount = progress.filter(p => p.status === 'in-progress').length;
      const allRecs = config.categories.flatMap(cat => getRecommendationsByCategory(config, cat.id));
      const totalRecs = allRecs.length;
      const progressPct = totalRecs > 0 ? Math.round((completedCount / totalRecs) * 100) : 0;

      ws1.mergeCells(`A${row}:C${row}`);
      const progHeader = ws1.getCell(`A${row}`);
      progHeader.value = de ? 'Umsetzungsfortschritt' : 'Implementation Progress';
      progHeader.fill = subHeaderFill;
      progHeader.font = subHeaderFont;
      ws1.getRow(row).height = 24;
      row++;

      const progData: [string, string | number][] = [
        [de ? 'Empfehlungen gesamt' : 'Total Recommendations', totalRecs],
        [de ? 'Erledigt' : 'Completed', `${completedCount} (${progressPct}%)`],
        [de ? 'In Arbeit' : 'In Progress', inProgressCount],
        [de ? 'Offen' : 'Open', totalRecs - completedCount - inProgressCount],
      ];
      for (const [label, val] of progData) {
        ws1.getCell(`A${row}`).value = label;
        ws1.getCell(`A${row}`).font = { bold: true, size: 10 };
        ws1.getCell(`B${row}`).value = val;
        ws1.getRow(row).border = thinBorder;
        row++;
      }

      // ========== Sheet 2: Empfehlungen ==========
      const ws2 = wb.addWorksheet(de ? 'Empfehlungen' : 'Recommendations');
      const recHeaders = de
        ? ['Kategorie', 'Empfehlung', 'Beschreibung', 'Erster Schritt', 'Prioritaet', 'Aufwand', 'Status', 'Verantwortlich', 'Notizen', 'Rechtsgrundlage']
        : ['Category', 'Recommendation', 'Description', 'First Step', 'Priority', 'Effort', 'Status', 'Responsible', 'Notes', 'Legal Basis'];
      ws2.columns = [
        { width: 25 }, { width: 40 }, { width: 50 }, { width: 40 },
        { width: 12 }, { width: 24 }, { width: 14 }, { width: 20 },
        { width: 30 }, { width: 30 },
      ];

      const recHeaderRow = ws2.addRow(recHeaders);
      styleSheetHeader(ws2, recHeaderRow);
      ws2.views = [{ state: 'frozen', ySplit: 1, xSplit: 0 }];

      let recRowIdx = 0;
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const prog = getProgress(rec.id);
          const status = prog?.status || 'not-started';
          const dataRow = ws2.addRow([
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

          // Alternating row colors
          if (recRowIdx % 2 === 1) {
            dataRow.eachCell((cell: any) => { cell.fill = altRowFill; });
          }

          // Priority cell coloring
          const priorityCell = dataRow.getCell(5);
          priorityCell.fill = getPriorityFill(rec.priority);
          priorityCell.font = getPriorityFont(rec.priority);
          priorityCell.alignment = { horizontal: 'center' };

          // Status cell coloring
          const statusCell = dataRow.getCell(7);
          if (status === 'completed') {
            statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_BG } };
            statusCell.font = { color: { argb: GREEN }, bold: true };
          } else if (status === 'in-progress') {
            statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: YELLOW_BG } };
            statusCell.font = { color: { argb: YELLOW }, bold: true };
          }

          dataRow.border = thinBorder;
          dataRow.alignment = { vertical: 'top', wrapText: true };
          recRowIdx++;
        }
      }
      ws2.autoFilter = { from: 'A1', to: `J${recRowIdx + 1}` };

      // ========== Sheet 3: Roadmap ==========
      const ws3 = wb.addWorksheet('Roadmap');
      const roadmapHeaders = de
        ? ['Phase', 'Zeitraum', 'Massnahme', 'Kategorie', 'Prioritaet', 'Aufwand', 'Status']
        : ['Phase', 'Timeframe', 'Measure', 'Category', 'Priority', 'Effort', 'Status'];
      ws3.columns = [
        { width: 28 }, { width: 14 }, { width: 40 }, { width: 25 },
        { width: 12 }, { width: 24 }, { width: 14 },
      ];

      const rmHeaderRow = ws3.addRow(roadmapHeaders);
      styleSheetHeader(ws3, rmHeaderRow);
      ws3.views = [{ state: 'frozen', ySplit: 1, xSplit: 0 }];

      const phaseNames = de
        ? ['Phase 1: Sofortmassnahmen', 'Phase 2: Kernmassnahmen', 'Phase 3: Strategisch']
        : ['Phase 1: Immediate', 'Phase 2: Core', 'Phase 3: Strategic'];
      const phaseTimeframes = de
        ? ['0-3 Monate', '3-6 Monate', '6-12 Monate']
        : ['0-3 months', '3-6 months', '6-12 months'];
      const phaseColors = [GREEN, YELLOW, PRIMARY];
      const phaseBgColors = [GREEN_BG, YELLOW_BG, PRIMARY_LIGHT];

      const roadmapRows: { phase: number; data: (string | number)[] }[] = [];
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const phaseIdx = rec.effortLevel === 'quick' ? 0 : rec.effortLevel === 'medium' ? 1 : 2;
          const prog = getProgress(rec.id);
          const status = prog?.status || 'not-started';
          roadmapRows.push({
            phase: phaseIdx,
            data: [
              phaseNames[phaseIdx],
              phaseTimeframes[phaseIdx],
              tAll(rec.titleKey),
              catName,
              priorityLabel[rec.priority] || rec.priority,
              effortLabel[rec.effortLevel] || rec.effortLevel,
              statusLabel[status] || status,
            ],
          });
        }
      }
      roadmapRows.sort((a, b) => a.phase - b.phase);

      let lastPhase = -1;
      roadmapRows.forEach((item, idx) => {
        // Insert phase divider row
        if (item.phase !== lastPhase) {
          lastPhase = item.phase;
          const dividerRow = ws3.addRow([phaseNames[item.phase]]);
          ws3.mergeCells(`A${dividerRow.number}:G${dividerRow.number}`);
          dividerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: phaseBgColors[item.phase] },
          };
          dividerRow.getCell(1).font = { bold: true, color: { argb: phaseColors[item.phase] }, size: 11 };
          dividerRow.height = 24;
        }
        const dataRow = ws3.addRow(item.data);
        dataRow.border = thinBorder;
        dataRow.alignment = { vertical: 'top', wrapText: true };

        // Priority coloring
        const priorityCell = dataRow.getCell(5);
        const pLabel = String(item.data[4]);
        const pKey = pLabel === (de ? 'Hoch' : 'High') ? 'high' : pLabel === (de ? 'Mittel' : 'Medium') ? 'medium' : 'low';
        priorityCell.fill = getPriorityFill(pKey);
        priorityCell.font = getPriorityFont(pKey);
        priorityCell.alignment = { horizontal: 'center' };
      });

      // ========== Sheet 4: Fortschritt ==========
      const ws4 = wb.addWorksheet(de ? 'Fortschritt' : 'Progress');
      const progressHeaders = de
        ? ['Empfehlung', 'Kategorie', 'Status', 'Begonnen am', 'Erledigt am', 'Verantwortlich', 'Notizen', 'Zuletzt aktualisiert']
        : ['Recommendation', 'Category', 'Status', 'Started on', 'Completed on', 'Responsible', 'Notes', 'Last Updated'];
      ws4.columns = [
        { width: 40 }, { width: 25 }, { width: 14 }, { width: 14 },
        { width: 14 }, { width: 20 }, { width: 30 }, { width: 14 },
      ];

      const progHdrRow = ws4.addRow(progressHeaders);
      styleSheetHeader(ws4, progHdrRow);
      ws4.views = [{ state: 'frozen', ySplit: 1, xSplit: 0 }];

      let progRowIdx = 0;
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          const prog = getProgress(rec.id);
          const status = prog?.status || 'not-started';
          const dataRow = ws4.addRow([
            tAll(rec.titleKey),
            catName,
            statusLabel[status] || status,
            formatDate(prog?.startedAt),
            formatDate(prog?.completedAt),
            prog?.responsible || '',
            prog?.notes || '',
            formatDate(prog?.updatedAt),
          ]);

          // Status cell coloring
          const statusCell = dataRow.getCell(3);
          if (status === 'completed') {
            statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_BG } };
            statusCell.font = { color: { argb: GREEN }, bold: true };
          } else if (status === 'in-progress') {
            statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: YELLOW_BG } };
            statusCell.font = { color: { argb: YELLOW }, bold: true };
          } else {
            statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_BG } };
            statusCell.font = { color: { argb: RED } };
          }

          if (progRowIdx % 2 === 1) {
            dataRow.eachCell((cell: any) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (!cell.fill || (cell.fill as any).fgColor?.argb === undefined) {
                cell.fill = altRowFill;
              }
            });
          }

          dataRow.border = thinBorder;
          dataRow.alignment = { vertical: 'top', wrapText: true };
          progRowIdx++;
        }
      }
      ws4.autoFilter = { from: 'A1', to: `H${progRowIdx + 1}` };

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

      if (crossRows.length > 0) {
        const ws5 = wb.addWorksheet('Cross-Regulation');
        ws5.columns = [{ width: 40 }, { width: 25 }, { width: 15 }, { width: 40 }];

        const crossHdrRow = ws5.addRow(crossHeaders);
        styleSheetHeader(ws5, crossHdrRow);
        ws5.views = [{ state: 'frozen', ySplit: 1, xSplit: 0 }];

        crossRows.forEach((rowData, idx) => {
          const dataRow = ws5.addRow(rowData);
          if (idx % 2 === 1) {
            dataRow.eachCell((cell: any) => { cell.fill = altRowFill; });
          }
          dataRow.border = thinBorder;
          dataRow.alignment = { vertical: 'top', wrapText: true };
        });
        ws5.autoFilter = { from: 'A1', to: `D${crossRows.length + 1}` };
      }

      // ========== Sheet 6: Rechtsgrundlagen ==========
      const ws6 = wb.addWorksheet(de ? 'Rechtsgrundlagen' : 'Legal References');
      const legalHeaders = de
        ? ['Kategorie', 'Empfehlung', 'Rechtsgrundlage']
        : ['Category', 'Recommendation', 'Legal Basis'];
      ws6.columns = [{ width: 25 }, { width: 40 }, { width: 40 }];

      const legalHdrRow = ws6.addRow(legalHeaders);
      styleSheetHeader(ws6, legalHdrRow);
      ws6.views = [{ state: 'frozen', ySplit: 1, xSplit: 0 }];

      let legalRowIdx = 0;
      for (const cat of config.categories) {
        const recs = getRecommendationsByCategory(config, cat.id);
        const catName = tAll(cat.nameKey);
        for (const rec of recs) {
          if (rec.legalReference) {
            const dataRow = ws6.addRow([catName, tAll(rec.titleKey), rec.legalReference]);
            if (legalRowIdx % 2 === 1) {
              dataRow.eachCell((cell: any) => { cell.fill = altRowFill; });
            }
            dataRow.border = thinBorder;
            dataRow.alignment = { vertical: 'top', wrapText: true };
            legalRowIdx++;
          }
        }
      }

      // ===== Download =====
      const buffer = await wb.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${regLabel}-Compliance-Report-${timestamp}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
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
