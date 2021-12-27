const db = require('../models/db.js');
const Food = require('../models/food.js');
const Event = require('../models/event.js');
const Charge = require('../models/charge.js');
const Package = require('../models/package.js');
const mongoose = require('mongoose');

const eventController = {
    getHome: async function (req, res) {
        let date = new Date();
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        const events = await Event.aggregate([
            {
                $match: {
                    eventDate: {
                        $gte: today,
                        $lt: tomorrow
                    }
                }
            },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            events: events
        };

        res.render('event-tracker-home', data);
    },

    getCreateEvent: function (req, res) {
        res.render('event-tracker-form');
    },

    postCreateEvent: async function (req, res) {
        const doc = await Event.create(
            JSON.parse(req.body.data)
        );

        res.send(doc);
    },

    getEditEvent: function (req, res) {
        db.findOne(Event, { _id: req.params.id }, '', function (result) {
            let data = {
                event: result
            }
            res.render('event-tracker-form', data);
        });
    },

    getPencilBookings: async function (req, res) {
        const bookings = await Event.aggregate([
            { $match: { status: 'booked' } },
            { $sort: { eventDate: 1 } },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            bookings: bookings,
        };

        res.render('event-tracker-pencilbookings', data);
    },

    getPencilBookingsFilter: async function (req, res) {
        let query = {
            status: 'booked',
        };

        if (req.query.venue)
            query.eventVenues = {
                $in: [req.query.venue],
            };
        if (req.query.time) query.eventTime = req.query.time;
        if (req.query.date) {
            let date = new Date();
            let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            query.eventDate = {
                $gte: today,
                $lt: tomorrow,
            };
        }
        let sort = { eventDate: 1 };
        if (req.query.sort == "date-dsc")
            sort = { eventDate: -1 };

        const bookings = await Event.aggregate([
            { $match: query },
            { $sort: sort },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            bookings: bookings,
            venue: req.query.venue,
            time: req.query.time,
            date: req.query.date,
        };

        res.render('event-tracker-pencilbookings', data);
    },

    getPencilBookingsSearch: async function (req, res) {
        let query = {
            status: 'booked',
        };

        if (req.query.name) query.clientName = req.query.name;

        const bookings = await Event.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            bookings: bookings,
            search: req.query.name,
        };

        res.render('event-tracker-pencilbookings', data);
    },

    putPencilbookings: async function (req, res) {
        const { id, data } = req.body;
        const _id = mongoose.Types.ObjectId(id);

        const doc = await Event.findOneAndUpdate(
            { _id, status: 'booked' },
            data,
            { returnDocument: 'after' }
        );

        res.send(doc);
    },

    getReservations: async function (req, res) {
        const reservations = await Event.aggregate([
            { $match: { status: 'reserved' } },
            { $sort: { eventDate: 1 } },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            reservations: reservations,
        };

        res.render('event-tracker-reservations', data);
    },

    getReservationsFilter: async function (req, res) {
        let query = {
            status: 'reserved',
        };

        if (req.query.venue)
            query.eventVenues = {
                $in: [req.query.venue],
            };
        if (req.query.time) query.eventTime = req.query.time;
        if (req.query.date) {
            let date = new Date();
            let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            query.eventDate = {
                $gte: today,
                $lt: tomorrow,
            };
        }

        let sort = { eventDate: 1 };
        if (req.query.sort == "date-dsc")
            sort = { eventDate: -1 };

        const reservations = await Event.aggregate([
            { $match: query },
            { $sort: sort },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            reservations: reservations,
            venue: req.query.venue,
            time: req.query.time,
            date: req.query.date,
        };

        res.render('event-tracker-reservations', data);
    },

    getReservationsSearch: async function (req, res) {
        let query = {
            status: 'reserved',
        };

        if (req.query.name) query.clientName = req.query.name;

        const reservations = await Event.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        let data = {
            reservations: reservations,
            search: req.query.name,
        };

        res.render('event-tracker-reservations', data);
    },

    putReservations: async function (req, res) {
        const { id, data } = req.body;
        const _id = mongoose.Types.ObjectId(id);

        const doc = await Event.findOneAndUpdate(
            { _id, status: 'reserved' },
            data,
            { returnDocument: 'after' }
        );

        res.send(doc);
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

    getEvent: async function (req, res) {
        const event = await Event.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
            {
                $lookup: {
                    from: 'packages',
                    localField: 'eventPackages',
                    foreignField: '_id',
                    as: 'packageList',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'menuAdditional.foodItem',
                    foreignField: '_id',
                    as: 'foodList',
                },
            },
        ]);

        res.send(event);
    }
};

module.exports = eventController;
