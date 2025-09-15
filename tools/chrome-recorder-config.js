/**
 * Configuration pour Chrome DevTools Recorder
 * Améliore la qualité des sélecteurs générés
 */

// Injectez ce script dans la console avant d'enregistrer
(function() {
  // Override du sélecteur generator de Chrome
  const originalQuerySelector = document.querySelector;
  
  // Priorité des attributs pour les sélecteurs
  const SELECTOR_PRIORITIES = [
    'data-testid',
    'portal-action', 
    'data-cy',
    'aria-label',
    'id',
    'class'
  ];

  // Fonction pour générer un sélecteur stable
  function generateStableSelector(element) {
    // 1. Priorité aux attributs de test
    for (const attr of SELECTOR_PRIORITIES) {
      const value = element.getAttribute(attr);
      if (value && !isDynamicValue(value)) {
        return `[${attr}="${value}"]`;
      }
    }

    // 2. Fallback sur les classes stables (sans IDs dynamiques)
    const classList = Array.from(element.classList)
      .filter(cls => !isDynamicClass(cls));
    
    if (classList.length > 0) {
      return `.${classList.join('.')}`;
    }

    // 3. Dernier recours : sélecteur par texte si unique
    const textContent = element.textContent?.trim();
    if (textContent && isUniqueText(textContent)) {
      return `text/${textContent}`;
    }

    return null;
  }

  // Détecte les valeurs dynamiques à éviter
  function isDynamicValue(value) {
    const dynamicPatterns = [
      /^__BVID__/,           // Bootstrap Vue IDs
      /^__bv_popover_/,      // Bootstrap Vue popovers
      /^\d+$/,               // IDs purement numériques
      /_\d{3,}$/,            // Suffixes numériques longs
      /uuid|guid/i           // UUIDs
    ];
    
    return dynamicPatterns.some(pattern => pattern.test(value));
  }

  // Détecte les classes CSS dynamiques
  function isDynamicClass(className) {
    const dynamicPatterns = [
      /^b-\w+-\d+$/,         // Bootstrap Vue classes
      /^v-\w+-\d+$/,         // Vue classes générées
      /^\w+_\d{6,}$/         // Classes avec hash
    ];
    
    return dynamicPatterns.some(pattern => pattern.test(className));
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

  console.log('✅ Chrome Recorder configuration chargée');
  console.log('📌 Priorités des sélecteurs:', SELECTOR_PRIORITIES);
})();
