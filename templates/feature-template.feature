@browser
Feature: {{FEATURE_NAME}}

  Background:
    Given I am connected as "{{DEFAULT_USER}}"
    And the viewport is {{VIEWPORT_WIDTH}}x{{VIEWPORT_HEIGHT}}

  Scenario: {{SCENARIO_NAME}}
    # Navigation
    When I navigate to '{{START_PAGE}}'
    Then there should be a 'page container' element within 5 seconds
    
    # Actions générées automatiquement par Chrome Recorder
    {{GENERATED_STEPS}}
    
    # Assertions de validation (à ajouter manuellement)
    Then I should see success feedback
    And the result should be visible

  Scenario Outline: {{SCENARIO_NAME}} with different data
    When I navigate to '{{START_PAGE}}'
    And I perform action with "<data>"
    Then I should see "<expected_result>"

    Examples:
      | data    | expected_result |
      | value1  | result1        |
      | value2  | result2        |

# Templates d'assertions courantes à ajouter selon le contexte :

# Navigation
# Then I should be redirected to '{{TARGET_PAGE}}' within {{TIMEOUT}} seconds

# Feedback utilisateur
# Then there should be a 'success toast' element within 5 seconds
# And element 'success toast' should contain text '{{SUCCESS_MESSAGE}}'

# Validation de données
# Then element '{{DATA_CONTAINER}}' should contain '{{EXPECTED_DATA}}'
# And the count of '{{LIST_ITEMS}}' should be {{EXPECTED_COUNT}}

# État des éléments
# Then element '{{BUTTON}}' should be enabled
# And element '{{FIELD}}' should be visible
# But element '{{ERROR_MESSAGE}}' should not be visible

# Interactions utilisateur
# When I wait for {{SECONDS}} seconds
# And I refresh the page
# Then the previous state should be preserved
