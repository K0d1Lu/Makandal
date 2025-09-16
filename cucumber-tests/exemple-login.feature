@browser
Feature: Exemple Login Portal

  Scenario: Exemple Login Portal
    Given the viewport is 1200x800
    When I navigate to 'login page'
    When I click on 'email field'
    When I write 'undefined' in 'type 9145'
    When I click on 'password field'
    When I write 'undefined' in 'type 9145'
    When I click on 'login btn'
    Then there should be a 'dashboard' element within 5 seconds
