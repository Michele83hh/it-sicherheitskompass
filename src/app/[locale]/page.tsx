import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Shield,
  CheckCircle2,
  FileText,
  ArrowRight,
  AlertTriangle,
  Lock,
  Zap,
  ClipboardCheck,
  BarChart3,
  Building2,
  Layers,
  Siren,
  ListChecks,
  Scale,
  Map,
  Users,
  User,
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('landing');

  return (
    <div className="bg-gradient-to-b from-white to-zinc-50">
      {/* ─── HERO: Titel + CTA + Trust-Bar ─── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10">
            <Button size="lg" className="text-lg px-6 py-4 sm:px-8 sm:py-6" asChild>
              <Link href="/check">
                <Shield className="mr-2 size-5" />
                {t('hero.ctaPrimary')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust-Bar direkt unter CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 rounded-lg border border-blue-200 bg-blue-50 px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Scale className="size-4 flex-shrink-0" />
            <span>{t('trust.foundationBar.basis')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-blue-300" aria-hidden="true" />
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Lock className="size-4 flex-shrink-0" />
            <span>{t('trust.foundationBar.local')}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-blue-300" aria-hidden="true" />
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <CheckCircle2 className="size-4 flex-shrink-0" />
            <span>{t('trust.foundationBar.free')}</span>
          </div>
        </div>
      </section>

      {/* ─── ANALYSE-WAHL: 3 Karten ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          {t('assessments.title')}
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {/* Schnellcheck */}
          <Link href="/schnellcheck" className="group flex flex-col rounded-lg border-2 border-green-200 bg-green-50 p-6 text-left transition-all hover:border-green-400 hover:shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="size-5 text-green-700" />
              <span className="text-xs font-bold uppercase tracking-wide text-green-700">{t('hero.quickCheck.badge')}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{t('hero.quickCheck.title')}</p>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{t('hero.quickCheck.description')}</p>
            <p className="mt-4 text-sm font-medium text-green-700 group-hover:underline flex items-center gap-1">
              {t('hero.quickCheck.cta')} <ArrowRight className="size-4" />
            </p>
          </Link>

          {/* Kernanalyse — empfohlen */}
          <Link href="/gap-analysis" className="group flex flex-col rounded-lg border-2 border-blue-300 bg-blue-50 p-6 text-left transition-all hover:border-blue-500 hover:shadow-md ring-2 ring-blue-200 ring-offset-2">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck className="size-5 text-blue-700" />
              <span className="text-xs font-bold uppercase tracking-wide text-blue-700">{t('hero.coreCheck.badge')}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{t('hero.coreCheck.title')}</p>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{t('hero.coreCheck.description')}</p>
            <p className="mt-4 text-sm font-medium text-blue-700 group-hover:underline flex items-center gap-1">
              {t('hero.coreCheck.cta')} <ArrowRight className="size-4" />
            </p>
          </Link>

          {/* Vollständige Analyse */}
          <Link href="/gap-analysis" className="group flex flex-col rounded-lg border-2 border-purple-200 bg-purple-50 p-6 text-left transition-all hover:border-purple-400 hover:shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="size-5 text-purple-700" />
              <span className="text-xs font-bold uppercase tracking-wide text-purple-700">{t('hero.fullCheck.badge')}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{t('hero.fullCheck.title')}</p>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{t('hero.fullCheck.description')}</p>
            <p className="mt-4 text-sm font-medium text-purple-700 group-hover:underline flex items-center gap-1">
              {t('hero.fullCheck.cta')} <ArrowRight className="size-4" />
            </p>
          </Link>
        </div>
      </section>

      {/* ─── DRINGLICHKEIT: Bußgeld + NIS2 Zahlen ─── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Bußgeld-Cards */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-6 text-red-600" />
                  <CardTitle className="text-lg text-red-800">
                    {t('penalty.essential.title')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-700">
                  {t('penalty.essential.amount')}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  {t('penalty.essential.legal')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-6 text-orange-600" />
                  <CardTitle className="text-lg text-orange-800">
                    {t('penalty.important.title')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-700">
                  {t('penalty.important.amount')}
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  {t('penalty.important.legal')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* NIS2 Zahlen */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-5 rounded-lg border bg-zinc-50">
              <Building2 className="mx-auto mb-2 size-7 text-primary" />
              <p className="text-3xl font-bold text-foreground">{t('stats.companies.number')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('stats.companies.label')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-zinc-50">
              <Layers className="mx-auto mb-2 size-7 text-primary" />
              <p className="text-3xl font-bold text-foreground">{t('stats.sectors.number')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('stats.sectors.label')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-zinc-50">
              <Siren className="mx-auto mb-2 size-7 text-red-600" />
              <p className="text-3xl font-bold text-foreground">{t('stats.reporting.number')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('stats.reporting.label')}</p>
            </div>
            <div className="text-center p-5 rounded-lg border bg-zinc-50">
              <ListChecks className="mx-auto mb-2 size-7 text-primary" />
              <p className="text-3xl font-bold text-foreground">{t('stats.domains.number')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('stats.domains.label')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FÜR WEN: Zielgruppen-Section ─── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            {t('targetAudience.title')}
          </h2>
          <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border bg-zinc-50 p-4">
              <Building2 className="mt-0.5 size-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{t('targetAudience.items.sme')}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-zinc-50 p-4">
              <Shield className="mt-0.5 size-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{t('targetAudience.items.itManagers')}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-zinc-50 p-4">
              <Users className="mt-0.5 size-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{t('targetAudience.items.management')}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-zinc-50 p-4">
              <ClipboardCheck className="mt-0.5 size-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{t('targetAudience.items.consultants')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAS SIE ERHALTEN: Features + Methodik kombiniert ─── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-foreground">
          {t('combined.title')}
        </h2>
        <p className="mb-10 text-center text-muted-foreground max-w-2xl mx-auto">
          {t('combined.subtitle')}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-5">
            <FileText className="mb-3 size-6 text-primary" />
            <p className="font-semibold">{t('combined.pdf.title')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('combined.pdf.desc')}</p>
          </div>
          <div className="rounded-lg border bg-white p-5">
            <Map className="mb-3 size-6 text-primary" />
            <p className="font-semibold">{t('combined.roadmap.title')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('combined.roadmap.desc')}</p>
          </div>
          <div className="rounded-lg border bg-white p-5">
            <Shield className="mb-3 size-6 text-primary" />
            <p className="font-semibold">{t('combined.bsi.title')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('combined.bsi.desc')}</p>
          </div>
          <div className="rounded-lg border bg-white p-5">
            <Lock className="mb-3 size-6 text-primary" />
            <p className="font-semibold">{t('combined.privacy.title')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('combined.privacy.desc')}</p>
          </div>
        </div>
      </section>

      {/* ─── IDENTITY: Wer steckt dahinter ─── */}
      <section className="border-t bg-zinc-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <User className="size-4" />
            <span>{t('identity.label')}</span>
            <span className="font-medium text-foreground">{t('identity.name')}</span>
            <span className="hidden sm:inline">—</span>
            <span className="hidden sm:inline">{t('identity.role')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
