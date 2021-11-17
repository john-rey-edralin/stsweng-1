const express = require('express');

const controller = require('../controllers/controller.js');
const eventController = require('../controllers/event-controller.js');

const app = express.Router();

// login
app.get('/', controller.getIndex);

// event-tracker
app.get('/event-tracker/home', eventController.getHome);
app.get('/event-tracker/create', eventController.getCreateEvent);
app.get('/event-tracker/pencilbookings', eventController.getPencilbookings);
app.get('/event-tracker/reservations', eventController.getReservations);

// temporary
app.post(
    '/event-tracker/submit',
    eventController.postCreateEvent
);
app.get(
    '/event-tracker/check/event-availability',
    eventController.getCheckEventAvailability
);
app.get('/event-tracker/get/food', eventController.getFood);
app.get('/event-tracker/get/charges', eventController.getCharges);
module.exports = app;