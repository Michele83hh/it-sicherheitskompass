import { describe, it, expect } from 'vitest';
import de from '../messages/de.json';
import en from '../messages/en.json';

/**
 * Der Rechtsstand steht an mehreren Stellen im Text (Footer, PDF, Landing,
 * Foerdermittel). Ein Umbau auf einen Parameter wuerde die PDF-Erzeugung
 * beruehren; stattdessen faellt hier auf, wenn eine Stelle beim naechsten
 * Update vergessen wird.
 */
const STAND_DE = 'August 2026';
const STAND_EN = 'August 2026';

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
  });
});
