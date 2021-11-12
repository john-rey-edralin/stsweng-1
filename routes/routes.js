const express = require('express');
const controller = require('../controllers/controller.js');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee.js');
const app = express.Router();

// login
app.get('/', controller.getIndex);

app.post('/home', async function (req, res) {
    const { username, password } = req.body;
    const user = await Employee.findOne({
        username: username,
    });

    if (user && bcrypt.compareSync(password, user.password)) {
        res.render('event-tracker-home');
    } else {
        res.send('Not registered');
    }
});

// event-tracker
// app.get('/event-tracker/home', eventController.getHome);

module.exports = app;
