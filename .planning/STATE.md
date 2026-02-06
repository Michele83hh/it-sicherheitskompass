# Project State: NIS2 Readiness Check

**Last Updated:** 2026-02-06T16:07:48Z

---

## Current Position

**Phase:** 3 of 7 (03-affected-check)
**Plan:** 1 of 2 in phase
**Status:** 🏗️ In progress
**Last activity:** 2026-02-06 - Completed 03-01-PLAN.md (wizard foundation: store, components, translations)

**Progress:** Phase 3 underway (1/2 plans complete)

```
Phase 1: █████████████████████ 100% (2/2) ✅
Phase 2: █████████████████████ 100% (3/3) ✅
Phase 3: ██████████░░░░░░░░░░░  50% (1/2) 🏗️
```

---

## Core Value Statement

> KMU können in 15-20 Minuten herausfinden, ob sie von NIS2 betroffen sind und wo ihre größten Compliance-Lücken liegen.

---

## Technology Stack

**Framework:** Next.js 16 (App Router, Turbopack)
**Language:** TypeScript
**Styling:** Tailwind CSS v4
**UI Components:** shadcn/ui
**Internationalization:** next-intl (DE/EN)
**State Management:** zustand (with persist middleware)
**Testing:** vitest ^4.0.18
**PDF Generation:** @react-pdf/renderer (to be added)
**Form Management:** react-hook-form ^7.71.1 + zod ^4.3.6 + react-number-format ^5.4.4

---

## Phases Overview

| Phase | Name                          | Status          | Plans      |
|-------|-------------------------------|-----------------|------------|
| 1     | Foundation                    | ✅ Complete      | 2/2 (100%) |
| 2     | NIS2 Content + Scoring Engine | ✅ Complete      | 3/3 (100%) |
| 3     | Affected Check                | 🏗️ In progress   | 1/2 (50%)  |
| 4     | Gap Analysis Wizard           | 🔜 Not planned   | 0/?        |
| 5     | Results Dashboard             | 🔜 Not planned   | 0/?        |
| 6     | PDF Report                    | 🔜 Not planned   | 0/?        |
| 7     | Polish + Legal + Deploy       | 🔜 Not planned   | 0/?        |

---

## Accumulated Decisions

| Phase | Plan | Decision | Rationale |
|-------|------|----------|-----------|
| 01    | 01   | Custom i18n path at src/lib/i18n/ | Better organization of library utilities |
| 01    | 01   | German as default locale | Target audience is German-speaking KMUs |
| 01    | 01   | Prettier with Tailwind plugin | Automatic Tailwind class sorting for consistency |
| 01    | 02   | Blue-based primary color palette (#1e40af) | Conveys trust, authority, compliance seriousness for consulting tool |
| 01    | 02   | Inter font family | Professional German character support, clean appearance |
| 01    | 02   | Traffic light colors as CSS variables | Consistent scoring UI preparation (red/yellow/green) |
| 01    | 02   | Design approved by user | Confirmed professional quality suitable for Bewerbungsprojekt |
| 02    | 01   | i18n keys for sector/subsector names | Translation keys enable language switching without data duplication |
| 02    | 01   | Export THRESHOLDS as const | Transparency for audits and easy unit testing |
| 02    | 01   | Pure classification function | No side effects, deterministic, easy to test |
| 02    | 01   | Legal references in code | Traceability to §28 BSIG for audit compliance |
| 02    | 02   | Questions use translation keys | Enables i18n, keeps TypeScript data files language-agnostic |
| 02    | 02   | Legal references in German format (EN too) | German law (BSIG) is binding; matches I18N-05 requirement |
| 02    | 02   | Separate CATEGORIES and QUESTIONS arrays | Easier to query by category, avoids data duplication |
| 02    | 03   | vitest over Jest | Faster execution, simpler config, native ESM support |
| 02    | 03   | Pure scoring functions (no React) | Easy testing without mocking, worker-compatible |
| 02    | 03   | (level / 3) × 100 formula | Avoids floating-point errors, exact 100% for level 3 |
| 02    | 03   | RAG traffic light thresholds | Industry-standard <40/40-69/≥70 maturity ranges |
| 02    | 03   | Equal category weighting | All Art. 21(2) measures equally mandatory per directive |
| 02    | 03   | 1 decimal place rounding | Balances precision with readability |
| 02    | 03   | SCORING_METHODOLOGY export | Transparent methodology for Results Dashboard |
| 03    | 01   | Partial<ClassificationInput> for wizard formData | Allows incremental form filling across 3 steps |
| 03    | 01   | Zustand persist with nis2-wizard-storage key | Prevents data loss on accidental navigation |
| 03    | 01   | Numbered circles for StepIndicator | Most semantic and accessible for 3-step wizard |
| 03    | 01   | Top-level check key in translations | Feature-based organization (not nested under wizard.*) |

---

## Blockers & Concerns

| ID | Type | Description | Status | Mitigation |
|----|------|-------------|--------|------------|
| C1 | Technical | Zod 4 breaking changes | ✅ Resolved | Project uses Zod v4.3.6, @hookform/resolvers v5.2.2 supports it |
| C2 | Technical | @react-pdf/renderer compatibility | 🟡 Monitoring | Test integration in Phase 6 |

**Notes:**
- C1 resolved: Zod v4 installed and working with react-hook-form
- C2 deferred to Phase 6 when PDF generation is implemented

---

## Phase 3 Plan Details

| Plan | Wave | What it builds | Dependencies |
|------|------|----------------|--------------|
| 03-01 | 1 | Dependencies, wizard store, shared components, i18n translations | 02-01, 02-02, 02-03 |
| 03-02 | 1 | 3-step wizard UI (sector selection, company size, classification result) | 03-01 |

**Status:** Plan 03-01 complete (3m10s), ready for 03-02

---

## Session Continuity

**Last session:** 2026-02-06T16:07:48Z
**Stopped at:** Completed 03-01-PLAN.md (wizard foundation: store, components, translations)
**Resume file:** None

**Next action:** Execute Plan 03-02 (3-step wizard UI)

---

## Key Files

**Configuration:**
- `next.config.ts` - Next.js with next-intl plugin
- `components.json` - shadcn/ui configuration
- `.prettierrc` - Code formatting rules

**Internationalization:**
- `src/lib/i18n/routing.ts` - Locale routing (DE/EN)
- `src/lib/i18n/request.ts` - i18n request handler
- `src/middleware.ts` - Locale detection middleware
- `src/messages/de.json` - German translations
- `src/messages/en.json` - English translations

**State Management:**
- `src/stores/wizard-store.ts` - Extended wizard state (zustand with persist middleware)

**NIS2 Domain Model:**
- `src/lib/nis2/types.ts` - All NIS2 domain types
- `src/lib/nis2/sectors.ts` - 18-sector catalog with Anlage assignments
- `src/lib/nis2/classification.ts` - §28 BSIG classification logic
- `src/lib/nis2/categories.ts` - 10 Art. 21(2) measure categories
- `src/lib/nis2/questions.ts` - 30 gap analysis questions (3 per category)
- `src/lib/nis2/recommendations.ts` - 20 BSI-referenced recommendations (2 per category)

**Scoring Engine:**
- `src/lib/scoring/types.ts` - Scoring type re-exports + CategoryQuestionCount
- `src/lib/scoring/engine.ts` - 5 pure scoring functions
- `src/lib/scoring/methodology.ts` - SCORING_METHODOLOGY for UI transparency
- `src/lib/scoring/engine.test.ts` - 39 unit tests (all passing)
- `vitest.config.ts` - Testing configuration

**Layout Components:**
- `src/components/layout/header.tsx` - Navigation header with language switcher
- `src/components/layout/footer.tsx` - Footer with legal disclaimer
- `src/components/layout/language-switcher.tsx` - DE/EN toggle

**Pages:**
- `src/app/[locale]/layout.tsx` - Root layout with i18n, Inter font, Header/Footer
- `src/app/[locale]/page.tsx` - Professional landing page with hero, value props, how-it-works, trust signals

**Design Assets:**
- `src/app/globals.css` - Design tokens (colors, typography)
- `public/favicon.svg` - NIS2 shield branding

**Wizard Components (Phase 3):**
- `src/app/[locale]/check/components/step-indicator.tsx` - 3-step progress indicator
- `src/app/[locale]/check/components/navigation.tsx` - Back/Next/Submit navigation buttons
- `src/components/ui/select.tsx` - Grouped dropdown (sector selection)
- `src/components/ui/input.tsx` - Text input with consistent styling
- `src/components/ui/label.tsx` - Form labels with htmlFor
- `src/components/ui/tooltip.tsx` - Contextual help tooltips
- `src/components/ui/checkbox.tsx` - Accessible checkbox (KRITIS)
- `src/components/ui/separator.tsx` - Visual dividers

---

## Alignment Check

**Vision alignment:** ✅ Foundation supports 15-minute wizard flow
**Technical alignment:** ✅ All planned dependencies installed and configured
**Scope alignment:** ✅ No scope creep, plan executed as specified

---

*This file tracks execution state across sessions. Updated automatically by GSD agents.*
