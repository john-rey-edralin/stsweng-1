var mongoose = require('mongoose');

var PackageSchema = new mongoose.Schema({
    
    name: {
        type: String,
    },

    price: {
        type: Number
    },

    venue: {
        type: String
    }
});

module.exports = mongoose.model('Package', PackageSchema);