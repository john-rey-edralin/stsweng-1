const {getEventsPerDay, getVenuesAvailability} = require('../helpers/eventsInMonth.js');

const {ObjectId} = require('mongoose');

describe('available venues in a day', () => {
  it('should return 6 available timeslots', () => {
    //arrange
    const events = [
    ];

    const day = 16;

    const expectedResult = {
        aftGar: false,
        aftSun: false,
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
  
  it('should return 5 available timeslots', () => {
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

  it('should return 2 available timeslots', () => {
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
          },
          {
            _id: new ObjectId("61d28b1d72e622a7e9f278c0"),
            status: 'reserved',
            clientName: 'DONTMODIFY',
            clientMobileNumber: '+639212145151',
            repName: '',
            repMobileNumber: '',
            eventType: 'Debut',
            eventDate: new Date ('2022-02-16T00:00:00.000Z'),
            eventTime: 'Evening',
            numOfPax: 12,
            eventNotes: '',
            eventVenues: [ 'Garden', 'Sunroom' ],
            eventPackages: [ new ObjectId("6198906e5a2ccb4f2177981d") ],
            packageAdditionalPax: false,
            menuPackage: {
              icedTeaQuantity: 5,
              riceQuantity: 15,
              _id: new ObjectId("61f89eb51698deeb8e603b71")
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
              _id: new ObjectId("61f89eb51698deeb8e603b72")
            }
          },
          {
            _id: new ObjectId("61fa48c49f6fbe63c9d70c1a"),
            status: 'reserved',
            clientName: 'JR',
            clientMobileNumber: '+639212145151',
            repName: '',
            repMobileNumber: '',
            eventType: 'Bachelor Party',
            eventDate: new Date ('2022-02-16T00:00:00.000Z'),
            eventTime: 'Afternoon',
            numOfPax: 2,
            eventNotes: '',
            eventVenues: [ 'Terrace' ],
            eventPackages: [ new ObjectId("6198906e5a2ccb4f2177981d") ],
            packageAdditionalPax: false,
            menuPackage: {
              icedTeaQuantity: 5,
              riceQuantity: 15,
              _id: new ObjectId("61fa48c49f6fbe63c9d70c1b")
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
              _id: new ObjectId("61fa48c49f6fbe63c9d70c1c")
            },
            downpaymentDate: new Date ('2022-02-11T00:00:00.000Z'),
            downpaymentMode: 'Cash',
            downpaymentAmount: 0,
            finalPaymentDate: null,
            finalPaymentMode: '',
            finalPaymentAmount: null,
            __v: 0
          },
    ];

    const day = 16;

    const expectedResult = {
        aftGar: false,
        aftSun: true,
        aftTer: true,
        eveGar: true,
        eveSun: true,
        eveTer: false,
    };;

    //act
    const eventsPerDay = getEventsPerDay(events, day);
    const venuesAvailability = getVenuesAvailability(eventsPerDay);

    //assert
    expect(venuesAvailability).toEqual(expectedResult);
  });  

  it('should return 0 available timeslots', () => {
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
            eventVenues: [ 'Sunroom', 'Garden' ],
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
          },
          {
            _id: new ObjectId("61d28b1d72e622a7e9f278c0"),
            status: 'reserved',
            clientName: 'DONTMODIFY',
            clientMobileNumber: '+639212145151',
            repName: '',
            repMobileNumber: '',
            eventType: 'Debut',
            eventDate: new Date ('2022-02-16T00:00:00.000Z'),
            eventTime: 'Evening',
            numOfPax: 12,
            eventNotes: '',
            eventVenues: [ 'Garden', 'Sunroom', 'Terrace' ],
            eventPackages: [ new ObjectId("6198906e5a2ccb4f2177981d") ],
            packageAdditionalPax: false,
            menuPackage: {
              icedTeaQuantity: 5,
              riceQuantity: 15,
              _id: new ObjectId("61f89eb51698deeb8e603b71")
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
              _id: new ObjectId("61f89eb51698deeb8e603b72")
            }
          },
          {
            _id: new ObjectId("61fa48c49f6fbe63c9d70c1a"),
            status: 'reserved',
            clientName: 'JR',
            clientMobileNumber: '+639212145151',
            repName: '',
            repMobileNumber: '',
            eventType: 'Bachelor Party',
            eventDate: new Date ('2022-02-16T00:00:00.000Z'),
            eventTime: 'Afternoon',
            numOfPax: 2,
            eventNotes: '',
            eventVenues: [ 'Terrace' ],
            eventPackages: [ new ObjectId("6198906e5a2ccb4f2177981d") ],
            packageAdditionalPax: false,
            menuPackage: {
              icedTeaQuantity: 5,
              riceQuantity: 15,
              _id: new ObjectId("61fa48c49f6fbe63c9d70c1b")
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
              _id: new ObjectId("61fa48c49f6fbe63c9d70c1c")
            },
            downpaymentDate: new Date ('2022-02-11T00:00:00.000Z'),
            downpaymentMode: 'Cash',
            downpaymentAmount: 0,
            finalPaymentDate: null,
            finalPaymentMode: '',
            finalPaymentAmount: null,
            __v: 0
          },
    ];

    const day = 16;

    const expectedResult = {
        aftGar: true,
        aftSun: true,
        aftTer: true,
        eveGar: true,
        eveSun: true,
        eveTer: true,
    };;

    //act
    const eventsPerDay = getEventsPerDay(events, day);
    const venuesAvailability = getVenuesAvailability(eventsPerDay);

    //assert
    expect(venuesAvailability).toEqual(expectedResult);
  });  
});