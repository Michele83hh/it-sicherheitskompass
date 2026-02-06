# Phase 03 Plan 01: Wizard Foundation Summary

---
phase: 03-affected-check
plan: 01
subsystem: affected-check-wizard
tags: [wizard, state-management, ui-components, i18n, forms, zustand, shadcn]
requires: [02-01, 02-02, 02-03]
provides: [wizard-store, wizard-navigation, step-indicator, check-translations]
affects: [03-02]
tech-stack:
  added: [react-hook-form, @hookform/resolvers, zod, react-number-format]
  patterns: [zustand-persist, progressive-disclosure, wcag-accessibility]
key-files:
  created:
    - src/stores/wizard-store.ts
    - src/app/[locale]/check/components/step-indicator.tsx
    - src/app/[locale]/check/components/navigation.tsx
    - src/components/ui/select.tsx
    - src/components/ui/input.tsx
    - src/components/ui/label.tsx
    - src/components/ui/tooltip.tsx
    - src/components/ui/checkbox.tsx
    - src/components/ui/separator.tsx
  modified:
    - src/messages/de.json
    - src/messages/en.json
    - package.json
    - package-lock.json
key-decisions:
  - id: D1
    decision: Extended wizard store with Partial<ClassificationInput> formData
    rationale: Allows incremental form filling across steps without requiring all fields upfront
  - id: D2
    decision: Used zustand persist middleware with nis2-wizard-storage key
    rationale: Prevents data loss on accidental navigation, improves UX for interrupted sessions
  - id: D3
    decision: Partialize persist to only formData and currentStep
    rationale: Avoids serializing actions to localStorage, smaller storage footprint
  - id: D4
    decision: StepIndicator uses numbered circles with ring effect for active state
    rationale: Most semantic for 3-step wizard, accessible (numbers convey order), aligns with NN/g research
  - id: D5
    decision: WizardNavigation Button type="submit" for Next/Submit
    rationale: Triggers form validation automatically when used in forms
  - id: D6
    decision: Added full DE/EN check translations at top level (not nested under wizard)
    rationale: Translations organized by feature area, easier to locate and maintain
duration: 3m10s
completed: 2026-02-06
---

**JWT auth with refresh rotation using jose library**

Established all Phase 3 dependencies and infrastructure: extended wizard store with form persistence, created reusable wizard UI components, and added complete DE/EN translations for the affected check wizard.

## Performance

- **Execution time:** 3 minutes 10 seconds
- **Build time:** 1.3 seconds (optimized production build)
- **Dependencies installed:** 4 npm packages + 6 shadcn components
- **No blocking issues:** All tasks executed as planned

## Accomplishments

**Wizard State Management:**
- Extended zustand store from basic step tracking to full form data persistence
- Implemented persist middleware with localStorage (key: nis2-wizard-storage)
- Added navigation helpers: nextStep (clamps to 2), prevStep (clamps to 0), updateFormData (merge), reset
- Partialize strategy persists only formData and currentStep (not actions)

**Shared Wizard UI Components:**
- StepIndicator: 3 numbered circles with connecting lines, active/completed/upcoming visual states
- Active step shows ring effect (ring-4 ring-blue-200) for visual emphasis
- Labels hidden on mobile (hidden sm:block), circles always visible for responsive design
- WizardNavigation: Back/Next/Submit buttons with correct type attributes (button vs submit)
- ChevronLeft/ChevronRight icons from lucide-react for directional affordance
- Submit button label changes on last step ("Ergebnis anzeigen" vs "Weiter")

**shadcn UI Components (6 new):**
- Select: Grouped dropdown with Radix primitives (for sector/subsector selection)
- Input: Base text input with consistent styling
- Label: Form labels with proper htmlFor association
- Tooltip: Info icon tooltips for field explanations (balanceSheet, isKritis)
- Checkbox: Accessible checkbox for KRITIS field
- Separator: Visual dividers for step sections

**Internationalization:**
- Added check.steps, check.sectorStep, check.sizeStep, check.resultStep, check.navigation keys
- All 45 translation strings in both DE and EN
- Proper German Umlauts preserved (ä, ö, ü in Größe, Prüfung, etc.)
- JSON files parse correctly, no syntax errors

**Form Libraries:**
- react-hook-form v7.71.1: Per-step validation with zodResolver
- @hookform/resolvers v5.2.2: Zod schema integration
- zod v4.3.6: Type-safe validation schemas (Note: project uses Zod v4, not v3)
- react-number-format v5.4.4: Thousand-separator formatting for employees/revenue fields

## Task Commits

| Task | Commit | Files Changed | Description |
|------|--------|---------------|-------------|
| 1 | 5161307 | 8 files | Install wizard dependencies and 6 shadcn components |
| 2 | b5078f3 | 5 files | Extended wizard store, created StepIndicator + WizardNavigation, added DE/EN translations |

## Files Created

**State Management:**
- src/stores/wizard-store.ts — Extended with formData, persist middleware, navigation actions

**Wizard Components:**
- src/app/[locale]/check/components/step-indicator.tsx — 3-step progress indicator with numbered circles
- src/app/[locale]/check/components/navigation.tsx — Back/Next/Submit navigation buttons

**shadcn UI Components:**
- src/components/ui/select.tsx — Radix Select primitive with grouped options support
- src/components/ui/input.tsx — Base input component with consistent styling
- src/components/ui/label.tsx — Form label with htmlFor association
- src/components/ui/tooltip.tsx — Radix Tooltip for contextual help
- src/components/ui/checkbox.tsx — Radix Checkbox with indeterminate state support
- src/components/ui/separator.tsx — Visual divider component

## Files Modified

- src/messages/de.json — Added check.* translations (45 strings) with proper Umlauts
- src/messages/en.json — Added check.* translations (45 strings, English)
- package.json — Added react-hook-form, @hookform/resolvers, zod, react-number-format dependencies
- package-lock.json — Locked dependency versions

## Decisions Made

**D1: Partial<ClassificationInput> for formData**
- Allows fields to be filled incrementally across steps
- Step 1 sets sectorId + subsectorId, Step 2 sets employees/revenue/balanceSheet/isKritis
- TypeScript enforces that final result has all required fields before classification

**D2: Persist middleware with nis2-wizard-storage key**
- Prevents user frustration from accidentally closing tab or navigating away
- UX improvement for interrupted sessions (user can resume where they left off)
- localStorage is acceptable here (no PII, only business data: sector + size numbers)

**D3: Partialize to formData + currentStep only**
- Actions (setStep, nextStep, etc.) are functions, can't serialize to JSON
- Reduces localStorage footprint (only data, not functions)
- Avoids serialization warnings in browser console

**D4: Numbered circles for StepIndicator**
- More semantic than dots (numbers convey order even without color)
- Accessible: screen readers announce "1 of 3", "2 of 3", etc.
- Ring effect on active step (ring-4 ring-blue-200) provides clear visual focus
- Aligns with Nielsen Norman Group research on wizard best practices

**D5: Button type="submit" for Next/Submit**
- When used in forms, triggers React Hook Form validation automatically
- Prevents need for manual handleSubmit wiring in every step component
- Standard HTML form pattern (submit button submits form)

**D6: Top-level check key in translations**
- Not nested under wizard.* or affected-check.* for simplicity
- Translations organized by feature (check, landing, footer, sectors, etc.)
- Easier to locate: check.sectorStep.title vs wizard.affectedCheck.sectorStep.title
- Consistent with existing structure (landing, footer, classification are top-level)

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

**I1: TypeScript errors in .next/types/validator.ts**
- Next.js type generation errors unrelated to our code
- Does not block build (npm run build succeeds in 1.3s)
- Ignored as pre-existing project configuration issue

**I2: Zod version mismatch**
- Plan mentioned Zod v3, project actually uses Zod v4.3.6
- No impact: @hookform/resolvers v5.2.2 supports both v3 and v4
- Noted for documentation accuracy

## Next Phase Readiness

**Ready for Plan 03-02:** 3-Step Wizard UI
- All dependencies installed (react-hook-form, zod, react-number-format, shadcn components)
- Wizard store ready to be consumed by step components
- StepIndicator and WizardNavigation ready to be imported
- All i18n translations available for form labels, tooltips, validation errors
- No blockers

**Integration Points for 03-02:**
- Import useWizardStore from src/stores/wizard-store.ts
- Import StepIndicator, WizardNavigation from src/app/[locale]/check/components/
- Import shadcn components: Select, Input, Label, Tooltip, Checkbox
- Import sectors from src/lib/nis2/sectors.ts (already exists from Phase 2)
- Import classifyEntity from src/lib/nis2/classification.ts (already exists from Phase 2)

**Pattern Examples Ready:**
- Progressive disclosure: Show subsector dropdown only when sector has subsectors
- Grouped Select: Anlage 1 vs Anlage 2 sector grouping
- NumericFormat with Controller: Thousand-separator inputs for employees/revenue
- Conditional fields: balanceSheet optional with tooltip, isKritis checkbox with tooltip
- Per-step validation: Zod schemas for sectorStep (sectorId required) and sizeStep (employees + revenue required)

---

*Completed: 2026-02-06T16:07:48Z*
*Duration: 3m10s (from 16:04:38Z to 16:07:48Z)*
