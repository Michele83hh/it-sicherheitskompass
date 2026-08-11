import { describe, expect, it } from 'vitest';
import { calculateRelevance, type NavigatorProfile } from './relevance';

function run(p: Partial<NavigatorProfile>) {
  const results = calculateRelevance({
    industry: 'other',
    companySize: 'small',
    businessModels: [],
    specialCircumstances: [],
    ...p,
  });
  return Object.fromEntries(results.map((r) => [r.id, r]));
}

describe('Navigator-Relevanz: gesetzliche Zuordnungen (Primärquellen-geprüft 08.08.2026)', () => {
  it('Fahrzeugbau ist NIS2-Sektor (Anlage 2 Nr. 5.5/5.6 BSIG, NACE C.29/C.30)', () => {
    const r = run({ industry: 'automotive', companySize: 'medium', businessModels: ['manufacturing', 'automotiveSupplier'] });
    expect(r.nis2.relevance).toBe('high');
    expect(r.nis2.obligationType).toBe('direct');
    // TISAX ist OEM-Vertragsanforderung, kein Gesetz
    expect(r.tisax.obligationType).toBe('contractual');
  });

  it('Finanzunternehmen: DORA lex specialis verdrängt NIS2-Kernpflichten (§28 Abs. 6 Nr. 1 BSIG)', () => {
    const r = run({ industry: 'finance', companySize: 'large', businessModels: ['financialServices'] });
    expect(r.dora.relevance).toBe('high');
    expect(r.dora.obligationType).toBe('direct');
    expect(r.nis2.reasonKey).toBe('nis2DoraLex');
    expect(r.nis2.obligationType).toBe('check');
    expect(r.nis2.relevance).toBe('medium');
    // ISO 27001 wird weiterhin über DORA getriggert
    expect(r.iso27001.reasonKey).toBe('iso27001Compliance');
  });

  it('Siedlungsabfallentsorgung ist KRITIS-Sektor (§2 Nr. 4 KRITIS-Dachgesetz)', () => {
    const r = run({ industry: 'waste', companySize: 'large' });
    expect(r.nis2.relevance).toBe('high');
    expect(r.kritis.score).toBeGreaterThan(0);
    // Ohne Anlagen-Schwellenprüfung keine Pflicht-Behauptung
    expect(r.kritis.obligationType).toBe('check');
  });

  it('KRITIS "Gesetzliche Pflicht" nur bei bestätigtem Betreiberstatus', () => {
    const operator = run({ industry: 'energy', companySize: 'large', specialCircumstances: ['kritis'] });
    expect(operator.kritis.obligationType).toBe('direct');
    const sectorOnly = run({ industry: 'energy', companySize: 'large' });
    expect(sectorOnly.kritis.obligationType).toBe('check');
  });

  it('C5 nur für Cloud-/SaaS-Anbieter — Behördenkunden allein reichen nicht', () => {
    const noCloud = run({ companySize: 'small', businessModels: ['personalData'], specialCircumstances: ['publicSectorClients'] });
    expect(noCloud.c5.relevance).toBe('none');
    const saas = run({ companySize: 'small', businessModels: ['saasProvider'], specialCircumstances: ['publicSectorClients'] });
    expect(saas.c5.relevance).toBe('high');
    expect(saas.c5.obligationType).toBe('contractual');
  });

  it('C5 im Gesundheitswesen: §393 SGB V für Cloud-Anbieter', () => {
    const r = run({ industry: 'health', companySize: 'small', businessModels: ['saasProvider'] });
    expect(r.c5.reasonKey).toBe('c5Health');
    expect(r.c5.relevance).toBe('high');
  });

  it('PCI DSS und TISAX sind nie "gesetzliche Pflicht" (direct)', () => {
    for (const p of [
      run({ industry: 'retail', companySize: 'medium', businessModels: ['paymentProcessing'] }),
      run({ industry: 'automotive', companySize: 'medium', specialCircumstances: ['tisaxRequired', 'pciRequired'] }),
    ]) {
      expect(p['pci-dss'].obligationType).not.toBe('direct');
      expect(p.tisax.obligationType).not.toBe('direct');
    }
  });

  it('Online-Plattformen: NIS2 Anlage 2 Nr. 6 wird als Prüffall angezeigt', () => {
    const r = run({ industry: 'other', companySize: 'large', businessModels: ['saasProvider', 'digitalProducts'] });
    expect(r.nis2.reasonKey).toBe('nis2DigitalServices');
    expect(r.nis2.relevance).toBe('medium');
  });

  it('Kleiner NIS2-Sektor-Betrieb: Prüf-Badge statt Pflicht-Badge', () => {
    const r = run({ industry: 'ict-services', companySize: 'small', businessModels: ['digitalServices'] });
    expect(r.nis2.obligationType).toBe('check');
  });

  it('DSGVO gilt immer als gesetzliche Pflicht', () => {
    const r = run({});
    expect(r.dsgvo.relevance).toBe('high');
    expect(r.dsgvo.obligationType).toBe('direct');
  });

  it('KRITIS-Betreiber (Schritt 3) sind besonders wichtige Einrichtungen — NIS2 direkt (§28 Abs. 1 Nr. 1 BSIG, ohne Größenschwelle)', () => {
    const r = run({ industry: 'transport', companySize: 'small', businessModels: ['kritisOperator'] });
    expect(r.nis2.relevance).toBe('high');
    expect(r.nis2.obligationType).toBe('direct');
    expect(r.nis2.reasonKey).toBe('nis2Critical');
    expect(r.kritis.obligationType).toBe('direct');
  });

  it('Physischer Lieferant von Finanzunternehmen fällt NICHT unter DORA (Art. 28 nur IKT-Drittdienstleister) und bekommt kein SOC 2', () => {
    const spediteur = run({ industry: 'transport', companySize: 'small', businessModels: ['personalData', 'supplierForRegulated'], specialCircumstances: ['financeClients'] });
    expect(spediteur.dora.relevance).toBe('none');
    expect(spediteur.soc2.relevance).toBe('none');
    // NIS2-Lieferketten-Hinweis bleibt (§30 Abs. 2 Nr. 4 BSIG)
    expect(spediteur.nis2.reasonKey).toBe('nis2SupplyChain');
    expect(spediteur.nis2.obligationType).toBe('indirect');
  });

  it('IT-Dienstleister mit Finanzkunden fällt als IKT-Drittdienstleister unter DORA (Art. 3 Nr. 21 DORA)', () => {
    for (const model of ['cloudProvider', 'saasProvider', 'digitalServices']) {
      const r = run({ businessModels: [model], specialCircumstances: ['financeClients'] });
      expect(r.dora.relevance).toBe('medium');
      expect(r.dora.reasonKey).toBe('doraICT');
      expect(r.dora.obligationType).toBe('indirect');
    }
  });

  it('BSI IT-Grundschutz erreicht bei ISO-27001-Synergie "high" (Schwellen-Konsistenz mit ISO 27001)', () => {
    const r = run({ specialCircumstances: ['iso27001'] });
    expect(r['bsi-grundschutz'].relevance).toBe('high');
  });
});
