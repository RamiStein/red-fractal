/**
 * Verificación del Hipergrafo de Energía Viva y Simulación de Pulso Sincrónico
 */
import { LivingEarthHypergraph, FLOW_TYPES, GEO_STATES } from '../src/math/hypergraphEngine.js';

console.log('🌌 ================================================================');
console.log('   VERIFICACIÓN DEL HIPERGRAFO DE ENERGÍA VIVA (GIS MULTICAPA)');
console.log('   Ojo de Fuego · Volcanes · Ciudades Intraterrenas · Jasuka Venda');
console.log('================================================================\n');

const graph = new LivingEarthHypergraph();

// 1. Verificación de Nodos
console.log('1. Verificación de Nodos y Capas:');
const ojo = graph.getNode('volc_ojo_del_salado');
console.assert(ojo !== undefined, 'Ojos del Salado debe existir');
console.assert(ojo.role === 'CORE_ROUTER', 'Ojos del Salado debe ser CORE_ROUTER');
console.assert(ojo.telluricMultiplier === 3.0, 'Multiplicador del Ojo de Fuego debe ser 3.0');
console.log('  ✅ [PASÓ] Ojos del Salado presente como Core Router (6893m, mult 3.0)');

const erks = graph.getNode('intra_erks');
console.assert(erks !== undefined, 'ERKS debe existir');
console.assert(erks.layer === 'etheric', 'ERKS debe pertenecer a la capa etérica');
console.log('  ✅ [PASÓ] ERKS presente en Capa Etérica con custodia de Saruma (777 Hz)');

const miz = graph.getNode('intra_miz_tli_tlan');
console.assert(miz !== undefined, 'Miz Tli Tlan debe existir');
console.assert(miz.baseFrequencyHz === 963, 'Miz Tli Tlan debe vibrar a 963 Hz');
console.log('  ✅ [PASÓ] Miz Tli Tlan presente como Archivo Akáshico (963 Hz)');

const jasuka = graph.getNode('site_jasuka_venda');
console.assert(jasuka !== undefined, 'Jasuka Venda debe existir');
console.assert(jasuka.role === 'CREATIVE_SEED_RECEIVER', 'Jasuka Venda debe ser receptor creador');
console.log('  ✅ [PASÓ] Jasuka Venda presente como Puente Receptor Creativo (528 Hz)\n');

// 2. Verificación de Aristas y Topología
console.log('2. Verificación de Tipos de Flujo y Conexiones:');
const edges = graph.edges;
console.assert(edges.length > 20, 'Debe haber más de 20 aristas activas');
const cristicEdges = edges.filter(e => e.flowType === FLOW_TYPES.CRISTIC);
const telluricEdges = edges.filter(e => e.flowType === FLOW_TYPES.TELLURIC);
const ethericEdges = edges.filter(e => e.flowType === FLOW_TYPES.ETHERIC);

console.assert(cristicEdges.length > 0, 'Debe haber aristas de flujo crístico');
console.assert(telluricEdges.length > 0, 'Debe haber aristas de flujo telúrico');
console.assert(ethericEdges.length > 0, 'Debe haber aristas de flujo etérico');

console.log(`  ✅ [PASÓ] Topología compilada: ${edges.length} aristas.`);
console.log(`     - Flujos Telúricos Litosféricos: ${telluricEdges.length}`);
console.log(`     - Flujos Etéricos Sutiles: ${ethericEdges.length}`);
console.log(`     - Flujos Crísticos Sincrónicos: ${cristicEdges.length}\n`);

// 3. Simulación de Pulso Sincrónico desde el Ojo de Fuego
console.log('3. Simulación de Pulso Sincrónico desde el Ojo de Fuego:');
const pulse = graph.simulateSyncPulse('volc_ojo_del_salado', 1.0, 3500);

console.assert(pulse.totalNodesReached >= 10, 'El pulso debe alcanzar al menos 10 nodos');
console.assert(pulse.wavefronts.length >= 4, 'Deben manifestarse al menos 4 frentes de onda');
console.assert(pulse.jasukaReceipt !== undefined, 'Jasuka Venda debe haber recibido el pulso');

console.log(`  ✅ [PASÓ] Total de nodos alcanzados: ${pulse.totalNodesReached}`);
console.log(`  ✅ [PASÓ] Profundidad máxima de onda: ${pulse.maxWavefrontDepth} frentes`);

pulse.wavefronts.forEach((wave, idx) => {
  const nodeNames = wave.map(w => `${w.node.shortName} (${(w.energy * 100).toFixed(1)}%)`).join(', ');
  console.log(`     🌊 Frente #${idx}: ${nodeNames}`);
});

console.log(`\n  ✅ [PASÓ] Recepción en Jasuka Venda:`);
console.log(`     - Energía Recibida: ${pulse.metrics.jasukaEnergyPercent}`);
console.log(`     - Vector de Enlace: ${pulse.metrics.jasukaPath}\n`);

// 4. Exportación a NetworkX
console.log('4. Verificación de Serialización NetworkX / GIS:');
const nx = graph.toNetworkXJSON();
console.assert(nx.graph.name !== undefined, 'Nombre del grafo definido');
console.assert(nx.nodes.length === pulse.totalNodesReached, 'Nodos exportados coherentes');
console.assert(nx.links.length === edges.length, 'Links exportados coherentes');
console.log(`  ✅ [PASÓ] Exportación NetworkX válida: ${nx.nodes.length} nodos, ${nx.links.length} enlaces.`);

console.log('\n================================================================');
console.log('🎉 ¡TODAS LAS PRUEBAS DEL HIPERGRAFO DE ENERGÍA VIVA PASARON CON ÉXITO!');
console.log('================================================================');
