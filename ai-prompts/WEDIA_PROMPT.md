# 🔥 PROMPT MAKANDAL - GÉNÉRATION CHROME RECORDER WEDIA

⚠️ **NOUVELLE VERSION DISPONIBLE !** ⚠️

## 🚀 **Version intelligente recommandée**

Pour une **génération optimisée avec template intelligent**, utilisez :
👉 **`WEDIA_INTELLIGENT_PROMPT.md`** 👈

**Avantages de la version intelligente :**
- ⚡ **30 secondes** vs 2 minutes (hydratation template)
- 🔄 **Cohérence** : Structure stable, variables seulement
- 💾 **Auto-save** : generated-scripts/wedia-chrome-recorder.js
- 🎯 **Maintenance** : Évolution par variables

---

## 📋 **PROMPT LEGACY (Génération complète)**

⚠️ Cette version génère tout le script à chaque fois. Pour usage ponctuel seulement.

Copiez-collez ce prompt dans **Cursor Chat** (Cmd+L) :

```
🔥 Génère un script JavaScript complet pour Chrome DevTools Recorder, optimisé pour Wedia Portal

CONTEXTE PROJET:
- Framework: Vue.js + Bootstrap Vue + ClassicWeb
- Attributs métier: portal-action, data-portal, data-wedia
- Préfixes stables: cw-, portal-, wedia-
- Classes dynamiques problématiques: __BVID__*, __bv_*, b-*-*, v-*-*

CONFIGURATION REQUISE:
- Sélecteurs prioritaires: ['portal-action', 'data-portal', 'data-testid', 'aria-label', 'role', 'id', 'class']
- Patterns dynamiques à éviter: ^__BVID__, ^__bv_popover_, ^\d+$, _\d{3,}$, uuid|guid
- Classes CSS dynamiques: ^b-\w+-\d+$, ^v-\w+-\d+$, ^css-\w{6,}$
- Préférences: allowTextSelectors=true, maxTextLength=30, ignoreHiddenElements=true

FONCTIONNALITÉS OBLIGATOIRES:
1. window.MakandalRecorder objet global
2. generateStableSelector(element) - fonction principale
3. isDynamicValue(value) - détection valeurs dynamiques
4. isDynamicClass(className) - détection classes CSS dynamiques  
5. isUniqueText(text) - validation unicité texte
6. Auto-initialisation avec console.log succès
7. Messages français avec emojis appropriés
8. Fonction test() pour valider le fonctionnement

CONTRAINTES TECHNIQUES:
- Script standalone (pas de fetch, imports, dépendances)
- Compatible Chrome DevTools Console
- Code lisible et documenté
- Gestion erreurs robuste
- Performance optimisée (patterns compilés)

STYLE CODE:
- Fonctions fléchées modernes
- Const/let appropriés  
- Template literals pour strings
- Comments explicatifs en français
- Noms variables descriptifs

VALIDATION REQUISE:
- Test sur éléments Wedia typiques
- Messages debug clairs
- Démonstration fonctionnement

OUTPUT: Script complet prêt à copier dans Chrome Console
```

---

## 🎯 **EXEMPLE DE RÉSULTAT ATTENDU**

Après le prompt, vous devriez obtenir quelque chose comme :

```javascript
/**
 * 🔥 Makandal Chrome Recorder - Configuration Wedia Portal
 * Script généré par IA pour optimiser les sélecteurs Chrome DevTools
 */
(function() {
  'use strict';
  
  // Configuration Wedia Portal
  const CONFIG = {
    selectorPriorities: ['portal-action', 'data-portal', 'data-testid', /* ... */],
    dynamicPatterns: [/* patterns compilés */],
    // ... configuration complète
  };

  // Fonction principale
  const generateStableSelector = (element) => {
    // ... logique optimisée Wedia
  };

  // Export global
  window.MakandalRecorder = {
    generateStableSelector,
    isDynamicValue,
    isDynamicClass,
    CONFIG,
    test: () => console.log('🔥 Makandal opérationnel pour Wedia!')
  };

  console.log('🎯 Makandal Chrome Recorder - Wedia Portal activé!');
})();
```

---

## 🚀 **PROMPTS DE PERFECTIONNEMENT**

Si le premier résultat n'est pas parfait, utilisez ces prompts d'amélioration :

### **🔧 Amélioration performance**
```
Optimise le script précédent :
- Compile les regex une seule fois au chargement
- Cache les résultats de calculs coûteux
- Réduis les parcours DOM
- Ajoute memoization pour generateStableSelector
```

### **🎯 Amélioration spécificité Wedia**
```
Rends le script plus spécifique à Wedia Portal :
- Ajoute détection des composants CW (ClassicWeb)
- Gère les modales et sidebars Portal
- Optimise pour les tableaux de données
- Détecte les formulaires métier
- Ajoute support notifications/alertes
```

### **🐛 Amélioration robustesse**
```
Rends le script plus robuste :
- Gestion erreurs try/catch appropriée  
- Fallbacks si éléments non trouvés
- Validation types paramètres
- Messages d'erreur explicites français
- Mode debug avec logs détaillés
```

---

## 💡 **TIPS POUR OPTIMISER LE PROMPT**

### **✅ Bonnes pratiques :**
- **Soyez spécifique** sur votre contexte métier
- **Listez les attributs** exacts de votre projet
- **Donnez des exemples** de HTML typique
- **Précisez les contraintes** techniques

### **🎯 Exemples de contexte riche :**

```
CONTEXTE HTML WEDIA TYPIQUE:
<button portal-action="save-document" class="cw-btn-primary">
<div data-portal="user-profile" id="profile_section">
<table class="cw-datatable b-table-generated-123">
<modal __bvid__456 class="v-modal-789">
```

### **⚡ Prompt iteratif :**

1. **Premier prompt** : Configuration de base
2. **Deuxième prompt** : "Ajoute gestion spécifique des modales Wedia"
3. **Troisième prompt** : "Optimise pour les tableaux paginés"
4. **Quatrième prompt** : "Ajoute mode debug avancé"

---

🔥 **Résultat : Script Chrome Recorder sur-mesure pour Wedia en 2 minutes !** ⚔️
