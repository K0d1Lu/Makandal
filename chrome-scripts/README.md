# 🔥 chrome-scripts/ - Scripts Chrome Recorder générés

> **🎯 UNIQUEMENT les scripts JavaScript à coller dans Chrome DevTools Console**

## 📋 Contenu de ce dossier
- ✅ **Fichiers .js** : Scripts Chrome Recorder optimisés
- ✅ **Configurations** : Wedia Portal, Dev, React, etc.
- ✅ **Template de base** : Modèle pour génération IA

## 🗂️ Organisation
```
chrome-scripts/
├── chrome-recorder-wedia-portal-[timestamp].js
├── chrome-recorder-wedia-dev-[timestamp].js
├── chrome-recorder-template.js (template IA)
└── README.md (ce fichier)
```

## 🚀 Génération scripts
```bash
# Production Wedia Portal
npm run makandal:portal
# → Script généré avec timestamp dans chrome-scripts/

# Développement avec debug  
npm run makandal:dev
# → Script dev généré dans chrome-scripts/
```

## 📋 Utilisation dans Chrome
1. **Copier** contenu du .js généré
2. **Chrome DevTools** → F12 → Console
3. **Coller** script complet → Entrée
4. **Vérifier** : `MakandalRecorder.test()`
5. **Recorder** → Nouvel enregistrement

## ✅ Scripts prêts à l'emploi
- **Portal optimisé** : Priorité `portal-action`, `data-portal`
- **Anti-dynamique** : Évite `__BVID__`, IDs numériques
- **Debug intégré** : Messages console colorés
- **Test inclus** : Validation sélecteurs

---
**⚔️ "Ces scripts guident Chrome vers la vérité des sélecteurs !" ⚔️**
