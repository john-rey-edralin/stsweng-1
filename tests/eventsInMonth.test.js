const {getEventsPerDay, getVenuesAvailability} = require('../helpers/eventsInMonth.js');

const {ObjectId} = require('mongoose');

describe('available venues per day', () => {
    it('should return available venues per day', () => {
        //arrange
        const events = [
            {
                _id: new ObjectId("61d28da789aac087e87fb456"),
                status: 'booked',
                clientName: 'Sunshine 🌞',
                clientMobileNumber: '+639212145151',
                repName: '',
                repMobileNumber: '',
                eventType: 'Bachelor Party',
                eventDate: new Date ('2022-02-16T00:00:00.000Z'),
                eventTime: 'Afternoon',
                numOfPax: 20,
                eventNotes: '',
                eventVenues: [ 'Sunroom' ],
                eventPackages: [ new ObjectId("61989b004028361b1cfceee7") ],
                packageAdditionalPax: false,
                menuPackage: {
                  icedTeaQuantity: 6,
                  riceQuantity: 20,
                  _id: new ObjectId("61f78d8dcd29aacfc51fc7ce")
                },
                menuAdditional: [],
                transactionCharges: [],
                transactionDiscounts: [],
                totalPrices: {
                  packages: 10000,
                  food: 0,
                  charges: 0,
                  discounts: 0,
                  all: 10000,
                  _id: new ObjectId("61f78d8dcd29aacfc51fc7cf")
                },
                downpaymentDate: null,
                downpaymentMode: '',
                downpaymentAmount: null,
                finalPaymentDate: null,
                finalPaymentMode: '',
                finalPaymentAmount: null,
                __v: 0
              }
        ];

        const day = 16;

        const expectedResult = {
            aftGar: false,
            aftSun: true,
            aftTer: false,
            eveGar: false,
            eveSun: false,
            eveTer: false,
        };;

        //act
        const eventsPerDay = getEventsPerDay(events, day);
        const venuesAvailability = getVenuesAvailability(eventsPerDay);

        //assert
        expect(venuesAvailability).toEqual(expectedResult);
    });
});