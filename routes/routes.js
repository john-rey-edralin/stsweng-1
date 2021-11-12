const express = require('express');

const controller = require('../controllers/controller.js');

const app = express.Router();

// login
app.get('/', controller.getIndex);

// event-tracker
// app.get('/event-tracker/home', eventController.getHome);

module.exports = app;