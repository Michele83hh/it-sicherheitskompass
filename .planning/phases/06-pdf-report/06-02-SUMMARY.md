---
phase: 06-pdf-report
plan: 02
subsystem: pdf-generation
tags: [react-pdf, pdf-components, i18n, zustand]

# Dependency graph
requires:
  - phase: 06-pdf-report
    plan: 01
    provides: PDF generation pipeline with API endpoint and skeleton document
provides:
  - Production-quality PDF report with professional formatting
  - Cover page with legal disclaimer and metadata
  - Company profile with NIS2 classification
  - Category scores table with traffic lights and legal references
  - Recommendations with priority badges and BSI references
  - Bilingual support (German/English) with legal references always in German
affects: [07-polish]

# Tech tracking
tech-stack:
  added: []
  patterns: [Classification result persistence in zustand, PDF translation namespace flattening]

key-files:
  created:
    - src/components/pdf/PDFCoverPage.tsx
    - src/components/pdf/PDFCompanyProfile.tsx
    - src/components/pdf/PDFOverallScore.tsx
    - src/components/pdf/PDFScoresTable.tsx
    - src/components/pdf/PDFRecommendations.tsx
  modified:
    - src/stores/wizard-store.ts
    - src/app/[locale]/check/steps/result.tsx
    - src/messages/de.json
    - src/messages/en.json
    - src/lib/pdf/styles.ts
    - src/app/[locale]/results/components/download-pdf-button.tsx
    - src/components/pdf/PDFDocument.tsx

key-decisions:
  - "Store classificationResult in wizard store to avoid recomputation and ensure PDF matches user-viewed result"
  - "Legal references (Rechtsstand, legalReference, bsiReference) always in German even in English PDFs - maintains legal precision"
  - "use wrap=false on recommendation cards to keep them visually together across page breaks"
  - "Score bars use fixed width (80px) with percentage-based fill for consistent visual appearance"
  - "Priority-based border colors on recommendation cards (red=high, yellow=medium, green=low) for quick visual scanning"

patterns-established:
  - "PDF translation namespace (pdf.*) with flattened key structure in download-pdf-button"
  - "Sub-component architecture: PDFDocument composes specialized components (cover, profile, scores, recommendations)"
  - "Locale-aware number/currency formatting using Intl.NumberFormat/DateTimeFormat"

# Metrics
duration: 3min
completed: 2026-02-06
---

# Phase 6 Plan 2: PDF Content Components Summary

**Professional PDF report with cover page, company profile, category scores table, and prioritized recommendations - all properly formatted with bilingual support and German legal references**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-06T23:26:44Z
- **Completed:** 2026-02-06T23:30:10Z
- **Tasks:** 2
- **Files modified:** 12 (5 created, 7 modified)

## Accomplishments
- Classification result now persisted in wizard store for PDF consistency
- Comprehensive PDF translation namespace added to both de.json and en.json
- Professional cover page with disclaimer and Rechtsstand (always in German)
- Company profile with formatted numbers, currency, and color-coded classification
- Overall score display with large percentage and traffic light
- 10-category scores table with traffic lights, percentage bars, and legal references
- Recommendations section with priority badges, effort levels, and BSI references
- All legal references remain in German original even in English PDFs
- PDF layout: Page 1 (cover/profile/score), Page 2 (scores table), Page 3+ (recommendations)

## Task Commits

Each task was committed atomically:

1. **Task 1: Store classification result, add PDF translations, create cover/profile/score components** - `ecf2e30` (feat)
   - Added classificationResult field to wizard store with setClassificationResult action
   - Added useEffect in result.tsx to persist classification when computed
   - Created comprehensive pdf.* translation namespace in de.json and en.json
   - Created PDFCoverPage with disclaimer, Rechtsstand (German), and formatted date
   - Created PDFCompanyProfile with locale-aware number/currency formatting
   - Created PDFOverallScore with large percentage display and traffic light
   - Updated download-pdf-button to use tPdf() for all PDF translations
   - Added label-value, score display, table, and recommendation card styles

2. **Task 2: Create scores table, recommendations section, compose final PDFDocument** - `4f65d10` (feat)
   - Created PDFScoresTable with 10 rows, traffic lights, percentage bars
   - Score bars use fixed 80px width with percentage-based fill
   - Legal references (EU Article + BSIG paragraph) always in German
   - Created PDFRecommendations with priority-based border colors
   - Recommendations use wrap=false to keep cards together
   - Priority badges (high=red, medium=yellow, low=green)
   - Rewrote PDFDocument to compose all sub-components across 3+ pages
   - Footer with page numbers appears on all pages

## Files Created/Modified

**Created:**
- `src/components/pdf/PDFCoverPage.tsx` - Cover page with title, disclaimer, Rechtsstand, generated date
- `src/components/pdf/PDFCompanyProfile.tsx` - Company profile with formatted data and color-coded classification
- `src/components/pdf/PDFOverallScore.tsx` - Overall score with large percentage and traffic light
- `src/components/pdf/PDFScoresTable.tsx` - 10-category table with traffic lights, bars, legal refs
- `src/components/pdf/PDFRecommendations.tsx` - Recommendations with priority badges and BSI references

**Modified:**
- `src/stores/wizard-store.ts` - Added classificationResult field and setClassificationResult action
- `src/app/[locale]/check/steps/result.tsx` - Added useEffect to persist classification result
- `src/messages/de.json` - Added pdf.* translation namespace (30+ keys)
- `src/messages/en.json` - Added pdf.* translation namespace (30+ keys)
- `src/lib/pdf/styles.ts` - Added label-value, score display, table, recommendation card styles
- `src/app/[locale]/results/components/download-pdf-button.tsx` - Use tPdf() for all PDF translations
- `src/components/pdf/PDFDocument.tsx` - Rewritten to compose all sub-components

## Decisions Made

1. **Classification result persistence:** Store in wizard store to avoid recomputation
   - **Rationale:** Ensures PDF matches what user saw on results page
   - **Impact:** Single source of truth for classification across results page and PDF

2. **Legal references always in German:** Rechtsstand, legalReference, bsiReference unchanged
   - **Rationale:** Legal precision requires original German text
   - **Impact:** English PDFs show German legal references, translated UI text

3. **wrap=false on recommendation cards:** Keeps recommendations visually together
   - **Rationale:** Improves readability, prevents awkward page breaks mid-recommendation
   - **Impact:** More professional appearance

4. **Fixed-width score bars:** 80px bars with percentage-based fill
   - **Rationale:** Consistent visual alignment across all categories
   - **Impact:** Clean, table-like appearance in scores section

5. **Priority-based border colors:** Red (high), yellow (medium), green (low)
   - **Rationale:** Visual hierarchy for quick scanning of urgent vs. long-term actions
   - **Impact:** Users immediately see red-bordered high-priority items

## Deviations from Plan

None - plan executed exactly as written.

---

## Issues Encountered

None - all components compiled and integrated successfully on first build.

## User Setup Required

None - PDF generation fully functional with no additional configuration.

## Next Phase Readiness

**Ready for Phase 07 (Polish + Legal + Deploy):**
- PDF report complete and professional
- All requirements from Phase 06 fulfilled
- German Umlaute rendering correctly via Inter font
- Bilingual support working (German/English)
- Legal references preserved in German original

**Possible Phase 07 improvements:**
- Add visual polish (logos, better color scheme)
- Legal review of disclaimer text
- Deployment configuration (Vercel environment variables)
- Analytics integration

**No blockers identified.**

---
*Phase: 06-pdf-report*
*Completed: 2026-02-06*
