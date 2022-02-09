*** Settings ***
Documentation   A test suite with a 1 tests for checking past events in Past Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Sort By Ascending Then Descending
    Go To Past Events
    Select From List By Value       name:sort      date-asc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      Eula
    Wait Until Element Is Visible       css:*[data-bs-toggle="tooltip"]
    Click Element       css:*[data-bs-toggle="tooltip"]
    Select From List By Value       name:sort      date-dsc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      Skup Bap Dip
    [Teardown]      Close Browser


