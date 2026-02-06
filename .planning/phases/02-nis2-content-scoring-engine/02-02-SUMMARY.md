---
phase: 02-nis2-content-scoring-engine
plan: 02
subsystem: nis2-gap-analysis
completed: 2026-02-06
duration: 12 minutes
tags: [nis2, gap-analysis, questions, categories, recommendations, i18n, content]

requires:
  - phase: 01
    reason: Foundation (Next.js, i18n, design tokens)

provides:
  - NIS2 Art. 21(2) gap analysis question catalog (30 questions)
  - 10 legally mapped measure categories
  - 20 BSI-referenced recommendations
  - Complete DE/EN translations

affects:
  - phase: 03
    impact: Question catalog ready for "Affected Check" wizard
  - phase: 04
    impact: Questions + categories ready for Gap Analysis wizard
  - phase: 05
    impact: Recommendations ready for Results Dashboard
  - plan: 02-03
    impact: Content ready for scoring engine implementation

tech-stack:
  added: []
  patterns:
    - Translation key pattern for i18n
    - Structured legal reference data
    - BSI IT-Grundschutz building block references

key-files:
  created:
    - src/lib/nis2/categories.ts
    - src/lib/nis2/questions.ts
    - src/lib/nis2/recommendations.ts
  modified:
    - src/messages/de.json
    - src/messages/en.json

decisions:
  - id: DEC-02-02-01
    title: Questions use translation keys instead of hardcoded text
    rationale: Enables i18n, keeps TypeScript data files language-agnostic
    alternatives: Hardcode German text, generate English version separately
  - id: DEC-02-02-02
    title: Legal references kept in German format even in English translation
    rationale: German law (BSIG) is binding legal text, matches I18N-05 requirement
    alternatives: Translate paragraph references to "Para." "No." etc.
  - id: DEC-02-02-03
    title: Separate CATEGORIES and QUESTIONS arrays (not nested)
    rationale: Easier to query by category, avoids data duplication
    alternatives: Embed questions[] directly in each Category object
---

# Phase 2 Plan 2: NIS2 Content (Questions, Categories, Recommendations) Summary

Complete NIS2 gap analysis question catalog with 30 KMU-friendly questions, 10 Art. 21(2) categories, 20 BSI-referenced recommendations, and full DE/EN translations.

## One-Liner

Created legally accurate NIS2 gap analysis content: 30 questions across 10 Art. 21(2) categories with maturity level descriptions, 20 BSI IT-Grundschutz-referenced recommendations with concrete first steps, and complete German/English translations.

## What Was Built

### TypeScript Data Files

1. **src/lib/nis2/categories.ts** (126 lines)
   - 10 NIS2 Art. 21(2) measure categories (a-j)
   - Each with EU article + BSIG paragraph + BSI building blocks
   - Translation keys for name, shortName, description
   - Helper functions: getCategoryById(), getAllCategories()

2. **src/lib/nis2/questions.ts** (446 lines)
   - 30 questions, 3 per category
   - Each question has: titleKey, tooltipKey, legalReference, maturityDescriptions (level 0-3)
   - Written in KMU-management-level language (not IT jargon)
   - Helper functions: getQuestionsByCategory(), getTotalQuestionCount()

3. **src/lib/nis2/recommendations.ts** (233 lines)
   - 20 recommendations, 2 per category (1 high priority, 1 medium)
   - Each has: titleKey, descriptionKey, firstStepKey, legalReference, bsiReference
   - Concrete, actionable first steps for KMUs
   - Helper function: getRecommendationsByCategory()

### Translation Files

4. **src/messages/de.json** (added 462 lines)
   - maturityLevels: 4 labels (Nicht/Teilweise/Größtenteils/Vollständig umgesetzt)
   - categories: 10 × (name, shortName, description)
   - questions: 30 × (title, tooltip, maturity.level0-3)
   - recommendations: 20 × (title, description, firstStep)

5. **src/messages/en.json** (added 462 lines)
   - Same structure as de.json
   - Legal references remain in German format (§30 BSIG, Art. 21(2) etc.)
   - Professionally translated, legally accurate

## Technical Implementation

### Content Organization

```
src/lib/nis2/
├── types.ts          ← Shared type definitions (from Plan 02-01)
├── categories.ts     ← 10 Art. 21(2) categories
├── questions.ts      ← 30 gap analysis questions
└── recommendations.ts ← 20 prioritized recommendations
```

### Legal Accuracy

- **EU Basis:** Art. 21(2)(a-j) EU Directive 2022/2555
- **German Law:** §30 Abs. 2 Nr. 1-10 BSIG (BGBl. 2025 I Nr. 301)
- **BSI Standards:** IT-Grundschutz-Kompendium Edition 2023

Every question, category, and recommendation includes exact legal references.

### Question Design Principles

1. **Management-Level Language**
   - "Haben Sie eine aktuelle Übersicht über Ihre IT-Risiken?"
   - Not: "Ist eine Risikoanalyse gemäß BSI-Standard 200-3 implementiert?"

2. **Maturity Scale Descriptions**
   - Level 0: None/non-existent
   - Level 1: Ad-hoc/basic/informal
   - Level 2: Documented but not comprehensive
   - Level 3: Systematic, documented, regularly reviewed

3. **Contextual Tooltips**
   - Legal requirement explanation
   - BSI building block reference
   - Practical benefit explanation

### Recommendation Design

Each recommendation includes:
- **Title:** What to do (e.g., "Patch-Management einführen")
- **Description:** Why it matters (legal requirement + practical benefit)
- **First Step:** Concrete, immediately actionable task (e.g., "Aktivieren Sie automatische Updates für Betriebssysteme")
- **BSI Reference:** Specific IT-Grundschutz building blocks
- **Legal Reference:** EU article + BSIG paragraph

## Category Mapping

| Cat # | Art. 21(2) | §30 BSIG | Name (DE) | BSI Blocks | Q Count |
|-------|------------|----------|-----------|------------|---------|
| 1 | (a) | Nr. 1 | Risikoanalyse und Sicherheit | ISMS.1, ORP.1, DER.1 | 3 |
| 2 | (b) | Nr. 2 | Bewältigung von Sicherheitsvorfällen | DER.2.1, DER.2.2, DER.2.3, OPS.1.1.5 | 3 |
| 3 | (c) | Nr. 3 | Aufrechterhaltung des Betriebs | CON.3, DER.4, DER.2.3, OPS.1.2.2 | 3 |
| 4 | (d) | Nr. 4 | Sicherheit der Lieferkette | ORP.1, OPS.1.1.3 | 3 |
| 5 | (e) | Nr. 5 | Sicherheit bei Erwerb, Entwicklung und Wartung | CON.8, OPS.1.1.6, OPS.1.1.3, CON.10 | 3 |
| 6 | (f) | Nr. 6 | Bewertung der Wirksamkeit von Maßnahmen | ISMS.1, OPS.1.1.6, ORP.5 | 3 |
| 7 | (g) | Nr. 7 | Cyberhygiene und Schulungen | ORP.3, OPS.1.1.4, ORP.2 | 3 |
| 8 | (h) | Nr. 8 | Kryptografie und Verschlüsselung | CON.1, NET.4.1 | 3 |
| 9 | (i) | Nr. 9 | Personalsicherheit und Zugriffskontrolle | ORP.4, ORP.2, INF.1, INF.2 | 3 |
| 10 | (j) | Nr. 10 | Multi-Faktor-Authentifizierung und gesicherte Kommunikation | ORP.4, NET.4.1, NET.4.2 | 3 |

**Total:** 30 questions, 10 categories, 20 recommendations

## Quality Metrics

### Content Completeness

- ✅ All 10 Art. 21(2) categories covered
- ✅ Each category has exactly 3 questions
- ✅ Each category has 2 recommendations (high + medium priority)
- ✅ Every question has 4 maturity level descriptions
- ✅ Every question has tooltip with legal reference + BSI building block
- ✅ Every recommendation has concrete first step

### Translation Completeness

- ✅ All categories: name, shortName, description (DE + EN)
- ✅ All questions: title, tooltip, maturity levels 0-3 (DE + EN)
- ✅ All recommendations: title, description, firstStep (DE + EN)
- ✅ Maturity level labels (DE + EN)
- ✅ Legal references kept in German format (as required by I18N-05)

### TypeScript Quality

- ✅ Zero TypeScript errors
- ✅ All types imported from shared types.ts
- ✅ Helper functions for querying by category
- ✅ Correct export structure

### Legal Accuracy

- ✅ All EU articles correctly referenced
- ✅ All BSIG paragraphs correctly mapped
- ✅ BSI IT-Grundschutz building blocks from Edition 2023
- ✅ Legal references consistent between questions and recommendations

## Commits

| Commit | Type | Description | Files | Lines |
|--------|------|-------------|-------|-------|
| efcff9e | feat | Create NIS2 categories, questions, and recommendations | 3 files | +899 |
| 5a09452 | feat | Add German translations for questions and recommendations | 1 file | +462 |
| eaa8d05 | feat | Add English translations for questions and recommendations | 1 file | +462 |

**Total:** 3 commits, 5 files, 1,823 lines added

## Deviations from Plan

None - plan executed exactly as specified.

## Decisions Made

### DEC-02-02-01: Translation Keys Instead of Hardcoded Text

**Decision:** Use translation keys (e.g., `titleKey: 'questions.raQ1.title'`) instead of hardcoding German or English text in TypeScript files.

**Rationale:**
- Enables clean i18n support via next-intl
- Keeps TypeScript data files language-agnostic
- Makes it easier to add more languages later
- Separates concerns: data structure vs. user-facing text

**Alternatives Considered:**
- Hardcode German text, generate English version separately → Would duplicate data structure
- Use both German and English in TypeScript → Would bloat files, harder to maintain

**Impact:** Future-proof i18n architecture, cleaner code.

---

### DEC-02-02-02: German Legal References in English Translation

**Decision:** Keep legal references in German format (§30, BSIG, Art. 21(2)) even in English translations.

**Rationale:**
- German law (BSIG) is the binding legal text
- Matches requirement I18N-05: "Legal references remain in original format"
- Professionals working with NIS2 in Germany expect German legal notation
- Avoids ambiguity (translating "§30 Abs. 2 Nr. 1" to "Section 30 Para. 2 No. 1" could cause confusion)

**Alternatives Considered:**
- Translate to English legal notation → Would break legal precision
- Duplicate references (German original + English translation) → Would clutter tooltips

**Impact:** Legal accuracy maintained, matches German legal practice.

---

### DEC-02-02-03: Separate CATEGORIES and QUESTIONS Arrays

**Decision:** Keep CATEGORIES and QUESTIONS as separate top-level arrays, linked by `categoryId` reference. The `questions: []` field in Category objects is initially empty (can be populated by helper function if needed).

**Rationale:**
- Easier to query questions by category using `getQuestionsByCategory()`
- Avoids data duplication (questions don't need to be copied into category objects)
- TypeScript performance: flat arrays are faster to iterate
- Matches database normalization principles

**Alternatives Considered:**
- Embed questions[] directly in each Category object → Would make CATEGORIES massive, harder to maintain
- Use a Map<categoryId, Question[]> → Less type-safe, harder to export

**Impact:** Clean data architecture, better queryability, easier maintenance.

## Next Phase Readiness

### For Plan 02-03 (Scoring Engine)

✅ **Ready:** All content created and structured for scoring.

**What's available:**
- 30 questions with categoryId references
- 10 categories with BSI building blocks
- 20 recommendations with priority levels
- Maturity level structure (0-3)

**What Plan 02-03 needs to build:**
- Scoring functions: calculateCategoryScore(), calculateOverallScore()
- Traffic light mapping (percentage → red/yellow/green)
- Recommendation filtering logic (show high-priority for red categories)

### For Phase 3 (Affected Check)

✅ **Ready:** Category structure and translations available for wizard UI.

**Blocker:** None. Categories can be displayed in wizard steps.

### For Phase 4 (Gap Analysis Wizard)

✅ **Ready:** Questions and maturity descriptions ready for wizard flow.

**What's needed:**
- UI components for displaying questions
- Radio button/slider for maturity level selection
- Tooltip popover for legal references

### For Phase 5 (Results Dashboard)

✅ **Ready:** Recommendations with first steps ready for display.

**What's needed:**
- UI for recommendation cards
- Filtering by category
- Sorting by priority

## Dependencies Status

| Dependency | Type | Status | Notes |
|------------|------|--------|-------|
| types.ts | Code | ✅ Available | Created by Plan 02-01 |
| de.json | Translations | ✅ Extended | Merged with Plan 02-01 sector data |
| en.json | Translations | ✅ Extended | Merged with Plan 02-01 sector data |
| next-intl | Runtime | ✅ Installed | From Phase 1 |

## Validation Results

### TypeScript Compilation

```bash
npx tsc --noEmit src/lib/nis2/*.ts
# ✅ Exit code: 0 (no errors)
```

### JSON Validation

```bash
node -e "JSON.parse(require('fs').readFileSync('src/messages/de.json'))"
# ✅ Valid JSON

node -e "JSON.parse(require('fs').readFileSync('src/messages/en.json'))"
# ✅ Valid JSON
```

### Content Counts

- ✅ 10 categories
- ✅ 30 questions (3 per category)
- ✅ 20 recommendations (2 per category)
- ✅ All translation keys present in both de.json and en.json
- ✅ All maturity levels (0-3) described for all questions

## Performance Notes

- **Execution time:** 12 minutes
- **TypeScript compilation:** < 5 seconds
- **Data file sizes:**
  - categories.ts: 3.7 KB
  - questions.ts: 15.4 KB
  - recommendations.ts: 7.8 KB
  - de.json: +38 KB (new content)
  - en.json: +37 KB (new content)

All files are small enough for fast parsing. No performance concerns.

## Testing Recommendations for Phase 4

When building the Gap Analysis wizard in Phase 4:

1. **Verify translation keys resolve correctly**
   - Test `useTranslations('questions')` with all 30 question IDs
   - Test tooltip rendering with legal references

2. **Test maturity level selection**
   - Ensure all 4 levels (0-3) are selectable per question
   - Verify maturity descriptions display correctly

3. **Test category grouping**
   - Ensure getQuestionsByCategory() returns correct questions
   - Verify category progress tracking (3 questions per category)

4. **Test i18n switching**
   - Switch language mid-wizard
   - Verify all questions, tooltips, maturity levels update

## Legal Compliance Notes

All content was created based on:

1. **EU Directive 2022/2555 (NIS2 Directive)**
   - Art. 21(2)(a-j): Cybersecurity risk management measures

2. **German BSIG (BGBl. 2025 I Nr. 301)**
   - §30 Abs. 2 Nr. 1-10: Specific requirements for German entities

3. **BSI IT-Grundschutz-Kompendium Edition 2023**
   - Building blocks referenced in recommendations

**Disclaimer:** This is a gap analysis tool, not legal advice. Users should consult specialized lawyers or IT security consultants for binding guidance.

## Future Enhancements (Out of Scope for Phase 2)

Potential improvements for later phases:

1. **Question Weighting:**
   - Some questions might be more critical than others
   - Could add `weight: number` to Question type
   - Would require scoring engine changes (Plan 02-03)

2. **Conditional Questions:**
   - Some questions might only apply if previous answers meet criteria
   - Could add `conditionalOn: { questionId, minLevel }` to Question type
   - Would require wizard logic changes (Phase 4)

3. **Evidence Collection:**
   - Allow users to upload documents as proof of implementation
   - Could add `evidenceKey?: string` to Answer type
   - Would require file upload feature (Phase 6)

4. **Multi-Language Support Beyond DE/EN:**
   - French, Italian, Spanish for EU-wide use
   - Would require additional translation work

**None of these are needed for MVP (Phase 7 completion).**

## Lessons Learned

1. **Parallel Execution with Plan 02-01:**
   - Both plans modified de.json and en.json
   - Edit tool handled merging gracefully
   - Decision to keep sectors and gap analysis content in same translation files was correct

2. **Translation Key Naming:**
   - Pattern `questions.{questionId}.{field}` is clear and scalable
   - Camel case for question IDs (raQ1, ihQ1) works well

3. **Legal Accuracy is Time-Consuming:**
   - Verifying every legal reference took significant time
   - But critical for tool credibility
   - Worth the investment for a compliance tool

4. **KMU-Friendly Language:**
   - Writing questions in management-level German (not IT jargon) required careful phrasing
   - Examples and concrete scenarios help ("z.B. Phishing erkennen")
   - Tooltips provide technical depth for those who want it

## Conclusion

Phase 2 Plan 2 successfully created the complete NIS2 gap analysis content foundation:

- ✅ 30 legally accurate, KMU-friendly questions
- ✅ 10 categories mapped to Art. 21(2) and §30 BSIG
- ✅ 20 BSI-referenced recommendations with actionable first steps
- ✅ Complete German and English translations
- ✅ Type-safe TypeScript implementation
- ✅ Zero deviations from plan
- ✅ All files compile without errors

**Ready for Plan 02-03 (Scoring Engine)** and **Phase 4 (Gap Analysis Wizard)**.
