function registrationValid2(username, name, surname, email, password, confpassword) {
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
		// if (!(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/.test(name)))
			// 	return (16);
		if (surname === undefined || surname == "")
			reject ('Surname empty.');
		// if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(surname)))
			// 	return (17);
		if (email === undefined || email == "")
			reject ('Email empty.');
		// if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
			// 	return (9);
		if (!(emailTest.test(String(email).toLowerCase())))
			reject ('Invalid email.');
		if (password === undefined || password == "")
			reject ('Password empty.');
		// if (password.length < 8)
			// 	return (10);
		// if (!(/.*[a-zA-Z].*/.test(password)))
			// 	return (11);
		// if (!(/.*[1-9].*/.test(password)))
			// 	return (12);
		// if (!(/^[a-zA-Z0-9]*$/.test(password)))
			// 	return (13);
		if (confpassword === undefined || confpassword == "")
			reject ('Password empty');
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
	let valid = registrationValid2(form.userLogin, form.userName, form.userSurname, form.userEmail, form.userPass, form.userConfPass);
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

$("#userConfPass").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});