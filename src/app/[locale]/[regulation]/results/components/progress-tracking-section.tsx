'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import {
  CheckSquare,
  ChevronDown,
  Circle,
  Clock,
  CheckCircle2,
  User,
  StickyNote,
  AlertTriangle,
  Calendar,
  Link2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore, type ProgressStatus } from '@/stores/progress-store';
import { useRegulationConfig } from '@/hooks/useRegulationConfig';
import { getOrCreateProgressStore } from '@/hooks/useRegulationStores';
import {
  getCrossRegRecommendations,
  type CrossRegRecommendation,
} from '@/lib/regulations/recommendation-mappings';
import type { BaseRecommendation as Recommendation, RegulationId } from '@/lib/regulations/types';

interface ProgressTrackingSectionProps {
  recommendations: Recommendation[];
}

type FilterValue = 'all' | ProgressStatus;

const STATUS_ORDER: ProgressStatus[] = ['not-started', 'in-progress', 'completed'];

/** Returns true when the requested transition is a backward move */
function isBackwardTransition(from: ProgressStatus, to: ProgressStatus): boolean {
  const rank: Record<ProgressStatus, number> = {
    'not-started': 0,
    'in-progress': 1,
    completed: 2,
  };
  return rank[to] < rank[from];
}

/** Convert ISO date to YYYY-MM-DD for <input type="date"> */
function isoToDateInput(iso: string | undefined): string {
  if (!iso) return '';
  try {
    return new Date(iso).toISOString().split('T')[0];
  } catch {
    return '';
  }
}

export function ProgressTrackingSection({ recommendations }: ProgressTrackingSectionProps) {
  const t = useTranslations('progressTracking');
  const tAll = useTranslations();
  const params = useParams();
  const config = useRegulationConfig();
  const {
    updateProgress,
    updateNotes,
    updateResponsible,
    updateStartedAt,
    updateCompletedAt,
    getProgress,
    getCompletionPercentage,
  } = useProgressStore();

  const [filter, setFilter] = useState<FilterValue>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());

  // Track pending backward transition requiring confirmation
  // { recId, targetStatus } — shows inline confirmation for this recommendation
  const [pendingReset, setPendingReset] = useState<{
    recId: string;
    targetStatus: ProgressStatus;
  } | null>(null);

  // Cross-regulation cascade: track which suggestion boxes are expanded
  const [expandedCrossReg, setExpandedCrossReg] = useState<Set<string>>(new Set());
  // Track which cross-reg recommendations have already been cascade-marked
  // Key format: `${regulationId}:${recommendationId}`
  const [markedCrossReg, setMarkedCrossReg] = useState<Set<string>>(new Set());

  const currentRegulation = (params?.regulation as string ?? 'nis2') as RegulationId;

  const toggleCrossReg = (recId: string) => {
    setExpandedCrossReg((prev) => {
      const next = new Set(prev);
      if (next.has(recId)) next.delete(recId);
      else next.add(recId);
      return next;
    });
  };

  /** Mark a recommendation in another regulation as completed via cross-reg cascade */
  const handleCrossRegMark = (targetRegulationId: RegulationId, targetRecId: string) => {
    const key = `${targetRegulationId}:${targetRecId}`;
    if (markedCrossReg.has(key)) return; // Already marked

    const store = getOrCreateProgressStore(targetRegulationId);
    store.getState().updateProgress(targetRecId, 'completed');
    setMarkedCrossReg((prev) => new Set(prev).add(key));
  };

  /** Mark all recommendations for a regulation in a cross-reg suggestion */
  const handleCrossRegMarkAll = (entry: CrossRegRecommendation) => {
    const store = getOrCreateProgressStore(entry.regulationId);
    const state = store.getState();
    for (const recId of entry.recommendationIds) {
      const key = `${entry.regulationId}:${recId}`;
      if (!markedCrossReg.has(key)) {
        state.updateProgress(recId, 'completed');
        setMarkedCrossReg((prev) => new Set(prev).add(key));
      }
    }
  };

  // Compute counts per status (including items with no progress entry = not-started)
  const statusCounts = useMemo(() => {
    const counts = { 'not-started': 0, 'in-progress': 0, completed: 0 };
    recommendations.forEach((rec) => {
      const progress = getProgress(rec.id);
      const status = progress?.status || 'not-started';
      counts[status]++;
    });
    return counts;
  }, [recommendations, getProgress]);

  const totalCount = recommendations.length;
  const completionPct = getCompletionPercentage(totalCount);

  // Group recommendations by category
  const groupedByCategory = useMemo(() => {
    const groups = new Map<string, Recommendation[]>();
    recommendations.forEach((rec) => {
      const existing = groups.get(rec.categoryId) || [];
      existing.push(rec);
      groups.set(rec.categoryId, existing);
    });
    return groups;
  }, [recommendations]);

  // Filter recommendations
  const getFilteredRecs = useCallback(
    (recs: Recommendation[]) => {
      if (filter === 'all') return recs;
      return recs.filter((rec) => {
        const progress = getProgress(rec.id);
        const status = progress?.status || 'not-started';
        return status === filter;
      });
    },
    [filter, getProgress]
  );

  // Category completion counts
  const getCategoryDoneCount = useCallback(
    (categoryId: string) => {
      const recs = groupedByCategory.get(categoryId) || [];
      return recs.filter((rec) => {
        const p = getProgress(rec.id);
        return p?.status === 'completed';
      }).length;
    },
    [groupedByCategory, getProgress]
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const toggleDetails = (recId: string) => {
    setExpandedDetails((prev) => {
      const next = new Set(prev);
      if (next.has(recId)) next.delete(recId);
      else next.add(recId);
      return next;
    });
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  /** Handle status toggle click — intercepts backward transitions for confirmation */
  const handleStatusClick = (recId: string, targetStatus: ProgressStatus) => {
    const progress = getProgress(recId);
    const currentStatus = progress?.status || 'not-started';

    // Same status — no-op
    if (currentStatus === targetStatus) return;

    // Forward transition — apply immediately
    if (!isBackwardTransition(currentStatus, targetStatus)) {
      updateProgress(recId, targetStatus);
      return;
    }

    // Backward transition — show confirmation
    setPendingReset({ recId, targetStatus });
  };

  const confirmReset = () => {
    if (!pendingReset) return;
    updateProgress(pendingReset.recId, pendingReset.targetStatus);
    setPendingReset(null);
  };

  const cancelReset = () => {
    setPendingReset(null);
  };

  /** Handle manual date change for startedAt */
  const handleStartedAtChange = (recId: string, dateStr: string) => {
    if (!dateStr) return;
    const isoDate = new Date(dateStr + 'T00:00:00').toISOString();
    updateStartedAt(recId, isoDate);
  };

  /** Handle manual date change for completedAt */
  const handleCompletedAtChange = (recId: string, dateStr: string) => {
    if (!dateStr) return;
    const isoDate = new Date(dateStr + 'T00:00:00').toISOString();
    updateCompletedAt(recId, isoDate);
  };

  // Start with all categories expanded
  const allCategoryIds = useMemo(() => {
    return Array.from(groupedByCategory.keys());
  }, [groupedByCategory]);

  // Initialize expanded state on first render
  useMemo(() => {
    if (expandedCategories.size === 0 && allCategoryIds.length > 0) {
      setExpandedCategories(new Set(allCategoryIds));
    }
  }, [allCategoryIds]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <CheckSquare className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      {/* Overall progress bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{t('overall')}</span>
            <span className="text-2xl font-bold">{completionPct}%</span>
          </div>
          <Progress value={completionPct} className="mb-4 [&>div]:bg-green-500" />
        </CardContent>
      </Card>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {([
          { key: 'all' as FilterValue, count: totalCount },
          { key: 'not-started' as FilterValue, count: statusCounts['not-started'] },
          { key: 'in-progress' as FilterValue, count: statusCounts['in-progress'] },
          { key: 'completed' as FilterValue, count: statusCounts.completed },
        ] as const).map(({ key, count }) => {
          const isActive = filter === key;
          const labelKey =
            key === 'all'
              ? 'all'
              : key === 'not-started'
                ? 'notStarted'
                : key === 'in-progress'
                  ? 'inProgress'
                  : 'completed';
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t(`filter.${labelKey}`, { count })}
            </button>
          );
        })}
      </div>

      {/* Category groups */}
      <div className="space-y-4">
        {Array.from(groupedByCategory.entries()).map(([categoryId, recs]) => {
          const category = config.categories.find((c) => c.id === categoryId);
          if (!category) return null;

          const filteredRecs = getFilteredRecs(recs);
          if (filteredRecs.length === 0 && filter !== 'all') return null;

          const categoryName = tAll(category.nameKey);
          const doneCount = getCategoryDoneCount(categoryId);
          const totalInCategory = recs.length;
          const isExpanded = expandedCategories.has(categoryId);
          const categoryPct =
            totalInCategory > 0 ? Math.round((doneCount / totalInCategory) * 100) : 0;

          return (
            <div key={categoryId} className="rounded-lg border">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(categoryId)}
                className="flex w-full items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg">{category.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{categoryName}</h3>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {t('categoryProgress', { done: doneCount, total: totalInCategory })}
                    </span>
                  </div>
                  <Progress
                    value={categoryPct}
                    className="mt-1.5 h-1.5 [&>div]:bg-green-500"
                  />
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Recommendations list */}
              {isExpanded && (
                <div className="border-t px-4 pb-4">
                  {(filter === 'all' ? recs : filteredRecs).map((rec) => {
                    const progress = getProgress(rec.id);
                    const currentStatus = progress?.status || 'not-started';
                    const isDetailOpen = expandedDetails.has(rec.id);
                    const isPendingThis =
                      pendingReset !== null && pendingReset.recId === rec.id;

                    return (
                      <div
                        key={rec.id}
                        className={`mt-3 rounded-lg border p-3 transition-opacity ${currentStatus === 'completed' ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-medium ${currentStatus === 'completed' ? 'line-through text-muted-foreground' : ''}`}
                            >
                              {tAll(rec.titleKey)}
                            </p>
                          </div>

                          {/* Status toggle buttons */}
                          <div className="flex flex-shrink-0 items-center gap-1">
                            {STATUS_ORDER.map((status) => {
                              const isActive = currentStatus === status;
                              let icon;
                              let activeClasses: string;

                              if (status === 'not-started') {
                                icon = <Circle className="size-3.5" />;
                                activeClasses =
                                  'bg-gray-100 text-gray-700 border-gray-300';
                              } else if (status === 'in-progress') {
                                icon = <Clock className="size-3.5" />;
                                activeClasses =
                                  'bg-blue-100 text-blue-700 border-blue-300';
                              } else {
                                icon = <CheckCircle2 className="size-3.5" />;
                                activeClasses =
                                  'bg-green-100 text-green-700 border-green-300';
                              }

                              const labelKey =
                                status === 'not-started'
                                  ? 'notStarted'
                                  : status === 'in-progress'
                                    ? 'inProgress'
                                    : 'completed';

                              return (
                                <button
                                  key={status}
                                  onClick={() => handleStatusClick(rec.id, status)}
                                  title={t(`status.${labelKey}`)}
                                  className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                                    isActive
                                      ? activeClasses
                                      : 'border-transparent text-muted-foreground hover:bg-muted'
                                  }`}
                                >
                                  {icon}
                                  <span className="hidden sm:inline">
                                    {t(`status.${labelKey}`)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Inline reset confirmation */}
                        {isPendingThis && (
                          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="mt-0.5 size-4 flex-shrink-0 text-amber-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-amber-900">
                                  {t('resetConfirm.title')}
                                </p>
                                <p className="mt-1 text-xs text-amber-700">
                                  {t('resetConfirm.description')}
                                </p>
                                <div className="mt-2 flex gap-2">
                                  <button
                                    onClick={confirmReset}
                                    className="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-700 transition-colors"
                                  >
                                    {t('resetConfirm.confirm')}
                                  </button>
                                  <button
                                    onClick={cancelReset}
                                    className="rounded-md border border-amber-300 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                                  >
                                    {t('resetConfirm.cancel')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Timestamps row */}
                        {(progress?.startedAt || progress?.completedAt) && (
                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                            {progress.startedAt && (
                              <span>
                                {t('startedAt')}: {formatDate(progress.startedAt)}
                              </span>
                            )}
                            {progress.completedAt && (
                              <span>
                                {t('completedAt')}: {formatDate(progress.completedAt)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Expandable details */}
                        <button
                          onClick={() => toggleDetails(rec.id)}
                          className="mt-2 flex items-center gap-1 text-xs text-blue-600 transition-colors hover:text-blue-800"
                        >
                          <ChevronDown
                            className={`size-3 transition-transform ${isDetailOpen ? 'rotate-180' : ''}`}
                          />
                          {t('details')}
                        </button>

                        {isDetailOpen && (
                          <div className="mt-2 space-y-3 border-t pt-3">
                            {/* Responsible */}
                            <div>
                              <label className="mb-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                <User className="size-3" />
                                {t('responsible')}
                              </label>
                              <input
                                type="text"
                                value={progress?.responsible || ''}
                                onChange={(e) =>
                                  updateResponsible(rec.id, e.target.value)
                                }
                                placeholder={t('responsiblePlaceholder')}
                                className="w-full rounded-md border px-3 py-1.5 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                            </div>

                            {/* Notes */}
                            <div>
                              <label className="mb-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                <StickyNote className="size-3" />
                                {t('notes')}
                              </label>
                              <textarea
                                value={progress?.notes || ''}
                                onChange={(e) => updateNotes(rec.id, e.target.value)}
                                placeholder={t('notesPlaceholder')}
                                rows={2}
                                className="w-full resize-y rounded-md border px-3 py-1.5 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                            </div>

                            {/* Manual date inputs */}
                            <div>
                              <label className="mb-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                <Calendar className="size-3" />
                                {t('manualDate')}
                              </label>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <div>
                                  <label className="mb-0.5 block text-[11px] text-muted-foreground">
                                    {t('startedAt')}
                                  </label>
                                  <input
                                    type="date"
                                    value={isoToDateInput(progress?.startedAt)}
                                    onChange={(e) =>
                                      handleStartedAtChange(rec.id, e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                  />
                                </div>
                                <div>
                                  <label className="mb-0.5 block text-[11px] text-muted-foreground">
                                    {t('completedAt')}
                                  </label>
                                  <input
                                    type="date"
                                    value={isoToDateInput(progress?.completedAt)}
                                    onChange={(e) =>
                                      handleCompletedAtChange(rec.id, e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Cross-regulation cascade suggestion */}
                        {currentStatus === 'completed' && (() => {
                          const crossRegEntries = getCrossRegRecommendations(rec.id, currentRegulation);
                          if (crossRegEntries.length === 0) return null;
                          const isCrossRegOpen = expandedCrossReg.has(rec.id);

                          return (
                            <div className="mt-3">
                              <button
                                onClick={() => toggleCrossReg(rec.id)}
                                className="flex items-center gap-1.5 text-xs text-indigo-600 transition-colors hover:text-indigo-800"
                              >
                                <Link2 className="size-3" />
                                <span>{t('crossReg.title')}</span>
                                <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700">
                                  {crossRegEntries.length}
                                </span>
                                <ChevronDown
                                  className={`size-3 transition-transform ${isCrossRegOpen ? 'rotate-180' : ''}`}
                                />
                              </button>

                              {isCrossRegOpen && (
                                <div className="mt-2 rounded-md border border-indigo-200 bg-indigo-50/50 p-3">
                                  <p className="mb-2 text-xs font-medium text-indigo-900">
                                    {t('crossReg.alsoCovers')}
                                  </p>
                                  <div className="space-y-2">
                                    {crossRegEntries.map((entry) => {
                                      const allMarked = entry.recommendationIds.every(
                                        (id) => markedCrossReg.has(`${entry.regulationId}:${id}`)
                                      );

                                      return (
                                        <div
                                          key={entry.regulationId}
                                          className="rounded-md border border-indigo-100 bg-white p-2"
                                        >
                                          <div className="flex items-center justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                              <span className="inline-block rounded bg-indigo-100 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-800">
                                                {entry.regulationLabel}
                                              </span>
                                              <span className="ml-2 text-[11px] text-muted-foreground">
                                                {entry.recommendationIds.length} {t('crossReg.recId')}{entry.recommendationIds.length !== 1 ? 'n' : ''}
                                              </span>
                                            </div>
                                            {allMarked ? (
                                              <span className="flex items-center gap-1 text-[11px] font-medium text-green-700">
                                                <CheckCircle2 className="size-3" />
                                                {t('crossReg.marked')}
                                              </span>
                                            ) : (
                                              <button
                                                onClick={() => handleCrossRegMarkAll(entry)}
                                                className="rounded-md bg-indigo-600 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-indigo-700"
                                              >
                                                {t('crossReg.markComplete')}
                                              </button>
                                            )}
                                          </div>

                                          {/* Individual recommendation IDs */}
                                          <div className="mt-1.5 flex flex-wrap gap-1">
                                            {entry.recommendationIds.map((targetRecId) => {
                                              const isMarked = markedCrossReg.has(
                                                `${entry.regulationId}:${targetRecId}`
                                              );
                                              return (
                                                <button
                                                  key={targetRecId}
                                                  onClick={() =>
                                                    !isMarked &&
                                                    handleCrossRegMark(entry.regulationId, targetRecId)
                                                  }
                                                  disabled={isMarked}
                                                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono transition-colors ${
                                                    isMarked
                                                      ? 'bg-green-100 text-green-700 line-through'
                                                      : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer'
                                                  }`}
                                                >
                                                  {targetRecId}
                                                </button>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
