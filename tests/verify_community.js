/**
 * VERIFICACIÓN DEL MODELO DE RED COMUNITARIA FRACTAL 2D
 * 
 * Prueba automatizada para los 5 elementos, propuestas, membresías de sostén,
 * cálculos de vitalidad, balance pentagonal y persistencia JSON.
 */

import { CommunityFractalModel, SACRED_ELEMENTS, MEMBERSHIP_TIERS } from '../src/models/communityModel.js';

console.log('🌌 ================================================================');
console.log('   VERIFICACIÓN DEL MODELO COMUNITARIO FRACTAL 2D');
console.log('   5 Elementos · Propuestas · Membresías de Sostén · Vitalidad');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASÓ] ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FALLÓ] ${message}`);
  }
}

const model = new CommunityFractalModel();

// 1. Estado Inicial de "La Nada" (Vacío Primordial)
console.log('1. Verificación del Vacío Primordial (Nivel 0: La Nada):');
model.resetToVoid();
assert(model.communities.length === 0, 'Inicia en el vacío sin comunidades');
assert(model.activeLevel === 0, 'El nivel activo es 0 (El Vacío)');
assert(model.selectedNode === null, 'No hay nodo seleccionado en el vacío');

// 2. Manifestación del Primer Elemento / Semilla Comunitaria
console.log('\n2. Manifestación de la Semilla Comunitaria (Nivel 1):');
const comm = model.createCommunity({
  name: 'Aldea Fractal Cósmica',
  vision: 'Célula regenerativa de transición planetaria.',
  x: 0,
  y: 0,
  initProposals: true
});

assert(model.communities.length === 1, 'Se manifestó la comunidad en el plano');
assert(model.activeLevel === 1, 'El nivel activo avanzó automáticamente a 1');
assert(comm.name === 'Aldea Fractal Cósmica', 'El nombre de la comunidad es correcto');

// 3. Verificación de los 5 Elementos Sagrados
console.log('\n3. Verificación de los 5 Elementos Sagrados:');
const expectedElements = ['fuego', 'tierra', 'aire', 'agua', 'eter'];
const presentElements = Object.keys(comm.elements);
assert(presentElements.length === 5, 'Contiene exactamente 5 elementos');

expectedElements.forEach(key => {
  const elem = comm.elements[key];
  assert(elem !== undefined, `Elemento '${key}' está presente`);
  assert(elem.name === SACRED_ELEMENTS[key].name, `Nombre de '${key}' es '${elem.name}'`);
  assert(elem.proposals.length > 0, `Elemento '${key}' tiene propuesta inicial predefinida`);
});

// 4. Creación de Propuestas en Elementos
console.log('\n4. Creación de Propuestas por Elemento:');
const propFuego = model.addProposal(comm.id, 'fuego', {
  title: 'Círculo de Tambores e Iniciación',
  description: 'Ritual de fuego para activar la voluntad creadora.',
  energyNeeded: 12
});
assert(propFuego !== null, 'Se agregó propuesta en Fuego');
assert(comm.elements.fuego.proposals.length === 2, 'Fuego ahora tiene 2 propuestas');

const propTierra = model.addProposal(comm.id, 'tierra', {
  title: 'Compostaje Comunitario & Lombricultura',
  description: 'Regeneración de suelos y nutrición del huerto.',
  energyNeeded: 8
});
assert(propTierra !== null, 'Se agregó propuesta en Tierra');

// 5. Sistema de Membresías y Sostén
console.log('\n5. Sistema de Membresías como Pilar de Sostén:');
const memberPilar = model.addMember(comm.id, {
  name: 'Sara Gaia',
  role: 'Pilar de Tierra & Bio-arquitectura',
  tierKey: 'pilar',
  resonanceElement: 'tierra',
  contributionType: 'Recursos y tiempo',
  contributionValue: '20 hrs/mes'
});
assert(memberPilar !== null, 'Se sumó miembro con membresía Pilar');
assert(memberPilar.sustainPoints === 10, 'Membresía Pilar otorga 10 puntos de sostén');

const memberGuardian = model.addMember(comm.id, {
  name: 'Ignacio Fuego',
  role: 'Guardián del Fuego',
  tierKey: 'guardian',
  resonanceElement: 'fuego',
  contributionType: 'Facilitación de iniciativas',
  contributionValue: '15 hrs/mes'
});
assert(memberGuardian.sustainPoints === 15, 'Membresía Guardián otorga 15 puntos de sostén');

// 6. Vinculación Recíproca de Miembros con Propuestas
console.log('\n6. Vinculación de Integrantes a Propuestas:');
model.linkMemberToProposal(comm.id, memberFuego() ? memberFuego().id : memberGuardian.id, propFuego.id);
function memberFuego() { return memberGuardian; }
assert(propFuego.memberIds.includes(memberGuardian.id), 'Guardián está vinculado a la propuesta de Fuego');
assert(memberGuardian.proposalIds.includes(propFuego.id), 'Propuesta registrada en el perfil del Guardián');

// 7. Diagnósticos Holísticos: Métricas de Sostén y Vitalidad
console.log('\n7. Métricas de Vitalidad, Sostén y Balance Pentagonal:');
const metrics = model.getCommunityMetrics(comm.id);
assert(metrics.totalMembers === 2, 'Total de miembros registrados: 2');
assert(metrics.sustainPoints === 25, 'Total de puntos de sostén: 25 (10 + 15)');
assert(metrics.energyDemand > 0, `Demanda energética calculada: ${metrics.energyDemand}`);
assert(metrics.sustainRatio > 0 && metrics.sustainRatio <= 100, `Ratio de sostén válido: ${metrics.sustainRatio}%`);
assert(metrics.pentagonalBalance >= 0 && metrics.pentagonalBalance <= 100, `Balance pentagonal: ${metrics.pentagonalBalance}%`);
assert(metrics.vitalityScore >= 0 && metrics.vitalityScore <= 100, `Índice de Vitalidad Comunitaria: ${metrics.vitalityScore}%`);

// 8. Preset Semilla Viva & Persistencia JSON
console.log('\n8. Carga de Semilla Viva y Serialización JSON:');
const living = model.loadLivingCommunityPreset();
assert(living.members.length >= 7, `Preset Semilla Viva cargó ${living.members.length} miembros activos`);
const livingMetrics = model.getCommunityMetrics(living.id);
assert(livingMetrics.vitalityScore > 50, `Comunidad Viva goza de alta vitalidad: ${livingMetrics.vitalityScore}%`);

const jsonExport = model.exportJSON();
assert(typeof jsonExport === 'string' && jsonExport.includes('Comunidad Fractal Avalon'), 'Exportación JSON exitosa');

const cleanModel = new CommunityFractalModel();
const imported = cleanModel.importJSON(jsonExport);
assert(imported === true, 'Importación JSON exitosa');
assert(cleanModel.communities.length === 1, 'Comunidad restaurada correctamente');
assert(cleanModel.communities[0].members.length === living.members.length, 'Integrantes y membresías restaurados íntegros');

console.log('\n================================================================');
console.log(`RESUMEN: ${passedTests} de ${totalTests} pruebas superadas.`);
console.log('================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
