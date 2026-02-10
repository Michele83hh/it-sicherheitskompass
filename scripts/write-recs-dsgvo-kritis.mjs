#!/usr/bin/env node

/**
 * Script to populate DSGVO and KRITIS recommendation texts in de.json
 * with specific, actionable German content based on regulatory requirements.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DE_JSON_PATH = join(__dirname, '..', 'src', 'messages', 'de.json');

// DSGVO Recommendations (30 total)
const dsgvoRecommendations = {
  // dsfa (Datenschutz-Folgenabschätzung)
  dsfa1: {
    title: "Datenschutz-Folgenabschätzung für Hochrisiko-Verarbeitungen durchführen",
    description: "Führen Sie für alle Verarbeitungsvorgänge mit hohem Risiko für die Rechte und Freiheiten natürlicher Personen eine Datenschutz-Folgenabschätzung durch. Dies ist nach Art. 35 Abs. 1 und 3 DSGVO verpflichtend bei umfangreicher Verarbeitung sensibler Daten oder systematischem Profiling.",
    firstStep: "Erstellen Sie eine Liste aller aktuellen Verarbeitungsvorgänge und prüfen Sie diese anhand der DSFA-Kriterien nach Art. 35 Abs. 3 DSGVO."
  },
  dsfa2: {
    title: "DSFA-Positiv- und Negativliste der Aufsichtsbehörde prüfen",
    description: "Gleichen Sie Ihre Verarbeitungstätigkeiten mit der Positiv- und Negativliste (Blacklist/Whitelist) Ihrer zuständigen Aufsichtsbehörde ab. Diese Listen konkretisieren nach Art. 35 Abs. 4 DSGVO, wann eine DSFA zwingend erforderlich oder nicht notwendig ist.",
    firstStep: "Rufen Sie die DSFA-Liste Ihrer Landesdatenschutzbehörde auf (z.B. DSK-Positivliste) und gleichen Sie Ihre Verarbeitungen ab."
  },
  dsfa3: {
    title: "Systematische DSFA-Methodik etablieren",
    description: "Implementieren Sie eine standardisierte Methodik zur Durchführung von Datenschutz-Folgenabschätzungen gemäß Art. 35 Abs. 7 DSGVO. Die Methodik sollte Risikobewertung, Abhilfemaßnahmen und bei Bedarf Konsultation der Aufsichtsbehörde nach Art. 36 DSGVO umfassen.",
    firstStep: "Definieren Sie eine DSFA-Vorlage mit den Pflichtinhalten nach Art. 35 Abs. 7 DSGVO (Beschreibung, Notwendigkeit, Risikobewertung, Abhilfemaßnahmen)."
  },

  // verarbeitungsverzeichnis (Verarbeitungsverzeichnis)
  vv1: {
    title: "Verarbeitungsverzeichnis nach Art. 30 DSGVO anlegen",
    description: "Erstellen Sie ein vollständiges Verzeichnis aller Verarbeitungstätigkeiten gemäß Art. 30 Abs. 1 DSGVO. Dieses Verzeichnis ist Nachweispflicht für die Rechenschaftspflicht nach Art. 5 Abs. 2 DSGVO und Grundlage jeder Datenschutzprüfung.",
    firstStep: "Erfassen Sie alle Systeme und Anwendungen, in denen personenbezogene Daten verarbeitet werden (HR-System, CRM, E-Mail, Webshop etc.)."
  },
  vv2: {
    title: "Alle Pflichtangaben im Verarbeitungsverzeichnis dokumentieren",
    description: "Stellen Sie sicher, dass Ihr Verarbeitungsverzeichnis alle Pflichtangaben nach Art. 30 Abs. 1 lit. a-g DSGVO enthält: Name des Verantwortlichen, Zwecke, Kategorien betroffener Personen und Daten, Empfänger, Drittlandtransfers, Löschfristen und technische/organisatorische Maßnahmen.",
    firstStep: "Prüfen Sie Ihr bestehendes Verarbeitungsverzeichnis gegen die Checkliste in Art. 30 Abs. 1 DSGVO und identifizieren Sie fehlende Angaben."
  },
  vv3: {
    title: "Regelmäßige Aktualisierung und Prüfung des Verarbeitungsverzeichnisses",
    description: "Etablieren Sie einen Prozess zur regelmäßigen Überprüfung und Aktualisierung des Verarbeitungsverzeichnisses gemäß Art. 30 Abs. 4 DSGVO. Neue Verarbeitungen, geänderte Zwecke oder eingestellte Systeme müssen zeitnah erfasst werden.",
    firstStep: "Legen Sie eine quartalsweise Erinnerung fest, bei der alle Fachbereiche Änderungen an Verarbeitungstätigkeiten melden."
  },

  // einwilligung (Einwilligungsmanagement)
  ew1: {
    title: "Rechtsgrundlagen aller Verarbeitungen prüfen",
    description: "Überprüfen Sie für jede Verarbeitung, ob eine valide Rechtsgrundlage nach Art. 6 Abs. 1 DSGVO vorliegt. Einwilligungen müssen den Anforderungen des Art. 7 DSGVO genügen (freiwillig, informiert, eindeutig, nachweisbar).",
    firstStep: "Erstellen Sie eine Liste aller Datenverarbeitungen und tragen Sie die jeweilige Rechtsgrundlage ein (Vertrag, Einwilligung, berechtigtes Interesse etc.)."
  },
  ew2: {
    title: "Einfachen Widerruf von Einwilligungen ermöglichen",
    description: "Stellen Sie sicher, dass Betroffene ihre Einwilligung jederzeit genauso einfach widerrufen können, wie sie erteilt wurde (Art. 7 Abs. 3 DSGVO). Dies gilt für Newsletter, Cookies, Marketingzwecke und alle anderen einwilligungsbasierten Verarbeitungen.",
    firstStep: "Prüfen Sie alle Systeme mit Einwilligungsverarbeitung (Newsletter-Tool, Cookie-Banner) auf funktionierende Widerrufsmöglichkeiten."
  },
  ew3: {
    title: "Zentrales Consent-Management-System einführen",
    description: "Implementieren Sie ein zentrales System zur Verwaltung aller Einwilligungen, das Nachweispflichten nach Art. 7 Abs. 1 und die Rechenschaftspflicht nach Art. 5 Abs. 2 DSGVO erfüllt. Das System sollte Einwilligungszeitpunkt, Umfang, Widerruf und Nachweise protokollieren.",
    firstStep: "Evaluieren Sie Consent-Management-Plattformen (z.B. OneTrust, Usercentrics) oder entwickeln Sie ein internes Tracking-System für Einwilligungen."
  },

  // betroffenenrechte (Betroffenenrechte)
  br1: {
    title: "Prozess für Betroffenenanfragen etablieren",
    description: "Schaffen Sie einen systematischen Prozess zur Bearbeitung von Auskunfts-, Berichtigungs-, Lösch-, Einschränkungs-, Widerspruchs- und Datenübertragbarkeitsanfragen gemäß Art. 15-22 DSGVO. Der Prozess muss Zuständigkeiten, Fristen und Dokumentation regeln.",
    firstStep: "Benennen Sie eine zentrale Anlaufstelle für Betroffenenanfragen und definieren Sie den Workflow von Eingang bis Beantwortung."
  },
  br2: {
    title: "Ein-Monats-Frist für Betroffenenanfragen einhalten",
    description: "Stellen Sie sicher, dass alle Anfragen betroffener Personen innerhalb eines Monats beantwortet werden, wie in Art. 12 Abs. 3 DSGVO vorgeschrieben. Bei komplexen Anfragen kann die Frist um zwei Monate verlängert werden, dies muss jedoch begründet werden.",
    firstStep: "Richten Sie ein Ticketsystem oder E-Mail-Postfach mit automatischer Fristüberwachung für Betroffenenanfragen ein."
  },
  br3: {
    title: "Automatisierte Löschung und Datenportabilität implementieren",
    description: "Entwickeln Sie technische Lösungen zur effizienten Umsetzung des Rechts auf Löschung (Art. 17 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO). Dies reduziert manuelle Aufwände und minimiert Fehlerquellen bei der Bearbeitung.",
    firstStep: "Prüfen Sie Ihre Systeme auf Funktionen zur automatisierten Datenextraktion und Löschung (z.B. via API oder Admin-Interface)."
  },

  // datenschutzverletzung (Datenschutzverletzungen)
  dv1: {
    title: "Meldeprozess für Datenschutzverletzungen innerhalb 72h aufsetzen",
    description: "Implementieren Sie einen Prozess, der es ermöglicht, Verletzungen des Schutzes personenbezogener Daten binnen 72 Stunden nach Bekanntwerden an die Aufsichtsbehörde zu melden, wie Art. 33 Abs. 1 DSGVO es verlangt. Verspätete Meldungen können Bußgelder zur Folge haben.",
    firstStep: "Erstellen Sie eine Meldevorlage mit allen Pflichtangaben nach Art. 33 Abs. 3 DSGVO und hinterlegen Sie die Kontaktdaten Ihrer Aufsichtsbehörde."
  },
  dv2: {
    title: "Dokumentation aller Datenschutzverletzungen anlegen",
    description: "Führen Sie ein Verzeichnis aller Datenschutzverletzungen gemäß Art. 33 Abs. 5 DSGVO. Auch nicht meldepflichtige Vorfälle müssen dokumentiert werden, um die Rechenschaftspflicht zu erfüllen und Muster zu erkennen.",
    firstStep: "Legen Sie eine Tabelle oder Datenbank an, in der Art der Verletzung, betroffene Datenkategorien, Zeitpunkt, Abhilfemaßnahmen und Meldestatus protokolliert werden."
  },
  dv3: {
    title: "Umfassenden Breach-Response-Plan entwickeln",
    description: "Erstellen Sie einen vollständigen Notfallplan für Datenschutzverletzungen, der Erkennung, Bewertung, Eindämmung, Meldung an Aufsichtsbehörde und Betroffene (Art. 33-34 DSGVO) sowie Lessons Learned umfasst.",
    firstStep: "Führen Sie eine Tabletop-Übung mit einem simulierten Datenschutzvorfall durch, um Lücken im aktuellen Prozess zu identifizieren."
  },

  // dsb (Datenschutzbeauftragter)
  dsb1: {
    title: "Benennungspflicht für Datenschutzbeauftragten prüfen",
    description: "Prüfen Sie, ob Ihr Unternehmen verpflichtet ist, einen Datenschutzbeauftragten zu benennen (Art. 37 DSGVO, §38 BDSG). Dies gilt insbesondere bei Kerntätigkeit in systematischer Überwachung, umfangreicher Verarbeitung sensibler Daten oder ab 20 Personen mit Datenzugriff.",
    firstStep: "Zählen Sie, wie viele Mitarbeiter ständig mit der Verarbeitung personenbezogener Daten beschäftigt sind (ab 20: Benennungspflicht nach §38 BDSG)."
  },
  dsb2: {
    title: "Unabhängigkeit und Ressourcen des DSB sicherstellen",
    description: "Gewährleisten Sie, dass Ihr Datenschutzbeauftragter weisungsfrei agieren kann, über notwendige Ressourcen verfügt und in alle datenschutzrelevanten Fragen frühzeitig eingebunden wird, wie Art. 38 DSGVO es vorschreibt.",
    firstStep: "Stellen Sie dem DSB ein Budget für Schulungen, Tools und rechtliche Beratung bereit und regeln Sie seine Einbindung in Projekt-Kickoffs."
  },
  dsb3: {
    title: "Aufgaben und Berichtswege des DSB definieren",
    description: "Legen Sie die konkreten Aufgaben des Datenschutzbeauftragten gemäß Art. 39 DSGVO fest: Unterrichtung, Beratung, Überwachung der Compliance, Zusammenarbeit mit Aufsichtsbehörde und Ansprechpartner für Betroffene. Klären Sie Berichtswege an die Geschäftsleitung.",
    firstStep: "Erstellen Sie eine schriftliche Funktionsbeschreibung für den DSB mit Aufgaben, Kompetenzen und Berichtswegen."
  },

  // datentransfer (Internationale Datenübermittlung)
  dt1: {
    title: "Alle Drittlandtransfers identifizieren und dokumentieren",
    description: "Erfassen Sie alle Übermittlungen personenbezogener Daten in Länder außerhalb der EU/EWR gemäß Kapitel V DSGVO (Art. 44-49). Dies umfasst Cloud-Dienste, internationale Konzernstrukturen, Support-Dienstleister und Webtracking-Tools.",
    firstStep: "Prüfen Sie alle Auftragsverarbeiter und Cloud-Dienste auf Server-Standorte außerhalb EU/EWR (z.B. USA, Schweiz, UK post-Brexit)."
  },
  dt2: {
    title: "Standardvertragsklauseln oder Angemessenheitsbeschlüsse implementieren",
    description: "Sichern Sie Drittlandtransfers durch geeignete Garantien ab: Angemessenheitsbeschluss der EU-Kommission oder Standardvertragsklauseln (SCCs) nach Art. 46 Abs. 2 lit. c DSGVO. Seit Schrems II ist zusätzlich eine Einzelfallprüfung notwendig.",
    firstStep: "Schließen Sie mit allen Drittland-Dienstleistern die aktuellen EU-Standardvertragsklauseln (2021) ab oder prüfen Sie Angemessenheitsbeschlüsse."
  },
  dt3: {
    title: "Transfer Impact Assessment durchführen",
    description: "Führen Sie für jeden Drittlandtransfer ein Transfer Impact Assessment (TIA) gemäß Art. 46 Abs. 2 DSGVO durch. Dies bewertet, ob das Datenschutzniveau im Zielland durch zusätzliche Maßnahmen (z.B. Verschlüsselung) auf EU-Niveau angehoben werden kann.",
    firstStep: "Wählen Sie Ihre kritischsten Drittlandtransfers aus und prüfen Sie anhand der EDSA-Empfehlungen, ob staatlicher Zugriff im Zielland möglich ist."
  },

  // toms (Technische & Organisatorische Maßnahmen)
  tom1: {
    title: "Technische und organisatorische Maßnahmen dokumentieren",
    description: "Erfassen und dokumentieren Sie alle technischen und organisatorischen Maßnahmen zum Schutz personenbezogener Daten gemäß Art. 32 Abs. 1 DSGVO. Dies umfasst Zugriffskontrolle, Verschlüsselung, Pseudonymisierung, Verfügbarkeit und regelmäßige Tests.",
    firstStep: "Erstellen Sie ein TOM-Verzeichnis mit Kategorien wie Zutrittskontrolle, Datensicherung, Verschlüsselung und weisen Sie jeder Kategorie konkrete Maßnahmen zu."
  },
  tom2: {
    title: "Verschlüsselung und Pseudonymisierung einsetzen",
    description: "Implementieren Sie Verschlüsselung und Pseudonymisierung als zentrale Schutzmaßnahmen gemäß Art. 32 Abs. 1 lit. a DSGVO. Dies reduziert das Risiko bei Datenpannen und kann Meldepflichten entfallen lassen.",
    firstStep: "Aktivieren Sie Verschlüsselung für alle mobilen Geräte (Bitlocker, FileVault) und prüfen Sie TLS für alle Datenübertragungen."
  },
  tom3: {
    title: "Regelmäßige Wirksamkeitsprüfung der TOMs etablieren",
    description: "Führen Sie regelmäßige Tests und Überprüfungen Ihrer technischen und organisatorischen Maßnahmen durch, wie Art. 32 Abs. 1 lit. d DSGVO es verlangt. Dies umfasst Penetrationstests, Backup-Restores und Zugriffsprotokolle.",
    firstStep: "Planen Sie einen jährlichen Audit-Termin ein, bei dem alle TOMs auf Aktualität und Wirksamkeit geprüft werden."
  },

  // privacy-by-design (Privacy by Design & Default)
  pbd1: {
    title: "Datenschutzanforderungen in Entwicklungsprozesse integrieren",
    description: "Stellen Sie sicher, dass Datenschutz bereits in der Design- und Entwicklungsphase von IT-Systemen berücksichtigt wird (Art. 25 Abs. 1 DSGVO). Privacy by Design bedeutet: Datenschutz als Standard, nicht als Nachbesserung.",
    firstStep: "Ergänzen Sie Ihre Projekt-Checklisten um einen Pflicht-Reviewpunkt 'Datenschutz-Anforderungen' vor der Implementierung."
  },
  pbd2: {
    title: "Datenschutzfreundliche Voreinstellungen umsetzen",
    description: "Konfigurieren Sie alle Systeme standardmäßig so, dass nur die für den jeweiligen Verarbeitungszweck notwendigen Daten verarbeitet werden (Art. 25 Abs. 2 DSGVO). Nutzer dürfen nicht durch vorausgewählte Häkchen zur Preisgabe nicht notwendiger Daten gedrängt werden.",
    firstStep: "Prüfen Sie alle Formulare und Anmeldemasken: Sind optionale Felder wirklich optional und nicht vorausgefüllt?"
  },
  pbd3: {
    title: "Privacy-by-Design-Framework implementieren",
    description: "Verankern Sie Privacy by Design systematisch in Ihren Entwicklungsprozessen gemäß Art. 25 DSGVO. Dies kann durch Privacy Impact Assessments, Datenschutz-Checklisten in agilen Sprints oder Datenschutz-Champions in Teams erfolgen.",
    firstStep: "Schulen Sie alle Entwickler und Produktverantwortlichen in den Grundprinzipien von Privacy by Design (Datenminimierung, Transparenz, Kontrolle)."
  },

  // auftragsverarbeitung (Auftragsverarbeitung)
  av1: {
    title: "Auftragsverarbeitungsverträge nach Art. 28 DSGVO prüfen",
    description: "Überprüfen Sie alle bestehenden Verträge mit Auftragsverarbeitern auf Vollständigkeit gemäß Art. 28 Abs. 1 und 3 DSGVO. Der Vertrag muss Gegenstand, Dauer, Art und Zweck der Verarbeitung, Datenarten, Löschpflichten und TOMs regeln.",
    firstStep: "Erstellen Sie eine Liste aller externen Dienstleister mit Datenzugriff und prüfen Sie, ob AVVs vorliegen und aktuell sind."
  },
  av2: {
    title: "Due Diligence bei Auftragsverarbeitern durchführen",
    description: "Prüfen Sie vor der Beauftragung, ob der Auftragsverarbeiter hinreichende Garantien für Datenschutz und Datensicherheit bietet (Art. 28 Abs. 1 DSGVO). Dies umfasst Zertifizierungen, Sicherheitskonzepte und Audit-Berichte.",
    firstStep: "Fordern Sie von allen Cloud- und SaaS-Anbietern aktuelle ISO 27001-Zertifikate, SOC 2-Reports oder vergleichbare Nachweise an."
  },
  av3: {
    title: "Unterauftragnehmer-Management etablieren",
    description: "Stellen Sie sicher, dass Auftragsverarbeiter keine Unterauftragnehmer ohne Ihre Zustimmung einsetzen (Art. 28 Abs. 2 und 4 DSGVO). Sie müssen über Sub-Prozessoren informiert werden und Widerspruchsrecht haben.",
    firstStep: "Fordern Sie von allen Hauptdienstleistern eine aktuelle Liste ihrer Unterauftragnehmer an und lassen Sie sich Änderungen melden."
  }
};

// KRITIS Recommendations (24 total)
const kritisRecommendations = {
  // bsi-kontaktstelle (BSI-Kontaktstelle)
  bsi1: {
    title: "BSI-Kontaktstelle gemäß §8b Abs. 3 BSI-Gesetz benennen",
    description: "Benennen Sie eine dedizierte Kontaktstelle zum Bundesamt für Sicherheit in der Informationstechnik (BSI) und melden Sie diese offiziell. Dies ist Pflicht für alle KRITIS-Betreiber nach §8b Abs. 3 BSI-Gesetz.",
    firstStep: "Registrieren Sie Ihr Unternehmen beim BSI-Webportal und benennen Sie einen Ansprechpartner mit Name, Funktion und Erreichbarkeit (24/7)."
  },
  bsi2: {
    title: "BSI-Meldewege testen und dokumentieren",
    description: "Überprüfen Sie regelmäßig die Funktionsfähigkeit der Kommunikationswege zum BSI (E-Mail, Telefon, Webportal) gemäß §8b Abs. 3 BSI-Gesetz. Im Ernstfall müssen Störungen und Sicherheitsvorfälle unverzüglich gemeldet werden können.",
    firstStep: "Führen Sie einen Test-Meldevorgang über das BSI-Webportal durch, um Zugangsdaten und Prozess zu verifizieren."
  },
  bsi3: {
    title: "Kommunikationsplan mit BSI entwickeln",
    description: "Erstellen Sie einen strukturierten Kommunikationsplan für den Informationsaustausch mit dem BSI nach §8b Abs. 3 BSI-Gesetz. Dies umfasst Meldepflichten bei Störungen, Teilnahme an Lagebildern und Empfang von Warnmeldungen.",
    firstStep: "Abonnieren Sie die BSI-Warnmeldungen und CERT-Bund-Advisories und definieren Sie interne Eskalationswege für BSI-Informationen."
  },

  // risikomanagement (IT-Risikomanagement)
  rm1: {
    title: "IT-Risikoanalyse-Methodik nach §8a BSI-Gesetz etablieren",
    description: "Implementieren Sie eine systematische Methode zur Identifikation und Bewertung von IT-Risiken für Ihre kritischen Dienstleistungen gemäß §8a Abs. 1 BSI-Gesetz. Die Analyse muss regelmäßig aktualisiert werden.",
    firstStep: "Wählen Sie eine anerkannte Risikoanalyse-Methode (z.B. BSI-Standard 200-3, ISO 27005) und terminieren Sie ein Kickoff-Meeting."
  },
  rm2: {
    title: "Risikobewertung und Maßnahmenplan entwickeln",
    description: "Führen Sie für alle identifizierten IT-Risiken eine Bewertung durch (Eintrittswahrscheinlichkeit × Schadenshöhe) und leiten Sie priorisierte Maßnahmen zur Risikominimierung ab, wie §8a Abs. 1 BSI-Gesetz es verlangt.",
    firstStep: "Erstellen Sie ein Risikoregister mit allen identifizierten Bedrohungen, Bewertung und Status der Gegenmaßnahmen."
  },
  rm3: {
    title: "Kontinuierliches Risiko-Monitoring einführen",
    description: "Etablieren Sie einen Prozess zur fortlaufenden Überwachung und Neubewertung von IT-Risiken gemäß §8a Abs. 1 BSI-Gesetz. Neue Bedrohungen (z.B. Zero-Day-Exploits) oder Änderungen in der IT-Landschaft müssen zeitnah erfasst werden.",
    firstStep: "Richten Sie ein quartalsweises Risiko-Review-Meeting ein, in dem das Risikoregister aktualisiert und neue Bedrohungen bewertet werden."
  },

  // vorfallmanagement (Vorfallmanagement)
  vm1: {
    title: "IT-Notfallmanagement-Plan für KRITIS-Dienste erstellen",
    description: "Entwickeln Sie einen umfassenden Notfallplan für IT-Sicherheitsvorfälle in kritischen Infrastrukturen gemäß §8b Abs. 4 BSI-Gesetz. Der Plan muss Erkennung, Bewertung, Eindämmung, Meldung an BSI und Wiederherstellung abdecken.",
    firstStep: "Führen Sie eine Business Impact Analyse durch, um die kritischsten IT-Systeme und ihre maximalen Ausfallzeiten zu identifizieren."
  },
  vm2: {
    title: "Vorfallklassifizierungs-System implementieren",
    description: "Definieren Sie klare Kriterien zur Bewertung und Klassifizierung von IT-Sicherheitsvorfällen nach §8b Abs. 4 BSI-Gesetz. Dies bestimmt, ob ein Vorfall erheblich ist und an das BSI gemeldet werden muss.",
    firstStep: "Erstellen Sie eine Tabelle mit Schweregrad-Stufen (z.B. 1-5) und konkreten Beispielen für jeden Level (z.B. 'Ausfall >30 Min = Stufe 4')."
  },
  vm3: {
    title: "Lessons-Learned-Prozess nach Vorfällen etablieren",
    description: "Führen Sie nach jedem relevanten IT-Sicherheitsvorfall eine strukturierte Nachbesprechung durch, um Schwachstellen zu identifizieren und präventive Maßnahmen abzuleiten (§8b Abs. 4 BSI-Gesetz).",
    firstStep: "Legen Sie eine Vorlage für Post-Incident-Reviews an mit Fragen wie: Was ist passiert? Warum? Was wurde gut gemacht? Was muss verbessert werden?"
  },

  // bcm (Business Continuity Management)
  bcm1: {
    title: "Business Impact Analyse für kritische Dienstleistungen durchführen",
    description: "Identifizieren Sie alle geschäftskritischen Prozesse und IT-Systeme und bewerten Sie die Auswirkungen von Ausfällen gemäß §8a Abs. 1 BSI-Gesetz. Dies ist die Grundlage für Notfall- und Wiederherstellungspläne.",
    firstStep: "Erstellen Sie eine Liste aller Kernprozesse und bewerten Sie für jeden: Maximale tolerierbare Ausfallzeit (MTA) und Recovery Time Objective (RTO)."
  },
  bcm2: {
    title: "Notfall- und Wiederherstellungspläne entwickeln",
    description: "Erarbeiten Sie detaillierte Pläne zur Aufrechterhaltung oder schnellen Wiederherstellung kritischer Dienstleistungen nach §8a Abs. 1 BSI-Gesetz. Dies umfasst technische Redundanzen, Ausweichstandorte und manuelle Notfallverfahren.",
    firstStep: "Dokumentieren Sie für Ihr kritischstes IT-System einen Schritt-für-Schritt-Wiederherstellungsplan mit Verantwortlichkeiten und Kontakten."
  },
  bcm3: {
    title: "Regelmäßige BCM-Übungen und Tests durchführen",
    description: "Testen Sie Ihre Notfallpläne durch regelmäßige Übungen (Tabletop-Übungen, technische Tests, Vollübungen) gemäß §8a Abs. 1 BSI-Gesetz. Nur getestete Pläne funktionieren im Ernstfall.",
    firstStep: "Planen Sie eine Tabletop-Übung mit einem simulierten Ransomware-Angriff und involvieren Sie alle relevanten Stakeholder (IT, Geschäftsleitung, Kommunikation)."
  },

  // lieferkette (Lieferkette)
  lk1: {
    title: "Kritische Lieferanten und Dienstleister inventarisieren",
    description: "Erfassen Sie alle externen Dienstleister und Lieferanten, die für den Betrieb Ihrer kritischen Infrastruktur notwendig sind (§8a Abs. 1 BSI-Gesetz). Dies umfasst IT-Dienstleister, Cloud-Provider, Wartungsfirmen und Hardware-Lieferanten.",
    firstStep: "Erstellen Sie eine Excel-Liste mit allen IT-Dienstleistern und bewerten Sie deren Kritikalität für Ihre KRITIS-Dienstleistung."
  },
  lk2: {
    title: "Sicherheitsanforderungen in Lieferantenverträge aufnehmen",
    description: "Stellen Sie sicher, dass alle Verträge mit kritischen Lieferanten Sicherheitsanforderungen, Audit-Rechte und Meldepflichten bei Sicherheitsvorfällen enthalten (§8a Abs. 1 BSI-Gesetz).",
    firstStep: "Entwickeln Sie eine Vertragsklausel-Vorlage mit IT-Sicherheitsanforderungen (z.B. ISO 27001-Zertifizierung, Patch-Management-SLA)."
  },
  lk3: {
    title: "Regelmäßige Lieferanten-Sicherheitsbewertungen durchführen",
    description: "Bewerten Sie die IT-Sicherheit Ihrer kritischen Lieferanten regelmäßig durch Audits, Fragebögen oder Zertifikatsprüfungen gemäß §8a Abs. 1 BSI-Gesetz. Supply-Chain-Angriffe sind eine wachsende Bedrohung.",
    firstStep: "Fordern Sie von Ihren Top-5-Lieferanten aktuelle ISO 27001- oder TISAX-Zertifikate an."
  },

  // audit (Audit)
  au1: {
    title: "Vorbereitung auf §8a-Audit nach BSI-Gesetz",
    description: "Bereiten Sie die verpflichtende Überprüfung der IT-Sicherheitsmaßnahmen nach §8a Abs. 3 BSI-Gesetz vor. KRITIS-Betreiber müssen alle zwei Jahre durch qualifizierte Prüfer nachweisen, dass der Stand der Technik eingehalten wird.",
    firstStep: "Informieren Sie sich über anerkannte Prüfstellen (z.B. über das BSI-Portal) und fordern Sie Angebote für ein §8a-Audit an."
  },
  au2: {
    title: "Internes Audit-Programm etablieren",
    description: "Implementieren Sie ein regelmäßiges internes Audit-Programm, um Schwachstellen frühzeitig zu identifizieren und die Vorbereitung auf externe §8a-Audits zu unterstützen (§8a Abs. 3 BSI-Gesetz).",
    firstStep: "Planen Sie halbjährliche interne IT-Sicherheits-Audits und schulen Sie interne Auditoren in den Anforderungen des BSI-Kritisverordnungen."
  },
  au3: {
    title: "Kontinuierliches Compliance-Monitoring aufbauen",
    description: "Nutzen Sie technische Tools zur kontinuierlichen Überwachung der IT-Sicherheitskonformität (z.B. SIEM, Vulnerability Scanner, Configuration Management) gemäß §8a Abs. 3 BSI-Gesetz. Dies erleichtert Audits und reduziert Risiken.",
    firstStep: "Implementieren Sie ein Security Information and Event Management (SIEM) System zur zentralen Protokollierung und Anomalieerkennung."
  },

  // physische-sicherheit (Physische Sicherheit)
  ps1: {
    title: "Physische Zugangskontrollen für kritische Infrastruktur implementieren",
    description: "Sichern Sie alle kritischen IT- und OT-Räume (Serverräume, Leitstellen, Netzwerktechnik) durch physische Zugangskontrollen wie Chipkarten, biometrische Systeme oder Schlüssel gemäß §8a Abs. 1 BSI-Gesetz.",
    firstStep: "Führen Sie eine Begehung aller technischen Räume durch und prüfen Sie, ob Zutrittskontrollen vorhanden und funktionsfähig sind."
  },
  ps2: {
    title: "Umgebungssicherheit gegen Feuer, Wasser und Stromausfall",
    description: "Schützen Sie kritische IT-Infrastruktur vor physischen Bedrohungen wie Brand, Überschwemmung und Stromausfall durch entsprechende Maßnahmen (z.B. Brandmeldeanlage, USV, Klimatisierung) nach §8a Abs. 1 BSI-Gesetz.",
    firstStep: "Prüfen Sie, ob Ihr Rechenzentrum über eine unterbrechungsfreie Stromversorgung (USV) und Notstromaggregat verfügt."
  },
  ps3: {
    title: "Umfassendes physisches Sicherheitskonzept erstellen",
    description: "Entwickeln Sie ein ganzheitliches Konzept für physische Sicherheit gemäß §8a Abs. 1 BSI-Gesetz, das Perimeterschutz, Zutrittskontrollen, Videoüberwachung, Besuchermanagement und Alarmierung umfasst.",
    firstStep: "Beauftragen Sie eine Sicherheitsberatung oder nutzen Sie BSI-Standards (z.B. IT-Grundschutz Baustein INF.1 Rechenzentrum)."
  },

  // systemhaertung (Systemhärtung)
  sh1: {
    title: "Server- und Endpoint-Härtung nach Stand der Technik",
    description: "Härten Sie alle kritischen Server und Endgeräte durch Deaktivierung unnötiger Dienste, sichere Konfiguration und restriktive Berechtigungen gemäß §8a Abs. 1 BSI-Gesetz. Dies reduziert die Angriffsfläche erheblich.",
    firstStep: "Verwenden Sie CIS Benchmarks oder BSI SiSyPHuS-Richtlinien, um eine Baseline-Härtungskonfiguration für Windows/Linux-Server zu definieren."
  },
  sh2: {
    title: "Netzwerksegmentierung und Firewall-Regeln implementieren",
    description: "Segmentieren Sie Ihr Netzwerk nach Kritikalität und Schutzbedarf (z.B. OT vs. Office-IT) und setzen Sie restriktive Firewall-Regeln durch (§8a Abs. 1 BSI-Gesetz). Dies begrenzt die Ausbreitung von Angriffen.",
    firstStep: "Erstellen Sie eine Netzwerk-Zonen-Architektur (z.B. DMZ, Produktionsnetz, Office-Netz) und dokumentieren Sie erlaubte Datenflüsse."
  },
  sh3: {
    title: "Umfassende Härtungsbaselines entwickeln",
    description: "Entwickeln Sie für alle Systemtypen (Server, Clients, Netzwerkgeräte, OT-Komponenten) standardisierte Härtungsrichtlinien gemäß §8a Abs. 1 BSI-Gesetz und setzen Sie diese durch Configuration Management durch.",
    firstStep: "Nutzen Sie Tools wie Microsoft Security Compliance Toolkit oder Ansible/Puppet, um Härtungskonfigurationen automatisiert zu verteilen."
  }
};

console.log('Reading de.json...');
const deJson = JSON.parse(readFileSync(DE_JSON_PATH, 'utf-8'));

// Update DSGVO recommendations
console.log('Updating DSGVO recommendations...');
let dsgvoCount = 0;
for (const [id, content] of Object.entries(dsgvoRecommendations)) {
  if (deJson.dsgvo?.recommendations?.[id]) {
    // Preserve checklist if it exists
    const existingChecklist = deJson.dsgvo.recommendations[id].checklist;

    deJson.dsgvo.recommendations[id] = {
      ...content,
      ...(existingChecklist ? { checklist: existingChecklist } : {})
    };
    dsgvoCount++;
  }
}
console.log(`✓ Updated ${dsgvoCount} DSGVO recommendations`);

// Update KRITIS recommendations
console.log('Updating KRITIS recommendations...');
let kritisCount = 0;
for (const [id, content] of Object.entries(kritisRecommendations)) {
  if (deJson.kritis?.recommendations?.[id]) {
    // Preserve checklist if it exists
    const existingChecklist = deJson.kritis.recommendations[id].checklist;

    deJson.kritis.recommendations[id] = {
      ...content,
      ...(existingChecklist ? { checklist: existingChecklist } : {})
    };
    kritisCount++;
  }
}
console.log(`✓ Updated ${kritisCount} KRITIS recommendations`);

// Write back to file
console.log('Writing updated de.json...');
writeFileSync(DE_JSON_PATH, JSON.stringify(deJson, null, 2), 'utf-8');

console.log('\n✅ SUCCESS!');
console.log(`   - ${dsgvoCount}/30 DSGVO recommendations updated`);
console.log(`   - ${kritisCount}/24 KRITIS recommendations updated`);
console.log('\nAll placeholder texts replaced with specific German content.');
