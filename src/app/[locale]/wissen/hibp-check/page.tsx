'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ShieldAlert, ChevronLeft, Loader2, CheckCircle2, XCircle, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

interface BreachInfo {
  name: string;
  title: string;
  domain: string;
  date: string;
  dataClasses: string[];
  verified: boolean;
}

interface HibpResult {
  email: string;
  breachCount: number;
  breaches: BreachInfo[];
}

export default function HibpCheckPage() {
  const t = useTranslations('wissenPages.hibpCheck');
  const tWissen = useTranslations('wissenPages');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HibpResult | null>(null);
  const [error, setError] = useState('');
  const [notConfigured, setNotConfigured] = useState(false);

  async function handleCheck() {
    if (!email.trim() || !email.includes('@')) return;
    setLoading(true);
    setError('');
    setResult(null);
    setNotConfigured(false);
    try {
      const res = await fetch('/api/security/hibp-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.status === 503) {
        setNotConfigured(true);
        return;
      }
      if (res.status === 429) {
        setError(t('errors.rateLimit'));
        return;
      }
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

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
            <ShieldAlert className="size-7 text-red-400" />
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                placeholder={t('inputPlaceholder')}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button onClick={handleCheck} disabled={loading || !email.includes('@')} className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Search className="size-4 mr-2" />}
                {t('checkButton')}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{t('privacy')}</p>
          </CardContent>
        </Card>

        {notConfigured && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertTriangle className="inline size-4 mr-2" />{t('errors.notConfigured')}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <XCircle className="inline size-4 mr-2" />{error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mb-10">
            {result.breachCount === 0 ? (
              <Card className="border-2 border-emerald-200 bg-emerald-50">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="mx-auto size-12 text-emerald-500 mb-3" />
                  <h3 className="text-lg font-bold text-emerald-700">{t('results.safe.title')}</h3>
                  <p className="text-sm text-emerald-600 mt-1">{t('results.safe.desc')}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardContent className="pt-6 text-center">
                    <ShieldAlert className="mx-auto size-12 text-red-500 mb-3" />
                    <h3 className="text-lg font-bold text-red-700">
                      {t('results.breached.title', { count: result.breachCount })}
                    </h3>
                    <p className="text-sm text-red-600 mt-1">{t('results.breached.desc')}</p>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {result.breaches.map((breach) => (
                    <Card key={breach.name} className="border-l-4 border-l-red-400">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-sm">{breach.title}</p>
                          {breach.verified && <Badge variant="outline" className="text-[10px]">{t('results.verified')}</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {breach.domain} — {breach.date}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {breach.dataClasses.map((dc) => (
                            <span key={dc} className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                              {dc}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recommendations */}
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-3">{t('results.actions.title')}</h3>
                    <div className="space-y-2">
                      {['i1', 'i2', 'i3', 'i4'].map((id, idx) => (
                        <div key={id} className="flex gap-3 text-sm">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                          <span>{t(`results.actions.${id}`)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* What is HIBP info */}
        {!result && !notConfigured && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">{t('info.title')}</h2>
            <div className="space-y-3">
              {['i1', 'i2', 'i3'].map((id) => (
                <Card key={id}>
                  <CardContent className="pt-4">
                    <p className="font-semibold text-sm mb-1">{t(`info.${id}.title`)}</p>
                    <p className="text-xs text-muted-foreground">{t(`info.${id}.desc`)}</p>
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
