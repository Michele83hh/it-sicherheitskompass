# Prüfprotokoll Fragenprüfung — 13./14.11.2026

**Gegenstand:** Fragen, Empfehlungen und Normbezüge der 15 Regelwerke in `src/lib/regulations`, ihre Übersetzungen in `src/messages/de.json` und `en.json`, die Ergebnisseiten und die Zuordnung gleicher Fragen über Regelwerke hinweg.
**Methode:** Skript über alle Übersetzungsschlüssel; automatischer Durchlauf im Browser (Gap-Analyse mit zufälligen Antworten, Ergebnisseite mit allen Reitern und aufgeklappten Abschnitten, Schnellcheck); Vergleich der Fragetexte mit den Normbezügen im Code und mit der Äquivalenztabelle.
**Hinweis:** Die Korrekturen und die neue Äquivalenztabelle sind KI-erstellt und noch nicht fachlich gegengelesen.

## 1. Umfang der Prüfung im Browser

| Bereich | Deutsch | Englisch |
|---|---|---|
| Gap-Analyse | alle 15 Regelwerke | alle 15 Regelwerke |
| Ergebnisseite, alle Reiter und Abschnitte | alle 15 Regelwerke | alle 15 Regelwerke |
| Schnellcheck | alle 15 Regelwerke | alle 15 Regelwerke |
| Dashboard mit Synergie-Graph | geprüft | geprüft |

Ergebnis nach den Korrekturen: keine Rohschlüssel, keine NIS2-Texte auf fremden Ergebnisseiten, keine Fehler in der Browser-Konsole.

Nachtrag 14.11.: Gap-Analyse und Ergebnisseite auch auf Englisch für alle 15 Regelwerke durchlaufen, ohne Rohschlüssel. Die Vertiefungsfragen sind damit ebenfalls geprüft: Nur NIS2 trennt Kern und Vertiefung (30 + 20 Fragen), die anderen Regelwerke zeigen alle Fragen in einem Durchlauf. Dabei gefunden und behoben: Der Knopf „Ergebnisse verfeinern“ nach der NIS2-Kernanalyse tat nichts, weil der Meilenstein-Bildschirm stehen blieb. Der englische Schnellcheck samt Ergebnisseite ist ebenfalls für alle 15 Regelwerke durchlaufen: keine Rohschlüssel, keine deutschen Textreste, keine Konsolenfehler.

## 2. Befunde und Korrekturen

| Nr. | Regelwerk | Befund | Korrektur |
|---|---|---|---|
| 1 | ISO 22301 | 6 Fragen zeigten Rohschlüssel (`brQ`, `spQ` statt `biQ`, `bsQ`). | Schlüssel im Code angepasst. |
| 2 | ISO 22301 | Normbezug dreier Fragen passte nicht zum Fragetext (BC-Pläne unter 8.3, Übungen unter 8.4, Krisenkommunikation unter 8.5). | Auf 8.4, 8.5 und 8.4.3 gesetzt. |
| 3 | ISO 22301 | Empfehlungen im Code und Texte passten nicht zusammen (22 fehlende Schlüssel, zwei Texte ungenutzt). | Code auf die 12 vorhandenen Texte umgestellt, Normbezüge je Text gesetzt. |
| 4 | ISO 22301 | Englische Themenbezeichnung unter jeder Frage in der deutschen Oberfläche. | Wird nicht mehr angezeigt; der Abschnitt der Norm bleibt. |
| 5 | OWASP ASVS | 9 Fragen zeigten Rohschlüssel (`authQ`, `sessQ`, `cryptoQ`). | Schlüssel im Code angepasst. |
| 6 | OWASP ASVS | 10 Normbezüge passten nicht zum Fragetext, z. B. Protokollierung unter V9 (Kommunikation) und Passwort-Hashing unter V6.2. | An ASVS 4.0 angeglichen, z. B. V7.1/V7.2 und V2.4.1. |
| 7 | OWASP ASVS | Empfehlungen: 22 fehlende Schlüssel, Text zu API-Sicherheit ungenutzt. | Code auf die 12 vorhandenen Texte umgestellt. |
| 8 | CIS, NIST CSF, ISO 22301, OWASP | Je 4 Checklisten-Verweise ohne Text. Checklisten werden nirgends angezeigt. | Verweise entfernt. |
| 9 | 8 Regelwerke | Einleitungstext je Bereich fehlt (55 Bereiche); angezeigt wurde der Rohschlüssel. | Box erscheint nur noch, wenn ein Text vorhanden ist. |
| 10 | NIS2 | Abschnitt „ISO 27001:2022 Crosswalk“ der Ergebnisseite ohne Texte, weil das Regelwerk ISO 27001 denselben Namensraum belegt. | Texte aus der Git-Historie unter `iso27001Mapping` wiederhergestellt. |
| 11 | NIS2 | Hilfsdateien mit Schlüsseln, die es nicht gibt. | Drei ungenutzte Dateien gelöscht (`geschaeftsleitung.ts`, `kritis.ts`, `registrierung.ts`), `meldepflichten.ts` ebenfalls; übrige Schlüssel korrigiert oder entfernt. |
| 12 | KRITIS | Normbezüge im Code nach alter Nummerierung (§8a, §8b BSIG), Empfehlungstexte nach neuer. | Code umgestellt: §8a Abs. 1 → §30 Abs. 1, §8a Abs. 3 → §39 Abs. 1, §8b Abs. 3 → §33, §8b Abs. 4 → §32. |
| 13 | KRITIS, NIS2 | Verweis auf BSI-Standard 100-4 (abgelöst). | Auf 200-4 geändert. |
| 14 | alle außer NIS2 | Ergebnisseite mit NIS2-FAQ („automatisch NIS2-konform?“) und Hinweis auf das NIS2-Informationsportal. | FAQ nennt das jeweilige Regelwerk; Quellenhinweis je Regelwerk. |
| 15 | alle | Maßnahmenplan, Fortschritt und Sammel-PDF-Auswahl zeigten Icon-Namen als Text („ServerCrash“). | Entfernt. |
| 16 | NIS2, Säulen, Wissen | MFA-Aussagen ohne Quelle oder mit vermischten Zahlen („81 % … 99,9 %“). | Quelle genannt (Microsoft-Studie 2023: 99,22 % bzw. 98,56 %); Verizon-Zahl durch Aussage ohne Prozentwert ersetzt. |

## 3. Zuordnung gleicher Fragen (`question-equivalences.ts`)

Die alte Tabelle (22 Themen) ordnete Fragen nach Position im Regelwerk zu, nicht nach Inhalt. Beispiele: Unter „MFA“ standen die Rechteprüfung (ISO 27001), Vertraulichkeitsvereinbarungen (DORA) und nicht autorisierte Geräte (CIS); unter „Lieferkettensicherheit“ der physische Schutz (ISO 27001). Wer einen Vorschlag übernahm, bekam die Antwort einer anderen Frage.

Neu: 49 Themen. Eine Frage steht nur in einem Thema, wenn ihr Text dieselbe Maßnahme abfragt. Ein Test prüft, dass jede ID existiert und keine Frage doppelt zugeordnet ist.

Anteil der Fragen, für die es nach Abschluss eines anderen Regelwerks einen Vorschlag gibt:

| Kombination | alt | neu |
|---|---|---|
| ISO 27001 nach NIS2 | 28/30 | 13/30 |
| NIS2 nach ISO 27001 | 26/50 | 14/50 |
| DSGVO nach NIS2 + ISO 27001 | 8/50 | 1/50 |
| ISO 27001 nach TISAX | 17/30 | 13/30 |
| TISAX nach ISO 27001 | 14/36 | 13/36 |
| BSI-Grundschutz nach ISO 27001 | 15/30 | 7/30 |
| KRITIS nach NIS2 | 21/30 | 12/30 |
| DORA nach NIS2 | 25/30 | 10/30 |
| C5 nach ISO 27001 | 16/25 | 10/25 |

Die alten Zahlen waren höher, weil sie auch falsche Zuordnungen zählten.

Der Vorschlag wird als Schaltfläche an der Frage angezeigt und erst per Klick übernommen. Im Schnellcheck gibt es keine Vorschläge.

## 4. Offen

- Reifegrad-Texte bei CIS, ISO 22301, NIST CSF und OWASP: am 14.11. durch eigene Texte je Frage ersetzt (72 Fragen, vier Stufen, DE und EN). KI-erstellt, noch nicht gegengelesen. Ein Test verhindert gleiche Texte bei mehreren Fragen.
- Einleitungstexte je Bereich: am 14.11. für die 55 fehlenden Bereiche ergänzt (DE und EN). KI-erstellt, noch nicht gegengelesen. Der Schlüsseltest verlangt den Text jetzt für jeden Bereich.
- ISO-27001-Abschnitt der NIS2-Ergebnisseite: am 14.11. von Prozentwerten ohne Quelle auf Stufen umgestellt (stark/mittel, wie bei den Synergien), Gesamtwert entfernt, Quelle ENISA verlinkt. Die zehn Texte zu den NIS2-Zusatzanforderungen neu gefasst, weil einige Anforderungen nannten, die NIS2 nicht enthält (Zero Trust, Krypto-Agilität, kürzere Wiederherstellungszeiten, KPIs). KI-erstellt, noch nicht gegengelesen; PDF-Ausgabe nicht angesehen.
- PCI DSS („Goal 1“) und SOC 2 (englische Kriteriennamen): Zusatzzeile unter den Fragen am 14.11. ausgeblendet.
- Antwort „trifft nicht zu“: am 14.11. für 21 Fragen in sechs Regelwerken eingeführt. Einzelheiten in `2026-11-14-fragen-vorschlaege.md`, Abschnitt 3.2. Die Auswahl der Fragen ist KI-erstellt, noch nicht gegengelesen.
- NIS2-Fragen über die Richtlinie hinaus: am 14.11. Frist aus `bc-q2` entfernt, `ea-q5`, `cr-q5`, `mc-q4` mit Hinweis versehen. Einzelheiten in `2026-11-14-fragen-vorschlaege.md`, Abschnitt 3.4.
- Doppelungen je Regelwerk: am 14.11. abgegrenzt statt gestrichen, 42 Texte je Sprache. Einzelheiten in `2026-11-14-fragen-vorschlaege.md`, Abschnitt 4a. KI-erstellt, noch nicht gegengelesen.
- „Wie“-Fragen bei SOC 2 und ISO 27001: am 14.11. 29 Titel je Sprache in geschlossene Form gebracht. KI-erstellt, noch nicht gegengelesen.
- Inhaltliche Prüfung je Regelwerk (Notwendigkeit, Doppelungen, KMU-Verständlichkeit, Verhältnis Kern zu Vertiefung) steht aus.
