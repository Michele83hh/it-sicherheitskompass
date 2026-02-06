'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'de' ? 'en' : 'de';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="gap-2"
      aria-label={`Switch to ${locale === 'de' ? 'English' : 'Deutsch'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{locale === 'de' ? 'EN' : 'DE'}</span>
    </Button>
  );
}
