$(document).ready(function () {
    //$('#submit').attr("disabled", true);

    setRequiredFields();
    initializeTooltips();

    initializeEmployeeFields();
    initializeAccountFields();

    initializeRealTimeValidation();
});

function initializeTooltips() {
    $('[data-bs-toggle="tooltip"]').tooltip({
        placement: 'left'
    });
    $('[data-toggle="popover"]').popover();
}

function initializeEmployeeFields() {
    // initialize contact number fields
    let settings = { autoPlaceholder: "aggressive", preferredCountries: ["ph"], separateDialCode: true, utilsScript: "/js/utils.js" };
    $("#employee-mobile-number").intlTelInput(settings);
    $("#emergency-contact-mobile-number").intlTelInput(settings);
}

function initializeAccountFields() {
}

/**
 * Adds the required class to required fields.
 */
function setRequiredFields() {
    $("input[required]").siblings("label").addClass("required");
    $("select[required]").siblings("label").addClass("required");
}


function initializeRealTimeValidation() {
    /** TODO: Add validation */
}

function checkStringInput(input) {
    const blacklist = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
        "_", "=", "+", "{", "}", "[", "]", "|", "\\", ";", ":", "\'",
        "\"", ".", ",", "<", ">", "/", "?"];
    var flag = false;

    for (const item of blacklist)
        if (input.indexOf(item) != -1)
            flag = true;

    return flag;
}

function displayError(inputField, errorField, errorText) {
    errorField.text(errorText);
    inputField.addClass('is-invalid');
    $('#submit').attr("disabled", checkIfFilledEventFields());
}

function resetField(inputField, errorField) {
    errorField.text('');
    inputField.removeClass('is-invalid');
    $('#submit').attr("disabled", checkIfFilledEventFields());
}

function checkUsernameAvailability() {
    /** TODO: Add ajax call to db */
}
