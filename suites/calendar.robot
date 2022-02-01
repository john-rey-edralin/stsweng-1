*** Settings ***
Documentation   A test suite with a 1 tests for checking functionality of the calendar in Calendar Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Check Calendar
    Open Browser To Calendar Page
    Element Should Contain      xpath:/html/body/div/div/div/div[1]/h2      February 2022
    Click Element        xpath:/html/body/div/div/div/div[1]/span[2]
    Element Should Contain      xpath:/html/body/div/div/div/div[1]/h2      March 2022
    Click Element        xpath:/html/body/div/div/div/div[1]/span[1]
    Click Element        xpath:/html/body/div/div/div/div[1]/span[1]
    Element Should Contain      xpath:/html/body/div/div/div/div[1]/h2      January 2022
    Click Element        xpath:/html/body/div/div/div/div[1]/span[2]
    Click Element       xpath:/html/body/div/div/div/div[3]/div[1]/div[3]
    Element Should Contain      xpath:/html/body/div[1]/div/div/div[3]/div[1]/div[4]/div/div/div[2]     JR
    [Teardown]      Close Browser


