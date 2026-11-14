# Vorschlagsliste Fragen — 14.11.2026

**Gegenstand:** die 431 Fragen der 15 Regelwerke (deutsche Fragetitel).
**Methode:** alle Titel gelesen; Kennzahlen per Skript aus dem Code. Tooltips, Hilfetexte und Empfehlungen wurden nicht einzeln gelesen.
**Hinweis:** KI-erstellte Vorschläge, keine fachliche Prüfung. Jede Zeile ist ein Vorschlag zur Entscheidung, umgesetzt ist nur Abschnitt 1.

## 1. Bereits korrigiert

| Regelwerk | Frage | Korrektur |
|---|---|---|
| ISO 27001 | `iso-ps-q3` | Tippfehler „Schutzmaassnahmen“ (4 Stellen). |
| TISAX | `kom-q3` | „Datenüberträge“ → „Datenübertragungen“. |
| OWASP ASVS | `owasp-auth-q1` | „Komplexität“ aus dem Titel entfernt. ASVS 4.0 V2.1.9 verlangt ausdrücklich keine Zusammensetzungsregeln; genannt sind jetzt Mindestlänge und Abgleich mit geleakten Passwörtern. |

## 2. Kennzahlen

| Regelwerk | Fragen | Kern | Vertiefung | in Zuordnung | Ø Zeichen | über 130 Zeichen |
|---|---|---|---|---|---|---|
| NIS2 | 50 | 30 | 20 | 32 | 96 | 2 |
| DSGVO | 50 | 30 | 20 | 4 | 132 | 25 |
| KRITIS | 30 | 22 | 8 | 19 | 93 | 0 |
| DORA | 30 | 18 | 12 | 11 | 105 | 1 |
| TISAX | 36 | 36 | 0 | 25 | 100 | 1 |
| CRA | 24 | 24 | 0 | 1 | 94 | 0 |
| BSI-Grundschutz | 30 | 30 | 0 | 16 | 102 | 0 |
| ISO 27001 | 30 | 23 | 7 | 18 | 78 | 0 |
| SOC 2 | 25 | 18 | 7 | 12 | 72 | 0 |
| PCI DSS | 29 | 21 | 8 | 17 | 102 | 6 |
| C5 | 25 | 20 | 5 | 19 | 92 | 0 |
| NIST CSF | 18 | 18 | 0 | 13 | 73 | 0 |
| CIS Controls | 18 | 15 | 3 | 16 | 74 | 0 |
| ISO 22301 | 18 | 18 | 0 | 5 | 69 | 0 |
| OWASP ASVS | 18 | 12 | 6 | 6 | 75 | 0 |

„In Zuordnung“ = Fragen, die in einem der 49 gemeinsamen Themen stehen (214 von 431).

## 3. Übergreifende Befunde

### 3.1 Kern und Vertiefung wirken nur bei NIS2

Zehn Regelwerke kennzeichnen Fragen als Kern oder Vertiefung, aber nur NIS2 trennt sie in zwei Phasen (`hasTieredAssessment`). Bei den anderen neun erscheinen alle Fragen in einem Durchlauf; die Kennzeichnung hat dort keine Wirkung.

Vorschlag: bei DSGVO einschalten (50 Fragen, 132 Zeichen im Schnitt, der längste Durchlauf). Bei den übrigen acht die Kennzeichnung belassen und erst einschalten, wenn der Durchlauf als zu lang empfunden wird.

### 3.2 Keine Antwort „trifft nicht zu“

Mehrere Bereiche gelten nur für einen Teil der Unternehmen. Wer sie nicht betreibt, muss „nicht vorhanden“ wählen und bekommt einen schlechteren Wert.

| Regelwerk | Betroffene Fragen | Bedingung |
|---|---|---|
| BSI-Grundschutz | `ind-q1` bis `ind-q3` | nur mit Produktionsanlagen oder Steuerungssystemen |
| TISAX | `proto-q1` bis `proto-q3` | nur mit Prototypenschutz als Prüfziel |
| DSGVO | `dt-q2` bis `dt-q5`, `ew-q4`, `vv-q4`, `br-q5` | nur bei Drittlandtransfer, Diensten für Minderjährige, Tätigkeit als Auftragsverarbeiter, automatisierten Entscheidungen |
| DORA | `rt-q3` bis `rt-q5`, `da-q5` | TLPT-Pflicht und kritische Drittanbieter nur für einen Teil der Finanzunternehmen |
| ISO 27001, BSI | `iso-cn-q3`, `iso-cn-q4`, `app-q3` | nur mit eigenen Webanwendungen oder eigener Entwicklung |
| PCI DSS | `ps-q3` | nur mit Kartenterminals |

Vorschlag: eine fünfte Antwort „trifft nicht zu“, die aus der Wertung fällt. Das ist die Änderung mit der größten Wirkung auf die Aussagekraft des Ergebnisses.

**Umgesetzt am 14.11.** für die 21 Fragen der Tabelle:

- Die Antwort erscheint nur bei diesen Fragen. Pflichtanforderungen lassen sich so nicht wegklicken.
- Sie zählt als beantwortet, geht aber nicht in den Mittelwert des Bereichs ein.
- Ist ein ganzer Bereich so beantwortet (TISAX Prototypenschutz, BSI Industrielle IT), fällt er aus der Gesamtwertung, aus den Bereichskarten und aus den Empfehlungen. Die Ergebnisseite nennt ihn in einer Zeile.
- Die Antwort wird nicht als Vorschlag in andere Regelwerke übertragen.
- Eine weitere Frage freischalten: `notApplicableAllowed: true` in der `questions.ts` des Regelwerks setzen. Die `config.ts` muss das Feld durchreichen; ein Test zählt die 21 Fragen.

Offen: Der Abschnitt „Auswirkung auf Ihre Sicherheitssäulen“ wählt seine Maßnahmen unabhängig von den Antworten und kann weiter Maßnahmen aus einem unzutreffenden Bereich zeigen. PDF und Excel wurden nicht mit einer solchen Antwort angesehen.

### 3.3 Offene „Wie“-Fragen

SOC 2 stellt 24 von 25 Fragen als „Wie …?“, ISO 27001 fünf. Die Antwort ist aber eine von vier Stufen. „Wie verwalten Sie …?“ passt dazu schlechter als „Ist … geregelt?“.

Vorschlag: auf geschlossene Form umstellen wie bei den anderen Regelwerken.

### 3.4 Fragen, die über das Regelwerk hinausgehen

Bei NIS2 stehen vier Fragen unter einem Artikel der Richtlinie, verlangen aber etwas, das dort nicht steht.

| Frage | Inhalt | Einordnung |
|---|---|---|
| `bc-q2` | Wiederanlauf „innerhalb von 24-48 Stunden“ | NIS2 nennt keine Frist. Die Zahl ist willkürlich. |
| `ea-q5` | Kennzahlen (KPIs) | Gute Praxis, keine Pflicht aus Art. 21 Abs. 2 lit. f. |
| `cr-q5` | Krypto-Agilität | Keine Pflicht aus lit. h. |
| `mc-q4` | Kontextbasierte Zugriffsrichtlinien | Keine Pflicht aus lit. j. |

Vorschlag: `bc-q2` ohne Zahl formulieren („innerhalb der von Ihnen festgelegten Zeit“). Die drei anderen in der Vertiefung belassen, aber sichtbar als „über die Mindestanforderung hinaus“ kennzeichnen.

**Umgesetzt am 14.11.:**

- `bc-q2` fragt jetzt nach der „von Ihnen festgelegten Zeit“. Der Hilfetext nennt keinen Orientierungswert mehr und verweist auf die selbst festgelegte Wiederanlaufzeit.
- `ea-q5`, `cr-q5` und `mc-q4` tragen an der Frage den Hinweis „Im Regelwerk nicht ausdrücklich verlangt – gute Praxis.“ (`beyondMinimum: true` in `questions.ts`).
- Die drei Fragen gehen weiter in den Wert ein. Ob das so bleiben soll, ist offen.

Maßstab war der Wortlaut von Art. 21 Abs. 2 lit. c, f, h und j NIS2-RL, aus dem Gedächtnis des Modells, nicht am Amtsblatt nachgeschlagen. Zu `mc-q4`: lit. j nennt „kontinuierliche Authentifizierung“; das ist verwandt, aber nicht dasselbe wie standort- oder geräteabhängige Zugriffsregeln. Selbst gegenlesen.

Weitere Stellen dieser Art, nicht geändert: CIS `cis-rn-q1` nennt die 3-2-1-Regel, die Control 11 nicht vorschreibt. DSGVO `tom-q3` nennt in Stufe 2 „24-48 Stunden“.

### 3.5 Abkürzungen im Fragetitel

| Regelwerk | Abkürzungen ohne Erklärung im Titel |
|---|---|
| ISO 22301 | BCM, BCMS, BIA, RTO, RPO, BC-Pläne |
| PCI DSS | CDE, PAN, NSC (jeweils einmal erklärt, danach nicht mehr) |
| DORA | IKT, TLPT, IoC, TTP |
| KRITIS | SzA, CSIRT, BCMS |
| OWASP ASVS | IDOR, ORM, at-rest |
| CRA | SBOM, hEN |

Vorschlag: bei der ersten Nennung je Bereich ausschreiben. OWASP ASVS richtet sich an Entwickler; dort reicht ein Hinweis auf der Startseite des Regelwerks, dass die Fragen technische Kenntnisse voraussetzen.

### 3.6 Zwei Dinge in einer Frage

Wenn eine Frage zwei Maßnahmen verbindet, ist die Stufe schwer zu wählen, sobald nur eine davon umgesetzt ist. Die deutlichsten Fälle:

| Frage | Verbindet |
|---|---|
| CIS `cis-vm-q3` | E-Mail-Schutz, Browser-Schutz und Anti-Malware |
| NIST `nist-pr-q3` | Verschlüsselung und Endgeräteschutz |
| CIS `cis-rn-q2` | Netzsegmentierung und Prüfung der Firewall-Regeln |
| ISO 27001 `iso-ic-q3`, TISAX `comp-q2` | interne Audits und Managementbewertung |
| NIS2 `ac-q2` | regelmäßige Überprüfung und Entzug bei Austritt |

Vorschlag: `cis-vm-q3` und `nist-pr-q3` teilen. Die anderen belassen; dort führen die Stufentexte durch beide Teile.

## 4. Vorschläge je Regelwerk

Angegeben sind nur Regelwerke mit konkretem Befund. „Doppelung“ heißt: Zwei Fragen fragen aus Sicht eines Anwenders dasselbe ab.

### NIS2

| Fragen | Befund | Vorschlag |
|---|---|---|
| `ac-q2`, `ac-q5` | Doppelung: Überprüfung der Zugriffsrechte, einmal „überprüft“, einmal „rezertifiziert“. | `ac-q5` streichen oder auf Nachweis der Rezertifizierung zuspitzen. |
| `cr-q1`, `mc-q2`, `mc-q5` | Drei Fragen zur Verschlüsselung bei der Übertragung. | `mc-q5` streichen; `mc-q2` auf Sprach-, Video- und Textkommunikation zuspitzen (Wortlaut lit. j). |
| `cr-q3`, `cr-q4` | Doppelung: Schlüsselverwaltung. | Zusammenlegen. |
| `sc-q1`, `sc-q5` | Doppelung: Prüfung und Neubewertung der Lieferanten. | `sc-q5` streichen; Regelmäßigkeit steht in den Stufen von `sc-q1`. |
| `ih-q1`, `bc-q3` | Beide fragen nach einem Plan für Cyberangriffe. | `bc-q3` auf Ausfall und Wiederanlauf begrenzen. |

### DSGVO

| Fragen | Befund | Vorschlag |
|---|---|---|
| alle | 25 von 50 Titeln über 130 Zeichen, oft mit Artikelzitat im Satz. | Kürzen; der Artikel steht ohnehin in der Zeile darunter. |
| `vv-q1`, `vv-q2`, `vv-q3` | `vv-q1` fragt nach allen Pflichtangaben, `vv-q2` und `vv-q3` nach einzelnen davon. | `vv-q2` und `vv-q3` zusammenlegen oder streichen. |
| `dv-q2`, `dv-q4` | Doppelung: Dokumentation aller Datenschutzverletzungen (Art. 33 Abs. 5). | Zusammenlegen. |
| `pbd-q2`, `pbd-q3` | Datenschutzfreundliche Voreinstellung und Datenminimierung überschneiden sich stark. | Zusammenlegen. |
| `av-q3`, `av-q4` | Beide zu Unterauftragsverarbeitern. | Zusammenlegen. |
| `dsfa-q2` | „Blacklist“ der Aufsichtsbehörde. | „Muss-Liste“ (so nennen es die Aufsichtsbehörden). |
| `dsb-q5` | „(kein Interessenkonflikt, kein Benachteiligungsverbot)“ ist sprachlich verdreht. | „(kein Interessenkonflikt, keine Benachteiligung)“. |

### KRITIS

| Fragen | Befund | Vorschlag |
|---|---|---|
| `lk-q2`, `lk-q4` | Doppelung: Bewertung und Überprüfung der Zulieferer. | Zusammenlegen. |
| `rm-q3`, `vm-q4`, `bcm-q1` | Abkürzungen SzA, CSIRT, BCMS. | Ausschreiben. |

### DORA

| Fragen | Befund | Vorschlag |
|---|---|---|
| `vm-q2` | „… als schwerwiegend eingestuft?“ liest sich, als solle jeder Vorfall schwerwiegend sein. | „Werden IKT-bezogene Vorfälle nach den DORA-Kriterien klassifiziert?“ |
| `rt-q4`, `rt-q5` | Doppelung: Anforderungen an TLPT-Tester. | Zusammenlegen. |
| `da-q2`, `da-q4` | Beide zu Vertragsinhalten mit Drittanbietern. | `da-q4` auf kritische oder wichtige Funktionen zuspitzen oder streichen. |

### CRA

| Fragen | Befund | Vorschlag |
|---|---|---|
| `konf-q3` | „Welche CE-Kennzeichnung Ihr Produkt braucht“: Es gibt nur eine CE-Kennzeichnung. | „Haben Sie die EU-Konformitätserklärung ausgestellt und die CE-Kennzeichnung angebracht?“ |
| alle | Nur eine Frage in der gemeinsamen Zuordnung. | So belassen; der CRA regelt Produkte, nicht den eigenen Betrieb. |

### ISO 27001

| Fragen | Befund | Vorschlag |
|---|---|---|
| `iso-pr-q1`, `iso-op-q2` | Risikobewertung planen (6.1.2) und durchführen (8.2): für Anwender dieselbe Frage. | Zusammenlegen; die Regelmäßigkeit in die Stufen. |
| `iso-ps-q2`, `iso-ps-q3` | Beide nennen Umwelteinwirkungen. | `iso-ps-q2` auf Geräte und Datenträger begrenzen. |
| 5 Fragen | „Wie“-Form. | Siehe 3.3. |

### SOC 2

| Fragen | Befund | Vorschlag |
|---|---|---|
| 24 Fragen | „Wie“-Form. | Siehe 3.3. |
| `sec-q1`, `sec-q2` | Zugangskontrolle und Benutzerverwaltung überschneiden sich. | Abgrenzen: `sec-q1` Anmeldung und Rechtevergabe, `sec-q2` Ein- und Austritt. |

### PCI DSS

| Fragen | Befund | Vorschlag |
|---|---|---|
| `ns-q1`, `ns-q2`, `ns-q4` | Drei Fragen zu Netzwerksicherheitskontrollen an der Grenze der Kartendatenumgebung. | Auf zwei reduzieren: Kontrollen vorhanden, Regeln eingeschränkt und überprüft. |
| `ac-q1`, `ac-q2` | Doppelung: Need-to-know. | Zusammenlegen. |
| 6 Fragen | Titel über 130 Zeichen. | Kürzen. |

### NIST CSF

| Fragen | Befund | Vorschlag |
|---|---|---|
| `nist-de-q1`, `nist-de-q2`, `nist-de-q3` | Überwachung, Erkennung von Anomalien und Erkennungsprozesse liegen eng beieinander. | Belassen; entspricht den Kategorien DE.CM und DE.AE. Stufentexte grenzen ab. |
| `nist-pr-q3` | Zwei Dinge in einer Frage. | Siehe 3.6. |

### CIS Controls

| Fragen | Befund | Vorschlag |
|---|---|---|
| `cis-rn-q1` | „3-2-1-Backup-Strategie“ im Titel. | „Sichern Sie Ihre Daten regelmäßig und testen Sie die Wiederherstellung?“ |
| `cis-vm-q3` | Drei Dinge in einer Frage. | Siehe 3.6. |
| Control 16 und 18 | Anwendungssicherheit und Penetrationstests haben keine eigene Frage. | Je eine Frage ergänzen oder im Bereichstext sagen, dass sie fehlen. |

### ISO 22301

| Fragen | Befund | Vorschlag |
|---|---|---|
| mehrere | Abkürzungen im Titel, siehe 3.5. | `bcm-br-q2`: „Sind Wiederanlaufzeit (RTO) und maximal tolerierbarer Datenverlust (RPO) … definiert?“ |

### OWASP ASVS

| Fragen | Befund | Vorschlag |
|---|---|---|
| `owasp-sess-q2`, `owasp-sess-q3` | Beide fragen nach dem Ende einer Sitzung bei Inaktivität. | `owasp-sess-q3` auf Abmeldung und Passwortänderung begrenzen. |
| `owasp-iv-q2` | Nennt SQL und LDAP als Kontext für Output-Encoding; dagegen helfen parametrisierte Abfragen (`owasp-iv-q3`). | Auf HTML, JavaScript und URL begrenzen. |

### Ohne konkreten Befund

TISAX, BSI-Grundschutz und C5: außer den Punkten in Abschnitt 3 nichts gefunden.

## 5. Gemeinsamer Fragenkern: Skizze

**Ausgangslage, gemessen:** 49 Themen decken 214 von 431 Fragen ab. 17 Themen kommen in fünf oder mehr Regelwerken vor, das häufigste in zehn. Die Abdeckung schwankt stark: CIS 16 von 18, NIS2 32 von 50, DSGVO 4 von 50, CRA 1 von 24.

**Heute:** In der Gap-Analyse erscheint an einer Frage ein Vorschlag, wenn ein anderes Regelwerk dieselbe Maßnahme schon bewertet hat. Übernommen wird einzeln per Klick.

| Weg | Inhalt | Aufwand | Risiko |
|---|---|---|---|
| A | Vorschläge ausbauen: ein Knopf „alle Vorschläge übernehmen“ je Bereich, Vorschläge auch im Schnellcheck. | klein, keine neuen Texte | gering; jede Antwort bleibt einzeln änderbar |
| B | Echter Kern: 49 Kernfragen einmal beantworten, danach je Regelwerk nur die 217 übrigen Fragen. | groß: 49 neue Fragen mit eigenen Stufentexten, Umbau von Ablauf, Speicherung und Auswertung | hoch: Die Stufen der Regelwerke bedeuten nicht dasselbe (ISO „dokumentiert“, CIS „automatisiert“); eine Kernantwort kann in einem Regelwerk zu gut ausfallen |

**Empfehlung:** Weg A, und zwar erst, nachdem die 49 Themen gegengelesen sind (Gegenlese-Unterlage, Abschnitt 1). Weg B lohnt sich nur, wenn Anwender typischerweise drei oder mehr Regelwerke bearbeiten. Dazu gibt es keine Daten.
