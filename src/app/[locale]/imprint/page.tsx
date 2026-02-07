'use client';

import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';

export default function ImprintPage() {
  const t = useTranslations('legal.imprint');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>

      {/* Placeholder Notice */}
      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 size-5 shrink-0 text-blue-600" />
          <p className="text-sm text-blue-900">{t('placeholderNotice')}</p>
        </div>
      </div>

      {/* Angaben gemäß § 5 DDG */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('infoTitle')}
        </h2>
        <div className="space-y-2 text-muted-foreground">
          <p className="whitespace-pre-line">{t('name')}</p>
          <p className="whitespace-pre-line">{t('address')}</p>
        </div>
      </section>

      {/* Kontakt */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('contactTitle')}
        </h2>
        <div className="space-y-2 text-muted-foreground">
          <p>{t('email')}</p>
          <p>{t('phone')}</p>
        </div>
      </section>

      {/* Verantwortlich */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('responsibleTitle')}
        </h2>
        <p className="whitespace-pre-line text-muted-foreground">
          {t('responsiblePerson')}
        </p>
      </section>

      {/* Haftungsausschluss */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('disclaimerTitle')}
        </h2>
        <p className="text-muted-foreground">{t('disclaimerText')}</p>
      </section>

      {/* Urheberrecht */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('copyrightTitle')}
        </h2>
        <p className="text-muted-foreground">{t('copyrightText')}</p>
      </section>
    </div>
  );
}
