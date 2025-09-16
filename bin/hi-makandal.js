#!/usr/bin/env node

/**
 * ⚔️ Hi Makandal - Interface conversationnelle interactive
 * 🗣️ "Salut que veux-tu faire ?" - Menu interactif pour l'équipe
 * 🎯 Rendons l'expérience développeur amusante !
 */

const readline = require('readline');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { generateCursorPromptFromRecording } = require('../tools/cursor-prompt-generator');

// 🎨 Couleurs et styles console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

// 🎭 Interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 🎨 Fonction pour styliser les messages
function style(color, text, bold = false) {
  const boldCode = bold ? colors.bright : '';
  return `${boldCode}${colors[color]}${text}${colors.reset}`;
}

// 🔥 Messages Makandal avec personnalité
const makandal = {
  greeting: [
    "⚔️ Salut l'ami ! François Makandal à ton service !",
    "🔥 Hey ! Makandal ici, prêt à briser les chaînes des sélecteurs dynamiques !",
    "⚡ Yo ! Le rebelle des tests automatisés te salue !",
    "🏛️ Makandal se dresse ! Que puis-je faire pour libérer ton workflow ?",
    "🎯 Salut guerrier ! Makandal guide tes scripts vers la victoire !"
  ],
  
  menu: [
    "🤔 Alors, que veux-tu accomplir aujourd'hui ?",
    "🎯 Dis-moi ton besoin, je guide ta révolution !",
    "💪 Choisis ta mission, rebelle !",
    "🔥 Sur quoi veux-tu que je travaille ?",
    "⚔️ Quelle bataille mener ensemble ?"
  ],
  
  goodbye: [
    "⚔️ À bientôt l'ami ! Makandal veille sur tes tests !",
    "🔥 La révolution continue ! Que Makandal guide tes sélecteurs !",
    "💪 Reste fort ! François Makandal sera toujours là !",
    "🎯 Mission accomplie ! L'esprit rebelle perdure !",
    "⚡ Au revoir guerrier ! La liberté des tests t'accompagne !"
  ],
  
  working: [
    "🔥 Makandal se met au travail...",
    "⚔️ La magie opère, patience mon ami !",
    "💪 Les chaînes se brisent, un instant...",
    "🎯 La révolution est en marche !",
    "⚡ L'esprit rebelle active ses pouvoirs !"
  ]
};

// 🎲 Fonction pour message aléatoire
function randomMessage(category) {
  const messages = makandal[category];
  return messages[Math.floor(Math.random() * messages.length)];
}

// 🎨 Bannière ASCII Makandal
function showBanner() {
  console.clear();
  console.log(style('cyan', `
╔══════════════════════════════════════════════════════╗
║                  ⚔️  MAKANDAL  ⚔️                    ║
║           Assistant IA Révolutionnaire              ║
║        "Guide de l'automatisation rebelle"          ║
╚══════════════════════════════════════════════════════╝
`, true));
  console.log('');
}

// 📋 Menu des options disponibles
const menuOptions = [
  {
    id: '1',
    title: '🔥 Générer script Chrome Recorder',
    description: 'Créer un script optimisé pour Chrome DevTools',
    action: 'generate-chrome-script'
  },
  {
    id: '2', 
    title: '📁 Voir mes recordings',
    description: 'Lister les fichiers JSON dans recordings/',
    action: 'list-recordings'
  },
  {
    id: '3',
    title: '⚡ Test simple (conversion rapide)',
    description: 'Chrome JSON → Test Cucumber basique → wedia_demo direct', 
    action: 'convert-recording'
  },
  {
    id: '4',
    title: '🏆 Test premium complet (IA + intégration)',
    description: 'Chrome JSON → Cursor IA → wedia_demo automatique',
    action: 'premium-workflow'
  },
  {
    id: '5',
    title: '⚙️ Configuration environnement',
    description: 'Configurer .env et path wedia_demo',
    action: 'setup-environment'
  },
  {
    id: '0',
    title: '🚪 Quitter',
    description: 'Sortir du menu Makandal',
    action: 'exit'
  }
];

// 🎨 Afficher le menu avec style
function showMenu() {
  console.log(style('yellow', randomMessage('menu'), true));
  console.log('');
  
  menuOptions.forEach(option => {
    const title = style('cyan', option.title, true);
    const desc = style('gray', option.description);
    console.log(`${style('white', option.id, true)} - ${title}`);
    console.log(`    ${desc}`);
    console.log('');
  });
}

// 🚀 Exécuter une action
async function executeAction(action) {
  console.log(style('magenta', randomMessage('working')));
  console.log('');
  
  switch (action) {
    case 'generate-chrome-script':
      await generateChromeScript();
      break;
      
    case 'list-recordings':
      await listRecordings();
      break;
      
    case 'convert-recording':
      await convertRecording();
      break;
      
    case 'premium-workflow':
      await premiumWorkflow();
      break;
      
    case 'setup-environment':
      await setupEnvironment();
      break;
      
    case 'list-configs':
      await listConfigs();
      break;
      
    case 'exit':
      console.log(style('green', randomMessage('goodbye'), true));
      rl.close();
      return false;
      
    default:
      console.log(style('red', '❌ Action non reconnue... même Makandal a ses limites !'));
  }
  
  return true;
}

// 🔥 Générer script Chrome Recorder
async function generateChromeScript() {
  console.log(style('cyan', '🔥 Génération de script Chrome Recorder', true));
  console.log('');
  
  // Demander la config
  console.log(style('yellow', '📋 Configurations disponibles:'));
  console.log('1 - Wedia Portal (Production)');
  console.log('2 - Wedia Portal Dev (Debug)');
  console.log('');
  
  const configChoice = await askQuestion(style('cyan', '🎯 Choisis ta config (1-2): '));
  
  let configName;
  switch (configChoice.trim()) {
    case '1':
      configName = 'wedia-portal';
      break;
    case '2':
      configName = 'wedia-portal-dev';
      break;
    default:
      configName = 'wedia-portal'; // Par défaut
  }
  
  console.log('');
  console.log(style('magenta', `⚡ Makandal forge ton script ${configName}...`));
  
  // Exécuter la génération
  try {
    await runCommand('node', ['bin/makandal-cli.js', '-conf', configName]);
    console.log('');
    console.log(style('green', '✅ Script généré avec succès !', true));
    console.log(style('yellow', '📋 Prochaines étapes:'));
    console.log('1. Copie le contenu du fichier généré');
    console.log('2. Chrome DevTools → Console → Coller → Entrée'); 
    console.log('3. Recorder → Nouvel enregistrement');
  } catch (error) {
    console.log(style('red', '❌ Erreur lors de la génération:', true));
    console.log(style('red', error.message));
  }
}

// 📁 Lister les recordings
async function listRecordings() {
  console.log(style('cyan', '📁 Tes recordings Chrome:', true));
  console.log('');
  
  try {
    const recordingsDir = 'recordings';
    if (!fs.existsSync(recordingsDir)) {
      console.log(style('yellow', '📂 Dossier recordings/ vide ou inexistant'));
      console.log(style('gray', '💡 Place tes exports JSON Chrome ici !'));
      return;
    }
    
    const files = fs.readdirSync(recordingsDir)
      .filter(file => file.endsWith('.json'))
      .filter(file => file !== 'package.json');
    
    if (files.length === 0) {
      console.log(style('yellow', '📂 Aucun recording trouvé'));
      console.log(style('gray', '💡 Exporte tes enregistrements Chrome en JSON ici !'));
    } else {
      files.forEach((file, index) => {
        const stats = fs.statSync(path.join(recordingsDir, file));
        const size = (stats.size / 1024).toFixed(1);
        console.log(`${style('cyan', (index + 1).toString())}. ${style('white', file)} ${style('gray', `(${size}KB)`)}`);
      });
      console.log('');
      console.log(style('green', `📊 Total: ${files.length} recording(s)`));
    }
  } catch (error) {
    console.log(style('red', '❌ Erreur lecture dossier recordings/'));
  }
}

// ⚡ Test simple (conversion rapide)
async function convertRecording() {
  console.log(style('cyan', '⚡ Test Simple - Conversion Rapide', true));
  console.log(style('yellow', '🎯 Chrome JSON → Test Cucumber basique → wedia_demo (15 sec)'));
  console.log('');
  
  // Lister les fichiers disponibles
  try {
    const recordingsDir = 'recordings';
    const files = fs.readdirSync(recordingsDir)
      .filter(file => file.endsWith('.json'))
      .filter(file => file !== 'package.json');
    
    if (files.length === 0) {
      console.log(style('yellow', '📂 Aucun recording trouvé pour conversion'));
      return;
    }
    
    console.log(style('yellow', '📋 Recordings disponibles:'));
    files.forEach((file, index) => {
      console.log(`${style('cyan', (index + 1).toString())} - ${style('white', file)}`);
    });
    console.log('');
    
    const choice = await askQuestion(style('cyan', `🎯 Choisis un fichier (1-${files.length}): `));
    const fileIndex = parseInt(choice.trim()) - 1;
    
    if (fileIndex >= 0 && fileIndex < files.length) {
      const selectedFile = files[fileIndex];
      console.log('');
      console.log(style('magenta', `⚡ Agent AI convertit ${selectedFile}...`));
      console.log(style('gray', '🤖 Génération automatique + intégration wedia_demo'));
      
      await runCommand('./bin/convert-recording.sh', [selectedFile]);
      console.log('');
      console.log(style('green', '✅ Test simple généré et intégré dans wedia_demo !', true));
      console.log(style('yellow', '💡 Pour des tests plus contextualisés, utilise Option 4 → Option 5'));
    } else {
      console.log(style('red', '❌ Choix invalide'));
    }
  } catch (error) {
    console.log(style('red', '❌ Erreur lors de la conversion:'));
    console.log(style('red', error.message));
  }
}

// 🏆 Test premium complet (IA + intégration)
async function premiumWorkflow() {
  console.log(style('cyan', '🏆 Test Premium Complet - Workflow IA', true));
  console.log(style('yellow', '🎯 Chrome JSON → Cursor IA → wedia_demo (2 min)'));
  console.log('');
  
  // ÉTAPE 1: Générer prompt Cursor
  console.log(style('magenta', '🚀 ÉTAPE 1/3 - Génération prompt Cursor IA'));
  console.log('');
  
  // Lister les fichiers disponibles
  try {
    const recordingsDir = 'recordings';
    const files = fs.readdirSync(recordingsDir)
      .filter(file => file.endsWith('.json'))
      .filter(file => file !== 'package.json');
    
    if (files.length === 0) {
      console.log(style('yellow', '📂 Aucun recording trouvé'));
      console.log(style('gray', '💡 Crée d\'abord un enregistrement Chrome !'));
      return;
    }
    
    console.log(style('yellow', '📋 Recordings disponibles:'));
    files.forEach((file, index) => {
      console.log(`${style('cyan', (index + 1).toString())} - ${style('white', file)}`);
    });
    console.log('');
    
    const choice = await askQuestion(style('cyan', `🎯 Choisis un fichier (1-${files.length}): `));
    const fileIndex = parseInt(choice.trim()) - 1;
    
    if (fileIndex < 0 || fileIndex >= files.length) {
      console.log(style('red', '❌ Choix invalide'));
      return;
    }
    
    const selectedFile = files[fileIndex];
    console.log('');
    console.log(style('magenta', `⚡ Makandal analyse ${selectedFile}...`));
    
    // Générer le prompt IA
    const promptGenerated = await generateCursorPromptFromFile(selectedFile);
    
    if (!promptGenerated) {
      console.log(style('red', '❌ Erreur génération prompt'));
      return;
    }
    
    // ÉTAPE 2: Instructions Cursor
    console.log('');
    console.log(style('green', '✅ Prompt premium généré !', true));
    console.log('');
    console.log(style('magenta', '🚀 ÉTAPE 2/3 - Traitement Cursor Chat'));
    console.log('');
    console.log(style('yellow', '📋 Instructions:'));
    console.log('1. Ouvre Cursor Chat (Cmd+L)');
    console.log(`2. Copie le contenu: cursor-prompts/${promptGenerated}`);
    console.log('3. Colle dans Cursor et réponds aux questions contextuelles');
    console.log('4. Cursor génère 3 fichiers premium (.feature + .json5)');
    console.log('5. Sauve les fichiers dans un dossier temporaire');
    console.log('');
    console.log(style('cyan', '💡 Exemple: mkdir /tmp/makandal-premium/ && sauvegarder les 3 fichiers'));
    console.log('');
    
    // Attendre que l'utilisateur termine avec Cursor
    await askQuestion(style('yellow', '📋 Appuie sur Entrée quand les fichiers Cursor sont prêts...'));
    
    // ÉTAPE 3: Instructions finales automatiques
    console.log('');
    console.log(style('magenta', '🚀 ÉTAPE 3/3 - Finalisation automatique'));
    console.log('');
    
    console.log(style('green', '✅ Cursor sauvegarde maintenant directement dans wedia_demo !'));
    console.log('');
    console.log(style('yellow', '📋 Le prompt inclut maintenant:'));
    console.log('• 🧠 Analyse de la structure wedia_demo');
    console.log('• 🎯 Choix intelligent du dossier features approprié');
    console.log('• 📁 Instructions de sauvegarde directe aux bons endroits');
    console.log('• 🔄 Plus besoin d\'intégration manuelle !');
    console.log('');
    
    console.log(style('green', '🎉 Workflow premium révolutionnaire !', true));
    console.log(style('magenta', '🏆 Cursor + Intelligence + Intégration automatique !'));
    console.log('');
    console.log(style('cyan', '💡 Les fichiers seront directement dans wedia_demo après génération Cursor'));
    
    // Attente finale optionnelle pour validation
    await askQuestion(style('green', '📋 Appuie sur Entrée pour revenir au menu...'));
    
  } catch (error) {
    console.log(style('red', `❌ Erreur workflow premium: ${error.message}`));
  }
}

// 📝 Générer prompt depuis fichier
async function generateCursorPromptFromFile(selectedFile) {
  try {
    const result = await generateCursorPromptFromRecording(selectedFile);
    
    if (result.success) {
      console.log(style('green', `📝 Prompt généré: ${result.promptFile}`));
      console.log(style('cyan', `📂 Chemin: ${result.promptPath}`));
      return result.promptFile;
    } else {
      console.log(style('red', `❌ Erreur génération: ${result.error}`));
      return null;
    }
  } catch (error) {
    console.log(style('red', `❌ Erreur: ${error.message}`));
    return null;
  }
}


// ⚙️ Configuration environnement 
async function setupEnvironment() {
  console.log(style('cyan', '⚙️ Configuration environnement Makandal', true));
  console.log('');
  
  try {
    await runCommand('node', ['tools/env-manager.js']);
    console.log('');
    console.log(style('green', '✅ Configuration environnement terminée !'));
    console.log(style('yellow', '💡 L\'Agent AI est maintenant prêt pour l\'intégration automatique'));
  } catch (error) {
    console.log(style('red', '❌ Erreur configuration:'));
    console.log(style('red', error.message));
  }
}

// ⚙️ Lister les configs
async function listConfigs() {
  console.log(style('cyan', '⚙️ Configurations Makandal:', true));
  console.log('');
  
  try {
    await runCommand('npm', ['run', 'list-configs']);
  } catch (error) {
    console.log(style('red', '❌ Erreur lecture configurations'));
  }
}

// 🛠️ Fonction utilitaire pour exécuter commandes
function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { stdio: 'inherit' });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Commande échouée avec code ${code}`));
      }
    });
    
    process.on('error', (error) => {
      reject(error);
    });
  });
}

// 🗣️ Fonction pour poser une question
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// 🔄 Boucle principale interactive
async function mainLoop() {
  let continueLoop = true;
  
  while (continueLoop) {
    showMenu();
    
    const choice = await askQuestion(style('cyan', '🎯 Ton choix: ', true));
    console.log('');
    
    const selectedOption = menuOptions.find(opt => opt.id === choice.trim());
    
    if (selectedOption) {
      continueLoop = await executeAction(selectedOption.action);
      
      if (continueLoop) {
        console.log('');
        await askQuestion(style('gray', '📝 Appuie sur Entrée pour continuer...'));
        console.log('');
      }
    } else {
      console.log(style('red', '❌ Choix invalide ! Makandal ne comprend pas...'));
      console.log('');
    }
  }
}

// 🚀 Point d'entrée principal
async function main() {
  showBanner();
  
  console.log(style('green', randomMessage('greeting'), true));
  console.log('');
  
  await mainLoop();
}

// 🎬 Démarrage du script
if (require.main === module) {
  main().catch((error) => {
    console.error(style('red', '💥 Erreur fatale Makandal:'), error);
    process.exit(1);
  });
}

module.exports = { main };
