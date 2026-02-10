# DSGVO & KRITIS Recommendation Update Report

**Date:** 2026-02-09
**Script:** `scripts/write-recs-dsgvo-kritis.mjs`
**Status:** ✅ SUCCESS

## Summary

Successfully replaced all placeholder texts in `src/messages/de.json` with specific, actionable German recommendation texts:

- **DSGVO:** 30/30 recommendations updated
- **KRITIS:** 24/24 recommendations updated
- **Build Status:** ✓ Compiled successfully (0 errors, 206 pages)

## What Was Changed

Each recommendation now has:
- **title:** Specific, actionable title (5-10 words) instead of generic "Maßnahme umsetzen"
- **description:** 1-2 sentences with regulatory context and legal references
- **firstStep:** One concrete, immediately actionable first step
- **checklist:** Preserved (unchanged where it existed)

## Sample DSGVO Recommendations

### dsfa1 (Datenschutz-Folgenabschätzung)
- **Title:** "Datenschutz-Folgenabschätzung für Hochrisiko-Verarbeitungen durchführen"
- **Description:** "Führen Sie für alle Verarbeitungsvorgänge mit hohem Risiko für die Rechte und Freiheiten natürlicher Personen eine Datenschutz-Folgenabschätzung durch. Dies ist nach Art. 35 Abs. 1 und 3 DSGVO verpflichtend bei umfangreicher Verarbeitung sensibler Daten oder systematischem Profiling."
- **First Step:** "Erstellen Sie eine Liste aller aktuellen Verarbeitungsvorgänge und prüfen Sie diese anhand der DSFA-Kriterien nach Art. 35 Abs. 3 DSGVO."

### vv1 (Verarbeitungsverzeichnis)
- **Title:** "Verarbeitungsverzeichnis nach Art. 30 DSGVO anlegen"
- **Description:** "Erstellen Sie ein vollständiges Verzeichnis aller Verarbeitungstätigkeiten gemäß Art. 30 Abs. 1 DSGVO. Dieses Verzeichnis ist Nachweispflicht für die Rechenschaftspflicht nach Art. 5 Abs. 2 DSGVO und Grundlage jeder Datenschutzprüfung."
- **First Step:** "Erfassen Sie alle Systeme und Anwendungen, in denen personenbezogene Daten verarbeitet werden (HR-System, CRM, E-Mail, Webshop etc.)."

### av1 (Auftragsverarbeitung)
- **Title:** "Auftragsverarbeitungsverträge nach Art. 28 DSGVO prüfen"
- **Description:** "Überprüfen Sie alle bestehenden Verträge mit Auftragsverarbeitern auf Vollständigkeit gemäß Art. 28 Abs. 1 und 3 DSGVO. Der Vertrag muss Gegenstand, Dauer, Art und Zweck der Verarbeitung, Datenarten, Löschpflichten und TOMs regeln."
- **First Step:** "Erstellen Sie eine Liste aller externen Dienstleister mit Datenzugriff und prüfen Sie, ob AVVs vorliegen und aktuell sind."

## Sample KRITIS Recommendations

### bsi1 (BSI-Kontaktstelle)
- **Title:** "BSI-Kontaktstelle gemäß §8b Abs. 3 BSI-Gesetz benennen"
- **Description:** "Benennen Sie eine dedizierte Kontaktstelle zum Bundesamt für Sicherheit in der Informationstechnik (BSI) und melden Sie diese offiziell. Dies ist Pflicht für alle KRITIS-Betreiber nach §8b Abs. 3 BSI-Gesetz."
- **First Step:** "Registrieren Sie Ihr Unternehmen beim BSI-Webportal und benennen Sie einen Ansprechpartner mit Name, Funktion und Erreichbarkeit (24/7)."

### rm1 (IT-Risikomanagement)
- **Title:** "IT-Risikoanalyse-Methodik nach §8a BSI-Gesetz etablieren"
- **Description:** "Implementieren Sie eine systematische Methode zur Identifikation und Bewertung von IT-Risiken für Ihre kritischen Dienstleistungen gemäß §8a Abs. 1 BSI-Gesetz. Die Analyse muss regelmäßig aktualisiert werden."
- **First Step:** "Wählen Sie eine anerkannte Risikoanalyse-Methode (z.B. BSI-Standard 200-3, ISO 27005) und terminieren Sie ein Kickoff-Meeting."

### sh1 (Systemhärtung)
- **Title:** "Server- und Endpoint-Härtung nach Stand der Technik"
- **Description:** "Härten Sie alle kritischen Server und Endgeräte durch Deaktivierung unnötiger Dienste, sichere Konfiguration und restriktive Berechtigungen gemäß §8a Abs. 1 BSI-Gesetz. Dies reduziert die Angriffsfläche erheblich."
- **First Step:** "Verwenden Sie CIS Benchmarks oder BSI SiSyPHuS-Richtlinien, um eine Baseline-Härtungskonfiguration für Windows/Linux-Server zu definieren."

## Full DSGVO Recommendation List (30)

### Datenschutz-Folgenabschätzung (dsfa)
1. **dsfa1:** Datenschutz-Folgenabschätzung für Hochrisiko-Verarbeitungen durchführen
2. **dsfa2:** DSFA-Positiv- und Negativliste der Aufsichtsbehörde prüfen
3. **dsfa3:** Systematische DSFA-Methodik etablieren

### Verarbeitungsverzeichnis (vv)
4. **vv1:** Verarbeitungsverzeichnis nach Art. 30 DSGVO anlegen
5. **vv2:** Alle Pflichtangaben im Verarbeitungsverzeichnis dokumentieren
6. **vv3:** Regelmäßige Aktualisierung und Prüfung des Verarbeitungsverzeichnisses

### Einwilligungsmanagement (ew)
7. **ew1:** Rechtsgrundlagen aller Verarbeitungen prüfen
8. **ew2:** Einfachen Widerruf von Einwilligungen ermöglichen
9. **ew3:** Zentrales Consent-Management-System einführen

### Betroffenenrechte (br)
10. **br1:** Prozess für Betroffenenanfragen etablieren
11. **br2:** Ein-Monats-Frist für Betroffenenanfragen einhalten
12. **br3:** Automatisierte Löschung und Datenportabilität implementieren

### Datenschutzverletzungen (dv)
13. **dv1:** Meldeprozess für Datenschutzverletzungen innerhalb 72h aufsetzen
14. **dv2:** Dokumentation aller Datenschutzverletzungen anlegen
15. **dv3:** Umfassenden Breach-Response-Plan entwickeln

### Datenschutzbeauftragter (dsb)
16. **dsb1:** Benennungspflicht für Datenschutzbeauftragten prüfen
17. **dsb2:** Unabhängigkeit und Ressourcen des DSB sicherstellen
18. **dsb3:** Aufgaben und Berichtswege des DSB definieren

### Internationaler Datentransfer (dt)
19. **dt1:** Alle Drittlandtransfers identifizieren und dokumentieren
20. **dt2:** Standardvertragsklauseln oder Angemessenheitsbeschlüsse implementieren
21. **dt3:** Transfer Impact Assessment durchführen

### Technische & organisatorische Maßnahmen (tom)
22. **tom1:** Technische und organisatorische Maßnahmen dokumentieren
23. **tom2:** Verschlüsselung und Pseudonymisierung einsetzen
24. **tom3:** Regelmäßige Wirksamkeitsprüfung der TOMs etablieren

### Privacy by Design & Default (pbd)
25. **pbd1:** Datenschutzanforderungen in Entwicklungsprozesse integrieren
26. **pbd2:** Datenschutzfreundliche Voreinstellungen umsetzen
27. **pbd3:** Privacy-by-Design-Framework implementieren

### Auftragsverarbeitung (av)
28. **av1:** Auftragsverarbeitungsverträge nach Art. 28 DSGVO prüfen
29. **av2:** Due Diligence bei Auftragsverarbeitern durchführen
30. **av3:** Unterauftragnehmer-Management etablieren

## Full KRITIS Recommendation List (24)

### BSI-Kontaktstelle (bsi)
1. **bsi1:** BSI-Kontaktstelle gemäß §8b Abs. 3 BSI-Gesetz benennen
2. **bsi2:** BSI-Meldewege testen und dokumentieren
3. **bsi3:** Kommunikationsplan mit BSI entwickeln

### IT-Risikomanagement (rm)
4. **rm1:** IT-Risikoanalyse-Methodik nach §8a BSI-Gesetz etablieren
5. **rm2:** Risikobewertung und Maßnahmenplan entwickeln
6. **rm3:** Kontinuierliches Risiko-Monitoring einführen

### Vorfallmanagement (vm)
7. **vm1:** IT-Notfallmanagement-Plan für KRITIS-Dienste erstellen
8. **vm2:** Vorfallklassifizierungs-System implementieren
9. **vm3:** Lessons-Learned-Prozess nach Vorfällen etablieren

### Business Continuity Management (bcm)
10. **bcm1:** Business Impact Analyse für kritische Dienstleistungen durchführen
11. **bcm2:** Notfall- und Wiederherstellungspläne entwickeln
12. **bcm3:** Regelmäßige BCM-Übungen und Tests durchführen

### Lieferkette (lk)
13. **lk1:** Kritische Lieferanten und Dienstleister inventarisieren
14. **lk2:** Sicherheitsanforderungen in Lieferantenverträge aufnehmen
15. **lk3:** Regelmäßige Lieferanten-Sicherheitsbewertungen durchführen

### Audit (au)
16. **au1:** Vorbereitung auf §8a-Audit nach BSI-Gesetz
17. **au2:** Internes Audit-Programm etablieren
18. **au3:** Kontinuierliches Compliance-Monitoring aufbauen

### Physische Sicherheit (ps)
19. **ps1:** Physische Zugangskontrollen für kritische Infrastruktur implementieren
20. **ps2:** Umgebungssicherheit gegen Feuer, Wasser und Stromausfall
21. **ps3:** Umfassendes physisches Sicherheitskonzept erstellen

### Systemhärtung (sh)
22. **sh1:** Server- und Endpoint-Härtung nach Stand der Technik
23. **sh2:** Netzwerksegmentierung und Firewall-Regeln implementieren
24. **sh3:** Umfassende Härtungsbaselines entwickeln

## Verification

```bash
# No placeholder titles remaining
DSGVO placeholders: 0
KRITIS placeholders: 0

# No placeholder descriptions remaining
DSGVO placeholder descriptions: 0
KRITIS placeholder descriptions: 0

# Build status
✓ Compiled successfully (0 errors, 206 pages)
```

## Next Steps

These recommendations are now ready for use in:
- Results pages (`/[locale]/[regulation]/results`)
- Assessment reports
- PDF exports (future implementation)
- Dashboard overviews

All texts are:
- ✓ In German
- ✓ Specific and actionable
- ✓ Include regulatory references
- ✓ Provide concrete first steps
- ✓ Preserve existing checklists
