*** Settings ***
Documentation   A test suite with a 3 tests for checking cancelled events in cancelled Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Filter Venue
    Go To Cancelled Events
    Select From List By Value       name:venue      Garden
    Click Filter And Sort Button
    Should Have           Garden
    Wait Until Element Is Visible       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Click Element       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Select From List By Value       name:venue      Sunroom
    Click Filter And Sort Button
    Should Have           Sunroom 
    Wait Until Element Is Visible       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Click Element       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Select From List By Value       name:venue      Terrace
    Click Filter And Sort Button
    Should Have           Terrace
    [Teardown]      Close Browser

Filter Time
    Go To Cancelled Events
    Select From List By Value       name:time      Afternoon
    Click Filter And Sort Button
    Should Not Have           dark_mode
    Wait Until Element Is Visible       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Click Element       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Select From List By Value       name:time      Evening
    Click Filter And Sort Button
    Should Not Have           light_mode
    [Teardown]      Close Browser

Filter Date
    Go To Cancelled Events
    Press Keys       date        ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Click Filter And Sort Button
    Should Not Have           2021
    [Teardown]      Close Browser


