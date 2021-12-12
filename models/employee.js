const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('employee', employeeSchema);
