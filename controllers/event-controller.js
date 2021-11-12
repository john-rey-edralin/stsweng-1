const db = require('../models/db.js');

const eventController = {
    getHome: function (req, res) {
        res.render('event-tracker-home');
    },

    getPencilbookings: function (req, res) {
        res.render('event-tracker-pencilbookings');
    }
}

module.exports = eventController;