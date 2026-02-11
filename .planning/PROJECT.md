# NIS2 Readiness Check

## What This Is

Ein professionelles Web-Tool, mit dem deutsche KMU ihre NIS2-Compliance selbst bewerten können. Zweistufig: Erst Betroffenheitsprüfung (bin ich von NIS2 betroffen?), dann Gap-Analyse (wo sind meine Lücken?). Ergebnis ist eine Ampel-Übersicht, ein Compliance-Score und ein herunterladbarer PDF-Report mit konkreten Handlungsempfehlungen. Deutsch und Englisch. Anonym nutzbar, keine Registrierung.

## Core Value

KMU können in 15-20 Minuten herausfinden, ob sie von NIS2 betroffen sind und wo ihre größten Compliance-Lücken liegen — basierend auf den echten Anforderungen aus NIS2UmsG, EU-Richtlinie 2022/2555 und BSI IT-Grundschutz.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Betroffenheitsprüfung basierend auf NIS2-Sektoren, Unternehmensgröße und Umsatz
- [ ] Gap-Analyse über alle 10 NIS2 Art. 21(2) Mindestmaßnahmen
- [ ] Ampel-Bewertung (Grün/Gelb/Rot) pro Bereich und Gesamt
- [ ] Prozentualer Compliance-Score mit Fortschrittsbalken pro Kategorie
- [ ] PDF-Report-Generierung mit Ergebnissen und Handlungsempfehlungen
- [ ] Zweisprachig: Deutsch und Englisch
- [ ] Anonym nutzbar (keine Registrierung, keine Datenspeicherung)
- [ ] Responsive Design (Desktop + Mobile)
- [ ] Rechtsgrundlage: NIS2UmsG + EU 2022/2555 + BSI IT-Grundschutz
- [ ] Quellenangaben zu jeder Frage/Empfehlung (Artikel, Paragraph, BSI-Referenz)
- [ ] Professionelles UI (kein Uni-Projekt-Look, echtes Beratungstool-Niveau)

### Out of Scope

- Benutzer-Accounts / Login-System — anonym by design, DSGVO-minimal
- Datenspeicherung serverseitig — alle Antworten bleiben im Browser
- Rechtsverbindliche Beratung — Tool ist Orientierungshilfe, kein Rechtsanwalt-Ersatz (Disclaimer)
- ISMS-Implementierung — Tool zeigt Lücken auf, implementiert keine Maßnahmen
- Branchenspezifische Tiefenprüfung — generische NIS2-Prüfung, keine Sektor-Spezialisierung
- CMS / Blog — reines Tool, kein Content-Management

## Context

**Zweck:**
Umfassende IT-Sicherheitsplattform für deutsche KMU — zentraler Anlaufpunkt für alle Compliance-Anforderungen (gesetzlich, branchenspezifisch, kundengetrieben). Zeigt technische Skills und IT-Security-Fachwissen, dient gleichzeitig als Grundlage für Beratungstätigkeit.

**NIS2-Hintergrund:**
- EU-Richtlinie 2022/2555 (NIS2) erweitert regulierte Unternehmen in DE von ~4.500 auf ~30.000
- Deutsche Umsetzung: NIS-2-Umsetzungs- und Cybersicherheitsstärkungsgesetz (NIS2UmsG)
- BSI-Registrierungspflicht mit Deadline
- Viele KMU wissen nicht ob sie betroffen sind oder was sie tun müssen
- Art. 21(2) definiert 10 Mindestmaßnahmen die geprüft werden müssen

**NIS2 Art. 21(2) Mindestmaßnahmen (Kern der Gap-Analyse):**
1. Konzepte für Risikoanalyse und Sicherheit von Informationssystemen
2. Bewältigung von Sicherheitsvorfällen
3. Aufrechterhaltung des Betriebs (BCM, Backup, Krisenmanagement)
4. Sicherheit der Lieferkette
5. Sicherheit bei Erwerb, Entwicklung und Wartung von IT-Systemen
6. Konzepte zur Bewertung der Wirksamkeit von Risikomanagementmaßnahmen
7. Cyberhygiene und Schulungen
8. Kryptografie und Verschlüsselung
9. Personalsicherheit, Zugriffskontrolle, Asset Management
10. Multi-Faktor-Authentifizierung und sichere Kommunikation

**Technischer Hintergrund des Entwicklers:**
- Umschulung Fachinformatiker Daten- und Prozessanalyse (laufend)
- CCNA in Vorbereitung (~40-45% ready)
- NIS2-Recherche bereits durchgeführt (umfangreiche Research-Dokumente vorhanden)
- React/TypeScript: Lernprojekt — Qualität muss trotzdem professionell sein

## Constraints

- **Kontinuierliche Entwicklung**: Kein festes Enddatum — Plattform wächst mit neuen Regelwerken und Features
- **Akkuratesse**: Jede Frage, jede Bewertungslogik und jede Empfehlung muss auf echten NIS2-Anforderungen basieren mit nachvollziehbarer Quellenangabe — kein "ungefähr"
- **Tech Stack**: React + TypeScript (Frontend), Backend für PDF-Generierung, Deployment auf Vercel
- **Zweisprachig**: Deutsch + Englisch (i18n von Anfang an einplanen)
- **DSGVO**: Keine personenbezogenen Daten erfassen, keine Cookies (außer technisch notwendig), keine Analytics ohne Consent
- **Professionell**: Design muss auf Beratungstool-Niveau sein — ist Visitenkarte für Praktikums-Bewerbung

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + TypeScript | Industrie-Standard, zeigt moderne Webdev-Skills, großes Ökosystem | — Pending |
| Backend für PDF-Generierung | Server-seitige PDF-Erstellung ermöglicht professionellere Reports | — Pending |
| Vercel Deployment | Kostenlos, schnell, GitHub-Integration, zeigt DevOps-Awareness | — Pending |
| Anonym by Design | Maximale Nutzungsbereitschaft, DSGVO-minimal, kein Login-Overhead | — Pending |
| NIS2UmsG + EU 2022/2555 + BSI Grundschutz | Dreifache Rechtsgrundlage für maximale Akkuratesse und Glaubwürdigkeit | — Pending |
| Deutsch + Englisch | Zeigt Internationalität für Bewerbung, Deutsch für KMU-Zielgruppe | — Pending |

---
*Last updated: 2026-02-06 after initialization*
