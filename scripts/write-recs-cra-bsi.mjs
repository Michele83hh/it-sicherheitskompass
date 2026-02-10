#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DE_JSON_PATH = join(__dirname, '..', 'src', 'messages', 'de.json');

// CRA Recommendations
const CRA_RECS = {
  sbd1: {
    title: 'Security-Anforderungen in Produktdesign integrieren',
    description: 'Integrieren Sie Sicherheitsanforderungen bereits in der Designphase Ihrer Produkte mit digitalen Elementen. Art. 10 Abs. 1 CRA fordert, dass Cybersicherheit von Anfang an berücksichtigt wird.',
    firstStep: 'Erstellen Sie eine Bedrohungsmodellierung für Ihr wichtigstes Produkt mit digitalen Elementen.',
  },
  sbd2: {
    title: 'Sichere Standardkonfigurationen einrichten',
    description: 'Liefern Sie alle Produkte mit sicheren Standardeinstellungen aus (Secure by Default). Art. 10 Abs. 2 CRA verlangt, dass keine Standardpasswörter verwendet und nur notwendige Dienste aktiviert werden.',
    firstStep: 'Prüfen Sie die Standardkonfiguration Ihres Hauptprodukts auf unsichere Defaults (Standardpasswörter, offene Ports, unnötige Dienste).',
  },
  sbd3: {
    title: 'Secure Development Lifecycle (SDL) etablieren',
    description: 'Führen Sie einen sicheren Entwicklungsprozess ein, der Bedrohungsmodellierung, Secure Coding und Security-Testing umfasst. Art. 10 Abs. 3 CRA fordert die systematische Integration von Sicherheit in alle Entwicklungsphasen.',
    firstStep: 'Definieren Sie Security Gates in Ihrem Entwicklungsprozess (z.B. Threat Model Review vor Design, Code Review vor Release).',
  },
  swm1: {
    title: 'Koordinierte Schwachstellenoffenlegung einrichten',
    description: 'Implementieren Sie einen Prozess für koordinierte Schwachstellenoffenlegung (Coordinated Vulnerability Disclosure). Art. 11 Abs. 1-2 CRA verpflichtet Hersteller, Sicherheitsforschern einen sicheren Meldeweg bereitzustellen.',
    firstStep: 'Legen Sie eine zentrale E-Mail-Adresse für Schwachstellenmeldungen fest (z.B. security@ihrefirma.de).',
  },
  swm2: {
    title: 'security.txt und Kontaktpunkt veröffentlichen',
    description: 'Erstellen Sie eine security.txt-Datei gemäß RFC 9116 und veröffentlichen Sie einen Sicherheitskontaktpunkt. Art. 11 Abs. 2 CRA fordert eine öffentlich dokumentierte Anlaufstelle für Schwachstellenmeldungen.',
    firstStep: 'Erstellen Sie eine /.well-known/security.txt auf Ihrer Website mit Kontaktdaten und PGP-Key.',
  },
  swm3: {
    title: 'Schwachstellenüberwachung mit CVE/NVD aufbauen',
    description: 'Überwachen Sie kontinuierlich bekannte Schwachstellen in verwendeten Komponenten über CVE/NVD-Datenbanken. Art. 11 Abs. 3 CRA verlangt, dass Hersteller aktiv über Schwachstellen in ihren Produkten informiert bleiben.',
    firstStep: 'Richten Sie einen automatisierten CVE-Feed für Ihre verwendeten Software-Komponenten ein (z.B. via NIST NVD API).',
  },
  sbom1: {
    title: 'Maschinenlesbare SBOM erstellen',
    description: 'Erstellen Sie eine Software Bill of Materials (SBOM) im SPDX- oder CycloneDX-Format für Ihre Produkte. Art. 10 Abs. 6 CRA fordert eine vollständige, maschinenlesbare Auflistung aller Software-Komponenten.',
    firstStep: 'Wählen Sie ein SBOM-Tool (z.B. Syft, CycloneDX Generator) und erzeugen Sie eine erste SBOM für Ihr Hauptprodukt.',
  },
  sbom2: {
    title: 'SBOM-Generierung in CI/CD-Pipeline automatisieren',
    description: 'Integrieren Sie die SBOM-Erzeugung automatisch in Ihre Build-Pipeline. Art. 10 Abs. 6 CRA verlangt, dass die SBOM stets aktuell ist und bei jeder Produktversion mitgeliefert wird.',
    firstStep: 'Fügen Sie einen SBOM-Generierungsschritt in Ihre CI/CD-Pipeline ein (z.B. als Post-Build-Step).',
  },
  sbom3: {
    title: 'SBOM-Lebenszyklusmanagement mit VEX etablieren',
    description: 'Führen Sie ein Lifecycle-Management für SBOMs ein und ergänzen Sie Vulnerability Exploitability eXchange (VEX)-Statements. Art. 10 Abs. 6 CRA fordert kontinuierliche Pflege und Bewertung der SBOM-Komponenten.',
    firstStep: 'Definieren Sie einen Prozess zur regelmäßigen SBOM-Aktualisierung und Schwachstellenbewertung (mindestens bei jedem Release).',
  },
  um1: {
    title: 'Sicherheitsupdate-Mechanismus bereitstellen',
    description: 'Implementieren Sie einen zuverlässigen Mechanismus zur Bereitstellung von Sicherheitsupdates über den gesamten Produktlebenszyklus. Art. 10 Abs. 12 CRA fordert, dass Sicherheitsupdates sicher und zeitnah verfügbar sind.',
    firstStep: 'Prüfen Sie, ob Ihr Produkt einen automatischen oder manuellen Update-Mechanismus besitzt und dokumentieren Sie diesen.',
  },
  um2: {
    title: 'Sicherheitsupdates von Feature-Updates trennen',
    description: 'Trennen Sie Sicherheitsupdates von Funktionsupdates, damit kritische Patches schnell ausgerollt werden können. Art. 10 Abs. 12 CRA verlangt, dass Sicherheitsupdates unabhängig von Funktionserweiterungen verfügbar sind.',
    firstStep: 'Definieren Sie eine Versionierungs- und Release-Strategie mit separaten Security-Patch-Versionen (z.B. Semantic Versioning mit Patch-Level für Security).',
  },
  um3: {
    title: 'Support-Zeitraum definieren (mind. 5 Jahre)',
    description: 'Legen Sie einen Sicherheits-Support-Zeitraum von mindestens 5 Jahren fest und kommunizieren Sie diesen. Art. 10 Abs. 12 CRA fordert eine angemessene Supportdauer für Sicherheitsupdates ab Inverkehrbringen.',
    firstStep: 'Dokumentieren Sie für jedes Ihrer Produkte mit digitalen Elementen den geplanten Sicherheits-Support-Zeitraum.',
  },
  dok1: {
    title: 'EU-Konformitätserklärung erstellen',
    description: 'Erstellen Sie eine EU-Konformitätserklärung gemäß Anhang VII CRA für jedes Ihrer Produkte mit digitalen Elementen. Diese bestätigt die Einhaltung aller CRA-Anforderungen und ist Voraussetzung für die CE-Kennzeichnung.',
    firstStep: 'Laden Sie die Vorlage für EU-Konformitätserklärungen herunter (BSI oder EU-Kommission) und beginnen Sie mit der Befüllung für Ihr Hauptprodukt.',
  },
  dok2: {
    title: 'Technische Dokumentation erstellen',
    description: 'Erstellen Sie die technische Dokumentation gemäß Anhang VII Nr. 2 CRA. Sie muss Produktbeschreibung, Sicherheitsarchitektur, Risikoanalyse und Konformitätsnachweis enthalten.',
    firstStep: 'Erstellen Sie eine Gliederung für die technische Dokumentation basierend auf Anhang VII CRA und beginnen Sie mit der Produktbeschreibung.',
  },
  dok3: {
    title: 'Benutzerinformation zur Cybersicherheit erstellen',
    description: 'Erstellen Sie verständliche Benutzerinformationen zu Cybersicherheit und sicherem Betrieb Ihrer Produkte. Anhang VII Nr. 4 CRA fordert, dass Endanwender über Sicherheitsrisiken und Schutzmaßnahmen informiert werden.',
    firstStep: 'Ergänzen Sie Ihre Produktdokumentation um einen Abschnitt "Sicherheitshinweise" mit konkreten Handlungsempfehlungen für Nutzer.',
  },
  vm1: {
    title: 'Schwachstellenmeldung an ENISA innerhalb 24h einrichten',
    description: 'Richten Sie einen Prozess ein, um aktiv ausgenutzte Schwachstellen innerhalb von 24 Stunden an ENISA zu melden. Art. 14 Abs. 1-2 CRA verpflichtet zur unverzüglichen Meldung schwerwiegender Vorfälle.',
    firstStep: 'Registrieren Sie sich im ENISA-Meldesystem und definieren Sie interne Eskalationswege für Schwachstellenmeldungen.',
  },
  vm2: {
    title: 'Interne Meldevorlagen und -prozesse etablieren',
    description: 'Erstellen Sie standardisierte Vorlagen und Prozesse für interne Schwachstellenmeldungen. Art. 14 Abs. 2 CRA fordert, dass Hersteller klar definierte Abläufe zur Bewertung und Meldung von Vorfällen haben.',
    firstStep: 'Erstellen Sie eine Meldevorlage für Schwachstellen mit Feldern für CVE-ID, Schweregrad, Betroffene Produkte und geplante Maßnahmen.',
  },
  vm3: {
    title: 'Endnutzer über Schwachstellen informieren',
    description: 'Implementieren Sie einen Prozess zur Information Ihrer Endnutzer über Schwachstellen in Ihren Produkten. Art. 14 Abs. 3 CRA fordert, dass Anwender zeitnah und verständlich über Sicherheitsrisiken informiert werden.',
    firstStep: 'Richten Sie einen Security-Newsletter oder Security-Advisory-Bereich auf Ihrer Website ein.',
  },
  konf1: {
    title: 'Konformitätsbewertungsverfahren bestimmen',
    description: 'Bestimmen Sie das für Ihr Produkt zutreffende Konformitätsbewertungsverfahren (Modul A, B+C oder H). Art. 24-28 CRA unterscheiden nach Kritikalität zwischen Selbstbewertung und Drittanbieterbewertung.',
    firstStep: 'Prüfen Sie, ob Ihr Produkt in Anhang III (wichtig) oder Anhang IV (kritisch) des CRA gelistet ist.',
  },
  konf2: {
    title: 'CE-Kennzeichnung und Konformitätserklärung vorbereiten',
    description: 'Bereiten Sie CE-Kennzeichnung und EU-Konformitätserklärung gemäß Art. 30 CRA vor. Erst nach erfolgreicher Konformitätsbewertung dürfen Produkte mit digitalen Elementen in der EU in Verkehr gebracht werden.',
    firstStep: 'Laden Sie das CE-Logo in korrekter Größe herunter und bereiten Sie die Anbringung auf Ihrem Produkt/Verpackung vor.',
  },
  konf3: {
    title: 'Drittanbieterbewertung vorbereiten',
    description: 'Bereiten Sie die Konformitätsbewertung durch eine benannte Stelle vor, falls Ihr Produkt als kritisch (Anhang IV) oder wichtig Klasse II (Anhang III) eingestuft ist. Art. 24-30 CRA fordern für kritische Produkte eine unabhängige Zertifizierung.',
    firstStep: 'Recherchieren Sie benannte Stellen für CRA-Konformitätsbewertung (Liste wird von EU-Kommission veröffentlicht).',
  },
  sl1: {
    title: 'Produktsicherheits-Support-Zeitraum definieren',
    description: 'Definieren Sie einen klaren Sicherheits-Support-Zeitraum für Ihre Produkte. Art. 10 Abs. 12 CRA fordert, dass Hersteller vorab festlegen und kommunizieren, wie lange Sicherheitsupdates bereitgestellt werden.',
    firstStep: 'Erstellen Sie eine Support-Lifecycle-Policy, die für jede Produktkategorie den Mindest-Support-Zeitraum festlegt.',
  },
  sl2: {
    title: 'End-of-Support-Kommunikation einrichten',
    description: 'Richten Sie einen Prozess ein, um Kunden rechtzeitig über das Ende des Sicherheits-Supports zu informieren. Art. 10 Abs. 12 CRA verlangt, dass Nutzer frühzeitig gewarnt werden, wenn keine Updates mehr bereitgestellt werden.',
    firstStep: 'Definieren Sie eine Vorlaufzeit für End-of-Support-Ankündigungen (z.B. 12 Monate im Voraus).',
  },
  sl3: {
    title: 'Lifecycle-Sicherheitsrichtlinie erstellen',
    description: 'Erstellen Sie eine umfassende Lifecycle-Sicherheitsrichtlinie, die alle Phasen von der Entwicklung bis zum End-of-Life abdeckt. Art. 10 Abs. 12 CRA fordert ein durchgängiges Sicherheitskonzept über den gesamten Produktlebenszyklus.',
    firstStep: 'Dokumentieren Sie alle Lifecycle-Phasen Ihrer Produkte (Development, Release, Maintenance, End-of-Life) mit Sicherheitsanforderungen.',
  },
};

// BSI IT-Grundschutz Recommendations
const BSI_RECS = {
  isms1: {
    title: 'Leitlinie und ISMS nach BSI-Standard 200-1 aufbauen',
    description: 'Etablieren Sie ein Informationssicherheits-Managementsystem (ISMS) nach BSI-Standard 200-1. Die Sicherheitsleitlinie definiert Ziele und strategische Ausrichtung der Informationssicherheit in Ihrer Organisation.',
    firstStep: 'Lesen Sie BSI-Standard 200-1 (kostenlos verfügbar) und erstellen Sie einen ersten Entwurf einer IS-Leitlinie (max. 2 Seiten).',
  },
  isms2: {
    title: 'IS-Managementverantwortung zuweisen',
    description: 'Benennen Sie eine Leitung Informationssicherheit und verankern Sie die Verantwortung auf Managementebene. BSI-Standard 200-1 fordert klare Zuständigkeiten und Eskalationswege für Informationssicherheit.',
    firstStep: 'Benennen Sie formal einen Informationssicherheitsbeauftragten (ISB) und kommunizieren Sie dessen Rolle an alle Mitarbeitenden.',
  },
  isms3: {
    title: 'Risikoanalyse nach BSI-Standard 200-3 durchführen',
    description: 'Führen Sie eine Risikoanalyse gemäß BSI-Standard 200-3 durch, um Ihre kritischsten Assets und Bedrohungen zu identifizieren. Dies ist die Grundlage für alle weiteren Sicherheitsmaßnahmen.',
    firstStep: 'Erstellen Sie eine Liste Ihrer 10 wichtigsten IT-Assets (Server, Anwendungen, Daten) als Basis für die Risikoanalyse.',
  },
  orp1: {
    title: 'Sicherheitsrichtlinien und Regelungen erstellen',
    description: 'Erstellen Sie verbindliche Sicherheitsrichtlinien für alle relevanten Bereiche (Passwörter, Zugriffe, mobile Geräte etc.). BSI-Standard 200-2, Baustein ORP.1 fordert dokumentierte und kommunizierte Regelungen.',
    firstStep: 'Erstellen Sie eine Passwort-Richtlinie mit Mindestlänge, Komplexität und Gültigkeitsdauer.',
  },
  orp2: {
    title: 'Personalsicherheitsmaßnahmen implementieren',
    description: 'Etablieren Sie Sicherheitsmaßnahmen für Personal: Verpflichtungserklärungen, Vertraulichkeitsvereinbarungen, geregelte Einarbeitung und Austrittsprozesse. BSI-Standard 200-2, ORP.2 fordert strukturierte Personal-Sicherheitsprozesse.',
    firstStep: 'Erstellen Sie eine Verpflichtungserklärung zur Informationssicherheit, die neue Mitarbeitende bei Eintritt unterschreiben.',
  },
  orp3: {
    title: 'Security-Awareness-Programm aufbauen',
    description: 'Etablieren Sie ein kontinuierliches Schulungs- und Sensibilisierungsprogramm für alle Mitarbeitenden. BSI-Standard 200-2, ORP.3 fordert regelmäßige Awareness-Maßnahmen zu aktuellen Bedrohungen.',
    firstStep: 'Planen Sie eine erste Security-Awareness-Schulung für alle Mitarbeitenden (z.B. Phishing-Awareness).',
  },
  con1: {
    title: 'Datensicherungskonzept erstellen',
    description: 'Erstellen Sie ein Datensicherungskonzept gemäß BSI-Standard 200-2, CON.1 mit Backup-Strategie, Recovery-Verfahren und Testplan. Legen Sie fest, welche Daten wie oft und wo gesichert werden.',
    firstStep: 'Dokumentieren Sie Ihre aktuelle Backup-Strategie: Was wird gesichert, wie oft, wo liegen die Backups, wer ist verantwortlich?',
  },
  con2: {
    title: 'Notfallmanagement- und Business-Continuity-Konzept erstellen',
    description: 'Erstellen Sie ein Notfallmanagement-Konzept nach BSI-Standard 200-4, CON.3 mit Business Impact Analysis, Notfallplänen und definierten Wiederanlaufzeiten (RTO/RPO).',
    firstStep: 'Identifizieren Sie Ihre 5 kritischsten Geschäftsprozesse und deren maximal tolerierbare Ausfallzeit.',
  },
  con3: {
    title: 'Lösch- und Vernichtungskonzept erstellen',
    description: 'Erstellen Sie ein Konzept zur sicheren Löschung und Vernichtung von Daten und Datenträgern. BSI-Standard 200-2, CON.6 fordert definierte Verfahren zur Datenentsorgung.',
    firstStep: 'Dokumentieren Sie, wie ausgemusterte Festplatten, USB-Sticks und Altpapier mit vertraulichen Daten aktuell entsorgt werden.',
  },
  ops1: {
    title: 'Patch- und Update-Management etablieren',
    description: 'Implementieren Sie ein systematisches Patch- und Update-Management nach BSI-Standard 200-2, OPS.1.1.3. Definieren Sie Prozesse zur zeitnahen Einspielen von Sicherheitsupdates.',
    firstStep: 'Erstellen Sie eine Inventarliste aller Software-Systeme mit aktueller Versionsnummer und letztem Update-Datum.',
  },
  ops2: {
    title: 'Malware-Schutz implementieren',
    description: 'Implementieren Sie mehrstufigen Malware-Schutz nach BSI-Standard 200-2, OPS.1.1.4: Virenscanner, Application Whitelisting, E-Mail-Filterung, Verhaltensanalyse.',
    firstStep: 'Prüfen Sie, ob auf allen Clients und Servern ein aktueller Virenscanner mit automatischen Updates aktiv ist.',
  },
  ops3: {
    title: 'Archivierung etablieren',
    description: 'Richten Sie ein Archivierungssystem nach BSI-Standard 200-2, OPS.1.2.2 ein. Definieren Sie Aufbewahrungsfristen, Zugriffsrechte und Integritätssicherung für archivierte Daten.',
    firstStep: 'Erstellen Sie eine Liste aller gesetzlichen und vertraglichen Aufbewahrungspflichten für Ihre Daten (z.B. 10 Jahre für Buchhaltung).',
  },
  der1: {
    title: 'Sicherheitsereignis-Detektion aufbauen',
    description: 'Etablieren Sie Mechanismen zur Erkennung von Sicherheitsvorfällen nach BSI-Standard 200-4, DER.1: Log-Monitoring, Anomalieerkennung, Intrusion Detection.',
    firstStep: 'Aktivieren Sie Logging auf allen kritischen Systemen (Server, Firewalls, Domain Controller) und definieren Sie, wo Logs gesammelt werden.',
  },
  der2: {
    title: 'Incident-Response-Prozess etablieren',
    description: 'Implementieren Sie einen Incident-Response-Prozess nach BSI-Standard 200-4, DER.2.1 mit klaren Rollen, Eskalationswegen und Handlungsanweisungen für verschiedene Vorfalltypen.',
    firstStep: 'Erstellen Sie eine Incident-Response-Checkliste für die 3 häufigsten Vorfalltypen (z.B. Malware-Infektion, Datenverlust, Phishing).',
  },
  der3: {
    title: 'IT-Forensik-Fähigkeit aufbauen',
    description: 'Bereiten Sie Ihre Organisation auf forensische Untersuchungen vor nach BSI-Standard 200-4, DER.4: Beweissicherung, Chain of Custody, Analyse-Tools.',
    firstStep: 'Definieren Sie, wer im Ernstfall befugt ist, Systeme für forensische Zwecke zu sichern, und beschaffen Sie ein Forensik-USB-Toolkit.',
  },
  app1: {
    title: 'Standardsoftware sicher einsetzen',
    description: 'Härten Sie Standardsoftware (Office, Browser, PDF-Reader) nach BSI-Standard 200-2, APP.1.1. Deaktivieren Sie Makros, aktivieren Sie Auto-Updates, entfernen Sie unnötige Features.',
    firstStep: 'Erstellen Sie eine Härtungsrichtlinie für Microsoft Office: Makros nur aus vertrauenswürdigen Quellen, Protected View aktiv.',
  },
  app2: {
    title: 'Webbrowser absichern',
    description: 'Sichern Sie Webbrowser nach BSI-Standard 200-2, APP.1.2: Updates automatisieren, Plugins einschränken, Safe Browsing aktivieren, zentrale Browser-Policies ausrollen.',
    firstStep: 'Deaktivieren Sie unsichere Browser-Plugins (Flash, Java) auf allen Clients und aktivieren Sie automatische Browser-Updates.',
  },
  app3: {
    title: 'Webanwendungen absichern',
    description: 'Sichern Sie Ihre Webanwendungen nach BSI-Standard 200-2, APP.3.1: Input-Validierung, Output-Encoding, sichere Session-Verwaltung, HTTPS erzwingen.',
    firstStep: 'Führen Sie einen automatisierten Sicherheitsscan Ihrer wichtigsten Webanwendung durch (z.B. mit OWASP ZAP).',
  },
  sys1: {
    title: 'Server härten',
    description: 'Härten Sie Server nach BSI-Standard 200-2, SYS.1.1: Minimale Installation, unnötige Dienste deaktivieren, Härtungsbenchmarks (CIS) anwenden, Updates automatisieren.',
    firstStep: 'Erstellen Sie eine Checkliste mit allen laufenden Diensten auf Ihrem wichtigsten Server und prüfen Sie, welche wirklich benötigt werden.',
  },
  sys2: {
    title: 'Clients absichern',
    description: 'Sichern Sie Client-Systeme nach BSI-Standard 200-2, SYS.2.1: Vollverschlüsselung, sichere Baseline-Konfiguration, automatisches Patching, lokale Admin-Rechte entfernen.',
    firstStep: 'Aktivieren Sie BitLocker-Festplattenverschlüsselung auf allen Windows-Laptops oder FileVault auf macOS.',
  },
  sys3: {
    title: 'Mobile Geräte absichern (MDM)',
    description: 'Implementieren Sie Mobile Device Management (MDM) nach BSI-Standard 200-2, SYS.3.1: Geräteverschlüsselung, Remote Wipe, App-Whitelisting, Compliance-Checks.',
    firstStep: 'Evaluieren Sie MDM-Lösungen (z.B. Microsoft Intune, Jamf, MobileIron) und führen Sie einen Piloten mit 10 Geräten durch.',
  },
  net1: {
    title: 'Netzwerkarchitektur und Segmentierung umsetzen',
    description: 'Segmentieren Sie Ihr Netzwerk nach BSI-Standard 200-2, NET.1.1: VLANs für verschiedene Sicherheitszonen, DMZ für externe Dienste, Zugriffskontrollen zwischen Segmenten.',
    firstStep: 'Zeichnen Sie Ihre aktuelle Netzwerkarchitektur auf und identifizieren Sie, welche Systeme in unterschiedliche Sicherheitszonen gehören.',
  },
  net2: {
    title: 'Router und Switches härten',
    description: 'Härten Sie Netzwerkkomponenten nach BSI-Standard 200-2, NET.3.1: Standardpasswörter ändern, unnötige Dienste deaktivieren, Management-Zugriff absichern, Logging aktivieren.',
    firstStep: 'Ändern Sie alle Standardpasswörter auf Routern und Switches und deaktivieren Sie Telnet (nur SSH verwenden).',
  },
  net3: {
    title: 'TK-Anlagen absichern',
    description: 'Sichern Sie Telekommunikationsanlagen nach BSI-Standard 200-2, NET.4.1: Firmware-Updates, starke Authentifizierung, Netzwerksegmentierung für VoIP, Verschlüsselung.',
    firstStep: 'Prüfen Sie, ob Ihre TK-Anlage über das Internet erreichbar ist, und beschränken Sie den Zugriff auf notwendige IP-Adressen.',
  },
  inf1: {
    title: 'Gebäudesicherheit gewährleisten',
    description: 'Etablieren Sie physische Sicherheitsmaßnahmen nach BSI-Standard 200-2, INF.1: Zutrittskontrolle, Alarmanlage, Schließkonzept, Besuchermanagement.',
    firstStep: 'Erstellen Sie ein Schließkonzept: Wer hat Schlüssel/Zutrittskarten für welche Bereiche? Dokumentieren Sie Zugangsberechtigungen.',
  },
  inf2: {
    title: 'Rechenzentrum/Serverraum absichern',
    description: 'Sichern Sie Rechenzentrum oder Serverraum nach BSI-Standard 200-2, INF.2: Klimatisierung, USV, Brandschutz, Zugangskontrolle, Überwachung.',
    firstStep: 'Prüfen Sie, ob Ihr Serverraum über eine unterbrechungsfreie Stromversorgung (USV) verfügt und führen Sie einen Belastungstest durch.',
  },
  inf3: {
    title: 'Technische Räume schützen',
    description: 'Schützen Sie technische Räume (Netzwerkverteiler, Patchräume) nach BSI-Standard 200-2, INF.5: Verschlossen, klimatisiert, Zutrittskontrolle, dokumentierte Verkabelung.',
    firstStep: 'Stellen Sie sicher, dass alle Netzwerkverteiler verschlossen sind und nur autorisierte Personen Zugang haben.',
  },
  ind1: {
    title: 'ICS/OT-Sicherheitsstrategie etablieren',
    description: 'Etablieren Sie eine Sicherheitsstrategie für Industrial Control Systems (ICS) und Operational Technology (OT) nach BSI-Standard 200-2, IND.1. OT hat andere Anforderungen als IT (Verfügbarkeit vor Vertraulichkeit).',
    firstStep: 'Erstellen Sie ein Inventar aller ICS/SCADA-Systeme, Steuerungen und Sensoren in Ihrer Produktion.',
  },
  ind2: {
    title: 'SPS/PLC absichern',
    description: 'Sichern Sie speicherprogrammierbare Steuerungen (SPS/PLC) nach BSI-Standard 200-2, IND.2.1: Firmware-Updates, Netzwerksegmentierung, Zugriffsschutz, Projektdatei-Backup.',
    firstStep: 'Inventarisieren Sie alle SPS/PLC mit Hersteller, Modell und Firmware-Version und prüfen Sie verfügbare Updates.',
  },
  ind3: {
    title: 'Safety Instrumented Systems absichern',
    description: 'Sichern Sie sicherheitsgerichtete Systeme (Safety Instrumented Systems, SIS) nach BSI-Standard 200-2, IND.2.7: Strikte Trennung von Steuerung und Safety, redundante Auslegung, regelmäßige Tests.',
    firstStep: 'Prüfen Sie, ob Ihre SIS-Systeme physisch und logisch von der Produktionssteuerung getrennt sind.',
  },
};

function updateRecommendations() {
  console.log('📖 Reading de.json...');
  const deJson = JSON.parse(readFileSync(DE_JSON_PATH, 'utf-8'));

  let craCount = 0;
  let bsiCount = 0;

  // Update CRA recommendations
  if (deJson.cra && deJson.cra.recommendations) {
    console.log('\n🔧 Updating CRA recommendations...');
    for (const [key, value] of Object.entries(CRA_RECS)) {
      if (deJson.cra.recommendations[key]) {
        const existing = deJson.cra.recommendations[key];
        deJson.cra.recommendations[key] = {
          ...(existing.checklist ? { checklist: existing.checklist } : {}),
          description: value.description,
          firstStep: value.firstStep,
          title: value.title,
        };
        console.log(`  ✓ ${key}: ${value.title}`);
        craCount++;
      } else {
        console.log(`  ⚠ ${key}: NOT FOUND in de.json`);
      }
    }
  } else {
    console.log('❌ CRA recommendations section not found in de.json');
  }

  // Update BSI IT-Grundschutz recommendations
  if (deJson.bsiGrundschutz && deJson.bsiGrundschutz.recommendations) {
    console.log('\n🔧 Updating BSI IT-Grundschutz recommendations...');
    for (const [key, value] of Object.entries(BSI_RECS)) {
      if (deJson.bsiGrundschutz.recommendations[key]) {
        const existing = deJson.bsiGrundschutz.recommendations[key];
        deJson.bsiGrundschutz.recommendations[key] = {
          ...(existing.checklist ? { checklist: existing.checklist } : {}),
          description: value.description,
          firstStep: value.firstStep,
          title: value.title,
        };
        console.log(`  ✓ ${key}: ${value.title}`);
        bsiCount++;
      } else {
        console.log(`  ⚠ ${key}: NOT FOUND in de.json`);
      }
    }
  } else {
    console.log('❌ BSI IT-Grundschutz recommendations section not found in de.json');
  }

  console.log('\n💾 Writing updated de.json...');
  writeFileSync(DE_JSON_PATH, JSON.stringify(deJson, null, 2) + '\n', 'utf-8');

  console.log(`\n✅ Done!`);
  console.log(`   CRA: ${craCount}/24 recommendations updated`);
  console.log(`   BSI IT-Grundschutz: ${bsiCount}/30 recommendations updated`);
  console.log(`\n📄 File: ${DE_JSON_PATH}`);
}

updateRecommendations();
