'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Code2, ChevronLeft, Copy, Check, Lightbulb, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WissenBreadcrumb } from '@/components/layout/breadcrumb';

/* ───── Types & Constants ───── */

type BadgeStyle = 'full' | 'compact' | 'minimal';
type BadgeLang = 'de' | 'en';

interface LevelInfo {
  key: string;
  min: number;
  max: number;
  color: string;
  bgColor: string;
}

const LEVELS: LevelInfo[] = [
  { key: 'basic',       min: 0,  max: 40,  color: '#ef4444', bgColor: '#fef2f2' },
  { key: 'developing',  min: 41, max: 60,  color: '#f97316', bgColor: '#fff7ed' },
  { key: 'established', min: 61, max: 80,  color: '#eab308', bgColor: '#fefce8' },
  { key: 'advanced',    min: 81, max: 95,  color: '#22c55e', bgColor: '#f0fdf4' },
  { key: 'excellent',   min: 96, max: 100, color: '#15803d', bgColor: '#f0fdf4' },
];

const REG_OPTIONS = [
  { value: 'overall', labelDe: 'Gesamt-Score', labelEn: 'Overall Score' },
  { value: 'nis2', labelDe: 'NIS2', labelEn: 'NIS2' },
  { value: 'dsgvo', labelDe: 'DSGVO', labelEn: 'GDPR' },
  { value: 'iso27001', labelDe: 'ISO 27001', labelEn: 'ISO 27001' },
  { value: 'tisax', labelDe: 'TISAX', labelEn: 'TISAX' },
  { value: 'bsi-grundschutz', labelDe: 'BSI IT-Grundschutz', labelEn: 'BSI IT-Grundschutz' },
  { value: 'dora', labelDe: 'DORA', labelEn: 'DORA' },
  { value: 'kritis', labelDe: 'KRITIS', labelEn: 'KRITIS' },
  { value: 'cra', labelDe: 'CRA', labelEn: 'CRA' },
  { value: 'soc2', labelDe: 'SOC 2', labelEn: 'SOC 2' },
  { value: 'pci-dss', labelDe: 'PCI DSS', labelEn: 'PCI DSS' },
  { value: 'c5', labelDe: 'C5', labelEn: 'C5' },
  { value: 'cis-controls', labelDe: 'CIS Controls', labelEn: 'CIS Controls' },
  { value: 'nist-csf', labelDe: 'NIST CSF', labelEn: 'NIST CSF' },
  { value: 'iso22301', labelDe: 'ISO 22301', labelEn: 'ISO 22301' },
  { value: 'owasp-asvs', labelDe: 'OWASP ASVS', labelEn: 'OWASP ASVS' },
];

const LEVEL_LABELS_DE: Record<string, string> = {
  basic: 'Basis', developing: 'Aufbauend', established: 'Etabliert',
  advanced: 'Fortgeschritten', excellent: 'Exzellent',
};
const LEVEL_LABELS_EN: Record<string, string> = {
  basic: 'Basic', developing: 'Developing', established: 'Established',
  advanced: 'Advanced', excellent: 'Excellent',
};

function getLevel(score: number): LevelInfo {
  return LEVELS.find(l => score >= l.min && score <= l.max) ?? LEVELS[0];
}

/* ───── SVG Badge Generators ───── */

function generateFullBadge(score: number, regLabel: string, lang: BadgeLang): string {
  const level = getLevel(score);
  const labels = lang === 'de' ? LEVEL_LABELS_DE : LEVEL_LABELS_EN;
  const secLabel = lang === 'de' ? 'IT-Sicherheit' : 'IT Security';
  const verifiedLabel = lang === 'de' ? 'Geprueft mit IT-Sicherheitskompass' : 'Verified with IT-Sicherheitskompass';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="160" viewBox="0 0 280 160">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="280" height="160" rx="12" fill="url(#bg)"/>
  <rect x="1" y="1" width="278" height="158" rx="11" fill="none" stroke="${level.color}" stroke-width="2" opacity="0.4"/>
  <!-- Shield icon -->
  <g transform="translate(20, 20)">
    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="none" stroke="${level.color}" stroke-width="2"/>
    <path d="M9 12l2 2 4-4" fill="none" stroke="${level.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="50" y="33" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">${secLabel}</text>
  <text x="50" y="48" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">${regLabel}</text>
  <!-- Score circle -->
  <circle cx="230" cy="80" r="35" fill="none" stroke="#334155" stroke-width="4"/>
  <circle cx="230" cy="80" r="35" fill="none" stroke="${level.color}" stroke-width="4" stroke-dasharray="${(score / 100) * 220} 220" stroke-linecap="round" transform="rotate(-90 230 80)"/>
  <text x="230" y="77" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">${score}</text>
  <text x="230" y="97" font-family="system-ui,sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">%</text>
  <!-- Level badge -->
  <rect x="20" y="68" width="170" height="28" rx="6" fill="${level.color}" opacity="0.15"/>
  <circle cx="34" cy="82" r="5" fill="${level.color}"/>
  <text x="46" y="86" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="${level.color}">${labels[level.key]}</text>
  <!-- Footer -->
  <text x="20" y="135" font-family="system-ui,sans-serif" font-size="9" fill="#64748b">${verifiedLabel}</text>
  <text x="20" y="148" font-family="system-ui,sans-serif" font-size="8" fill="#475569">it-sicherheitskompass.de</text>
</svg>`;
}

function generateCompactBadge(score: number, regLabel: string, lang: BadgeLang): string {
  const level = getLevel(score);
  const labels = lang === 'de' ? LEVEL_LABELS_DE : LEVEL_LABELS_EN;
  const secLabel = lang === 'de' ? 'IT-Sicherheit' : 'IT Security';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48">
  <rect width="220" height="48" rx="8" fill="#1e293b"/>
  <rect x="1" y="1" width="218" height="46" rx="7" fill="none" stroke="${level.color}" stroke-width="1.5" opacity="0.3"/>
  <!-- Shield -->
  <g transform="translate(10, 12) scale(0.9)">
    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="none" stroke="${level.color}" stroke-width="2"/>
    <path d="M9 12l2 2 4-4" fill="none" stroke="${level.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="40" y="22" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#e2e8f0">${secLabel}: ${regLabel}</text>
  <text x="40" y="36" font-family="system-ui,sans-serif" font-size="10" fill="#94a3b8">${labels[level.key]}</text>
  <!-- Score pill -->
  <rect x="170" y="10" width="40" height="28" rx="6" fill="${level.color}" opacity="0.2"/>
  <text x="190" y="29" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="${level.color}" text-anchor="middle">${score}%</text>
</svg>`;
}

function generateMinimalBadge(score: number, _regLabel: string, _lang: BadgeLang): string {
  const level = getLevel(score);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <rect width="80" height="80" rx="12" fill="#1e293b"/>
  <circle cx="40" cy="36" r="22" fill="none" stroke="#334155" stroke-width="3"/>
  <circle cx="40" cy="36" r="22" fill="none" stroke="${level.color}" stroke-width="3" stroke-dasharray="${(score / 100) * 138} 138" stroke-linecap="round" transform="rotate(-90 40 36)"/>
  <text x="40" y="34" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">${score}</text>
  <text x="40" y="48" font-family="system-ui,sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">%</text>
  <text x="40" y="72" font-family="system-ui,sans-serif" font-size="7" fill="#64748b" text-anchor="middle">IT-Sicherheit</text>
</svg>`;
}

/* ───── Component ───── */

export default function WidgetPage() {
  const t = useTranslations('wissenPages.widget');
  const tWissen = useTranslations('wissenPages');
  const locale = useLocale();

  const [regulation, setRegulation] = useState('overall');
  const [score, setScore] = useState(72);
  const [style, setStyle] = useState<BadgeStyle>('full');
  const [badgeLang, setBadgeLang] = useState<BadgeLang>(locale === 'en' ? 'en' : 'de');
  const [copied, setCopied] = useState<string | null>(null);

  const regLabel = useMemo(() => {
    const opt = REG_OPTIONS.find(r => r.value === regulation);
    if (!opt) return '';
    return badgeLang === 'de' ? opt.labelDe : opt.labelEn;
  }, [regulation, badgeLang]);

  const svgCode = useMemo(() => {
    switch (style) {
      case 'compact': return generateCompactBadge(score, regLabel, badgeLang);
      case 'minimal': return generateMinimalBadge(score, regLabel, badgeLang);
      default: return generateFullBadge(score, regLabel, badgeLang);
    }
  }, [score, regLabel, badgeLang, style]);

  const htmlEmbed = useMemo(() => {
    const b64 = typeof window !== 'undefined'
      ? btoa(unescape(encodeURIComponent(svgCode)))
      : '';
    return `<a href="https://it-sicherheitskompass.de" target="_blank" rel="noopener noreferrer" title="IT-Sicherheitskompass"><img src="data:image/svg+xml;base64,${b64}" alt="IT-Sicherheits-Score" /></a>`;
  }, [svgCode]);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  const level = getLevel(score);

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Code2 className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <WissenBreadcrumb />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        {/* ── Badge Generator ── */}
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">{t('generator.title')}</h2>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Controls */}
            <div className="space-y-5">
              {/* Regulation */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t('generator.regulation')}</label>
                <select
                  value={regulation}
                  onChange={(e) => setRegulation(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {REG_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {locale === 'de' ? opt.labelDe : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Score slider */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t('generator.score')}: <span className="font-mono font-bold" style={{ color: level.color }}>{score}%</span></label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t('generator.style')}</label>
                <div className="flex gap-2">
                  {(['full', 'compact', 'minimal'] as BadgeStyle[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                        style === s
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted hover:border-primary/30'
                      }`}
                    >
                      {t(`generator.styles.${s}` as any)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="mb-1.5 block text-sm font-medium flex items-center gap-1.5">
                  <Globe className="size-4" />{t('generator.language')}
                </label>
                <div className="flex gap-2">
                  {(['de', 'en'] as BadgeLang[]).map(l => (
                    <button
                      key={l}
                      onClick={() => setBadgeLang(l)}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                        badgeLang === l
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted hover:border-primary/30'
                      }`}
                    >
                      {l === 'de' ? 'Deutsch' : 'English'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center">
              <p className="mb-3 text-sm font-medium text-muted-foreground">{t('generator.preview')}</p>
              <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 bg-slate-100 dark:bg-slate-900 p-6 flex items-center justify-center min-h-[200px]">
                <div dangerouslySetInnerHTML={{ __html: svgCode }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Embed Code ── */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('embed.title')}</h2>

          <p className="mb-4 text-sm text-muted-foreground">{t('embed.instructions')}</p>

          {/* HTML embed */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('embed.html')}</span>
              <button
                onClick={() => copyToClipboard(htmlEmbed, 'html')}
                className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
              >
                {copied === 'html' ? <><Check className="size-3.5 text-emerald-500" />{t('embed.copied')}</> : <><Copy className="size-3.5" />{t('embed.copyHtml')}</>}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg border bg-slate-950 p-4 text-xs text-slate-300 leading-relaxed">
              <code>{htmlEmbed}</code>
            </pre>
          </div>

          {/* SVG code */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">SVG</span>
              <button
                onClick={() => copyToClipboard(svgCode, 'svg')}
                className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
              >
                {copied === 'svg' ? <><Check className="size-3.5 text-emerald-500" />{t('embed.copied')}</> : <><Copy className="size-3.5" />{t('embed.copySvg')}</>}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg border bg-slate-950 p-4 text-xs text-slate-300 leading-relaxed max-h-48">
              <code>{svgCode}</code>
            </pre>
          </div>

          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-4 flex gap-2">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-900">{t('embed.note')}</p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t('useCases.title')}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {['i1', 'i2', 'i3', 'i4'].map((id) => (
              <Card key={id}><CardContent className="pt-4">
                <p className="font-bold text-sm mb-1">{t(`useCases.items.${id}.title` as any)}</p>
                <p className="text-xs text-muted-foreground">{t(`useCases.items.${id}.desc` as any)}</p>
              </CardContent></Card>
            ))}
          </div>
        </section>

        <Link href="/wissen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" /> {tWissen('backToWissen')}
        </Link>
      </div>
    </div>
  );
}
