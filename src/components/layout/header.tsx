'use client';

import { Shield } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('metadata');

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Shield className="h-8 w-8 text-primary" strokeWidth={2} />
          <span className="text-xl font-semibold text-foreground">
            {t('title')}
          </span>
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
