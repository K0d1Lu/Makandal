# 📦 Guide d'installation - Chrome Recorder Workflow

> Package complet et organisé pour automatiser la conversion Chrome DevTools → Tests Cucumber

## 🚀 Installation rapide

```bash
# 1. Naviguez vers le workflow
cd chrome-recorder-workflow

# 2. Exécutez l'installation automatique
./install.sh

# 3. Testez l'installation  
npm test
```

## 📁 Structure du package installé

```
chrome-recorder-workflow/
├── 📦 package.json              # Configuration npm et scripts
├── 📖 README.md                 # Documentation principale
├── 📄 CHANGELOG.md              # Historique des versions
├── 🛠️  install.sh               # Script d'installation automatique
├── 🔒 .gitignore                # Fichiers à ignorer en Git
│
├── 📁 tools/                    # Outils de conversion
│   ├── chrome-recorder-config.js        # Configuration Chrome optimisée
│   ├── chrome-to-cucumber-converter.js  # Convertisseur principal
│   └── improve-generated-tests.js       # Amélioration post-génération
│
├── 📁 scripts/                  # Scripts d'automatisation
│   └── chrome-workflow.sh               # Workflow complet
│
├── 📁 examples/                 # Exemples fonctionnels
│   ├── example-chrome-recording.json    # Enregistrement Chrome
│   ├── example-chrome-recording.feature # Test Cucumber généré
│   └── example-chrome-recording_*.json5 # Définitions extraites
│
├── 📁 docs/                     # Documentation complète
│   └── README-Chrome-Workflow.md        # Guide détaillé d'utilisation
│
└── 📁 templates/                # Templates de base
    ├── feature-template.feature         # Template de test Gherkin
    ├── elements-template.json5          # Template de définitions d'éléments
    └── urls-template.json5              # Template de définitions d'URLs
```

## ⚙️ Scripts npm disponibles

| Commande | Description | Exemple d'usage |
|----------|-------------|-----------------|
| `npm run convert` | Conversion simple Chrome → Cucumber | `npm run convert mon-test.json` |
| `npm run improve` | Amélioration d'un test existant | `npm run improve test.feature` |
| `npm run workflow` | Workflow complet automatisé | `npm run workflow test.json "Feature"` |
| `npm test` | Test de validation avec exemple | `npm test` |
| `npm run validate` | Validation de la syntaxe | `npm run validate` |
| `npm run docs` | Affiche le lien vers la documentation | `npm run docs` |

## 🔧 Configuration système requise

### ✅ Prérequis validés automatiquement

- **Node.js** ≥ 16.0.0 ✅
- **npm** ≥ 7.0.0 ✅ 
- **Chrome DevTools** avec Recorder ✅

### ✅ Permissions configurées

- Scripts shell exécutables ✅
- Création de fichiers et dossiers ✅
- Accès en lecture/écriture ✅

### ✅ Structure validée

- Tous les fichiers essentiels présents ✅
- Syntaxe JavaScript validée ✅
- Tests fonctionnels réussis ✅

## 🎯 Utilisation immédiate

### 🎬 Workflow recommandé

1. **Enregistrez** votre scénario dans Chrome DevTools
2. **Exportez** en JSON
3. **Convertissez** automatiquement :

```bash
# Workflow complet
npm run workflow mon-scenario.json "Mon Feature"

# OU conversion simple
npm run convert mon-scenario.json
```

### 📂 Fichiers générés

Les fichiers générés sont automatiquement organisés :

```
../features/generated/           # Tests Cucumber 
../definitions/                  # Définitions d'éléments et URLs
└── _generated_*.json5          # Fichiers extraits automatiquement
```

## 🔄 Intégration avec votre projet

### Dans votre suite de tests existante

```bash
# Copiez les définitions générées
cp ../definitions/_generated_*.json5 ../cucumber-app/project/definitions/

# Copiez les tests générés  
cp ../features/generated/*.feature ../cucumber-app/project/features/

# Exécutez vos tests
cd ../cucumber-app/project && npm run test:dev
```

### Dans votre workflow CI/CD

```yaml
# Exemple GitHub Actions
- name: Convert Chrome recordings
  run: |
    cd Test/e2e-tests/chrome-recorder-workflow
    npm run workflow ${{ github.event.inputs.recording_file }}
    
- name: Run generated tests
  run: |
    cd Test/e2e-tests/cucumber-app/project  
    npm run test:build && npm run test:run
```

## 🎓 Ressources d'apprentissage

### 📖 Documentation

- **[Guide complet](./docs/README-Chrome-Workflow.md)** - Utilisation détaillée
- **[Templates](./templates/)** - Exemples de structure
- **[Exemples](./examples/)** - Cas d'usage réels

### 🧪 Tests et validation

```bash
# Test complet du workflow
npm test

# Validation de la syntaxe uniquement
npm run validate

# Test avec vos propres enregistrements
npm run convert votre-test.json
```

## 🆘 Dépannage

### ❌ Problèmes courants

**Erreur de permissions :**
```bash
chmod +x scripts/chrome-workflow.sh
chmod +x install.sh
```

**Node.js trop ancien :**
```bash
# Installez Node.js ≥ 16.0.0
nvm install 16  # Si vous utilisez nvm
```

**Fichiers manquants :**
```bash
# Réinstallez le package
./install.sh
```

### ✅ Validation de l'installation

```bash
# Vérifiez que tout fonctionne
npm run validate && npm test
```

## 🔄 Mise à jour

Pour mettre à jour vers une nouvelle version :

```bash
# Sauvegardez vos modifications
git add . && git commit -m "Save before update"

# Remplacez les fichiers du workflow
# (selon votre méthode de déploiement)

# Relancez l'installation
./install.sh
```

## 📞 Support

- 🐛 **Issues** : [GitHub Issues](https://github.com/wedia-group/wedia-demo/issues)
- 📖 **Documentation** : [Guide complet](./docs/README-Chrome-Workflow.md)
- 💬 **Questions** : Équipe Wedia

---

<div align="center">
  <strong>✅ Installation réussie !</strong><br>
  <em>Vous êtes prêt à automatiser vos tests E2E avec Chrome Recorder</em>
</div>
