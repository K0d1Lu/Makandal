#!/bin/bash

# Workflow complet Chrome Recorder → Cucumber
# Usage: ./chrome-workflow.sh mon-enregistrement.json "Mon Feature"

set -e

# Configuration
CHROME_JSON=$1
FEATURE_NAME=${2:-"Generated Feature"}
OUTPUT_DIR="features/generated"
TOOLS_DIR="../tools"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKFLOW_ROOT="$(dirname "$SCRIPT_DIR")"

# Vérifications
if [ -z "$CHROME_JSON" ]; then
    echo "❌ Usage: ./chrome-workflow.sh <chrome-recording.json> [\"Feature Name\"]"
    exit 1
fi

if [ ! -f "$CHROME_JSON" ]; then
    echo "❌ Fichier non trouvé: $CHROME_JSON"
    exit 1
fi

echo "🚀 Démarrage du workflow Chrome → Cucumber"
echo "📁 Fichier d'entrée: $CHROME_JSON"
echo "🎯 Feature: $FEATURE_NAME"
echo ""

# Étape 1: Conversion Chrome → Cucumber
echo "⚙️  Étape 1: Conversion Chrome → Cucumber"
cd "$WORKFLOW_ROOT"
node "tools/chrome-to-cucumber-converter.js" "$CHROME_JSON"

# Étape 2: Amélioration automatique
echo "⚙️  Étape 2: Amélioration automatique"
BASENAME=$(basename "$CHROME_JSON" .json)
FEATURE_FILE="${BASENAME}.feature"

if [ -f "$FEATURE_FILE" ]; then
    node "tools/improve-generated-tests.js" "$FEATURE_FILE"
fi

# Étape 3: Organisation des fichiers
echo "⚙️  Étape 3: Organisation des fichiers"
mkdir -p "$OUTPUT_DIR"

# Déplace les fichiers générés
if [ -f "${BASENAME}.feature" ]; then
    mv "${BASENAME}.feature" "$OUTPUT_DIR/"
    echo "✅ Feature déplacé: $OUTPUT_DIR/${BASENAME}.feature"
fi

if [ -f "${BASENAME}.improved.feature" ]; then
    mv "${BASENAME}.improved.feature" "$OUTPUT_DIR/"
    echo "✅ Feature amélioré: $OUTPUT_DIR/${BASENAME}.improved.feature"
fi

# Fusionne les définitions avec les existantes
if [ -f "${BASENAME}_elements.json5" ]; then
    echo "📝 Fusion des définitions d'éléments..."
    # Crée le dossier definitions s'il n'existe pas
    mkdir -p "../../definitions"
    mv "${BASENAME}_elements.json5" "../../definitions/_generated_elements.json5"
    echo "✅ Éléments: ../../definitions/_generated_elements.json5"
fi

if [ -f "${BASENAME}_urls.json5" ]; then
    echo "📝 Fusion des URLs..."
    mkdir -p "../../definitions" 
    mv "${BASENAME}_urls.json5" "../../definitions/_generated_urls.json5"
    echo "✅ URLs: ../../definitions/_generated_urls.json5"
fi

# Étape 4: Validation et suggestions
echo "⚙️  Étape 4: Validation et suggestions"
echo ""
echo "🎉 Workflow terminé avec succès !"
echo ""
echo "📋 Prochaines étapes recommandées:"
echo "1. 📝 Révisez le fichier .feature généré"
echo "2. 🎯 Fusionnez les définitions avec vos fichiers existants"
echo "3. 🧪 Exécutez le test: npm run test:dev"
echo "4. 🔧 Ajoutez des attributs data-testid dans votre code pour améliorer les sélecteurs"
echo ""
echo "📁 Fichiers générés:"
echo "   - $OUTPUT_DIR/${BASENAME}.feature"
echo "   - $OUTPUT_DIR/${BASENAME}.improved.feature"
echo "   - ../../definitions/_generated_elements.json5"
echo "   - ../../definitions/_generated_urls.json5"
