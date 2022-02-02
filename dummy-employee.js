require('dotenv').config();
const db = require('./models/db.js');
db.connect();

const bcrypt = require('bcrypt');

const Employee = require('./models/employee.js');
const saltRounds = 10;

const password = 'admin';

bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
        Employee.create({ username: 'admin', password: hash }).then(() => {
            console.log('employee created');
        });
    })
    .catch((err) => {
        console.log(err);
    });
