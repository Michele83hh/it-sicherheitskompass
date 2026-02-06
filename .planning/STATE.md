# Project State: NIS2 Readiness Check

**Last Updated:** 2026-02-06T20:38:00Z

---

## Current Position

**Phase:** 4 of 7 (04-gap-analysis-wizard)
**Plan:** 1 of 1 in phase
**Status:** ✅ Phase complete
**Last activity:** 2026-02-06 - Completed 04-01-PLAN.md (10-category gap analysis wizard UI)

**Progress:** Phase 4 complete, ready for Phase 5

```
Phase 1: █████████████████████ 100% (2/2) ✅
Phase 2: █████████████████████ 100% (3/3) ✅
Phase 3: █████████████████████ 100% (2/2) ✅
Phase 4: █████████████████████ 100% (1/1) ✅
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
| 3     | Affected Check                | ✅ Complete      | 2/2 (100%) |
| 4     | Gap Analysis Wizard           | ✅ Complete      | 1/1 (100%) |
| 5     | Results Dashboard             | 🔜 Not planned   | 0/?        |
| 6     | PDF Report                    | 🔜 Not planned   | 0/?        |
| 7     | Polish + Legal + Deploy       | 🔜 Not planned   | 0/?        |

---

## Accumulated Decisions

| Phase | Plan | Decision | Rationale |
|-------|------|----------|-----------|
| 01 | 01 | Custom i18n path at src/lib/i18n/ | Better organization |
| 01 | 01 | German as default locale | Target audience German KMUs |
| 01 | 02 | Blue-based primary color (#1e40af) | Trust, authority, compliance |
| 01 | 02 | Inter font family | Professional German character support |
| 02 | 01 | i18n keys for sector/subsector names | Language switching without data duplication |
| 02 | 01 | Pure classification function | No side effects, deterministic |
| 02 | 03 | vitest over Jest | Faster, ESM support |
| 02 | 03 | Pure scoring functions | Easy testing, worker-compatible |
| 03 | 01 | Zustand persist with nis2-wizard-storage key | Prevents data loss on navigation |
| 03 | 01 | Top-level check key in translations | Feature-based organization |
| 03 | 02 | Zod schema inside component for t() access | Small schema, hook access needed |
| 03 | 02 | Number.MAX_SAFE_INTEGER for omitted balance sheet | Prevents threshold blocking |
| 03 | 02 | Controller pattern for shadcn + RHF | shadcn uses onValueChange, not onChange |
| 03 | 02 | isClient hydration guard | Zustand persist causes SSR mismatch |
| 04 | 01 | Separate nis2-gap-analysis-storage key | Prevents interference with wizard-store |
| 04 | 01 | Dynamic zod schema from questions array | Ensures all 3 questions per category required |
| 04 | 01 | Form remount via key={categoryId} | Forces re-initialization of defaultValues |
| 04 | 01 | Partial back save | Save incomplete answers on back navigation |
| 04 | 01 | router.push to results | SPA navigation, no full page reload |

---

## Blockers & Concerns

| ID | Type | Description | Status | Mitigation |
|----|------|-------------|--------|------------|
| C1 | Technical | Zod 4 breaking changes | ✅ Resolved | Zod v4.3.6 works with @hookform/resolvers v5.2.2 |
| C2 | Technical | @react-pdf/renderer compatibility | 🟡 Monitoring | Test in Phase 6 |

---

## User Feedback (Phase 7)

Landing page design feedback from user verification:
- Add logo and company branding in hero
- "Für wen eignet sich der Check?" section
- Example report teaser (screenshot)
- Link to consulting service after results
- More personality, less generic SaaS look

---

## Session Continuity

**Last session:** 2026-02-06T20:38:00Z
**Stopped at:** Completed Phase 4 (Gap Analysis Wizard) — 10-category wizard with answer persistence
**Resume file:** None

**Next action:** Plan Phase 5 (Results Dashboard)

---

## Key Files

**Affected Check Wizard (Phase 3):**
- `src/app/[locale]/check/page.tsx` - Wizard container with hydration guard
- `src/app/[locale]/check/steps/sector-selection.tsx` - Step 1: sector dropdown
- `src/app/[locale]/check/steps/company-size.tsx` - Step 2: size inputs
- `src/app/[locale]/check/steps/result.tsx` - Step 3: classification result
- `src/app/[locale]/check/components/step-indicator.tsx` - 3-step progress
- `src/app/[locale]/check/components/navigation.tsx` - Back/Next/Submit

**Gap Analysis Wizard (Phase 4):**
- `src/app/[locale]/gap-analysis/page.tsx` - 10-category wizard container
- `src/app/[locale]/gap-analysis/steps/category-step.tsx` - Generic category step
- `src/app/[locale]/gap-analysis/components/category-progress.tsx` - Progress indicator
- `src/stores/gap-analysis-store.ts` - Answer persistence with zustand

**NIS2 Domain Model:**
- `src/lib/nis2/types.ts` - All NIS2 domain types
- `src/lib/nis2/sectors.ts` - 18-sector catalog
- `src/lib/nis2/classification.ts` - §28 BSIG classification logic
- `src/lib/nis2/categories.ts` - 10 Art. 21(2) categories
- `src/lib/nis2/questions.ts` - 30 gap analysis questions
- `src/lib/nis2/recommendations.ts` - 20 BSI recommendations

**Scoring Engine:**
- `src/lib/scoring/engine.ts` - 5 pure scoring functions
- `src/lib/scoring/engine.test.ts` - 39 unit tests

---

*This file tracks execution state across sessions. Updated automatically by GSD agents.*
