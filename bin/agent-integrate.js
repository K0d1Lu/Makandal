#!/usr/bin/env node

/**
 * 🤖 Makandal Agent Integrate - Intégration automatique wedia_demo
 * 🎯 Agent AI qui intègre automatiquement les fichiers générés dans wedia_demo
 * ⚔️ Plus de copie manuelle, révolution Agent-First !
 */

const fs = require('fs');
const path = require('path');
const { MakandalEnvironmentManager } = require('../tools/env-manager');

// 🎨 Couleurs console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(color, icon, message) {
  console.log(`${colors[color]}${icon} ${message}${colors.reset}`);
}

class MakandalAgentIntegrate {
  constructor() {
    this.envManager = null;
    this.wediaPaths = null;
  }

  async initialize() {
    log('cyan', '🤖', 'Makandal Agent Integrate - Initialisation...');
    
    this.envManager = new MakandalEnvironmentManager();
    await this.envManager.ensureEnvironmentReady();
    this.wediaPaths = this.envManager.getWediaPaths();
    
    log('green', '✅', `Environnement configuré - Project: ${path.basename(this.wediaPaths.demoPath)}`);
  }

  // 🔍 Scanner dossier pour fichiers Cucumber
  async scanInputDirectory(inputDir) {
    if (!fs.existsSync(inputDir)) {
      throw new Error(`Dossier introuvable: ${inputDir}`);
    }

    const files = fs.readdirSync(inputDir);
    const cucumberFiles = {
      features: [],
      elements: [],
      urls: []
    };

    files.forEach(file => {
      const fullPath = path.join(inputDir, file);
      
      if (file.endsWith('.feature')) {
        cucumberFiles.features.push({
          name: file,
          path: fullPath,
          baseName: path.basename(file, '.feature')
        });
      } else if (file.endsWith('_elements.json5')) {
        cucumberFiles.elements.push({
          name: file,
          path: fullPath,
          baseName: file.replace('_elements.json5', '')
        });
      } else if (file.endsWith('_urls.json5')) {
        cucumberFiles.urls.push({
          name: file,
          path: fullPath,
          baseName: file.replace('_urls.json5', '')
        });
      }
    });

    return cucumberFiles;
  }

  // 🎯 Détecter contexte/organisation depuis feature
  async detectContext(featureFile) {
    try {
      const content = fs.readFileSync(featureFile.path, 'utf8');
      
      // Chercher tags pour contexte
      const tagMatch = content.match(/@(\w+)/g);
      if (tagMatch) {
        const tags = tagMatch.map(tag => tag.replace('@', ''));
        
        // Contextes prédéfinis
        if (tags.includes('authentication') || tags.includes('login') || tags.includes('auth')) {
          return 'authentication';
        }
        if (tags.includes('portal-management') || tags.includes('portal') || tags.includes('management')) {
          return 'portal-management';
        }
        if (tags.includes('search')) {
          return 'search';
        }
        
        // Utiliser premier tag métier
        const businessTags = tags.filter(tag => !['browser', 'visual-regression'].includes(tag));
        if (businessTags.length > 0) {
          return businessTags[0];
        }
      }

      // Analyser Feature line
      const featureMatch = content.match(/Feature:\s*(.+)/i);
      if (featureMatch) {
        const featureName = featureMatch[1].toLowerCase();
        
        if (featureName.includes('authentication') || featureName.includes('login')) {
          return 'authentication';
        }
        if (featureName.includes('portal') || featureName.includes('management')) {
          return 'portal-management';
        }
        if (featureName.includes('search')) {
          return 'search';
        }
      }

      return this.wediaPaths.defaultOrganization || 'generated';
    } catch (error) {
      log('yellow', '⚠️', `Erreur détection contexte: ${error.message}`);
      return this.wediaPaths.defaultOrganization || 'generated';
    }
  }

  // 🚀 Intégrer fichier dans wedia_demo
  async integrateFile(sourceFile, targetPath, type) {
    try {
      // Backup si nécessaire
      if (this.wediaPaths.createBackups && fs.existsSync(targetPath)) {
        await this.envManager.createBackup(targetPath);
      }

      // Créer dossier parent si nécessaire
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        log('blue', '📁', `Dossier créé: ${path.relative(this.wediaPaths.demoPath, targetDir)}`);
      }

      // Copier fichier
      fs.copyFileSync(sourceFile.path, targetPath);
      
      const relativePath = path.relative(this.wediaPaths.demoPath, targetPath);
      log('green', '✅', `${type} intégré: ${relativePath}`);
      
      return true;
    } catch (error) {
      log('red', '❌', `Erreur intégration ${type}: ${error.message}`);
      return false;
    }
  }

  // 🎯 Processus d'intégration principal
  async integrateFiles(inputDir) {
    log('blue', '🔍', `Analyse dossier: ${inputDir}`);
    
    const cucumberFiles = await this.scanInputDirectory(inputDir);
    
    log('cyan', '📊', `Trouvé: ${cucumberFiles.features.length} features, ${cucumberFiles.elements.length} elements, ${cucumberFiles.urls.length} URLs`);
    
    let integratedCount = 0;
    
    // Intégrer chaque feature avec ses définitions
    for (const feature of cucumberFiles.features) {
      const context = await this.detectContext(feature);
      log('yellow', '🎯', `Contexte détecté: ${context} pour ${feature.name}`);
      
      // Feature dans features/[context]/
      const featureTargetPath = path.join(this.wediaPaths.featuresPath, context, feature.name);
      const featureSuccess = await this.integrateFile(feature, featureTargetPath, 'Feature');
      
      if (featureSuccess) integratedCount++;

      // Chercher éléments correspondants
      const matchingElements = cucumberFiles.elements.filter(el => 
        el.baseName === feature.baseName || el.name.startsWith(feature.baseName)
      );
      
      for (const element of matchingElements) {
        const elementTargetName = `_${element.name}`;
        const elementTargetPath = path.join(this.wediaPaths.definitionsPath, elementTargetName);
        const elementSuccess = await this.integrateFile(element, elementTargetPath, 'Éléments');
        
        if (elementSuccess) integratedCount++;
      }

      // Chercher URLs correspondantes  
      const matchingUrls = cucumberFiles.urls.filter(url => 
        url.baseName === feature.baseName || url.name.startsWith(feature.baseName)
      );
      
      for (const url of matchingUrls) {
        const urlTargetName = `_${url.name}`;
        const urlTargetPath = path.join(this.wediaPaths.definitionsPath, urlTargetName);
        const urlSuccess = await this.integrateFile(url, urlTargetPath, 'URLs');
        
        if (urlSuccess) integratedCount++;
      }
    }

    return integratedCount;
  }
}

// 🚀 Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('red', '❌', 'Usage: npm run agent-integrate <dossier-fichiers-generes>');
    console.log('');
    console.log('Exemples:');
    console.log('  npm run agent-integrate /tmp/makandal-generated/');
    console.log('  npm run agent-integrate ./temp-cucumber-files/');
    process.exit(1);
  }

  const inputDir = path.resolve(args[0]);
  
  try {
    const agent = new MakandalAgentIntegrate();
    await agent.initialize();
    
    log('magenta', '🚀', 'Agent AI - Intégration automatique démarrée...');
    console.log('');
    
    const integratedCount = await agent.integrateFiles(inputDir);
    
    console.log('');
    log('green', '🎉', `Agent AI - Intégration terminée !`);
    log('cyan', '📊', `${integratedCount} fichiers intégrés dans wedia_demo`);
    log('blue', '📁', `Projet: ${path.basename(agent.wediaPaths.demoPath)}`);
    console.log('');
    log('yellow', '🎯', 'Prochaine étape: Tester vos nouveaux tests Cucumber dans wedia_demo !');
    console.log('');
    log('magenta', '⚔️', '"L\'Agent Makandal libère votre workflow !" ⚔️');
    
  } catch (error) {
    log('red', '💥', `Erreur Agent AI: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// 🎬 Exécution
if (require.main === module) {
  main();
}

module.exports = { MakandalAgentIntegrate };
