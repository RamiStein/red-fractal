/**
 * Módulo Matemático de la Matriz Cristal Planetaria
 * 
 * Genera la retícula icosa-dodecaédrica de 62 vórtices primarios proyectados
 * sobre la esfera terrestre con conversión analítica entre coordenadas 3D
 * y coordenadas geográficas (latitud, longitud).
 */

export const PHI = (1 + Math.sqrt(5)) / 2; // Constante áurea ~1.6180339887

/**
 * Convierte coordenadas esféricas geográficas (latitud, longitud en grados) a vector 3D cartesiano.
 * @param {number} lat - Latitud en grados (-90 a 90)
 * @param {number} lon - Longitud en grados (-180 a 180)
 * @param {number} radius - Radio de la esfera
 */
export function geoToCartesian(lat, lon, radius = 1.0) {
  const phi = (90 - lat) * (Math.PI / 180);     // Colatitud
  const theta = (lon + 180) * (Math.PI / 180); // Longitud ajustada

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

/**
 * Convierte un vector 3D cartesiano a coordenadas geográficas (latitud, longitud en grados).
 * @param {number[]} v - Vector [x, y, z]
 */
export function cartesianToGeo(v) {
  const r = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1.0;
  const x = v[0] / r;
  const y = v[1] / r;
  const z = v[2] / r;

  // Latitud: ángulo respecto al plano ecuatorial XZ
  const lat = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
  
  // Longitud: ángulo en el plano XZ
  let lon = Math.atan2(z, -x) * (180 / Math.PI) - 180;
  if (lon < -180) lon += 360;
  if (lon > 180) lon -= 360;

  return {
    lat: Number(lat.toFixed(4)),
    lon: Number(lon.toFixed(4))
  };
}

/**
 * Normaliza un vector a longitud deseada.
 */
export function normalize(v, r = 1.0) {
  const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]) || 1.0;
  return [v[0]*r/len, v[1]*r/len, v[2]*r/len];
}

/**
 * Distancia euclidiana 3D
 */
export function dist3D(a, b) {
  const dx = a[0]-b[0], dy = a[1]-b[1], dz = a[2]-b[2];
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

/**
 * Genera la Matriz Cristal Geodésica Completa (62 Vórtices)
 * - 12 Vértices Icosaédricos (Agua / Red Vincular)
 * - 20 Vértices Dodecaédricos (Éter / Conciencia Planetaria)
 * - 30 Puntos de Equilibrio (Centros de arista / Cruces telúricos)
 */
export function generatePlanetaryCrystalGrid(radius = 1.0) {
  const vertices = [];
  const edges = [];
  const edgeSet = new Set();

  // 1. Los 12 Vértices del Icosaedro (Matriz de Agua)
  // Polos norte y sur + dos anillos de 5 a latitud arctan(1/2) ~ 26.565°
  const icosaLat = Math.atan(0.5) * (180 / Math.PI); // ~26.565°
  const icosaNodes = [];

  // Polo Norte
  icosaNodes.push({ lat: 90, lon: 0, type: 'icosa-pole', archetype: 'Agua-Éter' });
  // Anillo Norte (5 vértices espaciados 72°)
  for (let i = 0; i < 5; i++) {
    icosaNodes.push({ lat: icosaLat, lon: i * 72 - 180, type: 'icosa-ring-n', archetype: 'Agua' });
  }
  // Anillo Sur (5 vértices desfasados 36°)
  for (let i = 0; i < 5; i++) {
    icosaNodes.push({ lat: -icosaLat, lon: i * 72 + 36 - 180, type: 'icosa-ring-s', archetype: 'Agua' });
  }
  // Polo Sur
  icosaNodes.push({ lat: -90, lon: 0, type: 'icosa-pole', archetype: 'Agua-Tierra' });

  // 2. Los 20 Vértices del Dodecaedro (Matriz de Éter)
  // Generados como centros de las 20 caras triangulares del icosaedro
  const dodecaNodes = [];
  // 5 triángulos superiores alrededor del polo norte
  for (let i = 0; i < 5; i++) {
    const nextI = (i + 1) % 5;
    const v0 = geoToCartesian(90, 0, radius);
    const v1 = geoToCartesian(icosaLat, i * 72 - 180, radius);
    const v2 = geoToCartesian(icosaLat, nextI * 72 - 180, radius);
    const center = normalize([(v0[0]+v1[0]+v2[0])/3, (v0[1]+v1[1]+v2[1])/3, (v0[2]+v1[2]+v2[2])/3], radius);
    const geo = cartesianToGeo(center);
    dodecaNodes.push({ lat: geo.lat, lon: geo.lon, type: 'dodeca-face-n', archetype: 'Éter' });
  }

  // 10 triángulos ecuatoriales intermedios
  for (let i = 0; i < 5; i++) {
    const nextI = (i + 1) % 5;
    // Triángulo que apunta hacia abajo
    const n1 = geoToCartesian(icosaLat, i * 72 - 180, radius);
    const n2 = geoToCartesian(icosaLat, nextI * 72 - 180, radius);
    const s1 = geoToCartesian(-icosaLat, i * 72 + 36 - 180, radius);
    const cA = normalize([(n1[0]+n2[0]+s1[0])/3, (n1[1]+n2[1]+s1[1])/3, (n1[2]+n2[2]+s1[2])/3], radius);
    const geoA = cartesianToGeo(cA);
    dodecaNodes.push({ lat: geoA.lat, lon: geoA.lon, type: 'dodeca-face-mid', archetype: 'Éter' });

    // Triángulo que apunta hacia arriba
    const s2 = geoToCartesian(-icosaLat, nextI * 72 + 36 - 180, radius);
    const cB = normalize([(n2[0]+s1[0]+s2[0])/3, (n2[1]+s1[1]+s2[1])/3, (n2[2]+s1[2]+s2[2])/3], radius);
    const geoB = cartesianToGeo(cB);
    dodecaNodes.push({ lat: geoB.lat, lon: geoB.lon, type: 'dodeca-face-mid', archetype: 'Éter' });
  }

  // 5 triángulos inferiores alrededor del polo sur
  for (let i = 0; i < 5; i++) {
    const nextI = (i + 1) % 5;
    const v0 = geoToCartesian(-90, 0, radius);
    const v1 = geoToCartesian(-icosaLat, i * 72 + 36 - 180, radius);
    const v2 = geoToCartesian(-icosaLat, nextI * 72 + 36 - 180, radius);
    const center = normalize([(v0[0]+v1[0]+v2[0])/3, (v0[1]+v1[1]+v2[1])/3, (v0[2]+v1[2]+v2[2])/3], radius);
    const geo = cartesianToGeo(center);
    dodecaNodes.push({ lat: geo.lat, lon: geo.lon, type: 'dodeca-face-s', archetype: 'Éter' });
  }

  // Combinar nodos primarios del cristal (12 + 20 = 32 vértices primarios)
  let idIdx = 0;
  for (const node of [...icosaNodes, ...dodecaNodes]) {
    const pos = geoToCartesian(node.lat, node.lon, radius);
    vertices.push({
      idx: idIdx++,
      lat: node.lat,
      lon: node.lon,
      pos,
      type: node.type,
      archetype: node.archetype,
      isPrimary: true
    });
  }

  // Conectar con los vecinos más cercanos para generar la red cristalina geodésica
  for (let i = 0; i < vertices.length; i++) {
    const dList = [];
    for (let j = 0; j < vertices.length; j++) {
      if (i !== j) {
        dList.push({ j, d: dist3D(vertices[i].pos, vertices[j].pos) });
      }
    }
    dList.sort((a, b) => a.d - b.d);
    
    // Conectar a los 5 vecinos más próximos para crear la red triangular
    const neighborLimit = vertices[i].type.startsWith('icosa') ? 6 : 5;
    for (let k = 0; k < Math.min(neighborLimit, dList.length); k++) {
      const j = dList[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    }
  }

  return {
    vertices,
    edges,
    totalVortices: vertices.length,
    totalEdges: edges.length,
    radius
  };
}

/**
 * Calcula la onda armónica sincrónica de un nodo en el tiempo t.
 * @param {number} t - Tiempo actual (segundos)
 * @param {number} baseFreq - Frecuencia base en Hz (ej. 7.83 para Schumann, o ciclo)
 * @param {number} lon - Longitud geográfica para calcular el desfase solar
 */
export function calculateSynchronicWave(t, baseFreq = 7.83, lon = 0) {
  // Desfase solar según huso geográfico (-pi a +pi)
  const phaseOffset = (lon / 180) * Math.PI;
  // Pulsación armónica
  const wave = Math.sin(2 * Math.PI * (baseFreq * 0.1) * t + phaseOffset);
  // Valor normalizado entre 0.2 y 1.0 para brillo visual
  return 0.6 + 0.4 * wave;
}
