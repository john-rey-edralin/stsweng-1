*** Settings ***
Documentation   A test suite with a 2 tests for checking reservations in Reservations Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Sort By Ascending Then Descending
    Go To Reservations
    Select From List By Value       name:sort      date-asc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]/h1[2]     DONTMODIFY
    Wait Until Element Is Visible       css:*[data-bs-toggle="tooltip"]
    Click Element       css:*[data-bs-toggle="tooltip"]
    Select From List By Value       name:sort      date-dsc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]/h1[2]     DONTMODIFY
    [Teardown]      Close Browser

