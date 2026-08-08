import { describe, it, expect } from 'vitest';
import { calculatePenalty, REVENUE_CAP_THRESHOLD } from './bussgeld';

/**
 * §65 BSIG kennt — anders als Art. 34 NIS2-RL — kein "je nachdem, welcher
 * Betrag hoeher ist". Die prozentuale Obergrenze gilt nach Abs. 6 und 7 nur
 * gegenueber Einrichtungen mit einem Gesamtumsatz von mehr als 500 Mio. EUR.
 *
 * Der Umschlagpunkt von Math.max faellt exakt auf diese Schwelle, weil
 * 2 % bzw. 1,4 % von 500 Mio. EUR genau 10 Mio. bzw. 7 Mio. EUR ergeben.
 * Faellt das auseinander, stimmt entweder ein Betrag oder ein Prozentsatz
 * nicht mehr mit dem Gesetz ueberein.
 */
describe('Bussgeld nach §65 BSIG', () => {
  it('nennt unterhalb von 500 Mio. EUR keine prozentuale Obergrenze', () => {
    const kmu = calculatePenalty('besonders-wichtig', 50_000_000);
    expect(kmu.revenueCapApplies).toBe(false);
    expect(kmu.effectiveMaxPenalty).toBe(10_000_000);

    const wichtig = calculatePenalty('wichtig', 50_000_000);
    expect(wichtig.revenueCapApplies).toBe(false);
    expect(wichtig.effectiveMaxPenalty).toBe(7_000_000);
  });

  it('greift die prozentuale Obergrenze erst oberhalb der Schwelle', () => {
    expect(calculatePenalty('besonders-wichtig', REVENUE_CAP_THRESHOLD).revenueCapApplies).toBe(false);
    expect(calculatePenalty('besonders-wichtig', REVENUE_CAP_THRESHOLD + 1).revenueCapApplies).toBe(true);
  });

  it('haelt Umschlagpunkt und gesetzliche Schwelle deckungsgleich', () => {
    // Genau auf der Schwelle muessen fester Betrag und Prozentwert gleich sein.
    const bw = calculatePenalty('besonders-wichtig', REVENUE_CAP_THRESHOLD);
    expect(bw.maxPenaltyRevenueBased).toBe(bw.maxPenaltyAbsolute);

    const w = calculatePenalty('wichtig', REVENUE_CAP_THRESHOLD);
    expect(w.maxPenaltyRevenueBased).toBe(w.maxPenaltyAbsolute);
  });

  it('rechnet oberhalb der Schwelle mit dem Prozentsatz', () => {
    const konzern = calculatePenalty('besonders-wichtig', 1_000_000_000);
    expect(konzern.revenueCapApplies).toBe(true);
    expect(konzern.effectiveMaxPenalty).toBe(20_000_000); // 2 % von 1 Mrd.
  });

  it('zitiert die Absaetze, in denen die Betraege wirklich stehen', () => {
    expect(calculatePenalty('besonders-wichtig', 1_000).legalReference).toContain('Abs. 5');
    expect(calculatePenalty('besonders-wichtig', 1_000).legalReference).toContain('Abs. 6');
    expect(calculatePenalty('wichtig', 1_000).legalReference).toContain('Abs. 7');
  });

  it('gibt fuer nicht betroffene Einrichtungen nichts aus', () => {
    const keins = calculatePenalty('nicht-betroffen', 1_000_000_000);
    expect(keins.effectiveMaxPenalty).toBe(0);
    expect(keins.revenueCapApplies).toBe(false);
  });
});
