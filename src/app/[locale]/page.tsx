import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, CheckCircle2, FileText, Clock, Sparkles, Target } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('landing');

  return (
    <div className="bg-gradient-to-b from-white to-zinc-50">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
          <div className="mt-10">
            <Button size="lg" className="text-lg px-6 py-4 sm:px-8 sm:py-6" asChild>
              <Link href="/check">{t('cta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-2 transition-shadow hover:shadow-md">
            <CardHeader>
              <Shield className="mb-4 h-12 w-12 text-primary" />
              <CardTitle className="text-xl">{t('value.anonymous.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {t('value.anonymous.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 transition-shadow hover:shadow-md">
            <CardHeader>
              <FileText className="mb-4 h-12 w-12 text-secondary" />
              <CardTitle className="text-xl">{t('value.legal.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {t('value.legal.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 transition-shadow hover:shadow-md">
            <CardHeader>
              <Target className="mb-4 h-12 w-12 text-primary" />
              <CardTitle className="text-xl">{t('value.actionable.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {t('value.actionable.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            {t('steps.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('steps.step1.title')}</h3>
              <p className="text-muted-foreground">{t('steps.step1.description')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-2xl font-bold text-secondary">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('steps.step2.title')}</h3>
              <p className="text-muted-foreground">{t('steps.step2.description')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('steps.step3.title')}</h3>
              <p className="text-muted-foreground">{t('steps.step3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
            {t('trust.title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">{t('trust.nis2.title')}</p>
                <p className="text-sm text-muted-foreground">{t('trust.nis2.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">{t('trust.eu.title')}</p>
                <p className="text-sm text-muted-foreground">{t('trust.eu.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">{t('trust.bsi.title')}</p>
                <p className="text-sm text-muted-foreground">{t('trust.bsi.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
