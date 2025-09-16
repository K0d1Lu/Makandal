# 🥒 cucumber-tests/ - Vos tests Cucumber générés

> **🎯 UNIQUEMENT les tests Cucumber finaux (.feature, _elements.json5, _urls.json5)**

## 📋 Contenu de ce dossier
- ✅ **Fichiers .feature** : Tests Gherkin BDD
- ✅ **Fichiers _elements.json5** : Définitions sélecteurs  
- ✅ **Fichiers _urls.json5** : Définitions URLs
- ✅ **Sous-dossiers** par contexte métier

## 🗂️ Organisation recommandée
```
cucumber-tests/
├── authentication/
│   ├── login-admin.feature
│   ├── login-admin_elements.json5
│   └── login-admin_urls.json5
├── portal-management/
│   ├── create-portal.feature
│   ├── edit-portal.feature
│   └── shared_elements.json5
├── search/
└── README.md (ce fichier)
```

## 📤 Comment les fichiers arrivent ici

### 🔄 Méthode A - Conversion automatique
```bash
./bin/convert-recording.sh mon-recording.json
# → Fichiers créés automatiquement dans cucumber-tests/
```

### 🤖 Méthode B - Via prompts IA
```bash
npm run hi-makandal → Option 4
# → Prompt généré dans cursor-prompts/
# → Coller dans Cursor Chat
# → Copier résultats ICI manuellement
```

## 🚀 Utilisation des fichiers générés
1. **Copier** vers votre projet wedia_demo
2. **Intégrer** dans votre suite de tests
3. **Adapter** selon besoins spécifiques

---
**⚔️ "Ici vivent tes tests de liberté !" ⚔️**
