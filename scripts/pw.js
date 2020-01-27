function serverEmailValid(email) {
	return new Promise ( (resolve, reject) => {
		let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email === undefined || email == "")
			reject ('Email empty.');
		if (!(emailTest.test(String(email).toLowerCase())))
			reject ('Invalid email.');
		resolve ('Valid');
	});
}

function resetPass(code) {

	let form = {
		userCode: code,
		newPassword: document.getElementById('userPassword').value
	}
	checkPass(form.newPassword).then(() => {
		$.ajax({
			type: "POST", 
			url : '/user/pass_change',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(ret) {
				document.location.href = ("http://localhost:8080/changed");
			}
		})
	}, (err) => {
		swal(
            'Error!',
            `${err}`,
            'error'
        )
	})
}

function sendEmail() {
	let form = {
		userEmail: document.getElementById('userEmail').value,
	}
	let valid = serverEmailValid(form.userEmail);
	valid.then( function (ret) {
		$.ajax({
			type: "POST", 
			url : '/user/forgot_pass',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(ret) {
				swal(
					'Something Happened',
					`${ret}`,
					'info'
				)
			}
		})
	}, function (err) {
		swal(
            'Error!',
            `${err}`,
            'error'
        )
	})
}

$("#userEmail").keyup(function(event) {
    if (event.keyCode === 13) {
        sendEmail();
    }
});

$("#userPassword").keyup(function(event) {
    if (event.keyCode === 13) {
        resetPass($('#userPassword').val());
    }
});

$("input[type='email']").on("keyup", function(){
	$(".errorMsg").text("");
	$("#submit").prop("disabled", true);
	serverEmailValid($('#userEmail').val()).then(() => {
		$("#submit").prop("disabled", false);
	}, (err) => {
		$('#emailError').text(err);
	});
});

$("input[type='text']").on("keyup", function(){
	$(".errorMsg").text("");
	$("#submit").prop("disabled", true);
	checkPass($("#userPassword").val()).then((ret) => {
		$("#submit").prop("disabled", false);
	}, (err) => {
		$('#passError').text(err);
	});
});

function checkPass(password/*, confpassword*/) {
	return new Promise ( (resolve, reject) => {
		if (password === undefined || password == "")
			reject ('Password empty.');
		if (password.length < 8)
			reject ('Password too short');
		if ((/[^A-Za-z0-9]+/.test(password)))
			reject ('Password contains something other than numbers and letters');
		if (!(/.*[1-9].*/.test(password)))
			reject ('Password does not contain numbers');
		if (!(/.*[a-zA-Z].*/.test(password)))
			reject ('Password does not contain letters');
		// if (!(/^[a-zA-Z0-9]*$/.test(password)))
		// 		return ('Password contains symbols or emojis');
		// if (confpassword === undefined || confpassword == "")
		// 	reject ('Confirm Password empty');
		// if (password != confpassword)
		// 	reject ('Password mismatch');
		resolve ('Valid');
	});
}