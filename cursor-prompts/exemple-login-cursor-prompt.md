# 🎯 Génération Test Cucumber Haute Qualité - Makandal IA

## 📋 MISSION
Génère un test Cucumber **professionnel et robuste** à partir de ce recording Chrome, en suivant les bonnes pratiques BDD et les conventions Wedia Portal.

## 🗣️ CONTEXTE UTILISATEUR REQUIS

**AVANT de générer les fichiers, demande-moi ces informations :**

1. **Contexte métier** : À quoi sert ce test ? (ex: "Authentification admin", "Gestion portails", "Recherche produits")
2. **Nom de feature** : Comment appeler la fonctionnalité ? (ex: "User Authentication", "Portal Management")  
3. **Acteur principal** : Qui utilise cette fonctionnalité ? (ex: "administrator", "user", "editor")
4. **Objectif métier** : Quel résultat attendu ? (ex: "accéder au dashboard", "créer un portail")
5. **Organisation** : Dans quel sous-dossier organiser ? (ex: "authentication/", "portal-management/")

**⚠️ Ne génère RIEN avant d'avoir ces réponses !**

## 📊 ANALYSE DU RECORDING
- **Source**: exemple-login.json
- **Titre**: Exemple Login Portal
- **URL**: https://portal.wedia.com/login
- **Actions**: 7 étapes détectées
- **Contexte**: authentication (unknown)

## 🎯 ACTIONS DÉTECTÉES
1. **NAVIGATION**: Navigate to https://portal.wedia.com/login
2. **CLICK**: Click on element
3. **INPUT**: Type "admin@wedia.com"
4. **CLICK**: Click on element
5. **INPUT**: Type "admin123"
6. **CLICK**: Click on element
7. **WAIT**: Wait for element

## 🔍 SÉLECTEURS IDENTIFIÉS
- `input[data-testid='email-input']` → **"email field"**
- `#email-field` → **"email field"**
- `.login-email` → **"email field"**
- `input[data-testid='password-input']` → **"password field"**
- `#password-field` → **"password field"**
- `.login-password` → **"email field"**
- `button[portal-action='login']` → **"email field"**
- `button[data-testid='login-button']` → **"email field"**
- `#login-btn` → **"email field"**
- `.btn-login` → **"email field"**

## 📝 STRUCTURE ATTENDUE
**Après avoir reçu le contexte utilisateur, génère exactement ces 3 fichiers :**

### 1️⃣ Fichier Feature: `[nom-contextuel].feature`
```gherkin
# Utilise EXACTEMENT ce format Gherkin avec le contexte utilisateur

Feature: [NOM_FEATURE_UTILISATEUR]
  As [ACTEUR_PRINCIPAL]
  I want to [OBJECTIF_MÉTIER] 
  So that I can [BÉNÉFICE_ATTENDU]

  Background:
    Given I am on the application

  @browser @visual-regression @[TAG_CONTEXTE]
  Scenario: [SCENARIO_DESCRIPTIF_UTILISATEUR]
    # Étapes navigation
    When I navigate to '[URL_NAME]'
    
    # Étapes interactions (adapte selon le recording + contexte)
    And I write 'admin@wedia.com' in '[ELEMENT_NAME]'
    And I write 'admin123' in '[ELEMENT_NAME]'
    
    # Assertions métier (adapte au contexte utilisateur)
    Then I should see '[SUCCESS_INDICATOR_CONTEXTUEL]'
    And [VALIDATION_MÉTIER_SPÉCIFIQUE]
    
    # 📸 SCREENSHOT OBLIGATOIRE - Visual Regression
    When I take screenshot '[contexte]-success'
    Then visual should match baseline '[contexte]-success'
```

### 2️⃣ Fichier Définitions: `[nom-contextuel]_elements.json5`
```json5
{
  // 🎯 Éléments optimisés Portal - [CONTEXTE_UTILISATEUR]
  // Priorité: portal-action, data-portal, data-testid
  
  "email field": "input[data-testid='email-input']",
  "email field": "#email-field",
  "email field": ".login-email",
  "password field": "input[data-testid='password-input']",
  "password field": "#password-field",
  "email field": ".login-password",
  "email field": "button[portal-action='login']",
  "email field": "button[data-testid='login-button']",
  "email field": "#login-btn",
  "email field": ".btn-login"
}
```

### 3️⃣ Fichier URLs: `[nom-contextuel]_urls.json5`
```json5
{
  // 🎯 URLs fonctionnelles - [CONTEXTE_UTILISATEUR]
  ""target page": "https://portal.wedia.com/login"
}
```

## 📂 OÙ SAUVEGARDER LES FICHIERS GÉNÉRÉS

**⚠️ INSTRUCTIONS CRUCIALES POUR L'UTILISATEUR :**

Une fois que tu as généré les 3 fichiers ci-dessus :

### 🎯 Étape 1 : Créer la structure
```bash
# Dans le projet Makandal
mkdir -p cucumber-tests/[DOSSIER_ORGANISATION]/
```

### 🎯 Étape 2 : Sauvegarder les fichiers
```
cucumber-tests/[DOSSIER_ORGANISATION]/
├── [nom-contextuel].feature
├── [nom-contextuel]_elements.json5
└── [nom-contextuel]_urls.json5
```

### 🎯 Étape 3 : Exemple concret
```
# Si organisation = "authentication" et nom = "admin-login"
cucumber-tests/authentication/
├── admin-login.feature
├── admin-login_elements.json5
└── admin-login_urls.json5
```

### 🎯 Étape 4 : Intégration wedia_demo
Copier ensuite vers le projet principal :
```
wedia_demo/Test/e2e-tests/cucumber-app/project/
├── features/[contexte]/
└── definitions/
```

## ⚡ OPTIMISATIONS REQUISES

### 🎯 Sélecteurs Portal
- **PRIORITÉ 1**: `portal-action="..."`
- **PRIORITÉ 2**: `data-portal="..."` 
- **PRIORITÉ 3**: `data-testid="..."`
- **Éviter**: IDs dynamiques (`__BVID__`, numériques)

### 📝 Nommage Intelligent
- **Éléments**: Noms métier descriptifs ("submit button", "email field")
- **URLs**: Noms fonctionnels ("login page", "dashboard")
- **Screenshots**: État métier ("login-success", "dashboard-loaded")

### 🔧 Robustesse
- Attentes explicites (`within X seconds`)
- Assertions métier (pas juste technique)
- Gestion états de chargement

### 📸 Visual Regression (OBLIGATOIRE)
- Screenshot à la fin de chaque scénario
- Nommage cohérent avec le contexte
- Préparation pour comparaison baseline

## 🚨 CONTRAINTES ABSOLUES
1. ✅ Format Gherkin **strictement** valide
2. ✅ Nommage éléments **descriptif** (pas techniques)  
3. ✅ **Toujours** inclure screenshot final
4. ✅ Sélecteurs **Portal-optimisés** (data-testid, portal-action)
5. ✅ Assertions **métier** (pas juste "element exists")
6. ✅ Commentaires JSON5 **explicatifs**

## 🎯 RÉSULTAT ATTENDU
3 fichiers générés prêts pour intégration dans wedia_demo :
- ✅ Feature Gherkin professionnel
- ✅ Définitions éléments optimisées  
- ✅ URLs fonctionnelles
- ✅ Screenshot baseline inclus

---
**⚔️ "Que Makandal guide cette génération vers l'excellence !" ⚔️**