/**
 * Módulo de Geometría Sagrada y Sólidos Platónicos
 * 
 * Calcula con precisión matemática las coordenadas (x, y, z), aristas y propiedades
 * de los 5 sólidos platónicos y el Merkaba usando la proporción áurea (phi).
 */

export const PHI = (1 + Math.sqrt(5)) / 2; // ~1.618033988749895
export const INV_PHI = 1 / PHI;            // ~0.618033988749895

/**
 * Normaliza un vector 3D al radio especificado.
 */
export function normalize(v, radius = 1.0) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  if (len === 0) return [0, 0, 0];
  const factor = radius / len;
  return [v[0] * factor, v[1] * factor, v[2] * factor];
}

/**
 * Calcula la distancia euclidiana entre dos puntos 3D.
 */
export function distance(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  const dz = p1[2] - p2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Genera aristas basadas en los k vecinos más cercanos para cada vértice.
 */
export function buildEdgesFromNeighbors(vertices, neighborCount, tolerance = 0.05) {
  const edges = [];
  const edgeSet = new Set();

  for (let i = 0; i < vertices.length; i++) {
    // Calcular distancias a todos los demás vértices
    const dists = [];
    for (let j = 0; j < vertices.length; j++) {
      if (i !== j) {
        dists.push({ index: j, dist: distance(vertices[i], vertices[j]) });
      }
    }
    dists.sort((a, b) => a.dist - b.dist);

    // Encontrar la distancia mínima del vecino
    const minDist = dists[0].dist;
    
    // Conectar con todos los vértices cuya distancia sea aproximadamente minDist
    for (const d of dists) {
      if (Math.abs(d.dist - minDist) <= tolerance * minDist) {
        const edgeKey = i < d.index ? `${i}-${d.index}` : `${d.index}-${i}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push([i, d.index]);
        }
      }
    }
  }

  return edges;
}

/**
 * Tetraedro (Fuego / Impulso y Voluntad)
 * 4 Vértices, 6 Aristas, 4 Caras
 */
export function getTetrahedron(radius = 2.0) {
  const raw = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1]
  ];
  const vertices = raw.map(v => normalize(v, radius));
  const edges = buildEdgesFromNeighbors(vertices, 3);
  return {
    name: 'Tetraedro',
    archetype: 'Fuego',
    description: 'Transformación, Voluntad, Iniciativa, Acción primigenia',
    vertices,
    edges,
    facesCount: 4,
    color: '#ff4d4d'
  };
}

/**
 * Octaedro (Aire / Mente y Comunicación)
 * 6 Vértices, 12 Aristas, 8 Caras
 */
export function getOctahedron(radius = 2.0) {
  const raw = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];
  const vertices = raw.map(v => normalize(v, radius));
  const edges = buildEdgesFromNeighbors(vertices, 4);
  return {
    name: 'Octaedro',
    archetype: 'Aire',
    description: 'Mente, Claridad, Comunicación, Puente e Integración',
    vertices,
    edges,
    facesCount: 8,
    color: '#ffcc00'
  };
}

/**
 * Cubo / Hexaedro (Tierra / Estructura y Manifestación)
 * 8 Vértices, 12 Aristas, 6 Caras
 */
export function getCube(radius = 2.0) {
  const raw = [];
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        raw.push([x, y, z]);
      }
    }
  }
  const vertices = raw.map(v => normalize(v, radius));
  const edges = buildEdgesFromNeighbors(vertices, 3);
  return {
    name: 'Cubo',
    archetype: 'Tierra',
    description: 'Estructura, Estabilidad, Regeneración, Sostén material',
    vertices,
    edges,
    facesCount: 6,
    color: '#2ecc71'
  };
}

/**
 * Icosaedro (Agua / Relaciones y Fluidez)
 * 12 Vértices, 30 Aristas, 20 Caras
 * Coordenadas áureas cíclicas (0, ±1, ±phi)
 */
export function getIcosahedron(radius = 2.0) {
  const raw = [];
  // (0, ±1, ±phi)
  for (const y of [-1, 1]) {
    for (const z of [-PHI, PHI]) {
      raw.push([0, y, z]);
    }
  }
  // (±1, ±phi, 0)
  for (const x of [-1, 1]) {
    for (const y of [-PHI, PHI]) {
      raw.push([x, y, 0]);
    }
  }
  // (±phi, 0, ±1)
  for (const x of [-PHI, PHI]) {
    for (const z of [-1, 1]) {
      raw.push([x, 0, z]);
    }
  }

  const vertices = raw.map(v => normalize(v, radius));
  const edges = buildEdgesFromNeighbors(vertices, 5);
  return {
    name: 'Icosaedro',
    archetype: 'Agua',
    description: 'Fluidez, Cohesión, Sanación, Empatía y Relaciones',
    vertices,
    edges,
    facesCount: 20,
    color: '#3498db'
  };
}

/**
 * Dodecaedro (Éter / Conciencia Planetaria y Red Cósmica)
 * 20 Vértices, 30 Aristas, 12 Caras
 * Compuesto por los 8 vértices del cubo más 12 vértices con permutaciones áureas
 */
export function getDodecahedron(radius = 2.0) {
  const raw = [];
  // 8 vértices del cubo: (±1, ±1, ±1)
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        raw.push([x, y, z]);
      }
    }
  }

  // 4 vértices: (0, ±1/phi, ±phi)
  for (const y of [-INV_PHI, INV_PHI]) {
    for (const z of [-PHI, PHI]) {
      raw.push([0, y, z]);
    }
  }

  // 4 vértices: (±1/phi, ±phi, 0)
  for (const x of [-INV_PHI, INV_PHI]) {
    for (const y of [-PHI, PHI]) {
      raw.push([x, y, 0]);
    }
  }

  // 4 vértices: (±phi, 0, ±1/phi)
  for (const x of [-PHI, PHI]) {
    for (const z of [-INV_PHI, INV_PHI]) {
      raw.push([x, 0, z]);
    }
  }

  const vertices = raw.map(v => normalize(v, radius));
  const edges = buildEdgesFromNeighbors(vertices, 3);
  return {
    name: 'Dodecaedro',
    archetype: 'Éter',
    description: 'Conciencia Cósmica, Visión Holística, Tejido de Redes Mayores',
    vertices,
    edges,
    facesCount: 12,
    color: '#9b59b6'
  };
}

/**
 * Merkaba / Estrella Octángula
 * 8 Vértices (dos tetraedros entrelazados que representan equilibrio dinámico)
 */
export function getMerkaba(radius = 2.0) {
  const t1 = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1]
  ].map(v => normalize(v, radius));

  const t2 = [
    [-1, -1, -1],
    [-1, 1, 1],
    [1, -1, 1],
    [1, 1, -1]
  ].map(v => normalize(v, radius));

  const vertices = [...t1, ...t2];
  
  // Aristas de cada tetraedro (6 de t1 + 6 de t2)
  const edges = [
    // Tetraedro 1 (índices 0, 1, 2, 3)
    [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
    // Tetraedro 2 (índices 4, 5, 6, 7)
    [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7],
    // Conexiones de equilibrio polar centro-eje
    [0, 4], [1, 5], [2, 6], [3, 7]
  ];

  return {
    name: 'Merkaba',
    archetype: 'Luz & Equilibrio',
    description: 'Unión Sagrada de Polaridades, Vehículo de Conciencia',
    vertices,
    edges,
    facesCount: 8,
    color: '#00ffff'
  };
}

/**
 * Diccionario de geometrías disponibles
 */
export const PLATONIC_SOLIDS = {
  tetrahedron: getTetrahedron,
  octahedron: getOctahedron,
  cube: getCube,
  icosahedron: getIcosahedron,
  dodecahedron: getDodecahedron,
  merkaba: getMerkaba
};
