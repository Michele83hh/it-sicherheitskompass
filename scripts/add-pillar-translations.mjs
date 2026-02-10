import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

const pillarTranslationsDE = {
  "pillars": {
    "title": "IT-Sicherheit in 8 Säulen",
    "subtitle": "128 praxisnahe Maßnahmen für Ihr Unternehmen — von Leitlinien bis Krisenmanagement. Jede Maßnahme erklärt das Problem, zeigt die Rechtslage und liefert die Lösung.",
    "pillarLabel": "Säule {number}",
    "componentCount": "{count} Maßnahmen",
    "componentsTitle": "{count} Maßnahmen in dieser Säule",
    "explore": "Entdecken",
    "interactive": "Interaktiv",
    "sections": {
      "scenario": "Praxis-Szenario",
      "legalBasis": "Rechtsfundament",
      "solution": "Lösung & Umsetzung",
      "benefit": "Ihr Mehrwert",
      "nextStep": "Nächster Schritt",
      "relatedComponents": "Verwandte Maßnahmen"
    },
    "1": {
      "name": "Leitlinien & Verantwortung",
      "description": "IT-Sicherheitspolicy, Schulungskonzept, Risikomanagement und die Rolle der Geschäftsleitung bei der Informationssicherheit.",
      "components": {
        "it-sicherheitspolicy": {
          "name": "IT-Sicherheitspolicy",
          "scenario": "Ein mittelständischer Maschinenbauer wird Opfer eines Ransomware-Angriffs. Bei der Analyse stellt sich heraus: Es gab keine dokumentierte IT-Sicherheitsrichtlinie. Mitarbeiter nutzten private USB-Sticks, Passwörter wurden geteilt, und niemand wusste, wer im Notfall verantwortlich ist. Der Schaden: 3 Wochen Produktionsausfall, 180.000 € direkte Kosten.\n\nOhne verbindliche IT-Sicherheitspolicy fehlt die Grundlage für alle weiteren Maßnahmen — und im Audit-Fall gibt es nichts vorzuweisen.",
          "solution": "1. Vorlage herunterladen und an Ihre Organisation anpassen (2-3 Seiten reichen)\n2. Kernpunkte definieren: Geltungsbereich, Verantwortlichkeiten, Passwort-Regeln, Umgang mit Datenträgern, Meldewege\n3. Geschäftsleitung unterschreiben lassen (rechtlich erforderlich nach NIS2)\n4. Allen Mitarbeitern bekannt machen (E-Mail + Intranet + Aushang)\n5. Jährliche Überprüfung und Aktualisierung einplanen",
          "benefit": "Eine dokumentierte IT-Sicherheitspolicy ist die Basis für jedes Audit und jede Zertifizierung. Sie reduziert das Haftungsrisiko der Geschäftsleitung erheblich und schafft klare Verhältnisse für alle Mitarbeiter. Versicherungen gewähren bis zu 10% Rabatt auf Cyber-Policen.",
          "nextStep": "Erstellen Sie Ihre IT-Sicherheitspolicy mit unserer 2-Seiten-Vorlage. Passen Sie die Vorlage an und lassen Sie sie von der Geschäftsleitung unterschreiben.",
          "legal": {
            "nis2": "Verpflichtung der Geschäftsleitung zur Billigung von Risikomanagementmaßnahmen",
            "dsgvo": "Verantwortung des Verantwortlichen für angemessene technische und organisatorische Maßnahmen",
            "tisax": "Informationssicherheitsleitlinie als Grundlage des ISMS",
            "bsi": "Sicherheitsleitlinie als Basis des Informationssicherheitsprozesses"
          }
        },
        "schulungskonzept": {
          "name": "Schulungskonzept",
          "scenario": "Eine Buchhalterin öffnet eine perfekt gefälschte E-Mail vom vermeintlichen Geschäftsführer und überweist 45.000 € auf ein fremdes Konto (CEO-Fraud). Der Grund: Kein einziger Mitarbeiter wurde jemals in IT-Sicherheit geschult. Phishing-Mails, Social Engineering und sichere Passwörter waren nie Thema.\n\n92% aller Cyberangriffe beginnen mit dem Faktor Mensch. Ohne Schulung sind Ihre Mitarbeiter das schwächste Glied.",
          "solution": "1. Jährliche Basis-Schulung (2h) für alle Mitarbeiter einplanen\n2. Inhalte: Phishing erkennen, sichere Passwörter, Meldewege, Social Engineering\n3. Quartalsmäßige Phishing-Simulation (kostenlose Tools: GoPhish, KnowBe4 Free)\n4. Neue Mitarbeiter: IT-Sicherheits-Einweisung am ersten Tag\n5. Ergebnisse dokumentieren (Teilnahmelisten, Testergebnisse)",
          "benefit": "Geschulte Mitarbeiter erkennen 70% mehr Phishing-Mails. Die Investition von 2 Stunden pro Jahr spart im Schnitt 50.000 € an verhinderten Vorfällen. Pflichtdokumentation für NIS2 und DSGVO-Audits.",
          "nextStep": "Planen Sie Ihre erste IT-Sicherheitsschulung. Nutzen Sie unsere Schulungsvorlage mit Agenda, Folien-Vorschlägen und Teilnahme-Dokumentation.",
          "legal": {
            "nis2": "Pflicht zu regelmäßigen Cybersicherheitsschulungen für alle Mitarbeiter",
            "dsgvo": "Sensibilisierung und Schulung der an Verarbeitungsvorgängen beteiligten Mitarbeiter",
            "bsi": "Sensibilisierung und Schulung zur Informationssicherheit"
          }
        },
        "risikomanagement": {
          "name": "Risikomanagement-Prozess",
          "scenario": "Ein Logistikunternehmen investiert 200.000 € in eine Next-Gen-Firewall, während die größte Bedrohung ein ungepatchter Legacy-Server im Keller ist, auf dem die gesamte Auftragsabwicklung läuft. Ohne systematisches Risikomanagement werden Budgets falsch verteilt und die wirklichen Schwachstellen übersehen.\n\nRisikomanagement bedeutet: Wissen, wo die echten Gefahren liegen — und dort zuerst investieren.",
          "solution": "1. Asset-Inventar erstellen: Alle kritischen Systeme, Daten und Prozesse auflisten\n2. Bedrohungen identifizieren: Was kann schiefgehen? (Ransomware, Ausfall, Datenverlust)\n3. Risiken bewerten: Eintrittswahrscheinlichkeit × Schadenshöhe (einfache Matrix)\n4. Maßnahmen priorisieren: Höchste Risiken zuerst behandeln\n5. Monatlicher 30-Minuten-Workshop: Status-Review und neue Risiken aufnehmen",
          "benefit": "Systematisches Risikomanagement spart durchschnittlich 40% des IT-Sicherheitsbudgets durch bessere Priorisierung. Es ist die Kernforderung von NIS2, DORA und BSI IT-Grundschutz — ohne Risikomanagement besteht kein Audit.",
          "nextStep": "Starten Sie mit unserem Risikobewertungs-Template (Excel). Erfassen Sie in 60 Minuten Ihre Top-10-Risiken und priorisieren Sie Ihre nächsten Maßnahmen.",
          "legal": {
            "nis2": "Konzept für Risikoanalyse und Sicherheit der Informationssysteme",
            "dsgvo": "Regelmäßige Überprüfung und Bewertung der Wirksamkeit technischer und organisatorischer Maßnahmen",
            "dora": "Umfassender IKT-Risikomanagementrahmen als Teil des Gesamtrisikomanagementsystems",
            "bsi": "Systematischer Risikomanagement-Prozess nach BSI-Standard 200-3"
          }
        }
      }
    },
    "2": {
      "name": "Zugriff & Identitäten",
      "description": "Multi-Faktor-Authentifizierung, rollenbasierte Zugriffskontrolle, Passwort-Hygiene und Identitätsmanagement für Ihre Organisation.",
      "components": {
        "mfa": {
          "name": "Multi-Faktor-Authentifizierung (MFA)",
          "scenario": "Ein IT-Dienstleister verliert den Zugang zu 200 Kundenservern, weil ein Administrator-Passwort bei einem Datenleck auftaucht. Der Angreifer loggt sich nachts ein und verschlüsselt alle Systeme. Mit aktivierter MFA wäre das Passwort allein wertlos gewesen.\n\n81% aller Datenschutzverletzungen nutzen gestohlene oder schwache Passwörter. MFA stoppt 99,9% dieser Angriffe.",
          "solution": "1. Kritische Systeme identifizieren: E-Mail, VPN, Cloud-Dienste, Admin-Zugänge\n2. MFA-Methode wählen: Authenticator-App (empfohlen), Hardware-Token (hochsicher), SMS (Minimum)\n3. Rollout planen: Admins zuerst, dann Führungskräfte, dann alle Mitarbeiter\n4. Recovery-Prozess definieren: Was passiert bei verlorenem Token?\n5. Enforcement: MFA als Pflicht konfigurieren, nicht optional",
          "benefit": "MFA reduziert Account-Kompromittierungen um 99,9%. Die Einrichtung dauert 15 Minuten pro Mitarbeiter und kostet mit Authenticator-Apps nichts. Pflicht für NIS2-regulierte Unternehmen.",
          "nextStep": "Aktivieren Sie MFA für Ihre Admin-Accounts noch heute. Starten Sie mit Microsoft Authenticator oder Google Authenticator — beide sind kostenlos.",
          "legal": {
            "nis2": "Multi-Faktor-Authentifizierung als Teil der Zugriffskontrolle",
            "dsgvo": "Angemessene Sicherheit der Verarbeitung einschließlich Zugriffskontrolle",
            "dora": "Strenge Authentifizierungsmechanismen für IKT-Systeme",
            "bsi": "Absicherung der Authentisierung bei Systemzugängen"
          }
        },
        "rbac": {
          "name": "Rollenbasierte Zugriffskontrolle (RBAC)",
          "scenario": "Ein Werkstudent im Marketing hat versehentlich Zugriff auf alle Finanzdaten, weil bei der Einstellung einfach die Berechtigungen eines ausgeschiedenen Controllers kopiert wurden. Als sein Laptop gestohlen wird, sind sämtliche Gehaltsdaten kompromittiert.\n\nDas Prinzip 'jeder hat Zugriff auf alles' ist der häufigste Fehler bei KMU — und der teuerste bei einem Vorfall.",
          "solution": "1. Rollen definieren: Geschäftsleitung, Abteilungsleiter, Sachbearbeiter, IT-Admin, Extern\n2. Pro Rolle: Welche Systeme und Daten werden tatsächlich benötigt?\n3. Rollenmatrix erstellen (Excel-Template nutzen)\n4. Berechtigungen in allen Systemen anpassen (AD, Cloud, ERP)\n5. Quartalsweise Review: Stimmen die Berechtigungen noch?",
          "benefit": "RBAC reduziert die Angriffsfläche bei Datenlecks um 60%. Im Vorfall sind nur die Daten der jeweiligen Rolle betroffen, nicht alles. Pflichtanforderung in allen IT-Sicherheitsstandards.",
          "nextStep": "Erstellen Sie Ihre Rollenmatrix mit unserem Excel-Template. Definieren Sie 5-7 Rollen und ordnen Sie Ihre Systeme zu.",
          "legal": {
            "nis2": "Konzepte für die Zugriffskontrolle und Anlagenmanagement",
            "dsgvo": "Zugriffsregelungen auf personenbezogene Daten nach dem Need-to-Know-Prinzip",
            "tisax": "Zugangs- und Zugriffsregelungen für Informationswerte",
            "bsi": "Regelung der Zugriffsrechte nach dem Minimalprinzip"
          }
        },
        "passwort-hygiene": {
          "name": "Passwort-Hygiene & -Policy",
          "scenario": "Ein Steuerberater nutzt 'Sommer2024!' für alle Mandantenportale. Als ein Portal gehackt wird, probiert der Angreifer das gleiche Passwort bei DATEV, Elster und der Kanzlei-Cloud — überall funktioniert es. Ergebnis: Steuerdaten von 300 Mandanten kompromittiert, Meldung an die Datenschutzaufsicht, existenzbedrohender Reputationsschaden.",
          "solution": "1. Passwort-Policy festlegen: Mindestens 14 Zeichen, keine Wörterbuchbegriffe\n2. Passwort-Manager einführen (Bitwarden Business, ab 3€/Nutzer/Monat)\n3. Automatische Prüfung gegen Leaked-Passwort-Datenbanken aktivieren\n4. Passwort-Rotation: Nur bei Verdacht auf Kompromittierung (nicht mehr zeitbasiert)\n5. Admin-Passwörter: 20+ Zeichen, separate Passwort-Tresore",
          "benefit": "Ein Passwort-Manager eliminiert Passwort-Wiederverwendung zu 100%. Mitarbeiter müssen sich nur noch ein Master-Passwort merken. Reduziert Helpdesk-Anfragen für Passwort-Resets um 50%.",
          "nextStep": "Führen Sie einen Passwort-Manager ein und erstellen Sie eine Passwort-Policy. Unsere Vorlage enthält fertige Regeln für Ihr Unternehmen.",
          "legal": {
            "nis2": "Sicherheit bei Erwerb, Entwicklung und Wartung von Systemen inkl. Zugangsschutz",
            "dsgvo": "Technische Maßnahmen zum Schutz personenbezogener Daten bei der Verarbeitung",
            "bsi": "Geregelte Passwortvergabe und angemessene Passwortqualität"
          }
        }
      }
    },
    "3": {
      "name": "Daten & Speicher",
      "description": "Backup-Strategien, Verschlüsselung, Datenklassifizierung und sichere Datenspeicherung für vertrauliche Unternehmensinformationen.",
      "components": {
        "backup-3-2-1": {
          "name": "3-2-1-Backup-Strategie",
          "scenario": "Eine Druckerei wird von Ransomware getroffen. Alle Dateien verschlüsselt, auch das Backup auf der Netzwerkfreigabe. Der einzige verbleibende Backup-Satz ist 8 Monate alt. Ergebnis: 45.000 € Lösegeldzahlung und trotzdem 3 Monate Datenrekonstruktion.\n\nDie 3-2-1-Regel verhindert genau dieses Szenario: 3 Kopien, 2 verschiedene Medien, 1 Kopie extern.",
          "solution": "1. Automatisches tägliches Backup auf lokalen Speicher (NAS oder Server)\n2. Zweite Kopie auf anderem Medium (externe Festplatte oder Band)\n3. Dritte Kopie extern: Cloud-Backup oder Off-Site-Rotation\n4. Monatlicher Restore-Test: Können Sie tatsächlich wiederherstellen?\n5. Backup-Verschlüsselung aktivieren und Schlüssel sicher verwahren",
          "benefit": "Die 3-2-1-Strategie macht Sie immun gegen Ransomware-Erpressung. Wiederherstellungszeit sinkt von Wochen auf Stunden. Cyber-Versicherungen fordern diese Strategie als Mindeststandard.",
          "nextStep": "Prüfen Sie Ihre aktuelle Backup-Situation mit unserer Checkliste und implementieren Sie die fehlenden Elemente der 3-2-1-Regel.",
          "legal": {
            "nis2": "Backup-Management und Wiederherstellungskonzepte als Teil der Risikomaßnahmen",
            "dsgvo": "Fähigkeit, die Verfügbarkeit und den Zugang zu personenbezogenen Daten rasch wiederherzustellen",
            "dora": "Leitlinien und Verfahren für Datensicherung und Wiederherstellung",
            "bsi": "Datensicherungskonzept mit regelmäßigen Tests"
          }
        },
        "verschluesselung": {
          "name": "Verschlüsselung",
          "scenario": "Einem Außendienstmitarbeiter wird der Laptop aus dem Auto gestohlen. Darauf: Kundenlisten, Angebote, Verträge. Ohne Festplattenverschlüsselung kann der Dieb alle Daten einfach auslesen. Ergebnis: Meldepflicht nach DSGVO Art. 33, Benachrichtigung aller betroffenen Kunden, Bußgeld 15.000 €.\n\nMit BitLocker (Windows) oder FileVault (Mac) wäre der Laptop wertlos gewesen.",
          "solution": "1. Festplattenverschlüsselung auf allen Endgeräten aktivieren (BitLocker/FileVault)\n2. USB-Sticks und externe Medien verschlüsseln (BitLocker To Go)\n3. E-Mail-Verschlüsselung für sensible Kommunikation (S/MIME oder PGP)\n4. Datenbankverschlüsselung für personenbezogene Daten (TDE)\n5. Recovery-Schlüssel zentral und sicher verwahren",
          "benefit": "Verschlüsselung macht Geräteverlust zu einem Ärgernis statt einer Katastrophe. Bei verschlüsselten Daten entfällt die DSGVO-Meldepflicht. Reduziert potenzielle Bußgelder um bis zu 90%.",
          "nextStep": "Aktivieren Sie BitLocker auf allen Windows-Geräten. In 15 Minuten ist Ihr erster Laptop geschützt.",
          "legal": {
            "nis2": "Einsatz von Kryptografie und Verschlüsselung als Sicherheitsmaßnahme",
            "dsgvo": "Verschlüsselung personenbezogener Daten als technische Schutzmaßnahme",
            "dora": "Schutz von IKT-Systemen und Daten durch Verschlüsselung",
            "bsi": "Kryptokonzept und Einsatz kryptografischer Verfahren"
          }
        },
        "datenklassifizierung": {
          "name": "Datenklassifizierung",
          "scenario": "Ein Praktikant teilt eine interne Preisliste auf LinkedIn, weil sie nicht als vertraulich gekennzeichnet war. Ein Wettbewerber nutzt die Information, um gezielt Kunden abzuwerben. Ohne Datenklassifizierung wissen Mitarbeiter nicht, welche Informationen wie geschützt werden müssen.\n\nJedes Unternehmen hat Daten in verschiedenen Schutzstufen — aber nur wenige machen das transparent.",
          "solution": "1. Vier Schutzstufen definieren: Öffentlich, Intern, Vertraulich, Streng vertraulich\n2. Label-System einführen (Fußzeile in Dokumenten, E-Mail-Tags)\n3. Pro Stufe: Wer darf zugreifen? Wie wird gespeichert? Wie wird geteilt?\n4. Bestehende Daten klassifizieren (Abteilungsleiter einbinden)\n5. Neue Dokumente: Klassifizierung wird Pflichtfeld",
          "benefit": "Datenklassifizierung verhindert versehentliche Datenlecks und ermöglicht gezielte Schutzmaßnahmen. Reduziert den Aufwand für Datenschutz um 30%, weil nicht alles mit höchster Stufe geschützt werden muss.",
          "nextStep": "Erstellen Sie Ihr Klassifizierungsschema mit unserem Template. Starten Sie mit den drei wichtigsten Abteilungen.",
          "legal": {
            "nis2": "Bestandsaufnahme und Schutz kritischer Informationswerte",
            "dsgvo": "Klassifizierung personenbezogener Daten nach Risiko und Schutzbedarf",
            "tisax": "Klassifizierung und Schutz von Informationswerten",
            "bsi": "Schutzbedarfsfeststellung und Klassifizierung von Informationen"
          }
        }
      }
    },
    "4": {
      "name": "Systeme & Betrieb",
      "description": "Patch-Management, Logging und SIEM, Schatten-IT-Management und sichere Systemadministration für den laufenden IT-Betrieb.",
      "components": {
        "patch-management": {
          "name": "Patch-Management",
          "scenario": "Dezember 2021: Die Log4Shell-Schwachstelle wird bekannt. Unternehmen mit funktionierendem Patch-Management hatten den Fix innerhalb von 72 Stunden eingespielt. Ein mittelständisches Handelsunternehmen ohne Prozess brauchte 4 Wochen — in dieser Zeit wurden ihre Systeme kompromittiert und Kundendaten gestohlen.\n\n60% aller erfolgreichen Angriffe nutzen bekannte Schwachstellen, für die bereits Patches existieren.",
          "solution": "1. Inventar aller Systeme und Software erstellen (automatisiert mit WSUS, Intune, oder Open Source)\n2. Kritische Patches: Innerhalb von 72h nach Veröffentlichung einspielen\n3. Reguläre Patches: Monatlicher Patch-Zyklus (z.B. erster Dienstag)\n4. Test-Umgebung: Patches vor Produktiv-Rollout kurz testen\n5. Legacy-Systeme: Isolieren wenn kein Patch möglich (Netzwerksegmentierung)",
          "benefit": "Regelmäßiges Patching verhindert 60% aller Cyberangriffe. Automatisiertes Patch-Management spart 10h/Woche Administrationsaufwand. Pflichtanforderung für NIS2 und CRA.",
          "nextStep": "Erstellen Sie Ihr Software-Inventar und definieren Sie Ihren Patch-Zyklus. Starten Sie mit den kritischsten Systemen.",
          "legal": {
            "nis2": "Sicherheit bei Erwerb, Entwicklung und Wartung von Systemen einschließlich Schwachstellenmanagement",
            "cra": "Pflicht zur Bereitstellung von Sicherheitsupdates über den gesamten Produktlebenszyklus",
            "dora": "Management und Dokumentation von Änderungen an IKT-Systemen",
            "bsi": "Regelmäßige Aktualisierung und Patch-Management für alle IT-Systeme"
          }
        },
        "logging-siem": {
          "name": "Logging & SIEM",
          "scenario": "Ein Unternehmen bemerkt nach 6 Monaten, dass ein Angreifer Zugriff auf den Mail-Server hatte. Die Frage der Forensiker: 'Zeigen Sie uns die Logs.' Antwort: 'Logs werden nach 7 Tagen überschrieben.' Ohne Protokollierung ist es unmöglich festzustellen, was gestohlen wurde, wie der Angreifer reinkam und ob er noch da ist.\n\nOhne Logs kein Nachweis. Ohne Nachweis keine Forensik. Ohne Forensik keine Versicherungsleistung.",
          "solution": "1. Zentrale Log-Sammlung einrichten (Syslog-Server, ELK Stack, oder Graylog)\n2. Mindestens protokollieren: Anmeldungen, Fehler, Änderungen, Netzwerkzugriffe\n3. Log-Aufbewahrung: Mindestens 6 Monate (NIS2-Empfehlung: 12 Monate)\n4. Alerting: Automatische Benachrichtigung bei verdächtigen Mustern\n5. Regelmäßige Log-Review: Wöchentlich die wichtigsten Alerts prüfen",
          "benefit": "Zentrale Protokollierung halbiert die Zeit zur Erkennung von Sicherheitsvorfällen (von 207 auf ~100 Tage). Logs sind die Grundlage für Forensik, Versicherungsansprüche und behördliche Meldungen.",
          "nextStep": "Richten Sie eine zentrale Log-Sammlung ein. Starten Sie mit Anmelde-Logs Ihrer kritischsten Systeme.",
          "legal": {
            "nis2": "Fähigkeit zur Erkennung und Bewältigung von Sicherheitsvorfällen",
            "dsgvo": "Nachweispflicht für angemessene Sicherheitsmaßnahmen",
            "dora": "Protokollierung und Überwachung von IKT-Operationen",
            "bsi": "Protokollierung sicherheitsrelevanter Ereignisse und Auswertung"
          }
        },
        "schatten-it": {
          "name": "Schatten-IT-Management",
          "scenario": "Der Marketing-Chef installiert einen KI-Übersetzer aus dem Internet, um Produkttexte für den französischen Markt zu erstellen. Der Dienst speichert alle eingegebenen Texte auf Servern in den USA — darunter unveröffentlichte Produktnamen und Preise. Drei Monate später tauchen die Daten bei der Konkurrenz auf.\n\nGleichzeitig: Ein Teamleiter nutzt ein kostenloses Projektmanagement-Tool. Kundendaten werden hochgeladen — DSGVO-Verstoß. Die Aufsichtsbehörde verhängt ein Bußgeld von 20.000 €.\n\nSchatten-IT: Software, die ohne Wissen der IT eingesetzt wird. In jedem Unternehmen durchschnittlich 5× mehr Apps als offiziell bekannt.",
          "solution": "1. Ist-Aufnahme: Netzwerk-Scan + Mitarbeiterbefragung — welche Tools werden wirklich genutzt?\n2. Freigabeprozess einführen: Einfaches Formular (Name, Zweck, Datenanforderungen, Kosten)\n3. Geschäftsführer-Freigabe für neue Software-Installationen\n4. Sicherheitscheck: VirusTotal-Scan, Datenschutzprüfung, Lizenzcheck\n5. Quartalsweiser Review: Welche Schatten-IT ist dazugekommen?\n6. Whitelist pflegen: Erlaubte Tools für jeden Einsatzbereich kommunizieren",
          "benefit": "Schatten-IT-Management reduziert unbekannte Risiken um 90%. Sie sparen Lizenzkosten durch Konsolidierung (oft 20-30% Einsparung). Nachweis für Audits: Kontrollierter Software-Einsatz. Cyber-Versicherungen gewähren bis zu 15% Rabatt.",
          "nextStep": "Führen Sie eine Schatten-IT-Inventur durch. Nutzen Sie unser Antragsformular und unsere Review-Checkliste als Vorlage.",
          "legal": {
            "nis2": "Sicherheit der Lieferkette einschließlich Bewertung eingesetzter Software und Dienste",
            "dsgvo": "Auftragsverarbeitung: Nur geprüfte und freigegebene Dienste für personenbezogene Daten",
            "cra": "Bewertung und Dokumentation eingesetzter Softwarekomponenten und deren Risiken",
            "tisax": "Kontrolle und Freigabe eingesetzter Informationsverarbeitungssysteme"
          }
        }
      }
    },
    "5": {
      "name": "Netzwerke & Perimeter",
      "description": "Firewall-Konfiguration, Netzwerksegmentierung, VPN-Absicherung und Schutz der Netzwerkgrenzen Ihrer Organisation.",
      "components": {
        "next-gen-firewall": {
          "name": "Next-Generation-Firewall",
          "scenario": "Ein Handwerksbetrieb nutzt eine 8 Jahre alte Fritzbox als einzige Firewall. Ein Angreifer nutzt eine bekannte Schwachstelle und gelangt ins Netzwerk. Von dort breitet er sich lateral aus — Fileserver, Buchhaltung, E-Mail-Server: alles kompromittiert.\n\nEine moderne NGFW erkennt nicht nur Ports, sondern Anwendungen und Bedrohungsmuster. Sie ist der Türsteher, der nicht nur den Ausweis prüft, sondern auch das Verhalten beobachtet.",
          "solution": "1. NGFW auswählen: OPNsense (kostenlos), Sophos XGS, FortiGate (KMU-Modelle ab 500€)\n2. Grundregeln: Deny-All als Default, nur explizit erlaubte Verbindungen\n3. IDS/IPS aktivieren: Einbruchserkennung und -verhinderung\n4. Geo-Blocking: Länder blockieren, mit denen kein Geschäftsverkehr besteht\n5. Regelmäßige Regel-Review: Vierteljährlich veraltete Regeln entfernen",
          "benefit": "Eine NGFW blockiert 95% der automatisierten Angriffe. IDS/IPS erkennt Anomalien in Echtzeit. OPNsense als Open-Source-Lösung kostet nur die Hardware (~300€). Pflichtanforderung für NIS2-regulierte Unternehmen.",
          "nextStep": "Evaluieren Sie Ihre aktuelle Firewall-Lösung. Prüfen Sie, ob IDS/IPS aktiviert ist und ob die Regeln aktuell sind.",
          "legal": {
            "nis2": "Netzwerksicherheit und Schutz der Kommunikationsinfrastruktur",
            "dora": "Schutzmechanismen für Netzwerke und Kommunikationskanäle",
            "bsi": "Absicherung der Netzübergänge und Firewalling",
            "kritis": "Schutz kritischer Infrastrukturkomponenten vor Netzwerkangriffen"
          }
        },
        "segmentierung": {
          "name": "Netzwerksegmentierung",
          "scenario": "Ein Produktionsbetrieb hat IT und OT im selben Netzwerk. Ein Mitarbeiter öffnet eine infizierte E-Mail — der Trojaner verbreitet sich nicht nur auf Büro-PCs, sondern auch auf die Maschinensteuerung. Produktionsstillstand für 2 Wochen, Schaden: 500.000 €.\n\nNetzwerksegmentierung ist wie Brandschutztüren: Ein Feuer in der Küche muss nicht das ganze Gebäude zerstören.",
          "solution": "1. Netzwerkzonen definieren: Office, Server, Produktion/OT, Gäste-WLAN, IoT\n2. VLANs einrichten: Jede Zone ein eigenes VLAN\n3. Firewall-Regeln zwischen Zonen: Nur notwendige Kommunikation erlauben\n4. Management-Netz separieren: Admin-Zugriffe nur aus dedizierten Netzen\n5. Netzwerkplan dokumentieren und aktuell halten",
          "benefit": "Segmentierung begrenzt die Ausbreitung von Angriffen auf eine Zone. Reduziert den Schaden bei Vorfällen um durchschnittlich 70%. Pflichtanforderung für KRITIS-Betreiber und NIS2.",
          "nextStep": "Zeichnen Sie Ihren aktuellen Netzwerkplan und identifizieren Sie fehlende Segmentierungen. Starten Sie mit der Trennung von Gäste-WLAN und Produktionsnetz.",
          "legal": {
            "nis2": "Netzwerksegmentierung als Teil der Risikomaßnahmen",
            "kritis": "Trennung von IT- und OT-Netzwerken in kritischen Infrastrukturen",
            "dora": "Segmentierung von IKT-Netzwerken zur Schadensbegrenzung",
            "bsi": "Netzwerksegmentierung und kontrollierte Netzübergänge"
          }
        },
        "vpn": {
          "name": "VPN & Remote-Zugang",
          "scenario": "Ein Vertriebsmitarbeiter nutzt im Hotel-WLAN den Webmail-Zugang ohne VPN. Ein Angreifer im selben Netzwerk fängt die Login-Daten ab (Man-in-the-Middle). Mit diesen Daten loggt er sich ins CRM-System ein und exportiert 5.000 Kundendatensätze.\n\nJeder Remote-Zugriff ohne VPN ist wie eine Postkarte: Jeder auf dem Weg kann mitlesen.",
          "solution": "1. VPN-Lösung wählen: WireGuard (modern, schnell), OpenVPN (bewährt), oder IPsec\n2. VPN als Pflicht für jeden Remote-Zugriff auf Firmenressourcen\n3. Split-Tunneling deaktivieren: Gesamter Traffic über VPN\n4. Zertifikatsbasierte Authentifizierung + MFA\n5. VPN-Gateway regelmäßig patchen (häufiges Angriffsziel!)",
          "benefit": "VPN verschlüsselt den gesamten Datenverkehr und schützt vor Abhören. WireGuard ist einfach einzurichten und kostenlos. Remote-Arbeit wird sicher möglich, ohne Produktivitätsverlust.",
          "nextStep": "Richten Sie WireGuard auf Ihrem Router oder einer VM ein. In 30 Minuten haben Sie einen sicheren Remote-Zugang.",
          "legal": {
            "nis2": "Sicherheit der Kommunikation und verschlüsselte Datenübertragung",
            "dsgvo": "Sichere Übermittlung personenbezogener Daten über öffentliche Netze",
            "dora": "Sichere Kommunikationskanäle für IKT-Systeme",
            "bsi": "Absicherung von Fernzugriffen und VPN-Verbindungen"
          }
        }
      }
    },
    "6": {
      "name": "Anwendungen & Cloud",
      "description": "Shared Responsibility, Software Bill of Materials (SBOM), API-Sicherheit und Cloud-Audit für sichere Anwendungslandschaften.",
      "components": {
        "shared-responsibility": {
          "name": "Shared Responsibility & Cloud-Audit",
          "scenario": "Ein Online-Shop migriert in die Cloud. Der Geschäftsführer geht davon aus: 'Amazon kümmert sich um die Sicherheit.' Sechs Monate später: Kundendaten geleakt, weil die S3-Buckets öffentlich zugänglich waren. AWS haftet nicht — die Verantwortung für Datenzugriff liegt beim Kunden.\n\n'Der Provider sichert die Hardware, Sie sichern Ihre Daten.' Diesen Satz verstehen 70% der KMU nicht — bis es zu spät ist.",
          "solution": "1. Shared-Responsibility-Modell verstehen (siehe interaktives Diagramm oben)\n2. Pro Cloud-Dienst dokumentieren: Was sichert der Provider, was wir?\n3. IAM-Rechte prüfen: Wer hat Zugriff auf Cloud-Ressourcen? Least Privilege!\n4. Logging aktivieren: CloudTrail (AWS), Activity Log (Azure), Cloud Audit (GCP)\n5. Vierteljährlicher Cloud-Audit: Offene Ports, öffentliche Ressourcen, ungenutzte Accounts",
          "benefit": "Ein klares Verantwortungsmodell verhindert die häufigsten Cloud-Fehlkonfigurationen (Ursache für 80% der Cloud-Datenlecks). Der vierteljährliche Audit findet Schwachstellen, bevor Angreifer sie finden.",
          "nextStep": "Nutzen Sie das interaktive Diagramm oben, um Ihr Verantwortungsmodell zu verstehen. Dann: Cloud-Audit-Checkliste abarbeiten.",
          "legal": {
            "nis2": "Sicherheit der Lieferkette und Bewertung von Drittanbietern",
            "dsgvo": "Auftragsverarbeitung in der Cloud mit dokumentierter Verantwortungsabgrenzung",
            "dora": "Überwachung von IKT-Drittdienstleistern und deren Sicherheitsmaßnahmen",
            "cra": "Sicherheitsanforderungen an eingesetzte Cloud-Dienste und Plattformen"
          }
        },
        "sbom": {
          "name": "Software Bill of Materials (SBOM)",
          "scenario": "Log4Shell (2021) betraf Millionen Systeme. Die erste Frage: 'Nutzen wir Log4j?' Unternehmen ohne SBOM brauchten Wochen zur Klärung. Mit SBOM: Ein Blick ins Inventar, sofortige Klarheit.\n\nEin SBOM ist die Zutatenliste Ihrer Software — Sie wissen genau, welche Bibliotheken in Ihren Produkten stecken und ob eine davon verwundbar ist.",
          "solution": "1. SBOM-Generator einsetzen: CycloneDX, Syft, oder GitHub Dependency Graph\n2. Für jedes Produkt / jede Anwendung ein SBOM erstellen\n3. Automatische Schwachstellen-Prüfung: SBOM gegen CVE-Datenbanken abgleichen\n4. In CI/CD-Pipeline integrieren: Bei jedem Build neues SBOM generieren\n5. SBOMs dokumentieren und für Audits bereithalten",
          "benefit": "SBOMs reduzieren die Reaktionszeit auf neue Schwachstellen von Wochen auf Minuten. Ab 2027 Pflicht für alle Produkte mit digitalen Elementen (CRA). Frühzeitige Einführung verschafft Wettbewerbsvorteil.",
          "nextStep": "Generieren Sie Ihr erstes SBOM mit Syft oder dem GitHub Dependency Graph. Prüfen Sie es gegen die CVE-Datenbank.",
          "legal": {
            "nis2": "Schwachstellenmanagement und Kenntnis eingesetzter Softwarekomponenten",
            "cra": "Pflicht zur Erstellung und Pflege einer SBOM für Produkte mit digitalen Elementen",
            "dora": "Dokumentation eingesetzter IKT-Systeme und deren Abhängigkeiten",
            "bsi": "Inventarisierung und Dokumentation eingesetzter Software"
          }
        },
        "api-sicherheit": {
          "name": "API-Sicherheit",
          "scenario": "Ein Fintech-Startup bietet eine Bezahl-API an. Ein Sicherheitsforscher entdeckt: Durch Manipulation der API-Parameter lassen sich Kontostände anderer Nutzer abfragen. Die API hatte keine Rate-Limitierung, kein Input-Validation und keine Authentifizierung für sensible Endpunkte.\n\nAPIs sind die Hintertür moderner Anwendungen — und oft weit offen.",
          "solution": "1. Authentifizierung: OAuth 2.0 für alle API-Endpunkte\n2. Rate-Limiting: Max. Anfragen pro Minute pro Client begrenzen\n3. Input-Validation: Alle Parameter validieren (Typ, Länge, Format)\n4. OWASP API Security Top 10 als Checkliste nutzen\n5. API-Gateway einsetzen: Zentrales Monitoring und Zugriffskontrolle",
          "benefit": "Sichere APIs verhindern Datenlecks und Missbrauch. Rate-Limiting stoppt automatisierte Angriffe. OWASP-konforme APIs bestehen Penetrationstests und reduzieren die Angriffsfläche um 80%.",
          "nextStep": "Prüfen Sie Ihre APIs gegen die OWASP API Security Top 10. Implementieren Sie OAuth 2.0 und Rate-Limiting als erste Schritte.",
          "legal": {
            "nis2": "Sicherheit bei Entwicklung und Wartung von Informationssystemen",
            "dsgvo": "Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen",
            "dora": "Sicherheitsanforderungen an IKT-Schnittstellen und Datenströme",
            "bsi": "Sichere Entwicklung und Betrieb von Webanwendungen und APIs"
          }
        }
      }
    },
    "7": {
      "name": "Endgeräte & Mobile",
      "description": "Mobile Device Management, Endpoint Detection & Response, BYOD-Regelungen und Schutz aller Endgeräte im Unternehmen.",
      "components": {
        "mdm": {
          "name": "Mobile Device Management (MDM)",
          "scenario": "Einem Mitarbeiter wird das Firmenhandy mit allen E-Mails, Kontakten und Zugangsdaten gestohlen. Ohne MDM gibt es keine Möglichkeit, das Gerät aus der Ferne zu löschen. Drei Tage später werden über den E-Mail-Account Phishing-Mails an Kunden versendet.\n\nMDM = Fernsteuerung für Firmengeräte. Löschen, Sperren, Orten — in Sekunden.",
          "solution": "1. MDM-Lösung auswählen: Microsoft Intune (in M365 Business enthalten), Jamf, oder MobileIron\n2. Alle Firmengeräte registrieren: Laptops, Smartphones, Tablets\n3. Policies konfigurieren: Bildschirmsperre, Verschlüsselung, App-Whitelist\n4. Remote-Wipe einrichten: Gerät aus der Ferne löschbar machen\n5. Automatische Compliance-Checks: Geräte ohne Updates = kein Zugriff",
          "benefit": "MDM ermöglicht Remote-Wipe in unter 60 Sekunden. Verlorene Geräte werden zum Nicht-Ereignis statt zur Katastrophe. Intune ist in vielen Microsoft 365 Business-Plänen bereits enthalten.",
          "nextStep": "Aktivieren Sie Microsoft Intune oder eine vergleichbare MDM-Lösung. Starten Sie mit den Geräten der Geschäftsleitung.",
          "legal": {
            "nis2": "Sicherheitsmanagement für mobile Endgeräte und Remote-Zugriffe",
            "dsgvo": "Schutz personenbezogener Daten auf mobilen Endgeräten",
            "tisax": "Absicherung mobiler Endgeräte und deren Verwaltung",
            "bsi": "Regelungen für mobile Endgeräte und Telearbeit"
          }
        },
        "endpoint-detection": {
          "name": "Endpoint Detection & Response (EDR)",
          "scenario": "Ein klassischer Virenscanner meldet: 'Keine Bedrohung gefunden.' Gleichzeitig verschlüsselt eine dateilose Ransomware im Hintergrund den Server — der Scanner erkennt sie nicht, weil kein klassischer Virus im Spiel ist.\n\nEDR geht über traditionelle Antivirus hinaus: Es erkennt verdächtiges Verhalten statt nur bekannte Signaturen. Wie eine Überwachungskamera, die nicht nur nach bekannten Gesichtern sucht, sondern verdächtiges Verhalten meldet.",
          "solution": "1. EDR-Lösung evaluieren: CrowdStrike, SentinelOne, oder Microsoft Defender for Endpoint\n2. Auf allen Endgeräten und Servern ausrollen\n3. Alerting konfigurieren: Wer wird benachrichtigt? Eskalationspfad definieren\n4. Response-Playbooks: Was tun bei verschiedenen Alert-Typen?\n5. Regelmäßige Tuning: False Positives reduzieren, neue Bedrohungsmuster aufnehmen",
          "benefit": "EDR erkennt 99% der modernen Bedrohungen, die klassische Scanner übersehen. Automatische Isolation kompromittierter Endgeräte in Sekunden. Microsoft Defender for Endpoint ist in M365 E5 enthalten.",
          "nextStep": "Evaluieren Sie Microsoft Defender for Endpoint oder CrowdStrike Falcon Go. Starten Sie mit einem Pilotrollout auf 10 Geräten.",
          "legal": {
            "nis2": "Systeme zur Angriffserkennung und -abwehr auf Endgeräten",
            "dora": "Erkennung anomaler Aktivitäten auf IKT-Systemen",
            "bsi": "Schutz vor Schadprogrammen auf allen IT-Systemen",
            "kritis": "Einsatz von Systemen zur Angriffserkennung (SzA)"
          }
        },
        "byod": {
          "name": "BYOD-Separation",
          "scenario": "Mitarbeiter nutzen private Smartphones für dienstliche E-Mails. Das Kind lädt ein infiziertes Spiel herunter — der Trojaner greift auf die Firmen-E-Mails zu und exfiltriert Kundendaten. Oder umgekehrt: Bei einer Kündigung löscht die IT das gesamte Gerät — inklusive privater Fotos.\n\nBYOD ohne Container-Lösung = Privates und Dienstliches vermischt. Risiko für beide Seiten.",
          "solution": "1. Container-Lösung einsetzen: Microsoft Intune App Protection, Samsung Knox, oder Workspace ONE\n2. Dienstliche Apps in separatem Container: E-Mail, Kalender, Dateien\n3. Klare Policy: Was darf das Unternehmen auf privaten Geräten? Was nicht?\n4. Bei Austritt: Nur Container löschen, private Daten bleiben\n5. Mindestanforderungen: Aktuelles OS, Bildschirmsperre, kein Root/Jailbreak",
          "benefit": "Container-Lösungen ermöglichen sicheres BYOD ohne Privatsphäre-Eingriff. Spart Gerätekosten (200-500€ pro Mitarbeiter). Klare Trennung schützt bei Kündigung beide Seiten.",
          "nextStep": "Definieren Sie Ihre BYOD-Policy und wählen Sie eine Container-Lösung. Intune App Protection ist in vielen M365-Plänen enthalten.",
          "legal": {
            "nis2": "Sicherheitsrichtlinien für den Einsatz privater Endgeräte",
            "dsgvo": "Schutz personenbezogener Daten auf privaten Endgeräten der Mitarbeiter",
            "tisax": "Regelungen für den Einsatz privater Endgeräte (BYOD)",
            "bsi": "Nutzung privater IT-Geräte für dienstliche Zwecke"
          }
        }
      }
    },
    "8": {
      "name": "Resilienz & Krisen",
      "description": "Incident Response Plan, Melde-Timer, Business Continuity, Pentests und Krisenmanagement für den Ernstfall.",
      "components": {
        "incident-response": {
          "name": "Incident Response Plan & Melde-Timer",
          "scenario": "Freitagabend, 22:00 Uhr: Der Admin entdeckt verschlüsselte Dateien auf dem Server. Ransomware. Was jetzt?\n\nOhne Plan: Panik, hektische Anrufe, falsche Entscheidungen. Server werden abgeschaltet statt isoliert, Beweise werden zerstört, die Meldung an die Behörde kommt zu spät. Bußgeld: 100.000 €.\n\nMit Plan: Ruhiges Abarbeiten der Checkliste. Systeme isolieren, Forensik sichern, Behörde innerhalb von 24h informieren. Wiederherstellung aus Backup am Montag.\n\nDer Unterschied: Ein getesteter Plan.",
          "solution": "1. Incident Response Team definieren: Wer wird angerufen? (IT-Leiter, GF, Datenschutz, ggf. extern)\n2. Kommunikationsplan: Telefonnummern (nicht nur E-Mail!), Eskalationswege\n3. Erste-Hilfe-Maßnahmen: Isolieren (nicht abschalten!), Screenshots, Logs sichern\n4. Meldefristen kennen und einhalten (siehe Melde-Timer oben)\n5. Vorlagen vorbereiten: Erstmeldung, Detailmeldung, Abschlussbericht\n6. Jährliche Übung: Planspiel mit simuliertem Vorfall (Tabletop Exercise)",
          "benefit": "Ein getesteter IRP reduziert die Schadenshöhe um durchschnittlich 60% und die Wiederherstellungszeit um 70%. Meldefristen werden eingehalten — keine Bußgelder. Versicherungen verlangen einen IRP als Mindeststandard.",
          "nextStep": "Erstellen Sie Ihren Incident Response Plan mit unserer Vorlage. Definieren Sie Ihr Team und testen Sie den Plan mit einem Planspiel.",
          "legal": {
            "nis2": "Bewältigung von Sicherheitsvorfällen mit Erstmeldung binnen 24h",
            "dsgvo": "Meldung von Datenschutzverletzungen an die Aufsichtsbehörde binnen 72h",
            "dora": "IKT-bezogenes Vorfallmanagement mit Erstmeldung binnen 4h",
            "kritis": "Meldepflicht für erhebliche Störungen an das BSI"
          }
        },
        "business-continuity": {
          "name": "Business Continuity Plan (BCP)",
          "scenario": "Ein Hochwasser flutet das Rechenzentrum eines Logistikunternehmens. Alle Server unter Wasser. Ohne BCP: 3 Wochen Totalausfall, Kunden wechseln zur Konkurrenz, 2 Millionen € Umsatzverlust.\n\nMit BCP: Cloud-Failover springt an, Mitarbeiter arbeiten von zu Hause, Kundenkommunikation läuft über vorbereitete Kanäle. Produktivität nach 4 Stunden bei 80%.\n\nDer BCP ist Ihre Antwort auf: 'Was, wenn alles ausfällt?'",
          "solution": "1. Kritische Geschäftsprozesse identifizieren: Was muss in 4h/24h/72h wieder laufen?\n2. RTO festlegen: Recovery Time Objective pro System (maximale Ausfallzeit)\n3. RPO festlegen: Recovery Point Objective (maximaler Datenverlust in Stunden)\n4. Wiederherstellungspläne pro kritischem System dokumentieren\n5. Alternative Arbeitsplätze und Kommunikationswege vorbereiten\n6. Halbjährlicher BCP-Test: Stimmen RTO/RPO mit der Realität überein?",
          "benefit": "Ein BCP reduziert Ausfallzeiten um 60-80%. Unternehmen mit BCP überleben Krisenereignisse zu 90%, ohne nur zu 50%. Pflichtanforderung für NIS2, KRITIS und DORA.",
          "nextStep": "Identifizieren Sie Ihre 5 kritischsten Geschäftsprozesse und definieren Sie RTO/RPO für jeden. Nutzen Sie unsere BCP-Vorlage.",
          "legal": {
            "nis2": "Aufrechterhaltung des Betriebs und Krisenmanagement",
            "dora": "Geschäftsfortführungsleitlinie und IKT-Notfallpläne",
            "kritis": "Aufrechterhaltung der kritischen Dienstleistung",
            "bsi": "Notfallmanagement und Business Continuity nach BSI-Standard 200-4"
          }
        },
        "pentests": {
          "name": "Penetrationstests",
          "scenario": "Ein Online-Händler lässt erstmals einen Penetrationstest durchführen. Ergebnis: In 2 Stunden hat der Tester Admin-Zugriff auf den Shop und die Kundendatenbank. SQL-Injection, Standard-Passwörter, fehlende Updates — alles offensichtlich, aber intern nie überprüft.\n\nPenetrationstests sind der ehrlichste Spiegel Ihrer IT-Sicherheit: Ein ethischer Hacker zeigt Ihnen, was ein Krimineller finden würde.",
          "solution": "1. Scope definieren: Was wird getestet? (Extern, intern, Web-Apps, Social Engineering)\n2. Anbieter auswählen: BSI-zertifiziert oder CREST-akkreditiert bevorzugen\n3. Zeitrahmen: Externer Test 3-5 Tage, interner Test 5-10 Tage\n4. Ergebnisse priorisieren: Kritisch → Hoch → Mittel → Niedrig\n5. Nachtest: 3 Monate nach Behebung kritischer Findings erneut testen\n6. Budget: Ab 5.000 € für externen Test, ab 10.000 € für umfassenden internen + externen Test",
          "benefit": "Pentests finden Schwachstellen, bevor Angreifer sie ausnutzen. Der ROI: Ein verhinderter Vorfall spart im Schnitt 50-100× die Testkosten. DORA fordert bedrohungsbasierte Tests (TLPT) für Finanzunternehmen.",
          "nextStep": "Holen Sie Angebote von 2-3 Pentesting-Anbietern ein. Starten Sie mit einem externen Test Ihrer Webpräsenz.",
          "legal": {
            "nis2": "Bewertung der Wirksamkeit von Sicherheitsmaßnahmen durch Tests",
            "dora": "Bedrohungsbasierte Penetrationstests (TLPT) für kritische Finanzunternehmen",
            "bsi": "Regelmäßige Überprüfung der Sicherheitsmaßnahmen durch Audits und Tests",
            "tisax": "Prüfung der Wirksamkeit von Informationssicherheitsmaßnahmen"
          }
        }
      }
    },
    "timer": {
      "title": "Melde-Timer — Vorfall-Countdown",
      "selectType": "Vorfalltyp auswählen:",
      "startButton": "Vorfall entdeckt — Timer starten",
      "resetButton": "Timer zurücksetzen",
      "elapsed": "Vergangene Zeit seit Entdeckung",
      "expired": "FRIST ABGELAUFEN",
      "types": {
        "ransomware": "Ransomware",
        "dataLeak": "Datenleck",
        "ddos": "DDoS-Angriff",
        "phishing": "Phishing/CEO-Fraud"
      },
      "deadlines": {
        "doraInitial": "DORA Erstmeldung",
        "doraInitialDesc": "Erstmeldung bei Finanzaufsicht",
        "nis2Initial": "NIS2 Erstmeldung (24h)",
        "nis2InitialDesc": "Frühwarnung an zuständige Behörde",
        "dsgvo72h": "DSGVO Meldung (72h)",
        "dsgvo72hDesc": "Meldung an Datenschutzaufsicht",
        "nis2Detail": "NIS2 Detailmeldung (72h)",
        "nis2DetailDesc": "Bewertung mit Schweregrad und Auswirkungen",
        "nis2Final": "NIS2 Abschlussbericht (1 Monat)",
        "nis2FinalDesc": "Abschließende Bewertung und Maßnahmenreport"
      }
    },
    "sharedResp": {
      "title": "Shared Responsibility Model",
      "subtitle": "Wer ist wofür verantwortlich? Wählen Sie Ihr Cloud-Modell.",
      "models": {
        "onPrem": "On-Premises",
        "iaas": "IaaS",
        "paas": "PaaS",
        "saas": "SaaS"
      },
      "layers": {
        "applications": "Anwendungen",
        "data": "Daten",
        "runtime": "Laufzeitumgebung",
        "middleware": "Middleware",
        "os": "Betriebssystem",
        "virtualization": "Virtualisierung",
        "servers": "Server",
        "storage": "Speicher",
        "networking": "Netzwerk",
        "physical": "Physische Sicherheit"
      },
      "legend": {
        "customer": "Ihr Unternehmen",
        "provider": "Cloud-Provider",
        "shared": "Geteilte Verantwortung"
      }
    }
  }
};

const pillarTranslationsEN = {
  "pillars": {
    "title": "IT Security in 8 Pillars",
    "subtitle": "128 practical measures for your business — from governance to crisis management. Each measure explains the problem, shows the legal landscape, and delivers the solution.",
    "pillarLabel": "Pillar {number}",
    "componentCount": "{count} measures",
    "componentsTitle": "{count} measures in this pillar",
    "explore": "Explore",
    "interactive": "Interactive",
    "sections": {
      "scenario": "Real-World Scenario",
      "legalBasis": "Legal Foundation",
      "solution": "Solution & Implementation",
      "benefit": "Your Benefit",
      "nextStep": "Next Step",
      "relatedComponents": "Related Measures"
    },
    "1": {
      "name": "Governance & Responsibility",
      "description": "IT security policy, training concept, risk management, and the role of management in information security.",
      "components": {
        "it-sicherheitspolicy": {
          "name": "IT Security Policy",
          "scenario": "A mid-size machinery manufacturer falls victim to a ransomware attack. Investigation reveals: there was no documented IT security policy. Employees used personal USB drives, passwords were shared, and nobody knew who was responsible in an emergency. The damage: 3 weeks of production downtime, €180,000 in direct costs.\n\nWithout a binding IT security policy, there's no foundation for any further measures — and nothing to show in an audit.",
          "solution": "1. Download template and adapt to your organization (2-3 pages suffice)\n2. Define key points: scope, responsibilities, password rules, media handling, reporting channels\n3. Have management sign it (legally required under NIS2)\n4. Communicate to all employees (email + intranet + bulletin board)\n5. Schedule annual review and update",
          "benefit": "A documented IT security policy is the foundation for every audit and certification. It significantly reduces management liability and creates clear guidelines for all employees. Insurers offer up to 10% discount on cyber policies.",
          "nextStep": "Create your IT security policy with our 2-page template. Customize it and have management sign it.",
          "legal": {
            "nis2": "Management obligation to approve risk management measures",
            "dsgvo": "Controller responsibility for appropriate technical and organizational measures",
            "tisax": "Information security policy as the foundation of the ISMS",
            "bsi": "Security policy as the basis of the information security process"
          }
        },
        "schulungskonzept": {
          "name": "Training Concept",
          "scenario": "An accountant opens a perfectly forged email from the supposed CEO and transfers €45,000 to a foreign account (CEO fraud). The reason: not a single employee had ever been trained in IT security. Phishing emails, social engineering, and secure passwords were never a topic.\n\n92% of all cyberattacks start with the human factor. Without training, your employees are the weakest link.",
          "solution": "1. Schedule annual basic training (2h) for all employees\n2. Content: recognizing phishing, secure passwords, reporting channels, social engineering\n3. Quarterly phishing simulation (free tools: GoPhish, KnowBe4 Free)\n4. New employees: IT security briefing on day one\n5. Document results (attendance lists, test scores)",
          "benefit": "Trained employees detect 70% more phishing emails. The 2-hour annual investment saves an average of €50,000 in prevented incidents. Mandatory documentation for NIS2 and GDPR audits.",
          "nextStep": "Plan your first IT security training. Use our training template with agenda, slide suggestions, and attendance documentation.",
          "legal": {
            "nis2": "Obligation for regular cybersecurity training for all employees",
            "dsgvo": "Awareness and training of employees involved in processing operations",
            "bsi": "Information security awareness and training"
          }
        },
        "risikomanagement": {
          "name": "Risk Management Process",
          "scenario": "A logistics company invests €200,000 in a next-gen firewall while the biggest threat is an unpatched legacy server in the basement running the entire order processing. Without systematic risk management, budgets are misallocated and real vulnerabilities are overlooked.\n\nRisk management means: knowing where the real dangers lie — and investing there first.",
          "solution": "1. Create asset inventory: list all critical systems, data, and processes\n2. Identify threats: what can go wrong? (Ransomware, outage, data loss)\n3. Assess risks: probability × impact (simple matrix)\n4. Prioritize measures: address highest risks first\n5. Monthly 30-minute workshop: status review and add new risks",
          "benefit": "Systematic risk management saves an average of 40% of IT security budget through better prioritization. It's the core requirement of NIS2, DORA, and BSI IT-Grundschutz — without risk management, no audit passes.",
          "nextStep": "Start with our risk assessment template (Excel). Capture your top 10 risks and prioritize your next measures in 60 minutes.",
          "legal": {
            "nis2": "Risk analysis concept and information systems security",
            "dsgvo": "Regular review and evaluation of the effectiveness of technical and organizational measures",
            "dora": "Comprehensive ICT risk management framework as part of overall risk management",
            "bsi": "Systematic risk management process per BSI Standard 200-3"
          }
        }
      }
    },
    "2": {
      "name": "Access & Identities",
      "description": "Multi-factor authentication, role-based access control, password hygiene, and identity management for your organization.",
      "components": {
        "mfa": {
          "name": "Multi-Factor Authentication (MFA)",
          "scenario": "An IT service provider loses access to 200 customer servers because an admin password appears in a data breach. The attacker logs in at night and encrypts all systems. With MFA enabled, the password alone would have been worthless.\n\n81% of all data breaches exploit stolen or weak passwords. MFA stops 99.9% of these attacks.",
          "solution": "1. Identify critical systems: email, VPN, cloud services, admin access\n2. Choose MFA method: authenticator app (recommended), hardware token (high security), SMS (minimum)\n3. Plan rollout: admins first, then management, then all employees\n4. Define recovery process: what happens with a lost token?\n5. Enforcement: configure MFA as mandatory, not optional",
          "benefit": "MFA reduces account compromises by 99.9%. Setup takes 15 minutes per employee and costs nothing with authenticator apps. Mandatory for NIS2-regulated companies.",
          "nextStep": "Enable MFA for your admin accounts today. Start with Microsoft Authenticator or Google Authenticator — both are free.",
          "legal": {
            "nis2": "Multi-factor authentication as part of access control",
            "dsgvo": "Appropriate security of processing including access control",
            "dora": "Strong authentication mechanisms for ICT systems",
            "bsi": "Securing authentication for system access"
          }
        },
        "rbac": {
          "name": "Role-Based Access Control (RBAC)",
          "scenario": "A working student in marketing accidentally has access to all financial data because the permissions of a departed controller were simply copied during onboarding. When his laptop is stolen, all salary data is compromised.\n\nThe principle of 'everyone has access to everything' is the most common mistake in SMEs — and the most expensive in an incident.",
          "solution": "1. Define roles: management, department heads, staff, IT admin, external\n2. Per role: which systems and data are actually needed?\n3. Create role matrix (use Excel template)\n4. Adjust permissions in all systems (AD, cloud, ERP)\n5. Quarterly review: are permissions still appropriate?",
          "benefit": "RBAC reduces the attack surface in data breaches by 60%. In an incident, only the data of the respective role is affected, not everything. Mandatory requirement in all IT security standards.",
          "nextStep": "Create your role matrix with our Excel template. Define 5-7 roles and map your systems.",
          "legal": {
            "nis2": "Access control and asset management concepts",
            "dsgvo": "Access regulations for personal data on a need-to-know basis",
            "tisax": "Access control regulations for information assets",
            "bsi": "Regulation of access rights according to the principle of least privilege"
          }
        },
        "passwort-hygiene": {
          "name": "Password Hygiene & Policy",
          "scenario": "A tax consultant uses 'Summer2024!' for all client portals. When one portal is hacked, the attacker tries the same password on DATEV, Elster, and the firm's cloud — it works everywhere. Result: tax data of 300 clients compromised, notification to the data protection authority, existential reputational damage.",
          "solution": "1. Set password policy: minimum 14 characters, no dictionary words\n2. Deploy password manager (Bitwarden Business, from €3/user/month)\n3. Enable automatic checking against leaked password databases\n4. Password rotation: only on suspected compromise (no longer time-based)\n5. Admin passwords: 20+ characters, separate password vaults",
          "benefit": "A password manager eliminates password reuse 100%. Employees only need to remember one master password. Reduces helpdesk password reset requests by 50%.",
          "nextStep": "Deploy a password manager and create a password policy. Our template contains ready-made rules for your business.",
          "legal": {
            "nis2": "System security including access protection during acquisition, development, and maintenance",
            "dsgvo": "Technical measures for protecting personal data during processing",
            "bsi": "Regulated password assignment and appropriate password quality"
          }
        }
      }
    },
    "3": {
      "name": "Data & Storage",
      "description": "Backup strategies, encryption, data classification, and secure data storage for confidential business information.",
      "components": {
        "backup-3-2-1": {
          "name": "3-2-1 Backup Strategy",
          "scenario": "A print shop is hit by ransomware. All files encrypted, including the backup on the network share. The only remaining backup set is 8 months old. Result: €45,000 ransom payment and still 3 months of data reconstruction.\n\nThe 3-2-1 rule prevents exactly this scenario: 3 copies, 2 different media, 1 copy offsite.",
          "solution": "1. Automatic daily backup to local storage (NAS or server)\n2. Second copy on different medium (external hard drive or tape)\n3. Third copy offsite: cloud backup or off-site rotation\n4. Monthly restore test: can you actually recover?\n5. Enable backup encryption and securely store keys",
          "benefit": "The 3-2-1 strategy makes you immune to ransomware extortion. Recovery time drops from weeks to hours. Cyber insurers require this strategy as a minimum standard.",
          "nextStep": "Check your current backup situation with our checklist and implement the missing elements of the 3-2-1 rule.",
          "legal": {
            "nis2": "Backup management and recovery concepts as part of risk measures",
            "dsgvo": "Ability to restore availability and access to personal data promptly",
            "dora": "Guidelines and procedures for data backup and recovery",
            "bsi": "Data backup concept with regular testing"
          }
        },
        "verschluesselung": {
          "name": "Encryption",
          "scenario": "A field sales representative has their laptop stolen from their car. On it: customer lists, quotes, contracts. Without disk encryption, the thief can simply read all data. Result: mandatory GDPR Art. 33 notification, notification of all affected customers, €15,000 fine.\n\nWith BitLocker (Windows) or FileVault (Mac), the laptop would have been worthless.",
          "solution": "1. Enable disk encryption on all endpoints (BitLocker/FileVault)\n2. Encrypt USB drives and external media (BitLocker To Go)\n3. Email encryption for sensitive communications (S/MIME or PGP)\n4. Database encryption for personal data (TDE)\n5. Store recovery keys centrally and securely",
          "benefit": "Encryption turns device loss from catastrophe to inconvenience. With encrypted data, GDPR notification requirements may not apply. Reduces potential fines by up to 90%.",
          "nextStep": "Enable BitLocker on all Windows devices. Your first laptop is protected in 15 minutes.",
          "legal": {
            "nis2": "Use of cryptography and encryption as a security measure",
            "dsgvo": "Encryption of personal data as a technical protection measure",
            "dora": "Protection of ICT systems and data through encryption",
            "bsi": "Crypto concept and use of cryptographic procedures"
          }
        },
        "datenklassifizierung": {
          "name": "Data Classification",
          "scenario": "An intern shares an internal price list on LinkedIn because it wasn't marked as confidential. A competitor uses the information to poach customers. Without data classification, employees don't know which information needs what level of protection.\n\nEvery company has data at different protection levels — but few make this transparent.",
          "solution": "1. Define four protection levels: Public, Internal, Confidential, Strictly Confidential\n2. Implement labeling system (document footers, email tags)\n3. Per level: who may access? How is it stored? How is it shared?\n4. Classify existing data (involve department heads)\n5. New documents: classification becomes mandatory field",
          "benefit": "Data classification prevents accidental data leaks and enables targeted protection measures. Reduces data protection effort by 30% because not everything needs the highest protection level.",
          "nextStep": "Create your classification scheme with our template. Start with the three most important departments.",
          "legal": {
            "nis2": "Inventory and protection of critical information assets",
            "dsgvo": "Classification of personal data by risk and protection needs",
            "tisax": "Classification and protection of information assets",
            "bsi": "Protection needs assessment and classification of information"
          }
        }
      }
    },
    "4": {
      "name": "Systems & Operations",
      "description": "Patch management, logging and SIEM, shadow IT management, and secure system administration for ongoing IT operations.",
      "components": {
        "patch-management": {
          "name": "Patch Management",
          "scenario": "December 2021: The Log4Shell vulnerability is disclosed. Companies with functioning patch management had the fix deployed within 72 hours. A mid-size retail company without a process took 4 weeks — during which their systems were compromised and customer data stolen.\n\n60% of all successful attacks exploit known vulnerabilities for which patches already exist.",
          "solution": "1. Create inventory of all systems and software (automated with WSUS, Intune, or open source)\n2. Critical patches: deploy within 72h of release\n3. Regular patches: monthly patch cycle (e.g., first Tuesday)\n4. Test environment: briefly test patches before production rollout\n5. Legacy systems: isolate if patching impossible (network segmentation)",
          "benefit": "Regular patching prevents 60% of all cyberattacks. Automated patch management saves 10h/week of admin effort. Mandatory requirement for NIS2 and CRA.",
          "nextStep": "Create your software inventory and define your patch cycle. Start with the most critical systems.",
          "legal": {
            "nis2": "System security during acquisition, development, and maintenance including vulnerability management",
            "cra": "Obligation to provide security updates throughout the product lifecycle",
            "dora": "Management and documentation of changes to ICT systems",
            "bsi": "Regular updating and patch management for all IT systems"
          }
        },
        "logging-siem": {
          "name": "Logging & SIEM",
          "scenario": "A company discovers after 6 months that an attacker had access to the mail server. The forensics team asks: 'Show us the logs.' Answer: 'Logs are overwritten after 7 days.' Without logging, it's impossible to determine what was stolen, how the attacker got in, and whether they're still there.\n\nNo logs, no evidence. No evidence, no forensics. No forensics, no insurance payout.",
          "solution": "1. Set up central log collection (syslog server, ELK Stack, or Graylog)\n2. Minimum logging: logins, errors, changes, network access\n3. Log retention: minimum 6 months (NIS2 recommendation: 12 months)\n4. Alerting: automatic notification on suspicious patterns\n5. Regular log review: check the most important alerts weekly",
          "benefit": "Central logging halves the time to detect security incidents (from 207 to ~100 days). Logs are the foundation for forensics, insurance claims, and regulatory reporting.",
          "nextStep": "Set up central log collection. Start with login logs from your most critical systems.",
          "legal": {
            "nis2": "Ability to detect and manage security incidents",
            "dsgvo": "Accountability for appropriate security measures",
            "dora": "Logging and monitoring of ICT operations",
            "bsi": "Logging of security-relevant events and analysis"
          }
        },
        "schatten-it": {
          "name": "Shadow IT Management",
          "scenario": "The marketing director installs an AI translator from the internet to create product texts for the French market. The service stores all entered texts on US servers — including unreleased product names and prices. Three months later, the data appears at a competitor.\n\nMeanwhile: a team leader uses a free project management tool. Customer data is uploaded — GDPR violation. The supervisory authority imposes a €20,000 fine.\n\nShadow IT: software used without IT's knowledge. On average, every company has 5× more apps than officially known.",
          "solution": "1. Inventory: network scan + employee survey — which tools are actually being used?\n2. Implement approval process: simple form (name, purpose, data requirements, costs)\n3. Management approval for new software installations\n4. Security check: VirusTotal scan, privacy review, license check\n5. Quarterly review: what new shadow IT has appeared?\n6. Maintain whitelist: communicate approved tools for each use case",
          "benefit": "Shadow IT management reduces unknown risks by 90%. You save license costs through consolidation (often 20-30% savings). Audit evidence: controlled software usage. Cyber insurers grant up to 15% discount.",
          "nextStep": "Conduct a shadow IT inventory. Use our application form and review checklist as templates.",
          "legal": {
            "nis2": "Supply chain security including assessment of deployed software and services",
            "dsgvo": "Data processing: only verified and approved services for personal data",
            "cra": "Assessment and documentation of deployed software components and their risks",
            "tisax": "Control and approval of deployed information processing systems"
          }
        }
      }
    },
    "5": {
      "name": "Networks & Perimeter",
      "description": "Firewall configuration, network segmentation, VPN security, and protection of your organization's network boundaries.",
      "components": {
        "next-gen-firewall": {
          "name": "Next-Generation Firewall",
          "scenario": "A craft business uses an 8-year-old consumer router as its only firewall. An attacker exploits a known vulnerability and enters the network. From there, they spread laterally — file server, accounting, email server: everything compromised.\n\nA modern NGFW recognizes not just ports but applications and threat patterns. It's the bouncer who doesn't just check IDs but also watches behavior.",
          "solution": "1. Choose NGFW: OPNsense (free), Sophos XGS, FortiGate (SME models from €500)\n2. Basic rules: deny-all as default, only explicitly allowed connections\n3. Enable IDS/IPS: intrusion detection and prevention\n4. Geo-blocking: block countries with no business relationships\n5. Regular rule review: remove outdated rules quarterly",
          "benefit": "An NGFW blocks 95% of automated attacks. IDS/IPS detects anomalies in real time. OPNsense as open-source costs only hardware (~€300). Mandatory for NIS2-regulated companies.",
          "nextStep": "Evaluate your current firewall solution. Check if IDS/IPS is enabled and if rules are up to date.",
          "legal": {
            "nis2": "Network security and protection of communication infrastructure",
            "dora": "Protection mechanisms for networks and communication channels",
            "bsi": "Securing network transitions and firewalling",
            "kritis": "Protection of critical infrastructure components from network attacks"
          }
        },
        "segmentierung": {
          "name": "Network Segmentation",
          "scenario": "A manufacturing plant has IT and OT in the same network. An employee opens an infected email — the trojan spreads not only to office PCs but also to machine controls. Production standstill for 2 weeks, damage: €500,000.\n\nNetwork segmentation is like fire doors: a fire in the kitchen doesn't have to destroy the whole building.",
          "solution": "1. Define network zones: office, server, production/OT, guest WiFi, IoT\n2. Set up VLANs: each zone gets its own VLAN\n3. Firewall rules between zones: allow only necessary communication\n4. Separate management network: admin access only from dedicated networks\n5. Document network plan and keep it up to date",
          "benefit": "Segmentation limits the spread of attacks to one zone. Reduces damage in incidents by an average of 70%. Mandatory for KRITIS operators and NIS2.",
          "nextStep": "Draw your current network plan and identify missing segmentation. Start with separating guest WiFi and production network.",
          "legal": {
            "nis2": "Network segmentation as part of risk measures",
            "kritis": "Separation of IT and OT networks in critical infrastructure",
            "dora": "Segmentation of ICT networks for damage limitation",
            "bsi": "Network segmentation and controlled network transitions"
          }
        },
        "vpn": {
          "name": "VPN & Remote Access",
          "scenario": "A sales rep uses hotel WiFi to access webmail without VPN. An attacker on the same network intercepts login credentials (man-in-the-middle). With these credentials, they log into the CRM system and export 5,000 customer records.\n\nEvery remote access without VPN is like a postcard: everyone along the way can read it.",
          "solution": "1. Choose VPN solution: WireGuard (modern, fast), OpenVPN (proven), or IPsec\n2. VPN mandatory for every remote access to company resources\n3. Disable split tunneling: route all traffic through VPN\n4. Certificate-based authentication + MFA\n5. Regularly patch VPN gateway (frequent attack target!)",
          "benefit": "VPN encrypts all data traffic and protects against eavesdropping. WireGuard is easy to set up and free. Remote work becomes securely possible without productivity loss.",
          "nextStep": "Set up WireGuard on your router or a VM. You'll have secure remote access in 30 minutes.",
          "legal": {
            "nis2": "Communication security and encrypted data transmission",
            "dsgvo": "Secure transmission of personal data over public networks",
            "dora": "Secure communication channels for ICT systems",
            "bsi": "Securing remote access and VPN connections"
          }
        }
      }
    },
    "6": {
      "name": "Applications & Cloud",
      "description": "Shared responsibility, Software Bill of Materials (SBOM), API security, and cloud auditing for secure application landscapes.",
      "components": {
        "shared-responsibility": {
          "name": "Shared Responsibility & Cloud Audit",
          "scenario": "An online shop migrates to the cloud. The CEO assumes: 'Amazon takes care of security.' Six months later: customer data leaked because S3 buckets were publicly accessible. AWS is not liable — responsibility for data access lies with the customer.\n\n'The provider secures the hardware, you secure your data.' 70% of SMEs don't understand this sentence — until it's too late.",
          "solution": "1. Understand the shared responsibility model (see interactive diagram above)\n2. Document per cloud service: what does the provider secure, what do we?\n3. Review IAM rights: who has access to cloud resources? Least privilege!\n4. Enable logging: CloudTrail (AWS), Activity Log (Azure), Cloud Audit (GCP)\n5. Quarterly cloud audit: open ports, public resources, unused accounts",
          "benefit": "A clear responsibility model prevents the most common cloud misconfigurations (cause of 80% of cloud data breaches). The quarterly audit finds vulnerabilities before attackers do.",
          "nextStep": "Use the interactive diagram above to understand your responsibility model. Then: work through the cloud audit checklist.",
          "legal": {
            "nis2": "Supply chain security and assessment of third-party providers",
            "dsgvo": "Data processing in the cloud with documented responsibility boundaries",
            "dora": "Monitoring of ICT third-party service providers and their security measures",
            "cra": "Security requirements for deployed cloud services and platforms"
          }
        },
        "sbom": {
          "name": "Software Bill of Materials (SBOM)",
          "scenario": "Log4Shell (2021) affected millions of systems. The first question: 'Do we use Log4j?' Companies without SBOM needed weeks to clarify. With SBOM: one look at the inventory, instant clarity.\n\nAn SBOM is the ingredient list of your software — you know exactly which libraries are in your products and whether any are vulnerable.",
          "solution": "1. Deploy SBOM generator: CycloneDX, Syft, or GitHub Dependency Graph\n2. Create an SBOM for each product/application\n3. Automatic vulnerability check: match SBOM against CVE databases\n4. Integrate into CI/CD pipeline: generate new SBOM with each build\n5. Document SBOMs and keep available for audits",
          "benefit": "SBOMs reduce response time to new vulnerabilities from weeks to minutes. Mandatory for all products with digital elements from 2027 (CRA). Early adoption provides competitive advantage.",
          "nextStep": "Generate your first SBOM with Syft or GitHub Dependency Graph. Check it against the CVE database.",
          "legal": {
            "nis2": "Vulnerability management and knowledge of deployed software components",
            "cra": "Obligation to create and maintain an SBOM for products with digital elements",
            "dora": "Documentation of deployed ICT systems and their dependencies",
            "bsi": "Inventory and documentation of deployed software"
          }
        },
        "api-sicherheit": {
          "name": "API Security",
          "scenario": "A fintech startup offers a payment API. A security researcher discovers: by manipulating API parameters, account balances of other users can be queried. The API had no rate limiting, no input validation, and no authentication for sensitive endpoints.\n\nAPIs are the backdoor of modern applications — and often wide open.",
          "solution": "1. Authentication: OAuth 2.0 for all API endpoints\n2. Rate limiting: limit max requests per minute per client\n3. Input validation: validate all parameters (type, length, format)\n4. Use OWASP API Security Top 10 as checklist\n5. Deploy API gateway: central monitoring and access control",
          "benefit": "Secure APIs prevent data leaks and abuse. Rate limiting stops automated attacks. OWASP-compliant APIs pass penetration tests and reduce the attack surface by 80%.",
          "nextStep": "Check your APIs against the OWASP API Security Top 10. Implement OAuth 2.0 and rate limiting as first steps.",
          "legal": {
            "nis2": "Security in development and maintenance of information systems",
            "dsgvo": "Data protection by design and by default",
            "dora": "Security requirements for ICT interfaces and data flows",
            "bsi": "Secure development and operation of web applications and APIs"
          }
        }
      }
    },
    "7": {
      "name": "Endpoints & Mobile",
      "description": "Mobile device management, endpoint detection & response, BYOD policies, and protection of all enterprise endpoints.",
      "components": {
        "mdm": {
          "name": "Mobile Device Management (MDM)",
          "scenario": "An employee's company phone with all emails, contacts, and access credentials is stolen. Without MDM, there's no way to remotely wipe the device. Three days later, phishing emails are sent to customers via the email account.\n\nMDM = remote control for company devices. Wipe, lock, locate — in seconds.",
          "solution": "1. Choose MDM solution: Microsoft Intune (included in M365 Business), Jamf, or MobileIron\n2. Register all company devices: laptops, smartphones, tablets\n3. Configure policies: screen lock, encryption, app whitelist\n4. Set up remote wipe: make device remotely erasable\n5. Automatic compliance checks: devices without updates = no access",
          "benefit": "MDM enables remote wipe in under 60 seconds. Lost devices become non-events instead of disasters. Intune is included in many Microsoft 365 Business plans.",
          "nextStep": "Enable Microsoft Intune or a comparable MDM solution. Start with management devices.",
          "legal": {
            "nis2": "Security management for mobile devices and remote access",
            "dsgvo": "Protection of personal data on mobile devices",
            "tisax": "Securing mobile devices and their management",
            "bsi": "Regulations for mobile devices and telework"
          }
        },
        "endpoint-detection": {
          "name": "Endpoint Detection & Response (EDR)",
          "scenario": "A classic antivirus reports: 'No threat found.' Meanwhile, fileless ransomware encrypts the server in the background — the scanner doesn't detect it because no classic virus is involved.\n\nEDR goes beyond traditional antivirus: it detects suspicious behavior instead of just known signatures. Like a security camera that doesn't just look for known faces but reports suspicious behavior.",
          "solution": "1. Evaluate EDR solution: CrowdStrike, SentinelOne, or Microsoft Defender for Endpoint\n2. Deploy on all endpoints and servers\n3. Configure alerting: who gets notified? Define escalation path\n4. Response playbooks: what to do for different alert types?\n5. Regular tuning: reduce false positives, add new threat patterns",
          "benefit": "EDR detects 99% of modern threats that classic scanners miss. Automatic isolation of compromised endpoints in seconds. Microsoft Defender for Endpoint is included in M365 E5.",
          "nextStep": "Evaluate Microsoft Defender for Endpoint or CrowdStrike Falcon Go. Start with a pilot rollout on 10 devices.",
          "legal": {
            "nis2": "Attack detection and defense systems on endpoints",
            "dora": "Detection of anomalous activities on ICT systems",
            "bsi": "Protection against malware on all IT systems",
            "kritis": "Deployment of attack detection systems (SzA)"
          }
        },
        "byod": {
          "name": "BYOD Separation",
          "scenario": "Employees use personal smartphones for business email. A child downloads an infected game — the trojan accesses business emails and exfiltrates customer data. Or the reverse: upon termination, IT wipes the entire device — including personal photos.\n\nBYOD without container solution = personal and business mixed. Risk for both sides.",
          "solution": "1. Deploy container solution: Microsoft Intune App Protection, Samsung Knox, or Workspace ONE\n2. Business apps in separate container: email, calendar, files\n3. Clear policy: what can the company do on personal devices? What not?\n4. On departure: only delete container, personal data stays\n5. Minimum requirements: current OS, screen lock, no root/jailbreak",
          "benefit": "Container solutions enable secure BYOD without privacy intrusion. Saves device costs (€200-500 per employee). Clear separation protects both sides upon termination.",
          "nextStep": "Define your BYOD policy and choose a container solution. Intune App Protection is included in many M365 plans.",
          "legal": {
            "nis2": "Security policies for the use of personal devices",
            "dsgvo": "Protection of personal data on employees' personal devices",
            "tisax": "Regulations for the use of personal devices (BYOD)",
            "bsi": "Use of personal IT devices for business purposes"
          }
        }
      }
    },
    "8": {
      "name": "Resilience & Crisis",
      "description": "Incident response plan, reporting timer, business continuity, penetration testing, and crisis management for emergencies.",
      "components": {
        "incident-response": {
          "name": "Incident Response Plan & Reporting Timer",
          "scenario": "Friday evening, 10:00 PM: the admin discovers encrypted files on the server. Ransomware. What now?\n\nWithout a plan: panic, frantic calls, wrong decisions. Servers are shut down instead of isolated, evidence is destroyed, the authority notification arrives too late. Fine: €100,000.\n\nWith a plan: calm execution of the checklist. Isolate systems, secure forensics, notify authority within 24h. Restore from backup on Monday.\n\nThe difference: a tested plan.",
          "solution": "1. Define incident response team: who gets called? (IT lead, CEO, DPO, external if needed)\n2. Communication plan: phone numbers (not just email!), escalation paths\n3. First aid measures: isolate (don't shut down!), screenshots, secure logs\n4. Know and comply with reporting deadlines (see reporting timer above)\n5. Prepare templates: initial report, detailed report, final report\n6. Annual exercise: tabletop exercise with simulated incident",
          "benefit": "A tested IRP reduces damage by an average of 60% and recovery time by 70%. Reporting deadlines are met — no fines. Insurers require an IRP as minimum standard.",
          "nextStep": "Create your incident response plan with our template. Define your team and test the plan with a tabletop exercise.",
          "legal": {
            "nis2": "Incident handling with initial notification within 24h",
            "dsgvo": "Notification of data breaches to the supervisory authority within 72h",
            "dora": "ICT-related incident management with initial notification within 4h",
            "kritis": "Reporting obligation for significant disruptions to BSI"
          }
        },
        "business-continuity": {
          "name": "Business Continuity Plan (BCP)",
          "scenario": "A flood inundates a logistics company's data center. All servers underwater. Without BCP: 3 weeks total outage, customers switch to competitors, €2 million revenue loss.\n\nWith BCP: cloud failover kicks in, employees work from home, customer communication runs through prepared channels. Productivity at 80% after 4 hours.\n\nThe BCP is your answer to: 'What if everything fails?'",
          "solution": "1. Identify critical business processes: what must run again in 4h/24h/72h?\n2. Set RTO: Recovery Time Objective per system (maximum downtime)\n3. Set RPO: Recovery Point Objective (maximum data loss in hours)\n4. Document recovery plans per critical system\n5. Prepare alternative workplaces and communication channels\n6. Semi-annual BCP test: do RTO/RPO match reality?",
          "benefit": "A BCP reduces downtime by 60-80%. Companies with BCP survive crisis events at 90%, without only at 50%. Mandatory for NIS2, KRITIS, and DORA.",
          "nextStep": "Identify your 5 most critical business processes and define RTO/RPO for each. Use our BCP template.",
          "legal": {
            "nis2": "Business continuity and crisis management",
            "dora": "Business continuity policy and ICT emergency plans",
            "kritis": "Maintenance of critical services",
            "bsi": "Emergency management and business continuity per BSI Standard 200-4"
          }
        },
        "pentests": {
          "name": "Penetration Testing",
          "scenario": "An online retailer commissions a penetration test for the first time. Result: within 2 hours, the tester has admin access to the shop and customer database. SQL injection, default passwords, missing updates — all obvious but never checked internally.\n\nPenetration tests are the most honest mirror of your IT security: an ethical hacker shows you what a criminal would find.",
          "solution": "1. Define scope: what gets tested? (External, internal, web apps, social engineering)\n2. Choose provider: prefer BSI-certified or CREST-accredited\n3. Timeline: external test 3-5 days, internal test 5-10 days\n4. Prioritize results: critical → high → medium → low\n5. Retest: 3 months after fixing critical findings, test again\n6. Budget: from €5,000 for external test, from €10,000 for comprehensive internal + external",
          "benefit": "Pentests find vulnerabilities before attackers exploit them. The ROI: one prevented incident saves on average 50-100× the test cost. DORA requires threat-led penetration testing (TLPT) for financial companies.",
          "nextStep": "Get quotes from 2-3 pentesting providers. Start with an external test of your web presence.",
          "legal": {
            "nis2": "Assessment of the effectiveness of security measures through testing",
            "dora": "Threat-led penetration testing (TLPT) for critical financial companies",
            "bsi": "Regular review of security measures through audits and tests",
            "tisax": "Testing the effectiveness of information security measures"
          }
        }
      }
    },
    "timer": {
      "title": "Reporting Timer — Incident Countdown",
      "selectType": "Select incident type:",
      "startButton": "Incident discovered — Start timer",
      "resetButton": "Reset timer",
      "elapsed": "Time elapsed since discovery",
      "expired": "DEADLINE EXPIRED",
      "types": {
        "ransomware": "Ransomware",
        "dataLeak": "Data Breach",
        "ddos": "DDoS Attack",
        "phishing": "Phishing/CEO Fraud"
      },
      "deadlines": {
        "doraInitial": "DORA Initial Report",
        "doraInitialDesc": "Initial report to financial authority",
        "nis2Initial": "NIS2 Initial Report (24h)",
        "nis2InitialDesc": "Early warning to competent authority",
        "dsgvo72h": "GDPR Notification (72h)",
        "dsgvo72hDesc": "Notification to data protection authority",
        "nis2Detail": "NIS2 Detail Report (72h)",
        "nis2DetailDesc": "Assessment with severity and impact",
        "nis2Final": "NIS2 Final Report (1 month)",
        "nis2FinalDesc": "Final assessment and measures report"
      }
    },
    "sharedResp": {
      "title": "Shared Responsibility Model",
      "subtitle": "Who is responsible for what? Choose your cloud model.",
      "models": {
        "onPrem": "On-Premises",
        "iaas": "IaaS",
        "paas": "PaaS",
        "saas": "SaaS"
      },
      "layers": {
        "applications": "Applications",
        "data": "Data",
        "runtime": "Runtime",
        "middleware": "Middleware",
        "os": "Operating System",
        "virtualization": "Virtualization",
        "servers": "Servers",
        "storage": "Storage",
        "networking": "Networking",
        "physical": "Physical Security"
      },
      "legend": {
        "customer": "Your Company",
        "provider": "Cloud Provider",
        "shared": "Shared Responsibility"
      }
    }
  }
};

// Merge into existing files
for (const [lang, translations] of [['de', pillarTranslationsDE], ['en', pillarTranslationsEN]]) {
  const filePath = join(ROOT, 'src', 'messages', `${lang}.json`);
  const existing = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Deep merge pillars key
  existing.pillars = translations.pillars;

  writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
  console.log(`✓ Updated ${lang}.json with pillar translations`);
}

// Also add navigation key for "Wissen"
for (const [lang, label] of [['de', 'Wissen'], ['en', 'Knowledge']]) {
  const filePath = join(ROOT, 'src', 'messages', `${lang}.json`);
  const existing = JSON.parse(readFileSync(filePath, 'utf-8'));

  if (existing.navigation) {
    existing.navigation.wissen = label;
  }

  writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
  console.log(`✓ Added navigation.wissen to ${lang}.json`);
}

console.log('\nDone! Pillar translations added to both language files.');
