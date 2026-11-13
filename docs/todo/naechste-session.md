# TODO nächste Session

Stand: 13.11.2026. Reihenfolge = Vorschlag.

## 0. Zwischenstand 13.11.2026 abends (im Worktree, noch nicht committet)

Erledigt, Tests grün (111), alle 15 Regelwerke im Browser auf Deutsch durchgeklickt:

- Abschnitt 1 komplett, außer den zwei Punkten unten. Neuer Dauertest: `src/lib/regulations/translation-keys.test.ts`.
- Zusätzlich gefunden und behoben:
  - NIS2-Ergebnisseite: Abschnitt „ISO 27001:2022 Crosswalk“ hatte keine Texte mehr (Namensraum `iso27001` vom Regelwerk überschrieben). Texte aus der Git-Historie nach `iso27001Mapping` zurückgeholt.
  - KRITIS: Normbezüge im Code von §8a/§8b auf die geltende Nummerierung (§30, §32, §33, §39 BSIG) umgestellt.
  - Maßnahmenplan zeigte Icon-Namen als Text („ServerCrash“). Entfernt.
  - `question-equivalences.ts` war inhaltlich großteils falsch (z. B. stand unter „MFA“ die Rechteprüfung). Neu aufgebaut: 49 Themen, jede Zuordnung am Fragetext geprüft. Test: `question-equivalences.test.ts`.
  - ISO 22301 und OWASP: Empfehlungen und Normbezüge an die vorhandenen Texte angeglichen.

Noch offen aus Abschnitt 1 und 2:

- [ ] Reifegrad-Texte: Bei CIS, ISO 22301, NIST CSF und OWASP sind alle vier Stufen bei jeder Frage identisch (72 Fragen). Fragespezifische Texte schreiben.
- [ ] `empoweringIntro` fehlt bei 8 Regelwerken (55 Bereiche). Die Box wird jetzt ausgeblendet statt den Rohschlüssel zu zeigen. Texte schreiben, falls gewünscht.
- [ ] Neue Äquivalenztabelle selbst gegenlesen (KI-erstellt). Vorbefüllung danach neu messen; die alten Zahlen in Abschnitt 2 sind überholt.
- [ ] Vertiefungsfragen und Schnellcheck im Browser, kompletter Durchlauf auf Englisch (bisher nur Stichprobe).
- [ ] Prüfprotokoll nachtragen. Abschnitte 3 bis 5 unverändert offen.

## 1. Gefundene Fehler beheben (Fragenprüfung, Zwischenstand)

Gefunden beim automatischen Durchklicken der Gap-Analysen (ISO 22301, NIS2, DSGVO, KRITIS) und per Skript über alle Übersetzungsschlüssel in `src/lib/regulations`.

- [ ] **ISO 22301: 6 Fragen zeigen Rohschlüssel statt Text.** Die Bereiche „BIA & Risiko“ und „BCM-Strategie“ sind betroffen. `questions.ts` nutzt `brQ1–3` und `spQ1–3`, in `de.json`/`en.json` heißen sie `biQ1–3` und `bsQ1–3`. Das betrifft Titel, Hilfe und alle vier Reifegrade.
- [ ] **ISO 22301: `categories.<id>.empoweringIntro` fehlt für alle 6 Bereiche.** Auf jeder Seite der Analyse steht der Rohschlüssel.
- [ ] **ISO 22301: Empfehlungen.** 22 Schlüssel fehlen, z. B. `pl2`, `sr2`, `br1`, `sp1` und `ei2.checklist`. Auf der Ergebnisseite sichtbar sind `recommendations.br1.title` und `sp1.title`.
- [ ] **OWASP ASVS: 9 Fragen zeigen Rohschlüssel.** Betroffen sind Authentifizierung, Sitzungen und Kryptografie. `questions.ts` nutzt `authQ`, `sessQ` und `cryptoQ`, die JSON-Dateien `auQ`, `smQ` und `crQ`.
- [ ] **OWASP ASVS: Empfehlungen.** 22 Schlüssel fehlen, z. B. `auth1` (JSON: `au1`).
- [ ] **CIS Controls und NIST CSF:** Je 4 `checklist`-Schlüssel in `recommendations.ts` fehlen.
- [ ] **NIS2-Hilfsdateien prüfen, ob die Schlüssel tot sind oder sichtbar werden.** Sie verweisen auf nicht vorhandene Schlüssel. Betroffen sind `din-spec.ts`, `dsgvo-overlap.ts`, `geschaeftsleitung.ts`, `nis2/iso27001.ts`, `nis2/kritis.ts`, `meldepflichten.ts`, `registrierung.ts` und `roadmap.ts`. `dinspec-section.tsx` nutzt z. B. eigene Schlüssel. Tote Konstanten löschen.
- [ ] **Ergebnisseiten aller Regelwerke zeigen NIS2-Inhalte**, z. B. bei ISO 22301, DSGVO und KRITIS:
  - FAQ „Bin ich mit einem grünen Score automatisch NIS2-konform?“
  - „BSI IT-Grundschutz-Kompendium und NIS2-Informationsportal nutzen“
  - „Alle Säulen im Detail“
  - FAQ und Texte je Regelwerk machen.
- [ ] **KRITIS-Empfehlungen** verweisen auf §30, §33 und §39 BSIG. Prüfen, ob das für KRITIS-Betreiber jeweils passt.
- [ ] **ISO 22301:** Der Normbezug unter den Fragen steht auf Englisch in der deutschen Oberfläche, z. B. „BCMS scope definition, interested parties“. Gilt vermutlich auch für andere Normen.
- [ ] **ISO 22301:** Die Antwortoptionen wirken generisch („kein BCM implementiert“) statt fragespezifisch. Prüfen, ob die Reifegrad-Texte je Frage überhaupt angezeigt werden.
- [ ] **NIS2 MFA-Hinweis:** Die Quelle zu „verhindert über 99 % aller Kontoübernahmen“ prüfen (Microsoft-Studie, genaue Zahl und Jahr).
- [ ] **Dauerhafter Test:** Alle Übersetzungsschlüssel in `src/lib/regulations/**` müssen in DE und EN existieren. Das hätte alle Punkte oben verhindert. Vorlage ist das Prüfskript im Abschnitt „Testwerkzeug“.

## 2. Fragenprüfung zu Ende führen

Bestand: 431 Fragen in der Gap-Analyse (335 Kern, 96 Vertiefung) und 134 im Schnellcheck, über 15 Regelwerke.

- [ ] **Durchlauf im Browser für die restlichen Regelwerke:** DORA, CRA, TISAX, PCI DSS, SOC 2, C5, ISO 27001, BSI, NIST CSF, CIS und OWASP, außerdem die NIS2-Ergebnisseite. Jeweils mit Vertiefung, mit Schnellcheck und auf Englisch.
- [ ] **Mehrere Regelwerke: Wie oft beantwortet man dieselbe Frage?**
  - Es gibt `question-equivalences.ts` (22 Themen) und `dedup-service.ts`. Die Analyse schlägt Antworten aus anderen Regelwerken vor (`category-step.tsx`).
  - Anteil der Fragen pro Regelwerk, die in einem Äquivalenz-Thema stehen:

    | Regelwerk | im Thema / Fragen |
    |---|---|
    | NIS2 | 29/50 |
    | DSGVO | 8/50 |
    | KRITIS | 21/30 |
    | DORA | 25/30 |
    | CRA | 4/24 |
    | TISAX | 14/36 |
    | PCI DSS | 14/29 |
    | SOC 2 | 16/25 |
    | C5 | 16/25 |
    | ISO 27001 | 28/30 |
    | BSI | 17/30 |
    | NIST CSF | 17/18 |
    | ISO 22301 | 6/18 |
    | CIS | 12/18 |
    | OWASP | 11/18 |

  - Messen: Wie viele Fragen werden bei typischen Kombinationen vorbefüllt? Beispiele sind NIS2 + ISO 27001 + DSGVO, TISAX + ISO 27001 und ISO 27001 + BSI.
  - Prüfen: Wird der Vorschlag nur angezeigt oder übernommen? Funktioniert das auch im Schnellcheck?
  - Fehlende Äquivalenzen finden. Ein Textvergleich der Fragentitel über die Regelwerke hinweg liefert Kandidaten.
  - Idee: ein gemeinsamer Fragenkern, also einmal antworten und auf alle gewählten Regelwerke abbilden.
- [ ] **Inhaltlich je Regelwerk prüfen:**
  - Braucht es die Frage?
  - Gibt es Doppelungen innerhalb eines Regelwerks?
  - Stimmt der Norm- oder Rechtsbezug?
  - Ist die Frage für KMU verständlich?
  - Passen die Reifegrad-Stufen?
  - Stimmt das Verhältnis Kern zu Vertiefung?
- [ ] Die Befunde ins Prüfprotokoll (`docs/pruefprotokoll/`) übernehmen.

## 3. Regelwerk-Synergien: Seitenleiste verbessern (Wunsch Nutzer)

- [ ] Die Seitenleiste ist schlecht lesbar. Schrift und Kontrast erhöhen.
- [ ] Erklären, warum es drei Arten von Quelle gibt: Link = offizielle Zuordnungstabelle, nur Text = Gesetzes- oder Normstelle, „Eigene Einschätzung“ = keine Quelle.
- [ ] Die Schlagwörter (Risikomanagement, Vorfallmeldung …) sind nur beim Darüberfahren und sehr klein sichtbar. Sie sollen lesbar sein, beim Darüberfahren eine Erklärung zeigen und per Klick eine Detailerklärung öffnen.

## 4. Ausrichtung besprechen: Umsetzung für ISO-27001-Audits (Wunsch Nutzer)

Die Idee: die gemeinsamen Maßnahmenthemen beschreiben und die Seite teilweise auf die Umsetzung für Audits ausrichten, nach ISO 27001 und nach ISO 27001 auf Basis von IT-Grundschutz. Das passt zum Berufsziel (Grundschutz-Praktiker, danach ISO-27001-Auditor).

- [ ] Erst im Brainstorming klären: Zielgruppe, Umfang, Verhältnis zur neuen Portfolio- und Design-Richtung (Ansatz A/B/C ist noch offen).
- [ ] Beachten:
  - Die Kompass-Inhalte sind KI-generiert. Sie nicht als eigene Expertise darstellen, solange sie nicht selbst geprüft sind.
  - Unabhängigkeit als Auditor (ISO/IEC 17021-1): Beratung und Audit beim selben Kunden schließen sich aus.

## 5. Sonstiges Offenes

- [ ] Design: Entscheidung zu Ansatz A, B oder C steht aus.
  - A: nur Startseite
  - B: alle Seiten plus neue Start- und Über-mich-Seite
  - C: Seite für Seite
- [ ] Danach Design-Dokument und Plan erstellen.
- [ ] Die Prototypen `public/prototyp/hell.html` und `dunkel.html` liegen nur lokal und werden nicht committet.
- [ ] Aufräumen: die `node_modules`-Junction im Worktree (`cmd //c "rmdir node_modules"`) und den Brainstorm-Server (`.superpowers/`).
- [ ] Den GitHub-Token rotieren, falls noch nicht geschehen. Er war in einer früheren Sitzung versehentlich sichtbar.

## Testwerkzeug

Prüfskript für Übersetzungsschlüssel, im Projektordner ausführen:

```bash
node -e "
const fs=require('fs'),path=require('path');
const de=require('./src/messages/de.json'),en=require('./src/messages/en.json');
const g=(o,k)=>k.split('.').reduce((a,x)=>a?.[x],o);const roots=new Set(Object.keys(de));
(function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(/\.ts$/.test(f)&&!/test/.test(f)){for(const m of fs.readFileSync(p,'utf8').matchAll(/'([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9_-]+){2,})'/g)){const k=m[1];if(roots.has(k.split('.')[0])&&(g(de,k)===undefined||g(en,k)===undefined))console.log(p,k)}}}})('src/lib/regulations');"
```

Der Browser-Durchlauf läuft so: Gap-Analyse starten, je Frage eine zufällige Stufe wählen, „Weiter“ bzw. „… abschließen“ klicken (Groß- und Kleinschreibung beachten). Auf der Ergebnisseite alle Reiter öffnen und Texte sammeln, die wie `name.name.name` aussehen (Rohschlüssel).
