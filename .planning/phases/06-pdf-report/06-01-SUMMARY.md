---
phase: 06-pdf-report
plan: 01
subsystem: pdf-generation
tags: [react-pdf, pdf, inter-font, pages-router, api-route]

# Dependency graph
requires:
  - phase: 05-results-dashboard
    provides: Results page with overallScore, categories, and recommendations
provides:
  - Complete PDF generation pipeline (API endpoint, document skeleton, download button)
  - Inter font registration with German Umlaute support
  - PDF types and shared styles
affects: [06-02]

# Tech tracking
tech-stack:
  added: [@react-pdf/renderer v4.x, @ag-media/react-pdf-table, Inter font (woff2)]
  patterns: [Pages Router API coexisting with App Router, side-effect font imports]

key-files:
  created:
    - src/lib/pdf/fonts.ts
    - src/lib/pdf/types.ts
    - src/lib/pdf/styles.ts
    - src/pages/api/pdf/download.tsx
    - src/components/pdf/PDFDocument.tsx
    - src/app/[locale]/results/components/download-pdf-button.tsx
  modified:
    - src/app/[locale]/results/page.tsx
    - package.json

key-decisions:
  - "Used woff2 fonts from Google Fonts CDN instead of TTF (network download issues, woff2 works with @react-pdf/renderer)"
  - "Pages Router API route (src/pages/) for PDF generation to avoid React 19 + App Router Route Handler 'ba.Component is not a constructor' error"
  - "Side-effect font import pattern: API imports fonts.ts before rendering to ensure Font.register() runs"
  - "Client-side download button collects data from zustand stores, flattens translations, POSTs to API"

patterns-established:
  - "PDF payload structure: PDFPayload with company profile, overallScore, categories, recommendations, and flattened translation messages"
  - "PDF document skeleton with placeholder content (Plan 02 fills in real components)"
  - "Translation key flattening: tCategories(key.replace('categories.', '')) pattern"

# Metrics
duration: 6min
completed: 2026-02-06
---

# Phase 6 Plan 1: PDF Report Infrastructure Summary

**End-to-end PDF download pipeline with Inter font, Pages Router API, and skeleton document rendering German Umlaute correctly**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-06T23:16:15Z
- **Completed:** 2026-02-06T23:22:24Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- PDF generation pipeline complete: button click → API call → PDF download
- Inter font (woff2) registered with German Umlaute rendering correctly
- Pages Router API endpoint at /api/pdf/download coexisting with App Router
- Download button replaces disabled placeholder on results page

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, register fonts, create PDF types/styles** - `6bc0af5` (feat)
   - Installed @react-pdf/renderer v4.x and @ag-media/react-pdf-table
   - Downloaded Inter Regular and Bold woff2 fonts to public/fonts/
   - Created src/lib/pdf/fonts.ts with Font.register() and hyphenation disabled
   - Created src/lib/pdf/types.ts with PDFPayload interfaces
   - Created src/lib/pdf/styles.ts with shared StyleSheet

2. **Task 2: Create API endpoint, PDF Document skeleton, download button** - `227d71d` (feat)
   - Created src/pages/api/pdf/download.tsx: POST endpoint using renderToBuffer
   - Created src/components/pdf/PDFDocument.tsx: 3-page skeleton (cover, categories, recommendations)
   - Created download-pdf-button.tsx: Client component collecting data from stores, POSTing to API
   - Updated results page.tsx to use DownloadPdfButton
   - Fixed params?.locale null checks (TypeScript strict mode)

## Files Created/Modified

**Created:**
- `src/lib/pdf/fonts.ts` - Inter font registration (woff2), hyphenation disabled
- `src/lib/pdf/types.ts` - PDFPayload, PDFCompanyProfile, PDFCategoryResult, PDFRecommendation interfaces
- `src/lib/pdf/styles.ts` - Shared StyleSheet with COLORS and traffic light styles
- `src/pages/api/pdf/download.tsx` - Pages Router API POST endpoint for PDF generation
- `src/components/pdf/PDFDocument.tsx` - Root PDF Document with 3-page skeleton
- `src/app/[locale]/results/components/download-pdf-button.tsx` - Client download button with loading state
- `public/fonts/Inter-Regular.woff2` - Inter Regular font (21KB)
- `public/fonts/Inter-Bold.woff2` - Inter Bold font (22KB)

**Modified:**
- `package.json` - Added @react-pdf/renderer, @ag-media/react-pdf-table
- `src/app/[locale]/results/page.tsx` - Imported DownloadPdfButton, replaced disabled button
- `src/app/[locale]/gap-analysis/page.tsx` - Fixed params?.locale null check

## Decisions Made

1. **Font format:** Used woff2 from Google Fonts CDN instead of TTF from GitHub
   - **Rationale:** Network certificate errors downloading TTF from GitHub, woff2 works with @react-pdf/renderer
   - **Impact:** 21-22KB woff2 files vs ~200KB TTF files, faster cold starts on Vercel

2. **API pattern:** Pages Router API route instead of App Router Route Handler
   - **Rationale:** Documented "ba.Component is not a constructor" error with React 19 + @react-pdf/renderer in App Router Route Handlers
   - **Impact:** src/pages/ directory coexists with src/app/, works correctly

3. **Font import pattern:** Side-effect import at top of API route
   - **Rationale:** Font.register() must run before renderToBuffer, side-effect import ensures module load
   - **Impact:** Fonts available for all PDF renders

4. **Translation flattening:** Client collects translations, passes as messages object to API
   - **Rationale:** API is server-side, can't use useTranslations hook
   - **Impact:** PDF component receives pre-translated strings

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed params potentially null TypeScript errors**
- **Found during:** Task 2 (Build verification)
- **Issue:** TypeScript strict mode flagged `params.locale` as potentially null in gap-analysis and results pages
- **Fix:** Changed to `params?.locale` optional chaining in 3 files
- **Files modified:**
  - src/app/[locale]/gap-analysis/page.tsx
  - src/app/[locale]/results/page.tsx
  - src/app/[locale]/results/components/download-pdf-button.tsx
- **Verification:** `npm run build` passes without TypeScript errors
- **Committed in:** 227d71d (Task 2 commit)

**2. [Rule 3 - Blocking] Moved pages/ to src/pages/ for Next.js App/Pages coexistence**
- **Found during:** Task 2 (First build attempt)
- **Issue:** Build error: "`pages` and `app` directories should be under the same folder"
- **Fix:** Moved pages/ directory to src/pages/ to match src/app/ location
- **Files modified:** Directory structure
- **Verification:** Build passes, API route appears in build output
- **Committed in:** 227d71d (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both necessary for build success. No scope creep.

## Issues Encountered

1. **Font download certificate errors:** GitHub raw URLs failed with CRYPT_E_NO_REVOCATION_CHECK
   - **Resolution:** Switched to Google Fonts CDN woff2 URLs, downloaded successfully

2. **Next.js directory structure:** Initial pages/ at root caused build error
   - **Resolution:** Moved to src/pages/ for App Router coexistence (documented Next.js pattern)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Plan 02:**
- PDF generation pipeline working end-to-end
- Skeleton document with 3 pages (cover, categories, recommendations)
- Download button functional on results page
- Translation messages flattening pattern established

**Plan 02 scope:**
- Replace placeholder content with real PDF components
- Add company profile section with classification details
- Add category cards with traffic lights and scores
- Add recommendations with priority badges and effort levels
- Add legal disclaimer and metadata footer

**No blockers identified.**

---
*Phase: 06-pdf-report*
*Completed: 2026-02-06*
