import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { notFound } from 'next/navigation';
import {
  FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert,
  ArrowRight, ChevronLeft,
} from 'lucide-react';
import { getPillar } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { PILLAR_IDS } from '@/lib/pillars/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, KeyRound, Database, Server, Network, Cloud, Smartphone, ShieldAlert,
};

const COLOR_MAP: Record<string, { text: string; border: string; lightBg: string }> = {
  blue: { text: 'text-blue-700', border: 'border-blue-200', lightBg: 'bg-blue-50' },
  violet: { text: 'text-violet-700', border: 'border-violet-200', lightBg: 'bg-violet-50' },
  emerald: { text: 'text-emerald-700', border: 'border-emerald-200', lightBg: 'bg-emerald-50' },
  orange: { text: 'text-orange-700', border: 'border-orange-200', lightBg: 'bg-orange-50' },
  cyan: { text: 'text-cyan-700', border: 'border-cyan-200', lightBg: 'bg-cyan-50' },
  indigo: { text: 'text-indigo-700', border: 'border-indigo-200', lightBg: 'bg-indigo-50' },
  rose: { text: 'text-rose-700', border: 'border-rose-200', lightBg: 'bg-rose-50' },
  red: { text: 'text-red-700', border: 'border-red-200', lightBg: 'bg-red-50' },
};

export function generateStaticParams() {
  return PILLAR_IDS.map((pillarSlug) => ({ pillarSlug }));
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ locale: string; pillarSlug: string }>;
}) {
  const { pillarSlug } = await params;
  const pillar = getPillar(pillarSlug);

  if (!pillar) {
    notFound();
  }

  return <PillarPageContent pillarId={pillarSlug} />;
}

function PillarPageContent({ pillarId }: { pillarId: string }) {
  const t = useTranslations();
  const pillar = getPillar(pillarId)!;
  const Icon = ICON_MAP[pillar.icon] || FileText;
  const colors = COLOR_MAP[pillar.color] || COLOR_MAP.blue;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/wissen"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t('pillars.title')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.lightBg} border ${colors.border}`}>
            <Icon className={`size-7 ${colors.text}`} />
          </div>
          <div>
            <span className={`text-xs font-semibold ${colors.text}`}>
              {t('pillars.pillarLabel', { number: pillar.number })}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t(pillar.nameKey)}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          {t(pillar.descriptionKey)}
        </p>
      </div>

      {/* Components list */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-foreground mb-4">
          {t('pillars.componentsTitle', { count: pillar.components.length })}
        </h2>
        {[...pillar.components].sort((a, b) => a.order - b.order).map((comp, index) => (
          <Link
            key={comp.id}
            href={`/wissen/${pillar.id}/${comp.id}` as any}
            className="group flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 hover:border-primary/30 transition-all"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.lightBg} border ${colors.border} flex-shrink-0`}>
              <span className={`text-sm font-bold ${colors.text}`}>{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {t(comp.nameKey)}
              </p>
              <div className="flex items-center gap-1 mt-1 flex-wrap">
                {comp.regulationIds.slice(0, 4).map(regId => (
                  <span key={regId} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    {regId.toUpperCase()}
                  </span>
                ))}
                {comp.regulationIds.length > 4 && (
                  <span className="text-[10px] text-muted-foreground">+{comp.regulationIds.length - 4}</span>
                )}
              </div>
            </div>
            {comp.interactiveFeature && (
              <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {t('pillars.interactive')}
              </span>
            )}
            <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
