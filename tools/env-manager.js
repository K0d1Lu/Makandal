#!/usr/bin/env node

/**
 * 🤖 Makandal Environment Manager - Agent AI First
 * 🎯 Gestion automatique .env + intégration wedia_demo
 * 🏛️ Agent intelligent qui configure son propre environnement
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

class MakandalEnvironmentManager {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.envPath = path.join(this.projectRoot, '.env');
    this.envExamplePath = path.join(this.projectRoot, 'config', 'env.example');
    this.config = {};
  }

  // 🔍 Charger configuration .env existante
  async loadEnvironment() {
    try {
      if (fs.existsSync(this.envPath)) {
        const envContent = fs.readFileSync(this.envPath, 'utf8');
        
        // Parse simple du .env
        envContent.split('\n').forEach(line => {
          line = line.trim();
          if (line && !line.startsWith('#') && line.includes('=')) {
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('=').replace(/^["']|["']$/g, '');
            this.config[key.trim()] = value.trim();
          }
        });
        
        log('green', '✅', 'Configuration .env chargée');
        return true;
      }
      return false;
    } catch (error) {
      log('red', '❌', `Erreur lecture .env: ${error.message}`);
      return false;
    }
  }

  // 🛠️ Vérifier si wedia_demo path existe et est valide
  async validateWediaDemoPath(pathToCheck) {
    if (!pathToCheck) return false;
    
    try {
      if (!fs.existsSync(pathToCheck)) return false;
      
      // Vérifier structure wedia_demo attendue
      const expectedPaths = [
        path.join(pathToCheck, 'Test'),
        path.join(pathToCheck, 'Test', 'e2e-tests'),
        path.join(pathToCheck, 'Test', 'e2e-tests', 'cucumber-app'),
        path.join(pathToCheck, 'Test', 'e2e-tests', 'cucumber-app', 'project')
      ];
      
      return expectedPaths.every(expectedPath => fs.existsSync(expectedPath));
    } catch (error) {
      return false;
    }
  }

  // 🗣️ Prompt interactif pour configuration
  async promptEnvironmentSetup() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = (question) => {
      return new Promise(resolve => {
        rl.question(question, resolve);
      });
    };

    try {
      log('cyan', '🤖', 'Makandal Agent - Configuration environnement requise');
      console.log('');
      
      // Demander path wedia_demo
      let wediaDemoPath;
      while (!wediaDemoPath) {
        const suggestedPath = '/Users/lucas/Documents/projets/wedia_demo';
        console.log(`${colors.yellow}📁 Path vers wedia_demo requis pour intégration automatique${colors.reset}`);
        console.log(`   Suggestion: ${suggestedPath}`);
        
        const userPath = await askQuestion(`${colors.cyan}🎯 Chemin wedia_demo: ${colors.reset}`);
        const pathToTest = userPath.trim() || suggestedPath;
        
        if (await this.validateWediaDemoPath(pathToTest)) {
          wediaDemoPath = pathToTest;
          log('green', '✅', `Path wedia_demo validé: ${wediaDemoPath}`);
        } else {
          log('red', '❌', 'Path invalide ou structure wedia_demo introuvable');
          log('yellow', '💡', 'Vérifiez: Test/e2e-tests/cucumber-app/project/ existe dans ce chemin');
        }
      }

      // Configuration additionnelle
      console.log('');
      const autoIntegration = await askQuestion(`${colors.cyan}🎯 Intégration automatique activée ? (Y/n): ${colors.reset}`);
      const createBackups = await askQuestion(`${colors.cyan}🎯 Créer backups avant écriture ? (Y/n): ${colors.reset}`);
      
      rl.close();

      return {
        WEDIA_DEMO_PATH: wediaDemoPath,
        WEDIA_FEATURES_PATH: path.join(wediaDemoPath, 'Test/e2e-tests/cucumber-app/project/features'),
        WEDIA_DEFINITIONS_PATH: path.join(wediaDemoPath, 'Test/e2e-tests/cucumber-app/project/definitions'),
        AUTO_INTEGRATION_ENABLED: autoIntegration.toLowerCase() !== 'n',
        CREATE_BACKUP_BEFORE_INTEGRATION: createBackups.toLowerCase() !== 'n',
        ASK_CONFIRMATION_BEFORE_WRITE: false,
        AGENT_INTERACTIVE_SETUP: true,
        AGENT_AUTO_CREATE_FOLDERS: true,
        AGENT_VERBOSE_LOGGING: true,
        DEFAULT_FEATURE_ORGANIZATION: 'generated',
        BACKUP_FOLDER_NAME: 'makandal-backups'
      };

    } catch (error) {
      rl.close();
      throw error;
    }
  }

  // 💾 Créer/Mettre à jour .env
  async createOrUpdateEnvironment(config) {
    try {
      const envLines = [];
      envLines.push('# 🏛️ Configuration Makandal - Agent AI Environment');
      envLines.push('# Généré automatiquement par Makandal Agent');
      envLines.push(`# Date: ${new Date().toISOString()}`);
      envLines.push('');
      
      envLines.push('# 📁 Paths projet wedia_demo');
      envLines.push(`WEDIA_DEMO_PATH="${config.WEDIA_DEMO_PATH}"`);
      envLines.push(`WEDIA_FEATURES_PATH="${config.WEDIA_FEATURES_PATH}"`);
      envLines.push(`WEDIA_DEFINITIONS_PATH="${config.WEDIA_DEFINITIONS_PATH}"`);
      envLines.push('');
      
      envLines.push('# 🎯 Configuration intégration');
      envLines.push(`AUTO_INTEGRATION_ENABLED=${config.AUTO_INTEGRATION_ENABLED}`);
      envLines.push(`CREATE_BACKUP_BEFORE_INTEGRATION=${config.CREATE_BACKUP_BEFORE_INTEGRATION}`);
      envLines.push(`ASK_CONFIRMATION_BEFORE_WRITE=${config.ASK_CONFIRMATION_BEFORE_WRITE}`);
      envLines.push('');
      
      envLines.push('# 🤖 Agent AI comportement');
      envLines.push(`AGENT_INTERACTIVE_SETUP=${config.AGENT_INTERACTIVE_SETUP}`);
      envLines.push(`AGENT_AUTO_CREATE_FOLDERS=${config.AGENT_AUTO_CREATE_FOLDERS}`);
      envLines.push(`AGENT_VERBOSE_LOGGING=${config.AGENT_VERBOSE_LOGGING}`);
      envLines.push('');
      
      envLines.push('# 🏗️ Organisation');
      envLines.push(`DEFAULT_FEATURE_ORGANIZATION="${config.DEFAULT_FEATURE_ORGANIZATION}"`);
      envLines.push(`BACKUP_FOLDER_NAME="${config.BACKUP_FOLDER_NAME}"`);

      fs.writeFileSync(this.envPath, envLines.join('\n'), 'utf8');
      
      log('green', '✅', `.env créé/mis à jour: ${this.envPath}`);
      this.config = config;
      return true;
    } catch (error) {
      log('red', '❌', `Erreur création .env: ${error.message}`);
      return false;
    }
  }

  // 🚀 Setup automatique complet
  async ensureEnvironmentReady() {
    log('cyan', '🤖', 'Makandal Agent - Vérification environnement...');
    
    // Charger config existante
    const envExists = await this.loadEnvironment();
    
    if (envExists && this.config.WEDIA_DEMO_PATH) {
      // Vérifier que le path est toujours valide
      const isValid = await this.validateWediaDemoPath(this.config.WEDIA_DEMO_PATH);
      
      if (isValid) {
        log('green', '✅', 'Environnement configuré et valide');
        return this.config;
      } else {
        log('yellow', '⚠️', 'Path wedia_demo invalide, reconfiguration requise');
      }
    }

    // Setup interactif requis
    if (!envExists || this.config.AGENT_INTERACTIVE_SETUP !== false) {
      log('blue', '🛠️', 'Configuration initiale requise...');
      const newConfig = await this.promptEnvironmentSetup();
      await this.createOrUpdateEnvironment(newConfig);
      return newConfig;
    }

    throw new Error('Environnement non configuré et setup interactif désactivé');
  }

  // 📁 Obtenir paths pour intégration
  getWediaPaths() {
    return {
      demoPath: this.config.WEDIA_DEMO_PATH,
      featuresPath: this.config.WEDIA_FEATURES_PATH,
      definitionsPath: this.config.WEDIA_DEFINITIONS_PATH,
      autoIntegration: this.config.AUTO_INTEGRATION_ENABLED === true || this.config.AUTO_INTEGRATION_ENABLED === 'true',
      createBackups: this.config.CREATE_BACKUP_BEFORE_INTEGRATION === true || this.config.CREATE_BACKUP_BEFORE_INTEGRATION === 'true',
      defaultOrganization: this.config.DEFAULT_FEATURE_ORGANIZATION || 'generated'
    };
  }

  // 🛡️ Créer backup avant modification
  async createBackup(filePath) {
    if (!fs.existsSync(filePath)) return null;
    
    try {
      const backupName = `${path.basename(filePath)}.backup.${Date.now()}`;
      const backupDir = path.join(path.dirname(filePath), this.config.BACKUP_FOLDER_NAME || 'makandal-backups');
      
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      const backupPath = path.join(backupDir, backupName);
      fs.copyFileSync(filePath, backupPath);
      
      log('blue', '🛡️', `Backup créé: ${backupName}`);
      return backupPath;
    } catch (error) {
      log('yellow', '⚠️', `Backup échoué: ${error.message}`);
      return null;
    }
  }
}

// 🚀 Export pour utilisation dans autres modules
module.exports = { MakandalEnvironmentManager };

// 🎬 CLI si exécuté directement
if (require.main === module) {
  (async () => {
    try {
      const envManager = new MakandalEnvironmentManager();
      await envManager.ensureEnvironmentReady();
      
      const paths = envManager.getWediaPaths();
      console.log('');
      log('green', '🎉', 'Configuration terminée !');
      log('cyan', '📁', `wedia_demo: ${paths.demoPath}`);
      log('cyan', '📝', `Features: ${paths.featuresPath}`);
      log('cyan', '🎯', `Definitions: ${paths.definitionsPath}`);
      
    } catch (error) {
      log('red', '💥', `Erreur: ${error.message}`);
      process.exit(1);
    }
  })();
}
