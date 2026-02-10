const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'messages', 'de.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Replace DORA questions with specific content
data.dora.questions = {
  daQ1: {
    help: "Bewerten Sie, ob Ihr Unternehmen ueber eine umfassende Strategie zum Management von IKT-Drittanbieterrisiken verfuegt. Dies beinhaltet die Identifizierung aller IKT-Drittdienstleister, eine Risikobewertung vor Vertragsabschluss und die laufende Ueberwachung der Dienstleistungsqualitaet.",
    maturity: {
      level0: "Keine systematische Erfassung oder Steuerung von IKT-Drittanbieterrisiken \u2014 kein Ueberblick ueber ausgelagerte IKT-Dienstleistungen",
      level1: "Wichtigste IKT-Drittanbieter bekannt, jedoch keine strukturierte Risikobewertung oder laufende Ueberwachung etabliert",
      level2: "Vollstaendige Drittanbieter-Strategie mit dokumentierter Risikobewertung, Informationsregister nach Art. 28 Abs. 3 DORA und regelmaessiger Ueberpruefung",
      level3: "Integriertes IKT-Drittanbieter-Risikomanagement mit automatisiertem Monitoring, Fruehwarnindikatoren, regelmaessigen Audits und proaktiver Steuerung von Konzentrationsrisiken"
    },
    title: "Verfuegen Sie ueber eine umfassende IKT-Drittanbieter-Risikostrategie gemaess Art. 28 DORA?",
    tooltip: "Art. 28 Abs. 1-3 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, IKT-Drittparteienrisiken als integralen Bestandteil ihres IKT-Risikomanagements zu steuern. Ein vollstaendiges Informationsregister aller vertraglichen Vereinbarungen mit IKT-Drittdienstleistern ist zu fuehren."
  },
  daQ2: {
    help: "Pruefen Sie, ob Vertraege mit IKT-Drittdienstleistern die Mindestanforderungen nach DORA enthalten. Dazu gehoeren Service-Level-Vereinbarungen, Zugangsrechte fuer Audits, Regelungen zur Datenverarbeitung, Kuendigungsrechte sowie Unterstuetzungspflichten bei IKT-Vorfaellen.",
    maturity: {
      level0: "Vertraege mit IKT-Drittanbietern enthalten keine DORA-spezifischen Klauseln \u2014 Standard-AGB ohne regulatorische Anforderungen",
      level1: "Einzelne vertragliche Regelungen vorhanden, jedoch nicht alle DORA-Mindestanforderungen abgedeckt \u2014 lueckenhafte SLA-Definitionen",
      level2: "Standardisierte Vertragsvorlagen mit allen DORA-Mindestanforderungen, SLAs, Audit-Rechten, Datenschutzklauseln und Kuendigungsregelungen",
      level3: "Dynamische Vertragsrahmen mit automatisierter SLA-Ueberwachung, regelmaessiger Vertragsueberpruefung, Eskalationsmechanismen und vollstaendiger Compliance-Dokumentation"
    },
    title: "Erfuellen Ihre IKT-Drittanbietervertraege die Anforderungen nach Art. 28 Abs. 4-8 DORA?",
    tooltip: "Art. 28 Abs. 4-8 EU 2022/2554 (DORA) definiert Mindestanforderungen an vertragliche Vereinbarungen mit IKT-Drittdienstleistern, darunter Leistungsbeschreibungen, Datenschutzbestimmungen, Service-Level-Vereinbarungen und Audit-Rechte."
  },
  daQ3: {
    help: "Bewerten Sie, ob Ihr Unternehmen IKT-Konzentrationsrisiken systematisch identifiziert und steuert. Konzentrationsrisiken entstehen, wenn kritische IKT-Funktionen bei wenigen Anbietern gebuendelt sind oder ein Ausfall eines Drittanbieters mehrere Geschaeftsbereiche gleichzeitig betreffen wuerde.",
    maturity: {
      level0: "Keine Analyse von IKT-Konzentrationsrisiken \u2014 Abhaengigkeiten von einzelnen Anbietern unbekannt oder nicht bewertet",
      level1: "Grundlegendes Bewusstsein fuer Konzentrationsrisiken, jedoch keine systematische Analyse oder dokumentierte Bewertung",
      level2: "Strukturierte Analyse von Konzentrationsrisiken mit Bewertung der Substituierbarkeit, Multi-Vendor-Strategien und dokumentierten Notfallplaenen",
      level3: "Fortlaufende Konzentrationsrisikoanalyse mit quantitativer Modellierung, aktiver Diversifizierungsstrategie und Integration in die strategische IKT-Planung"
    },
    title: "Identifizieren und steuern Sie IKT-Konzentrationsrisiken gemaess Art. 29 DORA?",
    tooltip: "Art. 29 Abs. 1-2 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, bei der Nutzung von IKT-Drittdienstleistern die Risiken einer zu starken Konzentration auf einzelne Anbieter zu beruecksichtigen und geeignete Gegenmassnahmen zu treffen."
  },
  daQ4: {
    help: "Pruefen Sie, ob Ihre Vertraege fuer kritische oder wichtige IKT-Funktionen alle wesentlichen Bestimmungen nach Art. 30 DORA enthalten. Dazu gehoeren vollstaendige Leistungsbeschreibungen, Datenlokalisierung, Unterauftragsvergaberegeln, Unterstuetzung bei der Uebertragung und Exit-Strategien.",
    maturity: {
      level0: "Kritische IKT-Funktionen nicht als solche klassifiziert \u2014 keine erweiterten vertraglichen Bestimmungen fuer diese Dienste",
      level1: "Kritische IKT-Funktionen identifiziert, aber Vertraege enthalten nicht alle wesentlichen Bestimmungen nach Art. 30 DORA",
      level2: "Vertraege fuer kritische IKT-Funktionen enthalten alle wesentlichen Bestimmungen einschliesslich Exit-Strategien, Datenlokalisierung und Unterauftragsvergaberegeln",
      level3: "Best-Practice-Vertraege mit detaillierten Exit-Plaenen, regelmaessig getesteten Uebergangsprozessen und vollstaendiger Transparenz ueber die gesamte Unterauftragskette"
    },
    title: "Enthalten Ihre Vertraege fuer kritische IKT-Funktionen alle wesentlichen Bestimmungen nach Art. 30 DORA?",
    tooltip: "Art. 30 Abs. 1-5 EU 2022/2554 (DORA) definiert erweiterte vertragliche Anforderungen fuer IKT-Dienstleistungen, die kritische oder wichtige Funktionen unterstuetzen. Diese umfassen u.a. Datenlokalisierung, Zugangs- und Auditrechte sowie Kuendigungs- und Exit-Bestimmungen."
  },
  daQ5: {
    help: "Bewerten Sie, ob Ihr Unternehmen die Anforderungen an die Ueberwachung kritischer IKT-Drittdienstleister kennt und darauf vorbereitet ist. Die europaeischen Aufsichtsbehoerden (ESAs) koennen bestimmte IKT-Drittdienstleister als kritisch einstufen und einem direkten Ueberwachungsrahmen unterwerfen.",
    maturity: {
      level0: "Keine Kenntnis des Ueberwachungsrahmens fuer kritische IKT-Drittdienstleister \u2014 keine Vorbereitung auf moegliche Aufsichtsmassnahmen",
      level1: "Grundlegendes Bewusstsein fuer den Ueberwachungsrahmen, jedoch keine aktive Vorbereitung oder Abstimmung mit kritischen IKT-Drittdienstleistern",
      level2: "Aktive Ueberwachung der Einstufung von IKT-Drittdienstleistern als kritisch, Abstimmung mit betroffenen Anbietern und dokumentierte Notfallplaene",
      level3: "Proaktive Steuerung mit regelmaessiger Bewertung der Einstufungswahrscheinlichkeit, enger Zusammenarbeit mit kritischen Anbietern und vorbereiteten Alternativszenarien"
    },
    title: "Sind Sie auf den Ueberwachungsrahmen fuer kritische IKT-Drittdienstleister nach Art. 31 DORA vorbereitet?",
    tooltip: "Art. 31 Abs. 1-12 EU 2022/2554 (DORA) etabliert einen Ueberwachungsrahmen, durch den die europaeischen Aufsichtsbehoerden kritische IKT-Drittdienstleister direkt ueberwachen koennen. Finanzunternehmen muessen ihre Abhaengigkeiten von solchen Anbietern kennen und steuern."
  },
  govQ1: {
    help: "Bewerten Sie, ob das Leitungsorgan Ihres Finanzunternehmens seine Gesamtverantwortung fuer die digitale operationale Resilienz aktiv wahrnimmt. Dies umfasst die Genehmigung des IKT-Risikomanagementrahmens, die Festlegung der Risikotoleranz und die regelmaessige Befassung mit IKT-Risiken.",
    maturity: {
      level0: "Das Leitungsorgan ist nicht in die IKT-Risikosteuerung eingebunden \u2014 keine formale Verantwortungsuebernahme fuer digitale Resilienz",
      level1: "Das Leitungsorgan ist informiert, uebernimmt aber keine aktive Steuerungsrolle \u2014 IKT-Risiken werden delegiert ohne Nachverfolgung",
      level2: "Das Leitungsorgan genehmigt den IKT-Risikomanagementrahmen, legt Risikotoleranzen fest und wird regelmaessig ueber IKT-Risiken informiert",
      level3: "Das Leitungsorgan steuert die digitale Resilienz proaktiv, nimmt an Schulungen teil, hinterfragt Berichte kritisch und treibt kontinuierliche Verbesserungen voran"
    },
    title: "Nimmt Ihr Leitungsorgan seine Verantwortung fuer die digitale operationale Resilienz nach Art. 5 DORA wahr?",
    tooltip: "Art. 5 Abs. 1-2 EU 2022/2554 (DORA) weist dem Leitungsorgan die Letztverantwortung fuer das Management von IKT-Risiken zu. Es muss den IKT-Risikomanagementrahmen festlegen, genehmigen, ueberwachen und die Umsetzung verantworten."
  },
  govQ2: {
    help: "Pruefen Sie, ob die Mitglieder des Leitungsorgans und relevante Mitarbeiter regelmaessig zu IKT-Risiken und digitaler operationaler Resilienz geschult werden. DORA verlangt, dass das Leitungsorgan ausreichende Kenntnisse und Faehigkeiten besitzt, um IKT-Risiken zu verstehen und zu bewerten.",
    maturity: {
      level0: "Keine Schulungen zu IKT-Risiken fuer das Leitungsorgan oder Mitarbeiter \u2014 fehlende Awareness auf allen Ebenen",
      level1: "Vereinzelte Sensibilisierungsmassnahmen, jedoch kein strukturiertes Schulungsprogramm fuer das Leitungsorgan oder Schluesselrollen",
      level2: "Regelmaessiges Schulungsprogramm fuer Leitungsorgan und relevante Mitarbeiter mit DORA-spezifischen Inhalten, dokumentierte Teilnahme",
      level3: "Umfassendes Kompetenzentwicklungsprogramm mit individuellen Lernpfaden, Simulationsuebungen fuer das Leitungsorgan und kontinuierlicher Wissensauffrischung"
    },
    title: "Werden IKT-Risikomanagement-Schulungen fuer das Leitungsorgan gemaess Art. 5 Abs. 4 DORA durchgefuehrt?",
    tooltip: "Art. 5 Abs. 4 EU 2022/2554 (DORA) verpflichtet die Mitglieder des Leitungsorgans, aktiv ausreichende Kenntnisse und Faehigkeiten aufzubauen und zu erhalten, um IKT-Risiken und deren Auswirkungen auf den Geschaeftsbetrieb verstehen und bewerten zu koennen."
  },
  govQ3: {
    help: "Bewerten Sie, ob der IKT-Risikomanagementrahmen regelmaessig ueberprueft und dem Leitungsorgan berichtet wird. DORA verlangt eine mindestens jaehrliche Ueberpruefung sowie Berichterstattung ueber wesentliche Erkenntnisse, Verbesserungsmassnahmen und Empfehlungen aus Audits und Vorfaellen.",
    maturity: {
      level0: "Keine regelmaessige Ueberpruefung des IKT-Risikomanagementrahmens \u2014 keine Berichterstattung an das Leitungsorgan",
      level1: "Gelegentliche Ad-hoc-Berichte zu IKT-Risiken, jedoch keine strukturierte oder regelmaessige Ueberpruefung und Berichterstattung",
      level2: "Jaehrliche Ueberpruefung des IKT-Risikomanagementrahmens mit formaler Berichterstattung an das Leitungsorgan, dokumentierte Verbesserungsmassnahmen",
      level3: "Kontinuierliches Monitoring mit quartalmaessiger Berichterstattung, KPI-Dashboard fuer das Leitungsorgan und systematischer Integration von Audit-Erkenntnissen und Vorfallanalysen"
    },
    title: "Wird der IKT-Risikomanagementrahmen regelmaessig ueberprueft und dem Leitungsorgan berichtet (Art. 6 Abs. 5-8 DORA)?",
    tooltip: "Art. 6 Abs. 5-8 EU 2022/2554 (DORA) verlangt die mindestens jaehrliche Ueberpruefung des IKT-Risikomanagementrahmens sowie nach schwerwiegenden IKT-Vorfaellen. Dem Leitungsorgan ist regelmaessig Bericht ueber den Stand der digitalen operationalen Resilienz zu erstatten."
  },
  govQ4: {
    help: "Pruefen Sie, ob Ihr Unternehmen den Proportionalitaetsgrundsatz nach Art. 4 DORA anwendet. Die Anforderungen muessen proportional zur Groesse, zum Risikoprofil und zur Art der Finanzdienstleistungen umgesetzt werden. Kleinst- und Kleinunternehmen koennen vereinfachte Anforderungen nutzen.",
    maturity: {
      level0: "Keine Auseinandersetzung mit dem Proportionalitaetsgrundsatz \u2014 unklar, welche DORA-Anforderungen im vollen Umfang gelten",
      level1: "Grundlegendes Verstaendnis der Proportionalitaet, jedoch keine dokumentierte Analyse oder Einordnung des eigenen Unternehmens",
      level2: "Dokumentierte Proportionalitaetsanalyse mit klarer Einordnung (Groesse, Risikoprofil, Art der Taetigkeiten) und daraus abgeleiteter DORA-Umsetzungsstrategie",
      level3: "Detaillierte Proportionalitaetsbewertung mit regelmaessiger Aktualisierung, Abstimmung mit der Aufsicht und nachvollziehbarer Dokumentation aller Vereinfachungen"
    },
    title: "Wenden Sie den Proportionalitaetsgrundsatz nach Art. 4 DORA korrekt an?",
    tooltip: "Art. 4 Abs. 1-2 EU 2022/2554 (DORA) legt fest, dass Finanzunternehmen die DORA-Anforderungen unter Beruecksichtigung ihrer Groesse, ihres Risikoprofils sowie der Art, des Umfangs und der Komplexitaet ihrer Taetigkeiten umsetzen muessen."
  },
  govQ5: {
    help: "Bewerten Sie, ob eine unabhaengige IKT-Kontrollfunktion (z.B. CISO, IKT-Risikomanager) eingerichtet ist, die von operativen IKT-Funktionen getrennt agiert. Diese Funktion muss ueber ausreichende Ressourcen, Befugnisse und direkten Zugang zum Leitungsorgan verfuegen.",
    maturity: {
      level0: "Keine unabhaengige IKT-Kontrollfunktion vorhanden \u2014 IKT-Risikomanagement wird nicht von operativen Funktionen getrennt",
      level1: "IKT-Risikoverantwortung ist benannt, jedoch nicht unabhaengig von operativen IKT-Funktionen und ohne ausreichende Ressourcen",
      level2: "Unabhaengige IKT-Kontrollfunktion eingerichtet mit klarer Trennung von operativen Bereichen, definierten Befugnissen und direktem Berichtsweg zum Leitungsorgan",
      level3: "Vollstaendig unabhaengige IKT-Kontrollfunktion mit eigener Budgetverantwortung, regelmaessiger externer Validierung und aktiver Rolle in der strategischen IKT-Planung"
    },
    title: "Haben Sie eine unabhaengige IKT-Kontrollfunktion gemaess Art. 6 Abs. 4 DORA eingerichtet?",
    tooltip: "Art. 6 Abs. 1-4 EU 2022/2554 (DORA) fordert, dass Finanzunternehmen eine von den operativen IKT-Funktionen unabhaengige Kontrollfunktion fuer das IKT-Risikomanagement einrichten. Diese muss ueber ein angemessenes Mass an Unabhaengigkeit, Befugnissen und Ressourcen verfuegen."
  },
  iaQ1: {
    help: "Pruefen Sie, ob Ihr Unternehmen an Vereinbarungen zum Austausch von Informationen ueber Cyberbedrohungen teilnimmt. Art. 45 DORA ermoeglicht den freiwilligen Austausch innerhalb vertrauenswuerdiger Gemeinschaften von Finanzunternehmen (z.B. ISACs, CERTs, sektorale Plattformen).",
    maturity: {
      level0: "Keine Teilnahme am Informationsaustausch ueber Cyberbedrohungen \u2014 kein Zugang zu Threat-Intelligence-Netzwerken im Finanzsektor",
      level1: "Passiver Empfang einzelner Warnmeldungen (z.B. BSI, BaFin), jedoch keine aktive Teilnahme an strukturierten Austauschvereinbarungen",
      level2: "Aktive Mitgliedschaft in mindestens einer Informationsaustausch-Gemeinschaft (z.B. ISAC) mit regelmaessigem Empfang und Beitrag von Bedrohungsinformationen",
      level3: "Aktive Teilnahme an mehreren Austauschplattformen mit bidirektionalem Informationsfluss, automatisierter Integration von Threat Intelligence und aktiver Beitrag zur Sektor-Resilienz"
    },
    title: "Nehmen Sie an Vereinbarungen zum Austausch von Informationen ueber Cyberbedrohungen nach Art. 45 DORA teil?",
    tooltip: "Art. 45 Abs. 1-2 EU 2022/2554 (DORA) ermoeglicht und foerdert den Austausch von Informationen und Erkenntnissen ueber Cyberbedrohungen zwischen Finanzunternehmen innerhalb vertrauenswuerdiger Gemeinschaften. Die Teilnahme ist freiwillig, aber ausdruecklich erwaegungswert."
  },
  iaQ2: {
    help: "Bewerten Sie die Qualitaet und Relevanz der ausgetauschten Informationen. Ausgetauschte Bedrohungsinformationen sollten zeitnah, umsetzbar und kontextualisiert sein. Pruefen Sie, ob empfangene Informationen in Ihre Sicherheitsprozesse einfliessen und ob eigene Erkenntnisse aufbereitet weitergegeben werden.",
    maturity: {
      level0: "Keine Verarbeitung oder Bewertung von Bedrohungsinformationen \u2014 empfangene Informationen werden nicht genutzt",
      level1: "Empfangene Bedrohungsinformationen werden gelesen, aber nicht systematisch ausgewertet oder in operative Prozesse integriert",
      level2: "Strukturierte Auswertung empfangener Bedrohungsinformationen mit Relevanzpruefung, Ableitung von Massnahmen und Dokumentation der Ergebnisse",
      level3: "Automatisierte Verarbeitung von Threat Intelligence mit Anreicherung, Priorisierung und direkter Integration in SIEM/SOC-Prozesse und Abwehrmassnahmen"
    },
    title: "Stellen Sie die Qualitaet und Verwertbarkeit ausgetauschter Bedrohungsinformationen nach Art. 45 Abs. 3 DORA sicher?",
    tooltip: "Art. 45 Abs. 3 EU 2022/2554 (DORA) betont, dass der Informationsaustausch darauf abzielen muss, das Bewusstsein fuer Cyberbedrohungen zu schaerfen, die Abwehrfaehigkeit zu staerken und technische Erkenntnisse ueber Taktiken, Techniken und Verfahren von Angreifern zu teilen."
  },
  iaQ3: {
    help: "Pruefen Sie, ob geeignete Vertraulichkeitsvereinbarungen und Schutzregelungen fuer den Informationsaustausch bestehen. Ausgetauschte Bedrohungsinformationen muessen vor unbefugter Weitergabe geschuetzt werden, gleichzeitig duerfen Datenschutzvorschriften (DSGVO) nicht verletzt werden.",
    maturity: {
      level0: "Keine Vertraulichkeitsregelungen fuer den Informationsaustausch \u2014 keine Schutzklassifizierung oder Zugangsbeschraenkungen",
      level1: "Allgemeine NDAs vorhanden, jedoch keine spezifischen Regelungen fuer Bedrohungsinformationen oder TLP-Klassifizierung",
      level2: "Spezifische Vertraulichkeitsvereinbarungen mit TLP-Klassifizierung (Traffic Light Protocol), definierten Zugriffsrechten und DSGVO-konformer Datenverarbeitung",
      level3: "Umfassendes Vertraulichkeitsframework mit automatisierter TLP-Kennzeichnung, Zugangskontrolle, Audit-Trail und regelmaessiger Ueberpruefung der Vereinbarungen"
    },
    title: "Bestehen geeignete Vertraulichkeitsvereinbarungen fuer den Informationsaustausch nach Art. 45 Abs. 4 DORA?",
    tooltip: "Art. 45 Abs. 4 EU 2022/2554 (DORA) legt fest, dass der Informationsaustausch unter Einhaltung der Vertraulichkeit, des Geschaeftsgeheimnisschutzes und des Datenschutzes erfolgen muss. Geeignete Vertraulichkeitsvereinbarungen sind zwingend erforderlich."
  },
  iaQ4: {
    help: "Bewerten Sie, ob Ihr Unternehmen aktiv Bedrohungsindikatoren (Indicators of Compromise, IoCs) teilt und nutzt. Dies umfasst IP-Adressen, Domainnamen, Hashwerte, Angriffsmuster und -techniken. Der Austausch sollte nach dem Traffic Light Protocol (TLP) klassifiziert und automatisiert erfolgen.",
    maturity: {
      level0: "Keine Nutzung oder Weitergabe von technischen Bedrohungsindikatoren \u2014 kein Zugang zu IoC-Feeds oder Sharing-Plattformen",
      level1: "Passive Nutzung oeffentlicher IoC-Feeds, jedoch keine aktive Teilnahme an Sharing-Plattformen oder eigene Beitraege",
      level2: "Aktiver Austausch von IoCs ueber strukturierte Plattformen (MISP, STIX/TAXII) mit TLP-Klassifizierung und Integration in eigene Sicherheitssysteme",
      level3: "Vollautomatisierter bidirektionaler IoC-Austausch mit Echtzeit-Integration in Abwehrsysteme, eigener Threat-Intelligence-Produktion und Community-Leadership"
    },
    title: "Teilen und nutzen Sie aktiv Bedrohungsindikatoren (IoCs) im Rahmen des Informationsaustauschs?",
    tooltip: "Art. 45 Abs. 1 EU 2022/2554 (DORA) foerdert den Austausch von Informationen ueber Taktiken, Techniken, Verfahren und Cyberbedrohungswarnungen. Der strukturierte Austausch von Bedrohungsindikatoren (IoCs) nach dem TLP-Standard ist ein wesentliches Element der kollektiven Abwehr."
  },
  iaQ5: {
    help: "Pruefen Sie, ob Erkenntnisse aus dem Informationsaustausch an die zustaendigen Aufsichtsbehoerden (BaFin, EZB, ESAs) weitergeleitet werden, sofern relevant. DORA sieht vor, dass bestimmte Informationen ueber Cyberbedrohungen den Aufsichtsbehoerden zur Verfuegung gestellt werden koennen.",
    maturity: {
      level0: "Keine Kommunikation relevanter Bedrohungsinformationen an Aufsichtsbehoerden \u2014 kein Bewusstsein fuer Meldemoeglichkeiten",
      level1: "Bewusstsein fuer Meldeverpflichtungen vorhanden, jedoch keine proaktive Weitergabe relevanter Bedrohungsinformationen an Aufsichtsbehoerden",
      level2: "Etablierter Prozess zur Bewertung und Weiterleitung relevanter Bedrohungsinformationen an BaFin/EZB mit dokumentierten Verfahren und Ansprechpartnern",
      level3: "Proaktive Zusammenarbeit mit Aufsichtsbehoerden durch regelmaessige Bedrohungsbriefings, Teilnahme an sektoralen Uebungen und Beitrag zur Systemstabilitaet"
    },
    title: "Leiten Sie relevante Erkenntnisse aus dem Informationsaustausch an Aufsichtsbehoerden weiter?",
    tooltip: "Art. 45 Abs. 2 EU 2022/2554 (DORA) regelt, dass Finanzunternehmen den zustaendigen Behoerden ihre Teilnahme an Informationsaustauschvereinbarungen mitteilen und relevante Erkenntnisse ueber Cyberbedrohungen bereitstellen koennen."
  },
  irmQ1: {
    help: "Bewerten Sie, ob ein dokumentiertes und vom Leitungsorgan genehmigtes IKT-Risikomanagement-Framework existiert, das Strategien, Richtlinien, Verfahren und Protokolle zum Schutz aller IKT-Assets umfasst. Dieses Framework muss mindestens jaehrlich ueberprueft werden.",
    maturity: {
      level0: "Kein IKT-Risikomanagement-Framework vorhanden \u2014 IKT-Risiken werden nicht systematisch erfasst oder gesteuert",
      level1: "Grundlegendes Framework existiert, jedoch nicht vollstaendig dokumentiert oder nicht vom Leitungsorgan genehmigt \u2014 einzelne Richtlinien vorhanden",
      level2: "Umfassendes IKT-Risikomanagement-Framework dokumentiert und vom Leitungsorgan genehmigt \u2014 regelmaessige Ueberpruefung etabliert",
      level3: "Ausgereiftes Framework mit kontinuierlicher Verbesserung, regelmaessiger interner Auditierung und Anpassung an neue Bedrohungslagen \u2014 vollstaendig in die Unternehmenssteuerung integriert"
    },
    title: "Haben Sie ein umfassendes IKT-Risikomanagement-Framework nach Art. 6 DORA eingerichtet?",
    tooltip: "Art. 6 Abs. 1-2 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen zur Einrichtung eines soliden, umfassenden und gut dokumentierten IKT-Risikomanagementrahmens. Dieser muss vom Leitungsorgan genehmigt und ueberwacht werden."
  },
  irmQ2: {
    help: "Pruefen Sie, ob alle IKT-gestuetzten Unternehmensfunktionen, Informationsassets und IKT-Assets vollstaendig identifiziert, klassifiziert und dokumentiert sind. Dies umfasst Hardware, Software, Netzwerkkomponenten, Cloud-Ressourcen und deren Abhaengigkeiten untereinander.",
    maturity: {
      level0: "Keine systematische Identifizierung oder Inventarisierung von IKT-Assets \u2014 unbekannte Abhaengigkeiten und Schatten-IT vorhanden",
      level1: "Teilweise Inventarisierung vorhanden \u2014 wesentliche IKT-Assets bekannt, aber keine vollstaendige Klassifizierung oder Abhaengigkeitsanalyse",
      level2: "Vollstaendiges IKT-Asset-Register mit Klassifizierung nach Kritikalitaet und dokumentierten Abhaengigkeiten \u2014 regelmaessige Aktualisierung",
      level3: "Automatisierte Asset-Discovery und -Klassifizierung mit Echtzeitaktualisierung, vollstaendiger Abhaengigkeitskartierung und Integration in das Risikomanagement"
    },
    title: "Verfuegen Sie ueber eine vollstaendige Identifizierung und Klassifizierung aller IKT-Assets gemaess Art. 8 DORA?",
    tooltip: "Art. 8 Abs. 1-4 EU 2022/2554 (DORA) verlangt die Identifizierung, Klassifizierung und Dokumentation aller IKT-gestuetzten Unternehmensfunktionen und IKT-Assets einschliesslich ihrer Abhaengigkeiten von IKT-Drittdienstleistern."
  },
  irmQ3: {
    help: "Bewerten Sie Ihre Schutz- und Praeventionsmassnahmen fuer IKT-Systeme. Dazu gehoeren Zugangskontrollrichtlinien, Netzwerksicherheit, Verschluesselung, Patch-Management und Schutz vor Schadsoftware. Die Massnahmen muessen dem identifizierten Risikoprofil entsprechen.",
    maturity: {
      level0: "Keine strukturierten Schutz- und Praeventionsmassnahmen \u2014 IKT-Systeme sind unzureichend abgesichert",
      level1: "Grundlegende Sicherheitsmassnahmen vorhanden (Firewall, Antivirus), jedoch kein risikobasierter Ansatz und lueckenhafte Abdeckung",
      level2: "Umfassende Schutzstrategie mit risikobasierten Massnahmen, Zugangskontrollrichtlinien, Verschluesselung und regelmaessigem Patch-Management implementiert",
      level3: "Adaptive Sicherheitsarchitektur mit Zero-Trust-Prinzipien, automatisiertem Patch-Management, kontinuierlicher Ueberwachung und proaktiver Bedrohungsabwehr"
    },
    title: "Sind Ihre IKT-Schutz- und Praeventionsmassnahmen gemaess Art. 9 DORA implementiert?",
    tooltip: "Art. 9 Abs. 1-4 EU 2022/2554 (DORA) fordert von Finanzunternehmen die Implementierung von IKT-Sicherheitsrichtlinien, Zugangskontrollmechanismen, Netzwerksicherheitsmassnahmen und Verschluesselung zum Schutz ihrer IKT-Systeme."
  },
  irmQ4: {
    help: "Pruefen Sie, ob Mechanismen zur schnellen Erkennung anomaler Aktivitaeten in IKT-Systemen vorhanden sind. Dies umfasst Netzwerkueberwachung, SIEM-Systeme, Intrusion-Detection-Systeme und Protokollanalyse. Die Erkennungsfaehigkeiten muessen mehrere Schutzschichten abdecken.",
    maturity: {
      level0: "Keine automatisierten Erkennungsmechanismen \u2014 anomale Aktivitaeten werden nur zufaellig oder gar nicht bemerkt",
      level1: "Grundlegende Protokollierung vorhanden, jedoch keine systematische Auswertung oder Korrelation \u2014 Erkennung ueberwiegend manuell",
      level2: "SIEM/SOC-Loesung implementiert mit definierten Erkennungsregeln, automatisierten Alarmen und regelmaessiger Auswertung von Sicherheitsereignissen",
      level3: "Fortgeschrittene Erkennung mit KI-gestuetzter Anomalieerkennung, Threat Hunting, 24/7-SOC-Betrieb und Integration von Threat Intelligence in Echtzeit"
    },
    title: "Verfuegen Sie ueber Mechanismen zur Erkennung anomaler Aktivitaeten gemaess Art. 10 DORA?",
    tooltip: "Art. 10 Abs. 1-2 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, Mechanismen zur unverzueglichen Erkennung anomaler Aktivitaeten einzurichten, einschliesslich IKT-bezogener Vorfaelle und wesentlicher Cyberbedrohungen."
  },
  irmQ5: {
    help: "Bewerten Sie Ihre Backup- und Wiederherstellungsrichtlinien fuer IKT-Systeme und Daten. Dies umfasst die Haeufigkeit von Backups, Aufbewahrungsfristen, getrennte Speicherorte, regelmaessige Wiederherstellungstests und definierte Recovery Time Objectives (RTO) und Recovery Point Objectives (RPO).",
    maturity: {
      level0: "Keine dokumentierte Backup- und Wiederherstellungspolitik \u2014 Datensicherung erfolgt unstrukturiert oder gar nicht",
      level1: "Grundlegende Backups werden erstellt, jedoch ohne definierte RTO/RPO, ohne regelmaessige Wiederherstellungstests und ohne getrennte Speicherorte",
      level2: "Umfassende Backup-Strategie mit definierten RTO/RPO, regelmaessigen Wiederherstellungstests, getrennten Speicherorten und dokumentierten Verfahren",
      level3: "Automatisierte Backup-Orchestrierung mit kontinuierlicher Replikation, automatisierten Wiederherstellungstests, Immutable Backups und nahtloser Integration in Business-Continuity-Plaene"
    },
    title: "Haben Sie Backup- und Wiederherstellungsrichtlinien gemaess Art. 12 DORA etabliert?",
    tooltip: "Art. 12 Abs. 1-2 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, Richtlinien und Verfahren fuer die Datensicherung sowie Wiederherstellungsverfahren und -methoden festzulegen. Die Backup-Standorte muessen ausreichend von den Primaerstandorten getrennt sein."
  },
  rtQ1: {
    help: "Bewerten Sie, ob ein umfassendes Programm fuer Tests der digitalen operationalen Resilienz existiert. Dies muss mindestens Schwachstellenbewertungen, Open-Source-Analysen, Netzwerksicherheitsbewertungen, Lueckenanalysen und physische Sicherheitspruefungen umfassen.",
    maturity: {
      level0: "Kein Programm fuer Resilienztests vorhanden \u2014 IKT-Systeme werden nicht regelmaessig auf Schwachstellen oder Widerstandsfaehigkeit getestet",
      level1: "Einzelne Ad-hoc-Tests (z.B. gelegentliche Schwachstellenscans), jedoch kein strukturiertes oder dokumentiertes Testprogramm",
      level2: "Dokumentiertes Testprogramm mit regelmaessigen Schwachstellenbewertungen, Netzwerksicherheitspruefungen und Lueckenanalysen \u2014 Ergebnisse werden nachverfolgt",
      level3: "Umfassendes risikobasiertes Testprogramm mit automatisierten Schwachstellenscans, kontinuierlicher Validierung und Integration der Testergebnisse in die Risikobewertung"
    },
    title: "Verfuegen Sie ueber ein Programm fuer Tests der digitalen operationalen Resilienz nach Art. 24 DORA?",
    tooltip: "Art. 24 Abs. 1-2 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, ein solides und umfassendes Programm fuer die Pruefung der digitalen operationalen Resilienz als integralen Bestandteil des IKT-Risikomanagementrahmens einzurichten."
  },
  rtQ2: {
    help: "Pruefen Sie, ob regelmaessige Tests an IKT-Systemen und -Werkzeugen durchgefuehrt werden. DORA verlangt einen risikobasierten Ansatz mit Tests wie Schwachstellenscans, Netzwerksicherheitsbewertungen, Softwaretests, Quellcodeanalysen und szenariobasierten Tests mindestens jaehrlich.",
    maturity: {
      level0: "Keine regelmaessigen Tests von IKT-Systemen \u2014 Schwachstellen bleiben unentdeckt und werden nicht behoben",
      level1: "Gelegentliche Schwachstellenscans oder Penetrationstests, jedoch nicht fuer alle kritischen Systeme und ohne festen Zeitplan",
      level2: "Jaehrliche Tests aller kritischen IKT-Systeme mit Schwachstellenscans, Netzwerksicherheitsbewertungen und szenariobasierten Tests \u2014 Ergebnisse dokumentiert und nachverfolgt",
      level3: "Kontinuierliches Testing mit automatisierten Schwachstellenscans, regelmaessigen Red-Team-Uebungen, szenariobasierten Stresstests und systematischer Nachverfolgung aller Befunde"
    },
    title: "Fuehren Sie regelmaessige Tests Ihrer IKT-Systeme und -Werkzeuge nach Art. 25 DORA durch?",
    tooltip: "Art. 25 Abs. 1-3 EU 2022/2554 (DORA) definiert die Arten von Tests, die Finanzunternehmen durchfuehren muessen, darunter Schwachstellenbewertungen, Open-Source-Analysen, Netzwerksicherheitsbewertungen, Lueckenanalysen und szenariobasierte Tests."
  },
  rtQ3: {
    help: "Bewerten Sie, ob Ihr Unternehmen verpflichtet ist, bedrohungsgeleitete Penetrationstests (TLPT) durchzufuehren, und ob die Voraussetzungen dafuer geschaffen sind. TLPT ist fuer bedeutende Finanzunternehmen alle drei Jahre vorgeschrieben und muss nach dem TIBER-EU-Rahmenwerk erfolgen.",
    maturity: {
      level0: "Keine Kenntnis der TLPT-Anforderungen \u2014 keine bedrohungsgeleiteten Penetrationstests durchgefuehrt oder geplant",
      level1: "Grundlegendes Verstaendnis der TLPT-Anforderungen, jedoch keine Durchfuehrung oder konkrete Planung \u2014 Standard-Penetrationstests werden durchgefuehrt",
      level2: "TLPT nach TIBER-EU/TIBER-DE durchgefuehrt oder in konkreter Planung \u2014 qualifizierte externe Tester beauftragt, Umfang mit Aufsicht abgestimmt",
      level3: "Regelmaessige TLPT-Durchfuehrung alle drei Jahre mit vollstaendiger Abdeckung kritischer Funktionen, Integration der Ergebnisse in die Risikobewertung und nachweislicher Verbesserung der Abwehrfaehigkeit"
    },
    title: "Fuehren Sie bedrohungsgeleitete Penetrationstests (TLPT) nach Art. 26 DORA durch?",
    tooltip: "Art. 26 Abs. 1-8 EU 2022/2554 (DORA) verpflichtet bedeutende Finanzunternehmen, mindestens alle drei Jahre bedrohungsgeleitete Penetrationstests (TLPT) nach dem TIBER-EU-Rahmenwerk durchzufuehren. Diese muessen alle kritischen oder wichtigen Funktionen abdecken."
  },
  rtQ4: {
    help: "Pruefen Sie, ob fuer TLPT-Durchfuehrungen qualifizierte externe Tester eingesetzt werden. DORA stellt spezifische Anforderungen an die Qualifikation, Unabhaengigkeit und Reputation von TLPT-Testern. Interne Tester sind unter bestimmten Bedingungen zulaessig, der Threat-Intelligence-Anbieter muss extern sein.",
    maturity: {
      level0: "Keine Auseinandersetzung mit Qualifikationsanforderungen fuer TLPT-Tester \u2014 keine qualifizierten Tester identifiziert oder beauftragt",
      level1: "Grundlegende Kenntnis der Anforderungen, jedoch keine systematische Qualifizierungspruefung der eingesetzten Tester",
      level2: "Qualifizierte externe TLPT-Tester nach DORA-Kriterien beauftragt mit nachgewiesener Expertise, Unabhaengigkeit und Haftpflichtversicherung",
      level3: "Etablierter Pool qualifizierter TLPT-Tester mit regelmaessiger Rotation, dokumentierter Qualifizierungspruefung und enger Abstimmung mit der Aufsicht zur Testeranerkennung"
    },
    title: "Setzen Sie fuer TLPT qualifizierte Tester gemaess Art. 26 Abs. 2-4 DORA ein?",
    tooltip: "Art. 26 Abs. 2-4 EU 2022/2554 (DORA) definiert Anforderungen an TLPT-Tester hinsichtlich Reputation, Fachwissen, Zertifizierungen und Unabhaengigkeit. Der Threat-Intelligence-Anbieter muss zwingend extern sein, interne Tester sind unter Auflagen zulaessig."
  },
  rtQ5: {
    help: "Bewerten Sie, ob die Anforderungen an TLPT-Tester bezueglich Zertifizierung, Berufshaftpflicht und Einhaltung von Verhaltenskodizes erfuellt werden. DORA verlangt, dass TLPT-Tester hoechsten Fachstandards genuegen und die Ergebnisse von der Aufsicht validiert werden koennen.",
    maturity: {
      level0: "Keine Verifizierung der TLPT-Tester-Qualifikationen \u2014 Zertifizierungen und Compliance-Anforderungen nicht geprueft",
      level1: "Grundlegende Pruefung der Tester-Referenzen, jedoch keine systematische Verifizierung von Zertifizierungen oder Berufshaftpflicht",
      level2: "Dokumentierte Pruefung aller TLPT-Tester-Anforderungen einschliesslich Zertifizierungen, Berufshaftpflicht und Einhaltung ethischer Standards \u2014 Aufsichtsmeldung erfolgt",
      level3: "Umfassender Qualifizierungs- und Compliance-Prozess fuer TLPT-Tester mit Vorabvalidierung durch die Aufsicht, Ergebnisanerkennung und Lessons-Learned-Prozess nach jedem TLPT"
    },
    title: "Erfuellen Ihre TLPT-Tester die Anforderungen nach Art. 27 DORA an Qualifikation und Compliance?",
    tooltip: "Art. 27 Abs. 1-3 EU 2022/2554 (DORA) legt detaillierte Anforderungen an TLPT-Tester fest, darunter technische und organisatorische Faehigkeiten, Zertifizierungen durch Akkreditierungsstellen, Berufshaftpflichtversicherung und die Einhaltung von Verhaltenskodizes."
  },
  vmQ1: {
    help: "Bewerten Sie, ob ein strukturierter Prozess fuer das Management IKT-bezogener Vorfaelle existiert. Dies umfasst Erkennung, Protokollierung, Klassifizierung, Eskalation, Reaktion und Nachbereitung. Der Prozess muss alle Arten von IKT-Vorfaellen abdecken, von geringfuegigen Stoerungen bis zu schwerwiegenden Vorfaellen.",
    maturity: {
      level0: "Kein strukturierter IKT-Vorfallmanagement-Prozess \u2014 Vorfaelle werden ad hoc und ohne dokumentierte Verfahren behandelt",
      level1: "Grundlegende Vorfallbehandlung vorhanden, jedoch ohne standardisierte Klassifizierung, lueckenhafte Dokumentation und unklare Eskalationswege",
      level2: "Dokumentierter Vorfallmanagement-Prozess mit klarer Klassifizierung, definierten Eskalationsstufen, Verantwortlichkeiten und systematischer Nachbereitung",
      level3: "Ausgereifter Vorfallmanagement-Prozess mit automatisierter Erkennung und Klassifizierung, Echtzeit-Eskalation, War-Room-Verfahren und kontinuierlicher Prozessoptimierung durch Lessons Learned"
    },
    title: "Verfuegen Sie ueber einen strukturierten IKT-Vorfallmanagement-Prozess nach Art. 17 DORA?",
    tooltip: "Art. 17 Abs. 1-3 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, einen Prozess fuer das Management IKT-bezogener Vorfaelle festzulegen und umzusetzen, um IKT-bezogene Vorfaelle zu erkennen, zu verwalten und zu melden."
  },
  vmQ2: {
    help: "Pruefen Sie, ob ein Klassifizierungsschema fuer IKT-bezogene Vorfaelle nach den DORA-Kriterien implementiert ist. Die Kriterien umfassen betroffene Kunden, Dauer, geografische Ausbreitung, Datenverluste, Kritikalitaet der Dienste und wirtschaftliche Auswirkungen.",
    maturity: {
      level0: "Kein Klassifizierungsschema fuer IKT-Vorfaelle \u2014 keine Unterscheidung zwischen geringfuegigen und schwerwiegenden Vorfaellen",
      level1: "Informelle Einstufung von Vorfaellen, jedoch ohne standardisierte Kriterien nach DORA \u2014 Schweregrad wird subjektiv bewertet",
      level2: "Dokumentiertes Klassifizierungsschema nach DORA-Kriterien (Art. 18) mit definierten Schwellenwerten fuer schwerwiegende Vorfaelle und klarer Zuordnung",
      level3: "Automatisierte Vorfallklassifizierung mit Echtzeitbewertung aller DORA-Kriterien, dynamischer Neubewertung waehrend des Vorfalls und historischer Trendanalyse"
    },
    title: "Klassifizieren Sie IKT-bezogene Vorfaelle nach den Kriterien des Art. 18 DORA?",
    tooltip: "Art. 18 Abs. 1-2 EU 2022/2554 (DORA) definiert Kriterien zur Klassifizierung von IKT-bezogenen Vorfaellen als schwerwiegend, darunter Anzahl betroffener Kunden, Dauer, geografische Ausbreitung, Datenverluste und wirtschaftliche Auswirkungen."
  },
  vmQ3: {
    help: "Bewerten Sie, ob Ihr Meldeprozess fuer schwerwiegende IKT-bezogene Vorfaelle den DORA-Anforderungen entspricht. Dies umfasst die Erstmeldung (innerhalb von 4 Stunden nach Klassifizierung), den Zwischenbericht und den Abschlussbericht an die zustaendige Behoerde (BaFin).",
    maturity: {
      level0: "Kein Meldeprozess fuer IKT-Vorfaelle an Aufsichtsbehoerden \u2014 Meldepflichten unbekannt oder nicht umgesetzt",
      level1: "Grundlegendes Bewusstsein fuer Meldepflichten, jedoch kein strukturierter Prozess \u2014 Meldefristen und -formate nicht definiert",
      level2: "Dokumentierter Meldeprozess mit definierten Fristen (Erstmeldung, Zwischenbericht, Abschlussbericht), benannten Verantwortlichen und vorbereiteten Meldeformularen",
      level3: "Optimierter Meldeprozess mit (teil-)automatisierter Meldeerstellung, direkter Anbindung an Aufsichtsportale, Echtzeit-Tracking und regelmaessigen Meldeuebungen"
    },
    title: "Ist Ihr Meldeprozess fuer schwerwiegende IKT-Vorfaelle nach Art. 19 DORA etabliert?",
    tooltip: "Art. 19 Abs. 1-4 EU 2022/2554 (DORA) verpflichtet Finanzunternehmen, schwerwiegende IKT-bezogene Vorfaelle der zustaendigen Behoerde zu melden. Die Meldung umfasst eine Erstmeldung, Zwischenberichte und einen Abschlussbericht innerhalb definierter Fristen."
  },
  vmQ4: {
    help: "Pruefen Sie, ob Ihr Unternehmen die ITS-Standardformulare fuer die Meldung schwerwiegender IKT-Vorfaelle verwendet. Die technischen Durchfuehrungsstandards (ITS) zu Art. 20 DORA definieren einheitliche Formate und Inhalte fuer Erst-, Zwischen- und Abschlussmeldungen.",
    maturity: {
      level0: "Keine Kenntnis der ITS-Standardformulare \u2014 Vorfallmeldungen erfolgen in proprietaeren oder unstrukturierten Formaten",
      level1: "Kenntnis der Standardformulare vorhanden, jedoch noch nicht in die internen Prozesse integriert \u2014 manuelle Uebertragung in Meldeformulare",
      level2: "ITS-Standardformulare in den Meldeprozess integriert mit vorausgefuellten Pflichtfeldern, klaren Ausfuellanleitungen und regelmaessiger Aktualisierung bei neuen ITS-Versionen",
      level3: "Vollautomatisierte Meldekette mit direkter Generierung konformer Meldungen aus dem Vorfallmanagement-System, API-Anbindung an Aufsichtsportale und Quality-Assurance-Pruefung vor Versand"
    },
    title: "Nutzen Sie die ITS-Standardformulare fuer IKT-Vorfallmeldungen nach Art. 20 DORA?",
    tooltip: "Art. 20 Abs. 1 EU 2022/2554 (DORA) ermaechtigt die ESAs zur Entwicklung technischer Durchfuehrungsstandards (ITS), die einheitliche Standardformulare, Vorlagen und Verfahren fuer die Meldung schwerwiegender IKT-bezogener Vorfaelle festlegen."
  },
  vmQ5: {
    help: "Bewerten Sie, ob Ihr Unternehmen Prozesse zur freiwilligen Meldung erheblicher Cyberbedrohungen an die zustaendige Behoerde etabliert hat. DORA ermoeglicht die Benachrichtigung ueber wesentliche Cyberbedrohungen auch dann, wenn noch kein Vorfall eingetreten ist, um praeventive Massnahmen zu ermoeglichen.",
    maturity: {
      level0: "Keine Prozesse zur Meldung von Cyberbedrohungen \u2014 keine proaktive Kommunikation mit Aufsichtsbehoerden zu Bedrohungslagen",
      level1: "Vereinzelte informelle Kommunikation bei akuten Bedrohungen, jedoch kein strukturierter Prozess und keine definierten Kriterien",
      level2: "Dokumentierter Prozess zur Bewertung und Meldung erheblicher Cyberbedrohungen an BaFin mit definierten Schwellenwerten und Verantwortlichkeiten",
      level3: "Proaktives Cyber-Threat-Reporting mit systematischer Bedrohungsbewertung, automatisierter Schwellenwertpruefung und aktiver Beteiligung an sektoralen Fruehwarnsystemen"
    },
    title: "Haben Sie Prozesse zur Meldung erheblicher Cyberbedrohungen nach Art. 23 DORA eingerichtet?",
    tooltip: "Art. 23 Abs. 1-4 EU 2022/2554 (DORA) ermoeglicht die freiwillige Benachrichtigung der zustaendigen Behoerde ueber erhebliche Cyberbedrohungen. Diese praeventive Meldung dient der Fruehwarnung und Koordinierung von Abwehrmassnahmen im Finanzsektor."
  }
};

// Add empoweringIntro to categories
data.dora.categories.drittanbieter.empoweringIntro = "IKT-Drittanbieter sind ein zentraler Bestandteil der digitalen Wertschoepfungskette im Finanzsektor. DORA verpflichtet Finanzunternehmen, saemtliche Risiken aus der Nutzung von IKT-Drittdienstleistungen systematisch zu identifizieren, zu bewerten und vertraglich abzusichern. Die folgenden Fragen pruefen, ob Ihr Unternehmen die Anforderungen der Art. 28-44 DORA an das IKT-Drittparteienrisikomanagement erfuellt.";

data.dora.categories.governance.empoweringIntro = "DORA verlangt, dass das Leitungsorgan die Gesamtverantwortung fuer die digitale operationale Resilienz traegt. Die Geschaeftsleitung muss den IKT-Risikomanagementrahmen genehmigen, ueberwachen und sich regelmaessig ueber IKT-Risiken informieren lassen. Die folgenden Fragen pruefen, ob Ihr Unternehmen die Governance-Anforderungen der Art. 4-6 DORA einschliesslich Proportionalitaetsgrundsatz umsetzt.";

data.dora.categories.ictRisikomanagement.empoweringIntro = "Das IKT-Risikomanagement bildet das Fundament der digitalen operationalen Resilienz. DORA verpflichtet Finanzunternehmen, ein umfassendes Rahmenwerk zu etablieren, das Identifizierung, Schutz, Erkennung, Reaktion und Wiederherstellung abdeckt. Die folgenden Fragen pruefen, ob Ihr Unternehmen die Kernanforderungen der Art. 5-16 DORA an das IKT-Risikomanagement erfuellt.";

data.dora.categories.informationsaustausch.empoweringIntro = "Der Austausch von Informationen ueber Cyberbedrohungen zwischen Finanzunternehmen ist ein wesentliches Element der kollektiven Resilienz des Finanzsektors. Art. 45 DORA ermoeglicht und foerdert den freiwilligen Austausch von Bedrohungsindikatoren, taktischen Informationen und Fruehwarnungen. Die folgenden Fragen pruefen, ob Ihr Unternehmen aktiv am Informationsaustausch teilnimmt und dafuer geeignete Strukturen geschaffen hat.";

data.dora.categories.resilienceTesting.empoweringIntro = "Digitale operationale Resilienztests stellen sicher, dass Finanzunternehmen ihre IKT-Systeme und -Prozesse regelmaessig auf Schwachstellen und Widerstandsfaehigkeit pruefen. DORA unterscheidet zwischen allgemeinen Tests (Art. 24-25) und fortgeschrittenen bedrohungsgeleiteten Penetrationstests (TLPT, Art. 26-27). Die folgenden Fragen pruefen Ihren Reifegrad bei der Durchfuehrung von Resilienztests.";

data.dora.categories.vorfallmanagement.empoweringIntro = "Ein wirksames IKT-Vorfallmanagement ist entscheidend fuer die Begrenzung von Schaeden und die schnelle Wiederherstellung des Geschaeftsbetriebs. DORA definiert einheitliche Anforderungen an die Erkennung, Klassifizierung, Meldung und Nachbereitung von IKT-bezogenen Vorfaellen. Die folgenden Fragen pruefen, ob Ihr Unternehmen die Vorgaben der Art. 17-23 DORA umfassend umsetzt.";

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('DORA questions and empoweringIntro updated successfully');
console.log('Questions count:', Object.keys(data.dora.questions).length);
console.log('Categories with empoweringIntro:', Object.keys(data.dora.categories).filter(k => data.dora.categories[k].empoweringIntro).length);
