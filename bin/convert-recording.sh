#!/bin/bash

# 🎯 Makandal - Script conversion recordings Chrome → Cucumber
# Usage: ./bin/convert-recording.sh mon-fichier.json

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function pour messages colorés
log() {
  local color=$1
  local icon=$2
  local message=$3
  echo -e "${color}${icon} ${message}${NC}"
}

# Vérification argument
if [ $# -eq 0 ]; then
  log $RED "❌" "Nom de fichier requis"
  echo ""
  log $CYAN "📋" "Usage:"
  echo "  npm run convert mon-fichier.json"
  echo "  npm run workflow mon-fichier.json"
  echo ""
  log $YELLOW "📂" "Fichiers disponibles dans recordings/:"
  if [ -d "recordings" ]; then
    ls -1 recordings/*.json 2>/dev/null | head -5 | sed 's/recordings\//  /'
    count=$(ls -1 recordings/*.json 2>/dev/null | wc -l)
    if [ $count -gt 5 ]; then
      echo "  ... et $((count - 5)) autres"
    fi
  else
    echo "  (aucun fichier trouvé)"
  fi
  exit 1
fi

FILE_NAME="$1"
RECORDINGS_DIR="recordings"
INPUT_FILE="$RECORDINGS_DIR/$FILE_NAME"

# Vérifier que le fichier existe
if [ ! -f "$INPUT_FILE" ]; then
  log $RED "❌" "Fichier '$INPUT_FILE' introuvable"
  echo ""
  log $YELLOW "📂" "Fichiers disponibles:"
  if [ -d "$RECORDINGS_DIR" ]; then
    ls -1 "$RECORDINGS_DIR"/*.json 2>/dev/null | sed 's/recordings\//  /' || echo "  (aucun fichier .json)"
  fi
  exit 1
fi

# Démarrage conversion
log $CYAN "🔥" "Makandal - Conversion Chrome → Cucumber"
log $BLUE "📁" "Fichier source: $INPUT_FILE"

# Lancer le convertisseur
if [ "$2" = "workflow" ]; then
  log $YELLOW "🚀" "Mode workflow complet..."
  ./scripts/chrome-workflow.sh "$INPUT_FILE"
else
  log $YELLOW "⚙️" "Mode conversion simple..."
  node tools/chrome-to-cucumber-converter.js "$INPUT_FILE"
fi

# Vérification résultat
if [ $? -eq 0 ]; then
  log $GREEN "✅" "Conversion terminée avec succès !"
  echo ""
  log $CYAN "📂" "Fichiers générés dans:"
  echo "  features/generated/"
  echo "  features/generated/definitions/"
else
  log $RED "❌" "Erreur pendant la conversion"
  exit 1
fi
