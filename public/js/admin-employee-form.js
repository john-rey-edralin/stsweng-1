if (typeof window != 'undefined') {
    $(document).ready(function () {
        //$('#submit').attr("disabled", true);
        setRequiredFields();
        initializeTooltips();

        initializeEmployeeFields();
        initializeAccountFields();

        initializeRealTimeValidation();
    });
}

function initializeTooltips() {
    $('[data-bs-toggle="tooltip"]').tooltip({
        placement: 'left',
    });
    $('[data-toggle="popover"]').popover();
}

function initializeEmployeeFields() {
    // initialize contact number fields
    let settings = {
        autoPlaceholder: 'aggressive',
        preferredCountries: ['ph'],
        separateDialCode: true,
        utilsScript: '/js/utils.js',
    };
    $('#employee-mobile-number').intlTelInput(settings);
    $('#emergency-contact-mobile-number').intlTelInput(settings);
}

function initializeAccountFields() {}

/**
 * Adds the required class to required fields.
 */
function setRequiredFields() {
    $('input[required]').siblings('label').addClass('required');
    $('select[required]').siblings('label').addClass('required');
}

function initializeRealTimeValidation() {
    /* TODO: Add validation */
    initializeUsernameRealTimeValidation();
    initializePasswordRealTimeValidation();
    initializeEmployeeNameRealTimeValidation();
    initializeEmployeeNumberRealTimeValidation();
    initializeEmergencyNumberRealTimeValidation();
}

function checkStringInput(input) {
    const blacklist = [
        '~',
        '`',
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '=',
        '+',
        '{',
        '}',
        '[',
        ']',
        '|',
        '\\',
        ';',
        ':',
        "'",
        '"',
        '.',
        ',',
        '<',
        '>',
        '/',
        '?',
    ];
    var flag = false;

    for (const item of blacklist) if (input.indexOf(item) != -1) flag = true;

    return flag;
}

function displayError(inputField, errorField, errorText) {
    errorField.text(errorText);
    inputField.addClass('is-invalid');
    // $('#submit').attr('disabled', checkIfFilledEventFields());
}

function resetField(inputField, errorField) {
    errorField.text('');
    inputField.removeClass('is-invalid');
    // $('#submit').attr('disabled', checkIfFilledEventFields());
}

//#region username validation
function initializeUsernameRealTimeValidation() {
    const usernameField = $('#username');
    console.log(usernameField);
    usernameField.keyup(() => {
        console.log('keyup');
        checkUsernameAvailability(usernameField);
    });
}

async function isUsernameTaken(currentUsername) {
    const response = await fetch('./employee');
    const employees = await response.json();
    const usernames = employees.map((employee) => employee.username);

    return usernames.some((username) => username === currentUsername);
}

async function checkUsernameAvailability(usernameField) {
    const username = usernameField.val().trim();
    if (await isUsernameTaken(username)) {
        displayError(
            $('#username'),
            $('#username-error'),
            'Username is taken.'
        );
    } else if (username === '') {
        displayError(
            $('#username'),
            $('#username-error'),
            'Username cannot be empty.'
        );
    } else {
        resetField(usernameField, $('#username-error'));
    }
}
//#endregion

//#region password validation
function isPasswordInvalid(password) {
    return password.length < 8;
}

function initializePasswordRealTimeValidation() {
    const passwordField = $('#password');

    passwordField.keyup(() => {
        const password = passwordField.val();
        if (isPasswordInvalid(password)) {
            displayError(
                passwordField,
                $('#password-error'),
                'Password must be at least 8 characters long. '
            );
        } else {
            resetField(passwordField, $('#password-error'));
        }
    });
}
//#endregion

//#region employee name validation
function initializeEmployeeNameRealTimeValidation() {
    const employeeNameField = $('#employee-name');

    employeeNameField.keyup(() => {
        const employeeName = employeeNameField.val().trim();
        if (employeeName.length === 0) {
            displayError(
                employeeNameField,
                $('#employee-name-error'),
                'Employee name must not be empty. '
            );
        } else {
            resetField(employeeNameField, $('#employee-name-error'));
        }
    });
}
//#endregion

//#region employee number validation
function initializeEmployeeNumberRealTimeValidation() {
    $('#employee-mobile-number').keyup(function () {
        if (validator.isEmpty($(this).val()))
            displayError(
                $('#employee-mobile-number'),
                $('#employee-number-error'),
                'Employee mobile number should be filled.'
            );
        else if ($(this).intlTelInput('isValidNumber'))
            resetField(
                $('#employee-mobile-number'),
                $('#employee-number-error')
            );
        else
            displayError(
                $('#employee-mobile-number'),
                $('#employee-number-error'),
                'Invalid employee mobile number.'
            );
    });
}
//#endregion

//#region emergency number validation
function initializeEmergencyNumberRealTimeValidation() {
    $('#emergency-contact-mobile-number').keyup(function () {
        if ($(this).intlTelInput('isValidNumber'))
            resetField(
                $('#emergency-contact-mobile-number'),
                $('#ec-number-error')
            );
        else
            displayError(
                $('#emergency-contact-mobile-number'),
                $('#ec-number-error'),
                'Invalid emergency contact mobile number.'
            );
    });
}
//#endregion

if (typeof window == 'undefined') {
    module.exports = isPasswordInvalid;
} //
