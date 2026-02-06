---
phase: 02-nis2-content-scoring-engine
plan: 01
subsystem: domain-model
tags: [nis2, classification, sectors, i18n, typescript]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: i18n infrastructure, TypeScript configuration
provides:
  - Complete NIS2 sector catalog (18 sectors from BSIG Anlagen 1 & 2)
  - Classification logic implementing §28 BSIG thresholds
  - Shared domain types for sectors, classification, gap analysis, scoring
  - German and English translations for all sectors and classification results
affects: [02-02-gap-analysis-questions, 02-03-scoring-engine, 03-affected-check, 04-gap-wizard, 05-results-dashboard, 06-pdf-report]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "i18n translation keys for structured data (sectors.{id}.name pattern)"
    - "Pure classification functions with explicit thresholds"
    - "Legal reference documentation in code comments"

key-files:
  created:
    - src/lib/nis2/types.ts
    - src/lib/nis2/sectors.ts
    - src/lib/nis2/classification.ts
  modified:
    - src/messages/de.json
    - src/messages/en.json

key-decisions:
  - "All sector/subsector names use i18n translation keys, not inline text"
  - "THRESHOLDS exported as const for transparency and testing"
  - "Classification function is pure (no side effects) for easy testing"

patterns-established:
  - "Domain types first: Define shared types before implementation"
  - "Legal references as string literals in code for traceability"
  - "Sector catalog as const array, accessor functions for lookups"

# Metrics
duration: 3min 25sec
completed: 2026-02-06
---

# Phase 2 Plan 1: NIS2 Sector Data and Classification Logic

**Complete 18-sector NIS2 catalog with i18n translations and pure classification function implementing §28 BSIG thresholds**

## Performance

- **Duration:** 3 minutes 25 seconds
- **Started:** 2026-02-06T14:47:51Z
- **Completed:** 2026-02-06T14:51:16Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created comprehensive NIS2 domain type definitions covering sectors, classification, gap analysis, and scoring
- Implemented complete 18-sector catalog (7 Anlage 1 + 7 Anlage 2 sectors) with 30+ subsectors
- Built classification function correctly implementing §28 BSIG size thresholds for "besonders wichtig" and "wichtig" categories
- Added complete German and English translations for all sectors, subsectors, and classification reasons

## Task Commits

Each task was committed atomically:

1. **Task 1: Create NIS2 domain types and sector data catalog** - `9b04470` (feat)
2. **Task 2: Create classification logic and add sector translations** - `bc05fce` (feat)

## Files Created/Modified
- `src/lib/nis2/types.ts` - All NIS2 domain types: Sector, ClassificationInput/Result, Question, Category, Recommendation, Answer, Score types
- `src/lib/nis2/sectors.ts` - Complete 18-sector catalog with Anlage assignments, subsectors, and accessor functions
- `src/lib/nis2/classification.ts` - Pure classification function implementing §28 BSIG thresholds (KRITIS, qTSP/DNS/TLD, Anlage 1 large entities, standard wichtig)
- `src/messages/de.json` - Added 18 sector names, 30+ subsector names, classification category labels, reason texts, and supply chain hint
- `src/messages/en.json` - Added complete English translations matching German structure

## Decisions Made

**1. i18n keys for all sector/subsector names**
- Rationale: Sector data is read-only reference data. Using translation keys enables language switching without data duplication.

**2. Export THRESHOLDS as const**
- Rationale: Transparency for audits and easy unit testing. Legal compliance requires verifiable thresholds.

**3. Pure classification function**
- Rationale: No side effects, easy to test, deterministic output. Critical for legal correctness.

**4. Legal references in code comments and return values**
- Rationale: Traceability to legal basis (§28 BSIG). Future auditors can verify implementation against law.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript compilation successful. JSON validation passed. All sector and classification data structured correctly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Plan 02-02 (Gap Analysis Questions):**
- Domain types available for Question and Category interfaces
- Classification logic ready to determine which questions apply to which entity categories

**Ready for Plan 02-03 (Scoring Engine):**
- Answer and Score types defined
- MaturityLevel and TrafficLight types ready

**Ready for Phase 3 (Affected Check UI):**
- Sector catalog ready for dropdown/selection UI
- Classification function ready to determine NIS2 applicability
- i18n translations ready for German and English user interfaces

**No blockers.**

---
*Phase: 02-nis2-content-scoring-engine*
*Completed: 2026-02-06*
