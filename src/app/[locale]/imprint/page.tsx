'use client';

import { useTranslations } from 'next-intl';

export default function ImprintPage() {
  const t = useTranslations('legal.imprint');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>

      {/* Angaben gemäß § 5 DDG */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('infoTitle')}
        </h2>
        <div className="space-y-2 text-muted-foreground">
          <p className="whitespace-pre-line">{t('name')}</p>
        </div>
      </section>

      {/* Kontakt */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('contactTitle')}
        </h2>
        <div className="space-y-2 text-muted-foreground">
          <p>{t('email')}</p>
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
