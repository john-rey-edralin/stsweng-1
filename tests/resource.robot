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
${VALID USER}           admin
${LOCKED OUT USER}      admin
${VALID PASSWORD}       admin
${LOGIN URL}            http://${SERVER}/
${HOME URL}             http://${SERVER}/home

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