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
  
  console.log('🔥 Chargement Makandal - {{PROJECT_NAME}}...');

  // 🎯 Configuration spécialisée {{PROJECT_NAME}}
  const PROJECT_CONFIG = {
    name: '{{PROJECT_NAME}} - Généré par IA le {{GENERATION_DATE}}',
    description: '{{PROJECT_DESCRIPTION}}',
    
    // Priorité des sélecteurs pour {{PROJECT_NAME}}
    selectorPriorities: {{SELECTOR_PRIORITIES}},
    
    // Patterns de valeurs dynamiques à éviter (spécifiques {{PROJECT_NAME}})
    dynamicValuePatterns: {{DYNAMIC_VALUE_PATTERNS}},
    
    // Classes CSS dynamiques à éviter ({{PROJECT_NAME}})
    dynamicClassPatterns: {{DYNAMIC_CLASS_PATTERNS}},
    
    // Préférences spéciales {{PROJECT_NAME}}
    preferences: {
      allowTextSelectors: true,
      maxTextLength: 30,
      ignoreHiddenElements: true,
      preferDataAttributes: true,
      projectSpecific: {
        // Variables spécifiques remplacées par IA
        {{SPECIFIC_PREFERENCES}}
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

    // 1️⃣ Priorité aux attributs métier {{PROJECT_NAME}}
    for (const attr of PROJECT_CONFIG.selectorPriorities) {
      const value = element.getAttribute(attr);
      if (value && !isDynamicValue(value)) {
        // Logique spécifique {{PROJECT_NAME}} générée par IA
        {{SPECIFIC_SELECTOR_LOGIC}}
        return `[${attr}="${value}"]`;
      }
    }

    // 2️⃣ Classes CSS stables (filtrage {{PROJECT_NAME}})
    const classList = Array.from(element.classList)
      .filter(cls => !isDynamicClass(cls))
      .filter(cls => isProjectStableClass(cls));
    
    if (classList.length > 0) {
      const classSelector = `.${classList.join('.')}`;
      console.log('🎨 Sélecteur classes stables {{PROJECT_NAME}}:', classSelector);
      return classSelector;
    }

    // 3️⃣ Sélecteur par texte (optimisé {{PROJECT_NAME}})
    if (PROJECT_CONFIG.preferences.allowTextSelectors) {
      const textContent = element.textContent?.trim();
      const maxLength = PROJECT_CONFIG.preferences.maxTextLength;
      
      if (textContent && 
          textContent.length <= maxLength && 
          isUniqueText(textContent) &&
          isProjectRelevantText(textContent)) {
        console.log('📝 Sélecteur texte {{PROJECT_NAME}}:', textContent);
        return `text/${textContent}`;
      }
    }

    // 4️⃣ Fallback intelligent {{PROJECT_NAME}}
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

  // ✅ Classes stables spécifiques {{PROJECT_NAME}} (remplacées par IA)
  function isProjectStableClass(className) {
    {{PROJECT_STABLE_CLASS_LOGIC}}
  }

  // 📝 Validation texte pertinent {{PROJECT_NAME}} (remplacé par IA)
  function isProjectRelevantText(text) {
    {{PROJECT_TEXT_VALIDATION_LOGIC}}
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

  // 🆘 Fallback intelligent {{PROJECT_NAME}} (remplacé par IA)
  function generateProjectFallback(element) {
    {{PROJECT_FALLBACK_LOGIC}}
  }

  // Fonctions spécialisées {{PROJECT_NAME}} générées par IA
  {{PROJECT_SPECIFIC_FUNCTIONS}}

  // 🧪 Fonction de test pour validation
  function test() {
    console.log('🧪 Test Makandal pour {{PROJECT_NAME}}...');
    
    // Test sur éléments typiques {{PROJECT_NAME}} (remplacé par IA)
    const testSelectors = {{TEST_ELEMENTS}};
    
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
    
    // Messages personnalisés {{PROJECT_NAME}} (remplacés par IA)
    {{MESSAGES}}
    
    // Export global pour utilisation
    window.MakandalRecorder = {
      generateStableSelector,
      isDynamicValue,
      isDynamicClass,
      isProjectStableClass,
      CONFIG: PROJECT_CONFIG,
      test,
      version: '2.0.0-template-{{GENERATION_DATE}}',
      project: '{{PROJECT_NAME}}'
    };
    
    console.log('🔥 window.MakandalRecorder disponible pour {{PROJECT_NAME}} !');
    console.log('💡 Tapez MakandalRecorder.test() pour valider');
  }

  // 🎬 Auto-initialisation
  init();

})();

// 🎉 Script Makandal pour {{PROJECT_NAME}} - Template hydraté par IA - {{GENERATION_DATE}}
console.log('⚔️ "François Makandal guide l\'optimisation de {{PROJECT_NAME}} !" ⚔️');
