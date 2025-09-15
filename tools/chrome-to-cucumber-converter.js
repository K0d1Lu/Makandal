#!/usr/bin/env node

/**
 * Convertisseur Chrome DevTools Recorder → Cucumber
 * Transforme les enregistrements JSON Chrome en tests Gherkin + définitions
 * 
 * Usage: node chrome-to-cucumber-converter.js input.json
 */

const fs = require('fs');
const path = require('path');

// 🔥 Makandal - Agent IA pour la découverte automatique des définitions
class MakandalAgent {
  constructor(config) {
    this.config = config || {};
    this.promptsPath = path.join(__dirname, '../ai-discovery-prompts/');
  }

  async discoverExistingDefinitions() {
    console.log('🔥 Makandal se réveille et scrute l'horizon...');
    
    try {
      // Charge la configuration de l'agent
      const configPath = path.join(this.promptsPath, 'AI-AGENT-CONFIG.json5');
      if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, 'utf8');
        // Parse JSON5 basique (enlève les commentaires)
        const cleanConfig = configData.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        this.config = JSON.parse(cleanConfig);
      }

      console.log('🔍 Je découvre les trésors cachés de vos définitions...');
      
      // Découverte des définitions existantes selon le prompt 01
      const definitions = await this.executeDiscoveryPrompt();
      
      console.log(`✅ Découvert ${Object.keys(definitions.elements || {}).length} éléments et ${Object.keys(definitions.urls || {}).length} URLs`);
      
      return definitions;
    } catch (error) {
      console.log('⚠️ Même les révolutionnaires font face aux obstacles...');
      console.log(`Erreur de découverte: ${error.message}`);
      return { elements: {}, urls: {} };
    }
  }

  async executeDiscoveryPrompt() {
    // Implémentation basique de la découverte selon le prompt 01-discover-definitions.md
    const definitions = { elements: {}, urls: {} };
    
    // Cherche les définitions dans le projet wedia_demo
    const wediaRoot = this.config.paths?.wedia_demo_root || '../../..';
    const definitionsPath = path.join(wediaRoot, 'Test/e2e-tests/cucumber-app/project/definitions/');
    
    try {
      // Charge _urls.json5
      const urlsFile = path.join(definitionsPath, '_urls.json5');
      if (fs.existsSync(urlsFile)) {
        const urlsData = fs.readFileSync(urlsFile, 'utf8');
        const cleanUrls = urlsData.replace(/\/\/.*$/gm, '');
        definitions.urls = JSON.parse(cleanUrls);
        console.log(`🗺️ Chargé ${Object.keys(definitions.urls).length} URLs existantes`);
      }

      // Cherche _elements.json5 (peut ne pas exister)
      const elementsFile = path.join(definitionsPath, '_elements.json5');
      if (fs.existsSync(elementsFile)) {
        const elementsData = fs.readFileSync(elementsFile, 'utf8');
        const cleanElements = elementsData.replace(/\/\/.*$/gm, '');
        definitions.elements = JSON.parse(cleanElements);
        console.log(`🎯 Chargé ${Object.keys(definitions.elements).length} éléments existants`);
      }

    } catch (error) {
      console.log(`⚠️ Erreur lors de la lecture des définitions: ${error.message}`);
    }
    
    return definitions;
  }

  async intelligentMerge(newDefinitions, existingDefinitions) {
    console.log('🧠 La sagesse guide la fusion des connaissances...');
    
    const merged = { ...existingDefinitions };
    const report = { added: 0, ignored: 0, improved: 0 };
    
    for (const [name, value] of Object.entries(newDefinitions)) {
      if (!existingDefinitions[name]) {
        merged[name] = value;
        report.added++;
        console.log(`✅ AJOUTÉ: "${name}"`);
      } else if (existingDefinitions[name] === value) {
        report.ignored++;
        console.log(`🔄 IGNORÉ: "${name}" (identique)`);
      } else {
        // Conflit - garde l'existant pour l'instant
        report.ignored++;
        console.log(`⚠️ CONSERVÉ: "${name}" (conflit résolu)`);
      }
    }
    
    console.log(`📊 Fusion terminée: ${report.added} ajoutés, ${report.ignored} ignorés`);
    return merged;
  }
}

class ChromeToCucumberConverter {
  constructor() {
    // 🔥 Makandal - Agent IA pour la découverte automatique
    this.makandal = new MakandalAgent();
    this.existingDefinitions = { elements: {}, urls: {} };
    
    // Mapping des actions Chrome vers les steps Cucumber
    this.actionMappings = {
      navigate: (step) => `When I navigate to '${this.extractUrlPath(step.url)}'`,
      click: (step) => `When I click on '${this.generateElementName(step)}'`,
      type: (step) => `When I write '${step.value}' in '${this.generateElementName(step)}'`,
      setViewport: (step) => `Given the viewport is ${step.width}x${step.height}`,
      waitForElement: (step) => `Then there should be a '${this.generateElementName(step)}' element within 5 seconds`
    };

    // Éléments identifiés et leurs sélecteurs
    this.elementDefinitions = {};
    this.urlDefinitions = {};
  }

  /**
   * Convertit un enregistrement Chrome en test Cucumber
   */
  async convert(chromeRecording) {
    const featureName = chromeRecording.title || 'Generated Test';
    const steps = chromeRecording.steps || [];

    // 🔥 Makandal découvre les définitions existantes
    this.existingDefinitions = await this.makandal.discoverExistingDefinitions();

    // Génère les steps Gherkin
    const gherkinSteps = this.generateGherkinSteps(steps);
    
    // Génère le fichier .feature
    const featureContent = this.generateFeatureFile(featureName, gherkinSteps);
    
    // 🧠 Fusion intelligente des définitions avec Makandal
    const mergedElements = await this.makandal.intelligentMerge(
      this.elementDefinitions, 
      this.existingDefinitions.elements || {}
    );
    const mergedUrls = await this.makandal.intelligentMerge(
      this.urlDefinitions, 
      this.existingDefinitions.urls || {}
    );
    
    // Génère les définitions finales
    const elementsDefinition = this.formatDefinitions(mergedElements);
    const urlsDefinition = this.formatDefinitions(mergedUrls);

    console.log('🏆 Mission accomplie ! Les chaînes sont brisées !');

    return {
      feature: featureContent,
      elements: elementsDefinition,
      urls: urlsDefinition,
      stats: {
        totalSteps: steps.length,
        elementsFound: Object.keys(mergedElements).length,
        urlsFound: Object.keys(mergedUrls).length,
        existingElementsReused: Object.keys(this.existingDefinitions.elements || {}).length,
        existingUrlsReused: Object.keys(this.existingDefinitions.urls || {}).length
      }
    };
  }

  /**
   * Génère les steps Gherkin à partir des actions Chrome
   */
  generateGherkinSteps(steps) {
    const gherkinSteps = [];

    for (const step of steps) {
      try {
        const gherkinStep = this.convertStep(step);
        if (gherkinStep) {
          gherkinSteps.push(gherkinStep);
        }
      } catch (error) {
        console.warn(`⚠️  Impossible de convertir l'étape:`, step.type, error.message);
      }
    }

    return gherkinSteps;
  }

  /**
   * Convertit une action Chrome en step Gherkin
   */
  convertStep(step) {
    switch (step.type) {
      case 'setViewport':
        return `    Given the viewport is ${step.width}x${step.height}`;
        
      case 'navigate':
        const urlPath = this.extractUrlPath(step.url);
        const urlName = this.generateUrlName(urlPath);
        this.urlDefinitions[urlName] = urlPath;
        return `    When I navigate to '${urlName}'`;
        
      case 'click':
        const elementName = this.generateElementName(step);
        this.storeElementDefinition(elementName, step);
        return `    When I click on '${elementName}'`;
        
      case 'type':
        const inputName = this.generateElementName(step);
        this.storeElementDefinition(inputName, step);
        return `    When I write '${step.value}' in '${inputName}'`;
        
      case 'waitForElement':
        const waitElementName = this.generateElementName(step);
        this.storeElementDefinition(waitElementName, step);
        return `    Then there should be a '${waitElementName}' element within 5 seconds`;
        
      default:
        console.warn(`⚠️  Type d'action non supporté: ${step.type}`);
        return null;
    }
  }

  /**
   * Génère un nom d'élément à partir des sélecteurs Chrome
   */
  generateElementName(step) {
    const selectors = step.selectors || [];
    
    for (const selectorGroup of selectors) {
      for (const selector of selectorGroup) {
        // Priorité aux attributs de test
        if (selector.includes('data-testid')) {
          const match = selector.match(/data-testid="([^"]+)"/);
          if (match) return this.humanizeElementName(match[1]);
        }
        
        if (selector.includes('portal-action')) {
          const match = selector.match(/portal-action="([^"]+)"/);
          if (match) return this.humanizeElementName(match[1]);
        }
        
        // Aria labels
        if (selector.startsWith('aria/')) {
          const ariaLabel = selector.replace('aria/', '').replace(/\[.*\]/, '');
          return this.humanizeElementName(ariaLabel);
        }
        
        // IDs stables
        if (selector.startsWith('#') && !this.isDynamicId(selector)) {
          const id = selector.replace('#', '');
          return this.humanizeElementName(id);
        }
      }
    }
    
    // Fallback : générer un nom basé sur le contexte
    return this.generateFallbackElementName(step);
  }

  /**
   * Humanise un nom d'élément technique
   */
  humanizeElementName(technicalName) {
    return technicalName
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .trim();
  }

  /**
   * Génère un nom d'élément de fallback
   */
  generateFallbackElementName(step) {
    const context = step.type || 'element';
    const timestamp = Date.now().toString().slice(-4);
    return `${context} ${timestamp}`;
  }

  /**
   * Stocke la définition d'un élément
   */
  storeElementDefinition(elementName, step) {
    if (this.elementDefinitions[elementName]) return;

    const bestSelector = this.findBestSelector(step.selectors || []);
    this.elementDefinitions[elementName] = bestSelector;
  }

  /**
   * Trouve le meilleur sélecteur parmi les options
   */
  findBestSelector(selectorGroups) {
    const priorities = [
      /\[data-testid="/,
      /\[portal-action="/,
      /^#(?!__)/,  // IDs non dynamiques
      /^\./,       // Classes CSS
      /^aria\//    // ARIA selectors
    ];

    for (const priority of priorities) {
      for (const group of selectorGroups) {
        for (const selector of group) {
          if (priority.test(selector) && !this.isDynamicSelector(selector)) {
            return selector;
          }
        }
      }
    }

    // Fallback : premier sélecteur non dynamique
    for (const group of selectorGroups) {
      for (const selector of group) {
        if (!this.isDynamicSelector(selector)) {
          return selector;
        }
      }
    }

    return selectorGroups[0]?.[0] || 'selector-not-found';
  }

  /**
   * Détecte les sélecteurs dynamiques à éviter
   */
  isDynamicSelector(selector) {
    const dynamicPatterns = [
      /__BVID__/,
      /__bv_popover_/,
      /\d{6,}/,
      /xpath.*\d+/
    ];

    return dynamicPatterns.some(pattern => pattern.test(selector));
  }

  /**
   * Détecte les IDs dynamiques
   */
  isDynamicId(selector) {
    return /^#(__BVID__|__bv_|.*\d{3,})/.test(selector);
  }

  /**
   * Extrait le chemin d'une URL complète
   */
  extractUrlPath(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname + urlObj.search + urlObj.hash;
    } catch {
      return url;
    }
  }

  /**
   * Génère un nom pour une URL
   */
  generateUrlName(urlPath) {
    const segments = urlPath.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'home';
    
    return lastSegment
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .trim()
      .toLowerCase() + ' page';
  }

  /**
   * Génère le fichier .feature
   */
  generateFeatureFile(featureName, steps) {
    const sanitizedName = featureName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    
    return `@browser
Feature: ${sanitizedName}

  Scenario: ${sanitizedName}
${steps.join('\n')}
`;
  }

  /**
   * Génère le fichier de définitions d'éléments JSON5
   */
  generateElementsDefinition() {
    const formatted = JSON.stringify(this.elementDefinitions, null, 2)
      .replace(/^{/, '{\n  // Éléments générés automatiquement depuis Chrome Recorder')
      .replace(/}$/, '\n}');
    
    return formatted;
  }

  /**
   * Génère le fichier de définitions d'URLs JSON5
   */
  generateUrlsDefinition() {
    return this.formatDefinitions(this.urlDefinitions, 'URLs');
  }

  /**
   * Formate les définitions en JSON5 avec en-tête Makandal
   */
  formatDefinitions(definitions, type = 'Éléments') {
    const formatted = JSON.stringify(definitions, null, 2)
      .replace(/^{/, `{\n  // 🔥 ${type} fusionnés intelligemment par Makandal`)
      .replace(/}$/, '\n}');
    
    return formatted;
  }
}

/**
 * Interface en ligne de commande
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Usage: node chrome-to-cucumber-converter.js <input.json>');
    process.exit(1);
  }

  const inputFile = args[0];
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Fichier non trouvé: ${inputFile}`);
    process.exit(1);
  }

  try {
    // Lecture du fichier Chrome
    const chromeData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    // Conversion avec Makandal
    const converter = new ChromeToCucumberConverter();
    const result = await converter.convert(chromeData);
    
    // Génération des fichiers de sortie
    const baseName = path.basename(inputFile, '.json');
    const outputDir = path.dirname(inputFile);
    
    // Fichier .feature
    const featureFile = path.join(outputDir, `${baseName}.feature`);
    fs.writeFileSync(featureFile, result.feature);
    
    // Fichier _elements.json5
    const elementsFile = path.join(outputDir, `${baseName}_elements.json5`);
    fs.writeFileSync(elementsFile, result.elements);
    
    // Fichier _urls.json5  
    const urlsFile = path.join(outputDir, `${baseName}_urls.json5`);
    fs.writeFileSync(urlsFile, result.urls);
    
    // Rapport
    console.log('✅ Conversion terminée !');
    console.log(`📁 Fichiers générés:`);
    console.log(`   📄 ${featureFile}`);
    console.log(`   🎯 ${elementsFile}`);
    console.log(`   🔗 ${urlsFile}`);
    console.log('');
    console.log('📊 Statistiques:');
    console.log(`   📝 ${result.stats.totalSteps} étapes converties`);
    console.log(`   🎯 ${result.stats.elementsFound} éléments identifiés`);
    console.log(`   🔗 ${result.stats.urlsFound} URLs extraites`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la conversion:', error.message);
    process.exit(1);
  }
}

// Export pour usage programmatique
module.exports = ChromeToCucumberConverter;

// Exécution en ligne de commande
if (require.main === module) {
  main().catch(error => {
    console.error('🔥 Makandal a rencontré une résistance inattendue...');
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  });
}
