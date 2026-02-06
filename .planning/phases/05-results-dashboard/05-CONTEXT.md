# Phase 5: Results Dashboard - Context

**Gathered:** 2026-02-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Users see a comprehensive, visually clear overview of their NIS2 readiness with actionable recommendations prioritized by urgency. The dashboard displays all 10 category scores as traffic-light cards, an overall Reifegrad score, and prioritized recommendations with legal and BSI references. PDF report generation is Phase 6. Sharing/export features are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Dashboard Layout
- Overall Reifegrad score displayed prominently at the top (hero section) — big picture first
- Each category card shows: category name, traffic light indicator, percentage score, 1-line verdict, and the #1 priority recommendation
- Disclaimer banner appears at the top of the page, before any scores — prominent, can't be missed
- "Retake assessment" button to redo gap analysis + disabled/teaser "PDF herunterladen" button (becomes active in Phase 6)

### Recommendations
- All 10 categories get recommendations, including Gruen categories (maintenance/continuous improvement tips)
- Each recommendation includes: concrete action step + NIS2/BSIG legal reference (inline) + BSI IT-Grundschutz building block reference with external link to BSI website
- Effort level tags per recommendation: "Schnell umsetzbar", "Mittelfristig", "Strategisch" — helps KMUs prioritize
- Dedicated "Quick Wins" section highlighting 3-5 highest-impact, lowest-effort actions across all categories

### Results Page Access
- Results page requires completed assessment data — redirect to gap analysis wizard if data is incomplete
- No sharing mechanism — results are private, local-only (consistent with no-data-collection approach)

### Claude's Discretion
- Card layout arrangement (grid vs list, column count, responsive behavior)
- Card sort order (by severity vs article order)
- Whether to include a traffic light count summary bar between overall score and cards
- Whether to show company context (sector, classification) from affected check
- Card interaction model (expandable in-place vs all-visible)
- Overall score visualization style (circular gauge vs number + bar)
- Traffic light color thresholds (score ranges for Rot/Gelb/Gruen)
- Per-category score bar coloring (traffic light colored vs neutral)
- Whether overall Reifegrad includes qualitative text label
- Score loading animations
- Whether to show user's answers per category for transparency
- Handling of incomplete assessment states
- Page section navigation (scroll vs sticky nav)
- Transition from gap analysis wizard to results (auto-redirect vs completion screen)

</decisions>

<specifics>
## Specific Ideas

- Disclaimer text uses conditional language: "Ihre Angaben deuten darauf hin..." — a high Reifegrad does not automatically mean NIS2 conformity
- Overall score labeled as "Reifegrad" explicitly, not "Compliance Score"
- BSI IT-Grundschutz building block references should be clickable links to the BSI Kompendium
- Legal references shown inline (not as tooltips) — full transparency for the KMU target audience
- Quick Wins section gives KMUs an immediate, actionable starting point

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-results-dashboard*
*Context gathered: 2026-02-06*
