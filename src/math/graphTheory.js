/**
 * Módulo de Teoría de Grafos
 * 
 * Implementa algoritmos clásicos de grafos:
 * - Dijkstra (Caminos más cortos entre todos los pares)
 * - Eficiencia Global de Red (Latora & Marchiori)
 * - Árbol de Expansión Mínima (MST - Algoritmo de Kruskal)
 * - Métricas de Costo (Longitud Total), Resiliencia y Centralidad
 */

/**
 * Distancia euclidiana en el plano 2D
 */
export function dist2D(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Algoritmo de Dijkstra para calcular distancias mínimas desde un nodo origen a todos los demás.
 * @param {number} startIdx - Índice del nodo de inicio
 * @param {Array} nodes - Lista de nodos [{x, y}, ...]
 * @param {Array} edges - Lista de aristas [{u, v, weight, active}, ...]
 * @returns {Array<number>} Vector de distancias mínimas
 */
export function dijkstra(startIdx, nodes, edges) {
  const n = nodes.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  dist[startIdx] = 0;

  // Construir lista de adyacencia considerando solo aristas activas
  const adj = Array.from({ length: n }, () => []);
  for (const e of edges) {
    if (e.active !== false && (e.conductivity === undefined || e.conductivity > 0.05)) {
      adj[e.u].push({ v: e.v, weight: e.weight });
      adj[e.v].push({ v: e.u, weight: e.weight });
    }
  }

  for (let step = 0; step < n; step++) {
    let u = -1;
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && dist[i] < minDist) {
        minDist = dist[i];
        u = i;
      }
    }

    if (u === -1 || minDist === Infinity) break;
    visited[u] = true;

    for (const neighbor of adj[u]) {
      const v = neighbor.v;
      const alt = dist[u] + neighbor.weight;
      if (alt < dist[v]) {
        dist[v] = alt;
      }
    }
  }

  return dist;
}

/**
 * Calcula la Eficiencia Global de la Red:
 * E = (1 / (N * (N - 1))) * sum_{i != j} (d_euclid(i, j) / d_graph(i, j))
 * Mide cuán rápido se intercambia información/recursos comparado con la distancia en línea recta.
 */
export function calculateGlobalEfficiency(nodes, edges) {
  const n = nodes.length;
  if (n < 2) return 1.0;

  let sumEfficiency = 0;
  let pairs = 0;

  for (let i = 0; i < n; i++) {
    const shortestPaths = dijkstra(i, nodes, edges);
    for (let j = i + 1; j < n; j++) {
      const dGraph = shortestPaths[j];
      const dEuclid = dist2D(nodes[i], nodes[j]);
      if (dGraph < Infinity && dGraph > 0) {
        sumEfficiency += dEuclid / dGraph;
      }
      pairs++;
    }
  }

  return pairs > 0 ? (sumEfficiency / pairs) : 0;
}

/**
 * Calcula la longitud total del tendido de red (Costo de Infraestructura).
 */
export function calculateTotalLength(edges) {
  let total = 0;
  for (const e of edges) {
    if (e.active !== false && (e.conductivity === undefined || e.conductivity > 0.05)) {
      total += e.weight;
    }
  }
  return total;
}

/**
 * Árbol de Expansión Mínima (MST - Algoritmo de Kruskal)
 * Encuentra el subconjunto de aristas que conecta todos los nodos con la menor longitud posible.
 */
export function computeKruskalMST(nodes, candidateEdges) {
  const n = nodes.length;
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(i) {
    if (parent[i] === i) return i;
    parent[i] = find(parent[i]);
    return parent[i];
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }

  // Ordenar aristas por peso (longitud) ascendente
  const sorted = [...candidateEdges].sort((a, b) => a.weight - b.weight);
  const mstEdges = [];

  for (const e of sorted) {
    if (union(e.u, e.v)) {
      mstEdges.push({ ...e, isMST: true, active: true });
      if (mstEdges.length === n - 1) break;
    }
  }

  return mstEdges;
}

/**
 * Genera un conjunto inicial de aristas densas (Grafo de Proximidad / k-vecinos)
 */
export function generateProximityGraph(nodes, kNeighbors = 4) {
  const edges = [];
  const edgeSet = new Set();
  const n = nodes.length;

  for (let i = 0; i < n; i++) {
    const dists = [];
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        dists.push({ j, dist: dist2D(nodes[i], nodes[j]) });
      }
    }
    dists.sort((a, b) => a.dist - b.dist);

    for (let k = 0; k < Math.min(kNeighbors, dists.length); k++) {
      const j = dists[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({
          u: i,
          v: j,
          weight: dists[k].dist,
          length: dists[k].dist,
          conductivity: 1.0, // Diámetro inicial del tubo
          active: true
        });
      }
    }
  }

  return edges;
}
