# TODO nächste Session

Stand: 14.11.2026. Reihenfolge = Vorschlag. Was am 13./14.11. erledigt wurde, steht im Prüfprotokoll `docs/pruefprotokoll/2026-11-14-fragenpruefung.md`.

## 1. Selbst gegenlesen (KI-erstellt)

Alles steht zum Abhaken in `docs/pruefprotokoll/2026-11-14-gegenlese-unterlage.md` (aus dem Code erzeugt):

- [ ] Abschnitt 1: Zuordnung gleicher Fragen (49 Themen).
- [ ] Abschnitt 2: Normbezüge bei ISO 22301, OWASP ASVS und KRITIS.
- [ ] Abschnitt 3: ISO-27001-Abschnitt der NIS2-Ergebnisseite (Stufen, Controls, Zusatzanforderungen). Die PDF-Ausgabe ist geprüft.
- [ ] Abschnitt 4: Erklärtexte zu den 13 Schlagwörtern im Synergie-Graphen.
- [ ] Abschnitt 5: Einleitungstexte der 55 Bereiche.
- [ ] Abschnitt 6: Reifegrad-Texte der 72 Fragen.

## 2. Fragen: Vorschläge entscheiden

Die Vorschläge stehen in `docs/pruefprotokoll/2026-11-14-fragen-vorschlaege.md`. Umgesetzt sind Tippfehler, die Antwort „trifft nicht zu“ die NIS2-Fragen aus Abschnitt 3.4 die Doppelungen (Abschnitt 4a) die „Wie“-Fragen (Abschnitt 3.3) und Kern und Vertiefung bei DSGVO (Abschnitt 3.1). Zu entscheiden, in dieser Reihenfolge:

- [x] Antwort „trifft nicht zu“ eingeführt (Abschnitt 3.2), bei 21 Fragen.
- [ ] Selbst prüfen: Ist die Auswahl der 21 Fragen richtig? Sie ist KI-erstellt. Liste in Abschnitt 3.2 der Vorschläge.
- [x] NIS2-Fragen, die über die Richtlinie hinausgehen (Abschnitt 3.4): Frist aus `bc-q2` entfernt, drei Fragen gekennzeichnet. Am deutschen Wortlaut von Art. 21 Abs. 2 geprüft, Einordnung bestätigt.
- [ ] Entscheiden: Sollen die drei gekennzeichneten NIS2-Fragen weiter in den Wert eingehen? Derzeit ja.
- [ ] Gleiche Stellen außerhalb von NIS2: DSGVO `tom-q3` (Stufe 2 nennt „24-48 Stunden“), CIS `cis-rn-q1` (3-2-1-Regel).
- [x] Doppelungen je Regelwerk: abgegrenzt statt gestrichen, 42 Texte je Sprache (Abschnitt 4a).
- [ ] Selbst gegenlesen: die Tabelle in Abschnitt 4a, vor allem die neu gefassten Fragen DORA `rt-q4` und DSGVO `dv-q2`.
- [x] Normbezüge DORA: `da-q2` und die Zusatzzeilen sind am 14.11. am Amtstext geklärt (Wortlautprüfung).
- [ ] Normbezug klären: PCI DSS `ac-q2` (Req. 7.2 oder 7.3). Der Normtext lag nicht vor.
- [x] Übrige Punkte aus Abschnitt 4: Einzelbefunde, Abkürzungen, lange Titel (Abschnitt 4b).
- [ ] Entscheiden: `cis-vm-q3` und `nist-pr-q3` teilen? (Abschnitt 3.6, Begründung in 4b)
- [ ] Selbst gegenlesen: die gekürzten DSGVO-Titel (23 Stück) gegen den Wortlaut der Artikel.
- [x] „Wie“-Fragen bei SOC 2 und ISO 27001 umformuliert, 29 Titel je Sprache (Abschnitt 3.3).
- [ ] Selbst gegenlesen: die 29 neuen Titel in der Gap-Analyse von SOC 2 und ISO 27001.
- [x] Kern und Vertiefung bei DSGVO eingeschaltet (Abschnitt 3.1).
- [ ] Gemeinsamer Fragenkern: Weg A oder B (Abschnitt 5). Erst nach dem Gegenlesen der 49 Themen.

## 3. Ausrichtung besprechen: Umsetzung für ISO-27001-Audits (Wunsch Nutzer)

Die Idee: die gemeinsamen Maßnahmenthemen beschreiben und die Seite teilweise auf die Umsetzung für Audits ausrichten, nach ISO 27001 und nach ISO 27001 auf Basis von IT-Grundschutz. Das passt zum Berufsziel (Grundschutz-Praktiker, danach ISO-27001-Auditor).

- [ ] Erst im Brainstorming klären: Zielgruppe, Umfang, Verhältnis zur neuen Portfolio- und Design-Richtung (Ansatz A/B/C ist noch offen).
- [ ] Beachten:
  - Die Kompass-Inhalte sind KI-generiert. Sie nicht als eigene Expertise darstellen, solange sie nicht selbst geprüft sind.
  - Unabhängigkeit als Auditor (ISO/IEC 17021-1): Beratung und Audit beim selben Kunden schließen sich aus.

## 4. Sonstiges Offenes

- [ ] Design: Entscheidung zu Ansatz A, B oder C steht aus.
  - A: nur Startseite
  - B: alle Seiten plus neue Start- und Über-mich-Seite
  - C: Seite für Seite
- [ ] Danach Design-Dokument und Plan erstellen.
- [ ] Die Prototypen `public/prototyp/hell.html` und `dunkel.html` liegen nur lokal und werden nicht committet.
- [ ] Aufräumen: die `node_modules`-Junction im Worktree entfernen, sobald dort nicht mehr gearbeitet wird (`cmd //c "rmdir node_modules"`).
- [ ] Den GitHub-Token rotieren, falls noch nicht geschehen. Er war in einer früheren Sitzung versehentlich sichtbar.


## 5. Aus der Wortlautprüfung vom 14.11.2026 (KI-erstellt)

Einzelheiten in `docs/pruefprotokoll/2026-11-14-wortlautpruefung.md`.

- [ ] Selbst gegenlesen: das Protokoll der Wortlautprüfung, vor allem die Tabellen „Bezüge geändert“ je Regelwerk.
- [x] OWASP ASVS: am 14.11. auf 5.0.0 umgestellt (jüngste stabile Fassung, 30.5.2025).
- [ ] Selbst gegenlesen: die Zuordnungstabelle 4.0.3 → 5.0.0 im Nachtrag des Protokolls.
- [x] BSI C5: am 14.11. auf C5:2026 umgestellt (BSI empfiehlt ihn für Prüfzeiträume mit Ende ab 1.6.2027).
- [ ] Selbst gegenlesen: die Zuordnungstabelle C5:2020 → C5:2026 im Nachtrag des Protokolls. Falls die Zielgruppe überwiegend früher endende Prüfzeiträume hat, wäre C5:2020 die passendere Fassung.
- [x] BSI-KritisV: gilt am 14.11.2026 weiter (zuletzt geändert 15.5.2026). Nach ihrem § 12 tritt sie außer Kraft, sobald die Rechtsverordnung nach § 4 Abs. 3 und § 5 Abs. 1 KRITIS-Dachgesetz in Kraft tritt.
- [ ] Beobachten: Sobald diese Verordnung in Kraft ist, die Zusatzzeile „BSI-KritisV“ bei 26 KRITIS-Fragen ersetzen.
- [x] VDA ISA: am 14.11. auf 2027.1 umgestellt (Grundlage für ab 1.1.2027 beauftragte Assessments; 30 von 36 verwendeten Controls unverändert).
- [ ] Selbst gegenlesen: die drei neu zugeordneten Prototypenschutz-Fragen im Nachtrag des Protokolls.
- [ ] Nicht geprüft, weil kein Normtext vorlag: ISO 27001, ISO 22301, PCI DSS, CIS Controls, SOC 2 (120 Fragen). Mit den Normtexten nachholen.
- [ ] Empfehlungen (`recommendations.ts` aller Regelwerke) sind nicht am Wortlaut geprüft. Bei OWASP ASVS und C5 sind die Kennungen der Empfehlungen am 14.11. mit umgestellt, die Texte nicht geprüft. Die TISAX-Empfehlungen tragen an 24 Stellen noch die alten, durchgezählten Control-Nummern.
- [ ] Hilfetexte bei TISAX enthalten noch Erfahrungsaussagen über Assessments ohne Quelle („zentrales Thema“, „häufiger Befund“).

## Testwerkzeug

Die Übersetzungsschlüssel prüft jetzt `npm test` (`translation-keys.test.ts`).

Der Browser-Durchlauf läuft so: Gap-Analyse starten, je Frage eine zufällige Stufe wählen, „Weiter“ bzw. „… abschließen“ klicken (Groß- und Kleinschreibung beachten). Auf der Ergebnisseite alle Reiter öffnen und Texte sammeln, die wie `name.name.name` aussehen (Rohschlüssel).
