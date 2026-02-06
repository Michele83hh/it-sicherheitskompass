// src/lib/scoring/methodology.ts

/**
 * Scoring Methodology Documentation
 *
 * Structured data explaining how NIS2 readiness scores are calculated.
 * Used by the Results Dashboard UI to show methodology transparency (SCORE-07).
 * All text uses translation keys for i18n support.
 */

export interface MethodologyStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export interface TrafficLightExplanation {
  color: 'red' | 'yellow' | 'green';
  labelKey: string;
  rangeKey: string;
  descriptionKey: string;
}

export interface ScoringMethodology {
  titleKey: string;
  introKey: string;
  steps: MethodologyStep[];
  trafficLights: TrafficLightExplanation[];
  disclaimerKey: string;
  legalBasis: string;
}

/**
 * Complete scoring methodology as structured data.
 *
 * The UI reads this object and resolves translation keys at render time
 * via next-intl's `useTranslations()` hook.
 */
export const SCORING_METHODOLOGY: ScoringMethodology = {
  titleKey: 'methodology.title',
  introKey: 'methodology.intro',
  steps: [
    {
      id: 'maturity-levels',
      titleKey: 'methodology.steps.maturityLevels.title',
      descriptionKey: 'methodology.steps.maturityLevels.description',
    },
    {
      id: 'category-score',
      titleKey: 'methodology.steps.categoryScore.title',
      descriptionKey: 'methodology.steps.categoryScore.description',
    },
    {
      id: 'traffic-light',
      titleKey: 'methodology.steps.trafficLight.title',
      descriptionKey: 'methodology.steps.trafficLight.description',
    },
    {
      id: 'overall-score',
      titleKey: 'methodology.steps.overallScore.title',
      descriptionKey: 'methodology.steps.overallScore.description',
    },
  ],
  trafficLights: [
    {
      color: 'red',
      labelKey: 'methodology.trafficLights.red.label',
      rangeKey: 'methodology.trafficLights.red.range',
      descriptionKey: 'methodology.trafficLights.red.description',
    },
    {
      color: 'yellow',
      labelKey: 'methodology.trafficLights.yellow.label',
      rangeKey: 'methodology.trafficLights.yellow.range',
      descriptionKey: 'methodology.trafficLights.yellow.description',
    },
    {
      color: 'green',
      labelKey: 'methodology.trafficLights.green.label',
      rangeKey: 'methodology.trafficLights.green.range',
      descriptionKey: 'methodology.trafficLights.green.description',
    },
  ],
  disclaimerKey: 'methodology.disclaimer',
  legalBasis: 'Art. 21(2)(a-j) NIS2-RL / §30 Abs. 2 Nr. 1-10 BSIG (BGBl. 2025 I Nr. 301)',
};
