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
app.get('/admin', adminController.getAdminHome);
app.post('/admin/register', adminController.registerEmployee);
app.get('/admin/employee', adminController.getAllEmployees);
app.get('/admin/employee/:id', adminController.getEmployee);

// event-tracker
app.get('/event-tracker/home', eventController.getHome);

module.exports = app;
