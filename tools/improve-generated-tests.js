#!/usr/bin/env node

/**
 * Améliore les tests générés automatiquement
 * - Renomme les éléments génériques 
 * - Ajoute des assertions
 * - Optimise les steps
 */

const fs = require('fs');
const path = require('path');

class TestImprover {
  constructor() {
    this.improvements = {
      elementNames: {
        'click \\d+': 'menu button',
        'header.*icon': 'notification icon',
        'search.*button': 'search button'
      },
      
      addAssertions: [
        {
          after: "When I navigate to 'home page'",
          add: "    Then there should be a 'top header' element within 3 seconds"
        },
        {
          after: "When I click on 'search button'",
          add: "    Then there should be a 'search results' element within 10 seconds"
        }
      ]
    };
  }

  improve(featureFile) {
    let content = fs.readFileSync(featureFile, 'utf8');
    
    // Améliore les noms d'éléments
    for (const [pattern, replacement] of Object.entries(this.improvements.elementNames)) {
      const regex = new RegExp(pattern, 'gi');
      content = content.replace(regex, replacement);
    }
    
    // Ajoute des assertions
    for (const assertion of this.improvements.addAssertions) {
      if (content.includes(assertion.after)) {
        content = content.replace(assertion.after, assertion.after + '\n' + assertion.add);
      }
    }
    
    // Sauvegarde la version améliorée
    const improvedFile = featureFile.replace('.feature', '.improved.feature');
    fs.writeFileSync(improvedFile, content);
    
    console.log(`✅ Test amélioré sauvé: ${improvedFile}`);
    return improvedFile;
  }
}

// Usage
if (require.main === module) {
  const featureFile = process.argv[2];
  if (!featureFile) {
    console.error('Usage: node improve-generated-tests.js test.feature');
    process.exit(1);
  }
  
  const improver = new TestImprover();
  improver.improve(featureFile);
}

module.exports = TestImprover;
