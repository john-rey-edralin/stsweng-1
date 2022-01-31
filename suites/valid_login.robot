*** Settings ***
Documentation   A test suite with a 2 tests for valid login
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Valid Login
    Open Browser To Specific Page       ${LOGIN URL}  
    # input username
    Input Username  ${VALID USER}
    # input password
    Input Pass  ${VALID PASSWORD}
    # click login button
    Submit Credentials
    # close browser
    [Teardown]      Close Browser

Invalid Login
    Open Browser To Specific Page       ${LOGIN URL}  
    # input username
    Input Username  ${VALID USER}
    # input password
    Input Pass  ${VALID PASSWORD}
    # click login button
    Submit Credentials
    # close browser
    [Teardown]      Close Browser