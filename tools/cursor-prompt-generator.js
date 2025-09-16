#!/usr/bin/env node

/**
 * 🤖 Générateur de Prompt Cursor IA - Makandal
 * 🎯 Transforme un recording Chrome en prompt optimisé pour Cursor
 * 📝 Génère prompts pour tests Cucumber haute qualité avec screenshot
 */

const fs = require('fs');
const path = require('path');
const { MakandalEnvironmentManager } = require('./env-manager');

// 📊 Analyser un recording Chrome
function analyzeRecording(recordingData) {
  const analysis = {
    title: recordingData.title || 'Recording Chrome',
    url: null,
    actions: [],
    selectors: new Set(),
    inputData: [],
    screenshots: []
  };
  
  if (recordingData.steps) {
    recordingData.steps.forEach((step, index) => {
      switch (step.type) {
        case 'navigate':
          analysis.url = step.url;
          analysis.actions.push({
            type: 'navigation',
            description: `Navigate to ${step.url}`,
            step: index + 1
          });
          break;
          
        case 'click':
          if (step.selectors && step.selectors.length > 0) {
            step.selectors.forEach(selectorGroup => {
              selectorGroup.forEach(selector => {
                analysis.selectors.add(selector);
              });
            });
            
            analysis.actions.push({
              type: 'click',
              description: `Click on element`,
              selectors: step.selectors[0] || [],
              step: index + 1
            });
          }
          break;
          
        case 'type':
          if (step.text) {
            analysis.inputData.push({
              text: step.text,
              selectors: step.selectors?.[0] || [],
              step: index + 1
            });
            
            analysis.actions.push({
              type: 'input',
              description: `Type "${step.text}"`,
              selectors: step.selectors?.[0] || [],
              step: index + 1
            });
          }
          break;
          
        case 'waitForElement':
          analysis.actions.push({
            type: 'wait',
            description: 'Wait for element',
            selectors: step.selectors?.[0] || [],
            step: index + 1
          });
          break;
          
        case 'setViewport':
          // Ignorer pour le prompt
          break;
          
        default:
          analysis.actions.push({
            type: 'other',
            description: `${step.type} action`,
            step: index + 1
          });
      }
    });
  }
  
  return analysis;
}

// 🎯 Identifier le contexte métier
function identifyBusinessContext(analysis) {
  const context = {
    domain: 'unknown',
    scenario: 'unknown',
    keywords: []
  };
  
  // Analyser URL pour contexte
  if (analysis.url) {
    if (analysis.url.includes('login') || analysis.url.includes('signin')) {
      context.scenario = 'authentication';
      context.keywords.push('login', 'authentication', 'sign in');
    } else if (analysis.url.includes('dashboard') || analysis.url.includes('home')) {
      context.scenario = 'navigation';
      context.keywords.push('dashboard', 'home', 'main page');
    } else if (analysis.url.includes('portal')) {
      context.domain = 'portal';
      context.keywords.push('portal', 'wedia');
    }
  }
  
  // Analyser actions pour contexte
  analysis.inputData.forEach(input => {
    if (input.text.includes('@') || input.text.includes('email')) {
      context.keywords.push('email', 'user identification');
    }
    if (input.text.length < 20 && !input.text.includes('@')) {
      context.keywords.push('password', 'credentials');
    }
  });
  
  return context;
}

// 🎨 Générer nom feature intelligent
function generateFeatureName(analysis, context) {
  const title = analysis.title || 'Chrome Recording';
  
  if (context.scenario === 'authentication') {
    return `User Authentication - ${title}`;
  } else if (context.scenario === 'navigation') {
    return `Navigation Flow - ${title}`;
  } else {
    return `${title} - User Journey`;
  }
}

// 📝 Générer description scénario
function generateScenarioDescription(analysis, context) {
  let description = 'User can ';
  
  if (context.scenario === 'authentication') {
    description += 'successfully authenticate to the portal';
  } else {
    description += 'complete the user journey';
  }
  
  return description;
}

// 🔍 Générer sélecteurs optimisés  
function generateOptimizedSelectors(analysis) {
  const selectors = [];
  
  Array.from(analysis.selectors).forEach(selector => {
    let optimized = selector;
    let elementName = '';
    
    // Identifier type d'élément
    if (selector.includes('email') || selector.includes('login')) {
      elementName = 'email field';
    } else if (selector.includes('password')) {
      elementName = 'password field';
    } else if (selector.includes('submit') || selector.includes('btn')) {
      elementName = 'submit button';
    } else if (selector.includes('input')) {
      elementName = 'input field';
    } else {
      // Extraire nom générique
      const match = selector.match(/[#.]([^#.\s\[\]]+)/);
      elementName = match ? match[1].replace(/[-_]/g, ' ') : 'element';
    }
    
    selectors.push({
      original: selector,
      optimized: optimized,
      name: elementName
    });
  });
  
  return selectors;
}

// 🔍 Analyser la structure du projet wedia_demo
async function analyzeWediaProjectStructure(wediaPaths) {
  if (!wediaPaths || !wediaPaths.demoPath) {
    return 'Structure wedia_demo non disponible';
  }

  try {
    const structure = {
      demoPath: wediaPaths.demoPath,
      featuresPath: wediaPaths.featuresPath,
      definitionsPath: wediaPaths.definitionsPath
    };

    // Analyser les dossiers features existants
    const featuresDir = wediaPaths.featuresPath;
    const existingFeatureDirs = [];
    
    if (fs.existsSync(featuresDir)) {
      const items = fs.readdirSync(featuresDir);
      for (const item of items) {
        const itemPath = path.join(featuresDir, item);
        if (fs.statSync(itemPath).isDirectory() && !item.startsWith('.')) {
          existingFeatureDirs.push(item);
        }
      }
    }

    // Analyser les fichiers de définitions existants
    const definitionsDir = wediaPaths.definitionsPath;
    const existingDefinitions = [];
    
    if (fs.existsSync(definitionsDir)) {
      const files = fs.readdirSync(definitionsDir);
      existingDefinitions.push(...files.filter(f => f.endsWith('.json5')));
    }

    return `
📁 Structure wedia_demo détectée:
• Projet: ${path.basename(structure.demoPath)}
• Features: ${structure.featuresPath}
• Definitions: ${structure.definitionsPath}

📂 Dossiers features existants: ${existingFeatureDirs.length > 0 ? existingFeatureDirs.join(', ') : 'aucun'}
📝 Fichiers definitions existants: ${existingDefinitions.length} fichiers

🎯 Choix intelligent recommandé:
• Si authentification → features/authentication/
• Si gestion portails → features/portal-management/  
• Si recherche → features/search/
• Autres → features/generated/ (par défaut)
`;

  } catch (error) {
    return `Structure wedia_demo partiellement analysée - erreur: ${error.message}`;
  }
}

// 🚀 Générer le prompt principal avec analyse wedia_demo
async function generateCursorPrompt(recordingFile) {
  try {
    // 🤖 Agent AI - Chargement environnement wedia_demo
    const envManager = new MakandalEnvironmentManager();
    let wediaPaths = null;
    let projectStructure = '';
    
    try {
      await envManager.ensureEnvironmentReady();
      wediaPaths = envManager.getWediaPaths();
      projectStructure = await analyzeWediaProjectStructure(wediaPaths);
    } catch (error) {
      console.log('⚠️  Environnement wedia_demo non configuré - prompt générique généré');
      projectStructure = 'Structure wedia_demo non disponible - utiliser paths par défaut';
    }

    // Charger et parser le JSON
    const recordingPath = path.join('recordings', recordingFile);
    const recordingData = JSON.parse(fs.readFileSync(recordingPath, 'utf8'));
    
    // Analyser le recording
    const analysis = analyzeRecording(recordingData);
    const context = identifyBusinessContext(analysis);
    const featureName = generateFeatureName(analysis, context);
    const scenarioDescription = generateScenarioDescription(analysis, context);
    const optimizedSelectors = generateOptimizedSelectors(analysis);
    
    // Générer le prompt optimisé avec analyse wedia_demo
    const prompt = `# 🎯 Génération Test Cucumber Haute Qualité - Makandal IA

## 📋 MISSION
Génère un test Cucumber **professionnel et robuste** à partir de ce recording Chrome, en suivant les bonnes pratiques BDD et les conventions Wedia Portal. **Tu auras accès à la structure du projet wedia_demo pour choisir intelligemment l'emplacement des fichiers.**

## 🏗️ ANALYSE PROJET WEDIA_DEMO
${projectStructure}

## 🗣️ CONTEXTE UTILISATEUR REQUIS

**AVANT de générer les fichiers, demande-moi ces informations :**

1. **Contexte métier** : À quoi sert ce test ? (ex: "Authentification admin", "Gestion portails", "Recherche produits")
2. **Nom de feature** : Comment appeler la fonctionnalité ? (ex: "User Authentication", "Portal Management")
3. **Acteur principal** : Qui utilise cette fonctionnalité ? (ex: "administrator", "user", "editor")
4. **Objectif métier** : Quel résultat attendu ? (ex: "accéder au dashboard", "créer un portail")

**⚠️ Ne génère RIEN avant d'avoir ces réponses !**

## 🧠 INTELLIGENCE ORGANISATIONNELLE

**Après avoir reçu le contexte utilisateur, choisis intelligemment :**
- **Dossier features** : Analyse les dossiers existants et choisis le plus approprié
- **Nommage** : Utilise des noms cohérents avec l'existant
- **Structure** : Respecte les conventions wedia_demo détectées

## 📊 ANALYSE DU RECORDING
- **Source**: ${recordingFile}
- **Titre**: ${analysis.title}
- **URL**: ${analysis.url || 'Non spécifiée'}
- **Actions**: ${analysis.actions.length} étapes détectées
- **Contexte**: ${context.scenario} (${context.domain})

## 🎯 ACTIONS DÉTECTÉES
${analysis.actions.map((action, index) => 
  `${index + 1}. **${action.type.toUpperCase()}**: ${action.description}`
).join('\n')}

## 🔍 SÉLECTEURS IDENTIFIÉS
${optimizedSelectors.length > 0 ? 
  optimizedSelectors.map(sel => `- \`${sel.original}\` → **"${sel.name}"**`).join('\n') :
  '(Aucun sélecteur spécifique détecté)'
}

## 📝 STRUCTURE ATTENDUE
**Après avoir reçu le contexte utilisateur, génère exactement ces 3 fichiers :**

### 1️⃣ Fichier Feature: \`[nom-contextuel].feature\`
\`\`\`gherkin
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
    ${analysis.inputData.length > 0 ? 
      analysis.inputData.map(input => 
        `And I write '${input.text}' in '[ELEMENT_NAME]'`
      ).join('\n    ') :
      'And I interact with the interface'
    }
    
    # Assertions métier (adapte au contexte utilisateur)
    Then I should see '[SUCCESS_INDICATOR_CONTEXTUEL]'
    And [VALIDATION_MÉTIER_SPÉCIFIQUE]
    
    # 📸 SCREENSHOT OBLIGATOIRE - Visual Regression
    When I take screenshot '[contexte]-success'
    Then visual should match baseline '[contexte]-success'
\`\`\`

### 2️⃣ Fichier Définitions: \`[nom-contextuel]_elements.json5\`
\`\`\`json5
{
  // 🎯 Éléments optimisés Portal - [CONTEXTE_UTILISATEUR]
  // Priorité: portal-action, data-portal, data-testid
  
  ${optimizedSelectors.map(sel => 
    `"${sel.name}": "${sel.optimized}"`
  ).join(',\n  ')}
}
\`\`\`

### 3️⃣ Fichier URLs: \`[nom-contextuel]_urls.json5\`
\`\`\`json5
{
  // 🎯 URLs fonctionnelles - [CONTEXTE_UTILISATEUR]
  "${analysis.url ? 
    `"target page": "${analysis.url}"` :
    '"target page": "/"'
  }
}
\`\`\`

## 📂 SAUVEGARDE INTELLIGENTE DANS WEDIA_DEMO

**🤖 INTELLIGENCE AGENT AI : Sauvegarde directe dans wedia_demo !**

### 🧠 Après génération des 3 fichiers, sauvegarde-les directement :

**🎯 Fichier .feature :**
- **Chemin**: \`${wediaPaths ? wediaPaths.featuresPath : 'wedia_demo/features'}/[DOSSIER_INTELLIGENT]/[nom-contextuel].feature\`
- **Dossier intelligent** : Choisi selon le contexte métier (authentication, portal-management, search, ou generated)

**🎯 Fichier _elements.json5 :**
- **Chemin**: \`${wediaPaths ? wediaPaths.definitionsPath : 'wedia_demo/definitions'}/_[nom-contextuel]_elements.json5\`

**🎯 Fichier _urls.json5 :**
- **Chemin**: \`${wediaPaths ? wediaPaths.definitionsPath : 'wedia_demo/definitions'}/_[nom-contextuel]_urls.json5\`

### 🎯 Exemple concret :
Si contexte = "Authentification admin" et nom = "admin-signin":
\`\`\`
${wediaPaths ? wediaPaths.featuresPath : 'wedia_demo/features'}/authentication/
├── admin-signin.feature

${wediaPaths ? wediaPaths.definitionsPath : 'wedia_demo/definitions'}/
├── _admin-signin_elements.json5
└── _admin-signin_urls.json5
\`\`\`

### 🤖 Instructions précises :
1. **Analyse** la structure wedia_demo ci-dessus
2. **Choisis intelligemment** le dossier features approprié
3. **Sauvegarde directement** aux chemins indiqués
4. **Respecte** les conventions de nommage détectées
5. **Informe** l'utilisateur des chemins exacts utilisés

**🚀 RÉVOLUTION : Cursor sauvegarde directement dans wedia_demo !**

## ⚡ OPTIMISATIONS REQUISES

### 🎯 Sélecteurs Portal
- **PRIORITÉ 1**: \`portal-action="..."\`
- **PRIORITÉ 2**: \`data-portal="..."\` 
- **PRIORITÉ 3**: \`data-testid="..."\`
- **Éviter**: IDs dynamiques (\`__BVID__\`, numériques)

### 📝 Nommage Intelligent
- **Éléments**: Noms métier descriptifs ("submit button", "email field")
- **URLs**: Noms fonctionnels ("login page", "dashboard")
- **Screenshots**: État métier ("login-success", "dashboard-loaded")

### 🔧 Robustesse
- Attentes explicites (\`within X seconds\`)
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
**⚔️ "Que Makandal guide cette génération vers l'excellence !" ⚔️**`;

    return prompt;
    
  } catch (error) {
    throw new Error(`Erreur analyse recording: ${error.message}`);
  }
}

// 💾 Sauvegarder le prompt généré
function savePromptToFile(prompt, recordingFile) {
  const promptsDir = 'cursor-prompts';
  
  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(promptsDir)) {
    fs.mkdirSync(promptsDir, { recursive: true });
  }
  
  const promptFileName = recordingFile.replace('.json', '-cursor-prompt.md');
  const promptPath = path.join(promptsDir, promptFileName);
  
  fs.writeFileSync(promptPath, prompt, 'utf8');
  
  return {
    path: promptPath,
    fileName: promptFileName
  };
}

// 🚀 Fonction principale
async function generateCursorPromptFromRecording(recordingFile) {
  try {
    const prompt = await generateCursorPrompt(recordingFile);
    const savedFile = savePromptToFile(prompt, recordingFile);
    
    return {
      success: true,
      promptFile: savedFile.fileName,
      promptPath: savedFile.path
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// 🎬 Export et CLI
if (require.main === module) {
  (async () => {
    const recordingFile = process.argv[2];
    
    if (!recordingFile) {
      console.error('❌ Usage: node cursor-prompt-generator.js <recording.json>');
      process.exit(1);
    }
    
    const result = await generateCursorPromptFromRecording(recordingFile);
    
    if (result.success) {
      console.log(`✅ Prompt généré: ${result.promptPath}`);
    } else {
      console.error(`❌ Erreur: ${result.error}`);
      process.exit(1);
    }
  })();
}

module.exports = { generateCursorPromptFromRecording };
