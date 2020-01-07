function registrationHandler(data) {
	if (data !== 'success') {
        // CALVIN PUT A POPUP HERE.
        swal(
            'Error!',
            `${data}`,
            'error'
        )
	} else {
		window.location.href = "/user/login/postRegistration";
	}
}

function registerPost() {
	let registrationForm = {
		userLogin: document.getElementById('userLogin').value.toLowerCase(),
		userName: document.getElementById('userName').value,
		userSurname: document.getElementById('userSurname').value,
		userEmail: document.getElementById('userEmail').value,
		userPass: document.getElementById('userPass').value,
		userConfPass: document.getElementById('userConfPass').value,
	}
	console.log(registrationForm);
    $.ajax({
		type: "POST", 
		url : '/user/register',
		data: JSON.stringify(registrationForm),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			registrationHandler(data);
		}
	})
}