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
app.get('/admin/register', adminController.getRegisterEmployee);
app.post('/admin/register', adminController.postRegisterEmployee);
app.get('/admin/employee', adminController.getAllEmployees);
app.get('/admin/employee/:id', adminController.getEmployee);
app.put('/admin/employee/:username', adminController.putEmployeeInfo);

// event-tracker
app.get('/event-tracker/home', eventController.getHome);

module.exports = app;
