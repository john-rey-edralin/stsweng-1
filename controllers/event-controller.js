const db = require('../models/db.js');
const Food = require('../models/food.js');
const Event = require('../models/event.js');
const Charge = require('../models/charge.js');
const fetchReservations = require('./fetchReservations.js');
const mongoose = require('mongoose');

const eventController = {
    getHome: function (req, res) {
        let event = {};
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

    getPencilBookings: function (req, res) {
        let query = {
            status: 'booked',
        };

        db.findMany(Event, query, '', function (results) {
            console.log(results);
            let data = {
                bookings: results,
            };
            res.render('event-tracker-pencilbookings', data);
        });
    },

    getReservations: async function (req, res) {
        const reservations = await fetchReservations();

        res.render('event-tracker-reservations', reservations);
    },

    getEvent: async function (req, res) {
        const { id } = req.query;
        const event = await Event.findOne({ _id: mongoose.Types.ObjectId(id) });

        res.json(event);
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
    },
};

module.exports = eventController;
