*** Settings ***
Documentation   A test suite with a 2 tests for cancelling an event for pencilbookings and reservations
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Cancel Pencilbooking Event
    Go To Pencilbookings
    Cancel Event
    [Teardown]      Close Browser

Cancel Reservation Event
    Go To Reservations
    Cancel Event
    [Teardown]      Close Browser


