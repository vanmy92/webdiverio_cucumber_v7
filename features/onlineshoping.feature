Feature: SignUp, Sign In and Purchase Product

  Scenario: TC-001 Create New user/SignUp

    Given I am on the login page  
    Then Navigate to SignUp page
    And create an account with random username 

  @sanity
  Scenario:TC-002 Sign In with newly created user credentials
    Given I am on the Sign In Page
    When Login using newly created dynamic credentials
    Then I shall verify the address information in my addresses section