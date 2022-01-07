const express = require('express');

const controller = require('../controllers/controller.js');
const eventController = require('../controllers/event-controller.js');

const app = express.Router();

// login
app.get('/', controller.getIndex);

// event-tracker home
app.get('/event-tracker/home', eventController.getHome);

// event-tracker form
app.get('/event-tracker/create', eventController.getCreateEvent);
app.post('/event-tracker/submit', eventController.postCreateEvent);
app.get('/event-tracker/edit/:id', eventController.getEditEvent);
app.put('/event-tracker/reservations/cancel', eventController.putCancelReservation);

// event-tracker form data retrieval
app.get('/event-tracker/get/food', eventController.getFood);
app.get('/event-tracker/get/event', eventController.getEvent);
app.get('/event-tracker/get/charges', eventController.getCharges);
app.get('/event-tracker/get/packages', eventController.getPackages);
app.get('/event-tracker/check/event-availability', eventController.getCheckEventAvailability);

// event-tracker pencilbooking list
app.get('/event-tracker/pencilbookings', eventController.getPencilBookings);
app.get('/event-tracker/pencilbookings/search', eventController.getPencilBookingsSearch);
app.get('/event-tracker/pencilbookings/filter', eventController.getPencilBookingsFilter);

// event-tracker reservation list
app.route('/event-tracker/reservations').get(eventController.getReservations).put(eventController.putReservations);
app.get('/event-tracker/reservations/search', eventController.getReservationsSearch);
app.get('/event-tracker/reservations/filter', eventController.getReservationsFilter);

// event-tracker cancelled events list
app.get('/event-tracker/cancelled', eventController.getCancelledEvents);

module.exports = app;