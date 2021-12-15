$(document).ready(function(){
	$("#addColor").click(addColor);
});

function addColor(){
	let container = $('#formContainer');
	// Create the new elements to allow an extra message
	// This is kind of absurd, I realize, but it is what it is.
	let contentsDiv = $('<input type=\'color\' name=\'hex\'>');
	container.append(contentsDiv);
}