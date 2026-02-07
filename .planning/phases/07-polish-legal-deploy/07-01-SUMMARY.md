---
phase: 07-polish-legal-deploy
plan: 01
subsystem: legal-compliance
tags: [legal, gdpr, ddg, i18n, next-intl, compliance]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: next-intl i18n infrastructure with translation hooks
  - phase: 02-nis2-content
    provides: classification logic and legal references
provides:
  - Legal compliance pages (Impressum, Datenschutzhinweis) per DDG section 5
  - Pre-assessment disclaimer on check wizard
  - Conditional classification language (advisory not definitive)
  - Production console.log removal configuration
affects: [deployment, legal-review, phase-7-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Legal pages pattern: separate /imprint and /privacy routes with footer links"
    - "Disclaimer banner pattern: Info icon with blue info-style styling"
    - "Conditional language pattern: 'deuten darauf hin' instead of definitive statements"

key-files:
  created:
    - src/app/[locale]/imprint/page.tsx
    - src/app/[locale]/privacy/page.tsx
  modified:
    - src/messages/de.json
    - src/messages/en.json
    - src/app/[locale]/check/page.tsx
    - next.config.ts

key-decisions:
  - "Use 'Rechtsstand: Februar 2026' format (shorter than previous 'Stand der Rechtslage')"
  - "Show pre-assessment disclaimer only on steps 0 and 1 (not on result step)"
  - "Use placeholder brackets [Name] in Impressum for easy pre-deployment replacement"
  - "Configure removeConsole to exclude error and warn for production debugging capability"

patterns-established:
  - "Legal page structure: h1 title, sections with h2 headings, prose-style Tailwind classes"
  - "Placeholder notice pattern: blue info box at top of page alerting to required replacements"
  - "Pre-assessment disclaimer: 3-paragraph structure (title, no legal advice, orientation only)"

# Metrics
duration: 12min
completed: 2026-02-07
---

# Phase 7 Plan 01: Legal Pages Summary

**DDG-compliant Impressum and Datenschutzhinweis with conditional classification language and pre-assessment disclaimer**

## Performance

- **Duration:** 12 min
- **Started:** 2026-02-07T10:48:00Z
- **Completed:** 2026-02-07T11:00:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created legal compliance pages (Impressum, Datenschutzhinweis) accessible via footer links
- Updated all classification reasons to use conditional language ("deuten darauf hin")
- Added pre-assessment disclaimer to check wizard (steps 0-1)
- Updated Rechtsstand-Datum to "Februar 2026" in footer and PDF
- Configured production build to remove console.log statements

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Impressum and Datenschutzhinweis pages with i18n content** - `47fe1c6` (feat)
2. **Task 2: Add pre-assessment disclaimer, update Rechtsstand, configure removeConsole** - `efdfc5c` (feat)

## Files Created/Modified
- `src/app/[locale]/imprint/page.tsx` - Impressum page with DDG section 5 mandatory fields
- `src/app/[locale]/privacy/page.tsx` - Datenschutzhinweis confirming no data collection
- `src/messages/de.json` - Added legal.imprint, legal.privacy, disclaimers.preAssessment sections; updated classification reasons; updated footer/PDF dates
- `src/messages/en.json` - Matching English translations for all legal content
- `src/app/[locale]/check/page.tsx` - Added pre-assessment disclaimer banner (Info icon, blue styling)
- `next.config.ts` - Added compiler.removeConsole configuration for production

## Decisions Made
- **Rechtsstand format:** Changed from "Stand der Rechtslage: Januar 2025" to "Rechtsstand: Februar 2026" (shorter, cleaner)
- **Disclaimer visibility:** Show pre-assessment disclaimer only on steps 0 and 1 (not on result step 2) to avoid repetition after user has seen classification
- **Placeholder notation:** Use [eckige Klammern] for placeholder fields in Impressum with blue info box notice at top
- **Console removal scope:** Exclude console.error and console.warn from removal to preserve production debugging capability

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

**Legal compliance foundation complete.** Ready for:
- Impressum/Privacy placeholder replacement before production deployment
- Landing page polish (07-02)
- Deployment configuration (07-03)

**Blockers:** None

**Pre-deployment checklist added:**
- [ ] Replace [Name / Firma] in Impressum with actual company name
- [ ] Replace [Straße Nr.] and [PLZ Ort] with actual address
- [ ] Replace [email@example.com] with actual contact email
- [ ] Replace [+49 ...] with actual phone number
- [ ] Replace [Name der verantwortlichen Person] with actual responsible person
- [ ] Verify Vercel hosting privacy policy link is current

---
*Phase: 07-polish-legal-deploy*
*Completed: 2026-02-07*
