'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

type IncidentType = 'ransomware' | 'data-leak' | 'ddos' | 'phishing';

interface Deadline {
  id: string;
  labelKey: string;
  hours: number;
  regulationKey: string;
  descriptionKey: string;
}

const DEADLINES: Deadline[] = [
  { id: 'nis2-initial', labelKey: 'pillars.timer.deadlines.nis2Initial', hours: 24, regulationKey: 'NIS2 Art. 23 Abs. 4a', descriptionKey: 'pillars.timer.deadlines.nis2InitialDesc' },
  { id: 'dsgvo-72h', labelKey: 'pillars.timer.deadlines.dsgvo72h', hours: 72, regulationKey: 'DSGVO Art. 33 Abs. 1', descriptionKey: 'pillars.timer.deadlines.dsgvo72hDesc' },
  { id: 'nis2-detail', labelKey: 'pillars.timer.deadlines.nis2Detail', hours: 72, regulationKey: 'NIS2 Art. 23 Abs. 4b', descriptionKey: 'pillars.timer.deadlines.nis2DetailDesc' },
  { id: 'dora-initial', labelKey: 'pillars.timer.deadlines.doraInitial', hours: 4, regulationKey: 'DORA Art. 19 Abs. 4a', descriptionKey: 'pillars.timer.deadlines.doraInitialDesc' },
  { id: 'nis2-final', labelKey: 'pillars.timer.deadlines.nis2Final', hours: 720, regulationKey: 'NIS2 Art. 23 Abs. 4c', descriptionKey: 'pillars.timer.deadlines.nis2FinalDesc' },
];

function formatTimeRemaining(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function IncidentTimer() {
  const t = useTranslations();
  const [incidentType, setIncidentType] = useState<IncidentType>('ransomware');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleStart = useCallback(() => {
    setStartTime(Date.now());
    setNow(Date.now());
  }, []);

  const handleReset = useCallback(() => {
    setStartTime(null);
  }, []);

  const elapsed = startTime ? now - startTime : 0;

  const incidentTypes: { id: IncidentType; labelKey: string }[] = [
    { id: 'ransomware', labelKey: 'pillars.timer.types.ransomware' },
    { id: 'data-leak', labelKey: 'pillars.timer.types.dataLeak' },
    { id: 'ddos', labelKey: 'pillars.timer.types.ddos' },
    { id: 'phishing', labelKey: 'pillars.timer.types.phishing' },
  ];

  return (
    <div className="rounded-lg border-2 border-red-200 bg-red-50/50">
      <div className="border-b border-red-200 bg-red-100/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Clock className="size-5 text-red-600" />
          <h3 className="text-sm font-bold text-red-800">{t('pillars.timer.title')}</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Incident type selector */}
        <div>
          <label className="text-xs font-semibold text-red-800 mb-2 block">
            {t('pillars.timer.selectType')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {incidentTypes.map(type => (
              <button
                key={type.id}
                onClick={() => { if (!startTime) setIncidentType(type.id); }}
                className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
                  incidentType === type.id
                    ? 'border-red-400 bg-red-100 text-red-800'
                    : 'border-red-200 bg-white text-red-600 hover:bg-red-50'
                } ${startTime ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {t(type.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Start / Reset */}
        <div className="flex gap-2">
          {!startTime ? (
            <Button onClick={handleStart} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              <Play className="mr-2 size-4" />
              {t('pillars.timer.startButton')}
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="flex-1 border-red-300 text-red-700 hover:bg-red-50">
              <RotateCcw className="mr-2 size-4" />
              {t('pillars.timer.resetButton')}
            </Button>
          )}
        </div>

        {/* Elapsed time */}
        {startTime && (
          <div className="text-center py-2">
            <p className="text-xs text-red-600 font-semibold">{t('pillars.timer.elapsed')}</p>
            <p className="text-2xl font-mono font-bold text-red-800">{formatTimeRemaining(elapsed)}</p>
          </div>
        )}

        {/* Deadline bars */}
        {startTime && (
          <div className="space-y-3">
            {[...DEADLINES].sort((a, b) => a.hours - b.hours).map(deadline => {
              const deadlineMs = deadline.hours * 60 * 60 * 1000;
              const remaining = deadlineMs - elapsed;
              const progress = Math.min((elapsed / deadlineMs) * 100, 100);
              const isExpired = remaining <= 0;
              const isUrgent = remaining > 0 && remaining < 3600000; // < 1h left

              return (
                <div key={deadline.id} className="rounded-md border bg-white p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {isExpired ? (
                        <AlertTriangle className="size-3.5 text-red-500" />
                      ) : (
                        <CheckCircle2 className={`size-3.5 ${isUrgent ? 'text-amber-500' : 'text-emerald-500'}`} />
                      )}
                      <span className="text-xs font-semibold">{t(deadline.labelKey)}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {isExpired ? t('pillars.timer.expired') : formatTimeRemaining(remaining)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 mb-1">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        isExpired ? 'bg-red-500' : isUrgent ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{deadline.regulationKey}</span>
                    <span className="text-[10px] text-muted-foreground">{t(deadline.descriptionKey)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
