function test(value) {
	console.log(value);
}

function deleteImage(value) {
	var form = {
		imageurl: value
	}
	$.ajax({
		type: "POST", 
		url : '/user/account/removeImage',
		data: JSON.stringify(form),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			console.log(data);
			if (data === 'Success')
			{
				location.reload();
			} else
			{
				swal(
					'Error!',
					`Failed to delete image.`,
					'error'
				)
			}
		}
	});
}