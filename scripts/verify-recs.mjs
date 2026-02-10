#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DE_JSON_PATH = join(__dirname, '..', 'src', 'messages', 'de.json');

console.log('🔍 Verifying recommendations...\n');

const deJson = JSON.parse(readFileSync(DE_JSON_PATH, 'utf-8'));

// Verify CRA
console.log('📋 CRA Recommendations:');
const craRecs = deJson.cra.recommendations;
console.log(`  sbd1: ${craRecs.sbd1.title}`);
console.log(`  sbom1: ${craRecs.sbom1.title}`);
console.log(`  vm1: ${craRecs.vm1.title}`);
console.log(`  Checklist preserved (vm3): ${craRecs.vm3.checklist ? '✓' : '✗'}`);

// Verify BSI
console.log('\n📋 BSI IT-Grundschutz Recommendations:');
const bsiRecs = deJson.bsiGrundschutz.recommendations;
console.log(`  isms1: ${bsiRecs.isms1.title}`);
console.log(`  net1: ${bsiRecs.net1.title}`);
console.log(`  sys1: ${bsiRecs.sys1.title}`);
console.log(`  Checklist preserved (isms3): ${bsiRecs.isms3.checklist ? '✓' : '✗'}`);

// Check for placeholders
console.log('\n🔎 Checking for remaining placeholders...');
let placeholderCount = 0;

for (const [key, rec] of Object.entries(craRecs)) {
  if (rec.title === 'Maßnahme umsetzen') {
    console.log(`  ⚠ CRA ${key} still has placeholder title`);
    placeholderCount++;
  }
}

for (const [key, rec] of Object.entries(bsiRecs)) {
  if (rec.title === 'Maßnahme umsetzen') {
    console.log(`  ⚠ BSI ${key} still has placeholder title`);
    placeholderCount++;
  }
}

if (placeholderCount === 0) {
  console.log('  ✅ No placeholders found!');
} else {
  console.log(`  ❌ Found ${placeholderCount} placeholders`);
}

console.log('\n✅ Verification complete!');
