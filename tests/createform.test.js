//require('dotenv').config();
//const db = require('../models/db.js');
const { validDate, validName, validNumber, validEventType, validEventTime, validPaxNum, validVenue, validPackage, eventAvailability } = require('../tests/form-functions.js');

// Test Suite #1
describe("Date", () => {

	// Unit Test #1
	it("Before minimum date", () => {
		const testVal = "2020-01-01";

		const resVal = validDate(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("After maximum date", () => {
		const testVal = "2040-01-01";

		const resVal = validDate(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #3
	it("No date", () => {
		const testVal = "";

		const resVal = validDate(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #4
	it("Valid date", () => {
		const testVal = "2022-02-02";

		const resVal = validDate(testVal);

		expect(resVal).toEqual(true);
	});

});

// Test Suite #2
describe("Name", () => {

	// Unit Test #1
	it("No input", () => {
		const testVal = "";

		const resVal = validName(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Invalid name", () => {
		const testVal = "Bin;";

		const resVal = validName(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #3
	it("Valid name", () => {
		const testVal = "Bin";

		const resVal = ValidName(testVal);

		expect(resVal).toEqual(true);
	});
});

// Test Suite #3
describe("Contact Number", () => {

	// Unit Test #1
	it("No input", () => {
		const testVal = "";

		const resVal = validNumber(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Invalid number", () => {
		const testVal = "999999";

		const resVal = validNumber(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #3
	it("Valid number", () => {
		const testVal = "09183774544";

		const resVal = ValidNumber(testVal);

		expect(resVal).toEqual(true);
	});
});

// Test Suite #4
describe("Event Type", () => {

	// Unit Test #1
	it("No input", () => {
		const testVal = "";

		const resVal = validEventType(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Valid event type", () => {
		const testVal = "Birthday";

		const resVal = validEventType(testVal);

		expect(resVal).toEqual(false);
	});
});

// Test Suite #5
describe("Event Time", () => {

	// Unit Test #1
	it("No input", () => {
		const testVal = "";

		const resVal = validEventTime(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Valid event time", () => {
		const testVal = "Afternoon (11:00 AM - 2:00 PM)";

		const resVal = validEventTime(testVal);

		expect(resVal).toEqual(true);
	});
});

// Test Suite #6
describe("Number of Pax", () => {

	// Unit Test #1
	it("Zero", () => {
		const testVal = 0;

		const resVal = validPaxNum(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Negative number", () => {
		const testVal = -1;

		const resVal = validPaxNum(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #3
	it("Greater than the maximum (120)", () => {
		const testVal = 121;

		const resVal = validPaxNum(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #4
	it("Valid input", () => {
		const testVal = 40;

		const resVal = validPaxNum(testVal);

		expect(resVal).toEqual(true);
	});
});

// Test Suite #7
describe("Event Venue", () => {

	// Unit Test #1
	it("Selected none", () => {
		const testVal = 0;

		const resVal = validVenue(testVal);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Selected one venue", () => {
		const testVal = 1;

		const resVal = validVenue(testVal);

		expect(resVal).toEqual(true);
	});

	// Unit Test #3
	it("Selected more than one venue", () => {
		const testVal = 2;

		const resVal = validVenue(testVal);

		expect(resVal).toEqual(true);
	});

	// Unit Test #4
	it("Selected all venues", () => {
		const testVal = 3;

		const resVal = validVenue(testVal);

		expect(resVal).toEqual(true);
	});
});

// Test Suite #8
describe("Event Package", () => {

	// Unit Test #1
	it("Selected none", () => {
		const testValGarden = 0;
		const testValSunroom = 0;
		const testValTerrace = 0;

		const resVal = validVenue(testValGarden, testValSunroom, testValTerrace);

		expect(resVal).toEqual(false);
	});

	// Unit Test #2
	it("Selected one venue", () => {
		const testValGarden = 1;
		const testValSunroom = 0;
		const testValTerrace = 0;

		const resVal = validVenue(testValGarden, testValSunroom, testValTerrace);

		expect(resVal).toEqual(true);
	});

	// Unit Test #3
	it("Selected more than one venue", () => {
		const testValGarden = 1;
		const testValSunroom = 1;
		const testValTerrace = 0;

		const resVal = validVenue(testValGarden, testValSunroom, testValTerrace);

		expect(resVal).toEqual(true);
	});

	// Unit Test #4
	it("Selected all venues", () => {
		const testValGarden = 1;
		const testValSunroom = 1;
		const testValTerrace = 1;

		const resVal = validVenue(testValGarden, testValSunroom, testValTerrace);
		expect(resVal).toEqual(true);
	});
});