'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, FileSpreadsheet, Layers, Loader2, Check } from 'lucide-react';
import type { DashboardData, RegulationStatus } from '@/lib/dashboard/aggregation';
import { generateMailtoUrl } from '@/lib/pillars/delegation';
import { getRegulation } from '@/lib/regulations/registry';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { REGULATION_LABELS, getAlsoCoveredBy } from '@/lib/regulations/recommendation-mappings';
import type { RegulationId, TrafficLight, Answer } from '@/lib/regulations/types';

interface QuickActionsProps {
  data: DashboardData;
}

export function QuickActions({ data }: QuickActionsProps) {
  const t = useTranslations();
  const tActions = useTranslations('platform.dashboard.quickActions');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'de';
  const de = locale === 'de';

  const [isGenerating, setIsGenerating] = useState(false);
  const regsWithData = data.regulations.filter((r) => r.hasData);
  const [selectedRegs, setSelectedRegs] = useState<Set<string>>(
    () => new Set(regsWithData.map((r) => r.id))
  );

  const weakestPillar = data.pillarGroups.critical[0] ?? data.pillarGroups.inProgress[0] ?? null;

  const hasAnyAction = weakestPillar || regsWithData.length > 0 || data.synergies.length > 0;
  if (!hasAnyAction) return null;

  function handleMailto() {
    if (!weakestPillar) return;
    const pillar = weakestPillar.pillar;
    const url = generateMailtoUrl({
      pillarName: t(pillar.nameKey),
      pillarNumber: pillar.number,
      score: weakestPillar.score.score,
      openComponents: pillar.components.map((c) => t(c.nameKey)),
      translations: {
        subject: tActions('mailtoSubject'),
        bodyIntro: tActions('mailtoBodyIntro'),
        bodyScore: tActions('mailtoBodyScore'),
        bodyComponents: tActions('mailtoBodyComponents'),
        bodyOutro: tActions('mailtoBodyOutro'),
      },
    });
    window.open(url, '_self');
  }

  function toggleReg(regId: string) {
    setSelectedRegs((prev) => {
      const next = new Set(prev);
      if (next.has(regId)) next.delete(regId);
      else next.add(regId);
      return next;
    });
  }

  function toggleAll() {
    if (selectedRegs.size === regsWithData.length) {
      setSelectedRegs(new Set());
    } else {
      setSelectedRegs(new Set(regsWithData.map((r) => r.id)));
    }
  }

  async function handleExport() {
    if (selectedRegs.size === 0) return;
    setIsGenerating(true);

    try {
      const XLSX = await import('xlsx');
      const timestamp = new Date().toISOString().split('T')[0];

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

      // Load progress data
      let progressItems: { recommendationId: string; status: string; startedAt?: string; completedAt?: string; responsible?: string; notes?: string; updatedAt?: string }[] = [];
      try {
        const progressRaw = localStorage.getItem('nis2-progress-storage');
        if (progressRaw) {
          const pd = JSON.parse(progressRaw);
          progressItems = (pd.state || pd).progress || [];
        }
      } catch { /* ignore */ }

      const getProgress = (recId: string) => progressItems.find((p) => p.recommendationId === recId);

      const formatDate = (iso: string | undefined) => {
        if (!iso) return '';
        try {
          return new Date(iso).toLocaleDateString(de ? 'de-DE' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch { return iso; }
      };

      const wb = XLSX.utils.book_new();

      // ===== Sheet 1: Uebersicht =====
      const overviewData: (string | number)[][] = [
        [de ? 'IT-Sicherheitskompass — Dashboard Export' : 'IT Security Compass — Dashboard Export', '', ''],
        [de ? 'Erstellt am' : 'Generated on', timestamp, ''],
        [de ? 'Regelwerke' : 'Regulations', selectedRegs.size.toString(), ''],
        [de ? 'Gesamtscore' : 'Overall Score', `${data.overallScore}%`, ''],
        ['', '', ''],
      ];

      // Per-regulation summary
      overviewData.push([de ? '─── Regelwerk-Scores ───' : '─── Regulation Scores ───', '', '']);
      overviewData.push([de ? 'Regelwerk' : 'Regulation', 'Score', de ? 'Bewertung' : 'Assessment']);

      for (const regId of selectedRegs) {
        const reg = data.regulations.find((r) => r.id === regId);
        if (!reg || !reg.hasData) continue;
        const label = REGULATION_LABELS[regId as RegulationId] || regId.toUpperCase();
        const config = getRegulation(regId as RegulationId);
        if (!config) continue;

        const catInfo = config.categories.map((cat) => ({
          categoryId: cat.id,
          totalQuestions: cat.questions.length,
        }));

        // Re-read answers for this reg
        let answers: Answer[] = [];
        try {
          const meta = data.regulations.find((r) => r.id === regId);
          const storageKeys: Record<string, string> = {
            'nis2': 'nis2-gap-analysis-storage',
            'dsgvo': 'dsgvo-assessment-storage',
            'kritis': 'kritis-assessment-storage',
            'dora': 'dora-assessment-storage',
            'tisax': 'tisax-assessment-storage',
            'cra': 'cra-assessment-storage',
            'bsi-grundschutz': 'bsi-grundschutz-assessment-storage',
            'iso27001': 'iso27001-assessment-storage',
            'soc2': 'soc2-assessment-storage',
            'pci-dss': 'pci-dss-assessment-storage',
            'c5': 'c5-assessment-storage',
          };
          const raw = localStorage.getItem(storageKeys[regId] || '');
          if (raw) {
            const d = JSON.parse(raw);
            answers = (d.state || d).answers || [];
          }
        } catch { /* ignore */ }

        const overall = calculateOverallScore(answers, catInfo);
        overviewData.push([label, `${Math.round(overall.percentage)}%`, trafficLightLabel[overall.trafficLight]]);
      }

      const ws1 = XLSX.utils.aoa_to_sheet(overviewData);
      ws1['!cols'] = [{ wch: 45 }, { wch: 20 }, { wch: 25 }];
      XLSX.utils.book_append_sheet(wb, ws1, de ? 'Uebersicht' : 'Overview');

      // ===== Sheet 2: Alle Empfehlungen =====
      const recHeaders = de
        ? ['Regelwerk', 'Kategorie', 'Empfehlung', 'Prioritaet', 'Aufwand', 'Status', 'Rechtsgrundlage']
        : ['Regulation', 'Category', 'Recommendation', 'Priority', 'Effort', 'Status', 'Legal Basis'];

      const recRows: string[][] = [];

      for (const regId of selectedRegs) {
        const config = getRegulation(regId as RegulationId);
        if (!config) continue;
        const label = REGULATION_LABELS[regId as RegulationId] || regId.toUpperCase();

        for (const cat of config.categories) {
          const catName = t(cat.nameKey);
          for (const rec of config.recommendations.filter((r) => r.categoryId === cat.id)) {
            const prog = getProgress(rec.id);
            recRows.push([
              label,
              catName,
              t(rec.titleKey),
              priorityLabel[rec.priority] || rec.priority,
              effortLabel[rec.effortLevel] || rec.effortLevel,
              statusLabel[prog?.status || 'not-started'] || 'Offen',
              rec.legalReference,
            ]);
          }
        }
      }

      const ws2 = XLSX.utils.aoa_to_sheet([recHeaders, ...recRows]);
      ws2['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 40 }, { wch: 10 }, { wch: 22 }, { wch: 12 }, { wch: 30 }];
      ws2['!autofilter'] = { ref: `A1:G${recRows.length + 1}` };
      XLSX.utils.book_append_sheet(wb, ws2, de ? 'Empfehlungen' : 'Recommendations');

      // ===== Sheet 3: Cross-Regulation =====
      const crossHeaders = de
        ? ['Empfehlung', 'Regelwerk', 'Erfuellt auch']
        : ['Recommendation', 'Regulation', 'Also covers'];

      const crossRows: string[][] = [];
      for (const regId of selectedRegs) {
        const config = getRegulation(regId as RegulationId);
        if (!config) continue;
        const label = REGULATION_LABELS[regId as RegulationId] || regId.toUpperCase();
        for (const rec of config.recommendations) {
          const alsoCovered = getAlsoCoveredBy(rec.id, regId as RegulationId);
          if (alsoCovered.length > 0) {
            crossRows.push([
              t(rec.titleKey),
              label,
              alsoCovered.map((id) => REGULATION_LABELS[id]).join(', '),
            ]);
          }
        }
      }

      if (crossRows.length > 0) {
        const ws3 = XLSX.utils.aoa_to_sheet([crossHeaders, ...crossRows]);
        ws3['!cols'] = [{ wch: 40 }, { wch: 15 }, { wch: 40 }];
        XLSX.utils.book_append_sheet(wb, ws3, 'Cross-Regulation');
      }

      // Download
      const filename = selectedRegs.size === 1
        ? `${REGULATION_LABELS[[...selectedRegs][0] as RegulationId] || 'Report'}-${timestamp}.xlsx`
        : `IT-Sicherheitskompass-Report-${timestamp}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.error('Dashboard Excel export failed:', err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mb-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Delegation */}
        {weakestPillar && (
          <Card className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="size-4 text-primary/60" />
                <h3 className="text-sm font-bold">{tActions('delegateTitle')}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{tActions('delegateDesc')}</p>
              <p className="text-sm font-medium text-foreground mb-4">
                {t(weakestPillar.pillar.nameKey)}
                <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                  (weakestPillar.score.score ?? 0) < 40 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {Math.round(weakestPillar.score.score ?? 0)}%
                </span>
              </p>
              <Button variant="outline" size="sm" className="w-full" onClick={handleMailto}>
                <Mail className="mr-2 size-3.5" />
                {tActions('sendEmail')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Export — granular with checkboxes */}
        {regsWithData.length > 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileSpreadsheet className="size-4 text-primary/60" />
                <h3 className="text-sm font-bold">{tActions('exportTitle')}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{tActions('exportDesc')}</p>

              {/* Regulation checkboxes */}
              <div className="space-y-1.5 mb-4">
                {regsWithData.length > 1 && (
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground pb-1 border-b border-slate-100 mb-1">
                    <button
                      type="button"
                      onClick={toggleAll}
                      className={`size-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedRegs.size === regsWithData.length
                          ? 'bg-primary border-primary text-white'
                          : 'border-slate-300 hover:border-primary'
                      }`}
                    >
                      {selectedRegs.size === regsWithData.length && <Check className="size-3" />}
                    </button>
                    {tActions('exportSelectAll')}
                  </label>
                )}
                {regsWithData.map((reg) => (
                  <label key={reg.id} className="flex items-center gap-2 cursor-pointer text-xs hover:bg-slate-50 rounded px-1 py-0.5 -mx-1">
                    <button
                      type="button"
                      onClick={() => toggleReg(reg.id)}
                      className={`size-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedRegs.has(reg.id)
                          ? 'bg-primary border-primary text-white'
                          : 'border-slate-300 hover:border-primary'
                      }`}
                    >
                      {selectedRegs.has(reg.id) && <Check className="size-3" />}
                    </button>
                    <span className="text-foreground font-medium">{t(`${reg.tKey}.name`)}</span>
                    {reg.score !== null && (
                      <span className="ml-auto text-muted-foreground tabular-nums">{reg.score}%</span>
                    )}
                  </label>
                ))}
              </div>

              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={handleExport}
                disabled={isGenerating || selectedRegs.size === 0}
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 size-3.5 animate-spin" />
                ) : (
                  <FileSpreadsheet className="mr-2 size-3.5" />
                )}
                {isGenerating ? tActions('exportGenerating') : tActions('exportDownload')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Synergies */}
        {data.synergies.length > 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="size-4 text-primary/60" />
                <h3 className="text-sm font-bold">{t('platform.dashboard.synergiesTitle')}</h3>
              </div>
              <div className="space-y-2.5">
                {data.synergies.slice(0, 3).map((syn) => (
                  <div key={`${syn.regA}-${syn.regB}`} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">
                      {t(`${syn.regA === 'bsi-grundschutz' ? 'bsiGrundschutz' : syn.regA}.name`)}
                      {' & '}
                      {t(`${syn.regB === 'bsi-grundschutz' ? 'bsiGrundschutz' : syn.regB}.name`)}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                      {syn.overlapPercent}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-primary font-medium">
                {tActions('synergiesNote')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
