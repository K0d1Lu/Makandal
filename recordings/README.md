# 📥 Dossier recordings/ - Vos exports Chrome DevTools

> **Placez ici vos fichiers JSON exportés de Chrome DevTools Recorder**

## 🎯 Instructions pour l'équipe

### 1️⃣ Après l'enregistrement Chrome
1. **Recorder** → Bouton **Export** (en haut à droite)
2. **Format** : JSON (par défaut)
3. **Nom** : Utilisez des noms descriptifs
4. **Sauvegarder** : Dans ce dossier `recordings/`

### 📝 Conventions de nommage recommandées
```
login-admin.json          # Connexion administrateur
search-product.json       # Recherche produit
upload-document.json      # Upload document
user-profile-edit.json    # Modification profil utilisateur
```

### 🎬 Exemples de bons noms
- ✅ `login-portal-admin.json`
- ✅ `create-new-project.json`
- ✅ `delete-user-confirmation.json`
- ❌ `recording1.json`
- ❌ `test.json`
- ❌ `chrome-recording-123456.json`

## 🚀 Conversion vers Cucumber

### Une fois votre fichier placé ici :
```bash
# Conversion simple
npm run convert:file votre-fichier.json

# Workflow complet (recommandé)
npm run workflow:file votre-fichier.json
```

### 📂 Vos tests seront générés dans :
- **Feature** : `features/generated/votre-fichier.feature`
- **Définitions** : `features/generated/definitions/`

## 📋 Commandes utiles

```bash
# Voir tous vos recordings
npm run recordings

# Lister avec détails
ls -la recordings/

# Compter vos recordings
ls recordings/*.json | wc -l
```

## 🎯 Tips pour de meilleurs recordings

### 🎨 Pendant l'enregistrement
- **Pausez** avant les actions importantes
- **Évitez** les mouvements de souris inutiles  
- **Cliquez** de façon délibérée et claire
- **Attendez** le chargement des pages

### 🔍 Sélecteurs optimaux
Le script Makandal cherche dans cet ordre :
1. **`portal-action`** ⭐⭐⭐
2. **`data-portal`** ⭐⭐⭐
3. **`data-testid`** ⭐⭐
4. **`aria-label`** ⭐
5. **`id`** (si stable)

### 📊 Données de test cohérentes
- **Email** : `test@wedia.com`
- **Mot de passe** : `password123`
- **Nom** : `Test User`
- **Téléphone** : `0123456789`

---

**⚔️ Une fois votre JSON ici, Makandal le transforme en test Cucumber ! ⚔️**
