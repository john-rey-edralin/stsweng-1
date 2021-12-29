const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    username: String,
    password: String,
    hasAccess: Boolean,
    role: {
        type: String,
        enum: ['admin', 'employee'],
    },
});

module.exports = mongoose.model('employee', employeeSchema);
