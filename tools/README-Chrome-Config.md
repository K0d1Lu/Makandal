# 🔥 Makandal Chrome Recorder Configuration

Configuration générique et extensible pour améliorer les sélecteurs Chrome DevTools Recorder.

## 📚 Vue d'ensemble

Le script `chrome-recorder-config.js` génère des sélecteurs **stables et fiables** au lieu des sélecteurs dynamiques/fragiles produits par Chrome DevTools Recorder par défaut.

### ❌ Problème : Sélecteurs fragiles
```javascript
// ❌ Sélecteurs générés par Chrome (fragiles)
#__BVID__361 > .v-btn-4521 > .css-abc123
```

### ✅ Solution : Sélecteurs Makandal (stables)
```javascript
// ✅ Sélecteurs optimisés par Makandal
[data-testid="submit-button"]
[portal-action="save"]
.btn-primary
```

---

## 🛠️ Configuration

### 1. **Configuration principale** (`chrome-recorder-config.json`)

```json
{
  "selectorPriorities": [
    "data-testid",      // Test automation
    "data-cy",          // Cypress
    "portal-action",    // Attributs métier
    "aria-label",       // Accessibilité
    "id",               // Identifiants
    "class"             // Classes CSS
  ],
  
  "dynamicValuePatterns": [
    {
      "pattern": "^__BVID__",
      "description": "Bootstrap Vue IDs",
      "flags": ""
    }
  ],
  
  "preferences": {
    "allowTextSelectors": true,
    "maxTextLength": 50,
    "ignoreHiddenElements": true
  }
}
```

### 2. **Configurations projet-spécifiques**

#### Pour Wedia/Portal : `configs/wedia-config.json`
- Priorité à `portal-action`
- Patterns spécifiques Bootstrap Vue
- Classes stables `cw-`, `portal-`

#### Pour React/Next.js : `configs/react-config.json`  
- Détection CSS-in-JS (styled-components, emotion)
- Patterns CSS Modules
- Classes React standards

---

## 🚀 Utilisation

### **Méthode 1 : Injection manuelle**

1. **Chargez la configuration** :
```javascript
// Dans la console Chrome
(async () => {
  const config = await fetch('./tools/chrome-recorder-config.json').then(r => r.json());
  window.MakandalRecorder.initWithConfig(config);
})();
```

2. **Injectez le script** :
```javascript
// Copiez-collez le contenu de chrome-recorder-config.js
```

### **Méthode 2 : Chargement automatique**

```javascript
// Avec configuration par défaut
window.MakandalRecorder.loadConfigAndInit('./tools/chrome-recorder-config.json');

// Avec configuration projet-spécifique  
window.MakandalRecorder.loadConfigAndInit('./tools/configs/wedia-config.json', 'wedia');
```

### **Méthode 3 : Bookmarklet**

Créez un marque-page avec ce code :
```javascript
javascript:(function(){
  fetch('/tools/chrome-recorder-config.json')
    .then(r=>r.json())
    .then(c=>fetch('/tools/chrome-recorder-config.js')
      .then(r=>r.text())
      .then(s=>eval(s))
      .then(m=>m.initWithConfig(c)));
})();
```

---

## ⚙️ Personnalisation

### **Ajouter des attributs prioritaires**
```json
{
  "selectorPriorities": [
    "mon-attribut-custom",
    "data-automation-id",
    "data-testid"
  ]
}
```

### **Détecter de nouveaux patterns dynamiques**
```json
{
  "dynamicValuePatterns": [
    {
      "pattern": "^temp_\\d+$",
      "description": "IDs temporaires",
      "flags": "i"
    }
  ]
}
```

### **Configuration projet-spécifique**
```json
{
  "projectSpecific": {
    "monProjet": {
      "additionalPriorities": ["data-mon-attr"],
      "customPatterns": [
        {
          "pattern": "^stable-",
          "type": "stable"
        }
      ]
    }
  }
}
```

---

## 🧪 Test et Debug

### **Vérifier la configuration active**
```javascript
console.log(window.MakandalRecorder.CONFIG);
```

### **Tester un sélecteur**
```javascript
const element = document.querySelector('#mon-element');
const selector = window.MakandalRecorder.generateStableSelector(element);
console.log('Sélecteur généré:', selector);
```

### **Vérifier les patterns dynamiques**
```javascript
console.log('Dynamique?', window.MakandalRecorder.isDynamicValue('__BVID__123'));
console.log('Classe dynamique?', window.MakandalRecorder.isDynamicClass('css-abc123'));
```

---

## 📁 Structure des fichiers

```
tools/
├── chrome-recorder-config.js       # Script principal
├── chrome-recorder-config.json     # Configuration générique  
├── configs/
│   ├── wedia-config.json           # Config Wedia/Portal
│   ├── react-config.json           # Config React/Next.js
│   └── vue-config.json             # Config Vue.js
└── README-Chrome-Config.md         # Ce fichier
```

---

## 🔥 Workflow Makandal complet

1. **🎥 Enregistrement** : Chrome DevTools Recorder
2. **⚙️ Configuration** : Injection du script Makandal  
3. **📥 Export** : JSON avec sélecteurs optimisés
4. **🔄 Conversion** : `npm run workflow fichier.json`
5. **✅ Tests** : Cucumber `.feature` + définitions

---

## 💡 Conseils

### **Attributs recommandés dans votre HTML**
```html
<!-- ✅ Excellents pour les tests -->
<button data-testid="submit-form">Valider</button>
<input data-cy="email-field" />
<div portal-action="user-menu">Menu</div>

<!-- ❌ À éviter pour les tests -->
<div id="__BVID__123">Contenu</div>
<span class="css-abc123">Texte</span>
```

### **Patterns à surveiller**
- **IDs dynamiques** : `__BVID__`, `react-`, UUID
- **Classes CSS-in-JS** : `css-`, `sc-`, `emotion-`
- **Hash temporels** : `_123456`, `abc123def`

---

🔥 **"Libérez vos tests de l'esclavage des sélecteurs fragiles !"** ⚔️
