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
JSON_DIR=$(dirname "$CHROME_JSON")
FEATURE_FILE="$JSON_DIR/${BASENAME}.feature"

if [ -f "$FEATURE_FILE" ]; then
    node "tools/improve-generated-tests.js" "$FEATURE_FILE"
fi

# Étape 3: Organisation des fichiers
echo "⚙️  Étape 3: Organisation des fichiers"
mkdir -p "$OUTPUT_DIR"

# Déplace les fichiers générés
if [ -f "$JSON_DIR/${BASENAME}.feature" ]; then
    mv "$JSON_DIR/${BASENAME}.feature" "$OUTPUT_DIR/"
    echo "✅ Feature déplacé: $OUTPUT_DIR/${BASENAME}.feature"
fi

if [ -f "$JSON_DIR/${BASENAME}.improved.feature" ]; then
    mv "$JSON_DIR/${BASENAME}.improved.feature" "$OUTPUT_DIR/"
    echo "✅ Feature amélioré: $OUTPUT_DIR/${BASENAME}.improved.feature"
fi

# Organisation des définitions générées
DEFINITIONS_DIR="$OUTPUT_DIR/definitions"
mkdir -p "$DEFINITIONS_DIR"

if [ -f "$JSON_DIR/${BASENAME}_elements.json5" ]; then
    echo "📝 Organisation des définitions d'éléments..."
    mv "$JSON_DIR/${BASENAME}_elements.json5" "$DEFINITIONS_DIR/"
    echo "✅ Éléments: $DEFINITIONS_DIR/${BASENAME}_elements.json5"
fi

if [ -f "$JSON_DIR/${BASENAME}_urls.json5" ]; then
    echo "📝 Organisation des URLs..."
    mv "$JSON_DIR/${BASENAME}_urls.json5" "$DEFINITIONS_DIR/"
    echo "✅ URLs: $DEFINITIONS_DIR/${BASENAME}_urls.json5"
fi

# Étape 4: Validation et suggestions
echo "⚙️  Étape 4: Validation et suggestions"
echo ""
echo "🎉 Workflow terminé avec succès !"
echo ""
echo "📋 Prochaines étapes d'intégration:"
echo ""
echo "🎯 ÉTAPE 1 - Vérifiez vos tests:"
echo "   📝 Révisez: $OUTPUT_DIR/${BASENAME}.feature"
echo "   ✨ Version améliorée: $OUTPUT_DIR/${BASENAME}.improved.feature"
echo ""
echo "🔗 ÉTAPE 2 - Intégrez les définitions dans votre projet wedia_demo:"
echo "   📋 Éléments: $DEFINITIONS_DIR/${BASENAME}_elements.json5"
echo "   🌐 URLs: $DEFINITIONS_DIR/${BASENAME}_urls.json5"
echo ""
echo "   👉 Copiez le contenu dans vos fichiers de définitions existants:"
echo "      - Éléments → wedia_demo/Test/e2e-tests/cucumber-app/project/definitions/_elements.json5"
echo "      - URLs → wedia_demo/Test/e2e-tests/cucumber-app/project/definitions/_urls.json5"
echo ""
echo "🧪 ÉTAPE 3 - Testez votre intégration:"
echo "   npm run test:dev  # Dans votre projet wedia_demo"
echo ""
echo "🔧 ÉTAPE 4 - Améliorez vos sélecteurs (optionnel):"
echo "   Ajoutez des attributs data-testid dans votre code HTML"
echo ""
echo "📁 Structure générée:"
echo "   $OUTPUT_DIR/"
echo "   ├── ${BASENAME}.feature"
echo "   ├── ${BASENAME}.improved.feature"  
echo "   └── definitions/"
echo "       ├── ${BASENAME}_elements.json5"
echo "       └── ${BASENAME}_urls.json5"
