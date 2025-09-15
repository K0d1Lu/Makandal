# 🎯 Génération Test Cucumber Haute Qualité - Makandal IA

## 📋 MISSION
Génère un test Cucumber **professionnel et robuste** à partir de ce recording Chrome, en suivant les bonnes pratiques BDD et les conventions Wedia Portal.

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
Génère **exactement** cette structure :

### 1️⃣ Fichier Feature: `exemple-login.feature`
```gherkin
# Utilise EXACTEMENT ce format Gherkin

Feature: User Authentication - Exemple Login Portal
  As a user
  I want to user can successfully authenticate to the portal
  So that I can access the system functionality

  Background:
    Given I am on the application

  @browser @visual-regression
  Scenario: User can successfully authenticate to the portal
    # Étapes navigation
    When I navigate to '[URL_NAME]'
    
    # Étapes interactions (adapte selon le recording)
    And I write 'admin@wedia.com' in '[ELEMENT_NAME]'
    And I write 'admin123' in '[ELEMENT_NAME]'
    
    # Assertions métier
    Then I should see '[SUCCESS_INDICATOR]'
    And the page should be fully loaded
    
    # 📸 SCREENSHOT OBLIGATOIRE - Visual Regression
    When I take screenshot 'success-state'
    Then visual should match baseline 'success-state'
```

### 2️⃣ Fichier Définitions: `exemple-login_elements.json5`
```json5
{
  // 🎯 Éléments optimisés Portal (priorité data-testid, portal-action)
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

### 3️⃣ Fichier URLs: `exemple-login_urls.json5`
```json5
{
  ""target page": "https://portal.wedia.com/login"
}
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