*** Settings ***
Documentation   A test suite with a 2 tests for checking cancelled events in cancelled Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
# Sort By Ascending
#     Go To Cancelled Events
#     Select From List By Value       name:sort      date-asc
#     Click Filter And Sort Button
#     Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      Eula
#     [Teardown]      Close Browser

# Sort By Descending
#     Go To Cancelled Events
#     Select From List By Value       name:sort      date-dsc
#     Click Filter And Sort Button
#     Element Should Contain      xpath://*[@id="today-main"]/div/div[1]      Skup Bap Dip
#     [Teardown]      Close Browser


