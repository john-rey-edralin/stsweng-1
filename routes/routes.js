const express = require('express');

const controller = require('../controllers/controller.js');
const eventController = require('../controllers/event-controller.js');

const app = express.Router();

// login
app.get('/', controller.getIndex);

// event-tracker
app.get('/event-tracker/home', eventController.getHome);
app.get('/event-tracker/pencilbookings', eventController.getPencilbookings);

module.exports = app;