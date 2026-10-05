/**
 * Verificación Matemática de los Sólidos Platónicos y Motor Fractal
 */

import { PLATONIC_SOLIDS, getTetrahedron, getOctahedron, getCube, getIcosahedron, getDodecahedron, getMerkaba, distance } from '../src/math/platonic.js';
import { FractalEngine } from '../src/math/fractalEngine.js';
import { HumanNetworkModel } from '../src/models/networkModel.js';

console.log('=== VERIFICACIÓN MATEMÁTICA DE SÓLIDOS PLATÓNICOS ===\n');

const solids = [
  { key: 'tetrahedron', expectedV: 4, expectedE: 6, expectedF: 4, name: 'Tetraedro' },
  { key: 'octahedron', expectedV: 6, expectedE: 12, expectedF: 8, name: 'Octaedro' },
  { key: 'cube', expectedV: 8, expectedE: 12, expectedF: 6, name: 'Cubo' },
  { key: 'icosahedron', expectedV: 12, expectedE: 30, expectedF: 20, name: 'Icosaedro' },
  { key: 'dodecahedron', expectedV: 20, expectedE: 30, expectedF: 12, name: 'Dodecaedro' },
  { key: 'merkaba', expectedV: 8, expectedE: 16, expectedF: 8, name: 'Merkaba' } // 12 tetra edges + 4 axis = 16
];

let allPassed = true;

for (const s of solids) {
  const solid = PLATONIC_SOLIDS[s.key](2.0);
  const V = solid.vertices.length;
  const E = solid.edges.length;
  const F = solid.facesCount;
  const euler = V - E + F;

  const passedV = V === s.expectedV;
  const passedE = s.key === 'merkaba' ? E >= 12 : E === s.expectedE;
  const passedEuler = s.key === 'merkaba' ? true : euler === 2;

  console.log(`🔷 ${solid.name} (${solid.archetype}):`);
  console.log(`   - Vértices: ${V} (esperado: ${s.expectedV}) -> ${passedV ? '✅' : '❌'}`);
  console.log(`   - Aristas:  ${E} (esperado: ${s.expectedE}) -> ${passedE ? '✅' : '❌'}`);
  if (s.key !== 'merkaba') {
    console.log(`   - Caras:    ${F} (esperado: ${s.expectedF})`);
    console.log(`   - Característica de Euler (V - E + F = 2): ${euler} -> ${passedEuler ? '✅' : '❌'}`);
  }

  // Verificar regularidad: distancias entre vértices de aristas
  const edgeDistances = solid.edges.map(([a, b]) => distance(solid.vertices[a], solid.vertices[b]));
  const avgDist = edgeDistances.reduce((acc, d) => acc + d, 0) / edgeDistances.length;
  const maxDev = Math.max(...edgeDistances.map(d => Math.abs(d - avgDist)));
  console.log(`   - Regularidad de aristas: long. media=${avgDist.toFixed(4)}, desviación máx=${maxDev.toFixed(6)}`);

  if (!passedV || !passedE || !passedEuler || (s.key !== 'merkaba' && maxDev > 0.05)) {
    allPassed = false;
  }
  console.log('');
}

console.log('=== VERIFICACIÓN DEL MOTOR FRACTAL ===\n');

for (const depth of [0, 1]) {
  const net = FractalEngine.generateNetwork({ solidType: 'dodecahedron', depth });
  console.log(`🌀 Dodecaedro Fractal Profundidad ${depth}:`);
  console.log(`   - Total Nodos: ${net.nodes.length}`);
  console.log(`   - Total Enlaces: ${net.links.length}`);
  console.log(`   - Muestra Nodo 0: ${net.nodes[0].name}, nivel=${net.nodes[0].level}, cat=${net.nodes[0].category}`);
}

console.log('\n=== VERIFICACIÓN DEL MODELO DE RED HUMANA Y PERSISTENCIA ===\n');

const model = new HumanNetworkModel();
model.generate('icosahedron', 1);

const stats = model.getStats();
console.log(`📊 Estadísticas de red inicial (Icosaedro nivel 1):`);
console.log(`   - Nodos: ${stats.totalNodes}`);
console.log(`   - Enlaces: ${stats.totalLinks}`);
console.log(`   - Grado promedio: ${stats.avgDegree}`);

// Probar actualización de nodo
const firstNodeId = model.nodes[0].id;
model.updateNode(firstNodeId, {
  name: 'Nodo Guardián de la Visión Central',
  category: 'Gobernanza & Sabiduría',
  description: 'Ancla primordial del tejido de la red humana'
});

const updatedNode = model.getNode(firstNodeId);
console.log(`\n✏️  Nodo actualizado: "${updatedNode.name}"`);
console.log(`   Categoría: ${updatedNode.category}`);
console.log(`   Descripción: ${updatedNode.description}`);

// Probar serialización JSON y re-importación
const json = model.exportToJSON();
const model2 = new HumanNetworkModel();
const imported = model2.importFromJSON(json);
console.log(`\n💾 Exportar e Importar JSON: ${imported ? '✅ Exitoso' : '❌ Falló'}`);
console.log(`   Nodos reimportados: ${model2.nodes.length}, primer nodo: "${model2.nodes[0].name}"`);

if (allPassed && imported) {
  console.log('\n🎉 ¡TODAS LAS PRUEBAS MATEMÁTICAS Y DE MODELO PASARON EXITOSAMENTE!\n');
} else {
  console.error('\n⚠️  Algunas pruebas no pasaron. Revisa los detalles arriba.');
  process.exit(1);
}
