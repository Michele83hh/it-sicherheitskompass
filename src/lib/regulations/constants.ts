// src/lib/regulations/constants.ts

/**
 * Visual and metadata constants for all 7 regulations.
 * Used by registry, UI components, and theming.
 */

import type { RegulationId } from './types';

export interface RegulationMeta {
  id: RegulationId;
  icon: string; // Lucide icon name
  color: string; // Tailwind text color
  bgColor: string; // Tailwind bg color (light)
  borderColor: string; // Tailwind border color
  gradient: string; // Tailwind gradient classes
  accentHex: string; // Hex for PDF / charts
  badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const REGULATION_META: Record<RegulationId, RegulationMeta> = {
  nis2: {
    id: 'nis2',
    icon: 'Shield',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-600 to-blue-800',
    accentHex: '#2563eb',
    badgeVariant: 'default',
  },
  dsgvo: {
    id: 'dsgvo',
    icon: 'Lock',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    gradient: 'from-emerald-600 to-emerald-800',
    accentHex: '#059669',
    badgeVariant: 'default',
  },
  kritis: {
    id: 'kritis',
    icon: 'Building2',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    gradient: 'from-red-600 to-red-800',
    accentHex: '#dc2626',
    badgeVariant: 'destructive',
  },
  dora: {
    id: 'dora',
    icon: 'Landmark',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gradient: 'from-amber-600 to-amber-800',
    accentHex: '#d97706',
    badgeVariant: 'default',
  },
  tisax: {
    id: 'tisax',
    icon: 'Car',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    gradient: 'from-violet-600 to-violet-800',
    accentHex: '#7c3aed',
    badgeVariant: 'default',
  },
  cra: {
    id: 'cra',
    icon: 'Cpu',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    gradient: 'from-cyan-600 to-cyan-800',
    accentHex: '#0891b2',
    badgeVariant: 'default',
  },
  'bsi-grundschutz': {
    id: 'bsi-grundschutz',
    icon: 'BookOpen',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    gradient: 'from-slate-600 to-slate-800',
    accentHex: '#475569',
    badgeVariant: 'secondary',
  },
  iso27001: {
    id: 'iso27001',
    icon: 'Award',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    gradient: 'from-teal-600 to-teal-800',
    accentHex: '#0d9488',
    badgeVariant: 'default',
  },
  soc2: {
    id: 'soc2',
    icon: 'CheckCircle2',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    gradient: 'from-indigo-600 to-indigo-800',
    accentHex: '#4f46e5',
    badgeVariant: 'default',
  },
  'pci-dss': {
    id: 'pci-dss',
    icon: 'CreditCard',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    gradient: 'from-orange-600 to-orange-800',
    accentHex: '#ea580c',
    badgeVariant: 'default',
  },
  c5: {
    id: 'c5',
    icon: 'Cloud',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    gradient: 'from-sky-600 to-sky-800',
    accentHex: '#0284c7',
    badgeVariant: 'default',
  },
  'cis-controls': {
    id: 'cis-controls',
    icon: 'ListChecks',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    gradient: 'from-rose-600 to-rose-800',
    accentHex: '#e11d48',
    badgeVariant: 'default',
  },
  iso22301: {
    id: 'iso22301',
    icon: 'LifeBuoy',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    gradient: 'from-orange-600 to-orange-800',
    accentHex: '#ea580c',
    badgeVariant: 'default',
  },
  'nist-csf': {
    id: 'nist-csf',
    icon: 'Flag',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-700 to-blue-900',
    accentHex: '#1d4ed8',
    badgeVariant: 'default',
  },
  'owasp-asvs': {
    id: 'owasp-asvs',
    icon: 'Bug',
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-200',
    gradient: 'from-lime-600 to-lime-800',
    accentHex: '#65a30d',
    badgeVariant: 'default',
  },
};

export function getRegulationMeta(id: RegulationId): RegulationMeta {
  return REGULATION_META[id];
}
