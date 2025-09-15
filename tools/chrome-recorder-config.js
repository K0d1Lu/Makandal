/**
 * 🔥 Makandal Chrome DevTools Recorder Configuration
 * Script générique et configurable pour améliorer les sélecteurs
 * 
 * Usage:
 * 1. Chargez d'abord la configuration: fetch('./chrome-recorder-config.json')
 * 2. Injectez ce script dans la console avant d'enregistrer
 * 3. Ou utilisez loadConfigAndInit() pour un chargement automatique
 */

(function() {
  // Configuration par défaut (fallback)
  let CONFIG = {
    selectorPriorities: ['data-testid', 'data-cy', 'aria-label', 'id', 'class'],
    dynamicValuePatterns: [
      { pattern: '^__BVID__', flags: '' },
      { pattern: '^\\d+$', flags: '' }
    ],
    dynamicClassPatterns: [
      { pattern: '^b-\\w+-\\d+$', flags: '' }
    ],
    preferences: {
      allowTextSelectors: true,
      maxTextLength: 50,
      ignoreHiddenElements: true
    }
  };

  // Charge la configuration depuis un fichier JSON
  async function loadConfig(configPath = './chrome-recorder-config.json') {
    try {
      const response = await fetch(configPath);
      if (!response.ok) {
        throw new Error(`Config non trouvée: ${response.status}`);
      }
      
      const config = await response.json();
      CONFIG = { ...CONFIG, ...config };
      
      console.log('✅ Configuration Makandal chargée:', CONFIG.name || 'Config personnalisée');
      return CONFIG;
    } catch (error) {
      console.warn('⚠️ Erreur chargement config, utilisation par défaut:', error.message);
      return CONFIG;
    }
  }

  // Initialise avec une configuration spécifique
  function initWithConfig(customConfig) {
    CONFIG = { ...CONFIG, ...customConfig };
    console.log('✅ Configuration personnalisée appliquée');
  }

  // Fonction principale d'initialisation
  async function loadConfigAndInit(configPath, projectType = 'generic') {
    await loadConfig(configPath);
    
    // Application de la config projet-spécifique
    if (CONFIG.projectSpecific && CONFIG.projectSpecific[projectType]) {
      const projectConfig = CONFIG.projectSpecific[projectType];
      if (projectConfig.additionalPriorities) {
        CONFIG.selectorPriorities = [
          ...projectConfig.additionalPriorities,
          ...CONFIG.selectorPriorities
        ];
      }
    }
    
    init();
  }

  // Variables compilées pour performance
  let SELECTOR_PRIORITIES = [];
  let DYNAMIC_VALUE_REGEXES = [];
  let DYNAMIC_CLASS_REGEXES = [];

  // Compile les patterns en RegExp pour performance
  function compilePatterns() {
    SELECTOR_PRIORITIES = CONFIG.selectorPriorities || [];
    
    DYNAMIC_VALUE_REGEXES = (CONFIG.dynamicValuePatterns || []).map(p => 
      new RegExp(p.pattern, p.flags || '')
    );
    
    DYNAMIC_CLASS_REGEXES = (CONFIG.dynamicClassPatterns || []).map(p => 
      new RegExp(p.pattern, p.flags || '')
    );
  }

  // Fonction pour générer un sélecteur stable
  function generateStableSelector(element) {
    // Ignorer les éléments cachés si configuré
    if (CONFIG.preferences?.ignoreHiddenElements && 
        (element.offsetParent === null || 
         window.getComputedStyle(element).display === 'none')) {
      return null;
    }

    // 1. Priorité aux attributs de test (configurables)
    for (const attr of SELECTOR_PRIORITIES) {
      const value = element.getAttribute(attr);
      if (value && !isDynamicValue(value)) {
        return `[${attr}="${value}"]`;
      }
    }

    // 2. Fallback sur les classes stables (sans patterns dynamiques)
    const classList = Array.from(element.classList)
      .filter(cls => !isDynamicClass(cls));
    
    if (classList.length > 0) {
      return `.${classList.join('.')}`;
    }

    // 3. Dernier recours : sélecteur par texte si activé et unique
    if (CONFIG.preferences?.allowTextSelectors) {
      const textContent = element.textContent?.trim();
      const maxLength = CONFIG.preferences?.maxTextLength || 50;
      
      if (textContent && 
          textContent.length <= maxLength && 
          isUniqueText(textContent)) {
        return `text/${textContent}`;
      }
    }

    return null;
  }

  // Détecte les valeurs dynamiques à éviter (configurables)
  function isDynamicValue(value) {
    return DYNAMIC_VALUE_REGEXES.some(regex => regex.test(value));
  }

  // Détecte les classes CSS dynamiques (configurables)
  function isDynamicClass(className) {
    return DYNAMIC_CLASS_REGEXES.some(regex => regex.test(className));
  }

  // Vérifie si un texte est unique dans la page
  function isUniqueText(text) {
    const elements = document.querySelectorAll('*');
    let count = 0;
    
    for (const el of elements) {
      if (el.textContent?.trim() === text) {
        count++;
        if (count > 1) return false;
      }
    }
    
    return count === 1;
  }

  // Initialisation principale
  function init() {
    compilePatterns();
    
    console.log('🔥 Makandal Chrome Recorder Configuration active !');
    console.log('📌 Priorités des sélecteurs:', SELECTOR_PRIORITIES);
    console.log('🚫 Patterns dynamiques détectés:', {
      values: CONFIG.dynamicValuePatterns?.length || 0,
      classes: CONFIG.dynamicClassPatterns?.length || 0
    });
    
    // Optionnel: Exposer les fonctions pour debug
    window.MakandalRecorder = {
      generateStableSelector,
      isDynamicValue,
      isDynamicClass,
      CONFIG,
      loadConfig,
      initWithConfig,
      loadConfigAndInit
    };
  }

  // Auto-init avec config par défaut si aucune fonction appelée
  if (typeof window !== 'undefined') {
    init();
  }

  // Export pour usage programmatique
  return {
    loadConfig,
    initWithConfig,
    loadConfigAndInit,
    generateStableSelector,
    init
  };
})();
