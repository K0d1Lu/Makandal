/**
 * 🔥 Makandal Chrome Recorder - Template Intelligent
 * 🤖 Template de base pour hydratation par IA
 * 
 * Variables à remplacer par l'IA selon le projet :
 * {{PROJECT_NAME}} - Nom du projet (ex: "Wedia Portal", "React App")
 * {{PROJECT_DESCRIPTION}} - Description courte du projet
 * {{SELECTOR_PRIORITIES}} - Array des sélecteurs prioritaires  
 * {{DYNAMIC_VALUE_PATTERNS}} - Patterns des valeurs dynamiques à éviter
 * {{DYNAMIC_CLASS_PATTERNS}} - Patterns des classes dynamiques à éviter
 * {{SPECIFIC_LOGIC}} - Logique spécifique au projet
 * {{MESSAGES}} - Messages console personnalisés
 * {{TEST_ELEMENTS}} - Éléments typiques pour la fonction test()
 * {{GENERATION_DATE}} - Date de génération
 * {{PROJECT_SPECIFIC_FUNCTIONS}} - Fonctions spécialisées au projet
 */
(function() {
  'use strict';
  
  // IA: Remplace "Wedia Portal" par le nom du projet
  console.log('🔥 Chargement Makandal - Wedia Portal...');

  // 🎯 Configuration spécialisée (IA: remplace les valeurs ci-dessous)
  const PROJECT_CONFIG = {
    // IA: Remplace ces valeurs
    name: 'Wedia Portal - Généré par IA le 2025-09-15 01:07:17',
    description: 'Configuration optimisée pour l'équipe Wedia Portal',
    
    // IA: Remplace par array des sélecteurs prioritaires du projet
    selectorPriorities: [
      "portal-action",
      "data-portal",
      "data-testid",
      "data-automation",
      "aria-label",
      "aria-labelledby",
      "data-cy",
      "id",
      "name",
      "class"
],
    
    // IA: Remplace par patterns spécifiques au projet
    dynamicValuePatterns: [
      {
            "pattern": "^__BVID__",
            "description": "Bootstrap Vue IDs dynamiques",
            "flags": ""
      },
      {
            "pattern": "^__bv_popover_|^__bv_modal_|^__bv_tooltip_",
            "description": "Bootstrap Vue composants temporaires",
            "flags": ""
      },
      {
            "pattern": "^\\d+$",
            "description": "IDs purement numériques",
            "flags": ""
      },
      {
            "pattern": "_\\d{3,}$|^\\d{4,}",
            "description": "Suffixes/préfixes numériques longs",
            "flags": ""
      },
      {
            "pattern": "uuid|guid|token|session",
            "description": "Identifiants temporaires et sessions",
            "flags": "i"
      },
      {
            "pattern": "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}",
            "description": "Format UUID standard",
            "flags": ""
      }
],
    
    // IA: Remplace par classes dynamiques du projet
    dynamicClassPatterns: [
      {
            "pattern": "^b-\\w+-\\d+$",
            "description": "Bootstrap Vue classes générées",
            "flags": ""
      },
      {
            "pattern": "^v-\\w+-\\d+$",
            "description": "Vue.js classes dynamiques",
            "flags": ""
      },
      {
            "pattern": "^\\w+_\\d{6,}$",
            "description": "Classes avec hash long",
            "flags": ""
      },
      {
            "pattern": "^portal-temp-\\w+$",
            "description": "Classes temporaires Portal",
            "flags": ""
      }
],
    
    // Préférences par défaut (IA: ajuste selon besoin)
    preferences: {
      allowTextSelectors: true,
      maxTextLength: 25,
      ignoreHiddenElements: true,
      preferDataAttributes: true,
      projectSpecific: {
        // IA: Ajoute propriétés spécifiques ici
        detectFrameworkComponents: true
      }
    }
  };

  // 🧠 Compilation des patterns pour performance
  let compiledValuePatterns = [];
  let compiledClassPatterns = [];
  
  function compilePatterns() {
    // Compilation des regex depuis la configuration
    compiledValuePatterns = PROJECT_CONFIG.dynamicValuePatterns.map(p => 
      new RegExp(p.pattern, p.flags || '')
    );
    
    compiledClassPatterns = PROJECT_CONFIG.dynamicClassPatterns.map(p => 
      new RegExp(p.pattern, p.flags || '')
    );
    
    console.log('✅ Patterns {{PROJECT_NAME}} compilés:', {
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
    if (PROJECT_CONFIG.preferences.ignoreHiddenElements) {
      if (element.offsetParent === null || 
          window.getComputedStyle(element).display === 'none') {
        return null;
      }
    }

    // 1️⃣ Priorité aux attributs métier projet
    for (const attr of PROJECT_CONFIG.selectorPriorities) {
      const value = element.getAttribute(attr);
      if (value && !isDynamicValue(value)) {
        // IA: Ajoute logique spécifique au projet ici
        
        // Logique spécifique Portal
        if (attr === 'portal-action') {
          console.log('🏛️ Portal Action:', value);
          return `[portal-action="${value}"]`;
        }
        if (attr === 'data-portal') {
          console.log('🎯 Data Portal:', value);
          return `[data-portal="${value}"]`;
        }
        if (attr === 'data-testid') {
          console.log('🎯 Test ID trouvé:', value);
        }
        return `[${attr}="${value}"]`;
      }
    }

    // 2️⃣ Classes CSS stables (filtrage projet)
    const classList = Array.from(element.classList)
      .filter(cls => !isDynamicClass(cls))
      .filter(cls => isProjectStableClass(cls));
    
    if (classList.length > 0) {
      const classSelector = `.${classList.join('.')}`;
      console.log('🎨 Sélecteur classes stables:', classSelector);
      return classSelector;
    }

    // 3️⃣ Sélecteur par texte (optimisé projet)
    if (PROJECT_CONFIG.preferences.allowTextSelectors) {
      const textContent = element.textContent?.trim();
      const maxLength = PROJECT_CONFIG.preferences.maxTextLength;
      
      if (textContent && 
          textContent.length <= maxLength && 
          isUniqueText(textContent) &&
          isProjectRelevantText(textContent)) {
        console.log('📝 Sélecteur texte projet:', textContent);
        return `text/${textContent}`;
      }
    }

    // 4️⃣ Fallback intelligent projet
    return generateProjectFallback(element);
  }

  // 🚫 Détection valeurs dynamiques  
  function isDynamicValue(value) {
    return compiledValuePatterns.some(pattern => pattern.test(value));
  }

  // 🚫 Détection classes dynamiques
  function isDynamicClass(className) {
    return compiledClassPatterns.some(pattern => pattern.test(className));
  }

  // ✅ Classes stables spécifiques projet (IA: remplace cette logique)
  function isProjectStableClass(className) {
    // IA: Remplace par logique spécifique au projet
    const stablePatterns = [
      /^btn/,           // Boutons
      /^form/,          // Formulaires
      /^nav/,           // Navigation
      /^card/,          // Cartes
      /^modal/,         // Modales
      /^alert/          // Alertes
    ];
    return stablePatterns.some(pattern => pattern.test(className));
  }

  // 📝 Validation texte pertinent projet (IA: remplace cette logique)
  function isProjectRelevantText(text) {
    // IA: Remplace par validation spécifique au projet
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

  // 🆘 Fallback intelligent projet (IA: remplace cette logique)
  function generateProjectFallback(element) {
    // IA: Remplace par logique fallback spécifique au projet
    const tagName = element.tagName.toLowerCase();
    
    switch (tagName) {
      case 'button':
        const type = element.type;
        if (type && type !== 'button') return `button[type="${type}"]`;
        return 'button';
        
      case 'input':
        const inputType = element.type || 'text';
        return `input[type="${inputType}"]`;
        
      case 'a':
        const href = element.href;
        if (href && href.length < 50 && !href.includes('javascript:')) {
          return `a[href="${href}"]`;
        }
        return 'a';
        
      default:
        return tagName;
    }
  }

  // Fonctions spécialisées projet (IA: ajoute fonctions spécifiques ici)
  function detectProjectComponent(element) {
    // IA: Remplace par détection spécifique au projet
    return element.className.match(/project-[\w-]+/)?.[0] || null;
  }

  // 🧪 Fonction de test pour validation
  function test() {
    console.log('🧪 Test Makandal pour projet...');
    
    // Test sur éléments typiques projet (IA: remplace cette liste)
    const testSelectors = [
      'data-testid',
      'aria-label',
      '.btn',
      '.form-control',
      'button[type="submit"]'
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
    
    // Messages personnalisés projet (IA: remplace ces messages)
    console.log('🏛️ Makandal Portal - Configuration Wedia Portal chargée !');
    console.log('📋 Sélecteurs prioritaires:', PROJECT_CONFIG.selectorPriorities.slice(0, 4));
    console.log('🚫 Patterns dynamiques détectés:', {
      valeurs: PROJECT_CONFIG.dynamicValuePatterns.length,
      classes: PROJECT_CONFIG.dynamicClassPatterns.length
    });
    
    // Export global pour utilisation
    window.MakandalRecorder = {
      generateStableSelector,
      isDynamicValue,
      isDynamicClass,
      isProjectStableClass,
      CONFIG: PROJECT_CONFIG,
      test,
      detectProjectComponent,
      version: '2.0.0-template', // IA: remplace par date génération
      project: 'Wedia Portal' // IA: remplace par nom projet
    };
    
    console.log('🔥 Chrome Recorder Portal prêt pour l'équipe !');
    console.log('💡 Tapez MakandalRecorder.test() pour valider');
  }

  // 🎬 Auto-initialisation
  init();

})();

// 🎉 Script Makandal pour projet - Template hydraté par IA
console.log('⚔️ "François Makandal guide l\'optimisation de vos sélecteurs !" ⚔️');
