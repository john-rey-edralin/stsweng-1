const express = require('express');

const controller = require('../controllers/controller.js');
const eventController = require('../controllers/event-controller.js');

const validation = require('../helpers/validation.js');

const app = express.Router();
const activityLogger = require('../helpers/logger.js');

// home
app.get('/', activityLogger('Login'), controller.getIndex);

// event-tracker
app.get('/event-tracker', eventController.getToday);

app.get(
    '/event-tracker/reservations',
    activityLogger('Made a reservation'),
    eventController.getReservations
);

app.get('/event-tracker/pencilbookings', eventController.getPencilBookings);
app.get(
    '/event-tracker/pencilbookings/cancel',
    eventController.postCancelPencilBooking
);

app.get(
    '/event-tracker/pencilbookings/create',
    eventController.getCreatePencilBooking
);
app.post(
    '/event-tracker/pencilbookings/submit',
    eventController.postCreatePencilBooking
);
app.get(
    '/event-tracker/pencilbookings/check/event-availability',
    eventController.getCheckEventAvailability
);
app.get('/event-tracker/get/food', eventController.getFood);
app.get('/event-tracker/get/charges', eventController.getCharges);

app.get('/event-tracker/calendar', eventController.getCalendar);
app.get('/event-tracker/calendar/:month-:year', eventController.getCalendar);

module.exports = app;
