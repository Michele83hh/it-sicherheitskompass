---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [design-system, i18n, layout, landing-page, tailwind, next-intl]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js 16 project with i18n and base configuration
provides:
  - Professional design system with custom color palette (blue primary, slate neutrals)
  - Layout shell with Header (language switcher) and Footer (legal disclaimer)
  - Branded favicon and visual identity (NIS2 shield icon)
  - Polished landing page with hero, value propositions, how-it-works, trust signals
  - Design tokens via CSS custom properties
  - Inter font family for professional typography
affects: [02-wizard-engine, 03-questions, 04-scoring, 05-report-generation]

# Tech tracking
tech-stack:
  added: [Inter font via next/font/google, lucide-react icons]
  patterns: [Design tokens as CSS custom properties, Layout shell pattern (Header + main + Footer), Language switching via next-intl createNavigation]

key-files:
  created:
    - src/components/layout/header.tsx
    - src/components/layout/footer.tsx
    - src/components/layout/language-switcher.tsx
    - src/lib/i18n/navigation.ts
    - public/favicon.svg
  modified:
    - src/app/globals.css
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/messages/de.json
    - src/messages/en.json

key-decisions:
  - "Blue-based primary color palette for trust and compliance"
  - "Inter font for professional German character support"
  - "Design tokens via CSS custom properties for maintainability"
  - "Traffic light colors defined as CSS vars for future scoring UI"

patterns-established:
  - "Design tokens: CSS custom properties in :root for colors, reusable across components"
  - "Layout shell: Header + main + Footer structure in root layout"
  - "Language switching: createNavigation from next-intl routing config for type-safe navigation"
  - "Component organization: layout/ directory for shell components"

# Metrics
duration: 2min
completed: 2026-02-06
---

# Phase 1 Plan 2: Design System & Landing Page Summary

**Professional blue-palette design system with Inter typography, layout shell (Header with language switcher, Footer with disclaimer), NIS2-branded favicon, and polished landing page featuring hero section, value propositions, how-it-works steps, and trust signals**

## Performance

- **Duration:** 2 minutes
- **Started:** 2026-02-06T12:55:52+01:00
- **Completed:** 2026-02-06T12:57:31+01:00
- **Tasks:** 3 (2 auto + 1 checkpoint approved)
- **Files modified:** 13 (5 created, 8 modified)

## Accomplishments
- Professional design system established with blue primary color (#1e40af) conveying trust and compliance seriousness
- Complete layout shell with Header (app name + language switcher) and Footer (legal disclaimer + copyright)
- Landing page transformed from template to consulting tool: hero section, 3 value proposition cards, 3-step how-it-works, BSI/NIS2 trust signals
- Language switcher working end-to-end: DE/EN toggle with client-side navigation, all text internationalized
- NIS2-branded favicon (shield with "N2") visible in browser tab
- Inter font family providing professional German character support

## Task Commits

Each task was committed atomically:

1. **Task 1: Design tokens, layout components, and favicon** - `c6231cf` (feat)
   - Defined color palette in globals.css: primary blue, secondary teal, slate neutrals, traffic light colors
   - Created Header component with app name (Shield icon + title) and LanguageSwitcher
   - Created Footer component with disclaimer, legal date placeholder, copyright
   - Created LanguageSwitcher using next-intl createNavigation for type-safe locale switching
   - Created navigation.ts exporting useRouter, usePathname from next-intl routing config
   - Generated NIS2 shield favicon (SVG + ICO)
   - Added footer translation keys (DE/EN) for disclaimer, legal date, copyright

2. **Task 2: Wire layout shell and polish landing page** - `15a5933` (feat)
   - Integrated Inter font from next/font/google in layout
   - Wired Header and Footer into root layout with flex column min-h-screen structure
   - Rebuilt landing page with professional sections: hero (title + subtitle + CTA), value props (3 cards with icons), how-it-works (3 numbered steps), trust signals (NIS2UmsG, EU directive, BSI references)
   - Added landing page translation keys for hero, steps, trust signals (DE/EN)
   - Applied professional styling: max-w-6xl container, generous vertical padding, large headings, hover effects

3. **Task 3: Human verification checkpoint** - User approved design with "ja"
   - User confirmed design looks professional and ready for Bewerbung
   - All visible text switches correctly between DE/EN
   - Favicon and page title correctly branded
   - No template defaults visible

## Files Created/Modified

### Created (5 files)
- `src/components/layout/header.tsx` - Navigation header with app name (Shield icon) and language switcher, sticky top bar with white background
- `src/components/layout/footer.tsx` - Compact footer with disclaimer, legal date placeholder, copyright (using i18n keys)
- `src/components/layout/language-switcher.tsx` - DE/EN toggle buttons, active locale highlighted with primary color, uses next-intl navigation
- `src/lib/i18n/navigation.ts` - Type-safe navigation exports from createNavigation(routing) for locale switching
- `public/favicon.svg` - NIS2 shield icon with "N2" text in primary blue

### Modified (8 files)
- `src/app/globals.css` - Added design tokens (--primary, --secondary, --background, --traffic-red/yellow/green, --muted), Inter font, updated shadcn color variables
- `src/app/[locale]/layout.tsx` - Integrated Inter font, added Header/Footer to body structure, flex column layout for sticky footer
- `src/app/[locale]/page.tsx` - Transformed into professional landing page with hero, 3 value prop cards (Anonym/Fundiert/Empfehlungen), 3 how-it-works steps, trust signals
- `src/messages/de.json` - Added footer keys (disclaimer, legalDate, copyright), landing keys (hero, steps, trust)
- `src/messages/en.json` - Added matching English translations for footer and landing sections

## Decisions Made

1. **Blue-based color palette**: Selected deep blue (#1e40af / hsl(222, 70%, 40%)) as primary color to convey trust, authority, and compliance seriousness. Paired with teal accent and slate neutrals for professional consulting tool aesthetic.

2. **Inter font family**: Chose Inter from next/font/google for excellent German character support, clean professional appearance, and optimized web performance.

3. **Traffic light colors as CSS variables**: Defined --traffic-red, --traffic-yellow, --traffic-green as CSS custom properties in globals.css for consistent use across future scoring UI components (Phase 4-5).

4. **Layout shell structure**: Established Header + main + Footer pattern in root layout with flex column and min-h-screen to ensure footer stays at bottom, creating professional full-page structure.

5. **Design approved at checkpoint**: User confirmed design meets "consulting tool, not student project" bar and is suitable for Bewerbungsprojekt presentation.

## Deviations from Plan

None - plan executed exactly as written. Both auto tasks completed successfully without requiring deviation rules, and user approved design at human-verify checkpoint.

## Issues Encountered

None - all tasks executed as planned without technical issues or blockers.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Phase 2 (Wizard Engine):**
- Professional design foundation established and approved
- Layout shell ready to wrap wizard pages
- Design tokens available for wizard UI components
- Language switcher working for bilingual wizard flow
- Landing page provides entry point with "Kostenlos prüfen" CTA button
- Inter font and color palette consistent across all future pages

**Design assets ready for wizard:**
- ✅ Color palette defined (primary, secondary, muted, destructive, traffic lights)
- ✅ Typography scale with Inter font
- ✅ Layout components (Header with language switcher, Footer)
- ✅ shadcn/ui components styled with custom theme
- ✅ lucide-react icons available (Shield, Lock, BookOpen, CheckCircle, ClipboardList)

**User verification complete:**
- ✅ Professional design confirmed by user
- ✅ Language switching works correctly between DE/EN
- ✅ Favicon and page title correctly branded
- ✅ All text internationalized (zero hardcoded strings)
- ✅ No framework defaults visible
- ✅ No cookies, analytics, or tracking

**No blockers.** Foundation phase complete. Ready to build wizard engine on this professional base.

---
*Phase: 01-foundation*
*Completed: 2026-02-06*
