require('dotenv').config();
const db = require('./models/db.js');
const Event = require('./models/event.js');
db.connect();

Event.create({
    status: 'reserved',
    eventDate: new Date(),
});

Event.create({
    status: 'booked',
    eventDate: new Date(),
});

Event.create({
    status: 'cancelled',
    eventDate: new Date(),
});

Event.create({
    status: 'reserved',
    eventDate: new Date('December 17, 1995'),
});

Event.create({
    status: 'reserved',
    eventDate: new Date('December 17 2021'),
});

Event.create({
    status: 'finished',
    eventDate: new Date(),
});
