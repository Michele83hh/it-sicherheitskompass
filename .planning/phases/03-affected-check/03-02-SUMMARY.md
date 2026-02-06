---
phase: 03-affected-check
plan: 02
subsystem: ui
tags: [react-hook-form, zod, react-number-format, shadcn-select, wizard, classification]

# Dependency graph
requires:
  - phase: 03-01
    provides: "Wizard store with persist, StepIndicator, WizardNavigation, i18n translations"
  - phase: 02-01
    provides: "SECTORS data, classifyEntity(), ClassificationInput/Result types"
provides:
  - "3-step wizard at /[locale]/check (sector selection, company size, result)"
  - "Working classification UI consuming classifyEntity() with balance sheet optional handling"
  - "Landing page CTA linking to /check"
affects: [04-gap-analysis-wizard, 07-polish-legal-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns: ["React Hook Form + Controller for shadcn components", "Zod schema inside component for i18n access", "NumericFormat with Controller for thousand-separator inputs", "isClient hydration guard for zustand persist", "Number.MAX_SAFE_INTEGER for optional balance sheet"]

key-files:
  created:
    - src/app/[locale]/check/page.tsx
    - src/app/[locale]/check/steps/sector-selection.tsx
    - src/app/[locale]/check/steps/company-size.tsx
    - src/app/[locale]/check/steps/result.tsx
  modified:
    - src/app/[locale]/page.tsx

key-decisions:
  - "Zod schema defined inside component (not module level) for t() hook access"
  - "Number.MAX_SAFE_INTEGER for omitted balance sheet — prevents threshold blocking"
  - "Controller pattern for shadcn Select/Checkbox with React Hook Form"
  - "isClient hydration guard to avoid zustand persist SSR mismatch"
  - "Landing page CTA uses Button asChild + Link pattern"

patterns-established:
  - "React Hook Form + zodResolver + Controller for shadcn components"
  - "NumericFormat with thousandSeparator for German number formatting"
  - "isClient hydration guard for pages using zustand persist"

# Metrics
duration: 12min
completed: 2026-02-06
---

# Phase 3 Plan 02: Affected Check Wizard UI Summary

**3-step wizard at /[locale]/check with sector selection, company size inputs, §28 BSIG classification, and color-coded result cards with legal references**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-02-06T16:10:00Z
- **Completed:** 2026-02-06T16:30:00Z
- **Tasks:** 3 (2 auto + 1 checkpoint)
- **Files modified:** 5

## Accomplishments
- Working 3-step wizard: Sector Selection → Company Size → Classification Result
- Grouped Anlage 1/2 dropdown with progressive subsector disclosure
- "Mein Sektor ist nicht aufgeführt" shortcut directly to "nicht betroffen" result
- Thousand-separator formatting for employee count, revenue, balance sheet inputs
- Balance sheet optional handling (Number.MAX_SAFE_INTEGER prevents threshold blocking)
- KRITIS checkbox with tooltip explanation
- Color-coded result cards (red/orange/green) with icon, label, and §28 BSIG reference
- Expandable "Warum?" section with classification reasoning
- Supply chain hint for "nicht betroffen" results
- Landing page CTA now links to /check
- User-verified: wizard flow works end-to-end

## Task Commits

Each task was committed atomically:

1. **Task 1: Wizard container, sector selection, company size** - `32fc4cc` (feat)
2. **Task 2: Result step, landing page CTA** - `31b809d` (feat)
3. **Orchestrator fix: Translation key prefix** - `ae1506a` (fix)

**Plan metadata:** (pending — this commit)

## Files Created/Modified
- `src/app/[locale]/check/page.tsx` - Wizard container with hydration guard, step routing
- `src/app/[locale]/check/steps/sector-selection.tsx` - Step 1: grouped sector dropdown, subsector disclosure
- `src/app/[locale]/check/steps/company-size.tsx` - Step 2: employee, revenue, balance sheet, KRITIS inputs
- `src/app/[locale]/check/steps/result.tsx` - Step 3: classification result with color card, CTAs
- `src/app/[locale]/page.tsx` - Landing page CTA linked to /check

## Decisions Made
- Zod schema inside component for t() access (small schema, acceptable tradeoff)
- Number.MAX_SAFE_INTEGER for omitted balance sheet (ensures revenue-only classification works)
- Controller pattern for all shadcn components with React Hook Form
- isClient useState/useEffect guard for hydration safety with zustand persist

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed double-prefix translation key for classification reasons**
- **Found during:** User verification (checkpoint)
- **Issue:** `tClassification(result.reason)` resolved `classification.classification.reasons.X` (double prefix) because `result.reason` includes `'classification.'` prefix and `useTranslations('classification')` adds it again
- **Fix:** Strip `'classification.'` prefix: `tClassification(result.reason.replace('classification.', ''))`
- **Files modified:** src/app/[locale]/check/steps/result.tsx
- **Verification:** Translation resolves correctly, "Warum?" section shows explanation text
- **Commit:** ae1506a

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Bug fix necessary for correct translation rendering. No scope creep.

## Issues Encountered
None beyond the translation key fix.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Affected Check wizard complete and user-verified
- Ready for Phase 4 (Gap Analysis Wizard) — result CTA already links to `/gap-analysis`
- User feedback on landing page design (branding, "Für wen?"-section) noted for Phase 7

---
*Phase: 03-affected-check*
*Completed: 2026-02-06*
