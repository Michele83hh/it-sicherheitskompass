import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import {
  Shield,
  ArrowRight,
  Lock,
  Scale,
  CheckCircle2,
  Zap,
  ClipboardList,
  HelpCircle,
} from 'lucide-react';
import { isValidRegulationId, getRegulation } from '@/lib/regulations/registry';
import '@/lib/regulations/init';

export default async function RegulationLandingPage({
  params,
}: {
  params: Promise<{ locale: string; regulation: string }>;
}) {
  const { regulation } = await params;

  if (!isValidRegulationId(regulation)) {
    notFound();
  }

  return <RegulationLanding regulation={regulation} />;
}

function RegulationLanding({ regulation }: { regulation: string }) {
  const t = useTranslations('landing');
  const tReg = useTranslations();

  const regConfig = getRegulation(regulation);
  const isNis2 = regulation === 'nis2';
  const hasQuickCheck = regConfig?.features.hasQuickCheck ?? false;
  const hasClassification = regConfig?.features.hasClassification ?? false;

  const regName = regConfig ? tReg(regConfig.nameKey) : regulation;

  /* ─── Dynamic question counts & time estimates ─── */
  const assessmentCount = regConfig?.questions.length ?? 0;
  const quickCheckCount = regConfig?.quickCheckQuestions?.length ?? 0;
  const assessmentMinutes = Math.max(5, Math.round(assessmentCount / 3));
  const quickCheckMinutes = Math.max(2, Math.round(quickCheckCount / 3));

  /* ─── Build option cards ─── */
  const cards: {
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
    title: string;
    desc: string;
    time: string;
    cta: string;
    href: string;
    accent: string;
    iconBg: string;
  }[] = [];

  if (hasClassification) {
    cards.push({
      icon: HelpCircle,
      badge: tReg('regLanding.classificationBadge'),
      title: tReg('regLanding.classificationTitle'),
      desc: tReg('regLanding.classificationDesc'),
      time: tReg('regLanding.classificationTime', { minutes: 2 }),
      cta: tReg('regLanding.classificationCta'),
      href: `/${regulation}/check`,
      accent: 'border-amber-200 hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-600',
    });
  }

  if (hasQuickCheck) {
    cards.push({
      icon: Zap,
      badge: tReg('regLanding.quickCheckBadge'),
      title: tReg('regLanding.quickCheckTitle'),
      desc: tReg('regLanding.quickCheckDesc', { count: quickCheckCount }),
      time: tReg('regLanding.quickCheckTime', { minutes: quickCheckMinutes }),
      cta: tReg('regLanding.quickCheckCta'),
      href: `/${regulation}/schnellcheck`,
      accent: 'border-blue-200 hover:border-blue-300',
      iconBg: 'bg-blue-50 text-blue-600',
    });
  }

  cards.push({
    icon: ClipboardList,
    badge: tReg('regLanding.assessmentBadge'),
    title: tReg('regLanding.assessmentTitle'),
    desc: tReg('regLanding.assessmentDesc', { count: assessmentCount }),
    time: tReg('regLanding.assessmentTime', { minutes: assessmentMinutes }),
    cta: tReg('regLanding.assessmentCta'),
    href: `/${regulation}/assessment`,
    accent: 'border-emerald-200 hover:border-emerald-300',
    iconBg: 'bg-emerald-50 text-emerald-600',
  });

  /* ─── Grid layout: 2 cols for 2 cards, 3 cols for 3 cards ─── */
  const gridCols = cards.length === 3
    ? 'sm:grid-cols-3'
    : 'sm:grid-cols-2 max-w-2xl';

  return (
    <div className="bg-white">
      {/* Hero — same dark gradient as home screen */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {isNis2 ? t('hero.title') : tReg(`regLanding.${regulation}.title`)}
          </h1>
          <p className="mt-4 text-lg text-slate-300 whitespace-pre-line">
            {isNis2 ? t('hero.subtitle') : tReg(`regLanding.${regulation}.subtitle`)}
          </p>
        </div>
      </section>

      {/* Option Cards */}
      <section className="mx-auto max-w-4xl px-4 pt-12 pb-12 sm:px-6 sm:pt-16 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-foreground mb-8">
          {tReg('regLanding.choosePathTitle')}
        </h2>

        <div className={`mx-auto grid gap-4 ${gridCols}`}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.href}
                className={`relative flex flex-col rounded-xl border bg-white p-6 transition-colors ${card.accent}`}
              >
                {/* Icon + Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {card.badge}
                  </span>
                </div>

                {/* Title + Desc */}
                <h3 className="text-base font-bold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {card.desc}
                </p>

                {/* Time + CTA */}
                <div className="mt-auto">
                  <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 mb-4">
                    {card.time}
                  </span>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20" asChild>
                    <Link href={card.href as any}>
                      {card.cta}
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 rounded-lg border border-slate-200 bg-slate-50 px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Scale className="size-4 flex-shrink-0" />
            <span>{t('trust.foundationBar.basis')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-300" aria-hidden="true" />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Lock className="size-4 flex-shrink-0" />
            <span>{t('trust.foundationBar.local')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-300" aria-hidden="true" />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="size-4 flex-shrink-0" />
            <span>{t('trust.foundationBar.free')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
