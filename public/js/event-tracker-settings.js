$(document).ready(function () {
    submitAddDiscount();
});

function submitAddDiscount() {
    $('#add-discount').on('submit', function (event) {
        event.preventDefault();

        // stores all information as an object
        let data = {
            description: $('#discount-name').val(),
            minimumPax: $('#pax').val(),
            rate: $('#percentage').val(),
        };

        // makes a POST request using AJAX to add the discount to the database
        $.post('/settings/event/discount', data, function (result) {
            window.location.href = '/settings/event';
        });
    });
}