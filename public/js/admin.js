$(document).ready(function () {
    $('[data-bs-toggle="tooltip"]').tooltip({
        placement: 'left'
    });

    $('[data-toggle="popover"]').popover();
});

function giveAccess(id) {
    let json = JSON.stringify({
        id: id,
    });
    $.ajax({
        type: 'PUT',
        url: '/admin/give',
        data: json,
        contentType: 'application/json',
        success: function (result) {
            window.location.href = '/admin';
        },
    });
}