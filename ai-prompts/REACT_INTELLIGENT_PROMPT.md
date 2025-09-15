# ⚛️ PROMPT MAKANDAL INTELLIGENT - REACT/NEXT.JS

## 🎯 **Prompt optimisé pour projets React modernes**

Copiez-collez ce prompt dans **Cursor Chat** pour générer votre script React optimisé :

---

## 📋 **PROMPT À COPIER-COLLER**

```
🔥 MAKANDAL INTELLIGENT - HYDRATATION TEMPLATE REACT 🔥

WORKFLOW INTELLIGENT:
1. 🔍 Vérifie: generated-scripts/react-chrome-recorder.js existe ?
2. 📋 Si OUI → Utilise template + hydrate variables React seulement  
3. 🆕 Si NON → Utilise chrome-recorder-template.js + hydrate toutes variables
4. 💾 Export final: generated-scripts/react-chrome-recorder.js

TEMPLATE SOURCE: generated-scripts/chrome-recorder-template.js

VARIABLES REACT À HYDRATER:

🎯 PROJECT_NAME: "React/Next.js App"
📖 PROJECT_DESCRIPTION: "Application React moderne avec CSS-in-JS, TypeScript et composants"

🎪 SELECTOR_PRIORITIES: 
[
  "data-testid",        // Standard test automation
  "data-cy",            // Cypress testing
  "data-test",          // Alternative test attr
  "aria-label",         // Accessibilité ARIA
  "aria-labelledby",    // Labels ARIA
  "role",               // Rôles ARIA
  "data-role",          // Rôles custom
  "id",                 // IDs stables
  "className",          // Classes React (pas class)
  "name"                // Attribut name
]

🚫 DYNAMIC_VALUE_PATTERNS:
[
  { "pattern": "^\\\\d+$", "flags": "", "description": "IDs numériques auto-générés" },
  { "pattern": "_\\\\d{4,}$|^\\\\d{4,}_", "flags": "", "description": "Timestamps" },
  { "pattern": "uuid|guid|session|temp", "flags": "i", "description": "Temporaires" },
  { "pattern": "\\\\w{8}-\\\\w{4}-\\\\w{4}-\\\\w{4}-\\\\w{12}", "flags": "", "description": "UUIDs" },
  { "pattern": "^react-", "flags": "", "description": "React auto-générés" },
  { "pattern": "^__react", "flags": "", "description": "React internals" },
  { "pattern": "^r\\\\d+", "flags": "", "description": "React fiber IDs" },
  { "pattern": "^emotion-", "flags": "", "description": "Emotion auto IDs" },
  { "pattern": "^mui-\\\\d+", "flags": "", "description": "Material-UI auto IDs" }
]

🎨 DYNAMIC_CLASS_PATTERNS:
[
  { "pattern": "^css-\\\\w{6,}$", "flags": "", "description": "CSS-in-JS (styled-components, emotion)" },
  { "pattern": "^sc-\\\\w{6,}$", "flags": "", "description": "Styled-components" },
  { "pattern": "^emotion-\\\\w+$", "flags": "", "description": "Emotion CSS" },
  { "pattern": "^jsx-\\\\d+$", "flags": "", "description": "JSX classes générées" },
  { "pattern": "^__\\\\w+_\\\\w+$", "flags": "", "description": "CSS Modules avec hash" },
  { "pattern": "^\\\\w+_\\\\w+_\\\\w{5,}$", "flags": "", "description": "CSS Modules Next.js" },
  { "pattern": "^makeStyles-\\\\w+", "flags": "", "description": "Material-UI makeStyles" },
  { "pattern": "^Mui\\\\w+-\\\\w+", "flags": "", "description": "Material-UI v5 classes" },
  { "pattern": "^chakra-\\\\w+", "flags": "", "description": "Chakra UI classes" }
]

🔧 SPECIFIC_PREFERENCES:
{
  "detectReactComponents": true,   // Détecter composants React
  "supportStyledComponents": true, // Support styled-components
  "handleMuiComponents": true,     // Gestion Material-UI
  "optimizeForHooks": true,        // Optimiser pour hooks
  "supportTypeScript": true        // Support TypeScript
}

💬 MESSAGES (français avec emojis React):
- Chargement: "⚛️ Chargement Makandal - Assistant rebelle pour React..."
- Succès: "🎯 Makandal Chrome Recorder activé pour React/Next.js !"
- Export: "🔥 window.MakandalRecorder disponible pour React !"
- Test: "🧪 Test Makandal pour application React..."
- Validation: "✅ Patterns React/Next.js compilés"

🧪 TEST_ELEMENTS:
[
  "data-testid",
  "data-cy",
  ".btn",
  ".form-control",
  "[role='button']",
  ".nav-link",
  ".card",
  ".modal",
  "button[type='submit']",
  "input[type='text']"
]

🔧 SPECIFIC_SELECTOR_LOGIC:
```javascript
// Cas spéciaux React
if (attr === 'data-testid') {
  console.log('🎯 Test ID React trouvé:', value);
} else if (attr === 'data-cy') {
  console.log('🌲 Cypress selector détecté:', value);
} else if (attr === 'aria-label') {
  console.log('♿ Sélecteur accessible trouvé:', value);
}
```

✅ PROJECT_STABLE_CLASS_LOGIC:
```javascript
const stablePatterns = [
  /^btn/,           // Boutons Bootstrap/custom
  /^form/,          // Formulaires
  /^nav/,           // Navigation
  /^card/,          // Cartes
  /^modal/,         // Modales
  /^alert/,         // Alertes
  /^badge/,         // Badges
  /^table/,         // Tableaux
  /^list/,          // Listes
  /^container/,     // Containers
  /^row/,           // Grilles
  /^col/,           // Colonnes
  /^text-/,         // Utilitaires texte
  /^bg-/,           // Backgrounds
  /^border-/,       // Bordures
  /^m[tblrxy]?-/,   // Margins
  /^p[tblrxy]?-/    // Paddings
];
return stablePatterns.some(pattern => pattern.test(className));
```

📝 PROJECT_TEXT_VALIDATION_LOGIC:
```javascript
// Éviter textes techniques React sans valeur
const irrelevantPatterns = [
  /^\d+$/,                    // Nombres seuls
  /^[A-Z]{1,3}$/,            // Acronymes courts
  /^\s*$/,                   // Espaces
  /^\.{3,}$/,                // Loading dots
  /^-+$/,                    // Tirets
  /^(Loading|Error|Success)$/i, // États génériques
  /^(Submit|Cancel|OK|Close)$/i  // Boutons génériques
];
return !irrelevantPatterns.some(pattern => pattern.test(text));
```

🆘 PROJECT_FALLBACK_LOGIC:
```javascript
// Fallbacks spéciaux React selon type élément
const tagName = element.tagName.toLowerCase();

switch (tagName) {
  case 'button':
    // Boutons React - chercher type et rôle
    const type = element.type;
    const role = element.getAttribute('role');
    if (role) return `button[role="${role}"]`;
    if (type && type !== 'button') return `button[type="${type}"]`;
    return 'button';
    
  case 'input':
    // Inputs React - priorité type puis placeholder
    const inputType = element.type || 'text';
    const placeholder = element.placeholder;
    if (placeholder && placeholder.length < 30) {
      return `input[placeholder="${placeholder}"]`;
    }
    return `input[type="${inputType}"]`;
    
  case 'div':
    // Divs React - chercher rôle ARIA
    const divRole = element.getAttribute('role');
    if (divRole) return `div[role="${divRole}"]`;
    
    // Chercher attributs data-*
    const dataAttrs = Array.from(element.attributes)
      .filter(attr => attr.name.startsWith('data-') && !isDynamicValue(attr.value))
      .slice(0, 1);
    if (dataAttrs.length > 0) {
      return `div[${dataAttrs[0].name}="${dataAttrs[0].value}"]`;
    }
    return 'div';
    
  default:
    return tagName;
}
```

🔧 PROJECT_SPECIFIC_FUNCTIONS:
```javascript
// Fonctions spécialisées React

function detectReactComponent(element) {
  // Détection composants React via _reactInternalInstance
  const reactKeys = Object.keys(element).filter(key => 
    key.startsWith('__reactInternalInstance') || 
    key.startsWith('_reactInternalFiber')
  );
  return reactKeys.length > 0;
}

function getReactProps(element) {
  // Extraction props React pour debug
  const reactKey = Object.keys(element).find(key => 
    key.startsWith('__reactInternalInstance') || 
    key.startsWith('_reactInternalFiber')
  );
  
  if (reactKey && element[reactKey]) {
    const fiber = element[reactKey];
    return fiber.memoizedProps || fiber.pendingProps || {};
  }
  return {};
}

function optimizeForMui(element) {
  // Optimisation spéciale Material-UI
  const muiClasses = element.className.match(/Mui[\w-]+/g);
  if (muiClasses && muiClasses.length > 0) {
    // Utiliser classes MUI stables plutôt que générées
    const stableMuiClass = muiClasses.find(cls => 
      !cls.match(/Mui\w+-\w{6,}$/)
    );
    return stableMuiClass ? `.${stableMuiClass}` : null;
  }
  return null;
}

function handleStyledComponents(element) {
  // Gestion styled-components
  const styledClass = Array.from(element.classList)
    .find(cls => cls.startsWith('sc-') && !cls.match(/sc-\w{6,}$/));
  return styledClass ? `.${styledClass}` : null;
}
```

⏰ GENERATION_DATE: ${new Date().toISOString().split('T')[0]}

INSTRUCTIONS:
1. ✅ Utilise le template chrome-recorder-template.js 
2. 🔄 Remplace TOUTES les variables {{}} par les valeurs React
3. 💾 Génère script final pour generated-scripts/react-chrome-recorder.js
4. 📋 Fournis script complet prêt pour Chrome Console
5. 📝 Ajoute commentaires indiquant variables remplacées
6. ⚛️ Optimise pour ecosystem React moderne (hooks, TypeScript, etc.)

OUTPUT FINAL:
- Script JavaScript complet hydraté pour React
- Support styled-components, Material-UI, CSS Modules
- Prêt pour copier-coller Chrome Console  
- Sauvegarde automatique recommandée
- Instructions utilisation spécifiques React/Next.js
```

---

## 🚀 **Spécificités React du prompt**

### **⚛️ Optimisations React :**
- **Components** : Détection composants React via fiber
- **Props** : Extraction props pour debug avancé
- **Hooks** : Support état et lifecycle hooks
- **TypeScript** : Compatible types et interfaces

### **🎨 CSS-in-JS Support :**
- **styled-components** : Classes `sc-*` stables
- **Emotion** : Patterns `emotion-*` évités
- **CSS Modules** : Hash detection et évitement
- **Material-UI** : Classes `Mui*` optimisées

### **🧪 Testing Integration :**
- **data-testid** : Priorité absolue
- **Cypress** : Support `data-cy` natif
- **Jest/RTL** : Compatible React Testing Library
- **Accessibility** : ARIA labels et roles

---

## 💡 **Exemples d'évolution React**

### **🔧 Nouveau framework CSS :**
```
Ajoute support Tailwind : patterns "^\\w+-\\d+$" dans DYNAMIC_CLASS_PATTERNS
```

### **📱 Support React Native :**
```
Ajoute patterns React Native : "^rn-", "^RCT" dans DYNAMIC_VALUE_PATTERNS
```

### **🎯 Nouveau state manager :**
```
Ajoute détection Redux DevTools dans PROJECT_SPECIFIC_FUNCTIONS
```

---

⚛️ **Template intelligent React = Tests E2E révolutionnaires pour l'écosystème moderne !** 🚀
