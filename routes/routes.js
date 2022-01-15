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
app.put('/event-tracker/finish', eventController.putFinishEvent);

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
app.route('/event-tracker/pencilbookings')
    .get(eventController.getPencilBookings)
    .put(eventController.putPencilbookings);
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
app.put('/event-tracker/reservations', eventController.putReservations);
app.get(
    '/event-tracker/reservations/search',
    eventController.getReservationsSearch
);
app.get(
    '/event-tracker/reservations/filter',
    eventController.getReservationsFilter
);

// event-tracker past events list
app.route('/event-tracker/pastevents').get(eventController.getPastEvents);
app.get(
    '/event-tracker/pastevents/search',
    eventController.getPastEventsSearch
);
app.get(
    '/event-tracker/pastevents/filter',
    eventController.getPastEventsFilter
);
module.exports = app;
