# Stack Research

**Domain:** NIS2 Compliance Self-Assessment Web Tool (German SMEs)
**Researched:** 2026-02-06
**Confidence:** HIGH

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| **Next.js** | 16.1.x | Full-stack React framework | App Router, Route Handlers for PDF API, Vercel-native deployment, built-in SSR/SSG, Turbopack dev server (stable). The standard for React production apps in 2026. | HIGH |
| **React** | 19.2.x | UI library | Shipped with Next.js 16. Server Components, improved performance. Required by Next.js 16. | HIGH |
| **TypeScript** | 5.8.x | Type safety | Minimum for Next.js 16 is 5.1+. Use 5.8 (latest stable) for best DX. TS 5.9 is available but 5.8 has broader ecosystem compatibility. | HIGH |
| **Tailwind CSS** | 4.1.x | Utility-first styling | Zero-config in v4, 5x faster builds, CSS-native cascade layers. Pairs with shadcn/ui. Standard for rapid professional UI development. | HIGH |
| **@react-pdf/renderer** | 4.3.x | Server-side PDF generation | React 19 compatible since v4.1.0. No headless browser needed (unlike Puppeteer). Lightweight for Vercel serverless. Renders React components directly to PDF. | MEDIUM-HIGH |

### Supporting Libraries

| Library | Version | Purpose | Why This One | Confidence |
|---------|---------|---------|--------------|------------|
| **shadcn/ui** | latest (Feb 2026) | UI component system | Not a package -- components copied into project. Built on Radix UI + Tailwind v4. Professional, accessible, customizable. Now uses unified `radix-ui` package. The industry standard for production React UIs. | HIGH |
| **next-intl** | 4.8.x | i18n (German + English) | Purpose-built for Next.js App Router. ICU message syntax, type-safe message keys, Server Component support, SEO-friendly locale routing. The dominant i18n solution for Next.js. | HIGH |
| **react-hook-form** | 7.71.x | Form/wizard state management | Uncontrolled form approach = minimal re-renders. Built-in wizard/multi-step support. Pairs with Zod for validation. 10-day deadline demands proven patterns. | HIGH |
| **zod** | 4.3.x | Schema validation | TypeScript-first. Zod 4 is stable with improved performance. Integrates with react-hook-form via `@hookform/resolvers`. Validates both form input and PDF generation payloads. | HIGH |
| **zustand** | 5.0.x | Lightweight state management | For wizard progress state across steps. No Provider wrapper, minimal boilerplate. Overkill for simple apps but justified here: wizard state (current step, completion status, scores) must persist across page navigations. | MEDIUM-HIGH |
| **lucide-react** | 0.563.x | Icons | Tree-shakable SVG icons. 1500+ icons. Used by shadcn/ui by default. Feather Icons successor. | HIGH |
| **motion** (framer-motion) | 12.x | Step transitions/animations | Smooth wizard step transitions, progress bar animations, result reveals. Library rebranded from framer-motion to motion. Optional but elevates from "student project" to "consulting tool." | MEDIUM |
| **clsx** | 2.x | Conditional class names | Standard utility for dynamic Tailwind classes. Used inside the `cn()` helper alongside tailwind-merge. | HIGH |
| **tailwind-merge** | 3.4.x | Tailwind class conflict resolution | Resolves conflicting Tailwind classes in component overrides. Required for shadcn/ui `cn()` utility. Supports Tailwind v4. | HIGH |
| **@hookform/resolvers** | latest | Zod-to-react-hook-form bridge | Connects Zod schemas to react-hook-form validation. Official integration package. | HIGH |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **ESLint** (9.x) + `eslint-config-next` | Linting | Next.js 16 ships flat config by default. Use `next lint`. |
| **Prettier** (3.x) + `prettier-plugin-tailwindcss` | Formatting | Auto-sorts Tailwind classes. Non-negotiable for team consistency. |
| **Turbopack** | Dev server bundler | Stable in Next.js 16.1. File system caching on by default. No config needed. |

---

## Installation

```bash
# Create Next.js project
npx create-next-app@latest nis2-readiness-check \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*"

# Core dependencies
npm install next-intl @react-pdf/renderer react-hook-form @hookform/resolvers zod zustand

# UI dependencies (shadcn/ui init + components)
npx shadcn@latest init
npx shadcn@latest add button card progress radio-group label badge alert separator tabs

# Supporting
npm install clsx tailwind-merge lucide-react motion

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss @types/node
```

---

## Architecture Decisions

### 1. PDF Generation: @react-pdf/renderer via Next.js Route Handler

**Decision:** Use `@react-pdf/renderer` in a Next.js App Router Route Handler (`app/api/pdf/route.ts`).

**Why:**
- No headless browser = fast cold starts on Vercel serverless (< 1s vs 5-10s for Puppeteer)
- No Chromium binary = stays within Vercel's 50MB function size limit
- React 19 compatible since v4.1.0
- Renders React components to PDF natively -- same mental model as the rest of the app

**Known Risk (MEDIUM):** Historical compatibility issues between @react-pdf/renderer and Next.js App Router. Mitigation:
1. Add `'@react-pdf/renderer'` to `serverComponentsExternalPackages` in `next.config.ts`
2. Use `renderToBuffer()` in a Route Handler (not a Server Component)
3. If issues persist: fall back to a standalone `/pages/api/pdf.ts` Pages Router API route (Next.js 16 supports both routers)

**Route Handler pattern:**
```typescript
// app/api/pdf/route.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { NIS2Report } from '@/components/pdf/nis2-report';

export async function POST(request: Request) {
  const data = await request.json();
  const buffer = await renderToBuffer(<NIS2Report data={data} />);

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="nis2-readiness-report.pdf"',
    },
  });
}
```

### 2. i18n: next-intl with Locale Prefix Routing

**Decision:** Use next-intl with `/de` (default) and `/en` locale prefixes.

**Why:**
- SEO-friendly URLs: `/de/readiness-check` vs `/en/readiness-check`
- Server Component support (no hydration mismatch)
- Type-safe message keys with TypeScript
- ICU message format handles German pluralization correctly

**Structure:**
```
messages/
  de.json    # Primary (German)
  en.json    # Secondary (English)
```

### 3. Form Architecture: Multi-Step Wizard

**Decision:** react-hook-form + zod + zustand for wizard state.

**Why:**
- react-hook-form handles per-step validation without re-rendering the entire wizard
- Zod schemas define validation per step (reused in PDF generation for type safety)
- zustand stores wizard progress (current step, completed steps, aggregated answers) -- survives component unmounts during step navigation

**Wizard structure:**
- Step 0: Welcome / explanation
- Step 1: Affected-check (sector, employee count, revenue)
- Step 2-11: 10x NIS2 Art. 21(2) measures (one per step)
- Step 12: Results + PDF download

### 4. No Auth, No Data Storage, No Cookies

**Decision:** Fully client-side state. No database. No user accounts. No tracking.

**Why:**
- DSGVO compliant by design (no personal data collected)
- No cookie banner needed (no tracking cookies)
- Wizard state lives in zustand (memory only, lost on page refresh -- acceptable for a 10-minute assessment)
- PDF generated on-demand via API route, data sent as POST body, not stored server-side

### 5. Deployment: Vercel

**Decision:** Deploy on Vercel free tier (Hobby).

**Constraints:**
- Serverless function timeout: 60s default (PDF generation well within this)
- Function size limit: 50MB (no Chromium binary needed)
- No database needed = no additional services
- Automatic HTTPS, CDN, preview deployments

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **@react-pdf/renderer** | Puppeteer + @sparticuz/chromium-min | When you need pixel-perfect rendering of complex HTML/CSS (charts, custom fonts with exact web rendering). NOT suitable here: exceeds Vercel Hobby function size limits, 5-10s cold starts. |
| **@react-pdf/renderer** | jsPDF 4.0 | When PDF is simple (text-only, no layout). NOT suitable here: jsPDF has limited layout capabilities for a professional report with tables, colors, and sections. |
| **next-intl** | react-i18next | When NOT using Next.js, or when using Pages Router only. next-intl is purpose-built for App Router and has better Server Component integration. |
| **shadcn/ui** | Chakra UI / Mantine | When you want pre-built components without customization. shadcn/ui gives full ownership of component code, critical for professional branding. |
| **zustand** | React Context | When state is trivial (< 3 values). Wizard with 10+ steps, scores, and completion tracking benefits from zustand's simpler API and devtools. |
| **react-hook-form** | Formik | Never in 2026. Formik is unmaintained. react-hook-form is the clear standard. |
| **Tailwind CSS v4** | CSS Modules | When team has no Tailwind experience. Given 10-day deadline + shadcn/ui requirement, Tailwind is non-negotiable. |
| **motion (framer-motion)** | CSS transitions only | When bundle size is critical and animations are trivial. Acceptable fallback if motion causes issues. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Puppeteer / Playwright for PDF** | Chromium binary exceeds Vercel Hobby 50MB limit. 5-10s cold starts. Complex deployment. | @react-pdf/renderer (no browser needed) |
| **Formik** | Effectively unmaintained. Last major release was 2021. Performance issues with large forms. | react-hook-form |
| **styled-components / Emotion** | Runtime CSS-in-JS is dead in 2026. Poor Server Component support. Tailwind v4 is faster. | Tailwind CSS v4 |
| **Redux / Redux Toolkit** | Massive overkill for this use case. No server state, no complex state trees. | zustand for client state |
| **i18next (raw)** | Not integrated with Next.js App Router. Requires manual setup for Server Components. | next-intl |
| **Material UI (MUI)** | Heavy bundle, opinionated design system. Harder to customize for professional branding. | shadcn/ui + Tailwind |
| **react-intl (FormatJS)** | Less Next.js App Router integration than next-intl. More complex API. | next-intl |
| **any database (Supabase, Prisma, etc.)** | No data storage requirement. Adds complexity, cost, and DSGVO burden. | In-memory state only |
| **NextAuth / Clerk / Auth0** | No authentication requirement. Anonymous tool. | Nothing -- no auth needed |
| **Google Analytics / Plausible** | DSGVO: no tracking cookies, no personal data. Would require cookie banner. | Nothing -- no analytics |
| **pdfmake** | Lower-level API than @react-pdf/renderer. No React component model. | @react-pdf/renderer |

---

## Version Compatibility Matrix

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 16.1.x | React 19.2.x | Shipped together. Do not mix React versions. |
| Next.js 16.1.x | TypeScript >= 5.1.0 | Use 5.8.x for best experience. |
| Tailwind CSS 4.1.x | tailwind-merge 3.4.x | tailwind-merge v2.x does NOT support Tailwind v4. Must use v3+. |
| shadcn/ui (Feb 2026) | Tailwind CSS 4.x, Radix UI (unified package) | Uses unified `radix-ui` package, not individual `@radix-ui/react-*`. |
| @react-pdf/renderer 4.3.x | React 19.x | Supported since v4.1.0. Add to `serverComponentsExternalPackages`. |
| react-hook-form 7.71.x | @hookform/resolvers + zod 4.x | Ensure @hookform/resolvers supports zod v4 (check latest resolvers version). |
| zod 4.3.x | TypeScript >= 5.0 | Breaking changes from zod 3. Do NOT follow zod 3 tutorials. |
| next-intl 4.8.x | Next.js 16.x | Verify `createNextIntlPlugin` works with Next.js 16 config format. |

---

## Project Structure

```
nis2-readiness-check/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Locale-based routing (de, en)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Landing / start
│   │   │   └── check/
│   │   │       └── page.tsx       # Wizard page
│   │   └── api/
│   │       └── pdf/
│   │           └── route.ts       # PDF generation endpoint
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── wizard/                # Wizard steps
│   │   │   ├── wizard-shell.tsx
│   │   │   ├── step-affected.tsx
│   │   │   ├── step-measure-*.tsx # 10 measure steps
│   │   │   └── step-results.tsx
│   │   └── pdf/
│   │       └── nis2-report.tsx    # PDF layout components
│   ├── lib/
│   │   ├── utils.ts               # cn() helper
│   │   ├── i18n/
│   │   │   ├── request.ts         # next-intl config
│   │   │   └── routing.ts         # Locale routing config
│   │   ├── schemas/               # Zod schemas per step
│   │   └── nis2/
│   │       ├── sectors.ts         # NIS2 sector definitions
│   │       ├── measures.ts        # Art. 21(2) measure definitions
│   │       └── scoring.ts         # Scoring logic
│   ├── stores/
│   │   └── wizard-store.ts        # zustand store
│   └── messages/
│       ├── de.json                # German translations
│       └── en.json                # English translations
├── public/
├── next.config.ts
├── tailwind.config.ts             # Minimal (Tailwind v4 auto-detects)
├── components.json                # shadcn/ui config
└── tsconfig.json
```

---

## Critical Implementation Notes

### @react-pdf/renderer + Next.js 16 Config

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
  // Note: In Next.js 16, this key was renamed from
  // serverComponentsExternalPackages to serverExternalPackages
};

export default withNextIntl(nextConfig);
```

### Vercel Deployment Config

```json
// vercel.json (usually not needed, but for reference)
{
  "functions": {
    "src/app/api/pdf/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### cn() Utility (shadcn/ui standard)

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Sources

- [Next.js 16.1 Blog Post](https://nextjs.org/blog/next-16-1) -- confirmed v16.1 as latest stable
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- TypeScript 5.1+ minimum
- [React Versions](https://react.dev/versions) -- confirmed React 19.2.4 latest
- [Tailwind CSS v4.0 Blog](https://tailwindcss.com/blog/tailwindcss-v4) -- confirmed v4.x architecture
- [@react-pdf/renderer npm](https://www.npmjs.com/package/@react-pdf/renderer) -- v4.3.2, React 19 since v4.1.0
- [@react-pdf/renderer Compatibility](https://react-pdf.org/compatibility) -- Next.js compatibility notes
- [next-intl](https://next-intl.dev/) -- v4.8.2, App Router support
- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form) -- v7.71.1
- [zod npm](https://www.npmjs.com/package/zod) -- v4.3.5, Zod 4 stable
- [zustand npm](https://www.npmjs.com/package/zustand) -- v5.0.11
- [shadcn/ui Changelog Feb 2026](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui) -- unified radix-ui package
- [tailwind-merge npm](https://www.npmjs.com/package/tailwind-merge) -- v3.4.0 for Tailwind v4
- [Vercel Limits](https://vercel.com/docs/limits) -- Hobby tier: 60s timeout, 50MB function size
- [lucide-react npm](https://www.npmjs.com/package/lucide-react) -- v0.563.0
- [motion npm](https://www.npmjs.com/package/motion) -- v12.x (rebranded from framer-motion)

---

## Risk Register

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| @react-pdf/renderer incompatible with Next.js 16 App Router | HIGH | MEDIUM | Fallback: Pages Router API route at `/pages/api/pdf.ts`. Test PDF generation in first sprint day. |
| German font rendering in PDF (umlauts) | MEDIUM | LOW | @react-pdf/renderer supports custom fonts. Register a font with German character support (e.g., Inter, Roboto). Test early. |
| Zod 4 breaking changes vs. tutorials | MEDIUM | MEDIUM | Only follow Zod 4 docs (zod.dev). Ignore all Zod 3 tutorials. API changed for `.pick()`, `.omit()`, and other methods. |
| Tailwind v4 + shadcn/ui edge cases | LOW | LOW | shadcn/ui explicitly supports Tailwind v4 as of Jan 2026. Use `npx shadcn@latest` (not older versions). |
| Vercel Hobby tier timeout for large PDFs | LOW | LOW | PDF generation should take < 5s. 60s timeout is generous. No risk for this use case. |

---
*Stack research for: NIS2 Compliance Self-Assessment Web Tool*
*Researched: 2026-02-06*
