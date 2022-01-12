require('dotenv').config();
const db = require('./models/db.js');
db.connect();

const bcrypt = require('bcrypt');

const Employee = require('./models/employee.js');
const saltRounds = 10;

let password = 'admin';

//admin
bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
        Employee.create({
            username: 'admin',
            password: hash,
            role: 'admin',
            hasAccess: true,
        }).then(() => {
            console.log('employee created');
        });
    })
    .catch((err) => {
        console.log(err);
    });

//employee
password = 'employee';

bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
        Employee.create({
            username: 'employee',
            password: hash,
            role: 'employee',
            hasAccess: true,
        }).then(() => {
            console.log('employee created');
        });
    })
    .catch((err) => {
        console.log(err);
    });
