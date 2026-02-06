# Phase 4: Gap Analysis Wizard - Research

**Researched:** 2026-02-06
**Domain:** Multi-step form wizards, state persistence, progress indicators
**Confidence:** HIGH

## Summary

Phase 4 implements a multi-step wizard for the NIS2 gap analysis, where users progress through 10 measure categories answering 3 questions per category using a 4-level maturity scale (0-3). The standard approach uses Zustand with persist middleware for state management, React Hook Form with Zod for validation, and shadcn/ui RadioGroup for maturity selections. Key requirements include bidirectional navigation without data loss, progress indication with category names and completion percentage, and accessibility compliance for multi-page forms.

The existing codebase already demonstrates this pattern in Phase 3 (Affected Check), with Zustand persist, React Hook Form + Zod validation, Controller pattern for shadcn/ui components, and isClient hydration guard. Phase 4 extends this pattern to handle 10 category steps with 3-4 questions each, storing Answer objects (questionId, categoryId, level) instead of simple field values.

**Primary recommendation:** Extend existing wizard-store.ts with gap analysis state (answers array, currentCategoryIndex), create category step components using RadioGroup for maturity selections, implement progress indicator showing "Bereich X von 10 - {categoryName}" with percentage, and ensure bidirectional navigation preserves all answers.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zustand | 5.x | State management with persist middleware | De facto standard for React state, simpler than Redux, built-in localStorage persistence |
| react-hook-form | 7.x | Form validation and submission | Industry standard, minimal re-renders, excellent TypeScript support |
| zod | 3.x | Schema validation | Type-safe validation, integrates with react-hook-form via @hookform/resolvers |
| shadcn/ui RadioGroup | latest | Radio button groups for maturity selections | Accessible Radix UI components, Tailwind CSS styled, keyboard navigation built-in |
| next-intl | 3.x | i18n for DE/EN translations | Next.js App Router compatible, already in use |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @hookform/resolvers | 3.x | Connect Zod schemas to react-hook-form | Required for zodResolver integration |
| lucide-react | latest | Icons for navigation (ChevronLeft, ChevronRight) | Already in use for navigation buttons |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| zustand persist | React Context + localStorage | Zustand persist is simpler, no boilerplate, automatic serialization |
| react-hook-form | Formik | RHF has fewer re-renders, better performance, already adopted |
| RadioGroup | Custom radio inputs | shadcn/ui provides accessibility, keyboard navigation, WCAG compliance out of box |

**Installation:**
```bash
# All dependencies already installed in Phase 1 & 3
# No new packages needed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[locale]/gap-analysis/
│   ├── page.tsx                    # Container: currentCategoryIndex → CategoryStep
│   ├── components/
│   │   ├── category-progress.tsx  # "Bereich 3 von 10 - {name}" + percentage
│   │   └── navigation.tsx         # Reuse from check/components, or extend
│   └── steps/
│       └── category-step.tsx      # Generic step for any category (renders 3 questions)
├── stores/
│   └── gap-analysis-store.ts      # answers: Answer[], currentCategoryIndex, helpers
└── lib/nis2/
    ├── categories.ts               # Already exists (10 categories)
    ├── questions.ts                # Already exists (30 questions, 3 per category)
    └── types.ts                    # Already has Answer, MaturityLevel types
```

### Pattern 1: Zustand Persist for Multi-Step State
**What:** Use zustand persist middleware to automatically save/restore form state to localStorage
**When to use:** Multi-step forms where users might navigate away and return
**Example:**
```typescript
// src/stores/gap-analysis-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Answer } from '@/lib/nis2/types';

interface GapAnalysisState {
  // Navigation
  currentCategoryIndex: number;

  // Form data (persisted)
  answers: Answer[];

  // Actions
  setCategoryIndex: (index: number) => void;
  nextCategory: () => void;
  prevCategory: () => void;
  updateAnswers: (categoryAnswers: Answer[]) => void;
  getAnswersByCategory: (categoryId: string) => Answer[];
  reset: () => void;
}

export const useGapAnalysisStore = create<GapAnalysisState>()(
  persist(
    (set, get) => ({
      currentCategoryIndex: 0,
      answers: [],

      setCategoryIndex: (index) => set({ currentCategoryIndex: index }),
      nextCategory: () =>
        set((state) => ({
          currentCategoryIndex: Math.min(state.currentCategoryIndex + 1, 9),
        })),
      prevCategory: () =>
        set((state) => ({
          currentCategoryIndex: Math.max(state.currentCategoryIndex - 1, 0),
        })),
      updateAnswers: (categoryAnswers) =>
        set((state) => {
          // Merge new answers, replacing existing ones for same questionId
          const otherAnswers = state.answers.filter(
            (a) => !categoryAnswers.some((ca) => ca.questionId === a.questionId)
          );
          return { answers: [...otherAnswers, ...categoryAnswers] };
        }),
      getAnswersByCategory: (categoryId) => {
        return get().answers.filter((a) => a.categoryId === categoryId);
      },
      reset: () => set({ currentCategoryIndex: 0, answers: [] }),
    }),
    {
      name: 'nis2-gap-analysis-storage',
      partialize: (state) => ({
        answers: state.answers,
        currentCategoryIndex: state.currentCategoryIndex,
      }),
    }
  )
);
```

### Pattern 2: Generic Category Step Component
**What:** Single component that renders any category's questions dynamically
**When to use:** When all steps have identical structure but different data
**Example:**
```typescript
// src/app/[locale]/gap-analysis/steps/category-step.tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { Category, MaturityLevel, Answer } from '@/lib/nis2/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CategoryStepProps {
  category: Category;
  isFirstCategory: boolean;
  isLastCategory: boolean;
}

export function CategoryStep({ category, isFirstCategory, isLastCategory }: CategoryStepProps) {
  const t = useTranslations('gapAnalysis');
  const tQuestions = useTranslations('questions');
  const { answers, updateAnswers, nextCategory, prevCategory } = useGapAnalysisStore();

  // Schema: one field per question in this category
  const schema = z.object(
    category.questions.reduce((acc, q) => ({
      ...acc,
      [q.id]: z.number().min(0).max(3)
    }), {})
  );

  type CategoryFormData = z.infer<typeof schema>;

  // Default values from existing answers
  const existingAnswers = useGapAnalysisStore((state) =>
    state.getAnswersByCategory(category.id)
  );
  const defaultValues = category.questions.reduce((acc, q) => {
    const existing = existingAnswers.find((a) => a.questionId === q.id);
    return { ...acc, [q.id]: existing?.level ?? 0 };
  }, {});

  const { control, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues,
  });

  const onSubmit = (data: CategoryFormData) => {
    // Convert form data to Answer[]
    const categoryAnswers: Answer[] = Object.entries(data).map(([questionId, level]) => ({
      questionId,
      categoryId: category.id,
      level: level as MaturityLevel,
    }));

    updateAnswers(categoryAnswers);

    if (!isLastCategory) {
      nextCategory();
    } else {
      // Navigate to results page
      window.location.href = '/results'; // Or use router.push
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Category header */}
      <div>
        <h2 className="text-2xl font-bold">{t(category.nameKey)}</h2>
        <p className="text-muted-foreground">{t(category.descriptionKey)}</p>
      </div>

      {/* Questions */}
      {category.questions.map((question) => (
        <div key={question.id} className="space-y-3">
          <Label className="text-base font-medium">
            {tQuestions(`${question.id}.title`)}
          </Label>

          <Controller
            name={question.id}
            control={control}
            render={({ field }) => (
              <RadioGroup value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                {[0, 1, 2, 3].map((level) => (
                  <div key={level} className="flex items-start gap-3 rounded-lg border p-4">
                    <RadioGroupItem value={String(level)} id={`${question.id}-${level}`} />
                    <Label htmlFor={`${question.id}-${level}`} className="cursor-pointer">
                      {tQuestions(`${question.id}.maturity.level${level}`)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />

          {errors[question.id] && (
            <p className="text-sm text-red-600">{errors[question.id]?.message}</p>
          )}
        </div>
      ))}

      {/* Navigation */}
      <WizardNavigation
        onBack={isFirstCategory ? undefined : prevCategory}
        isFirstStep={isFirstCategory}
        isLastStep={isLastCategory}
        backLabel={t('navigation.back')}
        nextLabel={isLastCategory ? t('navigation.showResults') : t('navigation.next')}
      />
    </form>
  );
}
```

### Pattern 3: Progress Calculation
**What:** Calculate completion percentage based on answered questions
**When to use:** Multi-step forms with variable completion rates
**Example:**
```typescript
// In category-progress.tsx or progress calculation helper
export function calculateProgress(answers: Answer[], totalQuestions: number): number {
  const answeredQuestions = answers.length;
  return totalQuestions > 0
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0;
}

// Usage in component
const totalQuestions = getTotalQuestionCount(); // 30
const progress = calculateProgress(answers, totalQuestions); // e.g., 23%
```

### Pattern 4: Hydration Guard for Zustand Persist
**What:** Prevent SSR hydration mismatch when using zustand persist
**When to use:** Always, when using zustand persist in Next.js App Router
**Example:**
```typescript
// src/app/[locale]/gap-analysis/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';

export default function GapAnalysisPage() {
  const currentCategoryIndex = useGapAnalysisStore((state) => state.currentCategoryIndex);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render skeleton with same structure
    return <div className="animate-pulse">Loading...</div>;
  }

  // Render actual content
  return <CategoryStep category={CATEGORIES[currentCategoryIndex]} />;
}
```

### Anti-Patterns to Avoid
- **Separate state per step:** Don't create 10 separate stores or useState hooks. Use single answers array in one store.
- **Conditional persistence:** Don't try to persist only on certain actions. Zustand persist auto-saves on every state change.
- **Form reset on navigation:** Don't reset form when user goes back. Load existing answers into defaultValues.
- **Manual localStorage:** Don't write custom localStorage code. Zustand persist handles serialization, deserialization, and hydration.
- **Validation on every keystroke:** Don't use mode: 'onChange' for multi-step forms. Use mode: 'onSubmit' to avoid performance issues.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Progress calculation | Manual percentage formula | Calculate in store helper or component utility | Edge cases: 0 total, decimal rounding, incomplete categories |
| Radio button accessibility | Custom radio inputs with click handlers | shadcn/ui RadioGroup (Radix UI) | WCAG 2.1 AA compliance, keyboard navigation, aria-labels, focus management |
| State persistence | Manual localStorage read/write | zustand persist middleware | Handles serialization, SSR hydration, storage events, version migration |
| Form validation | Custom validation logic | Zod + react-hook-form | Type safety, error messages, async validation, field-level errors |
| Step navigation guard | Custom "are you sure?" logic | Store validation state, disable Next if incomplete | Form libraries handle dirty state, touched fields |

**Key insight:** Multi-step forms have hidden complexity in accessibility (screen reader announcements, keyboard navigation), state synchronization (localStorage race conditions, SSR hydration), and UX edge cases (partial completion, browser back button, refresh). Use proven libraries that handle these scenarios.

## Common Pitfalls

### Pitfall 1: State Sprawl and Re-render Hell
**What goes wrong:** Creating separate state for each step or storing step content in state causes excessive re-renders and performance degradation.
**Why it happens:** Developers lift all data to parent and trigger re-render of all steps when one changes.
**How to avoid:** Use zustand with selective subscriptions. Only subscribe to the data each component needs (e.g., useGapAnalysisStore((state) => state.currentCategoryIndex) instead of entire state).
**Warning signs:** Form inputs feel sluggish, DevTools show many component updates, console shows "rendering step X" repeatedly.

### Pitfall 2: Data Loss on Navigation
**What goes wrong:** User enters answers, clicks Back, then Forward, and their answers disappear.
**Why it happens:** Form defaultValues are set on mount but not updated when returning to a step, or store updates aren't merged correctly.
**How to avoid:** Always read from store when setting defaultValues. Use merge strategy in updateAnswers that preserves non-related answers.
**Warning signs:** Users report "lost my progress," answers array in store has fewer items than expected.

### Pitfall 3: SSR Hydration Mismatch
**What goes wrong:** Next.js throws "Text content does not match" errors, UI flickers, or wrong step renders initially.
**Why it happens:** Server renders step 0, but client hydrates with step 3 from localStorage, causing mismatch.
**How to avoid:** Use isClient guard pattern (useState + useEffect). Render skeleton on server, real content only on client.
**Warning signs:** Console errors about hydration, UI shows brief flash of wrong content, zustand state is undefined on first render.

### Pitfall 4: Inaccessible Progress Indicators
**What goes wrong:** Screen reader users don't know which step they're on or how many remain.
**Why it happens:** Progress indicator is purely visual (colored circles) without ARIA labels or semantic markup.
**How to avoid:** Use ordered list (<ol>) for step indicator, add aria-current="step" to current step, include visually-hidden text like "Step 3 of 10: Business Continuity."
**Warning signs:** Accessibility audit fails, screen reader testing shows "list item" without context.

### Pitfall 5: Premature Validation
**What goes wrong:** Form shows validation errors before user submits, or validates on every keystroke causing lag.
**Why it happens:** Using react-hook-form mode: 'onChange' or mode: 'onBlur' in multi-step forms.
**How to avoid:** Use mode: 'onSubmit' for gap analysis. Only validate when user clicks Next. For individual fields, use mode: 'onBlur' if needed.
**Warning signs:** Red error messages appear before user finishes typing, form feels slow, users complain about "aggressive" validation.

### Pitfall 6: Category Count vs Question Count Confusion
**What goes wrong:** Progress shows "7 of 10" meaning categories, but user expects "21 of 30" meaning questions.
**Why it happens:** Mixing granularities in progress calculation or label.
**How to avoid:** Requirement GAP-08 specifies "Bereich X von 10" (category-based) AND "Gesamtfortschritt" (overall percentage). Show both: category count for navigation, percentage for completion.
**Warning signs:** User feedback: "says 70% but I only did 7 things," progress jumps in large increments.

## Code Examples

Verified patterns from official sources:

### RadioGroup with Controller (shadcn/ui + react-hook-form)
```typescript
// Source: https://ui.shadcn.com/docs/components/radio-group
// Integration: react-hook-form Controller pattern
import { Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Inside component with useForm:
<Controller
  name="maturityLevel"
  control={control}
  render={({ field }) => (
    <RadioGroup value={field.value} onValueChange={field.onChange}>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="0" id="level-0" />
        <Label htmlFor="level-0">Level 0: Not implemented</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="1" id="level-1" />
        <Label htmlFor="level-1">Level 1: Basic implementation</Label>
      </div>
      {/* ... levels 2, 3 */}
    </RadioGroup>
  )}
/>
```

### Zustand Persist with Partialize
```typescript
// Source: https://github.com/pmndrs/zustand (official docs)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      formData: {},
      currentStep: 0,
      setStep: (step) => set({ currentStep: step }),
    }),
    {
      name: 'form-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }), // Only persist these fields, not functions
    }
  )
);
```

### Progress Calculation with Percentage
```typescript
// Source: Multi-step form best practices (various sources)
function calculateOverallProgress(answers: Answer[], totalQuestions: number): {
  answeredCount: number;
  percentage: number;
  categoryCompletion: Record<string, boolean>;
} {
  const answeredCount = answers.length;
  const percentage = totalQuestions > 0
    ? Math.round((answeredCount / totalQuestions) * 100)
    : 0;

  // Check which categories are fully answered (3 questions each)
  const categoryCompletion: Record<string, boolean> = {};
  CATEGORIES.forEach((cat) => {
    const catAnswers = answers.filter((a) => a.categoryId === cat.id);
    categoryCompletion[cat.id] = catAnswers.length === 3;
  });

  return { answeredCount, percentage, categoryCompletion };
}
```

### Accessible Step Indicator with ARIA
```typescript
// Source: https://www.w3.org/WAI/tutorials/forms/multi-page/
// Source: https://designsystem.digital.gov/components/step-indicator/
export function CategoryProgress({ currentIndex, categories, answeredCount, totalQuestions }) {
  const t = useTranslations('gapAnalysis');
  const currentCategory = categories[currentIndex];
  const percentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="space-y-4">
        {/* Category indicator */}
        <li>
          <span className="text-sm font-medium text-muted-foreground">
            {t('progress.category', { current: currentIndex + 1, total: 10 })}
          </span>
          <h2 className="text-xl font-bold" aria-current="step">
            {t(currentCategory.nameKey)}
          </h2>
        </li>

        {/* Overall progress */}
        <li>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t('progress.overall')}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {percentage}%
            </span>
          </div>
          <span className="sr-only">
            {t('progress.detail', { answered: answeredCount, total: totalQuestions })}
          </span>
        </li>
      </ol>
    </nav>
  );
}
```

### Navigation with Bidirectional Support
```typescript
// Extends existing WizardNavigation component
// No new code needed - existing navigation.tsx supports onBack callback
// Just pass prevCategory as onBack handler

// Usage in CategoryStep:
<WizardNavigation
  onBack={isFirstCategory ? undefined : () => {
    // Manually save current form state before navigating
    const currentValues = getValues(); // from useForm
    const categoryAnswers: Answer[] = Object.entries(currentValues).map(([qId, level]) => ({
      questionId: qId,
      categoryId: category.id,
      level: level as MaturityLevel,
    }));
    updateAnswers(categoryAnswers);
    prevCategory();
  }}
  onNext={handleSubmit(onSubmit)} // Validates & saves, then navigates
  isFirstStep={isFirstCategory}
  isLastStep={isLastCategory}
/>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Redux for form state | Zustand with persist middleware | ~2021-2022 | Simpler API, less boilerplate, built-in persistence |
| Formik for forms | React Hook Form | ~2020-2021 | Better performance (fewer re-renders), smaller bundle size |
| PropTypes | Zod + TypeScript | ~2020-2023 | Runtime + compile-time safety, schema validation |
| Custom radio inputs | Radix UI (shadcn/ui) | ~2022-2024 | WCAG 2.1 AA compliant out of box, keyboard nav, focus management |
| Manual localStorage | Zustand persist / TanStack Query | ~2021-2023 | Handles hydration, versioning, serialization edge cases |

**Deprecated/outdated:**
- **Redux Toolkit for form state:** Overkill for client-side forms, zustand is simpler and sufficient
- **Formik:** Still works but community moved to React Hook Form for better performance
- **Context API for form state:** Causes re-renders of entire tree, zustand has selective subscriptions
- **Manual progress bars:** Use native <progress> or styled div with role="progressbar" and ARIA attributes

## Open Questions

Things that couldn't be fully resolved:

1. **Should category navigation allow skipping steps?**
   - What we know: Requirements say "navigieren zwischen Kategorien" (navigate between categories), doesn't specify if only sequential or random access
   - What's unclear: Can user click "Bereich 7" directly from "Bereich 2," or only via Back/Next buttons?
   - Recommendation: Start with sequential (Back/Next only) to match Phase 3 pattern. If user testing shows need for random access, add clickable step indicator later.

2. **What happens if user refreshes browser mid-wizard?**
   - What we know: Zustand persist automatically restores from localStorage
   - What's unclear: Should we show "Welcome back, you were on step 3" message?
   - Recommendation: Silent restore is standard UX. User just sees the step they were on. Only show message if restoration fails.

3. **Should partially answered categories count toward progress?**
   - What we know: Each category has 3 questions. User might answer 1-2 then navigate away.
   - What's unclear: Progress calculation - count questions (e.g., 7/30 = 23%) or complete categories (e.g., 2/10 = 20%)?
   - Recommendation: Count questions for fine-grained progress (requirement GAP-08 says "Gesamtfortschritt" as percentage, implies granular). Show both category count ("Bereich 3 von 10") and overall percentage (23%).

4. **How to handle browser back button?**
   - What we know: Browser back button will navigate in browser history, potentially leaving the app
   - What's unclear: Should we use history.pushState to intercept back button and navigate to previous category?
   - Recommendation: Don't intercept browser back button (anti-pattern, breaks user expectations). Provide clear Back/Next buttons. If needed, add beforeunload warning if user tries to leave page with unsaved data.

## Sources

### Primary (HIGH confidence)
- shadcn/ui RadioGroup documentation - https://ui.shadcn.com/docs/components/radio-group
- W3C WAI Multi-Page Forms - https://www.w3.org/WAI/tutorials/forms/multi-page/
- USWDS Step Indicator - https://designsystem.digital.gov/components/step-indicator/
- React Spectrum useRadioGroup - https://react-spectrum.adobe.com/react-aria/useRadioGroup.html
- zustand GitHub repository (official) - https://github.com/pmndrs/zustand
- react-hook-form GitHub (official) - https://github.com/react-hook-form/react-hook-form

### Secondary (MEDIUM confidence)
- Multi-Step Form with RHF, Zustand, Zod tutorial - https://www.buildwithmatija.com/blog/master-multi-step-forms-build-a-dynamic-react-form-in-6-simple-steps
- Next.js Multi-Step Form with Server Validation - https://medium.com/@mohantaankit2002/implementing-multi-step-form-wizards-in-next-js-with-server-side-validation-b381a7f9de4a
- Managing State in Multi-Step Forms - https://birdeatsbug.com/blog/managing-state-in-a-multi-step-form
- Building Reusable Multi-Step Form with RHF + Zod - https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/
- Common Mistakes in React Multi-Step Forms - https://claritydev.net/blog/build-a-multistep-form-with-react-hook-form

### Tertiary (LOW confidence)
- WebSearch results for "React form state persistence" - multiple blog posts, no single authoritative source
- General UX best practices for multi-step forms - various articles, no official standards body

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in use (Phase 1-3), official documentation verified
- Architecture: HIGH - Existing wizard pattern in Phase 3 proven, extends cleanly to 10 categories
- Pitfalls: MEDIUM - Based on community sources + WebSearch, verified against official docs where possible
- Accessibility: HIGH - W3C WAI official tutorials, USWDS testing standards, Radix UI accessibility guarantees

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days - stable ecosystem, no breaking changes expected)

**Key decisions validated:**
- ✅ Zustand persist is correct choice (already used in Phase 3, proven for this codebase)
- ✅ React Hook Form + Zod pattern established in Phase 3, extends cleanly
- ✅ shadcn/ui RadioGroup provides WCAG 2.1 AA compliance, keyboard navigation
- ✅ Answer type (questionId, categoryId, level) already defined in types.ts
- ✅ Progress calculation straightforward: (answers.length / 30) * 100

**Technical risks:**
- 🟡 LOW: SSR hydration mismatch (mitigated by isClient guard, proven in Phase 3)
- 🟡 LOW: Performance with 30 questions (React Hook Form handles this well, validation on submit only)
- 🟢 NONE: State persistence (zustand persist handles all edge cases)
- 🟢 NONE: Accessibility (shadcn/ui RadioGroup + ARIA labels = WCAG compliant)
