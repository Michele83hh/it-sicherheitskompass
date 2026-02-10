'use client';

import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import {
  FileText,
  KeyRound,
  Database,
  Server,
  Network,
  Cloud,
  Smartphone,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import type { Pillar } from '@/lib/pillars/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  KeyRound,
  Database,
  Server,
  Network,
  Cloud,
  Smartphone,
  ShieldAlert,
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; hoverBorder: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hoverBorder: 'hover:border-blue-400' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', hoverBorder: 'hover:border-violet-400' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', hoverBorder: 'hover:border-emerald-400' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', hoverBorder: 'hover:border-orange-400' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', hoverBorder: 'hover:border-cyan-400' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', hoverBorder: 'hover:border-indigo-400' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', hoverBorder: 'hover:border-rose-400' },
  red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', hoverBorder: 'hover:border-red-400' },
};

interface PillarCardProps {
  pillar: Pillar;
}

export function PillarCard({ pillar }: PillarCardProps) {
  const t = useTranslations();
  const Icon = ICON_MAP[pillar.icon] || FileText;
  const colors = COLOR_MAP[pillar.color] || COLOR_MAP.blue;

  return (
    <Link
      href={`/wissen/${pillar.id}` as any}
      className={`group flex flex-col rounded-lg border-2 ${colors.border} ${colors.bg} p-6 text-left transition-all ${colors.hoverBorder} hover:shadow-md`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
          <Icon className={`size-5 ${colors.text}`} />
        </div>
        <div>
          <span className="text-xs font-semibold text-muted-foreground">
            {t('pillars.pillarLabel', { number: pillar.number })}
          </span>
          <h3 className={`text-lg font-bold ${colors.text}`}>
            {t(pillar.nameKey)}
          </h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground flex-1 mb-4">
        {t(pillar.descriptionKey)}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {t('pillars.componentCount', { count: pillar.components.length })}
        </span>
        <span className={`text-sm font-medium ${colors.text} group-hover:underline flex items-center gap-1`}>
          {t('pillars.explore')} <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
