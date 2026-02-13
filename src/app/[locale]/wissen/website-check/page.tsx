'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Globe, ChevronLeft, Loader2, CheckCircle2, AlertTriangle, XCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

type Status = 'pass' | 'warn' | 'fail';

interface HeaderCheck {
  status: Status;
  value: string;
  detail: string;
}

interface WebsiteCheckResult {
  url: string;
  https: HeaderCheck;
  hsts: HeaderCheck;
  csp: HeaderCheck;
  xFrameOptions: HeaderCheck;
  xContentType: HeaderCheck;
  referrerPolicy: HeaderCheck;
  permissionsPolicy: HeaderCheck;
  score: number;
}

const STATUS_ICON = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle } as const;
const STATUS_COLOR = { pass: 'text-emerald-600', warn: 'text-amber-500', fail: 'text-red-500' } as const;
const STATUS_BG = { pass: 'bg-emerald-50 border-emerald-200', warn: 'bg-amber-50 border-amber-200', fail: 'bg-red-50 border-red-200' } as const;

const CHECK_KEYS = ['https', 'hsts', 'csp', 'xFrameOptions', 'xContentType', 'referrerPolicy', 'permissionsPolicy'] as const;

export default function WebsiteCheckPage() {
  const t = useTranslations('wissenPages.websiteCheck');
  const tWissen = useTranslations('wissenPages');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WebsiteCheckResult | null>(null);
  const [error, setError] = useState('');

  async function handleCheck() {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/security/website-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || data.error || 'Check failed');
      }
      setResult(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 75) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <Globe className="size-7 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-8 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* Input */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <label className="block text-sm font-semibold mb-2">{t('inputLabel')}</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                placeholder={t('inputPlaceholder')}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button onClick={handleCheck} disabled={loading || !url.trim()} className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Search className="size-4 mr-2" />}
                {t('checkButton')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <XCircle className="inline size-4 mr-2" />{error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 mb-10">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-1">{t('scoreLabel')}</p>
              <p className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}/100</p>
              <p className="text-sm text-muted-foreground mt-1">{result.url}</p>
            </div>

            {CHECK_KEYS.map((key) => {
              const check = result[key];
              const Icon = STATUS_ICON[check.status];
              return (
                <Card key={key} className={`border ${STATUS_BG[check.status]}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Icon className={`mt-0.5 size-5 shrink-0 ${STATUS_COLOR[check.status]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{t(`checks.${key}.title`)}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${check.status === 'pass' ? 'bg-emerald-100 text-emerald-700' : check.status === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {t(`status.${check.status}`)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{t(`checks.${key}.desc`)}</p>
                        {check.value && <p className="text-xs font-mono bg-white/60 rounded px-2 py-1 break-all">{check.value}</p>}
                        <p className="text-xs text-muted-foreground mt-1">{t(`checks.${key}.fix`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Info section */}
        {!result && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">{t('info.title')}</h2>
            <div className="space-y-3">
              {CHECK_KEYS.map((key) => (
                <Card key={key}>
                  <CardContent className="pt-4">
                    <p className="font-semibold text-sm mb-1">{t(`checks.${key}.title`)}</p>
                    <p className="text-xs text-muted-foreground">{t(`checks.${key}.desc`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
