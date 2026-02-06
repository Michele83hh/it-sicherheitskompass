# Feature Research

**Domain:** NIS2 Readiness / Compliance Check Tools (German SME Market)
**Researched:** 2026-02-06
**Confidence:** HIGH (12+ competitor tools analyzed from live market data)

---

## Competitor Landscape (Researched Tools)

Before defining features, here is what was actually found on the market:

| Tool | Type | Free? | Registration? | Betroffenheit? | Gap Analysis? | PDF? | Legal Refs? | Language |
|------|------|-------|---------------|----------------|---------------|------|-------------|----------|
| **BSI Betroffenheitspruefung** | Betroffenheit only | Yes | No | Yes (decision tree) | No | No | Based on NIS2UmsuCG | DE |
| **DataGuard NIS2 Checker** | Betroffenheit only | Yes | No | Yes (2 min) | No | No | General | DE/EN |
| **nis2-check.de** | Betroffenheit only | Yes | No | Yes (sector/size) | No | No | General | DE |
| **NIS2Check.app** | Betroffenheit only | Yes | No | Yes (sector/size/revenue) | No | No | General | 27 EU langs |
| **Proliance NIS2-Check** | Betroffenheit + basic recommendations | Yes (basic) | Partial (email for report) | Yes | Superficial | Limited | General | DE |
| **Cyberday.ai** | Gap Analysis only | Yes | No (no personal info) | No | Yes (NIS2 framework) | Yes (export) | Framework mapping | EN |
| **Advisera** | Gap Analysis only | Yes | Unclear | No | Yes (questionnaire) | No | Requirement-level | EN |
| **Paradigm Security** | Gap Analysis only | Yes | No | No | Yes (5 min, AI-driven) | Yes (boardroom PDF) | Dutch NIS2 law | EN/NL |
| **nis2-conform.eu** | Self-Audit (paid) | No (980 EUR) | Yes | Partial | Yes (BSI CyberRisikoCheck) | Certificate + seal | DIN SPEC 27076 | DE |
| **NOVIDATA** | Consulting service | No (paid) | Yes (engagement) | Yes | Yes (traffic light/Ampel) | Yes (report) | NIS2UmsuCG | DE |
| **SecJur** | Full ISMS platform | No (SaaS) | Yes (paid platform) | Partial | Yes (automated) | Yes | ISO 27001 + NIS2 | DE/EN |
| **Q-Sec Toolkit** | Self-Assessment kit | Yes | No | No | Yes (20 min, 3 tools) | Downloadable | General | EN |

### Key Observation: The Market Gap

**No free tool combines both steps (Betroffenheitspruefung + Gap Analysis) in a single, anonymous, no-registration experience with German legal references and a downloadable PDF report.**

- BSI does Betroffenheit well but stops there (no gap analysis, no recommendations, no PDF)
- Cyberday/Advisera do gap analysis but not Betroffenheit, and not German-law-specific
- Paid tools (nis2-conform.eu, NOVIDATA, SecJur) combine both but cost 980+ EUR or require consulting engagements
- Tools that generate PDFs typically require registration or email
- Almost no tool references specific legal articles (NIS2UmsuCG paragraphs, Art. 21(2) sub-points) in their recommendations

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or amateur.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Step 1: Betroffenheitspruefung** | BSI already offers this free; users expect any NIS2 tool to answer "Am I affected?" | MEDIUM | Decision tree: sector selection (18 sectors from Annex I/II), employee count (>50 / >250), revenue (>10M / >50M), special cases (TLD registries, DNS, trust services). Must match BSI logic. |
| **Sector selection (all 18 NIS2 sectors)** | Incomplete sector list = wrong results. Users check against BSI tool. | LOW | 11 sectors "essential" (Annex I) + 7 sectors "important" (Annex II). Data-driven, not hardcoded. |
| **Size/revenue threshold check** | Core NIS2 applicability criteria. Every competitor does this. | LOW | >50 employees OR >10M EUR revenue = "important"; >250 employees OR >50M EUR revenue = "essential". Edge cases: certain entities regardless of size (DNS, TLD, trust services). |
| **Clear result: affected / not affected / unclear** | Users need a definitive answer, not ambiguity. BSI does this. | LOW | Three-state result. "Unclear" cases should explain why and suggest next steps. |
| **Step 2: Gap Analysis (10 measures from Art. 21(2))** | This is the core value proposition. Without it, this is just another Betroffenheits-clone. | HIGH | 10 measure areas with 3-5 questions each = 30-50 questions total. Questions must be answerable by non-technical management. |
| **Traffic light scoring (green/yellow/red)** | Visual, intuitive, universally understood. NOVIDATA and others use this. | LOW | Per-measure-area scoring + overall score. Simple threshold logic. |
| **German language** | Target audience is German SMEs. English-only = unusable for many. | LOW | Primary language must be German. All legal terms in German. |
| **Anonymous / no registration** | BSI tool is anonymous. Requiring email before results = immediate bounce for privacy-conscious German SMEs. | LOW | No cookies, no tracking, no email gate. Results computed client-side or session-only server-side. |
| **Mobile-responsive design** | 2026 standard. Non-responsive = unprofessional. | LOW | Standard responsive CSS. Wizard/stepper pattern works well on mobile. |
| **Legal disclaimer** | BSI includes this prominently. Legally required for non-binding assessments. | LOW | "This tool provides orientation only. Results are not legally binding. Consult qualified legal/security advisors." |

### Differentiators (Competitive Advantage)

Features that set this tool apart from existing offerings. These are what make a hiring manager look twice at the portfolio.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Combined Betroffenheit + Gap Analysis in one flow** | No free tool does this. Users currently bounce between BSI (Betroffenheit) and Cyberday/Advisera (Gap) -- separate tools, separate contexts. Single flow = massive UX win. | MEDIUM | Step 1 result feeds into Step 2 context (e.g., "essential" entities have stricter requirements). Conditional logic. |
| **Downloadable PDF report** | Paradigm Security charges for this. Most free tools don't offer it. A boardroom-ready PDF with traffic light scores, specific gaps, and recommendations is high perceived value. | MEDIUM | Client-side PDF generation (jsPDF or similar). Must include: company type (essential/important), per-area scores, specific recommendations, legal references. |
| **Specific legal article references** | Almost no tool maps recommendations to actual NIS2UmsuCG paragraphs or Art. 21(2) sub-points. This is what makes the tool credible for IT-Security professionals. | MEDIUM | Each recommendation references: EU Directive Art. 21(2)(a)-(j), corresponding NIS2UmsuCG section (BSIG-neu), and optionally BSI IT-Grundschutz mapping. Requires legal data model. |
| **Actionable recommendations per gap** | Most tools say "you have a gap in incident response." This tool should say exactly what to do: "Establish a documented incident response plan covering detection, containment, eradication, recovery. Reference: Art. 21(2)(b), BSIG-neu Section 30(2) Nr. 2." | MEDIUM | 3-5 specific recommendations per measure area, pre-written and curated. Not AI-generated. |
| **English language option** | Most German tools are German-only. English expands reach and demonstrates internationalization competence. Important for portfolio piece. | LOW | i18n from start. All static text in translation files. Legal references stay in original language. |
| **BSI IT-Grundschutz mapping** | Shows deep domain knowledge. Most tools reference only NIS2 directly, not the German implementation framework. Impressive for Praktikum application. | HIGH | Map each Art. 21(2) measure to relevant BSI IT-Grundschutz Bausteine (e.g., incident response -> BSI-Standard 200-4). Research-intensive but adds credibility. |
| **Progress indicator / stepper UI** | Professional UX signal. Shows the user where they are in the process. Reduces abandonment. | LOW | Simple step indicator: "Step 1 of 2: Betroffenheitspruefung" -> "Step 2 of 2: Gap Analysis" -> "Results". |
| **Maturity level assessment** | Instead of just "compliant / not compliant", show maturity levels (0-4 or similar). More nuanced, more useful. | LOW | Simple scale: 0=Not addressed, 1=Ad-hoc, 2=Documented, 3=Managed, 4=Optimized. Adds professional depth without complexity. |

### Anti-Features (Deliberately NOT Building)

Features that seem good but create problems, especially given the 10-day deadline.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **User accounts / saved assessments** | "Users want to save progress and revisit later" | Requires authentication, database, GDPR compliance (data processing agreement, privacy policy, deletion rights). 10-day killer. Server infrastructure. | Offer "Download results as PDF" and "Copy link with encoded state" (URL parameters or local storage). No server-side persistence. |
| **Backend / server-side processing** | "Need a database for analytics" | Server = hosting costs, security surface, maintenance, deployment complexity. For a portfolio piece, unnecessary overhead. | Pure client-side SPA. All logic in browser. No server needed beyond static file hosting (GitHub Pages, Netlify). |
| **AI-powered recommendations** | "Use GPT to generate personalized advice" | Unreliable for legal/compliance context. Hallucination risk for legal references. API costs. Latency. Privacy concerns (sending company data to AI). | Pre-written, expert-curated recommendations. More trustworthy, faster, free. |
| **Continuous monitoring / dashboard** | "Track compliance over time" | Requires persistent storage, user accounts, scheduled checks. Full SaaS territory. Way beyond scope. | One-time assessment with PDF export. User can re-run tool anytime. |
| **Integration with ISMS platforms** | "Connect to SecJur / Vanta / Drata" | API integrations are time-consuming, require partnerships, and target enterprise (not SME). | Standalone tool. PDF export is the "integration" -- users can attach it to any system. |
| **Detailed sub-sector classification** | "Differentiate between electricity, gas, oil within energy sector" | BSI already does fine-grained sector classification. Replicating this adds complexity without much value for gap analysis. | Match BSI's top-level 18 sectors. Link to BSI tool for sub-sector details. |
| **Consulting booking / lead generation** | "Add a CTA to book a consultation" | Makes the tool feel like a sales funnel, not a genuine resource. Undermines credibility as portfolio piece. | Clean, ad-free experience. Professional impression > lead gen. |
| **Multi-company comparison** | "Compare your score against industry benchmarks" | Requires aggregated data from many users. Privacy concerns. Statistical validity issues with small sample. | Show general NIS2 maturity benchmarks from published studies (BSI Lagebericht) as static context, not live comparison. |
| **Real-time collaboration** | "Share assessment with team members" | WebSocket infrastructure, conflict resolution, user management. Massively over-scoped. | PDF export + sharing the URL. |
| **WCAG AAA accessibility** | "Full accessibility compliance" | AAA is extremely strict and time-consuming. | Target WCAG AA. Use semantic HTML, proper contrast, keyboard navigation. Good enough and achievable. |

---

## Feature Dependencies

```
[Betroffenheitspruefung (Step 1)]
    |
    |--result feeds into--> [Gap Analysis (Step 2)]
    |                           |
    |                           |--requires--> [Question Catalog per Art. 21(2) measure]
    |                           |                   |
    |                           |                   |--enriched by--> [Legal Reference Data Model]
    |                           |                   |
    |                           |                   |--enriched by--> [BSI Grundschutz Mapping]
    |                           |
    |                           |--produces--> [Traffic Light Scoring]
    |                           |                   |
    |                           |                   |--feeds into--> [Results Dashboard View]
    |                           |                   |
    |                           |                   |--feeds into--> [PDF Report Generation]
    |                           |
    |                           |--produces--> [Recommendations per Gap]
    |                                               |
    |                                               |--feeds into--> [Results Dashboard View]
    |                                               |
    |                                               |--feeds into--> [PDF Report Generation]
    |
    |--independent--> [i18n (DE/EN)]
    |
    |--independent--> [Responsive Design]

[Progress Stepper UI] --enhances--> [Betroffenheitspruefung + Gap Analysis flow]

[Maturity Level Assessment] --enhances--> [Gap Analysis scoring]
                            --conflicts with--> [Simple yes/no question format]
                            (resolution: use scaled answers instead of binary)
```

### Dependency Notes

- **Gap Analysis requires Betroffenheitspruefung result:** The gap analysis must know whether the entity is "essential" (wesentlich) or "important" (wichtig) because requirements differ (e.g., stricter incident reporting for essential entities, supervisory regime differences).
- **PDF Report requires both scoring and recommendations:** Cannot generate PDF without completed assessment. PDF is the final output of the entire flow.
- **Legal Reference Data Model enriches questions and recommendations:** Each question and recommendation should reference specific legal articles. This is a data/content task, not a code task. Can be built incrementally.
- **BSI Grundschutz Mapping enriches but is optional:** Adds depth but can be added after v1 launch. Not a blocker.
- **i18n is independent:** Can be added at any point but cheapest to implement from the start (externalize all strings).
- **Maturity levels interact with question design:** If using maturity levels (0-4 scale), questions must be designed as scaled answers, not yes/no. This decision affects the entire question catalog design and must be made before building questions.

---

## MVP Definition

### Launch With (v1) -- 10-Day Deadline

Minimum viable product -- what is needed to make this a credible portfolio piece.

- [x] **Betroffenheitspruefung (Step 1)** -- Core gate question: "Am I affected?" Without this, tool has no entry point.
- [x] **Sector selection (18 NIS2 sectors)** -- Required for Betroffenheit logic. Data-driven.
- [x] **Size/revenue threshold check** -- Required for Betroffenheit logic. Simple conditional.
- [x] **Gap Analysis questionnaire (Step 2)** -- The differentiator. 10 measure areas, 3-5 questions each.
- [x] **Traffic light scoring per area + overall** -- Visual, immediate, professional.
- [x] **Specific recommendations per gap** -- Pre-written, curated, with legal references.
- [x] **Legal article references (Art. 21(2)(a)-(j) + NIS2UmsuCG sections)** -- Credibility differentiator.
- [x] **PDF report download** -- High perceived value. Client-side generation.
- [x] **German language (primary)** -- Non-negotiable for target audience.
- [x] **Responsive design** -- 2026 standard.
- [x] **Legal disclaimer** -- Liability protection.
- [x] **Progress stepper UI** -- Professional UX, low effort.

### Add After Validation (v1.x)

Features to add once core is working and feedback is collected.

- [ ] **English language** -- Trigger: portfolio shown to international audience or English-speaking Praktikum interviewer.
- [ ] **BSI IT-Grundschutz Bausteine mapping** -- Trigger: if deeper credibility needed for BSI-aligned organizations.
- [ ] **Maturity level visualization (radar chart / spider diagram)** -- Trigger: if traffic lights feel too simplistic in user feedback.
- [ ] **Share results via URL (encoded state)** -- Trigger: users want to share results without re-doing assessment.
- [ ] **Print-optimized CSS** -- Trigger: users want to print browser view directly (in addition to PDF).

### Future Consideration (v2+)

Features to defer until proven value and more time available.

- [ ] **Comparison with BSI Lagebericht benchmarks** -- Why defer: requires research into published maturity data, statistical framing.
- [ ] **KRITIS mapping (for entities also under BSI-KritisV)** -- Why defer: overlapping regulation, complex edge cases.
- [ ] **API for external integrations** -- Why defer: no demand signal yet, adds server infrastructure.
- [ ] **Multi-framework assessment (ISO 27001 + NIS2 combined)** -- Why defer: scope explosion, different audience.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority | Time Estimate |
|---------|------------|---------------------|----------|---------------|
| Betroffenheitspruefung (decision tree) | HIGH | MEDIUM | P1 | 1-2 days |
| Gap Analysis questionnaire (10 areas) | HIGH | HIGH | P1 | 2-3 days |
| Traffic light scoring | HIGH | LOW | P1 | 0.5 day |
| Recommendations with legal refs | HIGH | MEDIUM | P1 | 1-2 days (content) |
| PDF report generation | HIGH | MEDIUM | P1 | 1 day |
| German language (primary) | HIGH | LOW | P1 | Built-in |
| Responsive design | MEDIUM | LOW | P1 | Built-in (CSS framework) |
| Legal disclaimer | MEDIUM | LOW | P1 | 0.5 hour |
| Progress stepper UI | MEDIUM | LOW | P1 | 0.5 day |
| English translation | MEDIUM | MEDIUM | P2 | 1 day |
| BSI Grundschutz mapping | MEDIUM | HIGH | P2 | 1-2 days (research) |
| Maturity radar chart | LOW | MEDIUM | P2 | 0.5 day |
| URL state sharing | LOW | MEDIUM | P3 | 0.5 day |
| Print CSS | LOW | LOW | P3 | 2 hours |

**Priority key:**
- P1: Must have for launch (days 1-10)
- P2: Should have, add when possible (post-launch polish)
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | BSI Betroffenheitspruefung | DataGuard Checker | Cyberday.ai | Paradigm Security | **Our Tool** |
|---------|---------------------------|-------------------|-------------|-------------------|-------------|
| Betroffenheit check | Yes (gold standard) | Yes (basic) | No | No | **Yes (matches BSI logic)** |
| Gap Analysis | No | No | Yes (framework-level) | Yes (AI-driven) | **Yes (Art. 21(2) specific)** |
| Combined flow | No | No | No | No | **Yes (unique differentiator)** |
| German language | Yes | Yes | No (EN only) | No (EN/NL) | **Yes (DE primary, EN planned)** |
| Legal article references | Based on NIS2UmsuCG | General only | Framework mapping | Dutch law | **Specific Art. 21(2) + NIS2UmsuCG sections** |
| PDF report | No | No | Yes (export) | Yes (paid/gated) | **Yes (free, no registration)** |
| Anonymous / no registration | Yes | Yes | Yes (no personal info) | Yes | **Yes** |
| Traffic light scoring | No (binary result) | No (binary result) | Yes (compliance score) | Yes (maturity) | **Yes (per area + overall)** |
| Specific recommendations | No (links to BSI info) | No | General | vCISO-level | **Yes (pre-written, curated)** |
| Mobile responsive | Yes | Yes | Yes | Yes | **Yes** |
| Cost | Free | Free | Free | Free (basic) | **Free** |
| Target audience | All German entities | International | International | Dutch market | **German SMEs specifically** |

### Competitive Positioning Summary

**Our unique value proposition:** The only free, anonymous, no-registration tool that combines NIS2 Betroffenheitspruefung AND Gap Analysis in a single flow, with traffic light scoring, specific recommendations referencing actual legal articles (Art. 21(2) + NIS2UmsuCG/BSIG-neu), and a downloadable PDF report -- specifically designed for German SMEs.

**What we deliberately do better than BSI:** BSI stops at "you are affected." We continue with "here are your specific gaps and what to do about them."

**What we deliberately do better than Cyberday/Advisera:** They assume you already know you are affected. We verify first, then assess. And we reference German law specifically, not generic frameworks.

**What we deliberately do better than paid tools (nis2-conform.eu, NOVIDATA, SecJur):** We offer the core assessment for free, anonymously, without sales funnels. The 980 EUR nis2-conform.eu charges for a self-audit certificate is out of reach for small businesses just trying to understand their obligations.

---

## Sources

### Competitor Tools Analyzed
- [BSI NIS-2-Betroffenheitspruefung](https://betroffenheitspruefung-nis-2.bsi.de/)
- [BSI NIS-2 Regulierte Unternehmen](https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-Betroffenheitspruefung/nis-2-betroffenheitspruefung_node.html)
- [DataGuard NIS2 Checker](https://www.dataguard.com/nis2-checker)
- [nis2-check.de Quick-Check](https://nis2-check.de/)
- [NIS2Check.app](https://www.nis2check.app/en)
- [Proliance NIS2-Check](https://www.proliance.ai/lp-nis2/nis2-check)
- [Cyberday.ai Free NIS2 Assessment](https://www.cyberday.ai/assessment/nis2-directive)
- [Advisera NIS2 Gap Analysis Tool](https://advisera.com/tools/nis-2-gap-analysis-tool/)
- [Paradigm Security NIS2 Gap Analysis](https://paradigmsecurity.nl/resource/nis2-gap-analysis/)
- [nis2-conform.eu Self-Audit](https://nis2-conform.eu/)
- [NOVIDATA NIS-2 Assessment](https://novidata.de/it-sicherheit/nis-2/nis-2-assessment/)
- [SecJur NIS2 Platform](https://www.secjur.com/en/products/nis2)
- [Q-Sec NIS2 Toolkit](https://q-sec.com/en/tools/nis2-compliance-self-assessment-toolkit)
- [Nortal NIS2-Readiness Test](https://nortal.com/de-de/nis2-readiness)
- [Check Point NIS2 Readiness Assessment](https://www.checkpoint.com/de/services/infinity-global/nis2-readiness-assessment/)
- [Controlware NIS2-Readiness-Check (PDF)](https://www.controlware.de/fileadmin/controlware/services/nis2/Sec_DL_NIS2-Readiness-Check_L%C3%B6Be_latest.pdf)
- [NIS2Resources.eu Free Compliance Kits](https://nis2resources.eu/compliance-kits/)

### Legal References Used
- [NIS2 Directive Art. 21 (Risikomanagementmassnahmen)](https://nis2-umsetzung.com/nis2-richtlinie/artikel-21-risikomanagementmassnahmen-im-bereich-der-cybersicherheit/)
- [NIS2UmsuCG / BSIG-neu](https://www.recht.bund.de/bgbl/1/2025/301/VO.html)
- [BSI Risikomanagementmassnahmen Info](https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-Infopakete/NIS-2-Risikomanagementmassnahmen/NIS-2-Risikomanagementmassnahmen.html)
- [BSI Entscheidungsbaum (PDF)](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/NIS-2/nis-2-betroffenheit-entscheidungsbaum.pdf)
- [OpenKRITIS NIS2 Germany](https://www.openkritis.de/eu/eu-nis-2-germany.html)

### Industry Context
- [NIS2 Navigator](https://nis2-navigator.de/)
- [Transferstelle Cybersicherheit NIS-2-Check](https://transferstelle-cybersicherheit.de/material/nis-2-check/)
- [Gesellschaft fuer Datenschutz NIS-2 Selbstcheck](https://gesellschaft-datenschutz.de/informationssicherheit/nis-2/)

---
*Feature research for: NIS2 Readiness Check Web Tool*
*Researched: 2026-02-06*
