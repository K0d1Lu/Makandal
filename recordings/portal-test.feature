@browser
Feature: tri portals

  Scenario: tri portals
    Given the viewport is 1909x934
    When I navigate to 'orderby modified 20desc query  7b 22or 3aportalactive true 22 3a 7b 22activated 22 3a 7b 22eq 22 3atrue 7d 7d 7d page'
    When I click on 'click 5767'
    When I click on ' editer le portail'
    When I click on 'click 5768'
    When I click on ''
    When I click on 'confirmer'
    When I click on ''
    When I click on 'click 5769'
    When I click on 'titre de la section *'
    When I click on 'confirmer'
