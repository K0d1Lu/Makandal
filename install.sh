#!/bin/bash

# Installation et validation du Chrome Recorder Workflow
# Ce script configure l'environnement et valide l'installation

set -e

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_NC='\033[0m' # No Color

echo -e "${COLOR_BLUE}"
echo "🎬 Chrome Recorder → Cucumber Workflow"
echo "Installation et validation"
echo "=========================================="
echo -e "${COLOR_NC}"

# Vérification des prérequis
echo -e "${COLOR_YELLOW}🔍 Vérification des prérequis...${COLOR_NC}"

# Node.js
if ! command -v node &> /dev/null; then
    echo -e "${COLOR_RED}❌ Node.js n'est pas installé${COLOR_NC}"
    echo "Installez Node.js ≥16.0.0 depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d 'v' -f 2)
echo -e "${COLOR_GREEN}✅ Node.js ${NODE_VERSION}${COLOR_NC}"

# npm
if ! command -v npm &> /dev/null; then
    echo -e "${COLOR_RED}❌ npm n'est pas installé${COLOR_NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${COLOR_GREEN}✅ npm ${NPM_VERSION}${COLOR_NC}"

# Validation de la structure
echo -e "${COLOR_YELLOW}📁 Validation de la structure...${COLOR_NC}"

REQUIRED_FILES=(
    "package.json"
    "README.md"
    "CHANGELOG.md"
    "tools/chrome-recorder-config.js"
    "tools/chrome-to-cucumber-converter.js"
    "tools/improve-generated-tests.js"
    "scripts/chrome-workflow.sh"
    "docs/README-Chrome-Workflow.md"
    "examples/example-chrome-recording.json"
    "templates/feature-template.feature"
    "templates/elements-template.json5"
    "templates/urls-template.json5"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${COLOR_GREEN}✅ $file${COLOR_NC}"
    else
        echo -e "${COLOR_RED}❌ $file manquant${COLOR_NC}"
        exit 1
    fi
done

# Validation de la syntaxe JavaScript
echo -e "${COLOR_YELLOW}🔧 Validation de la syntaxe...${COLOR_NC}"

JS_FILES=(
    "tools/chrome-recorder-config.js"
    "tools/chrome-to-cucumber-converter.js"
    "tools/improve-generated-tests.js"
)

for js_file in "${JS_FILES[@]}"; do
    if node -c "$js_file"; then
        echo -e "${COLOR_GREEN}✅ $js_file${COLOR_NC}"
    else
        echo -e "${COLOR_RED}❌ Erreur de syntaxe dans $js_file${COLOR_NC}"
        exit 1
    fi
done

# Permissions des scripts
echo -e "${COLOR_YELLOW}🔐 Vérification des permissions...${COLOR_NC}"

chmod +x scripts/chrome-workflow.sh
chmod +x install.sh

echo -e "${COLOR_GREEN}✅ Permissions configurées${COLOR_NC}"

# Test de conversion
echo -e "${COLOR_YELLOW}🧪 Test de conversion...${COLOR_NC}"

if node tools/chrome-to-cucumber-converter.js examples/example-chrome-recording.json > /dev/null 2>&1; then
    echo -e "${COLOR_GREEN}✅ Convertisseur fonctionnel${COLOR_NC}"
    # Nettoyage des fichiers de test
    rm -f example-chrome-recording.feature 2>/dev/null || true
    rm -f example-chrome-recording_*.json5 2>/dev/null || true
else
    echo -e "${COLOR_RED}❌ Erreur dans le convertisseur${COLOR_NC}"
    exit 1
fi

# Configuration Git (optionnel)
echo -e "${COLOR_YELLOW}📝 Configuration Git (optionnel)...${COLOR_NC}"

if [ -d "../../.git" ] || [ -d "../../../.git" ]; then
    # Création du .gitignore s'il n'existe pas
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << EOF
# Fichiers temporaires générés
*.tmp
*.temp
temp-*

# Logs
*.log
npm-debug.log*

# Fichiers de test générés
*_generated_*
test-output/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
EOF
        echo -e "${COLOR_GREEN}✅ .gitignore créé${COLOR_NC}"
    fi
else
    echo -e "${COLOR_YELLOW}ℹ️  Pas de repository Git détecté${COLOR_NC}"
fi

echo -e "${COLOR_GREEN}"
echo "🎉 Installation terminée avec succès !"
echo "=========================================="
echo -e "${COLOR_NC}"

echo -e "${COLOR_BLUE}📚 Prochaines étapes :${COLOR_NC}"
echo "1. 📖 Consultez la documentation : docs/README-Chrome-Workflow.md"
echo "2. 🧪 Testez avec un exemple : npm test"
echo "3. 🎬 Enregistrez votre premier scénario dans Chrome DevTools"
echo "4. ⚙️  Convertissez avec : npm run workflow votre-test.json"

echo ""
echo -e "${COLOR_BLUE}🛠️  Scripts disponibles :${COLOR_NC}"
echo "• npm run convert <file.json>  - Conversion simple"
echo "• npm run workflow <file.json> - Workflow complet"
echo "• npm test                     - Test de validation"
echo "• npm run validate             - Vérification syntax"

echo ""
echo -e "${COLOR_GREEN}✨ Prêt à automatiser vos tests E2E !${COLOR_NC}"
