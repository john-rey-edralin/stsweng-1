*** Settings ***
Documentation   A test suite with a 2 tests for saving edited event in Edit Event Page for Pencilbookings
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Save Edited Pencilbookings Event
    Open Browser To Pencilbookings Event Page
    Input Client Mobile Number      ${MOBILE NUMBER} 
    Input Type Of Event     ${TYPE EVENT} 
    # Select Time Of Event
    Input Number Of Pax     ${NUMBER PAX}  
    Select Event Package 6 Variants
    Set Selenium Speed      ${DELAY_0.3}
    Click Button        xpath:/html/body/div[1]/div/form/div[6]/div/a/button
    Element Should Contain      today-title        PENCILBOOKINGS
    [Teardown]      Close Browser
