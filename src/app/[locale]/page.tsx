import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Shield,
  Lock,
  Landmark,
  Car,
  Cpu,
  BookOpen,
  Building2,
  Search,
  ClipboardCheck,
  Target,
} from 'lucide-react';
import { getAllRegulations } from '@/lib/regulations/registry';
import '@/lib/regulations/init';

/* ─── Icon & Style Maps ─── */

const REG_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Lock, Building2, Landmark, Car, Cpu, BookOpen,
};

const REG_STYLE: Record<string, { text: string; bg: string }> = {
  nis2:              { text: 'text-blue-400',    bg: 'bg-blue-500/10' },
  dsgvo:             { text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  kritis:            { text: 'text-red-400',     bg: 'bg-red-500/10' },
  dora:              { text: 'text-amber-400',   bg: 'bg-amber-500/10' },
  tisax:             { text: 'text-violet-400',  bg: 'bg-violet-500/10' },
  cra:               { text: 'text-cyan-400',    bg: 'bg-cyan-500/10' },
  'bsi-grundschutz': { text: 'text-slate-400',   bg: 'bg-slate-500/10' },
};

/* ─── Step Icons ─── */

const STEP_ICONS = [Search, ClipboardCheck, Target] as const;

/* ─── Page ─── */

export default function HubPage() {
  const t = useTranslations('platform.hub');
  const tReg = useTranslations();

  const regulations = getAllRegulations();

  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO — Neuer Stil: kompakt, grüner CTA, Trust einzeilig
         ══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {t('hero.subtitle')}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-sm text-slate-400">
            <span>{t('trustBar.basis')}</span>
            <span className="text-slate-600">·</span>
            <span>{t('trustBar.free')}</span>
            <span className="text-slate-600">·</span>
            <span>{t('trustBar.anonymous')}</span>
            <span className="text-slate-600">·</span>
            <span>{t('trustBar.questions')}</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SO FUNKTIONIERT'S (3 Schritte) — Original
         ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground">
            {t('howItWorks.title')}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((step) => {
            const Icon = STEP_ICONS[step - 1];
            return (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 mb-3">
                  <Icon className="size-5" />
                </div>

                {/* Connector */}
                {step < 3 && (
                  <div className="hidden sm:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-slate-200" aria-hidden="true" />
                )}

                <h3 className="text-base font-semibold text-foreground mb-1">
                  {t(`howItWorks.step${step}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {t(`howItWorks.step${step}.desc`)}
                </p>
                <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {t(`howItWorks.step${step}.time`)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — Zentraler Button zwischen Schritte und Regelwerke
         ══════════════════════════════════════════════════════ */}
      <section className="text-center pb-12">
        <Button
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-10 py-7 font-semibold rounded-xl shadow-lg shadow-emerald-500/20"
          asChild
        >
          <Link href="/navigator">
            {t('hero.cta')}
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </Button>
      </section>

      {/* ══════════════════════════════════════════════════════
          REGELWERKE — Original (alle 11)
         ══════════════════════════════════════════════════════ */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <h2 className="text-center text-lg font-semibold text-muted-foreground mb-6">
            {t('directAccessTitle')}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {regulations.map((reg) => {
              const s = REG_STYLE[reg.id] || REG_STYLE.nis2;
              const Icon = REG_ICON_MAP[reg.icon] || Shield;
              return (
                <Link
                  key={reg.id}
                  href={`/${reg.id}` as any}
                  className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                    <Icon className={`size-4 ${s.text}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {tReg(reg.nameKey)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {t('regulationQuestions', { count: reg.questions.length })}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          IDENTITÄT — Original
         ══════════════════════════════════════════════════════ */}
      <section className="border-t border-slate-100 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>{t('identity.createdBy')}</span>
            <span className="font-semibold text-foreground text-base">{t('identity.authorName')}</span>
            <span>{t('identity.authorRole')}</span>
            <span className="text-xs mt-1">{t('identity.projectLabel')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
