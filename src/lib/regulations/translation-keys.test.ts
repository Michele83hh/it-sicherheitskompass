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

  it.each(getAllRegulations().map((r) => [r.id, r] as const))(
    '%s: Bereiche, Fragen, Empfehlungen und Schnellcheck sind in DE und EN übersetzt',
    (_id, r) => {
      const keys = [
        r.nameKey,
        r.shortNameKey,
        r.descriptionKey,
        r.fullNameKey,
        ...r.categories.flatMap((c) => [c.nameKey, c.shortNameKey, c.descriptionKey]),
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
