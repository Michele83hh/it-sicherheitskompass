# Project State: NIS2 Readiness Check

**Last Updated:** 2026-02-08T18:00:00Z

---

## Current Position

**Phase:** 7 of 7 (07-polish-legal-deploy)
**Plan:** 1 of 3 in phase (GSD-tracked), but significant extra work done outside GSD
**Status:** In progress
**Last activity:** 2026-02-08 - PROJEKTDOKUMENTATION.md erstellt

**Progress:** GSD-tracked 33% of Phase 7, but real progress ~90% overall

```
Phase 1: █████████████████████ 100% (2/2) ✅
Phase 2: █████████████████████ 100% (3/3) ✅
Phase 3: █████████████████████ 100% (2/2) ✅
Phase 4: █████████████████████ 100% (1/1) ✅
Phase 5: █████████████████████ 100% (2/2) ✅
Phase 6: █████████████████████ 100% (2/2) ✅
Phase 7: ███████░░░░░░░░░░░░░░  33% (GSD) — real: ~80% (extra work outside GSD)
```

### Work done outside GSD tracking (2026-02-07 + 2026-02-08):
- Schnellcheck + Landing Page Redesign
- PDF-Überarbeitung (3 Teile: Section-per-Page, Section-Selector, 14 Sector Guidance)
- UX-Optimierung (9 Features in 3 Wellen)
- Design-Überarbeitung (5 Seiten: Intro-Pages, Statistiken, FAQs, Trust-Signale)
- Gestaffelte Gap-Analyse (Core 30 + Advanced 20)
- Hilfe-Texte und Tooltips
- PROJEKTDOKUMENTATION.md (transparente Entwicklungsdokumentation)

---

## Core Value Statement

> KMU können in 15-20 Minuten herausfinden, ob sie von NIS2 betroffen sind und wo ihre größten Compliance-Lücken liegen.

---

## Technology Stack

**Framework:** Next.js 16 (App Router + Pages Router, Turbopack)
**Language:** TypeScript
**Styling:** Tailwind CSS v4
**UI Components:** shadcn/ui
**Internationalization:** next-intl (DE/EN)
**State Management:** zustand (with persist middleware)
**Testing:** vitest ^4.0.18
**PDF Generation:** @react-pdf/renderer v4.x + @ag-media/react-pdf-table
**Form Management:** react-hook-form ^7.71.1 + zod ^4.3.6 + react-number-format ^5.4.4

---

## Phases Overview

| Phase | Name                          | Status          | Plans      |
|-------|-------------------------------|-----------------|------------|
| 1     | Foundation                    | ✅ Complete      | 2/2 (100%) |
| 2     | NIS2 Content + Scoring Engine | ✅ Complete      | 3/3 (100%) |
| 3     | Affected Check                | ✅ Complete      | 2/2 (100%) |
| 4     | Gap Analysis Wizard           | ✅ Complete      | 1/1 (100%) |
| 5     | Results Dashboard             | ✅ Complete      | 2/2 (100%) |
| 6     | PDF Report                    | ✅ Complete      | 2/2 (100%) |
| 7     | Polish + Legal + Deploy       | 🔄 In progress   | 1/3 (33%)  |

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
| 05 | 01 | shadcn CLI for components | Standard components ensure consistency |
| 05 | 01 | 11 recommendations as "quick" | Based on 1-day implementation time |
| 05 | 01 | Effort-based categorization | Enables quick wins UI section |
| 05 | 02 | Calculate scores in page with useMemo | Single source of truth, avoid recalculation in children |
| 05 | 02 | Sort categories by traffic light order | Red areas need attention first |
| 05 | 02 | Quick wins: red+quick → yellow+quick | Ensures 3-5 actionable items |
| 05 | 02 | Progress bar color via className override | Override shadcn default for traffic light colors |
| 05 | 02 | Traffic light: icon + color + text | WCAG 2.1 Level AA (not relying on color alone) |
| 05 | 02 | BSI links to specific building blocks | Verified per-block URLs in bsi-links.ts, fallback to overview |
| 05 | 02 | Route guard client-side only | Avoid SSR/client mismatch |
| 06 | 01 | woff2 fonts from Google Fonts CDN | GitHub TTF download failed, woff2 works with @react-pdf/renderer |
| 06 | 01 | Pages Router API for PDF generation | Avoids React 19 + App Router "ba.Component is not a constructor" error |
| 06 | 01 | Side-effect font import pattern | Font.register() must run before renderToBuffer |
| 06 | 01 | Client flattens translations for PDF | API can't use useTranslations hook |
| 06 | 02 | Store classificationResult in wizard store | Ensures PDF matches user-viewed result |
| 06 | 02 | Legal references always in German | Maintains legal precision, even in English PDFs |
| 06 | 02 | wrap=false on recommendation cards | Keeps recommendations visually together across page breaks |
| 06 | 02 | Fixed-width score bars (80px) | Consistent visual alignment across categories |
| 06 | 02 | Priority-based border colors | Visual hierarchy for quick scanning (red/yellow/green) |
| 07 | 01 | Rechtsstand format "Februar 2026" | Shorter than "Stand der Rechtslage: Januar 2025" |
| 07 | 01 | Pre-assessment disclaimer on steps 0-1 only | Not shown on result step to avoid repetition |
| 07 | 01 | Placeholder brackets [Name] in Impressum | Easy pre-deployment replacement with blue notice |
| 07 | 01 | removeConsole excludes error/warn | Preserves production debugging capability |

---

## Blockers & Concerns

| ID | Type | Description | Status | Mitigation |
|----|------|-------------|--------|------------|
| C1 | Technical | Zod 4 breaking changes | ✅ Resolved | Zod v4.3.6 works with @hookform/resolvers v5.2.2 |
| C2 | Technical | @react-pdf/renderer compatibility | ✅ Resolved | Pages Router API avoids React 19 Route Handler issue |

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

**Last session:** 2026-02-08
**Stopped at:** PROJEKTDOKUMENTATION.md fertiggestellt, Stand gespeichert
**Resume file:** None

**What's open:**
1. **07-02-PLAN.md** (Responsive Polish + Animations) — geplant, nie ausgeführt. Teile davon (Responsive, Animations) wurden bereits im großen Commit a0ee3ef erledigt. Plan ggf. updaten oder als erledigt markieren.
2. **07-03-PLAN.md** (Deployment Config) — existiert noch nicht, muss erstellt werden wenn Vercel-Deployment ansteht.
3. **Firmenprofil + 30 Handlungsempfehlungen-Vorlagen (PDF)** — konzeptionell besprochen (siehe MEMORY.md), kein Plan-File erstellt. User wollte: Firmenprofil (alle Felder optional), PDF-Vorlagen für alle 30 Empfehlungen, neutral vs. firmenspezifischer Toggle.
4. **2 Pending Todos:** Identity-Section (Wer steckt dahinter?) + Target-Audience-Section (Für wen?) auf Landing Page.
5. **PROJEKTDOKUMENTATION.md** — fertig, `[Name]` und `[URL]` müssen noch ersetzt werden.

**Empfehlung für nächste Session:**
- Wenn Deadline-Fokus (16.02.2026): 07-02 prüfen/abschließen, Vercel deployen
- Wenn Feature-Fokus: Firmenprofil + Handlungsempfehlungen umsetzen
- Wenn Polish-Fokus: Die 2 Landing-Page-Todos + Identity abarbeiten

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

**Results Dashboard (Phase 5):**
- `src/app/[locale]/results/page.tsx` - Results page container with hydration guard
- `src/app/[locale]/results/components/disclaimer-banner.tsx` - WCAG warning banner
- `src/app/[locale]/results/components/overall-score-hero.tsx` - Reifegrad hero section
- `src/app/[locale]/results/components/category-card.tsx` - Traffic-light category cards
- `src/app/[locale]/results/components/quick-wins-section.tsx` - Quick wins showcase
- `src/app/[locale]/results/components/recommendations-section.tsx` - Full recommendations
- `src/app/[locale]/results/components/download-pdf-button.tsx` - PDF download button (06-01)
- `src/lib/nis2/bsi-links.ts` - BSI building block URL mapping (verified Edition 2023)
- `src/components/ui/badge.tsx` - shadcn Badge component (effort levels)
- `src/components/ui/progress.tsx` - shadcn Progress component (score bars)
- `src/messages/de.json` - Added results section (05-01)
- `src/messages/en.json` - Added results section (05-01)

**PDF Report Infrastructure (Phase 6):**
- `src/lib/pdf/fonts.ts` - Inter font registration (woff2), hyphenation disabled
- `src/lib/pdf/types.ts` - PDFPayload, PDFCompanyProfile, PDFCategoryResult, PDFRecommendation
- `src/lib/pdf/styles.ts` - Shared StyleSheet with COLORS and traffic light styles
- `src/pages/api/pdf/download.tsx` - Pages Router API POST endpoint for PDF generation
- `src/components/pdf/PDFDocument.tsx` - Root PDF Document with 3-page skeleton
- `public/fonts/Inter-Regular.woff2` - Inter Regular font (21KB)
- `public/fonts/Inter-Bold.woff2` - Inter Bold font (22KB)

**NIS2 Domain Model (3.523 Zeilen):**
- `src/lib/nis2/types.ts` - All NIS2 domain types + EffortLevel
- `src/lib/nis2/sectors.ts` - 18-sector catalog (143 lines)
- `src/lib/nis2/classification.ts` - §28 BSIG classification logic (89 lines)
- `src/lib/nis2/categories.ts` - 10 Art. 21(2) categories
- `src/lib/nis2/questions.ts` - 50 gap analysis questions, 30 core + 20 advanced (987 lines)
- `src/lib/nis2/recommendations.ts` - 30 BSI recommendations (369 lines)
- `src/lib/nis2/cost-estimation.ts` - Kostenschätzung nach Unternehmensgröße (369 lines)
- `src/lib/nis2/sector-guidance.ts` - Branchenspezifische Hinweise, 14 Sektoren (241 lines)
- `src/lib/nis2/roadmap.ts` - 3-Phasen-Implementierungsplan (163 lines)
- `src/lib/nis2/dsgvo-overlap.ts` - DSGVO-NIS2-Überlappung (148 lines)
- `src/lib/nis2/bussgeld.ts` - Bußgeldberechnung §65 BSIG (122 lines)
- `src/lib/nis2/quick-check.ts` - 5-Fragen-Schnellcheck (142 lines)
- `src/lib/nis2/kritis.ts` - KRITIS-Spezialbereich (133 lines)
- `src/lib/nis2/meldepflichten.ts` - Meldepflichten (115 lines)
- `src/lib/nis2/iso27001.ts` - ISO 27001 Crosswalk (108 lines)
- `src/lib/nis2/evidence.ts` - Nachweisführung (109 lines)
- `src/lib/nis2/din-spec.ts` - DIN SPEC 27076 Referenz (98 lines)
- `src/lib/nis2/registrierung.ts` - BSI-Registrierungspflicht (94 lines)
- `src/lib/nis2/geschaeftsleitung.ts` - Geschäftsleitungshaftung (93 lines)

**Dokumentation:**
- `PROJEKTDOKUMENTATION.md` - Transparente Entwicklungsdokumentation (KI-Führung, nicht selbst gecodet)

**Scoring Engine:**
- `src/lib/scoring/engine.ts` - 5 pure scoring functions
- `src/lib/scoring/engine.test.ts` - 39 unit tests

---

*This file tracks execution state across sessions. Updated automatically by GSD agents.*
