# Requirements: NIS2 Readiness Check

**Defined:** 2026-02-06
**Core Value:** KMU können in 15-20 Minuten herausfinden, ob sie von NIS2 betroffen sind und wo ihre größten Compliance-Lücken liegen.

## v1 Requirements

### Betroffenheitsprüfung (Step 1)

- [ ] **AFFECT-01**: User kann Unternehmenssektor aus allen 18 NIS2-Sektoren auswählen (11 Anlage 1 + 7 Anlage 2 BSIG)
- [ ] **AFFECT-02**: User gibt Mitarbeiterzahl und Jahresumsatz ein zur Größenklassifizierung
- [ ] **AFFECT-03**: System klassifiziert Unternehmen als "besonders wichtige Einrichtung", "wichtige Einrichtung" oder "nicht betroffen" basierend auf §28 BSIG
- [ ] **AFFECT-04**: Sonderfälle werden korrekt behandelt (DNS, TLD-Registries, qTSP, Telko-Anbieter — immer "besonders wichtig" unabhängig von Größe)
- [ ] **AFFECT-05**: Ergebnis zeigt Klassifizierung mit nachvollziehbarer Begründung und Gesetzesreferenz (§28 Abs. 1/2 BSIG)
- [ ] **AFFECT-06**: Bei "nicht betroffen": Hinweis auf Lieferkettensicherheit (Art. 21(2)(d)) — Kunden/Partner könnten trotzdem NIS2-Anforderungen stellen

### Gap Analysis (Step 2)

- [ ] **GAP-01**: Gap Analysis umfasst alle 10 NIS2 Art. 21(2) Mindestmaßnahmen als separate Kategorien
- [ ] **GAP-02**: Jede Kategorie hat 3-4 Fragen (30-40 Fragen gesamt, max. 20 Minuten)
- [ ] **GAP-03**: Fragen nutzen 4-stufige Reifegrad-Skala: Nicht umgesetzt (0) / Teilweise (1) / Größtenteils (2) / Vollständig (3)
- [ ] **GAP-04**: Jede Frage referenziert den spezifischen EU-Artikel (Art. 21(2)(a)-(j)) und korrespondierenden BSIG-Paragraphen (§30 Abs. 2 Nr. 1-10)
- [ ] **GAP-05**: Fragen sind in verständlicher Sprache formuliert (KMU-Management-Niveau, nicht IT-Experten-Niveau)
- [ ] **GAP-06**: Technische Fachbegriffe haben Tooltip-Erklärungen (Info-Icon mit Popup)
- [ ] **GAP-07**: User kann zwischen Kategorien vor- und zurücknavigieren ohne Datenverlust
- [ ] **GAP-08**: Fortschrittsanzeige zeigt aktuelle Kategorie und Gesamtfortschritt ("Bereich 3 von 10 — Aufrechterhaltung des Betriebs")

### Scoring & Ergebnisse (Step 3)

- [ ] **SCORE-01**: Pro Kategorie wird ein Reifegrad-Score berechnet (0-100%) mit Ampel-Bewertung (Rot <40%, Gelb 40-70%, Grün >70%)
- [ ] **SCORE-02**: Gesamt-Readiness-Score als Orientierungswert (kein "Compliance-Score" — explizit als "Reifegrad" / "Readiness" bezeichnet)
- [ ] **SCORE-03**: Ergebnisseite zeigt alle 10 Kategorien mit Traffic-Light-Karten und Score-Balken
- [ ] **SCORE-04**: Priorisierte Handlungsempfehlungen pro Kategorie mit Rot-Bereichen zuerst
- [ ] **SCORE-05**: Jede Empfehlung enthält: konkreten ersten Schritt, Gesetzesreferenz, und BSI IT-Grundschutz-Baustein-Verweis
- [ ] **SCORE-06**: Hinweis: "Ein hoher Score bedeutet nicht automatisch NIS2-Konformität. Jede Maßnahme muss angemessen umgesetzt sein."
- [ ] **SCORE-07**: Scoring-Methodik wird transparent erklärt (wie wird der Score berechnet)

### PDF Report

- [ ] **PDF-01**: User kann Ergebnisse als professionellen PDF-Report herunterladen
- [ ] **PDF-02**: PDF enthält: Unternehmensprofil (Sektor, Größe, Klassifizierung), alle Kategorie-Scores mit Ampel, Handlungsempfehlungen, Gesetzesreferenzen
- [ ] **PDF-03**: PDF hat Legal Disclaimer auf erster Seite
- [ ] **PDF-04**: PDF enthält Rechtsstand-Datum und Erstellungsdatum
- [ ] **PDF-05**: PDF rendert deutsche Umlaute (ä, ö, ü, ß) korrekt
- [ ] **PDF-06**: PDF-Generierung funktioniert auf Vercel (serverless, <10s)

### Internationalisierung

- [ ] **I18N-01**: Gesamte UI ist auf Deutsch verfügbar (primäre Sprache)
- [ ] **I18N-02**: Gesamte UI ist auf Englisch verfügbar (sekundäre Sprache)
- [ ] **I18N-03**: Sprachumschalter ist jederzeit sichtbar und nutzbar
- [ ] **I18N-04**: PDF-Report wird in der gewählten Sprache generiert
- [ ] **I18N-05**: Gesetzesreferenzen bleiben in Originalsprache (deutsch), auch in englischer UI-Version

### Rechtliches & DSGVO

- [ ] **LEGAL-01**: Disclaimer vor Start der Bewertung: "keine Rechtsberatung, unverbindliche Orientierungshilfe"
- [ ] **LEGAL-02**: Disclaimer auf Ergebnisseite und in PDF
- [ ] **LEGAL-03**: Impressum vorhanden (deutsches Telemedienrecht)
- [ ] **LEGAL-04**: Datenschutzhinweis: "Keine personenbezogenen Daten werden erhoben oder gespeichert"
- [ ] **LEGAL-05**: Rechtsstand-Datum sichtbar in Footer und PDF
- [ ] **LEGAL-06**: Ergebnisse verwenden bedingte Sprache ("Ihre Angaben deuten darauf hin..." statt "Sie sind betroffen")
- [ ] **LEGAL-07**: Alle Gesetzesreferenzen basieren auf finalem NIS2UmsG (BGBl. 2025 I Nr. 301), nicht auf Entwurfsfassungen

### UI & UX

- [ ] **UX-01**: Professionelles Design auf Beratungstool-Niveau (kein Student-Projekt-Look)
- [ ] **UX-02**: Konsistentes Design-System (Farben, Typografie, Spacing)
- [ ] **UX-03**: Responsive Design (Desktop + Tablet + Mobile, getestet auf 375px Breite)
- [ ] **UX-04**: Subtile Animationen bei Schritt-Übergängen
- [ ] **UX-05**: Eigenes Favicon und Seitentitel "NIS2 Readiness Check" (kein React/Vite-Default)
- [ ] **UX-06**: Kein console.log in Production, keine Placeholder-Texte

### Technische Grundlagen

- [ ] **TECH-01**: Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui
- [ ] **TECH-02**: Deployment auf Vercel (Production Build funktioniert)
- [ ] **TECH-03**: Alle NIS2-Inhalte als strukturierte Daten (TypeScript/JSON), nicht hardcoded in Komponenten
- [ ] **TECH-04**: Scoring-Engine als pure TypeScript-Funktionen (kein React, testbar)
- [ ] **TECH-05**: Anonym by design: kein Auth, keine Datenbank, keine Cookies, keine Analytics

## v2 Requirements

### Erweiterte Features

- **V2-01**: BSI Betroffenheitsprüfung-Vergleich (10+ Testfälle gegen BSI-Tool validiert)
- **V2-02**: Reifegrad-Radar-Chart / Spider-Diagramm für visuelle Darstellung
- **V2-03**: Ergebnisse per URL teilen (encoded State)
- **V2-04**: Print-optimiertes CSS
- **V2-05**: KRITIS-Mapping für Unternehmen die auch unter BSI-KritisV fallen
- **V2-06**: localStorage-Persistenz mit "Daten löschen"-Button und DSGVO-Hinweis

### Erweiterte Inhalte

- **V2-07**: Branchenspezifische Empfehlungen (z.B. spezifisch für Logistik, Energie, etc.)
- **V2-08**: Vergleich mit BSI Lagebericht-Benchmarks
- **V2-09**: Multi-Framework Assessment (ISO 27001 + NIS2 kombiniert)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Benutzer-Accounts / Login | Anonym by design, DSGVO-minimal, kein Server-Overhead |
| Datenbank / Server-seitige Speicherung | Keine Datenspeicherung = keine DSGVO-Verarbeitungsprobleme |
| AI-generierte Empfehlungen | Halluzinationsrisiko bei Rechtsthemen, Datenschutzbedenken, API-Kosten |
| Continuous Monitoring / Dashboard | SaaS-Territorium, weit über Scope hinaus |
| ISMS-Plattform-Integrationen | API-Aufwand, erfordert Partnerschaften |
| Consulting-Booking / Lead-Generierung | Macht Tool zum Sales-Funnel, untergräbt Glaubwürdigkeit als Portfolio |
| WCAG AAA | Zu strikt für 10-Tage-Timeline. WCAG AA ist Ziel. |
| Admin-Panel | Kein CMS, Inhalte sind Code-basiert |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TECH-01 | Phase 1 | Pending |
| TECH-02 | Phase 1 | Pending |
| TECH-03 | Phase 1 | Pending |
| TECH-05 | Phase 1 | Pending |
| UX-01 | Phase 1 | Pending |
| UX-02 | Phase 1 | Pending |
| UX-05 | Phase 1 | Pending |
| I18N-01 | Phase 1 | Pending |
| I18N-02 | Phase 1 | Pending |
| I18N-03 | Phase 1 | Pending |
| LEGAL-07 | Phase 2 | Pending |
| TECH-04 | Phase 2 | Pending |
| GAP-01 | Phase 2 | Pending |
| GAP-02 | Phase 2 | Pending |
| GAP-03 | Phase 2 | Pending |
| GAP-04 | Phase 2 | Pending |
| GAP-05 | Phase 2 | Pending |
| GAP-06 | Phase 2 | Pending |
| SCORE-01 | Phase 2 | Pending |
| SCORE-05 | Phase 2 | Pending |
| SCORE-07 | Phase 2 | Pending |
| AFFECT-01 | Phase 3 | Pending |
| AFFECT-02 | Phase 3 | Pending |
| AFFECT-03 | Phase 3 | Pending |
| AFFECT-04 | Phase 3 | Pending |
| AFFECT-05 | Phase 3 | Pending |
| AFFECT-06 | Phase 3 | Pending |
| GAP-07 | Phase 4 | Pending |
| GAP-08 | Phase 4 | Pending |
| SCORE-02 | Phase 5 | Pending |
| SCORE-03 | Phase 5 | Pending |
| SCORE-04 | Phase 5 | Pending |
| SCORE-06 | Phase 5 | Pending |
| PDF-01 | Phase 6 | Pending |
| PDF-02 | Phase 6 | Pending |
| PDF-03 | Phase 6 | Pending |
| PDF-04 | Phase 6 | Pending |
| PDF-05 | Phase 6 | Pending |
| PDF-06 | Phase 6 | Pending |
| I18N-04 | Phase 6 | Pending |
| I18N-05 | Phase 6 | Pending |
| UX-03 | Phase 7 | Pending |
| UX-04 | Phase 7 | Pending |
| UX-06 | Phase 7 | Pending |
| LEGAL-01 | Phase 7 | Pending |
| LEGAL-02 | Phase 7 | Pending |
| LEGAL-03 | Phase 7 | Pending |
| LEGAL-04 | Phase 7 | Pending |
| LEGAL-05 | Phase 7 | Pending |
| LEGAL-06 | Phase 7 | Pending |
| TECH-02 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 46 total
- Mapped to phases: 46
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-06*
*Last updated: 2026-02-06 after initial definition*
