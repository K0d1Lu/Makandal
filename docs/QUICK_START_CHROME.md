# 🚀 Guide Rapide - Chrome DevTools Recorder + Makandal

## 🎯 **Ce que vous voulez faire :**
Améliorer les sélecteurs générés par Chrome DevTools Recorder pour vos tests.

---

## ⚡ **Solution ultra-simple (2 minutes)**

### **📋 ÉTAPE 1** : Ouvrir Chrome DevTools
1. Allez sur votre site web à tester
2. **F12** → Onglet **"Console"**

### **📋 ÉTAPE 2** : Coller le script Makandal

**Option A - Configuration par défaut :**
```javascript
// Copiez-collez TOUT le contenu du fichier chrome-recorder-config.js
// Allez dans le fichier, Ctrl+A, Ctrl+C, puis collez ici
```

**Option B - Configuration Wedia/Portal :**
```javascript
// 1. Copiez d'abord le script principal (chrome-recorder-config.js)
// 2. Puis ajoutez cette config spécialisée :

const wediacConfig = {
  selectorPriorities: [
    'portal-action', 'data-portal', 'data-testid', 'aria-label', 'id', 'class'
  ],
  dynamicValuePatterns: [
    { pattern: '^__BVID__', flags: '' },
    { pattern: '^__bv_popover_', flags: '' },
    { pattern: '^\\d+$', flags: '' }
  ],
  dynamicClassPatterns: [
    { pattern: '^b-\\w+-\\d+$', flags: '' },
    { pattern: '^v-\\w+-\\d+$', flags: '' }
  ],
  preferences: { allowTextSelectors: true, maxTextLength: 30 }
};

window.MakandalRecorder.initWithConfig(wediacConfig);
```

### **📋 ÉTAPE 3** : Vérifier que ça marche
```javascript
// Dans la console, tapez :
window.MakandalRecorder
// → Vous devez voir l'objet Makandal
```

### **📋 ÉTAPE 4** : Enregistrer avec Chrome Recorder
1. **DevTools** → Onglet **"Recorder"**
2. **"Start recording"**
3. Effectuez vos actions
4. **"End recording"**
5. **"Export"** → **"Export as JSON"**

### **📋 ÉTAPE 5** : Convertir en tests Cucumber
```bash
# Dans votre projet Makandal
npm run workflow mon-enregistrement.json "Mon test"
```

---

## 🎯 **Qu'est-ce que Makandal fait ?**

### **❌ Sans Makandal :**
```javascript
// Sélecteurs fragiles générés par Chrome
#__BVID__361 > .v-btn-4521 > .css-abc123
```

### **✅ Avec Makandal :**
```javascript
// Sélecteurs stables et maintenables
[data-testid="submit-button"]
[portal-action="save-document"]
.btn-primary
```

---

## 🔧 **Personnalisation rapide**

### **Pour votre projet, ajustez :**
```javascript
const monProjetConfig = {
  selectorPriorities: [
    'mon-attribut-test',      // Votre attribut préféré
    'data-testid',            // Standard
    'aria-label'              // Accessibilité
  ],
  preferences: {
    allowTextSelectors: true, // Utiliser le texte des boutons
    maxTextLength: 20         // Texte max 20 caractères
  }
};

window.MakandalRecorder.initWithConfig(monProjetConfig);
```

---

## 🚨 **Résolution de problèmes**

### **Erreur : "MakandalRecorder is not defined"**
→ Le script principal n'a pas été collé. Recommencez l'étape 2.

### **Erreur : "fetch() failed"**
→ Normal ! Chrome ne peut pas lire les fichiers locaux. Utilisez la méthode copier-coller.

### **Sélecteurs toujours fragiles**
→ Ajoutez `data-testid` dans votre HTML :
```html
<button data-testid="save-btn">Sauvegarder</button>
```

---

## 💡 **Conseils pro**

### **🎯 Optimisez votre HTML :**
```html
<!-- ✅ Excellent pour les tests -->
<button data-testid="login-submit">Se connecter</button>
<div portal-action="user-profile">Profil</div>

<!-- ❌ À éviter pour les tests -->
<div class="css-abc123 generated-4567">Contenu</div>
```

### **🔄 Workflow recommandé :**
1. **Ajoutez** `data-testid` dans votre code
2. **Configurez** Makandal dans Chrome
3. **Enregistrez** vos scénarios
4. **Convertissez** avec `npm run workflow`
5. **Intégrez** dans votre suite de tests

---

## 🎉 **C'est tout !**

Avec cette configuration, vos enregistrements Chrome Recorder généreront automatiquement des sélecteurs **robustes** et **maintenables** !

🔥 **Makandal transforme vos clics en tests révolutionnaires !** ⚔️

---

**Besoin d'aide ?** Consultez :
- `tools/README-Chrome-Config.md` - Documentation complète
- `docs/INTEGRATION_GUIDE.md` - Guide d'intégration
- `README.md` - Vue d'ensemble du projet
