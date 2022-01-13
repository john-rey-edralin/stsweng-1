*** Settings ***
Documentation   A test suite with a 2 tests for saving created event in Create Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Sort By Ascending
    Go To Reservations
    Select From List By Value       name:sort      date-asc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]/h1[2]     Diluc
    [Teardown]      Close Browser

Sort By Descending
    Go To Reservations
    Select From List By Value       name:sort      date-dsc
    Click Filter And Sort Button
    Element Should Contain      xpath://*[@id="today-main"]/div/div[1]/h1[2]      Deric
    [Teardown]      Close Browser


