'use client';

import { useTranslations } from 'next-intl';
import { Shield, Lock, Building2, Landmark, Car, Cpu, BookOpen } from 'lucide-react';
import type { LegalReference } from '@/lib/pillars/types';

const REG_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  nis2: Shield,
  dsgvo: Lock,
  kritis: Building2,
  dora: Landmark,
  tisax: Car,
  cra: Cpu,
  'bsi-grundschutz': BookOpen,
};

const REG_COLOR_MAP: Record<string, string> = {
  nis2: 'text-blue-600',
  dsgvo: 'text-emerald-600',
  kritis: 'text-red-600',
  dora: 'text-amber-600',
  tisax: 'text-violet-600',
  cra: 'text-cyan-600',
  'bsi-grundschutz': 'text-slate-600',
};

const REG_NAME_MAP: Record<string, string> = {
  nis2: 'nis2.name',
  dsgvo: 'dsgvo.name',
  kritis: 'kritis.name',
  dora: 'dora.name',
  tisax: 'tisax.name',
  cra: 'cra.name',
  'bsi-grundschutz': 'bsiGrundschutz.name',
};

interface LegalReferenceTableProps {
  references: LegalReference[];
  introKey?: string;
}

export function LegalReferenceTable({ references, introKey }: LegalReferenceTableProps) {
  const t = useTranslations();

  return (
    <div className="rounded-lg border bg-white">
      {introKey && (
        <div className="border-b px-4 py-3 bg-slate-50">
          <h3 className="text-sm font-semibold text-foreground">{t(introKey)}</h3>
        </div>
      )}
      <div className="divide-y">
        {references.map((ref, i) => {
          const Icon = REG_ICON_MAP[ref.regulationId] || Shield;
          const color = REG_COLOR_MAP[ref.regulationId] || 'text-gray-600';
          const nameKey = REG_NAME_MAP[ref.regulationId];
          return (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <Icon className={`size-4 mt-0.5 flex-shrink-0 ${color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-semibold ${color}`}>
                    {nameKey ? t(nameKey) : ref.regulationId.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {ref.articleKey}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(ref.descriptionKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
