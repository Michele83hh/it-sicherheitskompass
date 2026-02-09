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

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {isNis2 ? t('hero.title') : tReg(`regLanding.${regulation}.title`)}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {isNis2 ? t('hero.subtitle') : tReg(`regLanding.${regulation}.subtitle`)}
          </p>

          {/* Primary CTA */}
          <div className="mt-10">
            {hasQuickCheck ? (
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href={`/${regulation}/schnellcheck` as any}>
                  <Shield className="mr-2 size-5" />
                  {tReg('regLanding.quickCheckCta')} — 5 Min.
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href={`/${regulation}/assessment` as any}>
                  <Shield className="mr-2 size-5" />
                  {tReg('regLanding.assessmentCta')}
                </Link>
              </Button>
            )}
          </div>

          {/* Secondary text links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {hasQuickCheck && (
              <Link
                href={`/${regulation}/assessment` as any}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Direkt zur vollständigen Analyse <ArrowRight className="size-3" />
              </Link>
            )}
            {hasClassification && (
              <Link
                href={`/${regulation}/check` as any}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Betroffenheit prüfen <ArrowRight className="size-3" />
              </Link>
            )}
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 rounded-lg border border-slate-200 bg-slate-50 px-6 py-3">
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
