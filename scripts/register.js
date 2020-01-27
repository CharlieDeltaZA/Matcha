function registrationValid(username, name, surname, email, password, confpassword) {
	return new Promise ( (resolve, reject) => {
		let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (username === undefined || username == "")
			reject ('Username empty.');
		if (username.length < 4)
			reject ('Username too short.');
		if (!(/^[A-Za-z0-9-_. ]+$/.test(username)))
			reject ('Username contains special characters.');
		if (name === undefined || name == "")
			reject ('Name empty.');
		if (!(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/.test(name)))
				reject ('Illegal chars in name');
		if (surname === undefined || surname == "")
			reject ('Surname empty.');
		if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(surname)))
				reject ('Illegal chars in surname');
		if (email === undefined || email == "")
			reject ('Email empty.');
		if (!(emailTest.test(String(email).toLowerCase())))
			reject ('Invalid email.');
		if (password === undefined || password == "")
			reject ('Password empty.');
		if (password.length < 8)
			reject ('password is too short');
		if ((/[^A-Za-z0-9]+/.test(password)))
			reject ('Password contains something other than numbers and letters');
		if (!(/.*[1-9].*/.test(password)))
			reject ('Password does not contain numbers');
		if (!(/.*[a-zA-Z].*/.test(password)))
			reject ('Password does not contain letters');
		if (confpassword === undefined || confpassword == "")
			reject ('Confirm Password empty');
		if (password != confpassword)
			reject ('Password mismatch');
		resolve ('Valid');
	});
}

function registrationHandler(data) {
	if (data !== 'success') {
        swal(
            'Error!',
            `Username already in use`,
            'error'
        )
	} else {
		window.location.href = "/user/login/postRegistration";
	}
}

function registerPost() {
	let form = {
		userLogin: document.getElementById('userLogin').value.toLowerCase(),
		userName: document.getElementById('userName').value,
		userSurname: document.getElementById('userSurname').value,
		userEmail: document.getElementById('userEmail').value,
		userPass: document.getElementById('userPass').value,
		userConfPass: document.getElementById('userConfPass').value,
	}
	let valid = registrationValid(form.userLogin, form.userName, form.userSurname, form.userEmail, form.userPass, form.userConfPass);
	valid.then( function (ret) {
		$.ajax({
			type: "POST", 
			url : '/user/register',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(ret) {
				if (ret == 'success')
				{
					registrationHandler(ret);
				} else {
					swal(
						'Error!',
						`${ret}`,
						'error'
					)
				}
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

$("input[type='text'], input[type='password'], input[type='email']").keyup((event) => {
	$(".errorMsg").text("");
	$("#submit").prop("disabled", true);
	registrationValid($('#userLogin').val(), $('#userName').val(), $('#userSurname').val(), $('#userEmail').val(), $('#userPass').val(), $('#userConfPass').val()).then(() => {
		$("#submit").prop("disabled", false);
	}, (err) => {
		$(event.target).siblings(".errorMsg").text(err);
	});
});

$("#userConfPass").keyup(function(event) {
    if (event.keyCode === 13) {
        registerPost();
    }
});