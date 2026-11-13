import { describe, it, expect } from 'vitest';
import './init';
import { getRegulation } from './registry';
import { QUESTION_EQUIVALENCES } from './question-equivalences';

describe('Fragen-Äquivalenzen', () => {
  it('jede zugeordnete Frage existiert im jeweiligen Regelwerk', () => {
    const bad: string[] = [];
    for (const e of QUESTION_EQUIVALENCES)
      for (const [reg, ids] of Object.entries(e.questions))
        for (const id of ids)
          if (!getRegulation(reg)?.questions.some((q) => q.id === id)) bad.push(`${e.topic}: ${reg}/${id}`);
    expect(bad).toEqual([]);
  });

  it('jedes Thema verbindet mindestens zwei Regelwerke, jede Frage steht in höchstens einem Thema', () => {
    const seen = new Map<string, string>();
    for (const e of QUESTION_EQUIVALENCES) {
      expect(Object.keys(e.questions).length, e.topic).toBeGreaterThanOrEqual(2);
      for (const [reg, ids] of Object.entries(e.questions))
        for (const id of ids) {
          const key = `${reg}/${id}`;
          expect(seen.get(key), `${key} in ${e.topic}`).toBeUndefined();
          seen.set(key, e.topic);
        }
    }
  });
});
