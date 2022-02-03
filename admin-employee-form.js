if (typeof window != 'undefined') {
    $(document).ready(function () {
        //$('#submit').attr("disabled", true);
        setRequiredFields();
        initializeTooltips();

        initializeEmployeeFields();
        initializeAccountFields();

        initializeRealTimeValidation();
        submitForm();
        submitEditForm();
    });
} else {
    module.exports = isPasswordInvalid;
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
    $('.employee-mobile-number').intlTelInput(settings);
    $('.emergency-contact-mobile-number').intlTelInput(settings);
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
    initializeEditEmployeeRealTimeValidation();
}

function displayError(inputField, errorField, errorText) {
    errorField.text(errorText);
    inputField.addClass('is-invalid');
}

function resetField(inputField, errorField) {
    errorField.text('');
    inputField.removeClass('is-invalid');
}

function initializeUsernameRealTimeValidation() {
    $('#username').keyup(() => {
        console.log('keyup');
        checkUsernameAvailability($('#username'));
    });
    $('.username').keyup(() => {
        console.log('keyup');
        checkUsernameAvailability($('.username'));
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

function isPasswordInvalid(password) {
    return password.length < 8;
}

function initializePasswordRealTimeValidation() {
    $('#password').keyup(() => {
        const password = $('#password').val();
        if (isPasswordInvalid(password)) {
            displayError(
                $('#password'),
                $('#password-error'),
                'Password must be at least 8 characters long. '
            );
        } else {
            resetField($('#password'), $('#password-error'));
        }
    });
    $('.password').keyup(() => {
        const password = $('.password').val();
        if (isPasswordInvalid(password)) {
            displayError(
                $('.password'),
                $('#password-error'),
                'Password must be at least 8 characters long. '
            );
        } else {
            resetField($('.password'), $('#password-error'));
        }
    });
}

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

function initializeEditEmployeeRealTimeValidation() {
    let currentEmployeeId = '';
    const employeeList = $('div[data-bs-toggle="modal"]');
    const newPasswordList = $('.new-password');
    const confirmNewPasswordList = $('.reenter-password');

    employeeList.each((_, employee) =>
        employee.addEventListener('click', changeCurrentEmployeeId)
    );

    //#region password realtime validation
    confirmNewPasswordList.each((_, confirmNewPassword) => {
        confirmNewPassword.addEventListener('keyup', () => {
            const newPassword = $(`#new-password-${currentEmployeeId}`);
            if (confirmNewPassword.value === newPassword.val()) {
                resetField(
                    $(`#reenter-password-${currentEmployeeId}`),
                    $(`#password-error-${currentEmployeeId}`)
                );
                resetField(
                    $(`#new-password-${currentEmployeeId}`),
                    $(`#password-error-${currentEmployeeId}`)
                );
                enableButton($(`#edit-btn-${currentEmployeeId}`));
            } else {
                displayError(
                    $(`#reenter-password-${currentEmployeeId}`),
                    $(`#password-error-${currentEmployeeId}`),
                    'Password does not match.'
                );
                disableButton($(`#edit-btn-${currentEmployeeId}`));
            }
        });
    });

    newPasswordList.each((_, newPassword) => {
        newPassword.addEventListener('keyup', () => {
            const confirmNewPassword = $(
                `#reenter-password-${currentEmployeeId}`
            );
            if (
                !isPasswordInvalid(newPassword.value) &&
                newPassword.value === confirmNewPassword.val()
            ) {
                resetField(
                    $(`#reenter-password-${currentEmployeeId}`),
                    $(`#password-error-${currentEmployeeId}`)
                );
                resetField(
                    $(`#new-password-${currentEmployeeId}`),
                    $(`#password-error-${currentEmployeeId}`)
                );
                enableButton($(`#edit-btn-${currentEmployeeId}`));
            } else {
                displayError(
                    $(`#new-password-${currentEmployeeId}`),
                    $(`#password-error-${currentEmployeeId}`),
                    isPasswordInvalid(newPassword.value)
                        ? 'Password too short.'
                        : 'Password does not match.'
                );
                disableButton($(`#edit-btn-${currentEmployeeId}`));
            }
        });
    });
    //#endregion

    //#region  emergency contact realtime validation
    $('.emergency-contact-mobile-number').keyup(function () {
        if (
            $(this).intlTelInput('isValidNumber') ||
            validator.isEmpty($(this).val())
        ) {
            resetField(
                $('.emergency-contact-mobile-number'),
                $(`#ec-number-error-${currentEmployeeId}`)
            );
            enableButton($(`#edit-btn-${currentEmployeeId}`));
        } else {
            displayError(
                $('.emergency-contact-mobile-number'),
                $(`#ec-number-error-${currentEmployeeId}`),
                'Invalid emergency contact mobile number.'
            );
            disableButton($(`#edit-btn-${currentEmployeeId}`));
        }
    });
    //#endregion

    $('.employee-mobile-number').keyup(function () {
        validateEmployeeNumber(this);
    });

    function validateEmployeeNumber(field) {
        if (validator.isEmpty($(field).val())) {
            displayError(
                $('#employee-mobile-number'),
                $('#employee-number-error'),
                'Employee mobile number should be filled.'
            );
            return false;
        } else if ($(field).intlTelInput('isValidNumber')) {
            resetField(
                $('.employee-mobile-number'),
                $(`#employee-number-error-${currentEmployeeId}`)
            );
            return true;
        } else {
            displayError(
                $('.employee-mobile-number'),
                $(`#employee-number-error-${currentEmployeeId}`),
                'Invalid employee mobile number.'
            );
            return false;
        }
    }

    function changeCurrentEmployeeId(event) {
        const employee = event.target;
        const bs_target = employee.dataset['bsTarget'];
        const [_, employeeId] = bs_target.split('-');

        currentEmployeeId = employeeId;
    }
}

function disableButton(button) {
    button.prop('disabled', true);
}

function enableButton(button) {
    button.prop('disabled', false);
}

function submitForm() {
    $('#create').on('submit', function (event) {
        event.preventDefault();

        // stores all information as an object
        let data = {
            username: $('#username').val(),
            password: $('#password').val(),
            name: $('#employee-name').val(),
            contactNum: $('#employee-mobile-number').intlTelInput('getNumber'),
            emergencyContactName: $('#employee-contact-name').val(),
            emergencyContactNum: $(
                '#employee-contact-mobile-number'
            ).intlTelInput('getNumber'),
        };

        // makes a POST request using AJAX to add the event to the database
        $.post('/admin/register', data, function (result) {
            window.location.href = '/admin';
        });
    });
}

function submitEditForm() {
    $('.edit').on('submit', function (event) {
        event.preventDefault();
        const id = $(this).children('.id').text();
        const username = $(this).children('.username').text();

        // stores all information as an object
        let data = {
            contactNum: $('#employee-mobile-number-' + id).intlTelInput(
                'getNumber'
            ),
            emergencyContactName: $('#emergency-contact-name-' + id).val(),
            emergencyContactNum: $(
                '#emergency-contact-mobile-number-' + id
            ).intlTelInput('getNumber'),
            oldPassword: $('#current-password-' + id).val(),
            newPassword: $('#new-password-' + id).val(),
            reenteredPassword: $('#reenter-password-' + id).val(),
        };

        $.ajax({
            type: 'PUT',
            url: '/admin/employee/' + username,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                window.location.href = '/admin';
            },
        });
    });
}
