/**
 * 🔥 Makandal Chrome Recorder - Configuration Wedia Portal
 * 🤖 Script généré par IA via Cursor Chat
 * 
 * Généré avec le prompt: "Génère script Chrome Recorder optimisé Wedia Portal"
 * Spécialement conçu pour Vue.js + Bootstrap Vue + ClassicWeb
 */
(function() {
  'use strict';
  
  console.log('🔥 Chargement Makandal - Assistant rebelle pour Wedia Portal...');

  // 🎯 Configuration spécialisée Wedia Portal
  const WEDIA_CONFIG = {
    name: 'Configuration Wedia Portal - Générée par IA',
    
    // Priorité des sélecteurs pour Wedia
    selectorPriorities: [
      'portal-action',    // Attribut métier principal Wedia
      'data-portal',      // Attribut secondaire Portal
      'data-wedia',       // Attribut spécifique Wedia
      'data-testid',      // Tests automatisés
      'aria-label',       // Accessibilité
      'role',             // Rôles ARIA
      'id',               // IDs (si stables)
      'class'             // Classes CSS (en dernier)
    ],
    
    // Patterns de valeurs dynamiques à éviter (spécifiques Wedia)
    dynamicValuePatterns: [
      /^__BVID__\d+$/,           // Bootstrap Vue IDs auto-générés
      /^__bv_popover_\d+$/,      // Popovers Bootstrap Vue
      /^__bv_modal_\d+$/,        // Modales Bootstrap Vue
      /^\d+$/,                   // IDs purement numériques
      /^temp_\d+$/,              // IDs temporaires
      /_\d{4,}$/,                // Suffixes numériques longs
      /^uuid_/i,                 // Identifiants UUID
      /^generated_/i,            // Éléments générés
      /^cw_temp_/,               // Temporaires ClassicWeb
      /^portal_session_/         // Sessions Portal temporaires
    ],
    
    // Classes CSS dynamiques à éviter (Vue + Bootstrap Vue)
    dynamicClassPatterns: [
      /^b-\w+-\d+$/,             // Classes Bootstrap Vue générées
      /^v-\w+-\d+$/,             // Classes Vue.js générées  
      /^css-\w{6,}$/,            // CSS-in-JS hashs
      /^cw-generated-\w+$/,      // ClassicWeb générées
      /^portal-temp-\d+$/,       // Portal temporaires
      /^\w+_\d{6,}$/,            // Classes avec hash long
      /^vue-\w+-\w{8}$/,         // Vue components générés
      /^bv-\w+-\w{4,}$/          // Bootstrap Vue utilities
    ],
    
    // Préférences spéciales Wedia
    preferences: {
      allowTextSelectors: true,
      maxTextLength: 30,         // Textes courts pour Wedia
      ignoreHiddenElements: true,
      preferDataAttributes: true,
      wediaSpecific: {
        detectCwComponents: true,    // Détecter composants ClassicWeb
        handlePortalModals: true,    // Gestion spéciale modales Portal
        optimizeForTables: true      // Optimisation tableaux de données
      }
    }
  };

  // 🧠 Compilation des patterns pour performance
  let compiledValuePatterns = [];
  let compiledClassPatterns = [];
  
  function compilePatterns() {
    compiledValuePatterns = WEDIA_CONFIG.dynamicValuePatterns;
    compiledClassPatterns = WEDIA_CONFIG.dynamicClassPatterns;
    console.log('✅ Patterns Wedia compilés:', {
      valeurs: compiledValuePatterns.length,
      classes: compiledClassPatterns.length
    });
  }

  // 🎯 Fonction principale - Génération sélecteur stable
  function generateStableSelector(element) {
    if (!element || !element.nodeType) {
      console.warn('⚠️ Élément invalide fourni à generateStableSelector');
      return null;
    }

    // Ignorer éléments cachés si configuré
    if (WEDIA_CONFIG.preferences.ignoreHiddenElements) {
      if (element.offsetParent === null || 
          window.getComputedStyle(element).display === 'none') {
        return null;
      }
    }

    // 1️⃣ Priorité aux attributs métier Wedia
    for (const attr of WEDIA_CONFIG.selectorPriorities) {
      const value = element.getAttribute(attr);
      if (value && !isDynamicValue(value)) {
        // Cas spéciaux Wedia
        if (attr === 'portal-action') {
          console.log('🎯 Sélecteur Portal Action trouvé:', value);
        }
        return `[${attr}="${value}"]`;
      }
    }

    // 2️⃣ Classes CSS stables (filtrage Wedia)
    const classList = Array.from(element.classList)
      .filter(cls => !isDynamicClass(cls))
      .filter(cls => isWediaStableClass(cls));
    
    if (classList.length > 0) {
      const classSelector = `.${classList.join('.')}`;
      console.log('🎨 Sélecteur classes stables:', classSelector);
      return classSelector;
    }

    // 3️⃣ Sélecteur par texte (optimisé Wedia)
    if (WEDIA_CONFIG.preferences.allowTextSelectors) {
      const textContent = element.textContent?.trim();
      const maxLength = WEDIA_CONFIG.preferences.maxTextLength;
      
      if (textContent && 
          textContent.length <= maxLength && 
          isUniqueText(textContent) &&
          isWediaRelevantText(textContent)) {
        console.log('📝 Sélecteur texte Wedia:', textContent);
        return `text/${textContent}`;
      }
    }

    // 4️⃣ Fallback intelligent Wedia
    return generateWediaFallback(element);
  }

  // 🚫 Détection valeurs dynamiques  
  function isDynamicValue(value) {
    return compiledValuePatterns.some(pattern => pattern.test(value));
  }

  // 🚫 Détection classes dynamiques
  function isDynamicClass(className) {
    return compiledClassPatterns.some(pattern => pattern.test(className));
  }

  // ✅ Classes stables spécifiques Wedia
  function isWediaStableClass(className) {
    const stablePatterns = [
      /^cw-/,           // ClassicWeb prefixes
      /^portal-/,       // Portal prefixes  
      /^wedia-/,        // Wedia prefixes
      /^btn-/,          // Boutons standards
      /^form-/,         // Formulaires
      /^table-/,        // Tableaux
      /^nav-/,          // Navigation
      /^card-/,         // Cartes
      /^alert-/         // Alertes
    ];
    
    return stablePatterns.some(pattern => pattern.test(className));
  }

  // 📝 Validation texte pertinent Wedia
  function isWediaRelevantText(text) {
    // Éviter textes techniques sans valeur
    const irrelevantPatterns = [
      /^\d+$/,          // Nombres seuls
      /^[A-Z]{1,3}$/,   // Acronymes courts
      /^\s*$/,          // Espaces
      /^\.{3,}$/,       // Points de suspension
      /^-+$/            // Tirets
    ];
    
    return !irrelevantPatterns.some(pattern => pattern.test(text));
  }

  // 🔍 Vérification unicité texte
  function isUniqueText(text) {
    try {
      const elements = document.querySelectorAll('*');
      let count = 0;
      
      for (const el of elements) {
        if (el.textContent?.trim() === text) {
          count++;
          if (count > 1) return false;
        }
      }
      
      return count === 1;
    } catch (error) {
      console.warn('⚠️ Erreur vérification unicité texte:', error);
      return false;
    }
  }

  // 🆘 Fallback intelligent Wedia
  function generateWediaFallback(element) {
    // Stratégies spéciales selon le type d'élément Wedia
    const tagName = element.tagName.toLowerCase();
    
    switch (tagName) {
      case 'button':
        return generateButtonFallback(element);
      case 'input':
        return generateInputFallback(element);
      case 'a':
        return generateLinkFallback(element);
      default:
        return generateGenericFallback(element);
    }
  }

  function generateButtonFallback(button) {
    // Pour les boutons Wedia, essayer le type ou proche parent
    const type = button.type;
    const parentClass = button.closest('[class*="cw-"], [class*="portal-"]');
    
    if (type && !isDynamicValue(type)) {
      return `button[type="${type}"]`;
    }
    
    if (parentClass) {
      return `${parentClass.tagName.toLowerCase()}[class*="cw-"] button`;
    }
    
    return 'button';
  }

  function generateInputFallback(input) {
    const name = input.name;
    const type = input.type;
    
    if (name && !isDynamicValue(name)) {
      return `input[name="${name}"]`;
    }
    
    if (type && !isDynamicValue(type)) {
      return `input[type="${type}"]`;
    }
    
    return 'input';
  }

  function generateLinkFallback(link) {
    const href = link.href;
    if (href && href.length < 50 && !href.includes('javascript:')) {
      return `a[href="${href}"]`;
    }
    return 'a';
  }

  function generateGenericFallback(element) {
    return element.tagName.toLowerCase();
  }

  // 🧪 Fonction de test pour validation
  function test() {
    console.log('🧪 Test Makandal pour Wedia Portal...');
    
    // Test sur éléments typiques Wedia
    const testSelectors = [
      'portal-action',
      'data-portal', 
      'data-testid',
      '.cw-btn-primary',
      '.portal-sidebar'
    ];
    
    let found = 0;
    testSelectors.forEach(selector => {
      try {
        const element = document.querySelector(`[${selector}], ${selector}`);
        if (element) {
          const result = generateStableSelector(element);
          console.log(`✅ ${selector} → ${result}`);
          found++;
        }
      } catch (e) {
        console.log(`⚠️ ${selector} → non trouvé`);
      }
    });
    
    console.log(`🎯 Test terminé: ${found}/${testSelectors.length} sélecteurs trouvés`);
    return found;
  }

  // 🚀 Initialisation automatique
  function init() {
    compilePatterns();
    
    console.log('🎯 Makandal Chrome Recorder activé pour Wedia Portal !');
    console.log('📋 Sélecteurs prioritaires:', WEDIA_CONFIG.selectorPriorities.slice(0, 4));
    console.log('🚫 Patterns dynamiques détectés:', {
      valeurs: WEDIA_CONFIG.dynamicValuePatterns.length,
      classes: WEDIA_CONFIG.dynamicClassPatterns.length
    });
    
    // Export global pour utilisation
    window.MakandalRecorder = {
      generateStableSelector,
      isDynamicValue,
      isDynamicClass,
      isWediaStableClass,
      CONFIG: WEDIA_CONFIG,
      test,
      version: '2.0.0-ai-generated'
    };
    
    console.log('🔥 window.MakandalRecorder disponible !');
    console.log('💡 Tapez MakandalRecorder.test() pour valider');
  }

  // 🎬 Auto-initialisation
  init();

})();

// 🎉 Script Makandal pour Wedia Portal - Généré par IA - Prêt à l'emploi !
console.log('⚔️ "François Makandal guide l\'optimisation de vos sélecteurs Wedia !" ⚔️');
