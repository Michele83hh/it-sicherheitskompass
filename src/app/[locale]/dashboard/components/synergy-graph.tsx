'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import {
  ArrowRight, X, Network, MousePointerClick,
  Shield, Lock, Building2, Landmark, Car, Cpu,
  BookOpen, Award, CheckCircle2, CreditCard, Cloud,
  ListChecks, LifeBuoy, Flag, Bug,
} from 'lucide-react';
import { REGULATION_OVERLAPS, getOverlapsForRegulation } from '@/lib/regulations/overlaps';
import type { RegulationId } from '@/lib/regulations/types';
import type { LucideIcon } from 'lucide-react';

/* ─── Data ─── */

type Cat = 'legal' | 'industry' | 'framework' | 'baseline';

interface GNode {
  id: RegulationId;
  label: string;
  cat: Cat;
  icon: LucideIcon;
  accent: string;
}

const NODES: GNode[] = [
  { id: 'nis2',            label: 'NIS2',      cat: 'legal',     icon: Shield,       accent: '#2563eb' },
  { id: 'dsgvo',           label: 'DSGVO',     cat: 'legal',     icon: Lock,         accent: '#059669' },
  { id: 'kritis',          label: 'KRITIS',    cat: 'legal',     icon: Building2,    accent: '#dc2626' },
  { id: 'dora',            label: 'DORA',      cat: 'legal',     icon: Landmark,     accent: '#d97706' },
  { id: 'cra',             label: 'CRA',       cat: 'legal',     icon: Cpu,          accent: '#0891b2' },
  { id: 'tisax',           label: 'TISAX',     cat: 'industry',  icon: Car,          accent: '#7c3aed' },
  { id: 'pci-dss',         label: 'PCI DSS',   cat: 'industry',  icon: CreditCard,   accent: '#ea580c' },
  { id: 'soc2',            label: 'SOC 2',     cat: 'industry',  icon: CheckCircle2, accent: '#4f46e5' },
  { id: 'c5',              label: 'C5',        cat: 'industry',  icon: Cloud,        accent: '#0284c7' },
  { id: 'iso27001',        label: 'ISO 27001', cat: 'framework', icon: Award,        accent: '#0d9488' },
  { id: 'bsi-grundschutz', label: 'BSI',       cat: 'framework', icon: BookOpen,     accent: '#475569' },
  { id: 'nist-csf',        label: 'NIST CSF',  cat: 'framework', icon: Flag,         accent: '#1d4ed8' },
  { id: 'iso22301',        label: 'ISO 22301', cat: 'framework', icon: LifeBuoy,     accent: '#ea580c' },
  { id: 'cis-controls',    label: 'CIS',       cat: 'baseline',  icon: ListChecks,   accent: '#e11d48' },
  { id: 'owasp-asvs',      label: 'OWASP',     cat: 'baseline',  icon: Bug,          accent: '#65a30d' },
];

const ICON_MAP: Record<RegulationId, LucideIcon> = Object.fromEntries(
  NODES.map(n => [n.id, n.icon])
) as Record<RegulationId, LucideIcon>;

/* ─── Colors ─── */

const CAT_BORDER: Record<Cat, string> = {
  legal: '#dc2626', industry: '#7c3aed', framework: '#2563eb', baseline: '#64748b',
};
const CAT_SHADOW: Record<Cat, string> = {
  legal: 'rgba(220,38,38,.12)', industry: 'rgba(124,58,237,.12)',
  framework: 'rgba(37,99,235,.12)', baseline: 'rgba(100,116,139,.10)',
};
const CAT_TW: Record<Cat, string> = {
  legal: 'bg-red-50 text-red-700 border-red-200',
  industry: 'bg-violet-50 text-violet-700 border-violet-200',
  framework: 'bg-blue-50 text-blue-700 border-blue-200',
  baseline: 'bg-slate-50 text-slate-600 border-slate-200',
};

/* ─── Layout ─── */

const W = 760, H = 540;
const CX = W / 2, CY = 255;
const R = 195;

interface NPos extends GNode {
  x: number; y: number;
  pctX: number; pctY: number;
}

function layout(): NPos[] {
  const step = (2 * Math.PI) / NODES.length;
  return NODES.map((n, i) => {
    const a = -Math.PI / 2 + i * step;
    const x = CX + R * Math.cos(a);
    const y = CY + R * Math.sin(a);
    return { ...n, x, y, pctX: (x / W) * 100, pctY: (y / H) * 100 };
  });
}

/* ─── Curved edge helper ─── */

function edgePath(ax: number, ay: number, bx: number, by: number): string {
  // Quadratic bezier that bows slightly toward center
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const cx = mx * 0.82 + CX * 0.18;
  const cy = my * 0.82 + CY * 0.18;
  return `M${ax},${ay} Q${cx},${cy} ${bx},${by}`;
}

/* ─── Component ─── */

export function SynergyGraph() {
  const t = useTranslations('platform.dashboard.synergyGraph');
  const tReg = useTranslations();

  const [selected, setSelected] = useState<RegulationId | null>(null);
  const [hovered, setHovered] = useState<RegulationId | null>(null);
  const active = hovered || selected;

  const nodes = useMemo(layout, []);
  const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

  const overlaps = useMemo(() => {
    if (!active) return [];
    return getOverlapsForRegulation(active).sort((a, b) => b.overlapPercent - a.overlapPercent);
  }, [active]);

  const connIds = useMemo(() => {
    if (!active) return new Set<RegulationId>();
    return new Set(overlaps.map(o => o.regA === active ? o.regB : o.regA));
  }, [active, overlaps]);

  const click = useCallback((id: RegulationId) => {
    setSelected(p => p === id ? null : id);
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Network className="size-4 text-slate-600" />
          </div>
          <h2 className="text-lg font-bold text-foreground leading-tight">{t('title')}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('subtitle', { count: REGULATION_OVERLAPS.length })}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Graph area */}
        <div className="flex-1 min-w-0 relative">
          {/* Container with fixed aspect ratio */}
          <div className="relative w-full max-w-[760px] mx-auto" style={{ aspectRatio: `${W} / ${H}` }}>

            {/* Subtle background */}
            <div
              className="absolute inset-0 rounded-b-xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(241,245,249,.6) 0%, transparent 70%)',
              }}
            />

            {/* SVG layer for edges + labels */}
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {/* Subtle orbit ring */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e2e8f0" strokeWidth="1"
                strokeDasharray="4 6" opacity="0.5" />

              {/* Curved edges */}
              {active != null && REGULATION_OVERLAPS.map((ov, i) => {
                const mine = ov.regA === active || ov.regB === active;
                if (!mine) return null;
                const a = nodeMap.get(ov.regA);
                const b = nodeMap.get(ov.regB);
                if (!a || !b) return null;
                const activeNode = nodeMap.get(active);
                const catColor = activeNode ? CAT_BORDER[activeNode.cat] : '#3b82f6';
                return (
                  <path key={`e${i}`}
                    d={edgePath(a.x, a.y, b.x, b.y)}
                    fill="none"
                    stroke={catColor}
                    strokeWidth={Math.max(1.5, ov.overlapPercent / 20)}
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* % labels on edges */}
              {active != null && overlaps.map((ov, i) => {
                const a = nodeMap.get(ov.regA);
                const b = nodeMap.get(ov.regB);
                if (!a || !b) return null;
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const dx = b.x - a.x, dy = b.y - a.y;
                const len = Math.sqrt(dx * dx + dy * dy) || 1;
                const ox = (-dy / len) * 15, oy = (dx / len) * 15;
                return (
                  <g key={`l${i}`}>
                    <rect x={mx + ox - 18} y={my + oy - 10} width="36" height="20" rx="6"
                      fill="white" stroke="#e2e8f0" strokeWidth="0.8" />
                    <text x={mx + ox} y={my + oy + 1} textAnchor="middle" dominantBaseline="central"
                      fontSize="9.5" fontWeight="700" fill="#475569" fontFamily="system-ui, sans-serif">
                      {ov.overlapPercent}%
                    </text>
                  </g>
                );
              })}

              {/* Legend */}
              {(['legal', 'industry', 'framework', 'baseline'] as const).map((cat, i) => {
                const color = CAT_BORDER[cat];
                const x = 75 + i * 170;
                return (
                  <g key={cat}>
                    <circle cx={x} cy={H - 20} r="5" fill="none" stroke={color} strokeWidth="2" />
                    <text x={x + 12} y={H - 19} dominantBaseline="central"
                      fontSize="10.5" fill="#64748b" fontWeight="500" fontFamily="system-ui, sans-serif">
                      {t(`legend.${cat}`)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Center hint */}
            {!active && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
                <div className="flex flex-col items-center gap-1.5 text-slate-400">
                  <MousePointerClick className="size-5" />
                  <span className="text-xs font-medium">{t('hintClick')}</span>
                </div>
              </div>
            )}

            {/* HTML Nodes */}
            {nodes.map((n) => {
              const isActive = n.id === active;
              const isConn = connIds.has(n.id);
              const dim = active != null && !isActive && !isConn;
              const catColor = CAT_BORDER[n.cat];
              const catShadow = CAT_SHADOW[n.cat];
              const NodeIcon = n.icon;

              return (
                <div
                  key={n.id}
                  className="absolute flex flex-col items-center gap-1 cursor-pointer"
                  style={{
                    left: `${n.pctX}%`,
                    top: `${n.pctY}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 20 : isConn ? 10 : 5,
                    opacity: dim ? 0.18 : 1,
                    transition: 'opacity 200ms ease, transform 200ms ease',
                  }}
                  onClick={() => click(n.id)}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Icon container */}
                  <div
                    style={{
                      width: isActive ? 50 : 44,
                      height: isActive ? 50 : 44,
                      borderColor: catColor,
                      borderWidth: isActive ? 2.5 : isConn ? 2 : 1.5,
                      borderStyle: 'solid',
                      borderRadius: 12,
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isActive
                        ? `0 4px 16px ${catShadow}, 0 0 0 4px ${catShadow}`
                        : isConn
                          ? `0 2px 8px ${catShadow}`
                          : '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
                      transition: 'all 200ms ease',
                    }}
                  >
                    <NodeIcon
                      size={isActive ? 22 : 19}
                      color={n.accent}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: isActive ? 11 : 10,
                      fontWeight: isActive ? 700 : isConn ? 600 : 500,
                      color: dim ? '#cbd5e1' : isActive ? catColor : '#475569',
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.01em',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {n.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (() => {
          const nd = nodeMap.get(selected);
          if (!nd) return null;
          const ovs = getOverlapsForRegulation(selected).sort((a, b) => b.overlapPercent - a.overlapPercent);
          const SelectedIcon = nd.icon;
          const catColor = CAT_BORDER[nd.cat];

          return (
            <div className="lg:w-[310px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="size-11 rounded-xl flex items-center justify-center border-2"
                    style={{ borderColor: catColor, boxShadow: `0 2px 8px ${CAT_SHADOW[nd.cat]}` }}
                  >
                    <SelectedIcon size={22} color={nd.accent} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{nd.label}</h3>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold mt-0.5 ${CAT_TW[nd.cat]}`}>
                      {t(`legend.${nd.cat}`)}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <X className="size-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="mx-5 mb-3 flex gap-2">
                <div className="flex-1 rounded-lg bg-slate-100/80 px-3 py-2 text-center">
                  <div className="text-lg font-bold text-foreground leading-none">{ovs.length}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{t('connections')}</div>
                </div>
                {ovs[0] && (
                  <div className="flex-1 rounded-lg bg-slate-100/80 px-3 py-2 text-center">
                    <div className="text-lg font-bold leading-none" style={{ color: catColor }}>{ovs[0].overlapPercent}%</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{t('strongest')}</div>
                  </div>
                )}
              </div>

              {/* Overlap list */}
              <div className="px-5 pb-4 space-y-2 max-h-[360px] overflow-y-auto">
                {ovs.map((ov) => {
                  const oid = ov.regA === selected ? ov.regB : ov.regA;
                  const on = NODES.find(n => n.id === oid);
                  if (!on) return null;
                  const OIcon = ICON_MAP[oid];
                  const onCat = CAT_BORDER[on.cat];
                  return (
                    <div key={oid} className="group rounded-lg border border-slate-100 bg-white p-2.5 hover:border-slate-200 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="size-7 rounded-lg flex items-center justify-center border"
                            style={{ borderColor: onCat }}
                          >
                            <OIcon size={14} color={on.accent} strokeWidth={1.8} />
                          </div>
                          <span className="text-xs font-semibold text-foreground">{on.label}</span>
                        </div>
                        <span className="text-xs font-bold tabular-nums" style={{ color: on.accent }}>
                          {ov.overlapPercent}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden ml-9">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${ov.overlapPercent}%`, backgroundColor: on.accent }}
                        />
                      </div>
                      {ov.sharedMeasureKeys.length > 0 && (
                        <div className="mt-1.5 ml-9 flex flex-wrap gap-1 max-h-0 group-hover:max-h-24 overflow-hidden transition-[max-height] duration-300">
                          {ov.sharedMeasureKeys.map((k) => (
                            <span key={k} className="text-[9px] text-muted-foreground bg-slate-50 border border-slate-100 rounded-md px-1.5 py-0.5">
                              {tReg(k)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                <Link href={`/${selected}/schnellcheck` as any}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                  style={{ backgroundColor: catColor }}>
                  {t('startCheck')} <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
