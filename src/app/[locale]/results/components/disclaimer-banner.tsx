import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerBanner() {
  const t = useTranslations('results');

  return (
    <div className="mb-8 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
      <p className="text-sm text-amber-900">{t('disclaimer.text')}</p>
    </div>
  );
}
