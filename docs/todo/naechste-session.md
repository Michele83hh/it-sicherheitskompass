# TODO nächste Session

Stand: 14.11.2026. Reihenfolge = Vorschlag. Was am 13./14.11. erledigt wurde, steht im Prüfprotokoll `docs/pruefprotokoll/2026-11-14-fragenpruefung.md`.

## 1. Selbst gegenlesen (KI-erstellt)

- [ ] Neue Zuordnung gleicher Fragen in `src/lib/regulations/question-equivalences.ts` (49 Themen).
- [ ] Geänderte Normbezüge bei ISO 22301, OWASP ASVS und KRITIS (Tabelle im Prüfprotokoll, Nr. 2, 6, 12).
- [ ] Erklärtexte zu den 13 Schlagwörtern im Synergie-Graphen (`platform.overlaps.measureInfo` in `de.json`).
- [ ] Reifegrad-Texte der 72 Fragen von CIS, ISO 22301, NIST CSF und OWASP ASVS (je vier Stufen, DE und EN).

## 2. Fragen: offene Inhalte

- [ ] **Einleitungstexte je Bereich** fehlen bei 8 Regelwerken (55 Bereiche). Die Box ist dort ausgeblendet.
- [ ] **ISO-27001-Abschnitt der NIS2-Ergebnisseite:** Prozentwerte je Kategorie haben keine Quelle; Einleitung nennt „ca. 72 %“, berechnet werden 68 %. Auf Stufen mit Quelle umstellen wie bei den Synergien.
- [ ] PCI DSS zeigt „Goal 1“, SOC 2 englische Kriteriennamen unter den Fragen.
- [ ] Vertiefungsfragen und kompletter englischer Durchlauf im Browser.
- [ ] Inhaltlich je Regelwerk prüfen: Braucht es die Frage? Doppelungen? KMU-verständlich? Verhältnis Kern zu Vertiefung?
- [ ] Idee: gemeinsamer Fragenkern, also einmal antworten und auf alle gewählten Regelwerke abbilden. Die 49 Themen sind die Vorarbeit. Vorschläge gibt es bisher nur in der Gap-Analyse, nicht im Schnellcheck.

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

## Testwerkzeug

Die Übersetzungsschlüssel prüft jetzt `npm test` (`translation-keys.test.ts`).

Der Browser-Durchlauf läuft so: Gap-Analyse starten, je Frage eine zufällige Stufe wählen, „Weiter“ bzw. „… abschließen“ klicken (Groß- und Kleinschreibung beachten). Auf der Ergebnisseite alle Reiter öffnen und Texte sammeln, die wie `name.name.name` aussehen (Rohschlüssel).
