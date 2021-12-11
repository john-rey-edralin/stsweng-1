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

$(document).ready(function () {
    retrieveInfoFromDB();

    setRequiredFields();
    initializeTooltips()

    initializeEventFields();
    initializeMenuFields();
    initializeTransactionFields();
    initializePaymentFields();

    initializeRealTimeValidation();

    submitForm();
});

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

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
            if (result[j].packageVenue === "Garden")
                gardenPackageList.push(result[j]);
            else if (result[j].packageVenue === "Sunroom")
                sunroomPackageList.push(result[j]);
            else if (result[j].packageVenue === "Terrace")
                terracePackageList.push(result[j]);
            else
                additionalPackageList.push(result[j]);
            packageList.push(result[j]);
        }

        // initialize package options
        $.each(gardenPackageList, function (i, package) {
            $('#garden-options').append($('<option>', {
                value: package.packageCode,
                text: package.packageName + ' - ' + package.variantCount + ' Variants (Php ' + package.packagePrice + ')'
            }));
        });

        $.each(sunroomPackageList, function (i, package) {
            $('#sunroom-options').append($('<option>', {
                value: package.packageCode,
                text: package.packageName + ' - ' + package.variantCount + ' Variants (Php ' + package.packagePrice + ')'
            }));
        });

        $.each(terracePackageList, function (i, package) {
            $('#terrace-options').append($('<option>', {
                value: package.packageCode,
                text: package.packageName + ' - ' + package.variantCount + ' Variants (Php ' + package.packagePrice + ')'
            }));
        });
    });
}

function initializeTooltips() {
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'left'
    });
    $('[data-toggle="popover"]').popover();
}

function initializeEventFields() {
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
    $('.package').on('change', function () { updateFoodQuantity(); updateBreakdownTable(); });
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

function initializePaymentFields() {
    $('.payment-checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            $(this).parent().siblings().children().children('input:not(.static), select').prop('disabled', false);
        } else {
            $(this).parent().siblings().children().children('input:not(.static), select').prop('disabled', true);
        }
    })

    $('#downpayment-amount').on('change', function () {
        $('#payment-balance').val(calculateTotal() - $('#downpayment-amount').val());
        $('#final-payment-amount').attr("placeholder", calculateTotal() - $(this).val());
    });

    $('#final-payment-amount').on('change', function () {
        $('#payment-amount-total').val(parseFloat($('#downpayment-amount').val()) + parseFloat($(this).val()));
        $('#payment-balance').val((calculateTotal() - $('#payment-amount-total').val()) * -1);
    });
}

/**
 * Adds the required class to required fields.
 */
function setRequiredFields() {
    $("input[required]").siblings("label").addClass("required");
    $("select[required]").siblings("label").addClass("required");
}

function showMenuItemInfo(div) {
    div.children("div").children("div").find("input[type='radio']").first().prop('checked', true);
}

function hideMenuItemInfo(div) {
    div.children("div").children("div").children("input").prop("checked", false);
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
    if (!$('#additional-name').val() || !$('#additional-quantity').val() || !$('#additional-price').val()) {
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
            '<h6 class="col-5 mb-0 mt-1 additional-item-name number">' + name + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center additional-item-quantity number">' + quantity + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center additional-item-price number">' + formatAsDecimal(price) + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center additional-item-amt number">' + formatAsDecimal(quantity * price) + '</h6>' +
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
            '<h4 class="mb-0 mt-1 text-end me-5 number"><strong>Total: </strong>Php ' + formatAsDecimal(calculateItemTotal($('.additional-item-amt'))) + '</h4>'
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

    $('#additional-items-total').children('h4').text('Php ' + formatAsDecimal(calculateItemTotal($('.additional-item-amt'))));
    updateBreakdownTable();
}

function addExtraCharge() {
    if (!$('#extra-charges-name').val() || !$('#extra-charges-quantity').val() || !$('#extra-charges-price').val()) {
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
            '<h6 class="col-5 mb-0 mt-1 extra-charges-item-name number">' + name + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center extra-charges-item-quantity number">' + quantity + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center extra-charges-item-price number">' + formatAsDecimal(price) + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center extra-charges-item-amt number">' + formatAsDecimal(quantity * price) + '</h6>' +
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
            '<h4 class="mb-0 mt-1 text-end me-5 number"><strong>Total: </strong>Php ' + formatAsDecimal(calculateItemTotal($('.extra-charges-item-amt'))) + '</h4>'
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

    $('#extra-charges-total').children('h4').text('Php ' + formatAsDecimal(calculateItemTotal($('.extra-charges-item-amt'))));
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
            '<h6 class="col-5 mb-0 mt-1 discount-item-name number">' + name + '</h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center"></h6>' +
            '<h6 class="col mb-0 mt-1 text-center discount-item-amt number">' + formatAsDecimal(price) + '</h6>' +
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
            '<h4 class="mb-0 mt-1 text-end me-5 number"><strong>Total: </strong>Php ' + formatAsDecimal(calculateItemTotal($('.discount-item-amt'))) + '</h4>'
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

    $('#discounts-total').children('h4').text('Php ' + formatAsDecimal(calculateItemTotal($('.discount-item-amt'))));
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
            '<h3 class="col mb-0 mt-1 text-end number"><strong>' + formatAsDecimal(package) + '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.package').each(function () {
            if ($(this).val())
                $('#breakdown-list').append(
                    '<div class="ms-4">' +
                    '<div class="row px-4 py-2 mx-4">' +
                    '<h6 class="col-5 mb-0 mt-1 text-start number">' + getPackageName($(this).val()) + '</h6>' +
                    '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                    '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                    '<h6 class="col mb-0 mt-1 text-end number">' + formatAsDecimal(getPackagePrice($(this).val())) + '</h6>' +
                    '</div>' +
                    '</div>'
                );
        });

        if ($('#additional-pax').is(':checked'))
            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' + 'Additional 5 Pax' + '</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">' + formatAsDecimal(getPackagePrice('5pax')) + '</h6>' +
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
            '<h3 class="col mb-0 mt-1 text-end number"><strong>' + formatAsDecimal(additional) + '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.additional-item').each(function () {
            let name = $(this).children('.additional-item-name').text();
            let qty = $(this).children('.additional-item-quantity').text();
            let amt = formatAsNumber($(this).children('.additional-item-amt').text());

            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' + name + ' (' + qty + ' Serving/s)</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">' + formatAsDecimal(amt) + '</h6>' +
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
            '<h3 class="col mb-0 mt-1 text-end number"><strong>' + formatAsDecimal(charges) + '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.extra-charges-item').each(function () {
            let name = $(this).children('.extra-charges-item-name').text();
            let qty = $(this).children('.extra-charges-item-quantity').text();
            let amt = formatAsNumber($(this).children('.extra-charges-item-amt').text());

            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' + name + ' (x' + qty + ')</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">' + formatAsDecimal(amt) + '</h6>' +
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
            '<h3 class="col mb-0 mt-1 text-end number"><strong>-' + formatAsDecimal(discounts) + '</strong></h3>' +
            '</div>' +
            '</div>'
        );

        $('.discount-item').each(function () {
            let name = $(this).children('.discount-item-name').text();
            let amt = formatAsNumber($(this).children('.discount-item-amt').text());

            $('#breakdown-list').append(
                '<div class="ms-4">' +
                '<div class="row px-4 py-2 mx-4">' +
                '<h6 class="col-5 mb-0 mt-1 text-start number">' + name + '</h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-center"></h6>' +
                '<h6 class="col mb-0 mt-1 text-end number">-' + formatAsDecimal(amt) + '</h6>' +
                '</div>' +
                '</div>'
            );
        });
    }

    $('#breakdown-total').empty();

    if (total) {
        $('#breakdown-total').append(
            '<h2 class="mb-0 mt-5 text-end me-5 number"><strong>Total: </strong>Php ' + formatAsDecimal(total) + '</h2>'
        );
    }

    else {
        $('#breakdown-list').append(
            '<h6 class="mb-0 mt-1 text-center">Please fill out the information above.</h6>'
        );
    }

    if ($('#downpayment-amount').val() != '') {
        $('#payment-balance').val(calculateTotal() - $('#downpayment-amount').val());
        $('#final-payment-amount').attr("placeholder", calculateTotal() - $(this).val());
    }

    if ($('#final-payment-amount').val() != '') {
        $('#payment-amount-total').val(parseFloat($('#downpayment-amount').val()) + parseFloat($(this).val()));
        $('#payment-balance').val((calculateTotal() - $('#payment-amount-total').val()));
    }
}

function initializeRealTimeValidation() {
    $('#client-mobile-number').change(function () {
        if ($(this).intlTelInput('isValidNumber') || validator.isEmpty($(this).val()))
            resetField($('#client-mobile-number'), $('#client-number-error'));
        else
            displayError($('#client-mobile-number'), $('#client-number-error'), 'Invalid client mobile number.');
    });

    $('#representative-mobile-number').change(function () {
        if ($(this).intlTelInput('isValidNumber') || validator.isEmpty($(this).val()))
            resetField($('#representative-mobile-number'), $('#rep-number-error'));
        else
            displayError($('#representative-mobile-number'), $('#rep-number-error'), 'Invalid representative mobile number.');
    });

    $('#event-date').change(function () {
        let input = new Date($('#event-date').val());
        input.setDate(input.getDate() + 1);

        if (input < new Date())
            displayError($('#event-date'), $('#event-date-error'), 'Event date cannot be in the past.');
        else
            resetField($('#event-date'), $('#event-date-error'));
        checkEventAvailability();
    });

    $('#event-time').change(function () {
        if ($('#event-time').val() == '')
            displayError($('#event-time'), $('#event-time-error'), 'Event time cannot be empty.');
        else
            resetField($('#event-time'), $('#event-time-error'));
        checkEventAvailability();
    });

    $('#event-pax').change(function () {
        if ($('#event-pax').val() < 0) {
            displayError($('#event-pax'), $('#event-pax-error'), 'Number of pax cannot be negative.');
        } else if ($('#event-pax').val() == 0) {
            displayError($('#event-pax'), $('#event-pax-error'), 'Number of pax cannot be zero.');
        } else {
            resetField($('#event-pax'), $('#event-pax-error'));
        }
    });

    $('.package').change(function () {
        checkEventAvailability();
    });

    $('#additional-quantity').change(function () {
        if ($('#additional-quantity').val() < 0) {
            displayError($('#additional-quantity'), $('#additional-items-error'), 'Quantity cannot be negative.');
        } else if ($('#additional-quantity').val() == 0) {
            displayError($('#additional-quantity'), $('#additional-items-error'), 'Quantity cannot be zero.');
        } else {
            resetField($('#additional-quantity'), $('#additional-items-error'));
        }
    });

    $('#additional-price').change(function () {
        if ($('#additional-price').val() < 0) {
            displayError($('#additional-quantity'), $('#additional-items-error'), 'Price cannot be negative.');
        } else {
            resetField($('#additional-quantity'), $('#additional-items-error'));
        }
    });

    $('#extra-charges-quantity').change(function () {
        if ($('#extra-charges-quantity').val() < 0) {
            $('#extra-charges-error').text('Quantity cannot be negative.');
        } else if ($('#extra-charges-quantity').val() == 0) {
            $('#extra-charges-error').text('Quantity cannot be zero.');
        } else {
            $('#extra-charges-error').text('');
        }
    });

    $('#extra-charges-price').change(function () {
        if ($('#extra-charges-price').val() < 0) {
            $('#extra-charges-error').text('Price cannot be negative.');
        } else {
            $('#extra-charges-error').text('');
        }
    });

    $('#discount-price').change(function () {
        if ($('#discount-price').val() < 0) {
            $('#discount-error').text('Price cannot be negative.');
        } else {
            $('#discount-error').text('');
        }
    });
}

function checkIfFilledEventFields() {
    let name = $('#client-name').val();
    let cp = $('#client-mobile-number').val();
    let type = $('#event-type').val();
    let date = $('#event-date').val();
    let time = $('#event-time').val();
    let pax = $('#event-pax').val();
    let garden = $('#garden-options').val();
    let sunroom = $('#sunroom-options').val();
    let terrace = $('#terrace-options').val();
    let package = (garden || sunroom || terrace);

    if (validator.isEmpty(name)) {
        $('#missing-error').val('Client name should be filled.');
        return false;
    }

    else if (validator.isEmpty(cp)) {
        $('#missing-error').val('Client mobile number should be filled.');
        return false;
    }

    else if (validator.isEmpty(type)) {
        $('#missing-error').val('Event type should be filled.');
        return false;
    }

    else if (validator.isEmpty(date)) {
        $('#missing-error').val('Event date should be filled.');
        return false;
    }

    else if (validator.isEmpty(time)) {
        $('#missing-error').val('Event time should be filled.');
        return false;
    }

    else if (validator.isEmpty(pax)) {
        $('#missing-error').val('Number of pax should be filled.');
        return false;
    }

    else if (validator.isEmpty(package)) {
        $('#missing-error').val('Package should be filled.');
        return false;
    }

    else {
        $('#missing-error').val('');
        return true;
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

function checkEventAvailability() {
    if ($('#event-date').val() != '' && $('#event-time').val() != '' &&
        ($('#garden-options').val() != '' || $('#sunroom-options').val() != '' || $('#terrace-options').val() != '')) {
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
            eventVenues: eventVenues
        }

        $.get('/event-tracker/check/event-availability', data, function (result) {
            if (result)
                displayError($('#event-time'), $('#event-time-error'), 'Date and time is unavailable.');
            else
                resetField($('#event-time'), $('#event-time-error'));
        });
    }
}

function formatAsDecimal(value) {
    return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
}

function formatAsNumber(value) {
    return parseFloat(value.replace(/,/g, ''));
}

function calculatePackageTotal() {
    let gardenIndex = getPackageIndex(gardenPackageList, $('#garden-options').val());
    let sunroomIndex = getPackageIndex(sunroomPackageList, $('#sunroom-options').val());
    let terraceIndex = getPackageIndex(terracePackageList, $('#terrace-options').val());
    let add5paxIndex = getPackageIndex(additionalPackageList, 'add5');

    let sum = 0;
    if (gardenIndex != -1)
        sum += gardenPackageList[gardenIndex].packagePrice;
    if (sunroomIndex != -1)
        sum += sunroomPackageList[sunroomIndex].packagePrice;
    if (terraceIndex != -1)
        sum += terracePackageList[terraceIndex].packagePrice;
    if ($('#additional-pax').is(":checked"))
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
    return calculatePackageTotal() +
        calculateItemTotal($('.additional-item-amt')) +
        calculateItemTotal($('.extra-charges-item-amt')) -
        calculateItemTotal($('.discount-item-amt'));
}

function getPackageIndex(list, code) {
    return list.map(e => e.packageCode).indexOf(code);
}

function getMenuItemPrice(name) {
    return foodList[foodNameList.indexOf($('#additional-name').val())].price
}

function getExtraChargePrice(name) {
    return chargeList[chargeNameList.indexOf($('#extra-charges-name').val())].price
}

function getPackageID(code) {
    return packageList[packageList.map(e => e.packageCode).indexOf(code)]._id;
}

function getPackageName(code) {
    return packageList[packageList.map(e => e.packageCode).indexOf(code)].packageName;
}

function getPackagePrice(code) {
    return packageList[packageList.map(e => e.packageCode).indexOf(code)].packagePrice;
}

function getVariantCount(code) {
    let gardenIndex = getPackageIndex(gardenPackageList, $('#garden-options').val());
    let sunroomIndex = getPackageIndex(sunroomPackageList, $('#sunroom-options').val());
    let terraceIndex = getPackageIndex(terracePackageList, $('#terrace-options').val());

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
    let gardenIndex = getPackageIndex(gardenPackageList, $('#garden-options').val());
    let sunroomIndex = getPackageIndex(sunroomPackageList, $('#sunroom-options').val());
    let terraceIndex = getPackageIndex(terracePackageList, $('#terrace-options').val());
    let add5paxIndex = getPackageIndex(additionalPackageList, 'add5');

    let sum = 0;
    if (gardenIndex != -1)
        sum += gardenPackageList[gardenIndex].foodQuantities[food]
    if (sunroomIndex != -1)
        sum += sunroomPackageList[sunroomIndex].foodQuantities[food]
    if (terraceIndex != -1)
        sum += terracePackageList[terraceIndex].foodQuantities[food]
    if ($('#additional-pax').is(":checked"))
        sum += additionalPackageList[add5paxIndex].foodQuantities[food]
    return sum;
}

function getEventStatus() {
    if ($('#downpayment').is('checked'))
        return 'reserved';
    else
        return 'booked';
}

/**
 * Retrieves all the data from the form and stores it into an object. The object will be converted into a String before it is sent with the POST request.
 */
function submitForm() {
    $("form").on("submit", function (event) {
        event.preventDefault();

        // stores the venues and packages into an array of strings
        let eventVenues = [];
        let eventPackages = []
        $('.venue-checkbox').each(function () {
            if ($(this).is(':checked')) {
                eventVenues.push($(this).val());
                if ($(this).parent().siblings('select').val())
                    eventPackages.push(getPackageID($(this).parent().siblings('select').val()));
            }
        });

        // stores the additional menu items into an array of objects
        let menuAdditional = [];
        $('.additional-item').each(function () {
            menuAdditional.push({
                foodItem: $(this).children('.additional-item-name').text(),
                foodQuantity: $(this).children('.additional-item-quantity').text(),
                foodCost: formatAsDecimal(parseFloat($(this).children('.additional-item-quantity').text()) * getMenuItemPrice($(this).children('.additional-item-name').text()))
            });
        });

        // stores the extra charges into an array of objects
        let transactionCharges = [];
        $('.extra-charges-item').each(function () {
            transactionCharges.push({
                chargeName: $(this).children('.extra-charges-item-name').text(),
                chargeQuantity: $(this).children('.extra-charges-item-quantity').text(),
                chargePrice: $(this).children('.extra-charges-item-price').text()
            });
        });

        // stores the discounts into an array of objects
        let transactionDiscounts = [];
        $('.discount-item').each(function () {
            transactionDiscounts.push({
                discountName: $(this).children('.discount-item-name').text(),
                discountPrice: $(this).children('.discount-item-amt').text()
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

        if (saladName)
            saladQuantity = $('#salad-quantity').val();
        if (pastaName)
            pastaQuantity = $('#pasta-quantity').val();
        if (beefName)
            beefQuantity = $('#beef-quantity').val();
        if (porkName)
            porkQuantity = $('#pork-quantity').val();
        if (chickenName)
            chickenQuantity = $('#chicken-quantity').val();
        if (fishName)
            fishQuantity = $('#fish-quantity').val();


        // stores all information as an object
        let data = {
            status: getEventStatus(),
            clientName: $('#client-name').val(),
            clientMobileNumber: $('#client-mobile-number').intlTelInput('getNumber'),
            repName: $('#representative-name').val(),
            repMobileNumber: $('#representative-mobile-number').intlTelInput('getNumber'),
            eventType: $('#event-type').val(),
            eventDate: $('#event-date').val(),
            eventTime: $('#event-time').val(),
            numOfPax: $('#event-pax').val(),
            eventNotes: $('#event-notes').val(),
            eventVenues: eventVenues,
            eventPackages: eventPackages,
            packageAdditionalPax: ($('#additional-pax').is(":checked")) ? true : false,

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
                riceQuantity: $('#rice-quantity').val()
            },

            menuAdditional: menuAdditional,
            transactionCharges: transactionCharges,
            transactionDiscounts: transactionDiscounts,

            totalPrices: {
                packages: calculatePackageTotal(),
                food: calculateItemTotal($('.additional-item-amt')),
                charges: calculateItemTotal($('.extra-charges-item-amt')),
                discounts: calculateItemTotal($('.discount-item-amt')),
                all: calculateTotal()
            },

            downpaymentDate: $('#downpayment-date').val(),
            downpaymentMode: $('#downpayment-mode').val(),
            downpaymentAmount: $('#downpayment-amount').val(),

            finalPaymentDate: $('#final-payment-date').val(),
            finalPaymentMode: $('#final-payment-mode').val(),
            finalPaymentAmount: $('#final-payment-amount').val(),
        };

        // converts the JSON object into a String
        let json = {
            data: JSON.stringify(data)
        };

        // makes a POST request using AJAX to store the data and returns the user to the reservation page
        $.post("/event-tracker/submit", json, function (result) {
            window.location.href = "/event-tracker/pencilbookings";
        });
    });
}

