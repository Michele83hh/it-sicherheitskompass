/**
 * Deduplication Service
 *
 * Looks up answers from previously completed assessments in other regulations
 * and provides suggestions for equivalent questions.
 */

import { getEquivalentQuestions, getDeduplicableQuestions, type EquivalenceConfidence } from './question-equivalences';
import type { Answer, MaturityLevel } from './types';

export interface SuggestedAnswer {
  /** The question this suggestion is for */
  questionId: string;
  /** Suggested maturity level from the other regulation */
  suggestedLevel: MaturityLevel;
  /** Which regulation the suggestion comes from */
  sourceRegulation: string;
  /** Which question ID in the source regulation */
  sourceQuestionId: string;
  /** Equivalence confidence */
  confidence: EquivalenceConfidence;
  /** i18n key for the topic */
  topicKey: string;
}

/**
 * Retrieve stored answers for a regulation from localStorage.
 * Returns empty array if no assessment data exists.
 */
function getStoredAnswers(regulationId: string): Answer[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${regulationId}-assessment-storage`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed?.state?.answers || parsed?.answers || [];
  } catch {
    return [];
  }
}

/**
 * For a given regulation and question, find the best suggestion
 * from other regulations' completed assessments.
 *
 * Returns null if no suggestion is available.
 */
export function getSuggestionForQuestion(
  currentRegulation: string,
  questionId: string
): SuggestedAnswer | null {
  const equivalences = getEquivalentQuestions(currentRegulation, questionId);
  if (equivalences.length === 0) return null;

  // Priority: exact > high > approximate
  const confidenceOrder: Record<EquivalenceConfidence, number> = {
    exact: 0,
    high: 1,
    approximate: 2,
  };

  // Sort by confidence (best first)
  const sorted = [...equivalences].sort(
    (a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence]
  );

  for (const equiv of sorted) {
    const otherAnswers = getStoredAnswers(equiv.regulationId);
    if (otherAnswers.length === 0) continue;

    // Find matching answer in the other regulation
    for (const otherQId of equiv.questionIds) {
      const match = otherAnswers.find((a) => a.questionId === otherQId);
      if (match) {
        return {
          questionId,
          suggestedLevel: match.level,
          sourceRegulation: equiv.regulationId,
          sourceQuestionId: otherQId,
          confidence: equiv.confidence,
          topicKey: equiv.topicKey,
        };
      }
    }
  }

  return null;
}

/**
 * Batch lookup: get all suggestions for questions in a category.
 *
 * Returns a Map of questionId -> SuggestedAnswer.
 */
export function getSuggestionsForCategory(
  currentRegulation: string,
  questionIds: string[]
): Map<string, SuggestedAnswer> {
  const suggestions = new Map<string, SuggestedAnswer>();

  for (const qId of questionIds) {
    const suggestion = getSuggestionForQuestion(currentRegulation, qId);
    if (suggestion) {
      suggestions.set(qId, suggestion);
    }
  }

  return suggestions;
}

/**
 * Count how many questions in a regulation already have suggestions
 * from other assessments. Used for dashboard display.
 */
export function countAvailableSuggestions(regulationId: string): {
  total: number;
  withSuggestions: number;
  sourceRegulations: string[];
} {
  const deduplicable = getDeduplicableQuestions(regulationId);

  let withSuggestions = 0;
  const sources = new Set<string>();

  for (const qId of deduplicable) {
    const suggestion = getSuggestionForQuestion(regulationId, qId);
    if (suggestion) {
      withSuggestions++;
      sources.add(suggestion.sourceRegulation);
    }
  }

  return {
    total: deduplicable.size,
    withSuggestions,
    sourceRegulations: Array.from(sources),
  };
}
