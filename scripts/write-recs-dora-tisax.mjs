#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DE_JSON_PATH = path.join(__dirname, '..', 'src', 'messages', 'de.json');

// DORA Recommendations (18 total)
const doraRecommendations = {
  // ict-risikomanagement
  irm1: {
    title: "IKT-Risikomanagement-Rahmenwerk etablieren",
    description: "Etablieren Sie ein umfassendes IKT-Risikomanagement-Rahmenwerk gemäß Art. 6 DORA, das alle Geschäftsfunktionen, IKT-Assets und Prozesse abdeckt. Das Rahmenwerk muss in die Gesamtstrategie integriert werden.",
    firstStep: "Benennen Sie einen Verantwortlichen für das IKT-Risikomanagement und definieren Sie die organisatorische Struktur gemäß Art. 6 DORA."
  },
  irm2: {
    title: "Kritische IKT-Assets identifizieren und klassifizieren",
    description: "Führen Sie eine vollständige Inventarisierung aller IKT-Assets durch und klassifizieren Sie diese nach Kritikalität gemäß Art. 8 DORA. Erfassen Sie Abhängigkeiten und Geschäftsauswirkungen bei Ausfall.",
    firstStep: "Erstellen Sie ein vollständiges Inventar aller IKT-Assets (Hardware, Software, Daten, Netzwerke) mit Verantwortlichkeiten."
  },
  irm3: {
    title: "IKT-Schutz-, Erkennungs- und Reaktionsmaßnahmen implementieren",
    description: "Implementieren Sie technische und organisatorische Maßnahmen zum Schutz, zur Erkennung und zur Reaktion auf IKT-Risiken gemäß Art. 9-11 DORA. Dies umfasst Präventivkontrollen, Monitoring und Incident Response.",
    firstStep: "Definieren Sie Schutzmaßnahmen für kritische IKT-Assets basierend auf der Risikoklassifizierung aus irm2."
  },

  // vorfallmanagement
  vm1: {
    title: "IKT-Vorfallmanagement-Prozess etablieren",
    description: "Entwickeln Sie einen strukturierten Prozess zur Erkennung, Verwaltung und Lösung IKT-bezogener Vorfälle gemäß Art. 17 DORA. Der Prozess muss Klassifizierung, Eskalation und Dokumentation umfassen.",
    firstStep: "Definieren Sie Kategorien und Schweregrade für IKT-Vorfälle sowie Eskalationswege und Verantwortlichkeiten."
  },
  vm2: {
    title: "Meldeprozess an Aufsichtsbehörden einrichten",
    description: "Implementieren Sie einen Prozess zur fristgerechten Meldung schwerwiegender IKT-Vorfälle an zuständige Behörden gemäß Art. 19 DORA. Beachten Sie die gesetzlichen Meldefristen (Erstmeldung, Zwischenbericht, Abschlussbericht).",
    firstStep: "Identifizieren Sie die zuständigen Aufsichtsbehörden und legen Sie interne Meldewege sowie Fristen fest (Erstmeldung binnen 4h)."
  },
  vm3: {
    title: "Lessons-Learned-Prozess und Bedrohungsanalyse etablieren",
    description: "Führen Sie systematische Nachbereitungen von IKT-Vorfällen durch und nutzen Sie die Erkenntnisse zur kontinuierlichen Verbesserung gemäß Art. 17, 23 DORA. Analysieren Sie Bedrohungstrends und passen Sie Schutzmaßnahmen an.",
    firstStep: "Etablieren Sie einen strukturierten Post-Incident-Review-Prozess mit definierten Teilnehmern und Dokumentationsanforderungen."
  },

  // resilience-testing
  rt1: {
    title: "Testprogramm für digitale operationale Resilienz aufsetzen",
    description: "Entwickeln Sie ein umfassendes Testprogramm zur regelmäßigen Überprüfung der digitalen operationalen Resilienz gemäß Art. 24-25 DORA. Das Programm muss verschiedene Testarten (Schwachstellen, Szenariobasiert, Performance) umfassen.",
    firstStep: "Erstellen Sie einen Jahresplan für Resilienztests mit definierten Testarten, Umfängen, Verantwortlichen und Terminen."
  },
  rt2: {
    title: "Bedrohungsorientierte Penetrationstests (TLPT) durchführen",
    description: "Führen Sie mindestens alle 3 Jahre bedrohungsorientierte Penetrationstests (Threat-Led Penetration Testing, TLPT) gemäß Art. 26 DORA durch. Nutzen Sie externe Experten und simulieren Sie realistische Angriffsszenarien.",
    firstStep: "Prüfen Sie, ob Sie zu den TLPT-pflichtigen Finanzentitäten gehören, und planen Sie bei Bedarf einen TLPT gemäß TIBER-EU-Framework."
  },
  rt3: {
    title: "Nachverfolgung und Behebung von Testerkenntnissen sicherstellen",
    description: "Implementieren Sie einen strukturierten Prozess zur Nachverfolgung und zeitnahen Behebung aller in Tests identifizierten Schwachstellen gemäß Art. 24 DORA. Dokumentieren Sie Maßnahmen und Verantwortlichkeiten.",
    firstStep: "Erstellen Sie ein zentrales Register für alle Testerkenntnisse mit Status, Verantwortlichen, Fristen und Risikobewertung."
  },

  // drittanbieter
  da1: {
    title: "Register für IKT-Drittanbieter führen",
    description: "Führen Sie ein aktuelles Register aller IKT-Drittanbieter mit detaillierten Informationen zu erbrachten Dienstleistungen, Kritikalität und vertraglichen Vereinbarungen gemäß Art. 28 DORA. Das Register muss jederzeit aufsichtsrechtlich verfügbar sein.",
    firstStep: "Erfassen Sie alle bestehenden IKT-Drittanbieter systematisch und klassifizieren Sie diese nach Kritikalität (kritisch/wichtig/nicht-kritisch)."
  },
  da2: {
    title: "Vertragsklauseln für IKT-Drittanbieter implementieren",
    description: "Stellen Sie sicher, dass alle Verträge mit IKT-Drittanbietern die zwingenden Klauseln gemäß Art. 30 DORA enthalten, insbesondere zu Prüfrechten, Ausstiegsregelungen, Subunternehmer-Management und Datenschutz.",
    firstStep: "Erstellen Sie eine Checkliste aller verpflichtenden Vertragsklauseln gemäß Art. 30 DORA und prüfen Sie bestehende Verträge."
  },
  da3: {
    title: "Konzentrationsrisiken und Ausstiegsstrategien managen",
    description: "Identifizieren Sie Konzentrationsrisiken durch kritische IKT-Drittanbieter und entwickeln Sie Ausstiegsstrategien sowie alternative Szenarien gemäß Art. 29 DORA. Vermeiden Sie Single-Points-of-Failure.",
    firstStep: "Analysieren Sie Abhängigkeiten von einzelnen Drittanbietern und identifizieren Sie kritische Konzentrationsrisiken (z.B. Cloud-Provider)."
  },

  // informationsaustausch
  ia1: {
    title: "An Cyber-Threat-Intelligence-Sharing teilnehmen",
    description: "Treten Sie branchenspezifischen Informationsaustausch-Plattformen bei (z.B. FS-ISAC für Finanzsektor) und teilen Sie Cyber-Threat-Intelligence gemäß Art. 45 DORA, um von kollektivem Wissen zu profitieren.",
    firstStep: "Identifizieren Sie relevante Informationsaustausch-Initiativen für den Finanzsektor und beantragen Sie die Mitgliedschaft."
  },
  ia2: {
    title: "Governance für Informationsaustausch etablieren (TLP)",
    description: "Implementieren Sie klare Richtlinien für den Austausch von Cyber-Threat-Intelligence unter Nutzung des Traffic Light Protocol (TLP) gemäß Art. 45 DORA. Definieren Sie Freigabeprozesse und Vertraulichkeitsstufen.",
    firstStep: "Schulen Sie Mitarbeiter im Umgang mit dem Traffic Light Protocol (TLP) und definieren Sie interne Freigabeprozesse."
  },
  ia3: {
    title: "Berichtspflichten gegenüber Aufsichtsbehörden erfüllen",
    description: "Erfüllen Sie alle Berichtspflichten gegenüber zuständigen Aufsichtsbehörden gemäß Art. 45 DORA, insbesondere zu IKT-Risiken, Vorfällen und Drittanbieterbeziehungen. Nutzen Sie standardisierte Meldeformate.",
    firstStep: "Identifizieren Sie alle aufsichtsrechtlichen Berichtspflichten gemäß DORA und legen Sie interne Meldezyklen fest."
  },

  // governance
  gov1: {
    title: "Vorstand für IKT-Risiken verantwortlich machen",
    description: "Verankern Sie die Verantwortung für IKT-Risikomanagement explizit beim Vorstand/Geschäftsleitung gemäß Art. 5 DORA. Das Leitungsorgan muss IKT-Risiken verstehen, steuern und überwachen.",
    firstStep: "Legen Sie IKT-Risikomanagement als festen Tagesordnungspunkt in Vorstands-/Geschäftsleitungssitzungen fest (mindestens quartalsweise)."
  },
  gov2: {
    title: "IKT-Schulungen für Leitungsorgan durchführen",
    description: "Stellen Sie sicher, dass das Leitungsorgan über ausreichende Kenntnisse und Fähigkeiten im Bereich IKT-Risikomanagement verfügt durch regelmäßige Schulungen gemäß Art. 5, 13 DORA.",
    firstStep: "Planen Sie gezielte IKT-Sicherheitsschulungen für Vorstand/Geschäftsleitung (z.B. Cyber-Resilience, Cloud-Risiken, DORA-Anforderungen)."
  },
  gov3: {
    title: "Proportionalität und internes Reporting sicherstellen",
    description: "Implementieren Sie ein risikobasiertes, proportionales IKT-Risikomanagement gemäß Art. 4, 6 DORA. Etablieren Sie strukturiertes internes Reporting zu IKT-Risiken, Vorfällen und Drittanbietern ans Leitungsorgan.",
    firstStep: "Definieren Sie Management-Dashboards mit KPIs für IKT-Risiken (z.B. Vorfallzahlen, Schwachstellen, Drittanbieterrisiken)."
  }
};

// TISAX Recommendations (24 total)
const tisaxRecommendations = {
  // organisation
  org1: {
    title: "Informationssicherheitsleitlinie und ISMS etablieren",
    description: "Entwickeln Sie eine automotive-spezifische Informationssicherheitsleitlinie und implementieren Sie ein ISMS gemäß VDA ISA 1.1.1 und ISO 27001 A.5.1. Die Leitlinie muss Prototypenschutz und Lieferkettenanforderungen abdecken.",
    firstStep: "Erstellen Sie eine schriftliche Informationssicherheitsleitlinie mit Bezug zu VDA ISA-Anforderungen und lassen Sie diese durch die Geschäftsleitung genehmigen."
  },
  org2: {
    title: "Informationssicherheitsrollen und Verantwortlichkeiten definieren",
    description: "Definieren Sie klare Rollen und Verantwortlichkeiten für Informationssicherheit gemäß VDA ISA 1.2.1 und ISO 27001 A.5.2. Benennen Sie einen Informationssicherheitsbeauftragten (ISB) mit direktem Zugang zur Geschäftsleitung.",
    firstStep: "Benennen Sie formell einen Informationssicherheitsbeauftragten (ISB) und dokumentieren Sie dessen Aufgaben, Befugnisse und Berichtslinien."
  },

  // personal
  per1: {
    title: "Sicherheitsüberprüfung von Mitarbeitern durchführen",
    description: "Implementieren Sie Prozesse zur Sicherheitsüberprüfung von Mitarbeitern vor Einstellung, insbesondere bei Zugang zu Prototypen oder sensiblen Automotive-Daten gemäß VDA ISA 2.1.1 und ISO 27001 A.6.1.",
    firstStep: "Definieren Sie Sicherheitsüberprüfungskriterien abhängig von der Sensibilität der Position (z.B. Prototypen-Zugang, Entwicklungsdaten)."
  },
  per2: {
    title: "Security-Awareness-Schulungen für Automotive-Kontext durchführen",
    description: "Führen Sie regelmäßige, automotive-spezifische Security-Awareness-Schulungen durch gemäß VDA ISA 2.1.2 und ISO 27001 A.6.3. Themen: Prototypenschutz, Lieferkettenrisiken, Social Engineering.",
    firstStep: "Entwickeln Sie ein Schulungsprogramm mit Automotive-Schwerpunkten (Prototypen, Lieferanten, NDA-Handling) für alle Mitarbeiter."
  },

  // physische-sicherheit
  phy1: {
    title: "Physische Sicherheitsperimeter für Prototypen einrichten",
    description: "Etablieren Sie physische Sicherheitsperimeter zum Schutz kritischer Bereiche (z.B. Prototypenwerkstätten, Entwicklungslabore) gemäß VDA ISA 3.1.1 und ISO 27001 A.7.1. Implementieren Sie Zugangskontrollen und Besuchermanagement.",
    firstStep: "Identifizieren Sie alle Bereiche mit Prototypen oder hochsensiblen Automotive-Daten und definieren Sie Sicherheitszonen."
  },
  phy2: {
    title: "Videoüberwachung und physisches Monitoring implementieren",
    description: "Installieren Sie Überwachungssysteme für kritische Bereiche (Prototypenzonen, Testgelände) gemäß VDA ISA 3.1.2 und ISO 27001 A.7.2. Beachten Sie datenschutzrechtliche Anforderungen (DSGVO).",
    firstStep: "Führen Sie eine Risikoanalyse für kritische Bereiche durch und identifizieren Sie Bereiche mit Überwachungsbedarf (Prototypen, Testgelände)."
  },

  // technologie
  tech1: {
    title: "Asset-Management und Klassifizierung für Automotive-Daten",
    description: "Implementieren Sie ein umfassendes Asset-Management für alle Automotive-relevanten Assets (Hardware, Software, Daten, Prototypen) mit Klassifizierung gemäß VDA ISA 4.1.1 und ISO 27001 A.8.1.",
    firstStep: "Erstellen Sie ein vollständiges Inventar aller Assets mit Automotive-Bezug und klassifizieren Sie diese nach Schutzbedarf (z.B. Prototypen-Level)."
  },
  tech2: {
    title: "Endpoint-Sicherheit für Entwicklungsumgebungen",
    description: "Implementieren Sie umfassende Endpoint-Sicherheitsmaßnahmen für Entwickler-Workstations und mobile Geräte mit Zugriff auf Automotive-Daten gemäß VDA ISA 4.1.2 und ISO 27001 A.8.2.",
    firstStep: "Deployen Sie Endpoint-Protection-Lösungen (Anti-Malware, EDR) auf allen Geräten mit Zugriff auf Entwicklungsdaten oder Prototypen."
  },

  // prototypenschutz
  proto1: {
    title: "Physischen Prototypenschutz implementieren",
    description: "Implementieren Sie spezifische physische Schutzmaßnahmen für Prototypen-Fahrzeuge und -Bauteile gemäß VDA ISA 5.1.1. Dies umfasst sichere Lagerung, Transport, Kennzeichnung und Verschrottung.",
    firstStep: "Erstellen Sie eine Prototypen-Schutzrichtlinie mit klaren Vorgaben zu Lagerung, Kennzeichnung, Transport und Vernichtung."
  },
  proto2: {
    title: "Prototypen-Informationen klassifizieren und schützen",
    description: "Klassifizieren Sie alle Prototypen-bezogenen Informationen (CAD, Testdaten, Spezifikationen) nach Sensitivität gemäß VDA ISA 5.2.1 und implementieren Sie entsprechende Schutzmaßnahmen (Verschlüsselung, DRM).",
    firstStep: "Führen Sie eine Datenklassifizierung für alle Prototypen-Informationen durch (öffentlich, intern, vertraulich, streng vertraulich)."
  },

  // datenschutz
  ds1: {
    title: "Datenschutz-Management für Automotive-Daten etablieren",
    description: "Implementieren Sie ein Datenschutz-Management-System für Automotive-spezifische personenbezogene Daten (z.B. Fahrzeugdaten, Testfahrer) gemäß VDA ISA 6.1.1 und DSGVO.",
    firstStep: "Identifizieren Sie alle Verarbeitungstätigkeiten mit personenbezogenen Automotive-Daten und führen Sie ein Verzeichnis gemäß Art. 30 DSGVO."
  },
  ds2: {
    title: "Datenschutz-Audits und Reviews durchführen",
    description: "Führen Sie regelmäßige Datenschutz-Audits und Reviews durch, insbesondere für Automotive-Datenverarbeitungen (Connected Car, Testdaten) gemäß VDA ISA 6.1.2.",
    firstStep: "Planen Sie einen jährlichen Datenschutz-Audit mit Fokus auf Automotive-spezifische Datenverarbeitungen (z.B. Telematik, Testfahrten)."
  },

  // zugangskontrolle
  zk1: {
    title: "Zugriffskontrollrichtlinie für Automotive-Umgebungen",
    description: "Implementieren Sie eine umfassende Zugriffskontrollrichtlinie für alle Automotive-Systeme (Entwicklung, Produktion, Prototypen) gemäß VDA ISA 7.1.1 und ISO 27001 A.5.15. Nutzen Sie Least-Privilege- und Need-to-Know-Prinzipien.",
    firstStep: "Dokumentieren Sie eine Zugriffskontrollrichtlinie mit Regeln für Automotive-spezifische Systeme (CAD, PLM, Testdatenbanken)."
  },
  zk2: {
    title: "Privileged-Access-Management (PAM) für kritische Systeme",
    description: "Implementieren Sie ein Privileged-Access-Management (PAM) für kritische Automotive-Systeme (Entwicklungsumgebungen, Prototypen-Netzwerke) gemäß VDA ISA 7.1.3 und ISO 27001 A.8.5.",
    firstStep: "Identifizieren Sie alle privilegierten Accounts in Automotive-kritischen Systemen und implementieren Sie eine PAM-Lösung mit Session-Recording."
  },

  // kryptografie
  kry1: {
    title: "Kryptografie-Konzept für Automotive-Daten entwickeln",
    description: "Entwickeln Sie ein unternehmensweites Kryptografie-Konzept für Automotive-Daten in Ruhe und Transit gemäß VDA ISA 8.1.1 und ISO 27001 A.8.24. Definieren Sie Verschlüsselungsstandards für Prototypen-Informationen.",
    firstStep: "Erstellen Sie ein Kryptografie-Konzept mit definierten Algorithmen, Schlüssellängen und Anwendungsfällen (z.B. AES-256 für Prototypen-Daten)."
  },
  kry2: {
    title: "Schlüsselmanagement für Automotive-Verschlüsselung",
    description: "Implementieren Sie ein sicheres Schlüsselmanagement für alle kryptografischen Schlüssel in Automotive-Anwendungen gemäß VDA ISA 8.1.2 und ISO 27001 A.8.25. Nutzen Sie HSMs für hochsensible Keys.",
    firstStep: "Definieren Sie Prozesse für Schlüsselgenerierung, -speicherung, -verteilung, -rotation und -vernichtung für Automotive-Verschlüsselung."
  },

  // betriebssicherheit
  bs1: {
    title: "Malware-Schutz für Automotive-Entwicklungsumgebungen",
    description: "Implementieren Sie umfassenden Malware-Schutz für alle Automotive-Entwicklungs- und Produktionssysteme gemäß VDA ISA 9.1.1 und ISO 27001 A.8.6. Beachten Sie spezielle Anforderungen für OT-Umgebungen.",
    firstStep: "Deployen Sie Anti-Malware-Lösungen auf allen Workstations und Servern mit Automotive-Daten (Entwicklung, PLM, MES)."
  },
  bs2: {
    title: "Schwachstellen-Management für Automotive-Systeme",
    description: "Etablieren Sie ein Schwachstellen-Management für alle Automotive-IT- und OT-Systeme gemäß VDA ISA 9.1.2 und ISO 27001 A.8.7. Priorisieren Sie Patches für produktionsnahe und Prototypen-Systeme.",
    firstStep: "Implementieren Sie einen automatisierten Schwachstellen-Scan für alle Automotive-Systeme (mindestens monatlich für Entwicklungsumgebungen)."
  },

  // kommunikation
  kom1: {
    title: "Netzwerksicherheit für Automotive-Entwicklungsnetzwerke",
    description: "Implementieren Sie umfassende Netzwerksicherheitsmaßnahmen für Automotive-Entwicklungsnetzwerke (Segmentierung, Firewalls, IDS/IPS) gemäß VDA ISA 10.1.1 und ISO 27001 A.8.20.",
    firstStep: "Segmentieren Sie das Netzwerk nach Sensibilität (z.B. Prototypen-Zone, Entwicklung, Produktion, Office) mit strikter Firewall-Kontrolle."
  },
  kom2: {
    title: "Sichere Datenübertragung für Automotive-Informationen",
    description: "Implementieren Sie verschlüsselte Übertragungswege für alle Automotive-sensiblen Daten (intern und extern zu Lieferanten/OEMs) gemäß VDA ISA 10.1.2 und ISO 27001 A.8.21.",
    firstStep: "Definieren Sie sichere Übertragungsmethoden für Prototypen-Daten (z.B. SFTP, HTTPS, VPN) und verbieten Sie unverschlüsselte Kanäle."
  },

  // lieferanten
  lief1: {
    title: "Informationssicherheitsanforderungen an Automotive-Lieferanten",
    description: "Definieren Sie verbindliche Informationssicherheitsanforderungen für alle Automotive-Lieferanten gemäß VDA ISA 11.1.1 und ISO 27001 A.5.19. Fordern Sie TISAX-Zertifizierung bei sensiblen Zulieferern.",
    firstStep: "Erstellen Sie eine Lieferantenanforderungs-Checkliste für Informationssicherheit mit TISAX-Anforderungen für kritische Zulieferer."
  },
  lief2: {
    title: "Lieferanten-Monitoring und Audits durchführen",
    description: "Überwachen Sie kontinuierlich die Informationssicherheit Ihrer Automotive-Lieferanten durch regelmäßige Audits und Assessments gemäß VDA ISA 11.1.2 und ISO 27001 A.5.20.",
    firstStep: "Planen Sie jährliche Informationssicherheits-Audits für alle kritischen Lieferanten mit Zugang zu Prototypen oder sensiblen Automotive-Daten."
  },

  // compliance
  comp1: {
    title: "TISAX-Compliance-Framework implementieren",
    description: "Implementieren Sie ein umfassendes Compliance-Framework zur Erfüllung aller VDA ISA/TISAX-Anforderungen gemäß VDA ISA 12.1.1 und ISO 27001 A.5.31. Bereiten Sie ein TISAX-Assessment vor.",
    firstStep: "Führen Sie ein TISAX-Gap-Assessment durch, um Abweichungen zwischen IST-Zustand und VDA ISA-Anforderungen zu identifizieren."
  },
  comp2: {
    title: "Regelmäßige Compliance-Reviews durchführen",
    description: "Führen Sie regelmäßige Reviews zur Einhaltung aller TISAX- und Automotive-Sicherheitsanforderungen durch gemäß VDA ISA 12.1.2 und ISO 27001 A.5.32. Dokumentieren Sie Nachweise für Audits.",
    firstStep: "Planen Sie quartalsweise TISAX-Compliance-Reviews mit definierten Prüfpunkten (VDA ISA-Controls, Maßnahmenstatus)."
  }
};

// Read de.json
console.log('Reading de.json...');
const data = JSON.parse(fs.readFileSync(DE_JSON_PATH, 'utf8'));

// Update DORA recommendations
console.log('Updating DORA recommendations...');
let doraCount = 0;
for (const [key, value] of Object.entries(doraRecommendations)) {
  if (data.dora.recommendations[key]) {
    data.dora.recommendations[key].title = value.title;
    data.dora.recommendations[key].description = value.description;
    data.dora.recommendations[key].firstStep = value.firstStep;
    doraCount++;
    console.log(`  ✓ Updated dora.recommendations.${key}`);
  } else {
    console.warn(`  ⚠ Warning: dora.recommendations.${key} not found in de.json`);
  }
}

// Update TISAX recommendations
console.log('Updating TISAX recommendations...');
let tisaxCount = 0;
for (const [key, value] of Object.entries(tisaxRecommendations)) {
  if (data.tisax.recommendations[key]) {
    data.tisax.recommendations[key].title = value.title;
    data.tisax.recommendations[key].description = value.description;
    data.tisax.recommendations[key].firstStep = value.firstStep;
    tisaxCount++;
    console.log(`  ✓ Updated tisax.recommendations.${key}`);
  } else {
    console.warn(`  ⚠ Warning: tisax.recommendations.${key} not found in de.json`);
  }
}

// Write back to de.json with proper formatting
console.log('Writing back to de.json...');
fs.writeFileSync(DE_JSON_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');

console.log('\n✅ Successfully updated de.json');
console.log(`   - DORA recommendations updated: ${doraCount}/18`);
console.log(`   - TISAX recommendations updated: ${tisaxCount}/24`);
console.log(`   - Total: ${doraCount + tisaxCount}/42`);
