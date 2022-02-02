*** Settings ***
Documentation   A test suite with a 1 tests for checking the button for modifying employee access
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Modifying Employee Access Button
    Go To Admin Menu
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
    Element Should Be Visible       xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    Element Should Be Enabled       xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    [Teardown]      Close Browser

Has System Access Info Modified
    Go To Admin Menu
    click element       xpath:/html/body/div/div/div[2]/div[1]/div/input
    Page Should Not Contain     class:noaccess
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[3]/div[1]
    Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/div/div/div[3]/button[2]
    Input Text          emergency-contact-name-JR           Some
    Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[3]/div[3]/div/div/div[3]/button[2]
    [Teardown]      Close Browser

# Remove and Give Employee Access
#     Go To Admin Menu
#     Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
#     Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
#     Wait Until Element Is Visible       xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[4]/div/div/div[3]/button[2]
#     Wait Until Element Is Enabled      xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[5]/div/div/div[3]/button[2]
#     Click Element        xpath:/html/body/div[1]/div/div[2]/div[2]/div[1]/div[5]/div/div/div[3]/button[2]
#     Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
#     Element Should Contain      xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button      Remove Access
    # Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button
    # Wait Until Element Is Enabled       xpath:/html/body/div[1]/div/div[2]/div[2]/div[3]/div/div/div[3]/button[2]
    # Click Button        xpath:/html/body/div[1]/div/div[2]/div[2]/div[4]/div/div/div[3]/button[2]
    # Click Element       xpath://*[@id="admin-main"]/div[2]/div[1]
    # Element Should Contain      xpath:/html/body/div[1]/div/div[2]/div[2]/div[2]/div/div/div[3]/button      Give Access
    # [Teardown]      Close Browser



