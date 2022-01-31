const form_functions = {

    getDateTime: (input) => {
        var day = parseInt(input.slice(8, 10));
        var month = parseInt(input.slice(5, 7));
        var year = parseInt(input.slice(0, 4));

        return new Date(year, month, day).getTime();
    },

    checkStringInput: (input) => {
        const blacklist = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
            "_", "=", "+", "{", "}", "[", "]", "|", "\\", ";", ":", "\'",
            "\"", ".", ",", "<", ">", "/", "?"];
        var flag = false;

        for (const item of blacklist)
            if (input.indexOf(item) != -1)
                flag = true;

        return flag;
    },

    // Event Details
    validDate: (dateInput, dateMin) => {
        // dateMin - date today
        var dateMax = "2032-01-01";

        var max = getDateTime(dateMax);
        var min = getDateTime(dateMin);
        var input = getDateTime(dateInput);

        if (dateInput.length > 10)
            return false;
        else {
            if (dateInput == "")
                return false;
            else if ((input - min < 0) || isNaN(input))
                return false;
            else if ((input - max >= 0) || isNaN(input))
                return false;
            else //true = valid date
                return true;
        }
    },

    validName: (nameInput) => {
        var name = validator.trim(nameInput);
        if (validator.isEmpty(name))
            return false;
        else if (checkStringInput(name))
            return false;
        else
            return true;
    },

    validNumber: (numInput) => {
        if (validator.isEmpty(numInput))
            return false;
        else if (numInput.intlTelInput('isValidNumber'))
            return true;
        else
            return false;
    },

    validEventType: (eTypeInput) => {
        var eventtype = validator.trim(eTypeInput);
        if (validator.isEmpty(eventtype))
            return false;
        return true;
    },

    validEventTime: (eTimeInput) => {
        if (validator.isEmpty(eTimeInput))
            return false;
        return true;
    },

    validPaxNum: (paxNumInput) => {
        if (paxNumInput < 0)
            return false;
        else if (paxNumInput == 0)
            return false;
        else if (paxNumInput > 120)
            return false;
        return true;
    },

    validVenue: (venue) => {
        var checked = venue.length;
        if (checked <= 0)
            return false;
        else
            return true;
    },

    validPackage: (garden, sunroom, terrace) => {
        let eventpackage = (garden || sunroom || terrace);
        if (eventpackage == 0)
            return false;
        else
            return true;
    },

    eventAvailability: (date, time, garden_options, sunroom_options, terrace_options, checkedvenues) => {
        if (date != '' && time != '' &&
            (garden_options != '' || sunroom_options != '' || terrace_options != '')) {
            let eventVenues = [];

            for (var i = 0; i < checkedvenues.length; i++) {
                if (checkedvenues[i] == 'Garden' ||
                    checkedvenues[i] == 'Sunroom' ||
                    checkedvenues[i] == 'Terrace') {
                    eventVenues.push(checkedvenues[i]);
                }
            };

            let data = {
                status: 'reserved',
                eventDate: date,
                eventTime: time,
                eventVenues: eventVenues
            }

            $.get('/event-tracker/check/event-availability', data, function (result) {
                if (result)
                    return 'Unavailable';
                else
                    return 'Available';
            });
        }
    }
}

module.exports = form_functions;