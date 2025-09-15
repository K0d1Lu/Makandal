# 🔥 Makandal CLI - Guide d'usage pour l'équipe

> **CLI simple et natif pour générer vos scripts Chrome Recorder**

## 🚀 Démarrage ultra-rapide

```bash
# Production Wedia Portal (recommandé)
npm run makandal:portal

# Développement avec debug
npm run makandal:dev

# Aide et liste des configs
npm run makandal:help
```

## 📋 Commandes disponibles

### 🎯 Scripts prédéfinis (recommandés)
```bash
npm run makandal:portal    # Config Wedia Portal optimisée
npm run makandal:dev       # Config développement + debug  
npm run makandal:help      # Aide + liste des configs
npm run list-configs       # Voir toutes les configs disponibles
```

### ⚡ Syntaxe générique
```bash
npm run makandal -- -conf <nom-config>
```

**Exemples :**
```bash
npm run makandal -- -conf wedia-portal       # Config production
npm run makandal -- -conf wedia-portal-dev   # Config développement
```

## 📁 Configs disponibles

| Config | Usage | Optimisations |
|--------|--------|---------------|
| `wedia-portal` | **Production** | Portal-action, data-portal, sélecteurs stables |
| `wedia-portal-dev` | **Développement** | Debug activé, logs verbeux, validation étendue |

## 🎯 Workflow équipe

### 1️⃣ Génération du script
```bash
npm run makandal:portal
```

### 2️⃣ Usage Chrome DevTools
1. **F12** → Ouvrir DevTools
2. **Console** → Aller dans l'onglet Console  
3. **Coller** → Copier le contenu du fichier généré
4. **Exécuter** → Appuyer sur Entrée
5. **Recorder** → Aller dans l'onglet Recorder
6. **Enregistrer** → Créer un nouvel enregistrement

### 3️⃣ Test et validation
Dans la console Chrome :
```javascript
MakandalRecorder.test()        // Test des sélecteurs
MakandalRecorder.CONFIG        // Voir la config chargée
```

## 🔧 Configs personnalisées

### Créer une nouvelle config
1. **Créer** : `configs/ma-config.json`
2. **Utiliser** : `npm run makandal -- -conf ma-config`

### Structure config JSON
```json
{
  "name": "Mon Projet",
  "description": "Ma config personnalisée",
  "selectorPriorities": ["data-testid", "aria-label"],
  "dynamicValuePatterns": [
    {"pattern": "^\\d+$", "description": "IDs numériques", "flags": ""}
  ],
  "preferences": {
    "maxTextLength": 30,
    "allowTextSelectors": true
  }
}
```

## 🎨 Output et fichiers générés

### Dossier de sortie
```
generated-scripts/
├── chrome-recorder-wedia-portal-[timestamp].js
├── chrome-recorder-wedia-portal-dev-[timestamp].js
└── chrome-recorder-template.js
```

### Nommage automatique
- **Format** : `chrome-recorder-{config}-{timestamp}.js`
- **Horodatage** : Évite les conflits
- **Config** : Traçabilité de la configuration utilisée

## 🚨 Troubleshooting

### ❌ "Configuration introuvable"
```bash
npm run makandal:help    # Voir les configs disponibles
npm run list-configs     # Lister tous les fichiers configs
```

### ❌ "Erreur JSON"
- Vérifier la syntaxe JSON de votre config
- Utiliser un validateur JSON en ligne

### ❌ "Permission denied"
```bash
chmod +x bin/makandal-cli.js    # Rendre exécutable
```

## 💡 Tips pour l'équipe

### 🎯 Bonnes pratiques
- **Production** : Toujours `npm run makandal:portal`
- **Debug** : Utiliser `npm run makandal:dev` pour investiguer
- **Tests** : Toujours faire `MakandalRecorder.test()` après injection

### ⚡ Raccourcis
```bash
# Alias dans votre .bashrc/.zshrc
alias mkp="npm run makandal:portal"
alias mkd="npm run makandal:dev"  
alias mkh="npm run makandal:help"
```

### 🔍 Sélecteurs prioritaires Portal
1. **`portal-action`** → Actions métier Portal ⭐
2. **`data-portal`** → Données Portal ⭐  
3. **`data-testid`** → IDs de test ⭐
4. **`aria-label`** → Accessibilité
5. **`id`** → IDs HTML (si stables)

## 🎉 Résultat attendu

Après génération et injection dans Chrome :
- ✅ **window.MakandalRecorder** disponible
- ✅ Sélecteurs Portal prioritaires
- ✅ Détection automatique des éléments dynamiques
- ✅ Messages console colorés
- ✅ Fonction de test intégrée

---

**⚔️ "François Makandal guide vos sélecteurs !" ⚔️**
