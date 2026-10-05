/**
 * Modelo de Datos: Matriz Cristal Sincrónica de Territorios y Biorregiones
 * 
 * Gestiona el mapeo entre los vórtices del cristal planetario, las biorregiones terrestres,
 * funciones regenerativas, frecuencias de sincronía y círculos comunitarios custodios.
 */

import { generatePlanetaryCrystalGrid, geoToCartesian, calculateSynchronicWave } from '../math/crystalMatrix.js';

export const BIOREGION_TYPES = {
  'Montañas & Cabeceras de Cuenca': { icon: '🏔️', color: '#b366ff', element: 'Éter / Agua' },
  'Selvas Húmedas & Pulmones': { icon: '🌳', color: '#10b981', element: 'Tierra / Aire' },
  'Grandes Cuencas & Ríos': { icon: '🌊', color: '#00e5ff', element: 'Agua' },
  'Llanuras, Pampas & Sabanas': { icon: '🌾', color: '#f59e0b', element: 'Tierra / Fuego' },
  'Litoral, Islas & Océanos': { icon: '🐋', color: '#3b82f6', element: 'Agua / Aire' },
  'Desiertos & Mesetas': { icon: '🏜️', color: '#ef4444', element: 'Fuego / Tierra' }
};

export const SEED_TERRITORIES = [
  {
    idx: 1, // Vórtice en Sudamérica
    name: 'Biorregión Andina & Altiplano',
    territory: 'Cordillera de los Andes / Cuenca Sagrada',
    bioregionType: 'Montañas & Cabeceras de Cuenca',
    archetype: 'Éter',
    lat: -26.565,
    lon: -72.0,
    synchronicFreq: 432,
    regenerativeFocus: 'Custodia de Glaciares, Siembra y Cosecha de Agua, Sabiduría Ancestral',
    communityCircle: 'Guardianes del Agua Andina',
    notes: 'Nodo primordial de la columna vertebral energética de América del Sur.'
  },
  {
    idx: 2,
    name: 'Biorregión Cuenca Amazónica',
    territory: 'Gran Selva Amazónica / Río Madre',
    bioregionType: 'Selvas Húmedas & Pulmones',
    archetype: 'Agua',
    lat: -3.465,
    lon: -62.215,
    synchronicFreq: 528,
    regenerativeFocus: 'Preservación de la Biodiversidad Primigenia, Ríos Voladores y Bosques Vivos',
    communityCircle: 'Círculo del Pulmón Planetario',
    notes: 'Epicentro bioclimático y generador de humedad para todo el hemisferio sur.'
  },
  {
    idx: 3,
    name: 'Biorregión Cuenca del Plata & Pampas',
    territory: 'Humedales del Delta / Acuífero Guaraní',
    bioregionType: 'Llanuras, Pampas & Sabanas',
    archetype: 'Tierra',
    lat: -34.603,
    lon: -58.381,
    synchronicFreq: 7.83,
    regenerativeFocus: 'Regeneración de Suelos Vivos, Soberanía Alimentaria y Protección del Acuífero',
    communityCircle: 'Red de Soberanía del Plata',
    notes: 'Almacén de agua dulce profunda y matriz de fertilidad regenerativa.'
  },
  {
    idx: 4,
    name: 'Biorregión Patagonia Austral & Hielo',
    territory: 'Campos de Hielo Sur / Selva Valdiviana',
    bioregionType: 'Montañas & Cabeceras de Cuenca',
    archetype: 'Agua / Aire',
    lat: -50.500,
    lon: -73.000,
    synchronicFreq: 432,
    regenerativeFocus: 'Santuario de Vientos Polares, Reservas Criogénicas y Reilvestración',
    communityCircle: 'Tejedores del Viento Austral',
    notes: 'Centinela del clima antártico y pureza elemental.'
  },
  {
    idx: 5,
    name: 'Biorregión Mesoamérica & Bosques Nubosos',
    territory: 'Sierra Madre / Selva Maya',
    bioregionType: 'Selvas Húmedas & Pulmones',
    archetype: 'Fuego',
    lat: 16.500,
    lon: -92.500,
    synchronicFreq: 528,
    regenerativeFocus: 'Protección de Semillas Nativas de Maíz, Corredores Biológicos y Milpa',
    communityCircle: 'Alianza de Semillas Mesoamericanas',
    notes: 'Puente biocultural entre el norte y el sur del continente.'
  },
  {
    idx: 6,
    name: 'Biorregión Himalayas & Torre de Aguas',
    territory: 'Meseta Tibetana / Nacientes del Ganges e Indo',
    bioregionType: 'Montañas & Cabeceras de Cuenca',
    archetype: 'Éter',
    lat: 28.598,
    lon: 83.931,
    synchronicFreq: 432,
    regenerativeFocus: 'Antena de Conciencia y Custodia de Aguas de Asia',
    communityCircle: 'Círculo de la Cumbre Sagrada',
    notes: 'Torre hídrica que nutre a más del 20% de la población del planeta.'
  },
  {
    idx: 7,
    name: 'Biorregión Valle del Rift & Sabana Africana',
    territory: 'Grandes Lagos Africanos / Cuna Primigenia',
    bioregionType: 'Llanuras, Pampas & Sabanas',
    archetype: 'Fuego',
    lat: -1.292,
    lon: 36.821,
    synchronicFreq: 7.83,
    regenerativeFocus: 'Memoria Biocultural Originaria y Regeneración de Paisajes Ancestrales',
    communityCircle: 'Raíces de la Humanidad',
    notes: 'Cuna evolutiva del género humano y matriz de pastoreo regenerativo.'
  },
  {
    idx: 8,
    name: 'Biorregión Cuenca del Mediterráneo & Atlas',
    territory: 'Cuencas del Mar Interior / Dehesas y Olivos',
    bioregionType: 'Litoral, Islas & Océanos',
    archetype: 'Aire',
    lat: 36.500,
    lon: 5.000,
    synchronicFreq: 432,
    regenerativeFocus: 'Agroforestería Regenerativa, Resiliencia al Cambio Climático e Intercambio',
    communityCircle: 'Círculo del Olivo de Paz',
    notes: 'Encrucijada histórica de saberes y cuenca bioclimática templada.'
  },
  {
    idx: 9,
    name: 'Biorregión Océano Pacífico & Red Polinesia',
    territory: 'Triángulo Polinesio / Mar de Coral',
    bioregionType: 'Litoral, Islas & Océanos',
    archetype: 'Agua',
    lat: -17.713,
    lon: -149.406,
    synchronicFreq: 528,
    regenerativeFocus: 'Navegación Ancestral con Estrellas, Protección de Arrecifes y Red Oceánica',
    communityCircle: 'Navegantes del Gran Océano',
    notes: 'El mayor espejo de agua del planeta que regula las corrientes globales.'
  },
  {
    idx: 10,
    name: 'Biorregión Taiga Boreal & Bosques Nórdicos',
    territory: 'Filtro Boreal Euroasiático y Canadiense',
    bioregionType: 'Selvas Húmedas & Pulmones',
    archetype: 'Tierra / Aire',
    lat: 60.000,
    lon: 30.000,
    synchronicFreq: 7.83,
    regenerativeFocus: 'Sumidero Global de Carbono, Conservación de Turberas y Bosque Antiguo',
    communityCircle: 'Guardianes de la Taiga',
    notes: 'Cinturón verde que abraza el hemisferio norte.'
  }
];

export class SynchronicCrystalMatrixModel {
  constructor(radius = 3.5) {
    this.radius = radius;
    this.grid = generatePlanetaryCrystalGrid(radius);
    this.nodes = [];
    this.links = [];
    this.categories = { ...BIOREGION_TYPES };
    this.globalFrequencyMode = 'schumann'; // 'schumann' (7.83Hz), 'golden' (432Hz), 'solstice'
    this.activeTime = 0;
    this.init();
  }

  init() {
    this.nodes = this.grid.vertices.map((v, i) => {
      // Buscar si tiene semilla precargada
      const seed = SEED_TERRITORIES.find(s => s.idx === i) || SEED_TERRITORIES[i % SEED_TERRITORIES.length];
      const isCustomized = i < SEED_TERRITORIES.length;

      const name = isCustomized 
        ? seed.name 
        : `Vórtice Cristalino #${i + 1} (${v.archetype})`;

      const territory = isCustomized 
        ? seed.territory 
        : `Territorio Lat: ${v.lat.toFixed(1)}°, Lon: ${v.lon.toFixed(1)}°`;

      const bType = isCustomized ? seed.bioregionType : (i % 2 === 0 ? 'Montañas & Cabeceras de Cuenca' : 'Grandes Cuencas & Ríos');

      return {
        id: `cryst_vortex_${i}`,
        index: i,
        name,
        territory,
        bioregionType: bType,
        archetype: v.archetype,
        color: BIOREGION_TYPES[bType]?.color || '#00e5ff',
        lat: v.lat,
        lon: v.lon,
        pos3D: v.pos,
        synchronicFreq: isCustomized ? seed.synchronicFreq : 432,
        regenerativeFocus: isCustomized ? seed.regenerativeFocus : 'Punto de resonancia cristalina y articulación biocultural.',
        communityCircle: isCustomized ? seed.communityCircle : 'Círculo Semilla Local',
        notes: isCustomized ? seed.notes : 'Vórtice geodésico de la malla icosa-dodecaédrica planetaria.',
        connections: []
      };
    });

    // Mapear enlaces
    this.links = this.grid.edges.map(([a, b]) => {
      const idA = this.nodes[a]?.id;
      const idB = this.nodes[b]?.id;
      if (idA && idB) {
        this.nodes[a].connections.push(idB);
        this.nodes[b].connections.push(idA);
      }
      return { source: idA, target: idB, weight: 1.0 };
    });
  }

  getNode(id) {
    return this.nodes.find(n => n.id === id);
  }

  updateNode(id, updates) {
    const node = this.getNode(id);
    if (!node) return false;

    if (updates.name !== undefined) node.name = updates.name.trim();
    if (updates.territory !== undefined) node.territory = updates.territory.trim();
    if (updates.bioregionType !== undefined) {
      node.bioregionType = updates.bioregionType;
      node.color = BIOREGION_TYPES[updates.bioregionType]?.color || node.color;
    }
    if (updates.regenerativeFocus !== undefined) node.regenerativeFocus = updates.regenerativeFocus.trim();
    if (updates.communityCircle !== undefined) node.communityCircle = updates.communityCircle.trim();
    if (updates.synchronicFreq !== undefined) node.synchronicFreq = Number(updates.synchronicFreq);
    if (updates.notes !== undefined) node.notes = updates.notes;
    if (updates.color !== undefined) node.color = updates.color;

    return true;
  }

  /**
   * Obtiene la pulsación sincrónica actual de cada nodo en el tiempo t.
   */
  getSynchronicPulse(node, time) {
    const freq = node.synchronicFreq || 7.83;
    return calculateSynchronicWave(time, freq, node.lon);
  }

  /**
   * Exporta la matriz a JSON para descarga directa.
   */
  exportToJSON() {
    return JSON.stringify({
      schema: 'MatrizCristalSincronica-v1.0',
      exportedAt: new Date().toISOString(),
      globalFrequencyMode: this.globalFrequencyMode,
      totalVortices: this.nodes.length,
      totalTeluricLines: this.links.length,
      bioregions: this.nodes,
      links: this.links
    }, null, 2);
  }

  /**
   * Importa la matriz desde JSON.
   */
  importFromJSON(jsonStr) {
    try {
      const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
      if (!data.bioregions || !data.links) return false;
      this.nodes = data.bioregions;
      this.links = data.links;
      this.globalFrequencyMode = data.globalFrequencyMode || 'schumann';
      return true;
    } catch (e) {
      console.error('Error importando matriz sincrónica:', e);
      return false;
    }
  }
}
