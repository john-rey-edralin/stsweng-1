*** Settings ***
Documentation   A resource file with reusable keywords and variables
...
...             Creating system specific keywords from default keywords
...             from SeleniumLibrary
Library         SeleniumLibrary

*** Variables ***
${SERVER}               localhost:3000
${BROWSER}              firefox
${DELAY}                0
${DELAY_0.3}            0.3
${VALID USER}           admin
${LOCKED OUT USER}      admin
${VALID PASSWORD}       admin
${LOGIN URL}            http://${SERVER}/
${HOME URL}             http://${SERVER}/event-tracker/home
${CLIENT NAME}          JR
${MOBILE NUMBER}        9212145151
${TYPE EVENT}           Bachelor Party
${NUMBER PAX}           20

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Page Should Contain Element     username
    Page Should Contain Element     password
    Page Should Contain Element     class:btn
    Page Should Contain Element     class:btn-dark
    Page Should Contain Element     class:rounded-lg

Input Username
    [Arguments]     ${username}
    Input Text      username    ${username}

Input Pass
    [Arguments]     ${password}
    Input Password      password    ${password}
    
Submit Credentials
    Click Button    class:btn

Open Browser To Create Event Page
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Click Element    class:align-self-end
    # Create Event Page Should Be Open

Create Event Page Should Be Open
    Page Should Contain Element     form-title 
    Element Should Contain          form-title      CREATE
    Page Should Contain Element     form-event-info
    Page Should Contain Element     form-menu-info
    Page Should Contain Element     form-transaction-info
    Page Should Contain Element     form-breakdown-info
    Page Should Contain Element     form-payment-info

Input Client Name
    [Arguments]     ${name}
    Input Text      client-name    ${name}

Validate Client Name
    Press Keys       client-name         BACK_SPACE
    Element Text Should Be      client-name-error        Client name should be filled.

Input Client Mobile Number
    [Arguments]     ${mobile}
    Input Text      client-mobile-number    ${mobile}

Validate Client Mobile Number
    Press Keys       client-mobile-number          BACK_SPACE
    Element Text Should Be      client-number-error        Client mobile number should be filled.
    Input Text       client-mobile-number          asd
    Element Text Should Be      client-number-error        Invalid client mobile number.

Input Type Of Event
    [Arguments]     ${type}
    Input Text      event-type   ${type}

Validate Client Type Of Event
    Press Keys       event-type         BACK_SPACE
    Element Text Should Be      event-type-error        Event type should be filled.

# Input Date Of Event
#     Click Element        event-date        

Validate Date Of Event
    Click Element        event-date   
    Click Element    event-date  
    Press Keys       event-date         ARROW_DOWN+ARROW_RIGHT+ARROW_DOWN+ARROW_RIGHT+ARROW_DOWN
    Element Text Should Be      event-date-error        Date cannot be in the past.
    Press Keys       event-date         ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Press Keys       event-date         ENTER

Select Time Of Event
    Select From List By Value        event-time          Afternoon

Validate Client Time Of Event
    Select From List By Value        event-time          Afternoon
    Select From List By Label        event-time          Select an option...
    Element Text Should Be      event-time-error         Event time cannot be empty.

Input Number Of Pax
    [Arguments]     ${pax}
    Input Text      event-pax   ${pax}

Validate Number Of Pax
    Input Text       event-pax          0
    Press Keys       event-pax         ENTER
    Element Text Should Be      event-pax-error        Number of pax cannot be zero.
    Input Text       event-pax          -10
    Press Keys       event-pax         ENTER
    Element Text Should Be      event-pax-error        Number of pax cannot be negative.

Check Event Venue
    Select Checkbox     venue-garden

Validate Event Venue
    Select Checkbox     venue-garden
    Unselect Checkbox     venue-garden
    Element Text Should Be      missing-error      At least 1 venue should be checked.

Select Event Package 4 Variants
    Select From List By Value        garden-options          gar10-4var-cov

Select Event Package 6 Variants
    Select From List By Value        garden-options          gar10-6var-cov

Validate Event Package
    Select From List By Value        garden-options         gar10-4var-cov
    Select From List By Label        garden-options         No Package
    Element Text Should Be          missing-error           At least 1 Package should be selected.

Choose Food To Be Served 4 Variants
    Click Button        menu-salad-button
    Click Button        menu-pasta-button
    Click Button        menu-beef-button
    Click Button        menu-pork-button

Choose Food To Be Served 6 Variants
    Click Button        menu-salad-button
    Click Button        menu-pasta-button
    Click Button        menu-beef-button
    Click Button        menu-pork-button
    Click Button        menu-chicken-button
    Click Button        menu-fish-button

Validate Additional Food Quantity
    Click Element    css:*[data-bs-target="#additional-item-modal"] 
    Input Text       additional-quantity         0
    Press Keys       additional-quantity         ENTER
    Element Text Should Be      additional-items-error        Quantity cannot be zero.
    Input Text       additional-quantity          -10
    Press Keys       additional-quantity         ENTER
    Element Text Should Be      additional-items-error        Quantity cannot be negative.

Validate Extra Charges and Corkage Fees Quantity
    Click Element    css:*[data-bs-target="#extra-charges-modal"] 
    Input Text       extra-charges-quantity        0
    Press Keys       extra-charges-quantity         ENTER
    Element Text Should Be      extra-charges-error        Quantity cannot be zero.
    Input Text       extra-charges-quantity          -10
    Press Keys       extra-charges-quantity        ENTER
    Element Text Should Be      extra-charges-error        Quantity cannot be negative.
    Input Text       extra-charges-quantity        1
    Press Keys       extra-charges-quantity         ENTER
    Input Text       extra-charges-price         -10
    Press Keys       extra-charges-price        ENTER
    Element Text Should Be      extra-charges-error        Price cannot be negative.

Validate Discounts Quantity
    Click Element    css:*[data-bs-target="#discounts-modal"] 
    Input Text       discount-price         -10
    Press Keys       discount-price          ENTER
    Element Text Should Be      discount-error        Price cannot be negative.

Check Downpayment
    Select Checkbox     downpayment
    Click Element    downpayment-date 
    Press Keys       downpayment-date         ARROW_DOWN+ARROW_RIGHT+ARROW_DOWN+ARROW_RIGHT+ARROW_DOWN
    Element Text Should Be      downpayment-error        Date cannot be in the past.
    Press Keys       downpayment-date         ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Press Keys       downpayment-date         ENTER
    Select From List By Value        downpayment-mode         Cash
    Select From List By Label        downpayment-mode         Select an option...
    Element Text Should Be           downpayment-mode-error             Select 1 payment mode.
    Select From List By Value        downpayment-mode         Cash
    Input Text       downpayment-amount         -10
    Press Keys       downpayment-amount          ENTER
    Element Text Should Be      downpayment-amount-error        Invalid payment.
    Input Text       downpayment-amount           9999999
    Press Keys       downpayment-amount           ENTER
    Element Text Should Be      payment-error        Customer payment is greater than the total price.
    Input Text       downpayment-amount          0

Check Final Payment
    Select Checkbox     downpayment
    Click Element    downpayment-date 
    Press Keys       downpayment-date         ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Press Keys       downpayment-date         ENTER
    Select From List By Value        downpayment-mode         Cash
    Input Text       downpayment-amount          0
    Select Checkbox     final-payment
    Click Element    final-payment-date 
    Press Keys       final-payment-date         ARROW_DOWN+ARROW_RIGHT+ARROW_DOWN+ARROW_RIGHT+ARROW_DOWN
    Element Text Should Be      final-payment-error        Date cannot be in the past.
    Press Keys       final-payment-date         ARROW_UP+ARROW_RIGHT+ARROW_UP+ARROW_RIGHT+ARROW_UP
    Press Keys       final-payment-date         ENTER
    Select From List By Value        final-payment-mode         Cash
    Select From List By Label        final-payment-mode         Select an option...
    Element Text Should Be           final-payment-mode-error             Select 1 payment mode.
    Select From List By Value        final-payment-mode         Cash
    Input Text       final-payment-amount         -10
    Press Keys       final-payment-amount          ENTER
    Element Text Should Be      final-payment-amount-error        Invalid payment.
    Input Text       final-payment-amount           9999999
    Press Keys       final-payment-amount           ENTER
    Element Text Should Be      payment-error        Customer payment is greater than the total price.
    Input Text       final-payment-amount          0
Submit Event
    Click Element    submit-button

Go To Pencilbookings
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[1]/a
    Click Element       today-date


Go To Reservations
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[2]/a
    Click Element       css:*[data-bs-toggle="tooltip"]

Click Filter And Sort Button
    Click Button        xpath://*[@id="search-filter-sort"]/div[2]/form[2]/div[5]/button[2]

Should Not Have
    [Arguments]     ${text}
    Element Should Not Contain          class:p-4           ${text} 


