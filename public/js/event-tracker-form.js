let foodList = [];
let foodNameList = [];
let chargeList = [];
let chargeNameList = [];
let packageList = [];
let gardenPackageList = [];
let sunroomPackageList = [];
let terracePackageList = [];
let additionalPackageList = [];
let variantCount = 0;

let curreventID;
let currevent;

let additionalFoodTableHeader =
    '<h4 class="col-5 mb-0 mt-1"><strong>Food Item Name</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Quantity</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Unit Price</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Amount</strong></h4>' +
    '<div class="col"></div>';

let extraChargesTableHeader =
    '<h4 class="col-5 mb-0 mt-1"><strong>Charge Name</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Quantity</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Unit Price</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Amount</strong></h4>' +
    '<div class="col"></div>';

let discountsTableHeader =
    '<h4 class="col-5 mb-0 mt-1"><strong>Discount Name</strong></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"></h4>' +
    '<h4 class="col mb-0 mt-1 text-center"><strong>Amount</strong></h4>' +
    '<div class="col"></div>';

let menuPackageHTML =
    '<div class="d-flex flex-row flex-wrap justify-content-center">' +
    '<button id="menu-salad-button" class="btn menu-button border rounded-pill mx-2 px-4 py-2"' +
    'type="button" data-bs-toggle="collapse" data-bs-target="#menu-salad-contents">' +
    'SALAD' +
    '</button>' +
    '<button id="menu-pasta-button" class="btn menu-button border rounded-pill mx-2 px-4 py-2"' +
    'type="button" data-bs-toggle="collapse" data-bs-target="#menu-pasta-contents">' +
    'PASTA' +
    '</button> ' +
    '<button id="menu-beef-button" class="btn menu-button border rounded-pill mx-2 px-4 py-2"' +
    'type="button" data-bs-toggle="collapse" data-bs-target="#menu-beef-contents">' +
    'BEEF' +
    '</button> ' +
    '<button id="menu-pork-button" class="btn menu-button border rounded-pill mx-2 px-4 py-2"' +
    'type="button" data-bs-toggle="collapse" data-bs-target="#menu-pork-contents">' +
    'PORK' +
    '</button> ' +
    '<button id="menu-chicken-button" class="btn menu-button border rounded-pill mx-2 px-4 py-2"' +
    'type="button" data-bs-toggle="collapse" data-bs-target="#menu-chicken-contents">' +
    'CHICKEN' +
    '</button> ' +
    '<button id="menu-fish-button" class="btn menu-button border rounded-pill mx-2 px-4 py-2"' +
    'type="button" data-bs-toggle="collapse" data-bs-target="#menu-fish-contents">' +
    'FISH' +
    '</button> ' +
    '</div> ' +

    '<div id="menu-salad-contents" class="menu-item-content collapse">' +
    '<hr>' +
    '<div class="d-flex flex-row justify-content-start">' +
    '<h2 class="menu-item-header mx-4 align-self-center">Salad</h2>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="salad-options" id="salad-1"' +
    'value="Chicken Caesar Salad">' +
    '<label class="form-check-label" for="salad-1">Chicken Caesar Salad</label>' +
    '</div>' +
    '<div class="form-group row my-3 ms-auto">' +
    '<label for="salad-quantity" class="col col-form-label">Quantity</label>' +
    '<div class="col-8">' +
    '<input type="number" class="form-control w-75" id="salad-quantity" disabled>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="menu-pasta-contents" class="menu-item-content collapse">' +
    '<hr>' +
    '<div class="d-flex flex-row justify-content-start">' +
    '<h2 class="menu-item-header mx-4 align-self-center">Pasta</h2>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="pasta-options" id="pasta-1"' +
    'value="Creamy Chicken Pesto">' +
    '<label class="form-check-label" for="pasta-1">Creamy Chicken Pesto</label>' +
    '</div>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="pasta-options" id="pasta-2"' +
    'value="Shirmp and Squid Marinara">' +
    '<label class="form-check-label" for="pasta-2">Shirmp and Squid Marinara</label>' +
    '</div>' +
    '<div class="form-group row my-3 ms-auto">' +
    '<label for="pasta-quantity" class="col col-form-label">Quantity</label>' +
    '<div class="col-8">' +
    '<input type="number" class="form-control w-75" id="pasta-quantity" disabled>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="menu-beef-contents" class="menu-item-content collapse">' +
    '<hr>' +
    '<div class="d-flex flex-row justify-content-start">' +
    '<h2 class="menu-item-header mx-4 align-self-center">Beef</h2>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="beef-options" id="beef-1"' +
    'value="Balai Yllana Kare Kare">' +
    '<label class="form-check-label" for="beef-1">Balai Yllana Kare Kare</label>' +
    '</div>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="beef-options" id="beef-2"' +
    'value="Caldereta">' +
    '<label class="form-check-label" for="beef-2">Caldereta</label>' +
    '</div>' +
    '<div class="form-group row my-3 ms-auto">' +
    '<label for="beef-quantity" class="col col-form-label">Quantity</label>' +
    '<div class="col-8">' +
    '<input type="number" class="form-control w-75" id="beef-quantity" disabled>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="menu-pork-contents" class="menu-item-content collapse">' +
    '<hr>' +
    '<div class="d-flex flex-row justify-content-start">' +
    '<h2 class="menu-item-header mx-4 align-self-center">Pork</h2>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="pork-options" id="pork-1"' +
    'value="Sisig Ihaw">' +
    '<label class="form-check-label" for="pork-1">Sisig Ihaw</label>' +
    '</div>' +
    '<div class="form-group row my-3 ms-auto">' +
    '<label for="pork-quantity" class="col col-form-label">Quantity</label>' +
    '<div class="col-8">' +
    '<input type="number" class="form-control w-75" id="pork-quantity" disabled>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="menu-chicken-contents" class="menu-item-content collapse">' +
    '<hr>' +
    '<div class="d-flex flex-row justify-content-start">' +
    '<h2 class="menu-item-header mx-4 align-self-center">Chicken</h2>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="chicken-options" id="chicken-1"' +
    'value="Buttered Chicken">' +
    '<label class="form-check-label" for="chicken-1">Buttered Chicken</label>' +
    '</div>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="chicken-options" id="chicken-2"' +
    'value="Balai Yllana Fried Chicken">' +
    '<label class="form-check-label" for="chicken-2">Balai Yllana Fried Chicken</label>' +
    '</div>' +
    '<div class="form-group row my-3 ms-auto">' +
    '<label for="chicken-quantity" class="col col-form-label">Quantity</label>' +
    '<div class="col-8">' +
    '<input type="number" class="form-control w-75" id="chicken-quantity" disabled>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="menu-fish-contents" class="menu-item-content collapse">' +
    '<hr>' +
    '<div class="d-flex flex-row justify-content-start">' +
    '<h2 class="menu-item-header mx-4 align-self-center">Fish</h2>' +
    '<div class="form-check mx-5 align-self-center">' +
    '<input class="form-check-input" type="radio" name="fish-options" id="fish-1"' +
    'value="Parmesan Crusted Fish">' +
    '<label class="form-check-label" for="fish-1">Parmesan Crusted Fish</label>' +
    '</div>' +
    '<div class="form-group row my-3 ms-auto">' +
    '<label for="fish-quantity" class="col col-form-label">Quantity</label>' +
    '<div class="col-8">' +
    '<input type="number" class="form-control w-75" id="fish-quantity" disabled>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

$(document).ready(function () {
    retrieveInfoFromDB();

    setRequiredFields();
    initializeTooltips();

    initializeEventFields();
    initializeMenuFields();
    initializeTransactionFields();
    initializePaymentFields();

    initializeRealTimeValidation();

    submitForm();
});

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = '';
// });

function retrieveInfoFromDB() {
    $.get('/event-tracker/get/food', function (result) {
        for (let j = 0; j < result.length; j++) {
            foodList.push(result[j]);
            foodNameList.push(result[j].name);
        }
    });

    $.get('/event-tracker/get/charges', function (result) {
        for (let j = 0; j < result.length; j++) {
            chargeList.push(result[j]);
            chargeNameList.push(result[j].name);
        }
    });

    $.get('/event-tracker/get/packages', function (result) {
        for (let j = 0; j < result.length; j++) {
            if (result[j].packageVenue === 'Garden')
                gardenPackageList.push(result[j]);
            else if (result[j].packageVenue === 'Sunroom')
                sunroomPackageList.push(result[j]);
            else if (result[j].packageVenue === 'Terrace')
                terracePackageList.push(result[j]);
            else additionalPackageList.push(result[j]);
            packageList.push(result[j]);
        }

        // initialize package options
        $.each(gardenPackageList, function (i, package) {
            $('#garden-options').append(
                $('<option>', {
                    value: package.packageCode,
                    text:
                        package.packageName +
                        ' - ' +
                        package.variantCount +
                        ' Variants (Php ' +
                        package.packagePrice +
                        ')',
                })
            );
        });

        $.each(sunroomPackageList, function (i, package) {
            $('#sunroom-options').append(
                $('<option>', {
                    value: package.packageCode,
                    text:
                        package.packageName +
                        ' - ' +
                        package.variantCount +
                        ' Variants (Php ' +
                        package.packagePrice +
                        ')',
                })
            );
        });

        $.each(terracePackageList, function (i, package) {
            $('#terrace-options').append(
                $('<option>', {
                    value: package.packageCode,
                    text:
                        package.packageName +
                        ' - ' +
                        package.variantCount +
                        ' Variants (Php ' +
                        package.packagePrice +
                        ')',
                })
            );
        });
        
        addExistingFields();
    });
}

function initializeTooltips() {
    $('[data-bs-toggle="tooltip"]').tooltip({
        placement: 'left',
    });
    $('[data-toggle="popover"]').popover();
}

function initializeEventFields() {
    //initialize event date
    $('#event-date').val(getDateToday());
    // initialize contact number fields
    let settings = { autoPlaceholder: "aggressive", preferredCountries: ["ph"], separateDialCode: true, utilsScript: "/js/utils.js" };
    $("#client-mobile-number").intlTelInput(settings);
    $("#representative-mobile-number").intlTelInput(settings);

    // initialize event type autocomplete options
    let eventTypeTags = [
        "Birthday",
        "1st Birthday",
        "7th Birthday",
        "Debut",
        "Wedding",
        "Anniversary",
        "10th Anniversary",
        "25th Anniversary",
        "50th Anniversary",
        "Baptism",
        "Dedication",
        "Proposal",
        "Baby Shower",
        "Bridal Shower",
        "Bachelor Party",
        "Bachelorette Party",
        "Christmas Party",
        "Reunion"
    ];
    $("#event-type").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(eventTypeTags, request.term);
            response(results.slice(0, 5));
        }
    });

    // initialize venue + package fields
    $('.venue-checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            $(this).parent().siblings('select').prop('disabled', false);

        } else {
            $(this).parent().siblings('select').prop('disabled', true);
            $(this).parent().siblings('select').val('');
            updateBreakdownTable();
        }
    });

    // initialize food quantity amount
    $('.package').on('change', function () {
        if (getVariantCount() > $('.menu-button-active').length) {
            $('.menu-button').prop('disabled', false);
        }
        else if (getVariantCount() == $('.menu-button-active').length) {
            $('.menu-button:not(.menu-button-active)').prop('disabled', true);
        }
        else if (getVariantCount() < $('.menu-button-active').length) {
            $('#menu-package').empty();
            $('#menu-package').append(menuPackageHTML);
            initializeMenuFields();
        }
        updateFoodQuantity();
        updateBreakdownTable();
    });
    $('#additional-pax').on('change', function () { updateFoodQuantity(); updateBreakdownTable(); });
}

function initializeMenuFields() {
    $('.menu-item-content').on('hidden.bs.collapse', function () { hideMenuItemInfo($(this)) });
    $('.menu-item-content').on('show.bs.collapse', function () { showMenuItemInfo($(this)) });

    $('.menu-button').on('click', function () {
        if ($(this).hasClass('menu-button-active')) {
            $(this).removeClass('menu-button-active');
            variantCount--;
            $('.menu-button').prop('disabled', false);
        } else if (getVariantCount() > $('.menu-button-active').length) {
            $(this).addClass('menu-button-active');
            variantCount++;
            if (getVariantCount() <= $('.menu-button-active').length) {
                $('.menu-button:not(.menu-button-active)').prop('disabled', true);
            }
        }

    });

    $(".menu-item-autocomplete").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(foodNameList, request.term);
            response(results.slice(0, 5));
        }
    });

    $('.additional-add-button').click(function () { addAdditionalItem(); });

    $('#additional-name').change(function () {
        if (foodNameList.includes($('#additional-name').val()))
            $('#additional-price').val(getMenuItemPrice($('#additional-name').val()));
    });

    $('#additional-item-modal').on('hidden.bs.modal', function () {
        $('#additional-name, #additional-quantity, #additional-price').val('');
        resetField($('#additional-name'), $('#additional-items-error'));
        resetField($('#additional-quantity'), $('#additional-items-error'));
        resetField($('#additional-price'), $('#additional-items-error'));
    });
}

function initializeTransactionFields() {
    $(".extra-charges-autocomplete").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(chargeNameList, request.term);
            response(results.slice(0, 5));
        }
    });

    $('.extra-charges-add-button').click(function () { addExtraCharge(); });

    $('#extra-charges-name').change(function () {
        if (chargeNameList.indexOf($('#extra-charges-name').val()) != -1)
            $('#extra-charges-price').val(getExtraChargePrice($('#extra-charges-name').val()));
    });

    $('#extra-charges-modal').on('hidden.bs.modal', function () {
        $('#extra-charges-name, #extra-charges-quantity, #extra-charges-price').val('');
        resetField($('#extra-charges-name'), $('#extra-charges-error'));
        resetField($('#extra-charges-quantity'), $('#extra-charges-error'));
        resetField($('#extra-charges-price'), $('#extra-charges-error'));
    });

    $('.discount-add-button').click(function () { addDiscount(); });

    $('#discounts-modal').on('hidden.bs.modal', function () {
        $('#discount-name, #discount-quantity, #discount-price').val('');
        resetField($('#discount-name'), $('#discount-error'));
        resetField($('#discount-quantity'), $('#discount-error'));
        resetField($('#discount-price'), $('#discount-error'));
    });
}

/**
 * Initializes the values and status of the payment details fields based on the marked/unmarked checkboxes
 */
function initializePaymentFields() {
    //Sets the downpayment and final payment related fields
    if (document.getElementById("downpayment").checked) {
        downpaymentChecked();
        if (document.getElementById("final-payment").checked)
            finalPaymentChecked();
        else
            finalPaymentNotChecked();
    }
    else
        downpaymentNotChecked()
}

/**
 * Initializes downpayment related field if the downpayment checkbox is checked.
 */
function downpaymentChecked() {
    //Sets the default downpayment date to today
    $('#downpayment-date').val(getDateToday());
    //Marks the downpayment related fields as required
    $('#downpayment-date').siblings("label").addClass('required');
    $('#downpayment-mode').siblings("label").addClass('required');
    $('#downpayment-amount').siblings("label").addClass('required');

    //Enables the Final Payment Section
    document.getElementById("final-payment").disabled = false;
}

/**
 * Sets the value and status of final-payment-related fields 
 * when final-payment is checked
 */
function finalPaymentChecked() {
    //Sets the default final payment date to today
    $('#final-payment-date').val(getDateToday());
    //Marks the final payment related fields as required
    $('#final-payment-date').siblings("label").addClass('required');
    $('#final-payment-mode').siblings("label").addClass('required');
    $('#final-payment-amount').siblings("label").addClass('required');
}

/**
 * Sets the values and status of downpayment-related fields when downpayment is not checked.
 */
function downpaymentNotChecked() {
    //Sets the value of other payment details fields
    updatePaymentAndBalance();

    //Disables downpayment-related fields
    $('#downpayment-date').siblings("label").removeClass('required');
    $('#downpayment-mode').siblings("label").removeClass('required');
    $('#downpayment-amount').siblings("label").removeClass('required');
    $('#downpayment')
        .parent()
        .siblings()
        .children()
        .children('input:not(.static), select')
        .prop('disabled', true);

    //Empties the downpayment-related fields
    $('#downpayment-date').val("");
    $('#downpayment-mode').val("");
    $('#downpayment-amount').val("");

    //Removes the Error CSS in the downpayment-related fields
    resetField($('#downpayment-date'), $('#downpayment-error'));
    resetField($('#downpayment-mode'), $('#downpayment-mode-error'));
    resetField($('#downpayment-amount'), $('#downpayment-amount-error'));

    //Disables the whole final payment section
    document.getElementById("final-payment").checked = false;
    document.getElementById("final-payment").disabled = true;
    $('#final-payment')
        .parent()
        .siblings()
        .children()
        .children('input:not(.static), select')
        .prop('disabled', true);

    //Empties the final-payment-related fields
    finalPaymentNotChecked();
    $('#final-payment-amount').attr("placeholder", "");

    //Sets the status of the submit button
    $('#submit').attr("disabled", checkIfFilledEventFields());
}

/**
 * Sets the value and the status of final-payment-related-fields
 * when final-payment is not checked
 */
function finalPaymentNotChecked() {
    //Disables final-payment-related fields
    $('#final-payment-date').siblings("label").removeClass('required');
    $('#final-payment-mode').siblings("label").removeClass('required');
    $('#final-payment-amount').siblings("label").removeClass('required');
    $("#final-payment")
        .parent()
        .siblings()
        .children()
        .children('input:not(.static), select')
        .prop('disabled', true);

    //Empties the final-payment-related fields
    $('#final-payment-mode').val("");
    $('#final-payment-amount').val("");
    $('#final-payment-date').val("");

    //Removes the Error CSS in the downpayment-related fields
    resetField($('#final-payment-date'), $('#final-payment-error'));
    resetField($('#final-payment-mode'), $('#final-payment-mode-error'));
    resetField($('#final-payment-amount'), $('#final-payment-amount-error'));

    //Updates other payment details fields
    updatePaymentAndBalance();
    $('#final-payment-amount').attr("placeholder", $('#payment-balance').val());

    //Sets the status of the submit button
    $('#submit').attr("disabled", checkIfFilledEventFields());
}

/**
 *  Checks the current values in downpayment-related fields
 */
function downpaymentCheckFields() {
    //Checks the downpayment date field value
    $("#downpayment-date").on("change", function () {
        var downpaydate = document.getElementById("downpayment-date").value;
        validDate(downpaydate, $('#downpayment-error'), "downpayment-date");
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    //Checks the current chosen downpayment mode option
    $('#downpayment-mode').change(function () {
        if ($('#downpayment-mode').val() == '')
            displayError($('#downpayment-mode'), $('#downpayment-mode-error'), 'Select 1 payment mode.');
        else
            resetField($('#downpayment-mode'), $('#downpayment-mode-error'));
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    //Checks the downpayment amount value
    $('#downpayment-amount').on('keyup', function () {
        if ($('#downpayment-amount').val() < 0 || $('#downpayment-amount').val() == '')
            displayError($('#downpayment-amount'), $('#downpayment-amount-error'), 'Invalid payment.');
        else
            resetField($('#downpayment-amount'), $('#downpayment-amount-error'));

        //Updates the total payment amount and the final payment amount 
        $('#final-payment-amount').on('change', function () {
            updatePaymentAndBalance();
            $('#submit').attr("disabled", checkIfFilledEventFields());
        });
        updatePaymentAndBalance();

        //Disables/Enables the Submit button
        $('#submit').attr("disabled", checkIfFilledEventFields());

        //Checks if the customer payment is greater than the needed payment (total amount) 
        if (parseFloat($('#payment-balance').val()) < 0) {
            $('#payment-error').text('Customer payment is greater than the total price.');
            $('#payment-amount-total').addClass('is-invalid');
            $('#payment-balance').addClass('is-invalid');
        }
        else {
            $('#payment-error').text('');
            $('#payment-amount-total').removeClass('is-invalid');
            $('#payment-balance').removeClass('is-invalid');
        }
    });
}

/**
 *  Checks the current values in final-payment-related fields
 */
function finalPaymentCheckFields() {
    //Checks the final payment date field value
    $("#final-payment-date").on("change", function () {
        var finalpaydate = document.getElementById("final-payment-date").value;
        validDate(finalpaydate, $('#final-payment-error'), "final-payment-date");
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    //Checks the current chosen final payment mode option
    $('#final-payment-mode').change(function () {
        if ($('#final-payment-mode').val() == '')
            displayError($('#final-payment-mode'), $('#final-payment-mode-error'), 'Select 1 payment mode.');
        else
            resetField($('#final-payment-mode'), $('#final-payment-mode-error'));
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    //Checks the final payment amount value
    $('#final-payment-amount').on('keyup', function () {
        if ($('#final-payment-amount').val() < 0 || $('#final-payment-amount').val() == '')
            displayError($('#final-payment-amount'), $('#final-payment-amount-error'), 'Invalid payment.');
        else
            resetField($('#final-payment-amount'), $('#final-payment-amount-error'));

        $('#downpayment-amount').on('change', function () {
            updatePaymentAndBalance();
            $('#submit').attr("disabled", checkIfFilledEventFields());
        });
        updatePaymentAndBalance();
        $('#submit').attr("disabled", checkIfFilledEventFields());

        if (parseFloat($('#payment-balance').val()) < 0) {
            $('#payment-error').text('Customer payment is greater than the total price.');
            $('#payment-amount-total').addClass('is-invalid');
            $('#payment-balance').addClass('is-invalid');
        }
        else {
            $('#payment-error').text('');
            $('#payment-amount-total').removeClass('is-invalid');
            $('#payment-balance').removeClass('is-invalid');
        }
    });
}

/**
 *  Returns the date today
 */
function getDateToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

/**
 * Adds the required class to required fields.
 */
function setRequiredFields() {
    $('input[required]').siblings('label').addClass('required');
    $('select[required]').siblings('label').addClass('required');
}

function showMenuItemInfo(div) {
    div.children('div')
        .children('div')
        .find("input[type='radio']")
        .first()
        .prop('checked', true);
}

function hideMenuItemInfo(div) {
    div.children('div')
        .children('div')
        .children('input')
        .prop('checked', false);
}

function updateFoodQuantity() {
    $('#salad-quantity').val(getFoodQuantity(0));
    $('#pasta-quantity').val(getFoodQuantity(1));
    $('#beef-quantity').val(getFoodQuantity(2));
    $('#pork-quantity').val(getFoodQuantity(3));
    $('#chicken-quantity').val(getFoodQuantity(4));
    $('#fish-quantity').val(getFoodQuantity(5));
    $('#icedtea-quantity').val(getFoodQuantity(7));
    $('#rice-quantity').val(getFoodQuantity(6));
}

function addAdditionalItem() {
    if (
        !$('#additional-name').val() ||
        !$('#additional-quantity').val() ||
        !$('#additional-price').val()
    ) {
        $('#additional-items-error').text('Please fill up all fields.');
    } else if ($('#additional-quantity').val() < 0) {
        $('#additional-items-error').text('Quantity cannot be negative.');
    } else if ($('#additional-quantity').val() === 0) {
        $('#additional-items-error').text('Quantity cannot be zero.');
    } else if ($('#additional-price').val() < 0) {
        $('#additional-items-error').text('Price cannot be negative.');
    } else {
        let name = $('#additional-name').val();
        let quantity = $('#additional-quantity').val();
        let price = getMenuItemPrice(name);

        $('#additional-items-list').append(
            '<div>' +
            '<hr class="mx-5">' +
            '<div class="row px-4 py-2 mx-5 additional-item">' +
            '<h6 class="col-5 mb-0 mt-1 additional-item-name number">' +
            name +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center additional-item-quantity number">' +
            quantity +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center additional-item-price number">' +
            formatAsDecimal(price) +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center additional-item-amt number">' +
            formatAsDecimal(quantity * price) +
            '</h6>' +
            '<span class="col material-icons-two-tone text-end md-btn"' +
            'onclick="removeAdditionalItem(this)">close</span>' +
            '</div>' +
            '</div>'
        );

        // reset all fields and error message
        $('#additional-name').val('');
        $('#additional-quantity').val('');
        $('#additional-price').val('');
        $('#additional-items-error').text('');

        // initializes table header
        if ($('.additional-item-amt').length === 1) {
            $('#additional-items-header').empty();
            $('#additional-items-header').append(additionalFoodTableHeader);
        }

        $('#additional-items-total').empty();
        $('#additional-items-total').append(
            '<h4 class="mb-0 mt-1 text-end me-5 number"><strong>Total: </strong>Php ' +
            formatAsDecimal(calculateItemTotal($('.additional-item-amt'))) +
            '</h4>'
        );
        updateBreakdownTable();
    }
}

function removeAdditionalItem(elem) {
    $(elem).parent().parent().remove();

    if ($('.additional-item-amt').length === 0) {
        $('#additional-items-header').empty();
        $('#additional-items-total').empty();
        $('#additional-items-header').append(
            '<h6 class="col mb-0 mt-1 text-center">No additional food.</h6>'
        );
    }

    $('#additional-items-total')
        .children('h4')
        .text(
            'Php ' +
            formatAsDecimal(calculateItemTotal($('.additional-item-amt')))
        );
    updateBreakdownTable();
}

function addExtraCharge() {
    if (
        !$('#extra-charges-name').val() ||
        !$('#extra-charges-quantity').val() ||
        !$('#extra-charges-price').val()
    ) {
        $('#extra-charges-error').text('Please fill up all fields.');
    } else if ($('#extra-charges-quantity').val() < 0) {
        $('#extra-charges-error').text('Quantity cannot be negative.');
    } else if ($('#extra-charges-quantity').val() === 0) {
        $('#extra-charges-error').text('Quantity cannot be zero.');
    } else if ($('#extra-charges-price').val() < 0) {
        $('#extra-charges-error').text('Price cannot be negative.');
    } else {
        var name = $('#extra-charges-name').val();
        var quantity = $('#extra-charges-quantity').val();
        var price = $('#extra-charges-price').val();

        $('#extra-charges-list').append(
            '<div>' +
            '<hr class="mx-5">' +
            '<div class="row px-4 py-2 mx-5 extra-charges-item">' +
            '<h6 class="col-5 mb-0 mt-1 extra-charges-item-name number">' +
            name +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center extra-charges-item-quantity number">' +
            quantity +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center extra-charges-item-price number">' +
            formatAsDecimal(price) +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center extra-charges-item-amt number">' +
            formatAsDecimal(quantity * price) +
            '</h6>' +
            '<span class="col material-icons-two-tone text-end md-btn"' +
            'onclick="removeExtraCharge(this)">close</span>' +
            '</div>' +
            '</div>'
        );

        // reset all fields and error message
        $('#extra-charges-name').val('');
        $('#extra-charges-quantity').val('');
        $('#extra-charges-price').val('');
        $('#extra-charges-error').text('');

        // initializes table header
        if ($('.extra-charges-item-amt').length === 1) {
            $('#extra-charges-header').empty();
            $('#extra-charges-header').append(extraChargesTableHeader);
        }
        $('#extra-charges-total').empty();
        $('#extra-charges-total').append(
            '<h4 class="mb-0 mt-1 text-end me-5 number"><strong>Total: </strong>Php ' +
            formatAsDecimal(
                calculateItemTotal($('.extra-charges-item-amt'))
            ) +
            '</h4>'
        );
        updateBreakdownTable();
    }
}

function removeExtraCharge(elem) {
    $(elem).parent().parent().remove();

    if ($('.extra-charges-item-amt').length === 0) {
        $('#extra-charges-header').empty();
        $('#extra-charges-total').empty();
        $('#extra-charges-header').append(
            '<h6 class="col mb-0 mt-1 text-center">No charges applied.</h6>'
        );
    }

    $('#extra-charges-total')
        .children('h4')
        .text(
            'Php ' +
            formatAsDecimal(
                calculateItemTotal($('.extra-charges-item-amt'))
            )
        );
    updateBreakdownTable();
}

function addDiscount() {
    if (!$('#discount-name').val() || !$('#discount-price').val()) {
        $('#discount-error').text('Please fill up all fields.');
    } else if ($('#discount-price').val() < 0) {
        $('#discount-error').text('Price cannot be negative.');
    } else {
        var name = $('#discount-name').val();
        var price = $('#discount-price').val();

        $('#discounts-list').append(
            '<div>' +
            '<hr class="mx-5">' +
            '<div class="row px-4 py-2 mx-5 discount-item">' +
            '<h6 class="col-5 mb-0 mt-1 discount-item-name number">' +
            name +
            '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center discount-item-amt number">' +
            formatAsDecimal(price) +
            '</h6>' +
            '<span class="col material-icons-two-tone text-end md-btn"' +
            'onclick="removeDiscount(this)">close</span>' +
            '</div>' +
            '</div>'
        );

        // reset all fields and error message
        $('#discount-name').val('');
        $('#discount-quantity').val('');
        $('#discount-price').val('');
        $('#discount-error').text('');

        // initializes table header
        if ($('.discount-item-amt').length === 1) {
            $('#discounts-header').empty();
            $('#discounts-header').append(discountsTableHeader);
        }

        $('#discounts-total').empty();
        $('#discounts-total').append(
            '<h4 class="mb-0 mt-1 text-end me-5 number"><strong>Total: </strong>Php ' +
            formatAsDecimal(calculateItemTotal($('.discount-item-amt'))) +
            '</h4>'
        );
        updateBreakdownTable();
    }
}

function removeDiscount(elem) {
    $(elem).parent().parent().remove();
    if ($('.discount-item-amt').length === 0) {
        $('#discounts-header').empty();
        $('#discounts-total').empty();
        $('#discounts-header').append(
            '<h6 class="col mb-0 mt-1 text-center">No discounts applied.</h6>'
        );
    }

    $('#discounts-total')
        .children('h4')
        .text(
            'Php ' +
            formatAsDecimal(calculateItemTotal($('.discount-item-amt')))
        );
    updateBreakdownTable();
}

function updateBreakdownTable() {
    let package = calculatePackageTotal();
    let additional = calculateItemTotal($('.additional-item-amt'));
    let charges = calculateItemTotal($('.extra-charges-item-amt'));
    let discounts = calculateItemTotal($('.discount-item-amt'));
    let total = calculateTotal();

    $('#breakdown-list').empty();

    if (package) {
        $('#breakdown-list').append(
            '<div>' +
            '<div class="row px-4 py-2 mx-4">' +
            '<h3 class="col-5 mb-0 mt-1 text-start"><strong>Package/s</strong></h3>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h3 class="col mb-0 mt-1 text-end number"><strong>' +
            formatAsDecimal(package) +
            '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.package').each(function () {
            if ($(this).val())
                $('#breakdown-list').append(
                    '<div class="ms-4">' +
                    '<div class="row px-4 py-2 mx-4">' +
                    '<h6 class="col-5 mb-0 mt-1 text-start number">' +
                    getPackageName($(this).val()) +
                    '</h6>' +
                    '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                    '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                    '<h6 class="col mb-0 mt-1 text-end number">' +
                    formatAsDecimal(getPackagePrice($(this).val())) +
                    '</h6>' +
                    '</div>' +
                    '</div>'
                );
        });

        if ($('#additional-pax').is(':checked'))
            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' +
                'Additional 5 Pax' +
                '</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">' +
                formatAsDecimal(getPackagePrice('add5')) +
                '</h6>' +
                '</div>' +
                '</div>'
            );
    }

    if (additional) {
        $('#breakdown-list').append(
            '<div>' +
            '<div class="row px-4 py-2 mx-4">' +
            '<h3 class="col-5 mb-0 mt-1 text-start"><strong>Additional Food</strong></h3>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h3 class="col mb-0 mt-1 text-end number"><strong>' +
            formatAsDecimal(additional) +
            '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.additional-item').each(function () {
            let name = $(this).children('.additional-item-name').text();
            let qty = $(this).children('.additional-item-quantity').text();
            let amt = formatAsNumber(
                $(this).children('.additional-item-amt').text()
            );

            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' +
                name +
                ' (' +
                qty +
                ' Serving/s)</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">' +
                formatAsDecimal(amt) +
                '</h6>' +
                '</div>' +
                '</div>'
            );
        });
    }

    if (charges) {
        $('#breakdown-list').append(
            '<div>' +
            '<div class="row px-4 py-2 mx-4">' +
            '<h3 class="col-5 mb-0 mt-1 text-start"><strong>Extra Charges</strong></h3>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h3 class="col mb-0 mt-1 text-end number"><strong>' +
            formatAsDecimal(charges) +
            '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.extra-charges-item').each(function () {
            let name = $(this).children('.extra-charges-item-name').text();
            let qty = $(this).children('.extra-charges-item-quantity').text();
            let amt = formatAsNumber(
                $(this).children('.extra-charges-item-amt').text()
            );

            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' +
                name +
                ' (x' +
                qty +
                ')</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">' +
                formatAsDecimal(amt) +
                '</h6>' +
                '</div>' +
                '</div>'
            );
        });
    }

    if (discounts) {
        $('#breakdown-list').append(
            '<div>' +
            '<div class="row px-4 py-2 mx-4">' +
            '<h3 class="col-5 mb-0 mt-1 text-start"><strong>Discount/s</strong></h3>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h3 class="col mb-0 mt-1 text-end number"><strong>-' +
            formatAsDecimal(discounts) +
            '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.discount-item').each(function () {
            let name = $(this).children('.discount-item-name').text();
            let amt = formatAsNumber(
                $(this).children('.discount-item-amt').text()
            );

            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' +
                name +
                '</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">-' +
                formatAsDecimal(amt) +
                '</h6>' +
                '</div>' +
                '</div>'
            );
        });
    }

    $('#breakdown-total').empty();

    if (total) {
        $('#breakdown-total').append(
            '<h2 class="mb-0 mt-5 text-end me-5 number"><strong>Total: </strong>Php ' +
            formatAsDecimal(total) +
            '</h2>'
        );
    } else {
        $('#breakdown-list').append(
            '<h6 class="mb-0 mt-1 text-center">Please fill out the information above.</h6>'
        );
    }

    //Updates values of Total Amount Paid field and Balance field
    updatePaymentAndBalance();
}

function initializeRealTimeValidation() {
    //Event Details
    $('#client-name').keyup(function () {
        var clientname = validator.trim($('#client-name').val());
        if (validator.isEmpty(clientname))
            displayError($('#client-name'), $('#client-name-error'), 'Client name should be filled.');
        else if (checkStringInput(clientname))
            displayError($('#client-name'), $('#client-name-error'), "Invalid name. Use Alpha characters (A-Z, a-z, 0-9), period (.), and hyphens (-) only.");
        else resetField($('#client-name'), $('#client-name-error'));
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#client-mobile-number').keyup(function () {
        if (validator.isEmpty($(this).val()))
            displayError($('#client-mobile-number'), $('#client-number-error'), 'Client mobile number should be filled.');
        else if ($(this).intlTelInput('isValidNumber'))
            resetField($('#client-mobile-number'), $('#client-number-error'));
        else
            displayError($('#client-mobile-number'), $('#client-number-error'), 'Invalid client mobile number.');
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#event-type').keyup(function () {
        var eventtype = validator.trim($(this).val());
        if (validator.isEmpty(eventtype))
            displayError($(this), $('#event-type-error'), 'Event type should be filled.');
        else resetField($(this), $('#event-type-error'));
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#event-type').on("change", function () {
        var eventtype = validator.trim($(this).val());
        if (validator.isEmpty(eventtype))
            displayError($(this), $('#event-type-error'), 'Event type should be filled.');
        else resetField($(this), $('#event-type-error'));
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $("#event-date").on("change", function () {
        var eventdate = document.getElementById("event-date").value;
        validDate(eventdate, $('#event-date-error'), "event-date");
        checkEventAvailability();
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#event-time').change(function () {
        if ($('#event-time').val() == '')
            displayError($('#event-time'), $('#event-time-error'), 'Event time cannot be empty.');
        else
            resetField($('#event-time'), $('#event-time-error'));
        checkEventAvailability();
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#event-pax').on("change", function () {
        if ($('#event-pax').val() < 0) {
            displayError($('#event-pax'), $('#event-pax-error'), 'Number of pax cannot be negative.');
        } else if ($('#event-pax').val() == 0) {
            displayError($('#event-pax'), $('#event-pax-error'), 'Number of pax cannot be zero.');
        } else if ($('#event-pax').val() > 120) {
            displayError($('#event-pax'), $('#event-pax-error'), 'Number of pax cannot be more than 120.');
        }
        else {
            resetField($('#event-pax'), $('#event-pax-error'));
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('.venue-checkbox').change(function () {
        var checked = $("input[type=checkbox]:checked").length;
        if (checked <= 0)
            displayError($('.venue-checkbox'), $('#missing-error'), 'At least 1 venue should be checked.');
        else
            resetField($('.venue-checkbox'), $('#missing-error'));
        checkEventAvailability();
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('.package').change(function () {
        let garden = $('#garden-options').val();
        let sunroom = $('#sunroom-options').val();
        let terrace = $('#terrace-options').val();
        let package = (garden || sunroom || terrace);
        if (package == 0) {
            displayError($('.package'), $('#missing-error'), 'At least 1 Package should be selected.');
        }
        else
            resetField($('.package'), $('#missing-error'));
        checkEventAvailability();
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#representative-name').keyup(function () {
        var repname = validator.trim($('#representative-name').val());
        if (checkStringInput(repname))
            displayError($('#representative-name'), $('#rep-name-error'), "Invalid name. Use Alpha characters (A-Z, a-z, 0-9), period (.), and hyphens (-) only.");
        else resetField($('#representative-name'), $('#rep-name-error'));
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#representative-mobile-number').keyup(function () {
        if ($(this).intlTelInput('isValidNumber') || validator.isEmpty($(this).val()))
            resetField($('#representative-mobile-number'), $('#rep-number-error'));
        else
            displayError($('#representative-mobile-number'), $('#rep-number-error'), 'Invalid representative mobile number.');
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#additional-quantity').change(function () {
        if ($('#additional-quantity').val() < 0) {
            displayError($('#additional-quantity'), $('#additional-items-error'), 'Quantity cannot be negative.');
        } else if ($('#additional-quantity').val() == 0) {
            displayError($('#additional-quantity'), $('#additional-items-error'), 'Quantity cannot be zero.');
        } else {
            resetField($('#additional-quantity'), $('#additional-items-error'));
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });
    //menu details
    $('#additional-price').change(function () {
        if ($('#additional-price').val() < 0) {
            displayError($('#additional-quantity'), $('#additional-items-error'), 'Price cannot be negative.');
        } else {
            resetField($('#additional-quantity'), $('#additional-items-error'));
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });
    //transactional details
    $('#extra-charges-quantity').change(function () {
        if ($('#extra-charges-quantity').val() < 0) {
            $('#extra-charges-error').text('Quantity cannot be negative.');
        } else if ($('#extra-charges-quantity').val() == 0) {
            $('#extra-charges-error').text('Quantity cannot be zero.');
        } else {
            $('#extra-charges-error').text('');
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#extra-charges-price').change(function () {
        if ($('#extra-charges-price').val() < 0) {
            $('#extra-charges-error').text('Price cannot be negative.');
        } else {
            $('#extra-charges-error').text('');
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    $('#discount-price').change(function () {
        if ($('#discount-price').val() < 0) {
            $('#discount-error').text('Price cannot be negative.');
        } else {
            $('#discount-error').text('');
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });

    //Payment Details
    downpaymentCheckFields();
    finalPaymentCheckFields();

    $('.payment-checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            $(this).parent().siblings().children().children('input:not(.static), select').prop('disabled', false);
            if (document.getElementById("downpayment").checked) {
                downpaymentChecked();
                downpaymentCheckFields();
            }
            if (document.getElementById("final-payment").checked) {
                finalPaymentChecked();
                finalPaymentCheckFields();
            }
        }
        else {
            if (!document.getElementById("final-payment").checked) {
                finalPaymentNotChecked();
            }
            if (!document.getElementById("downpayment").checked) {
                downpaymentNotChecked();
            }
        }
        $('#submit').attr("disabled", checkIfFilledEventFields());
    });
}

function checkIfFilledEventFields() {
    let name = validator.trim($('#client-name').val());
    let cp = $('#client-mobile-number').val();
    let type = validator.trim($('#event-type').val());
    let date = $('#event-date').val();
    let time = $('#event-time').val();
    let pax = $('#event-pax').val();
    let garden = $('#garden-options').val();
    let sunroom = $('#sunroom-options').val();
    let terrace = $('#terrace-options').val();
    let package = (garden || sunroom || terrace);

    var dateMax = getDateTime("2032-01-01");
    var dateMin = getDateTime(getDateToday());

    if (validator.isEmpty(name)) {
        $('#missing-error').val('Client name should be filled.');
        return true;
    }
    else if (checkStringInput(name)) {
        $('#missing-error').val("Invalid name. Use Alpha characters (A-Z, a-z, 0-9), period (.), and hyphens (-) only.");
        return true;
    }

    else if (checkStringInput($('#representative-name').val())) {
        $('#missing-error').val("Invalid name. Use Alpha characters (A-Z, a-z, 0-9), period (.), and hyphens (-) only.");
        return true;
    }

    else if (validator.isEmpty(cp)) {
        $('#missing-error').val('Client mobile number should be filled.');
        return true;
    }
    else if (!($('#client-mobile-number').intlTelInput('isValidNumber'))) {
        $('#missing-error').val('Invalid cellphone number.');
        return true;
    }
    else if (!validator.isEmpty($('#representative-mobile-number').val())) {
        if (!($('#representative-mobile-number').intlTelInput('isValidNumber'))) {
            $('#missing-error').val('Invalid cellphone number.');
            return true;
        }
    }
    else if (validator.isEmpty(type)) {
        $('#missing-error').val('Event type should be filled.');
        return true;
    }

    else if (validator.isEmpty(date)) {
        $('#missing-error').val('Event date should be filled.');
        return true;
    }
    else if (!validator.isEmpty(date)) {
        var eventdate = getDateTime(date);
        if ($('#event-date').val().length > 10) {
            $('#missing-error').val('Invalid date.');
            return true;
        }
        else if ((eventdate - dateMin < 0) || isNaN(eventdate)) {
            if ($('#event-id').text() == '') {
                $('#missing-error').val('Date cannot be in the past.');
                return true;
            }
        }
        else if ((eventdate - dateMax >= 0) || isNaN(eventdate)) {
            $('#missing-error').val('Date cannot be later than 2031.');
            return true;
        }
    }

    if (validator.isEmpty(time)) {
        $('#missing-error').val('Event time should be filled.');
        return true;
    }

    else if (validator.isEmpty(pax)) {
        $('#missing-error').val('Number of pax should be filled.');
        return true;
    }
    else if (pax <= 0) {
        $('#missing-error').val('Number of pax should not be less than or equal to zero.');
        return true;
    }
    else if (pax > 120) {
        $('#missing-error').val('Number of pax should not be more than 120.');
        return true;
    }
    else if ($("input[type=checkbox]:checked").length <= 0) {
        $('#missing-error').val('At least 1 venue should be selected.');
        return true;
    }
    else if (package == 0) {
        $('#missing-error').val('At least 1 package should be selected.');
        return true;
    }
    if (document.getElementById("downpayment").checked) {
        if ($('#downpayment-amount').val() < 0 || $('#downpayment-amount').val() == '') {
            $('#downpayment-amount-error').val('Invalid payment.');
            return true;
        }
        else if (validator.isEmpty($('#downpayment-mode').val())) {
            $('#downpayment-mode-error').val('Select 1 payment mode.');
            return true;
        }
        else if (validator.isEmpty($('#downpayment-date').val())) {
            $('#downpayment-error').val('Date should be filled.');
            return true;
        }
        else if (!validator.isEmpty($('#downpayment-date').val())) {
            var dpaydate = getDateTime($('#downpayment-date').val());
            if ($('#downpayment-date').val().length > 10) {
                $('#downpayment-error').val('Invalid date.');
                return true;
            }
            else if ((dpaydate - dateMin < 0) || isNaN(dpaydate)) {
                if ($('#event-id').text() == '') {
                    $('#downpayment-error').val('Date cannot be in the past.');
                    return true;
                }
            }
            else if ((dpaydate - dateMax >= 0) || isNaN(dpaydate)) {
                $('#downpayment-error').val('Date cannot be later than 2031.');
                return true;
            }
        }
    }
    if (document.getElementById("final-payment").checked) {
        if ($('#final-payment-amount').val() < 0 || $('#final-payment-amount').val() == '') {
            $('#final-payment-amount-error').val('Invalid payment.');
            return true;
        }
        else if (validator.isEmpty($('#final-payment-mode').val())) {
            $('#final-payment-mode-error').val('Select 1 payment mode.');
            return true;
        }
        else if (validator.isEmpty($('#final-payment-date').val())) {
            $('#final-payment-error').val('Date should be filled.');
            return true;
        }
        else if (!validator.isEmpty($('#final-payment-date').val())) {
            var fpaydate = getDateTime($('#final-payment-date').val());
            if ($('#final-payment-date').val().length > 10) {
                $('#final-payment-error').val('Invalid date.');
                return true;
            }
            else if ((fpaydate - dateMin < 0) || isNaN(fpaydate)) {
                if ($('#event-id').text() == '') {
                    $('#final-payment-error').val('Date cannot be in the past.');
                    return true;
                }
            }
            else if ((fpaydate - dateMax >= 0) || isNaN(fpaydate)) {
                $('#final-payment-error').val('Date cannot be later than 2031.');
                return true;
            }
        }
    }
    if (parseFloat($('#payment-balance').val()) < 0) {
        $('#payment-error').text('Customer payment is greater than the total price.');
        $('#payment-amount-total').addClass('is-invalid');
        $('#payment-balance').addClass('is-invalid');
        return true;
    }

    $('#payment-error').text('');
    $('#payment-amount-total').removeClass('is-invalid');
    $('#payment-balance').removeClass('is-invalid');
    $('#missing-error').val('');
    return false;
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

/**
 * Gets and returns the time (millisecond) equivalent of a date
 *
 * @param {String}  input   The date in String format to be converted
 */
function getDateTime(input) {
    var day = parseInt(input.slice(8, 10));
    var month = parseInt(input.slice(5, 7));
    var year = parseInt(input.slice(0, 4));

    return new Date(year, month, day).getTime();
}

/**
 * Checks date fields if they are not set at most today (YYYY-MM-DD)
 *
 * @param {String} input        The user input for a specific field in the form
 * @param {String} errorfield   The ID of the error field in the form to display the errormsg in
 * @param {String} id           The ID of the field in the form with discrepancies
 */
function validDate(input, errorfield, id) {
    var idfield = '#' + id;
    if (input.length > 10)
        displayError($(idfield), errorfield, 'Invalid date.');
    else {
        var dateInput = getDateTime(input);
        var dateMax = getDateTime("2032-01-01");
        var dateMin = getDateTime(getDateToday());

        if (input == '') {
            displayError($(idfield), errorfield, 'Date cannot be empty.');
            return true;
        } else if (dateInput - dateMin < 0 || isNaN(dateInput)) {
            if ($('#event-id').text() == '') {
                displayError($(idfield), errorfield, 'Date cannot be in the past.');
                return true;
            }
        } else if (dateInput - dateMax >= 0 || isNaN(dateInput)) {
            displayError(
                $(idfield),
                errorfield,
                'Date cannot be later than 2031.'
            );
            return true;
        } else {
            resetField($(idfield), errorfield);
            return false;
        }
    }
}

function displayError(inputField, errorField, errorText) {
    errorField.text(errorText);
    inputField.addClass('is-invalid');
}

function resetField(inputField, errorField) {
    errorField.text('');
    inputField.removeClass('is-invalid');
}

function enableSubmitButton() {
    $('#submit-button').prop('hidden', true);
}

function checkEventAvailability() {
    if (
        $('#event-date').val() != '' &&
        $('#event-time').val() != '' &&
        ($('#garden-options').val() != '' ||
            $('#sunroom-options').val() != '' ||
            $('#terrace-options').val() != '')
    ) {
        let eventVenues = [];
        $('.venue-checkbox').each(function () {
            if ($(this).is(':checked')) {
                eventVenues.push($(this).val());
            }
        });

        let data = {
            status: 'reserved',
            eventDate: $('#event-date').val(),
            eventTime: $('#event-time').val(),
            eventVenues: eventVenues,
        };

        $.get(
            '/event-tracker/check/event-availability',
            data,
            function (result) {
                if (result._id != curreventID) {
                    if (!(typeof result._id == 'undefined')) {
                        $('#event-date').addClass('is-invalid');
                        displayError(
                            $('#event-time'),
                            $('#event-time-error'),
                            'Date and time is unavailable.'
                        );
                    }
                    else {
                        resetField($('#event-date'), $('#event-time-error'));
                        resetField($('#event-time'), $('#event-time-error'));
                        if ($('#event-id').text() == '')
                            validDate(document.getElementById("event-date").value, $('#event-date-error'), "event-date");
                    }
                }
                else {
                    resetField($('#event-date'), $('#event-time-error'));
                    resetField($('#event-time'), $('#event-time-error'));
                    if ($('#event-id').text() == '')
                        validDate(document.getElementById("event-date").value, $('#event-date-error'), "event-date");
                }
            }
        );
    }
}

function formatAsDecimal(value) {
    return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2,
    });
}

function formatAsNumber(value) {
    return parseFloat(value.replace(/,/g, ''));
}

function calculatePackageTotal() {
    let gardenIndex = -1,
        sunroomIndex = -1,
        terraceIndex = -1;

    if ($('#garden-options').val() != '')
        gardenIndex = getPackageIndex(gardenPackageList, $('#garden-options').val());
    if ($('#sunroom-options').val() != '')
        sunroomIndex = getPackageIndex(sunroomPackageList, $('#sunroom-options').val());
    if ($('#terrace-options').val() != '')
        terraceIndex = getPackageIndex(terracePackageList, $('#terrace-options').val());

    let add5paxIndex = getPackageIndex(additionalPackageList, 'add5');

    let sum = 0;
    if (gardenIndex != -1) sum += gardenPackageList[gardenIndex].packagePrice;
    if (sunroomIndex != -1)
        sum += sunroomPackageList[sunroomIndex].packagePrice;
    if (terraceIndex != -1)
        sum += terracePackageList[terraceIndex].packagePrice;
    if ($('#additional-pax').is(':checked'))
        sum += additionalPackageList[add5paxIndex].packagePrice;
    return sum;
}

function calculateItemTotal(field) {
    let sum = 0;

    field.each(function () {
        sum += formatAsNumber($(this).text());
    });

    return sum;
}

function calculateTotal() {
    return (
        calculatePackageTotal() +
        calculateItemTotal($('.additional-item-amt')) +
        calculateItemTotal($('.extra-charges-item-amt')) -
        calculateItemTotal($('.discount-item-amt'))
    );
}

function calculateTotalAmountPaid() {
    var dpay = 0;
    var fpay = 0;
    if ($("#downpayment-amount").val() != '')
        dpay = parseFloat($("#downpayment-amount").val());
    if ($("#final-payment-amount").val() != '')
        fpay = parseFloat($("#final-payment-amount").val());

    var paid = dpay + fpay;
    return paid;
}

function calculateBalance() {
    var balance = calculateTotal() - calculateTotalAmountPaid();
    return balance;
}

function updatePaymentAndBalance() {
    var paid = "" + calculateTotalAmountPaid();
    $('#payment-amount-total').val(paid);
    var balance = "" + calculateBalance();
    $('#payment-balance').val(balance);
    $('#final-payment-amount').attr("placeholder", $('#payment-balance').val());
}

function getPackageIndex(list, code) {
    return list.map((e) => e.packageCode).indexOf(code);
}

function getMenuItemPrice(name) {
    return foodList[foodNameList.indexOf(name)].price;
}

function getFoodID(name) {
    return foodList[foodNameList.indexOf(name)]._id;
}

function getExtraChargePrice(name) {
    return chargeList[chargeNameList.indexOf($('#extra-charges-name').val())]
        .price;
}

function getPackageID(code) {
    return packageList[packageList.map((e) => e.packageCode).indexOf(code)]._id;
}

function getPackageName(code) {
    return packageList[packageList.map((e) => e.packageCode).indexOf(code)].packageName;
}

function getPackagePrice(code) {
    return packageList[packageList.map((e) => e.packageCode).indexOf(code)].packagePrice;
}

function getVariantCount(code) {
    let gardenIndex = getPackageIndex(
        gardenPackageList,
        $('#garden-options').val()
    );
    let sunroomIndex = getPackageIndex(
        sunroomPackageList,
        $('#sunroom-options').val()
    );
    let terraceIndex = getPackageIndex(
        terracePackageList,
        $('#terrace-options').val()
    );

    let count = 4;
    if (gardenIndex != -1 && count == 4)
        count = Math.max(count, gardenPackageList[gardenIndex].variantCount);
    if (sunroomIndex != -1 && count == 4)
        count = Math.max(count, sunroomPackageList[sunroomIndex].variantCount);
    if (terraceIndex != -1 && count == 4)
        count = Math.max(count, terracePackageList[terraceIndex].variantCount);
    return count;
}

function getFoodQuantity(food) {
    let gardenIndex = getPackageIndex(
        gardenPackageList,
        $('#garden-options').val()
    );
    let sunroomIndex = getPackageIndex(
        sunroomPackageList,
        $('#sunroom-options').val()
    );
    let terraceIndex = getPackageIndex(
        terracePackageList,
        $('#terrace-options').val()
    );
    let add5paxIndex = getPackageIndex(additionalPackageList, 'add5');

    let sum = 0;
    if (gardenIndex != -1)
        sum += gardenPackageList[gardenIndex].foodQuantities[food];
    if (sunroomIndex != -1)
        sum += sunroomPackageList[sunroomIndex].foodQuantities[food];
    if (terraceIndex != -1)
        sum += terracePackageList[terraceIndex].foodQuantities[food];
    if ($('#additional-pax').is(':checked'))
        sum += additionalPackageList[add5paxIndex].foodQuantities[food];
    return sum;
}

function getEventStatus() {
    if ($('#downpayment-amount').val() != '') return 'reserved';
    else return 'booked';
}

function getRoute() {
    if (getEventStatus() == 'reserved')
        return '/event-tracker/reservations'
    else return '/event-tracker/pencilbookings'
}

/**
 * Retrieves all the data from the form and stores it into an object. The object will be converted into a String before it is sent with the POST request.
 */
function submitForm() {
    $('form').on('submit', function (event) {
        event.preventDefault();

        // stores the venues and packages into an array of strings
        let eventVenues = [];
        let eventPackages = [];
        $('.venue-checkbox').each(function () {
            if ($(this).is(':checked')) {
                eventVenues.push($(this).val());
                if ($(this).parent().siblings('select').val())
                    eventPackages.push(
                        getPackageID($(this).parent().siblings('select').val())
                    );
            }
        });

        // stores the additional menu items into an array of objects
        let menuAdditional = [];
        $('.additional-item').each(function () {
            menuAdditional.push({
                foodItem: getFoodID($(this).children('.additional-item-name').text()),
                foodQuantity: Number($(this).children('.additional-item-quantity').text()),
                foodCost: parseFloat($(this).children('.additional-item-quantity').text()) * getMenuItemPrice($(this).children('.additional-item-name').text())
            });
        });

        // stores the extra charges into an array of objects
        let transactionCharges = [];
        $('.extra-charges-item').each(function () {
            transactionCharges.push({
                chargeName: $(this).children('.extra-charges-item-name').text(),
                chargeQuantity: Number($(this).children('.extra-charges-item-quantity').text()),
                chargePrice: formatAsNumber($(this).children('.extra-charges-item-price').text())
            });
        });

        // stores the discounts into an array of objects
        let transactionDiscounts = [];
        $('.discount-item').each(function () {
            transactionDiscounts.push({
                discountName: $(this).children('.discount-item-name').text(),
                discountPrice: formatAsNumber($(this).children('.discount-item-amt').text())
            });
        });

        let saladName = $('input[name=salad-options]:checked').val();
        let pastaName = $('input[name=pasta-options]:checked').val();
        let beefName = $('input[name=beef-options]:checked').val();
        let porkName = $('input[name=pork-options]:checked').val();
        let chickenName = $('input[name=chicken-options]:checked').val();
        let fishName = $('input[name=fish-options]:checked').val();

        let saladQuantity;
        let pastaQuantity;
        let beefQuantity;
        let porkQuantity;
        let chickenQuantity;
        let fishQuantity;

        if (saladName) saladQuantity = $('#salad-quantity').val();
        if (pastaName) pastaQuantity = $('#pasta-quantity').val();
        if (beefName) beefQuantity = $('#beef-quantity').val();
        if (porkName) porkQuantity = $('#pork-quantity').val();
        if (chickenName) chickenQuantity = $('#chicken-quantity').val();
        if (fishName) fishQuantity = $('#fish-quantity').val();

        let downpaymentAmount = $('#downpayment-amount').val();

        // stores all information as an object
        let data = {
            status: getEventStatus(),
            clientName: $('#client-name').val(),
            clientMobileNumber: $('#client-mobile-number').intlTelInput(
                'getNumber'
            ),
            repName: $('#representative-name').val(),
            repMobileNumber: $('#representative-mobile-number').intlTelInput(
                'getNumber'
            ),
            eventType: $('#event-type').val(),
            eventDate: $('#event-date').val(),
            eventTime: $('#event-time').val(),
            numOfPax: $('#event-pax').val(),
            eventNotes: $('#event-notes').val(),
            eventVenues: eventVenues,
            eventPackages: eventPackages,
            packageAdditionalPax: $('#additional-pax').is(':checked')
                ? true
                : false,

            menuPackage: {
                saladName: saladName,
                saladQuantity: saladQuantity,
                pastaName: pastaName,
                pastaQuantity: pastaQuantity,
                beefName: beefName,
                beefQuantity: beefQuantity,
                porkName: porkName,
                porkQuantity: porkQuantity,
                chickenName: chickenName,
                chickenQuantity: chickenQuantity,
                fishName: fishName,
                fishQuantity: fishQuantity,
                icedTeaQuantity: $('#icedtea-quantity').val(),
                riceQuantity: $('#rice-quantity').val(),
            },

            menuAdditional: menuAdditional,
            transactionCharges: transactionCharges,
            transactionDiscounts: transactionDiscounts,

            totalPrices: {
                packages: calculatePackageTotal(),
                food: calculateItemTotal($('.additional-item-amt')),
                charges: calculateItemTotal($('.extra-charges-item-amt')),
                discounts: calculateItemTotal($('.discount-item-amt')),
                all: calculateTotal(),
            },

            downpaymentDate: $('#downpayment-date').val(),
            downpaymentMode: $('#downpayment-mode').val(),
            downpaymentAmount: downpaymentAmount,

            finalPaymentDate: $('#final-payment-date').val(),
            finalPaymentMode: $('#final-payment-mode').val(),
            finalPaymentAmount: $('#final-payment-amount').val(),
        };
        $('#downpayment-amount').val(downpaymentAmount);

        // check if event is to be modified or inserted into database
        if (curreventID) {
            let json = JSON.stringify({
                id: curreventID,
                data: data,
                modified: getModifiedFields(data)
            });

            // makes a PUT request using AJAX to update the event's details
            $.ajax({
                type: 'PUT',
                url: getRoute(),
                data: json,
                contentType: 'application/json',
                success: function (result) {
                    window.location.href = getRoute();
                },
            });
        }

        else {
            let json = {
                data: JSON.stringify(data)
            };

            // makes a POST request using AJAX to add the event to the database
            $.post("/event-tracker/submit", json, function (result) {
                window.location.href = getRoute();
            });
        }
    });
}

function getModifiedFields(data) {
    let modified = []
    if (currevent.clientName != data.clientName) modified.push('Client Name');
    if (currevent.clientMobileNumber != data.clientMobileNumber) modified.push('Client Mobile Number');
    if (currevent.repName != data.repName) modified.push('Representative Name');
    if (currevent.repMobileNumber != data.repMobileNumber) modified.push('Representative Mobile Number');
    if (currevent.eventType != data.eventType) modified.push('Event Type');

    let newDate = new Date(data.eventDate);
    let oldDate = new Date(currevent.eventDate);
    if (Number(newDate) != Number(oldDate)) modified.push('Event Date');
    if (currevent.eventTime != data.eventTime) modified.push('Event Time');
    if (currevent.numOfPax != data.numOfPax) modified.push('Number of Pax');
    if (currevent.eventNotes != data.eventNotes) modified.push('Event Notes');
    if (JSON.stringify(currevent.eventVenues) != JSON.stringify(data.eventVenues)) modified.push('Event Venues');
    if (JSON.stringify(currevent.eventPackages) != JSON.stringify(data.eventPackages)) modified.push('Event Packages');
    if (currevent.packageAdditionalPax != data.packageAdditionalPax) modified.push('Additional Pax');

    if (currevent.saladName != data.saladName) modified.push('Salad Name');
    if (currevent.saladQuantity != data.saladQuantity) modified.push('Salad Quantity');
    if (currevent.pastaName != data.pastaName) modified.push('Pasta Name');
    if (currevent.pastaQuantity != data.pastaQuantity) modified.push('Pasta Quantity');
    if (currevent.beefName != data.beefName) modified.push('Beef Name');
    if (currevent.beefQuantity != data.beefQuantity) modified.push('Beef Quantity');
    if (currevent.porkName != data.porkName) modified.push('Pork Name');
    if (currevent.porkQuantity != data.saladQuantity) modified.push('Pork Quantity');
    if (currevent.chickenName != data.chickenName) modified.push('Chicken Name');
    if (currevent.chickenQuantity != data.chickenQuantity) modified.push('Chicken Quantity');
    if (currevent.fishName != data.fishName) modified.push('Fish Name');
    if (currevent.fishQuantity != data.fishQuantity) modified.push('Fish Quantity');
    if (currevent.icedTeaQuantity != data.icedTeaQuantity) modified.push('Iced Tea Quantity');
    if (currevent.riceQuantity != data.riceQuantity) modified.push('Rice Quantity');

    if (JSON.stringify(currevent.menuAdditional, ['foodItem', 'foodQuantity', 'foodCost'])
        != JSON.stringify(data.menuAdditional, ['foodItem', 'foodQuantity', 'foodCost'])) modified.push('Additional Food');
    if (JSON.stringify(currevent.transactionCharges, ['chargeName', 'chargeQuantity', 'chargePrice'])
        != JSON.stringify(data.transactionCharges, ['chargeName', 'chargeQuantity', 'chargePrice'])) modified.push('Charges');
    if (JSON.stringify(currevent.transactionDiscounts, ['discountName', 'discountPrice'])
        != JSON.stringify(data.transactionDiscounts, ['discountName', 'discountPrice'])) modified.push('Discounts');

    newDate = new Date(data.downpaymentDate);
    oldDate = new Date(currevent.downpaymentDate);
    if (Number(newDate) != Number(oldDate)) modified.push('Downpayment Date');
    if (currevent.downpaymentMode != data.downpaymentMode) modified.push('Downpayment Mode');
    if (currevent.downpaymentAmount != data.downpaymentAmount) modified.push('Downpayment Amount');

    if (currevent.finalPaymentDate != null) {
        newDate = new Date(data.finalPaymentDate);
        oldDate = new Date(currevent.finalPaymentDate);
        if (Number(newDate) != Number(oldDate)) modified.push('Final Payment Date');
        if (currevent.finalPaymentMode != data.finalPaymentMode) modified.push('Final Payment Mode');
        if (currevent.finalPaymentAmount != data.finalPaymentAmount) modified.push('Final Payment Amount');
    }

    return modified;
}

function addExistingFields() {
    let id = '';
    if ($('#event-id').text() != '') {
        id = $('#event-id').text();
        $.get('/event-tracker/get/event', { id: id }, function (result) {
            if (result) {
                currevent = result[0];
                curreventID = currevent._id;

                $('#form-title').children('h1').html('<span class="material-icons-two-tone mb-1 md-48">class</span> EDIT EVENT');

                // set event time
                $('#event-time').val(currevent.eventTime);

                // set event date
                $('#event-date').val(new Date(currevent.eventDate).toISOString().substr(0, 10));

                // set event venue checkboxes
                $('#venue-garden').prop(
                    'checked',
                    currevent.eventVenues.includes('Garden')
                );
                $('#venue-sunroom').prop(
                    'checked',
                    currevent.eventVenues.includes('Sunroom')
                );
                $('#venue-terrace').prop(
                    'checked',
                    currevent.eventVenues.includes('Terrace')
                );

                $('.venue-checkbox').each(function () {
                    if ($(this).is(':checked'))
                        $(this).parent().siblings('select').prop('disabled', false);
                });

                // set event packages dropdowns
                for (let j = 0; j < currevent.packageList.length; j++) {
                    if (currevent.packageList[j].packageVenue === 'Garden')
                        $('#garden-options').val(
                            currevent.packageList[j].packageCode
                        ).change();
                    else if (currevent.packageList[j].packageVenue === 'Sunroom')
                        $('#sunroom-options').val(
                            currevent.packageList[j].packageCode
                        ).change();
                    else if (currevent.packageList[j].packageVenue === 'Terrace')
                        $('#terrace-options').val(
                            currevent.packageList[j].packageCode
                        ).change();
                }

                // set additional pax checkbox
                $('#additional-pax').prop(
                    'checked',
                    currevent.packageAdditionalPax
                );

                // set menu items
                if (currevent.menuPackage.saladName) {
                    $('#menu-salad-button').trigger('click');
                    //$('#menu-salad-contents').collapse('toggle');
                    $('input[name="salad-options"][value="' + currevent.menuPackage.saladName + '"]').prop('checked', true);
                }

                if (currevent.menuPackage.pastaName) {
                    $('#menu-pasta-button').trigger('click');
                    $('input[name="pasta-options"][value="' + currevent.menuPackage.pastaName + '"]').prop('checked', true);
                }

                if (currevent.menuPackage.beefName) {
                    $('#menu-beef-button').trigger('click');
                    $('input[name="beef-options"][value="' + currevent.menuPackage.beefName + '"]').prop('checked', true);
                }

                if (currevent.menuPackage.porkName) {
                    $('#menu-pork-button').trigger('click');
                    $('input[name="pork-options"][value="' + currevent.menuPackage.porkName + '"]').prop('checked', true);
                }

                if (currevent.menuPackage.chickenName) {
                    $('#menu-chicken-button').trigger('click');
                    $('input[name="chicken-options"][value="' + currevent.menuPackage.chickenName + '"]').prop('checked', true);
                }

                if (currevent.menuPackage.fishName) {
                    $('#menu-fish-button').trigger('click');
                    $('input[name="fish-options"][value="' + currevent.menuPackage.fishName + '"]').prop('checked', true);
                }

                // set additional items table
                if (currevent.foodList.length != 0) {
                    $('#additional-items-header').empty();
                    $('#additional-items-header').append(additionalFoodTableHeader);
                }
                for (let j = 0; j < currevent.foodList.length; j++) {
                    let name = currevent.foodList[j].name;
                    let quantity = currevent.menuAdditional[j].foodQuantity;
                    let price = currevent.foodList[j].price;
                    let cost = currevent.menuAdditional[j].foodCost;

                    $('#additional-items-list').append(
                        '<div>' +
                        '<hr class="mx-5">' +
                        '<div class="row px-4 py-2 mx-5 additional-item">' +
                        '<h6 class="col-5 mb-0 mt-1 additional-item-name number">' +
                        name +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center additional-item-quantity number">' +
                        quantity +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center additional-item-price number">' +
                        formatAsDecimal(price) +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center additional-item-amt number">' +
                        formatAsDecimal(cost) +
                        '</h6>' +
                        '<span class="col material-icons-two-tone text-end md-btn"' +
                        'onclick="removeAdditionalItem(this)">close</span>' +
                        '</div>' +
                        '</div>'
                    );
                }

                // set extra charges table
                if (currevent.transactionCharges.length != 0) {
                    $('#extra-charges-header').empty();
                    $('#extra-charges-header').append(extraChargesTableHeader);
                }

                for (let j = 0; j < currevent.transactionCharges.length; j++) {
                    let name = currevent.transactionCharges[j].chargeName;
                    let quantity = currevent.transactionCharges[j].chargeQuantity;
                    let price = currevent.transactionCharges[j].chargePrice;

                    $('#extra-charges-list').append(
                        '<div>' +
                        '<hr class="mx-5">' +
                        '<div class="row px-4 py-2 mx-5 extra-charges-item">' +
                        '<h6 class="col-5 mb-0 mt-1 extra-charges-item-name number">' +
                        name +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center extra-charges-item-quantity number">' +
                        quantity +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center extra-charges-item-price number">' +
                        formatAsDecimal(price) +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center extra-charges-item-amt number">' +
                        formatAsDecimal(quantity * price) +
                        '</h6>' +
                        '<span class="col material-icons-two-tone text-end md-btn"' +
                        'onclick="removeExtraCharge(this)">close</span>' +
                        '</div>' +
                        '</div>'
                    );
                }

                // set discounts table
                if (currevent.transactionDiscounts.length != 0) {
                    $('#discounts-header').empty();
                    $('#discounts-header').append(discountsTableHeader);
                }
                for (let j = 0; j < currevent.transactionDiscounts.length; j++) {
                    let name = currevent.transactionDiscounts[j].discountName;
                    let price = currevent.transactionDiscounts[j].discountPrice;

                    $('#discounts-list').append(
                        '<div>' +
                        '<hr class="mx-5">' +
                        '<div class="row px-4 py-2 mx-5 discount-item">' +
                        '<h6 class="col-5 mb-0 mt-1 discount-item-name number">' +
                        name +
                        '</h6>' +
                        '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                        '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                        '<h6 class="col mb-0 mt-1 text-center discount-item-amt number">' +
                        formatAsDecimal(price) +
                        '</h6>' +
                        '<span class="col material-icons-two-tone text-end md-btn"' +
                        'onclick="removeDiscount(this)">close</span>' +
                        '</div>' +
                        '</div>'
                    );
                }

                // set breakdown table
                updateBreakdownTable();

                // set payment details
                if (currevent.downpaymentDate) {
                    downpaymentChecked()
                    $('#downpayment-date').val(new Date(currevent.downpaymentDate).toISOString().substr(0, 10));
                    $('#downpayment-mode').val(currevent.downpaymentMode).change();
                    $('#downpayment-amount').val(currevent.downpaymentAmount);
                    $('#downpayment').prop('checked', true);
                    document.getElementById("final-payment").disabled = false;
                    $('#downpayment')
                        .parent()
                        .siblings()
                        .children()
                        .children('input:not(.static), select')
                        .prop('disabled', false);
                }

                if (currevent.finalPaymentDate) {
                    finalPaymentChecked()
                    $('#final-payment-date').val(new Date(currevent.finalPaymentDate).toISOString().substr(0, 10));
                    $('#final-payment-mode').val(currevent.finalPaymentMode).change();
                    $('#final-payment-amount').val(currevent.finalPaymentAmount);
                    $('#final-payment').prop('checked', true);
                    $('#final-payment')
                        .parent()
                        .siblings()
                        .children()
                        .children('input:not(.static), select')
                        .prop('disabled', false);
                }

                //set the values of Total Amount Paid field and Balance field
                updatePaymentAndBalance();
            }
        });
    }

}

