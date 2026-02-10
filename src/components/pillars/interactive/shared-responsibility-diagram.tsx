'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ServiceModel = 'on-prem' | 'iaas' | 'paas' | 'saas';
type Responsibility = 'customer' | 'provider' | 'shared';

interface Layer {
  id: string;
  labelKey: string;
}

const LAYERS: Layer[] = [
  { id: 'applications', labelKey: 'pillars.sharedResp.layers.applications' },
  { id: 'data', labelKey: 'pillars.sharedResp.layers.data' },
  { id: 'runtime', labelKey: 'pillars.sharedResp.layers.runtime' },
  { id: 'middleware', labelKey: 'pillars.sharedResp.layers.middleware' },
  { id: 'os', labelKey: 'pillars.sharedResp.layers.os' },
  { id: 'virtualization', labelKey: 'pillars.sharedResp.layers.virtualization' },
  { id: 'servers', labelKey: 'pillars.sharedResp.layers.servers' },
  { id: 'storage', labelKey: 'pillars.sharedResp.layers.storage' },
  { id: 'networking', labelKey: 'pillars.sharedResp.layers.networking' },
  { id: 'physical', labelKey: 'pillars.sharedResp.layers.physical' },
];

const RESPONSIBILITY_MAP: Record<ServiceModel, Record<string, Responsibility>> = {
  'on-prem': {
    applications: 'customer', data: 'customer', runtime: 'customer', middleware: 'customer',
    os: 'customer', virtualization: 'customer', servers: 'customer', storage: 'customer',
    networking: 'customer', physical: 'customer',
  },
  iaas: {
    applications: 'customer', data: 'customer', runtime: 'customer', middleware: 'customer',
    os: 'customer', virtualization: 'provider', servers: 'provider', storage: 'provider',
    networking: 'provider', physical: 'provider',
  },
  paas: {
    applications: 'customer', data: 'customer', runtime: 'shared', middleware: 'provider',
    os: 'provider', virtualization: 'provider', servers: 'provider', storage: 'provider',
    networking: 'provider', physical: 'provider',
  },
  saas: {
    applications: 'shared', data: 'shared', runtime: 'provider', middleware: 'provider',
    os: 'provider', virtualization: 'provider', servers: 'provider', storage: 'provider',
    networking: 'provider', physical: 'provider',
  },
};

const RESP_COLORS: Record<Responsibility, { bg: string; text: string; label: string }> = {
  customer: { bg: 'bg-red-100 border-red-300', text: 'text-red-700', label: 'pillars.sharedResp.legend.customer' },
  provider: { bg: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-700', label: 'pillars.sharedResp.legend.provider' },
  shared: { bg: 'bg-amber-100 border-amber-300', text: 'text-amber-700', label: 'pillars.sharedResp.legend.shared' },
};

const SERVICE_MODELS: { id: ServiceModel; labelKey: string }[] = [
  { id: 'on-prem', labelKey: 'pillars.sharedResp.models.onPrem' },
  { id: 'iaas', labelKey: 'pillars.sharedResp.models.iaas' },
  { id: 'paas', labelKey: 'pillars.sharedResp.models.paas' },
  { id: 'saas', labelKey: 'pillars.sharedResp.models.saas' },
];

export function SharedResponsibilityDiagram() {
  const t = useTranslations();
  const [activeModel, setActiveModel] = useState<ServiceModel>('paas');
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  return (
    <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50/50">
      <div className="border-b border-indigo-200 bg-indigo-100/50 px-4 py-3">
        <h3 className="text-sm font-bold text-indigo-800">{t('pillars.sharedResp.title')}</h3>
        <p className="text-xs text-indigo-600 mt-0.5">{t('pillars.sharedResp.subtitle')}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Model selector */}
        <div className="flex gap-1 rounded-lg bg-white p-1 border">
          {SERVICE_MODELS.map(model => (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id)}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${
                activeModel === model.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {t(model.labelKey)}
            </button>
          ))}
        </div>

        {/* Layer grid */}
        <div className="space-y-1">
          {LAYERS.map(layer => {
            const resp = RESPONSIBILITY_MAP[activeModel][layer.id];
            const colors = RESP_COLORS[resp];
            const isHovered = hoveredLayer === layer.id;

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`flex items-center justify-between rounded-md border px-3 py-2 transition-all cursor-default ${colors.bg} ${
                  isHovered ? 'ring-2 ring-indigo-400 scale-[1.01]' : ''
                }`}
              >
                <span className={`text-xs font-medium ${colors.text}`}>
                  {t(layer.labelKey)}
                </span>
                <span className={`text-[10px] font-semibold uppercase ${colors.text}`}>
                  {t(colors.label)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {Object.entries(RESP_COLORS).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`h-3 w-3 rounded-sm border ${val.bg}`} />
              <span className="text-[10px] font-medium text-muted-foreground">{t(val.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
