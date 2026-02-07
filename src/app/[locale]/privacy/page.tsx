'use client';

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('legal.privacy');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h1>

      {/* Datenschutz auf einen Blick */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('introTitle')}
        </h2>
        <p className="text-muted-foreground">{t('introText')}</p>
      </section>

      {/* Keine Erhebung personenbezogener Daten */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('noDataTitle')}
        </h2>
        <p className="text-muted-foreground">{t('noDataText')}</p>
      </section>

      {/* Lokale Datenspeicherung */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('localStorageTitle')}
        </h2>
        <p className="text-muted-foreground">{t('localStorageText')}</p>
      </section>

      {/* Hosting */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('hostingTitle')}
        </h2>
        <p className="text-muted-foreground">{t('hostingText')}</p>
      </section>

      {/* Ihre Rechte */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('rightsTitle')}
        </h2>
        <p className="text-muted-foreground">{t('rightsText')}</p>
      </section>

      {/* Kontakt */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('contactTitle')}
        </h2>
        <p className="text-muted-foreground">{t('contactText')}</p>
      </section>
    </div>
  );
}
