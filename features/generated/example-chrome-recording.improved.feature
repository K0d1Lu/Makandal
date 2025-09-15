@browser
Feature: test

  Scenario: test
    Given the viewport is 1196x934
    When I navigate to 'home page'
    Then there should be a 'top header' element within 3 seconds
    When I click on 'notification icon'
    When I click on 'remove notification'
    When I click on 'menu button'
    When I click on 'menu button'
    When I click on 'search'
    When I click on 'keywords'
