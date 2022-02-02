*** Settings ***
Documentation   A test suite with a 2 tests for opening and activating submit in Create Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Open Create Event
    Open Browser To Create Event Page
    [Teardown]      Close Browser

Submit Button Activation
    Open Browser To Create Event Page
    Input Client Name       ${CLIENT NAME} 
    Input Client Mobile Number      ${MOBILE NUMBER} 
    Input Type Of Event     ${TYPE EVENT} 
    Select Time Of Event
    Input Number Of Pax     ${NUMBER PAX}  
    Check Event Venue
    Select Event Package 4 Variants
    Submit Event
    [Teardown]      Close Browser