*** Settings ***
Documentation   A test suite with a 1 tests for checking cancelled events in cancelled Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Sort By Ascending Then Descending
    Go To Cancelled Events
    Select From List By Value       name:sort      date-asc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      Noelle
    Wait Until Element Is Visible       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Click Element       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span
    Select From List By Value       name:sort      date-dsc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      JR
    [Teardown]      Close Browser



