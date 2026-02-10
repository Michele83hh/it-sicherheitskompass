'use client';

import { useEffect, useState } from 'react';

interface DonutChartProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  className?: string;
  showTrend?: { direction: 'up' | 'down' | 'stable' | 'new'; delta: number };
}

function getAutoColor(value: number): string {
  if (value < 40) return '#EF4444';
  if (value < 70) return '#F59E0B';
  return '#10B981';
}

export function DonutChart({
  value,
  size = 140,
  strokeWidth = 12,
  color,
  trackColor = '#E5E7EB',
  label,
  sublabel,
  className,
  showTrend,
}: DonutChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.max(0, Math.min(100, animatedValue));
  const offset = circumference - (clampedValue / 100) * circumference;
  const fillColor = color || getAutoColor(value);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 50);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={className} style={{ width: size, position: 'relative' }}>
      <div style={{ width: size, height: size, position: 'relative' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.3s ease' }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <span className="text-2xl font-bold leading-none" style={{ color: fillColor }}>
            {label ?? `${Math.round(value)}%`}
          </span>
          {sublabel && (
            <span className="mt-1 text-xs text-slate-400 leading-none">{sublabel}</span>
          )}
        </div>
      </div>
      {showTrend && showTrend.direction !== 'new' && (
        <div className="mt-1.5 flex items-center justify-center gap-1 text-xs">
          {showTrend.direction === 'up' && (
            <span className="text-emerald-400 font-semibold">
              &#x2191; +{Math.abs(showTrend.delta)}%
            </span>
          )}
          {showTrend.direction === 'down' && (
            <span className="text-red-400 font-semibold">
              &#x2193; {showTrend.delta}%
            </span>
          )}
          {showTrend.direction === 'stable' && (
            <span className="text-slate-400 font-medium">
              &#x2194; 0%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
