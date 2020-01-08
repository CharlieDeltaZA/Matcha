function registrationValid(username, name, surname, email, password, confpassword) {
	let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (username === undefined || username == "")
		return (2);
	if (username.length < 3)
		return (10);
	if (!(/^[A-Za-z0-9-_. ]+$/.test(username)))
		return (15);
	if (name === undefined || name == "")
		return (3);
	// if (!(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/.test(name)))
		// 	return (16);
	if (surname === undefined || surname == "")
		return (4);
	// if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(surname)))
		// 	return (17);
	if (email === undefined || email == "")
		return (5);
	// if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
		// 	return (9);
	if (!(emailTest.test(String(email).toLowerCase())))
		return (9);
	if (password === undefined || password == "")
		return (6);
	// if (password.length < 8)
		// 	return (10);
	// if (!(/.*[a-zA-Z].*/.test(password)))
		// 	return (11);
	// if (!(/.*[1-9].*/.test(password)))
		// 	return (12);
	// if (!(/^[a-zA-Z0-9]*$/.test(password)))
		// 	return (13);
	if (confpassword === undefined || confpassword == "")
		return (7);
	if (password != confpassword)
		return (8);
	return (1);
}

function registrationHandler(data) {
	if (data !== 'success') {
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
	let form = {
		userLogin: document.getElementById('userLogin').value.toLowerCase(),
		userName: document.getElementById('userName').value,
		userSurname: document.getElementById('userSurname').value,
		userEmail: document.getElementById('userEmail').value,
		userPass: document.getElementById('userPass').value,
		userConfPass: document.getElementById('userConfPass').value,
	}
	if (registrationValid(form.userLogin, form.username, form.userSurname, form.userEmail, form.userPass, form.userConfPass) == 1)
	{
		$.ajax({
			type: "POST", 
			url : '/user/register',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				registrationHandler(data);
			}
		})
	}
	else
		window.location.href = "/user/register/invalidForm";
}