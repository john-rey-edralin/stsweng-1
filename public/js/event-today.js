$(document).ready(function () {
	$('#sidenav-link-today').addClass('sidenav-active');
	setDate();
});

function setDate() {
	let date = new Date();
	let options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	$('#today-date-text').text(date.toLocaleDateString("en-US", options));
}