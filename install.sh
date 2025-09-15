#!/bin/bash

# 🔥 Makandal - L'Assistant Rebelle des Tests E2E
# Script d'installation pour projet standalone

set -e

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_PURPLE='\033[0;35m'
COLOR_NC='\033[0m' # No Color

# Options
VERBOSE=false
FORCE_INSTALL=false
SKIP_TESTS=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -f|--force)
            FORCE_INSTALL=true
            shift
            ;;
        -s|--skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        -h|--help)
            echo "🔥 Makandal Installation Script"
            echo ""
            echo "Usage: ./install.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -v, --verbose    Mode verbeux"
            echo "  -f, --force      Force la réinstallation"
            echo "  -s, --skip-tests Ignore les tests"
            echo "  -h, --help       Affiche cette aide"
            exit 0
            ;;
        *)
            echo "Option inconnue: $1"
            echo "Utilisez --help pour voir les options disponibles"
            exit 1
            ;;
    esac
done

log_verbose() {
    if [ "$VERBOSE" = true ]; then
        echo -e "${COLOR_PURPLE}🔍 $1${COLOR_NC}"
    fi
}

echo -e "${COLOR_BLUE}"
echo "🔥 Makandal - L'Assistant Rebelle des Tests E2E"
echo "\"Celui qui brise les chaînes de la création manuelle\""
echo "=================================================="
echo -e "${COLOR_NC}"

# Vérification de l'environnement
echo -e "${COLOR_YELLOW}🔍 Vérification de l'environnement rebelle...${COLOR_NC}"

# Node.js avec validation de version
if ! command -v node &> /dev/null; then
    echo -e "${COLOR_RED}❌ Node.js n'est pas installé${COLOR_NC}"
    echo "📥 Installez Node.js ≥16.0.0 depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d 'v' -f 2)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ "$MAJOR_VERSION" -lt 16 ]; then
    echo -e "${COLOR_RED}❌ Node.js $NODE_VERSION trop ancien${COLOR_NC}"
    echo "📥 Makandal exige Node.js ≥16.0.0 pour sa révolution !"
    exit 1
fi

echo -e "${COLOR_GREEN}✅ Node.js ${NODE_VERSION} - Prêt pour la révolution !${COLOR_NC}"
log_verbose "Version Node.js validée: $NODE_VERSION"

# npm
if ! command -v npm &> /dev/null; then
    echo -e "${COLOR_RED}❌ npm n'est pas installé${COLOR_NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${COLOR_GREEN}✅ npm ${NPM_VERSION}${COLOR_NC}"

# Vérification Git standalone
echo -e "${COLOR_YELLOW}📝 Vérification du territoire Git...${COLOR_NC}"

if [ -d ".git" ]; then
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo -e "${COLOR_GREEN}✅ Repository Git Makandal (branche: ${CURRENT_BRANCH})${COLOR_NC}"
    log_verbose "Projet Git standalone détecté"
    
    # Suggère un git pull si on est sur main/master
    if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
        if ! git diff --quiet HEAD @{upstream} 2>/dev/null; then
            echo -e "${COLOR_YELLOW}💡 Suggestion: git pull pour les dernières armes révolutionnaires${COLOR_NC}"
        fi
    fi
else
    echo -e "${COLOR_YELLOW}ℹ️  Pas de Git (installation locale)${COLOR_NC}"
fi

# Installation des dépendances
echo -e "${COLOR_YELLOW}📦 Armement de l'arsenal Makandal...${COLOR_NC}"

if [ ! -d "node_modules" ] || [ "$FORCE_INSTALL" = true ]; then
    log_verbose "Installation des dépendances npm..."
    if [ "$VERBOSE" = true ]; then
        npm install
    else
        npm install --silent
    fi
    echo -e "${COLOR_GREEN}✅ Arsenal Makandal armé et prêt !${COLOR_NC}"
else
    echo -e "${COLOR_GREEN}✅ Arsenal déjà en place${COLOR_NC}"
fi

# Validation adaptative de la structure
echo -e "${COLOR_YELLOW}🏗️ Inspection du camp de base...${COLOR_NC}"

CRITICAL_FILES=(
    "package.json:Configuration du projet"
    "README.md:Documentation principale"
    "tools/:Outils de conversion"
    "ai-discovery-prompts/:Intelligence artificielle"
)

for item in "${CRITICAL_FILES[@]}"; do
    file=$(echo $item | cut -d ':' -f 1)
    desc=$(echo $item | cut -d ':' -f 2)
    
    if [ -e "$file" ]; then
        echo -e "${COLOR_GREEN}✅ $file ($desc)${COLOR_NC}"
        log_verbose "Validé: $file"
    else
        echo -e "${COLOR_YELLOW}⚠️  $file manquant ($desc)${COLOR_NC}"
    fi
done

# Validation du code
echo -e "${COLOR_YELLOW}🔧 Test des armes révolutionnaires...${COLOR_NC}"

# Utilise npm validate si disponible
if [ -f "package.json" ] && npm run validate > /dev/null 2>&1; then
    echo -e "${COLOR_GREEN}✅ Code validé par les standards rebelles${COLOR_NC}"
    log_verbose "Validation npm réussie"
else
    # Fallback : validation manuelle
    log_verbose "Fallback: validation manuelle des fichiers critiques"
    
    if [ -f "tools/chrome-to-cucumber-converter.js" ]; then
        if node -c "tools/chrome-to-cucumber-converter.js" 2>/dev/null; then
            echo -e "${COLOR_GREEN}✅ Convertisseur Makandal opérationnel${COLOR_NC}"
        else
            echo -e "${COLOR_RED}❌ Erreur dans le convertisseur principal${COLOR_NC}"
            exit 1
        fi
    fi
fi

# Configuration des permissions
echo -e "${COLOR_YELLOW}🔐 Attribution des pouvoirs révolutionnaires...${COLOR_NC}"

find scripts/ -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true
chmod +x install.sh 2>/dev/null || true

echo -e "${COLOR_GREEN}✅ Pouvoirs accordés à l'assistant rebelle${COLOR_NC}"

# Test de l'agent Makandal
if [ "$SKIP_TESTS" = false ]; then
    echo -e "${COLOR_YELLOW}🧪 Test de l'agent rebelle...${COLOR_NC}"
    
    if npm test > /dev/null 2>&1; then
        echo -e "${COLOR_GREEN}✅ Makandal opérationnel et prêt au combat !${COLOR_NC}"
        
        # Nettoyage automatique des fichiers de test
        find examples/ -name "*_elements.json5" -delete 2>/dev/null || true
        find examples/ -name "*_urls.json5" -delete 2>/dev/null || true
        find examples/ -name "*.feature" ! -name "example-chrome-recording.json" -delete 2>/dev/null || true
        log_verbose "Nettoyage des fichiers de test terminé"
        
    else
        echo -e "${COLOR_RED}❌ L'agent rebelle rencontre des difficultés${COLOR_NC}"
        echo "🔍 Exécutez 'npm test' pour diagnostiquer les problèmes"
        exit 1
    fi
else
    echo -e "${COLOR_YELLOW}⏭️  Tests ignorés (option --skip-tests)${COLOR_NC}"
fi

# Validation de l'IA
if [ -d "ai-discovery-prompts" ]; then
    echo -e "${COLOR_YELLOW}🤖 Vérification de l'intelligence rebelle...${COLOR_NC}"
    
    AI_FILES=(
        "ai-discovery-prompts/AI-AGENT-CONFIG.json5"
        "ai-discovery-prompts/01-discover-definitions.md"
        "ai-discovery-prompts/02-intelligent-merge.md"
    )
    
    AI_COUNT=0
    for ai_file in "${AI_FILES[@]}"; do
        if [ -f "$ai_file" ]; then
            ((AI_COUNT++))
        fi
    done
    
    if [ "$AI_COUNT" -gt 0 ]; then
        echo -e "${COLOR_GREEN}✅ Intelligence artificielle rebelle ($AI_COUNT prompts)${COLOR_NC}"
        log_verbose "Prompts IA détectés: $AI_COUNT"
    else
        echo -e "${COLOR_YELLOW}⚠️  Prompts IA manquants${COLOR_NC}"
    fi
fi

echo -e "${COLOR_GREEN}"
echo "🎉 Makandal est armé et prêt à révolutionner vos tests !"
echo "=================================================="
echo -e "${COLOR_NC}"

echo -e "${COLOR_BLUE}⚔️  Commandes de guerre disponibles :${COLOR_NC}"
echo "• npm test                     - Test complet de l'agent"
echo "• npm run convert <file.json>  - Conversion Chrome → Cucumber"
echo "• npm run workflow <file.json> - Workflow complet avec IA"
echo "• npm run validate             - Vérification des armes"

echo ""
echo -e "${COLOR_BLUE}📚 Arsenal de connaissances :${COLOR_NC}"
echo "• README.md                    - Manifeste révolutionnaire" 
echo "• docs/                        - Guides tactiques détaillés"
echo "• ai-discovery-prompts/        - Intelligence artificielle rebelle"
echo "• examples/                    - Exemples de batailles gagnées"

echo ""
echo -e "${COLOR_BLUE}🎯 Workflow de libération :${COLOR_NC}"
echo "1. 🎥 Enregistrez dans Chrome DevTools Recorder"
echo "2. 📥 Exportez en JSON"
echo "3. 🔥 Lancez: npm run workflow votre-enregistrement.json"
echo "4. ✨ Récupérez vos tests libérés et optimisés !"

echo ""
if [ "$VERBOSE" = true ]; then
    echo -e "${COLOR_PURPLE}🔍 Mode verbeux activé - Tous les détails affichés${COLOR_NC}"
fi

echo -e "${COLOR_GREEN}🔥 Que la révolution des tests E2E commence ! 🔥${COLOR_NC}"
echo -e "${COLOR_BLUE}\"François Makandal guide notre intelligence artificielle\" ⚔️${COLOR_NC}"
