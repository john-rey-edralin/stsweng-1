const db = require('../models/db.js');

const eventController = {
    getHome: function (req, res) {
        res.render('event-tracker-home');
    }
}

module.exports = eventController;