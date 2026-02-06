import type { Sector } from './types';

export const SECTORS: Sector[] = [
  // ANLAGE 1 - 7 sectors
  {
    id: 'energy',
    nameKey: 'sectors.energy.name',
    anlage: 1,
    subsectors: [
      { id: 'electricity', nameKey: 'sectors.energy.subsectors.electricity' },
      { id: 'district-heating', nameKey: 'sectors.energy.subsectors.districtHeating' },
      { id: 'fuel', nameKey: 'sectors.energy.subsectors.fuel' },
      { id: 'gas', nameKey: 'sectors.energy.subsectors.gas' },
    ],
  },
  {
    id: 'transport',
    nameKey: 'sectors.transport.name',
    anlage: 1,
    subsectors: [
      { id: 'air', nameKey: 'sectors.transport.subsectors.air' },
      { id: 'rail', nameKey: 'sectors.transport.subsectors.rail' },
      { id: 'maritime', nameKey: 'sectors.transport.subsectors.maritime' },
      { id: 'road', nameKey: 'sectors.transport.subsectors.road' },
    ],
  },
  {
    id: 'finance',
    nameKey: 'sectors.finance.name',
    anlage: 1,
    subsectors: [
      { id: 'banking', nameKey: 'sectors.finance.subsectors.banking' },
      { id: 'financial-infrastructure', nameKey: 'sectors.finance.subsectors.financialInfrastructure' },
    ],
  },
  {
    id: 'health',
    nameKey: 'sectors.health.name',
    anlage: 1,
    subsectors: [
      { id: 'health-services', nameKey: 'sectors.health.subsectors.healthServices' },
    ],
  },
  {
    id: 'water',
    nameKey: 'sectors.water.name',
    anlage: 1,
    subsectors: [
      { id: 'drinking-water', nameKey: 'sectors.water.subsectors.drinkingWater' },
      { id: 'wastewater', nameKey: 'sectors.water.subsectors.wastewater' },
    ],
  },
  {
    id: 'digital-infrastructure',
    nameKey: 'sectors.digitalInfrastructure.name',
    anlage: 1,
    subsectors: [
      { id: 'ixp', nameKey: 'sectors.digitalInfrastructure.subsectors.ixp' },
      { id: 'dns', nameKey: 'sectors.digitalInfrastructure.subsectors.dns' },
      { id: 'tld', nameKey: 'sectors.digitalInfrastructure.subsectors.tld' },
      { id: 'cloud', nameKey: 'sectors.digitalInfrastructure.subsectors.cloud' },
      { id: 'datacenter', nameKey: 'sectors.digitalInfrastructure.subsectors.datacenter' },
      { id: 'cdn', nameKey: 'sectors.digitalInfrastructure.subsectors.cdn' },
      { id: 'tsp', nameKey: 'sectors.digitalInfrastructure.subsectors.tsp' },
    ],
  },
  {
    id: 'space',
    nameKey: 'sectors.space.name',
    anlage: 1,
    subsectors: [
      { id: 'ground-infrastructure', nameKey: 'sectors.space.subsectors.groundInfrastructure' },
    ],
  },
  // ANLAGE 2 - 7 sectors
  {
    id: 'postal',
    nameKey: 'sectors.postal.name',
    anlage: 2,
    subsectors: [],
  },
  {
    id: 'waste-management',
    nameKey: 'sectors.wasteManagement.name',
    anlage: 2,
    subsectors: [],
  },
  {
    id: 'chemicals',
    nameKey: 'sectors.chemicals.name',
    anlage: 2,
    subsectors: [],
  },
  {
    id: 'food',
    nameKey: 'sectors.food.name',
    anlage: 2,
    subsectors: [],
  },
  {
    id: 'manufacturing',
    nameKey: 'sectors.manufacturing.name',
    anlage: 2,
    subsectors: [
      { id: 'medical-devices', nameKey: 'sectors.manufacturing.subsectors.medicalDevices' },
      { id: 'electronics', nameKey: 'sectors.manufacturing.subsectors.electronics' },
      { id: 'electrical-equipment', nameKey: 'sectors.manufacturing.subsectors.electricalEquipment' },
      { id: 'mechanical-engineering', nameKey: 'sectors.manufacturing.subsectors.mechanicalEngineering' },
      { id: 'motor-vehicles', nameKey: 'sectors.manufacturing.subsectors.motorVehicles' },
      { id: 'other-vehicles', nameKey: 'sectors.manufacturing.subsectors.otherVehicles' },
    ],
  },
  {
    id: 'digital-services',
    nameKey: 'sectors.digitalServices.name',
    anlage: 2,
    subsectors: [
      { id: 'online-marketplace', nameKey: 'sectors.digitalServices.subsectors.onlineMarketplace' },
      { id: 'search-engine', nameKey: 'sectors.digitalServices.subsectors.searchEngine' },
      { id: 'social-network', nameKey: 'sectors.digitalServices.subsectors.socialNetwork' },
    ],
  },
  {
    id: 'research',
    nameKey: 'sectors.research.name',
    anlage: 2,
    subsectors: [
      { id: 'research-facilities', nameKey: 'sectors.research.subsectors.researchFacilities' },
    ],
  },
];

export function getAllSectors(): Sector[] {
  return SECTORS;
}

export function getSectorById(id: string): Sector | undefined {
  return SECTORS.find((s) => s.id === id);
}

export function getSectorsByAnlage(anlage: 1 | 2): Sector[] {
  return SECTORS.filter((s) => s.anlage === anlage);
}
