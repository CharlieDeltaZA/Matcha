// Requires image to be posted as 'userImage'
function postProfileImage() {
	console.log(`I'm triggered`);
	$.ajax({
		type: "POST", 
		url : '/user/images',
		data: JSON.stringify(image),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			console.log('Image uploaded');
		}
	});
}