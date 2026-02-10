# Recommendation Update Summary

**Date:** 2026-02-09
**Script:** `scripts/write-recs-cra-bsi.mjs`
**Status:** ✅ Successfully completed

## Overview

Updated German recommendation texts for:
- **CRA (Cyber Resilience Act):** 24 recommendations
- **BSI IT-Grundschutz:** 30 recommendations

All placeholder texts ("Maßnahme umsetzen") have been replaced with specific, actionable German texts.

## Update Details

### What was updated:
- ✅ `title`: Short, specific action titles (5-10 words)
- ✅ `description`: 1-2 sentences with regulatory context
- ✅ `firstStep`: One concrete, immediately actionable first step

### What was preserved:
- ✅ `checklist`: All existing checklist keys remain unchanged

## Example Updates

### CRA Examples

**sbd1 (Security by Design):**
```json
{
  "title": "Security-Anforderungen in Produktdesign integrieren",
  "description": "Integrieren Sie Sicherheitsanforderungen bereits in der Designphase Ihrer Produkte mit digitalen Elementen. Art. 10 Abs. 1 CRA fordert, dass Cybersicherheit von Anfang an berücksichtigt wird.",
  "firstStep": "Erstellen Sie eine Bedrohungsmodellierung für Ihr wichtigstes Produkt mit digitalen Elementen."
}
```

**sbom1 (Software Bill of Materials):**
```json
{
  "title": "Maschinenlesbare SBOM erstellen",
  "description": "Erstellen Sie eine Software Bill of Materials (SBOM) im SPDX- oder CycloneDX-Format für Ihre Produkte. Art. 10 Abs. 6 CRA fordert eine vollständige, maschinenlesbare Auflistung aller Software-Komponenten.",
  "firstStep": "Wählen Sie ein SBOM-Tool (z.B. Syft, CycloneDX Generator) und erzeugen Sie eine erste SBOM für Ihr Hauptprodukt."
}
```

**vm1 (Vorfall-Meldung):**
```json
{
  "title": "Schwachstellenmeldung an ENISA innerhalb 24h einrichten",
  "description": "Richten Sie einen Prozess ein, um aktiv ausgenutzte Schwachstellen innerhalb von 24 Stunden an ENISA zu melden. Art. 14 Abs. 1-2 CRA verpflichtet zur unverzüglichen Meldung schwerwiegender Vorfälle.",
  "firstStep": "Registrieren Sie sich im ENISA-Meldesystem und definieren Sie interne Eskalationswege für Schwachstellenmeldungen."
}
```

### BSI IT-Grundschutz Examples

**isms1 (Informationssicherheits-Management):**
```json
{
  "title": "Leitlinie und ISMS nach BSI-Standard 200-1 aufbauen",
  "description": "Etablieren Sie ein Informationssicherheits-Managementsystem (ISMS) nach BSI-Standard 200-1. Die Sicherheitsleitlinie definiert Ziele und strategische Ausrichtung der Informationssicherheit in Ihrer Organisation.",
  "firstStep": "Lesen Sie BSI-Standard 200-1 (kostenlos verfügbar) und erstellen Sie einen ersten Entwurf einer IS-Leitlinie (max. 2 Seiten)."
}
```

**net1 (Netzwerkarchitektur):**
```json
{
  "title": "Netzwerkarchitektur und Segmentierung umsetzen",
  "description": "Segmentieren Sie Ihr Netzwerk nach BSI-Standard 200-2, NET.1.1: VLANs für verschiedene Sicherheitszonen, DMZ für externe Dienste, Zugriffskontrollen zwischen Segmenten.",
  "firstStep": "Zeichnen Sie Ihre aktuelle Netzwerkarchitektur auf und identifizieren Sie, welche Systeme in unterschiedliche Sicherheitszonen gehören."
}
```

**sys1 (Server-Härtung):**
```json
{
  "title": "Server härten",
  "description": "Härten Sie Server nach BSI-Standard 200-2, SYS.1.1: Minimale Installation, unnötige Dienste deaktivieren, Härtungsbenchmarks (CIS) anwenden, Updates automatisieren.",
  "firstStep": "Erstellen Sie eine Checkliste mit allen laufenden Diensten auf Ihrem wichtigsten Server und prüfen Sie, welche wirklich benötigt werden."
}
```

## Content Quality Guidelines Applied

### CRA Recommendations:
- ✅ Product security context (CE marking, SBOM, connected products)
- ✅ Specific references to CRA articles (Art. 10, Art. 11, Art. 14, etc.)
- ✅ Practical tools and methods (SPDX, CycloneDX, CVE/NVD, security.txt)
- ✅ Concrete timelines where applicable (24h, 5 years, etc.)

### BSI IT-Grundschutz Recommendations:
- ✅ References to IT-Grundschutz-Kompendium building blocks (ISMS.1, ORP.1, SYS.1.1, etc.)
- ✅ BSI-Standard references (200-1, 200-2, 200-3, 200-4)
- ✅ Practical security measures (CIS benchmarks, MDM, VLANs, BitLocker, etc.)
- ✅ Process-oriented approach (documentation, policies, checklists)

## Verification

Run verification script:
```bash
node scripts/verify-recs.mjs
```

Expected output:
- ✅ All 24 CRA recommendations updated
- ✅ All 30 BSI IT-Grundschutz recommendations updated
- ✅ No placeholders remaining
- ✅ All checklists preserved

## Files Modified

- ✅ `src/messages/de.json` (7046 lines, ~54 recommendations updated)

## Next Steps

1. Test recommendations in UI to verify correct display
2. Ensure recommendation rendering components handle all fields correctly
3. Consider adding English translations (en.json) in future update
4. Review with domain experts for technical accuracy
