var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    timestamp: {
        type: Date,
    },
    activityName: {
        type: String,
    },
});

module.exports = mongoose.model('activity', ActivitySchema);
