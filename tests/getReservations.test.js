require('dotenv').config();
const db = require('../models/db.js');
const fetchReservations = require('../controllers/fetchReservations.js');

describe('get reservations', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return all future events that are reservations', () => {
        //arrange
        const reservations = fetchReservations();

        //act

        //expect
        expect(result).toEqual(true);
    });
});
