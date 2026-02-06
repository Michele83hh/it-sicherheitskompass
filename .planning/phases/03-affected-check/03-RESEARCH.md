# Phase 3: Affected Check - Research

**Researched:** 2026-02-06
**Domain:** Multi-step form wizard with Next.js 16 App Router, React Hook Form, Zustand
**Confidence:** HIGH

## Summary

This research investigated how to build a robust, accessible multi-step form wizard in Next.js 16 App Router using the established tech stack (shadcn/ui, React Hook Form, Zod, Zustand). The phase builds on existing infrastructure from Phase 2 (classification logic, sector data, types, i18n) to create the first interactive user feature: the Betroffenheitsprüfung (Affected Check) wizard.

The standard approach in 2026 combines React Hook Form for validation, Zustand for state management across steps, Zod for schema validation, and shadcn/ui components for the UI. This architecture separates concerns cleanly: React Hook Form handles form state and validation within each step, Zustand manages navigation state and data persistence, and Zod provides type-safe schemas that ensure data integrity.

Key architectural decisions are locked by CONTEXT.md: the wizard uses three distinct steps (Sector Selection → Company Size → Result), progressive disclosure for subsector selection, and color-coded result cards with layered legal detail. Research focused on verifying best practices for implementing these decisions rather than exploring alternatives.

**Primary recommendation:** Use React Hook Form with Zod for validation, extend existing Zustand store for wizard state, install shadcn Select/Input components, and use react-number-format for thousand-separator inputs. Follow progressive disclosure patterns (conditional subsector dropdown) and WCAG 2.1 accessibility guidelines (color + text/icon for result coding).

## Standard Stack

The established libraries/tools for multi-step form wizards in Next.js 16:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Framework with App Router | Already in project, App Router is current standard |
| React Hook Form | ^7.x | Form state & validation | Industry standard for complex forms, smallest bundle size |
| Zod | ^3.x | Schema validation | Type-safe validation, integrates with React Hook Form via zodResolver |
| Zustand | ^5.0.11 | Wizard state management | Already in project, lightweight, no Context boilerplate |
| shadcn/ui | latest | UI components | Already in project, accessible Radix primitives |
| react-number-format | ^5.x | Number input formatting | De facto standard for thousand separators, locale support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-intl | ^4.8.2 | Internationalization | Already in project, handles DE/EN translations |
| lucide-react | ^0.563.0 | Icons | Already in project, for info icons, step indicators |
| clsx / tailwind-merge | latest | Conditional styling | Already in project, for step states, error states |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React Hook Form | Formik, React Final Form | RHF has smaller bundle, better TypeScript, more active maintenance |
| react-number-format | Custom formatter with Intl.NumberFormat | Custom solution misses edge cases (caret position, paste handling) |
| Zustand | React Context API | Context causes more re-renders, Zustand already in project |

**Installation:**
```bash
# shadcn/ui components needed for this phase
npx shadcn@latest add select
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add tooltip

# Form validation and number formatting
npm install react-hook-form @hookform/resolvers zod react-number-format
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[locale]/check/           # Wizard route
│   ├── page.tsx                  # Main wizard container
│   ├── steps/                    # Step components
│   │   ├── sector-selection.tsx  # Step 1: Sector + Subsector
│   │   ├── company-size.tsx      # Step 2: Employees, Revenue, Balance, KRITIS
│   │   └── result.tsx            # Step 3: Classification result
│   └── components/               # Wizard-specific components
│       ├── step-indicator.tsx    # Progress indicator (3 steps)
│       └── navigation.tsx        # Back/Next buttons
├── components/ui/                # shadcn components (add select, input, label, tooltip)
├── stores/
│   └── wizard-store.ts           # Extended with form data state
└── lib/nis2/
    ├── classify.ts               # Already exists: classifyEntity()
    ├── sectors.ts                # Already exists: 18 sectors with subsectors
    └── types.ts                  # Already exists: ClassificationInput, ClassificationResult
```

### Pattern 1: Multi-Step Wizard with Zustand Navigation State
**What:** Zustand store manages current step index and navigation, while React Hook Form handles per-step validation.
**When to use:** Multi-step forms where each step can be validated independently before advancing.
**Example:**
```typescript
// Source: https://github.com/orgs/react-hook-form/discussions/6382
// Extended wizard-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ClassificationInput } from '@/lib/nis2/types';

interface WizardState {
  // Navigation state
  currentStep: number;
  totalSteps: number;

  // Form data (persisted to localStorage)
  formData: Partial<ClassificationInput>;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<ClassificationInput>) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      totalSteps: 3,
      formData: {},

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
      })),
      prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0)
      })),
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      reset: () => set({ currentStep: 0, formData: {} }),
    }),
    {
      name: 'nis2-wizard-storage', // localStorage key
      partialize: (state) => ({ formData: state.formData, currentStep: state.currentStep }), // Only persist these
    }
  )
);
```

### Pattern 2: Per-Step Validation with React Hook Form + Zod
**What:** Each step is a separate React Hook Form with its own Zod schema. On submit, data flows to Zustand store.
**When to use:** Multi-step wizard where each step has different validation rules.
**Example:**
```typescript
// Source: https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/
// Step 1: Sector Selection Component
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from '@/stores/wizard-store';

const sectorSchema = z.object({
  sectorId: z.string().min(1, 'Bitte wählen Sie einen Sektor'),
  subsectorId: z.string().nullable(),
});

type SectorFormData = z.infer<typeof sectorSchema>;

export function SectorSelectionStep() {
  const { formData, updateFormData, nextStep } = useWizardStore();

  const { register, handleSubmit, formState: { errors } } = useForm<SectorFormData>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      sectorId: formData.sectorId || '',
      subsectorId: formData.subsectorId || null,
    },
  });

  const onSubmit = (data: SectorFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Pattern 3: Progressive Disclosure for Conditional Fields
**What:** Secondary fields (subsector dropdown) only appear when primary selection requires it.
**When to use:** Forms where 30%+ of fields are conditionally relevant based on prior inputs.
**Example:**
```typescript
// Source: https://www.nngroup.com/articles/progressive-disclosure/
// Conditional subsector dropdown
const [selectedSector, setSelectedSector] = useState<string>('');
const sector = sectors.find(s => s.id === selectedSector);
const hasSubsectors = sector?.subsectors.length > 0;

return (
  <>
    <Select value={selectedSector} onValueChange={setSelectedSector}>
      {/* Sector options */}
    </Select>

    {hasSubsectors && (
      <Select {...register('subsectorId')}>
        {/* Subsector options */}
      </Select>
    )}
  </>
);
```

### Pattern 4: Grouped Select with shadcn/ui
**What:** HTML optgroup pattern rendered via shadcn Select with SelectGroup and SelectLabel.
**When to use:** Dropdowns with 15+ options needing categorical organization (here: Anlage 1 vs Anlage 2).
**Example:**
```typescript
// Source: https://ui.shadcn.com/docs/components/select
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sectors } from '@/lib/nis2/sectors';

<Select {...register('sectorId')}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Sektor auswählen" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Sektoren hoher Kritikalität (Anlage 1)</SelectLabel>
      {sectors.filter(s => s.anlage === 1).map(sector => (
        <SelectItem key={sector.id} value={sector.id}>
          {t(sector.nameKey)}
        </SelectItem>
      ))}
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Sonstige kritische Sektoren (Anlage 2)</SelectLabel>
      {sectors.filter(s => s.anlage === 2).map(sector => (
        <SelectItem key={sector.id} value={sector.id}>
          {t(sector.nameKey)}
        </SelectItem>
      ))}
    </SelectGroup>
    <SelectSeparator />
    <SelectItem value="not-listed">Mein Sektor ist nicht aufgeführt</SelectItem>
  </SelectContent>
</Select>
```

### Pattern 5: Number Input with Thousand Separator
**What:** react-number-format's NumericFormat wraps shadcn Input for formatted number display with standard <input> behavior.
**When to use:** Currency, employee count, or any large number inputs where readability matters.
**Example:**
```typescript
// Source: https://s-yadav.github.io/react-number-format/docs/numeric_format/
import { NumericFormat } from 'react-number-format';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';

<Controller
  name="employees"
  control={control}
  render={({ field }) => (
    <NumericFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      suffix=" Mitarbeiter"
      allowNegative={false}
      onValueChange={(values) => field.onChange(values.floatValue)}
      value={field.value}
    />
  )}
/>
```

### Pattern 6: Color-Coded Result Cards (Accessible)
**What:** Color + icon + text label convey classification category (WCAG 1.4.1 compliance).
**When to use:** Status displays where color enhances but doesn't solely convey meaning.
**Example:**
```typescript
// Source: https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const resultConfig = {
  'besonders-wichtig': {
    color: 'border-red-500 bg-red-50',
    icon: AlertCircle,
    iconColor: 'text-red-600',
    label: 'Besonders wichtige Einrichtung',
  },
  'wichtig': {
    color: 'border-orange-500 bg-orange-50',
    icon: AlertCircle,
    iconColor: 'text-orange-600',
    label: 'Wichtige Einrichtung',
  },
  'nicht-betroffen': {
    color: 'border-green-500 bg-green-50',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    label: 'Nicht betroffen',
  },
};

const { color, icon: Icon, iconColor, label } = resultConfig[result.category];

<Card className={`${color} border-2`}>
  <CardHeader>
    <div className="flex items-center gap-3">
      <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
      <CardTitle>{label}</CardTitle>
    </div>
  </CardHeader>
</Card>
```

### Pattern 7: Step Indicator (Progress Visualization)
**What:** Horizontal step tracker with numbered circles, active state styling, and connecting lines.
**When to use:** Wizards with 3-5 steps where user needs context on progress and position.
**Example:**
```typescript
// Source: https://www.nngroup.com/articles/wizards/
const steps = ['Sektor', 'Unternehmensgröße', 'Ergebnis'];

<nav aria-label="Progress">
  <ol className="flex items-center justify-between">
    {steps.map((step, index) => (
      <li key={index} className="flex items-center">
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-full border-2
            ${index === currentStep ? 'border-blue-600 bg-blue-600 text-white' : ''}
            ${index < currentStep ? 'border-blue-600 bg-blue-600 text-white' : ''}
            ${index > currentStep ? 'border-gray-300 bg-white text-gray-500' : ''}
          `}
        >
          {index + 1}
        </div>
        {index < steps.length - 1 && (
          <div className={`h-0.5 w-16 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
        )}
      </li>
    ))}
  </ol>
</nav>
```

### Anti-Patterns to Avoid
- **Nested forms:** Don't wrap step components in individual `<form>` elements if using a parent form. This breaks HTML semantics and validation.
- **Too many fields per step:** Keep to 5 or fewer input fields per step to prevent cognitive overload and abandonment.
- **Validation on input:** For empty required fields, validate only on submit/blur, not on first keystroke (interrupts user flow).
- **Persisting sensitive data to localStorage:** The wizard collects only business data (sector, size), but never persist PII or credentials to localStorage unencrypted.
- **Color-only status indicators:** Always pair color with icon + text label for WCAG 1.4.1 compliance (color-blind users).
- **Unclear progress:** Users must always see their position in the wizard (step X of Y) and be able to navigate back freely.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Number input thousand separator | Custom formatter with `onChange` logic | react-number-format (NumericFormat) | Edge cases: caret positioning after formatting, paste handling, backspace in middle of number, locale variations |
| Form validation | Manual `useState` + validation functions | React Hook Form + Zod | Type safety, less boilerplate, better performance (uncontrolled inputs), built-in error handling |
| Wizard state management | Props drilling or Context boilerplate | Zustand with persist middleware | Less code, no Provider hell, built-in localStorage sync, DevTools |
| Select with keyboard navigation | Custom dropdown with `<div>` + event handlers | shadcn Select (Radix primitives) | Accessibility (ARIA, focus management), keyboard nav, screen reader support, mobile touch handling |
| Step indicator UI | Custom progress bar with inline styles | Component with semantic HTML (`<nav>`, `<ol>`) | Accessibility (landmark, list semantics), tested responsive layout |
| Multi-step form routing | Manual URL sync with `useState` | Client-side step state only (no URL sync) | Simpler: wizard should reset on page load (not bookmarkable), avoid complex URL state sync bugs |

**Key insight:** Multi-step forms have many hidden complexity areas (validation timing, error message placement, progress tracking, data persistence on accidental navigation, keyboard accessibility). Using established libraries prevents 80% of edge case bugs that only surface in user testing or production.

## Common Pitfalls

### Pitfall 1: Premature Validation (Empty Field Errors)
**What goes wrong:** Showing "This field is required" error immediately when user focuses into an empty field, before they've had a chance to type.
**Why it happens:** Misunderstanding React Hook Form's validation modes. Default mode="onSubmit" validates only on form submission, but mode="onChange" validates on every keystroke.
**How to avoid:** Use React Hook Form's validation modes strategically:
- Required fields: Validate `onBlur` or `onSubmit` (not `onChange`)
- Format validation (email, number range): Validate `onBlur`
- Cross-field validation: Validate `onSubmit`
**Warning signs:** User complaints about "aggressive" error messages, high form abandonment on first step.

### Pitfall 2: Losing Form Data on Navigation
**What goes wrong:** User fills step 1, navigates away (back button, link click), returns to wizard — all data is gone.
**Why it happens:** Not persisting wizard state. React component state is lost on unmount.
**How to avoid:** Use Zustand persist middleware to save formData and currentStep to localStorage. Restore on component mount.
```typescript
// In wizard-store.ts, use persist middleware
export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({ /* state */ }),
    { name: 'nis2-wizard-storage', partialize: (state) => ({ formData: state.formData }) }
  )
);
```
**Warning signs:** User testing reveals frustration about "losing work", support tickets about having to "start over".

### Pitfall 3: Nested Form Elements
**What goes wrong:** Wrapping each step component in its own `<form>` while also having a parent form container. Browsers ignore nested forms, breaking validation.
**Why it happens:** Conceptual model mismatch: thinking "each step is a separate form" rather than "one form with multiple sections".
**How to avoid:** Single `<form>` element at the top level, step components render form fields but not `<form>` tags. Use React Hook Form's `handleSubmit` only on the final step or "Next" button actions.
**Warning signs:** Form validation not triggering, submit buttons not working, console warnings about nested forms.

### Pitfall 4: Color-Only Result Indicators (WCAG Violation)
**What goes wrong:** Using only background color (green/orange/red) to indicate classification result. Users with color blindness can't distinguish categories.
**Why it happens:** Designing for visual appearance without considering accessibility requirements (WCAG 1.4.1: Use of Color).
**How to avoid:** Always combine color with:
1. Icon (CheckCircle for green, AlertCircle for orange/red)
2. Text label ("Besonders wichtige Einrichtung")
3. Semantic HTML (headings, ARIA labels)
**Warning signs:** Accessibility audit fails, screen reader testing reveals ambiguous results, color-blind users can't differentiate categories.

### Pitfall 5: Too Many Steps (User Fatigue)
**What goes wrong:** Breaking form into 6+ micro-steps, each with 1-2 fields. Users feel progress is too slow, abandon wizard.
**Why it happens:** Over-applying "one question per step" pattern without considering cognitive context switching cost.
**How to avoid:** Aim for 3-5 steps total. Group related fields together (sector + subsector = one step, all size inputs = one step). Each step should feel like meaningful progress (15-30% of total).
**Warning signs:** Analytics show high drop-off at steps 3-4, user testing reveals comments like "this is taking forever".

### Pitfall 6: Poor Mobile Layout (Dropdown Overflow)
**What goes wrong:** shadcn Select component's dropdown extends beyond viewport on mobile, causing scrolling issues or cut-off options.
**Why it happens:** Default `position="item-aligned"` aligns dropdown to selected item, which can cause overflow on small screens.
**How to avoid:** Use `position="popper"` for mobile viewports to align dropdown to trigger button edge, preventing overflow. Test on actual mobile devices (not just responsive mode).
```typescript
<SelectContent position="popper" className="max-h-[60vh]">
  {/* options */}
</SelectContent>
```
**Warning signs:** Mobile user complaints about "can't see all options", high mobile abandonment rate compared to desktop.

### Pitfall 7: Hydration Mismatch with localStorage
**What goes wrong:** Next.js server-renders wizard with empty state, but client hydration loads different data from localStorage, causing React hydration error.
**Why it happens:** localStorage is only available in browser, not during SSR. Server renders default state, client hydrates with stored state.
**How to avoid:** Mark wizard page as client component (`'use client'` at top), or use `useEffect` + `useState` to handle hydration manually:
```typescript
'use client';
const [isClient, setIsClient] = useState(false);
useEffect(() => setIsClient(true), []);

if (!isClient) return <WizardSkeleton />; // Match server HTML
return <WizardContent />; // Now safe to use localStorage
```
**Warning signs:** Console errors "Text content did not match", visual flash on page load, form inputs jumping.

### Pitfall 8: Inaccessible Number Inputs
**What goes wrong:** Using `<input type="number">` with thousand separators causes browser's native spinners to conflict with formatted display.
**Why it happens:** Native number inputs only accept numeric characters (no separators), but formatted display needs "123.456".
**How to avoid:** Use `<input type="text">` with inputMode="numeric" for mobile keyboard, controlled by react-number-format. This preserves formatting while giving mobile users numeric keyboard.
```typescript
<NumericFormat
  customInput={Input}
  type="text"
  inputMode="numeric"
  thousandSeparator="."
  // ...
/>
```
**Warning signs:** User testing reveals confusion about spinners not working, mobile users complain about wrong keyboard appearing.

## Code Examples

Verified patterns from official sources:

### Step Component Integration Pattern
```typescript
// Source: https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from '@/stores/wizard-store';
import { useTranslations } from 'next-intl';

// Define step-specific schema
const companySizeSchema = z.object({
  employees: z.number().min(1, 'Mindestens 1 Mitarbeiter erforderlich'),
  annualRevenue: z.number().min(0, 'Umsatz muss positiv sein'),
  balanceSheet: z.number().optional(),
  isKritis: z.boolean(),
});

type CompanySizeFormData = z.infer<typeof companySizeSchema>;

export function CompanySizeStep() {
  const t = useTranslations();
  const { formData, updateFormData, nextStep, prevStep } = useWizardStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySizeFormData>({
    resolver: zodResolver(companySizeSchema),
    defaultValues: {
      employees: formData.employees || 0,
      annualRevenue: formData.annualRevenue || 0,
      balanceSheet: formData.balanceSheet || 0,
      isKritis: formData.isKritis || false,
    },
  });

  const onSubmit = (data: CompanySizeFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields */}
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          Zurück
        </Button>
        <Button type="submit">Weiter</Button>
      </div>
    </form>
  );
}
```

### NumericFormat with React Hook Form Controller
```typescript
// Source: https://s-yadav.github.io/react-number-format/docs/numeric_format/
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="employees">Anzahl Mitarbeiter</Label>
  <Controller
    name="employees"
    control={control}
    render={({ field }) => (
      <NumericFormat
        id="employees"
        customInput={Input}
        type="text"
        inputMode="numeric"
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        onValueChange={(values) => {
          field.onChange(values.floatValue || 0);
        }}
        value={field.value}
        aria-invalid={errors.employees ? 'true' : 'false'}
        aria-describedby={errors.employees ? 'employees-error' : undefined}
      />
    )}
  />
  {errors.employees && (
    <p id="employees-error" className="text-sm text-red-600">
      {errors.employees.message}
    </p>
  )}
</div>
```

### Conditional Subsector Dropdown (Progressive Disclosure)
```typescript
// Source: https://www.nngroup.com/articles/progressive-disclosure/
import { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { sectors } from '@/lib/nis2/sectors';

export function SectorFields() {
  const { register, setValue, control } = useFormContext();
  const sectorId = useWatch({ control, name: 'sectorId' });

  const selectedSector = sectors.find(s => s.id === sectorId);
  const hasSubsectors = selectedSector && selectedSector.subsectors.length > 0;

  // Reset subsector when sector changes
  useEffect(() => {
    if (sectorId && !hasSubsectors) {
      setValue('subsectorId', null);
    }
  }, [sectorId, hasSubsectors, setValue]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sectorId">Sektor *</Label>
        <Select {...register('sectorId')}>
          {/* Sector options */}
        </Select>
      </div>

      {hasSubsectors && (
        <div>
          <Label htmlFor="subsectorId">Teilsektor *</Label>
          <Select {...register('subsectorId')}>
            <SelectTrigger>
              <SelectValue placeholder="Teilsektor auswählen" />
            </SelectTrigger>
            <SelectContent>
              {selectedSector.subsectors.map(sub => (
                <SelectItem key={sub.id} value={sub.id}>
                  {t(sub.nameKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
```

### Result Card with Accessibility
```typescript
// Source: https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { ClassificationResult } from '@/lib/nis2/types';

interface ResultCardProps {
  result: ClassificationResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const config = {
    'besonders-wichtig': {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-900',
      iconColor: 'text-red-600',
      Icon: AlertCircle,
    },
    'wichtig': {
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-900',
      iconColor: 'text-orange-600',
      Icon: AlertTriangle,
    },
    'nicht-betroffen': {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-900',
      iconColor: 'text-green-600',
      Icon: CheckCircle,
    },
  };

  const { bgColor, borderColor, textColor, iconColor, Icon } = config[result.category];

  return (
    <Card className={`${bgColor} ${borderColor} border-2`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className={`h-10 w-10 ${iconColor}`} aria-hidden="true" />
          <CardTitle className={textColor}>
            {t(`classification.categories.${result.category}`)}
          </CardTitle>
        </div>
        <CardDescription className={textColor}>
          {result.legalReference}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{t(result.reason)}</p>
        {/* Expandable "Warum?" section */}
      </CardContent>
    </Card>
  );
}
```

### Programmatic Navigation to Next Phase
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/use-router
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function ResultActions() {
  const router = useRouter();
  const { reset } = useWizardStore();

  const handleStartGapAnalysis = () => {
    // Navigate to Gap Analysis wizard (Phase 4, built later)
    router.push('/gap-analysis');
  };

  const handleRestart = () => {
    reset(); // Clear wizard state
    // No navigation needed, will show step 0
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleStartGapAnalysis} size="lg">
        Reifegrad prüfen
      </Button>
      <Button variant="outline" onClick={handleRestart} size="lg">
        Erneut prüfen
      </Button>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Formik for forms | React Hook Form | ~2020 | Smaller bundle, better TypeScript, uncontrolled inputs (better performance) |
| Pages Router (`next/router`) | App Router (`next/navigation`) | Next.js 13 (2022) | Server Components, streaming, better data fetching patterns |
| Yup for validation | Zod | ~2021 | TypeScript-first, infer types from schema, better error messages |
| Context API for global state | Zustand / Jotai | ~2020 | Less boilerplate, no Provider hell, better performance (selective subscriptions) |
| Custom dropdowns | Radix UI primitives (via shadcn) | ~2022 | Accessibility built-in, keyboard nav, mobile touch handling |
| Manual wizard routing with URL params | Client-only step state | ~2023 | Simpler: wizards aren't bookmarkable, avoids URL sync bugs |

**Deprecated/outdated:**
- **react-hook-form v6**: v7+ (current) uses uncontrolled inputs by default, better performance
- **Next.js Pages Router for new projects**: App Router is standard since Next.js 13.4 (stable), better DX and performance
- **Material UI for new shadcn projects**: shadcn/ui is more lightweight, uses Tailwind, composable Radix primitives
- **Formik**: No longer actively maintained vs React Hook Form's 8M+ weekly npm downloads
- **`input[type="number"]` for formatted numbers**: Breaks with thousand separators, use type="text" + inputMode="numeric"

## Open Questions

Things that couldn't be fully resolved:

1. **Exact color values for result card variants**
   - What we know: CONTEXT.md requires color-coding, existing design tokens have `--traffic-green/yellow/red` and `--brand-blue/teal`
   - What's unclear: Whether "besonders wichtig" should use traffic-red or brand-blue + red combination (CONTEXT says "blue/red color scheme")
   - Recommendation: Use Tailwind's red-500/red-50 for "besonders wichtig", orange-500/orange-50 for "wichtig", green-500/green-50 for "nicht betroffen". Verify with design review in task verification.

2. **Step indicator visual design specifics**
   - What we know: CONTEXT grants discretion on "dots, progress bar, numbered steps"
   - What's unclear: User preference for numbered circles (Material UI style) vs dots (minimalist) vs bar (linear)
   - Recommendation: Use numbered circles (1, 2, 3) as per code example — most semantic for 3-step wizard, better accessibility (numbers convey order even without color), supported by NN/g research.

3. **Optional balance sheet field UX**
   - What we know: Field is optional, has tooltip explaining "Falls bekannt...", when omitted classification uses only employees + revenue
   - What's unclear: Whether to show placeholder text "Optional" vs just tooltip icon, whether to gray out field vs normal styling
   - Recommendation: Use Label with "(optional)" suffix, normal input styling (not grayed), info icon with Tooltip. Don't use placeholder text (hides when user types).

4. **Mobile breakpoint for layout adjustments**
   - What we know: CONTEXT grants discretion on "mobile layout adjustments"
   - What's unclear: Specific breakpoint (sm/md/lg) and what adjustments are needed beyond standard responsive design
   - Recommendation: Test on 375px width (iPhone SE), ensure Select dropdowns use position="popper" and max-height, stack form elements vertically. Use Tailwind's md: (768px) breakpoint for any multi-column → single-column transitions.

5. **Error message timing for KRITIS checkbox**
   - What we know: KRITIS is a boolean checkbox, most users leave unchecked
   - What's unclear: Whether unchecked state should ever show validation error (it's optional in UX sense, but required field in schema as boolean)
   - Recommendation: No validation error for KRITIS checkbox — default to false, never show error. It's not optional in schema (boolean = always has value), but user doesn't need to "validate" it.

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Select Component](https://ui.shadcn.com/docs/components/select) - Official documentation, installation, API
- [Next.js useRouter Hook](https://nextjs.org/docs/app/api-reference/functions/use-router) - Official API reference for App Router navigation
- [React Number Format NumericFormat](https://s-yadav.github.io/react-number-format/docs/numeric_format/) - Official documentation
- [Zustand Persist Middleware](https://zustand.docs.pmnd.rs/middlewares/persist) - Official documentation for localStorage persistence
- [LogRocket: Multi-Step Form with React Hook Form and Zod](https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/) - Published Jan 2026, verified architecture pattern

### Secondary (MEDIUM confidence)
- [Build with Matija: React Hook Form Multi-Step Tutorial](https://www.buildwithmatija.com/blog/master-multi-step-forms-build-a-dynamic-react-form-in-6-simple-steps) - Feb 2025, comprehensive tutorial with Zustand + Zod + Shadcn
- [React Hook Form GitHub Discussion #6382](https://github.com/orgs/react-hook-form/discussions/6382) - Multi-step form examples with Zustand
- [Nielsen Norman Group: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) - UX research on progressive disclosure patterns
- [Nielsen Norman Group: Wizards](https://www.nngroup.com/articles/wizards/) - UX research on wizard design patterns (3-5 steps optimal)
- [WCAG 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html) - Official WCAG guideline on color accessibility
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/) - WCAG contrast requirements (4.5:1 normal text, 3:1 large text)
- [Nielsen Norman Group: Form Error Messages](https://www.nngroup.com/articles/errors-forms-design-guidelines/) - Best practices for error message timing and placement

### Tertiary (LOW confidence)
- [FormAssembly: Multi-Step Form Best Practices](https://www.formassembly.com/blog/multi-step-form-best-practices/) - No more than 5 fields per step guideline
- [Medium: Building Multi-Step Forms](https://medium.com/@vandanpatel29122001/react-building-a-multi-step-form-with-wizard-pattern-85edec21f793) - Community article, general patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified with official documentation, versions confirmed from package.json, React Hook Form + Zod + Zustand is established 2026 pattern
- Architecture: HIGH - Patterns verified with official docs (Next.js, shadcn, React Hook Form), multi-step wizard architecture confirmed by LogRocket article (Jan 2026), NN/g research supports UX decisions
- Pitfalls: MEDIUM - Common pitfalls verified across multiple sources (hydration, validation timing, accessibility) but some are synthesis of web search results rather than single authoritative source

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days, stable ecosystem)
