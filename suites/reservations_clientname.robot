*** Settings ***
Documentation   A test suite with a 1 tests for checking reservations in Reservations Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Filter Client Name
    Go To Reservations
    Input Text      name        JR
    Click Button        xpath://*[@id="search-filter-sort"]/div[2]/form[1]/div[2]/button
    Should Not Have           RJ
    [Teardown]      Close Browser


