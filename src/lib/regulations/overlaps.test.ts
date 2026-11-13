import { describe, it, expect } from 'vitest';
import de from '../../messages/de.json';
import en from '../../messages/en.json';
import { REGULATION_OVERLAPS } from './overlaps';
import { REGULATION_IDS } from './types';

const get = (obj: unknown, key: string) =>
  key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], obj);

describe('Regelwerk-Überschneidungen', () => {
  it('jedes Paar höchstens einmal, keine Selbstbezüge, nur bekannte Regelwerke', () => {
    const seen = new Set<string>();
    for (const o of REGULATION_OVERLAPS) {
      expect(REGULATION_IDS).toContain(o.regA);
      expect(REGULATION_IDS).toContain(o.regB);
      expect(o.regA).not.toBe(o.regB);
      const key = [o.regA, o.regB].sort().join('|');
      expect(seen.has(key), key).toBe(false);
      seen.add(key);
    }
  });

  it('jedes Regelwerk hat mindestens eine Verbindung', () => {
    for (const id of REGULATION_IDS) {
      expect(REGULATION_OVERLAPS.some((o) => o.regA === id || o.regB === id), id).toBe(true);
    }
  });

  it('Maßnahmenthemen sind in DE und EN übersetzt', () => {
    for (const k of new Set(REGULATION_OVERLAPS.flatMap((o) => o.sharedMeasureKeys))) {
      expect(typeof get(de, k), k).toBe('string');
      expect(typeof get(en, k), k).toBe('string');
    }
  });

  it('Quellen-Links sind https', () => {
    for (const o of REGULATION_OVERLAPS) {
      if (o.source?.url) expect(o.source.url).toMatch(/^https:\/\//);
    }
  });
});
