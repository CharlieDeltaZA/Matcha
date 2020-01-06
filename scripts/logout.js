function logout() {
	$.ajax({
		type: "POST", 
		url : '/user/logout',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(){location.href = "/";}
	})
}