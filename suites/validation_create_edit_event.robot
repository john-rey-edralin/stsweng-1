*** Settings ***
Documentation   A test suite with a 7 tests for validation in Create Event Page
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Event Details Validation
    Open Browser To Create Event Page
    Validate Client Name
    Validate Number Of Pax
    Validate Client Mobile Number
    Validate Client Type Of Event
    Validate Client Time Of Event
    Validate Event Venue
    Validate Event Package
    [Teardown]      Close Browser

Menu Details 4 Variants Validation
    Open Browser To Create Event Page
    Check Event Venue
    Select Event Package 4 Variants
    Choose Food To Be Served 4 Variants
    Element Should Be Enabled           menu-salad-button
    Element Should Be Enabled           menu-pasta-button
    Element Should Be Enabled           menu-beef-button
    Element Should Be Enabled           menu-pork-button
    Element Should Be Disabled          menu-chicken-button
    Element Should Be Disabled          menu-fish-button
    [Teardown]      Close Browser

Menu Details 6 Variants Validation
    Open Browser To Create Event Page
    Check Event Venue
    Select Event Package 6 Variants
    Choose Food To Be Served 6 Variants
    Element Should Be Enabled           menu-salad-button
    Element Should Be Enabled           menu-pasta-button
    Element Should Be Enabled           menu-beef-button
    Element Should Be Enabled           menu-pork-button
    Element Should Be Enabled           menu-chicken-button
    Element Should Be Enabled           menu-fish-button
    [Teardown]      Close Browser

Menu Details Additional Food Validation
    Open Browser To Create Event Page
    Validate Additional Food Quantity
    [Teardown]      Close Browser

Transaction Details Validation
    Open Browser To Create Event Page
    Validate Extra Charges and Corkage Fees Quantity
    Set Selenium Speed      ${DELAY_0.3}
    Click Button      xpath://*[@id="extra-charges-modal"]/div/div/div[3]/button[1]
    Set Selenium Speed      ${DELAY}
    Validate Discounts Quantity
    [Teardown]      Close Browser

Payment Details Validation
    Open Browser To Create Event Page
    Check Downpayment
    [Teardown]      Close Browser

Payment Details Validation
    Open Browser To Create Event Page
    Check Final Payment
    [Teardown]      Close Browser