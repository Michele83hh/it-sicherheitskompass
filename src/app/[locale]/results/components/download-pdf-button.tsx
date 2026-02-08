'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGapAnalysisStore } from '@/stores/gap-analysis-store';
import { useWizardStore } from '@/stores/wizard-store';
import { useProgressStore } from '@/stores/progress-store';
import { usePdfSectionsStore, type PDFSectionKey } from '@/stores/pdf-sections-store';
import { CATEGORIES } from '@/lib/nis2/categories';
import { getSectorById } from '@/lib/nis2/sectors';
import { classifyEntity } from '@/lib/nis2/classification';
import { getRecommendationsByCategory } from '@/lib/nis2/recommendations';
import { getCoreQuestionCount, getTotalQuestionCount } from '@/lib/nis2/questions';
import { calculatePenalty } from '@/lib/nis2/bussgeld';
import { generateRoadmap } from '@/lib/nis2/roadmap';
import { getAdjustedCostEstimate, getSizeFactor, type CompanyProfile } from '@/lib/nis2/cost-estimation';
import { NIS2_DSGVO_OVERLAPS, calculateOverallOverlap } from '@/lib/nis2/dsgvo-overlap';
import { ISO27001_MAPPINGS, calculateOverallAlignment } from '@/lib/nis2/iso27001';
import { DIN_SPEC_AREAS } from '@/lib/nis2/din-spec';
import { EVIDENCE_ITEMS } from '@/lib/nis2/evidence';
import { getSectorGuidance, hasSectorGuidance } from '@/lib/nis2/sector-guidance';
import type { OverallScore } from '@/lib/nis2/types';
import type { PDFPayload, PDFCategoryResult, PDFRecommendation, PDFExecutiveSummary } from '@/lib/pdf/types';
import { Download, Loader2, Lock } from 'lucide-react';

interface DownloadPdfButtonProps {
  overallScore: OverallScore;
}

// Section config: key, whether it has data, whether it's a core (non-deselectable) section
interface SectionConfig {
  key: PDFSectionKey;
  hasData: boolean;
}

const OPTIONAL_SECTIONS: SectionConfig[] = [];

export default function DownloadPdfButton({ overallScore }: DownloadPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const locale = params?.locale as 'de' | 'en';

  const answers = useGapAnalysisStore((state) => state.answers);
  const formData = useWizardStore((state) => state.formData);

  const t = useTranslations('results');
  const tPdf = useTranslations('pdf');
  const tSectors = useTranslations('sectors');
  const tCategories = useTranslations('categories');
  const tRec = useTranslations('recommendations');
  const tClass = useTranslations('classification');
  const tRoadmap = useTranslations('roadmap');
  const tDsgvo = useTranslations('dsgvoOverlap');
  const tDinSpec = useTranslations('dinSpec');
  const tEvidence = useTranslations('evidence');
  const tKritis = useTranslations('kritis');
  const tSectorGuidance = useTranslations('sectorGuidance');

  const { getProgress, getCompletionPercentage, getStatusCounts } = useProgressStore();
  const { sections, toggleSection, selectAll, deselectAll } = usePdfSectionsStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Compute which sections have data
  const classificationInput = {
    sectorId: formData.sectorId || '',
    subsectorId: formData.subsectorId || null,
    employees: formData.employees || 0,
    annualRevenue: formData.annualRevenue || 0,
    balanceSheet: formData.balanceSheet || 0,
    isKritis: formData.isKritis || false,
  };
  const classificationResult = classifyEntity(classificationInput);
  const classCategory = classificationResult.category;
  const isClassified = classCategory === 'besonders-wichtig' || classCategory === 'wichtig';
  const sectorId = formData.sectorId || '';

  const sectionAvailability: Record<PDFSectionKey, boolean> = {
    penalty: isClassified,
    costSummary: true,
    roadmap: true,
    dsgvoOverlap: true,
    iso27001: true,
    dinSpec: true,
    evidence: isClassified,
    sectorGuidance: sectorId ? hasSectorGuidance(sectorId) : false,
    kritis: formData.isKritis || false,
    progress: true,
  };

  const optionalSectionKeys: PDFSectionKey[] = [
    'penalty', 'costSummary', 'roadmap',
    'dsgvoOverlap', 'iso27001', 'dinSpec', 'evidence',
    'sectorGuidance', 'kritis', 'progress',
  ];

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Build company profile
      const sector = getSectorById(formData.sectorId || '');
      const sectorName = sector ? tSectors(`${sector.id}.name`) : 'Unknown';
      const subsector = sector?.subsectors.find(s => s.id === formData.subsectorId);
      const subsectorName = subsector
        ? tSectors(subsector.nameKey.replace('sectors.', ''))
        : undefined;

      const categoryKeyMap: Record<string, string> = {
        'besonders-wichtig': 'besondersWichtig',
        'wichtig': 'wichtig',
        'nicht-betroffen': 'nichtBetroffen',
      };
      const classification = tClass(`categories.${categoryKeyMap[classificationResult.category] || classificationResult.category}`);
      const legalReference = classificationResult.legalReference;

      // Build category results
      const categoryResults: PDFCategoryResult[] = overallScore.categoryScores.map((catScore) => {
        const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!;
        const categoryName = tCategories(category.nameKey.replace('categories.', ''));
        const shortName = tCategories(category.shortNameKey.replace('categories.', ''));
        const verdict = t(`verdict.${catScore.trafficLight}` as 'verdict.red');

        return {
          categoryId: catScore.categoryId,
          categoryName,
          shortName,
          percentage: catScore.percentage,
          trafficLight: catScore.trafficLight,
          euArticle: category.euArticle,
          bsigParagraph: category.bsigParagraph,
          verdict,
        };
      });

      // Build recommendations (all categories, sorted by traffic light and priority)
      const allRecommendations: PDFRecommendation[] = [];
      const trafficLightOrder = { red: 0, yellow: 1, green: 2 };
      const priorityOrder = { high: 0, medium: 1, low: 2 };

      [...overallScore.categoryScores]
        .sort((a, b) => trafficLightOrder[a.trafficLight] - trafficLightOrder[b.trafficLight])
        .forEach((catScore) => {
          const category = CATEGORIES.find((c) => c.id === catScore.categoryId)!;
          const categoryName = tCategories(category.nameKey.replace('categories.', ''));
          const recommendations = getRecommendationsByCategory(catScore.categoryId);

          recommendations
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
            .forEach((rec) => {
              allRecommendations.push({
                categoryId: catScore.categoryId,
                categoryName,
                title: tRec(rec.titleKey.replace('recommendations.', '')),
                description: tRec(rec.descriptionKey.replace('recommendations.', '')),
                firstStep: tRec(rec.firstStepKey.replace('recommendations.', '')),
                priority: rec.priority,
                effortLevel: rec.effortLevel,
                legalReference: rec.legalReference,
                bsiReference: rec.bsiReference,
              });
            });
        });

      // Flatten translation messages for PDF
      const messages: Record<string, string> = {
        'pdf.title': tPdf('title'),
        'pdf.subtitle': tPdf('subtitle'),
        'pdf.disclaimer': tPdf('disclaimer'),
        'pdf.rechtsstand': tPdf('rechtsstand'),
        'pdf.rechtstandDatum': tPdf('rechtstandDatum'),
        'pdf.generatedAt': tPdf('generatedAt'),
        'pdf.companyProfile': tPdf('companyProfile'),
        'pdf.sector': tPdf('sector'),
        'pdf.subsector': tPdf('subsector'),
        'pdf.employees': tPdf('employees'),
        'pdf.annualRevenue': tPdf('annualRevenue'),
        'pdf.classification': tPdf('classification'),
        'pdf.legalReference': tPdf('legalReference'),
        'pdf.overallScore': tPdf('overallScore'),
        'pdf.completionRate': tPdf('completionRate'),
        'pdf.answeredQuestions': tPdf('answeredQuestions'),
        'pdf.categories': tPdf('categories'),
        'pdf.categoryTableHeaders.nr': tPdf('categoryTableHeaders.nr'),
        'pdf.categoryTableHeaders.category': tPdf('categoryTableHeaders.category'),
        'pdf.categoryTableHeaders.score': tPdf('categoryTableHeaders.score'),
        'pdf.categoryTableHeaders.status': tPdf('categoryTableHeaders.status'),
        'pdf.categoryTableHeaders.legalBasis': tPdf('categoryTableHeaders.legalBasis'),
        'pdf.recommendations': tPdf('recommendations'),
        'pdf.priority.high': tPdf('priority.high'),
        'pdf.priority.medium': tPdf('priority.medium'),
        'pdf.priority.low': tPdf('priority.low'),
        'pdf.effortLevel.quick': tPdf('effortLevel.quick'),
        'pdf.effortLevel.medium': tPdf('effortLevel.medium'),
        'pdf.effortLevel.strategic': tPdf('effortLevel.strategic'),
        'pdf.firstStep': tPdf('firstStep'),
      };

      // Add section header messages
      messages['pdf.penalty.title'] = locale === 'de' ? 'Bußgeldberechnung' : 'Penalty Calculation';
      messages['pdf.penalty.classification'] = locale === 'de' ? 'Einstufung' : 'Classification';
      messages['pdf.penalty.annualRevenue'] = locale === 'de' ? 'Jahresumsatz' : 'Annual Revenue';
      messages['pdf.penalty.fixedMax'] = locale === 'de' ? 'Fester Höchstbetrag' : 'Fixed Maximum';
      messages['pdf.penalty.revenueMax'] = locale === 'de' ? 'Umsatzbasiertes Maximum' : 'Revenue-based Maximum';
      messages['pdf.penalty.effectiveMax'] = locale === 'de' ? 'Anwendbares Maximum' : 'Applicable Maximum';
      messages['pdf.penalty.legalBasis'] = locale === 'de' ? 'Rechtsgrundlage' : 'Legal Basis';
      messages['pdf.roadmap.title'] = locale === 'de' ? 'Umsetzungs-Roadmap' : 'Implementation Roadmap';
      messages['pdf.cost.title'] = locale === 'de' ? 'Kostenschätzung' : 'Cost Estimation';
      messages['pdf.cost.internalDays'] = locale === 'de' ? 'Interner Aufwand (Personentage)' : 'Internal Effort (Person-Days)';
      messages['pdf.cost.externalCost'] = locale === 'de' ? 'Externe Beratung' : 'External Consulting';
      messages['pdf.cost.toolsCost'] = locale === 'de' ? 'Tools & Lizenzen (p.a.)' : 'Tools & Licenses (p.a.)';
      messages['pdf.cost.totalEstimated'] = locale === 'de' ? 'Geschätzte Gesamtkosten' : 'Estimated Total Cost';
      messages['pdf.cost.days'] = locale === 'de' ? 'Tage' : 'days';
      messages['pdf.cost.perYear'] = locale === 'de' ? '/Jahr' : '/year';
      // pdf.cost.disclaimer is now loaded from translation files via tPdf('cost.disclaimer') below
      // New PDF keys: value proposition, summary, cost tiers, non-affected framing
      messages['pdf.valueProposition'] = tPdf('valueProposition');
      messages['pdf.summary.title'] = tPdf('summary.title');
      messages['pdf.cost.contextIntro'] = tPdf('cost.contextIntro');
      messages['pdf.cost.contextScaling'] = tPdf('cost.contextScaling');
      messages['pdf.cost.contextNote'] = tPdf('cost.contextNote');
      messages['pdf.cost.tier.basisschutz'] = tPdf('cost.tier.basisschutz');
      messages['pdf.cost.tier.basisschutzSub'] = tPdf('cost.tier.basisschutzSub');
      messages['pdf.cost.tier.erweitert'] = tPdf('cost.tier.erweitert');
      messages['pdf.cost.tier.erweiterSub'] = tPdf('cost.tier.erweiterSub');
      messages['pdf.cost.tier.nis2niveau'] = tPdf('cost.tier.nis2niveau');
      messages['pdf.cost.tier.nis2niveauSub'] = tPdf('cost.tier.nis2niveauSub');
      messages['pdf.cost.tierRecommended'] = tPdf('cost.tierRecommended');
      messages['pdf.nonAffected.label'] = tPdf('nonAffected.label');
      messages['pdf.nonAffected.benefits'] = tPdf('nonAffected.benefits');
      messages['pdf.nonAffected.coverTitle'] = tPdf('nonAffected.coverTitle');
      messages['pdf.nonAffected.coverPoint1'] = tPdf('nonAffected.coverPoint1');
      messages['pdf.nonAffected.coverPoint2'] = tPdf('nonAffected.coverPoint2');
      messages['pdf.nonAffected.coverPoint3'] = tPdf('nonAffected.coverPoint3');
      // Business-impact Klartext per category (keyed by translated category name)
      for (const cat of CATEGORIES) {
        const catName = tCategories(cat.nameKey.replace('categories.', ''));
        const impactKey = `rec.impact.${cat.id}`;
        try {
          messages[`pdf.rec.impact.${catName}`] = tPdf(impactKey);
        } catch {
          // Key doesn't exist yet — skip silently
        }
      }
      // Executive summary translation keys
      messages['pdf.executive.title'] = tPdf('executive.title');
      messages['pdf.executive.riskTitle'] = tPdf('executive.riskTitle');
      messages['pdf.executive.quickWinTitle'] = tPdf('executive.quickWinTitle');
      messages['pdf.executive.quickWinDays'] = tPdf('executive.quickWinDays');
      messages['pdf.executive.totalBasisschutz'] = tPdf('executive.totalBasisschutz');
      messages['pdf.executive.ctaLine'] = tPdf('executive.ctaLine');
      messages['pdf.executive.startHint'] = tPdf('executive.startHint');
      messages['pdf.executive.targetLabel'] = tPdf('executive.targetLabel');
      messages['pdf.executive.glossaryRef'] = tPdf('executive.glossaryRef');
      messages['pdf.executive.optionA.title'] = tPdf('executive.optionA.title');
      messages['pdf.executive.optionA.text'] = tPdf('executive.optionA.text');
      messages['pdf.executive.optionB.title'] = tPdf('executive.optionB.title');
      messages['pdf.executive.optionB.text'] = tPdf('executive.optionB.text');
      messages['pdf.executive.optionC.title'] = tPdf('executive.optionC.title');
      messages['pdf.executive.optionC.text'] = tPdf('executive.optionC.text');
      // Benefit one-liners per category
      for (const cat of CATEGORIES) {
        try {
          messages[`pdf.rec.benefit.${cat.id}`] = tPdf(`rec.benefit.${cat.id}`);
        } catch {
          // Key doesn't exist — skip
        }
      }
      // Penalty context messages
      messages['pdf.penalty.contextTitle'] = tPdf('penalty.contextTitle');
      messages['pdf.penalty.scenario1'] = tPdf('penalty.scenario1');
      messages['pdf.penalty.scenario2'] = tPdf('penalty.scenario2');
      messages['pdf.penalty.scenario3'] = tPdf('penalty.scenario3');
      messages['pdf.penalty.liabilityTitle'] = tPdf('penalty.liabilityTitle');
      messages['pdf.penalty.liabilityText'] = tPdf('penalty.liabilityText');
      messages['pdf.penalty.liabilityDuty1'] = tPdf('penalty.liabilityDuty1');
      messages['pdf.penalty.liabilityDuty2'] = tPdf('penalty.liabilityDuty2');
      messages['pdf.penalty.liabilityDuty3'] = tPdf('penalty.liabilityDuty3');
      messages['pdf.penalty.liabilityProtectiveTitle'] = tPdf('penalty.liabilityProtectiveTitle');
      messages['pdf.penalty.liabilityProtective1'] = tPdf('penalty.liabilityProtective1');
      messages['pdf.penalty.liabilityProtective2'] = tPdf('penalty.liabilityProtective2');
      messages['pdf.penalty.liabilityProtective3'] = tPdf('penalty.liabilityProtective3');
      // CTA messages
      messages['pdf.cta.title'] = tPdf('cta.title');
      messages['pdf.cta.subtitle'] = tPdf('cta.subtitle');
      messages['pdf.cta.option1Title'] = tPdf('cta.option1Title');
      messages['pdf.cta.option1Text'] = tPdf('cta.option1Text');
      messages['pdf.cta.option2Title'] = tPdf('cta.option2Title');
      messages['pdf.cta.option2Text'] = tPdf('cta.option2Text');
      messages['pdf.cta.option3Title'] = tPdf('cta.option3Title');
      messages['pdf.cta.option3Text'] = tPdf('cta.option3Text');
      messages['pdf.cta.currentLabel'] = tPdf('cta.currentLabel');
      messages['pdf.cta.targetLabel'] = tPdf('cta.targetLabel');
      messages['pdf.cta.urgencyTitle'] = tPdf('cta.urgencyTitle');
      messages['pdf.cta.urgencyText'] = tPdf('cta.urgencyText');
      messages['pdf.cta.starterTitle'] = tPdf('cta.starterTitle');
      messages['pdf.cta.starterText'] = tPdf('cta.starterText');
      messages['pdf.cta.contactTitle'] = tPdf('cta.contactTitle');
      messages['pdf.cta.contactSubtitle'] = tPdf('cta.contactSubtitle');
      messages['pdf.cta.contactPlaceholder'] = tPdf('cta.contactPlaceholder');
      messages['pdf.cta.contactDetails'] = tPdf('cta.contactDetails');
      messages['pdf.cta.footerNote'] = tPdf('cta.footerNote');
      // Roadmap vision messages
      messages['pdf.roadmap.visionTitle'] = tPdf('roadmap.visionTitle');
      messages['pdf.roadmap.vision1'] = tPdf('roadmap.vision1');
      messages['pdf.roadmap.vision2'] = tPdf('roadmap.vision2');
      messages['pdf.roadmap.vision3'] = tPdf('roadmap.vision3');
      messages['pdf.roadmap.vision4'] = tPdf('roadmap.vision4');
      messages['pdf.roadmap.visionCta'] = tPdf('roadmap.visionCta');
      messages['pdf.roadmap.visionCtaTo'] = tPdf('roadmap.visionCtaTo');
      // Roadmap urgency/priority labels
      messages['pdf.urgency.critical'] = locale === 'de' ? 'Kritisch' : 'Critical';
      messages['pdf.urgency.high'] = locale === 'de' ? 'Hoch' : 'High';
      messages['pdf.urgency.medium'] = locale === 'de' ? 'Mittel' : 'Medium';
      messages['pdf.urgency.low'] = locale === 'de' ? 'Niedrig' : 'Low';
      messages['pdf.roadmap.measures'] = locale === 'de' ? 'Maßnahmen' : 'measures';
      // Mini-CTA messages
      messages['pdf.miniCta.title'] = tPdf('miniCta.title');
      messages['pdf.miniCta.text'] = tPdf('miniCta.text');
      // Appendix note for expert sections
      messages['pdf.appendix.note'] = tPdf('appendix.note');
      // Cover page quick wins title
      messages['pdf.cover.quickWinsTitle'] = tPdf('cover.quickWinsTitle');
      messages['pdf.cover.heroClaimTitle'] = tPdf('cover.heroClaimTitle');
      messages['pdf.cover.heroClaim1'] = tPdf('cover.heroClaim1');
      messages['pdf.cover.heroClaim2'] = tPdf('cover.heroClaim2');
      messages['pdf.cover.heroClaim3'] = tPdf('cover.heroClaim3');
      messages['pdf.cover.trustAnchor'] = tPdf('cover.trustAnchor');
      // Cost top-5 and entry project labels
      messages['pdf.cost.top10Title'] = locale === 'de' ? 'Top 10 Investitionen' : 'Top 10 Investments';
      messages['pdf.cost.investmentsTitle'] = locale === 'de' ? 'Investitionsübersicht' : 'Investment Overview';
      messages['pdf.cost.measureLabel'] = tPdf('cost.measureLabel');
      messages['pdf.cost.costLabel'] = tPdf('cost.costLabel');
      messages['pdf.cost.remainingCount'] = tPdf('cost.remainingCount');
      messages['pdf.cost.entryTitle'] = tPdf('cost.entryTitle');
      messages['pdf.cost.entrySub'] = tPdf('cost.entrySub');
      messages['pdf.cost.entryIncludes'] = tPdf('cost.entryIncludes');
      messages['pdf.cost.daysLabel'] = tPdf('cost.daysLabel');
      messages['pdf.cost.proportionalityTitle'] = tPdf('cost.proportionalityTitle');
      messages['pdf.cost.proportionalityText'] = tPdf('cost.proportionalityText');
      messages['pdf.cost.proportionalityHint'] = tPdf('cost.proportionalityHint');
      messages['pdf.cost.roiTitle'] = tPdf('cost.roiTitle');
      messages['pdf.cost.downtimeLabel'] = tPdf('cost.downtimeLabel');
      messages['pdf.cost.disclaimer'] = tPdf('cost.disclaimer');
      messages['pdf.cost.disclaimerInternal'] = tPdf('cost.disclaimerInternal');
      messages['pdf.cost.revenuePercent'] = tPdf('cost.revenuePercent');
      messages['pdf.cost.revenuePercentOf'] = tPdf('cost.revenuePercentOf');
      messages['pdf.cost.perEmployeeMonth'] = tPdf('cost.perEmployeeMonth');
      messages['pdf.cost.diyTitle'] = tPdf('cost.diyTitle');
      messages['pdf.cost.diyText'] = tPdf('cost.diyText');
      messages['pdf.cost.revenueWarning'] = tPdf('cost.revenueWarning');
      // Glossary messages
      messages['pdf.glossary.title'] = tPdf('glossary.title');
      messages['pdf.glossary.intro'] = tPdf('glossary.intro');
      const glossaryTerms = ['isms', 'bia', 'rto', 'rpo', 'bcm', 'mfa', 'pam', 'siem', 'soc', 'ioc', 'patchMgmt', 'zeroTrust', 'riskTreatment', 'audit', 'compliance'];
      for (const term of glossaryTerms) {
        messages[`pdf.glossary.${term}.term`] = tPdf(`glossary.${term}.term`);
        messages[`pdf.glossary.${term}.def`] = tPdf(`glossary.${term}.def`);
      }
      messages['pdf.dsgvo.title'] = locale === 'de' ? 'DSGVO-Überlappungsanalyse' : 'GDPR Overlap Analysis';
      messages['pdf.dsgvo.overallOverlap'] = locale === 'de' ? 'DSGVO-Überlappung gesamt' : 'Overall DSGVO Overlap';
      messages['pdf.dsgvo.nis2Area'] = locale === 'de' ? 'NIS2-Bereich' : 'NIS2 Area';
      messages['pdf.dsgvo.dsgvoArticle'] = locale === 'de' ? 'DSGVO-Artikel' : 'DSGVO Article';
      messages['pdf.dsgvo.overlap'] = locale === 'de' ? 'Überlappung' : 'Overlap';
      messages['pdf.dsgvo.note'] = locale === 'de' ? 'Die Überlappung zeigt, wie viel bestehende DSGVO-Compliance für NIS2-Anforderungen genutzt werden kann.' : 'Overlap indicates how much existing DSGVO compliance can be leveraged for NIS2 requirements.';
      messages['pdf.iso.title'] = locale === 'de' ? 'ISO 27001:2022 Crosswalk' : 'ISO 27001:2022 Crosswalk';
      messages['pdf.iso.overallAlignment'] = locale === 'de' ? 'ISO 27001 Abdeckung gesamt' : 'Overall ISO 27001 Alignment';
      messages['pdf.iso.nis2Category'] = locale === 'de' ? 'NIS2-Kategorie' : 'NIS2 Category';
      messages['pdf.iso.isoControls'] = locale === 'de' ? 'ISO 27001 Controls' : 'ISO 27001 Controls';
      messages['pdf.iso.alignment'] = locale === 'de' ? 'Abdeckung' : 'Alignment';
      messages['pdf.iso.note'] = locale === 'de' ? 'Zeigt die Zuordnung zwischen NIS2 Art. 21(2) Anforderungen und ISO/IEC 27001:2022 Annex A Controls.' : 'Shows mapping between NIS2 Art. 21(2) requirements and ISO/IEC 27001:2022 Annex A controls.';
      messages['pdf.kritis.title'] = locale === 'de' ? 'KRITIS-Einstufung' : 'KRITIS Classification';
      messages['pdf.kritis.note'] = locale === 'de'
        ? 'Diese Organisation kann als Betreiber kritischer Infrastruktur (KRITIS) gemäß BSI-KritisV eingestuft sein. KRITIS-Betreiber unterliegen über NIS2 hinausgehenden Pflichten, darunter Registrierung beim BSI, verschärfte Meldepflichten und regelmäßige Sicherheitsaudits (§31, §39 BSIG). Bitte konsultieren Sie die BSI KRITIS-Seite und holen Sie fachkundigen Rechtsrat ein.'
        : 'This organization may qualify as a critical infrastructure operator (KRITIS) under the BSI-KritisV. KRITIS operators are subject to additional obligations beyond NIS2, including registration with the BSI, mandatory incident reporting within stricter timelines, and regular security audits (§31, §39 BSIG). Please consult the BSI KRITIS page and seek specialized legal counsel.';
      messages['pdf.dinSpec.title'] = locale === 'de' ? 'DIN SPEC 27076 Vergleich' : 'DIN SPEC 27076 Comparison';
      messages['pdf.dinSpec.aspect'] = locale === 'de' ? 'Aspekt' : 'Aspect';
      messages['pdf.dinSpec.areas'] = locale === 'de' ? 'Themenfelder & NIS2-Abdeckung' : 'Coverage Areas';
      messages['pdf.dinSpec.beyond'] = locale === 'de' ? 'NIS2 Zusatzanforderungen (über DIN SPEC hinaus)' : 'NIS2 Additional Requirements (beyond DIN SPEC)';
      messages['pdf.evidence.title'] = locale === 'de' ? 'Nachweismanagement' : 'Evidence Management';
      messages['pdf.evidence.subtitle'] = locale === 'de' ? `Einstufung: ${classification}` : `Classification: ${classification}`;
      messages['pdf.evidence.type.document'] = locale === 'de' ? 'Dokument' : 'Document';
      messages['pdf.evidence.type.record'] = locale === 'de' ? 'Nachweis' : 'Record';
      messages['pdf.evidence.type.log'] = locale === 'de' ? 'Protokoll' : 'Log';
      messages['pdf.evidence.type.certificate'] = locale === 'de' ? 'Zertifikat' : 'Certificate';
      messages['pdf.evidence.legalBasis'] = locale === 'de' ? 'Rechtsgrundlage: §39 BSIG (Nachweispflichten)' : 'Legal basis: §39 BSIG (Evidence obligations)';
      messages['pdf.sector.title'] = locale === 'de' ? 'Branchenspezifische Hinweise' : 'Sector-Specific Guidance';
      messages['pdf.sector.regulations'] = locale === 'de' ? 'Zusätzliche Regulierungen' : 'Additional Regulations';
      messages['pdf.sector.challenges'] = locale === 'de' ? 'Branchenspezifische Herausforderungen' : 'Sector-Specific Challenges';
      messages['pdf.sector.recommendations'] = locale === 'de' ? 'Branchenempfehlungen' : 'Sector Recommendations';
      messages['pdf.kritis.aspect'] = locale === 'de' ? 'Aspekt' : 'Aspect';
      messages['pdf.progress.title'] = locale === 'de' ? 'Umsetzungsfortschritt' : 'Implementation Progress';
      messages['pdf.progress.overall'] = locale === 'de' ? 'Gesamtfortschritt' : 'Overall Progress';
      messages['pdf.progress.notStarted'] = locale === 'de' ? 'Offen' : 'Not Started';
      messages['pdf.progress.inProgress'] = locale === 'de' ? 'In Arbeit' : 'In Progress';
      messages['pdf.progress.completed'] = locale === 'de' ? 'Abgeschlossen' : 'Completed';
      messages['pdf.progress.status.not-started'] = locale === 'de' ? 'Offen' : 'Not Started';
      messages['pdf.progress.status.in-progress'] = locale === 'de' ? 'In Arbeit' : 'In Progress';
      messages['pdf.progress.status.completed'] = locale === 'de' ? 'Abgeschlossen' : 'Completed';
      messages['pdf.progress.startPointTitle'] = locale === 'de' ? 'Ihr Startpunkt' : 'Your Starting Point';
      messages['pdf.progress.startPointText'] = locale === 'de'
        ? 'Sie haben noch keine Maßnahme als umgesetzt markiert — das ist Ihr Ausgangspunkt. Mit den Quick Wins aus der Roadmap können Sie sofort starten.'
        : 'You haven\'t marked any measures as implemented yet — this is your starting point. You can start immediately with the quick wins from the roadmap.';

      // ── Management Summary bullets (dynamic, computed per-profile) ──
      const pct = overallScore.percentage;
      if (pct <= 25) {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — erheblicher Handlungsbedarf`
          : `${Math.round(pct)}% readiness — significant action needed`;
      } else if (pct <= 50) {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — deutlicher Verbesserungsbedarf`
          : `${Math.round(pct)}% readiness — substantial improvement needed`;
      } else if (pct <= 75) {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — gute Basis, gezielte Lücken schließen`
          : `${Math.round(pct)}% readiness — solid foundation, close targeted gaps`;
      } else {
        messages['pdf.summary.readiness'] = locale === 'de'
          ? `${Math.round(pct)}% Reifegrad — fortgeschrittene Cybersicherheit`
          : `${Math.round(pct)}% readiness — advanced cybersecurity posture`;
      }

      // Classification context
      if (classCategory === 'nicht-betroffen') {
        messages['pdf.summary.classification'] = locale === 'de'
          ? 'Derzeit nicht gesetzlich verpflichtet — freiwillige Cybersicherheit als Wettbewerbsvorteil'
          : 'Currently not legally obligated — voluntary cybersecurity as competitive advantage';
      } else if (classCategory === 'besonders-wichtig') {
        messages['pdf.summary.classification'] = locale === 'de'
          ? 'Besonders wichtige Einrichtung — erweiterte NIS2-Pflichten mit Registrierung beim BSI'
          : 'Particularly important entity — enhanced NIS2 obligations with BSI registration';
      } else {
        messages['pdf.summary.classification'] = locale === 'de'
          ? 'Wichtige Einrichtung — NIS2-Pflichten mit Nachweisanforderungen'
          : 'Important entity — NIS2 obligations with evidence requirements';
      }

      // Top action (first high-priority recommendation)
      const topRec = allRecommendations.find(r => r.priority === 'high');
      messages['pdf.summary.topAction'] = locale === 'de'
        ? `Wichtigste Maßnahme: ${topRec?.title || '-'}`
        : `Top priority: ${topRec?.title || '-'}`;

      // Personalized subtitle for cover page (overrides static key)
      const formatCurrency = (amount: number) =>
        new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
          style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
        }).format(amount);
      messages['pdf.subtitle'] = locale === 'de'
        ? `Speziell für ${sectorName} mit ${formData.employees} Mitarbeitern und ${formatCurrency(formData.annualRevenue || 0)} Umsatz`
        : `Tailored for ${sectorName} with ${formData.employees} employees and ${formatCurrency(formData.annualRevenue || 0)} revenue`;

      // Top 3 Quick Wins for cover page
      const quickWins = allRecommendations
        .filter(r => r.effortLevel === 'quick')
        .slice(0, 3);
      quickWins.forEach((qw, idx) => {
        messages[`pdf.cover.quickWin${idx + 1}`] = qw.title;
      });

      // Determine which optional sections to include based on store + availability
      const includePenalty = sections.penalty && sectionAvailability.penalty;
      const includeCost = sections.costSummary && sectionAvailability.costSummary;
      const includeRoadmap = sections.roadmap && sectionAvailability.roadmap;
      const includeDsgvo = sections.dsgvoOverlap && sectionAvailability.dsgvoOverlap;
      const includeIso = sections.iso27001 && sectionAvailability.iso27001;
      const includeDinSpec = sections.dinSpec && sectionAvailability.dinSpec;
      const includeEvidence = sections.evidence && sectionAvailability.evidence;
      const includeSector = sections.sectorGuidance && sectionAvailability.sectorGuidance;
      const includeKritis = sections.kritis && sectionAvailability.kritis;
      const includeProgress = sections.progress && sectionAvailability.progress;

      // Build penalty data
      let penaltyData: PDFPayload['penalty'] = undefined;
      if (includePenalty) {
        const penalty = calculatePenalty(classCategory as 'besonders-wichtig' | 'wichtig', formData.annualRevenue || 0);
        penaltyData = {
          classification,
          annualRevenue: formData.annualRevenue || 0,
          maxPenaltyAbsolute: penalty.maxPenaltyAbsolute,
          maxPenaltyRevenueBased: penalty.maxPenaltyRevenueBased,
          revenuePercentage: penalty.revenuePercentage,
          effectiveMaxPenalty: penalty.effectiveMaxPenalty,
          legalReference: penalty.legalReference,
        };
      }

      // Shared data for roadmap + cost sections
      const companyProfile: CompanyProfile = {
        employees: formData.employees || 0,
        entityCategory: classCategory as 'besonders-wichtig' | 'wichtig' | 'nicht-betroffen',
        isKritis: formData.isKritis || false,
      };
      const categoryTrafficLightMap = new Map(
        overallScore.categoryScores.map((cs) => [cs.categoryId, cs.trafficLight])
      );
      const formatEurRange = (min: number, max: number, loc: 'de' | 'en') => {
        const fmt = (v: number) => new Intl.NumberFormat(loc === 'de' ? 'de-DE' : 'en-GB', {
          style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
        }).format(v);
        return `${fmt(min)} – ${fmt(max)}`;
      };

      // Build roadmap data
      let roadmapData: PDFPayload['roadmap'] = undefined;
      if (includeRoadmap) {
        const allRecObjects = CATEGORIES.flatMap((cat) => getRecommendationsByCategory(cat.id));
        const roadmapPhases = generateRoadmap(overallScore.categoryScores, allRecObjects);
        roadmapData = {
          phases: roadmapPhases.map((phase, idx) => {
            let benefitStatement: string | undefined;
            try {
              benefitStatement = tRoadmap(`phase${idx + 1}.benefit`);
            } catch {
              // benefit key doesn't exist for this phase
            }
            return {
              title: tRoadmap(`phase${idx + 1}.title`),
              description: tRoadmap(`phase${idx + 1}.description`),
              timeframe: locale === 'de'
                ? `${phase.months} Monate` : `${phase.months} months`,
              itemCount: phase.items.length,
              benefitStatement,
              items: phase.items.map((item) => {
                const adj = idx === 0
                  ? getAdjustedCostEstimate(item.recommendation.id, companyProfile, categoryTrafficLightMap.get(item.recommendation.categoryId) ?? 'red')
                  : null;
                return {
                  title: tRec(item.recommendation.titleKey.replace('recommendations.', '')),
                  urgency: item.urgency,
                  ...(idx === 0 && adj ? {
                    days: adj.adjustedInternalDays.min === adj.adjustedInternalDays.max
                      ? `${adj.adjustedInternalDays.min}`
                      : `${adj.adjustedInternalDays.min}–${adj.adjustedInternalDays.max}`,
                    costRange: formatEurRange(adj.adjustedTotalEur.min, adj.adjustedTotalEur.max, locale),
                  } : {}),
                };
              }),
            };
          }),
        };
      }

      // Build cost summary with per-recommendation breakdown (ADJUSTED by company size)
      let costSummaryData: PDFPayload['costSummary'] = undefined;
      if (includeCost) {
        const allRecObjects = CATEGORIES.flatMap((cat) => getRecommendationsByCategory(cat.id));

        const sizeFactor = getSizeFactor(companyProfile.employees);

        let internalMin = 0, internalMax = 0, externalMin = 0, externalMax = 0, toolsMin = 0, toolsMax = 0;
        let totalMin = 0, totalMax = 0;

        // Tier accumulators
        let tierQuickMin = 0, tierQuickMax = 0;
        let tierMediumMin = 0, tierMediumMax = 0;
        let tierStrategicMin = 0, tierStrategicMax = 0;

        // Build per-recommendation cost items
        const costItems: NonNullable<PDFPayload['costSummary']>['items'] = [];
        for (const rec of allRecObjects) {
          const catTrafficLight = categoryTrafficLightMap.get(rec.categoryId) ?? 'red';
          const adj = getAdjustedCostEstimate(rec.id, companyProfile, catTrafficLight);
          if (adj) {
            internalMin += adj.adjustedInternalDays.min;
            internalMax += adj.adjustedInternalDays.max;
            externalMin += Math.round(adj.externalCostEur.min * adj.factors.combined);
            externalMax += Math.round(adj.externalCostEur.max * adj.factors.combined);
            toolsMin += Math.round(adj.toolCostEurYear.min * adj.factors.combined);
            toolsMax += Math.round(adj.toolCostEurYear.max * adj.factors.combined);
            totalMin += adj.adjustedTotalEur.min;
            totalMax += adj.adjustedTotalEur.max;

            // Accumulate by effort tier
            if (rec.effortLevel === 'quick') {
              tierQuickMin += adj.adjustedTotalEur.min;
              tierQuickMax += adj.adjustedTotalEur.max;
            } else if (rec.effortLevel === 'medium') {
              tierMediumMin += adj.adjustedTotalEur.min;
              tierMediumMax += adj.adjustedTotalEur.max;
            } else {
              tierStrategicMin += adj.adjustedTotalEur.min;
              tierStrategicMax += adj.adjustedTotalEur.max;
            }

            const category = CATEGORIES.find((c) => c.id === rec.categoryId);
            const catName = category ? tCategories(category.shortNameKey.replace('categories.', '')) : '';
            costItems.push({
              title: tRec(rec.titleKey.replace('recommendations.', '')),
              categoryName: catName,
              effortLevel: rec.effortLevel,
              internalDays: adj.adjustedInternalDays,
              externalCost: { min: Math.round(adj.externalCostEur.min * adj.factors.combined), max: Math.round(adj.externalCostEur.max * adj.factors.combined) },
              toolsCost: { min: Math.round(adj.toolCostEurYear.min * adj.factors.combined), max: Math.round(adj.toolCostEurYear.max * adj.factors.combined) },
              totalCost: adj.adjustedTotalEur,
            });
          }
        }

        costSummaryData = {
          companyEmployees: formData.employees || 0,
          companyRevenue: formData.annualRevenue || 0,
          sizeFactor,
          tierTotals: {
            basisschutz: { min: tierQuickMin, max: tierQuickMax },
            erweitert: { min: tierQuickMin + tierMediumMin, max: tierQuickMax + tierMediumMax },
            nis2Niveau: { min: totalMin, max: totalMax },
          },
          internalDays: { min: internalMin, max: internalMax },
          externalCost: { min: externalMin, max: externalMax },
          toolsCost: { min: toolsMin, max: toolsMax },
          totalCost: { min: totalMin, max: totalMax },
          items: costItems,
        };
      }

      // Build DSGVO overlap data
      let dsgvoOverlapData: PDFPayload['dsgvoOverlap'] = undefined;
      if (includeDsgvo) {
        const dsgvoKeys = [
          'riskAssessment', 'incidentHandling', 'businessContinuity', 'supplyChain',
          'securityMeasures', 'effectiveness', 'training', 'encryption', 'accessControl', 'documentation'
        ];
        dsgvoOverlapData = {
          overallPercentage: calculateOverallOverlap(),
          mappings: NIS2_DSGVO_OVERLAPS.map((m, i) => ({
            nis2Area: tDsgvo(`mappings.${dsgvoKeys[i]}.nis2`),
            dsgvoArticle: m.dsgvoReference,
            overlapPercentage: m.overlapPercentage,
          })),
        };
      }

      // Build ISO 27001 data
      let iso27001Data: PDFPayload['iso27001'] = undefined;
      if (includeIso) {
        iso27001Data = {
          overallAlignment: calculateOverallAlignment(),
          mappings: ISO27001_MAPPINGS.map((m) => {
            const cat = CATEGORIES.find((c) => c.id === m.nis2CategoryId);
            const catName = cat ? tCategories(cat.shortNameKey.replace('categories.', '')) : m.nis2CategoryId;
            return {
              nis2Category: catName,
              isoControls: m.isoControls,
              alignmentPercentage: m.alignmentPercentage,
            };
          }),
        };
      }

      // Build DIN SPEC 27076 data
      let dinSpecData: PDFPayload['dinSpec'] = undefined;
      if (includeDinSpec) {
        const comparisonRows = ['targetGroup', 'scope', 'mandatory', 'subsidy'] as const;
        dinSpecData = {
          comparisons: comparisonRows.map((row) => ({
            aspect: tDinSpec(`comparison.${row}.aspect`),
            dinSpec: tDinSpec(`comparison.${row}.dinSpec`),
            nis2: tDinSpec(`comparison.${row}.nis2`),
          })),
          areas: DIN_SPEC_AREAS.map((area) => {
            const areaKey = area.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            return {
              name: tDinSpec(`areas.${areaKey}.name`),
              coverage: tDinSpec(`areas.${areaKey}.coverage`),
            };
          }),
          beyondItems: [
            'incidentReporting', 'supplyChain', 'managementLiability', 'bsiRegistration',
            'critisRequirements', 'formalRiskAnalysis', 'incidentResponsePlan', 'crisisManagement',
          ].map((key) => tDinSpec(`beyond.items.${key}`)),
        };
      }

      // Build evidence data
      let evidenceData: PDFPayload['evidence'] = undefined;
      if (includeEvidence) {
        const filteredItems = EVIDENCE_ITEMS.filter((e) => e.requiredFor.includes(classCategory as 'besonders-wichtig' | 'wichtig'));
        const grouped = CATEGORIES.map((cat) => ({
          category: cat,
          items: filteredItems.filter((e) => e.categoryId === cat.id),
        })).filter((g) => g.items.length > 0);

        evidenceData = {
          classification: classification,
          groups: grouped.map((g) => ({
            categoryName: tCategories(g.category.shortNameKey.replace('categories.', '')),
            items: g.items.map((item) => {
              const textKey = item.textKey.replace('evidence.items.', '');
              const typeLabel = item.typeKey.replace('evidence.types.', '');
              return {
                text: tEvidence(`items.${textKey}`),
                type: typeLabel,
                besondersWichtigOnly: item.requiredFor.length === 1 && item.requiredFor[0] === 'besonders-wichtig',
              };
            }),
          })),
        };
      }

      // Build sector guidance data
      let sectorGuidanceData: PDFPayload['sectorGuidance'] = undefined;
      if (includeSector) {
        const guidance = getSectorGuidance(sectorId)!;
        sectorGuidanceData = {
          regulations: guidance.additionalRegulations.map((reg) => ({
            name: tSectorGuidance(reg.nameKey.replace('sectorGuidance.', '')),
            description: tSectorGuidance(reg.descriptionKey.replace('sectorGuidance.', '')),
            legalBasis: reg.legalBasis,
          })),
          challenges: tSectorGuidance(guidance.specificChallengesKey.replace('sectorGuidance.', '')),
          recommendations: tSectorGuidance(guidance.recommendationsKey.replace('sectorGuidance.', '')),
        };
      }

      // Build KRITIS details
      let kritisDetails: PDFPayload['kpiDetails'] = undefined;
      if (includeKritis) {
        const requirementKeys = ['attackDetection', 'continuousMonitoring', 'evidence', 'audits', 'higherPenalties'] as const;
        const comparisonKeys = ['attackDetection', 'evidence', 'audits', 'penalties'] as const;
        kritisDetails = {
          requirements: requirementKeys.map((key) => ({
            title: tKritis(`requirements.${key}.title`),
            description: tKritis(`requirements.${key}.description`),
          })),
          comparisons: comparisonKeys.map((key) => ({
            aspect: tKritis(`comparison.rows.${key}.aspect`),
            standard: tKritis(`comparison.rows.${key}.standard`),
            kritis: tKritis(`comparison.rows.${key}.kritis`),
          })),
        };
      }

      // Build progress tracking data
      let progressData: PDFPayload['progress'] = undefined;
      if (includeProgress) {
        const allRecForProgress = CATEGORIES.flatMap((cat) => getRecommendationsByCategory(cat.id));
        const total = allRecForProgress.length;
        const counts = getStatusCounts();
        // notStarted = total minus explicitly tracked items (store only has entries for recs users interacted with)
        const notStarted = total - counts.inProgress - counts.completed;
        progressData = {
          completionPercentage: getCompletionPercentage(total),
          notStarted,
          inProgress: counts.inProgress,
          completed: counts.completed,
          items: allRecForProgress.map((rec) => {
            const progress = getProgress(rec.id);
            return {
              title: tRec(rec.titleKey.replace('recommendations.', '')),
              status: progress?.status || 'not-started',
            };
          }),
        };
      }

      // Build executive summary data
      let executiveSummaryData: PDFExecutiveSummary | undefined = undefined;
      {
        // Top 3 risk areas (lowest scoring categories)
        const sortedCats = [...categoryResults].sort((a, b) => a.percentage - b.percentage);
        const topRisks = sortedCats.slice(0, 3).map((cat) => ({
          name: cat.categoryName,
          percentage: cat.percentage,
          trafficLight: cat.trafficLight,
        }));

        // Quick wins with cost data
        const quickWinRecs = allRecommendations
          .filter(r => r.effortLevel === 'quick')
          .slice(0, 5);
        const quickWinItems = quickWinRecs.map((rec) => {
          const adj = getAdjustedCostEstimate(
            rec.categoryId + '-' + rec.title, // fallback — we need the rec ID
            companyProfile,
            categoryTrafficLightMap.get(rec.categoryId) ?? 'red'
          );
          // For quick wins, use pre-computed roadmap data if available
          return {
            title: rec.title,
            days: '2–5',
            cost: '',
          };
        });

        // If we have cost data, compute quick-win items with actual costs
        if (costSummaryData) {
          const quickCostItems = costSummaryData.items
            .filter(i => i.effortLevel === 'quick')
            .slice(0, 5);
          const computedQuickWins = quickCostItems.map(item => ({
            title: item.title,
            days: item.internalDays.min === item.internalDays.max
              ? `${item.internalDays.min}`
              : `${item.internalDays.min}–${item.internalDays.max}`,
            cost: formatEurRange(item.totalCost.min, item.totalCost.max, locale),
          }));
          if (computedQuickWins.length > 0) {
            executiveSummaryData = {
              percentage: overallScore.percentage,
              trafficLight: overallScore.trafficLight,
              topRisks,
              quickWins: computedQuickWins,
              basisschutzTotal: costSummaryData.tierTotals.basisschutz,
            };
          }
        }

        // Fallback if no cost data
        if (!executiveSummaryData) {
          executiveSummaryData = {
            percentage: overallScore.percentage,
            trafficLight: overallScore.trafficLight,
            topRisks,
            quickWins: quickWinItems.slice(0, 5),
            basisschutzTotal: { min: 0, max: 0 },
          };
        }
      }

      // Determine analysis depth
      const analysisDepth: 'core' | 'full' = answers.length >= getTotalQuestionCount() ? 'full' : 'core';

      // Build payload
      const payload: PDFPayload = {
        locale,
        analysisDepth,
        company: {
          sectorName,
          subsectorName,
          employees: formData.employees || 0,
          annualRevenue: formData.annualRevenue || 0,
          classification,
          classificationCategory: classificationResult.category,
          legalReference,
        },
        overallScore: {
          percentage: overallScore.percentage,
          trafficLight: overallScore.trafficLight,
          completionRate: overallScore.completionRate,
          answeredQuestions: overallScore.answeredQuestions,
          totalQuestions: overallScore.totalQuestions,
        },
        categories: categoryResults,
        recommendations: allRecommendations,
        messages,
        executiveSummary: executiveSummaryData,
        penalty: penaltyData,
        roadmap: roadmapData,
        costSummary: costSummaryData,
        dsgvoOverlap: dsgvoOverlapData,
        iso27001: iso27001Data,
        isKritis: includeKritis,
        dinSpec: dinSpecData,
        evidence: evidenceData,
        sectorGuidance: sectorGuidanceData,
        kpiDetails: kritisDetails,
        progress: progressData,
      };

      // POST to API
      const response = await fetch('/api/pdf/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      // Download the blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `NIS2-Readiness-Report-${timestamp}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDialogOpen(false);
    } catch (err) {
      console.error('PDF download failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Core sections (always included, not deselectable)
  const coreSections = [
    { key: 'cover', label: tPdf('sectionSelector.sections.cover') },
    { key: 'executive', label: tPdf('executive.title') },
    { key: 'categories', label: tPdf('sectionSelector.sections.categories') },
    { key: 'recommendations', label: tPdf('sectionSelector.sections.recommendations') },
  ];

  // Group optional sections for display with separators
  const sectionGroups: { keys: PDFSectionKey[]; }[] = [
    { keys: ['penalty', 'costSummary', 'roadmap'] },
    { keys: ['dsgvoOverlap', 'iso27001', 'dinSpec', 'evidence'] },
    { keys: ['sectorGuidance', 'kritis', 'progress'] },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            <Download className="mr-2 h-4 w-4" />
            {t('actions.downloadPdf')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{tPdf('sectionSelector.title')}</DialogTitle>
            <DialogDescription>{tPdf('sectionSelector.description')}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
            {/* Core sections (locked) */}
            <div className="space-y-2">
              {coreSections.map((section) => (
                <div key={section.key} className="flex items-center gap-3 py-1">
                  <Checkbox checked disabled className="opacity-60" />
                  <span className="text-sm flex-1">{section.label}</span>
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>

            {/* Optional section groups (only show available sections) */}
            {sectionGroups.map((group, groupIdx) => {
              const availableKeys = group.keys.filter((key) => sectionAvailability[key]);
              if (availableKeys.length === 0) return null;
              return (
                <div key={groupIdx}>
                  <div className="border-t my-2" />
                  <div className="space-y-2">
                    {availableKeys.map((key) => {
                      const checked = isClient ? sections[key] : true;
                      return (
                        <div key={key} className="flex items-center gap-3 py-1">
                          <Checkbox
                            id={`pdf-section-${key}`}
                            checked={checked}
                            onCheckedChange={() => toggleSection(key)}
                          />
                          <label
                            htmlFor={`pdf-section-${key}`}
                            className="text-sm flex-1 cursor-pointer select-none"
                          >
                            {tPdf(`sectionSelector.sections.${key}`)}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Select All / None buttons */}
            <div className="border-t my-2" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                {tPdf('sectionSelector.selectAll')}
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>
                {tPdf('sectionSelector.deselectAll')}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {tPdf('sectionSelector.generating')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {tPdf('sectionSelector.generate')}
                </>
              )}
            </Button>
          </DialogFooter>

          {error && (
            <p className="text-sm text-red-600 text-center">
              Error: {error}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
