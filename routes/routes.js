const express = require('express');

const controller = require('../controllers/controller.js');
const eventController = require('../controllers/event-controller.js');
const adminController = require('../controllers/admin-controller.js');
const app = express.Router();

// login
app.get('/', controller.getIndex);

// admin
// app.get('/admin', adminController.getAdminHome);
// app.get('/admin/register', adminController.getRegisterEmployee);
// app.post('/admin/register', adminController.postRegisterEmployee);
// app.get('/admin/employee', adminController.getAllEmployees);
// app.get('/admin/employee/current', adminController.getAllCurrentEmployees);
// app.get('/admin/employee/former', adminController.getAllFormerEmployees);
// app.get('/admin/employee/:id', adminController.getEmployee);
// app.put('/admin/employee/:username', adminController.putEmployeeInfo);
// app.get('/admin/activity/:username', adminController.getEmployeeActivity);
app.get('/admin/activity/recent', adminController.getRecentActivity);

// event-tracker home
app.get('/event-tracker/home', eventController.getHome);

// event-tracker form
app.get('/event-tracker/create', eventController.getCreateEvent);
app.post('/event-tracker/submit', eventController.postCreateEvent);
app.get('/event-tracker/edit/:id', eventController.getEditEvent);
app.put('/event-tracker/cancel', eventController.putCancelEvent);

// event-tracker form data retrieval
app.get('/event-tracker/get/food', eventController.getFood);
app.get('/event-tracker/get/event', eventController.getEvent);
app.get('/event-tracker/get/charges', eventController.getCharges);
app.get('/event-tracker/get/packages', eventController.getPackages);
app.get(
    '/event-tracker/check/event-availability',
    eventController.getCheckEventAvailability
);

// event-tracker pencilbooking list
app.route('/event-tracker/pencilbookings').get(
    eventController.getPencilBookings
);
app.get(
    '/event-tracker/pencilbookings/search',
    eventController.getPencilBookingsSearch
);
app.get(
    '/event-tracker/pencilbookings/filter',
    eventController.getPencilBookingsFilter
);

// event-tracker reservation list
app.get('/event-tracker/reservations', eventController.getReservations);
app.get(
    '/event-tracker/reservations/search',
    eventController.getReservationsSearch
);
app.get(
    '/event-tracker/reservations/filter',
    eventController.getReservationsFilter
);

// event-tracker cancelled events list
app.get('/event-tracker/cancelled', eventController.getCancelledEvents);

module.exports = app;
