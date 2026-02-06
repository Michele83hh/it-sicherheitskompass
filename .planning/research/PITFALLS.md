# Pitfalls Research

**Domain:** NIS2 Compliance Self-Assessment Web Tool (React/TypeScript, German SMEs)
**Researched:** 2026-02-06
**Confidence:** HIGH

---

## Critical Pitfalls

### Pitfall 1: Wrong NIS2 Sector Classification Logic

**What goes wrong:**
The Betroffenheitsprüfung uses incorrect sector-to-entity-type mapping. For example: classifying a company with 200 employees in Anhang 2 sector as "besonders wichtige Einrichtung" (essential entity) when Anhang 2 sectors can only produce "wichtige Einrichtungen" (important entities) regardless of size. Or missing the special cases (qTSP, TLD registries, DNS providers, telco providers) that are always "besonders wichtig" regardless of size thresholds.

**Why it happens:**
The classification logic has two independent dimensions (sector type from Anlage 1/2 BSIG + company size) plus special-case overrides. Developers who read the EU Directive but not the German NIS2UmsG (new BSIG) may use the EU thresholds instead of the German-specific ones. The size thresholds are also confusing: 50+ employees OR 10M+ EUR turnover for "wichtig", but 250+ employees OR (50M+ EUR turnover AND 43M+ EUR balance) for "besonders wichtig" in Anlage 1 sectors. The OR/AND logic is easy to get wrong.

**How to avoid:**
- Map classification logic directly from BSI's own Entscheidungsbaum (decision tree PDF, publicly available)
- Use the official BSI Betroffenheitsprüfung at betroffenheitspruefung-nis-2.bsi.de as reference implementation -- run 10+ test scenarios through both tools and compare results
- Implement classification as a pure function with exhaustive unit tests covering: each Anlage 1 sector at both size tiers, each Anlage 2 sector, every special case entity type, edge cases at exact thresholds (49 vs 50 employees, 9.99M vs 10M turnover)
- Store thresholds as constants, not hardcoded in conditionals

**Warning signs:**
- No unit tests for classification logic
- Classification function has more than 3 nested if-statements without clear sector/size separation
- No reference to specific BSIG paragraph numbers (§28 Abs. 1 and 2) in code comments or data

**Phase to address:**
Phase 1 (Foundation) -- this is the core data model, everything else depends on it being correct.

---

### Pitfall 2: Outdated or Incorrect Legal References

**What goes wrong:**
The tool references NIS2 EU Directive Article numbers (Art. 21) but not the corresponding German law paragraphs (§30 BSIG), or vice versa. Even worse: referencing draft NIS2UmsG paragraph numbers that changed in the final version published December 5, 2025 (BGBl. 2025 I Nr. 301). The German implementation restructured paragraph numbering significantly during the legislative process.

**Why it happens:**
Most online resources about NIS2UmsG were written before the final law was published. Blog posts from 2024 and early 2025 reference draft versions. The final BSIG has: §28 (Registrierung), §30 (Risikomanagement), §31 (besondere Anforderungen KRITIS), §32 (Meldepflichten), §33 (Registrierungspflicht), §38 (Umsetzungs-/Schulungspflicht Geschäftsleitung). Copying from outdated sources is the default mistake.

**How to avoid:**
- Use ONLY the published law text from recht.bund.de (BGBl. 2025 I Nr. 301) as primary source
- Cross-reference every paragraph number against the official BSI website (bsi.bund.de NIS-2 section, updated post-publication)
- Create a reference mapping table: EU Art. 21(2)(a)-(j) to §30 Abs. 2 Nr. 1-10 BSIG to BSI IT-Grundschutz module
- Store all legal references in a central constants file, not scattered across components
- Add a "Rechtsstand" (legal status date) to the tool's footer and PDF report

**Warning signs:**
- References to "NIS2UmsuCG" (draft name) instead of "NIS2UmsG" (could be either -- verify which name the final law uses)
- Article/paragraph numbers that do not match recht.bund.de
- No date stamp on legal references
- Mixing EU Directive article numbers with German paragraph numbers without clear labeling

**Phase to address:**
Phase 1 (Foundation) -- legal reference accuracy is a non-negotiable data quality issue. Create the reference mapping before writing any questions.

---

### Pitfall 3: Meaningless Scoring Methodology

**What goes wrong:**
The gap analysis produces a percentage score (e.g., "72% NIS2-compliant") that has no basis in the actual regulatory requirements. NIS2 does not define compliance as a percentage. A company can score 90% but have zero incident response capability, which alone means non-compliance. Equally bad: all 10 measures weighted equally when some (like incident reporting, §32 BSIG: 24h/72h/30d) have hard legal deadlines and others are more flexible.

**Why it happens:**
Percentage scores feel intuitive and look professional. But NIS2 Art. 21 requires ALL measures proportionally -- it is not a "pick 7 out of 10" framework. Developers default to simple averaging because weighted scoring requires domain expertise they may not have.

**How to avoid:**
- Use maturity levels per measure (0-3 scale: Not implemented / Partially / Largely / Fully) instead of or alongside percentage
- Display per-measure traffic lights (Red/Yellow/Green) as the PRIMARY result, not an overall percentage
- If showing an overall score, make clear it is an "Orientierungswert" (orientation value), not a compliance determination
- Weight measures based on regulatory severity: incident reporting (§32) and risk management (§30) carry mandatory deadlines and explicit fine references -- flag these as critical
- Never label a result as "NIS2-compliant" or "NIS2-konform" -- use "Readiness" or "Reifegrad" (maturity level) language instead
- Add a prominent note: "Ein hoher Score bedeutet nicht automatisch NIS2-Konformität. Jede einzelne Maßnahme muss angemessen umgesetzt sein."

**Warning signs:**
- Single overall percentage displayed prominently without per-measure breakdown
- No explanation of how the score is calculated
- Score labeled as "Compliance-Score" rather than "Readiness-Score" or "Reifegrad"
- All 10 measures contribute equally to the total

**Phase to address:**
Phase 2 (Core Logic) -- scoring methodology must be defined before building the results UI. Validate with the ENISA Technical Implementation Guidance (published 2025) which uses a 0-3 maturity scale.

---

### Pitfall 4: Missing or Inadequate Legal Disclaimers

**What goes wrong:**
The tool outputs results that could be interpreted as legal advice ("You are NIS2-compliant" or "You are not affected"). Without proper disclaimers, this creates liability risk. Under German law (Rechtsdienstleistungsgesetz, RDG), providing individual legal assessments without authorization is prohibited. A tool that says "Sie sind nicht betroffen" could cause a company to skip registration and face fines up to 10M EUR.

**Why it happens:**
Disclaimers feel like afterthought boilerplate. Developers focus on functionality and add a small footer link. But for a compliance tool targeting German businesses in a regulated domain, the disclaimer is not optional decoration -- it is a legal necessity.

**How to avoid:**
- Display disclaimer BEFORE the user starts the assessment (not just in footer)
- Include in every PDF report on the first page
- Required disclaimers in German (minimum):
  1. "Dieses Tool stellt keine Rechtsberatung dar und ersetzt keine individuelle rechtliche Prüfung."
  2. "Das Ergebnis ist eine unverbindliche Orientierungshilfe und rechtlich nicht bindend."
  3. "Bei Unsicherheiten empfehlen wir die Konsultation eines spezialisierten Rechtsanwalts oder IT-Sicherheitsberaters."
  4. "Rechtsstand: [Datum]. Änderungen der Gesetzeslage können die Ergebnisse beeinflussen."
  5. "Dieses Tool erhebt und speichert keine personenbezogenen Daten."
- Mirror the BSI's own disclaimer language: "dient lediglich als Orientierungshilfe und Ihr Ergebnis ist rechtlich nicht bindend"
- Do NOT use phrases like "Sie sind NIS2-konform" or "Sie müssen sich nicht registrieren" -- use conditional language: "Basierend auf Ihren Angaben deutet das Ergebnis darauf hin, dass..."

**Warning signs:**
- No disclaimer visible before starting the assessment
- Results page uses definitive language ("Sie sind betroffen" vs. "Ihre Angaben deuten auf eine Betroffenheit hin")
- PDF report has no disclaimer section
- No "Rechtsstand" date visible anywhere

**Phase to address:**
Phase 1 (Foundation) -- disclaimer text and placement must be defined as part of the wireframe/layout before any UI is built. Legal language should be in the i18n files from day one.

---

### Pitfall 5: PDF Generation Fails on Production

**What goes wrong:**
PDF works locally but fails on Vercel serverless functions due to: (a) cold start timeout (Hobby plan = 10s max execution), (b) missing system fonts in serverless environment, (c) bundle size too large for serverless limits, (d) html2canvas/jsPDF producing image-based PDFs that are blurry, non-searchable, and unprofessional. The PDF is the main deliverable -- if it looks bad or fails to generate, the entire tool loses credibility.

**Why it happens:**
Client-side PDF via html2canvas+jsPDF renders the DOM as a screenshot-to-PDF, producing non-searchable raster images. Server-side via @react-pdf/renderer or puppeteer requires careful configuration for serverless environments. Font embedding (especially for German Umlauts) requires explicit font registration. Developers test locally where everything works and discover problems only after deployment.

**How to avoid:**
- Use @react-pdf/renderer for server-side PDF generation -- it creates real text PDFs (searchable, selectable, small file size)
- Register fonts explicitly including full Unicode/Umlaut support (use a font like Inter or Noto Sans that covers German characters)
- Test PDF generation on Vercel early (Phase 2, not Phase 4) -- deploy a minimal endpoint that generates a test PDF
- Keep the serverless function lean: no puppeteer, no Chrome, no html2canvas
- Set realistic expectations for PDF layout -- @react-pdf/renderer uses its own layout engine (Yoga), not CSS Flexbox/Grid
- Implement client-side fallback: if server PDF fails, generate a simpler client-side PDF or offer print-to-PDF
- Vercel Hobby plan: 10s timeout, 50MB function size, 1024MB memory -- verify PDF generation fits within these limits
- Consider generating the PDF data structure client-side and only using the serverless function for the actual PDF rendering

**Warning signs:**
- PDF generation not tested on deployed environment until the last day
- Using html2canvas for anything other than quick prototyping
- No font files included in the serverless function bundle
- PDF file size exceeds 5MB (indicates image-based rendering)
- German Umlauts (ä, ö, ü, ß) appear as boxes or question marks in PDF

**Phase to address:**
Phase 2 (Core Logic) -- set up a working PDF endpoint on Vercel immediately. Do not leave PDF for the end.

---

### Pitfall 6: i18n Done as Afterthought Breaks Layout

**What goes wrong:**
German text is on average 30% longer than English. Buttons that say "Next" become "Weiter" (fine), but "Submit Assessment" becomes "Bewertung abschicken" (breaks button width). Headers, form labels, error messages, and PDF content all expand. Worse: hardcoded strings scattered across components instead of translation files, making the English version incomplete or inconsistent.

**Why it happens:**
Developers build in one language first (usually English) and "add German later." By that point, all layouts are tuned for English string lengths. Retrofitting i18n into existing components is 3-5x more work than building it in from the start.

**How to avoid:**
- Set up react-i18next (or next-intl) in Phase 1 before writing ANY user-facing text
- Create translation files (de.json, en.json) with the first component
- Build German-first: since German is longer, layouts that work in German will also work in English (not vice versa)
- Use CSS that accommodates text expansion: avoid fixed-width buttons, use min-width, allow text wrapping
- For the PDF: test with German text first (longest variant)
- Include legal/disclaimer text in translation files -- these are often the longest strings
- Use ICU message format for pluralization (German has different plural rules than English)
- Do NOT concatenate translated strings: `t('hello') + ' ' + name` breaks in languages with different word order

**Warning signs:**
- Any hardcoded German or English string in a .tsx file (should all be t('key') calls)
- Buttons with fixed pixel widths
- No translation files exist after Phase 1
- PDF template only tested in one language

**Phase to address:**
Phase 1 (Foundation) -- i18n setup is part of project scaffolding, not a feature to add later.

---

### Pitfall 7: Assessment Takes Too Long / Users Abandon

**What goes wrong:**
The gap analysis covering all 10 Art. 21(2) measures requires substantial questioning. If each measure has 5-8 questions, that is 50-80 questions total. Users abandon long assessments -- research shows completion rates drop 15-20% for each question beyond 12. A 15-20 minute target (per PROJECT.md) means roughly 3-5 questions per measure maximum.

**Why it happens:**
Domain experts (and thorough developers) want comprehensive coverage. Each NIS2 measure has multiple sub-requirements. The temptation is to ask about every sub-requirement, producing a 100+ question survey that no SME will complete.

**How to avoid:**
- Cap at 3-4 questions per measure = 30-40 questions total for gap analysis
- Add a progress indicator showing "Bereich 3 von 10 -- Aufrechterhaltung des Betriebs"
- Use smart question design: one question can cover multiple sub-requirements with a maturity-level answer (e.g., "Wie ist Ihr Backup-Management organisiert?" with options from "Kein systematisches Backup" to "Automatisierte, getestete Backups mit dokumentiertem Recovery-Plan")
- Allow skipping sections with "Keine Angabe" option (marks as Red/unbewertet)
- Show estimated time remaining ("Noch ca. 8 Minuten")
- Save progress in localStorage so users can continue later (browser-only, no server storage)
- Split into clear sections with section completion indicators

**Warning signs:**
- More than 50 questions in the gap analysis
- No progress indicator
- Questions require detailed technical knowledge that SME management would not have
- No way to save and continue later
- Estimated completion time exceeds 20 minutes

**Phase to address:**
Phase 2 (Core Logic) -- question catalog and assessment flow must be designed with UX constraints in mind. Write all questions, then ruthlessly cut to 3-4 per measure.

---

### Pitfall 8: Tool Looks Like a Student Project

**What goes wrong:**
The tool technically works but visually signals "hobby project": default Material-UI styling, inconsistent spacing, no logo/branding, placeholder text visible, lorem ipsum in corners, broken mobile layout, console errors in production, HTTP instead of HTTPS, no favicon, generic page title "React App". This destroys credibility for both portfolio and potential business use.

**Why it happens:**
Under time pressure (10 days), developers focus on functionality and plan to "make it pretty later." But UI polish is not a final coat of paint -- it is architecture: consistent design tokens, typography scale, spacing system, color palette. These must be decided upfront or the result is visual chaos.

**How to avoid:**
- Choose a design system in Phase 1: Tailwind CSS + headless UI components (Radix, shadcn/ui) gives professional results fastest
- Define design tokens early: 2-3 brand colors (suggest: dark blue/navy for trust + accent color), font pairing (Inter or similar professional sans-serif), spacing scale (4px base)
- Professional touches that take minutes: proper favicon, meta title "NIS2 Readiness Check", Open Graph tags, custom 404 page
- Remove ALL console.log statements before deployment
- Test on mobile early and often
- No placeholder/lorem ipsum text in production -- every string must be real content
- Use a consistent icon set (Lucide, Heroicons)
- Add subtle animations for transitions between assessment steps (not flashy, just polished)
- Include a professional footer: "NIS2 Readiness Check | Keine Rechtsberatung | Rechtsstand: [Datum] | Impressum"
- German legal requirement: Impressum is mandatory for commercial websites. Even for a portfolio piece, include one to show awareness.

**Warning signs:**
- Default React favicon (atom logo) visible in production
- Page title says "React App" or "Vite App"
- No consistent color scheme across pages
- Console errors visible in browser DevTools
- Mobile layout broken or clearly untested
- No Impressum link (German legal requirement)

**Phase to address:**
Phase 1 (Foundation) -- design system, branding, and layout structure must be part of the initial scaffold. Polish in Phase 4 (Final), but the foundation must exist from day one.

---

### Pitfall 9: Scope Creep Kills the Deadline

**What goes wrong:**
With 10 days total, adding features beyond the core scope (Betroffenheitsprüfung + Gap-Analyse + PDF) guarantees an unfinished product. Typical scope creep: adding a dashboard, implementing email reports, building an admin panel, adding charts/visualizations, creating detailed per-industry recommendations, building a comparison feature, adding user accounts "just in case."

**Why it happens:**
The developer sees what commercial NIS2 tools offer and wants to match them. Each feature seems small ("just a chart, maybe 2 hours"). But integration, testing, i18n for each feature, and edge cases multiply effort. An 80%-complete feature-rich tool is worse than a 100%-complete focused tool.

**How to avoid:**
- Treat the Out of Scope list in PROJECT.md as a hard boundary -- no exceptions without removing something else
- Define a "walking skeleton" for day 2-3: Betroffenheitsprüfung works end-to-end (input to result) with hardcoded questions
- Day 4-5: Gap analysis works end-to-end with all 10 measures
- Day 6-7: PDF generation, results page polish
- Day 8-9: i18n completion, testing, edge cases, legal review
- Day 10: Deployment, final testing, README
- If behind schedule, cut in this order: (1) English version -- German-only is fine for KMU target, (2) PDF detail level -- simpler PDF layout, (3) BSI IT-Grundschutz cross-references -- keep NIS2UmsG references only, (4) Mobile optimization -- desktop-first is acceptable for B2B
- Do NOT cut: legal disclaimers, scoring accuracy, Betroffenheitsprüfung correctness, basic professional appearance

**Warning signs:**
- Day 3 and no working prototype of either assessment flow
- Adding features not in the original requirements
- Spending more than 4 hours on any single UI component
- Perfectionism on early phases at the expense of later phases
- No deployment to Vercel before day 7

**Phase to address:**
All phases -- but specifically define go/no-go checkpoints at day 3, day 5, and day 7. If a checkpoint is missed, immediately cut scope per the priority list above.

---

### Pitfall 10: Form State Management Becomes Spaghetti

**What goes wrong:**
The assessment has two flows (Betroffenheitsprüfung, then Gap-Analyse), each with multiple steps. State must persist across steps, flow between the two assessments (Betroffenheitsprüfung result determines which Gap-Analyse questions to show), and survive page navigation. Without proper state management, bugs appear: answers lost on back-navigation, conditional questions showing wrong options, results page showing stale data.

**Why it happens:**
Developers start with useState per component, then realize they need to share state between steps. They add prop drilling, then context, then localStorage sync, ending up with state in 4 different places with no single source of truth.

**How to avoid:**
- Use a single state store (Zustand -- lightweight, TypeScript-friendly, no boilerplate) from the start
- Define the state shape as a TypeScript interface FIRST, before building any UI:
  ```typescript
  interface AssessmentState {
    step: 'eligibility' | 'gap-analysis' | 'results';
    eligibility: { sector: string; employeeCount: number; revenue: number; /* ... */ };
    eligibilityResult: { affected: boolean; entityType: 'essential' | 'important' | null; };
    gapAnalysis: Record<NIS2Measure, MeasureAnswer[]>;
    completedMeasures: NIS2Measure[];
  }
  ```
- Persist to localStorage with Zustand's persist middleware -- gives "continue later" for free
- Never store derived state (scores, traffic lights) -- compute them from answers
- Use the eligibility result to conditionally render gap analysis (if not affected, show result + recommendations to verify with a lawyer)

**Warning signs:**
- More than 2 useState hooks for assessment answers in a single component
- Assessment answers stored in component state instead of a global store
- Back button loses previously entered answers
- Results page requires re-passing all answers as URL params or props
- No TypeScript interface for the overall assessment state

**Phase to address:**
Phase 1 (Foundation) -- state management architecture is part of the project scaffold. Define the state interface before building any form components.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcode questions in components instead of data files | Faster initial development | Cannot update questions without code changes, i18n nightmare, no separation of concerns | Never -- questions must be in structured data files (JSON/TS constants) from day one |
| Skip TypeScript strict mode | Fewer type errors to fix during development | Runtime errors in production, especially around null/undefined form values | Never -- strict mode catches exactly the bugs that matter in form-heavy apps |
| Use html2canvas for PDF | Quick visual PDF that "looks like the screen" | Non-searchable, blurry, huge file size, unprofessional, breaks on serverless | Only for quick prototype/demo, must replace before production |
| Inline styles instead of design system | Faster component creation | Inconsistent appearance, hard to maintain theme, looks unprofessional | First 2 days of prototyping only, then refactor |
| Skip localStorage persistence | Simpler state management | Users lose progress on page refresh/close, major UX problem for 15-20 min assessment | Never -- implement with Zustand persist middleware from the start |
| Copy legal text from blog posts | Saves research time | Wrong paragraph numbers, outdated references, potential liability | Never -- use only recht.bund.de and bsi.bund.de as sources |

## Integration Gotchas

Common mistakes when connecting to external services and libraries.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Vercel Serverless (PDF) | Deploying a function with puppeteer/Chrome (~300MB) that exceeds Vercel's 50MB limit | Use @react-pdf/renderer which is ~5MB and runs in Node.js without a browser |
| Vercel Serverless (PDF) | Not testing cold start: first request after inactivity takes 3-5s, user thinks it is broken | Show loading spinner with "PDF wird erstellt..." message, add retry logic, consider client-side PDF as fallback |
| @react-pdf/renderer | Using CSS properties that Yoga layout engine does not support (CSS Grid, gap, calc()) | Use only Flexbox layout with explicit dimensions; test every PDF layout change immediately |
| @react-pdf/renderer | Forgetting to register fonts -- default fonts do not support German Umlauts properly | Register a font family (e.g., Inter, Noto Sans) with registerFont() including regular, bold, italic variants |
| react-i18next | Using string concatenation for translated text: `t('greeting') + name` | Use interpolation: `t('greeting', { name })` with translation key "Hallo {{name}}" |
| react-i18next | German pluralization rules differ from English (German has 2 forms, not 3) | Use ICU message format or test plural forms explicitly in German |
| Vercel Deployment | Environment variables not set in Vercel dashboard (works locally with .env) | No env vars needed for this project (no auth, no DB), but if added later, verify in Vercel settings |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Generating PDF on every result page load | Slow results page, wasted serverless invocations, potential Vercel bill spike | Generate PDF only on explicit user click ("PDF herunterladen"), not automatically | >100 users/day on Hobby plan (serverless limits) |
| Loading all i18n translations upfront | Slow initial page load, especially on mobile | Load only the active language; lazy-load the second language on switch | File size >100KB per language (unlikely for this project but good practice) |
| Re-rendering entire assessment on every answer change | Janky UI, input lag on older devices | Use React.memo for question components, update only the changed answer in state | >30 questions visible simultaneously (unlikely with step-by-step design) |
| Storing assessment state as deeply nested object | Slow state updates, complex selectors, unnecessary re-renders | Flat state structure with Zustand slices | >50 state properties (possible if questions expand) |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Logging assessment answers to console/server | DSGVO violation -- assessment answers may reveal company security weaknesses, constitute "verarbeitete Daten" | Zero server-side logging of user input. No analytics on form answers. Console.log removed in production build |
| Including company name/identifiers in PDF metadata | PDF metadata can contain author name, creation tool, file paths -- potential data leak | Strip all metadata from generated PDFs, set generic author/creator fields |
| No Content Security Policy (CSP) headers | XSS risk, even without user accounts -- injected scripts could exfiltrate assessment data from localStorage | Set strict CSP headers in Vercel config (vercel.json): default-src 'self', script-src 'self' |
| Using HTTP for any resource | Mixed content warnings, looks unprofessional, potential MITM on assessment data | Vercel provides HTTPS by default -- verify no HTTP resources (fonts, images) are loaded |
| Storing answers in localStorage without any indication to user | User unaware their assessment data persists in browser, DSGVO transparency issue | Show a note: "Ihre Antworten werden lokal in Ihrem Browser gespeichert. [Daten löschen]" with a clear delete option |

## UX Pitfalls

Common user experience mistakes in NIS2 assessment tools.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Using NIS2 jargon without explanation ("Sind Sie eine besonders wichtige Einrichtung gem. §28 Abs. 1 BSIG?") | SME managers do not know regulatory terminology -- they abandon the tool | Ask in plain language: "In welchem Sektor ist Ihr Unternehmen tätig?" with a dropdown of sectors, then classify internally |
| Showing Red/failing results without actionable next steps | User feels alarmed but helpless -- negative experience, no value delivered | Every Red result must include: what NIS2 requires, a concrete first step, and optionally a BSI IT-Grundschutz reference |
| Betroffenheitsprüfung result "Nicht betroffen" with no nuance | User may be wrong about their sector/size, or affected through supply chain | Add: "Basierend auf Ihren Angaben scheinen Sie nicht direkt betroffen. Beachten Sie: Kunden oder Partner könnten NIS2-Anforderungen an Sie weitergeben (Lieferkettensicherheit, Art. 21(2)(d))." |
| No back-navigation in multi-step form | User cannot correct a mistake without restarting the entire assessment | Implement step navigation with clickable breadcrumbs/progress bar -- allow jumping to any completed step |
| Results only shown, not downloadable/shareable | User cannot present results to their management or IT team | PDF download is mandatory; consider also a "copy summary to clipboard" option for quick sharing |
| Gap analysis questions assume IT expertise | SME Geschäftsführer answering does not know what "SIEM" or "IDS" means | Provide tooltip/info-icon explanations for technical terms. Use everyday language in question text, technical terms only in detail tooltips |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Betroffenheitsprüfung:** Often missing the special-case entities (DNS, TLD, qTSP, telco) that bypass size thresholds -- verify all §28 Abs. 1 special cases are included
- [ ] **Gap Analysis Questions:** Often missing source references -- verify EVERY question links to a specific NIS2UmsG paragraph and/or Art. 21(2) sub-point
- [ ] **PDF Report:** Often missing the legal disclaimer on the first page -- verify disclaimer is prominent and not just a footer
- [ ] **PDF Report:** Often renders German Umlauts incorrectly -- verify ä, ö, ü, ß, Ä, Ö, Ü render correctly in PDF output on Vercel (not just locally)
- [ ] **i18n:** Often has untranslated strings in the secondary language -- switch to English and click through the entire flow, every screen
- [ ] **Scoring Logic:** Often displays "0% compliant" when user skips questions instead of "Nicht bewertet" -- verify skip/unanswered handling
- [ ] **Mobile Layout:** Often breaks on the results page (traffic light grid, PDF download button) -- test on 375px width (iPhone SE)
- [ ] **Impressum:** Missing entirely -- German law requires it for commercial websites. Include basic Impressum even for portfolio piece
- [ ] **Rechtsstand Date:** Missing from footer and PDF -- add "Rechtsstand: Dezember 2025" (or the actual NIS2UmsG publication date)
- [ ] **Browser Back Button:** Often breaks the assessment flow -- verify browser back/forward navigation works in the multi-step form
- [ ] **localStorage Cleanup:** No way for user to delete their stored assessment data -- add a "Daten löschen" button (DSGVO transparency)
- [ ] **Vercel Production Build:** Works in dev but Vercel build fails due to TypeScript strict errors or missing env vars -- run `npm run build` locally before first deploy

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Wrong sector classification | MEDIUM | Fix classification logic, re-test against BSI tool, add unit tests. Data-driven design makes this a data fix, not architecture change. |
| Outdated legal references | LOW | Update constants file with correct paragraph numbers. If references are centralized, this is a 30-minute fix. If scattered across components, HIGH cost. |
| Meaningless scoring | MEDIUM | Refactor results component to show per-measure maturity instead of percentage. Add disclaimer text. Does not require backend changes. |
| Missing disclaimers | LOW | Add disclaimer component, insert in assessment start page and PDF template. Purely additive, no existing code changes. |
| PDF fails on Vercel | HIGH | If using html2canvas/puppeteer, must rewrite PDF generation entirely with @react-pdf/renderer. If using @react-pdf/renderer, usually a font registration or timeout fix (LOW). |
| i18n retrofit | HIGH | If strings are hardcoded, every component must be touched. Prevention (doing i18n from day one) saves 4-8 hours vs. retrofit. |
| Scope creep past deadline | MEDIUM | Cut features in priority order (English, PDF detail, BSI references, mobile). Deploy what works. A focused tool beats an unfinished one. |
| Form state spaghetti | HIGH | Requires refactoring to centralized state management. If done late, risk of introducing bugs in existing working flows. |
| Tool looks like student project | LOW-MEDIUM | Apply design tokens (colors, fonts, spacing) globally. Add favicon, meta tags, Impressum. Can be done in 2-4 hours if CSS architecture is clean. |
| Assessment too long | MEDIUM | Remove lowest-value questions, combine related questions into maturity-level selections. Requires re-testing scoring logic after question removal. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Wrong sector classification | Phase 1: Foundation | Unit tests pass for all sector/size combinations; results match BSI Betroffenheitsprüfung for 10+ test cases |
| Outdated legal references | Phase 1: Foundation | All references verified against recht.bund.de BGBl. 2025 I Nr. 301; reference mapping table reviewed |
| Meaningless scoring | Phase 2: Core Logic | Per-measure results displayed with maturity level; no standalone percentage without context |
| Missing disclaimers | Phase 1: Foundation (text) + Phase 3: UI (placement) | Disclaimer visible on start page, results page, and PDF first page |
| PDF fails on Vercel | Phase 2: Core Logic | Test PDF deployed to Vercel generates correctly with German Umlauts within 10s |
| i18n breaks layout | Phase 1: Foundation | i18n framework set up; first component uses t() calls; German text tested in layouts |
| Assessment too long | Phase 2: Core Logic | Total question count <=40; timed test-run completes in <20 minutes |
| Looks like student project | Phase 1: Foundation (design system) + Phase 4: Polish | No default React branding; consistent colors/fonts; Impressum present; no console errors |
| Scope creep | All phases | Go/no-go checkpoints at day 3, 5, 7; scope cuts defined in advance |
| Form state spaghetti | Phase 1: Foundation | State interface defined in TypeScript; Zustand store set up; back-navigation preserves answers |

## Sources

- [BSI NIS-2-Betroffenheitsprüfung](https://betroffenheitspruefung-nis-2.bsi.de/) -- reference implementation for sector classification
- [BSI NIS-2 Entscheidungsbaum (PDF)](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/NIS-2/nis-2-betroffenheit-entscheidungsbaum.pdf)
- [BGBl. 2025 I Nr. 301 -- NIS2UmsG published law](https://www.recht.bund.de/bgbl/1/2025/301/VO.html)
- [§30 BSIG -- Risikomanagementmaßnahmen](https://nis2-umsetzung.com/bsig/30-bsig/)
- [§32 BSIG -- Meldepflichten](https://nis2-umsetzung.com/bsig/32-bsig/)
- [Anlage 1 BSIG -- Sektoren besonders wichtiger Einrichtungen](https://nis2-umsetzung.com/bsig/anlage-1-sektoren-besonders-wichtiger-und-wichtiger-einrichtungen/)
- [Anlage 2 BSIG -- Sektoren wichtiger Einrichtungen](https://nis2-umsetzung.com/bsig/anlage-2-sektoren-wichtiger-einrichtungen/)
- [ENISA Technical Implementation Guidance on NIS2](https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance) -- maturity scale methodology
- [NIS2 Article 21 full text](https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html)
- [OpenKRITIS -- NIS2 Einrichtungen und Unternehmensgrößen](https://www.openkritis.de/it-sicherheitsgesetz/einrichtungen-unternehmensgroesse-nis2.html)
- [GitHub: paolocarner/nis2-sme-toolkit](https://github.com/paolocarner/nis2-sme-toolkit) -- existing open-source NIS2 toolkit for comparison
- [@react-pdf/renderer documentation](https://react-pdf.org/) -- PDF generation library
- [Vercel Serverless Function limits](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out)
- [PDF generation library comparison 2025](https://dmitriiboikov.com/posts/2025/01/pdf-generation-comarison/)

---
*Pitfalls research for: NIS2 Compliance Self-Assessment Web Tool*
*Researched: 2026-02-06*
