const db = require('../models/db.js');

const eventController = {
    getHome: function (req, res) {
        res.render('event-tracker-home');
    },

    getCreateEvent: function (req, res) {
        res.render('event-tracker-form');
    },

    getPencilbookings: function (req, res) {
        res.render('event-tracker-pencilbookings');
    },

    getReservations: function (req, res) {
        res.render('event-tracker-reservations');
    }
}

module.exports = eventController;