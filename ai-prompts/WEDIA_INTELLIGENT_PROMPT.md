# 🔥 PROMPT MAKANDAL INTELLIGENT - WEDIA PORTAL

## 🎯 **Prompt optimisé pour hydratation de template**

Copiez-collez ce prompt dans **Cursor Chat** pour générer/mettre à jour votre script Wedia :

---

## 📋 **PROMPT À COPIER-COLLER**

```
🔥 MAKANDAL INTELLIGENT - HYDRATATION TEMPLATE WEDIA 🔥

WORKFLOW INTELLIGENT:
1. 🔍 Vérifie: generated-scripts/wedia-chrome-recorder.js existe ?
2. 📋 Si OUI → Utilise template + hydrate variables Wedia seulement  
3. 🆕 Si NON → Utilise chrome-recorder-template.js + hydrate toutes variables
4. 💾 Export final: generated-scripts/wedia-chrome-recorder.js

TEMPLATE SOURCE: generated-scripts/chrome-recorder-template.js

VARIABLES WEDIA À HYDRATER:

🎯 PROJECT_NAME: "Wedia Portal"
📖 PROJECT_DESCRIPTION: "Plateforme DAM Vue.js avec Bootstrap Vue et ClassicWeb"

🎪 SELECTOR_PRIORITIES: 
[
  "portal-action",      // Principal attribut métier Wedia
  "data-portal",        // Secondaire Portal  
  "data-wedia",         // Spécifique Wedia
  "data-testid",        // Tests automatisés
  "aria-label",         // Accessibilité
  "role",               // Rôles ARIA
  "id",                 // IDs stables seulement
  "class"               // Classes CSS (dernier recours)
]

🚫 DYNAMIC_VALUE_PATTERNS:
[
  { "pattern": "^__BVID__\\d+$", "flags": "", "description": "Bootstrap Vue IDs" },
  { "pattern": "^__bv_popover_\\d+$", "flags": "", "description": "Popovers BV" },
  { "pattern": "^__bv_modal_\\d+$", "flags": "", "description": "Modales BV" },
  { "pattern": "^\\d+$", "flags": "", "description": "IDs numériques" },
  { "pattern": "^temp_\\d+$", "flags": "", "description": "Temporaires" },
  { "pattern": "_\\d{4,}$", "flags": "", "description": "Suffixes longs" },
  { "pattern": "^uuid_", "flags": "i", "description": "UUIDs" },
  { "pattern": "^generated_", "flags": "i", "description": "Générés" },
  { "pattern": "^cw_temp_", "flags": "", "description": "ClassicWeb temps" },
  { "pattern": "^portal_session_", "flags": "", "description": "Sessions Portal" }
]

🎨 DYNAMIC_CLASS_PATTERNS:
[
  { "pattern": "^b-\\w+-\\d+$", "flags": "", "description": "Bootstrap Vue générées" },
  { "pattern": "^v-\\w+-\\d+$", "flags": "", "description": "Vue.js générées" },
  { "pattern": "^css-\\w{6,}$", "flags": "", "description": "CSS-in-JS" },
  { "pattern": "^cw-generated-\\w+$", "flags": "", "description": "ClassicWeb générées" },
  { "pattern": "^portal-temp-\\d+$", "flags": "", "description": "Portal temporaires" },
  { "pattern": "^\\w+_\\d{6,}$", "flags": "", "description": "Hash long" },
  { "pattern": "^vue-\\w+-\\w{8}$", "flags": "", "description": "Vue components" },
  { "pattern": "^bv-\\w+-\\w{4,}$", "flags": "", "description": "Bootstrap Vue utils" }
]

🔧 SPECIFIC_PREFERENCES:
{
  "detectCwComponents": true,      // Détecter composants ClassicWeb
  "handlePortalModals": true,      // Gestion modales Portal
  "optimizeForTables": true,       // Optimisation tableaux
  "supportResponsive": true        // Support responsive
}

💬 MESSAGES (français avec emojis Wedia):
- Chargement: "🔥 Chargement Makandal - Assistant rebelle pour Wedia Portal..."
- Succès: "🎯 Makandal Chrome Recorder activé pour Wedia Portal !"
- Export: "🔥 window.MakandalRecorder disponible pour Wedia Portal !"
- Test: "🧪 Test Makandal pour Wedia Portal..."
- Validation: "✅ Patterns Wedia compilés"

🧪 TEST_ELEMENTS:
[
  "portal-action",
  "data-portal", 
  "data-testid",
  ".cw-btn-primary",
  ".portal-sidebar",
  ".cw-datatable",
  ".portal-modal",
  "button[type='submit']",
  ".cw-form-field"
]

🔧 SPECIFIC_SELECTOR_LOGIC:
```javascript
// Cas spéciaux Wedia Portal
if (attr === 'portal-action') {
  console.log('🎯 Sélecteur Portal Action trouvé:', value);
} else if (attr === 'data-portal') {
  console.log('🏢 Attribut Portal détecté:', value);
}
```

✅ PROJECT_STABLE_CLASS_LOGIC:
```javascript
const stablePatterns = [
  /^cw-/,           // ClassicWeb prefixes
  /^portal-/,       // Portal prefixes  
  /^wedia-/,        // Wedia prefixes
  /^btn-/,          // Boutons standards
  /^form-/,         // Formulaires
  /^table-/,        // Tableaux
  /^nav-/,          // Navigation
  /^card-/,         // Cartes
  /^alert-/,        // Alertes
  /^modal-/,        // Modales
  /^sidebar-/       // Sidebars
];
return stablePatterns.some(pattern => pattern.test(className));
```

📝 PROJECT_TEXT_VALIDATION_LOGIC:
```javascript
// Éviter textes techniques Wedia sans valeur
const irrelevantPatterns = [
  /^\d+$/,          // Nombres seuls
  /^[A-Z]{1,3}$/,   // Acronymes courts
  /^\s*$/,          // Espaces
  /^\.{3,}$/,       // Points de suspension
  /^-+$/,           // Tirets
  /^(OK|Cancel|Annuler|Valider)$/i  // Boutons génériques
];
return !irrelevantPatterns.some(pattern => pattern.test(text));
```

🆘 PROJECT_FALLBACK_LOGIC:
```javascript
// Fallbacks spéciaux Wedia selon type élément
const tagName = element.tagName.toLowerCase();

switch (tagName) {
  case 'button':
    // Boutons Wedia - chercher dans parent CW
    const cwParent = element.closest('[class*="cw-"], [class*="portal-"]');
    if (cwParent) return `${cwParent.tagName.toLowerCase()}[class*="cw-"] button`;
    return 'button';
    
  case 'input':
    // Inputs - priorité name puis type
    const name = element.name;
    if (name && !isDynamicValue(name)) return `input[name="${name}"]`;
    return `input[type="${element.type || 'text'}"]`;
    
  case 'a':
    // Liens - href court seulement
    const href = element.href;
    if (href && href.length < 50 && !href.includes('javascript:')) {
      return `a[href="${href}"]`;
    }
    return 'a';
    
  default:
    return tagName;
}
```

🔧 PROJECT_SPECIFIC_FUNCTIONS:
```javascript
// Fonctions spécialisées Wedia Portal

function detectCwComponent(element) {
  // Détection composants ClassicWeb
  const cwClasses = element.className.match(/cw-[\w-]+/g);
  return cwClasses ? cwClasses[0] : null;
}

function handlePortalModal(element) {
  // Gestion spéciale modales Portal
  const modal = element.closest('.portal-modal, [data-portal*="modal"]');
  return modal ? modal.getAttribute('data-portal') || 'portal-modal' : null;
}

function optimizeForTable(element) {
  // Optimisation tableaux Wedia
  const table = element.closest('.cw-datatable, table[class*="cw-"]');
  if (table) {
    const row = element.closest('tr');
    const cell = element.closest('td, th');
    if (row && cell) {
      return `table[class*="cw-"] tr:nth-child(${Array.from(row.parentNode.children).indexOf(row) + 1}) td:nth-child(${Array.from(cell.parentNode.children).indexOf(cell) + 1})`;
    }
  }
  return null;
}
```

⏰ GENERATION_DATE: ${new Date().toISOString().split('T')[0]}

INSTRUCTIONS:
1. ✅ Utilise le template chrome-recorder-template.js 
2. 🔄 Remplace TOUTES les variables {{}} par les valeurs Wedia
3. 💾 Génère script final pour generated-scripts/wedia-chrome-recorder.js
4. 📋 Fournis script complet prêt pour Chrome Console
5. 📝 Ajoute commentaires indiquant variables remplacées

OUTPUT FINAL:
- Script JavaScript complet hydraté
- Prêt pour copier-coller Chrome Console  
- Sauvegarde automatique recommandée
- Instructions utilisation spécifiques Wedia
```

---

## 🚀 **Avantages du prompt intelligent**

### **⚡ Efficacité maximale :**
- **Hydratation** : 30 secondes vs 2 minutes génération complète
- **Cohérence** : Structure template stable
- **Maintenance** : Changement variables seulement
- **Versioning** : Template évolutif séparément

### **🎯 Précision Wedia :**
- **Attributs métier** : portal-action, data-portal prioritaires
- **Patterns spécifiques** : Bootstrap Vue, ClassicWeb
- **Logique business** : Modales, tableaux, formulaires
- **Messages contextuels** : Français avec emojis Wedia

### **🔄 Évolutivité :**
- **Nouveau besoin** : Modifier variables seulement
- **Nouveau projet** : Dupliquer template + nouvelles variables
- **Maintenance** : Template centralisé, hydratation distribuée
- **Debug** : Variables isolées, logique stable

---

## 💡 **Exemples d'évolution rapide**

### **🔧 Ajout nouveau pattern :**
```
Ajoute pattern Wedia : "^wedia-temp-\\d+$" dans DYNAMIC_VALUE_PATTERNS
```
→ IA met à jour seulement la variable, pas tout le script

### **🎯 Nouveau sélecteur prioritaire :**
```
Ajoute "data-wedia-component" en 2ème position SELECTOR_PRIORITIES
```
→ Hydratation rapide, structure préservée

### **📝 Messages personnalisés :**
```
Change messages pour inclure nom utilisateur dans logs console
```
→ Variable MESSAGES seulement mise à jour

---

🔥 **Template intelligent = Meilleur des deux mondes : Rapidité IA + Cohérence algorithme !** ⚔️
