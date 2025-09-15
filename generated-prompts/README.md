# 🤖 Generated Prompts - Makandal IA

> **Prompts optimisés générés automatiquement pour Cursor Chat**

## 🎯 À quoi ça sert ?

Ce dossier contient les **prompts IA haute qualité** générés par Makandal à partir de vos recordings Chrome. Ces prompts sont optimisés pour **Cursor Chat** et génèrent des tests Cucumber **professionnels** avec :

✅ **Visual Regression** intégré (screenshots)  
✅ **Sélecteurs Portal** optimisés  
✅ **Format Gherkin** professionnel  
✅ **Bonnes pratiques BDD**  

## 🚀 Comment utiliser ?

### 1️⃣ Générer un prompt
```bash
# Via le CLI interactif (recommandé)
npm run hi-makandal
# → Option 4: 🤖 Générer prompt Cursor IA

# Ou directement
npm run generate-prompt mon-recording.json
```

### 2️⃣ Utiliser dans Cursor
1. **Ouvrir** Cursor Chat (`Cmd+L`)
2. **Copier** le contenu du fichier `.md` généré
3. **Coller** dans Cursor Chat  
4. **Appuyer** sur Entrée
5. **Magic** ✨ Cursor génère votre test !

### 3️⃣ Récupérer les fichiers générés
Cursor va créer :
- 📝 `mon-test.feature` (Gherkin professionnel)
- 🎯 `mon-test_elements.json5` (Sélecteurs optimisés)
- 🔗 `mon-test_urls.json5` (URLs fonctionnelles)

## 📁 Structure fichiers générés

```
generated-prompts/
├── exemple-login-cursor-prompt.md        # Prompt pour Cursor
├── portal-test-cursor-prompt.md          # Autre prompt
└── README.md                            # Ce fichier
```

## 🎯 Différence avec conversion automatique

| Approche | Qualité | Temps | Flexibilité |
|----------|---------|--------|-------------|
| **Conversion auto** | ⭐⭐ Basique | ⚡ 5 sec | 🔒 Limitée |
| **Prompt IA** | ⭐⭐⭐⭐⭐ Premium | ⏱️ 30 sec | 🚀 Totale |

### 🔄 Conversion automatique
```
Chrome JSON → Script Makandal → Test basique
```

### 🤖 Prompt IA (ce dossier)
```
Chrome JSON → Prompt optimisé → Cursor IA → Test professionnel
```

## ⚡ Avantages prompts IA

### 🎯 **Qualité supérieure**
- Nommage métier intelligent
- Assertions contextuelles  
- Structure BDD respectée
- Comments explicatifs

### 📸 **Visual Regression intégré**
```gherkin
# 📸 SCREENSHOT OBLIGATOIRE - Visual Regression
When I take screenshot 'success-state'
Then visual should match baseline 'success-state'
```

### 🏛️ **Optimisations Portal**
- `portal-action` prioritaire
- `data-portal` et `data-testid` 
- Évitement sélecteurs dynamiques
- Conventions équipe Wedia

### 🧠 **IA contextuelle**  
- Analyse sémantique actions
- Détection patterns métier
- Génération noms intelligents
- Scénarios cohérents

## 🛠️ Format prompt généré

Chaque prompt contient :

```markdown
# 🎯 Génération Test Cucumber Haute Qualité

## 📊 ANALYSE DU RECORDING
- Titre, URL, actions détectées
- Contexte métier identifié
- Sélecteurs extraits et optimisés

## 📝 STRUCTURE ATTENDUE  
- Format Gherkin exact à respecter
- Exemples avec vos données
- Instructions screenshot obligatoires

## ⚡ OPTIMISATIONS REQUISES
- Priorités sélecteurs Portal
- Conventions nommage Wedia
- Bonnes pratiques robustesse

## 🚨 CONTRAINTES ABSOLUES
- Checklist validation qualité
```

## 💡 Tips utilisation

### 🎨 **Personnaliser le prompt**
Avant de coller dans Cursor, tu peux :
- Ajuster le nom de la feature
- Modifier les assertions métier
- Adapter le contexte projet

### 🔍 **Vérifier le résultat**
Cursor génère parfois :
- ✅ Gherkin parfait → Copier tel quel
- ⚠️ Petites erreurs → Corriger manuellement  
- ❌ Format incorrect → Regénérer avec prompt ajusté

### 🚀 **Iterative improvement**
Si résultat pas parfait :
1. **Copier** ce que Cursor a généré
2. **Modifier** le prompt avec des précisions
3. **Régénérer** version améliorée

---

**⚔️ "L'IA guide ton excellence, Makandal guide l'IA !" ⚔️**
