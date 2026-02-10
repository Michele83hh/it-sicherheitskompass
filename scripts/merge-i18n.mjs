#!/usr/bin/env node
/**
 * Merge i18n temp files into de.json and en.json
 * Handles different regLanding structures (top-level vs nested)
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const DE_PATH = resolve(ROOT, 'src/messages/de.json');
const EN_PATH = resolve(ROOT, 'src/messages/en.json');

function readJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function mergeRegulation(messages, tmpData, namespace) {
  // Extract the regulation data
  const regData = tmpData[namespace];
  if (!regData) {
    console.warn(`  WARNING: No "${namespace}" key found in temp file`);
    return;
  }

  // Check if regLanding is nested inside the namespace (PCI DSS, C5 pattern)
  let regLanding = null;
  if (regData.regLanding) {
    regLanding = regData.regLanding;
    // Remove regLanding from the namespace data so it doesn't get double-merged
    const { regLanding: _removed, ...rest } = regData;
    messages[namespace] = rest;
  } else {
    messages[namespace] = regData;
  }

  // Check if regLanding is at the top level (ISO 27001, SOC 2 pattern)
  if (tmpData.regLanding) {
    const topLevelRegLanding = tmpData.regLanding;
    if (!messages.regLanding) messages.regLanding = {};
    // Merge all regLanding sub-keys
    for (const [regId, data] of Object.entries(topLevelRegLanding)) {
      messages.regLanding[regId] = data;
    }
  }

  // If we extracted regLanding from namespace, add it to top-level regLanding
  if (regLanding) {
    if (!messages.regLanding) messages.regLanding = {};
    // The key in regLanding should match the regulation ID, not the namespace
    // e.g., pciDss namespace -> pci-dss regLanding key? Actually looking at existing code,
    // regLanding keys use the regulation ID format from config
    // Let's use the namespace as key since that's what's used in the existing data
    const regId = namespace === 'pciDss' ? 'pciDss' : namespace;
    messages.regLanding[regId] = regLanding;
  }

  console.log(`  Merged: ${namespace} (categories: ${Object.keys(regData.categories || {}).length}, questions: ${Object.keys(regData.questions || {}).length}, recommendations: ${Object.keys(regData.recommendations || {}).length})`);
}

// ===== MERGE GERMAN =====
console.log('\n=== Merging German (de.json) ===');
const de = readJson(DE_PATH);
if (!de) { console.error('de.json not found!'); process.exit(1); }

const tmpFiles = [
  { file: 'tmp-i18n-iso27001-de.json', namespace: 'iso27001' },
  { file: 'tmp-i18n-soc2-de.json', namespace: 'soc2' },
  { file: 'tmp-i18n-pcidss-de.json', namespace: 'pciDss' },
  { file: 'tmp-i18n-c5-de.json', namespace: 'c5' },
];

for (const { file, namespace } of tmpFiles) {
  const path = resolve(ROOT, file);
  const data = readJson(path);
  if (!data) {
    console.warn(`  SKIP: ${file} not found`);
    continue;
  }
  mergeRegulation(de, data, namespace);
}

writeFileSync(DE_PATH, JSON.stringify(de, null, 2) + '\n', 'utf-8');
console.log(`  Written: de.json`);

// ===== MERGE ENGLISH =====
console.log('\n=== Merging English (en.json) ===');
const en = readJson(EN_PATH);
if (!en) { console.error('en.json not found!'); process.exit(1); }

const tmpFilesEn = [
  { file: 'tmp-i18n-iso27001-en.json', namespace: 'iso27001' },
  { file: 'tmp-i18n-soc2-en.json', namespace: 'soc2' },
  { file: 'tmp-i18n-pcidss-en.json', namespace: 'pciDss' },
  { file: 'tmp-i18n-c5-en.json', namespace: 'c5' },
];

for (const { file, namespace } of tmpFilesEn) {
  const path = resolve(ROOT, file);
  const data = readJson(path);
  if (!data) {
    console.warn(`  SKIP: ${file} not found`);
    continue;
  }
  mergeRegulation(en, data, namespace);
}

writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log(`  Written: en.json`);

// ===== SUMMARY =====
console.log('\n=== Summary ===');
console.log(`de.json top-level keys: ${Object.keys(de).length}`);
console.log(`en.json top-level keys: ${Object.keys(en).length}`);
console.log(`de.json regLanding keys: ${Object.keys(de.regLanding || {}).join(', ')}`);
console.log(`en.json regLanding keys: ${Object.keys(en.regLanding || {}).join(', ')}`);

// Check which regulation namespaces exist
const regNamespaces = ['nis2', 'dsgvo', 'kritis', 'dora', 'tisax', 'cra', 'bsiGrundschutz', 'iso27001', 'soc2', 'pciDss', 'c5'];
console.log('\nRegulation namespaces in de.json:');
for (const ns of regNamespaces) {
  const exists = !!de[ns];
  const qCount = de[ns]?.questions ? Object.keys(de[ns].questions).length : 0;
  console.log(`  ${ns}: ${exists ? '✓' : '✗'} (${qCount} questions)`);
}
console.log('\nRegulation namespaces in en.json:');
for (const ns of regNamespaces) {
  const exists = !!en[ns];
  const qCount = en[ns]?.questions ? Object.keys(en[ns].questions).length : 0;
  console.log(`  ${ns}: ${exists ? '✓' : '✗'} (${qCount} questions)`);
}
