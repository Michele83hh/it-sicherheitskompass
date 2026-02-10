import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

const newKeysDE = {
  wissenCta: '128 Maßnahmen entdecken',
  pillarsTitle: 'IT-Sicherheit in 8 Säulen',
  pillarsSubtitle: 'Von Leitlinien bis Krisenmanagement — jede Säule erklärt das Problem, zeigt die Rechtslage und liefert die Lösung. Praxisnah, cross-regulatorisch, sofort umsetzbar.',
  pillarsAllCta: 'Alle 8 Säulen entdecken',
  regulationQuestions: '{count} Prüffragen',
  'trustBar.pillars': '8 Säulen · 128 Maßnahmen',
  quickLinks: {
    wissen: 'Wissensplattform',
    wissenDesc: '128 Maßnahmen in 8 Säulen — von Patch-Management bis Melde-Timer',
    dashboard: 'Ihr Dashboard',
    dashboardDesc: 'Cross-Regulation-Übersicht aller Ihrer Ergebnisse und Synergien',
    navigator: 'Regelwerk-Kompass',
    navigatorDesc: 'In 4 Schritten zum passenden Regelwerk für Ihr Unternehmen',
  },
  'features.pillars': '128 Wissens-Komponenten in 8 Säulen',
};

const newKeysEN = {
  wissenCta: 'Explore 128 Measures',
  pillarsTitle: 'IT Security in 8 Pillars',
  pillarsSubtitle: 'From governance to crisis management — each pillar explains the problem, shows the legal landscape, and delivers the solution. Practical, cross-regulatory, immediately actionable.',
  pillarsAllCta: 'Explore All 8 Pillars',
  regulationQuestions: '{count} questions',
  'trustBar.pillars': '8 Pillars · 128 Measures',
  quickLinks: {
    wissen: 'Knowledge Platform',
    wissenDesc: '128 measures in 8 pillars — from patch management to incident timer',
    dashboard: 'Your Dashboard',
    dashboardDesc: 'Cross-regulation overview of all your results and synergies',
    navigator: 'Regulation Compass',
    navigatorDesc: 'Find the right regulation for your business in 4 steps',
  },
  'features.pillars': '128 knowledge components in 8 pillars',
};

function deepSet(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

for (const [lang, newKeys] of [['de', newKeysDE], ['en', newKeysEN]]) {
  const filePath = join(ROOT, 'src', 'messages', `${lang}.json`);
  const existing = JSON.parse(readFileSync(filePath, 'utf-8'));

  const hub = existing.platform.hub;

  for (const [key, value] of Object.entries(newKeys)) {
    if (typeof value === 'object') {
      // Nested object like quickLinks
      if (!hub[key]) hub[key] = {};
      Object.assign(hub[key], value);
    } else if (key.includes('.')) {
      // Dotted path like trustBar.pillars
      deepSet(hub, key, value);
    } else {
      hub[key] = value;
    }
  }

  writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${lang}.json hub translations`);
}

console.log('Done!');
