/**
 * Motor Fractal para la Red Humana
 * 
 * Genera estructuras fractales recursivas a partir de sólidos platónicos,
 * escalando y posicionando geometrías hijas en cada vértice y conectando
 * los niveles mediante puentes armónicos.
 */

import { PLATONIC_SOLIDS, PHI, INV_PHI, distance } from './platonic.js';

export class FractalEngine {
  /**
   * Genera un árbol fractal de nodos y aristas.
   * 
   * @param {Object} options
   * @param {string} options.solidType - Tipo de sólido ('dodecahedron', 'icosahedron', 'cube', 'octahedron', 'tetrahedron', 'merkaba')
   * @param {number} options.depth - Nivel de recursión fractal (0, 1, 2)
   * @param {number} options.baseRadius - Radio del sólido raíz
   * @param {number} options.scaleRatio - Proporción de reducción en cada nivel (por defecto 1/phi ~0.618)
   * @param {number} options.spacingRatio - Separación radial del nodo hijo respecto al vértice padre
   */
  static generateNetwork({
    solidType = 'dodecahedron',
    depth = 1,
    baseRadius = 3.5,
    scaleRatio = INV_PHI * 0.75, // Ajustado para visibilidad armónica
    spacingRatio = 1.25,
    customCategories = {}
  } = {}) {
    const generator = PLATONIC_SOLIDS[solidType] || PLATONIC_SOLIDS.dodecahedron;
    const baseSolid = generator(baseRadius);

    const nodes = [];
    const links = [];
    let nodeIdCounter = 0;

    /**
     * Función recursiva de expansión fractal
     */
    function spawnCluster(center, radius, currentDepth, parentId = null, archetype = baseSolid.archetype, path = '0') {
      const solid = generator(radius);
      const clusterNodeIds = [];

      // Crear nodos para los vértices de este cluster
      for (let i = 0; i < solid.vertices.length; i++) {
        const v = solid.vertices[i];
        const worldPos = [
          center[0] + v[0],
          center[1] + v[1],
          center[2] + v[2]
        ];

        const id = `node_${nodeIdCounter++}`;
        clusterNodeIds.push(id);

        // Determinación de arquetipo y nombre por nivel fractal
        let levelLabel = '';
        if (currentDepth === 0) levelLabel = 'Semilla Raíz';
        else if (currentDepth === 1) levelLabel = 'Círculo Comunitario';
        else levelLabel = 'Célula Fractal';

        const node = {
          id,
          name: `${baseSolid.name} #${i + 1} (${levelLabel})`,
          level: currentDepth,
          archetype: solid.archetype,
          category: defaultCategoryForArchetype(solid.archetype, currentDepth),
          position: worldPos,
          radius: radius * 0.12, // Tamaño visual del nodo en 3D
          parentId: parentId,
          clusterPath: `${path}.${i}`,
          localIndex: i,
          connections: [],
          resonance: Number((1.0 / (currentDepth + 1)).toFixed(2)),
          description: `Nodo fractal nivel ${currentDepth} en estructura de ${solid.name}.`
        };

        nodes.push(node);
      }

      // Crear aristas internas del cluster (geometría del sólido)
      for (const [idxA, idxB] of solid.edges) {
        const idA = clusterNodeIds[idxA];
        const idB = clusterNodeIds[idxB];
        
        links.push({
          source: idA,
          target: idB,
          type: 'intra-solid',
          level: currentDepth,
          weight: 1.0 / (currentDepth + 1)
        });

        // Registrar en nodos
        const nodeA = nodes.find(n => n.id === idA);
        const nodeB = nodes.find(n => n.id === idB);
        if (nodeA) nodeA.connections.push(idB);
        if (nodeB) nodeB.connections.push(idA);
      }

      // Si tiene padre, crear puente armónico inter-nivel
      if (parentId) {
        // Conectar el nodo padre al vértice más cercano del cluster
        const parentNode = nodes.find(n => n.id === parentId);
        if (parentNode) {
          let closestChildId = clusterNodeIds[0];
          let minDist = Infinity;
          for (const cId of clusterNodeIds) {
            const childNode = nodes.find(n => n.id === cId);
            const d = distance(parentNode.position, childNode.position);
            if (d < minDist) {
              minDist = d;
              closestChildId = cId;
            }
          }

          links.push({
            source: parentId,
            target: closestChildId,
            type: 'harmonic-bridge',
            level: currentDepth,
            weight: 0.8
          });

          parentNode.connections.push(closestChildId);
          const child = nodes.find(n => n.id === closestChildId);
          if (child) child.connections.push(parentId);
        }
      }

      // Si no hemos alcanzado la profundidad máxima, recurrir en cada vértice
      if (currentDepth < depth) {
        const nextRadius = radius * scaleRatio;
        for (let i = 0; i < solid.vertices.length; i++) {
          const v = solid.vertices[i];
          // Proyección radial hacia afuera
          const childCenter = [
            center[0] + v[0] * spacingRatio,
            center[1] + v[1] * spacingRatio,
            center[2] + v[2] * spacingRatio
          ];

          spawnCluster(
            childCenter,
            nextRadius,
            currentDepth + 1,
            clusterNodeIds[i],
            solid.archetype,
            `${path}.${i}`
          );
        }
      }
    }

    // Iniciar desde el origen [0, 0, 0]
    spawnCluster([0, 0, 0], baseRadius, 0, null, baseSolid.archetype, 'root');

    return {
      metadata: {
        solidType,
        solidName: baseSolid.name,
        archetype: baseSolid.archetype,
        depth,
        totalNodes: nodes.length,
        totalLinks: links.length,
        phiRatio: PHI,
        timestamp: new Date().toISOString()
      },
      nodes,
      links
    };
  }
}

/**
 * Asigna categoría predeterminada según el elemento / arquetipo y nivel.
 */
function defaultCategoryForArchetype(archetype, level) {
  if (level === 0) {
    switch (archetype) {
      case 'Fuego': return 'Iniciación & Voluntad';
      case 'Tierra': return 'Sostén & Regeneración';
      case 'Aire': return 'Comunicación & Red';
      case 'Agua': return 'Cohesión & Relaciones';
      case 'Éter': return 'Gobernanza & Sabiduría';
      default: return 'Nodo Semilla';
    }
  } else if (level === 1) {
    switch (archetype) {
      case 'Fuego': return 'Catalizador de Proyectos';
      case 'Tierra': return 'Arquitecto de Recursos';
      case 'Aire': return 'Facilitador de Intercambio';
      case 'Agua': return 'Cuidador Comunitario';
      case 'Éter': return 'Guardián de Visión';
      default: return 'Círculo Fractal';
    }
  } else {
    return 'Célula Operativa';
  }
}
