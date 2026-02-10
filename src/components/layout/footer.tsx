'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Disclaimer */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-bold text-foreground">
              {t('disclaimer.title')}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {t('disclaimer.text')}
            </p>
          </div>

          {/* Legal Links */}
          <div className="md:text-right">
            <h3 className="mb-4 text-base font-bold text-foreground">
              {t('legal.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/imprint"
                  className="text-base text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-colors"
                >
                  {t('legal.imprint')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-base text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal Date */}
        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            {t('copyright', { year: currentYear })} | {t('legalDate')}
          </p>
        </div>
      </div>
    </footer>
  );
}
