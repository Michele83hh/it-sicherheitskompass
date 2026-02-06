'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Disclaimer */}
          <div className="md:col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t('disclaimer.title')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('disclaimer.text')}
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t('legal.title')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/imprint"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('legal.imprint')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal Date */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            {t('copyright', { year: currentYear })} | {t('legalDate')}
          </p>
        </div>
      </div>
    </footer>
  );
}
