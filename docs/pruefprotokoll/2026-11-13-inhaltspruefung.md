# Prüfprotokoll Inhaltsprüfung — 13.11.2026

**Gegenstand:** Rechtliche und fachliche Aussagen in `src/messages/de.json` und `en.json` sowie die angezeigten Quellenfelder im Regelwerk-Code (`legalReference`, `euArticle`, `bsigParagraph`, `bsiReference`, `harmonizedStandard`, `standardReference`, `doraArticles`).
**Rechtsstand:** November 2026.
**Methode:** Alle Aussagen mit Paragraf, Artikel, Frist, Schwellenwert, Norm-ID oder Statistik wurden inventarisiert und gegen die Primärquelle geprüft. Statistiken haben jetzt entweder eine aktuelle Quelle mit Jahr oder sind als „Größenordnung“ bzw. „Schätzung“ gekennzeichnet. Wo sich einzelne Anforderungs-IDs (C5, Grundschutz-Anforderungen) nicht sicher belegen ließen, wird auf Bereichs- bzw. Bausteinebene zitiert.
**Ergebnis:** Rund 490 Textstellen (DE und EN) und rund 70 Quellenfelder im Code korrigiert. Ein Regressionstest (`src/lib/rechtsstand.test.ts`) verhindert, dass die gröbsten Fehlangaben zurückkommen.

**Legende Ergebnis:** F = falsch · U = ungenau/überzogen · OK = geprüft, korrekt

---

## 1. BSI IT-Grundschutz

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| G1 | Fragen-Tooltips (30 Stück) | „BSI-Standard 200-2 Kap. 7 und Baustein X.A1 fordern …“ | Kompendium Edition 2023; 200-2 Kap. 7 = Kern-Absicherung | F | „Der IT-Grundschutz-Baustein X (Kompendium, Edition 2023) fordert …“ |
| G2 | opsQ3 (Fernwartung), Fragen-Code | OPS.1.2.2 | Kompendium: OPS.1.2.2 = Archivierung, OPS.1.2.5 = Fernwartung | F | OPS.1.2.5 |
| G3 | Empfehlung con1 (Datensicherung) | CON.1 | CON.1 = Kryptokonzept, CON.3 = Datensicherungskonzept | F | CON.3 |
| G4 | Empfehlung con2 (Notfallmanagement) | „nach Baustein CON.3“ | BSI-Standard 200-4 (BCM) | F | BSI-Standard 200-4 |
| G5 | Empfehlungen der1/der2 | „BSI-Standard 200-4, DER.1/DER.2.1“ | DER.1/DER.2.1 sind Kompendium-Bausteine, kein BCM | F | „IT-Grundschutz-Kompendium, DER.x“ |
| G6 | Empfehlung der3 (Forensik) | DER.4 | DER.2.2 = Vorsorge für die IT-Forensik | F | DER.2.2 |
| G7 | Empfehlung sys3 (MDM) | SYS.3.1 (Laptops) | SYS.3.2.2 = Mobile Device Management | F | SYS.3.2.2 |
| G8 | ismsQ3, Empfehlung isms3 | Risikoanalyse als Grundlage aller Maßnahmen | BSI-Standard 200-3: ergänzend bei hohem/sehr hohem Schutzbedarf oder nicht modellierbaren Objekten | F | Umformuliert: Grundlage sind Strukturanalyse, Schutzbedarfsfeststellung, Modellierung |
| G9 | orp1.firstStep | Passwort-„Gültigkeitsdauer“ | ORP.4.A8: kein anlassloser Wechsel mehr | F | Wechsel nur bei Kompromittierungsverdacht |
| G10 | classification.reasons.standard | „vollständige Umsetzung des Kompendiums“ | 200-2: alle relevanten Bausteine | U | „aller relevanten Bausteine (Basis- und Standard-Anforderungen)“ |
| G11 | Empfehlungstexte + `legalReference` | „nach BSI-Standard 200-2 Kap. X, Baustein“ | Bausteine stehen im Kompendium, nicht in 200-2 | U | „IT-Grundschutz-Kompendium, Baustein“ |
| G12 | ops3.firstStep | Buchhaltung 10 Jahre | § 147 AO, § 257 HGB i. d. F. BEG IV (seit 2025) | U | Bücher/Abschlüsse 10 J., Buchungsbelege 8 J. |
| G13 | isms2 | „Leitung Informationssicherheit“ | Grundschutz-Begriff | U | Informationssicherheitsbeauftragter (ISB) |
| G14 | classification.ts, types.ts | Kern = Kap. 8, Standard = Kap. 7 | BSI-Standard 200-2: Kap. 7 Kern, Kap. 8 Standard | F | Kapitel getauscht |
| K2 | kritis bcmQ3 | DER.4 Notfallmanagement | Kompendium 2023 | OK | — |

## 2. ISO/IEC 27001

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| I1 | clQ3.help | ISB/CISO gefordert | ISO 27001 Kap. 5.3 | U | Rollen zuweisen; ISB ist Praxis, keine Normpflicht |
| I2 | cnQ4.help | Produktivdaten nur anonymisiert | Anhang A.8.33 | U | Testdaten auswählen, schützen, Nutzung autorisieren |
| I3 | fullName | ISO/IEC 27001:2022 | Amd 1:2024 (Klimawandel) | U | „inkl. Amd 1:2024“ |

## 3. DSGVO

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| D1 | dsbQ4.tooltip | „§ 38 Abs. 1 Satz 6 BDSG präzisiert die Meldepflicht“ | § 38 BDSG; Meldepflicht Art. 37 Abs. 7 DSGVO | F | Satz gestrichen |
| D2 | vvQ3.help | Rechnungsdaten 10 Jahre | § 147 AO / § 257 HGB (BEG IV) | F | 8 Jahre |
| D3 | dtQ2/dtQ3 | Brasilien ohne Angemessenheit | Durchführungsbeschluss (EU) 2026/179 vom 26.01.2026 | F | Brasilien in Liste der sicheren Drittländer |
| D4 | dt3 | TIA „gemäß Art. 46 Abs. 2“ | EuGH C-311/18 (Schrems II), EDSA-Empfehlungen 01/2020 | U | Herleitung korrigiert |
| D5 | dsfa2 | Positiv- und Negativliste | Art. 35 Abs. 4/5 DSGVO; DSK-Muss-Liste | U | Nur Muss-Liste; Negativliste optional, in DE nicht veröffentlicht |

## 4. KRITIS / Sektoren

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| K1 | reasons.bsiDesignation | „Vom BSI benannt (§ 10 Abs. 1 BSIG)“ | § 28 Abs. 1 Nr. 1, § 56 Abs. 4 BSIG; BSI-KritisV | F | Betreiber über Schwellenwerte der BSI-KritisV |
| K3 | lkQ1/lkQ2 | ORP.1 / OPS.1.1.3 | OPS.2.3 Nutzung von Outsourcing | F | OPS.2.3 |
| K4 | vmQ3 | DER.2.3 | DER.2.1 (Behandlung von Sicherheitsvorfällen) | F | DER.2.1 |
| K5 | vmQ1 | „IT-Störungen unverzüglich“ | § 32 BSIG | U | Erhebliche Sicherheitsvorfälle, 24 h / 72 h / 1 Monat |
| K6 | lk3.firstStep | TISAX-Zertifikate | ENX: TISAX vergibt Labels | U | TISAX-Labels |
| K7 | Schwelle IT/TK | stark verkürzt | BSI-KritisV Anhang 4 | U | Schwellen je Anlagenart (z. B. 100.000 Teilnehmende, 3,5 MW) |
| K8 | Sektor Weltraum | „§ 2 Nr. 4 KRITIS-DachG“ | § 4 Abs. 1 KRITIS-DachG; KRITIS-VO im Entwurf | F | Korrigiert |
| K9 | Sektor Entsorgung | 500.000 Einwohner als Schwelle | BSI-KritisV Anhang 8 (seit 01.01.2024) | U | Schwellen in Tonnen je Anlagenart, bemessen an 500.000 Einwohnern |
| S1 | sectorGuidance.waste | seit 2024 kritische Dienstleistung | BGBl. 2023 I Nr. 339 | OK | — |
| S4 | sectorGuidance.chemicals | „§ 2 StörfallV“, KAS-44 | § 3 Abs. 2 Nr. 3 StörfallV; KAS-51 ersetzt KAS-44 | F | Korrigiert |
| S8 | sectorGuidance.energy | § 11 Abs. 1a/1b EnWG | § 5c EnWG seit 06.12.2025 (NIS2UmsuCG), alte Kataloge übergangsweise | F | Korrigiert |

## 5. DORA

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| DO1 | rtQ4 | Tester-Anforderungen Art. 26 Abs. 2–4 | Art. 27 DORA | F | Art. 27 Abs. 1–2 |
| DO2 | ia3 | Art. 45 regelt Vorfallmeldung/Register | Art. 45, 19, 28 Abs. 3 DORA | F | Art. 45 Abs. 3 Mitteilung der Teilnahme; Vorfälle Art. 19; Register Art. 28 Abs. 3 |
| DO3 | iaQ2/iaQ3/iaQ5 | falsche Absätze | Art. 45 Abs. 1–3 | F | Abs. 1 lit. b / Abs. 2 / Abs. 3 |
| DO4 | Drittanbieter, q4, Branche Finanzen, `doraArticles` | Art. 28–44 | Art. 28–30 Pflichten der FU; 31–44 Überwachung kritischer Anbieter | U | Art. 28–30 |
| DO5 | q3, Branche Finanzen | TLPT für „systemrelevante Institute“ | Art. 26 Abs. 8 DORA | U | von der Aufsicht bestimmte Finanzunternehmen |
| DO6 | govQ5, irmQ1/2, vmQ1/2/4 | „RTS JC 2023 86“, „RTS/ITS JC 2024 33“ (Entwurfsberichte) | DelVO (EU) 2024/1774, DelVO (EU) 2024/1772, DVO (EU) 2025/302 | U | Fundstellen der geltenden Rechtsakte |
| W1 | notfallKontakte.doraDeadline | „sofortige Erstmeldung“ | DelVO (EU) 2025/301 | U | 4 h nach Klassifizierung, spätestens 24 h nach Kenntnis |
| B25 | Branche Finanzen NIS2 | NIS2 „zusätzlich“ | § 28 Abs. 6 BSIG (DORA lex specialis) | F | DORA geht vor |
| B26 | Branche Finanzen ISO | BaFin sieht ISO 27001 als Mindestanforderung | DORA / BaFin-Aufsichtspraxis | F | Keine Pflicht, verbreiteter Rahmen |
| B24 | Branche Finanzen Intro | DORA „ab 2025“ | Art. 64 DORA | U | gilt seit 17.01.2025 |

## 6. TISAX

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| T1 | compQ2 | interne Audits = A.5.35 | ISO 27001 Kap. 9.2/9.3 | U | Kap. 9.2/9.3 |
| T2 | dsQ1 | DSB immer Pflicht | Art. 37 DSGVO, § 38 BDSG | U | nur wenn gesetzlich erforderlich |
| T3/K6/B23 | lief1, Automotive-Risiken | „Zertifizierung/Zulassung“ | ENX TISAX Participant Handbook | U | TISAX-Label |
| W38 | tisaxPruefziele | „3 Prüfziele“ | ENX: Prüfziele in 3 Modulen | F | 3 Module (Informationssicherheit, Prototypenschutz, Datenschutz) |
| W39 | AL 1–3 | AL 1 als TISAX-Stufe, „akkreditierter Prüfer“ | ENX: AL 1 ohne Label; ENX-zugelassene Prüfdienstleister | F | Korrigiert |
| W40 | Tipp | Re-Zertifizierung | ENX | U | Re-Assessment |
| W41 | CTA | „12 VDA-ISA-Bereiche“ | VDA ISA 6 | U | „12 Kategorien, angelehnt an den VDA ISA“ |
| B5/B21/W29 | Logistik, Automotive, Selbsterklärung | TISAX „Pflicht für alle“ | ENX / OEM-Praxis | U | bei Zugriff auf vertrauliche OEM-Daten/Prototypen |

## 7. Cyber Resilience Act

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| CR1 | konfQ2, umQ2, slQ2, Reifegrade, `harmonizedStandard`/`bsigParagraph`/`standardReference` | EN 18031-1/2/3 als CRA-Normen | EN 18031 = hEN zur RED (DelVO 2022/30); CRA-hEN aus Normungsauftrag M/606 in Arbeit | F | „CRA Anhang I“, ETSI EN 303 645, IEC 62443-4-1; hEN „in Vorbereitung“ |
| CR2 | vmQ1, vm1 | Meldung „an ENISA“ | Art. 14 Abs. 1 CRA | U | zentrale Meldeplattform, gleichzeitig an CSIRT (BSI) und ENISA |
| CR3 | q3, sbom1 | SBOM „mit allen Komponenten“ | Anhang I Teil II Nr. 1 CRA | U | mindestens Top-Level-Abhängigkeiten |
| CR4 | openSourceExcluded | „Art. 3 Nr. 47“ | ErwG 18 f. CRA | U | Nicht kommerzielle OSS außerhalb des Anwendungsbereichs |
| CR5 | q8 | Support mind. 5 Jahre | Art. 13 Abs. 8 CRA | U | außer die erwartete Nutzungsdauer ist kürzer |
| B22 | Branche Automotive | vernetzte Fahrzeugkomponenten unter CRA | Art. 2 Abs. 2 CRA (VO 2019/2144 ausgenommen) | F | Typgenehmigte Komponenten ausgenommen, UN R155/R156 |

## 8. NIS2 / BSIG

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| N1 | bcQ2.help | NIS2 setzt 24–48 h Wiederanlauf | Art. 21 NIS2 | F | Keine feste Frist; eigene RTO aus BIA |
| N2 | mcQ1 | MFA für privilegierte Zugänge Pflicht | Art. 21 Abs. 2 lit. j NIS2 | U | „gegebenenfalls“ MFA/kontinuierliche Authentifizierung |
| M1 | meldepflichten stage3 | 1 Monat nach Erstmeldung | § 32 Abs. 1 Nr. 4 BSIG | F | 1 Monat nach der 72-h-Meldung |
| W4 | Checkliste Incident | KRITIS „unverzüglich“ | § 32 BSIG (gilt auch für KRITIS) | F | 24 h / 72 h / 1 Monat |
| W11 | Mythos m5 Quelle | Art. 21 NIS2 | Art. 20 NIS2 / § 38 BSIG | F | Korrigiert |
| W13 | Mythos m10 | ≥ 50 MA ODER 10 Mio. Umsatz | EU-KMU-Empfehlung 2003/361, § 28 BSIG | F | Umsatz UND Bilanz > 10 Mio.; ~29.500 Unternehmen (Regierungsschätzung) |
| W50 | Lieferantenampel | „NIS2 § 30“ | § 30 Abs. 2 Nr. 4 BSIG | U | Korrigiert |
| O1 | dsgvoOverlap Mapping | „Sichere Kommunikation (§ 30 Abs. 2 Nr. 10)“ für Dokumentation | § 30 Abs. 1 BSIG | F | Dokumentationspflicht |
| L1 | Landing | „NIS2UmsCG“ | Gesetzesbezeichnung | F | NIS2UmsuCG |
| B1–B3 | Branche Logistik | Transport/Speditionen generell Anhang I | Anhang I Nr. 2, Anhang II Nr. 1 NIS2 | F | Speditionen meist mittelbar; Post/Kurier Anhang II |
| B6 | Branche Gesundheit | „Labore“ | Anhang I Nr. 5 NIS2 | U | EU-Referenzlabore |
| B10 | Branche Fertigung | „die meisten“ unter Anhang II | Anhang II Nr. 5 NIS2 | F | bestimmte Herstellungszweige ab mittlerer Größe |
| B12 | Branche Handel | „große Handelsunternehmen“ | Anhang II Nr. 4, 6 NIS2 | F | Online-Marktplätze, Lebensmittel-Großhandel |
| B15 | Branche IT | IKT-Dienstleister „direkt“ | Anhang I Nr. 9 NIS2 | U | ab mittlerer Größe |

## 9. Weitere Regelwerke

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| P1 | PCI fullName, Landing | v4.0 | PCI SSC: v4.0.1 (Juni 2024) | F | v4.0.1 |
| P2 | vmQ3.help | kritische **und hohe** Patches in 1 Monat | Req. 6.3.3 | U | nur kritische |
| P3 | auQ3 | MFA nur Admin/Remote | Req. 8.4.2 (seit 31.03.2025) | U | MFA für jeden Zugriff in die CDE |
| B13 | Branche Handel | PCI DSS gesetzliche Pflicht | Vertrag mit Acquirer | U | vertragliche Pflicht |
| C1 | devQ3, q10, `euArticle`/`legalReference` | PI-01/03 für Audits | C5:2020: PI = Portabilität | F | Bereich COM |
| C2 | opsQ2, q6 | OPS-07/08 für Protokollierung | C5:2020: OPS-07/08 = Datensicherung | F | OPS-10 ff. |
| C3 | kryQ2/kryQ3 | KRY-03 Schlüssel, KRY-04 Verschlüsselung | C5:2020: KRY-04 = Schlüsselverwaltung | F | getauscht |
| C4 | psQ3, PS-Bereich | PS-07/PS-09 | PS-09 nicht belegbar | U | Bereichsebene (PS, AM) |
| B16 | Branche IT C5 | C5 für alle öffentlichen Auftraggeber | BSI-Mindeststandard Bund; § 393 SGB V | U | Bund und Gesundheitswesen |
| B17 | Branche Energie | Grundschutz de-facto-Standard | IT-Sicherheitskatalog BNetzA (§ 5c EnWG) | F | ISO-27001-Zertifizierung Pflicht |
| B18 | Branche Energie KRITIS | alle Energieversorger KRITIS | BSI-KritisV Anhang 1 | U | nur oberhalb der Schwellen |
| B8 | Branche Gesundheit | B3S als BSI-Richtlinie | DKG-B3S, Eignungsfeststellung BSI | F | Korrigiert |
| NI1 | NIST CSF Tooltips | ID.SC, DE.DP, RC.IM | NIST CSF 2.0 (Feb. 2024) | F | GV.SC, DE.AE, ID.IM |
| OW1 | OWASP fullName | ASVS 4.0 | OWASP | U | 4.0.3 |
| CI1 | CIS Titel | v8 | CIS Controls v8.1 (Juni 2024) | U | v8.1 |
| W24 | HinSchG Intro | ab 50 MA seit 07/2023 | § 42 HinSchG | F | ≥ 250 seit 02.07.2023, 50–249 seit 17.12.2023 |
| W21 | Solo-Check VVT | „Pflicht für JEDEN“ | Art. 30 Abs. 5 DSGVO | U | Ausnahme genannt |
| W46 | AVV-Tipp | „Sie MüssEN prüfen“ | Art. 28 Abs. 3 lit. h DSGVO | U | Prüfrecht nutzen |
| W34 | PDCA | von ISO 27001 vorgeschrieben | ISO 27001:2013/2022 Kap. 10 | F | Modell, keine Pflicht |
| W71 | Reifegrade | „BSI definiert 6 Reifegrade“ | BSI-Orientierungshilfe KRITIS-Nachweise | U | Quelle präzisiert (0–5) |
| W7 | Anlaufstellen BSI | „IT-Grundschutz-Katalog“ | Kataloge bis 2016 | U | Kompendium (Nachfolger Grundschutz++) |
| W30/W32 | Selbsterklärung Stufen | „BSI-Grundschutz-Check“ extern; „akkreditierte Stelle“ für alle | 200-2; ENX; IDW/ISAE 3000 | F | ISO 27001 auf Basis IT-Grundschutz; ENX-Prüfdienstleister; C5-Testat durch Wirtschaftsprüfer |
| W56 | Kostenrechner | ISMS „deckt ab“ | — | U | große Überschneidung |
| W58 | Score-Badge | „Compliance nachweisen“, „Zertifizierungsniveau“ | — | U | Selbstbewertung, kein Nachweis |

## 10. Statistiken

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| W63 | Bedrohungen | 206 Mrd. EUR jährlich | Bitkom Wirtschaftsschutz 2026 (26.08.2026): Cyber 160,4–205,8 Mrd. EUR | U | 160–206 Mrd. EUR in 12 Monaten |
| W64 | Bedrohungen | 68 % betroffen (ohne Quelle) | Bitkom 2026 | U | 58 % mit Schaden in 12 Monaten |
| W65 | Bedrohungen | 70 neue Schwachstellen/Tag (BSI 2024) | BSI-Lagebericht 2025 | U | 119 pro Tag |
| W66 | Bedrohungen, Pillars | 132 bzw. 207 Tage | IBM Cost of a Data Breach 2025 | U | 241 Tage bis Erkennung und Eindämmung |
| W8 | Mythos m1 | 43 % der Angriffe auf KMU (Verizon 2024) | stammt aus Verizon DBIR 2019 | F | Bitkom 2026: 58 % |
| W9 | Mythos m6 | Ransomware Ø 255.000 EUR | nicht belegbar | U | Größenordnung |
| W10 | Mythos m7 | macOS-Malware verdreifacht | nicht belegbar | U | Apple-Sicherheitsupdates als Beleg |
| W12 | Mythos m4 Quelle | „BSI Cloud Computing Grundschutz“ | kein Dokument dieses Namens | U | C5 und BSI-Cloud-Empfehlungen |
| W17 | Tool-Stack Passwörter | 80 % der Datenlecks | Verizon DBIR 2019 (nur Hacking) | U | ohne Prozentangabe, Quelle genannt |
| W18 | MFA | 99,9 % | Microsoft (2019/2023) | U | „laut Microsoft über 99 %“ |
| W20 | Solo-Check, Angriffspfade | 90 % vs. 60 % | widersprüchlich, ohne Quelle | U | ohne Prozentangabe |
| W35 | Business Continuity | 43 % erholen sich nie; 5.600 EUR/Minute | nicht belegbar bzw. Gartner 2014 (USD, Großunternehmen) | F | Größenordnung |
| W48 | Cyber-Versicherung, Kostenrechner | 95.000 EUR, 30 %, 21 Tage, 5–20 % | ohne Quelle | U | Größenordnungen |
| W51 | Lieferantenampel | 60 % über Lieferkette (Gartner) | Gartner 2021: 45 % der Organisationen bis 2025 | F | Korrigiert |
| W67 | Benchmark | Werte als Studienergebnisse | keine Einzelquelle | U | als Schätzwerte gekennzeichnet |
| B11 | Branche Fertigung | 100.000+ EUR/Tag | ohne Quelle | U | Größenordnung |
| O2 | dsgvoOverlap | 60 % Überschneidung | eigene Schätzung | U | als Schätzung gekennzeichnet |
| PD1 | PDF Cyberhygiene | 90 % durch menschliches Fehlverhalten | ohne Quelle | U | „Ein Großteil“ |
| W5 | Anlaufstellen ACS | über 7.000 Teilnehmer | ohne Stand | U | mehrere tausend |

---

## Prüfung der Korrektur

- `npx vitest run`: 88 Tests grün (79 bestehende und 9 neue Regressionsprüfungen).
- `npx tsc --noEmit`: ohne Fehler.
- Beide Sprachdateien sind weiterhin gültiges JSON, die Zeilenzahl ist unverändert.

## Offen / nächster Prüfanlass

- Grundschutz++ (Nachfolger des Kompendiums): Bausteinbezüge umstellen, sobald die finale Fassung vorliegt.
- CRA: Fundstellen der harmonisierten Normen (M/606) nachtragen, sobald sie im Amtsblatt stehen.
- KRITIS-Dachgesetz: Schwellenwerte für den Sektor Weltraum folgen mit der KRITIS-Verordnung.
- OWASP ASVS 5.0 (Mai 2025): Fragenkatalog bei Gelegenheit von 4.0.3 auf 5.0 umstellen.

## Nachtrag 13.11.2026

| Nr | Stelle | Aussage vorher | Quelle | Ergebnis | Korrektur |
|---|---|---|---|---|---|
| N3 | NIS2 scQ3 (externe Zugriffe) | „Siehe BSI-Baustein ORP.1“ | Kompendium 2023: OPS.2.3 Outsourcing, OPS.1.2.5 Fernwartung | F | OPS.2.3 und OPS.1.2.5 |
| B4 | Branche Logistik, KRITIS | „Große Logistikunternehmen können als KRITIS-Betreiber eingestuft werden“ | BSI-KritisV, Sektor Transport und Verkehr | U | Nur Betreiber von Anlagen oberhalb der Schwellenwerte; die meisten Speditionen liegen darunter |

## Nachtrag 13.11.2026: Regelwerk-Synergien

Anlass: Die Überschneidungsdaten (Synergie-Graph, Ergebnisseite, PDF-Exporte) waren nicht Teil der Prüfung. Von 105 möglichen Paaren waren 32 hinterlegt, alle mit Prozentwerten ohne Quelle (Ausnahme SOC 2 – C5).

Methode:
- Alle 105 Paare geprüft, nicht nur die vorhandenen.
- Prozentwerte entfernt: Keine der gefundenen Quellen liefert eine belastbare Prozentzahl. Seriöse Zuordnungstabellen zeigen, dass und wo sich Regelwerke überschneiden, nicht wie viel.
- Drei Stufen: stark = eins baut auf dem anderen auf oder eine Zuordnung deckt den Kern ab; mittel = deutliche Teilüberschneidung bei anderem Geltungsbereich; gering = einzelne gemeinsame Themen. Die Stufe ist immer eine Einordnung anhand der Quelle.
- Quelle = offizielle Zuordnungstabelle eines Herausgebers oder einer Behörde (CIS, NIST, ENISA, AICPA, PCI SSC, BSI, ENX) oder Rechts- bzw. Normtext. Ohne Quelle steht die Verbindung als „Einschätzung" und wird im Graphen gestrichelt bzw. hellgrau gezeigt.
- Nicht verwendet: kommerzielle Vergleichsseiten mit Abdeckungsprozenten (widersprechen sich, Methode unklar).
- Verworfen: BSI-KRITIS-FAQ zu ISO 27001 (Seite liefert 404), daher KRITIS – ISO 27001 als Einschätzung.

Ergebnis: 88 Verbindungen (34 mit Quelle), 17 Paare ohne nennenswerte Überschneidung.

| Paar | vorher | jetzt | Quelle |
|---|---|---|---|
| NIS2 – KRITIS | 80 % | stark | §§ 28, 30, 31 BSIG |
| NIS2 – DORA | 60 % | stark | NIS2 Art. 4; DORA Art. 1 Abs. 2 (DORA als sektorspezifischer Rechtsakt) |
| NIS2 – ISO 27001 | 65 % | stark | ENISA: NIS2 Technical Implementation Guidance mit Mapping-Tabelle (2025) |
| NIS2 – NIST CSF | 55 % | stark | ENISA: NIS2 Technical Implementation Guidance mit Mapping-Tabelle (2025) |
| NIS2 – BSI-Grundschutz | 70 % | stark | Einschätzung |
| NIS2 – DSGVO | 50 % | mittel | NIS2 Art. 35; DSGVO Art. 32 |
| NIS2 – CIS Controls | 55 % | mittel | CIS: Controls v8.1 Mapping to NIS2 Directive |
| NIS2 – TISAX | 45 % | mittel | Einschätzung |
| NIS2 – SOC 2 | fehlte | mittel | Einschätzung |
| NIS2 – C5 | fehlte | mittel | Einschätzung |
| NIS2 – CRA | 35 % | gering | NIS2 Art. 21 Abs. 2 lit. e; CRA Art. 14 |
| NIS2 – ISO 22301 | 45 % | gering | NIS2 Art. 21 Abs. 2 lit. c (Aufrechterhaltung des Betriebs) |
| NIS2 – PCI DSS | fehlte | gering | Einschätzung |
| NIS2 – OWASP ASVS | fehlte | gering | Einschätzung |
| DSGVO – TISAX | 35 % | mittel | VDA ISA, Modul Datenschutz (Auftragsverarbeitung nach Art. 28 DSGVO) |
| DSGVO – SOC 2 | fehlte | mittel | AICPA: Mapping Trust Services Criteria to GDPR |
| DSGVO – ISO 27001 | fehlte | mittel | ISO/IEC 27001:2022 Anhang A 5.34; ISO/IEC 27701:2025 Anhang D |
| DSGVO – BSI-Grundschutz | fehlte | mittel | IT-Grundschutz-Kompendium, Baustein CON.2 Datenschutz |
| DSGVO – CRA | fehlte | gering | CRA Anhang I Teil I (Vertraulichkeit, Datenminimierung) |
| DSGVO – ISO 22301 | fehlte | gering | DSGVO Art. 32 Abs. 1 lit. c (Wiederherstellbarkeit) |
| DSGVO – DORA | 40 % | gering | Einschätzung |
| DSGVO – PCI DSS | fehlte | gering | Einschätzung |
| DSGVO – C5 | fehlte | gering | Einschätzung |
| DSGVO – NIST CSF | fehlte | gering | Einschätzung |
| DSGVO – CIS Controls | fehlte | gering | Einschätzung |
| DSGVO – OWASP ASVS | fehlte | gering | Einschätzung |
| KRITIS – BSI-Grundschutz | 75 % | stark | Einschätzung |
| KRITIS – ISO 22301 | 55 % | mittel | CER-Richtlinie (EU) 2022/2557 Art. 13 (Resilienzmaßnahmen) |
| KRITIS – ISO 27001 | fehlte | mittel | Einschätzung |
| KRITIS – DORA | fehlte | gering | Einschätzung |
| KRITIS – NIST CSF | fehlte | gering | Einschätzung |
| KRITIS – CIS Controls | fehlte | gering | Einschätzung |
| DORA – ISO 22301 | fehlte | mittel | DORA Art. 11 (IKT-Geschäftsfortführung) |
| DORA – CIS Controls | fehlte | mittel | CIS: Controls v8.1 Mapping to DORA |
| DORA – ISO 27001 | 60 % | mittel | Einschätzung |
| DORA – BSI-Grundschutz | fehlte | mittel | Einschätzung |
| DORA – NIST CSF | fehlte | mittel | Einschätzung |
| DORA – SOC 2 | fehlte | mittel | Einschätzung |
| DORA – C5 | fehlte | mittel | Einschätzung |
| DORA – PCI DSS | 40 % | gering | Einschätzung |
| DORA – OWASP ASVS | fehlte | gering | Einschätzung |
| CRA – OWASP ASVS | 45 % | mittel | Einschätzung |
| CRA – ISO 27001 | fehlte | gering | Einschätzung |
| CRA – BSI-Grundschutz | fehlte | gering | Einschätzung |
| CRA – NIST CSF | fehlte | gering | Einschätzung |
| CRA – CIS Controls | fehlte | gering | Einschätzung |
| TISAX – ISO 27001 | 70 % | stark | ENX: VDA ISA mit Zuordnung zu ISO/IEC 27001:2022 und NIST CSF 2.0 |
| TISAX – NIST CSF | fehlte | mittel | ENX: VDA ISA mit Zuordnung zu ISO/IEC 27001:2022 und NIST CSF 2.0 |
| TISAX – BSI-Grundschutz | fehlte | mittel | Einschätzung |
| TISAX – SOC 2 | fehlte | mittel | Einschätzung |
| TISAX – C5 | fehlte | mittel | Einschätzung |
| TISAX – CIS Controls | fehlte | mittel | Einschätzung |
| TISAX – PCI DSS | fehlte | gering | Einschätzung |
| TISAX – ISO 22301 | fehlte | gering | Einschätzung |
| TISAX – OWASP ASVS | fehlte | gering | Einschätzung |
| PCI DSS – NIST CSF | fehlte | mittel | PCI SSC: Mapping PCI DSS v4.0.1 to NIST CSF 2.0 |
| PCI DSS – CIS Controls | fehlte | mittel | CIS: Controls v8.1 Mapping to PCI DSS v4.0 |
| PCI DSS – ISO 27001 | 55 % | mittel | Einschätzung |
| PCI DSS – SOC 2 | fehlte | mittel | Einschätzung |
| PCI DSS – OWASP ASVS | fehlte | mittel | Einschätzung |
| PCI DSS – C5 | fehlte | gering | Einschätzung |
| PCI DSS – BSI-Grundschutz | fehlte | gering | Einschätzung |
| SOC 2 – C5 | 75 % | stark | BSI: C5:2020 Referenztabellen zu internationalen Standards |
| SOC 2 – ISO 27001 | 60 % | mittel | AICPA: Mapping Trust Services Criteria to ISO 27001 |
| SOC 2 – NIST CSF | fehlte | mittel | AICPA: Mapping Trust Services Criteria to NIST CSF |
| SOC 2 – CIS Controls | fehlte | mittel | CIS: Controls v8.1 Mapping to SOC 2 |
| SOC 2 – BSI-Grundschutz | fehlte | gering | Einschätzung |
| SOC 2 – ISO 22301 | fehlte | gering | Einschätzung |
| C5 – ISO 27001 | 75 % | stark | BSI: C5:2020 Referenztabellen zu internationalen Standards |
| C5 – BSI-Grundschutz | 70 % | stark | Einschätzung |
| C5 – NIST CSF | fehlte | mittel | Einschätzung |
| C5 – CIS Controls | fehlte | mittel | Einschätzung |
| C5 – ISO 22301 | fehlte | gering | Einschätzung |
| C5 – OWASP ASVS | fehlte | gering | Einschätzung |
| ISO 27001 – BSI-Grundschutz | 85 % | stark | BSI: ISO 27001-Zertifizierung auf der Basis von IT-Grundschutz |
| ISO 27001 – NIST CSF | 70 % | stark | NIST: CSF 2.0 Informative References – ISO/IEC 27001:2022 |
| ISO 27001 – ISO 22301 | 50 % | mittel | ISO/IEC 27001:2022 Anhang A 5.29, 5.30 |
| ISO 27001 – CIS Controls | 70 % | mittel | CIS: Controls v8.1 Mapping to ISO/IEC 27001:2022 |
| ISO 27001 – OWASP ASVS | 35 % | gering | ISO/IEC 27001:2022 Anhang A 8.25–8.28 (sichere Entwicklung) |
| BSI-Grundschutz – ISO 22301 | fehlte | stark | BSI-Standard 200-4 (kompatibel zu ISO 22301) |
| BSI-Grundschutz – NIST CSF | fehlte | mittel | Einschätzung |
| BSI-Grundschutz – CIS Controls | 65 % | mittel | Einschätzung |
| BSI-Grundschutz – OWASP ASVS | fehlte | gering | IT-Grundschutz-Kompendium, Bausteine CON.8 und APP.3.1 |
| NIST CSF – CIS Controls | 75 % | stark | CIS: Controls v8.1 Mapping to NIST CSF 2.0 |
| NIST CSF – ISO 22301 | fehlte | gering | Einschätzung |
| NIST CSF – OWASP ASVS | fehlte | gering | Einschätzung |
| ISO 22301 – CIS Controls | fehlte | gering | Einschätzung |
| CIS Controls – OWASP ASVS | 40 % | gering | Einschätzung |

Ohne Verbindung: DSGVO – KRITIS; KRITIS – CRA; KRITIS – TISAX; KRITIS – PCI DSS; KRITIS – SOC 2; KRITIS – C5; KRITIS – OWASP ASVS; DORA – CRA; DORA – TISAX; CRA – TISAX; CRA – PCI DSS; CRA – SOC 2; CRA – C5; CRA – ISO 22301; PCI DSS – ISO 22301; SOC 2 – OWASP ASVS; ISO 22301 – OWASP ASVS.

Offen: Die C5-Referenztabelle (XLSX) ist nicht zeilenweise ausgewertet; C5 – SOC 2 und C5 – ISO 27001 stützen sich auf die BSI-Seite zur Tabelle. Bei C5:2026, VDA ISA2027 und ISO/IEC 27701:2025 die Zuordnungen nachprüfen, sobald die Tabellen vorliegen.
