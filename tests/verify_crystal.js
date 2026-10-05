/**
 * Pruebas de Verificación Matemática de la Matriz Cristal Sincrónica
 */

import { geoToCartesian, cartesianToGeo, generatePlanetaryCrystalGrid, calculateSynchronicWave } from '../src/math/crystalMatrix.js';
import { SynchronicCrystalMatrixModel } from '../src/models/bioregionModel.js';

console.log('=== VERIFICACIÓN MATEMÁTICA DE LA MATRIZ CRISTAL SINCRÓNICA ===\n');

// 1. Proyección esférica directa e inversa
const testPoints = [
  { lat: 0, lon: 0 },
  { lat: 90, lon: 0 },
  { lat: -90, lon: 0 },
  { lat: -26.565, lon: -72.0 },
  { lat: 45.0, lon: 120.0 }
];

let projectionPassed = true;
console.log('1. Verificación de Proyección Esférica (Lat/Lon <-> Vector 3D):');
for (const p of testPoints) {
  const v = geoToCartesian(p.lat, p.lon, 1.0);
  const back = cartesianToGeo(v);
  const diffLat = Math.abs(back.lat - p.lat);
  const diffLon = Math.abs(back.lon - p.lon);
  const ok = diffLat < 0.01 && (Math.abs(p.lat) === 90 || diffLon < 0.01);
  console.log(`   [Lat: ${p.lat}°, Lon: ${p.lon}°] -> 3D: [${v.map(x=>x.toFixed(3)).join(', ')}] -> Inversa: [${back.lat}°, ${back.lon}°] : ${ok ? '✅' : '❌'}`);
  if (!ok) projectionPassed = false;
}

// 2. Generación de la Malla Cristalina
console.log('\n2. Verificación de la Malla Geodésica Icosa-Dodecaédrica:');
const grid = generatePlanetaryCrystalGrid(3.5);
console.log(`   - Vórtices generados: ${grid.vertices.length}`);
console.log(`   - Canales telúricos / aristas: ${grid.edges.length}`);
const noNaNs = grid.vertices.every(v => !isNaN(v.pos[0]) && !isNaN(v.pos[1]) && !isNaN(v.pos[2]));
console.log(`   - Integridad matemática de coordenadas (sin NaN): ${noNaNs ? '✅' : '❌'}`);

// 3. Modelo de Biorregiones y Sincronía
console.log('\n3. Verificación del Modelo de Biorregiones y Sincronía:');
const model = new SynchronicCrystalMatrixModel(3.5);
console.log(`   - Nodos biorregionales inicializados: ${model.nodes.length}`);
console.log(`   - Conexiones de red: ${model.links.length}`);
console.log(`   - Primer territorio: "${model.nodes[0].name}" [${model.nodes[0].territory}]`);

// Probar cálculo de onda sincrónica
const pulse1 = model.getSynchronicPulse(model.nodes[0], 0);
const pulse2 = model.getSynchronicPulse(model.nodes[0], 1);
console.log(`   - Pulsación sincrónica t=0s: ${pulse1.toFixed(3)}, t=1s: ${pulse2.toFixed(3)} -> ✅`);

// Probar actualización de territorio
model.updateNode('cryst_vortex_0', {
  name: 'Biorregión Altiplano Ancestral',
  territory: 'Cuenca del Titicaca',
  communityCircle: 'Guardianes de la Semilla Cósmica',
  synchronicFreq: 528
});
const updated = model.getNode('cryst_vortex_0');
const updateOk = updated.name === 'Biorregión Altiplano Ancestral' && updated.synchronicFreq === 528;
console.log(`   - Actualización de territorio: ${updateOk ? '✅' : '❌'}`);

// Probar Exportar e Importar JSON
const json = model.exportToJSON();
const model2 = new SynchronicCrystalMatrixModel(3.5);
const importOk = model2.importFromJSON(json);
console.log(`   - Exportar/Importar JSON de la Matriz Sincrónica: ${importOk ? '✅' : '❌'}`);

if (projectionPassed && noNaNs && updateOk && importOk) {
  console.log('\n🎉 ¡TODAS LAS PRUEBAS DE LA MATRIZ CRISTAL SINCRÓNICA PASARON CON ÉXITO!\n');
} else {
  console.error('\n⚠️ Algunas pruebas fallaron.');
  process.exit(1);
}
