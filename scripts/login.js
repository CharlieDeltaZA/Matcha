function loginHandler(data) {
	if (data !== 'success') {
        swal(
            'Error!',
            `${data}`,
            'error'
        )
	} else {
		window.location.href = "/";
	}
}

function postLogin() {
	let registrationForm = {
		userLogin: document.getElementById('userLogin').value.toLowerCase(),
		userPass: document.getElementById('userPass').value
	}
    $.ajax({
		type: "POST", 
		url : '/user/login',
		data: JSON.stringify(registrationForm),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			loginHandler(data);
		}
	})
}


var userLogin, userName, userSurname, userEmail, userPass, userConfPass;

$("input[type='text'], input[type='password'], input[type='email']").on("keyup", function(){
	if (document.getElementById("userLogin").value && document.getElementById("userPass").value)
		$("#submit").prop("disabled", false);
	else
		$("#submit").prop("disabled", true);
});