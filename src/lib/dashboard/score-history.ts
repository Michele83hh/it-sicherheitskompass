// src/lib/dashboard/score-history.ts

export interface ScoreSnapshot {
  date: string;                          // ISO date string
  scores: Record<string, number>;        // regId -> score
  overallAvg: number;
}

export interface TrendInfo {
  direction: 'up' | 'down' | 'stable' | 'new';
  delta: number;
  comparedTo: string;                    // ISO date of last different snapshot
}

const STORAGE_KEY = 'compliance-score-history';
const MAX_SNAPSHOTS = 30;

export function getScoreHistory(): ScoreSnapshot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScoreSnapshot[];
  } catch {
    return [];
  }
}

export function saveScoreSnapshot(
  current: Record<string, number>,
  overallAvg: number
): void {
  const history = getScoreHistory();
  const now = new Date().toISOString().split('T')[0];

  // Don't save if no data
  if (Object.keys(current).length === 0) return;

  // Check if scores changed since last snapshot
  const last = history[history.length - 1];
  if (last) {
    const lastKeys = Object.keys(last.scores).sort();
    const currentKeys = Object.keys(current).sort();
    const keysMatch = lastKeys.length === currentKeys.length &&
      lastKeys.every((k, i) => k === currentKeys[i]);
    const scoresMatch = keysMatch &&
      lastKeys.every((k) => last.scores[k] === current[k]);

    if (scoresMatch) return; // No change, skip
  }

  const snapshot: ScoreSnapshot = {
    date: now,
    scores: { ...current },
    overallAvg: Math.round(overallAvg * 10) / 10,
  };

  history.push(snapshot);

  // Keep only last N snapshots
  const trimmed = history.slice(-MAX_SNAPSHOTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage full, ignore
  }
}

export function getTrend(history: ScoreSnapshot[]): TrendInfo {
  if (history.length === 0) {
    return { direction: 'new', delta: 0, comparedTo: '' };
  }

  if (history.length === 1) {
    return { direction: 'new', delta: 0, comparedTo: history[0].date };
  }

  const current = history[history.length - 1];
  // Find the last snapshot with a different overall average
  let comparedIdx = -1;
  for (let i = history.length - 2; i >= 0; i--) {
    if (history[i].overallAvg !== current.overallAvg) {
      comparedIdx = i;
      break;
    }
  }

  if (comparedIdx === -1) {
    // All snapshots have the same score
    return { direction: 'stable', delta: 0, comparedTo: history[0].date };
  }

  const previous = history[comparedIdx];
  const delta = Math.round((current.overallAvg - previous.overallAvg) * 10) / 10;

  return {
    direction: delta > 0 ? 'up' : delta < 0 ? 'down' : 'stable',
    delta,
    comparedTo: previous.date,
  };
}
