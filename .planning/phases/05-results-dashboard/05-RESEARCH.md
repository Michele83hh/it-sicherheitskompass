# Phase 5: Results Dashboard - Research

**Researched:** 2026-02-06
**Domain:** React dashboard UI with scoring visualization and actionable recommendations
**Confidence:** HIGH

## Summary

This phase builds a results dashboard displaying NIS2 readiness scores with traffic-light indicators, category cards, and prioritized recommendations. The research focused on React dashboard patterns, accessibility-compliant status visualization, and best practices for actionable UI design.

The standard approach uses shadcn/ui components (Card, Progress, Badge) with Tailwind CSS grid layouts for responsive card arrangements. Traffic-light indicators must combine color with text/icons for WCAG 2.2 compliance. Zustand persist requires hydration guards to prevent Next.js server-client mismatches. Dashboard UX patterns prioritize warnings and actionable items at the top, with recommendations sorted by urgency.

The existing codebase already implements the scoring engine (Phase 2) with traffic-light thresholds, persisted answers (Phase 4), and the isClient hydration pattern used in gap-analysis page. This phase assembles those pieces into a comprehensive results view.

**Primary recommendation:** Build the results page as a client component using existing shadcn/ui Card + Progress primitives, implement the isClient hydration guard for zustand, and ensure traffic-light colors include text labels for accessibility.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router framework | Already in use, provides routing and SSR |
| React | 19.2.3 | UI library | Latest stable, already in use |
| Tailwind CSS | v4 | Utility-first styling | Already in use, v4 is current |
| shadcn/ui | 3.8.4 | Component primitives | Already installed, provides Card, Badge, Progress |
| zustand | 5.0.11 | State management | Already in use for gap-analysis persistence |
| next-intl | 4.8.2 | i18n | Already in use for translations |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| class-variance-authority | 0.7.1 | Variant management | Already in use for button/component variants |
| lucide-react | 0.563.0 | Icon library | Already in use, provides traffic-light icons |
| radix-ui | 1.4.3 | Headless UI primitives | Already in use, underpins shadcn/ui components |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind Grid | CSS Grid directly | Tailwind provides responsive utilities out-of-box, no need for custom CSS |
| Linear Progress Bar | Circular Gauge (react-circular-progressbar) | Circular adds complexity; user decisions favor simple bar visualization |
| Client-side only | SSR with rehydration | Client-side simpler for score calculation with localStorage persistence |

**Installation:**
All dependencies already installed. No additional packages required.

```bash
# If Badge component not installed:
npx shadcn@latest add badge

# If Progress component not installed:
npx shadcn@latest add progress
```

## Architecture Patterns

### Recommended Project Structure
```
src/app/[locale]/results/
├── page.tsx                    # Main results page (client component)
├── components/
│   ├── overall-score-hero.tsx  # Hero section with Reifegrad score
│   ├── disclaimer-banner.tsx   # Prominent warning banner
│   ├── category-card.tsx       # Individual traffic-light category card
│   ├── category-grid.tsx       # Responsive grid layout for cards
│   ├── quick-wins-section.tsx  # Highlighted quick-win recommendations
│   └── recommendations-list.tsx # Full recommendations per category
```

### Pattern 1: Client Component with Hydration Guard
**What:** Prevent Next.js hydration errors when reading from zustand persist (localStorage)
**When to use:** Any page consuming zustand store with persist middleware
**Example:**
```typescript
// Source: Existing gap-analysis page pattern
'use client';

import { useEffect, useState } from 'react';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';

export default function ResultsPage() {
  const [isClient, setIsClient] = useState(false);
  const answers = useGapAnalysisStore((state) => state.answers);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Server skeleton with same structure to minimize layout shift
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  // Client-side rendering with hydrated store
  return <div>/* Render results */</div>;
}
```

### Pattern 2: Responsive Card Grid with Tailwind
**What:** Mobile-first responsive grid that adapts columns based on viewport
**When to use:** Dashboard card layouts with multiple status cards
**Example:**
```tsx
// Source: Tailwind CSS best practices 2026
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {categories.map((cat) => (
    <CategoryCard key={cat.id} category={cat} />
  ))}
</div>
```

### Pattern 3: Traffic Light with WCAG Compliance
**What:** Color-coded status that includes text label for accessibility
**When to use:** Any color-based status indicator (required for WCAG 2.2 Level AA)
**Example:**
```tsx
// Source: WCAG 2.2 guidance - color alone cannot convey information
function TrafficLightIndicator({ status }: { status: TrafficLight }) {
  const config = {
    red: { color: 'bg-red-500', icon: AlertCircle, label: 'Handlungsbedarf' },
    yellow: { color: 'bg-yellow-500', icon: AlertTriangle, label: 'Verbesserung nötig' },
    green: { color: 'bg-green-500', icon: CheckCircle, label: 'Gut umgesetzt' }
  };

  const { color, icon: Icon, label } = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`size-4 rounded-full ${color}`} />
      <Icon className="size-5" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
```

### Pattern 4: Prioritized Recommendations Sorting
**What:** Sort recommendations by traffic-light severity, then by priority within category
**When to use:** Displaying actionable items where urgency matters
**Example:**
```typescript
// Source: Dashboard UX best practices - prioritize warnings and actionable items
const sortedCategories = categoryScores.sort((a, b) => {
  const order = { red: 0, yellow: 1, green: 2 };
  return order[a.trafficLight] - order[b.trafficLight];
});
```

### Pattern 5: Score Calculation and Display
**What:** Calculate overall score from zustand answers using existing scoring engine
**When to use:** Results page entry point
**Example:**
```typescript
// Source: Existing scoring engine (src/lib/scoring/engine.ts)
import { calculateOverallScore } from '@/lib/scoring/engine';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getTotalQuestionsByCategory } from '@/lib/nis2/questions';

const answers = useGapAnalysisStore((state) => state.answers);

const categoryQuestionCounts = CATEGORIES.map((cat) => ({
  categoryId: cat.id,
  totalQuestions: getTotalQuestionsByCategory(cat.id)
}));

const overallScore = calculateOverallScore(answers, categoryQuestionCounts);
```

### Anti-Patterns to Avoid
- **Color-only indicators:** WCAG 2.2 requires additional visual cues (icons/text) alongside color
- **Direct zustand access without hydration guard:** Causes Next.js hydration mismatches when reading localStorage on server
- **Inconsistent card padding:** Pick spacing system from Tailwind config and apply uniformly
- **Unsorting recommendations:** Users need most urgent items first (red categories before yellow/green)
- **Missing disclaimer:** User decisions require prominent disclaimer that high score ≠ automatic compliance

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Progress bar visualization | Custom SVG/canvas progress | Radix UI Progress (via shadcn/ui) | Handles accessibility (ARIA), responsive sizing, screen reader announcements |
| Card component | Div soup with custom styles | shadcn/ui Card | Provides consistent spacing, variants, semantic structure |
| Badge/tag styling | Custom span with colors | shadcn/ui Badge | CVA variants for effort levels, consistent typography |
| Responsive grid | Custom media queries | Tailwind grid utilities | Mobile-first breakpoints, gap utilities, proven responsive patterns |
| Traffic-light thresholds | Custom scoring logic | Existing getTrafficLight() | Already tested, documented thresholds (<40% red, 40-69% yellow, ≥70% green) |
| Icon library | Inline SVGs | lucide-react | Already in use, consistent sizing, accessibility props |

**Key insight:** Dashboard UI components (cards, progress, badges) have complex accessibility requirements (ARIA labels, keyboard navigation, screen reader support). shadcn/ui components wrap Radix UI primitives that handle these concerns, eliminating the need for custom implementations.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch with Zustand Persist
**What goes wrong:** Page renders on server with empty answers array, then client hydrates with localStorage data, causing React hydration error: "Text content does not match server-rendered HTML"
**Why it happens:** Next.js SSR renders before localStorage is available; zustand persist rehydrates asynchronously on client
**How to avoid:** Use isClient state pattern (already implemented in gap-analysis page) with skeleton fallback
**Warning signs:** Console errors mentioning "hydration", flickering content on page load

### Pitfall 2: Traffic Light Colors Without Text Labels
**What goes wrong:** Color-blind users cannot distinguish red/yellow/green status; fails WCAG 2.2 Level AA (Success Criterion 1.4.1)
**Why it happens:** Developers rely on color alone to convey information
**How to avoid:** Always pair traffic-light colors with text labels or icons; test with color-blindness simulator
**Warning signs:** Accessibility audit flags "color as only visual means of conveying information"

### Pitfall 3: Incomplete Assessment Handling
**What goes wrong:** User navigates to /results without completing gap-analysis; page crashes or shows incorrect scores
**Why it happens:** No guard checking if answers array is populated
**How to avoid:** Add route guard checking answer count; redirect to /gap-analysis if insufficient data
**Warning signs:** Error "Cannot read property 'categoryId' of undefined", users reporting blank results page

### Pitfall 4: Card Layout Breaks on Mobile
**What goes wrong:** Grid layout uses fixed columns (grid-cols-3), causing cards to overflow or become unreadable on mobile
**Why it happens:** Not using responsive breakpoint prefixes
**How to avoid:** Start with grid-cols-1, add md:grid-cols-2 lg:grid-cols-3 for progressive enhancement
**Warning signs:** Horizontal scrollbar on mobile, cards squished to 1/3 width on phone screens

### Pitfall 5: Recommendations Not Linked to BSI
**What goes wrong:** User decisions specify "BSI IT-Grundschutz building block reference with external link to BSI website", but links point to wrong URL or don't work
**Why it happens:** Incorrect URL format or hardcoded outdated links
**How to avoid:** Use official BSI Kompendium URL pattern: `https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html`
**Warning signs:** 404 errors when clicking BSI links, users unable to access referenced building blocks

### Pitfall 6: Slow Initial Render with Large Answer Sets
**What goes wrong:** Calculating scores for all 30 questions across 10 categories causes visible lag on page load
**Why it happens:** Running calculateOverallScore() in render function without memoization
**How to avoid:** Use useMemo() to cache score calculations; only recalculate when answers change
**Warning signs:** DevTools React Profiler shows long render time, users see flash of unstyled content

## Code Examples

Verified patterns from official sources:

### Overall Score Calculation with Existing Engine
```typescript
// Source: Existing scoring engine (src/lib/scoring/engine.ts)
import { useMemo } from 'react';
import { calculateOverallScore } from '@/lib/scoring/engine';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getQuestionsByCategory } from '@/lib/nis2/questions';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';

function useOverallScore() {
  const answers = useGapAnalysisStore((state) => state.answers);

  const overallScore = useMemo(() => {
    const categoryQuestionCounts = CATEGORIES.map((cat) => ({
      categoryId: cat.id,
      totalQuestions: getQuestionsByCategory(cat.id).length
    }));

    return calculateOverallScore(answers, categoryQuestionCounts);
  }, [answers]);

  return overallScore;
}
```

### Category Card with Traffic Light and Progress Bar
```tsx
// Source: shadcn/ui Card + Radix UI Progress patterns
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import type { CategoryScore } from '@/lib/nis2/types';

interface CategoryCardProps {
  category: CategoryScore;
  categoryName: string;
  verdict: string;
  topRecommendation: string;
}

function CategoryCard({ category, categoryName, verdict, topRecommendation }: CategoryCardProps) {
  const icons = {
    red: AlertCircle,
    yellow: AlertTriangle,
    green: CheckCircle
  };

  const colors = {
    red: 'text-red-600 bg-red-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    green: 'text-green-600 bg-green-50'
  };

  const Icon = icons[category.trafficLight];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{categoryName}</CardTitle>
          <div className={`rounded-full p-2 ${colors[category.trafficLight]}`}>
            <Icon className="size-5" aria-hidden="true" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold">{category.percentage}%</span>
            <span className="text-sm text-muted-foreground">
              {category.answeredQuestions}/{category.totalQuestions} beantwortet
            </span>
          </div>
          <Progress
            value={category.percentage}
            max={100}
            className="h-2"
          />
        </div>

        <p className="text-sm text-muted-foreground">{verdict}</p>

        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
            Priorität #1
          </p>
          <p className="text-sm">{topRecommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Effort Level Badge Component
```tsx
// Source: shadcn/ui Badge component patterns
import { Badge } from '@/components/ui/badge';

type EffortLevel = 'quick' | 'medium' | 'strategic';

interface EffortBadgeProps {
  level: EffortLevel;
  label: string;
}

function EffortBadge({ level, label }: EffortBadgeProps) {
  const variants = {
    quick: 'bg-green-100 text-green-800 hover:bg-green-100',
    medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    strategic: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
  };

  return (
    <Badge className={variants[level]}>
      {label}
    </Badge>
  );
}
```

### BSI Reference Link Component
```tsx
// Source: BSI IT-Grundschutz official URL patterns
import { ExternalLink } from 'lucide-react';

interface BSIReferenceProps {
  buildingBlock: string; // e.g., "ISMS.1", "ORP.4"
}

function BSIReference({ buildingBlock }: BSIReferenceProps) {
  // Official BSI Kompendium URL (Edition 2023)
  const baseUrl = 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html';

  return (
    <a
      href={baseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
    >
      BSI {buildingBlock}
      <ExternalLink className="size-3" aria-hidden="true" />
    </a>
  );
}
```

### Route Guard for Incomplete Assessment
```tsx
// Source: Next.js App Router navigation patterns
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';

function useResultsGuard(minAnswers: number = 1) {
  const router = useRouter();
  const answers = useGapAnalysisStore((state) => state.answers);

  useEffect(() => {
    if (answers.length < minAnswers) {
      router.push('/gap-analysis');
    }
  }, [answers.length, minAnswers, router]);

  return answers.length >= minAnswers;
}
```

### Responsive Dashboard Grid
```tsx
// Source: Tailwind CSS responsive grid patterns
function CategoryGrid({ categories }: { categories: CategoryScore[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <CategoryCard key={cat.categoryId} category={cat} />
      ))}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS Grid with media queries | Tailwind responsive grid utilities | Tailwind v3.0+ (2021) | Utility-first approach eliminates custom CSS, mobile-first by default |
| Custom progress bars with divs | Radix UI Progress primitive | Radix UI stable (2022) | Automatic ARIA labels, screen reader support, keyboard navigation |
| Class concatenation strings | CVA (class-variance-authority) | v0.7.0 (2023) | Type-safe variants, cleaner component APIs |
| Pages Router | Next.js App Router | Next.js 13 (2022), stable in 14 | File-based routing with layouts, React Server Components |
| useState for persisted state | Zustand with persist middleware | Zustand v4+ (2022) | Simpler API than Redux, built-in localStorage sync |
| Custom i18n with context | next-intl with App Router | next-intl v3+ (2023) | Type-safe translations, server/client component support |

**Deprecated/outdated:**
- **Pages Router (_app.tsx, getServerSideProps):** Replaced by App Router with layout.tsx and Server Components
- **Tailwind JIT mode flag:** Now default in Tailwind v3+, no configuration needed
- **React 17 Context patterns:** React 19 introduces improved context with automatic batching
- **Manual localStorage hydration logic:** Zustand persist middleware handles rehydration automatically

## Open Questions

Things that couldn't be fully resolved:

1. **BSI Building Block Deep Linking**
   - What we know: BSI Kompendium is at official URL, Edition 2023 is current version
   - What's unclear: Whether BSI provides anchor links to specific building blocks (e.g., #ISMS.1) or if all links go to main Kompendium page
   - Recommendation: Use main Kompendium URL for all BSI references; test if BSI adds deep linking in future updates

2. **Overall Score Visualization Style**
   - What we know: User decisions marked this as "Claude's discretion" (circular gauge vs number + bar)
   - What's unclear: User preference between minimalist text score vs. more visual gauge
   - Recommendation: Start with simple text score + progress bar for consistency with category cards; gauge can be added if user requests visual enhancement

3. **Traffic Light Threshold Customization**
   - What we know: Current thresholds (<40% red, 40-69% yellow, ≥70% green) are from industry-standard RAG patterns
   - What's unclear: Whether KMU target audience expects different thresholds (e.g., more lenient for smaller orgs)
   - Recommendation: Keep existing thresholds documented in scoring engine; thresholds are already tested and validated in Phase 2

4. **Quick Wins Algorithm**
   - What we know: User decisions require "3-5 highest-impact, lowest-effort actions"
   - What's unclear: Exact scoring algorithm for "impact" (score improvement potential? legal criticality?) and "effort" mapping to recommendation data
   - Recommendation: Start with simple heuristic (red categories + "quick" effort level = quick wins); can refine algorithm based on user feedback

5. **Recommendation Translation Completeness**
   - What we know: Recommendations reference translation keys (titleKey, descriptionKey, firstStepKey)
   - What's unclear: Whether all recommendation translations are present in messages/de.json and messages/en.json
   - Recommendation: Verify translation keys exist during implementation; add missing translations for all 20 recommendations

## Sources

### Primary (HIGH confidence)
- shadcn/ui Progress component - https://ui.shadcn.com/docs/components/radix/progress
- Radix UI Progress API - https://www.radix-ui.com/primitives/docs/components/progress
- Zustand Persist Documentation - https://zustand.docs.pmnd.rs/integrations/persisting-store-data
- Zustand SSR and Hydration - https://zustand.docs.pmnd.rs/guides/ssr-and-hydration
- BSI IT-Grundschutz Kompendium (Official) - https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html
- BSI IT-Grundschutz Bausteine Edition 2023 - https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/IT-Grundschutz-Bausteine/Bausteine_Download_Edition_node.html

### Secondary (MEDIUM confidence)
- WCAG 2.2 Color Accessibility (WebAIM) - https://webaim.org/articles/contrast/
- WCAG Success Criterion 1.4.1: Use of Color - https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
- Tailwind CSS Grid Documentation - https://tailwindcss.com/docs/grid-template-columns
- shadcn/ui Badge Component - https://ui.shadcn.com/docs/components/badge
- Dashboard Design UX Patterns Best Practices - https://www.pencilandpaper.io/articles/ux-pattern-analysis-data-dashboards
- Dashboard UX Best Practices 2026 - https://www.designrush.com/agency/ui-ux-design/dashboard/trends/dashboard-ux

### Tertiary (LOW confidence)
- React Dashboard Templates 2026 (Colorlib) - https://colorlib.com/wp/react-dashboard-templates/ - General ecosystem patterns, not specific implementation guidance
- Tailwind CSS Best Practices 2026 (FrontendTools) - https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns - Blog post with practical patterns
- Maturity Model Thresholds (Balanced Scorecard Institute) - https://balancedscorecard.org/blog/dashboard-performance-targets-and-red-flags/ - General guidance, not NIS2-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in use, verified via package.json
- Architecture: HIGH - Patterns verified from existing gap-analysis page and official documentation
- Pitfalls: HIGH - Hydration pattern documented in official Zustand docs and existing codebase
- BSI URLs: MEDIUM - Official BSI links verified, but deep linking capability unclear
- Accessibility: HIGH - WCAG 2.2 requirements well-documented, Radix UI compliance verified

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days - stable domain, libraries at current versions)
