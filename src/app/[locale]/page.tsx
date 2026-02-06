import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HomePage() {
  const t = useTranslations('landing');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <Button size="lg" className="text-lg">
          {t('cta')}
        </Button>

        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t('features.fast.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('features.fast.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('features.smart.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('features.smart.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('features.actionable.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('features.actionable.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
