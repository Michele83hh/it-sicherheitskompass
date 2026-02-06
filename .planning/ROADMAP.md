# Roadmap: NIS2 Readiness Check

## Overview

This roadmap delivers a professional NIS2 readiness check web tool in 7 phases over 10 days. The build order follows the architecture's natural dependency chain: foundation and design system first, then the NIS2 content and scoring engine (the brain), followed by the three user-facing steps (Betroffenheitspruefung, Gap Analysis, Results Dashboard), then PDF report generation, and finally polish with legal pages and deployment. The critical path runs through Foundation -> Content/Engine -> Gap Analysis Wizard (bottleneck at days 4-7).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project setup, design system, state management, i18n infrastructure
- [x] **Phase 2: NIS2 Content + Scoring Engine** - Questions, categories, legal references, pure scoring functions
- [x] **Phase 3: Affected Check** - Step 1 UI: sector selection, size classification, result display
- [x] **Phase 4: Gap Analysis Wizard** - Step 2 UI: multi-step form across 10 NIS2 categories
- [ ] **Phase 5: Results Dashboard** - Step 3 UI: scores, traffic lights, recommendations
- [ ] **Phase 6: PDF Report** - Serverless PDF generation with full results and legal references
- [ ] **Phase 7: Polish + Legal + Deploy** - Responsive fixes, legal pages, disclaimers, production deployment

## Phase Details

### Phase 1: Foundation
**Goal**: A working Next.js application with professional design system, i18n infrastructure, and state management -- ready to receive NIS2 content and UI features
**Depends on**: Nothing (first phase)
**Requirements**: TECH-01, TECH-05, UX-01, UX-02, UX-05, I18N-01, I18N-02, I18N-03
**Success Criteria** (what must be TRUE):
  1. Running Next.js 16 application with TypeScript, Tailwind CSS, and shadcn/ui renders a styled landing page at localhost
  2. Language switcher toggles between German and English with all visible text translating correctly
  3. Design system is visibly professional (consistent colors, typography, spacing) -- not a default template or student project
  4. Favicon shows "NIS2 Readiness Check" branding, page title is set, no framework defaults visible
  5. No cookies, no analytics scripts, no auth -- browser DevTools confirms zero tracking
**Plans**: 2 plans

Plans:
- [x] 01-01: Project scaffolding (Next.js 16, TypeScript, Tailwind, shadcn/ui, next-intl, zustand)
- [x] 01-02: Design system and layout (color tokens, typography, navigation shell, language switcher, favicon)

### Phase 2: NIS2 Content + Scoring Engine
**Goal**: All NIS2 domain knowledge exists as structured TypeScript data with a pure, testable scoring engine -- the brain of the tool, independent of any UI
**Depends on**: Phase 1
**Requirements**: TECH-03, TECH-04, LEGAL-07, GAP-01, GAP-02, GAP-03, GAP-04, GAP-05, GAP-06, SCORE-01, SCORE-05, SCORE-07
**Success Criteria** (what must be TRUE):
  1. All 18 NIS2 sectors (11 Anlage 1 + 7 Anlage 2 BSIG) exist as structured data with correct classification rules
  2. All 10 Art. 21(2) categories exist with 3-4 questions each (30-40 total), each referencing specific EU article and BSIG paragraph
  3. Questions are written in KMU-management-level German (not IT jargon), with tooltip explanations for technical terms
  4. Pure scoring functions calculate per-category percentage and traffic light (Rot/Gelb/Gruen) from answer arrays -- verified by unit tests
  5. Prioritized recommendations exist for each category with concrete first steps, legal references, and BSI IT-Grundschutz building block references
**Plans**: 3 plans

Plans:
- [ ] 02-01: NIS2 sector data and classification logic (18 sectors, size thresholds, special cases, legal references)
- [ ] 02-02: Gap analysis question catalog (10 categories, 30-40 questions, maturity scale, tooltips, legal references, recommendations)
- [ ] 02-03: Scoring engine (pure functions, per-category scores, traffic lights, overall readiness score, methodology transparency)

### Phase 3: Affected Check (Step 1)
**Goal**: Users can determine whether their company is affected by NIS2 through an interactive sector/size check with a clear, legally referenced result
**Depends on**: Phase 2 (needs sector data and classification logic)
**Requirements**: AFFECT-01, AFFECT-02, AFFECT-03, AFFECT-04, AFFECT-05, AFFECT-06
**Success Criteria** (what must be TRUE):
  1. User can select their sector from all 18 NIS2 sectors and enter employee count and annual revenue
  2. System classifies the company as "besonders wichtige Einrichtung", "wichtige Einrichtung", or "nicht betroffen" -- matching the logic of par. 28 BSIG
  3. Special cases (DNS, TLD, qTSP, Telko) are automatically classified as "besonders wichtig" regardless of size
  4. Result page shows the classification with a human-readable explanation and specific legal reference (par. 28 Abs. 1 or 2 BSIG)
  5. "Nicht betroffen" result includes a supply chain hint: partners/customers may still impose NIS2 requirements via Art. 21(2)(d)
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md -- Dependencies, wizard store, shared components, i18n translations
- [x] 03-02-PLAN.md -- 3-step wizard UI (sector selection, company size, classification result)

### Phase 4: Gap Analysis Wizard (Step 2)
**Goal**: Users can walk through all 10 NIS2 measure categories answering 3-4 questions each, navigating freely between categories without losing answers
**Depends on**: Phase 2 (needs question catalog), Phase 3 (user flow: affected check leads to gap analysis)
**Requirements**: GAP-07, GAP-08
**Success Criteria** (what must be TRUE):
  1. User progresses through 10 category steps, answering 3-4 questions per category using the 4-level maturity scale
  2. Progress indicator shows current category name, number (e.g., "Bereich 3 von 10"), and overall completion percentage
  3. User can navigate backward and forward between categories without any answers being lost
**Plans**: 1 plan

Plans:
- [x] 04-01-PLAN.md -- Gap analysis wizard UI (store, progress indicator, category step, answer persistence)

### Phase 5: Results Dashboard (Step 3)
**Goal**: Users see a comprehensive, visually clear overview of their NIS2 readiness with actionable recommendations prioritized by urgency
**Depends on**: Phase 2 (needs scoring engine), Phase 4 (needs completed answers)
**Requirements**: SCORE-02, SCORE-03, SCORE-04, SCORE-06
**Success Criteria** (what must be TRUE):
  1. All 10 categories display as traffic-light cards (Rot/Gelb/Gruen) with percentage score bars
  2. Overall Readiness Score is shown as orientation value with explicit label "Reifegrad" (not "Compliance Score")
  3. Recommendations are sorted by priority (Rot categories first) with concrete next steps per category
  4. Visible disclaimer states: a high score does not automatically mean NIS2 conformity -- every measure must be adequately implemented
**Plans**: 2 plans

Plans:
- [ ] 05-01-PLAN.md -- Dependencies, translations, data prep (shadcn Badge+Progress, effortLevel on recommendations, DE/EN i18n)
- [ ] 05-02-PLAN.md -- Results dashboard UI (category cards, traffic lights, score bars, overall Reifegrad, quick wins, recommendations, disclaimer)

### Phase 6: PDF Report
**Goal**: Users can download a professional, complete PDF report of their assessment results in their chosen language
**Depends on**: Phase 5 (needs results display logic), Phase 2 (needs content data)
**Requirements**: PDF-01, PDF-02, PDF-03, PDF-04, PDF-05, PDF-06, I18N-04, I18N-05
**Success Criteria** (what must be TRUE):
  1. User clicks download and receives a professionally formatted PDF within 10 seconds
  2. PDF contains: company profile (sector, size, classification), all 10 category scores with traffic lights, recommendations, and legal references
  3. PDF has legal disclaimer on the first page, plus Rechtsstand-Datum and Erstellungsdatum
  4. German Umlaute render correctly in the PDF
  5. PDF generates in the user's selected language (German or English), with legal references always in German original
**Plans**: 2 plans

Plans:
- [ ] 06-01: PDF template and serverless generation (react-pdf layout, font registration, Umlaut support, Vercel Route Handler)
- [ ] 06-02: PDF content integration (company profile, scores, recommendations, disclaimers, legal refs, i18n)

### Phase 7: Polish + Legal + Deploy
**Goal**: The tool is production-ready: responsive on all devices, legally compliant with German Telemedienrecht, free of development artifacts, and deployed on Vercel
**Depends on**: All previous phases
**Requirements**: UX-03, UX-04, UX-06, LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, LEGAL-05, LEGAL-06, TECH-02
**Success Criteria** (what must be TRUE):
  1. Tool works correctly on desktop, tablet, and mobile (tested at 375px width) with no layout breakage
  2. Disclaimers appear before assessment start, on results page, and in PDF -- using conditional language ("Ihre Angaben deuten darauf hin...")
  3. Impressum page exists with legally required information; Datenschutzhinweis confirms no personal data is collected
  4. Rechtsstand-Datum is visible in footer and PDF
  5. Production build deploys to Vercel with zero console.log statements, no placeholder texts, and no framework default branding
**Plans**: 2 plans

Plans:
- [ ] 07-01: Legal pages and disclaimers (Impressum, Datenschutz, pre-assessment disclaimer, results disclaimer, conditional language)
- [ ] 07-02: Responsive polish and animations (mobile/tablet testing, step transitions, production cleanup, Vercel deployment)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-02-06 |
| 2. NIS2 Content + Scoring Engine | 3/3 | Complete | 2026-02-06 |
| 3. Affected Check | 2/2 | Complete | 2026-02-06 |
| 4. Gap Analysis Wizard | 1/1 | Complete | 2026-02-06 |
| 5. Results Dashboard | 0/2 | Not started | - |
| 6. PDF Report | 0/2 | Not started | - |
| 7. Polish + Legal + Deploy | 0/2 | Not started | - |

---
*Roadmap created: 2026-02-06*
*Last updated: 2026-02-06 (Phase 5 planned)*
