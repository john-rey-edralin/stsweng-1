*** Settings ***
Documentation   A test suite with a 2 tests for saving created event in Create Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Save Edited Reservations Event
    Open Browser To Reservations Event Page
    Input Client Name       ${CLIENT NAME} 
    Input Client Mobile Number      ${MOBILE NUMBER} 
    Input Type Of Event     ${TYPE EVENT} 
    Select Time Of Event
    Input Number Of Pax     ${NUMBER PAX}  
    Select Event Package 6 Variants
    Select From List By Value        downpayment-mode         Cash
    Input Text       downpayment-amount          0
    Submit Event
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       xpath://*[@id="confirm-submit-modal"]/div/div/div[3]/button[2]
    Set Selenium Speed      ${DELAY}
    # Element Should Contain      today-title        RESERVATIONS
    [Teardown]      Close Browser
