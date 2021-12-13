const db = require('../models/db.js');
const Food = require('../models/food.js');
const Event = require('../models/event.js');
const Charge = require('../models/charge.js');
const mongoose = require('mongoose');

const eventController = {
    getHome: function (req, res) {
        let event = {};
        res.render('event-tracker-home');
    },

    getCreateEvent: function (req, res) {
        res.render('event-tracker-createform');
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

    getPencilBookingsFilter: function (req, res) {
        let query = {
            status: 'booked'
        };

        if (req.query.venue)
            query.eventVenues = {
                "$in": [req.query.venue]
            };
        if (req.query.time)
            query.eventTime = req.query.time;
        if (req.query.date) {
            let date = new Date(req.query.date);
            let tomorrow = new Date(req.query.date);
            query.eventDate = {
                "$gte": date,
                "$lt": tomorrow.setDate(date.getDate() + 1)
            };
        }

        db.findMany(Event, query, '', function (results) {
            let data = {
                bookings: results,
                venue: req.query.venue,
                time: req.query.time,
                date: req.query.date
            };
            res.render('event-tracker-pencilbookings', data);
        });
    },

    getPencilBookingsSearch: function (req, res) {
        let query = {
            status: 'booked'
        };

        if (req.query.name)
            query.clientName = req.query.name;

        db.findMany(Event, query, '', function (results) {
            let data = {
                bookings: results,
                search: req.query.name
            };
            res.render('event-tracker-pencilbookings', data);
        });
    },

    getReservations: function (req, res) {
        let query = {
            status: 'reserved',
        };
        db.findMany(Event, query, '', function (results) {
            let data = {
                reservations: results,
            };
            res.render('event-tracker-reservations', data);
        });
    },

    getReservationsFilter: function (req, res) {
        let query = {
            status: 'reserved'
        };

        if (req.query.venue)
            query.eventVenues = {
                "$in": [req.query.venue]
            };
        if (req.query.time)
            query.eventTime = req.query.time;
        if (req.query.date) {
            let date = new Date(req.query.date);
            let tomorrow = new Date(req.query.date);
            query.eventDate = { 
                "$gte": date,
                "$lt": tomorrow.setDate(date.getDate() +1)
            };
        }

        db.findMany(Event, query, '', function (results) {
            let data = {
                reservations: results,
                venue: req.query.venue,
                time: req.query.time,
                date: req.query.date
            };
            res.render('event-tracker-reservations', data);
        });
    },

    getReservationsSearch: function (req, res) {
        let query = {
            status: 'reserved'
        };

        if (req.query.name)
            query.clientName = req.query.name;

        db.findMany(Event, query, '', function (results) {
            let data = {
                reservations: results,
                search: req.query.name
            };
            res.render('event-tracker-reservations', data);
        });

        res.render('event-tracker-reservations', reservations);
    },

    putReservations: async function (req, res) {
        const { id, updateInfo } = req.body;
        const _id = mongoose.Types.ObjectId(id);

        const doc = await Event.findOneAndUpdate(
            { _id, status: 'reserved' },
            updateInfo,
            { returnDocument: 'after' }
        );

        res.json(doc);
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

    getPackages: function (req, res) {
        db.findMany(Package, {}, '', function (result) {
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
