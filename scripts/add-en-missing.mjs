#!/usr/bin/env node
/**
 * Add missing English keys to en.json:
 * 1. Navigator business model keys
 * 2. Navigator special circumstance keys
 * 3. Navigator reason keys for 4 new standards
 * 4. regLanding for pci-dss and c5
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const EN_PATH = resolve(ROOT, 'src/messages/en.json');

const en = JSON.parse(readFileSync(EN_PATH, 'utf-8'));

// 1. Add business model keys to navigator.steps.activities
en.platform.navigator.steps.activities.paymentProcessing = 'We process credit card or payment data';
en.platform.navigator.steps.activities.saasProvider = 'We offer Software-as-a-Service (SaaS) solutions';

// 2. Add special circumstance keys to navigator.steps.specifics
en.platform.navigator.steps.specifics.pciRequired = 'We need to demonstrate PCI DSS compliance (payment processing)';
en.platform.navigator.steps.specifics.publicSectorClients = 'We have public sector / government clients';

// 3. Add navigator reason keys for 4 new standards
const newReasons = {
  iso27001Already: 'Your existing or planned ISO 27001 certification makes a readiness check especially valuable.',
  iso27001Compliance: 'As a regulated organization, ISO 27001 is the ideal compliance evidence framework.',
  iso27001Size: 'For organizations of your size, ISO 27001 provides a structured approach to information security.',
  iso27001Framework: 'ISO 27001 is the internationally recognized standard for information security management.',
  soc2Cloud: 'As a cloud or SaaS provider, SOC 2 is frequently required by customers as a trust assurance.',
  soc2Digital: 'For digital services, SOC 2 provides a recognized compliance framework.',
  soc2Supplier: 'As an IT service provider, customers may expect SOC 2 reports from you.',
  soc2NA: 'SOC 2 is primarily relevant for cloud and SaaS providers.',
  pciRequired: 'You process payment data — PCI DSS compliance is mandatory.',
  pciSector: 'Your industry likely involves payment data processing. Check your PCI DSS requirements.',
  pciDigital: 'If your digital products or services handle payment data, PCI DSS may be relevant.',
  pciNA: 'PCI DSS applies to organizations that process credit card/payment data.',
  c5Cloud: 'As a cloud provider, BSI C5 is the German standard certification for cloud security.',
  c5Saas: 'As a SaaS provider, C5 attestation demonstrates the highest cloud security standards to your customers.',
  c5PublicSector: 'For public sector clients, C5 attestation is often a prerequisite.',
  c5NA: 'BSI C5 is primarily relevant for cloud service providers.'
};

Object.assign(en.platform.navigator.reasons, newReasons);

// 4. Add regLanding for pci-dss and c5 (if not present)
if (!en.regLanding) en.regLanding = {};
if (!en.regLanding['pci-dss']) {
  en.regLanding['pci-dss'] = {
    title: 'PCI DSS Compliance Check',
    subtitle: 'Are your payment processes secure? Check your measures against the Payment Card Industry Data Security Standard v4.0.',
    cta: 'Start PCI DSS Check'
  };
}
if (!en.regLanding['c5']) {
  en.regLanding['c5'] = {
    title: 'BSI C5 Compliance Check',
    subtitle: 'Does your cloud service meet BSI C5:2020 requirements? Check your cloud security measures against the BSI criteria catalogue.',
    cta: 'Start C5 Check'
  };
}

writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('Done: Added navigator keys + regLanding to en.json');
console.log('  Business models: paymentProcessing, saasProvider');
console.log('  Special circumstances: pciRequired, publicSectorClients');
console.log('  Reasons: 16 new keys');
console.log('  regLanding: pci-dss, c5');
