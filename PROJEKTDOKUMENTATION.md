# Projektdokumentation: IT-Sicherheitskompass

## Transparenzhinweis zur Entwicklungsmethode

**Dieses Projekt wurde nicht von mir selbst programmiert.** Die gesamte Code-Implementierung wurde durch Claude (Anthropic) im Rahmen von Claude Code durchgeführt -- einem KI-gestützten Entwicklungswerkzeug, das ich als Kommandozeilen-Tool genutzt habe.

**Meine Rolle war die eines technischen Projektleiters und fachlichen Entscheiders.** Ich habe das Projekt von der ersten Idee bis zum fertigen Produkt gesteuert: Anforderungen definiert, Architekturentscheidungen getroffen, fachliche Inhalte vorgegeben, jeden Entwicklungsschritt reviewt und bei Fehlern korrigierend eingegriffen. Der Code stammt von der KI -- die Richtung, das Fachwissen und die Qualitätskontrolle stammen von mir.

Ich halte diese Transparenz für wichtig, weil:
1. KI-gestützte Entwicklung die Zukunft der Softwareentwicklung ist -- nicht das Eingeständnis einer Schwäche
2. Die Fähigkeit, ein KI-Werkzeug effektiv zu führen, eine eigenständige und wertvolle Kompetenz darstellt
3. Ehrlichkeit meinem Anspruch an Integrität entspricht

---

## Projektübersicht

| Merkmal | Details |
|---------|---------|
| **Produkt** | IT-Sicherheitskompass -- Multi-Regulation Compliance-Plattform für deutsche KMU |
| **Zweck** | KMU können prüfen, welche IT-Sicherheitsgesetze für sie gelten, ihren Compliance-Stand bewerten und konkrete Maßnahmen ableiten |
| **Regelwerke** | NIS2, DSGVO, KRITIS, DORA, TISAX, CRA, BSI IT-Grundschutz (7 Regelwerke) |
| **Wissensplattform** | 8 Säulen der IT-Sicherheit mit 24 Fachkomponenten inkl. interaktiver Elemente |
| **Zielgruppe** | Geschäftsführer und IT-Verantwortliche deutscher KMU (10-500 Mitarbeiter) |
| **Sprachen** | Deutsch (primär), Englisch |
| **Entwicklungszeitraum** | 06.02.2026 -- 09.02.2026 (4 Tage) |
| **Build** | 0 Errors, 206 statisch generierte Seiten |
| **Rechtsgrundlage** | NIS2UmsG, EU 2022/2555, DSGVO, BSIG, DORA, CRA, VDA ISA, BSI IT-Grundschutz Edition 2023 |

---

## Technologie-Stack

| Technologie | Version | Entscheidung durch mich |
|-------------|---------|------------------------|
| Next.js | 16.1.6 (App Router + Pages Router) | Ja -- moderne React-Basis, SSR, Vercel-Deployment |
| TypeScript | 5.x | Ja -- Typsicherheit für komplexe Domain-Logik |
| Tailwind CSS | 4.x | Ja -- Utility-First für schnelle Iterationen |
| shadcn/ui | 3.8.4 | Ja -- professionelle UI-Komponenten, kein "Studentenprojekt"-Look |
| next-intl | 4.8.2 | Ja -- Internationalisierung von Anfang an |
| Zustand | 5.x (mit Persist-Middleware) | Ja -- leichtgewichtiges State Management |
| @react-pdf/renderer | 4.3.2 | Ja -- serverseitige PDF-Generierung |
| react-hook-form + Zod | 7.x / 4.x | Ja -- Formularvalidierung |

---

## Was ich konkret beigetragen habe

### 1. Fachliche Konzeption und Domänenwissen

Das gesamte Fachwissen zu 7 Regelwerken, das die Grundlage des Tools bildet, stammt aus meiner eigenständigen Recherche. Ohne dieses Wissen hätte keine KI die richtigen Fragen, Bewertungslogiken oder Empfehlungen generieren können.

**Meine fachlichen Vorgaben:**

- **7 Regelwerke** mit jeweils eigenständiger Domänenlogik: Kategorien, Fragen, Empfehlungen, Klassifikation, Schnellcheck, Konfiguration
- **NIS2:** 18 Sektoren nach Anlage 1+2 BSIG, Klassifikation nach §28, 50 Fragen über 10 Art. 21(2) Mindestmaßnahmen, 30 Empfehlungen mit BSI-Baustein-Bezügen
- **DSGVO:** 10 Kategorien (Auftragsverarbeitung, DSFA, TOM, Betroffenenrechte, etc.), 50 Fragen, 30 Empfehlungen
- **KRITIS:** 8 Kategorien basierend auf BSI-KritisV, KRITIS-spezifische Schwellenwerte
- **DORA:** 6 Säulen-Kategorien (ICT-Risikomanagement, Vorfallmeldung, Resilience-Tests, etc.)
- **TISAX:** VDA ISA-basierte Kategorien, Assessment-Level-Mapping
- **CRA:** Produktsicherheits-Kategorien nach EU Cyber Resilience Act
- **BSI IT-Grundschutz:** Bausteinbasierte Kategorien (ORP, CON, OPS, DER, INF, SYS, NET, APP)
- **8 Säulen der IT-Sicherheit:** 24 Fachkomponenten mit Szenario → Rechtslage → Lösung → Nutzen-Flow, inkl. 3 interaktive Star-Komponenten (Schatten-IT-Analyse, Cloud Shared-Responsibility-Diagramm, Melde-Timer)

**Bewertungsmethodik:** 4-stufige Reifegradskala, Ampel-Schwellenwerte (Rot < 40%, Gelb 40-70%, Grün > 70%), Supply-Chain-Hinweise auch für nicht direkt betroffene Unternehmen.

### 2. Marktrecherche und Kostenvalidierung

Eigenständige Marktrecherche mit 25+ Quellen (634 Zeilen, dokumentiert in `.planning/market-research-nis2-costs-2025-2026.md`):

- **Berater-Tagessätze:** IT-Security €900-1.400, ISMS/ISO 27001 €1.100-1.500, Pentester €1.000-1.800
- **NIS2-Gesamtkosten nach Unternehmensgröße:** 50 MA (~€55.000/Jahr), 100 MA (~€97.000/Jahr), 250 MA (~€291.000/Jahr)
- **Nationale Zahlen:** €2,3 Mrd. jährliche Compliance-Kosten, ~29.500 betroffene Unternehmen

### 3. Architekturentscheidungen

| Entscheidung | Mein Rationale |
|-------------|----------------|
| Multi-Regulation Registry Pattern | Jedes Regelwerk registriert sich beim Import -- skalierbar, keine Hardcoding |
| 8-Säulen-Wissensplattform als separates System | Ordnungsprinzip für Dashboard + Wissensvermittlung, unabhängig von Regelwerken |
| Navigator als zentraler Einstieg | 4 Fragen → Regelwerk-Empfehlung → Dashboard -- klarer linearer Flow |
| Dashboard als Zentrale | Firmenprofil + 8 Säulen + Regelwerk-Status statt verstreuter Einstiegspunkte |
| Store Factory Pattern | Per-Regulation Zustand-Stores mit Module-Level-Caching -- keine Dateninterferenzen |
| App Router + Pages Router hybrid | App Router für UI, Pages Router für PDF-API (React 19 Kompatibilität) |
| Anonym by Design | Keine Registrierung, keine Cookies, keine Analytics -- DSGVO-minimal |
| localStorage Persistence | Navigator-Ergebnisse persistent für Dashboard-Firmenprofil |
| BSI-seriöse Farbgebung | Slate-900/800 Hero, nüchterne Fortschrittsbalken, kein Pastellregen |

### 4. UX-Design und Nutzerführung

**Gewünschter Flow (von mir definiert):**
```
Landing → Quiz (2 Min) → Ergebnis-Summary → Dashboard (8 Säulen + Regelwerke)
                                                   ↓
                                          Regelwerk starten → Schnellcheck → Assessment → Ergebnisse
                                                   ↓
                                          Wissen vertiefen → Säule → Komponente
```

**Konkrete UX-Entscheidungen:**
- **Ein CTA auf der Landing Page** statt 3 konkurrierende Einstiege -- "Status prüfen — 2 Minuten"
- **3 Schritte** statt 5 in "So funktioniert's" -- weniger ist mehr
- **Regulation Landing vereinfacht:** Ein Primary CTA + Text-Links statt 2-3 Karten
- **Schnellcheck-Ergebnis:** Rückwärts-Flow entfernt (kein "Betroffenheit prüfen"-Button mehr), dafür Dashboard-Link
- **Navigator Result:** Ehrliche Summary-Box statt Fake-Personalisierung, Top-3 universelle Maßnahmen
- **Dashboard:** Firmenprofil aus Navigator-Daten, 8 Säulen-Grid, kompakte Regelwerk-Tabelle mit Smart CTAs

### 5. PDF-Report-Konzeption

14 Sektionen (modular an-/abwählbar): Deckblatt, Executive Summary, Unternehmensprofil, Gesamtbewertung, Kategorieergebnisse, Empfehlungen, Bußgeld, Roadmap, Kosten, DSGVO-Overlap, ISO 27001 Crosswalk, Branchenhinweise, DIN SPEC 27076, KRITIS-Spezial.

### 6. Qualitätskontrolle und Fehlerkorrekturen

- **next/link statt i18n-Router:** Locale-Prefix überspringt, korrigiert zu `@/lib/i18n/routing`
- **Array-Mutation:** `.sort()` direkt auf Props -- korrigiert zu `[...arr].sort()`
- **Hardcoded Strings:** Konsequent Translation-Keys eingefordert
- **Doppelter Wissen-Link im Header:** Entdeckt und in der Flow-Neuordnung bereinigt
- **Dashboard 50 hardcoded Questions:** Auf dynamische Registry-Abfrage umgestellt

### 7. Projektsteuerung und Priorisierung

- **Transformation gesteuert:** Von NIS2-only zu Multi-Regulation-Plattform (7 Regelwerke)
- **Wissensplattform konzipiert:** 8 Säulen × 3 MVP-Komponenten = 24 Fachkomponenten mit DE+EN Content
- **Flow-Neuordnung:** Chaotisches Navigationskonzept mit 3 konkurrierenden Einstiegen → klarer linearer Flow
- **BSI-seriöser Ton:** Weg von Startup-Ästhetik, hin zu behördlich-nüchternem Design

---

## Projektstruktur

### Seitenstruktur (17+ Routen, 206 generierte Seiten)

| Route | Funktion |
|-------|----------|
| `/` | Landing Page -- Dark Hero, ein CTA, 3-Schritte, Regelwerk-Shortcut, Identity |
| `/navigator` | 4-Schritt-Wizard → Regelwerk-Empfehlung mit localStorage-Persistence |
| `/dashboard` | Firmenprofil + 8 Säulen + Regelwerk-Status + Synergien |
| `/wissen` | 8-Säulen-Übersicht |
| `/wissen/[pillarSlug]` | Säulen-Detailseite |
| `/wissen/[pillarSlug]/[componentSlug]` | Fachkomponente (Szenario → Recht → Lösung) |
| `/[regulation]` | Regulation Landing (1 CTA + Text-Links) |
| `/[regulation]/schnellcheck` | Schnellcheck (10 Fragen) |
| `/[regulation]/schnellcheck/ergebnis` | Schnellcheck-Ergebnis |
| `/[regulation]/check` | Betroffenheitsprüfung (NIS2-only) |
| `/[regulation]/assessment` | Gap-Analyse-Wizard |
| `/[regulation]/results` | Ergebnis-Dashboard mit PDF-Download |
| `/[regulation]/info/*` | Info-Seiten (NIS2: Meldepflichten, Geschäftsleitung, Registrierung) |
| `/imprint` | Impressum |
| `/privacy` | Datenschutz |

### Multi-Regulation Architektur

| Komponente | Beschreibung |
|-----------|-------------|
| `src/lib/regulations/registry.ts` | Zentrale Registry -- register on import |
| `src/lib/regulations/{regId}/` | 7 Domänenlogik-Pakete (types, categories, questions, recommendations, classification, quick-check, config) |
| `src/lib/pillars/` | 8-Säulen Registry mit Types, Data, Init |
| `src/hooks/useRegulationConfig.ts` | Regulation-Context-Hook |
| `src/stores/store-factory.ts` | Per-Regulation Store-Instanzen |
| `src/lib/regulations/overlaps.ts` | Regelwerk-Synergien-Mapping |

### NIS2-Domänenmodell (Kernregelwerk, 3.523 Zeilen)

| Modul | Zeilen | Inhalt |
|-------|--------|--------|
| `questions.ts` | 987 | 50 Gap-Analyse-Fragen (30 Core + 20 Advanced) |
| `recommendations.ts` | 369 | 30 priorisierte Handlungsempfehlungen |
| `cost-estimation.ts` | 369 | Kostenschätzung nach Unternehmensgröße |
| `sector-guidance.ts` | 241 | Branchenspezifische Hinweise (14 Sektoren) |
| `roadmap.ts` | 163 | 3-Phasen-Implementierungsplan |
| `dsgvo-overlap.ts` | 148 | DSGVO-NIS2-Überlappungsanalyse |
| `sectors.ts` | 143 | 18 NIS2-Sektoren mit Teilsektoren |
| + weitere Module | ~700 | Bußgeld, Meldepflichten, Evidence, ISO 27001, DIN SPEC, etc. |

### PDF-Report (20 Komponenten, NIS2)

Deckblatt, Executive Summary, Unternehmensprofil, Gesamtreifegrad, Kategorieergebnisse, Empfehlungen, Bußgeld, Roadmap, Kosten, DSGVO-Overlap, ISO 27001, Branchenhinweise, DIN SPEC, KRITIS, Evidence, Glossar, Fortschritt, CTA.

### State Management

| Store | Zweck |
|-------|-------|
| `store-factory.ts` | Factory für per-Regulation Assessment/QuickCheck/Progress Stores |
| `wizard-store` | Betroffenheitscheck (NIS2) |
| `gap-analysis-store` | NIS2 Gap-Analyse (Legacy, wird von Factory ersetzt) |
| `navigator-results-storage` | Navigator-Ergebnisse (localStorage, kein Zustand) |

---

## Entwicklungsprozess

### Phasen-Übersicht

```
Phase 1: Foundation                      06.02.2026   ████████████ 100%
Phase 2: NIS2 Content + Scoring Engine   06.02.2026   ████████████ 100%
Phase 3: Affected Check                  06.02.2026   ████████████ 100%
Phase 4: Gap Analysis Wizard             06.02.2026   ████████████ 100%
Phase 5: Results Dashboard               06.02.2026   ████████████ 100%
Phase 6: PDF Report                      07.02.2026   ████████████ 100%
Phase 7: Polish + Legal                  07.02.2026   ████████░░░░  66%
--- Transformation ---
Multi-Regulation Genericization          08.02.2026   ████████████ 100%
8-Säulen-Wissensplattform (Phase 1+2)   09.02.2026   ████████████ 100%
Seitenstruktur & Flow-Neuordnung         09.02.2026   ████████████ 100%
```

### Transformationsschritte (08.--09.02.2026)

1. **NIS2-only → 7 Regelwerke:** Registry Pattern, Domain-Logik für DSGVO/KRITIS/DORA/TISAX/CRA/BSI-Grundschutz
2. **Wissensplattform:** 8 Säulen × 3 Komponenten = 24 Fachkomponenten mit vollständigem DE+EN Content
3. **Flow-Neuordnung:** Landing (Dark Hero, 1 CTA) → Navigator → Dashboard (Firmenprofil + 8 Säulen + Regelwerke) → Regelwerk-Flow

---

## Kompetenznachweis

### Was dieses Projekt über mich zeigt

| Kompetenz | Nachweis |
|-----------|----------|
| **IT-Security-Fachwissen** | 7 Regelwerke mit korrekten Rechtsreferenzen, 200+ Prüffragen, 8 Säulen Wissensinhalte |
| **Marktkenntnis** | 634 Zeilen Marktrecherche mit 25+ Quellen |
| **Projektmanagement** | Transformation von NIS2-Tool zu Multi-Regulation-Plattform in 4 Tagen |
| **UX-Denken** | Klarer linearer Flow, BSI-seriöses Design, zielgruppengerechte Entscheidungen |
| **Qualitätsbewusstsein** | Fehler selbst gefunden und korrigiert (Routing, Mutations, i18n, doppelte Links) |
| **KI-Führungskompetenz** | Effektive Steuerung eines KI-Werkzeugs über ein komplexes Mehrphasen-Projekt |
| **Architektur-Verständnis** | Registry Pattern, Store Factory, Multi-Regulation Routing, Pillar-System |
| **Zweisprachigkeit** | ~6.000+ Übersetzungszeilen pro Sprache (DE/EN) |

### Was dieses Projekt NICHT über mich zeigt

- Ich bin kein erfahrener Programmierer -- der Code stammt von der KI
- Ich kann (noch) nicht jede Zeile TypeScript im Detail erklären
- Meine Stärke liegt in der Führung, nicht in der Implementierung

---

## Zusammenfassung

Dieses Projekt demonstriert **KI-gestütztes Projektmanagement** in der Praxis:

1. **Vision definiert** -- vom NIS2-Tool zur Multi-Regulation-Plattform mit 8-Säulen-Wissensbereich
2. **Fachwissen eingebracht** -- 7 Regelwerke, BSI-Grundschutz, KMU-Praxis
3. **Entscheidungen getroffen** -- Architektur, UX, Priorisierung, Flow-Design
4. **Qualität gesichert** -- getestet, Fehler gefunden, korrigiert
5. **Iteriert** -- Features nachgeschärft, Navigation vereinfacht, Scope gemanagt

Das Ergebnis: Eine professionelle, fachlich fundierte Compliance-Plattform mit 206 Seiten, 7 Regelwerken, 200+ Prüffragen, 8 Säulen Wissensinhalte, PDF-Report und vollständiger Zweisprachigkeit -- in 4 Tagen.

---

**Erstellt:** 08.02.2026
**Aktualisiert:** 09.02.2026
**Autor:** Andre Michele Joannou
**Tool:** Claude Code (Anthropic Claude Opus 4.6)
**Projektrepository:** [URL]
