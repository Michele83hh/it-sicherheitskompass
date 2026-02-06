# Phase 2: NIS2 Content + Scoring Engine - Research

**Researched:** 2026-02-06
**Domain:** NIS2 legal implementation, cybersecurity assessment frameworks, TypeScript scoring engines
**Confidence:** HIGH (legal references), MEDIUM (BSI building block mappings), HIGH (technical implementation)

## Summary

Phase 2 requires implementing the "brain" of the NIS2 Readiness Check tool: all domain knowledge as structured TypeScript data with a pure, testable scoring engine. The research confirms that the NIS2UmsG (BGBl. 2025 I Nr. 301) provides exact legal foundations with 18 sectors across Anlagen 1 and 2, 10 mandatory measure categories from Art. 21(2) mapped to §30 BSIG, and clear classification thresholds in §28 BSIG.

The implementation will use:
- **Legal foundation**: NIS2UmsG (in force Dec 6, 2025) with exact sector lists and thresholds
- **10 measure categories**: Direct mapping between EU Art. 21(2)(a-j) and BSIG §30 Abs. 2 Nr. 1-10
- **BSI IT-Grundschutz**: 111 building blocks (Edition 2023) provide concrete implementation guidance
- **Maturity assessment**: 4-level scale (0-3) converts to percentage scores with traffic light thresholds
- **Pure TypeScript functions**: Scoring engine with vitest unit tests, independent of React

**Primary recommendation:** Structure all NIS2 content as TypeScript const objects with translation keys for i18n, implement scoring as pure functions with comprehensive vitest tests, and map each of the 10 categories to specific BSI IT-Grundschutz building blocks for actionable recommendations.

## Legal Foundation: NIS2UmsG and BSIG

### Official Legal Basis

**NIS2-Umsetzungsgesetz (NIS2UmsG):**
- Published: Bundesgesetzblatt 2025 I Nr. 301 (December 5, 2025)
- In force: December 6, 2025
- Official URL: https://www.recht.bund.de/bgbl/1/2025/301/VO.html
- Implements: EU Directive (EU) 2022/2555 (NIS2-Richtlinie)

**Key amendments to BSIG (BSI-Gesetz):**
- §28 BSIG: Classification rules for "besonders wichtige" and "wichtige" Einrichtungen
- §30 BSIG: 10 mandatory risk management measures (Risikomanagementmaßnahmen)
- Anlage 1 + 2: 18 regulated sectors

### The 18 NIS2 Sectors

**Anlage 1 (7 sectors - Besonders wichtige + Wichtige Einrichtungen):**

1. **Energie** (Energy)
   - Stromversorgung (Electricity supply)
   - Fernwärme-/Fernkälteversorgung (District heating/cooling)
   - Kraftstoff- und Heizölversorgung (Fuel and heating oil supply)
   - Gasversorgung (Gas supply)

2. **Transport und Verkehr** (Transport and Traffic)
   - Luftverkehr (Air traffic)
   - Schienenverkehr (Rail transport)
   - Schifffahrt (Maritime transport)
   - Straßenverkehr (Road traffic)

3. **Finanz- und Versicherungswesen** (Finance and Insurance)
   - Bankwesen (Banking)
   - Finanzmarktinfrastrukturen (Financial market infrastructure)

4. **Gesundheit** (Health)
   - Gesundheitsdienstleistungen (Health services)

5. **Wasser** (Water)
   - Trinkwasserversorgung (Drinking water supply)
   - Abwasserbeseitigung (Wastewater disposal)

6. **Digitale Infrastruktur** (Digital Infrastructure)
   - Internet Exchange Points (IXPs)
   - DNS service providers
   - Top-Level Domain (TLD) registries
   - Cloud computing services
   - Data center services
   - Content Delivery Networks (CDNs)
   - Trust service providers (TSP)

7. **Weltraum** (Space)
   - Bodeninfrastrukturen für Weltraumaktivitäten (Ground infrastructure for space activities)

**Anlage 2 (7 sectors - Wichtige Einrichtungen only):**

8. **Transport und Verkehr** (Transport and Traffic)
   - Post- und Kurierdienste (Postal and courier services)

9. **Abfallbewirtschaftung** (Waste Management)

10. **Produktion, Herstellung und Handel mit chemischen Stoffen** (Chemical Production and Trade)

11. **Produktion, Verarbeitung und Vertrieb von Lebensmitteln** (Food Production and Distribution)

12. **Verarbeitendes Gewerbe/Herstellung von Waren** (Manufacturing/Production of Goods)
    - Herstellung von Medizinprodukten und In-vitro-Diagnostika (Medical devices and in vitro diagnostics)
    - Herstellung von Datenverarbeitungsgeräten, elektronischen und optischen Erzeugnissen (Data processing equipment, electronic and optical products)
    - Herstellung von elektrischen Ausrüstungen (Electrical equipment)
    - Maschinenbau (Mechanical engineering)
    - Herstellung von Kraftwagen und Kraftwagenteilen (Motor vehicles and parts)
    - Sonstiger Fahrzeugbau (Other vehicle manufacturing)

13. **Anbieter digitaler Dienste** (Digital Service Providers)
    - Online-Marktplätze (Online marketplaces)
    - Online-Suchmaschinen (Search engines)
    - Plattformen für Dienste sozialer Netzwerke (Social network platforms)

14. **Forschung** (Research)
    - Forschungseinrichtungen (Research facilities)

**Total:** 14 unique sectors with 18 sector categories when counting Transport twice and Digital Infrastructure/Digital Services separately

### §28 BSIG: Classification Thresholds

**Besonders wichtige Einrichtungen (Particularly important entities):**

Category 1 - Always "besonders wichtig" regardless of size:
- Operators of critical infrastructure (KRITIS per existing BSI designations)
- Qualified trust service providers (qTSP)
- Top-level domain (TLD) registries
- DNS service providers

Category 2 - Telecommunications providers if:
- ≥50 employees, OR
- Annual revenue >€10M AND balance sheet >€10M

Category 3 - Other sectors (Anlage 1) if:
- ≥250 employees, OR
- Annual revenue >€50M AND balance sheet >€43M

**Wichtige Einrichtungen (Important entities):**

Telecommunications providers if:
- <50 employees AND (revenue ≤€10M OR balance sheet ≤€10M)

Other sectors (Anlagen 1 + 2) if:
- ≥50 employees, OR
- Annual revenue >€10M AND balance sheet >€10M

**Calculation rules:**
- Thresholds follow EU Recommendation 2003/361/EG (except Article 3 Para 4 of annex)
- Seasonal employee fluctuations within a year are not decisive
- Negligible business activities can be disregarded when assigning sector classification

### Art. 21(2) Measure Categories → §30 BSIG Mapping

**Complete 10-category mapping (letter to number):**

| EU Art. 21(2) | BSIG §30 Abs. 2 | German Name (BSIG) |
|---------------|-----------------|-------------------|
| (a) | Nr. 1 | Konzepte in Bezug auf die Risikoanalyse und auf die Sicherheit in der Informationstechnik |
| (b) | Nr. 2 | Bewältigung von Sicherheitsvorfällen |
| (c) | Nr. 3 | Aufrechterhaltung des Betriebs, wie Backup-Management und Wiederherstellung nach einem Notfall, und Krisenmanagement |
| (d) | Nr. 4 | Sicherheit der Lieferkette einschließlich sicherheitsbezogener Aspekte der Beziehungen zu unmittelbaren Anbietern oder Diensteanbietern |
| (e) | Nr. 5 | Sicherheitsmaßnahmen bei Erwerb, Entwicklung und Wartung von informationstechnischen Systemen, Komponenten und Prozessen, einschließlich Management und Offenlegung von Schwachstellen |
| (f) | Nr. 6 | Konzepte und Verfahren zur Bewertung der Wirksamkeit von Risikomanagementmaßnahmen im Bereich der Sicherheit |
| (g) | Nr. 7 | Grundlegende Schulungen und Sensibilisierungsmaßnahmen im Bereich der Sicherheit in der Informationstechnik |
| (h) | Nr. 8 | Konzepte und Prozesse für den Einsatz von kryptographischen Verfahren |
| (i) | Nr. 9 | Erstellung von Konzepten für die Sicherheit des Personals, die Zugriffskontrolle und für die Verwaltung von IKT-Systemen, -Produkten und -Prozessen |
| (j) | Nr. 10 | Verwendung von Lösungen zur Multi-Faktor-Authentifizierung oder kontinuierlichen Authentifizierung, gesicherte Sprach-, Video- und Textkommunikation sowie gegebenenfalls gesicherte Notfallkommunikationssysteme |

**Legal principle:** §30 Abs. 1 BSIG requires "geeignete, verhältnismäßige und wirksame technische und organisatorische Maßnahmen" (suitable, proportionate, and effective technical and organizational measures) with the goal of avoiding disruptions to availability, integrity, and confidentiality of IT systems and minimizing impacts of security incidents.

## BSI IT-Grundschutz Building Blocks

### Current State: Edition 2023

**Official source:** BSI IT-Grundschutz-Kompendium Edition 2023
- Total: 111 building blocks (Bausteine)
- Organized: 10 thematic layers (Schichten)
- URL: https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/IT-Grundschutz-Bausteine/Bausteine_Download_Edition_node.html

**Future state:** "Grundschutz++" modernization planned, multi-year transition until ~2029, Edition 2023 remains certification-relevant

### Core Building Blocks by Layer

**ISMS (Information Security Management System):**
- ISMS.1 - Sicherheitsmanagement (Security Management)

**ORP (Organisation und Personal):**
- ORP.1 - Organisation
- ORP.2 - Personal
- ORP.3 - Sensibilisierung und Schulung zur Informationssicherheit (Awareness and Training)
- ORP.4 - Identitäts- und Berechtigungsmanagement (Identity and Access Management)
- ORP.5 - Compliance Management

**CON (Konzeption und Vorgehensweisen):**
- CON.1 - Kryptokonzept (Cryptography Concept)
- CON.2 - Datenschutz (Data Protection)
- CON.3 - Datensicherungskonzept (Backup Concept)
- CON.7 - Informationssicherheit auf Auslandsreisen (Information Security During Foreign Travel)
- CON.8 - Software-Entwicklung (Software Development)
- CON.10 - Entwicklung von Webanwendungen (Web Application Development)
- CON.11 - Verschlusssachenanlagen (Classified Information Facilities)

**OPS (Betrieb):**
- OPS.1.1.1 - Allgemeiner IT-Betrieb (General IT Operations)
- OPS.1.1.2 - Ordnungsgemäße IT-Administration (Proper IT Administration)
- OPS.1.1.3 - Patch- und Änderungsmanagement (Patch and Change Management)
- OPS.1.1.4 - Schutz vor Schadprogrammen (Malware Protection)
- OPS.1.1.5 - Protokollierung (Logging)
- OPS.1.1.6 - Software-Tests und -Freigaben (Software Testing and Release)
- OPS.1.1.7 - Systemmanagement (System Management)
- OPS.1.2.2 - Archivierung (Archiving)
- OPS.1.2.4 - Telearbeit (Telework)
- OPS.1.2.5 - Fernwartung (Remote Maintenance)
- OPS.2.2 - Cloud-Nutzung (Cloud Usage)
- OPS.2.4 - Fernwartung (Remote Maintenance)

**APP (Anwendungen):**
- APP.1.1 - Office-Produkte (Office Products)
- APP.1.2 - Webbrowser (Web Browsers)
- APP.1.4 - Mobile Anwendungen (Mobile Applications/Apps)
- APP.2.1 - Allgemeiner Verzeichnisdienst (General Directory Service)
- APP.2.2 - Active Directory Domain Services
- APP.3.1 - Webanwendungen und Webservices (Web Applications and Web Services)
- APP.3.2 - Webserver
- APP.4.2 - SAP-ERP-System
- APP.4.3 - Relationale Datenbanksysteme (Relational Database Systems)
- APP.5.x - E-Mail/Groupware systems

**SYS (Systeme):**
- SYS.1.1 - Allgemeiner Server (General Server)
- SYS.1.3 - Server unter Linux und Unix
- SYS.2.1 - Allgemeiner Client (General Client)
- SYS.2.2.3 - Clients unter Windows
- SYS.2.3 - Clients unter Linux und Unix
- SYS.3.1 - Laptops
- SYS.3.2.1 - Allgemeine Smartphones und Tablets
- SYS.3.2.2 - Mobile Device Management (MDM)
- SYS.3.2.3 - iOS (for Enterprise)
- SYS.3.2.4 - Android

**NET (Netze und Kommunikation):**
- NET.1.1 - Netzarchitektur und -design (Network Architecture and Design)
- NET.1.2 - Netzmanagement (Network Management)
- NET.2.1 - WLAN-Betrieb (WLAN Operation)
- NET.3.1 - Router und Switches
- NET.3.2 - Firewall
- NET.4.1 - TLS-Verschlüsselung (TLS Encryption)
- NET.4.2 - VoIP

**IND (Industrielle IT):**
- IND.1 - Betriebs- und Steuerungstechnik (Operation and Control Technology)
- IND.2.x - ICS components and systems

**INF (Infrastruktur):**
- INF.1 - Allgemeines Gebäude (General Building)
- INF.2 - Rechenzentrum sowie Serverraum (Data Center and Server Room)
- INF.3 - Elektrotechnische Verkabelung (Electrical Cabling)
- INF.4 - IT-Verkabelung (IT Cabling)

**DER (Detektion und Reaktion):**
- DER.1 - Detektion von sicherheitsrelevanten Ereignissen (Detection of Security-Relevant Events)
- DER.2.1 - Behandlung von Sicherheitsvorfällen (Incident Response)
- DER.2.2 - Vorsorge für die IT-Forensik (IT Forensics Preparedness)
- DER.2.3 - Bereinigung weitreichender Sicherheitsvorfälle (Recovery from Wide-Ranging Security Incidents)
- DER.4 - Notfallmanagement (Emergency Management)

### NIS2 Art. 21(2) → BSI Building Block Mapping

Based on research findings, here are recommended mappings for each NIS2 category to BSI IT-Grundschutz building blocks:

**Category 1: Risikoanalyse und Sicherheit der Informationssysteme**
- Primary: ISMS.1 (Sicherheitsmanagement)
- Supporting: ORP.1 (Organisation), DER.1 (Detektion)
- Reference: BSI-Standard 200-3 (Risikomanagement)

**Category 2: Bewältigung von Sicherheitsvorfällen**
- Primary: DER.2.1 (Behandlung von Sicherheitsvorfällen)
- Supporting: DER.2.2 (IT-Forensik), DER.2.3 (Bereinigung), OPS.1.1.5 (Protokollierung)
- Reference: BSI-Standard 100-4 (Notfallmanagement)

**Category 3: Aufrechterhaltung des Betriebs (Backup, Recovery, Krisenmanagement)**
- Primary: CON.3 (Datensicherungskonzept), DER.4 (Notfallmanagement)
- Supporting: DER.2.3 (Bereinigung), OPS.1.2.2 (Archivierung)
- Reference: BSI-Standard 200-4 (Business Continuity Management)

**Category 4: Sicherheit der Lieferkette**
- Primary: ORP.1 (Organisation - Supplier Management aspects)
- Supporting: OPS.1.1.3 (Patch- und Änderungsmanagement), APP/SYS.x (Product-specific)
- Reference: Supply chain considerations across multiple building blocks

**Category 5: Sicherheit bei Erwerb, Entwicklung und Wartung**
- Primary: CON.8 (Software-Entwicklung), OPS.1.1.6 (Software-Tests)
- Supporting: OPS.1.1.3 (Patch- und Änderungsmanagement), CON.10 (Webanwendungen)
- Reference: Secure SDLC considerations

**Category 6: Bewertung der Wirksamkeit**
- Primary: ISMS.1 (Sicherheitsmanagement - Audit/Review cycles)
- Supporting: OPS.1.1.6 (Software-Tests), ORP.5 (Compliance Management)
- Reference: Continuous improvement processes

**Category 7: Cyberhygiene und Schulungen**
- Primary: ORP.3 (Sensibilisierung und Schulung)
- Supporting: OPS.1.1.4 (Schutz vor Schadprogrammen), ORP.2 (Personal)
- Reference: Awareness training programs

**Category 8: Kryptografie und Verschlüsselung**
- Primary: CON.1 (Kryptokonzept)
- Supporting: NET.4.1 (TLS-Verschlüsselung), APP/SYS-specific encryption
- Reference: Cryptographic standards and key management

**Category 9: Sicherheit des Personals, Zugriffskontrolle, Verwaltung von Anlagen**
- Primary: ORP.4 (Identitäts- und Berechtigungsmanagement), ORP.2 (Personal)
- Supporting: INF.1 (Gebäude), INF.2 (Rechenzentrum), SYS.3.2.2 (MDM)
- Reference: Physical and logical access controls

**Category 10: Multi-Faktor-Authentifizierung, gesicherte Kommunikation**
- Primary: ORP.4 (Identitäts- und Berechtigungsmanagement - MFA aspects)
- Supporting: NET.4.1 (TLS), NET.4.2 (VoIP), APP-specific authentication
- Reference: Modern authentication standards

**Important limitation:** Research found that BSI IT-Grundschutz building blocks emphasize management-system requirements more than technical hardening measures. The NIS2 Durchführungsverordnung (implementing regulation) addresses areas where traditional Grundschutz has gaps, particularly in web application security (CON.10, APP.3.1, APP.3.2), classified information (CON.11.1), and operational details (OPS.1.1.x, NET.x, SYS.x).

## Question Design for Gap Analysis

### Maturity Scale: 4-Level Assessment

**Standard maturity levels for NIS2 assessment:**

| Level | Label | Score | Description |
|-------|-------|-------|-------------|
| 0 | Nicht umgesetzt | 0 | Not implemented - no measures exist |
| 1 | Teilweise | 33.33% | Partially implemented - some ad-hoc measures exist |
| 2 | Größtenteils | 66.67% | Largely implemented - systematic measures exist with gaps |
| 3 | Vollständig | 100% | Fully implemented - comprehensive, documented, and tested |

**Rationale for 4 levels:**
- Simple enough for non-experts to self-assess in 15-20 minutes
- Sufficient granularity to differentiate maturity states
- Maps cleanly to percentage scores: 0% → 33% → 67% → 100%
- Industry-standard for maturity models (avoiding false precision of 5+ levels)

### Question Guidelines for KMU Management Level

**Target audience:** Business managers and decision-makers, NOT IT security specialists

**Language principles:**
1. **Avoid IT jargon** - Use business language: "Notfallplan" not "Business Continuity Plan (BCP)"
2. **Provide tooltips** for unavoidable technical terms - Info icon with popup explanation
3. **Focus on outcomes** - "Können Sie nach einem Cyberangriff innerhalb von 24 Stunden wieder arbeiten?" rather than "Haben Sie ein dokumentiertes RTO/RPO-Konzept?"
4. **Use concrete examples** - "z.B. regelmäßige Backups, getestet" instead of abstract requirements
5. **Reference business impact** - Connect security measures to business continuity, reputation, legal compliance
6. **Keep questions short** - Max 2 sentences, target 15-20 words

**Question structure template:**
```
[Business-oriented question about capability or practice]?

Tooltip: [1-2 sentence explanation of technical term or legal requirement]

Maturity options:
- Nicht umgesetzt: [What "none" looks like]
- Teilweise: [What "partial" looks like]
- Größtenteils: [What "mostly" looks like]
- Vollständig: [What "complete" looks like]
```

### Example Questions per Category

**Category 1: Risikoanalyse und Sicherheit**
- "Haben Sie eine aktuelle Übersicht über Ihre IT-Risiken (z.B. welche Systeme kritisch sind, wo Schwachstellen liegen)?"
  - Tooltip: "NIS2 fordert regelmäßige Risikoanalysen (Art. 21(2)(a), §30 Abs. 2 Nr. 1 BSIG). Das BSI empfiehlt die Methodik aus BSI-Standard 200-3."
- "Sind Ihre IT-Sicherheitsmaßnahmen schriftlich dokumentiert und werden regelmäßig aktualisiert?"
- "Haben Sie klare Verantwortlichkeiten für IT-Sicherheit festgelegt (z.B. benannte Ansprechperson)?"

**Category 2: Bewältigung von Sicherheitsvorfällen**
- "Gibt es ein festgelegtes Verfahren, wie Ihr Unternehmen auf Cyberangriffe oder IT-Störungen reagiert?"
  - Tooltip: "NIS2 verlangt dokumentierte Prozesse für Incident Response (Art. 21(2)(b), §30 Abs. 2 Nr. 2 BSIG). Siehe BSI-Baustein DER.2.1."
- "Haben Sie Kontaktdaten für den Notfall (z.B. BSI, externe IT-Dienstleister) griffbereit?"
- "Werden Sicherheitsvorfälle protokolliert und ausgewertet, um daraus zu lernen?"

**Category 3: Aufrechterhaltung des Betriebs**
- "Erstellen Sie regelmäßig Backups Ihrer wichtigen Daten und testen diese auch?"
  - Tooltip: "NIS2 fordert Backup-Management und Wiederherstellungsfähigkeit (Art. 21(2)(c), §30 Abs. 2 Nr. 3 BSIG). Siehe BSI-Standard 200-4 für BCM-Anforderungen."
- "Können Sie nach einem schweren IT-Ausfall innerhalb von 24-48 Stunden Ihren Betrieb wieder aufnehmen?"
- "Haben Sie einen schriftlichen Notfallplan für den Fall eines Cyberangriffs oder Systemausfalls?"

**Category 4: Sicherheit der Lieferkette**
- "Prüfen Sie die IT-Sicherheit Ihrer wichtigsten Lieferanten und Dienstleister?"
  - Tooltip: "NIS2 verlangt Prüfung der Sicherheit direkter Lieferanten und Dienstleister (Art. 21(2)(d), §30 Abs. 2 Nr. 4 BSIG). Besonders wichtig bei Cloud-Diensten und IT-Outsourcing."
- "Haben Sie vertragliche Vereinbarungen zur IT-Sicherheit mit Ihren IT-Dienstleistern?"
- "Wissen Sie, welche externen Dienstleister Zugriff auf Ihre kritischen Systeme oder Daten haben?"

**Category 5: Sicherheit bei Erwerb, Entwicklung und Wartung**
- "Berücksichtigen Sie IT-Sicherheitsaspekte bereits beim Kauf oder bei der Entwicklung neuer Software?"
  - Tooltip: "NIS2 fordert Security-by-Design und Schwachstellenmanagement (Art. 21(2)(e), §30 Abs. 2 Nr. 5 BSIG). Siehe BSI-Baustein CON.8 für sichere Entwicklung."
- "Werden Sicherheitsupdates für Ihre IT-Systeme zeitnah eingespielt?"
- "Haben Sie einen Prozess, um Schwachstellen in Ihrer Software zu erkennen und zu beheben?"

**Category 6: Bewertung der Wirksamkeit**
- "Überprüfen Sie regelmäßig, ob Ihre Sicherheitsmaßnahmen tatsächlich wirken (z.B. durch Audits oder Tests)?"
  - Tooltip: "NIS2 verlangt regelmäßige Wirksamkeitsprüfung (Art. 21(2)(f), §30 Abs. 2 Nr. 6 BSIG). Das gehört zum kontinuierlichen Verbesserungsprozess (PDCA-Zyklus)."
- "Führen Sie Penetrationstests oder Sicherheitsübungen durch?"
- "Werden die Ergebnisse von Sicherheitsprüfungen dokumentiert und daraus Verbesserungsmaßnahmen abgeleitet?"

**Category 7: Cyberhygiene und Schulungen**
- "Werden Ihre Mitarbeiter regelmäßig zu IT-Sicherheitsthemen geschult (z.B. Phishing, sichere Passwörter)?"
  - Tooltip: "NIS2 fordert grundlegende Schulungen und Sensibilisierung (Art. 21(2)(g), §30 Abs. 2 Nr. 7 BSIG). Siehe BSI-Baustein ORP.3 für Awareness-Programme."
- "Gibt es klare Richtlinien für sicheres Verhalten (z.B. Passwortregeln, Umgang mit E-Mail-Anhängen)?"
- "Werden neue Mitarbeiter systematisch in IT-Sicherheitsthemen eingewiesen?"

**Category 8: Kryptografie und Verschlüsselung**
- "Werden vertrauliche Daten verschlüsselt gespeichert und übertragen (z.B. via HTTPS, VPN)?"
  - Tooltip: "NIS2 verlangt kryptographische Verfahren zum Schutz sensibler Daten (Art. 21(2)(h), §30 Abs. 2 Nr. 8 BSIG). Siehe BSI-Baustein CON.1 für Kryptokonzepte."
- "Haben Sie ein Konzept, welche Daten verschlüsselt werden müssen und mit welchen Verfahren?"
- "Werden kryptographische Schlüssel sicher verwaltet (z.B. nicht im Klartext gespeichert)?"

**Category 9: Zugriffskontrolle und Personalsicherheit**
- "Haben nur autorisierte Personen Zugriff auf kritische IT-Systeme und Daten (Prinzip der minimalen Berechtigung)?"
  - Tooltip: "NIS2 fordert Zugriffskontrolle und Identitätsmanagement (Art. 21(2)(i), §30 Abs. 2 Nr. 9 BSIG). Siehe BSI-Baustein ORP.4 für IAM-Anforderungen."
- "Werden Zugriffsrechte regelmäßig überprüft und bei Ausscheiden von Mitarbeitern sofort entzogen?"
- "Sind physische Zugangskontrollen zu kritischen IT-Bereichen (z.B. Serverraum) vorhanden?"

**Category 10: Multi-Faktor-Authentifizierung und gesicherte Kommunikation**
- "Nutzen Sie Multi-Faktor-Authentifizierung (z.B. SMS-Code, App) für den Zugriff auf kritische Systeme?"
  - Tooltip: "NIS2 verlangt MFA für privilegierte Zugänge (Art. 21(2)(j), §30 Abs. 2 Nr. 10 BSIG). Das schützt vor Passwortdiebstahl."
- "Wird vertrauliche Kommunikation verschlüsselt (z.B. verschlüsselte E-Mails, sichere Videokonferenzen)?"
- "Haben Sie sichere Kommunikationsmittel für Notfälle (z.B. separate Notfall-Telefonnummern)?"

**Question count target:** 30-40 total questions across 10 categories = 3-4 per category

## Scoring Engine Design

### Architecture: Pure TypeScript Functions

**Core principle:** Scoring engine must be independent of UI framework (React), fully testable with vitest, and side-effect-free.

**Recommended structure:**
```typescript
// src/lib/scoring/types.ts
export type MaturityLevel = 0 | 1 | 2 | 3;

export interface Answer {
  questionId: string;
  categoryId: string;
  level: MaturityLevel;
}

export interface CategoryScore {
  categoryId: string;
  percentage: number;
  trafficLight: 'red' | 'yellow' | 'green';
  answeredQuestions: number;
  totalQuestions: number;
}

export interface OverallScore {
  percentage: number;
  categoryScores: CategoryScore[];
  completionRate: number;
}

// src/lib/scoring/engine.ts
export function calculateCategoryScore(
  answers: Answer[],
  categoryId: string,
  totalQuestionsInCategory: number
): CategoryScore {
  // Pure function implementation
}

export function calculateOverallScore(
  answers: Answer[],
  questionCatalog: QuestionCatalog
): OverallScore {
  // Pure function implementation
}

export function getTrafficLight(percentage: number): 'red' | 'yellow' | 'green' {
  if (percentage < 40) return 'red';
  if (percentage < 70) return 'yellow';
  return 'green';
}
```

### Scoring Calculation Methodology

**Per-category score:**
1. Filter answers by categoryId
2. Map each answer's MaturityLevel to percentage: 0→0%, 1→33.33%, 2→66.67%, 3→100%
3. Calculate average percentage across all answered questions in category
4. Apply traffic light threshold to average
5. Return CategoryScore object

**Formula:**
```
CategoryPercentage = Σ(answerLevel × 33.33) / answeredQuestions
```

**Overall readiness score:**
1. Calculate all 10 category scores
2. Average the category percentages (equal weighting)
3. Calculate completion rate (answered questions / total questions)
4. Return OverallScore object

**Formula:**
```
OverallPercentage = Σ(categoryPercentage) / 10
CompletionRate = answeredQuestions / totalQuestions × 100
```

### Traffic Light Thresholds

**Industry-standard RAG (Red-Amber-Green) thresholds for maturity assessment:**

| Color | Percentage Range | Label (German) | Interpretation |
|-------|------------------|----------------|----------------|
| Red | 0% - 39% | Rot - Handlungsbedarf | Significant gaps, immediate action required |
| Yellow | 40% - 69% | Gelb - Verbesserungsbedarf | Partial implementation, improvements needed |
| Green | 70% - 100% | Grün - Guter Reifegrad | Comprehensive implementation, maintain and optimize |

**Rationale:**
- <40%: Less than "Teilweise" level on average → critical gaps
- 40-69%: Between "Teilweise" and "Größtenteils" → on the right track but incomplete
- ≥70%: Approaching or exceeding "Größtenteils" → mature implementation

**Important disclaimer:** A green score does NOT automatically mean NIS2 compliance. Every measure must be "suitable, proportionate, and effective" (§30 Abs. 1 BSIG) for the organization's specific risk profile. The tool provides orientation, not certification.

### Testing Strategy with Vitest

**Test structure:**
```typescript
// src/lib/scoring/engine.test.ts
import { describe, it, expect } from 'vitest';
import { calculateCategoryScore, getTrafficLight, calculateOverallScore } from './engine';

describe('Scoring Engine', () => {
  describe('getTrafficLight', () => {
    it('returns red for scores below 40%', () => {
      expect(getTrafficLight(0)).toBe('red');
      expect(getTrafficLight(39)).toBe('red');
    });

    it('returns yellow for scores 40-69%', () => {
      expect(getTrafficLight(40)).toBe('yellow');
      expect(getTrafficLight(69)).toBe('yellow');
    });

    it('returns green for scores 70% and above', () => {
      expect(getTrafficLight(70)).toBe('green');
      expect(getTrafficLight(100)).toBe('green');
    });

    it('handles boundary values correctly', () => {
      expect(getTrafficLight(39.9)).toBe('red');
      expect(getTrafficLight(40.0)).toBe('yellow');
      expect(getTrafficLight(69.9)).toBe('yellow');
      expect(getTrafficLight(70.0)).toBe('green');
    });
  });

  describe('calculateCategoryScore', () => {
    it('calculates percentage correctly for all level-0 answers', () => {
      const answers = [
        { questionId: 'q1', categoryId: 'cat1', level: 0 },
        { questionId: 'q2', categoryId: 'cat1', level: 0 },
        { questionId: 'q3', categoryId: 'cat1', level: 0 },
      ];
      const result = calculateCategoryScore(answers, 'cat1', 3);
      expect(result.percentage).toBe(0);
      expect(result.trafficLight).toBe('red');
    });

    it('calculates percentage correctly for all level-3 answers', () => {
      const answers = [
        { questionId: 'q1', categoryId: 'cat1', level: 3 },
        { questionId: 'q2', categoryId: 'cat1', level: 3 },
        { questionId: 'q3', categoryId: 'cat1', level: 3 },
      ];
      const result = calculateCategoryScore(answers, 'cat1', 3);
      expect(result.percentage).toBe(100);
      expect(result.trafficLight).toBe('green');
    });

    it('calculates percentage correctly for mixed levels', () => {
      const answers = [
        { questionId: 'q1', categoryId: 'cat1', level: 0 }, // 0%
        { questionId: 'q2', categoryId: 'cat1', level: 1 }, // 33.33%
        { questionId: 'q3', categoryId: 'cat1', level: 2 }, // 66.67%
        { questionId: 'q4', categoryId: 'cat1', level: 3 }, // 100%
      ];
      const result = calculateCategoryScore(answers, 'cat1', 4);
      expect(result.percentage).toBeCloseTo(50, 1); // (0+33.33+66.67+100)/4 = 50
      expect(result.trafficLight).toBe('yellow');
    });

    it('filters answers by categoryId correctly', () => {
      const answers = [
        { questionId: 'q1', categoryId: 'cat1', level: 3 },
        { questionId: 'q2', categoryId: 'cat2', level: 0 }, // Different category
        { questionId: 'q3', categoryId: 'cat1', level: 3 },
      ];
      const result = calculateCategoryScore(answers, 'cat1', 4);
      expect(result.answeredQuestions).toBe(2);
      expect(result.percentage).toBe(100);
    });

    it('handles empty answers array', () => {
      const result = calculateCategoryScore([], 'cat1', 4);
      expect(result.percentage).toBe(0);
      expect(result.answeredQuestions).toBe(0);
    });
  });

  describe('calculateOverallScore', () => {
    // Test overall score calculation with mock question catalog
    // Test equal weighting across categories
    // Test completion rate calculation
  });
});
```

**Test coverage requirements:**
- All pure functions have unit tests
- Boundary value testing for thresholds
- Edge cases: empty answers, partial completion, mixed levels
- Floating-point precision handling
- CategoryId filtering correctness

**Vitest setup:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Pure functions don't need jsdom
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/scoring/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## TypeScript Data Structure Design

### Question Catalog Structure

**Recommended pattern:** Translation keys approach for i18n compatibility

```typescript
// src/lib/nis2/types.ts
export interface Question {
  id: string;
  categoryId: string;
  titleKey: string; // Translation key: "questions.q1.title"
  tooltipKey: string; // Translation key: "questions.q1.tooltip"
  legalReference: {
    euArticle: string; // "Art. 21(2)(a)"
    bsigParagraph: string; // "§30 Abs. 2 Nr. 1 BSIG"
  };
  maturityDescriptions: {
    level0Key: string; // "questions.q1.maturity.level0"
    level1Key: string;
    level2Key: string;
    level3Key: string;
  };
}

export interface Category {
  id: string;
  nameKey: string; // Translation key: "categories.cat1.name"
  descriptionKey: string;
  euArticle: string;
  bsigParagraph: string;
  bsiBuiltingBlocks: string[]; // ["ISMS.1", "ORP.1", "DER.1"]
  questions: Question[];
}

export interface Recommendation {
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  titleKey: string;
  descriptionKey: string;
  firstStepKey: string;
  legalReference: string;
  bsiReference: string;
}

// src/lib/nis2/catalog.ts
export const CATEGORIES: Category[] = [
  {
    id: 'risk-analysis',
    nameKey: 'categories.riskAnalysis.name',
    descriptionKey: 'categories.riskAnalysis.description',
    euArticle: 'Art. 21(2)(a)',
    bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    bsiBuiltingBlocks: ['ISMS.1', 'ORP.1', 'DER.1'],
    questions: [/* ... */],
  },
  // ... 9 more categories
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    categoryId: 'risk-analysis',
    priority: 'high',
    titleKey: 'recommendations.riskAnalysis.createRiskInventory.title',
    descriptionKey: 'recommendations.riskAnalysis.createRiskInventory.description',
    firstStepKey: 'recommendations.riskAnalysis.createRiskInventory.firstStep',
    legalReference: 'Art. 21(2)(a), §30 Abs. 2 Nr. 1 BSIG',
    bsiReference: 'BSI-Standard 200-3 (Risikomanagement), ISMS.1',
  },
  // ... more recommendations
];
```

**Translation file structure (German):**
```json
// src/messages/de.json
{
  "categories": {
    "riskAnalysis": {
      "name": "Risikoanalyse und Sicherheit",
      "description": "Konzepte in Bezug auf die Risikoanalyse und auf die Sicherheit in der Informationstechnik"
    }
  },
  "questions": {
    "q1": {
      "title": "Haben Sie eine aktuelle Übersicht über Ihre IT-Risiken?",
      "tooltip": "NIS2 fordert regelmäßige Risikoanalysen (Art. 21(2)(a), §30 Abs. 2 Nr. 1 BSIG). Das BSI empfiehlt die Methodik aus BSI-Standard 200-3.",
      "maturity": {
        "level0": "Keine Risikoanalyse vorhanden",
        "level1": "Grobe Einschätzung vorhanden, nicht dokumentiert",
        "level2": "Dokumentierte Risikoanalyse, aber nicht regelmäßig aktualisiert",
        "level3": "Regelmäßige, dokumentierte Risikoanalyse nach BSI-Standard"
      }
    }
  },
  "recommendations": {
    "riskAnalysis": {
      "createRiskInventory": {
        "title": "Erstellen Sie ein IT-Risikoinventar",
        "description": "Identifizieren Sie systematisch alle kritischen IT-Systeme, Daten und Prozesse sowie deren Gefährdungen.",
        "firstStep": "Beginnen Sie mit einer Liste Ihrer 5 wichtigsten IT-Systeme und bewerten Sie deren Kritikalität für den Geschäftsbetrieb."
      }
    }
  }
}
```

### Sector Classification Data

```typescript
// src/lib/nis2/sectors.ts
export interface Sector {
  id: string;
  nameKey: string;
  anlage: 1 | 2; // Anlage 1 or Anlage 2
  subsectors?: Array<{ id: string; nameKey: string }>;
}

export const SECTORS: Sector[] = [
  {
    id: 'energy',
    nameKey: 'sectors.energy.name',
    anlage: 1,
    subsectors: [
      { id: 'electricity', nameKey: 'sectors.energy.electricity' },
      { id: 'district-heating', nameKey: 'sectors.energy.districtHeating' },
      { id: 'fuel', nameKey: 'sectors.energy.fuel' },
      { id: 'gas', nameKey: 'sectors.energy.gas' },
    ],
  },
  // ... 17 more sectors
];

export interface ClassificationThresholds {
  besondersWichtig: {
    alwaysQualified: string[]; // Sector IDs: ['dns', 'tld', 'qtsp', 'telco']
    telecom: { employees: number; revenue: number; balanceSheet: number };
    others: { employees: number; revenue: number; balanceSheet: number };
  };
  wichtig: {
    telecom: { employees: number; revenue: number; balanceSheet: number };
    others: { employees: number; revenue: number; balanceSheet: number };
  };
}

export const THRESHOLDS: ClassificationThresholds = {
  besondersWichtig: {
    alwaysQualified: ['dns', 'tld', 'qtsp', 'kritis'], // Sector/subsector IDs
    telecom: { employees: 50, revenue: 10_000_000, balanceSheet: 10_000_000 },
    others: { employees: 250, revenue: 50_000_000, balanceSheet: 43_000_000 },
  },
  wichtig: {
    telecom: { employees: 50, revenue: 10_000_000, balanceSheet: 10_000_000 }, // Below threshold
    others: { employees: 50, revenue: 10_000_000, balanceSheet: 10_000_000 },
  },
};

// Pure classification function
export function classifyEntity(
  sectorId: string,
  subsectorId: string | null,
  employees: number,
  revenue: number,
  balanceSheet: number
): 'besonders-wichtig' | 'wichtig' | 'nicht-betroffen' {
  // Classification logic per §28 BSIG
}
```

### Confidence Assessment

| Area | Confidence | Rationale |
|------|------------|-----------|
| Legal foundation (sectors, thresholds, categories) | HIGH | Verified with official BGBl 2025 I Nr. 301, multiple authoritative sources agree |
| BSI building block mappings | MEDIUM | General mappings identified, but detailed NIS2 Durchführungsverordnung-to-Grundschutz mapping is still evolving; BSI is modernizing Grundschutz++ |
| Question design patterns | HIGH | Industry-standard maturity assessment practices, multiple sources on KMU-level language, confirmed 4-level scale usage |
| Scoring methodology | HIGH | Standard weighted average calculation, verified traffic light thresholds from multiple maturity assessment frameworks |
| TypeScript patterns | HIGH | next-intl documentation, vitest official guides, established i18n patterns |

## Architecture Patterns

### Recommended Project Structure

```
src/
├── lib/
│   ├── nis2/
│   │   ├── types.ts              # All NIS2 domain types
│   │   ├── sectors.ts            # 18 sectors + classification logic
│   │   ├── categories.ts         # 10 measure categories
│   │   ├── questions.ts          # 30-40 question catalog
│   │   ├── recommendations.ts    # Recommendation templates
│   │   └── constants.ts          # Legal references, thresholds
│   ├── scoring/
│   │   ├── types.ts              # Scoring types (Answer, Score, etc.)
│   │   ├── engine.ts             # Pure scoring functions
│   │   ├── engine.test.ts        # Vitest unit tests
│   │   └── traffic-light.ts      # Threshold logic
│   └── i18n/
│       ├── routing.ts            # (Existing from Phase 1)
│       └── request.ts            # (Existing from Phase 1)
├── messages/
│   ├── de.json                   # German translations
│   └── en.json                   # English translations
└── stores/
    └── wizard-store.ts           # (Existing from Phase 1)
```

### Pattern 1: Separation of Data and Logic

**What:** NIS2 content (sectors, questions, recommendations) lives in separate const objects from scoring logic

**When to use:** Always - this is a core requirement (TECH-03, TECH-04)

**Example:**
```typescript
// ✅ GOOD: Data separate from logic
// src/lib/nis2/questions.ts
export const QUESTION_CATALOG = { /* ... */ };

// src/lib/scoring/engine.ts
import { QUESTION_CATALOG } from '@/lib/nis2/questions';
export function calculateScore(answers: Answer[]) {
  // Uses catalog but doesn't contain it
}

// ❌ BAD: Logic and data mixed
export function calculateScore() {
  const questions = [/* hardcoded */]; // Never do this
}
```

### Pattern 2: Translation Keys vs Inline Text

**What:** Store translation keys in data structures, not inline German/English text

**When to use:** All user-facing strings in NIS2 domain data

**Example:**
```typescript
// ✅ GOOD: Translation key approach
const category = {
  id: 'risk-analysis',
  nameKey: 'categories.riskAnalysis.name', // Resolved at runtime
};

// Component usage
import { useTranslations } from 'next-intl';
const t = useTranslations();
<h2>{t(category.nameKey)}</h2>

// ❌ BAD: Inline text
const category = {
  id: 'risk-analysis',
  nameDe: 'Risikoanalyse', // Hard to maintain, breaks i18n
  nameEn: 'Risk Analysis',
};
```

### Pattern 3: Pure Functions for Scoring

**What:** All scoring functions are pure (same input → same output, no side effects)

**When to use:** All scoring calculations

**Example:**
```typescript
// ✅ GOOD: Pure function
export function calculateCategoryScore(
  answers: Answer[],
  categoryId: string,
  totalQuestions: number
): CategoryScore {
  const categoryAnswers = answers.filter(a => a.categoryId === categoryId);
  const sum = categoryAnswers.reduce((acc, a) => acc + (a.level * 33.33), 0);
  const percentage = categoryAnswers.length > 0 ? sum / categoryAnswers.length : 0;

  return {
    categoryId,
    percentage,
    trafficLight: getTrafficLight(percentage),
    answeredQuestions: categoryAnswers.length,
    totalQuestions,
  };
}

// ❌ BAD: Impure function (side effects)
let globalScore = 0; // Global state
export function calculateCategoryScore(answers: Answer[]) {
  globalScore += answers.length; // Side effect - modifies global
  fetch('/api/log', { body: JSON.stringify(answers) }); // Side effect - network call
  return { /* ... */ };
}
```

### Anti-Patterns to Avoid

**1. Hardcoding NIS2 content in React components**
```typescript
// ❌ BAD
function CategoryCard() {
  return <div>Risikoanalyse und Sicherheit</div>; // Hardcoded
}

// ✅ GOOD
import { CATEGORIES } from '@/lib/nis2/categories';
function CategoryCard({ categoryId }: { categoryId: string }) {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const t = useTranslations();
  return <div>{t(category.nameKey)}</div>;
}
```

**2. Mixing scoring logic with UI state**
```typescript
// ❌ BAD
const WizardStore = create((set) => ({
  answers: [],
  calculateScore: () => {
    // Scoring logic inside zustand store
    const score = /* complex calculation */;
    set({ score });
  },
}));

// ✅ GOOD
import { calculateOverallScore } from '@/lib/scoring/engine';
const WizardStore = create((set) => ({
  answers: [],
}));
// In component
const score = calculateOverallScore(answers, QUESTION_CATALOG);
```

**3. Implicit legal references**
```typescript
// ❌ BAD
const category = {
  name: 'Risikoanalyse',
  // Missing: which EU article? which BSIG paragraph?
};

// ✅ GOOD
const category = {
  nameKey: 'categories.riskAnalysis.name',
  euArticle: 'Art. 21(2)(a)',
  bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
  bsiReference: 'BSI-Standard 200-3, ISMS.1',
};
```

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| i18n translation management | Custom translation loader | next-intl (already installed) | Handles nested keys, type safety, locale routing, React Server Components |
| Percentage-to-traffic-light logic | Repeated if/else in components | Pure `getTrafficLight()` function with tests | Single source of truth, tested edge cases, DRY principle |
| Maturity level validation | String comparisons ("level0", "level1", etc.) | TypeScript literal type `MaturityLevel = 0 \| 1 \| 2 \| 3` | Compile-time type checking prevents invalid values |
| Legal reference formatting | Template strings scattered across code | Structured `legalReference` object in data | Consistent format, searchable, updatable |
| Sector classification logic | Multiple nested if/else | Pure `classifyEntity()` function per §28 BSIG | Implements exact legal logic, unit testable |

**Key insight:** The scoring engine and classification logic implement legal requirements (§28, §30 BSIG) that have specific thresholds and rules. Custom implementations risk legal incorrectness. Extract to pure functions with comprehensive tests referencing exact BGBl paragraphs.

## Common Pitfalls

### Pitfall 1: Using Outdated Legal References

**What goes wrong:** Citing draft versions of NIS2UmsG or pre-2025 BSIG instead of final BGBl 2025 I Nr. 301

**Why it happens:** Most NIS2 content online references draft laws from 2023-2024, before final passage

**How to avoid:**
- Always reference "BGBl. 2025 I Nr. 301" in comments and documentation
- Use exact paragraph numbers from final BSIG (§28, §30 Abs. 2 Nr. 1-10)
- Include "Rechtsstand: 06.12.2025" date in footer/PDF

**Warning signs:**
- Finding "Entwurf" (draft) in legal references
- Thresholds that don't match §28 BSIG exactly
- Missing Anlage 1/2 distinction

### Pitfall 2: Over-Technical Question Language

**What goes wrong:** Questions use IT jargon (RTO, RPO, SIEM, IAM) that KMU managers don't understand

**Why it happens:** Developers/IT security experts write questions from their own perspective

**How to avoid:**
- Test questions with non-IT business stakeholders
- Provide tooltip for every technical term
- Use business outcome language: "Können Sie nach Ausfall arbeiten?" not "Haben Sie ein RTO-Konzept?"
- Follow requirement GAP-05: "KMU-Management-Niveau, nicht IT-Experten-Niveau"

**Warning signs:**
- Acronyms without explanation
- Reference to specific technologies (Splunk, Azure AD) instead of capabilities
- Questions requiring IT knowledge to answer

### Pitfall 3: Floating-Point Precision in Scoring

**What goes wrong:** Traffic light thresholds fail on boundary values due to floating-point arithmetic

**Why it happens:** `33.33% × 3 = 99.99%`, not exactly 100%; JavaScript floating-point imprecision

**How to avoid:**
- Use integer arithmetic where possible: `(level / 3) * 100` instead of `level * 33.33`
- Round percentages to 1 decimal place for display
- Test boundary values explicitly: 39.9%, 40.0%, 69.9%, 70.0%
- Use `toBeCloseTo()` in vitest tests for floating-point comparisons

**Example:**
```typescript
// ✅ GOOD: Handles floating-point correctly
export function getTrafficLight(percentage: number): TrafficLight {
  const rounded = Math.round(percentage * 10) / 10; // Round to 1 decimal
  if (rounded < 40) return 'red';
  if (rounded < 70) return 'yellow';
  return 'green';
}

// Vitest test
it('handles boundary values', () => {
  expect(getTrafficLight(39.99)).toBe('red');
  expect(getTrafficLight(40.00)).toBe('yellow');
});
```

### Pitfall 4: BSI Building Block Version Mismatch

**What goes wrong:** Referencing building blocks from old Grundschutz editions that have been renamed or removed

**Why it happens:** BSI IT-Grundschutz is evolving, "Grundschutz++" modernization ongoing

**How to avoid:**
- Always reference "Edition 2023" explicitly
- Use official BSI building block IDs (e.g., "ORP.3", not "B 1.5" from old catalog)
- Note in documentation: "Based on IT-Grundschutz-Kompendium Edition 2023, valid during Grundschutz++ transition"
- Monitor BSI website for Grundschutz++ updates

**Warning signs:**
- Building block IDs starting with "B " or "M " (old format)
- References to "IT-Grundschutz-Kataloge" instead of "IT-Grundschutz-Kompendium"
- Missing edition year in citations

### Pitfall 5: Implicit Translation Key Assumptions

**What goes wrong:** Translation key doesn't exist in de.json/en.json, UI shows raw key string

**Why it happens:** TypeScript doesn't validate translation key strings at compile time (without extra setup)

**How to avoid:**
- Use consistent naming convention: `{domain}.{entity}.{field}` (e.g., `categories.riskAnalysis.name`)
- Create helper type for translation key validation (see next-intl TypeScript setup)
- Test both DE and EN locales manually before committing
- Consider using next-intl's TypeScript augmentation for type-safe keys

**Warning signs:**
- UI showing "categories.riskAnalysis.name" instead of translated text
- Missing fallback behavior in components
- Inconsistent key naming (some camelCase, some snake_case)

## Code Examples

Verified patterns from official sources and best practices:

### Pure Scoring Function with Tests

```typescript
// src/lib/scoring/engine.ts
import type { Answer, CategoryScore, TrafficLight } from './types';

/**
 * Calculates the maturity score for a single NIS2 category.
 *
 * Scoring logic:
 * - MaturityLevel 0 = 0%
 * - MaturityLevel 1 = 33.33%
 * - MaturityLevel 2 = 66.67%
 * - MaturityLevel 3 = 100%
 * - Average percentage across all answered questions in category
 *
 * @param answers - All user answers
 * @param categoryId - Target category ID
 * @param totalQuestions - Total questions in this category
 * @returns CategoryScore with percentage, traffic light, and metadata
 */
export function calculateCategoryScore(
  answers: Answer[],
  categoryId: string,
  totalQuestions: number
): CategoryScore {
  const categoryAnswers = answers.filter(a => a.categoryId === categoryId);

  if (categoryAnswers.length === 0) {
    return {
      categoryId,
      percentage: 0,
      trafficLight: 'red',
      answeredQuestions: 0,
      totalQuestions,
    };
  }

  // Convert maturity levels to percentages
  const percentageSum = categoryAnswers.reduce((sum, answer) => {
    const percentage = (answer.level / 3) * 100; // 0→0%, 1→33.33%, 2→66.67%, 3→100%
    return sum + percentage;
  }, 0);

  const averagePercentage = percentageSum / categoryAnswers.length;
  const rounded = Math.round(averagePercentage * 10) / 10; // Round to 1 decimal

  return {
    categoryId,
    percentage: rounded,
    trafficLight: getTrafficLight(rounded),
    answeredQuestions: categoryAnswers.length,
    totalQuestions,
  };
}

/**
 * Determines traffic light color based on percentage score.
 *
 * Thresholds (industry-standard RAG):
 * - Red: <40% (significant gaps, immediate action required)
 * - Yellow: 40-69% (partial implementation, improvements needed)
 * - Green: ≥70% (mature implementation)
 *
 * @param percentage - Score percentage (0-100)
 * @returns Traffic light color
 */
export function getTrafficLight(percentage: number): TrafficLight {
  if (percentage < 40) return 'red';
  if (percentage < 70) return 'yellow';
  return 'green';
}
```

```typescript
// src/lib/scoring/engine.test.ts
import { describe, it, expect } from 'vitest';
import { calculateCategoryScore, getTrafficLight } from './engine';
import type { Answer } from './types';

describe('Scoring Engine', () => {
  describe('getTrafficLight', () => {
    it('returns red for scores below 40%', () => {
      expect(getTrafficLight(0)).toBe('red');
      expect(getTrafficLight(25)).toBe('red');
      expect(getTrafficLight(39.9)).toBe('red');
    });

    it('returns yellow for scores 40-69%', () => {
      expect(getTrafficLight(40)).toBe('yellow');
      expect(getTrafficLight(55)).toBe('yellow');
      expect(getTrafficLight(69.9)).toBe('yellow');
    });

    it('returns green for scores 70% and above', () => {
      expect(getTrafficLight(70)).toBe('green');
      expect(getTrafficLight(85)).toBe('green');
      expect(getTrafficLight(100)).toBe('green');
    });

    it('handles exact boundary values', () => {
      expect(getTrafficLight(40.0)).toBe('yellow');
      expect(getTrafficLight(70.0)).toBe('green');
    });
  });

  describe('calculateCategoryScore', () => {
    const createAnswer = (questionId: string, level: 0 | 1 | 2 | 3): Answer => ({
      questionId,
      categoryId: 'test-category',
      level,
    });

    it('returns 0% with red for no answers', () => {
      const result = calculateCategoryScore([], 'test-category', 4);

      expect(result.percentage).toBe(0);
      expect(result.trafficLight).toBe('red');
      expect(result.answeredQuestions).toBe(0);
      expect(result.totalQuestions).toBe(4);
    });

    it('calculates 0% for all level-0 answers', () => {
      const answers = [
        createAnswer('q1', 0),
        createAnswer('q2', 0),
        createAnswer('q3', 0),
      ];

      const result = calculateCategoryScore(answers, 'test-category', 3);
      expect(result.percentage).toBe(0);
      expect(result.trafficLight).toBe('red');
    });

    it('calculates 100% for all level-3 answers', () => {
      const answers = [
        createAnswer('q1', 3),
        createAnswer('q2', 3),
        createAnswer('q3', 3),
      ];

      const result = calculateCategoryScore(answers, 'test-category', 3);
      expect(result.percentage).toBe(100);
      expect(result.trafficLight).toBe('green');
    });

    it('calculates average for mixed maturity levels', () => {
      const answers = [
        createAnswer('q1', 0), // 0%
        createAnswer('q2', 1), // 33.33%
        createAnswer('q3', 2), // 66.67%
        createAnswer('q4', 3), // 100%
      ];
      // Average: (0 + 33.33 + 66.67 + 100) / 4 = 50%

      const result = calculateCategoryScore(answers, 'test-category', 4);
      expect(result.percentage).toBeCloseTo(50, 1);
      expect(result.trafficLight).toBe('yellow');
    });

    it('filters by categoryId correctly', () => {
      const answers = [
        { questionId: 'q1', categoryId: 'cat1', level: 3 as const },
        { questionId: 'q2', categoryId: 'cat2', level: 0 as const }, // Different category
        { questionId: 'q3', categoryId: 'cat1', level: 3 as const },
      ];

      const result = calculateCategoryScore(answers, 'cat1', 4);
      expect(result.answeredQuestions).toBe(2);
      expect(result.percentage).toBe(100);
    });

    it('handles partial completion', () => {
      const answers = [
        createAnswer('q1', 2), // 66.67%
        createAnswer('q2', 2), // 66.67%
        // q3 and q4 not answered
      ];

      const result = calculateCategoryScore(answers, 'test-category', 4);
      expect(result.answeredQuestions).toBe(2);
      expect(result.totalQuestions).toBe(4);
      expect(result.percentage).toBeCloseTo(66.7, 1);
    });
  });
});
```

### Sector Classification Logic

```typescript
// src/lib/nis2/classification.ts
import { THRESHOLDS } from './constants';
import type { ClassificationResult } from './types';

/**
 * Classifies an entity according to §28 BSIG.
 *
 * Legal basis: BGBl. 2025 I Nr. 301, §28 BSIG
 *
 * @param sectorId - Sector from Anlage 1 or 2
 * @param subsectorId - Optional subsector (e.g., 'dns', 'tld')
 * @param employees - Number of employees
 * @param revenue - Annual revenue in EUR
 * @param balanceSheet - Annual balance sheet total in EUR
 * @returns Classification result
 */
export function classifyEntity(
  sectorId: string,
  subsectorId: string | null,
  employees: number,
  revenue: number,
  balanceSheet: number
): ClassificationResult {
  // Category 1: Always "besonders wichtig" regardless of size (§28 Abs. 1 Nr. 1-2)
  const alwaysQualified = ['dns', 'tld', 'qtsp', 'kritis'];
  if (subsectorId && alwaysQualified.includes(subsectorId)) {
    return {
      category: 'besonders-wichtig',
      reason: 'always-qualified',
      legalReference: '§28 Abs. 1 Nr. 1-2 BSIG',
    };
  }

  const isTelecom = sectorId === 'transport' && subsectorId === 'telecom';

  // Category 2: Telecommunications providers (§28 Abs. 1 Nr. 3)
  if (isTelecom) {
    const meetsThreshold =
      employees >= THRESHOLDS.besondersWichtig.telecom.employees ||
      (revenue >= THRESHOLDS.besondersWichtig.telecom.revenue &&
       balanceSheet >= THRESHOLDS.besondersWichtig.telecom.balanceSheet);

    if (meetsThreshold) {
      return {
        category: 'besonders-wichtig',
        reason: 'telecom-threshold',
        legalReference: '§28 Abs. 1 Nr. 3 BSIG',
      };
    }

    // Below threshold for "besonders wichtig" but still regulated
    return {
      category: 'wichtig',
      reason: 'telecom-below-threshold',
      legalReference: '§28 Abs. 2 BSIG',
    };
  }

  // Category 3: Other sectors from Anlage 1 (§28 Abs. 1 Nr. 4)
  const sector = SECTORS.find(s => s.id === sectorId);
  if (sector?.anlage === 1) {
    const meetsThreshold =
      employees >= THRESHOLDS.besondersWichtig.others.employees ||
      (revenue >= THRESHOLDS.besondersWichtig.others.revenue &&
       balanceSheet >= THRESHOLDS.besondersWichtig.others.balanceSheet);

    if (meetsThreshold) {
      return {
        category: 'besonders-wichtig',
        reason: 'anlage1-threshold',
        legalReference: '§28 Abs. 1 Nr. 4 BSIG',
      };
    }

    // Falls through to "wichtig" check below
  }

  // Wichtige Einrichtungen: Anlagen 1 + 2 with lower threshold (§28 Abs. 2)
  if (sector?.anlage === 1 || sector?.anlage === 2) {
    const meetsThreshold =
      employees >= THRESHOLDS.wichtig.others.employees ||
      (revenue >= THRESHOLDS.wichtig.others.revenue &&
       balanceSheet >= THRESHOLDS.wichtig.others.balanceSheet);

    if (meetsThreshold) {
      return {
        category: 'wichtig',
        reason: 'threshold-met',
        legalReference: '§28 Abs. 2 BSIG',
      };
    }
  }

  // Does not meet any threshold
  return {
    category: 'nicht-betroffen',
    reason: 'below-threshold',
    legalReference: '§28 BSIG',
  };
}
```

### Question Catalog with i18n

```typescript
// src/lib/nis2/questions.ts
import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'risk-analysis',
    nameKey: 'categories.riskAnalysis.name',
    descriptionKey: 'categories.riskAnalysis.description',
    euArticle: 'Art. 21(2)(a)',
    bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
    bsiBuildingBlocks: ['ISMS.1', 'ORP.1', 'DER.1'],
    questions: [
      {
        id: 'ra-q1',
        categoryId: 'risk-analysis',
        titleKey: 'questions.raQ1.title',
        tooltipKey: 'questions.raQ1.tooltip',
        legalReference: {
          euArticle: 'Art. 21(2)(a)',
          bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
        },
        maturityDescriptions: {
          level0Key: 'questions.raQ1.maturity.level0',
          level1Key: 'questions.raQ1.maturity.level1',
          level2Key: 'questions.raQ1.maturity.level2',
          level3Key: 'questions.raQ1.maturity.level3',
        },
      },
      {
        id: 'ra-q2',
        categoryId: 'risk-analysis',
        titleKey: 'questions.raQ2.title',
        tooltipKey: 'questions.raQ2.tooltip',
        legalReference: {
          euArticle: 'Art. 21(2)(a)',
          bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
        },
        maturityDescriptions: {
          level0Key: 'questions.raQ2.maturity.level0',
          level1Key: 'questions.raQ2.maturity.level1',
          level2Key: 'questions.raQ2.maturity.level2',
          level3Key: 'questions.raQ2.maturity.level3',
        },
      },
      {
        id: 'ra-q3',
        categoryId: 'risk-analysis',
        titleKey: 'questions.raQ3.title',
        tooltipKey: 'questions.raQ3.tooltip',
        legalReference: {
          euArticle: 'Art. 21(2)(a)',
          bsigParagraph: '§30 Abs. 2 Nr. 1 BSIG',
        },
        maturityDescriptions: {
          level0Key: 'questions.raQ3.maturity.level0',
          level1Key: 'questions.raQ3.maturity.level1',
          level2Key: 'questions.raQ3.maturity.level2',
          level3Key: 'questions.raQ3.maturity.level3',
        },
      },
    ],
  },
  // ... 9 more categories with 3-4 questions each
];
```

```json
// src/messages/de.json (excerpt)
{
  "categories": {
    "riskAnalysis": {
      "name": "Risikoanalyse und Sicherheit",
      "description": "Konzepte in Bezug auf die Risikoanalyse und auf die Sicherheit in der Informationstechnik"
    }
  },
  "questions": {
    "raQ1": {
      "title": "Haben Sie eine aktuelle Übersicht über Ihre IT-Risiken (z.B. welche Systeme kritisch sind, wo Schwachstellen liegen)?",
      "tooltip": "NIS2 fordert regelmäßige Risikoanalysen (Art. 21(2)(a), §30 Abs. 2 Nr. 1 BSIG). Das BSI empfiehlt die Methodik aus BSI-Standard 200-3.",
      "maturity": {
        "level0": "Keine Risikoanalyse vorhanden",
        "level1": "Grobe Einschätzung vorhanden, aber nicht dokumentiert",
        "level2": "Dokumentierte Risikoanalyse, aber nicht regelmäßig aktualisiert",
        "level3": "Regelmäßige, dokumentierte Risikoanalyse nach BSI-Standard 200-3"
      }
    },
    "raQ2": {
      "title": "Sind Ihre IT-Sicherheitsmaßnahmen schriftlich dokumentiert und werden regelmäßig aktualisiert?",
      "tooltip": "Dokumentierte Sicherheitskonzepte sind Grundlage für nachweisbare Compliance (§30 Abs. 1 BSIG). Siehe BSI-Baustein ISMS.1.",
      "maturity": {
        "level0": "Keine schriftliche Dokumentation",
        "level1": "Teilweise dokumentiert, aber veraltet",
        "level2": "Größtenteils dokumentiert, aber nicht regelmäßig aktualisiert",
        "level3": "Vollständig dokumentiert und regelmäßig (mind. jährlich) aktualisiert"
      }
    },
    "raQ3": {
      "title": "Haben Sie klare Verantwortlichkeiten für IT-Sicherheit festgelegt (z.B. benannte Ansprechperson)?",
      "tooltip": "NIS2 fordert Geschäftsleitung-Verantwortlichkeit (§38 BSIG). Klare Zuständigkeiten sind Grundlage für effektives Sicherheitsmanagement.",
      "maturity": {
        "level0": "Keine festgelegten Verantwortlichkeiten",
        "level1": "Verantwortlichkeiten existieren, aber nicht schriftlich festgelegt",
        "level2": "Verantwortlichkeiten dokumentiert, aber nicht allen bekannt",
        "level3": "Klar dokumentierte und kommunizierte Verantwortlichkeiten mit Vertretungsregelungen"
      }
    }
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| NIS-Richtlinie (2016/1148) | NIS2-Richtlinie (2022/2555), umgesetzt als NIS2UmsG | Dec 2025 (BGBl 2025 I Nr. 301) | Expanded scope from ~1,000 to ~30,000 German entities; stricter requirements |
| KRITIS-only regulation | "Besonders wichtig" + "Wichtig" dual-tier system | Dec 2025 | KRITIS entities automatically "besonders wichtig", new entities added |
| BSI IT-Grundschutz-Kataloge | IT-Grundschutz-Kompendium Edition 2023 | Feb 2023 | 111 building blocks instead of old catalog structure |
| Vitest config in vite.config.ts | Separate vitest.config.ts | Vitest 1.0+ (2024) | Better separation of build/test config |
| Jest as default test framework | Vitest native to Vite/Next.js ecosystem | 2023-2024 shift | 10-20x faster tests, native ESM support |

**Deprecated/outdated:**
- **Draft NIS2UmsG versions**: Any references to "Entwurf" or pre-Dec-2025 versions → Use BGBl 2025 I Nr. 301
- **Old BSI building block IDs (B x.x, M x.x)**: From IT-Grundschutz-Kataloge → Use Edition 2023 IDs (ISMS.1, ORP.x, etc.)
- **5-level maturity scales**: Often too granular for self-assessment → 4-level is industry standard for KMU tools
- **"Compliance Score"**: Misleading term → Use "Reifegrad" (maturity level) to avoid false certification claims

## Open Questions

Questions that couldn't be fully resolved:

1. **Detailed NIS2 Durchführungsverordnung-to-BSI-Grundschutz mapping**
   - What we know: General mappings exist, BSI is working on detailed guidance
   - What's unclear: Exact building block-to-requirement mappings for all 10 categories
   - Recommendation: Use general mappings identified in research, add disclaimer that specific implementation should be verified with BSI guidance or certified consultants

2. **Grundschutz++ timeline and impact**
   - What we know: Modernization planned, multi-year transition, Edition 2023 remains valid
   - What's unclear: Exact release date, which building blocks will change IDs
   - Recommendation: Reference "Edition 2023" explicitly, add note about ongoing modernization, plan to update mappings when Grundschutz++ releases

3. **Special sector edge cases (e.g., "vernachlässigbar" clause)**
   - What we know: §28 BSIG allows disregarding "negligible" business activities
   - What's unclear: Exact thresholds or BSI guidance for what counts as "negligible"
   - Recommendation: Include this as a note in affected check results, advise users to consult BSI or legal counsel for edge cases

4. **English translation quality for legal terms**
   - What we know: Official EU NIS2 Directive has English version, BSIG does not
   - What's unclear: Best translation for German-specific terms (e.g., "besonders wichtige Einrichtung")
   - Recommendation: Provide English translations with note that German original is legally binding, keep legal references in German even in EN locale

## Sources

### Primary (HIGH confidence)

**Official Legal Documents:**
- [Bundesgesetzblatt 2025 I Nr. 301 - NIS2UmsG](https://www.recht.bund.de/bgbl/1/2025/301/VO.html) - Official gazette publication
- [§28 BSIG - Besonders wichtige und wichtige Einrichtungen](https://nis2-umsetzung.com/bsig/28-bsig/) - Classification thresholds
- [§30 BSIG - Risikomanagementmaßnahmen](https://nis2-umsetzung.com/bsig/30-bsig/) - 10 mandatory measures
- [Anlage 1 - Sektoren besonders wichtiger Einrichtungen](https://nis2-umsetzung.com/bsig/anlage-1-sektoren-besonders-wichtiger-und-wichtiger-einrichtungen/) - Sectors list
- [Anlage 2 - Sektoren wichtiger Einrichtungen](https://nis2-umsetzung.com/bsig/anlage-2-sektoren-wichtiger-einrichtungen/) - Additional sectors
- [Art. 21 NIS2-Richtlinie - Risikomanagementmaßnahmen](https://nis2-umsetzung.com/nis2-richtlinie/artikel-21-risikomanagementmassnahmen-im-bereich-der-cybersicherheit/) - EU directive text

**BSI Official Sources:**
- [BSI IT-Grundschutz-Kompendium Edition 2023](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/IT-Grundschutz-Bausteine/Bausteine_Download_Edition_node.html) - Building blocks catalog
- [BSI - NIS-2 was tun?](https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-was-tun/NIS-2-was-tun_node.html) - Official BSI guidance
- [BSI - NIS-2 Risikomanagementmaßnahmen](https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-Infopakete/NIS-2-Risikomanagementmassnahmen/NIS-2-Risikomanagementmassnahmen.html) - Risk management guidance

**Technical Documentation:**
- [Vitest Guide](https://vitest.dev/guide/) - Testing framework documentation
- [next-intl Documentation](https://next-intl.dev/docs/usage/translations) - i18n patterns
- [TypeScript i18next](https://www.i18next.com/overview/typescript) - Type-safe i18n

### Secondary (MEDIUM confidence)

**NIS2 Implementation Guidance:**
- [OpenKRITIS - NIS2 Umsetzung](https://www.openkritis.de/it-sicherheitsgesetz/nis2-umsetzung-gesetz-cybersicherheit.html) - Comprehensive overview
- [NIS-2 konkret: Durchführungsverordnung und BSI-Grundschutz](https://www.secuvera.de/blog/nis-2-konkret-durchfuehrungsverordnung-und-bsi-grundschutz/) - BSI mapping analysis
- [NIS-2-Mindestmaßnahmen nach §30 BSIG](https://www.ing-ism.de/magazin/nis-2-mindestmassnahmen-paragraph-30-bsig/) - Measure explanations

**Maturity Assessment Best Practices:**
- [Traffic Light Assessment - Continuous Improvement Toolkit](https://citoolkit.com/articles/traffic-light-assessment/) - RAG methodology
- [Performance Reporting: Traffic Light Colours and RAG Ratings](https://bernardmarr.com/performance-reporting-how-to-use-traffic-light-colours-and-rag-ratings-in-dashboards/) - Threshold guidance
- [Maturity Assessment Tool - Pointerpro](https://pointerpro.com/use-cases/maturity-assessment/) - Question design patterns

**TypeScript/Testing Resources:**
- [Unit Testing with Vitest - CS4530 Spring 2026](https://neu-se.github.io/CS4530-Spring-2026/tutorials/week1-unit-testing) - Testing patterns
- [Implementing safe, dynamic localization in TypeScript apps](https://blog.logrocket.com/implementing-safe-dynamic-localization-typescript-apps/) - i18n data structures

### Tertiary (LOW confidence - flagged for validation)

- General web search results on NIS2 Gap Analysis questionnaires - provide examples but not verified methodology
- BSI building block mappings from non-official sources - useful starting point but require BSI verification
- Traffic light threshold percentages - industry practices vary, our chosen thresholds (40%, 70%) align with multiple sources but should be validated with user testing

## Metadata

**Confidence breakdown:**
- **Legal foundation (sectors, thresholds, §28/§30):** HIGH - Verified with official BGBl 2025 I Nr. 301 and authoritative legal commentary sites
- **10 Art. 21(2) categories:** HIGH - Cross-verified between EU directive and BSIG §30 implementation
- **BSI building block mappings:** MEDIUM - General mappings identified but detailed Durchführungsverordnung mappings still evolving; BSI modernizing Grundschutz++
- **Question design patterns:** HIGH - Multiple sources confirm 4-level maturity scale, KMU-language best practices, tooltip usage
- **Scoring methodology:** HIGH - Standard weighted average with verified traffic light thresholds from maturity assessment literature
- **TypeScript/testing patterns:** HIGH - Official documentation from vitest, next-intl, established i18n practices

**Research date:** 2026-02-06

**Valid until:** ~30 days for stable aspects (legal references, thresholds), ~7 days for evolving aspects (BSI Grundschutz++ updates, detailed implementation guidance)

**Recommended re-validation:** Before Phase 2 implementation begins, check:
- BSI website for any new NIS2-specific guidance or Grundschutz++ announcements
- Verify Anlage 1/2 sector lists haven't been amended (unlikely but possible via ordinance)
- Confirm traffic light thresholds with UX testing during Phase 4 (Gap Analysis Wizard)
