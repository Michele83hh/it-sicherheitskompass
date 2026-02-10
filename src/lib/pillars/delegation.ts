// src/lib/pillars/delegation.ts

/**
 * Delegation utilities for pillar tasks.
 * Generates mailto URLs with pre-filled subject/body for delegating
 * security improvement tasks to IT teams.
 */

export function generateMailtoUrl(params: {
  pillarName: string;
  pillarNumber: number;
  score: number | null;
  openComponents: string[];
  translations: {
    subject: string;
    bodyIntro: string;
    bodyScore: string;
    bodyComponents: string;
    bodyOutro: string;
  };
}): string {
  const { pillarName, pillarNumber, score, openComponents, translations } = params;

  const subject = translations.subject
    .replace('{pillarNumber}', String(pillarNumber))
    .replace('{pillarName}', pillarName);

  const scoreText = score !== null
    ? translations.bodyScore.replace('{score}', String(Math.round(score)))
    : '';

  const componentList = openComponents.length > 0
    ? `${translations.bodyComponents}\n${openComponents.map((c) => `  - ${c}`).join('\n')}`
    : '';

  const body = [
    translations.bodyIntro
      .replace('{pillarNumber}', String(pillarNumber))
      .replace('{pillarName}', pillarName),
    '',
    scoreText,
    '',
    componentList,
    '',
    translations.bodyOutro,
  ]
    .filter((line) => line !== undefined)
    .join('\n');

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
