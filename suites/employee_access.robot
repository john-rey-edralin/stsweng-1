*** Settings ***
Documentation   A test suite with a 2 tests for modifying employee access
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Remove Employee Access
    Go To Admin Menu
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
    Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button
    Click Element        xpath:/html/body/div[1]/div/div[2]/div[2]/div[4]/div/div/div[3]/button[2]
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
    Element Should Contain      xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button      Remove Access
    [Teardown]      Close Browser

Give Employee Access
    Go To Admin Menu
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
    Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button
    Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[4]/div/div/div[3]/button[2]
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
    Element Should Contain      xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button      Give Access
    [Teardown]      Close Browser


