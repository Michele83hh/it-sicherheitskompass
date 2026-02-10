#!/usr/bin/env node

/**
 * Verification script for DSGVO and KRITIS recommendations
 * Ensures all recommendations have proper structure and no placeholders remain
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DE_JSON_PATH = join(__dirname, '..', 'src', 'messages', 'de.json');

console.log('🔍 Verifying DSGVO and KRITIS recommendations...\n');

const data = JSON.parse(readFileSync(DE_JSON_PATH, 'utf-8'));

// Verification criteria
const PLACEHOLDER_TITLE = 'Maßnahme umsetzen';
const PLACEHOLDER_DESC = 'Implementieren Sie die erforderlichen Maßnahmen gemäß den regulatorischen Anforderungen.';
const PLACEHOLDER_FIRST = 'Führen Sie eine Bestandsaufnahme des aktuellen Zustands durch.';

let errors = 0;
let warnings = 0;

function verifyRecommendation(regId, recId, rec) {
  const prefix = `[${regId}.${recId}]`;

  // Check for required fields
  if (!rec.title) {
    console.error(`❌ ${prefix} Missing title`);
    errors++;
  }
  if (!rec.description) {
    console.error(`❌ ${prefix} Missing description`);
    errors++;
  }
  if (!rec.firstStep) {
    console.error(`❌ ${prefix} Missing firstStep`);
    errors++;
  }

  // Check for placeholders
  if (rec.title === PLACEHOLDER_TITLE) {
    console.error(`❌ ${prefix} Still has placeholder title`);
    errors++;
  }
  if (rec.description === PLACEHOLDER_DESC) {
    console.error(`❌ ${prefix} Still has placeholder description`);
    errors++;
  }
  if (rec.firstStep === PLACEHOLDER_FIRST) {
    console.error(`❌ ${prefix} Still has placeholder firstStep`);
    errors++;
  }

  // Check for quality criteria
  if (rec.title && rec.title.length < 10) {
    console.warn(`⚠️  ${prefix} Title is very short (${rec.title.length} chars)`);
    warnings++;
  }
  if (rec.title && rec.title.length > 100) {
    console.warn(`⚠️  ${prefix} Title is very long (${rec.title.length} chars)`);
    warnings++;
  }
  if (rec.description && rec.description.length < 50) {
    console.warn(`⚠️  ${prefix} Description is very short (${rec.description.length} chars)`);
    warnings++;
  }
  if (rec.firstStep && rec.firstStep.length < 30) {
    console.warn(`⚠️  ${prefix} FirstStep is very short (${rec.firstStep.length} chars)`);
    warnings++;
  }

  // Check for legal references in description (good practice)
  if (regId === 'dsgvo' && rec.description && !rec.description.includes('Art.')) {
    console.warn(`⚠️  ${prefix} Description missing Art. reference (DSGVO)`);
    warnings++;
  }
  if (regId === 'kritis' && rec.description && !rec.description.includes('§')) {
    console.warn(`⚠️  ${prefix} Description missing § reference (KRITIS)`);
    warnings++;
  }
}

// Verify DSGVO
console.log('📋 DSGVO Recommendations:');
const dsgvoRecs = data.dsgvo?.recommendations || {};
const dsgvoCount = Object.keys(dsgvoRecs).length;
console.log(`   Found ${dsgvoCount} recommendations`);

Object.entries(dsgvoRecs).forEach(([id, rec]) => {
  verifyRecommendation('dsgvo', id, rec);
});

console.log('');

// Verify KRITIS
console.log('📋 KRITIS Recommendations:');
const kritisRecs = data.kritis?.recommendations || {};
const kritisCount = Object.keys(kritisRecs).length;
console.log(`   Found ${kritisCount} recommendations`);

Object.entries(kritisRecs).forEach(([id, rec]) => {
  verifyRecommendation('kritis', id, rec);
});

console.log('');

// Summary
console.log('════════════════════════════════════════');
if (errors === 0 && warnings === 0) {
  console.log('✅ VERIFICATION PASSED!');
  console.log(`   - ${dsgvoCount} DSGVO recommendations: OK`);
  console.log(`   - ${kritisCount} KRITIS recommendations: OK`);
  console.log('   - No placeholders remaining');
  console.log('   - All required fields present');
  console.log('   - Quality criteria met');
} else {
  if (errors > 0) {
    console.log(`❌ VERIFICATION FAILED: ${errors} error(s)`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s)`);
  }
}
console.log('════════════════════════════════════════');

// Exit with error code if there are errors
process.exit(errors > 0 ? 1 : 0);
