import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import de from '../../messages/de.json';
import en from '../../messages/en.json';
import './init';
import { getAllRegulations } from './registry';

const get = (obj: unknown, key: string) =>
  key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], obj);

const missing = (keys: Iterable<string>) =>
  [...new Set(keys)].filter((k) => get(de, k) === undefined || get(en, k) === undefined);

describe('Übersetzungsschlüssel der Regelwerke', () => {
  it('alle 15 Regelwerke sind registriert', () => {
    expect(getAllRegulations()).toHaveLength(15);
  });

  // Die config.ts bildet Fragen Feld für Feld ab — ohne Durchreichen fehlt die Auswahl im Formular.
  it('„trifft nicht zu“ kommt bei 21 Fragen in der Konfiguration an', () => {
    const flagged = getAllRegulations().flatMap((r) => r.questions.filter((q) => q.notApplicableAllowed));
    expect(flagged).toHaveLength(21);
  });

  // Meilenstein und Vertiefung nennen feste Zahlen („30 von 50“, „+20 Fragen“).
  it('Regelwerke mit Kern und Vertiefung haben 30 Kern- und 20 Vertiefungsfragen', () => {
    const tiered = getAllRegulations().filter((r) => r.features.hasTieredAssessment);
    expect(tiered.map((r) => r.id).sort()).toEqual(['dsgvo', 'nis2']);
    for (const r of tiered) {
      expect(r.questions.filter((q) => q.tier === 'core')).toHaveLength(30);
      expect(r.questions).toHaveLength(50);
      // resetPhase im Store trennt nach der Nummer in der ID: q1-q3 Kern, q4-q5 Vertiefung.
      expect(r.questions.filter((q) => (Number(q.id.split('-q')[1]) <= 3) !== (q.tier === 'core'))).toEqual([]);
    }
  });

  // Die Antwort ist eine von vier Stufen; dazu passt nur eine Ja-Grad-Frage.
  it('kein deutscher Fragetitel ist eine offene Frage (Wie, Welche, Was)', () => {
    const open = getAllRegulations()
      .flatMap((r) => r.questions.map((q) => get(de, q.titleKey) as string))
      .filter((t) => /^(Wie|Welche[rs]?|Was|Wer|Wann|Wo) /.test(t));
    expect(open).toEqual([]);
  });

  it('kein Fragetitel ist länger als 130 Zeichen', () => {
    const long = getAllRegulations().flatMap((r) =>
      r.questions.flatMap((q) =>
        [de, en].filter((m) => (get(m, q.titleKey) as string).length > 130).map(() => q.id),
      ),
    );
    expect(long).toEqual([]);
  });

  it('der Hinweis „nicht ausdrücklich verlangt“ kommt bei 3 NIS2-Fragen an', () => {
    const flagged = getAllRegulations().flatMap((r) => r.questions.filter((q) => q.beyondMinimum));
    expect(flagged.map((q) => q.id)).toEqual(['ea-q5', 'cr-q5', 'mc-q4']);
  });

  it.each(getAllRegulations().map((r) => [r.id, r] as const))(
    '%s: Bereiche, Fragen, Empfehlungen und Schnellcheck sind in DE und EN übersetzt',
    (_id, r) => {
      const keys = [
        r.nameKey,
        r.shortNameKey,
        r.descriptionKey,
        r.fullNameKey,
        ...r.categories.flatMap((c) => [
          c.nameKey,
          c.shortNameKey,
          c.descriptionKey,
          // Einleitungstext je Bereich, so gebildet wie in category-step.tsx
          c.nameKey.replace('.name', '.empoweringIntro'),
        ]),
        ...r.questions.flatMap((q) => [
          q.titleKey,
          q.tooltipKey,
          q.helpKey,
          ...Object.values(q.maturityDescriptions),
        ]),
        ...r.recommendations.flatMap((x) => [
          x.titleKey,
          x.descriptionKey,
          x.firstStepKey,
          ...(x.checklistKey ? [x.checklistKey] : []),
        ]),
        ...(r.quickCheckQuestions ?? []).flatMap((q) => [q.questionKey, q.descriptionKey]),
      ];
      expect(missing(keys)).toEqual([]);
    },
  );

  // Fängt Schlüssel in Hilfsdateien ab, die nicht über die Registry laufen.
  it.each(getAllRegulations().map((r) => [r.id, r] as const))(
    '%s: Reifegrad-Texte sind je Frage eigene Texte',
    (_id, r) => {
      for (const msgs of [de, en]) {
        const texts = r.questions.map((q) =>
          Object.values(q.maturityDescriptions).map((k) => get(msgs, k)).join('|'),
        );
        expect(new Set(texts).size).toBe(texts.length);
      }
    },
  );

  it('jeder Schlüssel-Literal in src/lib/regulations existiert in DE und EN', () => {
    const roots = new Set(Object.keys(de));
    const found: string[] = [];
    const walk = (dir: string) => {
      for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (/\.ts$/.test(f) && !/\.test\.ts$/.test(f)) {
          for (const m of fs
            .readFileSync(p, 'utf8')
            .matchAll(/'([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9_-]+){2,})'/g)) {
            if (roots.has(m[1].split('.')[0])) found.push(m[1]);
          }
        }
      }
    };
    walk(__dirname);
    expect(missing(found)).toEqual([]);
  });
});
