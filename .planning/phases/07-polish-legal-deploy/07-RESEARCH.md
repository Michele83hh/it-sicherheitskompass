# Phase 7: Polish + Legal + Deploy - Research

**Researched:** 2026-02-07
**Domain:** Production readiness (Legal compliance, Responsive design, Production polish, Deployment)
**Confidence:** HIGH

## Summary

Phase 7 focuses on four critical production-readiness domains: German legal compliance (Impressum, Datenschutz, disclaimers), responsive design across all device sizes, production code cleanup, and Vercel deployment. This research investigated German Telemedienrecht requirements (specifically the renamed Digitale-Dienste-Gesetz/DDG), mobile-first responsive patterns with Tailwind CSS v4, Next.js production optimization features, and Vercel deployment best practices.

The standard approach combines built-in Next.js production optimizations (automatic code-splitting, Server Components, caching) with Tailwind's mobile-first breakpoint system and native CSS transitions for subtle animations. German legal requirements are strict but straightforward: mandatory Impressum page with specific information, Datenschutzhinweis (privacy notice), and disclaimers using conditional language. For responsive design, testing at 375px width represents iPhone users (50%+ of mobile traffic) and serves as the primary mobile breakpoint alongside 360px.

Key recommendations: Use Next.js compiler's built-in `removeConsole` option for production, leverage Tailwind v4's container queries (now in core), implement CSS transitions for step animations (avoiding complex Framer Motion issues with App Router), and structure legal pages as simple static routes with German-first content.

**Primary recommendation:** Implement legal pages first (static routes, no external dependencies), then responsive polish using Tailwind's mobile-first classes and CSS transitions, configure Next.js production settings, and deploy to Vercel with environment variable management.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Framework with built-in production optimizations | Automatic code-splitting, Server Components, built-in removeConsole compiler option |
| Tailwind CSS | v4 | Mobile-first responsive styling | Container queries in core, mobile-first breakpoints (sm/md/lg/xl/2xl), utility-first approach |
| next-intl | 4.8.2 | Internationalization | Already integrated, handles DE/EN legal content routing |
| Vercel | Latest | Deployment platform | Native Next.js integration, automatic preview deployments, environment variables UI |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS Transitions | Native | Subtle step animations | Preferred over Framer Motion for App Router (fewer issues, better performance) |
| tw-animate-css | 1.4.0 | Animation utilities | Already installed, provides animate-* classes for Tailwind |
| Lighthouse | Native | Core Web Vitals testing | Pre-production performance/accessibility audit |
| @next/bundle-analyzer | Latest | Bundle size analysis | Pre-deployment optimization check |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Transitions | Framer Motion | Framer Motion has known issues with Next.js App Router (AnimatePresence doesn't work reliably, fragile workarounds), CSS transitions are simpler and more stable |
| Static legal pages | CMS-driven content | Static pages sufficient for legal content that rarely changes, no external dependencies needed |
| Custom Impressum | Generator service | Generators useful for initial template, but custom page allows precise control and project-specific information |

**Installation:**
```bash
# Bundle analyzer (optional, for pre-deployment check)
npm install --save-dev @next/bundle-analyzer
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[locale]/
│   ├── imprint/
│   │   └── page.tsx          # Static Impressum page
│   ├── privacy/
│   │   └── page.tsx          # Static Datenschutzhinweis page
│   ├── check/
│   │   └── page.tsx          # Add pre-assessment disclaimer
│   └── results/
│       └── components/
│           └── disclaimer-banner.tsx  # Already exists
├── messages/
│   ├── de.json               # German legal content (primary)
│   └── en.json               # English translations (secondary)
└── components/
    └── layout/
        └── footer.tsx        # Already links to imprint/privacy
```

### Pattern 1: German Legal Page Structure
**What:** Static route with mandatory information per DDG §5 (formerly TMG §5)
**When to use:** Impressum, Datenschutzhinweis required for all German commercial websites
**Example:**
```typescript
// Source: German Telemedienrecht research + Next.js docs
// src/app/[locale]/imprint/page.tsx
import { useTranslations } from 'next-intl';

export default function ImprintPage() {
  const t = useTranslations('legal.imprint');

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">{t('title')}</h1>

      {/* Mandatory fields per DDG §5 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{t('company.title')}</h2>
          <p>{t('company.name')}</p>
          <p>{t('company.address')}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{t('contact.title')}</h2>
          <p>{t('contact.phone')}</p>
          <p>{t('contact.email')}</p>
        </div>

        {/* Register, VAT, responsible authority as required */}
      </section>
    </div>
  );
}
```

### Pattern 2: Mobile-First Responsive Layout
**What:** Tailwind CSS v4 mobile-first breakpoint system with progressive enhancement
**When to use:** All layouts, especially multi-column content
**Example:**
```typescript
// Source: Tailwind CSS v4 official docs
// Mobile: stacked, Tablet (md): 2 columns, Desktop (lg): 3 columns
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>

// Mobile: full width, Desktop (md+): flex row with fixed sidebar
<div className="md:flex">
  <aside className="md:w-64 md:shrink-0">...</aside>
  <main className="p-4 md:p-8">...</main>
</div>

// Responsive padding: mobile p-4, tablet p-6, desktop p-8
<section className="p-4 md:p-6 lg:p-8">...</section>
```

### Pattern 3: Subtle Step Transition Animations
**What:** CSS transitions with short durations (0.3s) for step changes
**When to use:** Wizard step transitions, card hover effects, modal entrances
**Example:**
```typescript
// Source: CSS animation best practices research
// Option 1: Tailwind utility classes (tw-animate-css)
<div className="animate-fadeIn">
  {/* Step content */}
</div>

// Option 2: CSS transition classes
<div className="transition-all duration-300 ease-in-out opacity-0 data-[state=open]:opacity-100">
  {/* Content */}
</div>

// Option 3: Custom CSS with prefers-reduced-motion
<style jsx>{`
  .step-transition {
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    transform: translateY(10px);
  }

  .step-transition.active {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .step-transition {
      transition: none;
    }
  }
`}</style>
```

### Pattern 4: Production Build Configuration
**What:** Next.js compiler options for production optimization
**When to use:** Always for production builds
**Example:**
```typescript
// Source: Next.js production checklist + compiler docs
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],

  // Remove console.log in production only
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
};

export default withNextIntl(nextConfig);
```

### Pattern 5: Pre-Assessment Disclaimer Banner
**What:** Non-dismissible warning before wizard starts
**When to use:** Before user begins check or gap-analysis
**Example:**
```typescript
// Source: German legal disclaimer best practices
// Component structure similar to existing disclaimer-banner.tsx
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PreAssessmentDisclaimer() {
  const t = useTranslations('disclaimers');

  return (
    <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-blue-600" />
        <div className="space-y-2 text-sm text-blue-900">
          <p className="font-semibold">{t('preAssessment.title')}</p>
          <p>{t('preAssessment.noLegalAdvice')}</p>
          <p>{t('preAssessment.orientationOnly')}</p>
        </div>
      </div>
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Framer Motion with App Router exit animations:** AnimatePresence doesn't work reliably due to Next.js App Router unmounting behavior. Use CSS transitions instead.
- **Desktop-first responsive design:** Always start with mobile styles (unprefixed classes), then add breakpoint prefixes (md:, lg:) for larger screens.
- **Hardcoded legal text:** Use i18n keys for all legal content to maintain consistency and enable updates.
- **Ignoring prefers-reduced-motion:** Always provide fallback for users who have motion sensitivity.
- **Using `next/link` for i18n routes:** Always use `@/lib/i18n/routing` Link component to preserve locale prefixes.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Console log removal | Custom Babel plugin or manual deletion | Next.js compiler `removeConsole` option | Built-in, production-only, excludes error/warn, zero config |
| Responsive breakpoints | Custom media queries in CSS | Tailwind v4 mobile-first breakpoints | Standard sizes (375px/640px/768px/1024px/1280px/1536px), utility-first, consistent |
| Page transition animations | Framer Motion AnimatePresence | CSS transitions with duration-300 | Simpler, no App Router compatibility issues, better performance, accessibility-friendly |
| Bundle analysis | Manual webpack inspection | `@next/bundle-analyzer` plugin | Visual treemap, identifies large modules, Next.js-specific |
| Environment variable management | .env files in git | Vercel Environment Variables UI | Encrypted at rest, environment-specific (dev/preview/prod), role-based access |
| Impressum content | Manual HTML generation | i18n translation keys | Maintainable, versioned, consistent across languages |
| Mobile testing viewport | Random device testing | Test at 375px and 360px first | Represents 50%+ of mobile traffic (iPhone + Android), primary mobile breakpoints |

**Key insight:** Next.js and Tailwind provide production-ready solutions for common deployment needs. Custom solutions add maintenance burden without benefit. For animations, simpler is better—CSS transitions outperform JavaScript animation libraries in App Router context.

## Common Pitfalls

### Pitfall 1: Missing Viewport Meta Tag
**What goes wrong:** Responsive breakpoints don't work on mobile devices, site appears zoomed out
**Why it happens:** Browser defaults to desktop viewport without meta tag
**How to avoid:** Verify `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` exists in root layout
**Warning signs:** Tailwind breakpoints work in dev tools but not on real devices

### Pitfall 2: Impressum Accessibility Violations
**What goes wrong:** Impressum link buried in footer, not reachable within 2 clicks, labeled ambiguously
**Why it happens:** "Two-click rule" requirement not understood, non-German speakers use "Imprint" label
**How to avoid:**
- Footer link labeled "Impressum" (German term is legally required)
- Directly accessible from all pages (footer appears on all routes)
- Maximum 1 click from any page
**Warning signs:** German legal warnings, fines up to €50,000

### Pitfall 3: Conditional Language Not Used in Results
**What goes wrong:** Results say "Sie sind NIS2-betroffen" (definitive statement), not "Ihre Angaben deuten darauf hin..." (conditional)
**Why it happens:** Misunderstanding of tool's advisory role (Orientierungshilfe, not Rechtsberatung)
**How to avoid:** Audit all result text for definitive statements, replace with conditional phrasing
**Warning signs:** Legal liability risk, users misunderstanding tool purpose

### Pitfall 4: Console.log Statements in Production
**What goes wrong:** Performance degradation, sensitive data exposure in browser console, unprofessional appearance
**Why it happens:** Forgetting to remove debug statements before deployment
**How to avoid:** Configure `removeConsole` in next.config.ts, exclude error/warn for production monitoring
**Warning signs:** Browser console shows debug output in production, Lighthouse performance score penalty

### Pitfall 5: Desktop-Only Testing
**What goes wrong:** Layout breaks, text overflow, buttons too small on mobile
**Why it happens:** Testing only in desktop browser or responsive mode without real device constraints
**How to avoid:**
- Test at 375px width in dev tools (iPhone 15/16)
- Test at 360px width (Android devices)
- Use mobile-first Tailwind classes (unprefixed for mobile, md:/lg: for desktop)
**Warning signs:** User reports of mobile issues, horizontal scrolling, tiny click targets

### Pitfall 6: Forgetting to Redeploy After Environment Variable Changes
**What goes wrong:** New environment variables don't take effect, features fail in production
**Why it happens:** Vercel requires redeployment to apply new env vars
**How to avoid:** After adding/changing environment variables in Vercel UI, trigger new deployment
**Warning signs:** Env vars work locally but not in production, undefined variable errors in Vercel logs

### Pitfall 7: Datenschutzhinweis Overkill for No-Cookie Sites
**What goes wrong:** Lengthy privacy policy with cookie consent banner despite not using cookies/tracking
**Why it happens:** Copy-pasting generic templates without assessing actual data collection
**How to avoid:** Explicitly state "Keine personenbezogenen Daten werden erhoben oder gespeichert" when true, no consent banner needed
**Warning signs:** Cookie banner on site with no cookies, user confusion

### Pitfall 8: Framework Default Branding in Production
**What goes wrong:** Next.js default favicon, placeholder meta descriptions, generic 404 pages visible in production
**Why it happens:** Forgetting to replace development defaults
**How to avoid:**
- Add custom favicon.ico or icon.png in /app directory
- Set metadata in root layout
- Create custom 404 (not-found.tsx) and error pages
**Warning signs:** Next.js logo appears as favicon, generic error messages

## Code Examples

Verified patterns from official sources:

### Responsive Container with Mobile-First Breakpoints
```typescript
// Source: Tailwind CSS v4 responsive design docs
// Mobile: full width with padding, Tablet (md): max-width container, Desktop (lg): wider max-width
<div className="mx-auto px-4 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
  <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
    {/* Cards adapt to screen size */}
  </div>
</div>
```

### Next.js Metadata for Legal Pages
```typescript
// Source: Next.js metadata API docs
// src/app/[locale]/imprint/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | NIS2 Readiness Check',
  description: 'Rechtliche Pflichtangaben gemäß § 5 DDG',
  robots: 'index, follow', // Legal pages should be indexed
};

export default function ImprintPage() {
  // Component content
}
```

### Production Build Check Commands
```bash
# Source: Next.js production checklist
# 1. Local production build test
npm run build
npm run start

# 2. Lighthouse audit (incognito mode, production URL)
lighthouse https://your-vercel-url.vercel.app --view

# 3. Bundle analysis (optional)
ANALYZE=true npm run build
```

### Rechtsstand-Datum in Footer (Already Exists)
```typescript
// Source: Existing footer.tsx + German legal requirements
// Current implementation in footer.tsx line 53:
<p>
  {t('copyright', { year: currentYear })} | {t('legalDate')}
</p>

// Translation key in de.json should contain:
// "legalDate": "Rechtsstand: Februar 2026"
```

### Testing Responsive Breakpoints at Key Widths
```bash
# Source: Browser DevTools responsive testing best practices
# Chrome DevTools > Toggle device toolbar > Responsive mode
# Test these widths specifically:
- 375px (iPhone 15/16, 50%+ mobile traffic)
- 360px (Android devices)
- 768px (iPad portrait, md breakpoint)
- 1024px (iPad landscape, lg breakpoint)
- 1280px (small desktop, xl breakpoint)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Telemediengesetz (TMG) | Digitale-Dienste-Gesetz (DDG) | April 2024 | Law renamed due to EU Digital Services Act (DSA), requirements unchanged |
| Framer Motion for App Router | CSS Transitions | Next.js 13+ App Router | AnimatePresence unreliable with App Router, CSS transitions more stable |
| Manual console.log removal | Next.js compiler removeConsole | Next.js 12.1.0+ | Built-in solution, no Babel plugin needed |
| @tailwindcss/container-queries plugin | Container queries in core | Tailwind v4 (2024) | No plugin needed, @container and @sm:/@md: syntax built-in |
| .env files for production secrets | Vercel Environment Variables UI | Ongoing best practice | Encrypted, role-based access, environment-specific |
| Generic cookie consent banners | Conditional Datenschutz (no cookies = no banner) | TTDSG 2021, updated 2025 | Cookieless sites don't need consent prompts |

**Deprecated/outdated:**
- **Telemediengesetz (TMG):** Now called Digitale-Dienste-Gesetz (DDG) as of April 2024, but online resources may still reference TMG
- **Framer Motion AnimatePresence with App Router:** Known fragile workarounds exist but break easily, CSS transitions now preferred
- **favicon.ico in /public only:** Next.js 13+ supports favicon/icon files in /app directory with automatic detection
- **Manual bundle analysis:** @next/bundle-analyzer provides visual treemaps, don't manually inspect webpack stats

## Open Questions

Things that couldn't be fully resolved:

1. **Specific Impressum Content**
   - What we know: DDG §5 requires name, address, contact, register/VAT numbers
   - What's unclear: User's actual company information (name, address, responsible person)
   - Recommendation: Create Impressum page structure with placeholder text, user must provide actual legal information

2. **Conditional Language Audit Scope**
   - What we know: Results should use "Ihre Angaben deuten darauf hin..." not definitive statements
   - What's unclear: Full list of all text strings that need conditional language updates
   - Recommendation: Grep for definitive phrases in results translations (de.json/en.json), review classification-result.tsx and results page components

3. **Animation Preferences**
   - What we know: Subtle animations recommended (0.3s duration), respect prefers-reduced-motion
   - What's unclear: User's specific animation preferences for step transitions
   - Recommendation: Start with fade transitions (tw-animate-css animate-fadeIn class), test with user feedback

4. **Landing Page Enhancements**
   - What we know: User wants logo, "Für wen eignet sich der Check?" section, example report teaser, consulting link
   - What's unclear: Actual logo file, consulting service URL, screenshot of PDF report
   - Recommendation: Create structure for these elements with placeholders, user provides actual assets

5. **Rechtsstand-Datum Format**
   - What we know: Must appear in footer and PDF
   - What's unclear: Exact date format user prefers ("Februar 2026" vs "02/2026" vs "Stand: 07.02.2026")
   - Recommendation: Use "Rechtsstand: Februar 2026" (month + year) as typical German format, already in PDF per Phase 6

## Sources

### Primary (HIGH confidence)
- Next.js Production Checklist - https://nextjs.org/docs/app/building-your-application/deploying/production-checklist
- Tailwind CSS v4 Responsive Design - https://tailwindcss.com/docs/responsive-design
- Vercel Production Checklist - https://vercel.com/docs/production-checklist (structure confirmed, details from other sources)
- Vercel Environment Variables - https://vercel.com/docs/environment-variables
- Next.js Metadata API - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
- German DDG (formerly TMG) §5 requirements - https://www.ionos.com/digitalguide/websites/digital-law/a-case-for-thinking-global-germanys-impressum-laws/

### Secondary (MEDIUM confidence)
- German Impressum requirements 2026 - Multiple sources confirm DDG §5 (formerly TMG §5) mandatory fields, 2-click rule, €50,000 fine risk
- Tailwind CSS Best Practices 2025-2026 - https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns
- Next.js Console.log Removal - https://medium.com/@priyanklad52/why-you-should-remove-console-logs-from-production-code-a-guide-for-next-js-developers-36dee52f5e21
- Mobile Screen Resolutions 2026 - https://phone-simulator.com/blog/most-popular-mobile-screen-resolutions-in-2026/ (375px and 360px primary mobile widths)
- CSS Animation Best Practices 2026 - https://webpeak.org/blog/css-js-animation-trends/ (0.3s duration, purposeful motion, prefers-reduced-motion)
- Framer Motion App Router Issues - https://github.com/vercel/next.js/issues/49279 (known issue with AnimatePresence)
- German Cookie Consent TTDSG - https://securiti.ai/blog/german-ttdsg-guide/ (no cookies = no consent banner needed)

### Tertiary (LOW confidence)
- Specific conditional language phrasing for German legal disclaimers - Found general guidance but no definitive templates, marked for user validation
- Landing page design enhancement specifics - User feedback exists (STATE.md) but implementation details need discussion

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified in package.json, versions confirmed, Next.js 16 + Tailwind v4 documented
- Architecture: HIGH - Patterns verified with official Next.js and Tailwind docs, existing codebase structure reviewed
- Legal requirements: MEDIUM - German DDG §5 requirements confirmed across multiple sources, but user-specific Impressum content unknown
- Responsive design: HIGH - Tailwind v4 mobile-first approach documented, 375px/360px widths verified as primary mobile testing targets
- Animations: MEDIUM - CSS transition approach verified, but Framer Motion App Router issues confirmed via GitHub issues (not official docs)
- Production setup: HIGH - Next.js compiler options and Vercel deployment documented in official sources
- Pitfalls: HIGH - Identified from official checklists, community issues, and existing codebase patterns

**Research date:** 2026-02-07
**Valid until:** 2026-03-07 (30 days - legal requirements stable, framework versions current, deployment practices established)
