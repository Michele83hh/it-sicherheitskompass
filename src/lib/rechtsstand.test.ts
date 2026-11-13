import { describe, it, expect } from 'vitest';
import de from '../messages/de.json';
import en from '../messages/en.json';

/**
 * Der Rechtsstand steht an mehreren Stellen im Text (Footer, PDF, Landing,
 * Foerdermittel). Ein Umbau auf einen Parameter wuerde die PDF-Erzeugung
 * beruehren; stattdessen faellt hier auf, wenn eine Stelle beim naechsten
 * Update vergessen wird.
 */
const STAND_DE = 'November 2026';
const STAND_EN = 'November 2026';

describe('Rechtsstand ist ueberall gleich', () => {
  it('deutsche Fassung', () => {
    const stellen = [
      de.footer.legalDate,
      de.pdf.rechtstandDatum,
      de.landing.combined.subtitle,
      de.wissenPages.foerdermittel.disclaimer,
    ];
    for (const s of stellen) {
      expect(s, `"${s}" nennt nicht ${STAND_DE}`).toContain(STAND_DE);
    }
  });

  it('englische Fassung', () => {
    const stellen = [
      en.footer.legalDate,
      en.pdf.rechtstandDatum,
      en.landing.combined.subtitle,
      en.wissenPages.foerdermittel.disclaimer,
    ];
    for (const s of stellen) {
      expect(s, `"${s}" nennt nicht ${STAND_EN}`).toContain(STAND_EN);
    }
  });

  it('nennt kein aelteres Datum mehr', () => {
    const alle = JSON.stringify(de) + JSON.stringify(en);
    expect(alle).not.toContain('Rechtsstand: Februar 2026');
    expect(alle).not.toContain('Legal status: February 2026');
    expect(alle).not.toContain('Rechtsstand: August 2026');
    expect(alle).not.toContain('Legal status: August 2026');
    expect(alle).not.toContain('Anträge bis 31.12.2026');
  });
});

/** Inhaltsprüfung 13.11.2026 (docs/pruefprotokoll): diese Fehlangaben dürfen nicht zurückkommen. */
describe('korrigierte Fehlangaben bleiben draußen', () => {
  const alle = JSON.stringify(de) + JSON.stringify(en);
  it.each([
    'NIS2UmsCG',          // Gesetz heißt NIS2UmsuCG
    'EN 18031-1',         // RED-Norm, keine CRA-hEN
    'JC 2023 86',         // jetzt DelVO (EU) 2024/1774
    'JC 2024 33',         // jetzt DurchfVO (EU) 2025/302
    'Art. 28-44 DORA',    // Pflichten der FU: Art. 28-30
    'DE.DP',              // in NIST CSF 2.0 entfallen
    'OPS-07',             // C5-IDs nicht belegt
    'macOS-Malware',      // unbelegte Statistik
    'Labore, Pharma',     // nur EU-Referenzlabore
  ])('%s', (s) => {
    expect(alle).not.toContain(s);
  });
});
