'use client';

import { useState } from 'react';
import { Shield, Menu, X, ChevronDown, Compass } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from 'next-intl';
import { isValidRegulationId, getRegulation } from '@/lib/regulations/registry';
import '@/lib/regulations/init';

export function Header() {
  const t = useTranslations('metadata');
  const tNav = useTranslations('navigation');
  const tReg = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Detect current regulation from pathname
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentRegulation = pathSegments[0] && isValidRegulationId(pathSegments[0])
    ? pathSegments[0]
    : null;

  const regConfig = currentRegulation ? getRegulation(currentRegulation) : null;

  // Regulation-mode links
  const regulationLinks = currentRegulation
    ? [
        ...(regConfig?.features.hasClassification ? [{ href: `/${currentRegulation}/check` as const, label: tNav('check') }] : []),
        ...(regConfig?.features.hasQuickCheck ? [{ href: `/${currentRegulation}/schnellcheck` as const, label: tNav('quickCheck') }] : []),
        { href: `/${currentRegulation}/assessment` as const, label: tNav('gapAnalysis') },
        { href: `/${currentRegulation}/results` as const, label: tNav('results') },
        { href: '/dashboard' as const, label: tNav('dashboard') },
        { href: '/wissen' as const, label: tNav('wissen') },
      ]
    : [];

  const infoLinks = currentRegulation
    ? [
        { href: `/${currentRegulation}/info/meldepflichten` as const, label: tNav('meldepflichten') },
        { href: `/${currentRegulation}/info/geschaeftsleitung` as const, label: tNav('geschaeftsleitung') },
        { href: `/${currentRegulation}/info/registrierung` as const, label: tNav('registrierung') },
      ]
    : [];

  // Hub-mode links
  const hubLinks = !currentRegulation
    ? [
        { href: '/navigator' as const, label: tNav('statusCheck') },
        { href: '/dashboard' as const, label: tNav('dashboard') },
        { href: '/wissen' as const, label: tNav('wissen') },
      ]
    : [];

  const mainLinks = currentRegulation ? regulationLinks : hubLinks;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Compass className="h-8 w-8 text-primary" strokeWidth={2} />
          <span className="hidden sm:inline text-xl font-semibold text-foreground">
            {t('title')}
          </span>
        </Link>

        {/* Regulation badge (when inside a regulation) */}
        {currentRegulation && (
          <Link
            href={`/${currentRegulation}` as any}
            className="hidden md:flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Shield className="size-3.5" />
            {(() => {
              const rc = getRegulation(currentRegulation);
              return rc ? tReg(rc.nameKey) : currentRegulation.toUpperCase();
            })()}
          </Link>
        )}

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {/* Info dropdown (only when in regulation context with NIS2-specific info pages) */}
          {currentRegulation === 'nis2' && infoLinks.length > 0 && (
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
                      href={link.href as any}
                      className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      onClick={() => setInfoOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
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
                href={link.href as any}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {currentRegulation === 'nis2' && infoLinks.length > 0 && (
              <>
                <div className="my-2 border-t" />
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {tNav('moreInfo')}
                </p>
                {infoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as any}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
