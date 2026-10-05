/**
 * MODELO DE RED COMUNITARIA FRACTAL 2D
 * 
 * Modela comunidades que emergen desde el Vacío Primordial ("La Nada"),
 * estructuradas bajo los 5 Elementos sagrados (Fuego, Tierra, Aire, Agua, Éter),
 * con propuestas activas y un sistema de membresías como pilar fundamental de sostén.
 */

export const SACRED_ELEMENTS = {
  fuego: {
    id: 'fuego',
    name: 'Fuego',
    archetype: 'Iniciación & Voluntad',
    icon: '🔥',
    color: '#ff4757',
    glowColor: 'rgba(255, 71, 87, 0.45)',
    description: 'Chispa creadora, activación de proyectos, toma de acción, coraje y energía transformadora.',
    defaultProposals: [
      { title: 'Taller de Iniciación Comunitaria', description: 'Activación de nuevos proyectos e impulso creador para la red.', energyNeeded: 10 }
    ]
  },
  tierra: {
    id: 'tierra',
    name: 'Tierra',
    archetype: 'Sostén & Estructura',
    icon: '🌱',
    color: '#2ed573',
    glowColor: 'rgba(46, 213, 115, 0.45)',
    description: 'Hábitat, recursos materiales, huertos comunitarios, bio-construcción y sostenibilidad económica.',
    defaultProposals: [
      { title: 'Huerto & Banco de Semillas', description: 'Soberanía alimentaria y custodia de semillas ancestrales.', energyNeeded: 15 }
    ]
  },
  aire: {
    id: 'aire',
    name: 'Aire',
    archetype: 'Comunicación & Red',
    icon: '💨',
    color: '#ffa502',
    glowColor: 'rgba(255, 165, 2, 0.45)',
    description: 'Saberes compartidos, red de comunicación, difusión libre, pedagogía y pensamiento claro.',
    defaultProposals: [
      { title: 'Círculo de Saberes y Difusión Abierta', description: 'Talleres libres, podcast comunitario y puente de información.', energyNeeded: 8 }
    ]
  },
  agua: {
    id: 'agua',
    name: 'Agua',
    archetype: 'Cohesión & Relaciones',
    icon: '💧',
    color: '#1e90ff',
    glowColor: 'rgba(30, 144, 255, 0.45)',
    description: 'Empatía vincular, cuidado afectivo, arte, celebraciones grupales y armonía emocional.',
    defaultProposals: [
      { title: 'Círculo de Cuidado & Encuentros de Arte', description: 'Espacio de escucha activa, contención emocional y música compartida.', energyNeeded: 12 }
    ]
  },
  eter: {
    id: 'eter',
    name: 'Éter',
    archetype: 'Gobernanza & Sabiduría',
    icon: '✨',
    color: '#9b59b6',
    glowColor: 'rgba(155, 89, 182, 0.45)',
    description: 'Propósito trascendente, visión holística, asamblea de consensos y conexión cósmica.',
    defaultProposals: [
      { title: 'Asamblea de Visión & Acuerdos Éticos', description: 'Gobernanza distribuida, decisiones por consentimiento y brújula evolutiva.', energyNeeded: 10 }
    ]
  }
};

export const MEMBERSHIP_TIERS = {
  semilla: {
    id: 'semilla',
    name: 'Semilla',
    badge: '🌱',
    color: '#a4b0be',
    sustainPoints: 2,
    description: 'Integrante nuevo en fase de exploración y resonancia. Aporta presencia y energía de bienvenida.'
  },
  colaborador: {
    id: 'colaborador',
    name: 'Colaborador Activo',
    badge: '⚡',
    color: '#70a1ff',
    sustainPoints: 5,
    description: 'Participa activamente en propuestas de los elementos con tiempo, habilidades concretas y esfuerzo.'
  },
  pilar: {
    id: 'pilar',
    name: 'Pilar Sostén',
    badge: '💎',
    color: '#2ed573',
    sustainPoints: 10,
    description: 'Sostenedor troncal que brinda recursos recurrentes, estabilidad y custodia continua a la comunidad.'
  },
  guardian: {
    id: 'guardian',
    name: 'Guardián del Círculo',
    badge: '🛡️',
    color: '#eccc68',
    sustainPoints: 15,
    description: 'Responsable de cuidar la coherencia del elemento, facilitación de acuerdos y guía de nuevos integrantes.'
  },
  resonante: {
    id: 'resonante',
    name: 'Nodo Resonante',
    badge: '🔮',
    color: '#ff6b81',
    sustainPoints: 8,
    description: 'Enlace inter-comunitario que conecta esta comunidad con otros nodos de la red fractal planetaria.'
  }
};

export class CommunityFractalModel {
  constructor() {
    this.communities = [];
    this.selectedNode = null; // { type: 'community'|'element'|'proposal'|'member', data, communityId }
    this.activeLevel = 0; // 0: Vacío, 1: Red de Comunidades, 2: Propuestas por Elemento, 3: Membresías
    this.listeners = new Set();
    this.storageKey = 'red_fractal_comunitaria_v1';
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const cb of this.listeners) {
      try { cb(this); } catch (e) { console.error('Error en suscriptor de modelo:', e); }
    }
  }

  /**
   * Resetea el modelo al estado primordial de "La Nada" (Vacío)
   */
  resetToVoid() {
    this.communities = [];
    this.selectedNode = null;
    this.activeLevel = 0;
    this.notify();
    this.saveToStorage();
    return this;
  }

  /**
   * Crea una nueva comunidad con sus 5 elementos y capacidades internas
   */
  createCommunity({
    name = 'Comunidad Semilla',
    vision = 'Célula de regeneración y florecimiento humano en la nueva era.',
    x = 0,
    y = 0,
    initProposals = true
  } = {}) {
    const id = 'comm_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    
    // Generar los 5 elementos con geometría pentagonal
    const elements = {};
    const elementKeys = ['eter', 'aire', 'tierra', 'agua', 'fuego'];
    const radius = 180; // Distancia radial en el plano 2D respecto al centro de la comunidad

    elementKeys.forEach((key, index) => {
      // Distribución pentagonal áurea: ángulo de -90° (arriba) para Éter
      const angle = (-Math.PI / 2) + (index * 2 * Math.PI / 5);
      const def = SACRED_ELEMENTS[key];
      
      const elementNode = {
        id: `${id}_elem_${key}`,
        key,
        name: def.name,
        archetype: def.archetype,
        icon: def.icon,
        color: def.color,
        glowColor: def.glowColor,
        description: def.description,
        relativeX: Math.cos(angle) * radius,
        relativeY: Math.sin(angle) * radius,
        proposals: []
      };

      if (initProposals && def.defaultProposals) {
        def.defaultProposals.forEach((pDef, pIdx) => {
          elementNode.proposals.push({
            id: `${id}_prop_${key}_${pIdx + 1}`,
            elementKey: key,
            title: pDef.title,
            description: pDef.description,
            energyNeeded: pDef.energyNeeded,
            status: 'activa', // 'brote' | 'activa' | 'nutrida' | 'completada'
            createdAt: new Date().toISOString(),
            memberIds: []
          });
        });
      }

      elements[key] = elementNode;
    });

    const newCommunity = {
      id,
      name,
      vision,
      x,
      y,
      radius: 46,
      createdAt: new Date().toISOString(),
      elements,
      members: []
    };

    this.communities.push(newCommunity);
    this.activeLevel = 1; // Pasa automáticamente al Nivel 1 (Comunidad Manifestada)
    this.selectedNode = { type: 'community', data: newCommunity, communityId: id };
    
    this.notify();
    this.saveToStorage();
    return newCommunity;
  }

  /**
   * Obtiene una comunidad por su ID
   */
  getCommunity(id) {
    return this.communities.find(c => c.id === id);
  }

  /**
   * Agrega una nueva propuesta a un elemento específico de una comunidad
   */
  addProposal(communityId, elementKey, {
    title,
    description = '',
    energyNeeded = 10,
    status = 'activa'
  }) {
    const comm = this.getCommunity(communityId);
    if (!comm || !comm.elements[elementKey]) return null;

    const propId = `prop_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newProposal = {
      id: propId,
      elementKey,
      title: title.trim(),
      description: description.trim(),
      energyNeeded: Math.max(1, Number(energyNeeded) || 10),
      status,
      createdAt: new Date().toISOString(),
      memberIds: []
    };

    comm.elements[elementKey].proposals.push(newProposal);
    this.notify();
    this.saveToStorage();
    return newProposal;
  }

  /**
   * Actualiza los datos de una propuesta
   */
  updateProposal(communityId, proposalId, updates) {
    const comm = this.getCommunity(communityId);
    if (!comm) return false;

    for (const elemKey of Object.keys(comm.elements)) {
      const elem = comm.elements[elemKey];
      const prop = elem.proposals.find(p => p.id === proposalId);
      if (prop) {
        if (updates.title !== undefined) prop.title = updates.title.trim();
        if (updates.description !== undefined) prop.description = updates.description.trim();
        if (updates.energyNeeded !== undefined) prop.energyNeeded = Math.max(1, Number(updates.energyNeeded));
        if (updates.status !== undefined) prop.status = updates.status;
        this.notify();
        this.saveToStorage();
        return true;
      }
    }
    return false;
  }

  /**
   * Elimina una propuesta
   */
  removeProposal(communityId, proposalId) {
    const comm = this.getCommunity(communityId);
    if (!comm) return false;

    for (const elemKey of Object.keys(comm.elements)) {
      const elem = comm.elements[elemKey];
      const idx = elem.proposals.findIndex(p => p.id === proposalId);
      if (idx !== -1) {
        elem.proposals.splice(idx, 1);
        // Remover enlaces de miembros con esta propuesta
        comm.members.forEach(m => {
          m.proposalIds = m.proposalIds.filter(pid => pid !== proposalId);
        });
        this.notify();
        this.saveToStorage();
        return true;
      }
    }
    return false;
  }

  /**
   * Registra un nuevo integrante con su Membresía de Sostén
   */
  addMember(communityId, {
    name,
    role = 'Colaborador',
    tierKey = 'colaborador',
    resonanceElement = 'fuego',
    contributionType = 'Horas y Presencia',
    contributionValue = '10 hrs/mes',
    proposalIds = []
  }) {
    const comm = this.getCommunity(communityId);
    if (!comm) return null;

    const tier = MEMBERSHIP_TIERS[tierKey] || MEMBERSHIP_TIERS.semilla;
    const memberId = `member_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const newMember = {
      id: memberId,
      name: name.trim(),
      role: role.trim(),
      tierKey,
      tierName: tier.name,
      tierBadge: tier.badge,
      sustainPoints: tier.sustainPoints,
      resonanceElement: resonanceElement || 'fuego',
      contributionType,
      contributionValue,
      proposalIds: Array.isArray(proposalIds) ? [...proposalIds] : [],
      joinedAt: new Date().toISOString()
    };

    comm.members.push(newMember);

    // Asignar al integrante a las propuestas seleccionadas
    newMember.proposalIds.forEach(pId => {
      this.linkMemberToProposal(communityId, memberId, pId);
    });

    this.notify();
    this.saveToStorage();
    return newMember;
  }

  /**
   * Actualiza la información o membresía de un integrante
   */
  updateMember(communityId, memberId, updates) {
    const comm = this.getCommunity(communityId);
    if (!comm) return false;

    const member = comm.members.find(m => m.id === memberId);
    if (!member) return false;

    if (updates.name !== undefined) member.name = updates.name.trim();
    if (updates.role !== undefined) member.role = updates.role.trim();
    if (updates.tierKey !== undefined && MEMBERSHIP_TIERS[updates.tierKey]) {
      member.tierKey = updates.tierKey;
      member.tierName = MEMBERSHIP_TIERS[updates.tierKey].name;
      member.tierBadge = MEMBERSHIP_TIERS[updates.tierKey].badge;
      member.sustainPoints = MEMBERSHIP_TIERS[updates.tierKey].sustainPoints;
    }
    if (updates.resonanceElement !== undefined) member.resonanceElement = updates.resonanceElement;
    if (updates.contributionType !== undefined) member.contributionType = updates.contributionType;
    if (updates.contributionValue !== undefined) member.contributionValue = updates.contributionValue;

    this.notify();
    this.saveToStorage();
    return true;
  }

  /**
   * Vincula un miembro a una propuesta
   */
  linkMemberToProposal(communityId, memberId, proposalId) {
    const comm = this.getCommunity(communityId);
    if (!comm) return false;

    const member = comm.members.find(m => m.id === memberId);
    if (!member) return false;

    if (!member.proposalIds.includes(proposalId)) {
      member.proposalIds.push(proposalId);
    }

    for (const elemKey of Object.keys(comm.elements)) {
      const prop = comm.elements[elemKey].proposals.find(p => p.id === proposalId);
      if (prop && !prop.memberIds.includes(memberId)) {
        prop.memberIds.push(memberId);
        break;
      }
    }

    this.notify();
    this.saveToStorage();
    return true;
  }

  /**
   * Desvincula un miembro de una propuesta
   */
  unlinkMemberFromProposal(communityId, memberId, proposalId) {
    const comm = this.getCommunity(communityId);
    if (!comm) return false;

    const member = comm.members.find(m => m.id === memberId);
    if (member) {
      member.proposalIds = member.proposalIds.filter(id => id !== proposalId);
    }

    for (const elemKey of Object.keys(comm.elements)) {
      const prop = comm.elements[elemKey].proposals.find(p => p.id === proposalId);
      if (prop) {
        prop.memberIds = prop.memberIds.filter(id => id !== memberId);
        break;
      }
    }

    this.notify();
    this.saveToStorage();
    return true;
  }

  /**
   * Elimina un integrante de la comunidad
   */
  removeMember(communityId, memberId) {
    const comm = this.getCommunity(communityId);
    if (!comm) return false;

    const idx = comm.members.findIndex(m => m.id === memberId);
    if (idx === -1) return false;

    comm.members.splice(idx, 1);

    // Limpiar de propuestas
    for (const elemKey of Object.keys(comm.elements)) {
      comm.elements[elemKey].proposals.forEach(prop => {
        prop.memberIds = prop.memberIds.filter(id => id !== memberId);
      });
    }

    this.notify();
    this.saveToStorage();
    return true;
  }

  /**
   * Calcula diagnósticos holísticos de sostén, vitalidad y balance pentagonal
   */
  getCommunityMetrics(communityId) {
    const comm = this.getCommunity(communityId);
    if (!comm) {
      return {
        totalMembers: 0,
        totalProposals: 0,
        sustainPoints: 0,
        energyDemand: 0,
        sustainRatio: 0,
        pentagonalBalance: 0,
        vitalityScore: 0,
        elementStats: {}
      };
    }

    const totalMembers = comm.members.length;
    let sustainPoints = 0;
    comm.members.forEach(m => { sustainPoints += (m.sustainPoints || 0); });

    let totalProposals = 0;
    let energyDemand = 0;
    const elementStats = {};

    Object.keys(comm.elements).forEach(key => {
      const elem = comm.elements[key];
      const propCount = elem.proposals.length;
      let elemEnergyDemand = 0;
      let elemMembersAttached = 0;
      let elemSustainInflow = 0;

      elem.proposals.forEach(p => {
        elemEnergyDemand += (p.energyNeeded || 0);
      });

      // Miembros que resuenan con este elemento o están en sus propuestas
      comm.members.forEach(m => {
        const isInProposal = m.proposalIds.some(pid => elem.proposals.some(p => p.id === pid));
        const isResonant = m.resonanceElement === key;
        if (isInProposal || isResonant) {
          elemMembersAttached++;
          elemSustainInflow += m.sustainPoints;
        }
      });

      totalProposals += propCount;
      energyDemand += elemEnergyDemand;

      // Vitalidad del elemento individual (0-100%)
      const coverage = elemEnergyDemand > 0 ? (elemSustainInflow / elemEnergyDemand) : (elemMembersAttached > 0 ? 1 : 0.5);
      const elemVitality = Math.min(100, Math.round(coverage * 100));

      elementStats[key] = {
        name: elem.name,
        color: elem.color,
        proposalsCount: propCount,
        energyDemand: elemEnergyDemand,
        membersCount: elemMembersAttached,
        sustainInflow: elemSustainInflow,
        vitality: elemVitality
      };
    });

    // 1. Ratio de Sostén global (0-100%)
    const rawSustainRatio = energyDemand > 0 ? (sustainPoints / energyDemand) : (totalMembers > 0 ? 1 : 0);
    const sustainRatio = Math.min(100, Math.round(rawSustainRatio * 100));

    // 2. Balance Pentagonal (qué tan distribuidas están las membresías y propuestas en los 5 elementos)
    const vitalities = Object.values(elementStats).map(s => s.vitality);
    const meanVitality = vitalities.reduce((a, b) => a + b, 0) / 5;
    const variance = vitalities.reduce((acc, v) => acc + Math.pow(v - meanVitality, 2), 0) / 5;
    const stdDev = Math.sqrt(variance);
    // Cuanto menor desviación, mayor armonía pentagonal
    const pentagonalBalance = Math.max(0, Math.min(100, Math.round(100 - (stdDev * 1.2))));

    // 3. Índice General de Vitalidad Comunitaria
    const vitalityScore = Math.round((sustainRatio * 0.6) + (pentagonalBalance * 0.4));

    return {
      totalMembers,
      totalProposals,
      sustainPoints,
      energyDemand,
      sustainRatio,
      pentagonalBalance,
      vitalityScore,
      elementStats
    };
  }

  /**
   * Carga una comunidad de ejemplo rica y viva ("Semilla Viva")
   */
  loadLivingCommunityPreset() {
    this.communities = [];
    const comm = this.createCommunity({
      name: 'Comunidad Fractal Avalon',
      vision: 'Laboratorio vivo de regeneración comunitaria basado en los 5 elementos y economía de sostén mutuo.',
      x: 0,
      y: 0,
      initProposals: true
    });

    // Añadir propuestas adicionales ricas
    this.addProposal(comm.id, 'fuego', {
      title: 'Hackathon Tecnológico de la Nueva Era',
      description: 'Creación de software libre y herramientas descentralizadas para la comunidad.',
      energyNeeded: 15
    });

    this.addProposal(comm.id, 'tierra', {
      title: 'Domos Geodésicos & Bioconstrucción',
      description: 'Construcción con materiales locales y arquitectura bioclimática.',
      energyNeeded: 20
    });

    this.addProposal(comm.id, 'agua', {
      title: 'Festival Solsticial de Música y Sanación',
      description: 'Encuentro ceremonial de arte, música consciente y nutrición comunitaria.',
      energyNeeded: 14
    });

    // Integrantes ejemplares que sostienen la comunidad con sus membresías
    const m1 = this.addMember(comm.id, {
      name: 'Elena Solari',
      role: 'Guardián del Fuego & Facilitadora',
      tierKey: 'guardian',
      resonanceElement: 'fuego',
      contributionType: 'Dedicación y Guía',
      contributionValue: '25 hrs/mes'
    });

    const m2 = this.addMember(comm.id, {
      name: 'Mateo Raíz',
      role: 'Permacultor & Cuidador de Tierra',
      tierKey: 'pilar',
      resonanceElement: 'tierra',
      contributionType: 'Bio-recursos y Huerto',
      contributionValue: '30 hrs/mes + Semillas'
    });

    const m3 = this.addMember(comm.id, {
      name: 'Sofia Aetherea',
      role: 'Coordinadora de Visión & Éter',
      tierKey: 'guardian',
      resonanceElement: 'eter',
      contributionType: 'Gobernanza y Ética',
      contributionValue: '20 hrs/mes'
    });

    const m4 = this.addMember(comm.id, {
      name: 'Lucas Viento',
      role: 'Comunicador & Podcaster',
      tierKey: 'colaborador',
      resonanceElement: 'aire',
      contributionType: 'Diseño y Difusión',
      contributionValue: '15 hrs/mes'
    });

    const m5 = this.addMember(comm.id, {
      name: 'Maya Cristal',
      role: 'Terapeuta & Arte Vinculante',
      tierKey: 'pilar',
      resonanceElement: 'agua',
      contributionType: 'Cuidado Afectivo',
      contributionValue: '18 hrs/mes'
    });

    const m6 = this.addMember(comm.id, {
      name: 'Nahuel Cordillera',
      role: 'Enlace Biorregional',
      tierKey: 'resonante',
      resonanceElement: 'tierra',
      contributionType: 'Puente con Eco-aldeas',
      contributionValue: '10 hrs/mes'
    });

    const m7 = this.addMember(comm.id, {
      name: 'Clara Amanecer',
      role: 'Exploradora Creativa',
      tierKey: 'semilla',
      resonanceElement: 'agua',
      contributionType: 'Presencia en círculos',
      contributionValue: '5 hrs/mes'
    });

    // Vincular miembros a propuestas existentes
    const fProps = comm.elements.fuego.proposals;
    if (fProps[0] && m1) this.linkMemberToProposal(comm.id, m1.id, fProps[0].id);
    const tProps = comm.elements.tierra.proposals;
    if (tProps[0] && m2) this.linkMemberToProposal(comm.id, m2.id, tProps[0].id);
    const aProps = comm.elements.agua.proposals;
    if (aProps[0] && m5) this.linkMemberToProposal(comm.id, m5.id, aProps[0].id);
    const eProps = comm.elements.eter.proposals;
    if (eProps[0] && m3) this.linkMemberToProposal(comm.id, m3.id, eProps[0].id);
    const airProps = comm.elements.aire.proposals;
    if (airProps[0] && m4) this.linkMemberToProposal(comm.id, m4.id, airProps[0].id);

    this.activeLevel = 1;
    this.selectedNode = { type: 'community', data: comm, communityId: comm.id };
    this.notify();
    this.saveToStorage();
    return comm;
  }

  /**
   * Exporta toda la red comunitaria en JSON
   */
  exportJSON() {
    return JSON.stringify({
      version: '1.0.0',
      type: 'RedComunitariaFractal',
      exportedAt: new Date().toISOString(),
      communities: this.communities
    }, null, 2);
  }

  /**
   * Importa datos desde un string JSON
   */
  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.communities || !Array.isArray(data.communities)) {
        throw new Error('Formato JSON incompatible: no contiene el arreglo "communities".');
      }
      this.communities = data.communities;
      this.activeLevel = this.communities.length > 0 ? 1 : 0;
      this.selectedNode = this.communities.length > 0 
        ? { type: 'community', data: this.communities[0], communityId: this.communities[0].id }
        : null;
      this.notify();
      this.saveToStorage();
      return true;
    } catch (err) {
      console.error('Error al importar JSON:', err);
      return false;
    }
  }

  saveToStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, this.exportJSON());
      }
    } catch (e) {
      // localStorage no disponible o lleno
    }
  }

  loadFromStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
          return this.importJSON(raw);
        }
      }
    } catch (e) {
      // Ignorar fallo de storage
    }
    return false;
  }
}
