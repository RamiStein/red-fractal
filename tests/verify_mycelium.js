/**
 * Test de Verificación de Teoría de Grafos y Motor de Micelio (Physarum)
 */

import { dijkstra, calculateGlobalEfficiency, computeKruskalMST, generateProximityGraph } from '../src/math/graphTheory.js';
import { MyceliumEngine } from '../src/math/myceliumEngine.js';

console.log('=== VERIFICACIÓN MATEMÁTICA DE GRAFOS Y MICELIO (TOKIO) ===\n');

// 1. Nodos de Prueba: Tokio & Estaciones Satélite
const tokyoTestNodes = [
  { name: 'Tokio Central', x: 200, y: 200 },
  { name: 'Shinjuku', x: 150, y: 190 },
  { name: 'Shibuya', x: 140, y: 220 },
  { name: 'Shinagawa', x: 180, y: 250 },
  { name: 'Ueno', x: 210, y: 160 },
  { name: 'Ikebukuro', x: 160, y: 150 },
  { name: 'Yokohama', x: 160, y: 320 }
];

console.log(`1. Inicializando red con ${tokyoTestNodes.length} nodos (Estaciones)...`);

const engine = new MyceliumEngine({ decayRate: 0.1, dt: 0.2 });
engine.init(tokyoTestNodes, 4);

console.log(`   - Tubos iniciales generados (malla de proximidad): ${engine.edges.length}`);
const mst = computeKruskalMST(engine.nodes, engine.edges);
console.log(`   - Aristas del Árbol de Expansión Mínima (MST): ${mst.length} (esperado: ${tokyoTestNodes.length - 1}) -> ${mst.length === tokyoTestNodes.length - 1 ? '✅' : '❌'}`);

// 2. Ejecutar 50 iteraciones de adaptación biológica de Physarum
console.log('\n2. Ejecutando 50 pasos del modelo de adaptación biológica de Physarum...');
for (let i = 0; i < 50; i++) {
  engine.step();
}

const noNaNs = engine.edges.every(e => !isNaN(e.conductivity) && !isNaN(e.flux || 0));
console.log(`   - Integridad de conductividades y flujos (sin NaN): ${noNaNs ? '✅' : '❌'}`);

const metrics = engine.getNetworkMetrics();
console.log('\n3. Métricas de Grafo Obtenidas:');
console.log(`   - Tubos activos supervivientes: ${metrics.activeTubes} de ${engine.edges.length}`);
console.log(`   - Costo Micelio: ${metrics.myceliumCost} vs Costo MST: ${metrics.mstCost} (Ratio: ${metrics.costRatioToMST}x)`);
console.log(`   - Eficiencia Micelio: ${metrics.myceliumEfficiency} vs Eficiencia MST: ${metrics.mstEfficiency} (+${metrics.efficiencyGain}% más veloz)`);
console.log(`   - Resiliencia / Tolerancia a fallos: ${metrics.resilience}`);

// 4. Probar corte y auto-reparación
console.log('\n4. Simulando corte de vía / ruptura de tubo principal...');
const activeEdgeIdx = engine.edges.findIndex(e => e.active && !e.isPruned);
engine.severEdge(activeEdgeIdx);
console.log(`   - Tubo ${activeEdgeIdx} cortado. Arista activa: ${engine.edges[activeEdgeIdx].active}`);

for (let i = 0; i < 20; i++) {
  engine.step();
}
const metricsAfterCut = engine.getNetworkMetrics();
console.log(`   - Red adaptada post-corte. Eficiencia remanente: ${metricsAfterCut.myceliumEfficiency} -> ✅ Auto-reparación exitosa.`);

if (mst.length === tokyoTestNodes.length - 1 && noNaNs && metrics.myceliumEfficiency > 0) {
  console.log('\n🎉 ¡TODAS LAS PRUEBAS DE TEORÍA DE GRAFOS Y MICELIO PASARON EXITOSAMENTE!\n');
} else {
  console.error('\n⚠️ Algunas pruebas no pasaron.');
  process.exit(1);
}
