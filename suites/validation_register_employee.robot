*** Settings ***
Documentation   A test suite with a 1 tests for validation of Registering Employee
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Validate Register
    Go To Admin Menu
    Click Element       xpath:/html/body/div/div/div[2]/div[1]/a/span
    Register Employee Page Should Be Open
    Press Keys      employee-name       BACK_SPACE  
    Press Keys      employee-mobile-number      BACK_SPACE  
    Press Keys      username      BACK_SPACE  
    Press Keys      password      BACK_SPACE  
    Element Should Contain        employee-name-error         Employee name must not be empty. 
    Element Should Contain        employee-number-error         Employee mobile number should be filled.
    Element Should Contain        username-error       Username cannot be empty.
    Element Should Contain        password-error       Password must be at least 8 characters long. 
    [Teardown]      Close Browser


