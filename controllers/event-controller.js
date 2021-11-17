const db = require('../models/db.js');
const Food = require('../models/food.js');
const Event = require('../models/event.js');
const Charge = require('../models/charge.js');
const eventController = {
    getHome: function (req, res) {
        res.render('event-tracker-home');
    },

    getCreateEvent: function (req, res) {
        res.render('event-tracker-form');
    },

    postCreateEvent: function (req, res) {
        let event = JSON.parse(req.body.data);
        db.insertOne(Event, event, function (result) {
            if (result) res.redirect('/event-tracker/pencilbookings');
        });
    },

    getPencilbookings: function (req, res) {
        res.render('event-tracker-pencilbookings');
    },

    getReservations: function (req, res) {
        res.render('event-tracker-reservations');
    },

    getFood: function (req, res) {
        let projection = 'name price';
        db.findMany(Food, {}, projection, function (result) {
            res.send(result);
        });
    },

    getCharges: function (req, res) {
        let projection = 'name price';
        db.findMany(Charge, {}, projection, function (result) {
            res.send(result);
        });
    },

    getCheckEventAvailability: function (req, res) {
        let query = {
            eventDate: req.query.eventDate,
            eventTime: req.query.eventTime,
            eventVenues: { $in: req.query.eventVenues },
        };

        db.findOne(Event, query, '', function (result) {
            res.send(result);
        });
    }
}

module.exports = eventController;