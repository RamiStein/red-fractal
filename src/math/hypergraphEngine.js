/**
 * ⚛️ GEOMANTIC GIS & MULTILAYER HYPERGRAPH ENGINE
 * =============================================================================
 * Submódulo de Alta Fidelidad para el Modelado de la Red de Volcanes,
 * Ciudades Intraterrenas y Vórtices Sagrados de Gaia como un Hipergrafo de Energía Viva.
 * 
 * Arquitectura Multicapa:
 *   - Layer 1 (Litosférica / Física): Volcanes, Nodos Orográficos, Sitios Sagrados
 *   - Layer 2 (Intraterrena / Etérica): Ciudades Intraterrenas, Templos de Luz, Archivos Akáshicos
 * 
 * Aristas Inter/Intra-capa (Flujos Telúricos, Puentes de Ignición, Corrientes Crísticas)
 * Algoritmo de Simulación de Pulso Sincrónico con atenuación geodésica y amplificación resonante.
 * Compatible con GeoJSON, NetworkX y entornos Web/Node.
 * =============================================================================
 */

// ── Tipos y Constantes del Hipergrafo ──
const FLOW_TYPES = {
  TELLURIC: 'telluric', // Fuego litosférico / geotérmico / electromagnético
  ETHERIC: 'etheric',   // Flujo sutil / pránico / memoria del agua
  CRISTIC: 'cristic'    // Resonancia armónica plena / sincrónica / eje cósmico
};

const GEO_STATES = {
  ACTIVE: { code: 'active', multiplier: 2.5, label: 'Activo' },
  DORMANT: { code: 'dormant', multiplier: 1.8, label: 'Durmiente' },
  INACTIVE: { code: 'inactive', multiplier: 1.0, label: 'Inactivo' }
};

// ── Semilla de Datos Canónicos (Core Router & Focos Esenciales) ──
const HYPERGRAPH_SEED = {
  // CAPA 1: MODELO DE NODOS FÍSICOS Y VOLCÁNICOS (Litosfera)
  lithosphericNodes: [
    {
      id: 'volc_ojo_del_salado',
      name: 'Nevado Ojos del Salado (Ojo de Fuego de Sudamérica)',
      shortName: '🔥 Ojo de Fuego (Ojos del Salado)',
      category: 'volcano',
      layer: 'lithospheric',
      coordinates: { lat: -27.109, lon: -68.541, elevationMeters: 6893 },
      bioregion: 'Altiplano Andino / Puna de Atacama',
      geoState: 'dormant',
      telluricMultiplier: 3.0, // Core Router: máximo multiplicador continental
      color: '#ff0000',
      ray: 'Fuego Primordial Crístico — Rayo Rojo-Oro del Núcleo',
      baseFrequencyHz: 396,
      role: 'CORE_ROUTER',
      purpose: 'El volcán más alto de la Tierra (6893m). Actúa como el procesador central y distribuidor maestro del fuego telúrico sudamericano, enlazando la subducción de Nazca con las raíces profundas del continente.',
      connectedIds: [
        'volc_licancabur', 'volc_lanin', 'volc_villarrica', 'volc_chimborazo',
        'intra_erks', 'intra_isidris', 'intra_titicaca', 'intra_miz_tli_tlan',
        'site_jasuka_venda', 'intra_aurora'
      ]
    },
    {
      id: 'volc_licancabur',
      name: 'Volcán Licancabur',
      shortName: '🌋 Licancabur',
      category: 'volcano',
      layer: 'lithospheric',
      coordinates: { lat: -22.833, lon: -67.883, elevationMeters: 5916 },
      bioregion: 'Altiplano Andino / Cuenca de Atacama',
      geoState: 'dormant',
      telluricMultiplier: 1.8,
      color: '#ff4422',
      ray: 'Fuego Primordial Andino',
      baseFrequencyHz: 396,
      purpose: 'Centinela de fuego del desierto de Atacama; aguas termales de cumbre con vida extremófila que anclan el fuego creador en la aridez absoluta.',
      connectedIds: ['volc_ojo_del_salado', 'intra_titicaca']
    },
    {
      id: 'volc_villarrica',
      name: 'Volcán Villarrica (Ruka Pillán)',
      shortName: '🌋 Villarrica',
      category: 'volcano',
      layer: 'lithospheric',
      coordinates: { lat: -39.420, lon: -71.930, elevationMeters: 2847 },
      bioregion: 'Araucanía / Bosque Templado Lluvioso',
      geoState: 'active',
      telluricMultiplier: 2.5, // Activo: alta ignición continua
      color: '#ff3322',
      ray: 'Fuego Vivo del Pillán',
      baseFrequencyHz: 396,
      purpose: 'Casa del espíritu del fuego mapuche con lago de lava permanente; alimenta las termas telúricas de la cordillera patagónica.',
      connectedIds: ['volc_lanin', 'volc_osorno', 'volc_ojo_del_salado']
    },
    {
      id: 'volc_lanin',
      name: 'Volcán Lanín',
      shortName: '🌋 Lanín',
      category: 'volcano',
      layer: 'lithospheric',
      coordinates: { lat: -39.638, lon: -71.503, elevationMeters: 3776 },
      bioregion: 'Norpatagonia Andina',
      geoState: 'dormant',
      telluricMultiplier: 1.8,
      color: '#ff6655',
      ray: 'Fuego de la Araucanía Sagrada',
      baseFrequencyHz: 432,
      purpose: 'Pilar de fuego protegido por araucarias milenarias; conecta el magma andino con los grandes lagos patagónicos.',
      connectedIds: ['volc_villarrica', 'volc_ojo_del_salado', 'intra_erks']
    },
    {
      id: 'volc_chimborazo',
      name: 'Volcán Chimborazo',
      shortName: '🌋 Chimborazo',
      category: 'volcano',
      layer: 'lithospheric',
      coordinates: { lat: -1.469, lon: -78.816, elevationMeters: 6263 },
      bioregion: 'Andes Septentrionales Equinocciales',
      geoState: 'dormant',
      telluricMultiplier: 2.0,
      color: '#ff5544',
      ray: 'Fuego Cósmico Ecuatorial',
      baseFrequencyHz: 528,
      purpose: 'Punto más cercano al Sol desde la Tierra; cumbre máxima de la geometría del esferoide que canaliza radiación cósmica hacia el Ojo de Fuego.',
      connectedIds: ['volc_cotopaxi', 'volc_ojo_del_salado', 'intra_paititi']
    },
    {
      id: 'site_jasuka_venda',
      name: 'Cerro Jasuka Venda / Cerro Guasú (Yvyty Jasuka Venda)',
      shortName: '🌿 Jasuka Venda (Amambay)',
      category: 'sacred_site',
      layer: 'lithospheric',
      coordinates: { lat: -23.077, lon: -55.995, elevationMeters: 450 },
      bioregion: 'Ecosistema Bosque Atlántico / Cuenca del Plata / Acuífero Guaraní',
      geoState: 'active', // Activo espiritualmente
      telluricMultiplier: 2.2,
      color: '#10b981',
      ray: 'Rayo Esmeralda-Dorado de la Sustancia Creadora (Jasuka)',
      baseFrequencyHz: 528,
      role: 'CREATIVE_SEED_RECEIVER',
      custodians: 'Comunidad Paĩ Tavyterã, Guardianes del Tekoha Guasu',
      hierarchy: 'Tekoha Guasu — Altar Cósmico del Nacimiento de la Palabra Sagrada (Ñe\'ẽ Porã)',
      syncResonance: 'Armónico 5:28:13 — Matriz de Auto-Creación Universal',
      purpose: 'Cuna cósmica del pueblo Paĩ Tavyterã donde Ñande Ru Tenonde desplegó el universo mediante el Jasuka. Actúa como puente receptor de las frecuencias ígneas del Ojo de Fuego y distribuidor hacia los ríos voladores de la Cuenca del Plata.',
      connectedIds: ['intra_aurora', 'intra_erks', 'volc_ojo_del_salado', 'site_iguazu']
    }
  ],

  // CAPA 2: MODELO DE NODOS INTRATERRENOS (Etérica)
  ethericNodes: [
    {
      id: 'intra_erks',
      name: 'ERKS (Encuentro de Remanentes Kósmicos Siderales)',
      shortName: '🏛️ ERKS (Capilla del Monte)',
      category: 'intraterrena',
      layer: 'etheric',
      surfaceAnchor: {
        location: 'Cerro Uritorco / Los Terrones / Sierras de Córdoba, Argentina',
        lat: -30.854, lon: -64.526, elevationMeters: 1950
      },
      color: '#00bfff',
      ray: 'Rayo Azul Cósmico & Espejos de Luz',
      baseFrequencyHz: 777,
      telluricMultiplier: 2.4,
      role: 'TRANSMUTATION_CORE',
      purpose: 'Vórtice primordial de transmutación molecular, despertar estelar y calibración de los espejos de luz cósmicos.',
      custodians: 'Hermandad Blanca de los Espejos, Maestro Saruma',
      hierarchy: 'Consejo de los Espejos Cósmicos de la Red Agartha',
      syncResonance: 'Armónico 7:7:7 — Resonancia Espejo-Cristal',
      connectedIds: ['volc_ojo_del_salado', 'intra_aurora', 'intra_isidris', 'intra_titicaca', 'intra_miz_tli_tlan', 'site_jasuka_venda']
    },
    {
      id: 'intra_aurora',
      name: 'Centro de Luz Aurora',
      shortName: '🏛️ Aurora (Salto, Uruguay)',
      category: 'intraterrena',
      layer: 'etheric',
      surfaceAnchor: {
        location: 'Estancia La Aurora / Acuífero Guaraní / Salto, Uruguay',
        lat: -31.389, lon: -57.960, elevationMeters: 48
      },
      color: '#10b981',
      ray: 'Rayo Verde & Dorado de Sanación Planetaria',
      baseFrequencyHz: 528,
      telluricMultiplier: 2.3,
      role: 'HEALING_MATRIX',
      purpose: 'Centro de sanación celular y espiritual de Gaia; modulación energética de las inmensas reservas del Acuífero Guaraní.',
      custodians: 'Hermandad de los Sanadores del Acuífero, Maestro Acuario',
      hierarchy: 'Consejo de Regeneración Biológica y Memoria Hídrica',
      syncResonance: 'Armónico 5:28 — Frecuencia de Regeneración del ADN',
      connectedIds: ['volc_ojo_del_salado', 'intra_erks', 'site_jasuka_venda', 'intra_paititi']
    },
    {
      id: 'intra_miz_tli_tlan',
      name: 'Miz Tli Tlan (Archivo de la Memoria Cósmica)',
      shortName: '🏛️ Miz Tli Tlan (Cusco/Paititi)',
      category: 'intraterrena',
      layer: 'etheric',
      surfaceAnchor: {
        location: 'Valle Sagrado de los Incas / Cusco hacia Paititi, Perú',
        lat: -13.163, lon: -72.545, elevationMeters: 3399
      },
      color: '#ffd32a',
      ray: 'Rayo Dorado-Violeta del Archivo Akáshico Planetario',
      baseFrequencyHz: 963,
      telluricMultiplier: 2.6,
      role: 'AKASHIC_REPOSITORY',
      purpose: 'El gran archivo etérico del conocimiento cósmico; custodia del Disco Solar de Mú y de los códigos evolutivos de la humanidad.',
      custodians: 'Maestros Incas Ascendidos, Hermandad de los Siete Rayos',
      hierarchy: 'Consejo Solar del Cusco — Enlace Directo con Shamballa Central',
      syncResonance: 'Armónico 13:20 — Frecuencia del Tiempo Sincrónico Maya-Inca',
      connectedIds: ['volc_ojo_del_salado', 'intra_titicaca', 'intra_erks', 'intra_paititi', 'intra_shamballa']
    },
    {
      id: 'intra_titicaca',
      name: 'Templo Solar del Lago Titicaca',
      shortName: '🏛️ Titicaca (Lago Sagrado)',
      category: 'intraterrena',
      layer: 'etheric',
      surfaceAnchor: {
        location: 'Isla del Sol / Isla de la Luna / Lago Titicaca, Bolivia/Perú',
        lat: -15.925, lon: -69.335, elevationMeters: 3812
      },
      color: '#ffd32a',
      ray: 'Rayo Dorado del Femenino Primordial',
      baseFrequencyHz: 852,
      telluricMultiplier: 2.4,
      role: 'KUNDALINI_ANCHOR',
      purpose: 'Anclaje del nuevo despertar de la serpiente Kundalini de la Tierra en los Andes; custodia de las aguas solares de altura.',
      custodians: 'Sacerdocio del Disco Solar, Señores de la Luz del Titicaca',
      hierarchy: 'Consejo Lemuriano-Andino',
      syncResonance: 'Armónico 8:52 — Activación del Tercer Ojo Planetario',
      connectedIds: ['volc_ojo_del_salado', 'intra_miz_tli_tlan', 'intra_erks', 'volc_licancabur']
    },
    {
      id: 'intra_isidris',
      name: 'Ciudad de Isidris',
      shortName: '🏛️ Isidris (Mendoza)',
      category: 'intraterrena',
      layer: 'etheric',
      surfaceAnchor: {
        location: 'Quebrada de San Isidro / Precordillera de Mendoza, Argentina',
        lat: -32.890, lon: -68.950, elevationMeters: 1400
      },
      color: '#ffffff',
      ray: 'Rayo Blanco de la Ascensión & Fuego Cristalino',
      baseFrequencyHz: 888,
      telluricMultiplier: 2.1,
      role: 'CRYSTAL_GATEWAY',
      purpose: 'Ciudad etérica de cristal andino; puente de ignición entre las nieves del Aconcagua y la llama azul de ERKS.',
      custodians: 'Hermandad de los Andes Centrales',
      hierarchy: 'Consejo de Ascensión de los Centinelas Blancos',
      syncResonance: 'Armónico 8:8:8 — Cristalización de la Conciencia',
      connectedIds: ['volc_ojo_del_salado', 'intra_erks']
    }
  ]
};

// ── Clase del Hipergrafo de Energía Viva ──
class LivingEarthHypergraph {
  constructor() {
    this.nodes = new Map();
    this.edges = [];
    this.adjacency = new Map();
    this.bootstrap();
  }

  // Carga inicial y construcción de topología
  bootstrap() {
    // 1. Cargar Nodos Físicos
    for (const node of HYPERGRAPH_SEED.lithosphericNodes) {
      this.addNode({
        ...node,
        lat: node.coordinates.lat,
        lon: node.coordinates.lon
      });
    }

    // 2. Cargar Nodos Etéricos
    for (const node of HYPERGRAPH_SEED.ethericNodes) {
      this.addNode({
        ...node,
        lat: node.surfaceAnchor.lat,
        lon: node.surfaceAnchor.lon
      });
    }

    // 3. Crear Aristas de Alta Fidelidad
    this.buildEdgeTopology();
  }

  addNode(nodeData) {
    this.nodes.set(nodeData.id, nodeData);
    if (!this.adjacency.has(nodeData.id)) {
      this.adjacency.set(nodeData.id, []);
    }
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  getAllNodes() {
    return Array.from(this.nodes.values());
  }

  // Distancia Geodésica Haversine (km)
  calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio medio de la Tierra
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    return Math.round(2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  // Añadir arista dirigida o bidireccional con capacidad de carga
  addEdge(sourceId, targetId, flowType, baseIntensity = 0.8, bidirectional = true) {
    const src = this.nodes.get(sourceId);
    const tgt = this.nodes.get(targetId);
    if (!src || !tgt) return;

    const distKm = this.calculateDistanceKm(src.lat, src.lon, tgt.lat, tgt.lon);
    // Capacidad de carga: inversamente proporcional a la distancia geodésica base
    const capacity = Number((baseIntensity * (1 / Math.max(1, distKm / 4000))).toFixed(4));

    const edge = {
      id: `edge_${sourceId}_${targetId}`,
      source: sourceId,
      target: targetId,
      flowType,
      intensity: baseIntensity,
      distanceKm: distKm,
      capacity,
      direction: bidirectional ? 'bidirectional' : 'unidirectional'
    };

    this.edges.push(edge);
    this.adjacency.get(sourceId).push(edge);

    if (bidirectional) {
      const returnEdge = {
        id: `edge_${targetId}_${sourceId}`,
        source: targetId,
        target: sourceId,
        flowType,
        intensity: baseIntensity,
        distanceKm: distKm,
        capacity,
        direction: 'bidirectional'
      };
      this.edges.push(returnEdge);
      this.adjacency.get(targetId).push(returnEdge);
    }
  }

  buildEdgeTopology() {
    this.edges = [];
    for (const key of this.adjacency.keys()) {
      this.adjacency.set(key, []);
    }

    // A. VOLCÁN -> VOLCÁN (Vectores Litosféricos de Fuego Continuo)
    this.addEdge('volc_ojo_del_salado', 'volc_licancabur', FLOW_TYPES.TELLURIC, 0.95);
    this.addEdge('volc_ojo_del_salado', 'volc_lanin', FLOW_TYPES.TELLURIC, 0.88);
    this.addEdge('volc_ojo_del_salado', 'volc_villarrica', FLOW_TYPES.TELLURIC, 0.86);
    this.addEdge('volc_lanin', 'volc_villarrica', FLOW_TYPES.TELLURIC, 0.92);
    this.addEdge('volc_ojo_del_salado', 'volc_chimborazo', FLOW_TYPES.TELLURIC, 0.82);

    // B. VOLCÁN -> CIUDAD INTRATERRENA (Puentes de Ignición Telúrico-Etéricos)
    this.addEdge('volc_ojo_del_salado', 'intra_erks', FLOW_TYPES.CRISTIC, 0.98);
    this.addEdge('volc_ojo_del_salado', 'intra_isidris', FLOW_TYPES.TELLURIC, 0.90);
    this.addEdge('volc_ojo_del_salado', 'intra_titicaca', FLOW_TYPES.TELLURIC, 0.85);
    this.addEdge('volc_ojo_del_salado', 'intra_aurora', FLOW_TYPES.ETHERIC, 0.80);
    this.addEdge('volc_ojo_del_salado', 'intra_miz_tli_tlan', FLOW_TYPES.CRISTIC, 0.84);
    this.addEdge('volc_ojo_del_salado', 'site_jasuka_venda', FLOW_TYPES.ETHERIC, 0.78);
    this.addEdge('volc_licancabur', 'intra_titicaca', FLOW_TYPES.TELLURIC, 0.91);
    this.addEdge('volc_lanin', 'intra_erks', FLOW_TYPES.TELLURIC, 0.72);
    this.addEdge('volc_chimborazo', 'intra_miz_tli_tlan', FLOW_TYPES.TELLURIC, 0.75);

    // C. CIUDAD INTRATERRENA -> CIUDAD INTRATERRENA (Red de Comunicación Sutil)
    this.addEdge('intra_erks', 'intra_aurora', FLOW_TYPES.ETHERIC, 0.96);
    this.addEdge('intra_erks', 'intra_isidris', FLOW_TYPES.ETHERIC, 0.92);
    this.addEdge('intra_erks', 'intra_titicaca', FLOW_TYPES.CRISTIC, 0.88);
    this.addEdge('intra_erks', 'intra_miz_tli_tlan', FLOW_TYPES.CRISTIC, 0.85);
    this.addEdge('intra_titicaca', 'intra_miz_tli_tlan', FLOW_TYPES.CRISTIC, 0.94);

    // D. JASUKA VENDA: Puente Receptor del Fuego hacia la Cuenca del Plata
    this.addEdge('site_jasuka_venda', 'intra_aurora', FLOW_TYPES.ETHERIC, 0.90);
    this.addEdge('site_jasuka_venda', 'intra_erks', FLOW_TYPES.CRISTIC, 0.85);
  }

  // Multiplicador telúrico efectivo de un nodo
  getNodeMultiplier(node) {
    if (!node) return 1.0;
    if (typeof node.telluricMultiplier === 'number') return node.telluricMultiplier;
    if (node.category === 'volcano') {
      const state = GEO_STATES[String(node.geoState || '').toUpperCase()];
      return state ? state.multiplier : 1.5;
    }
    if (node.category === 'intraterrena') return 2.2;
    return 1.0;
  }

  /**
   * 🌊 ALGORITMO DE SIMULACIÓN DE PULSO SINCRÓNICO
   * ===========================================================================
   * Modela la propagación de un pulso energético iniciado en un nodo fuente.
   * La energía decrece conforme a la atenuación geométrica planetaria:
   *     Att(d) = 1 / (1 + d / R_decay)
   * pero se re-amplifica al transitar por volcanes activos, centros de custodia
   * o vórtices de alta vibración:
   *     E_next = E_curr * intensity_edge * (Multiplier_target / 2.0) * Att(d)
   * 
   * Evita ciclos acíclicos mediante poda de caminos visitados (DAG de propagación).
   * 
   * @param {string} originId - Identificador del nodo raíz (Ej: 'volc_ojo_del_salado')
   * @param {number} initialEnergy - Energía inicial de inyección (por defecto 1.0)
   * @param {number} decayRadiusKm - Radio de atenuación geométrica (por defecto 3500 km)
   * @returns {Object} Resultado del recorrido: frentes de onda, trazas y métricas.
   */
  simulateSyncPulse(originId = 'volc_ojo_del_salado', initialEnergy = 1.0, decayRadiusKm = 3500) {
    const originNode = this.nodes.get(originId);
    if (!originNode) {
      throw new Error(`Nodo de origen '${originId}' no encontrado en el Hipergrafo.`);
    }

    const visited = new Map();
    const wavefronts = [];
    const queue = [{
      nodeId: originId,
      energy: initialEnergy,
      depth: 0,
      path: [originId],
      flowType: FLOW_TYPES.CRISTIC
    }];

    visited.set(originId, {
      nodeId: originId,
      energy: initialEnergy,
      depth: 0,
      path: [originId],
      flowType: FLOW_TYPES.CRISTIC,
      multiplier: this.getNodeMultiplier(originNode),
      layer: originNode.layer,
      distanceFromPrevKm: 0,
      node: originNode
    });

    let maxDepth = 0;

    while (queue.length > 0) {
      // Priorizar frentes por energía descendente (Greedy Wavefront)
      queue.sort((a, b) => b.energy - a.energy);
      const current = queue.shift();

      if (current.depth >= 6) continue;
      if (current.energy < 0.01) continue; // Umbral de disipación cuántica

      const outgoingEdges = this.adjacency.get(current.nodeId) || [];

      for (const edge of outgoingEdges) {
        // Poda de ciclos: no retroceder a ningún nodo presente en el camino actual
        if (current.path.includes(edge.target)) continue;

        const targetNode = this.nodes.get(edge.target);
        if (!targetNode) continue;

        const mult = this.getNodeMultiplier(targetNode);
        const geoAttenuation = 1 / (1 + edge.distanceKm / decayRadiusKm);
        
        // Ecuación de propagación calibrada: el multiplicador actúa como ganancia resonante ponderada
        const gain = 0.5 + (mult * 0.35); // Ganancia calibrada entre 0.85 y 1.55
        const propagatedEnergy = Number(Math.min(1.5, current.energy * edge.intensity * gain * geoAttenuation).toFixed(4));

        const existingVisit = visited.get(edge.target);
        if (!existingVisit || existingVisit.energy < propagatedEnergy) {
          const nextDepth = current.depth + 1;
          const nextPath = [...current.path, edge.target];
          if (nextDepth > maxDepth) maxDepth = nextDepth;

          const record = {
            nodeId: edge.target,
            energy: propagatedEnergy,
            depth: nextDepth,
            path: nextPath,
            flowType: edge.flowType,
            multiplier: mult,
            layer: targetNode.layer,
            distanceFromPrevKm: edge.distanceKm,
            node: targetNode
          };

          visited.set(edge.target, record);
          queue.push(record);
        }
      }
    }

    for (let d = 0; d <= maxDepth; d++) {
      const wave = Array.from(visited.values()).filter(v => v.depth === d);
      if (wave.length > 0) {
        wavefronts.push(wave.sort((a, b) => b.energy - a.energy));
      }
    }

    const jasukaReceipt = visited.get('site_jasuka_venda');

    return {
      originId,
      originNode,
      initialEnergy,
      totalNodesReached: visited.size,
      maxWavefrontDepth: maxDepth,
      wavefronts,
      nodesMap: Object.fromEntries(visited),
      jasukaReceipt,
      metrics: {
        jasukaEnergyPercent: jasukaReceipt ? (jasukaReceipt.energy * 100).toFixed(1) + '%' : 'N/A',
        jasukaPath: jasukaReceipt ? jasukaReceipt.path.join(' ➔ ') : 'Inaccesible'
      }
    };
  }

  // Exportar a formato NetworkX JSON (GraphLink format)
  toNetworkXJSON() {
    return {
      graph: {
        id: 'gaia_living_hypergraph',
        name: 'Hipergrafo de Energía Viva de Sudamérica',
        coordinateSystem: 'EPSG:4326',
        layers: ['lithospheric', 'etheric']
      },
      directed: true,
      multigraph: false,
      nodes: Array.from(this.nodes.values()).map(n => ({
        id: n.id,
        name: n.name,
        layer: n.layer,
        category: n.category,
        lat: n.lat,
        lon: n.lon,
        elevation: n.coordinates ? n.coordinates.elevationMeters : (n.surfaceAnchor ? n.surfaceAnchor.elevationMeters : 0),
        geoState: n.geoState || 'resonant',
        multiplier: this.getNodeMultiplier(n),
        frequencyHz: n.baseFrequencyHz,
        ray: n.ray,
        color: n.color
      })),
      links: this.edges.map(e => ({
        source: e.source,
        target: e.target,
        flowType: e.flowType,
        weight: e.intensity,
        capacity: e.capacity,
        distanceKm: e.distanceKm,
        direction: e.direction
      }))
    };
  }
}

// ── Exportación Universal ES Module & CommonJS/Browser ──
export {
  LivingEarthHypergraph,
  HYPERGRAPH_SEED,
  FLOW_TYPES,
  GEO_STATES
};

export default LivingEarthHypergraph;

if (typeof window !== 'undefined') {
  window.LivingEarthHypergraph = LivingEarthHypergraph;
  window.HYPERGRAPH_SEED = HYPERGRAPH_SEED;
}
