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
  },
  {
    id: 'intra_polo_sur',
    name: 'Portal Diamantino del Polo Sur (Rainbow City / Domo Austral)',
    shortName: '🏛️ Portal Polo Sur (-90°)',
    location: 'Polo Sur Geográfico Exacto (-90.000°, 0.000°), Meseta Antártica',
    region: 'Antártida',
    lat: -90.000,
    lon: 0.000,
    ray: 'Rayo Platino-Diamantino del Ancla Terrestre & Luz Polar',
    color: '#38bdf8',
    vibrationalFreq: 963,
    purpose: 'Ancla meridional del eje axial de rotación de la Tierra. Vórtice cósmico de conexión con las bibliotecas de luz subglaciales de la Antártida y calibrador del campo magnético toroidal planetario.',
    associatedBioregion: 'Biorregión Antártida & Polo Sur Geográfico Exacto',
    teluricFlows: ['site_polo_sur_exacto', 'site_lago_vostok', 'site_monte_erebus', 'bio_patagonia', 'site_jasuka_venda', 'site_aoraki_nz', 'site_table_mountain'],
    description: 'El ancla meridional suprema de la red intraterrena: punto focal donde converge la energía de todos los meridianos terrestres y se proyecta el toroide electromagnético del planeta.'
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
  },
  {
    id: 'site_polo_sur_exacto',
    name: 'Polo Sur Geográfico Exacto (Vórtice Polar del Hielo Sagrado)',
    shortName: '❄️ Polo Sur Exacto (-90°)',
    category: 'sacred_site',
    location: 'Latitud -90.000°, Longitud 0.000°, Antártida',
    region: 'Antártida (Vórtice Polar)',
    lat: -90.000,
    lon: 0.000,
    ray: 'Rayo Cristalino Diamantino / Foco Polar Primordial',
    color: '#00e5ff',
    vibrationalFreq: 1080,
    ecosystem: 'Inlandsis Antártico / Desierto polar hiperárido de hielo / Altitud 2.835m',
    riversBorn: 'Corrientes abisales termohalinas de fondo oceánico hacia todos los océanos',
    purpose: 'El punto geográfico exacto donde convergen todos los meridianos del globo terráqueo. Centro inmóvil del vórtice polar que almacena la memoria climática y cósmica de millones de años en testigos de hielo no perturbados. Ancla sagrada del Eje de la Tierra.',
    teluricFlows: ['intra_polo_sur', 'site_lago_vostok', 'site_monte_erebus', 'bio_patagonia', 'site_jasuka_venda', 'site_aoraki_nz', 'site_table_mountain', 'site_uluru'],
    description: 'El eje meridional exacto de la Tierra: el punto matemático y geodésico cero de la latitud sur, guardián del silencio criogénico del planeta.'
  },
  {
    id: 'site_jasuka_venda',
    name: 'Cerro Jasuka Venda / Cerro Guasú (Yvyty Jasuka Venda)',
    shortName: '🌿 Jasuka Venda (Amambay)',
    category: 'sacred_site',
    location: 'Cordillera del Amambay / Yby Ya\'u - Capitán Bado, Paraguay',
    region: 'Sudamérica (Cuenca del Plata / Guaraní)',
    lat: -23.077,
    lon: -55.995,
    ray: 'Rayo Esmeralda-Dorado de la Palabra Sagrada (Ñe\'ẽ Porã) & Sustancia Creadora (Jasuka)',
    color: '#10b981',
    vibrationalFreq: 528,
    ecosystem: 'Bosque Atlántico del Alto Paraná / Cerros de arenisca y abrigos de Itaguy Guasu',
    riversBorn: 'Nacientes de los ríos Apa, Aquidabán y afluentes del Río Paraguay hacia el Acuífero Guaraní',
    purpose: 'El Ombligo de la Tierra y Cuna Cósmica de la Creación según el pueblo Paĩ Tavyterã. Aquí Ñande Ru Tenonde se auto-creó y manifestó el universo mediante el Jasuka (energía sutil primordial) y la palabra sagrada. Abrigo de arte rupestre milenario y corona espiritual septentrional del Acuífero Guaraní conectada al Polo Sur.',
    teluricFlows: ['site_iguazu', 'intra_aurora', 'intra_erks', 'bio_plata', 'site_polo_sur_exacto'],
    description: 'Santuario primordial de origen de la nación Guaraní; axis mundi que une el cielo, la selva y las aguas subterráneas del continente.'
  },
  {
    id: 'site_lago_vostok',
    name: 'Lago Vostok Subglacial (Cápsula de Agua Primigenia)',
    shortName: '💧 Lago Vostok (-77.4°)',
    category: 'sacred_site',
    location: 'Meseta Antártica Oriental / Base Vostok (4.000m bajo el hielo)',
    region: 'Antártida (Meseta Oriental)',
    lat: -77.400,
    lon: 106.840,
    ray: 'Rayo Platino-Diamantino del Agua Cósmica Subglacial',
    color: '#38bdf8',
    vibrationalFreq: 963,
    ecosystem: 'Lago de agua líquida pura aislado por más de 15 a 20 millones de años bajo extrema presión',
    riversBorn: 'Flujos hidrotérmicos subglaciales profundos hacia el Océano Austral',
    purpose: 'La mayor reserva de agua líquida fósil del planeta, sellada antes del inicio de la historia humana. Archivo molecular de la pureza primigenia de Gaia y antena resonadora del eje polar.',
    teluricFlows: ['site_polo_sur_exacto', 'intra_polo_sur', 'site_monte_erebus', 'site_table_mountain'],
    description: 'El santuario acuífero subglacial más antiguo de la Tierra, espejo subterráneo de la sabiduría de los orígenes.'
  },
  {
    id: 'site_monte_erebus',
    name: 'Monte Erebus (Volcán Sagrado de Fuego y Hielo)',
    shortName: '🌋 Monte Erebus (-77.5°)',
    category: 'sacred_site',
    location: 'Isla de Ross, Mar de Ross, Antártida',
    region: 'Antártida (Mar de Ross)',
    lat: -77.530,
    lon: 167.170,
    ray: 'Rayo Fuego-Cristal / Alquimia de Fuego y Hielo',
    color: '#f97316',
    vibrationalFreq: 741,
    ecosystem: 'Estratovolcán activo más austral de la Tierra con lago de lava permanente y torres de hielo',
    riversBorn: 'Glaciares de Ross y corrientes marinas del Océano Austral',
    purpose: 'El faro ígneo del casquete antártico: el matrimonio sagrado del fuego magmático interior con el manto criogénico polar. Calibra la energía térmica del núcleo terrestre con la atmósfera polar.',
    teluricFlows: ['site_polo_sur_exacto', 'site_lago_vostok', 'site_aoraki_nz', 'bio_patagonia'],
    description: 'Antorcha volcánica perpetua en el hielo austral; portal alquímico que conecta el núcleo de la Tierra con el cosmos.'
  },
  {
    id: 'site_aoraki_nz',
    name: 'Aoraki / Monte Cook (Altar de las Nieves de Aotearoa)',
    shortName: '🏔️ Aoraki / Monte Cook',
    category: 'sacred_site',
    location: 'Alpes del Sur / Isla Sur (Te Waipounamu), Nueva Zelanda',
    region: 'Oceanía (Aotearoa)',
    lat: -43.595,
    lon: 170.141,
    ray: 'Rayo Blanco-Turquesa de los Hielos del Pacífico',
    color: '#00e5ff',
    vibrationalFreq: 528,
    ecosystem: 'Glaciares alpinos (Tasman) y selva templada lluviosa austral',
    riversBorn: 'Río Tasman y afluentes glaciares hacia el Mar de Tasmania y Océano Austral',
    purpose: 'El ancestro sagrado más reverenciado de la tradición maorí en la Isla Sur. Pilar de conexión entre las nieves alpinas de Oceanía y el influjo del vórtice polar antártico que asciende por el Mar de Ross.',
    teluricFlows: ['site_polo_sur_exacto', 'site_monte_erebus', 'site_uluru', 'bio_pacifico'],
    description: 'Cumbre sagrada de Aotearoa que canaliza las corrientes polares del Pacífico Sur hacia la Polinesia.'
  },
  {
    id: 'site_uluru',
    name: 'Uluru & Kata Tjuta (Plexo Solar Planetario / Altar Rojo)',
    shortName: '🔴 Uluru (Australia)',
    category: 'sacred_site',
    location: 'Parque Nacional Uluru-Kata Tjuta, Territorio del Norte, Australia',
    region: 'Oceanía (Desierto Australiano)',
    lat: -25.344,
    lon: 131.036,
    ray: 'Rayo Rojo-Dorado del Tiempo del Sueño (Tjukurpa)',
    color: '#ef4444',
    vibrationalFreq: 528,
    ecosystem: 'Monolito gigante de arcosa en el corazón del desierto rojo australiano',
    riversBorn: 'Pozos sagrados de agua perenne (Mutitjulu) y cuencas subterráneas',
    purpose: 'El corazón telúrico y plexo solar de la red planetaria. Ancla viva del Tiempo del Sueño (Tjukurpa) y receptor del rayo cósmico austral transmitido desde el Polo Sur a través de Aotearoa y el Océano Índico.',
    teluricFlows: ['site_aoraki_nz', 'site_polo_sur_exacto', 'site_table_mountain', 'bio_pacifico'],
    description: 'El ombligo rojo del hemisferio sur: receptor solar y magnético que armoniza los cantos de la Tierra.'
  },
  {
    id: 'site_table_mountain',
    name: 'Table Mountain / Montaña de la Mesa (Vórtice del Cabo de Buena Esperanza)',
    shortName: '⛰️ Table Mountain (Cabo)',
    category: 'sacred_site',
    location: 'Península del Cabo, Ciudad del Cabo, Sudáfrica',
    region: 'África Austral',
    lat: -33.957,
    lon: 18.423,
    ray: 'Rayo Dorado de la Síntesis Oceánica Atlántico-Índico',
    color: '#f59e0b',
    vibrationalFreq: 432,
    ecosystem: 'Meseta arenisca milenaria de 330 millones de años con flora endémica del Fynbos',
    riversBorn: 'Arroyos de la Península del Cabo hacia las bahías atlántica e índica',
    purpose: 'El vórtice receptor meridional del continente africano. Punto donde convergen y se sintetizan las corrientes del Atlántico Sur y del Océano Índico, canalizando la energía telúrica del Polo Sur hacia el Gran Valle del Rift.',
    teluricFlows: ['site_polo_sur_exacto', 'site_lago_vostok', 'bio_rift', 'site_uluru'],
    description: 'La meseta guardiana del extremo sur de África, portal donde se abrazan los dos grandes océanos australes.'
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
    purpose: 'Conduce el flujo principal de energía vital y espiritual planetaria en la Nueva Era, enraizada en el Polo Sur Exacto y ascendiendo por la Patagonia hasta Alaska.',
    path: ['site_polo_sur_exacto', 'bio_patagonia', 'intra_isidris', 'intra_erks', 'site_uyuni', 'intra_titicaca', 'intra_paititi', 'intra_tayos', 'site_san_agustin', 'site_sierra_nevada', 'bio_mesoamerica', 'intra_shasta']
  },
  {
    id: 'ley_eje_axial_polar',
    name: 'Eje Axial Polar Austral (Polo Sur Exacto ↔ Kundalini Andina)',
    shortName: '⚡ Eje Axial Polar Austral (-90°)',
    color: '#38bdf8',
    width: 4.0,
    type: 'Eje Axial de Anclaje Planetario',
    purpose: 'Conexión sagrada directa entre el vórtice matemático del Polo Sur Exacto (-90°) y el despertar del Eje Kundalini Andino en Patagonia, Isidris y ERKS.',
    path: ['site_polo_sur_exacto', 'intra_polo_sur', 'bio_patagonia', 'intra_isidris', 'intra_erks']
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
  },
  {
    id: 'ley_corredor_jasuka_guarani',
    name: 'Corredor Sagrado Jasuka Venda & Acuífero Guaraní',
    shortName: '🌿 Corredor Jasuka Venda ↔ Polo Sur',
    color: '#10b981',
    width: 3.8,
    type: 'Corredor Hidro-Telúrico Ancestral',
    purpose: 'Articula el origen cósmico del pueblo Guaraní en el Cerro Jasuka Venda (Amambay, Paraguay) con las aguas de Iguazú, Aurora, ERKS, la Patagonia Austral y el ancla criogénica del Polo Sur Exacto.',
    path: ['site_polo_sur_exacto', 'bio_patagonia', 'intra_erks', 'intra_aurora', 'site_iguazu', 'site_jasuka_venda']
  },
  {
    id: 'ley_eje_transoceanico_pacifico',
    name: 'Eje Telúrico Austral Pacífico (Polo Sur ↔ Erebus ↔ Aoraki ↔ Uluru)',
    shortName: '🌊 Eje Polar Austral Pacífico',
    color: '#00e5ff',
    width: 3.5,
    type: 'Gran Línea Ley Transoceánica',
    purpose: 'Línea ley transoceánica meridional que proyecta la pulsación polar antártica a través del Volcán Erebus, los glaciares de Aoraki en Aotearoa (Nueva Zelanda) y el monolito sagrado de Uluru en Australia.',
    path: ['site_polo_sur_exacto', 'site_monte_erebus', 'site_aoraki_nz', 'site_uluru', 'bio_pacifico']
  },
  {
    id: 'ley_eje_meridiano_atlantico_africa',
    name: 'Eje Meridiano Polar-Africano (Polo Sur ↔ Vostok ↔ Table Mountain ↔ Rift)',
    shortName: '⚡ Eje Polar-Africano Meridional',
    color: '#f59e0b',
    width: 3.2,
    type: 'Eje Meridiano Intercontinental',
    purpose: 'Conecta el vórtice del Polo Sur y las aguas primordiales del Lago Vostok con la Montaña de la Mesa en Sudáfrica y la columna vertebral del Valle del Rift.',
    path: ['site_polo_sur_exacto', 'site_lago_vostok', 'site_table_mountain', 'bio_rift']
  },
  {
    id: 'ley_anillo_antartico_primordial',
    name: 'Anillo Telúrico Criogénico de la Antártida',
    shortName: '❄️ Anillo Criogénico Antártico',
    color: '#38bdf8',
    width: 4.0,
    type: 'Anillo Peripolar de Estabilidad Toroidal',
    purpose: 'Circuito cerrado polar que estabiliza el vórtice toroidal antártico integrando el Polo Sur Geográfico, el Lago Vostok, el Monte Erebus y el salto hacia la Patagonia Austral.',
    path: ['site_polo_sur_exacto', 'intra_polo_sur', 'site_lago_vostok', 'site_monte_erebus', 'bio_patagonia']
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
