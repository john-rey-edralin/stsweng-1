$(document).ready(function () {
	$('#sidenav-link-calendar').addClass('sidenav-active');
	//setDayColor();
});

function setDayColor() {
	$('.event-icon').parent().parent().parent().addClass('with-event');
}