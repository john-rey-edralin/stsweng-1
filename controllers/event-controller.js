const { Calendar } = require('calendar');

const db = require('../models/db.js');
const Food = require('../models/food.js');
const Event = require('../models/event.js');
const Charge = require('../models/charge.js');

const eventController = {
    getToday: function (req, res) {
        res.render('event-today');
    },

    getReservations: function (req, res) {
        let query = {
            status: 'reserved',
        };

        db.findMany(Event, query, '', function (results) {
            let data = {
                reservations: results,
            };
            res.render('event-reservations', data);
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
            res.render('event-pencilbookings', data);
        });
    },

    postCancelPencilBooking: async function (req, res) {
        db.updateOne(
            Event,
            { _id: req.query.id },
            { status: 'cancelled' },
            function (event) {
                res.render(
                    'event',
                    { layout: false, data: event },
                    function (err, html) {
                        res.send(html);
                    }
                );
            }
        );
    },

    getCreatePencilBooking: function (req, res) {
        res.render('event-pencilbooking-form');
    },

    postCreatePencilBooking: function (req, res) {
        let event = JSON.parse(req.body.data);
        db.insertOne(Event, event, function (result) {
            if (result) res.redirect('/event-tracker/pencilbookings');
        });
    },

    getCalendar: function (req, res) {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        let currentDate;
        if (req.params.year) {
            currentDate = new Date(`${req.params.year}-${req.params.month}-01`);
        } else {
            currentDate = new Date();
        }

        let calendarObj = new Calendar();

        let calendarArray = calendarObj.monthDays(
            currentDate.getFullYear(),
            currentDate.getMonth()
        );
        let eventArray = [];
        for (let i = 0; i < calendarArray.length; i++) {
            let weekArray = [];
            for (let j = 0; j < 7; j++) {
                let eventItem;

                if (calendarArray[i][j] === 0) {
                    eventItem = {
                        day: '',
                    };
                } else {
                    eventItem = {
                        // numeric day of the month
                        day: calendarArray[i][j].toString().padStart(2, '0'),

                        /* TODO: Add array of events for the day */
                        event: [],

                        // boolean checkers for event timeslots
                        afternoon:
                            Math.floor(Math.random() * 2) === 0 ? true : false,
                        evening:
                            Math.floor(Math.random() * 2) === 0 ? true : false,
                    };
                }

                weekArray.push(eventItem);
            }
            eventArray.push(weekArray);
        }

        let data = {
            eventArray: eventArray,
            currMonthNum: currentDate.getMonth() + 1,
            currMonthName: monthNames[currentDate.getMonth()],
            currYear: currentDate.getFullYear(),
            currMonthYear: currentDate,
            today: new Date(),
        };

        res.render('event-calendar', data);
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
