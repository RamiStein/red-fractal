/**
 * Modelo de Datos: Matriz Cristal Sincrónica con Biorregiones,
 * Líneas Ley, Flujos Telúricos y Ciudades Intraterrenas (ERKS, Aurora, Isidris, etc.)
 */

import { generatePlanetaryCrystalGrid, geoToCartesian } from '../math/crystalMatrix.js';

// =============================================================================
// CATÁLOGO DE CIUDADES INTRATERRENAS (Centros de Luz y Sabiduría Telúrica)
// =============================================================================
export const INTRATERRENA_CITIES = [
  {
    id: 'intra_erks',
    name: 'ERKS (Encuentro de Remanentes Kósmicos Siderales)',
    shortName: '🏛️ ERKS',
    location: 'Capilla del Monte / Cerro Uritorco, Sierras de Córdoba, Argentina',
    region: 'Sudamérica (Centro)',
    lat: -30.854,
    lon: -64.526,
    ray: 'Rayo Azul Cósmico',
    color: '#00bfff',
    vibrationalFreq: 777,
    purpose: 'Centro de despertar de la conciencia cósmica, activación de memorias estelares y vórtice de transmutación y contacto interdimensional.',
    associatedBioregion: 'Biorregión Cuenca del Plata & Pampas / Transición Serrana',
    teluricFlows: ['bio_plata', 'bio_andes', 'intra_aurora', 'intra_isidris'],
    description: 'Ciudad intraterrena de los espejos y la hermandad cósmica, ancla del despertar de la Nueva Humanidad en el Cono Sur.'
  },
  {
    id: 'intra_aurora',
    name: 'Centro de Luz Aurora',
    shortName: '🏛️ Aurora',
    location: 'Salto, Uruguay / Sobre el Acuífero Guaraní',
    region: 'Sudamérica (Litoral)',
    lat: -31.389,
    lon: -57.960,
    ray: 'Rayo Verde & Dorado de Sanación',
    color: '#10b981',
    vibrationalFreq: 528,
    purpose: 'Centro de sanación planetaria, irradiación de armonía celular y custodia espiritual de las reservas de agua profunda del Acuífero Guaraní.',
    associatedBioregion: 'Biorregión Cuenca del Plata & Humedales',
    teluricFlows: ['bio_plata', 'intra_erks', 'bio_amazonas'],
    description: 'Matriz de irradiación curativa y reposo del alma, vinculada a las corrientes telúricas de agua dulce subterránea.'
  },
  {
    id: 'intra_isidris',
    name: 'Ciudad de Isidris',
    shortName: '🏛️ Isidris',
    location: 'Quebrada de San Isidro / Precordillera de Mendoza, Argentina',
    region: 'Sudamérica (Andes Centrales)',
    lat: -32.890,
    lon: -68.950,
    ray: 'Rayo Blanco de la Conciencia Crística',
    color: '#ffffff',
    vibrationalFreq: 888,
    purpose: 'Preparación de la conciencia de las nuevas generaciones, custodia de la pureza andina y portal de integración solar.',
    associatedBioregion: 'Biorregión Andina & Altiplano',
    teluricFlows: ['bio_andes', 'intra_erks', 'bio_patagonia'],
    description: 'Faro de luz diamantina en la precordillera andina que sostiene el despertar de la infancia estelar.'
  },
  {
    id: 'intra_paititi',
    name: 'Paititi (El Dorado Espiritual)',
    shortName: '🏛️ Paititi',
    location: 'Parque Nacional del Manú / Madre de Dios, Perú',
    region: 'Sudamérica (Andes-Amazonía)',
    lat: -12.250,
    lon: -71.500,
    ray: 'Rayo Dorado Solar Ancestral',
    color: '#f59e0b',
    vibrationalFreq: 432,
    purpose: 'Gran archivo viviente de la sabiduría ancestral de las razas solares, custodia del Disco Solar y puente sagrado entre los Andes y la Selva.',
    associatedBioregion: 'Biorregión Cuenca Amazónica / Ceja de Selva',
    teluricFlows: ['bio_amazonas', 'bio_andes', 'intra_titicaca'],
    description: 'Santuario oculto de los sacerdotes solares y guardianes de los discos de oro de la hermandad blanca.'
  },
  {
    id: 'intra_titicaca',
    name: 'Templo Solar del Titicaca (Wiñaymarka)',
    shortName: '🏛️ Titicaca',
    location: 'Lago Sagrado Titicaca / Isla del Sol, Bolivia / Perú',
    region: 'Sudamérica (Altiplano)',
    lat: -15.925,
    lon: -69.185,
    ray: 'Rayo Dorado-Rubí de la Kundalini Planetaria',
    color: '#f43f5e',
    vibrationalFreq: 432,
    purpose: 'Anclaje del eje Kundalini planetario de la Nueva Era, unificación del principio masculino y femenino cósmico y custodia del Disco Solar Mayor.',
    associatedBioregion: 'Biorregión Andina & Altiplano',
    teluricFlows: ['bio_andes', 'intra_paititi', 'intra_tayos', 'intra_isidris'],
    description: 'El mayor vórtice polarizador de la energía femenina y creadora de la Tierra en la Era de Acuario.'
  },
  {
    id: 'intra_tayos',
    name: 'Santuario de los Tayos',
    shortName: '🏛️ Cueva de los Tayos',
    location: 'Cordillera del Cóndor, Morona Santiago, Ecuador',
    region: 'Sudamérica (Ecuador)',
    lat: -3.060,
    lon: -78.220,
    ray: 'Rayo Platino de la Sabiduría de la Tierra',
    color: '#e2e8f0',
    vibrationalFreq: 963,
    purpose: 'Custodia de las planchas metálicas y anales de la historia estelar de la Tierra, biblioteca subterránea de la hermandad intraterrena.',
    associatedBioregion: 'Biorregión Cuenca Amazónica / Andes del Norte',
    teluricFlows: ['bio_amazonas', 'bio_mesoamerica', 'intra_titicaca'],
    description: 'Laberinto subterráneo de galerías milimétricamente talladas que comunican los centros intraterrenos de América.'
  },
  {
    id: 'intra_shasta',
    name: 'Telos (Monte Shasta)',
    shortName: '🏛️ Monte Shasta',
    location: 'Cordillera de las Cascadas, California, EE.UU.',
    region: 'Norteamérica',
    lat: 41.409,
    lon: -122.195,
    ray: 'Rayo Violeta de la Transmutación',
    color: '#a855f7',
    vibrationalFreq: 528,
    purpose: 'Faro de transmutación del hemisferio norte, custodia de la herencia lemuriana y armonización de las fallas tectónicas.',
    associatedBioregion: 'Biorregión Montañas Rocosas & Cascadas',
    teluricFlows: ['bio_mesoamerica', 'bio_pacifico'],
    description: 'Volcán sagrado que alberga la ciudad subterránea de Telos y proyecta la llama violeta planetaria.'
  },
  {
    id: 'intra_shamballa',
    name: 'Shamballa / Agartha Central',
    shortName: '🏛️ Shamballa',
    location: 'Desierto de Gobi / Eje Trans-Himaláyico, Asia Central',
    region: 'Asia',
    lat: 42.000,
    lon: 104.000,
    ray: 'Rayo Síntesis de la Voluntad Divina',
    color: '#ffd700',
    vibrationalFreq: 999,
    purpose: 'Corazón directriz de la Red de Agartha, emisión de las pautas evolutivas de la Tierra y anclaje del propósito supremo.',
    associatedBioregion: 'Biorregión Himalayas & Meseta Central',
    teluricFlows: ['bio_himalayas', 'bio_taiga'],
    description: 'La mítica sede de la Gran Fraternidad Blanca y centro supremo de la red intraterrena mundial.'
  }
];

// =============================================================================
// VÓRTICES SAGRADOS DEL AGUA Y MEMORIA TELÚRICA
// =============================================================================
export const SACRED_SITES = [
  {
    id: 'site_san_agustin',
    name: 'San Agustín & Macizo Colombiano (Laguna Kusiyaku)',
    shortName: '💧 San Agustín (Kusiyaku)',
    category: 'sacred_site',
    location: 'Macizo Colombiano / Páramo de las Papas, Huila y Cauca, Colombia',
    region: 'Sudamérica (Andes del Norte)',
    lat: 1.884,
    lon: -76.297,
    ray: 'Rayo Esmeralda-Cristal / Fábrica del Agua Continental',
    color: '#06d6a0',
    vibrationalFreq: 528,
    ecosystem: 'Páramo de Frailejones (Espeletia) y Lagunas Glaciares de Altura',
    riversBorn: 'Río Putumayo, Río Caquetá, Río Magdalena, Río Cauca',
    purpose: 'Estrella Fluvial de Colombia y matriz primigenia de agua dulce. Los frailejones atrapan la niebla andina alimentando la Laguna Kusiyaku y la Laguna de la Magdalena, dando nacimiento al Río Putumayo y Caquetá que nutren el Río Amazonas, y a través de los Ríos Voladores conectan con el Acuífero Guaraní y la Cuenca del Plata. Complejo megalítico ceremonial de guardianes de piedra y fuentes talladas en roca viva (Lavapatas).',
    teluricFlows: ['bio_amazonas', 'intra_tayos', 'bio_plata', 'site_sierra_nevada', 'site_iguazu'],
    description: 'Matriz sagrada donde el reino vegetal de los frailejones teje el nacimiento del agua continental y los ancestros megalíticos custodiaron los portales de piedra.'
  },
  {
    id: 'site_sierra_nevada',
    name: 'Sierra Nevada de Santa Marta (El Corazón del Mundo)',
    shortName: '🏔️ Sierra Nevada (Gonawindua)',
    category: 'sacred_site',
    location: 'Caribe Colombiano / Picos Colón y Bolívar, Colombia',
    region: 'Sudamérica (Caribe)',
    lat: 10.867,
    lon: -73.689,
    ray: 'Rayo Blanco de la Ley de Origen (Sé Nenlang)',
    color: '#ffffff',
    vibrationalFreq: 888,
    purpose: 'Pirámide costera más alta del planeta Tierra. Territorio sagrado de los 4 pueblos originarios (Kogui, Arhuaco, Wiwa y Kankuamo) encargados de regular el equilibrio bioclimático y espiritual del planeta mediante la Línea Negra.',
    teluricFlows: ['site_san_agustin', 'bio_mesoamerica', 'site_roraima'],
    description: 'El "Corazón del Mundo", templo natural piramidal que sostiene los códigos matrices del orden cósmico en la Tierra.'
  },
  {
    id: 'site_roraima',
    name: 'Monte Roraima (Tepuy Sagrado / Escudo Guayanés)',
    shortName: '⛰️ Monte Roraima',
    category: 'sacred_site',
    location: 'Gran Sabana / Frontera Venezuela, Brasil y Guyana',
    region: 'Sudamérica (Escudo Guayanés)',
    lat: 5.143,
    lon: -60.762,
    ray: 'Rayo Primordial de la Creación (2.000 Millones de Años)',
    color: '#ec4899',
    vibrationalFreq: 963,
    purpose: 'Una de las formaciones geológicas más arcaicas de la Tierra. Meseta tabular sagrada de los pueblos Pemón (La Casa de los Dioses), cuna de aguas puras que alimentan las cuencas del Orinoco y del Amazonas.',
    teluricFlows: ['site_san_agustin', 'bio_amazonas', 'site_iguazu'],
    description: 'Tepuy milenario de cuarzo y roca primigenia, guardián de las primeras memorias minerales del planeta.'
  },
  {
    id: 'site_iguazu',
    name: 'Cataratas del Iguazú / Garganta del Diablo',
    shortName: '🌊 Cataratas del Iguazú',
    category: 'sacred_site',
    location: 'Misiones, Argentina / Paraná, Brasil',
    region: 'Sudamérica (Cuenca del Plata)',
    lat: -25.695,
    lon: -54.436,
    ray: 'Rayo Violeta-Platino / Ionización & Purificación Telúrica',
    color: '#8b5cf6',
    vibrationalFreq: 741,
    purpose: 'Falla geológica volcánica donde 275 saltos vierten su energía sobre el basalto del Acuífero Guaraní. Vórtice de máxima ionización negativa, purificación y resonancia sónica telúrica.',
    teluricFlows: ['intra_aurora', 'intra_erks', 'bio_plata', 'site_san_agustin'],
    description: 'El gran velo de agua viva y estruendo sagrado que descarga la energía cósmica en el corazón de Sudamérica.'
  },
  {
    id: 'site_uyuni',
    name: 'Salar de Uyuni & Volcán Tunupa',
    shortName: '🧂 Salar de Uyuni',
    category: 'sacred_site',
    location: 'Potosí / Oruro, Altiplano de Bolivia',
    region: 'Sudamérica (Altiplano)',
    lat: -20.133,
    lon: -67.489,
    ray: 'Rayo Cristalino / Memoria Mineral & Reflejo Cósmico',
    color: '#e0e7ff',
    vibrationalFreq: 528,
    purpose: 'El mayor espejo de sal y litio del planeta. Antena telúrica reflectora del firmamento estelar y reserva de memoria mineral pura que armoniza el campo electromagnético andino.',
    teluricFlows: ['intra_titicaca', 'intra_isidris', 'intra_erks'],
    description: 'Espejo blanco infinito que une cielo y tierra, anclado al volcán sagrado Tunupa.'
  },
  {
    id: 'site_cano_cristales',
    name: 'Caño Cristales / Serranía de La Macarena',
    shortName: '🌈 Caño Cristales',
    category: 'sacred_site',
    location: 'La Macarena, Meta, Colombia',
    region: 'Sudamérica (Transición Andes-Amazonas)',
    lat: 2.215,
    lon: -73.791,
    ray: 'Rayo Arcoíris de la Biodiversidad',
    color: '#f59e0b',
    vibrationalFreq: 639,
    purpose: 'El "Río de los Siete Colores", encuentro biogeográfico del Escudo Guayanés, los Andes y la Amazonía. Pulsación cromática de algas vivas y aguas cristalinas.',
    teluricFlows: ['site_san_agustin', 'bio_amazonas'],
    description: 'Canal de luz acuática donde la geología más antigua se tiñe de vida con los rayos solares.'
  }
];

// =============================================================================
// GRANDES LÍNEAS LEY PLANETARIAS Y FLUJOS TELÚRICOS
// =============================================================================
export const LEY_LINES_DATA = [
  {
    id: 'ley_ruta_agua_viva',
    name: 'Ruta Sagrada del Agua Viva (Kusiyaku → Putumayo → Amazonas → Cuenca del Plata)',
    shortName: '💧 Ruta del Agua Viva (Kusiyaku → Plata)',
    color: '#00e5ff',
    width: 4.0,
    type: 'Corredor Hidro-Telúrico Continental',
    purpose: 'El gran viaje sagrado del agua continental: nace de la niebla atrapada por los frailejones en el Macizo Colombiano (Laguna Kusiyaku, San Agustín), alimenta el Río Putumayo y Caquetá, confluye en el Río Amazonas, asciende como Ríos Voladores sobre la selva, recarga las aguas subterráneas del Acuífero Guaraní (Aurora e Iguazú), cruza el vórtice de ERKS en Córdoba y se vierte en la fertilidad de la Cuenca del Plata.',
    path: ['site_san_agustin', 'site_cano_cristales', 'intra_paititi', 'bio_amazonas', 'site_iguazu', 'intra_aurora', 'intra_erks', 'bio_plata']
  },
  {
    id: 'ley_kundalini_andina',
    name: 'Eje Kundalini Andino (Columna Vertebral de América)',
    color: '#00e5ff',
    width: 3.5,
    type: 'Gran Línea Ley Planetaria',
    purpose: 'Conduce el flujo principal de energía vital y espiritual planetaria en la Nueva Era desde la Patagonia hasta Alaska.',
    path: ['bio_patagonia', 'intra_isidris', 'intra_erks', 'site_uyuni', 'intra_titicaca', 'intra_paititi', 'intra_tayos', 'site_san_agustin', 'site_sierra_nevada', 'bio_mesoamerica', 'intra_shasta']
  },
  {
    id: 'ley_rios_voladores',
    name: 'Circuito Telúrico Hídrico: Ríos Voladores & Acuífero Guaraní',
    color: '#10b981',
    width: 3.0,
    type: 'Flujo Telúrico Biorregional',
    purpose: 'Articula la siembra de agua de los Andes, la evaporación de la Amazonía y la recarga del Acuífero Guaraní y Río de la Plata.',
    path: ['site_san_agustin', 'bio_andes', 'bio_amazonas', 'site_iguazu', 'intra_aurora', 'intra_erks', 'bio_plata']
  },
  {
    id: 'ley_solar_apolo',
    name: 'Línea de San Miguel / Apolo (Eje Europa-Mediterráneo)',
    color: '#f59e0b',
    width: 2.5,
    type: 'Gran Línea Ley Solar',
    purpose: 'Alineación de santuarios solares y templos de sabiduría desde Irlanda, Gran Bretaña, Monte Saint-Michel hasta Delfos y Jerusalén.',
    path: ['bio_mediterraneo', 'bio_rift', 'bio_himalayas']
  },
  {
    id: 'ley_pacifico_anillo',
    name: 'Cinturón Oceánico de Cristal (Pacífico & Polinesia)',
    color: '#3b82f6',
    width: 2.5,
    type: 'Corriente Telúrica Marina',
    purpose: 'Regulación térmica y memoria hídrica que vincula la Polinesia con los litorales americanos y asiáticos.',
    path: ['bio_pacifico', 'bio_patagonia', 'intra_shasta', 'bio_himalayas']
  },
  {
    id: 'ley_agartha_eje',
    name: 'Arteria de Agartha (Eje Shamballa - Himalayas)',
    color: '#ffd700',
    width: 3.0,
    type: 'Canal Primordial Intraterreno',
    purpose: 'Emisión de la frecuencia de síntesis y memoria cósmica hacia los grandes nodos montañosos del mundo.',
    path: ['intra_shamballa', 'bio_himalayas', 'bio_taiga']
  }
];

// =============================================================================
// PUNTOS DE CONVERGENCIA PLANETARIA (Vortex Hubs de Máxima Densidad)
// =============================================================================
export const CONVERGENCE_POINTS = [
  {
    id: 'conv_uritorco',
    name: 'Vórtice Uritorco / ERKS',
    lat: -30.854,
    lon: -64.526,
    convergenceLevel: 5,
    description: 'Encrucijada energética entre la llanura pampeana, las sierras centrales y la cordillera andina. Portal de ERKS.'
  },
  {
    id: 'conv_titicaca',
    name: 'Vórtice Sagrado Titicaca',
    lat: -15.925,
    lon: -69.185,
    convergenceLevel: 6,
    description: 'Chakra Kundalini del planeta Tierra. Punto de convergencia de las líneas telúricas solares del Pacífico y del Amazonas.'
  },
  {
    id: 'conv_guarani',
    name: 'Vórtice Acuífero Guaraní / Aurora',
    lat: -31.389,
    lon: -57.960,
    convergenceLevel: 4,
    description: 'Nodo de transmutación y sanación hídrica. Confluencia del Río Uruguay, Paraná y napas subterráneas sagradas.'
  },
  {
    id: 'conv_shasta',
    name: 'Vórtice Monte Shasta',
    lat: 41.409,
    lon: -122.195,
    convergenceLevel: 5,
    description: 'Ancla electromagnética y dimensional del oeste norteamericano.'
  }
];
