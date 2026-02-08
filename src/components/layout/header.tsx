'use client';

import { useState } from 'react';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('metadata');
  const tNav = useTranslations('navigation');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const mainLinks = [
    { href: '/check' as const, label: tNav('check') },
    { href: '/schnellcheck' as const, label: tNav('quickCheck') },
    { href: '/gap-analysis' as const, label: tNav('gapAnalysis') },
    { href: '/results' as const, label: tNav('results') },
  ];

  const infoLinks = [
    { href: '/meldepflichten' as const, label: tNav('meldepflichten') },
    { href: '/geschaeftsleitung' as const, label: tNav('geschaeftsleitung') },
    { href: '/registrierung' as const, label: tNav('registrierung') },
  ];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Shield className="h-8 w-8 text-primary" strokeWidth={2} />
          <span className="hidden sm:inline text-xl font-semibold text-foreground">
            {t('title')}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {/* Info dropdown */}
          <div className="relative">
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              onBlur={() => setTimeout(() => setInfoOpen(false), 200)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {tNav('moreInfo')}
              <ChevronDown className={`size-4 transition-transform ${infoOpen ? 'rotate-180' : ''}`} />
            </button>
            {infoOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-md border bg-white py-1 shadow-lg">
                {infoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => setInfoOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right side: language switcher + mobile menu button */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <nav className="space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t" />
            <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {tNav('moreInfo')}
            </p>
            {infoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
