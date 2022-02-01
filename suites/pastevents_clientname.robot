*** Settings ***
Documentation   A test suite with a 1 tests for checking past events in Past Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Filter Client Name
    Go To Past Events
    Input Text      name        jiji
    Click Button        xpath://*[@id="search-filter-sort"]/div[2]/form[1]/div[2]/button
    Should Have           jiji
    # [Teardown]      Close Browser


