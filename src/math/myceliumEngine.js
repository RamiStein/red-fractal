/**
 * Motor Bio-Matemático de Redes de Micelio (Physarum polycephalum / Metro de Tokio)
 * 
 * Implementa el modelo de ecuaciones hidrodinámicas de Tero et al. (Science 2010):
 * - Ley de Kirchhoff para presión de fluidos en grafos
 * - Ley de Hagen-Poiseuille para cálculo de flujos volumétricos Q_ij
 * - Retroalimentación adaptativa: engrosamiento por flujo y atrofia/poda por desuso
 * - Auto-reparación dinámica ante rotura/disrupción de aristas
 */

import { dist2D, generateProximityGraph, calculateGlobalEfficiency, calculateTotalLength, computeKruskalMST } from './graphTheory.js';

export class MyceliumEngine {
  constructor({
    decayRate = 0.15,      // Tasa de atrofia natural (gamma)
    flowExponent = 1.0,    // Sensibilidad del crecimiento al flujo (mu)
    dt = 0.25,             // Paso temporal de integración
    pruneThreshold = 0.05  // Umbral de conductividad para podar tubos inactivos
  } = {}) {
    this.decayRate = decayRate;
    this.flowExponent = flowExponent;
    this.dt = dt;
    this.pruneThreshold = pruneThreshold;

    this.nodes = [];
    this.edges = [];
    this.iterationCount = 0;
    this.currentSourceIdx = 0;
    this.currentSinkIdx = 1;
  }

  /**
   * Inicializa la red con un conjunto de nodos y genera la malla inicial de tubos.
   */
  init(nodes, candidateNeighbors = 5) {
    this.nodes = nodes.map((n, i) => ({
      ...n,
      idx: i,
      pressure: 0,
      fluxDemand: 1.0 // Fuerza de la fuente de nutrientes
    }));

    this.edges = generateProximityGraph(this.nodes, candidateNeighbors);
    this.iterationCount = 0;
    return this;
  }

  /**
   * Resuelve las presiones en los nodos mediante relajación Gauss-Seidel sobre el Laplaciano del grafo.
   * Resuelve: sum_j [ (D_ij / L_ij) * (p_i - p_j) ] = S_i
   */
  solveKirchhoffPressures(sourceIdx, sinkIdx, maxIters = 60) {
    const n = this.nodes.length;
    const pressures = new Float32Array(n);

    // Fuente emite +1.0, Sumidero absorbe -1.0
    const S = new Float32Array(n);
    S[sourceIdx] = 1.0;
    S[sinkIdx] = -1.0;

    // Fijar la presión del sumidero a 0 como referencia
    for (let iter = 0; iter < maxIters; iter++) {
      for (let i = 0; i < n; i++) {
        if (i === sinkIdx) {
          pressures[i] = 0;
          continue;
        }

        let num = S[i];
        let denom = 0;

        for (const e of this.edges) {
          if (!e.active || e.conductivity <= 0) continue;

          let neighbor = -1;
          if (e.u === i) neighbor = e.v;
          else if (e.v === i) neighbor = e.u;

          if (neighbor !== -1) {
            const cond = e.conductivity / e.length;
            num += cond * pressures[neighbor];
            denom += cond;
          }
        }

        if (denom > 1e-6) {
          pressures[i] = num / denom;
        }
      }
    }

    // Asignar presiones a los nodos
    for (let i = 0; i < n; i++) {
      this.nodes[i].pressure = pressures[i];
    }
  }

  /**
   * Ejecuta un paso de simulación biológica de Physarum:
   * 1. Selecciona un par de fuentes de nutrientes (estaciones/ciudades).
   * 2. Calcula presiones y flujos volumétricos Q_ij a través de los tubos.
   * 3. Aplica adaptación biológica (engrosa tubos usados, atrofia tubos ineficientes).
   */
  step() {
    const n = this.nodes.length;
    if (n < 2 || this.edges.length === 0) return;

    // Seleccionar pares de nodos de manera secuencial o estocástica
    this.currentSourceIdx = Math.floor(Math.random() * n);
    do {
      this.currentSinkIdx = Math.floor(Math.random() * n);
    } while (this.currentSinkIdx === this.currentSourceIdx);

    // 1. Resolver presiones hidrodinámicas
    this.solveKirchhoffPressures(this.currentSourceIdx, this.currentSinkIdx);

    // 2. Calcular flujo volumétrico Q_ij y actualizar conductividad D_ij
    for (const e of this.edges) {
      if (!e.active) continue;

      const pU = this.nodes[e.u].pressure;
      const pV = this.nodes[e.v].pressure;
      
      // Ley de Hagen-Poiseuille: Q = (D / L) * Delta P
      const flux = (e.conductivity / e.length) * (pU - pV);
      e.flux = flux;
      const absFlux = Math.abs(flux);

      // Función de retroalimentación biológica: f(|Q|) = |Q|^mu / (1 + |Q|^mu)
      const fQ = Math.pow(absFlux, this.flowExponent) / (1.0 + Math.pow(absFlux, this.flowExponent));

      // dD/dt = f(|Q|) - gamma * D
      const dD = (fQ * 2.5 - this.decayRate * e.conductivity) * this.dt;
      e.conductivity = Math.max(0.001, Math.min(4.0, e.conductivity + dD));

      // Poda adaptativa: si la conductividad es muy baja, se considera podado
      if (e.conductivity < this.pruneThreshold) {
        e.isPruned = true;
      } else {
        e.isPruned = false;
      }
    }

    this.iterationCount++;
  }

  /**
   * Corta / disrumpe una arista específica (emulando daño ambiental o corte de vía).
   */
  severEdge(edgeIdx) {
    if (this.edges[edgeIdx]) {
      this.edges[edgeIdx].active = false;
      this.edges[edgeIdx].conductivity = 0;
      this.edges[edgeIdx].isSevered = true;
      return true;
    }
    return false;
  }

  /**
   * Restaura todas las aristas cortadas para regeneración.
   */
  healNetwork() {
    for (const e of this.edges) {
      if (e.isSevered) {
        e.active = true;
        e.isSevered = false;
        e.conductivity = 0.5; // Comienza a regenerarse
      }
    }
  }

  /**
   * Obtiene métricas comparativas de la red actual versus MST y Malla densa.
   */
  getNetworkMetrics() {
    const activeEdges = this.edges.filter(e => e.active && !e.isPruned);
    const mst = computeKruskalMST(this.nodes, this.edges);

    const lengthMycelium = calculateTotalLength(activeEdges);
    const lengthMST = calculateTotalLength(mst);

    const effMycelium = calculateGlobalEfficiency(this.nodes, activeEdges);
    const effMST = calculateGlobalEfficiency(this.nodes, mst);

    // Resiliencia: ¿Sigue conectado el grafo si falla la arista con mayor flujo?
    const sortedByFlux = [...activeEdges].sort((a, b) => Math.abs(b.flux || 0) - Math.abs(a.flux || 0));
    let resilienceScore = 1.0;
    if (sortedByFlux.length > 0) {
      const remaining = activeEdges.filter(e => e !== sortedByFlux[0]);
      const effAfterCut = calculateGlobalEfficiency(this.nodes, remaining);
      resilienceScore = effMycelium > 0 ? (effAfterCut / effMycelium) : 0;
    }

    return {
      iteration: this.iterationCount,
      totalNodes: this.nodes.length,
      activeTubes: activeEdges.length,
      myceliumCost: Number(lengthMycelium.toFixed(1)),
      mstCost: Number(lengthMST.toFixed(1)),
      costRatioToMST: lengthMST > 0 ? Number((lengthMycelium / lengthMST).toFixed(2)) : 1.0,
      myceliumEfficiency: Number(effMycelium.toFixed(3)),
      mstEfficiency: Number(effMST.toFixed(3)),
      efficiencyGain: effMST > 0 ? Number(((effMycelium - effMST) / effMST * 100).toFixed(1)) : 0,
      resilience: Number(resilienceScore.toFixed(2))
    };
  }
}
