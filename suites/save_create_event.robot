*** Settings ***
Documentation   A test suite with a 2 tests for saving created event in Create Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Save Create Event Without Payment
    Open Browser To Create Event Page
    Input Client Name       ${CLIENT NAME} 
    Input Client Mobile Number      ${MOBILE NUMBER} 
    Input Type Of Event     ${TYPE EVENT} 
    Select Time Of Event
    Input Number Of Pax     ${NUMBER PAX}  
    Check Event Venue
    Select Event Package 4 Variants
    Submit Event
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       xpath://*[@id="confirm-submit-modal"]/div/div/div[3]/button[2]
    Set Selenium Speed      ${DELAY}
    Element Should Contain      today-title        PENCILBOOKINGS
    [Teardown]      Close Browser

Save Create Event With Payment
    Open Browser To Create Event Page
    Input Client Name       ${CLIENT NAME} 
    Input Client Mobile Number      ${MOBILE NUMBER} 
    Input Type Of Event     ${TYPE EVENT} 
    Select Time Of Event 2
    Input Number Of Pax     ${NUMBER PAX}  
    Check Event Venue
    Select Event Package 4 Variants
    Select Checkbox     downpayment
    Click Element    downpayment-date 
    Press Keys       downpayment-date         ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Press Keys       downpayment-date         ENTER
    Select From List By Value        downpayment-mode         Cash
    Input Text       downpayment-amount          1
    Double Click Element        downpayment-mode  
    Submit Event
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       xpath://*[@id="confirm-submit-modal"]/div/div/div[3]/button[2]
    Set Selenium Speed      ${DELAY}
    Element Should Contain      today-title        RESERVATIONS
    [Teardown]      Close Browser
