//returns the previous month
const hbs = require(`hbs`);

hbs.registerHelper('getPrevMonth', function (date) {
	let current;
	if (date.getMonth() == 0) {
		current = new Date(date.getFullYear() - 1, 11, 1);
	} else {
		current = new Date(date.getFullYear(), date.getMonth() - 1, 1);
	}
	return `${(current.getMonth()+1).toString().padStart(2, 0)}-${current.getFullYear()}`;
});

//returns the next month
hbs.registerHelper('getNextMonth', function (date) {
	let current;
	if (date.getMonth() == 11) {
		current = new Date(date.getFullYear() + 1, 0, 1);
	} else {
		current = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	}

	return `${(current.getMonth()+1).toString().padStart(2, 0)}-${current.getFullYear()}`;
});

hbs.registerHelper('formatDate', function (date) {
	if (date) {
		date = new Date(date);
		let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
		let day = date.getDate().toString().padStart(2, 0);
		let year = date.getFullYear().toString();
		return `${month} ${day}, ${year}`;
	} else {
		return '';
	}
});

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('multiply', function (a, b) {
	return Number(a) * Number(b);
});
