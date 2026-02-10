# DORA & TISAX Recommendations Update - Completion Report

**Date:** 2026-02-09
**Script:** `scripts/write-recs-dora-tisax.mjs`
**Target:** `src/messages/de.json`

## Summary

Successfully updated all 42 recommendation texts (18 DORA + 24 TISAX) in the German translation file with specific, actionable content.

### Updates Applied
- **DORA:** 18/18 recommendations updated ✅
- **TISAX:** 24/24 recommendations updated ✅
- **Total:** 42/42 recommendations updated ✅

## Changes Made

### Before
All recommendations had generic placeholder text:
```json
{
  "title": "Maßnahme umsetzen",
  "description": "Implementieren Sie die erforderlichen Maßnahmen gemäß den regulatorischen Anforderungen.",
  "firstStep": "Führen Sie eine Bestandsaufnahme des aktuellen Zustands durch."
}
```

### After
Each recommendation now has specific, context-aware German text:

#### DORA Example (rt2 - TLPT):
```json
{
  "title": "Bedrohungsorientierte Penetrationstests (TLPT) durchführen",
  "description": "Führen Sie mindestens alle 3 Jahre bedrohungsorientierte Penetrationstests (Threat-Led Penetration Testing, TLPT) gemäß Art. 26 DORA durch. Nutzen Sie externe Experten und simulieren Sie realistische Angriffsszenarien.",
  "firstStep": "Prüfen Sie, ob Sie zu den TLPT-pflichtigen Finanzentitäten gehören, und planen Sie bei Bedarf einen TLPT gemäß TIBER-EU-Framework."
}
```

#### TISAX Example (proto1 - Prototypenschutz):
```json
{
  "title": "Physischen Prototypenschutz implementieren",
  "description": "Implementieren Sie spezifische physische Schutzmaßnahmen für Prototypen-Fahrzeuge und -Bauteile gemäß VDA ISA 5.1.1. Dies umfasst sichere Lagerung, Transport, Kennzeichnung und Verschrottung.",
  "firstStep": "Erstellen Sie eine Prototypen-Schutzrichtlinie mit klaren Vorgaben zu Lagerung, Kennzeichnung, Transport und Vernichtung."
}
```

## DORA Recommendations Coverage

### Categories & Legal References

**ict-risikomanagement (3 recs):**
- irm1: IKT-Risikomanagement-Rahmenwerk (Art. 6 DORA)
- irm2: Kritische IKT-Assets identifizieren (Art. 8 DORA)
- irm3: IKT-Schutz-/Erkennungs-/Reaktionsmaßnahmen (Art. 9-11 DORA)

**vorfallmanagement (3 recs):**
- vm1: IKT-Vorfallmanagement-Prozess (Art. 17 DORA)
- vm2: Meldeprozess an Aufsichtsbehörden (Art. 19 DORA)
- vm3: Lessons-Learned und Bedrohungsanalyse (Art. 17, 23 DORA)

**resilience-testing (3 recs):**
- rt1: Testprogramm für digitale Resilienz (Art. 24-25 DORA)
- rt2: TLPT - Threat-Led Penetration Testing (Art. 26 DORA)
- rt3: Nachverfolgung von Testerkenntnissen (Art. 24 DORA)

**drittanbieter (3 recs):**
- da1: Register für IKT-Drittanbieter (Art. 28 DORA)
- da2: Vertragsklauseln für IKT-Drittanbieter (Art. 30 DORA)
- da3: Konzentrationsrisiken und Ausstiegsstrategien (Art. 29 DORA)

**informationsaustausch (3 recs):**
- ia1: Cyber-Threat-Intelligence-Sharing (Art. 45 DORA)
- ia2: Governance für Informationsaustausch/TLP (Art. 45 DORA)
- ia3: Berichtspflichten gegenüber Aufsichtsbehörden (Art. 45 DORA)

**governance (3 recs):**
- gov1: Vorstand für IKT-Risiken verantwortlich (Art. 5 DORA)
- gov2: IKT-Schulungen für Leitungsorgan (Art. 5, 13 DORA)
- gov3: Proportionalität und internes Reporting (Art. 4, 6 DORA)

## TISAX Recommendations Coverage

### Categories & Legal References

**organisation (2 recs):**
- org1: IS-Leitlinie und ISMS (VDA ISA 1.1.1, ISO 27001 A.5.1)
- org2: IS-Rollen und Verantwortlichkeiten (VDA ISA 1.2.1, ISO 27001 A.5.2)

**personal (2 recs):**
- per1: Sicherheitsüberprüfung Mitarbeiter (VDA ISA 2.1.1, ISO 27001 A.6.1)
- per2: Security-Awareness-Schulungen (VDA ISA 2.1.2, ISO 27001 A.6.3)

**physische-sicherheit (2 recs):**
- phy1: Physische Sicherheitsperimeter (VDA ISA 3.1.1, ISO 27001 A.7.1)
- phy2: Videoüberwachung und Monitoring (VDA ISA 3.1.2, ISO 27001 A.7.2)

**technologie (2 recs):**
- tech1: Asset-Management und Klassifizierung (VDA ISA 4.1.1, ISO 27001 A.8.1)
- tech2: Endpoint-Sicherheit (VDA ISA 4.1.2, ISO 27001 A.8.2)

**prototypenschutz (2 recs):**
- proto1: Physischer Prototypenschutz (VDA ISA 5.1.1)
- proto2: Prototypen-Informationen klassifizieren (VDA ISA 5.2.1)

**datenschutz (2 recs):**
- ds1: Datenschutz-Management für Automotive (VDA ISA 6.1.1)
- ds2: Datenschutz-Audits und Reviews (VDA ISA 6.1.2)

**zugangskontrolle (2 recs):**
- zk1: Zugriffskontrollrichtlinie (VDA ISA 7.1.1, ISO 27001 A.5.15)
- zk2: Privileged-Access-Management (VDA ISA 7.1.3, ISO 27001 A.8.5)

**kryptografie (2 recs):**
- kry1: Kryptografie-Konzept (VDA ISA 8.1.1, ISO 27001 A.8.24)
- kry2: Schlüsselmanagement (VDA ISA 8.1.2, ISO 27001 A.8.25)

**betriebssicherheit (2 recs):**
- bs1: Malware-Schutz (VDA ISA 9.1.1, ISO 27001 A.8.6)
- bs2: Schwachstellen-Management (VDA ISA 9.1.2, ISO 27001 A.8.7)

**kommunikation (2 recs):**
- kom1: Netzwerksicherheit (VDA ISA 10.1.1, ISO 27001 A.8.20)
- kom2: Sichere Datenübertragung (VDA ISA 10.1.2, ISO 27001 A.8.21)

**lieferanten (2 recs):**
- lief1: IS-Anforderungen an Lieferanten (VDA ISA 11.1.1, ISO 27001 A.5.19)
- lief2: Lieferanten-Monitoring (VDA ISA 11.1.2, ISO 27001 A.5.20)

**compliance (2 recs):**
- comp1: TISAX-Compliance-Framework (VDA ISA 12.1.1, ISO 27001 A.5.31)
- comp2: Regelmäßige Compliance-Reviews (VDA ISA 12.1.2, ISO 27001 A.5.32)

## Content Quality Characteristics

### DORA Texts Include:
✅ Financial sector context (IKT-Risiken, Finanzentitäten)
✅ Specific DORA article references (Art. 6, 19, 26, etc.)
✅ Technical detail (TLPT, TIBER-EU, FS-ISAC, TLP)
✅ Concrete first steps (timeframes, responsibilities, frameworks)
✅ Regulatory compliance focus (Meldepflichten, Aufsichtsbehörden)

### TISAX Texts Include:
✅ Automotive industry context (Prototypen, VDA ISA, Zulieferer)
✅ VDA ISA + ISO 27001 dual references
✅ Automotive-specific terms (Prototypenschutz, Testgelände, OEM)
✅ Practical first steps (Checklisten, Sicherheitszonen, GAP-Assessment)
✅ TISAX certification preparation focus

## Verification Results

✅ All 18 DORA recommendations contain DORA/IKT/Art. references
✅ All 24 TISAX recommendations contain Automotive/TISAX/VDA ISA references
✅ JSON file is valid (648KB, 40 top-level keys)
✅ No checklist keys were present (nothing to preserve)
✅ All titles are specific and actionable (no generic "Maßnahme umsetzen")
✅ All descriptions include regulatory context (1-2 sentences)
✅ All firstSteps are concrete and immediately actionable

## Technical Details

**Script:** Node.js ES module (`.mjs`)
**Approach:**
1. Read `de.json` into memory
2. Update only `title`, `description`, `firstStep` for specified recommendations
3. Preserve all other keys and structure
4. Write back with proper JSON formatting (`JSON.stringify(data, null, 2)`)

**Safety:**
- Readonly for non-target keys
- Preserves JSON structure
- Adds trailing newline for git-friendly diffs

## Next Steps

The recommendations are now ready for:
- Testing in the UI (Results page)
- Review by domain experts
- Translation to English (if needed via `en.json`)

## Usage

To re-run the script:
```bash
cd C:\Users\mjoan\Desktop\nis2-readiness-check
node scripts/write-recs-dora-tisax.mjs
```

---
**Status:** ✅ COMPLETE
**Quality:** Production-ready German texts with domain-specific context
