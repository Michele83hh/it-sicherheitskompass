import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { SITE_URL, SITE_NAME, absoluteUrl, LOCALES } from '@/lib/seo';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DevResetButton } from '@/components/dev-reset-button';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl('/', l);
  languages['x-default'] = absoluteUrl('/', 'de');

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      // Der Markenname steckt bereits im Hero-Titel — kein Suffix auf der Startseite.
      default: t('platform.hub.hero.title'),
      // Unterseiten liefern nur ihren eigenen Titel, das Suffix kommt von hier.
      template: `%s | ${SITE_NAME}`,
    },
    description: t('platform.hub.hero.subtitle').replace(/\s+/g, ' ').trim(),
    applicationName: SITE_NAME,
    alternates: { canonical: absoluteUrl('/', locale), languages },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: absoluteUrl('/', locale),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {/* Sprungmarke fuer Tastatur- und Screenreader-Nutzung: sichtbar erst
              bei Fokus, damit sie die Navigation ueberspringbar macht. */}
          <a
            href="#hauptinhalt"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {messages.a11y?.skipToContent as string}
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="hauptinhalt" tabIndex={-1} className="flex-1">{children}</main>
            <Footer />
            <DevResetButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
