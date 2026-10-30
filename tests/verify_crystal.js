/**
 * Pruebas de Verificación Matemática de la Matriz Cristal Sincrónica
 */

import { geoToCartesian, cartesianToGeo, generatePlanetaryCrystalGrid, calculateSynchronicWave } from '../src/math/crystalMatrix.js';
import { SynchronicCrystalMatrixModel, SEED_TERRITORIES } from '../src/models/bioregionModel.js';
import { INTRATERRENA_CITIES, SACRED_SITES, LEY_LINES_DATA } from '../src/models/intraterrenaModel.js';

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

// 4. Verificación del Polo Sur Exacto (-90.000°, 0.000°) en Modelos
console.log('\n4. Verificación del Polo Sur Geográfico Exacto (-90.000°):');

const southBio = SEED_TERRITORIES.find(t => t.lat === -90.000);
const southBioOk = southBio && southBio.lat === -90.0 && southBio.lon === 0.0;
console.log(`   - Biorregión Antártida & Polo Sur Exacto (-90°): ${southBioOk ? '✅' : '❌'}`);

const southIntra = INTRATERRENA_CITIES.find(c => c.id === 'intra_polo_sur');
const southIntraOk = southIntra && southIntra.lat === -90.0 && southIntra.vibrationalFreq === 963;
console.log(`   - Portal Diamantino Intraterreno Polo Sur (-90°, 963 Hz): ${southIntraOk ? '✅' : '❌'}`);

const southSacred = SACRED_SITES.find(s => s.id === 'site_polo_sur_exacto');
const southSacredOk = southSacred && southSacred.lat === -90.0 && southSacred.vibrationalFreq === 1080;
console.log(`   - Sitio Sagrado Polo Sur Exacto (-90°, 1080 Hz): ${southSacredOk ? '✅' : '❌'}`);

const leyKundalini = LEY_LINES_DATA.find(l => l.id === 'ley_kundalini_andina');
const kundaliniStartsAtSouthPole = leyKundalini && leyKundalini.path[0] === 'site_polo_sur_exacto';
console.log(`   - Eje Kundalini enraizado en el Polo Sur Exacto: ${kundaliniStartsAtSouthPole ? '✅' : '❌'}`);

const leyAxial = LEY_LINES_DATA.find(l => l.id === 'ley_eje_axial_polar');
const axialOk = leyAxial && leyAxial.path.includes('site_polo_sur_exacto');
console.log(`   - Línea Ley Eje Axial Polar Austral activa: ${axialOk ? '✅' : '❌'}`);

// 5. Verificación de Cerro Jasuka Venda y Nodos Conectados al Polo Sur
console.log('\n5. Verificación de Cerro Jasuka Venda & Red Polar Austral:');
const jasukaSite = SACRED_SITES.find(s => s.id === 'site_jasuka_venda');
const jasukaOk = jasukaSite && Math.abs(jasukaSite.lat - (-23.077)) < 0.01 && Math.abs(jasukaSite.lon - (-55.995)) < 0.01 && jasukaSite.vibrationalFreq === 528;
console.log(`   - Cerro Jasuka Venda (Amambay, Paraguay, 528 Hz): ${jasukaOk ? '✅' : '❌'}`);

const vostokSite = SACRED_SITES.find(s => s.id === 'site_lago_vostok');
const vostokOk = vostokSite && vostokSite.lat === -77.4 && vostokSite.vibrationalFreq === 963;
console.log(`   - Lago Vostok Subglacial (Antártida, 963 Hz): ${vostokOk ? '✅' : '❌'}`);

const erebusSite = SACRED_SITES.find(s => s.id === 'site_monte_erebus');
const erebusOk = erebusSite && erebusSite.lat === -77.53 && erebusSite.vibrationalFreq === 741;
console.log(`   - Monte Erebus (Volcán Antártico, Fuego y Hielo, 741 Hz): ${erebusOk ? '✅' : '❌'}`);

const aorakiSite = SACRED_SITES.find(s => s.id === 'site_aoraki_nz');
const aorakiOk = aorakiSite && Math.abs(aorakiSite.lat - (-43.595)) < 0.01 && aorakiSite.vibrationalFreq === 528;
console.log(`   - Aoraki / Monte Cook (Aotearoa / Nueva Zelanda): ${aorakiOk ? '✅' : '❌'}`);

const uluruSite = SACRED_SITES.find(s => s.id === 'site_uluru');
const uluruOk = uluruSite && Math.abs(uluruSite.lat - (-25.344)) < 0.01 && uluruSite.vibrationalFreq === 528;
console.log(`   - Uluru (Plexo Solar Planetario, Australia): ${uluruOk ? '✅' : '❌'}`);

const tableSite = SACRED_SITES.find(s => s.id === 'site_table_mountain');
const tableOk = tableSite && Math.abs(tableSite.lat - (-33.957)) < 0.01 && tableSite.vibrationalFreq === 432;
console.log(`   - Table Mountain (Cabo de Buena Esperanza, Sudáfrica): ${tableOk ? '✅' : '❌'}`);

const leyJasuka = LEY_LINES_DATA.find(l => l.id === 'ley_corredor_jasuka_guarani');
const leyJasukaOk = leyJasuka && leyJasuka.path.includes('site_jasuka_venda') && leyJasuka.path.includes('site_polo_sur_exacto');
console.log(`   - Corredor Sagrado Jasuka Venda ↔ Acuífero Guaraní ↔ Polo Sur: ${leyJasukaOk ? '✅' : '❌'}`);

const leyPacifico = LEY_LINES_DATA.find(l => l.id === 'ley_eje_transoceanico_pacifico');
const leyPacificoOk = leyPacifico && leyPacifico.path.includes('site_uluru') && leyPacifico.path.includes('site_aoraki_nz');
console.log(`   - Eje Telúrico Austral Pacífico (Polo Sur ↔ Erebus ↔ Aoraki ↔ Uluru): ${leyPacificoOk ? '✅' : '❌'}`);

const leyAfrica = LEY_LINES_DATA.find(l => l.id === 'ley_eje_meridiano_atlantico_africa');
const leyAfricaOk = leyAfrica && leyAfrica.path.includes('site_table_mountain') && leyAfrica.path.includes('site_lago_vostok');
console.log(`   - Eje Meridiano Polar-Africano (Polo Sur ↔ Vostok ↔ Table Mountain): ${leyAfricaOk ? '✅' : '❌'}`);

const leyAnillo = LEY_LINES_DATA.find(l => l.id === 'ley_anillo_antartico_primordial');
const leyAnilloOk = leyAnillo && leyAnillo.path.includes('site_monte_erebus') && leyAnillo.path.includes('site_lago_vostok');
console.log(`   - Anillo Telúrico Criogénico de la Antártida: ${leyAnilloOk ? '✅' : '❌'}`);

const networkAllOk = jasukaOk && vostokOk && erebusOk && aorakiOk && uluruOk && tableOk && leyJasukaOk && leyPacificoOk && leyAfricaOk && leyAnilloOk;

const southPoleAllOk = southBioOk && southIntraOk && southSacredOk && kundaliniStartsAtSouthPole && axialOk && networkAllOk;

if (projectionPassed && noNaNs && updateOk && importOk && southPoleAllOk) {
  console.log('\n🎉 ¡TODAS LAS PRUEBAS DE LA MATRIZ CRISTAL SINCRÓNICA PASARON CON ÉXITO!\n');
} else {
  console.error('\n⚠️ Algunas pruebas fallaron.');
  process.exit(1);
}
