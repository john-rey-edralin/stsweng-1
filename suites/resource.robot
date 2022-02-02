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
${DELAY_0.3}            0.1
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
#not final
Login Page
    Login Page Should Be Open
    Input Text      username    admin
    Input Text      password    admin
    Click Button        xpath:/html/body/div/div/form/div[3]/button

#not final
Login Page Should Be Open
    Page Should Contain Element     username
    Page Should Contain Element     password

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
    Login Page
    Click Element    class:align-self-end
    Create Event Page Should Be Open

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
    Clear Element Text      client-name
    Press Keys       client-name         BACK_SPACE
    Element Text Should Be      client-name-error        Client name should be filled.

Input Client Mobile Number
    [Arguments]     ${mobile}
    Input Text      client-mobile-number    ${mobile}

Validate Client Mobile Number
    Clear Element Text      client-mobile-number  
    Press Keys       client-mobile-number          BACK_SPACE
    Element Text Should Be      client-number-error        Client mobile number should be filled.
    Input Text       client-mobile-number          asd
    Element Text Should Be      client-number-error        Invalid client mobile number.

Input Type Of Event
    [Arguments]     ${type}
    Input Text      event-type   ${type}
    Press Keys      event-type         ENTER

Validate Client Type Of Event
    Clear Element Text      event-type 
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
    Login Page
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Set Selenium Speed      ${DELAY}
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[1]/a
    Click Element       today-date

Go To Reservations
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Set Selenium Speed      ${DELAY}
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[2]/a
    Click Element       css:*[data-bs-toggle="tooltip"]

Go To Past Events
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Set Selenium Speed      ${DELAY}
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[3]/a
    Click Element       css:*[data-bs-toggle="tooltip"]

Go To Cancelled Events
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Set Selenium Speed      ${DELAY}
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[4]/a
    Click Element       xpath:/html/body/div/div/div[1]/div[2]/h1/a/span

Go To Admin Menu
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Click Element       xpath:/html/body/nav/div/ul/li
    Click Link      xpath:/html/body/nav/div/ul/li/ul/li[1]/a

Click Filter And Sort Button
    Click Button        xpath://*[@id="search-filter-sort"]/div[2]/form[2]/div[5]/button[2]

Should Not Have
    [Arguments]     ${text}
    Element Should Not Contain          class:p-4           ${text} 

Should Have
    [Arguments]     ${text}
    Element Should Contain          class:p-4           ${text}

Open Browser To Reservations Event Page
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Set Selenium Speed      ${DELAY}
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[2]/a
    Click Element        xpath://*[@id="today-main"]/div/div[1]
    Click Link      xpath://*[@id="edit-btn-61b97f79a092fc0a313d00b3"]
    Set Selenium Speed      ${DELAY_0.3}
    Edit Event Page Should Be Open
    Set Selenium Speed      ${DELAY}

Open Browser To Pencilbookings Event Page
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Set Selenium Speed      ${DELAY_0.3}
    Click Element       css:*[data-bs-toggle="dropdown"]
    Set Selenium Speed      ${DELAY}
    Click Link      xpath:/html/body/nav/div/div/ul/li[3]/ul/li[1]/a
    Click Element        xpath://*[@id="today-main"]/div/div[1]
    Set Selenium Speed      ${DELAY_0.3}
    Click Link      xpath://*[@id="edit-btn-61d28bbb89aac087e87fb44b"]
    Set Selenium Speed      ${DELAY_0.3}
    Edit Event Page Should Be Open
    Set Selenium Speed      ${DELAY}

Open Browser To Calendar Page
    Open Browser    ${HOME URL}     ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed      ${DELAY}
    Login Page
    Click Element       xpath:/html/body/nav/div/div/ul/li[2]

    
Edit Event Page Should Be Open
    Page Should Contain Element     form-title 
    Element Should Contain          form-title      EDIT
    Page Should Contain Element     form-event-info
    Page Should Contain Element     form-menu-info
    Page Should Contain Element     form-transaction-info
    Page Should Contain Element     form-breakdown-info
    Page Should Contain Element     form-payment-info

Go To Receipt
    Input Text      name        DONTMODIFY
    Click Button        xpath://*[@id="search-filter-sort"]/div[2]/form[1]/div[2]/button
    Should Have           DONTMODIFY
    Click Element       xpath:/html/body/div/div/div[2]/div/div[1]/h1[2]
    Click Element       xpath:/html/body/div[1]/div/div[2]/div/div[2]/div/div/div[3]/a[1]
    Element Should Contain      xpath:/html/body/div/div[1]/div/h5      RECEIPT
    Page Should Contain Element         print-it
    Page Should Contain Element         save-it

Cancel Event
    Input Text      name        JR
    Click Button        xpath://*[@id="search-filter-sort"]/div[2]/form[1]/div[2]/button
    Should Have           JR
    Click Element       xpath:/html/body/div/div/div[2]/div/div[1]/h1[2]
    click Button        xpath:/html/body/div[1]/div/div[2]/div/div[2]/div/div/div[3]/button
    Click Button        xpath:/html/body/div[1]/div/div[2]/div/div[3]/div/div/div[3]/button[2]
    Element Should Contain      today-title        CANCELLED

Register Employee Page Should Be Open
    Page Should Contain         Employee Details
    Page Should Contain         Account Details
    Page Should Contain Element         submit


