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
    Wait Until Page Contains        View Employee
    Wait Until Element Is Visible       xpath:/html/body/div[2]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    Element Should Be Visible       xpath:/html/body/div[2]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    Element Should Be Enabled       xpath:/html/body/div[2]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    Click Button        xpath:/html/body/div[2]/div/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/button[1]
    Wait Until Page Contains        Continue
    [Teardown]      Close Browser

Has System Access Info Modified
    Go To Admin Menu
    click element       current-employee-switch
    Page Should Not Contain     class:noaccess
    Click Element       xpath://*[@id="admin-main"]/div[2]/div[3]/div[1]
    Wait Until Page Contains        View Employee
    Wait Until Page Contains        Edit
    Wait Until Element Is Visible       xpath:/html/body/div[2]/div/div[2]/div[2]/div[3]/div[2]/div/div/div[3]/button[2]
    Click Button        xpath:/html/body/div[2]/div/div[2]/div[2]/div[3]/div[2]/div/div/div[3]/button[2]
    Input Text          emergency-contact-name-61f8c164ac81d5082f9b4423           Some
    Click Button        edit-btn-61f8c164ac81d5082f9b4423
    [Teardown]      Close Browser

# Remove and Give Employee Access [BUGGY]
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



