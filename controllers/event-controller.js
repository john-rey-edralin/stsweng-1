const db = require('../models/db.js');

const eventController = {
    getHome: function (req, res) {
        res.render('event-tracker-home');
    },

    getReservations: function (req, res) {
        res.render('event-tracker-reservations');
    }
}

module.exports = eventController;