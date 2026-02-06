# Architecture Research

**Domain:** NIS2 Compliance Self-Assessment Web Tool (React + TypeScript, Vercel)
**Researched:** 2026-02-06
**Confidence:** HIGH

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BROWSER (Client-Side Only)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  Affected-   │  │  Gap         │  │  Results     │               │
│  │  ness Check  │──▶  Analysis    │──▶  Dashboard   │               │
│  │  (Step 1)    │  │  (Step 2)    │  │  (Step 3)    │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                       │
│  ┌──────┴─────────────────┴─────────────────┴───────┐               │
│  │              Zustand Assessment Store             │               │
│  │  (company profile, answers, scores, results)      │               │
│  └──────────────────────┬───────────────────────────┘               │
│                         │                                           │
│  ┌──────────────────────┴───────────────────────────┐               │
│  │           Scoring Engine (Pure Functions)          │               │
│  │  (per-category scoring, traffic lights, overall)   │               │
│  └──────────────────────┬───────────────────────────┘               │
│                         │                                           │
│  ┌──────────────────────┴───────────────────────────┐               │
│  │         NIS2 Content Data (Static JSON/TS)        │               │
│  │  (questions, categories, recommendations, i18n)    │               │
│  └──────────────────────────────────────────────────┘               │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                     VERCEL SERVERLESS                               │
│  ┌──────────────────────────────────────────────────┐               │
│  │         /api/generate-pdf                         │               │
│  │  Receives: assessment results JSON                │               │
│  │  Returns: PDF binary stream                       │               │
│  └──────────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

### Design Rationale

This architecture is deliberately simple for a 10-day build. Nearly everything runs client-side in the browser. The only server-side component is the PDF generation endpoint. There is no database, no authentication, no user accounts, and no persistent storage. All assessment data lives exclusively in browser memory during the session and is discarded when the user closes the tab.

This approach is optimal because:
- **DSGVO compliance by design**: No personal data is ever transmitted to or stored on a server
- **Zero infrastructure cost**: Static site hosting + one serverless function
- **Fast iteration**: No backend API to design, version, or maintain
- **10-day feasibility**: Eliminates entire categories of complexity (auth, sessions, data modeling)

---

## Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| **AffectedCheck** | Determines if NIS2 applies to the company. Collects sector, company size, revenue. Outputs classification (essential/important/not affected). | AssessmentStore (writes company profile + classification) |
| **GapAnalysis** | Multi-step form wizard across 10 NIS2 Art. 21(2) categories. ~50-80 questions with multiple-choice answers. | AssessmentStore (writes answers per category), NIS2Content (reads questions), ScoringEngine (triggers scoring) |
| **ResultsDashboard** | Displays overall compliance score, per-category traffic lights, prioritized recommendations. Triggers PDF download. | AssessmentStore (reads results), ScoringEngine (reads computed scores), PDF API (sends results for generation) |
| **AssessmentStore** | Single Zustand store holding all session state: company profile, classification, all answers, computed scores, current step/progress. | All UI components (read/write) |
| **ScoringEngine** | Pure TypeScript functions. Takes raw answers, produces per-category scores (0-100%), traffic light ratings (red/yellow/green), overall score, and prioritized recommendation list. | AssessmentStore (reads answers, writes scores). No side effects. |
| **NIS2Content** | Static data layer. All questions, category definitions, legal references, recommendation texts, and i18n translations. Organized as typed TypeScript objects or JSON. | GapAnalysis (reads questions), ResultsDashboard (reads recommendations), i18n system (reads translations) |
| **PDF API** | Vercel serverless function at `/api/generate-pdf`. Receives computed results as JSON POST body. Renders PDF using @react-pdf/renderer or jsPDF. Returns PDF binary. | ResultsDashboard (receives request), NIS2Content (reads report templates) |
| **i18n Layer** | react-i18next configuration with namespace-separated translation files for DE and EN. | All UI components (reads translations) |

---

## Recommended Project Structure

```
src/
├── app/                          # Application shell
│   ├── App.tsx                   # Root component, router setup
│   ├── providers.tsx             # I18nProvider, ThemeProvider wrappers
│   └── router.tsx                # Route definitions
│
├── features/                     # Feature modules (core architecture)
│   ├── affected-check/           # Step 1: Betroffenheitspruefung
│   │   ├── components/           # SectorSelect, CompanySizeForm, ClassificationResult
│   │   ├── data/                 # Sector lists, thresholds, classification logic
│   │   └── index.ts              # Public API barrel export
│   │
│   ├── gap-analysis/             # Step 2: Gap Analysis wizard
│   │   ├── components/           # QuestionCard, CategoryProgress, WizardNavigation
│   │   ├── data/                 # Question definitions per category (a-j)
│   │   ├── hooks/                # useWizardNavigation, useCategoryProgress
│   │   └── index.ts
│   │
│   ├── results/                  # Step 3: Results dashboard
│   │   ├── components/           # ScoreOverview, CategoryCard, TrafficLight, RecommendationList
│   │   ├── hooks/                # useResults
│   │   └── index.ts
│   │
│   └── pdf-report/               # PDF generation
│       ├── components/           # PDF template components (if using @react-pdf/renderer)
│       ├── api/                  # Client-side API call to /api/generate-pdf
│       └── index.ts
│
├── stores/                       # Global state
│   └── assessment-store.ts       # Single Zustand store for entire assessment
│
├── engine/                       # Scoring logic (pure functions, no React)
│   ├── scoring.ts                # Score calculation per category
│   ├── traffic-light.ts          # Threshold-based rating assignment
│   ├── recommendations.ts        # Priority-sorted recommendation generation
│   └── __tests__/                # Unit tests for scoring logic
│       ├── scoring.test.ts
│       ├── traffic-light.test.ts
│       └── recommendations.test.ts
│
├── content/                      # NIS2 legal content and question data
│   ├── categories.ts             # 10 Art. 21(2) category definitions
│   ├── questions/                # Questions per category
│   │   ├── risk-analysis.ts      # (a) Risk analysis questions
│   │   ├── incident-handling.ts  # (b) Incident handling questions
│   │   ├── business-continuity.ts # (c) Business continuity questions
│   │   ├── supply-chain.ts       # (d) Supply chain security questions
│   │   ├── acquisition.ts        # (e) Network/IS acquisition & development
│   │   ├── effectiveness.ts      # (f) Effectiveness assessment questions
│   │   ├── cyber-hygiene.ts      # (g) Cyber hygiene & training questions
│   │   ├── cryptography.ts       # (h) Cryptography questions
│   │   ├── hr-access.ts          # (i) HR security & access control
│   │   └── mfa-comms.ts          # (j) MFA & secure communications
│   ├── recommendations/          # Recommendation texts per category
│   └── legal-references.ts       # Article citations, recital references
│
├── components/                   # Shared UI components
│   ├── ui/                       # Design system primitives (Button, Card, ProgressBar, etc.)
│   ├── layout/                   # Header, Footer, PageContainer, StepIndicator
│   └── feedback/                 # LoadingSpinner, ErrorBoundary
│
├── i18n/                         # Internationalization
│   ├── config.ts                 # i18next configuration
│   └── locales/
│       ├── de/
│       │   ├── common.json       # Shared UI strings
│       │   ├── affected-check.json
│       │   ├── gap-analysis.json
│       │   ├── results.json
│       │   └── pdf.json
│       └── en/
│           ├── common.json
│           ├── affected-check.json
│           ├── gap-analysis.json
│           ├── results.json
│           └── pdf.json
│
├── lib/                          # Preconfigured libraries
│   └── api-client.ts             # Fetch wrapper for PDF API calls
│
├── types/                        # Shared TypeScript types
│   ├── assessment.ts             # CompanyProfile, Classification, Answer, Score
│   ├── nis2.ts                   # Category, Question, Recommendation
│   └── pdf.ts                    # PDFReportData
│
└── utils/                        # Shared utilities
    ├── constants.ts              # Thresholds, scoring weights
    └── helpers.ts                # Date formatting, percentage formatting

api/                              # Vercel serverless functions (project root)
└── generate-pdf.ts               # POST handler: receives results JSON, returns PDF

public/
├── locales/                      # Alternative: i18n files served statically
└── assets/                       # Logo, favicon, OG images
```

### Structure Rationale

- **`features/`**: Each of the three main steps (affected-check, gap-analysis, results) is a self-contained module. Components, data, and hooks that belong to a feature stay together. This makes the codebase navigable and prevents cross-contamination.
- **`engine/`**: The scoring logic is deliberately isolated from React. These are pure TypeScript functions with no UI dependencies. This makes them trivially testable and reusable (the same functions can run on client or in the PDF API if needed).
- **`content/`**: All NIS2 legal content lives in one place, separate from UI. Questions, categories, and recommendations are typed TypeScript objects (not hardcoded in components). This enables easy editing, review by legal experts, and future CMS migration.
- **`stores/`**: A single Zustand store rather than per-feature stores. The assessment is one continuous flow; splitting state across stores adds unnecessary coordination complexity.
- **`i18n/locales/`**: Namespace-separated JSON files (one per feature per language). This keeps translation files manageable and allows translators to work on one section at a time.
- **`api/`** at project root: Vercel convention for serverless functions. Single file, single purpose.

---

## Data Flow

### Complete Assessment Flow

```
User lands on page
    │
    ▼
[AffectedCheck] ─── User selects sector, company size, revenue
    │
    ▼
AssessmentStore.setCompanyProfile({ sector, size, revenue })
    │
    ▼
ClassificationEngine.classify(profile) ─── Determines: essential | important | not-affected
    │
    ▼
AssessmentStore.setClassification(result)
    │
    ├─── If "not-affected" ──▶ Show "NIS2 does not apply" result page (END)
    │
    ▼
[GapAnalysis Wizard] ─── Category by category (a through j)
    │
    │   For each category:
    │   ┌──────────────────────────────────────────────────┐
    │   │  1. Load questions from content/questions/       │
    │   │  2. User answers each question                   │
    │   │  3. AssessmentStore.setAnswer(categoryId, qId, value)  │
    │   │  4. On category complete: ScoringEngine.scoreCategory() │
    │   │  5. AssessmentStore.setCategoryScore(categoryId, score) │
    │   │  6. Navigate to next category                    │
    │   └──────────────────────────────────────────────────┘
    │
    ▼
All categories complete
    │
    ▼
ScoringEngine.computeOverall(allCategoryScores) ─── Weighted average
    │
    ▼
ScoringEngine.assignTrafficLights(categoryScores) ─── Thresholds: <40% red, 40-70% yellow, >70% green
    │
    ▼
ScoringEngine.generateRecommendations(scores, classification) ─── Priority-sorted list
    │
    ▼
AssessmentStore.setResults({ overallScore, trafficLights, recommendations })
    │
    ▼
[ResultsDashboard] ─── Displays everything from store
    │
    ├─── User clicks "Download PDF"
    │       │
    │       ▼
    │    POST /api/generate-pdf  { results, companyProfile, classification, i18n locale }
    │       │
    │       ▼
    │    Serverless function renders PDF ─── Returns binary
    │       │
    │       ▼
    │    Browser downloads file
    │
    └─── User can go back and change answers (store preserves state)
```

### State Management

**Single Zustand Store** -- recommended over useReducer, Context, or Redux for this use case.

Rationale:
- Zustand is lightweight (~1KB), has zero boilerplate, and requires no Provider wrapping
- Assessment state is genuinely global (every feature reads/writes it)
- Zustand devtools integration helps debug multi-step state
- No persistence needed (session-only), so no middleware complexity

```typescript
// stores/assessment-store.ts

interface AssessmentState {
  // Step 1: Company Profile
  companyProfile: CompanyProfile | null;
  classification: Classification | null;

  // Step 2: Gap Analysis
  currentCategoryIndex: number;
  currentQuestionIndex: number;
  answers: Record<CategoryId, Record<QuestionId, AnswerValue>>;

  // Step 3: Results (computed)
  categoryScores: Record<CategoryId, CategoryScore>;
  overallScore: number | null;
  trafficLights: Record<CategoryId, TrafficLight>;
  recommendations: Recommendation[];

  // Navigation
  currentStep: 'affected-check' | 'gap-analysis' | 'results';

  // Actions
  setCompanyProfile: (profile: CompanyProfile) => void;
  setClassification: (classification: Classification) => void;
  setAnswer: (categoryId: CategoryId, questionId: QuestionId, value: AnswerValue) => void;
  setCategoryScore: (categoryId: CategoryId, score: CategoryScore) => void;
  setResults: (results: AssessmentResults) => void;
  goToStep: (step: AssessmentState['currentStep']) => void;
  resetAssessment: () => void;
}
```

**Key design decisions:**

1. **Answers stored as nested Record**: `answers[categoryId][questionId] = value`. Enables O(1) lookup when re-visiting questions and clean per-category extraction for scoring.

2. **Scores computed on category completion, not on every answer change**: Avoids unnecessary recalculation. The scoring engine runs once per category transition and once at the end for the overall score.

3. **No localStorage persistence**: The project spec says "all assessment data stays in browser memory during session." No Zustand `persist` middleware. Data is ephemeral by design (DSGVO compliance).

4. **Actions co-located in store**: Zustand supports this natively. No separate action creators or dispatchers needed.

---

## Architectural Patterns

### Pattern 1: Content-Driven Assessment

**What:** All assessment questions, scoring weights, thresholds, and recommendation texts are defined as structured data in `content/`, not hardcoded in components. The UI is a generic renderer that reads this data.

**When to use:** Always, for any assessment/quiz-type application.

**Trade-offs:** Slightly more upfront effort to define data schemas, but dramatically easier to modify content without touching UI code.

**Example:**

```typescript
// content/categories.ts
export const NIS2_CATEGORIES: Category[] = [
  {
    id: 'risk-analysis',
    articleRef: 'Art. 21(2)(a)',
    titleKey: 'gap-analysis.categories.risk-analysis.title', // i18n key
    descriptionKey: 'gap-analysis.categories.risk-analysis.description',
    weight: 1.0,  // relative weight for overall score
    questionCount: 6,
  },
  // ... 9 more categories
];

// content/questions/risk-analysis.ts
export const RISK_ANALYSIS_QUESTIONS: Question[] = [
  {
    id: 'ra-01',
    categoryId: 'risk-analysis',
    textKey: 'gap-analysis.questions.ra-01.text',
    helpTextKey: 'gap-analysis.questions.ra-01.help',
    answerType: 'scale',  // 'scale' | 'yes-no' | 'multiple-choice'
    options: [
      { value: 0, labelKey: 'gap-analysis.scale.not-implemented' },
      { value: 1, labelKey: 'gap-analysis.scale.partially' },
      { value: 2, labelKey: 'gap-analysis.scale.mostly' },
      { value: 3, labelKey: 'gap-analysis.scale.fully' },
    ],
    maxScore: 3,
    legalRef: 'Art. 21(2)(a), Recital 79',
  },
  // ... more questions
];
```

### Pattern 2: Pure Scoring Engine

**What:** All scoring, traffic light assignment, and recommendation generation are pure functions with no React or UI dependencies. Input: answers + weights. Output: scores + ratings + recommendations. Deterministic, side-effect-free.

**When to use:** Whenever business logic must be testable independently of UI.

**Trade-offs:** Requires discipline to keep UI logic out of the engine. But testing is trivial (no mocking, no rendering).

**Example:**

```typescript
// engine/scoring.ts
export function scoreCategory(
  answers: Record<QuestionId, AnswerValue>,
  questions: Question[]
): CategoryScore {
  const maxPossible = questions.reduce((sum, q) => sum + q.maxScore, 0);
  const achieved = questions.reduce((sum, q) => {
    const answer = answers[q.id];
    return sum + (answer ?? 0);
  }, 0);

  return {
    achieved,
    maxPossible,
    percentage: maxPossible > 0 ? (achieved / maxPossible) * 100 : 0,
  };
}

// engine/traffic-light.ts
export function assignTrafficLight(percentage: number): TrafficLight {
  if (percentage < 40) return 'red';
  if (percentage < 70) return 'yellow';
  return 'green';
}

// engine/recommendations.ts
export function generateRecommendations(
  scores: Record<CategoryId, CategoryScore>,
  classification: Classification,
  allRecommendations: RecommendationTemplate[]
): Recommendation[] {
  return allRecommendations
    .filter(rec => scores[rec.categoryId].percentage < rec.threshold)
    .sort((a, b) => a.priority - b.priority)
    .map(rec => ({
      ...rec,
      urgency: classification === 'essential' ? 'high' : 'medium',
    }));
}
```

### Pattern 3: Wizard State Machine

**What:** The multi-step form wizard is modeled as a simple state machine. The current position (step + category + question) determines what UI renders. Navigation is controlled through store actions, not React Router.

**When to use:** For any linear multi-step flow where steps have dependencies.

**Trade-offs:** Slightly more complex than a simple counter, but handles edge cases (skipping, going back, conditional steps) cleanly.

**Example:**

```typescript
// features/gap-analysis/hooks/useWizardNavigation.ts
export function useWizardNavigation() {
  const {
    currentCategoryIndex,
    currentQuestionIndex,
    answers,
    setAnswer,
  } = useAssessmentStore();

  const categories = NIS2_CATEGORIES;
  const currentCategory = categories[currentCategoryIndex];
  const questions = getQuestionsForCategory(currentCategory.id);
  const currentQuestion = questions[currentQuestionIndex];

  const canGoNext = answers[currentCategory.id]?.[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isLastCategory = currentCategoryIndex === categories.length - 1;

  const goNext = () => {
    if (isLastQuestion && isLastCategory) {
      // Compute final results, navigate to results page
      computeAndStoreResults();
    } else if (isLastQuestion) {
      // Move to next category, reset question index
      goToCategory(currentCategoryIndex + 1);
    } else {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  const goPrev = () => { /* mirror logic */ };

  return { currentCategory, currentQuestion, canGoNext, goNext, goPrev, progress };
}
```

---

## Data Flow for Key Interactions

### 1. Affectedness Determination

```
User selects sector (e.g., "Energie") → User enters employee count (e.g., 120) → User enters revenue (e.g., 15M EUR)
    │
    ▼
ClassificationEngine checks:
  - Is sector in NIS2 Annex I (essential) or Annex II (important)?
  - Does company meet size thresholds? (>50 employees OR >10M revenue = in scope)
  - Micro/small enterprises generally excluded
    │
    ▼
Result: { isAffected: true, classification: 'important', sector: 'Energie' }
```

### 2. Answer Persistence and Category Scoring

```
User answers question ra-01 with value 2 ("mostly implemented")
    │
    ▼
store.setAnswer('risk-analysis', 'ra-01', 2)
    │
    ▼
answers = {
  'risk-analysis': {
    'ra-01': 2,
    'ra-02': 1,
    // ...
  }
}
    │
    ▼ (on category completion)
scoreCategory(answers['risk-analysis'], RISK_ANALYSIS_QUESTIONS)
    │
    ▼
{ achieved: 12, maxPossible: 18, percentage: 66.7 }
    │
    ▼
assignTrafficLight(66.7) → 'yellow'
```

### 3. PDF Generation

```
User clicks "Download PDF Report"
    │
    ▼
Client collects from store: { companyProfile, classification, categoryScores, overallScore, trafficLights, recommendations, locale }
    │
    ▼
POST /api/generate-pdf with JSON body
    │
    ▼
Serverless function:
  1. Validates input (Zod schema)
  2. Builds PDF structure (report title, company info, per-category results, recommendations)
  3. Renders PDF using jsPDF (programmatic) or @react-pdf/renderer (React components)
  4. Returns PDF as binary stream (Content-Type: application/pdf)
    │
    ▼
Client receives blob → triggers browser download
```

---

## PDF Generation Strategy

**Recommendation: jsPDF for the serverless function.**

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| **jsPDF (server-side)** | Lightweight, no browser needed, fast, reliable on Vercel | Programmatic API (no HTML templates), manual layout | **Recommended** |
| **@react-pdf/renderer** | React components for PDF, elegant API | Known compatibility issues with Vercel serverless, heavier bundle | Backup option |
| **Puppeteer + Chromium** | Pixel-perfect HTML-to-PDF | Requires @sparticuz/chromium (~50MB), cold start 3-5s, timeout risk | Avoid for 10-day build |
| **Client-side jsPDF** | No server needed at all | Limited styling, html2canvas quality issues, user device dependent | Fallback if API fails |

**Build order implication:** Start with client-side jsPDF as a quick fallback, then implement server-side jsPDF for better quality. This means the PDF feature is never blocked.

---

## i18n Content Organization

**Approach:** react-i18next with namespace separation.

```
i18n/locales/
├── de/
│   ├── common.json            # "Weiter", "Zurueck", "Herunterladen", nav items
│   ├── affected-check.json    # Sector names, size labels, result messages
│   ├── gap-analysis.json      # Question texts, answer scale labels, category names
│   ├── results.json           # Score labels, recommendation texts, traffic light meanings
│   └── pdf.json               # PDF report headings, footer text, disclaimer
└── en/
    ├── common.json
    ├── affected-check.json
    ├── gap-analysis.json
    ├── results.json
    └── pdf.json
```

**NIS2 Legal Content vs. UI Text:**

The NIS2 legal content (question texts, legal references, recommendation details) is part of the i18n files, NOT separate. Reason: these texts must be translated too, and keeping them in i18n files means the same translation workflow handles both UI chrome and legal content.

The question *structure* (IDs, scoring weights, answer types) lives in `content/` as TypeScript. The question *text* (what users read) lives in `i18n/locales/` as JSON.

```typescript
// content/questions/risk-analysis.ts — structure only
{ id: 'ra-01', textKey: 'gap-analysis.questions.ra-01.text', maxScore: 3 }

// i18n/locales/de/gap-analysis.json — human-readable text
{
  "questions": {
    "ra-01": {
      "text": "Verfuegt Ihr Unternehmen ueber eine dokumentierte Richtlinie zur Risikoanalyse?",
      "help": "Gemaess Art. 21(2)(a) NIS2..."
    }
  }
}
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hardcoding Questions in Components

**What people do:** Put question text, answer options, and scoring logic directly inside React components.
**Why it's wrong:** Makes content changes require developer intervention. Makes translation impossible. Makes testing scoring logic coupled to UI rendering.
**Do this instead:** Content-driven architecture. Components render data from `content/` and `i18n/`. Scoring engine operates on typed data structures.

### Anti-Pattern 2: Per-Question State with useState

**What people do:** Use `useState` in each question component, then try to aggregate answers later.
**Why it's wrong:** State is scattered. Going back to a previous question loses answers. Computing scores requires prop-drilling or complex lifting.
**Do this instead:** Single Zustand store. Every answer writes to `store.answers[categoryId][questionId]`. Components read from and write to the store directly.

### Anti-Pattern 3: Puppeteer for PDF in a 10-Day Build

**What people do:** Reach for Puppeteer because it produces pixel-perfect PDFs from HTML.
**Why it's wrong:** Puppeteer on Vercel requires @sparticuz/chromium (~50MB), has cold start issues (3-5 seconds), and adds significant debugging complexity. The 10-day timeline does not leave room for wrestling with serverless Chromium.
**Do this instead:** Use jsPDF with programmatic layout. Less visually fancy, but reliable, fast, and deployable without binary dependencies.

### Anti-Pattern 4: Router-Based Wizard Navigation

**What people do:** Use React Router with `/question/1`, `/question/2`, etc. for wizard steps.
**Why it's wrong:** URL-based navigation creates edge cases (what if user types URL directly? bookmarks mid-assessment? refreshes?). Assessment state is ephemeral and should not be URL-addressable.
**Do this instead:** Use store-driven navigation. React Router handles only the three main routes (`/check`, `/assessment`, `/results`). Within each route, the wizard position comes from Zustand state.

### Anti-Pattern 5: Over-Engineering the Scoring System

**What people do:** Build complex weighted scoring with ML-style normalization, custom algorithms, and dynamic recalibration.
**Why it's wrong:** For a compliance readiness check, the scoring needs to be *transparent and auditable*, not clever. Users must understand why they got a certain score. Regulatory context demands simplicity.
**Do this instead:** Simple percentage-based scoring. Each question has a max score. Category score = sum of answers / sum of max scores. Traffic lights at fixed thresholds (e.g., <40% red, 40-70% yellow, >70% green). Document the formula on the results page.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users/month | Current architecture is perfect. Static site + one serverless function. Zero concerns. |
| 1k-10k users/month | Still fine. Vercel handles static + serverless scaling automatically. Consider caching PDF generation if identical inputs produce identical PDFs. |
| 10k+ users/month | Consider moving PDF generation to a dedicated service (e.g., AWS Lambda with higher timeout). Add analytics (privacy-respecting, e.g., Plausible). The static frontend scales infinitely. |

### Scaling Priorities

1. **First bottleneck (unlikely):** PDF generation serverless function cold starts under high concurrent load. Mitigation: Vercel's automatic scaling handles this, but monitor function duration.
2. **Second bottleneck (very unlikely):** Bundle size if content grows significantly. Mitigation: Code-split the gap-analysis feature (lazy load category question sets).

Given the use case (self-assessment tool for German SMEs), traffic volumes will likely stay well within the 0-1k range. Over-engineering for scale would violate the 10-day constraint.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel (hosting) | Static deployment + serverless functions | Zero-config for Vite/React apps. `vercel.json` for function configuration. |
| Vercel Serverless (PDF) | HTTP POST endpoint at `/api/generate-pdf` | Max 10s default timeout (extendable to 60s on free tier). Keep PDF generation fast. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| UI Components <-> AssessmentStore | Direct Zustand hooks (`useAssessmentStore()`) | Components subscribe to specific slices to avoid unnecessary re-renders |
| UI Components <-> i18n | `useTranslation('namespace')` hook | Namespace prevents loading unused translations |
| AssessmentStore <-> ScoringEngine | Store actions call engine functions | Engine is imported as pure functions, not injected |
| ResultsDashboard <-> PDF API | HTTP POST with JSON body | API is stateless; all data must be included in the request |
| Content Data <-> i18n | Content objects reference i18n keys | Structure in TS, text in JSON -- clean separation |

---

## Suggested Build Order

The build order follows dependency chains. Each phase produces testable, demonstrable output.

### Phase 1: Foundation (Days 1-2)
**Build:** Project setup, shared UI components, Zustand store skeleton, i18n configuration, routing shell.

**Rationale:** Everything depends on these. The store shape defines what all features read/write. The i18n setup must be in place before any user-facing text is written. Shared components (Button, Card, ProgressBar) are used everywhere.

**Deliverable:** App skeleton that renders three empty pages with working navigation, language switcher, and styled layout.

### Phase 2: NIS2 Content + Scoring Engine (Days 2-3)
**Build:** Category definitions, question data structures, scoring functions, traffic light logic, recommendation templates, TypeScript types for all domain objects.

**Rationale:** This is the "brains" of the application and has zero UI dependency. Building and testing it early means the hardest domain-specific work is done before any UI complexity enters. Every subsequent feature consumes this content.

**Deliverable:** Full test suite for scoring engine. All 10 categories with questions defined. `npm test` passes with 100% coverage on engine/.

### Phase 3: Affected Check (Days 3-4)
**Build:** Step 1 UI -- sector selection, company size input, revenue input, classification logic, result display.

**Rationale:** This is the simplest feature (fewest questions, clearest logic) and the entry point of the user flow. Getting it working end-to-end (input -> classification -> store -> conditional routing) validates the architecture.

**Deliverable:** User can complete Step 1 and see whether NIS2 applies to them.

### Phase 4: Gap Analysis Wizard (Days 4-7)
**Build:** Multi-step form wizard, question rendering, answer capture, category navigation, progress indicator, per-category scoring on completion.

**Rationale:** This is the largest and most complex feature. It depends on Phase 2 (content) and Phase 1 (store, components). Budget 3-4 days because the wizard navigation, question rendering variety (scale, yes/no, multiple-choice), and progress tracking all require careful implementation.

**Deliverable:** User can walk through all 10 categories, answer questions, see progress, navigate back and forth. Scores are computed and stored.

### Phase 5: Results Dashboard (Days 7-8)
**Build:** Overall score display, per-category traffic light cards, recommendation list, data visualization (simple bar chart or progress bars).

**Rationale:** Depends on Phase 4 (scores must exist in store). Relatively straightforward rendering of computed data.

**Deliverable:** User sees their full results after completing the assessment.

### Phase 6: PDF Report (Days 8-9)
**Build:** Serverless function for PDF generation, PDF template/layout, download button integration.

**Rationale:** Depends on Phase 5 (results data shape must be finalized). PDF is the last feature because it is the least architecturally risky -- if the serverless approach fails, a client-side jsPDF fallback can be implemented in hours.

**Deliverable:** User can download a professional PDF report of their assessment.

### Phase 7: Polish + Legal + Deploy (Days 9-10)
**Build:** Legal disclaimer text, Impressum/Datenschutz pages, responsive design fixes, cross-browser testing, SEO meta tags, Vercel production deployment, final i18n review.

**Rationale:** Last because polish depends on all features being functional. Legal pages are content-only (no logic). Deployment is the final gate.

**Deliverable:** Production-ready application live on Vercel.

### Dependency Graph

```
Phase 1 (Foundation)
    │
    ├──▶ Phase 2 (Content + Engine)
    │       │
    │       ├──▶ Phase 3 (Affected Check)
    │       │       │
    │       │       └──▶ Phase 4 (Gap Analysis Wizard)
    │       │               │
    │       │               └──▶ Phase 5 (Results Dashboard)
    │       │                       │
    │       │                       └──▶ Phase 6 (PDF Report)
    │       │                               │
    │       │                               └──▶ Phase 7 (Polish + Deploy)
    │       │
    │       └── (Engine tests can run in parallel from Day 2 onward)
    │
    └── (i18n files can be filled in parallel from Day 2 onward)
```

**Critical path:** Phase 1 -> Phase 2 -> Phase 4 (wizard is the bottleneck). If Phase 4 takes longer than planned, Phase 6 (PDF) is the first candidate for scope reduction (ship with client-side-only PDF or defer PDF to post-launch).

---

## Sources

- [Bulletproof React - Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) -- Feature-based folder organization pattern (HIGH confidence)
- [React Hook Form Multi-Step Tutorial: Zustand + Zod + Shadcn](https://www.buildwithmatija.com/blog/master-multi-step-forms-build-a-dynamic-react-form-in-6-simple-steps) -- Zustand + Zod for multi-step forms (MEDIUM confidence)
- [State Management in React (2026)](https://www.c-sharpcorner.com/article/state-management-in-react-2026-best-practices-tools-real-world-patterns/) -- Current state management best practices (MEDIUM confidence)
- [NIS2 Directive Article 21](https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html) -- Official NIS2 Art. 21(2) measures reference (HIGH confidence)
- [NIS2 10 Minimum Measures](https://www.goodaccess.com/blog/nis2-10-minimum-cybersecurity-risk-management-measures) -- Detailed breakdown of Art. 21(2)(a-j) (MEDIUM confidence)
- [How to generate PDFs with Puppeteer on Vercel](https://dev.to/travisbeck/how-to-generate-pdfs-with-puppeteer-on-vercel-in-2024-1dm2) -- Puppeteer/Vercel compatibility challenges (MEDIUM confidence)
- [jsPDF - npm](https://www.npmjs.com/package/jspdf) -- Client/server PDF generation without binary deps (HIGH confidence)
- [react-i18next TypeScript Integration](https://www.i18next.com/overview/typescript) -- Official i18next TypeScript configuration (HIGH confidence)
- [EUR-Lex NIS2 Directive Full Text](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022L2555) -- Official EU directive text (HIGH confidence)

---

*Architecture research for: NIS2 Compliance Self-Assessment Web Tool*
*Researched: 2026-02-06*
