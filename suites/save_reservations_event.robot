*** Settings ***
Documentation   A test suite with a 2 tests for saving edited event in Edit Event Page for Reservations
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Save Edited Reservations Event
    Open Browser To Reservations Event Page
    Input Client Mobile Number      ${MOBILE NUMBER} 
    Input Type Of Event     ${TYPE EVENT} 
    # Select Time Of Event
    Input Number Of Pax     ${NUMBER PAX}  
    Select Event Package 6 Variants
    Select From List By Value        downpayment-mode         Cash
    Input Text       downpayment-amount          0
    Submit Event
    Element Should Contain      today-title        RESERVATIONS
    [Teardown]      Close Browser
