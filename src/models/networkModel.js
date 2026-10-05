/**
 * Modelo de Datos y Grafo para la Red Humana Fractal
 * 
 * Gestiona el estado de los nodos, personalización de nombres,
 * categorías, colores arquetípicos, exportación/importación JSON y métricas de red.
 */

import { FractalEngine } from '../math/fractalEngine.js';

export const DEFAULT_CATEGORIES = {
  'Gobernanza & Sabiduría': { color: '#b366ff', icon: 'crown', description: 'Visión holística, decisiones éticas y orientación del propósito común' },
  'Iniciación & Voluntad': { color: '#ff4d4d', icon: 'flame', description: 'Impulso creador, apertura de caminos y energía de acción' },
  'Sostén & Regeneración': { color: '#2ecc71', icon: 'leaf', description: 'Gestión de recursos, cuidado del hábitat y sostenibilidad material' },
  'Comunicación & Red': { color: '#f1c40f', icon: 'zap', description: 'Puentes entre nodos, flujo de información y difusión' },
  'Cohesión & Relaciones': { color: '#3498db', icon: 'heart', description: 'Cuidado mutuo, inteligencia vincular, empatía y arte' },
  'Catalizador de Proyectos': { color: '#e67e22', icon: 'sparkles', description: 'Aceleración y manifestación de iniciativas comunitarias' },
  'Arquitecto de Recursos': { color: '#27ae60', icon: 'box', description: 'Diseño de estructuras físicas, logísticas y economías regenerativas' },
  'Facilitador de Intercambio': { color: '#f39c12', icon: 'share-2', description: 'Enlace entre círculos y mediación de aprendizajes' },
  'Cuidador Comunitario': { color: '#1abc9c', icon: 'shield', description: 'Salud comunitaria, contención emocional y armonía grupal' },
  'Guardián de Visión': { color: '#8e44ad', icon: 'eye', description: 'Alineación con los valores fundacionales de la red' },
  'Personalizada': { color: '#00e5ff', icon: 'tag', description: 'Categoría personalizada definida por la comunidad' }
};

export class HumanNetworkModel {
  constructor() {
    this.metadata = {};
    this.nodes = [];
    this.links = [];
    this.categories = { ...DEFAULT_CATEGORIES };
    this.activeSolid = 'dodecahedron';
    this.activeDepth = 1;
    this.selectedNodeId = null;
    this.subscribers = new Set();
  }

  /**
   * Inicializa la red con una geometría y profundidad dada.
   */
  generate(solidType = 'dodecahedron', depth = 1, options = {}) {
    this.activeSolid = solidType;
    this.activeDepth = depth;
    const generated = FractalEngine.generateNetwork({
      solidType,
      depth,
      ...options
    });

    this.metadata = generated.metadata;
    this.nodes = generated.nodes;
    this.links = generated.links;
    this.selectedNodeId = null;

    this.notify();
    return this;
  }

  /**
   * Obtiene un nodo por ID.
   */
  getNode(id) {
    return this.nodes.find(n => n.id === id);
  }

  /**
   * Actualiza los datos de un nodo específico.
   */
  updateNode(id, updates) {
    const node = this.getNode(id);
    if (!node) return false;

    if (updates.name !== undefined) node.name = updates.name.trim();
    if (updates.category !== undefined) node.category = updates.category;
    if (updates.description !== undefined) node.description = updates.description;
    if (updates.resonance !== undefined) node.resonance = Math.max(0, Math.min(1, Number(updates.resonance)));
    if (updates.color !== undefined) node.customColor = updates.color;

    this.notify();
    return true;
  }

  /**
   * Añade una nueva categoría personalizada.
   */
  addCategory(name, color = '#00e5ff', description = '') {
    if (!name || this.categories[name]) return false;
    this.categories[name] = {
      color,
      icon: 'tag',
      description
    };
    this.notify();
    return true;
  }

  /**
   * Obtiene el color de un nodo (personalizado o por categoría).
   */
  getNodeColor(node) {
    if (node.customColor) return node.customColor;
    const cat = this.categories[node.category];
    if (cat && cat.color) return cat.color;
    return '#00e5ff';
  }

  /**
   * Serializa la red completa a JSON para exportar.
   */
  exportToJSON() {
    const payload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      metadata: this.metadata,
      activeSolid: this.activeSolid,
      activeDepth: this.activeDepth,
      categories: this.categories,
      nodes: this.nodes,
      links: this.links
    };
    return JSON.stringify(payload, null, 2);
  }

  /**
   * Importa la red desde una cadena JSON.
   */
  importFromJSON(jsonString) {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!data.nodes || !data.links) {
        throw new Error('Formato de datos de red inválido: faltan nodos o enlaces.');
      }
      this.metadata = data.metadata || {};
      this.activeSolid = data.activeSolid || 'dodecahedron';
      this.activeDepth = data.activeDepth ?? 1;
      this.categories = { ...DEFAULT_CATEGORIES, ...(data.categories || {}) };
      this.nodes = data.nodes;
      this.links = data.links;
      this.selectedNodeId = null;
      this.notify();
      return true;
    } catch (err) {
      console.error('Error importando red:', err);
      return false;
    }
  }

  /**
   * Suscribirse a cambios en el modelo.
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const callback of this.subscribers) {
      try {
        callback(this);
      } catch (err) {
        console.error('Error en suscriptor del modelo:', err);
      }
    }
  }

  /**
   * Calcula estadísticas matemáticas y topológicas de la red.
   */
  getStats() {
    const totalNodes = this.nodes.length;
    const totalLinks = this.links.length;
    
    // Distribución por nivel
    const levelCounts = {};
    const categoryCounts = {};
    let totalDegree = 0;

    for (const n of this.nodes) {
      levelCounts[n.level] = (levelCounts[n.level] || 0) + 1;
      categoryCounts[n.category] = (categoryCounts[n.category] || 0) + 1;
      totalDegree += (n.connections ? n.connections.length : 0);
    }

    const avgDegree = totalNodes > 0 ? (totalDegree / totalNodes).toFixed(2) : 0;

    return {
      totalNodes,
      totalLinks,
      avgDegree,
      levelCounts,
      categoryCounts,
      categoriesList: Object.keys(this.categories)
    };
  }
}
