# 🎯 Génération Test Cucumber Haute Qualité - Makandal IA

## 📋 MISSION
Génère un test Cucumber **professionnel et robuste** à partir de ce recording Chrome, en suivant les bonnes pratiques BDD et les conventions Wedia Portal.

## 📊 ANALYSE DU RECORDING
- **Source**: portal-test.json
- **Titre**: tri portals
- **URL**: https://starter-kit.wedia-group.com/dam/wedia/portals/?orderby=modified%20desc&query=%7B%22or%3Aportalactive.true%22%3A%7B%22activated%22%3A%7B%22eq%22%3Atrue%7D%7D%7D
- **Actions**: 15 étapes détectées
- **Contexte**: unknown (portal)

## 🎯 ACTIONS DÉTECTÉES
1. **NAVIGATION**: Navigate to https://starter-kit.wedia-group.com/dam/wedia/portals/?orderby=modified%20desc&query=%7B%22or%3Aportalactive.true%22%3A%7B%22activated%22%3A%7B%22eq%22%3Atrue%7D%7D%7D
2. **CLICK**: Click on element
3. **CLICK**: Click on element
4. **CLICK**: Click on element
5. **CLICK**: Click on element
6. **OTHER**: doubleClick action
7. **OTHER**: keyDown action
8. **OTHER**: keyUp action
9. **OTHER**: change action
10. **CLICK**: Click on element
11. **CLICK**: Click on element
12. **CLICK**: Click on element
13. **CLICK**: Click on element
14. **OTHER**: change action
15. **CLICK**: Click on element

## 🔍 SÉLECTEURS IDENTIFIÉS
- `div.b-overlay > div:nth-of-type(2)` → **"b overlay"**
- `xpath///*[@id="cw-app"]/div[3]/div[3]/div[2]/div/div/div[3]/div[1]/div/div/a/div/div/div[3]/div[2]` → **"element"**
- `pierce/div.b-overlay > div:nth-of-type(2)` → **"b overlay"**
- `aria/ Editer le portail[role="link"]` → **"element"**
- `div.cw-lp-content--body-header-actions a` → **"cw lp content  body header actions"**
- `xpath///*[@id="cw-app"]/div[3]/div/div/div/div/div[1]/div[2]/div[2]/button[1]/a` → **"element"**
- `pierce/div.cw-lp-content--body-header-actions a` → **"cw lp content  body header actions"**
- `#__BVID__1136 > div > div:nth-of-type(1) span` → **"  BVID  1136"**
- `xpath///*[@id="__BVID__1136"]/div/div[1]/div[1]/span` → **"element"**
- `pierce/#__BVID__1136 > div > div:nth-of-type(1) span` → **"  BVID  1136"**
- `text/Assets` → **"element"**
- `aria/` → **"element"**
- `div.cw-lp-content--body button:nth-of-type(3)` → **"cw lp content  body"**
- `xpath///*[@id="__bv_popover_1969__"]/div[2]/div/button[3]` → **"element"**
- `pierce/div.cw-lp-content--body button:nth-of-type(3)` → **"cw lp content  body"**
- `aria/Confirmer` → **"element"**
- `aria/[role="generic"]` → **"element"**
- `button.btn-secondary > div` → **"submit button"**
- `xpath///*[@id="__BVID__2328___BV_modal_footer_"]/button[2]/div` → **"element"**
- `pierce/button.btn-secondary > div` → **"submit button"**
- `text/Confirmer` → **"element"**
- `#__BVID__3591 li:nth-of-type(3) div` → **"  BVID  3591"**
- `xpath///*[@id="__BVID__3617___BV_tab_button__"]/div` → **"element"**
- `pierce/#__BVID__3591 li:nth-of-type(3) div` → **"  BVID  3591"**
- `aria/Titre de la section *` → **"element"**
- `#namefr` → **"namefr"**
- `xpath///*[@id="namefr"]` → **"element"**
- `pierce/#namefr` → **"namefr"**
- `xpath///*[@id="__BVID__3581___BV_modal_footer_"]/button[2]/div` → **"element"**

## 📝 STRUCTURE ATTENDUE
Génère **exactement** cette structure :

### 1️⃣ Fichier Feature: `portal-test.feature`
```gherkin
# Utilise EXACTEMENT ce format Gherkin

Feature: tri portals - User Journey
  As a user
  I want to user can complete the user journey
  So that I can access the system functionality

  Background:
    Given I am on the application

  @browser @visual-regression
  Scenario: User can complete the user journey
    # Étapes navigation
    When I navigate to '[URL_NAME]'
    
    # Étapes interactions (adapte selon le recording)
    And I interact with the interface
    
    # Assertions métier
    Then I should see '[SUCCESS_INDICATOR]'
    And the page should be fully loaded
    
    # 📸 SCREENSHOT OBLIGATOIRE - Visual Regression
    When I take screenshot 'success-state'
    Then visual should match baseline 'success-state'
```

### 2️⃣ Fichier Définitions: `portal-test_elements.json5`
```json5
{
  // 🎯 Éléments optimisés Portal (priorité data-testid, portal-action)
  "b overlay": "div.b-overlay > div:nth-of-type(2)",
  "element": "xpath///*[@id="cw-app"]/div[3]/div[3]/div[2]/div/div/div[3]/div[1]/div/div/a/div/div/div[3]/div[2]",
  "b overlay": "pierce/div.b-overlay > div:nth-of-type(2)",
  "element": "aria/ Editer le portail[role="link"]",
  "cw lp content  body header actions": "div.cw-lp-content--body-header-actions a",
  "element": "xpath///*[@id="cw-app"]/div[3]/div/div/div/div/div[1]/div[2]/div[2]/button[1]/a",
  "cw lp content  body header actions": "pierce/div.cw-lp-content--body-header-actions a",
  "  BVID  1136": "#__BVID__1136 > div > div:nth-of-type(1) span",
  "element": "xpath///*[@id="__BVID__1136"]/div/div[1]/div[1]/span",
  "  BVID  1136": "pierce/#__BVID__1136 > div > div:nth-of-type(1) span",
  "element": "text/Assets",
  "element": "aria/",
  "cw lp content  body": "div.cw-lp-content--body button:nth-of-type(3)",
  "element": "xpath///*[@id="__bv_popover_1969__"]/div[2]/div/button[3]",
  "cw lp content  body": "pierce/div.cw-lp-content--body button:nth-of-type(3)",
  "element": "aria/Confirmer",
  "element": "aria/[role="generic"]",
  "submit button": "button.btn-secondary > div",
  "element": "xpath///*[@id="__BVID__2328___BV_modal_footer_"]/button[2]/div",
  "submit button": "pierce/button.btn-secondary > div",
  "element": "text/Confirmer",
  "  BVID  3591": "#__BVID__3591 li:nth-of-type(3) div",
  "element": "xpath///*[@id="__BVID__3617___BV_tab_button__"]/div",
  "  BVID  3591": "pierce/#__BVID__3591 li:nth-of-type(3) div",
  "element": "aria/Titre de la section *",
  "namefr": "#namefr",
  "element": "xpath///*[@id="namefr"]",
  "namefr": "pierce/#namefr",
  "element": "xpath///*[@id="__BVID__3581___BV_modal_footer_"]/button[2]/div"
}
```

### 3️⃣ Fichier URLs: `portal-test_urls.json5`
```json5
{
  ""target page": "https://starter-kit.wedia-group.com/dam/wedia/portals/?orderby=modified%20desc&query=%7B%22or%3Aportalactive.true%22%3A%7B%22activated%22%3A%7B%22eq%22%3Atrue%7D%7D%7D"
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