/**
 * RED HUMANA FRACTAL - APLICACIÓN 3D INTERACTIVA
 * 
 * Orquestador principal que integra Three.js, el modelo de red humana,
 * interacción orbital, inspección y edición de geometrías sagradas y fractales.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HumanNetworkModel } from './src/models/networkModel.js';

// =============================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// =============================================================================
const state = {
  model: new HumanNetworkModel(),
  selectedNode: null,
  focusedCategory: null,
  autoRotate: true,
  pulsesActive: true,
  showLabels: false,
  nodeMeshes: new Map(), // nodeId -> THREE.Mesh
  linkLines: null,
  pulseParticles: null,
  labelSprites: new Map(),
  pulseProgress: []
};

// =============================================================================
// CONFIGURACIÓN THREE.JS
// =============================================================================
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x060810, 0.015);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 80;
controls.minDistance = 2;

// =============================================================================
// ILUMINACIÓN Y FONDO CÓSMICO
// =============================================================================
const ambientLight = new THREE.AmbientLight(0x223355, 1.5);
scene.add(ambientLight);

const mainPointLight = new THREE.PointLight(0x00e5ff, 2.5, 50);
mainPointLight.position.set(0, 0, 0);
scene.add(mainPointLight);

const topLight = new THREE.DirectionalLight(0xffeedd, 1.2);
topLight.position.set(10, 20, 15);
scene.add(topLight);

const purpleLight = new THREE.PointLight(0xa855f7, 2, 40);
purpleLight.position.set(-10, -10, -10);
scene.add(purpleLight);

// Campo estelar de fondo (Estrellas de la Nueva Era)
function createStarfield() {
  const count = 2500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 40 + Math.random() * 80;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Variación sutil de color estelar (azul, dorado, blanco)
    const starType = Math.random();
    if (starType < 0.33) {
      colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1.0;
    } else if (starType < 0.66) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0.5;
    } else {
      colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1.0;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  const starfield = new THREE.Points(geometry, material);
  scene.add(starfield);
}
createStarfield();

// =============================================================================
// GRUPO DE LA RED FRACTAL
// =============================================================================
const networkGroup = new THREE.Group();
scene.add(networkGroup);

// Anillo resaltador de selección para el nodo activo
const selectionRingGeo = new THREE.RingGeometry(0.25, 0.32, 32);
const selectionRingMat = new THREE.MeshBasicMaterial({
  color: 0x00e5ff,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.9
});
const selectionRing = new THREE.Mesh(selectionRingGeo, selectionRingMat);
selectionRing.visible = false;
scene.add(selectionRing);

// Geometría base compartida para los nodos
const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);

/**
 * Reconstruye y renderiza la red 3D a partir del modelo.
 */
function renderNetwork() {
  // Limpiar grupo de red previo
  while (networkGroup.children.length > 0) {
    const child = networkGroup.children[0];
    networkGroup.remove(child);
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
      else child.material.dispose();
    }
  }
  state.nodeMeshes.clear();
  state.labelSprites.clear();
  selectionRing.visible = false;

  const { nodes, links } = state.model;

  // 1. Crear Nodos
  nodes.forEach(node => {
    const colorHex = state.model.getNodeColor(node);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness: 0.2,
      metalness: 0.8,
      emissive: new THREE.Color(colorHex),
      emissiveIntensity: 0.45
    });

    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.set(node.position[0], node.position[1], node.position[2]);
    
    // Escala del nodo basada en su nivel fractal
    const scale = node.radius || (0.16 / (node.level * 0.5 + 1));
    mesh.scale.set(scale, scale, scale);
    mesh.userData = { nodeId: node.id, nodeData: node };

    networkGroup.add(mesh);
    state.nodeMeshes.set(node.id, mesh);

    // Crear etiqueta de texto flotante
    const sprite = createTextLabel(node.name, colorHex);
    sprite.position.set(node.position[0], node.position[1] + scale * 1.8, node.position[2]);
    sprite.visible = state.showLabels;
    networkGroup.add(sprite);
    state.labelSprites.set(node.id, sprite);
  });

  // 2. Crear Aristas / Puentes Armónicos
  if (links.length > 0) {
    const linePositions = [];
    const lineColors = [];

    links.forEach(link => {
      const sourceNode = state.model.getNode(link.source);
      const targetNode = state.model.getNode(link.target);
      if (!sourceNode || !targetNode) return;

      linePositions.push(...sourceNode.position, ...targetNode.position);

      const colorSource = new THREE.Color(state.model.getNodeColor(sourceNode));
      const colorTarget = new THREE.Color(state.model.getNodeColor(targetNode));

      // Líneas inter-nivel tienen un tinte áureo brillante
      if (link.type === 'harmonic-bridge') {
        const bridgeColor = new THREE.Color(0xf59e0b);
        lineColors.push(bridgeColor.r, bridgeColor.g, bridgeColor.b);
        lineColors.push(bridgeColor.r, bridgeColor.g, bridgeColor.b);
      } else {
        lineColors.push(colorSource.r, colorSource.g, colorSource.b);
        lineColors.push(colorTarget.r, colorTarget.g, colorTarget.b);
      }
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    state.linkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(state.linkLines);

    // 3. Crear Partículas de Pulso Armónico
    setupPulseParticles(links);
  }

  // Actualizar HUD
  updateHUD();
}

/**
 * Crea etiquetas de texto flotantes como Sprites 2D en Three.js.
 */
function createTextLabel(text, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = 'Bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillStyle = colorHex;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(1.5, 0.38, 1);
  return sprite;
}

/**
 * Inicializa las partículas que viajan por las aristas.
 */
function setupPulseParticles(links) {
  const count = Math.min(links.length, 120);
  const positions = new Float32Array(count * 3);
  state.pulseProgress = [];

  for (let i = 0; i < count; i++) {
    const link = links[i % links.length];
    const sourceNode = state.model.getNode(link.source);
    if (sourceNode) {
      positions[i * 3] = sourceNode.position[0];
      positions[i * 3 + 1] = sourceNode.position[1];
      positions[i * 3 + 2] = sourceNode.position[2];
    }
    state.pulseProgress.push({
      linkIndex: i % links.length,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.006
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.18,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });

  state.pulseParticles = new THREE.Points(geometry, material);
  networkGroup.add(state.pulseParticles);
}

/**
 * Anima las partículas de pulso a lo largo de las conexiones.
 */
function updatePulses() {
  if (!state.pulsesActive || !state.pulseParticles || !state.pulseProgress.length) return;

  const positions = state.pulseParticles.geometry.attributes.position.array;
  const links = state.model.links;

  for (let i = 0; i < state.pulseProgress.length; i++) {
    const p = state.pulseProgress[i];
    p.progress += p.speed;
    if (p.progress > 1.0) p.progress = 0;

    const link = links[p.linkIndex];
    if (!link) continue;
    const s = state.model.getNode(link.source);
    const t = state.model.getNode(link.target);
    if (!s || !t) continue;

    const x = s.position[0] + (t.position[0] - s.position[0]) * p.progress;
    const y = s.position[1] + (t.position[1] - s.position[1]) * p.progress;
    const z = s.position[2] + (t.position[2] - s.position[2]) * p.progress;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  state.pulseParticles.geometry.attributes.position.needsUpdate = true;
}

// =============================================================================
// INTERACCIÓN Y RAYCASTING (SELECCIÓN DE NODOS EN 3D)
// =============================================================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip-3d');
let hoveredMesh = null;

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseClick);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(Array.from(state.nodeMeshes.values()));

  if (intersects.length > 0) {
    document.body.style.cursor = 'pointer';
    const mesh = intersects[0].object;
    hoveredMesh = mesh;
    const node = mesh.userData.nodeData;

    // Posicionar tooltip en pantalla
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY - 12}px`;
    tooltip.style.display = 'block';
    tooltip.innerHTML = `<strong>${node.name}</strong><br><span style="color: ${state.model.getNodeColor(node)};">●</span> ${node.category} · Nivel ${node.level}`;
  } else {
    document.body.style.cursor = 'default';
    tooltip.style.display = 'none';
    hoveredMesh = null;
  }
}

function onMouseClick(event) {
  // Ignorar clics en paneles de interfaz UI
  if (event.target.closest('#top-bar') ||
      event.target.closest('#stats-hud') ||
      event.target.closest('#node-inspector') ||
      event.target.closest('#help-modal')) {
    return;
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(Array.from(state.nodeMeshes.values()));

  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    selectNode(mesh.userData.nodeId);
  }
}

/**
 * Selecciona un nodo, anima la cámara hacia él y abre el inspector.
 */
function selectNode(nodeId) {
  const node = state.model.getNode(nodeId);
  if (!node) return;

  state.selectedNode = node;
  const mesh = state.nodeMeshes.get(nodeId);

  // Posicionar anillo de selección
  if (mesh) {
    selectionRing.position.copy(mesh.position);
    selectionRing.lookAt(camera.position);
    selectionRing.visible = true;

    // Suavizar rotación de cámara hacia el nodo
    const targetVec = new THREE.Vector3(...node.position);
    controls.target.lerp(targetVec, 0.6);
  }

  // Abrir panel inspector y llenar datos
  openInspector(node);
}

// =============================================================================
// INSPECTOR Y EDITOR DE NODOS
// =============================================================================
const inspector = document.getElementById('node-inspector');
const nameInput = document.getElementById('node-name-input');
const categorySelect = document.getElementById('node-category-select');
const colorPicker = document.getElementById('node-color-picker');
const colorLabel = document.getElementById('node-color-label');
const resonanceSlider = document.getElementById('node-resonance-slider');
const resonanceVal = document.getElementById('resonance-val');
const coordsDisplay = document.getElementById('node-coords-display');
const levelDisplay = document.getElementById('node-level-display');
const archetypeDisplay = document.getElementById('node-archetype-display');
const descInput = document.getElementById('node-desc-input');
const connectionsList = document.getElementById('connections-list');
const connectionsCount = document.getElementById('connections-count');
const inspectorTitle = document.getElementById('inspector-title');
const inspectorDot = document.getElementById('inspector-color-dot');

function openInspector(node) {
  inspectorTitle.textContent = node.id;
  const currentColor = state.model.getNodeColor(node);
  inspectorDot.style.background = currentColor;

  nameInput.value = node.name;
  descInput.value = node.description || '';

  // Actualizar opciones de categoría
  categorySelect.innerHTML = '';
  Object.keys(state.model.categories).forEach(catName => {
    const opt = document.createElement('option');
    opt.value = catName;
    opt.textContent = catName;
    if (catName === node.category) opt.selected = true;
    categorySelect.appendChild(opt);
  });

  colorPicker.value = currentColor;
  colorLabel.textContent = currentColor;

  resonanceSlider.value = node.resonance ?? 1;
  resonanceVal.textContent = `${Math.round((node.resonance ?? 1) * 100)}%`;

  coordsDisplay.innerHTML = `
    <span>X: ${node.position[0].toFixed(3)}</span>
    <span>Y: ${node.position[1].toFixed(3)}</span>
    <span>Z: ${node.position[2].toFixed(3)}</span>
  `;

  levelDisplay.value = `Nivel ${node.level}`;
  archetypeDisplay.value = node.archetype;

  // Llenar conexiones
  connectionsList.innerHTML = '';
  connectionsCount.textContent = node.connections ? node.connections.length : 0;
  if (node.connections && node.connections.length > 0) {
    node.connections.forEach(connId => {
      const connNode = state.model.getNode(connId);
      if (!connNode) return;
      const chip = document.createElement('div');
      chip.className = 'connection-chip';
      chip.textContent = connNode.name.split(' ')[0] + ' (' + connNode.id + ')';
      chip.title = `Ir al nodo ${connNode.name}`;
      chip.addEventListener('click', () => selectNode(connId));
      connectionsList.appendChild(chip);
    });
  } else {
    connectionsList.innerHTML = '<span style="font-size: 11px; color: var(--text-muted);">Sin conexiones directas</span>';
  }

  inspector.classList.add('open');
}

function saveNodeFromInspector() {
  if (!state.selectedNode) return;
  const nodeId = state.selectedNode.id;

  const updates = {
    name: nameInput.value,
    category: categorySelect.value,
    description: descInput.value,
    resonance: parseFloat(resonanceSlider.value),
    color: colorPicker.value
  };

  state.model.updateNode(nodeId, updates);

  // Actualizar material de la malla en 3D
  const mesh = state.nodeMeshes.get(nodeId);
  if (mesh) {
    mesh.material.color.set(updates.color);
    mesh.material.emissive.set(updates.color);
  }

  // Actualizar etiqueta flotante
  const sprite = state.labelSprites.get(nodeId);
  if (sprite) {
    sprite.visible = false;
    // Reemplazar etiqueta
    networkGroup.remove(sprite);
    const newSprite = createTextLabel(updates.name, updates.color);
    newSprite.position.set(
      state.selectedNode.position[0],
      state.selectedNode.position[1] + (state.selectedNode.radius || 0.16) * 1.8,
      state.selectedNode.position[2]
    );
    newSprite.visible = state.showLabels;
    networkGroup.add(newSprite);
    state.labelSprites.set(nodeId, newSprite);
  }

  updateHUD();
}

// Eventos de inputs del inspector
nameInput.addEventListener('input', saveNodeFromInspector);
categorySelect.addEventListener('change', () => {
  const cat = state.model.categories[categorySelect.value];
  if (cat) {
    colorPicker.value = cat.color;
    colorLabel.textContent = cat.color;
  }
  saveNodeFromInspector();
});
colorPicker.addEventListener('input', (e) => {
  colorLabel.textContent = e.target.value;
  saveNodeFromInspector();
});
resonanceSlider.addEventListener('input', (e) => {
  resonanceVal.textContent = `${Math.round(parseFloat(e.target.value) * 100)}%`;
  saveNodeFromInspector();
});
descInput.addEventListener('input', saveNodeFromInspector);
document.getElementById('btn-save-node').addEventListener('click', () => {
  saveNodeFromInspector();
  inspector.classList.remove('open');
});
document.getElementById('btn-close-inspector').addEventListener('click', () => {
  inspector.classList.remove('open');
});

// =============================================================================
// ACTUALIZACIÓN DE HUD Y FILTRO POR CATEGORÍAS
// =============================================================================
function updateHUD() {
  const stats = state.model.getStats();
  const meta = state.model.metadata;

  document.getElementById('hud-solid-name').textContent = meta.solidName || state.model.activeSolid;
  document.getElementById('hud-archetype').textContent = meta.archetype || 'Éter';
  document.getElementById('hud-depth').textContent = `Nivel ${state.model.activeDepth}`;
  document.getElementById('hud-nodes-count').textContent = stats.totalNodes;
  document.getElementById('hud-links-count').textContent = stats.totalLinks;

  // Actualizar lista de categorías con pastillas interactivas
  const pillsContainer = document.getElementById('category-pills-list');
  pillsContainer.innerHTML = '';

  stats.categoriesList.forEach(catName => {
    const cat = state.model.categories[catName];
    const count = stats.categoryCounts[catName] || 0;
    if (count === 0 && !cat) return;

    const pill = document.createElement('div');
    pill.className = 'pill-item';
    if (state.focusedCategory === catName) {
      pill.style.borderColor = cat.color;
      pill.style.background = 'rgba(255, 255, 255, 0.15)';
    }

    pill.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span class="pill-color" style="background: ${cat.color}; color: ${cat.color};"></span>
        <span>${catName}</span>
      </div>
      <span style="color: var(--text-muted); font-family: var(--font-mono);">${count}</span>
    `;

    // Clic para filtrar/enfocar en 3D
    pill.addEventListener('click', () => toggleCategoryFocus(catName));
    pillsContainer.appendChild(pill);
  });
}

/**
 * Resalta los nodos de una categoría y atenúa los demás en 3D.
 */
function toggleCategoryFocus(catName) {
  if (state.focusedCategory === catName) {
    state.focusedCategory = null;
    // Restaurar opacidad completa
    state.nodeMeshes.forEach(mesh => {
      mesh.material.opacity = 1.0;
      mesh.material.transparent = false;
    });
    if (state.linkLines) state.linkLines.material.opacity = 0.45;
  } else {
    state.focusedCategory = catName;
    state.nodeMeshes.forEach(mesh => {
      const isMatch = mesh.userData.nodeData.category === catName;
      mesh.material.transparent = true;
      mesh.material.opacity = isMatch ? 1.0 : 0.15;
    });
    if (state.linkLines) state.linkLines.material.opacity = 0.1;
  }
  updateHUD();
}

// =============================================================================
// CONTROLES DE LA BARRA SUPERIOR
// =============================================================================
const solidSelect = document.getElementById('solid-select');
const depthSelect = document.getElementById('depth-select');
const btnToggleRot = document.getElementById('btn-toggle-rotation');
const rotStatus = document.getElementById('rot-status');
const btnTogglePulse = document.getElementById('btn-toggle-pulse');
const pulseStatus = document.getElementById('pulse-status');
const btnToggleLabels = document.getElementById('btn-toggle-labels');
const labelsStatus = document.getElementById('labels-status');

solidSelect.addEventListener('change', (e) => {
  state.model.generate(e.target.value, parseInt(depthSelect.value));
  renderNetwork();
});

depthSelect.addEventListener('change', (e) => {
  state.model.generate(solidSelect.value, parseInt(e.target.value));
  renderNetwork();
});

btnToggleRot.addEventListener('click', () => {
  state.autoRotate = !state.autoRotate;
  rotStatus.textContent = state.autoRotate ? 'ON' : 'OFF';
  btnToggleRot.style.borderColor = state.autoRotate ? 'var(--accent-cyan)' : 'var(--border-glass)';
});

btnTogglePulse.addEventListener('click', () => {
  state.pulsesActive = !state.pulsesActive;
  pulseStatus.textContent = state.pulsesActive ? 'ON' : 'OFF';
  if (state.pulseParticles) state.pulseParticles.visible = state.pulsesActive;
});

btnToggleLabels.addEventListener('click', () => {
  state.showLabels = !state.showLabels;
  labelsStatus.textContent = state.showLabels ? 'ON' : 'OFF';
  state.labelSprites.forEach(sprite => sprite.visible = state.showLabels);
});

// Crear categoría personalizada
document.getElementById('btn-add-category').addEventListener('click', () => {
  const name = prompt('Nombre de la nueva categoría o rol humano:');
  if (name && name.trim()) {
    const colors = ['#00e5ff', '#ff007f', '#39ff14', '#ffe600', '#bf00ff', '#ff6600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    state.model.addCategory(name.trim(), randomColor);
    updateHUD();
    alert(`Categoría "${name.trim()}" agregada.`);
  }
});

// Exportar Red en formato JSON
document.getElementById('btn-export').addEventListener('click', () => {
  const jsonStr = state.model.exportToJSON();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `red_humana_fractal_${state.model.activeSolid}_nivel${state.model.activeDepth}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// Importar Red desde archivo JSON
const fileInput = document.getElementById('file-input');
document.getElementById('btn-import').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const success = state.model.importFromJSON(evt.target.result);
    if (success) {
      solidSelect.value = state.model.activeSolid;
      depthSelect.value = state.model.activeDepth;
      renderNetwork();
      alert('¡Red fractal cargada exitosamente!');
    } else {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
});

// Captura de Pantalla PNG
document.getElementById('btn-snapshot').addEventListener('click', () => {
  renderer.render(scene, camera);
  const dataURL = renderer.domElement.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = `red_fractal_${Date.now()}.png`;
  a.click();
});

// Modal de Ayuda
const helpModal = document.getElementById('help-modal');
document.getElementById('btn-help').addEventListener('click', () => helpModal.classList.add('open'));
document.getElementById('btn-close-modal').addEventListener('click', () => helpModal.classList.remove('open'));
helpModal.addEventListener('click', (e) => {
  if (e.target === helpModal) helpModal.classList.remove('open');
});

// Redimensión de Ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// =============================================================================
// BUCLE DE ANIMACIÓN
// =============================================================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  // Rotación cósmica armónica
  if (state.autoRotate) {
    networkGroup.rotation.y += 0.002;
    networkGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
  }

  // Pulsaciones armónicas en las aristas
  updatePulses();

  // Mantener anillo de selección orientado a la cámara
  if (selectionRing.visible) {
    selectionRing.lookAt(camera.position);
    const pulseScale = 1.0 + Math.sin(clock.getElapsedTime() * 4) * 0.08;
    selectionRing.scale.set(pulseScale, pulseScale, pulseScale);
  }

  controls.update();
  renderer.render(scene, camera);
}

// =============================================================================
// INICIALIZACIÓN
// =============================================================================
state.model.generate('dodecahedron', 1);
renderNetwork();
animate();
