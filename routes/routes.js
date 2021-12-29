const express = require('express');

const authController = require('../controllers/auth-controller.js');
const adminController = require('../controllers/admin-controller.js');
const eventController = require('../controllers/event-controller.js');

const app = express.Router();

// login
app.get('/login', authController.getLogin);

// authenticate user
app.post('/authenticate', authController.authenticate);

// admin
app.post('/admin/register', adminController.registerEmployee);
app.get('/admin/employee', adminController.getAllEmployees);
app.get('/admin/employee/:id', adminController.getEmployee);

// event-tracker
app.get('/event-tracker/home', eventController.getHome);

app.get('/event-tracker/create', eventController.getCreateEvent);
app.post('/event-tracker/submit', eventController.postCreateEvent);
app.get('/event-tracker/get/food', eventController.getFood);
app.get('/event-tracker/get/event', eventController.getEvent);
app.get('/event-tracker/get/charges', eventController.getCharges);
app.get('/event-tracker/get/packages', eventController.getPackages);
app.get(
    '/event-tracker/check/event-availability',
    eventController.getCheckEventAvailability
);

app.get('/event-tracker/pencilbookings', eventController.getPencilBookings);

// temporary might break create event, uncommnet ⬇ below
app.post('/event-tracker/submit', eventController.postCreateEvent);
app.get(
    '/event-tracker/pencilbookings/search',
    eventController.getPencilBookingsSearch
);
app.get(
    '/event-tracker/pencilbookings/filter',
    eventController.getPencilBookingsFilter
);

app.route('/event-tracker/reservations')
    .get(eventController.getReservations)
    .put(eventController.putReservations);

app.get(
    '/event-tracker/reservations/edit/:id',
    eventController.getEditReservation
);

app.get(
    '/event-tracker/reservations/search',
    eventController.getReservationsSearch
);
app.get(
    '/event-tracker/reservations/filter',
    eventController.getReservationsFilter
);
module.exports = app;
