const db = require('../models/db.js');

const eventController = {
    getHome: function (req, res) {
        let event = {

        }
        res.render('event-tracker-home');
    },

    getPencilbookings: function (req, res) {
        res.render('event-tracker-pencilbookings');
    },

    getReservations: function (req, res) {
        res.render('event-tracker-reservations');
    }
}

module.exports = eventController;