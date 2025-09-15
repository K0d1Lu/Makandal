#!/usr/bin/env node

/**
 * 🔥 Makandal CLI - Chrome Recorder Generator
 * 🎯 Usage: npm run makandal -- -conf wedia-portal
 * 📦 CLI simple et natif pour l'équipe
 */

const fs = require('fs');
const path = require('path');

// 🎨 Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// 🎯 Fonction pour coloriser les messages
function log(color, icon, message) {
  console.log(`${colors[color]}${icon} ${message}${colors.reset}`);
}

// 📋 Afficher l'aide
function showHelp() {
  log('cyan', '🔥', 'Makandal CLI - Chrome Recorder Generator');
  console.log('');
  log('white', '📖', 'Usage:');
  console.log('  npm run makandal -- -conf <config-name>');
  console.log('  npm run makandal -- --help');
  console.log('');
  log('white', '🎯', 'Exemples:');
  console.log('  npm run makandal -- -conf wedia-portal     # Config production');
  console.log('  npm run makandal -- -conf wedia-portal-dev # Config développement');
  console.log('');
  log('white', '📁', 'Configs disponibles:');
  
  const configsDir = path.join(__dirname, '..', 'configs');
  try {
    const configs = fs.readdirSync(configsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    configs.forEach(config => {
      console.log(`  - ${config}`);
    });
  } catch (error) {
    log('red', '❌', 'Erreur lecture dossier configs');
  }
  
  console.log('');
  log('white', '📂', 'Le script généré sera sauvé dans: generated-scripts/');
}

// 🔍 Parser les arguments de ligne de commande
function parseArguments(args) {
  const result = { config: null, help: false };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-conf' || arg === '--config') {
      result.config = args[i + 1];
      i++; // Skip next argument
    } else if (arg === '--help' || arg === '-h') {
      result.help = true;
    }
  }
  
  return result;
}

// 📦 Charger une configuration
function loadConfig(configName) {
  const configPath = path.join(__dirname, '..', 'configs', `${configName}.json`);
  
  if (!fs.existsSync(configPath)) {
    log('red', '❌', `Configuration "${configName}" introuvable`);
    log('yellow', '💡', 'Utilisez --help pour voir les configs disponibles');
    process.exit(1);
  }
  
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    log('green', '✅', `Configuration "${configName}" chargée`);
    return config;
  } catch (error) {
    log('red', '❌', `Erreur lecture config "${configName}": ${error.message}`);
    process.exit(1);
  }
}

// 📝 Charger le template
function loadTemplate() {
  const templatePath = path.join(__dirname, '..', 'generated-scripts', 'chrome-recorder-template.js');
  
  if (!fs.existsSync(templatePath)) {
    log('red', '❌', 'Template chrome-recorder-template.js introuvable');
    process.exit(1);
  }
  
  try {
    return fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    log('red', '❌', `Erreur lecture template: ${error.message}`);
    process.exit(1);
  }
}

// 🔄 Hydrater le template avec la config
function hydrateTemplate(template, config) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0];
  
  let hydrated = template;
  
  // Remplacements basiques
  hydrated = hydrated.replace(/TEMPLATE_PROJECT/g, config.name);
  hydrated = hydrated.replace(/TEMPLATE_DESCRIPTION/g, config.description);
  hydrated = hydrated.replace(/TEMPLATE_DATE/g, `${dateStr} ${timeStr}`);
  
  // Remplacer les selectorPriorities
  hydrated = hydrated.replace(
    "selectorPriorities: ['data-testid', 'aria-label', 'id', 'class'],",
    `selectorPriorities: ${JSON.stringify(config.selectorPriorities, null, 6)},`
  );
  
  // Remplacer les dynamicValuePatterns
  hydrated = hydrated.replace(
    /dynamicValuePatterns: \[\s*{\s*pattern: '[^']+',\s*flags: '[^']*',\s*description: '[^']+'\s*}\s*\],/,
    `dynamicValuePatterns: ${JSON.stringify(config.dynamicValuePatterns, null, 6)},`
  );
  
  // Remplacer les dynamicClassPatterns
  hydrated = hydrated.replace(
    /dynamicClassPatterns: \[\s*{\s*pattern: '[^']+',\s*flags: '[^']*',\s*description: '[^']+'\s*}\s*\],/,
    `dynamicClassPatterns: ${JSON.stringify(config.dynamicClassPatterns, null, 6)},`
  );
  
  // Remplacer les testSelectors
  if (config.testSelectors) {
    hydrated = hydrated.replace(
      /const testSelectors = \[[^\]]+\];/,
      `const testSelectors = ${JSON.stringify(config.testSelectors, null, 6)};`
    );
  }
  
  // Messages personnalisés
  if (config.messages) {
    hydrated = hydrated.replace(
      "console.log('🎯 Makandal Chrome Recorder activé pour projet !');",
      `console.log('${config.messages.startup}');`
    );
    
    hydrated = hydrated.replace(
      "console.log('🔥 window.MakandalRecorder disponible pour projet !');",
      `console.log('${config.messages.ready}');`
    );
  }
  
  // Préférences spéciales
  if (config.preferences) {
    hydrated = hydrated.replace(
      'maxTextLength: 30,',
      `maxTextLength: ${config.preferences.maxTextLength || 30},`
    );
    
    hydrated = hydrated.replace(
      'allowTextSelectors: true,',
      `allowTextSelectors: ${config.preferences.allowTextSelectors !== false},`
    );
    
    hydrated = hydrated.replace(
      'ignoreHiddenElements: true,',
      `ignoreHiddenElements: ${config.preferences.ignoreHiddenElements !== false},`
    );
  }
  
  // Logique spécifique Portal
  if (config.preferences?.portalSpecific) {
    const portalLogic = `
        // Logique spécifique Portal
        if (attr === 'portal-action') {
          console.log('🏛️ Portal Action:', value);
          return \`[portal-action="\${value}"]\`;
        }
        if (attr === 'data-portal') {
          console.log('🎯 Data Portal:', value);
          return \`[data-portal="\${value}"]\`;
        }`;
    
    hydrated = hydrated.replace(
      /if \(attr === 'data-testid'\) {\s*console\.log\('🎯 Test ID trouvé:', value\);\s*}/,
      portalLogic + `
        if (attr === 'data-testid') {
          console.log('🎯 Test ID trouvé:', value);
        }`
    );
  }
  
  return hydrated;
}

// 💾 Sauvegarder le script généré
function saveGeneratedScript(content, configName) {
  const outputDir = path.join(__dirname, '..', 'generated-scripts');
  const fileName = `chrome-recorder-${configName}-${Date.now()}.js`;
  const outputPath = path.join(outputDir, fileName);
  
  // S'assurer que le dossier existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    fs.writeFileSync(outputPath, content, 'utf8');
    log('green', '💾', `Script généré: ${fileName}`);
    log('cyan', '📂', `Chemin complet: ${outputPath}`);
    return { path: outputPath, fileName };
  } catch (error) {
    log('red', '❌', `Erreur sauvegarde: ${error.message}`);
    process.exit(1);
  }
}

// 📋 Afficher les instructions d'usage
function showUsageInstructions(savedFile, configName) {
  console.log('');
  log('green', '🎉', 'Script Chrome Recorder généré avec succès !');
  console.log('');
  log('white', '📋', 'Instructions d\'usage:');
  console.log('');
  console.log('1️⃣ Ouvrez Chrome DevTools (F12)');
  console.log('2️⃣ Allez dans l\'onglet "Console"');
  console.log('3️⃣ Copiez le contenu du fichier généré:');
  log('cyan', '📁', savedFile.fileName);
  console.log('4️⃣ Collez dans la console et appuyez sur Entrée');
  console.log('5️⃣ Allez dans l\'onglet "Recorder"');
  console.log('6️⃣ Créez un nouvel enregistrement');
  console.log('');
  log('yellow', '🧪', 'Test: Tapez "MakandalRecorder.test()" dans la console');
  log('blue', '🔧', `Configuration: ${configName}`);
  console.log('');
  log('magenta', '⚔️', '"François Makandal guide vos sélecteurs !" ⚔️');
}

// 🚀 Fonction principale
function main() {
  const args = process.argv.slice(2);
  const options = parseArguments(args);
  
  // Afficher l'aide si demandé ou si aucun argument
  if (options.help || args.length === 0) {
    showHelp();
    return;
  }
  
  // Vérifier qu'une config est spécifiée
  if (!options.config) {
    log('red', '❌', 'Configuration requise');
    log('yellow', '💡', 'Usage: npm run makandal -- -conf <config-name>');
    process.exit(1);
  }
  
  log('cyan', '🔥', 'Makandal CLI - Démarrage...');
  
  // Charger la configuration
  const config = loadConfig(options.config);
  
  // Charger le template
  log('blue', '📝', 'Chargement du template...');
  const template = loadTemplate();
  
  // Hydrater le template
  log('yellow', '🔄', 'Hydratation du template...');
  const hydratedScript = hydrateTemplate(template, config);
  
  // Sauvegarder le script
  log('green', '💾', 'Sauvegarde du script...');
  const savedFile = saveGeneratedScript(hydratedScript, options.config);
  
  // Afficher les instructions
  showUsageInstructions(savedFile, options.config);
}

// 🎬 Exécution
if (require.main === module) {
  main();
}

module.exports = { main, parseArguments, loadConfig, hydrateTemplate };
