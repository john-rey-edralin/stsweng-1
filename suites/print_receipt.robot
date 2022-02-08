*** Settings ***
Documentation   A test suite with a 2 tests for printing reciept of an event for pencilbookings and reservations
...             
...             This test follows the keywords from
...             the resource.robot
Resource        resource.robot

*** Test Cases ***
Print Pencilbooking Event
    Go To Pencilbookings
    Go To Receipt Pencilbooking
    [Teardown]      Close Browser

Print Reservation Event
    Go To Reservations
    Go To Receipt Reservation
    [Teardown]      Close Browser


