*** Settings ***
Documentation   A test suite with a 2 tests for saving created event in Create Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Filter Venue With Garden
    Go To Past Events
    Select From List By Value       name:venue      Garden
    Click Filter And Sort Button
    Should Have           Garden
    [Teardown]      Close Browser

Filter Venue With Sunroom
    Go To Past Events
    Select From List By Value       name:venue      Sunroom
    Click Filter And Sort Button
    Should Have           Sunroom 
    [Teardown]      Close Browser

Filter Venue With Terrace
    Go To Past Events
    Select From List By Value       name:venue      Terrace
    Click Filter And Sort Button
    Should Have           Terrace
    [Teardown]      Close Browser

Filter Afternoon Time
    Go To Past Events
    Select From List By Value       name:time      Afternoon
    Click Filter And Sort Button
    Should Not Have           dark_mode
    [Teardown]      Close Browser

Filter Night Time
    Go To Past Events
    Select From List By Value       name:time      Evening
    Click Filter And Sort Button
    Should Not Have           light_mode
    [Teardown]      Close Browser

Filter Date
    Go To Past Events
    Press Keys       date        ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Click Filter And Sort Button
    Should Not Have           2021
    [Teardown]      Close Browser


