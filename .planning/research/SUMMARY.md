# Project Research Summary

**Project:** NIS2 Readiness Check — Web Tool for KMU Self-Assessment
**Domain:** Compliance self-assessment (web application)
**Researched:** 2026-02-06
**Confidence:** HIGH

## Executive Summary

The NIS2 readiness check tool fills a verified market gap: **no free tool combines Betroffenheitsprüfung (affected check) AND Gap Analysis in a single, anonymous flow with a downloadable PDF report and German legal references.** 12+ competitor tools were analyzed (BSI, DataGuard, Cyberday, Paradigm Security, nis2-conform.eu, etc.) — none offer this combination without registration or payment.

The recommended stack is **Next.js 16.1 + TypeScript + Tailwind CSS + shadcn/ui** for a professional frontend, **@react-pdf/renderer** via Vercel serverless Route Handler for PDF generation, **next-intl** for German/English i18n, and **zustand + react-hook-form + zod** for wizard state management. All client-side, no database, no auth — DSGVO compliant by design.

The biggest risks are (1) incorrect NIS2 sector classification logic, (2) outdated legal references from pre-final NIS2UmsG drafts, (3) PDF generation failing on Vercel, and (4) scope creep killing the 10-day deadline. All are preventable with the mitigation strategies documented in PITFALLS.md.

## Key Findings

### Recommended Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16.1 + React 19 | Vercel-native, App Router, Route Handlers for PDF API, Turbopack |
| Styling | Tailwind CSS 4.1 + shadcn/ui | Professional appearance, Radix primitives, fast development |
| i18n | next-intl 4.8 | Purpose-built for Next.js App Router, ICU syntax, type-safe |
| Forms | react-hook-form 7.71 + zod 4.3 | Multi-step wizard with per-step validation |
| State | zustand 5.0 | Wizard progress, answers, scores — single store, no Provider |
| PDF | @react-pdf/renderer 4.3 | React 19 compatible, no Chromium, fits Vercel 50MB limit |
| Deployment | Vercel (Hobby tier) | Free, HTTPS, CDN, serverless functions, GitHub integration |

**Stack Note:** Architecture research suggested react-i18next and jsPDF as alternatives. Decision: **next-intl** wins for Next.js App Router integration, **@react-pdf/renderer** wins for text-based PDFs (searchable, small, professional) over jsPDF (programmatic but limited layout). Keep jsPDF as client-side fallback.

### Market Gap (Competitive Advantage)

| What Exists | What's Missing |
|-------------|----------------|
| BSI Betroffenheitsprüfung (free, anonymous) | Stops at "you are affected" — no gap analysis, no recommendations, no PDF |
| Cyberday/Advisera gap analysis (free) | No Betroffenheitsprüfung, not German-law-specific, English only |
| nis2-conform.eu self-audit (€980) | Combines both but costs €980 and requires registration |
| NOVIDATA assessment (paid consulting) | Full service but paid engagement model |

**Our unique position:** Free + anonymous + combined Betroffenheit + Gap Analysis + PDF + German legal references + NIS2UmsG-specific. No competitor does this.

### Architecture

- **Client-side wizard** with 3 main steps: Affected Check → Gap Analysis (10 categories) → Results Dashboard
- **Single Zustand store** holds all session state (company profile, answers, scores)
- **Content-driven design:** Questions, categories, scoring weights, recommendations all in structured TypeScript/JSON data files — UI is a generic renderer
- **Pure scoring engine:** TypeScript functions with no React dependencies, trivially testable
- **Single serverless function** at `/api/pdf/route.ts` for PDF generation
- **No database, no auth, no cookies** — all data ephemeral in browser memory

### Critical Pitfalls (Top 5)

1. **Wrong sector classification** — Must match BSI Entscheidungsbaum exactly. Anlage 1 vs Anlage 2 BSIG, size thresholds (50/250 employees, 10M/50M revenue), special cases (DNS, TLD, qTSP). Unit tests mandatory.

2. **Outdated legal references** — Only use final NIS2UmsG from recht.bund.de (BGBl. 2025 I Nr. 301). Blog posts from 2024 reference draft paragraph numbers. Create EU Art. 21(2)(a-j) → §30 Abs. 2 Nr. 1-10 BSIG mapping table.

3. **PDF fails on production** — Test @react-pdf/renderer on Vercel in the first 2 days. Register fonts with Umlaut support (Inter/Noto Sans). Keep serverless function under 50MB.

4. **Meaningless scoring** — Don't call it "Compliance Score." Use "Readiness Score" / "Reifegrad." Per-measure traffic lights are primary, overall percentage is secondary orientation value. NIS2 requires ALL measures, not "pick 7 of 10."

5. **Scope creep** — 10-day deadline. If behind: cut English (German-only fine for KMU), cut PDF detail, cut BSI Grundschutz cross-refs. Do NOT cut: legal disclaimers, scoring accuracy, Betroffenheitsprüfung correctness.

### Build Order (from Architecture research)

| Phase | Days | What |
|-------|------|------|
| Foundation | 1-2 | Project setup, UI components, store skeleton, i18n config, design system |
| NIS2 Content + Engine | 2-3 | Categories, questions, scoring functions, legal reference mapping |
| Affected Check | 3-4 | Step 1 UI: sector selection, size/revenue, classification result |
| Gap Analysis Wizard | 4-7 | Multi-step form, 10 categories, 3-4 questions each, progress indicator |
| Results Dashboard | 7-8 | Scores, traffic lights, recommendations |
| PDF Report | 8-9 | Serverless function, PDF template, download integration |
| Polish + Deploy | 9-10 | Disclaimers, Impressum, responsive fixes, Vercel production deployment |

**Critical path:** Foundation → Content/Engine → Gap Analysis Wizard (bottleneck at days 4-7)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified via npm/official docs (2026-02-06). Next.js 16.1 confirmed stable. |
| Features | HIGH | 12+ competitor tools analyzed from live market data. Market gap verified. |
| Architecture | HIGH | Standard patterns (content-driven, pure engine, Zustand store). Proven in assessment/quiz apps. |
| Pitfalls | HIGH | German-law-specific pitfalls verified against BSI, recht.bund.de, and NIS2UmsG final text. |

**Overall confidence:** HIGH (85-90%)

### Gaps to Address During Execution

- **@react-pdf/renderer + Next.js 16 compatibility:** Known risk. Test on day 1. Fallback: Pages Router API route.
- **Zod 4 breaking changes:** Do NOT follow Zod 3 tutorials. API changed significantly.
- **Question catalog accuracy:** Each question must reference specific BSIG paragraphs. Research-intensive content task.
- **BSI IT-Grundschutz mapping:** Nice-to-have differentiator but HIGH effort. Defer to v1.x if time is tight.

## Sources

See individual research files for full source lists:
- `STACK.md` — 15 verified sources (npm, official docs, Vercel)
- `FEATURES.md` — 16+ competitor tools analyzed, 5 legal references
- `ARCHITECTURE.md` — 9 architecture/pattern sources
- `PITFALLS.md` — 12 sources (BSI, recht.bund.de, ENISA, NIS2 legal texts)

---
*Research completed: 2026-02-06*
*Ready for requirements: yes*
