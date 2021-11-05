$(document).ready(function () {
	$('#sidenav-link-reservations').addClass('sidenav-active');
});

function deleteReservation(id) {
	$.get('/event-tracker/pencilbookings/delete', { id: id }, function (result) {
		$('body').load(result);
	});
}