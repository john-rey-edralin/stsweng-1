*** Settings ***
Documentation   A test suite with a 1 tests for checking pencilbookings in Pencilbookings Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Sort By Ascending Then Descending
    Go To Pencilbookings
    Select From List By Value       name:sort      date-asc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      DONTMODIFY
    Wait Until Element Is Visible       today-date
    Click Element       today-date
    Select From List By Value       name:sort      date-dsc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      DONTMODIFY
    [Teardown]      Close Browser

