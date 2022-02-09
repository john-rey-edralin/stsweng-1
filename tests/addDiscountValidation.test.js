const { 
    isValidDiscountName,
    isValidPaxNum,
    isValidPercentage,
    isValidDiscount } 
    = require('../public/js/event-tracker-settings.js');

// Test Suite #1
describe('Discount Name', () => {

	// Unit Test #1
	it('No input', () => {
		const testVal = '';

		const resVal = isValidDiscountName(testVal);

		expect(resVal[1]).toEqual('Discount name cannot be empty.');
	}); 

	// Unit Test #2
	it ('Invalid name - more than 30 characters', () => {
		const testVal = 'THIS IS A PAX DISCOUNT 123456789';

		const resVal = isValidDiscountName(testVal);

		expect(resVal[1]).toEqual('Discount name is only up to 30 characters.');
	});

	// Unit Test #3
	it ('Valid name', () => {
		const testVal = 'PAXDISCOUNT';

		const resVal = isValidDiscountName(testVal);

		expect(resVal[1]).toEqual('');
	});			
});

// Test Suite #2
describe('Number of Pax', () => {

	// Unit Test #1
	it('Zero', () => {
		const testVal = 0;

		const resVal = isValidPaxNum(testVal);

		expect(resVal[1]).toEqual('Number of pax cannot be zero.');
	}); 

	// Unit Test #2
	it ('Negative number', () => {
		const testVal = -1;

		const resVal = isValidPaxNum(testVal);

		expect(resVal[1]).toEqual('Number of pax cannot be negative.');
	});	
    
	// Unit Test #3
	it ('Greater than the maximum (120)', () => {
		const testVal = 121;

		const resVal = isValidPaxNum(testVal);

		expect(resVal[1]).toEqual('Number of pax cannot be more than 120.');
	});

    // Unit Test #4
	it ('No input', () => {
		const testVal = '';

		const resVal = isValidPaxNum(testVal);

		expect(resVal[1]).toEqual('Number of pax cannot be zero.');
	});	

    // Unit Test #5
	it ('Valid input', () => {
		const testVal = 40;

		const resVal = isValidPaxNum(testVal);

		expect(resVal[1]).toEqual('');
	});	
});

// Test Suite #3
describe('Percentage', () => {

	// Unit Test #1
	it('Invalid input - Zero', () => {
		const testVal = 0;

		const resVal = isValidPercentage(testVal);

		expect(resVal[1]).toEqual('Percentage cannot be zero.');
	}); 

	// Unit Test #2
	it ('Invalid input - Negative number', () => {
		const testVal = -1;

		const resVal = isValidPercentage(testVal);

		expect(resVal[1]).toEqual('Percentage cannot be negative.');
	});	
    
	// Unit Test #3
	it ('Invalid input - Greater than the 100%', () => {
		const testVal = 121;

		const resVal = isValidPercentage(testVal);

		expect(resVal[1]).toEqual('Percentage cannot be greater than 100%.');
	});

    // Unit Test #4
	it ('Invalid input - No input', () => {
		const testVal = '';

		const resVal = isValidPercentage(testVal);

		expect(resVal[1]).toEqual('Percentage cannot be zero.');
	});	

    // Unit Test #5
	it ('Valid input - whole number from 1 - 100', () => {
		const testVal = 25;

		const resVal = isValidPercentage(testVal);

		expect(resVal[1]).toEqual('');
	});	

    // Unit Test #6
	it ('Valid input - decimal number between 0 - 100', () => {
		const testVal = 0.23;

		const resVal = isValidPercentage(testVal);

		expect(resVal[1]).toEqual('');
	});	
});

// Test Suite #4
describe('Adding Discount Modal', () => {
	// Unit Test #1
	it('Valid - No input', () => {
		const testNameVal = '';
		const testPaxVal = '';
		const testPercentageVal = '';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('');
	}); 

	// Unit Test #2
	it('Invalid - Only the discount name has an input', () => {
		const testNameVal = 'PAXDISCOUNT';
		const testPaxVal = '';
		const testPercentageVal = '';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('Invalid pax.');
	}); 

	// Unit Test #3
	it('Invalid - Only the number of pax has an input', () => {
		const testNameVal = '';
		const testPaxVal = '25';
		const testPercentageVal = '';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('Discount name cannot be empty.');
	}); 

	// Unit Test #4
	it('Invalid - Only the percentage has an input', () => {
		const testNameVal = '';
		const testPaxVal = '';
		const testPercentageVal = '5';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('Discount name cannot be empty.');
	}); 

	// Unit Test #5
	it('Invalid - Only the discount name and the number of pax have input', () => {
		const testNameVal = 'PAXDISCOUNT';
		const testPaxVal = '50';
		const testPercentageVal = '';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('Invalid percentage.');
	}); 

	// Unit Test #6
	it('Invalid - Only the discount name and the percentage have input', () => {
		const testNameVal = 'PAXDISCOUNT';
		const testPaxVal = '';
		const testPercentageVal = '10';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('Invalid pax.');
	}); 

	// Unit Test #7
	it('Invalid - Only the number of pax and the percentage have input', () => {
		const testNameVal = '';
		const testPaxVal = '30';
		const testPercentageVal = '10';

		const resVal = isValidDiscount(testNameVal, testPaxVal, testPercentageVal);

		expect(resVal[1]).toEqual('Discount name cannot be empty.');
	}); 
});